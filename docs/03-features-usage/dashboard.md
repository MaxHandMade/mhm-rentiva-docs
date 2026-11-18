---
id: dashboard
title: Dashboard
sidebar_label: Dashboard
sidebar_position: 2
slug: /features-usage/dashboard
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

The Dashboard shows your business at a glance: booking figures, what is still owed, the next seven days and quick shortcuts. Access it via **MHM Rentiva > Dashboard**. The page title reads "Dashboard" with the subtitle "MHM Rentiva · Overview".

<div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', backgroundColor: '#f9fafb', textAlign: 'center', margin: '20px 0' }}>
  <p style={{ margin: 0, color: '#6b7280', fontWeight: 'bold' }}>🖼️ IMAGE: DASHBOARD</p>
  <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#9ca3af' }}>mhm-rentiva-dashboard-calendar-view</p>
</div>

---

## 📊 Summary Cards

Four cards sit at the top. They show all-time figures with this month's figure and the change against last month:

- **Total Bookings:** all bookings except cancelled and refunded ones, with this month's count.
- **Bookings Value:** the price of confirmed, in-progress and completed bookings. It is the amount booked, not money collected; what is still owed is in the **Payments** box.
- **Active Vehicles:** vehicles that are currently active, out of your total.
- **Renting this month:** the number of different customers who made a booking this month (cancelled and refunded bookings are not counted).

:::info Changed in 6.4.0
Cancelled and refunded bookings are no longer counted in **Total Bookings**, this month's count or **Renting this month**; they appear in the **Booking Statuses** box. The "Total Revenue" card is now **Bookings Value**, and the non-working "Last 30 days" selector in the top right was removed.
:::

---

## 📈 Charts and Lists

- **New Bookings Value (Last 7 Days):** a bar chart of the booked amount per day for the last seven days, with the total under **This week**. Days are counted by the date the booking was created, not the rental date.
- **Recent Bookings:** the latest bookings, newest created first, with Vehicle, Customer, Date, Amount and Status columns, and **← Prev / Next →** paging.
- **Upcoming Operations:** rentals (vehicle, plate, pickup → return dates, customer and status) and transfers (Pro) that start in the next 7 days ("No upcoming operations in the next 7 days." when there are none).
- **Booking Statuses:** the number of bookings in each status, cancelled and refunded ones included.
- **Payments:** two figures.
  - **Pending payment:** what bookings still owe, counted the way the **Payment** column of the booking list shows it: the remaining balance after a deposit, bookings that have not been paid at all (including offline bookings), and bookings awaiting payment. Cancelled, refunded and fully paid bookings owe nothing.
  - **Deposit (held):** deposits of confirmed and in-progress bookings that were taken as a deposit.

---

## ⚡ Quick Actions

Shortcuts to **Add New Booking**, **All Bookings**, **Add New Vehicle**, **All Vehicles**, **Settings**, **Customers** and **Additional Services**. Rentiva Pro adds shortcuts to its own screens (Reports, Vendors, Messages, Export); each one appears only when your license includes that feature.

---

## Lite and Pro

Every dashboard box works in Lite. No box is held back for Pro.

---

### Section Summary
- The cards and boxes count what was **booked**; **Pending payment** shows what is still owed.
- Cancelled and refunded bookings are left out of the totals and shown under **Booking Statuses**.
- The dashboard is the first screen you see after installing the plugin.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 18.11.2026 | 6.4.0 | Dashboard rewritten for the current screen: Bookings Value card, cancelled bookings no longer counted, Pending payment includes deposit balances and unpaid offline bookings, newest created bookings first, "Last 30 days" selector removed. |
| 09.11.2026 | 6.3.1 | Correction: the Revenue Chart and Upcoming Operations are not Pro-only; every dashboard widget works in Lite. Pro's quick-action shortcuts are noted. |
| 10.05.2026 | 4.36.0 | Full React SPA migration. Legacy PHP widgets removed. |
| 19.03.2026 | 4.6.3 | Dashboard guide updated with real interface metrics. |
