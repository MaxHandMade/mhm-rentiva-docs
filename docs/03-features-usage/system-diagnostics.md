---
id: system-diagnostics-usage
title: System Health and Settings Test
sidebar_label: System Health
sidebar_position: 18
slug: /features-usage/system-diagnostics
---

![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

System Health and Settings Test lets you verify that all components of the plugin (Payment gateways, Email, Cron jobs, Vehicle inventory) are working correctly. Access it via **MHM Rentiva > Settings > Settings Test** tab.

Running these tests periodically is recommended to keep your business running smoothly.

---

## Category-Based Tests

The diagnostics system scans your business under the following headings:

- **Email Delivery:** Tests whether notifications are reaching customers.
- **Directory Write Permissions:** Checks folder permissions for vehicle images and report outputs.
- **Critical Page Links:** Verifies that the search, booking, and payment pages are live.
- **WP Cron Status:** Monitors whether scheduled tasks (Reminders, Payout calculations) are queued correctly.

---

### 🖼️ IMAGE: SYSTEM DIAGNOSTICS REPORT
*(Settings test page and success/error notifications)*

---

## Error Resolution and Actions

When a test fails, the system offers the following solutions:
- **One-Click Fix:** If the issue is simple — such as a missing page — it creates the page automatically.
- **Detailed Log:** Shows the technical detail of the error (e.g. server error 500) to make it easier to get support.
- **Re-scan:** After resolving the issue, run the test again to verify the status.

---

### Section Summary
- **Operational Assurance:** Prevent customer loss caused by misconfigurations.
- **Quick Diagnosis:** Determine in seconds whether a problem is server-side or configuration-side.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Documentation synchronized with the current plugin release. |
| 19.03.2026 | 4.21.2 | System Health and Settings Test usage guide created. |
