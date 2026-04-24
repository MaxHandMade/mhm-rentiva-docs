---
id: payout-list-table
title: Payout List Table (Admin UI)
sidebar_label: Payout List Table
sidebar_position: 6
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
This document describes the technical capabilities and operational flow of the `PayoutListTable` class, which manages the "Payout Requests" screen in the admin panel.
:::

# 🧾 Payout List Table

`PayoutListTable` is the primary admin-side UI component of Rentiva's financial governance layer. Built on the `WP_List_Table` class, it presents complex financial data in a readable, actionable format.

---

## 🏗️ Core Responsibilities

1.  **Analytics View:** Real-time display of vendor balances and requested payout amounts.
2.  **Secure Filtering:** Listing only payout requests in valid states.
3.  **Transaction Management:** Bulk approval and CSV export integration.

---

## 📊 Column Structure and Data Sources

Each column in the table is fed from different layers of the database:

| Column | Data Source | Description |
| :--- | :--- | :--- |
| **Vendor** | `WP_User` | Display Name and ID of the vendor who submitted the request. |
| **Amount** | `post_meta` | Requested payout amount (formatted with `wc_price`). |
| **Balance** | `Ledger` | Vendor's current available balance in the Ledger table. |
| **Status** | `post_status` | Request status (Pending, Approved, Rejected). |
| **Requested**| `post_date` | Date the request was created (with GMT normalization). |

---

## ⚡ Bulk Actions

### Bulk Approve
Administrators can select multiple requests and trigger the central approval mechanism:
- **Method:** `process_bulk_approve()`
- **How it works:** Calls `GovernanceService::process_approval` for each selected ID.
- **Idempotency:** Only `pending` requests are processed; already-approved ones are skipped (double-debit protection).

---

## 🔄 Status and Color Codes

The table visualizes transaction statuses with dynamic colors:
- 🟡 **Pending:** Awaiting approval.
- 🔵 **Approved:** Approved (payment order issued).
- 🟢 **Confirmed:** Finalized (completed on the bank/processor side).
- 🔴 **Rejected / Failed:** Rejected or an error occurred.

## 🛡️ Security and Authorization

- **Capability:** The `mhm_rentiva_approve_payout` capability is required to perform bulk actions.
- **Nonce:** All bulk actions pass through standard WP security.
- **Idempotency Guard:** Inside `PayoutListTable`, a `post_status` check is performed before each operation to prevent duplicate processing at the code level.

## Section Summary
- `PayoutListTable` is an internal admin tool that displays the financial ledger.
- Data is fetched in a hybrid manner from `Ledger` and `post_meta`.
- Bulk approval passes through the **GovernanceService** filter.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | PayoutListTable class updated with bulk approve and ledger integration. |
