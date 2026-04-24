---
id: financial-ledger-model
title: Ledger Data Model (Schema & Logic)
sidebar_label: Ledger Model
sidebar_position: 11
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
This page details the Immutable Ledger data schema, storage rules, and financial logic that form the foundation of the Rentiva financial system.
:::

# 🧾 Ledger Data Model

The `wp_mhm_rentiva_ledger` table is the final record store for all financial events. This table is **Append-Only**; existing rows are never updated or deleted.

---

## 🏗️ SQL Schema (Technical Schema)

The main table structure used by the system is shown below. `DECIMAL(12,2)` is used for precise financial calculations.

```sql
CREATE TABLE wp_mhm_rentiva_ledger (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    tenant_id BIGINT UNSIGNED NOT NULL DEFAULT 1,
    transaction_uuid CHAR(36) NOT NULL, -- Idempotency Key
    vendor_id BIGINT UNSIGNED NOT NULL,
    booking_id BIGINT UNSIGNED NULL,
    order_id BIGINT UNSIGNED NULL,
    type VARCHAR(30) NOT NULL,          -- Transaction Type
    amount DECIMAL(12,2) NOT NULL,      -- Net Impact Amount
    gross_amount DECIMAL(12,2) NULL,    -- WC Order Total
    status VARCHAR(30) NOT NULL,        -- 'cleared', 'pending', 'void'
    policy_id BIGINT UNSIGNED NULL,     -- Associated Policy ID
    policy_version_hash CHAR(64) NULL,  -- Policy Hash for Auditing
    created_at DATETIME NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (transaction_uuid),      -- Duplicate Entry Prevention
    INDEX (vendor_id, status, created_at)
) ENGINE=InnoDB;
```

---

## 🔄 Transaction Types and Balance Impact

The `type` column determines how the transaction affects the vendor's balance:

| Transaction Type (`type`) | Balance Impact | Description |
| :--- | :--- | :--- |
| `commission_credit` | **Positive (+)** | Earnings from a completed sale. |
| `commission_refund` | **Negative (-)** | Reverse entry for a refunded order. |
| `payout_debit` | **Negative (-)** | Successful Payout made to the vendor (outflow). |
| `payout_reversal` | **Positive (+)** | Reversal of a failed/returned Payout. |

---

## 🛡️ Domain Rules and Security

### 1. Immutability
Per financial audit standards, `UPDATE` or `DELETE` operations on this table are strictly prohibited. If a correction is needed, a new reverse entry (Correction/Refund) that neutralizes the error must be added.

### 2. Transaction UUID (Idempotency)
Each financial event (order payment, Payout approval) generates a UUID at its source. The database-level `UNIQUE` constraint prevents the system from processing the same event twice at the hardware level.

### 3. Temporal Audit
All transactions are stamped in UTC via the `created_at` column. The `policy_id` and `policy_version_hash` fields allow the commission policy active at the time of the transaction to be verified even 2 years later.

---

## 📊 Balance Calculation Logic

A vendor's current balance is always derived by summing all "cleared" rows:

```sql
SELECT SUM(amount) FROM wp_mhm_rentiva_ledger 
WHERE vendor_id = %d AND status = 'cleared';
```

## Section Summary
- The data type is always **DECIMAL** (Float is prohibited).
- The table structure is **Append-Only** and **Tenant-Isolated**.
- Every entry has a unique **UUID**.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Page updated with LedgerMigration schema and balance impact matrix. |
