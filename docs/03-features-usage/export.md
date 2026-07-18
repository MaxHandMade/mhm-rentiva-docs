---
id: export
title: Export
sidebar_position: 13
slug: /features-usage/export
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro feature
This page documents a capability of the **MHM Rentiva Pro** add-on. It is not part of the free
Lite edition on WordPress.org and requires Pro installed alongside Lite plus a valid licence.
See [Editions — Lite vs Pro](/docs/) for the full split.
:::

The Export tool lets you extract your rental data in various formats for analysis, accounting, or backup purposes. Access comprehensive data exports via **MHM Rentiva > Export**.

:::info React SPA (since v4.52.0)
The Export page was fully migrated to a **React SPA** backed by the REST API in v4.52.0. About 780 lines of legacy PHP render code were replaced, and three legacy AJAX handlers (`wp_ajax_mhm_export_*`) were removed. The page now offers a live record preview, REST-backed export history with per-entry delete, and a preserved `admin-post.php` CSV download flow — all without page reloads.
:::

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

## 🔎 Live Preview (v4.52.0+)

Before committing to an export, the **Preview** action returns the total record count plus a 5-row sample for the selected post type and date filters. The **Export CSV** button is automatically disabled when the count is `0`, so you never trigger an empty export.

---

## React Components (v4.52.0+)

| Component | Purpose |
| :--- | :--- |
| `ExportCards` | Visual card selector for the three export types (Bookings, Vehicles, App Logs) |
| `AdvancedFilters` | Collapsible date filter panel — preset ranges + custom from/to inputs |
| `PreviewBar` | Shows record count + 5-row sample after a preview call; disables export at count 0 |
| `ExportForm` | Triggers a hidden `admin-post.php` form submit via `useRef` — no reload, no SPA navigation |
| `ExportHistory` | Loads the export log on mount via REST; per-row inline delete with optimistic removal |

**REST Endpoints:**
- `GET /wp-json/mhm-rentiva/v1/admin/export/history` — paginated export log (transient-backed, max 50 entries, 1-week TTL)
- `DELETE /wp-json/mhm-rentiva/v1/admin/export/{id}` — remove a specific history entry
- `POST /wp-json/mhm-rentiva/v1/admin/export/preview` — record count + 5-row sample for the selected type and date filters

All endpoints require `manage_options` capability.

---

### Section Summary
- Move your data to third-party software with **CSV and JSON** support.
- Perform financial segmentation with **Amount-Based Filtering**.
- Audit past data sets with **Export History**.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 12.05.2026 | 4.52.0 | Full React SPA migration. Live record preview, REST-backed export history with per-entry delete, preserved admin-post.php CSV download. ~780 lines of legacy PHP render removed. |
| 23.04.2026 | 4.27.2 | Documentation synchronized with the current plugin release. |
| 26.03.2026 | 4.23.0 | 4 critical export bugs fixed (post_type, record count, history deletion, PHP 8 type error). |
| 19.03.2026 | 4.21.2 | Export modules, filter options, and export history explained against the real interface. |
| 26.02.2026 | 4.21.0 | Initial version created. |
