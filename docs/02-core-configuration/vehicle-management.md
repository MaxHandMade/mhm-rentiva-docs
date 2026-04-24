---
id: vehicle-management
title: Vehicle Management (Settings)
sidebar_label: Vehicle Management
sidebar_position: 2
slug: /core-configuration/vehicle-management
---

![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

The Vehicle Management tab is the central area where you manage the rental pricing (multiplier-based) and booking restrictions for vehicles in your fleet. Access it via **MHM Rentiva > Settings > Vehicle Management**.

---

## 💰 Vehicle Pricing Settings

Optimize pricing for all vehicles in the system from a single center using multipliers.

- **Base Price Multiplier:** Used to globally increase or decrease all vehicle prices (e.g., 1.0 = Normal price, 1.2 = 20% markup).
- **Weekend Price Multiplier:** The price increase rate applied on Fridays, Saturdays, and Sundays (e.g., enter 1.2 for a 20% weekend surcharge).
- **Tax Settings (WooCommerce):** The "Tax-Inclusive Pricing" and "Tax Rate (%)" settings work fully integrated with the WooCommerce central tax system. Changes are pulled from the WooCommerce panel.

---

### 🖼️ IMAGE: VEHICLE PRICING PANEL
*(Settings > Vehicle Management tab, price multipliers and tax fields)*

---

## 📅 Vehicle Availability Settings

Rules governing for how long and under what conditions customers can rent vehicles are defined here.

- **Minimum / Maximum Rental Duration:** The minimum and maximum number of days vehicles can be rented (Default: 1 – 30 Days).
- **Advance Booking Days:** How far in advance from today customers can make a booking (e.g., 365 Days).
- **Allow Same-Day Booking:** When checked, customers can create a booking request for the current day (emergency rental).
- **Default Rental Location (Fallback):** If a specific location is not defined for a vehicle or the vehicle's owner (vendor), the system uses this "Fallback" location.

---

## 💡 Technical Notes

:::tip Price Calculation Logic
The system calculates the price using this formula:
`Daily Rate × Number of Days × Base Multiplier × [Weekend Multiplier if applicable]`
:::

---

### Section Summary
- Use **Price Multipliers** to apply a discount or surcharge across the entire fleet at once.
- Use **Availability Limits** to define your operational boundaries (min/max days).
- **WooCommerce Integration** ensures tax and cent calculations are error-free.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Vehicle Management (Settings) documentation created based on panel screenshot and code analysis. |
