---
id: customers
title: Customer Management
sidebar_label: Customers
sidebar_position: 10
slug: /features-usage/customers
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info React SPA (since v4.39.0)
The Customers page was fully migrated to a **React SPA** backed by REST API in v4.39.0. Legacy `CustomersListTable.php`, `CustomersListPage.php`, `customers.js`, and related CSS files were deleted. The page now loads instantly with live search, sortable columns, a slide-in detail panel, and bulk delete — all without page reloads.
:::

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

## 🖱️ Customer Detail Slide Panel (v4.39.0+)

Click any row in the customer table to open a **slide-in detail panel** without a page reload:

- **Name, Email, Phone, Address**
- **Registered date**
- **Total Bookings** and **Total Spent**
- **First / Last Booking** dates
- Quick links: **Edit Customer**, **View Bookings**

Press **Escape** or click outside the panel to close it.

---

## 🔍 Live Search and Column Sorting (v4.39.0+)

- **Live search:** 300 ms debounce — no page reload.
- **Sortable columns:** Name, Email, Bookings, Total Spent, Last Booking, Registration Date. Click column header to toggle asc/desc.
- **Bulk delete:** Select rows via checkbox, click "Delete Selected". A browser confirm guard prevents accidental deletion.
- **CSV Export:** Downloads all customers (paged) or only selected IDs. Action is processed server-side via admin-post.php.

---

## React Components (v4.39.0+)

| Component | Purpose |
| :--- | :--- |
| `StatsCards` | Four KPI gradient cards at page top |
| `SearchBar` | Debounced live search input |
| `FilterBar` | Status / segment filter controls |
| `CustomerTable` | Sortable paginated table |
| `CustomerPanel` | Slide-in detail panel |
| `Pagination` | Page navigation controls |

**REST Endpoints:**
- `GET /wp-json/mhm-rentiva/v1/customers` — paginated, search, sort
- `GET /wp-json/mhm-rentiva/v1/customers/{id}` — detail
- `DELETE /wp-json/mhm-rentiva/v1/customers/bulk` — bulk delete

All endpoints require `manage_options` capability.

---

### Section Summary
- Monitor customer growth with **Analytics Cards**.
- Identify your VIP customers with the **Total Spent** column.
- View customer details instantly with the **Slide Panel** (no page reload).
- Associate all bookings with customers via the **Central Database**.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 11.05.2026 | 4.39.0 | Full React SPA migration. Live search, sortable columns, slide panel, bulk delete, CSV export. Legacy PHP list table + jQuery removed. |
| 23.04.2026 | 4.27.2 | Documentation synchronized with the current plugin release. |
| 27.03.2026 | 4.23.0 | Lite notice position (below KPI cards) documented. |
| 19.03.2026 | 4.21.2 | Customer list, analytics cards, and registration form updated against the real interface. |
| 26.02.2026 | 4.21.0 | Initial version created. |
