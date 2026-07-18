---
id: payout-requests
title: Payout Requests
sidebar_label: Payout Requests
sidebar_position: 1
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro feature
This page documents a capability of the **MHM Rentiva Pro** add-on. It is not part of the free
Lite edition on WordPress.org and requires Pro installed alongside Lite plus a valid licence.
See [Editions — Lite vs Pro](/docs/) for the full split.
:::

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

## 📄 Payout Statements (v4.61.0)

When you approve a payout, the system automatically generates a **payment statement** (_hakediş makbuzu_) for the period that payout covers. The statement is **sequentially numbered** (e.g. `MKB-2026-0001`) and frozen as an **immutable record** at the moment of approval — it is never rewritten afterwards, so it always reflects the figures as they were when the vendor was paid.

The statement lists every ledger movement in the period — earnings and any penalties — with the period totals and the amount paid. The vendor automatically receives an **email** with a link to view and print it from their panel.

### Where to find it

- **Admin:** the statement number and a **View** link appear on the **All Payout Requests** list, next to the approved payout.
- **Vendor:** the statement appears in the vendor's payout history, and the email links straight to it (opened from inside the vendor's own session in the panel).

### Commission breakdown

Each earning line on the statement shows the full split, so the vendor sees exactly how their net was calculated:

| Column | Meaning |
| :--- | :--- |
| **Gross** | The total booking amount before commission. |
| **Commission** | The platform's rate and the amount deducted (e.g. `%20 · 400.00`). |
| **Net** | What the vendor actually earned (Gross − Commission). |

A period **"Total commission deducted"** row sums the commission across all earnings in the statement. Penalty and refund lines show "—" for Gross/Commission (they carry no commission). Statements issued **before v4.61.0** were not captured with this detail and show the net only.

### Statement branding

The statement carries your company identity. Under **Settings → Vendor Marketplace → Statement Branding** you can set:

- Company name, address, tax office and tax number, phone, and email
- A company **logo**
- A custom **footer note** (e.g. a legal disclaimer)

Branding is applied **when the statement is viewed**, so updating these settings is reflected on every statement immediately — including ones already issued.

---

## 🛠️ Technical Infrastructure

All earnings logs are stored atomically in the `mhm_rentiva_vendor_transactions` table. When a booking is cancelled, it is reflected as a debit on the vendor's account. Statements are stored as an immutable snapshot on the approved payout record and rendered on demand.

---

### Section Summary
- **Payout** is the system that manages vendor earnings.
- **Balance tracking** is automatically updated after each booking.
- **Requests** are finalized with admin approval.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 29.06.2026 | 4.61.0 | Payout statements (numbered, printable), commission breakdown, and statement branding documented. |
| 23.04.2026 | 4.27.2 | English translation added. |
| 18.03.2026 | 4.21.2 | New document created. |
