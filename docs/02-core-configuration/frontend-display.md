---
id: frontend-display
title: Frontend & Display Settings
sidebar_label: Frontend & Display
sidebar_position: 12
slug: /core-configuration/frontend-display
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

The Frontend & Display tab is a comprehensive administration area where you customize the plugin's user-facing appearance, button labels, alert messages, and page URLs. Access it via **MHM Rentiva > Settings > Frontend & Display**.

---

## 🖼️ Core Vehicle Display Settings

Control the visual hierarchy on vehicle listing pages:

- **Vehicles Per Page:** The maximum number of vehicles listed on a single page (e.g., 12).
- **Default Sort Order:** The criterion by which the listing page is ordered on first load (ascending by price, descending by year, etc.).

:::note Removed Settings (v4.22.1)
The **Show Vehicle Images** (`mhm_rentiva_vehicle_show_images`), **Show Features** (`mhm_rentiva_vehicle_show_features`), and **Show Availability** (`mhm_rentiva_vehicle_show_availability`) settings present in earlier versions were removed in v4.22.1 because they were unused in the codebase. These display controls are now managed directly through shortcode parameters (`show_features`, `show_badges`, etc.).
:::

---

## ✍️ Custom Labels & Text

Change any button or form text in the plugin to match your language or brand voice in seconds. This section is accordion-structured:

- **General Buttons:** Button labels such as "Rent Now", "View Details", "Make a Booking".
- **Notification Messages:** Instant alerts such as "Added to favorites", "You must be logged in", "Processing...".
- **Form Labels:** Field names on the booking form such as "First Name", "Last Name", "Phone".
- **Payment & Validation:** Critical system messages such as "Calculating...", "Payment successful", "Invalid date selection".

---

### 🖼️ IMAGE: FRONTEND CONFIGURATION PANEL
*(Settings > Frontend & Display tab, label groups and display settings)*

---

## 🔗 Permalinks & Page URL Structure

Manually define the page paths that are critical for the plugin to function correctly:

- **Booking Form URL:** The full address of the page containing the `[rentiva_booking_form]` shortcode.
- **Login & Registration Page:** The custom login and sign-up pages customers are redirected to.

:::tip Auto-Detection
If you leave these fields empty, the system will automatically scan the database to find the pages containing the relevant shortcodes. However, if you have a custom page structure, entering the full URL here is recommended.
:::

---

### Section Summary
- **Customize all buttons** to match your target audience's language for a better user experience.
- **Align the visual layout** of listing pages with your site's design.
- **Set page URLs** to ensure the booking flow works without interruption.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | English translation added. |
| 27.03.2026 | 4.22.1 | Added note about removal of unused display control settings (`show_images`, `show_features`, `show_availability`). |
| 19.03.2026 | 4.21.2 | Frontend & Display documentation created with all label groups and URL configuration. |
