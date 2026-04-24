---
id: overview
title: REST API and Nervous System
sidebar_label: Overview
sidebar_position: 1
hide_table_of_contents: true
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

# 🧠 REST API and Nervous System

Welcome to the central nervous system that governs data flow between all MHM Rentiva modules, external system integrations, and modern interface (Interactivity API) communication.

:::tip TECHNICAL GUIDE
Use the cards below to access detailed technical information about the system's asynchronous layers, secure protocols, and future plans.
:::

---

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #0f766e' }}>
      <h3 className="cardTitle">🌐 v1 Endpoints (Current)</h3>
      <p className="cardDescription">Currently active REST endpoints. References for rentals, location services, and health audits.</p>
      <a className="button button--secondary button--block" href="./v1/rest-api-v1">v1 Reference</a>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #3578e5' }}>
      <h3 className="cardTitle">🏗️ v2 Planning (Future)</h3>
      <p className="cardDescription">The system's API-First transition. Mobile app support, JWT design, and next-generation API architecture roadmap.</p>
      <a className="button button--secondary button--block" href="./rest-v2-planning">v2 Plan</a>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #e5ad24' }}>
      <h3 className="cardTitle">🛡️ Security and Licensing</h3>
      <p className="cardDescription">HMAC signing, API key management, and external license server communication protocols.</p>
      <a className="button button--secondary button--block" href="./license-server-protocols">Security Details</a>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #df3c29' }}>
      <h3 className="cardTitle">🔍 Audit and Architecture</h3>
      <p className="cardDescription">Controller audit, Nervous System hierarchy, and performance optimization reports.</p>
      <a className="button button--secondary button--block" href="./api-nervous-system">Architecture Analysis</a>
    </div>
  </div>
</div>

---

## 🔝 Popular Technical Topics
The API topics developers need most:

- 🛡️ [API Authentication Methods](./v1/auth-and-security)
- 🔑 [API Key Manager Usage](./v1/api-key-manager)
- 🧾 [Payment Callback API](./v1/financial-rest-callbacks)
- 🚦 [Error Codes and Rate Limiting](./v1/rate-limits-and-errors)

---

### Section Summary
- The documents in this section are prepared for developers who want to understand the plugin's technical infrastructure.
- All `v1` and `v2` transition processes are presented with a standardized hierarchy.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 21.03.2026 | 4.21.3 | Broken links (v1 Reference, v2 Plan, etc.) fixed as relative paths. |
| 19.03.2026 | 4.21.2 | Premium card-design homepage created for the API category. |
