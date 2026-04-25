---
id: analytics
title: Vendor Analytics
sidebar_label: Analytics
sidebar_position: 20
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
MHM Rentiva provides vendors with real-time Business Intelligence. This document explains KPI card calculations, trend analysis, and data aggregation strategies at the database level.
:::

# 📊 Analytics & Reporting System

The **single source of truth** for financial analytics is the Ledger table. Operational analytics are calculated dynamically based on booking statuses.

---

## 🏗️ 1. Data Aggregation Strategy (`AnalyticsService`)

`AnalyticsService` operates on the Ledger table using `status = 'cleared'` and `vendor_id` filters.

### Financial Metrics
- **Net Revenue:** The sum of `commission_credit` (positive) and `commission_refund` (negative) entries within a given date range.
- **Average Booking Value (ABV):** Total net revenue divided by the number of distinct `booking_id` values.

### Operational Metrics
- **Occupancy Rate:** `(Rented Days / Total Available Days) * 100`.
- **Cancellation Rate:** `(Cancelled Bookings / Total Requests) * 100`.

---

## 📉 2. Growth & Trend Analysis

The system calculates growth rates by comparing the selected date range against the previous equivalent period.

### Calculation Model
`Growth = ((Current Period - Previous Period) / Previous Period) * 100`

**Technical Details:**
- **Window Mirroring:** If the last 7 days are selected, the previous 7 days (without overlap) are used as the baseline.
- **Zero-Division Protection:** If the previous period revenue is 0, the growth rate returns `NULL` instead of `0%`. This is masked as "—" in the UI.

---

## 📈 3. Sparkline Data Structure

The `get_sparkline_data()` method is used for trend charts on the dashboard.

- **Backfilling:** Dates with no activity that return empty from the database are automatically filled with `0.0` on the PHP side.
- **UTC Normalization:** All date groupings use MySQL `DATE()` function over UTC to prevent timezone drift.

---

## ⚡ 4. Performance & Caching (`MetricCacheManager`)

Analytics data involves expensive SQL queries, so a multi-layer caching mechanism is used.

| Layer | Duration | Invalidation |
|---|---|---|
| **Transients** | 15 Minutes | New booking, payment confirmation, or status change. |
| **Object Cache** | Per-Session | No re-query on dashboard tab switches. |
| **Bypass** | — | Cache is disabled for custom date range searches. |

---

## ⚙️ 5. Technical API Reference

### Revenue Calculation
```php
// AnalyticsService::get_revenue_period($vendor_id, $from_ts, $to_ts)
// PostgreSQL/MySQL compatible UTC normalization.
```

### Per-Vehicle Performance
```php
// AnalyticsService::get_vehicle_performance($vehicle_id, $from_ts, $to_ts)
// Returns occupancy and revenue report for a specific vehicle.
```

## Section Summary
- Only `cleared` ledger entries are used as the basis for financial reports.
- Growth rates are calculated using a linear time-shift algorithm.
- `MetricCacheManager` minimizes database load.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Ledger-based analytics and growth formulas documented. |
