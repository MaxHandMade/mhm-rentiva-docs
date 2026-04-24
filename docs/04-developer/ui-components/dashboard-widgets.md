---
id: dashboard-widgets
title: Dashboard Widget Architecture (UI & Analytics)
sidebar_label: Dashboard Widgets
sidebar_position: 2
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
This page describes the architecture of KPI cards, widgets, and analytics components used in both the WordPress admin panel and the frontend user dashboards.
:::

# Dashboard Widget Architecture

In Rentiva documentation, "Widget" refers to independent UI blocks that visualize data and offer interactions. These blocks operate in two main layers: **Frontend (Elementor)** and **Admin (Custom List Tables)**.

---

## 1. Frontend Widget Layer (Elementor)

All visual components in the frontend panels (Customer/Vendor) are managed through the `ElementorIntegration` class.

### Core KPI Widgets
All KPI cards fetch their data asynchronously via `TrendService`:
- **My Bookings Widget:** Shows active booking counts and growth trends.
- **Payment History Widget:** Presents the vendor's earnings and payment history as a table.
- **My Messages Widget:** Reflects unread message counts in real time.

---

## 2. Admin Widget Layer

Widgets in the admin panel are managed by the `DashboardPage.php`, `Reports.php`, `Messages.php`, and `RevenueReport.php` classes.

### Statistics Widget (Stats)
- **Design:** 2×2 grid layout with icons and colors via inline CSS.
- **Cache:** Cache key prefix `mhm_rentiva_dashboard_stats` (fixed in v4.23.0; previous incorrect prefix: `mhm_dashboard_stats`).
- **File:** `Reports.php`

### Revenue Chart
- **Date format:** Localized dates via `date_i18n(get_option('date_format'))`.
- **Cancellation dataset:** Cancelled bookings are shown separately with a red dashed line.
- **Timezone:** Uses `wp_date('Y-m-01')` instead of `gmdate('Y-m-01')` (for monthly revenue dates).
- **Files:** `RevenueReport.php` + `reports-charts.js`

### Upcoming Operations
- **Time display:** `start_date + start_time` are combined and shown (previous 00:00 bug fixed).
- **Display ID:** WC order ID displayed via `mhm_rentiva_get_display_id()` with a clickable link.
- **File:** `Reports.php`

### Recent Bookings
- **ID display:** WC order ID compatibility via `mhm_rentiva_get_display_id()`.
- **Files:** `recent-bookings.php` + `transfer-widget.php`

### Messages Widget
- **Design:** Self-contained inline CSS, unread message badge, avatar initials, and "time ago" format.
- **File:** `Messages.php`

### Calendar Popup
- **Time display:** `_mhm_start_time`/`_mhm_end_time` fields via `get_post_meta()` (instead of SQL JOIN).
- **File:** `BookingColumns.php`

### Payout List Table (`PayoutListTable.php`)
The central table for financial operations, containing:
- **Analytics Columns:** Current Balance, Requested Amount, and Transaction Status.
- **Bulk Actions:** One-click bulk approval of pending payments.
- **Bank Compatibility:** Updates transaction statuses (Confirmed / Failed) in real time from the Processor layer.

---

## 3. Lite / Pro Widget Access Control

Some widgets are available only in the Pro version:

| Widget | Access | Guard |
|---|---|---|
| Statistics Widget | Lite + Pro | — |
| Recent Bookings | Lite + Pro | — |
| Messages | Lite + Pro | — |
| **Revenue Chart** | **Pro only** | `Mode::canUseAdvancedReports()` |
| **Upcoming Operations** | **Pro only** | `Mode::canUseAdvancedReports()` |

---

## 4. Timezone and Date Handling

As of v4.23.0, all dashboard widgets use the WordPress timezone:

| Previous (incorrect) | Current (correct) | Description |
|---|---|---|
| `time()` | `current_time('timestamp')` | Countdown calculations |
| `strtotime('today')` | `strtotime(wp_date('Y-m-d'))` | Start of day |
| `gmdate('Y-m-01')` | `wp_date('Y-m-01')` | Monthly revenue dates |

**Files:** `DashboardPage.php`, `upcoming-operations.php`, `Reports.php`

---

## 5. Status Synchronization

`update_post_meta` calls do not trigger the `save_post` hook. Additional hooks have been added to ensure the dashboard reflects status correctly:
- `updated_post_meta` — when existing meta changes
- `added_post_meta` — when new meta is added

**File:** `DashboardPage.php`

---

## 6. WooCommerce Integration

- **Email vehicle image:** The `woocommerce_order_item_thumbnail` filter adds a vehicle image to WC order emails.
- **File:** `WooCommerceBridge.php`

---

## 7. Data Flow and Performance

Widgets use a **Tier-1 Cache** layer to minimize database load:

```mermaid
graph TD
    A[Widget Render] --> B{Cache Hit?}
    B -- Yes --> C[Fast Render]
    B -- No --> D[TrendService::get_trend]
    D --> E[WP_Query / Ledger Sum]
    E --> F[Save to Cache - 1 Hour]
    F --> C
```

---

## 8. Security Rules

- **Data Isolation:** A vendor can only see their own data (`post_author` match).
- **Capability Check:** The bulk approval button on `PayoutListTable` is visible only to users with the `mhm_rentiva_approve_payout` capability.
- **Nonce Security:** All AJAX requests made through Elementor widgets are verified with the `mhm_rentiva_elementor` nonce key.

## Section Summary
- Frontend widgets are **Elementor**-based and use `TrendService`.
- Admin widgets are managed by the `DashboardPage`, `Reports`, `Messages`, and `RevenueReport` classes.
- Revenue Chart and Upcoming Operations are available **Pro only** (`Mode::canUseAdvancedReports()`).
- All widgets use the WordPress timezone (`current_time`, `wp_date`).
- Cache key prefix: `mhm_rentiva_dashboard_stats`.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 27.03.2026 | 4.23.0 | 12 dashboard widget fixes documented: timezone, status sync, calendar time, ID compatibility, WC email image, messages design, revenue chart, stats cache, Lite/Pro gating. |
| 19.03.2026 | 4.21.2 | Page updated to reflect Elementor integration and TrendService KPI structure. |
