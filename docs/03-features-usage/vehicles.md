---
id: vehicles
title: Vehicle Management
sidebar_label: Vehicle List
sidebar_position: 3
slug: /features-usage/vehicles
---

![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

Vehicles are the fundamental building blocks of the MHM Rentiva system. **MHM Rentiva > Vehicles** is the main management screen where all vehicles in your fleet are listed, their statuses are tracked, and new vehicle entries are made.

---

## Vehicle List and Quick Actions

The vehicle list provides a general overview of your fleet. Use the **"Quick Edit"** option to update plate, price, and availability status without reloading the page.

- **List Columns:** Title, Vehicle Categories, Plate, Daily Price, Seat Count, Transmission, Fuel, and Availability (Active/Passive).
- **Filtering:** Filter vehicles by category, date, or current status.

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>IMAGE: VEHICLE LIST AND QUICK EDIT</strong><br/>
  <em>mhm-rentiva-vehicle-list-quick-edit</em>
</div>

---

## Adding and Editing Vehicles

When adding a new vehicle or editing an existing one, it is recommended to fill in all fields in the **"Vehicle Details"** panel:

### 1. Core Technical Data
- **Availability:** Whether the vehicle is active or passive in the system.
- **Location:** Which office or vendor region the vehicle belongs to.
- **Price and Finance:** Daily rental fee and Deposit amount.
- **Identity Information:** Plate, Make, Model, and Model Year.
- **Capacity:** Seat Count and Door Count.
- **Mechanical:** Transmission Type (Automatic/Manual), Fuel Type (Petrol/Diesel/Hybrid/Electric), and Engine Displacement.

---

## Features and Equipment

Two main checklists are available for each vehicle that customers can use for filtering:

### Vehicle Features
Air Conditioning, Power Steering, ABS, Airbags, Central Locking, Electric Windows/Mirrors, Fog Lights, Cruise Control, Bluetooth, Navigation, Sunroof, and Heated Seats.

### Vehicle Equipment
Spare Tire, First Aid Kit, Fire Extinguisher, Warning Triangle, Car Cover, Child Seat, GPS Tracker, Dashboard Camera, and Cleaning Kit.

---

## Transfer Settings (VIP Module)

MHM Rentiva supports VIP Transfer operations in addition to standard rentals. Configure the following settings in this panel at the bottom of the vehicle:

- **Service Type:** Rental Only, Transfer Only, or Both.
- **Passenger Capacity:** Maximum number of passengers.
- **Luggage Limits:** Maximum large and small luggage capacities (for point-based calculation).
- **Price Multiplier:** Assign a price multiplier specific to certain vehicles (e.g. 1.2x for VIP vehicles).

---

## Gallery and Image Management

- **Vehicle Image:** The main profile photo shown in search results.
- **Vehicle Gallery:** Up to 10 photos showing the interior and exterior details of the vehicle.

---

## Vehicle Documents (v4.23.1)

The vehicle submission form (`[rentiva_vehicle_submit]`) contains two document upload fields:

### Vehicle Registration Document
The vendor uploads the vehicle registration document via the form. It is reviewed by the admin for verification.

### Vehicle Insurance Document
Added in v4.23.1. This section, which appears immediately after the registration document, allows uploading the vehicle's insurance document.

- **Meta key:** `_mhm_rentiva_vehicle_insurance_doc`
- **Processing:** Handled by the `VehicleSubmit.php` AJAX handler and stored in the WordPress Media Library.
- **History:** This field was previously in the vendor application form. In v4.23.1, it was moved to the vehicle submission form so that an insurance document can be uploaded per vehicle.

---

## Blocked Dates

Use the **Blocked Dates** meta box to prevent a vehicle from being rented on specific dates. The "Apply to All" function was fixed in v4.23.0:

- **Old behavior:** JS was only sending `vehicle_id`; PHP was reading from the DB (which did not work for unsaved data).
- **New behavior (v4.23.0):** JS now sends `dates` + `notes` data as a JSON payload. PHP reads from the payload first; if not found, it falls back to the DB.
- **Relevant files:** `BlockedDatesMetaBox.php`, `assets/js/admin/blocked-dates.js`

---

## AssetManager Admin Scope

As of v4.22.0, `AssetManager::enqueue_admin_assets()` runs only on Rentiva admin pages (guarded by `is_rentiva_admin_page()`). In v4.22.1, the `vehicle`, `vehicle_booking`, and `vehicle_addon` post types were also added to the guard. This ensures that CSS variables (`css-variables.css`) load correctly and KPI cards are not broken.

---

### Section Summary
- Vehicles are stored as a **CPT** (Custom Post Type) and each vehicle has its own set of meta fields.
- Gain operational speed with **Quick Edit**.
- Manage transfer capacities and price multipliers with the **VIP Module**.
- **Blocked Dates** now uses a JSON payload for the "Apply to All" function.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Documentation synchronized with the current plugin release. |
| 28.03.2026 | 4.23.1 | Vehicle insurance document upload section added. City selection converted to SelectWoo. |
| 27.03.2026 | 4.23.0 | Blocked Dates "Apply to All" fix and AssetManager admin guard documented. |
| 19.03.2026 | 4.21.2 | Vehicle details, features, equipment, and VIP module updated against the real interface. |
| 26.02.2026 | 4.21.0 | Initial version created. |
