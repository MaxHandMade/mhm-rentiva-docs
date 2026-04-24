---
id: locations
title: Location Management
sidebar_label: Location Management
sidebar_position: 7
slug: /features-usage/locations
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Location Management is where you define the physical points (Airport, Office, Hotel, etc.) for your vehicle rental and transfer operations. Access it via **MHM Rentiva > Locations**.

Vehicles and transfer routes in the system are built on top of these locations.

---

## 📍 Adding a New Location and Details

When defining a location, enter the following information:

- **Location Name:** The title the customer will see (e.g. Istanbul Airport (IST)).
- **Location Type:** Category selection such as Airport, Hotel, or Office.
- **City:** The city the location belongs to. This field is critical for the **City → Point hierarchy**. Vendors can only see locations and routes in their own city. *(Added in v4.23.0)*
- **Address and Coordinates:** The exact position on the map (required for Google Maps integration).
- **Working Hours:** The time slots during which this location is open for vehicle pickup and return.
- **Additional Fees:** Any location-specific delivery/return (One-way) fees are set here.

---

### 🖼️ IMAGE: LOCATION MANAGEMENT PANEL
*(Location list and the new location entry form)*

---

## 🚘 Vehicle Assignment

You can "Assign" each vehicle to one or more locations. This way, when a customer selects Istanbul Airport, only vehicles serving that area are listed.

---

## 🗺️ Transfer Connection

Locations form the pickup and dropoff points for the VIP Transfer module. A transfer route cannot be created until a location is defined here.

### City → Point Hierarchy (v4.23.0)

As of v4.23.0, every location has a **city** field. This hierarchy enables:
- **Admin:** Can view and edit all locations and routes.
- **Vendor:** Can only view locations in the city specified in their application. The vehicle submission form only lists locations and routes in their own city.
- **Search Engine:** Route-based filtering presents only active vehicles in the relevant city to the customer.

:::tip Database
This feature is built on the `city` VARCHAR(100) column introduced with `DatabaseMigrator v3.4.0`.
:::

---

### Section Summary
- **Define Points:** Clarify your areas of operation.
- **Working Hours:** Block after-hours deliveries or define surcharges.
- **Location-Based Inventory:** List your vehicles in the right regions.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Documentation synchronized with the current plugin release. |
| 26.03.2026 | 4.23.0 | City field and City→Point hierarchy documentation added. |
| 19.03.2026 | 4.21.2 | Location Management usage guide created. |
