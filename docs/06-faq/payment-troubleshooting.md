---
id: payment-troubleshooting
title: Payment & Financial Troubleshooting
sidebar_label: Payment Troubleshooting
sidebar_position: 30
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
A technical guide for diagnosing and resolving mismatches between payment processes (WooCommerce, iyzico, Stripe, etc.) and the financial Ledger.
:::

# 💳 Payment & Financial Troubleshooting

Payment errors typically originate from API connections, status mappings, or database locks.

---

## 🛑 1. Common Error Codes & Solutions

### HTTP 400 / 401 (Bad Request / Unauthorized)
- **Reason:** API keys (Public/Private Key) entered incorrectly, or Test/Live mode mismatch.
- **Fix:** Confirm the keys and "Operating Mode" from the Rentiva > Payment Settings tab.

### HTTP 403 (Access Denied)
- **Reason:** The payment provider's IP addresses may be blocked by the server firewall (WAF/Cloudflare).
- **Fix:** Whitelist the IP ranges of the payment provider (e.g., iyzico, Stripe).

### HTTP 500 (Server Error)
- **Reason:** A PHP error or database conflict during the callback process.
- **Fix:** Inspect the `wp-content/debug.log` file and debug errors in the `WooCommerceBridge::handle_webhook()` method.

---

## 🔄 2. Status Mapping Issues

### Payment "Completed" but booking still "Pending"?
- **Check:** Ensure the WooCommerce order status is `processing` or `completed`.
- **Technical Detail:** Rentiva listens to WooCommerce status hooks (`woocommerce_order_status_changed`). If automatic triggering is not occurring, there may be a plugin conflict.
- **Fix:** Perform a manual order update and test whether Rentiva status synchronizes.

---

## 📖 3. Ledger Inconsistencies

### Double-Spending Attempts
- **Situation:** A payout request appears approved but the balance was not reduced.
- **Reason:** `AtomicPayoutService` may have stalled on a transaction lock.
- **Fix:** Verify via SQL whether a record exists in the `mhmrentiva_ledger` table with the relevant `UUID`.

### Commission Credit Not Created?
- **Reason:** The commission engine (`CommissionEngine`) only processes bookings in `completed` (Trip Ended) status.
- **Fix:** Confirm the booking has genuinely ended and its status is `completed`.

---

## 🛠️ 4. API Connection Test (Idempotency)

An `idempotency` key is used in all API calls:
- **Diagnose:** The same payment request being sent multiple times is prevented.
- **Fix:** If you are receiving a callback error, search for the `transaction_id` value from the payment provider in `AdvancedLogger` and check whether there is a duplicate entry.

## 🙋 5. Cart, Payment Page & Guests: Common Questions

### Why does my cart or payment page look "classic" when I use the Cart/Checkout block?
While a rental is in the cart, Rentiva shows WooCommerce's classic cart, and the classic payment page, so the booking steps, the deposit and the remaining amount appear. A cart with only shop products keeps the Cart block. To keep the Cart block, turn off **Classic cart page** in MHM Rentiva > Settings > Payment tab; see [Payment Settings](../02-core-configuration/payments.md).

### Why is there no "Cash on delivery" for a rental?
It is never offered for a booking: a deposit paid at the door is not a deposit, and the remaining amount is paid at pickup anyway. Shop-only orders keep it. If cash on delivery is your only enabled method, enable card or bank transfer in WooCommerce > Settings > Payments. If it is chosen anyway (for example in the Checkout block with the classic cart setting off), it is listed but refused when chosen, with "Cash on delivery is not available for a booking. Please choose another payment method."

### Why are there two lines for the same vehicle in the cart, or why did one line change?
Choosing the same vehicle again for overlapping dates (for example after the browser's Back button) replaces the earlier line, and the customer is told "Your cart already held ... It now holds your latest choice". The amount is not doubled. A different vehicle, or back-to-back dates, remain separate lines. If a cart still holds the same vehicle twice for overlapping dates, the payment page says "Your cart holds ... more than once for overlapping dates. Remove the extra line to continue." and the customer removes the extra line.

### A customer says the vehicle became unavailable at payment.
Another customer booked those dates first. The customer sees one message that the vehicle is no longer available for the dates, and on the cart page the line is removed with that reason. They can pick other dates or another vehicle.

### A button reads "Got it, do not show this again". What does it do?
It hides the notice about block-based cart or payment pages for you only; other administrators still see it. The notice appears only on Rentiva screens and the Plugins page.

### The customer is a guest. How do they see their reservation?
On the payment page, a guest sees WooCommerce's **Create an account?** box while a rental is in the cart. If they create an account, the booking appears in **My Account**. Without an account there is no My Account page for them; the thank-you page and the emails carry the booking details.

## Checklist
1. API key validity (Test vs Live).
2. Firewall (WAF) blocks.
3. Webhook/Callback URL correctness.
4. WooCommerce status synchronization.
5. A payment method other than cash on delivery is enabled for rentals.

## Changelog
| Date | Version | Note |
|---|---|---|
| 18.11.2026 | 6.4.0 | Cart, payment page and guest questions added. |
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | API error codes, status mapping, and Ledger consistency details added. |
