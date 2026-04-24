---
id: bookings
title: Booking Management
sidebar_label: Bookings
sidebar_position: 6
slug: /features-usage/bookings
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Bookings are the operational and financial core of the MHM Rentiva system. Use **MHM Rentiva > Bookings** to monitor all booking traffic, create new records, and manage financial flows.

---

## 📊 Booking Analytics and Summary

At the top of the page, four main indicator cards display the current state of your fleet:
- **Pending:** Requests that have not yet been confirmed or are awaiting payment.
- **Confirmed:** Transactions with finalized bookings.
- **Completed:** Rentals/transfers that have successfully concluded.
- **Monthly Revenue:** Total turnover for the selected month and the growth rate (%) compared to the previous month.

---

## 📅 Monthly Booking Calendar (Interactive)

The central calendar visualizes the occupancy rate of your vehicles.

**Status Colors (Legend):**
- <span style={{color: '#facc15'}}>●</span> **Pending:** Bookings that have not yet been confirmed or are awaiting payment.
- <span style={{color: '#3b82f6'}}>●</span> **Confirmed:** Transactions approved by payment or by an admin.
- <span style={{color: '#f97316'}}>●</span> **In Progress:** Transactions where the rental has started and the vehicle is currently with the customer.
- <span style={{color: '#22c55e'}}>●</span> **Completed:** Bookings where the rental process has successfully concluded and the vehicle has been returned.
- <span style={{color: '#ef4444'}}>●</span> **Cancelled:** Invalid records cancelled by the customer or the system.

*Tip: Clicking a record on the calendar opens a quick summary panel with customer and vehicle details. As of v4.23.0, the popup also displays time information via the `_mhm_start_time` and `_mhm_end_time` meta values.*

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>📸 IMAGE: BOOKING CALENDAR AND SUMMARY POPUP</strong><br/>
  <em>mhm-rentiva-booking-calendar-popup</em>
</div>

---

## ➕ Manual Booking Creation

Use the **"Add New Booking"** button to enter requests received by phone or in person. The form has four main sections:

1.  **Vehicle and Customer Selection:** Select the vehicle and the existing customer from the list.
2.  **Date and Guests:** Set the pickup/return date-times and the number of passengers.
3.  **Add-ons:** Select any additional equipment the customer has requested (Navigation, Baby Seat, etc.). Prices are added automatically.
4.  **Payment and Status:** Set the payment type (Deposit/Full), method (Cash/Offline), and initial status, then click "Calculate Price".

---

## 📝 Booking Editing and Financial Management

The detail page of an existing booking provides a full operational control panel:

### Financial Tracking (Deposit Management)
The system calculates **Total Amount**, **Deposit Amount**, and **Remaining Amount** in real time.
- **Payment Status:** Can be updated to "Awaiting Payment", "Paid", or "Cancelled".
- **Cancellation Policy:** Indicates whether the transaction is cancellable based on the defined cancellation deadline.

### Pay Remaining — v4.26.0

For bookings made with a deposit, customers can pay the remaining balance directly from **My Account → Booking Detail**.

**How It Works:**
1. The customer clicks the "Pay Remaining Balance" button.
2. The system creates a minimal WooCommerce order for the outstanding amount.
3. The customer is redirected to WooCommerce's native `order-pay` page.
4. Payment is completed using any payment method active on the site.

**Technical Details:**
- Remaining payment orders are identified by the `_mhm_is_remaining_payment` flag.
- The `_mhm_remaining_order_id` meta provides duplicate order protection — if a pending order already exists, a new one is not created.
- Does not require any additional integrations or payment plugins.

### Payment History (Timeline)
Every step — from booking creation, to payments received, to status changes — is recorded as a timeline (Log). This is critical for tracking erroneous transactions.

### Right Sidebar (Side Actions)
- **Send Email:** Manually trigger "Booking Confirmation" or "Reminder" emails.
- **Payment Receipt:** Payment receipts from customers can be uploaded to the system and approved by the admin.
- **Customer Account:** Communicate directly with the booking owner or access their account.

---

---

## 🆔 Display ID

As of v4.23.0, the `mhm_rentiva_get_display_id()` function is used in booking lists and widgets. If the WooCommerce integration is active, this function returns the WC order ID; otherwise the standard post ID is shown. This ensures the ID shown to the customer is consistent with the ID in the admin panel.

---

## 🔄 Status Change Hooks

When a booking status changes, calls to `update_post_meta` do not trigger the standard `save_post` hook. As of v4.23.0, the `updated_post_meta` and `added_post_meta` hooks are listened to, ensuring real-time updates to dashboard widgets and statistics.

---

### Section Summary
- Monitor real-time occupancy via the **Dashboard**.
- Audit every operational step with the **Timeline**.
- Track payments and outstanding balances accurately with the **Financial Panel**.
- Offer deposit customers self-service payment with **Pay Remaining**.
- The **Calendar popup** now displays time information.
- **Display ID** ensures consistency with the WC order ID.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Documentation synchronized with the current plugin release. |
| 27.03.2026 | 4.23.0 | Calendar popup time info, Display ID, and status hooks documented. |
| 19.03.2026 | 4.21.2 | Booking list, calendar, manual entry, and payment management rewritten against the real interface. |
| 18.03.2026 | 4.21.0 | Initial version created. |
