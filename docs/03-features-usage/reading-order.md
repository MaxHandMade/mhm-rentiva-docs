---
id: features-usage-reading-order
title: Features & Usage Roadmap
sidebar_label: Reading Order
sidebar_position: 1
slug: /features-usage/reading-order
hide_table_of_contents: true
---

import Link from '@docusaurus/Link';

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

# 🚗 Features & Usage Roadmap

To get the most out of everything MHM Rentiva has to offer, we recommend following the operational order below.

:::tip USAGE GUIDE
Use the categorized cards below to manage your daily rental operations, add vehicles, and generate reports.
:::

---

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #0f766e' }}>
      <h3 className="cardTitle">🏎️ 1. Vehicles & Inventory</h3>
      <p className="cardDescription">Adding vehicles, category management, pricing, and global vehicle settings.</p>
      <Link className="button button--secondary button--block" to="/docs/features-usage/vehicles">Vehicle Management</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #3578e5' }}>
      <h3 className="cardTitle">📅 2. Booking Tracking</h3>
      <p className="cardDescription">Manage incoming requests, monitor the calendar, and review booking details.</p>
      <Link className="button button--secondary button--block" to="/docs/features-usage/bookings">Bookings</Link>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #e5ad24' }}>
      <h3 className="cardTitle">✨ 3. Add-ons & VIP</h3>
      <p className="cardDescription">Extras like baby seats and insurance, plus VIP transfer route definitions.</p>
      <Link className="button button--secondary button--block" to="/docs/features-usage/additional-services-usage">Extra Services</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #df3c29' }}>
      <h3 className="cardTitle">💬 4. Customers & Communication</h3>
      <p className="cardDescription">Customer portal management, loyalty program, and internal messaging system.</p>
      <Link className="button button--secondary button--block" to="/docs/features-usage/customers">Customer Management</Link>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--12 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #8b5cf6' }}>
      <h3 className="cardTitle">📊 5. Reporting & Analytics</h3>
      <p className="cardDescription">Business performance charts, revenue reports, and data export.</p>
      <Link className="button button--secondary button--block" to="/docs/features-usage/reports">Reports & Export</Link>
    </div>
  </div>
</div>

---

## 📈 Operational Cycle

```mermaid
graph TD
    A[<b>1. Add Vehicle</b>] --> B[<b>2. Receive Booking</b>]
    B --> C[<b>3. Operations / Delivery</b>]
    C --> D[<b>4. Customer Relations</b>]
    D --> E[<b>5. Reporting & Analytics</b>]
    E --> A
    
    style A fill:#f0fdf4,stroke:#16a34a,stroke-width:2px
    style B fill:#eff6ff,stroke:#2563eb,stroke-width:2px
    style C fill:#fff1f2,stroke:#e11d48,stroke-width:2px
    style D fill:#faf5ff,stroke:#9333ea,stroke-width:2px
    style E fill:#fffbeb,stroke:#d97706,stroke-width:2px
```

---

### Section Summary
- This section covers the workflows for daily plugin usage.
- The operational cycle is designed for a sustainable rental business.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 21.03.2026 | 4.21.3 | All card links (Vehicles, Bookings, Extra Services, etc.) corrected to relative paths. |
| 19.03.2026 | 4.21.2 | Features & Usage roadmap created with premium card design. |
