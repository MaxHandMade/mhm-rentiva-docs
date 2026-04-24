---
id: emails
title: Emails & Notifications
sidebar_label: Email Configuration
sidebar_position: 5
slug: /core-configuration/emails
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

MHM Rentiva includes an advanced email notification system that keeps both the administrator and the customer informed at every step of the booking process. You can fully customize these templates from the **MHM Rentiva > Settings > Emails** tab.

---

## 📧 General Email Configuration

Configure the basics so all emails look professional:
- **Sender Name & Address:** The name and email your customers will see in their inbox.
- **Email Logo:** The company logo that appears at the top of email templates.
- **Primary Color:** Set a HEX code that matches your brand for buttons and headings.

:::important SMTP Recommendation
WordPress's default `mail()` function often causes emails to land in the "Spam" folder. For reliable delivery, we strongly recommend connecting an SMTP server — such as SendGrid, Mailgun, or your own — using a plugin like **WP Mail SMTP**.
:::

---

## 📝 Template Variables (Placeholders)

Use the following dynamic tags to personalize templates. The system replaces these tags with real data when sending the email:

| Tag | Description |
| :--- | :--- |
| `{customer_name}` | The customer's full name. |
| `{booking_id}` | Unique booking number. |
| `{vehicle_name}` | The title of the rented vehicle. |
| `{total_price}` | Total rental cost (with currency symbol). |
| `{pickup_date}` | The date and time of vehicle pickup. |
| `{site_title}` | Your website's name. |

---

## 🧪 Testing & Preview

Always verify your template changes before publishing them live:
1. **Preview:** Use the "Preview" button on the template editor screen to review the design in your browser.
2. **Send Test Email:** Send a real test message to a specified email address to check mobile compatibility.

---

### 🖼️ IMAGE: EMAIL TEMPLATE EDITOR
*(MHM Rentiva > Settings > Emails tab — visual template editor screen)*

---

---

## Technical Note: Email Logs

The plugin records all sent emails under the `EmailLog` custom post type (CPT). If a customer says "I didn't receive an email," you can verify from the WordPress admin whether the email was dispatched by checking these logs.

```php
// Use the Mailer class for programmatic email sending:
Mailer::send($to, $subject, $template_id, $data);
```

---

### Section Summary
- **SMTP usage** is critical for successful delivery.
- Templates can be personalized with **dynamic tags**.
- All sends can be tracked under **Email Log**.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | English translation added. |
| 18.03.2026 | 4.21.2 | Content updated to hybrid model; SMTP notes added. |
| 26.02.2026 | 4.21.0 | Initial version created. |
