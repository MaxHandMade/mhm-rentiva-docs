---
id: payment-settings
title: PaymentSettings Class Architecture (UI & Integration)
sidebar_label: Payment Settings (Technical)
sidebar_position: 5
---

![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

:::info Purpose
This page explains Rentiva's payment settings architecture and how the `PaymentSettings` class bridges to **WooCommerce** for managing payment gateways — rather than managing them directly.
:::

# 💳 PaymentSettings Class

Rentiva follows a "Don't Reinvent the Wheel" principle for payment security and flexibility, delegating all payment processing to the **WooCommerce** layer. `PaymentSettings` is a control center that manages the health of this integration.

---

## 🏗️ Architectural Strategy: Delegation

The Rentiva core does not process credit card or bank data directly. Instead:
1.  **Frontend:** When the booking form is completed, a WooCommerce order is created.
2.  **PaymentSettings:** This class checks whether WooCommerce is active and directs the administrator to the correct location in WC settings.
3.  **Legal Compliance:** Payment data is stored to WC standards; Rentiva only references the transaction ID.

---

## 🛡️ Integration Status Monitoring

The `render_payment_section_description()` method verifies in real time whether the system can accept payments:

```php
// Is WooCommerce loaded?
if ( class_exists( 'WooCommerce' ) ) {
    // Quick link to WC Settings and Status Active badge
} else {
    // Critical warning prompting the admin to install WC
}
```

---

## 🔗 Registration and Settings API

`PaymentSettings` is registered as a section on Rentiva's central settings page (`SettingsCore::PAGE`).

-   **Section ID:** `mhm_rentiva_general_payment_section`
-   **Hook:** `admin_init` (via the central `SettingsManager`).

---

## 📋 Related Classes

Payment settings are not limited to this class alone; operational settings are distributed across the following classes:

| Class | Responsibility |
| :--- | :--- |
| `WooCommerceBridge` | Product and order mappings. |
| `EmailSettings` | Configuration of post-payment confirmation emails. |
| `MaintenanceSettings` | Rate limiting and security rules on payment pages. |

## Section Summary
- Rentiva does not manage payment gateways; it uses **WooCommerce** as an engine.
- `PaymentSettings` visualizes the settings and connection status of this bridge.
- Gateway-specific settings (iyzico, Stripe, etc.) are always configured through WC.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Page rewritten from scratch to reflect the WooCommerce delegation strategy. |
