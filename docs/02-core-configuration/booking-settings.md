---
id: booking-settings
title: Booking Management (Settings)
sidebar_label: Booking Management
sidebar_position: 3
slug: /core-configuration/booking-settings
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

The Booking Management tab is where you configure the timing rules of the rental process, automatic cancellation mechanisms, and email notification preferences. Access it via **MHM Rentiva > Settings > Booking Management**.

---

## 📋 Basic Booking Settings

- **Default Rental Days:** The default rental duration pre-selected on the frontend booking form before a date is chosen (e.g., 1 Day).

---

## ⏳ Time Management Settings

The lifecycle and operational lead times of bookings are managed here.

- **Cancellation Deadline (Hours):** Defines how many hours before the booking start time the customer retains the right to cancel (e.g., 24 Hours).
- **Payment Deadline (Minutes):** The time allowed to complete payment after a booking is created. Entering `0` disables the time limit.
- **Enable Auto-Cancel:** Automatically moves bookings whose payment period has expired to "Cancelled" status.
- **Buffer Time (Minutes):** A "preparation and cleaning" gap inserted between two bookings. During this period the vehicle appears as busy in the calendar.

---

### 🖼️ IMAGE: BOOKING TIME MANAGEMENT
*(Settings > Booking Management tab, cancellation and payment deadline fields)*

---

## 🔔 Notification Settings

Controls the automatic email notifications sent at critical steps in the process.

- **Send Confirmation Emails:** Sends the customer an automatic notification when a booking is confirmed.
- **Send Reminder Emails:** Sends the customer a reminder email before the booking start time.
- **Admin Notifications:** Sends the site administrator an email notification when a new booking is created.
- **Send Auto-Cancel Email:** Notifies the customer when a booking is cancelled automatically due to payment timeout.

---

## 📜 Rental Agreement

An agreement the customer reads and accepts on the booking form before booking.

- **Require rental agreement:** When on, customers must accept the agreement before booking. The time and the version of the text they accepted are saved with the booking. Off by default, so a site that updates keeps its booking form as it was.
- **Agreement text:** Leave empty to use the built-in template (seven sections, translated for Turkish sites). The template is a starting point, not legal advice: review it and adapt it to your business and local law. Formatting: `# Heading`, `**bold**`, `- list item`, `---` line.

What happens when it is on:

- The booking form shows a scrollable **Rental agreement** box under the additional services, with an "I have read and accept the rental agreement." checkbox. A booking without the tick is refused, in the browser and on the server. See [Booking Form](../03-features-usage/shortcodes/booking-form.md).
- If you change the text, a customer whose page was open or cached before the change is asked to reload the page and review the new text.
- On the booking edit screen, the **Customer Account** box shows "Rental agreement: Accepted" with the date and the version. A booking you entered by hand shows "No acceptance (admin booking)".
- The acceptance is included in the personal data export (as "Rental agreement accepted").
- The agreement is not shown for transfer bookings.

---

## 💡 Technical Notes

:::important Cron Dependency
The "Auto-Cancel" and "Reminder Emails" features require the WordPress Cron system to be active. You can monitor these tasks from the **Settings > Cron Job Monitor** tab.
:::

---

### Section Summary
- Use **Time Management** to clarify payment and cancellation rules.
- Use **Buffer Time** to allow time for operational preparation.
- Use **Automatic Notifications** to automate communication between customers and administrators.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 18.11.2026 | 6.4.0 | Rental agreement section added. |
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Booking Management documentation updated based on panel screenshot and code analysis. |
