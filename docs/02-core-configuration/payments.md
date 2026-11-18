---
id: payments
title: Payment Configuration
sidebar_label: Payment Settings
sidebar_position: 4
slug: /core-configuration/payments
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

MHM Rentiva builds its financial operations on **WooCommerce**, the world's most popular e-commerce platform. This means you can use hundreds of payment gateways (Stripe, PayPal, iyzico, etc.) without any additional development.

---

## 💳 Payment Flow Scenarios

The system manages payments through two primary channels:

### 1. Frontend (Customer) Payments
All rental transactions made by customers on your website flow through the **WooCommerce** cart.
- **Process:** Customer selects a vehicle > sets dates > clicks "Rent Now" > product is added to cart > card details are entered on the payment page.
- **Critical Note:** When the customer completes payment, the WooCommerce order becomes "Processing" or "Completed"; accordingly, the Rentiva booking is automatically set to "Confirmed".
- **Guests:** A visitor who is not logged in can book without an account. The booking form asks nothing extra; the name, email and phone from the payment page's billing details are saved on the booking.

### 2. Cart and Payment Page Look

The cart and payment pages show the booking steps and a summary of the rental (vehicle, dates, price breakdown) above the WooCommerce form. The amounts are labelled by what the customer pays:

| Where | Label | Meaning |
| :--- | :--- | :--- |
| Cart and payment page | **Due now** | The amount charged now (the deposit, or the full price). |
| Booking summary | **Due at pickup** | The remaining amount paid when the vehicle is handed over. |
| Thank-you page | **Deposit paid** / **Deposit to send** | The deposit row follows how the money stands: payment received, or bank transfer still to be sent. |

### 3. Classic Cart Page

When the cart holds a rental, Rentiva shows WooCommerce's **classic** cart and payment pages even if your pages use the Cart or Checkout block, so that the booking steps, the deposit and the remaining amount are shown. A cart with only shop products keeps the Cart block, and an order without a booking still uses the Checkout block.

- **Setting:** MHM Rentiva > Settings > Payment tab > **Classic cart page** (on by default). Turn it off only if you have customized the Cart block itself.
- The classic cart stays in place until that cart is emptied.
- If your cart or checkout page uses a block, an administrator sees a notice on Rentiva screens and the Plugins page explaining this. Click **Got it, do not show this again** to hide it; the choice is saved per administrator.
- With the setting off, the Checkout block can still list every payment method for a rental, but a method that is not allowed for rentals (see below) is refused when chosen.

### 4. Cash on Delivery Is Not Offered for Rentals

WooCommerce's **Cash on delivery** method is never offered for a rental: a deposit paid at the door is not a deposit, and what remains is paid at pickup anyway. This applies to any cart that contains a booking, including a mixed cart (one order has one payment method). Your store's own COD setting is not changed, so shop-only orders keep it.

- If cash on delivery is the only method enabled, the customer sees: "Cash on delivery is not offered for rentals, and no other payment method is set up yet. Please contact us to complete your booking." Enable another method (card, bank transfer) in WooCommerce > Settings > Payments.
- If a method is chosen anyway (for example in the Checkout block with the classic cart setting off), it is refused with "Cash on delivery is not available for a booking. Please choose another payment method." and no booking is made.

### 5. Guest Account Offer

While a rental is in the cart, a guest sees WooCommerce's "Create an account?" box on the payment page, even if your store setting for account creation at checkout is off. That store setting itself is not changed and other carts follow it. A guest who creates an account sees the booking in **My Account**; a guest who does not has no My Account page, so the thank-you page and the emails are where they see the booking.

### 6. Choosing the Same Vehicle Again

If the same vehicle is sent to the cart again with overlapping dates (for example the customer presses the browser's Back button and clicks "Rent Now" again), the new choice **replaces** the earlier line instead of being added next to it. The customer sees: "Your cart already held "Vehicle" for overlapping dates. It now holds your latest choice (date - date)." The amount is not doubled. A different vehicle, or back-to-back dates (one rental returned when the next is picked up), stay as separate lines.

If a cart still ends up holding the same vehicle twice for overlapping dates, the payment page does not blame another customer; it says: "Your cart holds "Vehicle" more than once for overlapping dates. Remove the extra line to continue."

When two customers race for the same dates, the one who loses sees a single message that the vehicle is no longer available for those dates. On the cart page the line is removed, with that reason shown.

### 7. Backend (Admin) & Offline Payments
Used for bookings created manually from the admin panel.
- **Cash Collection:** If you collect cash on vehicle handover, you can mark it as "Offline Payment" from the booking details.
- **Bank Transfer:** Works integrated with the "BACS" (Bank Transfer) method in WooCommerce. After a transfer order, the thank-you page shows a **Your transfer** card with the order number as the reference, the amount to send (the order total as WooCommerce charges it, including tax, coupons and fees) and the amount due at pickup. A logged-in customer uploads the transfer receipt from the booking in My Account (**Upload receipt**); a guest is asked to email the receipt, with the order number, to the shop's email address. The booking is confirmed once you approve the payment.
- **Unpaid orders:** An order that has no booking behind it (for example a payment page that was halted) cannot be paid, so no money can arrive without a booking.

---

## 💰 Deposit System

MHM Rentiva features an advanced deposit (upfront payment) logic.
- **Setup:** Set the deposit per vehicle, or site-wide in MHM Rentiva > Settings > Payment tab: **Rental Payment Type** (*Full Payment Required* or *Deposit (Percentage)*) and **Deposit Rate (%)**. A vehicle with its own deposit rate uses that rate instead. The default site-wide deposit is 10%.
- **How it Works:** If the total vehicle rental cost is 1000 and the deposit is set to 20%, only 200 is reflected in the WooCommerce cart. The remaining 800 appears as **Due at pickup**.

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
- Rentals use the classic cart and payment pages; **cash on delivery** is not offered for rentals.
- The **Deposit** feature lets you collect upfront payments.
- **Offline** payment support is available for manually created bookings.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 18.11.2026 | 6.4.0 | Classic cart page setting, payment page labels, cash on delivery rule, guest account offer and bank transfer card added. |
| 23.04.2026 | 4.27.2 | English translation added. |
| 18.03.2026 | 4.21.2 | Content updated to hybrid model. |
| 26.02.2026 | 4.21.0 | Initial version created. |
