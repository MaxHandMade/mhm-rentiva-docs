---
id: setup-wizard
title: Setup Wizard
sidebar_label: Setup Wizard
sidebar_position: 15
slug: /features-usage/setup-wizard
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

The Setup Wizard guides you through preparing MHM Rentiva on a new WordPress installation and configuring its settings. You can reopen this wizard at any time via **MHM Rentiva > Setup Wizard**. It has five numbered steps, each shown as a card: System Check, Required Pages, Email Settings, Frontend & Display, and Summary & Tests.

---

## Step 1: System Requirements (System Check)

Scans your WordPress environment to confirm that Rentiva can run reliably. Each row shows the current value, the recommended value and a status. Resolve everything marked as required before continuing:

- **WooCommerce:** Installed and Active status is checked (required).
- **PHP Version:** Compared with the minimum the plugin requires (PHP 8.1+).
- **WordPress Version:** Compared with the minimum the plugin requires (WordPress 7.0+).
- **Database Version:** MySQL 5.7+ or MariaDB 10.3+ is recommended.
- **PHP Memory Limit:** 256 MB is recommended. Below that the step shows a note with the line to add to `wp-config.php`.
- **PHP `max_execution_time`:** *Warning* below 60 seconds; raise it for large imports.
- **HTTPS / SSL:** *Warning* if a valid SSL certificate is not detected.
- **WP-Cron:** *Warning* if WP-Cron is disabled; scheduled emails and reminders need it or a real server cron job.
- **Email Delivery:** *Warning* if no SMTP provider is detected.

The minimum PHP and WordPress versions are read from the plugin itself, so this step always matches the plugin's real requirements.

---

## Step 2: Required Pages

Rentiva uses custom WordPress pages for search, vehicle details, booking and contact (shortcode pages). You can create these pages with the **Create Missing Pages** button, or open **Open Shortcode Pages** to link existing ones. The pages configured by the wizard (with their recommended URLs) are:

1. **Booking Form** (`[rentiva_booking_form]`) -> `/rentiva/booking-form/`
2. **Unified Search** (`[rentiva_unified_search]`) -> `/rentiva/search/`
3. **Search Results** (`[rentiva_search_results]`) -> `/rentiva/search-results/`
4. **Vehicle Details** (`[rentiva_vehicle_details]`) -> `/rentiva/vehicle/`
5. **Vehicles List** (`[rentiva_vehicles_list]`) -> `/rentiva/vehicles/`
6. **Contact Form** (`[rentiva_contact]`) -> `/rentiva/contact/`

:::info Optional Pages
The **Vehicles Grid** (`[rentiva_vehicles_grid]`) and **Vehicle Comparison** (`[rentiva_vehicle_comparison]`) pages are optional and are not required by the wizard. You can create these manually as needed.
:::

A "Present" or "Missing" status is shown next to each page, along with an "Edit" link for existing pages.

---

## Step 3: Email Settings and Notifications

The screen where you configure sender details and automatic email notifications for bookings.
*The wizard warns up front that the default WordPress mail system can be unreliable and recommends an SMTP plugin such as WP Mail SMTP or Fluent SMTP.*

**Configuration Fields:**
- **Sender Name** and **Sender Email:** The name and address used in emails sent to customers.
- **Reply-To Address:** Where the email goes when a customer clicks "Reply".
- **Test Mode** and **Test Email Address:** While test mode is on, every email goes only to the test address. Turn it off before going live.

**Automation Options:**
- **Email sending enabled**
- **Automatic email sending enabled** (for example when a booking status changes)
- **Log emails in the email log post type:** keeps a record of sent emails.

---

## Step 4: Frontend and Display

Core financial, duration and colour settings that appear on the customer-facing side, in booking forms and vehicle cards:

- **Currency and Currency Position:** *MHM Rentiva integrates with WooCommerce.* With WooCommerce active, the wizard shows "Managed by WooCommerce: …" and does not change the currency; a link takes you to WooCommerce Settings if you need a change.
- **Default Rental Days:** The default rental duration pre-filled in forms (1–30).
- **Minimum Rental Days:** The minimum number of days the system will accept.
- **Maximum Rental Days:** A limit that prevents excessively long rentals.
- **Accent color:** The same setting as **Settings > Frontend & Display > Colors** (Auto or Custom, with a preview).

:::info Changed in 6.4.0
The "Show feature badges" and "Show availability badge" switches for vehicle cards are gone; these are controlled through shortcode parameters (`show_features`, `show_badges`, etc.).
:::

---

## Step 5: Summary & Tests

Lists every step with its status. If your permalink structure is "Plain" a warning asks you to change it (for example to "Post name") for the frontend pages to work. Use **Open Settings**, **Review Shortcode Pages** or **Send Test Email** to check things, then press **Complete Setup**.

---

### Section Summary
- The Setup Wizard starts with a system check and uses WooCommerce for currency, giving you a solid foundation.
- Once the wizard is complete, the required pages, shortcodes and email automation are ready.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 18.11.2026 | 6.4.0 | Wizard reflects the real five steps (the licence step is not part of the wizard); accent color added; email and display steps updated; minimums read from the plugin. |
| 23.04.2026 | 4.27.2 | Documentation synchronized with the current plugin release. |
| 27.03.2026 | 4.22.1 | Required page list updated: `rentiva_vehicle_details` added, `rentiva_vehicles_grid` and `rentiva_vehicle_comparison` removed (now optional). 7 -> 6 pages. |
| 19.03.2026 | 4.21.2 | Usage guide created. |
