---
id: core-configuration-reading-order
title: Core Configuration Roadmap
sidebar_label: Reading Order
sidebar_position: 1
slug: /core-configuration/reading-order
hide_table_of_contents: true
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

# ⚙️ Core Configuration Roadmap

After installing the plugin, settings need to be configured within a logical framework for operational processes to run smoothly. This section covers the core configuration steps that form the "heart" of the system.

:::tip CONFIGURATION GUIDE
Follow the categorized cards below to set up the system completely. Each card provides quick access to the relevant settings group.
:::

---

<div className="row">
  <div className="col col--4 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #0f766e' }}>
      <h3 className="cardTitle">🏢 1. General Settings</h3>
      <p className="cardDescription">Define company information, currency, and core operating modes.</p>
      <a className="button button--secondary button--block" href="/docs/core-configuration/settings">General Settings</a>
    </div>
  </div>
  <div className="col col--4 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #3578e5' }}>
      <h3 className="cardTitle">📅 2. Booking</h3>
      <p className="cardDescription">Rental durations, deposit rates, and booking behavior.</p>
      <a className="button button--secondary button--block" href="/docs/core-configuration/booking-settings">Booking</a>
    </div>
  </div>
  <div className="col col--4 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #e5ad24' }}>
      <h3 className="cardTitle">💳 3. Payments</h3>
      <p className="cardDescription">Configure WooCommerce payment gateways and collection rules.</p>
      <a className="button button--secondary button--block" href="/docs/core-configuration/payments">Payment Settings</a>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--4 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #df3c29' }}>
      <h3 className="cardTitle">📧 4. Notifications</h3>
      <p className="cardDescription">Email templates, SMTP settings, and automated notifications.</p>
      <a className="button button--secondary button--block" href="/docs/core-configuration/emails">Email Settings</a>
    </div>
  </div>
  <div className="col col--4 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #6366f1' }}>
      <h3 className="cardTitle">🏎️ 5. Vehicle Fields</h3>
      <p className="cardDescription">Technical data (fuel type, transmission, etc.) and vehicle feature definitions.</p>
      <a className="button button--secondary button--block" href="/docs/core-configuration/vehicle-settings">Vehicle Settings</a>
    </div>
  </div>
  <div className="col col--4 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #ec4899' }}>
      <h3 className="cardTitle">🔑 6. License</h3>
      <p className="cardDescription">Activate your key to unlock Pro features.</p>
      <a className="button button--secondary button--block" href="/docs/core-configuration/license">License Management</a>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #8b5cf6' }}>
      <h3 className="cardTitle">⚡ 7. System & Performance</h3>
      <p className="cardDescription">Caching, security rules, and system health checks.</p>
      <a className="button button--secondary button--block" href="/docs/core-configuration/system-performance">System & Speed</a>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #10b981' }}>
      <h3 className="cardTitle">🛠️ 8. Maintenance & Tools</h3>
      <p className="cardDescription">Database cleanup, cron monitoring, and diagnostic tools.</p>
      <a className="button button--secondary button--block" href="/docs/core-configuration/maintenance">Maintenance Page</a>
    </div>
  </div>
</div>

---

## 📈 Configuration Flow Diagram

```mermaid
graph TD
    Start((START)) --> GS[1. General Settings]
    GS --> BS[2. Booking Management]
    BS --> PS[3. Payment Settings]
    PS --> ES[4. Email Gateways]
    ES --> AS[5. Vehicle Fields]
    AS --> LZ[6. License Activation]
    LZ --> SP[7. System & Security]
    SP --> UT[8. Maintenance & Diagnostics]
    UT --> End((COMPLETE))
```

---

### Section Summary
- Configuring settings in the correct order prevents system conflicts.
- It is recommended to validate the system with **Maintenance & Diagnostics** tools at the end.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Core Configuration roadmap with premium card design created. |
