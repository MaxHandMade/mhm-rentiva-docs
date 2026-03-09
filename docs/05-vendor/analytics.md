---
id: vendor-analytics
title: Vendor Analytics & Dashboard Metrics
sidebar_label: Analytics
slug: /developer/vendor/analytics
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-09.03.2026-orange?style=flat-square)

:::info Purpose
This page documents the reactive vendor analytics dashboard, including KPI card computation, date-range filtering, sparkline generation, and the metric caching strategy.
:::

## Table of Contents
- Overview
- Dashboard Architecture
- KPI Cards
- Date Range Filtering (AJAX)
- AnalyticsService Methods
- Caching Strategy (MetricCacheManager)
- Vehicle-Specific Metrics
- Frontend JavaScript
- Pro-Gating

---

## Overview

The Vendor Analytics module provides real-time business intelligence to approved vendors through their dashboard panel. It includes revenue tracking, occupancy rates, cancellation rates, growth comparisons, and per-vehicle performance breakdowns.

**Pro-Gating:** Analytics are available only when:

```php
\MHMRentiva\Admin\Licensing\Mode::canUseVendorMarketplace()
```

---

## Dashboard Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Vendor Dashboard                      │
├──────────┬──────────┬──────────┬────────────┬───────────┤
│ Overview │ Listings │ Bookings │ Ledger &   │ Payment   │
│          │          │          │ Payouts    │ Settings  │
├──────────┴──────────┴──────────┴────────────┴───────────┤
│  ┌──────────────────────────────────────────────────┐   │
│  │           Date Range Picker (Flatpickr)          │   │
│  │   [Last 7D] [Last 30D] [This Month] [Last Month]│   │
│  └──────────────────────────────────────────────────┘   │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌─────────────┐      │
│  │Revenue │ │Bookings│ │Occupancy││Cancellations│      │
│  │  KPI   │ │  KPI   │ │  KPI    ││    KPI      │      │
│  └────────┘ └────────┘ └────────┘ └─────────────┘      │
│  ┌─────────────────────────────────────────────────┐    │
│  │        Revenue Sparkline / Trend Chart          │    │
│  └─────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────┐    │
│  │        Top Vehicles Performance Table           │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

---

## KPI Cards

### Standard KPI Cards (Overview Tab)

| KPI | Data Source | Icon | Trend Support |
|-----|-----------|------|---------------|
| Total Bookings | `confirmed` + `completed` booking count | `calendar` | ✅ |
| Active Listings | Published `vehicle` count by vendor | `car` | ❌ |
| Revenue (Period) | Ledger `commission_credit` sum | `chart` | ✅ |
| Occupancy Rate | Booked days / Available days | `briefcase` | ❌ |
| Cancellation Rate | Cancelled / Total bookings | `check-circle` | ❌ |

### Financial KPI Cards (Overview Tab — Bottom Row)

| KPI | Meta Key | Icon |
|-----|----------|------|
| Available Balance | `Ledger::get_balance()` | `wallet` |
| Pending Balance | Pending payout amount | `clock` |
| Total Paid Out | Sum of approved payouts | `check-circle` |

### Trend Calculation

```php
// Growth = ((current - previous) / previous) * 100
// Previous period mirrors the selected date range length
$prev_start = $start_ts - $window_seconds;
$prev_end   = $start_ts;
```

**Edge Cases:**
- Previous period revenue = 0, current > 0 → Growth = `100%`
- Both periods = 0 → Growth = `null` (displayed as "—")

---

## Date Range Filtering (AJAX)

### Frontend Flow

1. User selects a date range via **Flatpickr** (`mode: "range"`)
2. Preset buttons provide quick selections: `7d`, `30d`, `this_month`, `last_month`
3. On selection, `fetchVendorStats()` fires with a 400ms debounce
4. AJAX POST to `wp_ajax_mhm_fetch_vendor_stats`
5. Response updates DOM via `updateDashboardDOM()`

### AJAX Endpoint

```php
// src/Core/Dashboard/AnalyticsController.php
class AnalyticsController
{
    public static function register(): void
    {
        add_action('wp_ajax_mhm_fetch_vendor_stats', [self::class, 'fetch_vendor_stats']);
    }
}
```

### Request Payload

| Parameter | Type | Format | Validation |
|-----------|------|--------|------------|
| `action` | string | `mhm_fetch_vendor_stats` | Required |
| `nonce` | string | WP nonce | `check_ajax_referer('mhm_rentiva_vendor_nonce')` |
| `start_date` | string | `YYYY-MM-DD` | Must parse to valid timestamp |
| `end_date` | string | `YYYY-MM-DD` | Must be ≥ `start_date` |

### Security

