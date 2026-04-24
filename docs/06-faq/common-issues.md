---
id: common-issues
title: Common Issues & Solutions
sidebar_label: Common Issues
sidebar_position: 10
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
This page covers the most common technical and operational issues MHM Rentiva users and administrators may encounter, along with quick resolution steps.
:::

# 🛠️ Common Issues & Solutions

The topics below are organized around the scenarios most frequently seen in support requests.

---

## 📅 1. Booking & Calendar Issues

### A booking is created but doesn't appear on the calendar?
- **Reason:** The booking status may be `pending`. The calendar only shows entries with `confirmed` or `completed` status.
- **Fix:** Check the status in the booking list and confirm it.

### I'm getting a "Selected dates are not available" error?
- **Reason:** There is another confirmed booking on those dates, or the vehicle is in "Maintenance" mode.
- **Fix:** Check custom restrictions under `Vehicle Settings > Availability` or inspect `Util::has_overlap()` conflicts.

---

## 💳 2. Payment & WooCommerce Integration

### Payment succeeded but booking status didn't change?
- **Reason:** The WooCommerce Webhook or IPN (Instant Payment Notification) signal is not reaching Rentiva.
- **Fix:**
    1. Check error logs under WooCommerce > Status > Logs.
    2. Use `Order > Actions > Re-send Payment Notification` for manual triggering.
    3. Verify status mappings in the `WooCommerceBridge` class.

### "No payment methods available" error on the payment page?
- **Reason:** The currency defined for the vehicle does not match the currency accepted by the payment method.
- **Fix:** Check `CurrencyHelper` settings and WooCommerce payment method restrictions.

---

## 👤 3. Vendor Issues

### Cannot access the vendor dashboard (403 Error)?
- **Reason:** The user has not been assigned the `rentiva_vendor` role, or the account is in "Suspended" status.
- **Fix:** Activate the account from the user profile and verify the role.

### Vendor balance shows 0?
- **Reason:** The booking has not yet moved to `completed` status, or the Ledger entry has not yet been `cleared`.
- **Fix:** Review the "Earnings Cycle" section in the `Payouts & Ledger` documentation.

---

## ⚡ 4. Performance & Interface Issues

### Changes are not reflecting on the frontend?
- **Reason:** Aggressive page caching (WP Rocket, LiteSpeed, etc.) or browser cache.
- **Fix:**
    1. Perform a "Cache Flush" from Rentiva settings.
    2. Try using the `cache="false"` parameter in shortcodes.

### Map or Location services are not working?
- **Reason:** Invalid Google Maps API key or restricted HTTP referer.
- **Fix:** Test the key from Rentiva > Settings > API tab.

---

## 📝 Troubleshooting Checklist
If the issue persists, follow these steps:
1. Enable `WP_DEBUG` mode.
2. Review `AdvancedLogger` records (System Logs).
3. Temporarily disable other plugins to test for plugin conflicts.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Detailed troubleshooting items for bookings, payments, and vendors added. |
