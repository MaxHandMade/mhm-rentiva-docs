---
id: additional-services-usage
title: Add-on Management
sidebar_label: Add-ons
sidebar_position: 9
slug: /features-usage/additional-services
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

### Section Summary
- Offer rich service options to create **Additional Revenue Channels**.
- Cover your costs with **Pricing Strategies** (daily / fixed).
- Use **Vehicle-Specific Presentation** to show only relevant products to the customer.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 19.03.2026 | 4.21.2 | Add-ons usage guide created. |
