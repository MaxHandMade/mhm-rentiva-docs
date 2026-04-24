---
id: cron-monitor
title: Cron Job Monitor
sidebar_label: Cron Job Monitor
sidebar_position: 15
slug: /core-configuration/cron-monitor
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

The Cron Job Monitor tab is the administration area where you monitor in real time the status of the automated tasks (scheduled operations) that MHM Rentiva runs in the background. Access it via **MHM Rentiva > Settings > Cron Job Monitor**.

The plugin uses the WP-Cron system for operations such as email delivery, booking cancellations, and data cleanup.

---

## 🕒 Core Tracked Tasks

From this panel you can view all plugin-specific queues and scheduled jobs:

- **Automatic Booking Cancellation:** Automatically removes from the system any bookings awaiting payment that have timed out.
- **Email Queue:** Queues and sends confirmation, reminder, or thank-you messages due to customers.
- **Data Retention Policies:** Cleans up old logs and transient data according to the retention periods defined in Settings.
- **License & Update Check:** Performs periodic license validation and checks for new plugin versions.

---

### 🖼️ IMAGE: CRON JOB MONITOR PANEL
*(Settings > Cron Job Monitor tab — active task list and "Run Now" buttons)*

---

:::tip Manual Intervention
If a task appears "Scheduled" but seems stuck, or if you need it to run immediately, press the **"Run Now"** button next to the relevant job to trigger it manually.
:::

---

### Section Summary
- Use **Background Transparency** to see which tasks the system will perform and when.
- **Simplify Error Detection** — a non-running cron job can halt email delivery.
- Maintain **Operational Control** by manually triggering critical tasks (e.g., Cancellation) whenever needed.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Cron Job Monitor documentation created as a standalone page. |
