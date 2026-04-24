---
id: framework-architecture
title: Rental Framework Architecture (Leasing Framework)
sidebar_label: Architecture & Customization
sidebar_position: 2
---

![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

:::info Purpose
This page explains how MHM Rentiva manages its rental asset model, the technical differences between Lite and Pro versions, and the flexible attribute system.
:::

# 🏗️ Rental Framework Architecture

MHM Rentiva is not just a vehicle rental plugin; it is a flexible **Rental Framework** that can be customized for cars, bicycles, boats, or similar rental assets.

## 🛠️ Modular Architecture (Lite vs Pro)

The system architecture has an authorization layer managed through the `MHMRentiva\Admin\Licensing\Mode` class.

### 📊 Version Restrictions and Capacity
The following table shows the core capacity limits of the system:

| Feature | Lite (Free) | Pro (Premium) |
| :--- | :--- | :--- |
| **Maximum Vehicles** | 3 | Unlimited |
| **Monthly Bookings** | 50 | Unlimited |
| **Customer Records** | 3 | Unlimited |
| **Gallery Images** | 3 per Vehicle | Unlimited |
| **VIP Transfer** | 3 Routes | Unlimited |

---

## 🧬 Core vs Attributes Separation

The platform divides data into two main groups based on operational priority:

### 1. Core Fields
:::danger Cannot Be Deleted / Disabled
These fields are mandatory for the system's pricing calculation, booking, and invoicing engine.
:::
- **Pricing:** Daily base price and tax rates.
- **Availability:** Calendar-based stock control.
- **Asset Identity:** License plate, serial number, or unique ID.

### 2. Attribute Fields
:::tip Customizable
Fields that can be added or completely removed according to the business model.
:::
- **Asset Details:** Fuel type, transmission, seat count.
- **Extra Parameters:** Fields managed through `MHMRentiva\Core\Attribute\AllowlistRegistry` and usable as parameters in shortcodes.

---

## 🧩 Module Flexibility (Clean Slate)

The plugin adopts a **"Clean Slate"** policy. This allows you to simplify the interface by disabling features you do not need:

- **Plugin Settings:** Unused fields can be hidden from tabs under `MHM Rentiva > Settings`.
- **UI Pipeline:** When a field is hidden, it is automatically removed from both the backend admin forms and the frontend specification table.

## Section Summary
- The system enforces limits through the `Mode` class.
- **Pro** removes all technical limits, enabling unlimited scaling.
- The architecture adapts to rental models beyond vehicles (by changing technical attributes).

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Page updated with Lite/Pro limits and current architecture details. |
