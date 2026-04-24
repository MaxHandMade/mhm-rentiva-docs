---
id: transfer-admin-panels
title: Transfer Admin Panels (UI & Dashboards)
sidebar_label: Transfer Admin Panels
sidebar_position: 7
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
This page describes the technical architecture and data entry rules of the admin interfaces that manage Rentiva's vehicle transfer operations (Airport VIP, Intercity, etc.).
:::

# 🛣️ Transfer Admin Panels

The Transfer module operates on a location-based network structure, distinct from standard vehicle rental. The `TransferAdmin` class centrally controls the screens (Locations, Routes, Stats) where this network is managed.

---

## 🏗️ Architecture Components

The module uses three main components for data entry and visualization:
1.  **Stats Cards:** Top panel showing location, route, and latest operation data.
2.  **Location Manager:** Definition of transfer points such as airports, hotels, and ports.
3.  **Route Configurator:** Distance, duration, and pricing rules between two locations.

---

## 📊 Transfer Stats Cards

The `render_transfer_stats()` method, located at the top of the admin panel, presents real-time operational data:

- **Total Locations:** Active transfer points in the `rentiva_transfer_locations` table.
- **Active Routes:** Defined and priced valid routes.
- **Latest Operation:** Date of the most recent booking of type `transfer`.

---

## Location Types

The system supports the following internal types, which change the iconography displayed on the dashboard:
- **Airport:** Airport transfer points.
- **Hotel:** Accommodation facilities.
- **Port:** Harbor and cruise terminals.
- **Station:** Train and bus terminals.
- **City Center:** City center points.

### Location Form Fields

As of v4.23.0, a **city** field has been added to the location form. This field is used for city-based filtering in the vendor marketplace integration:

| Field | Type | Description |
|---|---|---|
| `name` | VARCHAR(255) | Location name |
| `type` | ENUM | airport, hotel, port, station, city_center |
| `city` | VARCHAR(100) | City where the location is situated (v4.23.0) |
| `lat` / `lng` | DECIMAL | Coordinates |

---

## Route Form and Pricing Fields

A **max_price** field was added to the route form in v4.23.0. In the vendor marketplace, vendors set their own prices within the `min_price`/`max_price` range defined by the admin:

| Field | Type | Description |
|---|---|---|
| `origin_id` | BIGINT | Origin location |
| `destination_id` | BIGINT | Destination location |
| `base_price` | DECIMAL(10,2) | Base price |
| `min_price` | DECIMAL(10,2) | Minimum vendor price |
| `max_price` | DECIMAL(10,2) | Maximum vendor price (v4.23.0) |
| `distance_km` | FLOAT | Distance (km) |
| `duration_min` | INT | Estimated duration (min) |

---

## Vendor Vehicle Meta Box (`VehicleTransferMetaBox.php`)

When editing a vendor's vehicle in the admin panel, `VehicleTransferMetaBox` displays the vendor's city information. This allows the admin to see which city's routes the vendor can access.

---

## Data Saving and Security

All form operations are handled asynchronously and securely (nonce-protected) via `admin_post` hooks:

```php
// Example: hooks triggered during route saving
add_action('admin_post_mhm_save_route', array(self::class, 'handle_save_route'));
add_action('admin_post_mhm_delete_route', array(self::class, 'handle_delete_route'));
```

---

## 📦 Database Backward Compatibility (DB Fallback)

Transfer tables operate with the modern `rentiva_` prefix, but also automatically detect legacy `mhm_` tables from older systems via the `resolve_table_name()` method and preserve data.

## Section Summary
- Transfer panels are designed with a **stats-first** approach.
- The **city** field in the location form is required for vendor marketplace integration.
- The **min_price/max_price** fields in the route form define the vendor price range.
- `VehicleTransferMetaBox` shows city information when editing a vendor vehicle.
- All data entry is performed atomically through the `TransferAdmin` class.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 27.03.2026 | 4.23.0 | City field added to location form, max_price field added to route form, VehicleTransferMetaBox vendor city info added. |
| 19.03.2026 | 4.21.2 | Page updated to reflect TransferAdmin stats cards and modern location structure. |
