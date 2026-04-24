---
id: payout-csv-exporter
title: Payout CSV Exporter (Reporting)
sidebar_label: Payout CSV Exporter
sidebar_position: 13
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
This page describes the technical operation and data security rules of the `PayoutCsvExporter` component, which enables bulk export of financial Payout records.
:::

# 📊 Payout CSV Exporter

`PayoutCsvExporter` is a utility class used by administrators to audit Payout history or retrieve bulk data for bank integrations. It streams data directly to the browser without loading it into memory, ensuring high performance.

---

## 🛠️ Technical Operation

### 1. Access and Security
The export operation runs through a standard WordPress `admin_post` hook:
- **Endpoint:** `/wp-admin/admin-post.php?action=mhm_export_payouts`
- **Capability Check:** Only users with `manage_options` (Administrator) capability can access this.
- **Nonce Verification:** The validity of the request is verified via a **WP Nonce** keyed with `mhm_export_payouts`.

### 2. Data Format (Excel Compatibility)
The system uses **UTF-8 with BOM (Byte Order Mark)** to ensure CSV files open correctly in Excel:
- **BOM:** The `\xEF\xBB\xBF` character sequence is prepended to the file.
- **Delimiter:** Standard comma (`,`) is used as the delimiter.

---

## 📋 CSV Column Structure (Mapping)

The columns in the exported file and their sources are as follows:

| Column Name | Data Source | Description |
| :--- | :--- | :--- |
| `Payout ID` | `Post ID` | System-assigned unique identifier. |
| `Vendor Name` | `WP_User` Display Name | Full name of the vendor being paid. |
| `Amount` | `_mhm_payout_amount` | Payout amount (Decimal format). |
| `Currency` | WC Currency | WooCommerce base currency. |
| `CPT Status` | `post_status` | WordPress-side status (Pending, Approved, etc.). |
| `Processor Status`| `_mhm_payout_status` | Status code returned from the payment processor (n/a if pending). |
| `Requested At` | `post_date_gmt` | UTC timestamp of the request. |

---

## 🔒 Security Protocols

### PII (Personal Data) Masking
Since CSV outputs are designed for financial auditing, sensitive vendor information (IBAN, Tax ID) is not included in this export by default. This data is only accessible through the encrypted meta layer within the Payout record.

### Logging
Every export operation is recorded in the `mhm_rentiva_payout_audit` table with an "export_triggered" action. Who downloaded data, and when, is traceable in the forensics system.

---

## 💡 Developer Notes

Use the following method on the PHP side to dynamically generate the export link:

```php
// Get a secure (Nonce-protected) Export URL
$export_url = \MHMRentiva\Admin\PostTypes\Payouts\PayoutCsvExporter::get_export_url();
```

## Section Summary
- `PayoutCsvExporter` uses the **Streaming** method for high data volumes.
- The entire operation is protected by **Nonce** and **Capability** checks.
- Outputs are in **Excel-Ready (UTF-8 BOM)** format.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Page updated to reflect streaming logic and Excel BOM structure in PayoutCsvExporter. |
