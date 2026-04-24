---
id: vendor-payouts-ledger
title: Payouts & Ledger
sidebar_label: Payouts & Ledger
sidebar_position: 10
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
MHM Rentiva uses a financial engine called "Model B" — immutable and always auditable. This document explains how vendor earnings are calculated and how payout processes are managed atomically.
:::

# 💳 Financial Engine & Payout Cycle

The system calculates vendor balances using an append-only ledger rather than a dynamic balance field.

---

## 🏗️ 1. Model B Ledger Structure

The Ledger is the single source of truth for all financial data in the system.

### Immutability Principle
- **Update/Delete Prohibited:** No ledger row can be updated or deleted.
- **Correction Entries:** A faulty transaction can only be corrected by a reversal entry.
- **SaaS Isolation:** Each entry is associated with a `tenant_id`.

### Entry Types
| Type | Direction | Description |
|---|---|---|
| `commission_credit` | `+` | Earnings from a completed booking. |
| `payout_debit` | `−` | Balance reduction from an approved payout request. |
| `refund` | `−` | Refund from a cancelled booking. |

---

## ⚛️ 2. Atomic Payout Process (`AtomicPayoutService`)

Payout approvals occur within a database-level **Transaction**. This ensures the entire process is rolled back if any step fails.

### Process Steps:
1. **Pre-flight Check:** Balance and status verification (outside transaction).
2. **START TRANSACTION:** DB lock initiated.
3. **Concurrent Guard:** `post_status` is re-read from the DB (race condition prevention).
4. **Ledger Write:** `payout_pending_debit` entry is created.
5. **CPT Update:** Payout post is set to `publish` status.
6. **COMMIT:** All operations are persisted if successful.

---

## 🛡️ 3. Double-Spending Prevention Layers

Four layers of protection exist against double-spending risk:

| Layer | Mechanism | Level |
|---|---|---|
| **L1: Application** | `vendor_has_pending_payout()` check. | PHP / AJAX |
| **L2: Balance** | `Ledger::get_balance() >= amount` validation. | Domain Logic |
| **L3: Transaction** | InnoDB Row Lock and concurrent status guard. | Database |
| **L4: Idempotency** | Unique UUID in `payout_{id}` format. | DB Unique Key |

---

## ⚙️ 4. Technical API Reference

### Balance Query
```php
// Returns the sum of entries with 'cleared' and 'reserved' statuses only.
$balance = Ledger::get_balance($vendor_id);
```

### Creating a Payout Request
```php
// PayoutService::request_payout()
// 1. Minimum limit (mhm_min_payout_amount) is checked.
// 2. Presence of a pending request is verified.
// 3. mhm_payout post is created.
```

---

## 📧 5. Notifications & Hooks

| Hook | Trigger | Recipient |
|---|---|---|
| `mhm_rentiva_payout_approved` | When payout is atomically approved. | Vendor |
| `mhm_rentiva_payout_rejected` | When payout is rejected by the admin. | Vendor |

## Section Summary
- The Ledger table uses an `APPEND-ONLY` architecture.
- `AtomicPayoutService` guarantees database consistency via transactions.
- Double-spending prevention (Idempotency) is enforced at the UUID level.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Model B Engine, Atomic Transactions, and SaaS isolation details added. |
