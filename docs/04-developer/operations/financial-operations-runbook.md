---
id: financial-operations-runbook
title: Financial Operations Runbook (L1/L2)
sidebar_label: Operations Runbook
sidebar_position: 1
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
This guide defines daily routines and critical intervention steps for the Rentiva financial operations team and system administrators.
:::

# 📖 Financial Operations Runbook

Financial operations consist of sequential steps designed to maintain the system's cash flow and data integrity.

---

## 🕒 Daily Reconciliation

The following checks must be performed at the start of each business day:
1. **Pending Payouts:** Review the aging of pending requests via the `Payout List Table`. Flag any requests older than 48 hours for review.
2. **Ledger Balance:** Verify that the total debit/credit balance in the Ledger tables is consistent with the `Net Balance` reported by the system.
3. **Failed Webhooks:** Scan the `WebhookLog` table to identify failed payment notifications.

---

## ⚖️ Governance Operations

Intervention procedures via `GovernanceService` for critical situations:

### ❄️ Vendor Freeze
When suspicious activity is detected:
- Enter the Vendor ID in the `Governance` panel.
- Activate the **Freeze** flag.
- This action suspends all of the vendor's pending payouts and prevents them from creating new requests.

### 🔓 Payout Approval Cycle (Maker-Checker)
- **Maker:** The operations officer reviews and lists the request.
- **Checker:** The finance manager performs the `Bulk Approve` action after confirming that the operations officer has not approved a payout to their own account.

---

## 📝 Audit Log Verification

In the event of any financial dispute:
1. Locate the transaction ID in the `mhm_rentiva_ledger` table.
2. Verify that it matches the audit record created by `GovernanceService::log_decision()`.
3. Confirm forensic integrity by checking timestamp and IP address consistency.

---

## 🔄 Reversal Management

For erroneous or duplicate payments:
- Use the `Ledger::record_reversal()` method to add a new "Reversal" entry.
- **Never** delete or update an existing Ledger record.

## Section Summary
- The "Delete" permission does not exist at any level in operational steps.
- Every intervention must leave an audit record.
- Daily reconciliation is mandatory for the financial health of the system.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Page updated with reconciliation and Governance operational steps. |
