---
id: vehicle-settings-usage
title: Global Vehicle Settings
sidebar_label: Vehicle Settings
sidebar_position: 5
slug: /features-usage/vehicle-settings
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Global Vehicle Settings lets you manage the common behaviors of all vehicles in the system, the data fields displayed, and the equipment lists. Access it via **MHM Rentiva > Vehicle Settings**.

---

## Field Definitions

This tab is the central management point for all data fields that form the technical identity of a vehicle.

### 1. Vehicle Details
Use the "Edit Names" button to localize or rename the pre-defined fields such as **Daily Price, Model Year, Plate, Make, Model, Deposit**.
- **Add Custom Detail:** Add new data fields in Text or Number format beyond the standard fields (e.g. "Damage Record", "Insurance Type").

### 2. Vehicle Features
Comfort and safety equipment such as Air Conditioning, ABS, and Bluetooth. Add new equipment to your list from the "Custom feature name" field.

### 3. Vehicle Equipment
Physical equipment such as Spare Tire and First Aid Kit is defined here.

---

## Display Options

Control where and how the fields you have defined appear on the frontend from this tab.

### Visible Card Items (Drag & Drop)
Determine which technical data is shown on vehicle listing cards (Grid/List) in search results using drag-and-drop.
- **Ordering:** Drag items up or down to change priority order (e.g. Fuel Type first, then Transmission).
- **Hiding:** Drop an item into the right column (Available Items) to make it passive and hide it from the card.

### Featured Specs on Vehicle Details
At the top of the vehicle page, select the 4–5 most important specs (e.g. Seat Count, Transmission, Air Conditioning) you want the customer to see at first glance.

### Vehicle Comparison Table Settings
When customers compare multiple vehicles, use the checklist to choose which Details, Features, and Equipment appear in the comparison table.
- **Bulk Actions:** Use "Select All" to include all equipment in the comparison table.

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>IMAGE: DISPLAY OPTIONS AND CARD SETTINGS</strong><br/>
  <em>mhm-rentiva-display-options-drag-drop</em>
</div>

---

### Section Summary
- Structure your database with **Field Definitions**.
- Optimize design and user experience with **Display Options**.
- Customize list views without writing code using the **Drag & Drop** interface.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Documentation synchronized with the current plugin release. |
| 19.03.2026 | 4.21.2 | Display Options and Drag & Drop settings detailed against the real interface. |
| 26.02.2026 | 4.21.0 | Initial version created. |
