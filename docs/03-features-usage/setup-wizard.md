---
id: setup-wizard
title: Setup Wizard
sidebar_label: Setup Wizard
sidebar_position: 15
slug: /features-usage/setup-wizard
---
![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

The Setup Wizard guides you through preparing MHM Rentiva on a new WordPress installation and configuring its settings. You can reopen this wizard at any time via **MHM Rentiva > Setup Wizard**. Notifications or errors that need to be resolved in the system (e.g. Action Scheduler messages) are persistently displayed at the top of the wizard screen.

---

## Step 1: System Requirements (System Check)

Scans your WordPress environment to confirm that Rentiva can run reliably. Before proceeding, it is recommended to review all items flagged as "Required" or "Warning":

- **WooCommerce:** Installed and Active status is checked.
- **PHP Version:** Minimum 7.4+ (e.g. `8.2.30` is supported).
- **WordPress Version:** Minimum 6.0+ required (e.g. `6.9.4` Ready).
- **Database Version:** Requires MySQL 5.7+ or MariaDB 10.3+.
- **PHP Memory Limit:** 256 MB is recommended and verified.
- **PHP `max_execution_time`:** *Warning* — For large imports, this value should be raised to 60 seconds or higher (e.g. a warning is shown if it is 30s).
- **HTTPS / SSL:** *Warning* — Checks whether a valid SSL certificate is detected to protect customer data.
- **WP Cron:** Scanned for activity to ensure scheduled emails and automated jobs run.
- **Email Delivery:** Checks whether an SMTP provider (SMTP plugin, etc.) is installed.

---

## Step 2: License Activation

The screen where admins unlock Pro features (online payments, unlimited vehicles, advanced exports) by activating their license.
- **Current Status:** The active Pro license status on this site is summarized with "LICENSE KEY", "PLAN", and "EXPIRY DATE" columns.
- **Developer Mode:** If the plugin detects a local server (localhost, etc.) or staging environment, it shows a "Developer mode detected" notice so you can test the plugin without a license. However, license activation is required before going live.
- To deactivate a key, the "Open License Page" button redirects to the main license manager.

---

## Step 3: Required Pages

Rentiva uses custom WordPress pages for booking, confirmation, and customer account screens (Shortcode infrastructure). You can create these pages individually or use the **Create Missing Pages** button to prepare all listed pages at once. The pages automatically configured by the wizard (with their recommended URLs) are:

1. **Booking Form** (`[rentiva_booking_form]`) -> `/rentiva/booking-form/`
2. **Unified Search** (`[rentiva_unified_search]`) -> `/rentiva/search/`
3. **Search Results** (`[rentiva_search_results]`) -> `/rentiva/search-results/`
4. **Vehicle Details** (`[rentiva_vehicle_details]`) -> `/rentiva/vehicle/`
5. **Vehicle List** (`[rentiva_vehicles_list]`) -> `/rentiva/vehicles/`
6. **Contact Form** (`[rentiva_contact]`) -> `/rentiva/contact/`

:::info Optional Pages
The **Vehicles Grid** (`[rentiva_vehicles_grid]`) and **Vehicle Comparison** (`[rentiva_vehicle_comparison]`) pages are optional and are not required by the wizard. You can create these manually as needed.
:::

A real-time "Status" indicator is shown next to each page, along with an "Edit" link that takes you directly to that page.

---

## Step 4: Email Settings and Notifications

The screen where you configure sender details and activate automatic email notifications for bookings.
*System Pre-Warning: The system warns up front that the default WordPress (PHP) mail system is unreliable and that a plugin such as WP Mail SMTP or Fluent SMTP should be installed.*

**Configuration Fields:**
- **Sender Name & Email:** The name and reply-to address used in emails sent to customers (e.g. can be set to `1` vs `admin@localhost.com`).
- **Reply-To Address:** Determines where the email goes when a customer clicks "Reply".
- **Test Mode & Address:** Isolates system emails so they only go to the specified **Test Email Address** before going live.

**Automation Options:**
- Permission to send emails
- Automatic email sending (e.g. when booking status changes)
- **Email Log:** Option to store emails as log records (Post Type) in the database.

---

## Step 5: Frontend and Display

Core financial and duration settings that appear on the customer-facing (frontend) side in booking forms and vehicle cards:

- **Currency and Position:** *MHM Rentiva integrates with WooCommerce.* This wizard step displays synchronization information directly as "Managed by WooCommerce: (e.g. Turkish Lira - Right Aligned 100₺)". If a change is needed, the warning link takes you to WooCommerce Settings.
- **Default Rental Days:** The default rental duration pre-filled in forms when a user searches without specifying dates (e.g. 1).
- **Minimum Rental Duration:** The minimum number of days the system will accept (e.g. 1).
- **Maximum Rental Days:** A limit that prevents excessively long rentals (e.g. 30).
- ~~**Vehicle Card Switches:**~~ Removed in v4.22.1. The "Show feature badges" and "Show availability badge" settings previously found here were removed because they were not used in code. These controls are now managed directly via shortcode parameters (`show_features`, `show_badges`, etc.).

---

### Section Summary
- The Setup Wizard starts with PHP system requirements and synchronizes the WooCommerce infrastructure to prepare a solid foundation.
- Once the wizard is complete, the required pages, shortcodes, and email automation are ready. Going forward, any infrastructural changes can be analyzed on these screens as "Current value / Recommended".

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Documentation synchronized with the current plugin release. |
| 27.03.2026 | 4.22.1 | Required page list updated: `rentiva_vehicle_details` added, `rentiva_vehicles_grid` and `rentiva_vehicle_comparison` removed (now optional). 7 -> 6 pages. |
| 19.03.2026 | 4.21.2 | Usage guide created. |
