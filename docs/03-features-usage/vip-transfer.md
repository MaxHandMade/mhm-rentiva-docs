---
id: vip-transfer
title: VIP Transfer Module
sidebar_label: VIP Transfer
sidebar_position: 10
slug: /features-usage/vip-transfer
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

The VIP Transfer module is designed to manage chauffeured transportation services (Airport transfers, intercity travel, etc.) separately from standard vehicle rentals. This module is built on route-based pricing and capacity control.

---

## Transfer Routes

Use **MHM Rentiva > Transfer Routes** to define the points you serve and the prices between those points.

### 1. Location Definition
Create the points where transfers start or end (Airport, Hotel, City Center, etc.).
- **Tip:** Remember to enter the coordinates of locations for map integration.

### 2. Route and Pricing
Define the main route between two locations.
- **Flat Fee:** Set a fixed charge per route (`base_price`).
- **Maximum Price:** The price ceiling vendors can set (`max_price`). *(v4.23.0)*
- **Kilometer-Based:** Dynamic pricing that changes as distance increases.
- **Vendor Price:** In a multi-vendor structure, each vendor can set their own route price. *(v4.23.0)*

---

## Capacity and Vehicle Compatibility

The most critical factor in transfer bookings is passenger and luggage count.
- **Passenger Count:** Filtering is based on the seating capacity stated in the vehicle registration.
- **Luggage Capacity:** The luggage count specified in the booking form is compared against the vehicle's luggage volume.

:::warning Important
If a vehicle is a "VIP Minibus" with an 8-person capacity, it will not appear in results when a group of 10 people searches.
:::

---

## Route-Based Search Engine (v4.23.0)

The transfer search engine was rebuilt in v4.23.0:
- Vehicles are filtered based on routes matching the selected pickup and dropoff points.
- If a vendor price exists, it is used; otherwise, the route's `base_price` is applied as a fallback.
- Passenger and luggage capacity is automatically verified.

---

## User Flow and Booking

1. **Search:** The user selects a pickup and dropoff point, date/time, and number of passengers.
2. **Vehicle Selection:** Vehicles matching the route and capacity are listed with vendor prices.
3. **Payment:** Payment is completed via WooCommerce.
4. **Confirmation:** A "Transfer" type booking appears in the admin panel.

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>IMAGE COMING SOON: Transfer Search Form</strong><br/>
  <em>Frontend view of the transfer search engine.</em>
</div>

---

## Technical Note: Hooks and Filters

Developers can manipulate transfer pricing or add additional rules:

```php
// To filter the transfer price:
add_filter('mhm_rentiva_transfer_price', function($price, $route_id) {
    // Custom campaign logic
    return $price * 0.9; 
}, 10, 2);
```

---

### Section Summary
- **Transfer** is a route- and capacity-focused module.
- **Pricing** can be fixed or distance-based.
- **Capacity limits** (passenger/luggage) are automatically enforced by the system.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Documentation synchronized with the current plugin release. |
| 26.03.2026 | 4.23.0 | Route-based search engine, vendor pricing, max_price, and City-to-Point hierarchy added. |
| 18.03.2026 | 4.21.2 | Content updated to the hybrid model. |
| 26.02.2026 | 4.21.0 | Initial version created. |
