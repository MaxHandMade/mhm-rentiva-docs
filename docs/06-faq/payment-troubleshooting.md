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
- **Fix:** Verify via SQL whether a record exists in the `mhm_rentiva_ledger` table with the relevant `UUID`.

### Commission Credit Not Created?
- **Reason:** The commission engine (`CommissionEngine`) only processes bookings in `completed` (Trip Ended) status.
- **Fix:** Confirm the booking has genuinely ended and its status is `completed`.

---

## 🛠️ 4. API Connection Test (Idempotency)

An `idempotency` key is used in all API calls:
- **Diagnose:** The same payment request being sent multiple times is prevented.
- **Fix:** If you are receiving a callback error, search for the `transaction_id` value from the payment provider in `AdvancedLogger` and check whether there is a duplicate entry.

## Checklist
1. API key validity (Test vs Live).
2. Firewall (WAF) blocks.
3. Webhook/Callback URL correctness.
4. WooCommerce status synchronization.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | API error codes, status mapping, and Ledger consistency details added. |
