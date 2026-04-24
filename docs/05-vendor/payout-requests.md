---
id: payout-requests
title: Payout Requests
sidebar_label: Payout Requests
sidebar_position: 1
---

![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

When the Vendor ecosystem is active, the process of transferring earned rental fees to vendors is managed through the **MHM Rentiva > All Payout Requests** menu.

---

## 📅 Payout Request Flow

Vendor earnings move to the balance after the customer's payment is confirmed. The process works as follows:
1. **Request Creation:** The vendor creates a payout request from their dashboard.
2. **Admin Review:** The admin sees the pending requests in the list.
3. **Approval & Payment:** The physical transfer is made via the designated bank or payment channel.
4. **Status Update:** Once the payment is complete, the request is marked as "Paid".

---

## 🏧 Earnings Calculation Parameters

The system accounts for the following items:
- **Total Rental Fee:** The net rental amount for the vehicle.
- **Platform Commission:** The share retained by the admin.
- **Extra Revenue:** Additional income from services such as insurance, child seat, etc.

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>📸 Image Coming Soon: Payout Request List</strong><br/>
  <em>The MHM Rentiva payout management screen will appear here.</em>
</div>

---

## 🛠️ Technical Infrastructure

All earnings logs are stored atomically in the `mhm_rentiva_vendor_transactions` table. When a booking is cancelled, it is reflected as a debit on the vendor's account.

---

### Section Summary
- **Payout** is the system that manages vendor earnings.
- **Balance tracking** is automatically updated after each booking.
- **Requests** are finalized with admin approval.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | English translation added. |
| 18.03.2026 | 4.21.2 | New document created. |
