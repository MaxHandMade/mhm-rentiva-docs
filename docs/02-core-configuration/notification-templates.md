---
id: notification-templates
title: Notification Templates
sidebar_label: Notification Templates
sidebar_position: 9
slug: /core-configuration/notification-templates
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

The Notification Templates tab is the hub where you can customize, test, and restore all email content (HTML) sent to customers and administrators — including returning to the "Gold Standard" design. Access it via **MHM Rentiva > Settings > Notification Templates**.

---

## 🛠️ Management Tools

Two critical buttons appear in the top-right of the page:
- **Email Settings:** Provides quick access to global settings such as sender name and color.
- **Restore Gold Standard:** Used to fix errors in templates or revert to the original professional design.

---

## 📂 Template Categories

Notifications are grouped under four main tabs:

### 1. Booking Notifications
Core messages related to the customer's rental process:
- **New Booking (Customer):** Sent the moment a booking is created.
- **Status Change:** Status updates such as Confirmed, Pending.
- **Admin Notification:** The alert sent to you when a new order arrives.
- **Cancellation Messages:** Manual or payment-timeout (automatic) cancellation scenarios.
- **Reminders & Welcome:** Pre-delivery reminder and post-registration "Welcome" messages.

### 2. Refund Emails
Templates specific to refund processes:
- **Customer Refund Info:** Details of the refunded amount and booking number.
- **Admin Refund Alert:** Information sent to the administrator for accounting and operational tracking.

### 3. Message Notifications
Messaging system (Pro feature) alerts:
- **New Message:** Admin notification for questions received from customers.
- **Message Reply:** Email sent when your response reaches the customer.
- **Auto-Reply:** Confirmation message sent to the customer when their message is received.

---

## 🔍 Email Preview & Testing

Use this tab to check the live state of templates:
- **Live Preview:** Shows in real time on the right side how the email will appear in the customer's inbox (responsive).
- **Send Test:** Select a specific template and send a "Test Email" to any address to verify delivery.

---

## 🏷️ Available Dynamic Tags (Placeholders)

Add the following codes within `{}` brackets in template content to have data populated automatically:
- `{booking_id}`: Booking number.
- `{vehicle_title}`: Vehicle name.
- `{pickup_date}` / `{dropoff_date}`: Date information.
- `{total_price}`: Total amount.
- `{contact_name}`: Customer name.
- `{site_name}`: Your site's name.

---

### 🖼️ IMAGE: NOTIFICATION TEMPLATES PANEL
*(Settings > Notification Templates tab, template list and preview tool)*

---

### Section Summary
- Start with a professional email design using the **Gold Standard**.
- Personalize messages with **Dynamic Tags**.
- Use the **Preview Tool** to fix errors before publishing.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Notification Templates documentation created with 4 tabs and preview tool details. |
