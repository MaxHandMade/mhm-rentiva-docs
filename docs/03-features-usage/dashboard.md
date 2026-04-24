---
id: dashboard
title: Dashboard
sidebar_label: Dashboard
sidebar_position: 2
slug: /features-usage/dashboard
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

The Dashboard is the heart of MHM Rentiva. It lets you see your business's real-time status, financial performance, and pending operational tasks on a single screen. Access it via **MHM Rentiva > Dashboard**.

This is the first screen you see after installing the plugin, and it presents the critical metrics you need to make data-driven decisions.

<div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', backgroundColor: '#f9fafb', textAlign: 'center', margin: '20px 0' }}>
  <p style={{ margin: 0, color: '#6b7280', fontWeight: 'bold' }}>🖼️ IMAGE: DASHBOARD AND BOOKING CALENDAR</p>
  <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#9ca3af' }}>mhm-rentiva-dashboard-calendar-view</p>
</div>

---

## 📊 Summary Statistics Cards (Real-time Metrics)

At the top of the panel, performance data for the current month (or selected period) is displayed as icon cards:

- **Monthly Booked Vehicles:** The number of vehicles that received bookings and their total booking count.
- **Inactive Vehicles:** The number of vehicles currently closed to rental or in a passive state.
- **Vehicles Under Maintenance:** The number of vehicles marked as in technical service or maintenance mode.
- **Avg. Monthly Revenue:** Total turnover for the selected month and the growth/decline rate (%) compared to the previous month.

---

## 📅 Monthly Booking Calendar

The interactive calendar at the center of the Dashboard visualizes the occupancy rate of your entire fleet.

- **Vehicle Rows:** The left column lists vehicles (Model and Plate).
- **Status Colors (Legend):**
  - <span style={{color: '#facc15'}}>●</span> **Pending:** Bookings not yet confirmed.
  - <span style={{color: '#3b82f6'}}>●</span> **Confirmed:** Transactions approved by payment or by an admin.
  - <span style={{color: '#f97316'}}>●</span> **In Progress:** Transactions where the vehicle is currently with the customer.
  - <span style={{color: '#22c55e'}}>●</span> **Completed:** Bookings where the rental process has successfully concluded.
  - <span style={{color: '#ef4444'}}>●</span> **Cancelled:** Cancelled records.
- **Interactive Navigation:** Use the month buttons to quickly jump to past and future periods.

---

## 🔍 Booking Details Panel

Clicking (or hovering over) any booking cell on the calendar opens a detailed pop-up:

- **Customer Information:** Name, Email, and Phone.
- **Date and Time:** Pickup and return times.
- **Financial Summary:** Total booking amount.
- **Quick Access:** The "Edit Booking" button takes you directly to the transaction page.

---

## 🛠️ Interactive Features

The Dashboard offers these quick tools for a better user experience:

- **Export:** Download statistics or lists in report format.
- **Widget Editing:** Use Screen Options to choose which cards are visible.
- **Cache Management:** Use "Clear Cache" to get an instant database snapshot.

---

## v4.23.0 Widget Audit and Improvements

In v4.23.0, a comprehensive audit and improvement of Dashboard widgets was carried out:

### Bug Fixes
- **Timezone consistency:** `current_time('timestamp')` is now used instead of `time()` in countdown and upcoming operations widgets to align with WordPress timezone settings.
- **Cache invalidation:** A cache key prefix mismatch in the statistics widget was fixed (`mhm_dashboard_stats` → `mhm_rentiva_dashboard_stats`).
- **Status synchronization:** `updated_post_meta` + `added_post_meta` hooks were added to ensure status consistency on meta updates.
- **WooCommerce email images:** Vehicle images now display correctly in booking confirmation emails.
- **Calendar popup time info:** Pickup and return times were added to the booking detail popup.
- **ID mismatch:** WooCommerce order ID and booking ID mapping was corrected.

### Design Improvements
- **Statistics cards:** Redesigned with a 2×2 grid, icons, and color coding.
- **Revenue chart:** Date format localized, cancelled bookings added as a red dashed dataset.
- **Messages widget:** Self-contained inline CSS, badge, avatar initials, and "time ago" display.
- **Upcoming operations:** Time info, display ID, and clickable link support added.

### Lite Restrictions
- The **Revenue Chart** and **Upcoming Operations** widgets are now Pro-only (`Mode::canUseAdvancedReports()`).

---

### Section Summary
- Monitor your fleet's 30-day projection with the **Dashboard**.
- Use **Color Codes** to instantly see which vehicle is available on which date.
- Reach booking details in seconds with **Customer Cards**.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Documentation synchronized with the current plugin release. |
| 26.03.2026 | 4.23.0 | 11 widget bug fixes, timezone consistency, cache fix, design improvements, and Lite gating added. |
| 19.03.2026 | 4.6.3 | Dashboard guide updated with real interface metrics and calendar details. |
