---
id: developer-reading-order
title: Developer Guide Roadmap
sidebar_label: Reading Order
sidebar_position: 1
slug: /developer/reading-order
hide_table_of_contents: true
---

![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

# 💻 Developer Guide Roadmap

To understand MHM Rentiva's technical architecture and develop on top of the plugin, we recommend following the reading order below.

:::tip TECHNICAL START
A hierarchical learning path has been designed, starting from the plugin's core structure and extending to the financial engine and API layers.
:::

---

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #0f766e' }}>
      <h3 className="cardTitle">⚙️ 1. Core & Architecture</h3>
      <p className="cardDescription">Core components such as module structure, Transfer architecture, and Layout Pipeline.</p>
      <a className="button button--secondary button--block" href="/mhm-rentiva-docs/docs/developer/core/framework-architecture">Core Structure</a>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #3578e5' }}>
      <h3 className="cardTitle">🌐 2. API & Communication</h3>
      <p className="cardDescription">REST v1/v2 endpoints, Webhook security, and the service hierarchy.</p>
      <a className="button button--secondary button--block" href="/mhm-rentiva-docs/docs/api/overview">API Guide</a>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #e5ad24' }}>
      <h3 className="cardTitle">💰 3. Financial Engine</h3>
      <p className="cardDescription">Ledger model, Commission policies, Payout management, and Audit cryptographic integrity.</p>
      <a className="button button--secondary button--block" href="/mhm-rentiva-docs/docs/developer/financial/governance-controls">Financial Architecture</a>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #df3c29' }}>
      <h3 className="cardTitle">🧪 4. Testing & Operations</h3>
      <p className="cardDescription">Unit test strategies, Webhook simulations, and Go-Live checklists.</p>
      <a className="button button--secondary button--block" href="/mhm-rentiva-docs/docs/developer/testing/controller-audit">Testing Guide</a>
    </div>
  </div>
</div>

---

## 🔝 Key Technical References
Other documents developers frequently consult:

- 📑 [Custom Post Types](/mhm-rentiva-docs/docs/developer/post-types)
- 🎨 [UI Components & Dashboard](/mhm-rentiva-docs/docs/developer/ui-components/dashboard-widgets)
- 🔒 [Security & Privacy Standards](/mhm-rentiva-docs/docs/vendor/security-privacy)

---

### Section Summary
- Technical documentation is ordered by dependency chain.
- In the first phase, **Core + API** sections are recommended; in the second phase, **Finance + Testing**.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 21.03.2026 | 4.21.3 | Broken links (Financial Architecture, Testing Guide) updated to correct routes. |
| 19.03.2026 | 4.21.2 | Developer Guide roadmap created with premium card design. |
