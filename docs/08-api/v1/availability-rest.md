---
id: availability-rest
title: Availability Check (Availability REST)
sidebar_label: Availability REST
sidebar_position: 40
---

![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

:::info Purpose
This endpoint checks whether a specific vehicle is available for rental within a selected date and time range, and calculates the current pricing.
:::

# 🚗 Availability Check Endpoint

Availability checking is the first and most critical step in the booking process. It returns real-time results using the `Util::has_overlap()` and `PricingEngine` classes.

---

## 📍 Endpoint Details
- **URL:** `/wp-json/mhm-rentiva/v1/availability`
- **Method:** `POST`
- **Permission:** Public (if not an admin/vendor interface)

---

## 📥 Request Parameters (JSON Body)

| Parameter | Type | Required | Description |
|---|---|---|---|
| `vehicle_id` | `int` | Yes | The ID of the vehicle to check. |
| `pickup_date` | `string` | Yes | Pickup date (`YYYY-MM-DD`). |
| `pickup_time` | `string` | Yes | Pickup time (`HH:MM`). |
| `return_date` | `string` | Yes | Return date (`YYYY-MM-DD`). |
| `return_time` | `string` | Yes | Return time (`HH:MM`). |
| `location_id` | `int` | No | Delivery location (may affect pricing). |

---

## 📤 Successful Response Example

```json
{
  "success": true,
  "data": {
    "available": true,
    "pricing": {
      "base_price": 1200.00,
      "service_fee": 150.00,
      "total_price": 1350.00,
      "currency": "TRY"
    },
    "duration": {
      "days": 3,
      "hours": 0
    }
  }
}
```

---

## 🛡️ Security and Validation
1. **Date Order:** The return date cannot precede the pickup date.
2. **Time Check:** The pickup time must comply with minimum booking duration rules.
3. **`RateLimiter`:** Multiple queries from the same IP within a second are automatically throttled.
4. **Sanitization:** All input data is sanitized via `Sanitizer::absint()` and `sanitize_text_field()`.

---

## ❌ Error States

| Code | Message | Reason |
|---|---|---|
| **400** | `INVALID_DATE_RANGE` | Pickup/return dates are illogical. |
| **404** | `VEHICLE_NOT_FOUND` | No vehicle found with the specified ID. |
| **409** | `VEHICLE_NOT_AVAILABLE` | Vehicle is already booked for the specified dates. |
| **429** | `TOO_MANY_REQUESTS` | Rate limit exceeded. |

## Section Summary
- The `availability` endpoint provides both availability and pricing information.
- `Util::has_overlap()` detects conflicts within seconds.
- Used for reactive updates in front-end calendars and booking forms.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | JSON request/response schema and error codes detailed. |
