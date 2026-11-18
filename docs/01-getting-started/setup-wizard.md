---
id: setup-wizard
title: Setup Wizard
sidebar_label: Setup Wizard
sidebar_position: 3
slug: /getting-started/setup-wizard
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

When you activate MHM Rentiva for the first time, an interactive **Setup Wizard** guides you through the essential configuration steps. The wizard lets you complete the critical settings needed for the plugin to work seamlessly with your site — all in a matter of minutes. Each step is a numbered card; the steps are listed across the top of the screen.

---
### 🖼️ IMAGE: SETUP WIZARD WELCOME SCREEN
*(A wide screenshot showing the numbered steps and the System Check card)*

---

## Wizard Steps

The Setup Wizard consists of 5 steps:

### 1. System Check
The first step verifies that your server is ready to run MHM Rentiva.
- WooCommerce status, **PHP version**, **WordPress version**, database version, PHP memory limit, `max_execution_time`, HTTPS, WP-Cron and email delivery are all checked.
- The minimum PHP and WordPress versions shown are the ones the plugin itself requires. If a requirement is not met you get a warning before proceeding.
- You can leave the wizard at any time with **Skip wizard**.

### 2. Required Pages
The plugin requires dedicated pages for features such as vehicle search, listing, details and booking.
- With a **single click** (**Create Missing Pages**), you can automatically create all required pages together with their shortcodes. A total of **6 required pages** are checked: Booking Form, Unified Search, Search Results, Vehicle Details, Vehicles List and Contact Form.
- If these pages already exist, the wizard detects them and marks them as "Present".
- **Note:** The Vehicles Grid (`rentiva_vehicles_grid`) and Vehicle Comparison (`rentiva_vehicle_comparison`) pages are optional and are not enforced by the wizard.

### 3. Email Settings
Set your sender details for booking confirmations and customer communications.
- **Sender Name**, **Sender Email** and **Reply-To Address** are configured here.
- **Test Mode** sends every email only to the **Test Email Address** until you are ready to go live.
- **Automation:** switch email sending, automatic sending and the email log on or off.
- **SMTP Note:** Using an external SMTP plugin (WP Mail SMTP or Fluent SMTP) is strongly recommended to avoid email delivery issues on your site.

### 4. Frontend & Display
Define default values for booking forms and vehicle cards on your site.
- **Currency and Currency Position:** If WooCommerce is installed, these are managed by WooCommerce and shown for information; change them under WooCommerce settings. The wizard does not change the currency.
- **Default, Minimum and Maximum Rental Days:** The rental durations used in forms and limits.
- **Accent color:** The same setting as **Settings > Frontend & Display > Colors** (Auto or Custom).

### 5. Summary & Tests
A final checklist is presented showing the status of every step.
- If your WordPress permalinks are set to "Plain", a warning asks you to switch to a structure such as "Post name", because the frontend pages need it.
- Use **Open Settings**, **Review Shortcode Pages** or **Send Test Email** for a last check, then **Complete Setup** (or **Go to Dashboard**).

:::info License
The wizard has no licence step. If you use Rentiva Pro, activate your key from the **License** page.
:::

---

## Restarting the Wizard

If you think you made a mistake in the settings after completing the wizard, or if you want to recreate missing pages:

1. Go to **MHM Rentiva > Setup Wizard** in the WordPress admin panel.
2. Follow the steps again from the beginning to update the configuration.

:::important Data Loss Warning
Running the wizard again does **not** delete your existing data (vehicles, bookings) — it only updates general settings and page assignments.
:::

---

## Technical Note: Automatic Redirect (For Developers)

When the plugin is first installed, it sets the `mhmrentiva_setup_redirect` option to `1`. The `admin_init` hook checks this option, redirects the user to the wizard, and deletes the option. The redirect is skipped when several plugins are activated together.

To check the wizard status programmatically:
```php
$is_completed = get_option('mhmrentiva_setup_completed'); // '1' means completed
```

---

### Section Summary
- The Setup Wizard consists of **5 steps**.
- The **automatic page creation** feature speeds up the setup process.
- The wizard can be closed once configuration is complete.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 18.11.2026 | 6.4.0 | New look with numbered steps; accent color added to the Frontend & Display step; vehicle card switches removed; steps listed as in the plugin (no licence step). |
| 23.04.2026 | 4.27.2 | English translation added. |
| 27.03.2026 | 4.22.1 | Required page list updated: `rentiva_vehicle_details` added, `rentiva_vehicles_grid` and `rentiva_vehicle_comparison` removed (now optional). 7 → 6 pages. |
| 18.03.2026 | 4.21.2 | Content updated to hybrid model (user + technical). |
| 26.02.2026 | 4.21.0 | Initial version created. |