```php
check_ajax_referer('mhm_rentiva_vendor_nonce', 'nonce');

if (! current_user_can('rentiva_vendor')) {
    wp_send_json_error(['message' => 'Unauthorized'], 403);
}
```

### Response Structure

```json
{
  "success": true,
  "data": {
    "revenue_formatted": "₺12,500.00",
    "growth_html": "<span class='trend-up'>+15.2%</span>",
    "occupancy_rate": 72.5,
    "cancellation_rate": 3.1,
    "avg_booking_formatted": "₺1,250.00",
    "sparkline_html": "<div class='sparkline'>...</div>",
    "top_vehicles_html": "<tr>...</tr>"
  }
}
```

---

## AnalyticsService Methods

```
src/Core/Financial/AnalyticsService.php
```

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `get_revenue_period()` | `vendor_id, start_ts, end_ts` | `float` | Sum of cleared commission credits |
| `get_vendor_operational_metrics()` | `vendor_id, start_ts, end_ts` | `array` | Occupancy + cancellation rates |
| `get_avg_booking_value()` | `vendor_id, start_ts, end_ts` | `float` | Average booking value |
| `get_sparkline_data()` | `vendor_id, start_ts, end_ts, days` | `array` | Daily revenue data points for chart |
| `get_top_vehicles()` | `vendor_id, start_ts, end_ts, limit` | `array` | Top performing vehicles by revenue |

---

## Caching Strategy (MetricCacheManager)

### Architecture

Metrics that don't change frequently use WordPress transients with a **15-minute TTL**:

```php
// src/Core/Services/Metrics/MetricCacheManager.php
class MetricCacheManager
{
    public const TTL = 15 * MINUTE_IN_SECONDS; // 900 seconds

    public static function get(string $key, string $subject_id): mixed;
    public static function set(string $key, string $subject_id, mixed $value): void;
    public static function flush_subject_all_metrics(string $subject_id): void;
}
```

### Cache Invalidation Triggers

| Event | Invalidation |
|-------|-------------|
| Payout approved/rejected | `flush_subject_all_metrics($vendor_id)` |
| New booking confirmed | `flush_subject_all_metrics($vendor_id)` |
| Booking status change | `flush_subject_all_metrics($vendor_id)` |
| Custom date range request | Bypasses cache (fresh query each time) |

### Dedicated Metric Classes

| Class | Metric | Cache Key Prefix |
|-------|--------|------------------|
| `VendorRevenue30dMetric` | 30-day revenue | `vendor_revenue_30d` |
| `VendorGrowth7dMetric` | 7-day growth | `vendor_growth_7d` |
| `VendorAvgBookingValueMetric` | Avg. booking value | `vendor_avg_booking` |

---

## Vehicle-Specific Metrics

The "Top Vehicles" table provides per-vehicle analytics:

| Column | Description |
|--------|-------------|
| Vehicle Name | Post title with permalink |
| Bookings | Confirmed + completed count in period |
| Revenue | Commission credits attributed to vehicle |
| Occupancy | Booked days / available days percentage |

---

## Frontend JavaScript

```
assets/js/frontend/user-dashboard.js
```

### Key Functions

| Function | Responsibility |
|----------|---------------|
| `initAnalyticsDashboard()` | Initialize Flatpickr, bind preset buttons, set up AJAX |
| `fetchVendorStats(start, end)` | POST to AJAX endpoint, handle loading state |
| `updateDashboardDOM(data, start, end)` | Patch KPI values, charts, and tables in DOM |

### Localized Script Data

```php
wp_localize_script('mhm-rentiva-dashboard', 'mhmRentivaAnalytics', [
    'ajaxUrl' => admin_url('admin-ajax.php'),
    'nonce'   => wp_create_nonce('mhm_rentiva_vendor_nonce'),
    'i18n'    => [
        'loading' => __('Loading...', 'mhm-rentiva'),
        'error'   => __('Error fetching analytics data.', 'mhm-rentiva'),
    ],
]);
```

---

## Key Source Files

| File | Responsibility |
|------|---------------|
| `src/Core/Dashboard/AnalyticsController.php` | AJAX endpoint handler |
| `src/Core/Financial/AnalyticsService.php` | Metric computation |
| `src/Core/Services/Metrics/MetricCacheManager.php` | Transient caching |
| `src/Core/Dashboard/DashboardDataProvider.php` | Build template data |
| `templates/account/partials/vendor-analytics.php` | Analytics partial template |
| `assets/js/frontend/user-dashboard.js` | Frontend reactive logic |

---

## Changelog
| Date | Version | Note |
|------|---------|------|
| 2026-03-09 | 4.21.0-docs | Initial vendor analytics documentation created. |
