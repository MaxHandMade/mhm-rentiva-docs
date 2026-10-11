---
title: Master account dashboard (retired)
description: The customer dashboard shortcode, block and Elementor widget were retired in Rentiva 6.2.0; customers use the My Account page.
sidebar_position: 13
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::warning Retired in 6.2.0
The separate customer dashboard is retired. A customer's home is the **My Account** page (WooCommerce's account page), where bookings, favorites and payments are listed. Remove `[rentiva_user_dashboard]`, its block or its Elementor widget from your pages.
:::

# 🚗 Master Account Dashboard (retired)

## Contents
- What the shortcode shows now
- Where customers go instead
- Developer Notes

## What the shortcode shows now

The shortcode is still registered, so a page that contains it does not break:

```shortcode
[rentiva_user_dashboard]
```

Since Rentiva 6.2.0 the shortcode, the **Master Account Dashboard** block and the Elementor widget no longer render a dashboard:

| Who views the page | What they see |
| :--- | :--- |
| Logged-in customer | One line saying the account has moved, and a **Go to my account** link to the My Account page. |
| Visitor (not logged in) | Nothing. |
| Administrator | The same line and link, plus a notice that this dashboard is deprecated and should be removed from the page. Only administrators see the notice. |

- The block and the Elementor widget are hidden from the editors, so they can no longer be added to new pages.
- **MHM Rentiva > Shortcode Pages** no longer offers to create this page.
- On a page with the slug `panel`, visitors and logged-in non-administrators are redirected to My Account; administrators can still open it.
- The shortcode takes no parameters.

## Where customers go instead

Use the **My Account** page. Its sections are documented here:

- [My Bookings](./my-bookings)
- [My Favorites](./my-favorites)
- [Payment History](./payment-history)

## Developer Notes

- **HTML Structure:** The notice is wrapped in `.mhm-rentiva-retired-dashboard`; the administrator notice is `.mhm-rentiva-retired-dashboard__admin`.
- **Filter:** `mhmrentiva_retired_dashboard_notice` filters the printed markup (`$html`, `$role` = `customer` or `admin`).
- **Removed in 6.2.0:** the customer dashboard classes (`CustomerDashboard`, `DashboardConfig`, `DashboardContext`, `DashboardDataProvider`, `DashboardNavigation`) and the `mhmrentiva_dashboard_*` hooks. See the [6.2.0 release post](/blog/rentiva-v6.2.0-release).

## Changelog
| Date | Version | Note |
|---|---|---|
| 11.10.2026 | 6.2.0 | Page rewritten: the customer dashboard is retired; customers use My Account. |
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.0-docs | Page alphabetized and image placeholder added. |
