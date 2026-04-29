---
id: additional-services-usage
title: Add-on Management
sidebar_label: Add-ons
sidebar_position: 9
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Add-ons are the management area where you define products that add extra value to vehicle rental bookings (Baby Seat, GPS, Full Insurance, Port Baggage, etc.). Access this section via **MHM Rentiva > Add-ons**.

These services are added to the booking total and improve operational efficiency.

---

## 🧺 Creating a New Add-on

When adding a product or service, the following parameters are configured:

- **Service Name:** The name the customer sees in the cart (e.g. Baby Seat).
- **Description:** Detailed information about the product and its terms of use.
- **Pricing:**
    - **Daily Price:** Charged for each day of the rental (e.g. $50 / Day).
    - **Fixed Price:** Charged once per booking (e.g. Insurance Package $500).
- **Required Service:** When checked, the customer cannot complete a booking without this service (e.g. Standard Insurance).
- **Maximum Quantity:** How many units can be selected for a single vehicle (e.g. Max 2 Baby Seats).

---

### 🖼️ IMAGE: ADD-ON MANAGEMENT
*(Add-on list and pricing settings)*

---

## 🚘 Vehicle Compatibility (Assignment)

Not all services may be appropriate for every vehicle.
- **Vehicle-Specific:** You can define an 8–9 person baggage service exclusively for the "Minibus" group.
- **Global Assignment:** Some services (e.g. International Exit Permit) are automatically applied to the entire fleet.

---

## 🛒 Customer Selection and Cart Management

The customer sees these services as a list on the vehicle detail page or at the checkout step.
- **Real-time Calculation:** When an add-on is selected, the total amount updates instantly via Ajax.
- **Summary:** The selected extras are itemized both in the customer's email and in the booking record in the admin panel.

---

---

## 🆕 v4.36.0 — Context & Pricing Type

Starting with v4.36.0, every add-on has two new fields on the edit screen:

### Context (`addon_context` taxonomy)

A radio metabox in the side panel with three options:

| Context | Meaning |
| :--- | :--- |
| **Rental only** | Shown only on rental booking flow |
| **Transfer only** | Shown only on transfer booking flow (modal picker) |
| **Both** | Shown in both flows |

- **Default:** `Rental only` (existing add-ons auto-migrated to this on upgrade)
- **Where the customer sees it:**
    - Rental: existing checkboxes on the booking form (unchanged)
    - Transfer: a "+ N add-ons available" hint above the "Add to cart" button on each search-result card; clicking the button opens a modal picker

### Pricing Type (`_mhm_addon_pricing_type` post meta)

A select field in the main metabox with three options:

| Type | Calculation | Valid in |
| :--- | :--- | :--- |
| **Per booking (fixed)** | `addon_price` (flat) | Both contexts |
| **Per day** | `addon_price × rental_days` | Rental |
| **Per passenger** | `addon_price × (adults + children)` | Transfer |

- **Default:** `Per booking (fixed)` (existing add-ons auto-migrated)
- **Dynamic admin UI:** when you change the Context radio, the Pricing Type select disables incompatible options with a `(incompatible with context)` suffix. JS-driven, no save needed to preview.
- **Server-side guard:** if a JS-bypass somehow saves an invalid combination (e.g. `Rental only` + `Per passenger`), the server snaps the pricing type back to `Per booking` and shows an admin notice.

### Transfer modal preview

When a customer clicks "Add to cart" on a transfer search result and at least one transfer-context add-on exists:

```
┌─ Modal ──────────────────────────────────┐
│ Add-ons for your VIP transfer            │
│ İstanbul Havalimanı ➝ Taksim Ofis        │
├──────────────────────────────────────────┤
│ ☑ Welcome Banner (required)  +30 ₺       │
│ ☐ Child Seat                  +25 ₺      │
│ ☐ VIP Assistant   +15 ₺ × 3 yolcu = 45 ₺ │
├──────────────────────────────────────────┤
│ Vehicle 280 ₺ + add-ons 95 ₺ = 375 ₺     │
│           [ Cancel ]   [ Add to cart ]   │
└──────────────────────────────────────────┘
```

- Required add-ons appear at the top, pre-checked, and locked.
- The total updates live as the customer toggles checkboxes.
- "Cancel" backs out without dispatching anything; "Add to cart" submits the selection alongside the existing transfer payload.
- If zero transfer-context add-ons are configured, the modal is suppressed and the existing direct-add behaviour remains untouched.

### Migration

On the first `init` after upgrading to v4.36.0, every legacy `vehicle_addon` record is auto-assigned:
- `addon_context = rental`
- `_mhm_addon_pricing_type = per_booking`

This is **idempotent** — a manual operator override (changing context to `transfer` or pricing type to `per_day`) is never overwritten on subsequent boots. The migration is gated by an internal option flag.

### Lite limit

Lite still caps at **4 published add-ons total** (combined rental + transfer). The vendor decides how to split the slots. Pro is unlimited.

---

### Section Summary
- Offer rich service options to create **Additional Revenue Channels**.
- Cover your costs with **Pricing Strategies** (daily / fixed / per booking / per passenger).
- Use **Vehicle-Specific Presentation** and **Context Targeting** to show the right add-ons in the right flow.
- Transfer customers see a focused **modal picker** with live multiplier-aware totals.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 29.04.2026 | 4.36.0 | Added `addon_context` taxonomy (rental / transfer / both) and `_mhm_addon_pricing_type` (per_booking / per_day / per_passenger). Transfer modal picker with live total. Idempotent data-lane migration. |
| 19.03.2026 | 4.21.2 | Add-ons usage guide created. |
