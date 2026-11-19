---
id: notification-templates
title: Notification Templates
sidebar_label: Notification Templates
sidebar_position: 9
slug: /core-configuration/notification-templates
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

The Notification Templates tab is the hub where you can customize, test, and restore all email content (HTML) sent to customers and administrators — including returning to the "Gold Standard" design. Access it via **MHM Rentiva > Settings > Notification Templates**. If a field is empty, the system uses the Gold Standard layout.

---

## 🛠️ Management Tools

Two critical buttons appear in the top-right of the page:
- **Email Settings:** Provides quick access to global settings such as sender name and color.
- **Restore Gold Standard:** Used to fix errors in templates or revert to the original professional design.

---

## 📂 Template Categories

Notifications are grouped under tabs:

### 1. Booking Notifications
Core messages related to the customer's rental process. Each one has its own **Enabled** switch (where it applies), **Subject** and **Content (HTML)**:
- **New Booking Email:** Sent to the customer when a booking is created. Its default subject is "Booking Received: #…" — the booking is received, not yet confirmed; the confirmation reaches the customer through the status email when the payment arrives.
- **Booking Status Change Email:** Status updates such as Confirmed or Pending.
- **Admin Notification Email:** The alert sent to you when a new booking arrives (you choose the recipient address).
- **Auto Cancel Email:** Sent when the payment period expires.
- **Manual Cancellation Email:** Sent when staff cancel a booking.
- **Pickup Reminder Email:** Sent shortly before pickup; lists the pickup and the return.
- **Customer Welcome Email:** Sent after the customer's first booking.

The subject and content you see in these fields are exactly what is sent. If you saved the settings screen with an earlier default subject, the new default is shown and used; a subject you wrote yourself is kept.

### 2. Refund Emails
Templates specific to refund processes:
- **Customer Refund Email:** The refunded amount, the booking number and how the money reaches the customer.
- **Admin Refund Email:** Information sent to the administrator for accounting and operational tracking.

When a refund is paid back by hand (bank transfer, cash), the customer receives Rentiva's "the refund will be transferred to you manually" email instead of the WooCommerce "your order has been refunded" email. If Rentiva's email is switched off, or the booking has no valid address, WooCommerce's email is sent as before. For a refund the payment gateway returns itself, the WooCommerce email is unchanged. When you confirm the hand transfer of a refund, the customer gets a second email: "…your refund has been transferred to you", with the transfer reference if you entered one.

### 3. Message and Vendor Notifications (Pro)
> These tabs appear when **MHM Rentiva Pro** is active.

- **Message Notifications:** New message alert to staff, the reply email to the customer and the automatic acknowledgment.
- **Vendor Notifications:** Emails for the vendor marketplace.

### 4. Email Preview
See below.

---

## 🔍 Email Preview & Testing

Use the **Email Preview** tab to check the live state of templates:
- **Live Preview:** Shows how the email will appear in the customer's inbox.
- **Send Test:** Select a specific template and send a "Test Email" to any address to verify delivery.

---

## 🏷️ Available Dynamic Tags (Placeholders)

Add the following codes within `{}` brackets in template content to have data populated automatically. The tag list is also printed above each tab. The full list is on the [Emails & Notifications](./emails.md) page:
- `{booking_id}`: Booking number.
- `{vehicle_title}`: Vehicle name.
- `{pickup_date}` / `{dropoff_date}`: Dates.
- `{pickup_time}` / `{return_time}`: Times.
- `{pickup_datetime}` / `{return_datetime}`: Date and time together (date alone if no time is stored).
- `{total_price}`: Total amount.
- `{contact_name}` / `{salutation_name}`: Customer name; the second is meant for greetings and prints "valued customer" when there is no name.
- `{site_name}`: Your site's name.

---

## ✉️ Sending an email to a customer from a booking

On a booking's edit screen, the **Send Email to Customer** box lets you pick a type — Booking confirmation, Booking reminder, Booking cancellation or Custom message. The subject and body are filled in from the template here and you can change them before sending. An unchanged template goes out exactly like the automatic email; if you change the subject, that becomes the email's title. If sending is switched off or test mode is on, the box tells you; if the customer has turned notifications off, a note is added. The send is recorded in the booking history.

---

![Settings > Notification Templates tab](/img/docs/screens/settings-email-templates.webp)

*Settings > Notification Templates tab, template list and preview tool*

---

### Section Summary
- Start with a professional email design using the **Gold Standard**.
- Personalize messages with **Dynamic Tags**.
- Use the **Preview Tool** to fix errors before publishing.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 18.11.2026 | 6.4.0 | Template types, date-and-time tags, `{salutation_name}`, new-booking subject "Booking Received", refund emails for hand refunds, and the "Send Email to Customer" box documented. |
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Notification Templates documentation created with 4 tabs and preview tool details. |
