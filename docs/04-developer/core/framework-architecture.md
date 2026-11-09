---
id: framework-architecture
title: Rental Framework Architecture (Leasing Framework)
sidebar_label: Architecture & Customization
sidebar_position: 2
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
This page explains how MHM Rentiva manages its rental asset model, the technical differences between Lite and Pro versions, and the flexible attribute system.
:::

# 🏗️ Rental Framework Architecture

MHM Rentiva is not just a vehicle rental plugin; it is a flexible **Rental Framework** that can be customized for cars, bicycles, boats, or similar rental assets.

## 🛠️ Modular Architecture (Lite vs Pro)

Lite has no licensing layer. The old `MHMRentiva\Admin\Licensing\Mode` class was removed from Lite in 5.2.0, and with it every capacity limit: Lite has **no vehicle, booking, customer, gallery or add-on caps**.

Licensing lives only in the Rentiva Pro add-on. Pro checks its own gate, `MHMRentiva\Pro\Edition`, before it registers each of its modules.

### 📊 Pro license features
| Pro module | Gate |
| :--- | :--- |
| Vendor marketplace, payouts, vendor reports, listing lifecycle | `Edition::canUseVendorMarketplace()` (license feature `vendor_marketplace`) |
| Messages | `Edition::canUseMessages()` (`messaging`) |
| Reports | `Edition::canUseAdvancedReports()` (`advanced_reports`) |
| Expanded Export (CSV and JSON) | `Edition::canUseExport()` (`export`) |
| GDPR tools | `Edition::canUseGdpr()` (`gdpr_tools`) |
| VIP Transfer | `Edition::isPro()` (any active license) |

The license server also issues `full_rest_api` and `custom_emails`, but no code reads them: they do not unlock anything.

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
| 09.11.2026 | 6.3.1 | Correction: the Lite capacity table (3 vehicles, 50 bookings…) was removed; those limits and the `Mode` class left Lite in 5.2.0. The Pro `Edition` gates and their license features are listed instead. |
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Page updated with Lite/Pro limits and current architecture details. |
