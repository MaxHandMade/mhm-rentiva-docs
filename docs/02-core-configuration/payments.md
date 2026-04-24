---
id: payments
title: Payment Configuration
sidebar_label: Payment Settings
sidebar_position: 4
slug: /core-configuration/payments
---

![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

MHM Rentiva builds its financial operations on **WooCommerce**, the world's most popular e-commerce platform. This means you can use hundreds of payment gateways (Stripe, PayPal, iyzico, etc.) without any additional development.

---

## 💳 Payment Flow Scenarios

The system manages payments through two primary channels:

### 1. Frontend (Customer) Payments
All rental transactions made by customers on your website flow through the **WooCommerce** cart.
- **Process:** Customer selects a vehicle > sets dates > clicks "Rent Now" > product is added to cart > card details are entered on the payment page.
- **Critical Note:** When the customer completes payment, the WooCommerce order becomes "Processing" or "Completed"; accordingly, the Rentiva booking is automatically set to "Confirmed".

### 2. Backend (Admin) & Offline Payments
Used for bookings created manually from the admin panel.
- **Cash Collection:** If you collect cash on vehicle handover, you can mark it as "Offline Payment" from the booking details.
- **Bank Transfer:** Works integrated with the "BACS" (Bank Transfer) method in WooCommerce.

---

## 💰 Deposit System

MHM Rentiva features an advanced deposit (upfront payment) logic.
- **Setup:** The "Take X% deposit" option is available per vehicle or in general settings.
- **How it Works:** If the total vehicle rental cost is 1000 and the deposit is set to 20%, only 200 is reflected in the WooCommerce cart. The remaining 800 appears as "Due Balance" in statements.

:::tip Developer Note
The `DepositCalculator::calculate_deposit()` class is used for deposit calculations. This class also accounts for add-ons and taxes.
:::

---

## 🛠️ Supported Payment Methods

All WooCommerce-compatible plugins work with Rentiva. The most commonly used:
- **Global:** Stripe, PayPal, Square.
- **Local (Turkey):** iyzico, PayTR, Param.

---

### 🖼️ IMAGE: PAYMENT SETTINGS SCREEN
*(MHM Rentiva > Settings > Payment tab — deposit and other settings screen)*

---

---

### Section Summary
- **WooCommerce is required** for frontend payments.
- The **Deposit** feature lets you collect upfront payments.
- **Offline** payment support is available for manually created bookings.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | English translation added. |
| 18.03.2026 | 4.21.2 | Content updated to hybrid model. |
| 26.02.2026 | 4.21.0 | Initial version created. |
