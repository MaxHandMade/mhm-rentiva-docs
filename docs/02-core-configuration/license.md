---
id: license-management
title: License Management
sidebar_label: License Management
sidebar_position: 8
slug: /core-configuration/license
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

MHM Rentiva (Lite) is free and needs no license key. **Rentiva Pro** is a separate add-on plugin, and its features (VIP Transfer, Messaging, Advanced Reports, the vendor marketplace and more) need a valid license key. With Pro installed, manage your key via the **MHM Rentiva > License** menu.

---

## 💻 Local and staging environments

**A valid license key is required in every environment**, including local and staging sites.

Earlier versions unlocked Pro automatically on hosts ending in `.dev`, `.local`, `.test`, `.staging` or `.localhost` ("Developer Mode"). That was removed in **5.0.0**: `.dev` is a real, publicly registrable domain, so a production site could end up with paid features unlocked by accident. A feature is now granted only by a signed license token that verifies — there is no constant, option or filter that opens one without it.

To work on a local or staging copy, activate your license there as you would on any other site. If you need the key on more than one site at once, deactivate it on the site you are finished with first (see below).

---

## 🟢 License Status & Activation

The page's admin panel is divided into three main blocks:

1. **License Status:**
   Shows the validity of the current license. When the license is active, the page shows **"✅ Pro License Active"** and, below it, a line listing the Pro features your license actually grants, for example *"Active Pro features: Vendor & Payout, Advanced Reports, Messages, Expanded Export"*. Without an active license it shows **"⚠️ Lite Version Active"** and asks for your key.

2. **License Activation:**
   Paste the license key you purchased into the `XXXX-XXXX-XXXX-XXXX` format field and click the **"Activate License"** button. The API validates instantly.

3. **License Management (Release):**
   If you want to move the plugin to another website (domain), or deactivate a real license for testing or cancellation, use the **"Deactivate License"** button at the bottom. Otherwise, you may receive an activation error (Too many activations) on the new domain.

---

## 💎 What Lite includes and what Pro adds

Lite has **no vehicle, booking, customer or add-on caps, no feature timers and no locked screens**. Pro does not raise any limit in Lite; it adds its own modules. Each Pro module opens only when your license includes it.

| Area | Included in Lite | Adds with Pro |
| :--- | :--- | :--- |
| **Vehicles, bookings, customers, add-ons** | As many as you need, no caps | Nothing extra (there is no limit to lift) |
| **Vehicle gallery** | Up to the number of images set in the settings (default 50 per vehicle) | Nothing extra |
| **Dashboard** | Stat cards, revenue chart, recent bookings, upcoming operations, status and payment summaries | Nothing extra |
| **Reports** | Dashboard metrics only | The **Reports** screen: revenue, booking and customer reports |
| **Export** | Customer list as CSV | **Expanded Export**: bookings, vehicles and logs as CSV or JSON, with filters |
| **Email** | 14 editable templates (booking, status, cancellation, reminder, refund, welcome, offline receipt, remaining payment) | Extra templates for Pro's own modules (vendors, listings, payouts, messages) |
| **Messaging** | Contact form and the Contact Messages screen | **Messages**: customer and admin conversations, also in the customer's My Account |
| **Vendor marketplace & payouts** | — | Vendor applications, vendor panel, commissions, payouts and vendor reports |
| **VIP Transfer** | — | Locations, routes, transfer search and booking (opens with any active Pro license) |
| **Privacy / GDPR** | Personal data export and erasure in the WordPress privacy tools (bookings, contact messages, e-mail log, account details, application log) and the policy guide text | The My Account consent card and data requests, export and erasure of Pro's messages, vendor data and consent records, data retention cleanup (see [Privacy and Personal Data](../03-features-usage/privacy-personal-data.md)) |

---

## ⏰ Renewal reminder and connection problems (Pro)

- **Renewal reminder:** In the last 14 days before the license expires, a notice names the **expiry date** and has a **Manage license** button that opens the License page. It shows only on the Rentiva screens, on **Plugins** and on the WordPress dashboard, not on every admin page. **Remind me in 3 days** hides it for you for three days; the button is offered only while at least four days remain, and on the last day the reminder always shows.
- **License server problems:** If the license server cannot be reached, answers with a temporary fault (HTTP 5xx) or a rate limit (HTTP 429), or the answer is not the server's own (for example a captive-portal page), Pro does not switch off: it keeps working for up to **seven days** after the last successful license check and shows a **Connection Warning** notice.
- **Longer than seven days:** If the license still cannot be verified after seven days, Pro **pauses** its features and shows a notice with a **Check now** button. The activation is kept: the features come back on their own at the next successful check (the scheduled check runs every six hours, and opening the License page checks at once), so you do not need to activate again.
- **A real refusal:** Any refusal from the license server (for example an invalid, revoked or unknown license) still deactivates Pro.

:::info Changed in Pro 6.5.0
The renewal reminder names the expiry date, links the License page and no longer appears on every admin page.
:::

:::info Changed in Pro 6.5.1
When the license cannot be verified for more than seven days, Pro pauses instead of removing the site's activation, and comes back by itself at the next successful check.
:::

---

### Section Summary
- Lite works without a license and has no caps; a license key unlocks only Rentiva Pro's modules.
- Your license is activated or deactivated in one step from the **MHM Rentiva > License** menu.
- A valid license is required everywhere, including local and staging sites — as of 5.0.0 there is no environment that unlocks Pro without one.
- Before moving a domain, always release the old license using the **Deactivate** button.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 19.11.2026 | Pro 6.5.1 | Pause after seven days without a verified license, and recovery without activating again, documented. |
| 18.11.2026 | 6.4.0 / Pro 6.5.0 | Renewal reminder, seven-day allowance during license server problems and the Privacy / GDPR split between Lite and Pro documented. |
| 09.11.2026 | 6.3.1 | Correction: Lite has had no vehicle, booking, customer or add-on caps since 5.2.0. The old "Lite (Limit) / Pro (Unlimited)" table was replaced with what Lite includes and what Pro adds, checked against the plugin code. "Full REST API" and "Email Notifications" were removed as Pro-only items. |
| 23.04.2026 | 4.27.2 | English translation added. |
| 27.03.2026 | 4.23.0 | Lite limits updated (vehicles: 3→5, customers: 3→10, gallery: 3→5). Pro-only features separated: Vendor & Payout, GDPR, Email Notifications. |
| 19.03.2026 | 4.21.2 | License management guide modernized with visuals and technical notes. |
| 26.02.2026 | 4.21.0 | Initial version created. |
