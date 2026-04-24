---
id: booking-settings
title: Booking Management (Settings)
sidebar_label: Booking Management
sidebar_position: 3
slug: /core-configuration/booking-settings
---

![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

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
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Booking Management documentation updated based on panel screenshot and code analysis. |
