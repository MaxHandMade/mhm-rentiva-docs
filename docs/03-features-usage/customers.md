---
id: customers
title: Customer Management
sidebar_label: Customers
sidebar_position: 10
slug: /features-usage/customers
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Customer Management is the central section for building a loyal customer base and tracking booking history. Access the full customer database via **MHM Rentiva > Customers**.

---

## 📊 Customer Analytics (Top Metrics)

At the top of the page, four main cards display the growth and activity of your customer base:

:::info Lite Notice Position (v4.22.2)
In the Lite edition, the limit notice is now positioned **below** the KPI cards, **before** the list begins. This standardization applies to `VehicleColumns`, `BookingColumns`, `CustomersPage`, and `TransferAdmin`.
:::

- **Total Customers:** The number of all users registered in the system.
- **Active Customers:** Users who have made a booking or logged in within the last 30 days.
- **New This Month:** The number of new customers who registered in the current month.
- **Monthly Average:** The change rate (%) in the monthly registration trend compared to the previous month.

---

## 🗓️ Customer Activity Calendar

The calendar on the Customers page visualizes daily customer interactions (new registrations or activity volume). This lets you see at a glance which days have the highest customer traffic.

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>📸 IMAGE: CUSTOMER LIST AND ANALYTICS PANEL</strong><br/>
  <em>mhm-rentiva-customer-list-analytics</em>
</div>

---

## 👥 Customer List and Financial Summary

The customer table lets you measure the value (LTV - Lifetime Value) each user brings to your business:

- **Bookings:** Total number of rental/transfer transactions completed by the customer.
- **Total Spent:** Total revenue generated from all of the customer's transactions (with currency symbol).
- **Last Booking:** The date of their most recent transaction.
- **Registration Date:** The date they first joined the system.

---

## ➕ Adding a New Customer

The manual customer registration screen is streamlined for operational speed. Click **"Add New Customer"** to enter the following data:

- **Customer Name:** (Required)
- **Email:** (Required) — the unique identifier in the system.
- **Phone:** For communication purposes.
- **Address:** Basic address information for billing or delivery point identification.

---

### Section Summary
- Monitor customer growth with **Analytics Cards**.
- Identify your VIP customers with the **Total Spent** column.
- Associate all bookings with customers via the **Central Database**.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Documentation synchronized with the current plugin release. |
| 27.03.2026 | 4.23.0 | Lite notice position (below KPI cards) documented. |
| 19.03.2026 | 4.21.2 | Customer list, analytics cards, and registration form updated against the real interface. |
| 26.02.2026 | 4.21.0 | Initial version created. |
