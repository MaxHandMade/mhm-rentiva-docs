---
id: export
title: Export
sidebar_position: 13
slug: /features-usage/export
---
![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

The Export tool lets you extract your rental data in various formats for analysis, accounting, or backup purposes. Access comprehensive data exports via **MHM Rentiva > Export**.

---

## 📂 Data Export Modules

The system presents data in four categories based on purpose:

1.  **Booking Export:** Includes customer information, rental details, and statuses. (Formats: **CSV**, **JSON**)
2.  **Payment Log Export:** Reports payment transactions for accounting and financial analysis. (Formats: **CSV**, **JSON**)
3.  **Vehicle Export:** Exports vehicle inventory, specifications, and pricing criteria. (Formats: **CSV**, **JSON**)
4.  **Report Export:** Redirects to analysis reports containing revenue, customer, and vehicle performance summaries.

---

## ⚙️ Advanced Export Filters

Use advanced filters to narrow down the data before exporting and retrieve only the set you need:

- **Date Range:** Select records belonging to a specific time period (Today, This Month, etc.).
- **Booking and Payment Status:** Filter for records in specific statuses such as "Completed" or "Paid".
- **Payment Gateway:** Separate transactions made via a specific payment method (Cash, Credit Card, etc.).
- **Amount Range (Min/Max):** Target bookings within a specific price range (e.g. $5,000 – $20,000).

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>📸 IMAGE: EXPORT PANEL AND FILTERS</strong><br/>
  <em>mhm-rentiva-export-filters-history</em>
</div>

---

## 📜 Export History

The system keeps a log of every export event:
- **Format and Record Count:** The format (CSV/JSON) used and the number of rows/records it contained.
- **Status:** Whether the operation is "COMPLETED".
- **Details:** Review which filters were applied for a past export.

---

## v4.23.0 Export Bug Fixes

Four critical bugs were fixed in the export module in this release:

1. **Payment Log post_type mismatch:** The export form was sending `mhm_payment_log`, but the actual CPT was `mhm_app_log`. The "Invalid export type" error has been resolved.
2. **Record count returning 0:** The `no_found_rows => true` query parameter caused `found_posts` to always return 0. The count query was fixed with a separate override.
3. **History deletion:** The export history deletion function was placeholder code and did not work. A direct transient-based deletion mechanism was added.
4. **Vehicle CSV/JSON PHP 8 error:** The wrong parameter type (string instead of int) was being sent to `get_status_label()`. This caused a fatal error with PHP 8 strict types.

---

### Section Summary
- Move your data to third-party software with **CSV and JSON** support.
- Perform financial segmentation with **Amount-Based Filtering**.
- Audit past data sets with **Export History**.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Documentation synchronized with the current plugin release. |
| 26.03.2026 | 4.23.0 | 4 critical export bugs fixed (post_type, record count, history deletion, PHP 8 type error). |
| 19.03.2026 | 4.21.2 | Export modules, filter options, and export history explained against the real interface. |
| 26.02.2026 | 4.21.0 | Initial version created. |
