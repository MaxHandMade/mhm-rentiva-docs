---
id: locations-rest
title: Location Services (Locations REST)
sidebar_label: Locations REST
sidebar_position: 60
---

![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

:::info Purpose
This endpoint is used to list the rental and transfer locations defined in the system (airports, hotels, city centers, etc.).
:::

# 📍 Location Services Endpoint

Location data is fed from a central source for both the "Rent-a-Car" (Rental) and "Transfer" modules. The `LocationProvider` class processes the data returned by this endpoint to populate UI components.

---

## 📍 Endpoint Details
- **URL:** `/wp-json/mhm-rentiva/v1/locations`
- **Method:** `GET`
- **Permission:** Public

---

## 🔍 1. Filtering and Query Parameters

The following parameters can be used to narrow down the location list as needed:

| Parameter | Type | Values | Description |
|---|---|---|---|
| `type` | `string` | `rental`, `transfer`, `both` | Filters by service type. |
| `class` | `string` | `airport`, `city`, `hotel` | Filters by location category. |
| `active_only` | `bool` | `0`, `1` | Returns only published locations (Default: `1`). |
| `search` | `string` | Free text | Searches within location name or code. |

---

## 📤 2. Response Structure Example

```json
{
  "success": true,
  "data": [
    {
      "id": 101,
      "title": "İstanbul Havalimanı (IST)",
      "type": "both",
      "class": "airport",
      "coordinates": {
        "lat": 41.2752,
        "lng": 28.7519
      },
      "code": "IST"
    },
    {
      "id": 102,
      "title": "Sabiha Gökçen Havalimanı (SAW)",
      "type": "both",
      "class": "airport",
      "coordinates": {
        "lat": 40.8986,
        "lng": 29.3092
      },
      "code": "SAW"
    }
  ]
}
```

---

## ⚡ 3. Performance and Caching

Because location list data changes infrequently:
- **`MetricCacheManager`:** Caches the location list for 1 hour.
- **`LocationProvider`:** Minimizes JSON size by selecting only the necessary fields (ID, Title, Coordinates) when returning data.

---

## 🚀 4. Operational Notes
- **Geographic Data:** Coordinates allow map-based selection.
- **Transfer Integration:** Transfer distance and price calculations run on the IDs returned by this endpoint.
- **SEO-Friendly:** The `title` and `code` fields enable user-friendly searches in search forms.

## Section Summary
- The Locations endpoint is the foundation of all location-based modules.
- Offers flexible filtering by type and class.
- Optimized with `MetricCacheManager` for high performance.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Coordinate support, service type filters, and caching details added. |
