---
id: post-install-checklist
title: Post-Install Checklist
sidebar_label: Checklist
sidebar_position: 4
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

After completing the installation steps and the Setup Wizard, follow the checklist below to make sure your site is fully functional. This checklist is the final safety gate before you start accepting live bookings.

---

### 🛠️ Configuration Check
- [ ] **Settings Saved:** All tabs on the `MHM Rentiva > Settings` page have been reviewed and saved.
- [ ] **Currency:** The currency and symbol are displayed correctly on the `General Settings` tab.
- [ ] **Date & Time:** Your site's timezone (`Settings > General`) matches your business location.
- [ ] **License:** Confirmed that your key shows "Active" on the `License` page.

### 📄 Pages and Shortcodes
- [ ] **Page Assignments:** Each function (Search, Listing, Detail, Checkout, My Account) is assigned to the correct page under `Settings > Shortcode Pages`.
- [ ] **Display Test:** These generated pages open cleanly and without errors on the frontend.
- [ ] **Menu Integration:** The Customer Dashboard (My Account) and Search pages have been added to the main menu.

### 💰 Payment and Finance
- [ ] **Payment Gateways:** WooCommerce payment methods (Stripe, PayPal, Bank Transfer, etc.) have been activated.
- [ ] **Test Payment:** At least one successful booking payment has been completed in Sandbox/Test mode.
- [ ] **Price Calculation:** Vehicle daily prices and add-ons are correctly reflected in the cart.

### 📧 Notification System
- [ ] **Test Email:** A test email has been sent via `Settings > Email Templates`.
- [ ] **SMTP Verification:** Emails are reaching recipients without landing in the Spam folder (SMTP is recommended).
- [ ] **Admin Notifications:** An admin email notification is triggered when a new booking is received.

### 🚗 Vehicle and Inventory Management
- [ ] **Sample Vehicle:** At least one vehicle with real attributes has been added to the system.
- [ ] **Categories:** Vehicles have been grouped by class (Economy, SUV, VIP, etc.).
- [ ] **Calendar Check:** The vehicle availability calendar updates correctly after a booking.

---

## Technical Verification (For Developers)

If you encounter a technical issue, check the following:

1. **Permalinks:** Visit `Settings > Permalinks` and click "Save Changes" to flush the rewrite rules (`flush_rewrite_rules`).
2. **WooCommerce Sync:** Use `WooCommerceBridge` logs to verify that Rentiva is sending data to the WooCommerce cart.
3. **Database Check:** You can verify active session data in the `wp_mhm_rentiva_sessions` table via phpMyAdmin.

---

### Section Summary
- The checklist consists of **5 main categories**.
- Completing a test payment **before going live** is critical.
- **Flushing permalinks** resolves many page-related errors.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | English translation added. |
| 18.03.2026 | 4.21.2 | Checklist structure refreshed with modern icons and categories. |
| 26.02.2026 | 4.21.0 | Initial version created. |
