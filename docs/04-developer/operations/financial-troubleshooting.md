---
id: financial-troubleshooting
title: Financial Troubleshooting & Error Matrix
sidebar_label: Financial Troubleshooting
sidebar_position: 2
---

![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

:::info Purpose
This page is a guide for diagnosing technical errors in financial modules and resolving them quickly.
:::

# 🔍 Financial Troubleshooting

Financial errors typically originate from network interruptions, missing permissions, or data inconsistencies.

---

## 🛠️ Error Code & Resolution Matrix

| Error Code | Meaning | First Response |
|---|---|---|
| `401 Unauthorized` | HMAC / Signature Error | Check the API Secret key match and server time (NTP). |
| `403 Forbidden` | Governance Block | Check via `GovernanceService` whether the vendor is in a `Freeze` state. |
| `409 Invalid State` | Status Conflict | Verify that the webhook callback is only arriving for payouts in `Processing` or `Approved` status. |
| `429 Too Many Requests` | Rate Limit Exceeded | Clear `WebhookRateLimiter` records or relax the limits. |
| `Atomic Failure` | DB Rollback | The connection may have dropped during the transaction. Confirm there are no duplicate entries in `Ledger`. |

---

## 🚩 Common Scenarios and Diagnosis

### 1. Expected Balance is Wrong (Balance Mismatch)
If the vendor's dashboard does not match the Ledger tables:
- **Diagnosis:** Search the `mhm_rentiva_ledger` table with a `source_type` filter.
- **Resolution:** Trigger `Ledger::calculate_net_balance()` asynchronously to force a database recount.

### 2. Payout Stays "Approved" (No Callback)
If an approved payment does not transition to "Confirmed" status:
- **Diagnosis:** Review `WebhookLog` records to find the notification error from the bank.
- **Resolution:** Manually re-trigger the webhook (via cURL with signature simulation).

### 3. Double Entry
If two Ledger records were created with the same transaction ID:
- **Diagnosis:** Run the `ForensicHardeningTest` script for that user.
- **Resolution:** Neutralize the second record with `record_reversal()`. **Never delete manually.**

---

## 📄 Log Scanning Procedure

Monitor the following log channels to locate the source of an issue:
- **WP Debug Log:** For PHP errors and `Util` warnings.
- **Stitch / API Logs:** To validate webhook payload content.
- **Audit Logs:** For permission denials recorded by `GovernanceService`.

## Section Summary
- Most errors originate from **HMAC** or **NTP** (time synchronization) issues.
- For Ledger inconsistencies, the reference is always the database (WPDB) rows.
- Logs are forensic evidence of the issue and must not be deleted.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Error matrix and async balance issues added. |
