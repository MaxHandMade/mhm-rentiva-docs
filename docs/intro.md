---
slug: /
sidebar_position: 0
title: Welcome
hide_table_of_contents: true
---

import Link from '@docusaurus/Link';

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

# MHM Rentiva Documentation

Welcome to the official documentation hub for **MHM Rentiva** — the WordPress plugin that takes your vehicle rental operations to a professional level. This hub offers a comprehensive guide for both site owners and developers.

:::tip Quick Access
Looking for a specific feature? Use the main categories below to jump straight to the information you need.
:::

## Editions — Lite vs Pro

**MHM Rentiva (Lite)** is the free edition published on WordPress.org. It covers the entire rental core — fleet management, availability, bookings, customers, WooCommerce checkout, email notifications, the customer account pages and all of the shortcodes, blocks and Elementor widgets — with **no vehicle, booking or listing caps, no feature timers and no locked screens**.

**MHM Rentiva Pro** is a *separate paid add-on* installed alongside Lite. It does not replace Lite; it adds the marketplace, transfer and compliance layer on top of it:

| Pro-only capability | What it covers |
| --- | --- |
| **Multi-vendor marketplace** | Vendor onboarding & approval, vendor panel, vendor listings |
| **Vendor payouts, commission & ledger** | Commission accrual, clearing, payout approval, ledger |
| **Vendor reports & disputes** | Vendor-to-admin reports and the appeal flow |
| **VIP transfers + location-based routes** | Transfer search/results, route management, popular routes |
| **Customer messaging** | Admin ↔ customer threads |
| **Advanced reports** | Extended reporting beyond the Lite dashboard |
| **Dedicated export screen** | The standalone Export admin page |
| **GDPR / data-retention tools** | Data export/erasure, consent, retention cron |

:::info How to tell which is which
Every documentation page that describes a Pro capability carries a **![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square)** badge at the top. Pages without it document Lite functionality that works in the free edition.

Pro capabilities are gated on a **valid licence**, not merely hidden — with Pro installed but unlicensed those screens stay off. Pro is available at [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

---

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #0f766e' }}>
      <h3 className="cardTitle">🚀 Getting Started</h3>
      <p className="cardDescription">Get the system running in minutes. A step-by-step roadmap for requirements, activation, and initial configuration.</p>
      <Link className="button button--secondary button--block" to="/docs/getting-started/reading-order">Start Now</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #3578e5' }}>
      <h3 className="cardTitle">⚙️ Core Configuration</h3>
      <p className="cardDescription">General settings, WooCommerce payment gateways, tax configuration, and email notification systems.</p>
      <Link className="button button--secondary button--block" to="/docs/core-configuration/settings">Configure Settings</Link>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #e5ad24' }}>
      <h3 className="cardTitle">🚗 Features & Usage</h3>
      <p className="cardDescription">Make the most of vehicle management, booking tracking, the customer portal, and reporting modules.</p>
      <Link className="button button--secondary button--block" to="/docs/features-usage/reading-order">User Guide</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #df3c29' }}>
      <h3 className="cardTitle">💻 Developer Guide</h3>
      <p className="cardDescription">REST API references, Hook/Filter lists, and database schema for those who want to customize the plugin.</p>
      <Link className="button button--secondary button--block" to="/docs/developer/reading-order">Technical Details</Link>
    </div>
  </div>
</div>

---

## 🔝 Popular Topics
Looking for a quick answer? Browse the most-visited topics:

- 💳 [WooCommerce Payment Integration](./core-configuration/payments)
- 📧 [Customizing Email Templates](./core-configuration/emails)
- 🏎️ [Adding Vehicles and Availability Calendar](./features-usage/vehicles)
- 🧩 [Shortcode Reference](./features-usage/shortcodes/overview)
- ✅ [Post-Installation Checklist](./getting-started/post-install-checklist)
- ➕ [Additional Services Management](./features-usage/additional-services-usage)
- 🛠️ [Troubleshooting Guide](./faq/common-issues)

---

## 🏗️ Technical Resources
In-depth technical documentation for developers:

- 🧱 [Module Architecture](./developer/core/technical-architecture)
- 💰 [Financial Governance](./developer/financial/governance-controls)
- 🧾 [Ledger Data Model](./developer/financial/financial-ledger-model)
- 🧪 [Controller Audit](./developer/testing/test-suite)
- 🧠 [REST API Architecture](./api/overview)
- 🌐 [v1 REST API Reference](./api/v1/rest-api-v1)

---

## 🤝 Vendor Ecosystem
- 🚀 [Vendor Onboarding](./vendor/onboarding)
- 💳 [Payout & Ledger System](./vendor/payouts-ledger)
- 📊 [Analytics & Performance](./vendor/analytics)
- 🛡️ [Security & Privacy](./vendor/security-privacy)

---

## 🌐 Support & Community
- **Report an Issue:** [GitHub Issues](https://github.com/MaxHandMade/mhm-rentiva/issues)
- **Community Forum:** [WordPress Support](https://wordpress.org/support/plugin/mhm-rentiva)
- **Developer Blog:** [Blog](/blog)

---

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Settings Testing pollution hotfix + duplicate Addon notice dedupe. |
| 23.04.2026 | 4.27.1 | i18n locale-leak hotfix. |
| 23.04.2026 | 4.27.0 | WordPress.org submission readiness. |
| 21.03.2026 | 4.21.5 | All route IDs and category mappings verified 100%. |
