---
id: vehicle-settings
title: Vehicle Settings
sidebar_label: Vehicle Settings
sidebar_position: 6
slug: /core-configuration/vehicle-settings
---

![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

The Vehicle Settings page is the control center where you define both the data structure (transmission, fuel type, plate number, etc.) and the presentation format for vehicles in your fleet. It is managed under two main tabs via the **MHM Rentiva > Vehicle Settings** menu.

---

## 1. Field Definitions

On this tab you determine which data fields are active for each vehicle card and detail page, and which are required.

### 🏠 Vehicle Details
Manage the technical data shown on vehicle cards and detail pages:
- **Basic Details:** Daily Price, Plate, Model, Model Year, Brand, Deposit, and Availability Status.
- **Features & Custom Details:** Mileage, Seat Count, Transmission Type, Engine Displacement, Color, Door Count, and Fuel Type.

### ⚙️ Vehicle Features
Select the comfort equipment vehicles are equipped with (Air Conditioning, ABS, Power Steering, Bluetooth, etc.) and add custom features.

### 🎒 Vehicle Equipment
Manage the physical accessories available in the vehicle (Spare Tire, First Aid Kit, GPS Tracking Device, etc.).

### ➕ Custom Field Addition
Want to add a field that is not predefined in the system? Type your desired label in the "Custom detail name" box, select the data type (Text, Number, etc.), and create your own technical fields.

---

### 🖼️ IMAGE: VEHICLE FIELD DEFINITIONS
*(MHM Rentiva > Vehicle Settings > Field Definitions tab screenshot)*

---

## 2. Display Options

This tab controls the layout and visibility of the fields you defined in the frontend (user-facing) interface.

### 🔄 Visible Card Items & Ordering
- **Drag & Drop:** Determine which information appears first on vehicle cards (listing page) by dragging and dropping items.
- **Hide:** Remove items you do not want from the "Visible items" list by clicking the `x` button next to them.

### 🌟 Highlighted Features
On vehicle detail pages, independently from the technical specifications table, manage the order and presence of the features highlighted at the top (fields with highlighted icons).

### 📊 Comparison Table Settings
When a user uses the vehicle comparison feature, individually select which details, features, or equipment are compared in the table.

---

### 🖼️ IMAGE: DISPLAY & ORDERING SETTINGS
*(MHM Rentiva > Vehicle Settings > Display Options tab screenshot)*

---

## 💡 Technical Notes & Recommendations

:::important Data Safety
If you disable a field in "Field Definitions", the data you previously entered for that field is **not deleted** — it is simply hidden from users. The data reappears when you re-enable the field.
:::

- **Ordering:** The drag-and-drop ordering applies to vehicle tables, list views, and lists on the "My Account" page.
- **Icons:** The system automatically assigns appropriate icons for standard features and equipment.

### Section Summary
- **Field Definitions:** Determines which data is collected.
- **Display Options:** Determines how and in what order data is presented.
- **Custom Fields:** Allows an unlimited number of technical details to be added.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Field definitions and display options added in detail. |
| 26.02.2026 | 4.21.0 | Initial version created. |
