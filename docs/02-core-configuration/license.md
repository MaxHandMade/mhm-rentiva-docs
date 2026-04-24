---
id: license-management
title: License Management
sidebar_label: License Management
sidebar_position: 8
slug: /core-configuration/license
---

![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

MHM Rentiva requires a valid license key for all features (VIP Transfer, Messaging, Advanced Reports, etc.) to operate at full capacity. Manage your key via the **MHM Rentiva > License** menu.

---

## 💻 Developer Mode

Rentiva automatically detects when it is running on a local (localhost) or staging environment and displays a **"Developer Mode Active"** notice in the top-right corner of the page. In this mode, all Pro features (including Vendor & Payout) are available without entering a real license key.

*   **Force Validation Option:** If you want to test that the license system is actually connecting before going live or during development, check the **"Disable automatic developer mode (force real license validation)"** checkbox on the screen to return the system to its normal flow.

---

## 🟢 License Status & Activation

The page's admin panel is divided into three main blocks:

1. **License Status:**
   Shows the validity of the current license. When the license is active, a green tick displays **"Pro License Active"** along with a summary of unlocked features below: *(All Pro features active: Unlimited vehicles/bookings, export, advanced reports, Vendor & Payout)*.

2. **License Activation:**
   Paste the license key you purchased into the `XXXX-XXXX-XXXX-XXXX` format field and click the **"Activate License"** button. The API validates instantly.

3. **License Management (Release):**
   If you want to move the plugin to another website (domain), or deactivate a real license for testing or cancellation, use the **"Deactivate License"** button at the bottom. Otherwise, you may receive an activation error (Too many activations) on the new domain.

---

## 💎 Lite vs. Pro Comparison

The transparency table at the bottom of the page lets you compare the restrictions when the license is inactive (Lite) with the full scope of the licensed (Pro) state:

| Feature | Lite (Limit) | Pro (Unlimited) |
| :--- | :--- | :--- |
| **Maximum Vehicles** | 5 Vehicles | Unlimited |
| **Booking Capacity** | 50 Bookings | Unlimited |
| **Customer Database** | 10 Customers | Unlimited |
| **Add-ons** | 4 Add-ons | Unlimited |
| **VIP Transfer Routes** | 3 Routes | Unlimited |
| **Gallery Images** | 5 per Vehicle | Unlimited |
| **Advanced Reports** | 30 Days (Max 500 rows) | Unlimited Date & Rows |
| **Export Formats** | CSV only | CSV, JSON |
| **Messaging System** | Not available | Available |
| **Vendor & Payout** | Not available | Available |
| **REST API Access** | Limited | Full REST API |
| **GDPR Compliance Tools** | Not available | Available |
| **Email Notifications** | Not available | Available |

---

### Section Summary
- Your license is activated or deactivated in one step from the **MHM Rentiva > License** menu.
- Developer environments are detected automatically, and **Developer Mode** allows all Pro features to be tested conveniently.
- Before moving a domain, always release the old license using the **Deactivate** button.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | English translation added. |
| 27.03.2026 | 4.23.0 | Lite limits updated (vehicles: 3→5, customers: 3→10, gallery: 3→5). Pro-only features separated: Vendor & Payout, GDPR, Email Notifications. |
| 19.03.2026 | 4.21.2 | License management guide modernized with visuals and technical notes. |
| 26.02.2026 | 4.21.0 | Initial version created. |
