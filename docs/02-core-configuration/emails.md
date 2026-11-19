---
id: emails
title: Emails & Notifications
sidebar_label: Email Configuration
sidebar_position: 5
slug: /core-configuration/emails
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

MHM Rentiva includes an email notification system that keeps both the administrator and the customer informed at every step of the booking process. The sender details and look of the emails are set on **MHM Rentiva > Settings > Email**; the content of each email is edited on **MHM Rentiva > Settings > Notification Templates**.

---

## 📧 General Email Configuration

Configure the basics so all emails look professional (see [Email Configuration](./email-configuration.md) for every field):
- **Sender Name & Sender Email:** The name and address your customers will see in their inbox.
- **Header Image (Logo URL):** The company logo that appears at the top of emails.
- **Base Color:** A color that matches your brand for buttons and headings.

:::important SMTP Recommendation
WordPress's default `mail()` function often causes emails to land in the "Spam" folder. For reliable delivery, we strongly recommend connecting an SMTP server — such as SendGrid, Mailgun, or your own — using a plugin like **WP Mail SMTP**.
:::

---

## 📝 Template Variables (Placeholders)

Use the following dynamic tags to personalize templates. The system replaces these tags with real data when sending the email:

| Tag | Description |
| :--- | :--- |
| `{salutation_name}` | The customer's name for a greeting ("`Dear {salutation_name},`"). When the booking has no name it prints "valued customer", so a customer never reads "Dear ,". |
| `{contact_name}` / `{customer_name}` | The customer's full name. |
| `{contact_email}` | The customer's email address. |
| `{booking_id}` | The booking number shown to the customer (the order number when there is one). |
| `{vehicle_title}` | The title of the rented vehicle. |
| `{pickup_date}` | The pickup date. |
| `{dropoff_date}` / `{return_date}` | The return date. |
| `{pickup_time}` | The pickup time. |
| `{return_time}` / `{dropoff_time}` | The return time. |
| `{pickup_datetime}` | The pickup date and time together, for example "01/07/2099, 10:00". Prints the date alone when no time is stored. |
| `{return_datetime}` / `{dropoff_datetime}` | The return date and time together; the date alone when no time is stored. |
| `{total_price}` | Total rental cost (with currency symbol). |
| `{status}` | The booking status. |
| `{site_name}` | Your website's name. |
| `{site_url}` | Your website's address. |
| `{my_account_url}` | The customer's My Account page. |

Refund emails also accept `{amount}`, `{currency}` and `{reason}`.

:::info Dates and times
Dates and times in emails follow your site's date format, time format, time zone and language (**Settings > General** in WordPress), and the default reservation emails print the date together with the time next to it. The reminder email lists both the pickup and the return, and the cancellation email prints the dates too.
:::

---

## 🧪 Testing & Preview

Always verify your template changes before publishing them live:
1. **Preview:** Use the **Email Preview** tab on the Notification Templates page to see the design in your browser.
2. **Send Test Email:** Send a real test message to a specified email address to check mobile compatibility.

---

![Settings > Notification Templates tab, template editor](/img/docs/screens/settings-email-templates.webp)

*MHM Rentiva > Settings > Notification Templates tab — template editor screen*

---

## Technical Note: Email Logs

When **Enable Communication Logs** is on, the plugin records sent emails under the `EmailLog` custom post type (CPT). If a customer says "I didn't receive an email," you can verify from the WordPress admin whether the email was dispatched by checking these logs.

```php
// Use the Mailer class for programmatic email sending:
Mailer::send($to, $subject, $template_id, $data);
```

---

### Section Summary
- **SMTP usage** is critical for successful delivery.
- Templates can be personalized with **dynamic tags**.
- All sends can be tracked in the email log.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 18.11.2026 | 6.4.0 | Placeholder list now matches the plugin (`{salutation_name}`, time and date-time tags added; `{vehicle_name}` and `{site_title}` removed: they are not supported); date and time follow the site's format; setting names corrected. |
| 23.04.2026 | 4.27.2 | English translation added. |
| 18.03.2026 | 4.21.2 | Content updated to hybrid model; SMTP notes added. |
| 26.02.2026 | 4.21.0 | Initial version created. |
