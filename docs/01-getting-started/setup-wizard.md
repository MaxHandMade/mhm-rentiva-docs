---
id: setup-wizard
title: Setup Wizard
sidebar_label: Setup Wizard
sidebar_position: 3
slug: /getting-started/setup-wizard
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

When you activate MHM Rentiva for the first time, an interactive **Setup Wizard** guides you through the essential configuration steps. The wizard lets you complete the critical settings needed for the plugin to work seamlessly with your site — all in a matter of minutes.

---
### 🖼️ IMAGE: SETUP WIZARD WELCOME SCREEN
*(A wide screenshot showing all 6 steps)*

---

## Wizard Steps

The Setup Wizard consists of 6 main steps:

### 1. System Check
The first step verifies that your server is ready to run MHM Rentiva.
- **PHP version**, **WordPress version**, and **WooCommerce status** are all checked.
- If a requirement is not met, you will receive a warning before proceeding.

### 2. License Activation
To use the plugin's Pro features (online payments, advanced reports, etc.), you are prompted to enter your license key here.
- If you do not have a license, you can skip this step and activate it later from the admin panel.

### 3. Required Pages Creation
The plugin requires dedicated pages for features such as vehicle listing, booking details, payment, and the customer dashboard.
- With a **single click**, you can automatically create all required pages together with their shortcodes. A total of **6 required pages** are checked: Booking Form, Unified Search, Search Results, Vehicle Details, Vehicle Listing, and Contact Form.
- If these pages already exist, the wizard detects them and marks them as "Existing."
- **Note:** The Vehicles Grid (`rentiva_vehicles_grid`) and Vehicle Comparison (`rentiva_vehicle_comparison`) pages are optional and are not enforced by the wizard.

### 4. Email and Notifications
Set your sender details for booking confirmations and customer communications.
- **Sender Name** and **Email Address** are configured here.
- **SMTP Note:** Using an external SMTP plugin is strongly recommended to avoid email delivery issues on your site.

### 5. Frontend and Display
Define default values for vehicle cards and search forms on your site.
- **Currency:** If WooCommerce is installed, the system automatically inherits WooCommerce settings.
- **Rental Durations:** Set the minimum and maximum number of rental days.

### 6. Summary and Completion
A final checklist is presented showing the status of all steps.
- If any step is incomplete, you can go back or proceed directly to the **Dashboard**.

---

## Restarting the Wizard

If you think you made a mistake in the settings after completing the wizard, or if you want to delete and recreate the pages:

1. Go to **MHM Rentiva > Setup Wizard** in the WordPress admin panel.
2. Follow the steps again from the beginning to update the configuration.

:::important Data Loss Warning
Running the wizard again does **not** delete your existing data (vehicles, bookings) — it only updates general settings and page assignments.
:::

---

## Technical Note: Automatic Redirect (For Developers)

When the plugin is first installed, it sets the `mhm_rentiva_setup_redirect` option to `1`. The `admin_init` hook checks this option, redirects the user to the wizard, and deletes the option once the process is complete.

To check the wizard status programmatically:
```php
$is_completed = get_option('mhm_rentiva_setup_completed'); // '1' means completed
```

---

### Section Summary
- The Setup Wizard consists of **6 steps**.
- The **automatic page creation** feature speeds up the setup process.
- The wizard can be closed once configuration is complete.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | English translation added. |
| 27.03.2026 | 4.22.1 | Required page list updated: `rentiva_vehicle_details` added, `rentiva_vehicles_grid` and `rentiva_vehicle_comparison` removed (now optional). 7 → 6 pages. |
| 18.03.2026 | 4.21.2 | Content updated to hybrid model (user + technical). |
| 26.02.2026 | 4.21.0 | Initial version created. |
