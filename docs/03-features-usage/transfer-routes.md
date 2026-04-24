---
id: transfer-routes
title: Transfer Routes and Route Management
sidebar_label: Transfer Routes
sidebar_position: 8
slug: /features-usage/transfer-routes
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Transfer Routes is where you define the main routes for your VIP transfer service and the pricing for those routes. Access it via **MHM Rentiva > Transfer Routes**.

Here you create the connections between the points you defined earlier in [Location Management](./locations.md).

---

## Route Creation (Route Definition)

A route expresses the relationship between at least two locations:

- **Pickup Point:** The point where the vehicle picks up the passenger.
- **Dropoff Point:** The main point where the passenger is dropped off.
- **Return Route:** Allows the reverse route to be saved in the system (e.g. Airport-Hotel and Hotel-Airport).

---

## Pricing and Additional Fees

The rental price for a route changes dynamically based on customer requests:

- **Flat Fee:** A fixed amount per route (`base_price`).
- **Maximum Price (v4.23.0):** The price ceiling set by the admin for a route (`max_price`). Vendors can set their own prices within this range.
- **Kilometer-Based Pricing:** A price tariff that increases as distance grows.
- **Passenger/Luggage Limit:** The price changes or the vehicle is excluded from search results based on capacity (e.g. 8 persons).
- **Night Rate:** A surcharge multiplier applied during specific hours (e.g. 00:00 - 06:00) (e.g. 1.25x).

### Vendor Pricing Model (v4.23.0)

In a multi-vendor structure, each vendor can set their own route-specific price within the `min_price` — `max_price` range defined by the admin:

- **Admin** defines `base_price` and `max_price` when creating a route.
- **Vendor** enters their price within this range for the routes they serve in the vehicle submission form.
- **Search engine** uses the vendor price when filtering by route; if no vendor price is set, it falls back to the route's `base_price`.
- Vendor prices are stored as JSON in the `_mhm_rentiva_transfer_route_prices` meta key.

---

### 🖼️ IMAGE: TRANSFER ROUTE MANAGEMENT
*(Route list, price table, and capacity restrictions)*

---

## Transfer Search Engine (v4.23.0)

The transfer search engine gained **route-based vehicle filtering** and **vendor pricing** support in v4.23.0:

- Routes matching the selected pickup and dropoff points are found during a search.
- Vehicles assigned to these routes are filtered by passenger and luggage capacity.
- Results show the vendor's price for the route; if no vendor price is set, the route's `base_price` is used.

---

## VIP Transfer Customer Experience

When a customer searches on the frontend, vehicles are listed via these routes:
1. **Route Selection:** The customer selects pickup and dropoff points.
2. **Passenger Count:** Vehicles appropriate for the group size (VIP Van, Minibus, etc.) are listed.
3. **Price Comparison:** Prices offered by different vendors for the same route can be compared.
4. **Booking:** Once confirmed, a "Transfer" type booking appears in the operations panel.

---

### Section Summary
- Define your **Point-to-Point** services.
- Maintain profitability with **Dynamic Pricing**.
- Prevent incorrect vehicle bookings with **Capacity Control**.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Documentation synchronized with the current plugin release. |
| 26.03.2026 | 4.23.0 | Vendor pricing model, max_price, route-based search engine, and City-to-Point hierarchy added. |
| 19.03.2026 | 4.21.2 | Transfer Routes (Route Management) usage guide created. |
