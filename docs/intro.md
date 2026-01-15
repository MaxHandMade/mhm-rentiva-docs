---
slug: /
sidebar_position: 0
title: Documentation Home
hide_table_of_contents: true
---

# MHM Rentiva Documentation

Welcome to the comprehensive documentation for the MHM Rentiva Vehicle Rental Plugin. Choose a category below to get started.

<div className="row">
  <div className="col col--4 margin-bottom--lg">
    <a className="card padding--lg cardContainer" href="/mhm-rentiva-docs/docs/01-getting-started/installation">
      <h2 className="text--truncate cardTitle">🚀 Getting Started</h2>
      <p className="text--truncate cardDescription">Installation, Setup Wizard, and System Requirements.</p>
    </a>
  </div>
  <div className="col col--4 margin-bottom--lg">
    <a className="card padding--lg cardContainer" href="/mhm-rentiva-docs/docs/02-core-configuration/settings">
      <h2 className="text--truncate cardTitle">⚙️ Core Configuration</h2>
      <p className="text--truncate cardDescription">General settings, Payment gateways, and Email setup.</p>
    </a>
  </div>
  <div className="col col--4 margin-bottom--lg">
    <a className="card padding--lg cardContainer" href="/mhm-rentiva-docs/docs/03-features-usage/vehicles">
      <h2 className="text--truncate cardTitle">🚙 Features & Usage</h2>
      <p className="text--truncate cardDescription">Managing Vehicles, Bookings, Customers, and Reports.</p>
    </a>
  </div>
  <div className="col col--4 margin-bottom--lg">
    <a className="card padding--lg cardContainer" href="/mhm-rentiva-docs/docs/04-developer/rest-api">
      <h2 className="text--truncate cardTitle">👨‍💻 Developer Guide</h2>
      <p className="text--truncate cardDescription">REST API endpoints, Hooks, Filters, and Database schema.</p>
    </a>
  </div>
  <div className="col col--4 margin-bottom--lg">
    <a className="card padding--lg cardContainer" href="/mhm-rentiva-docs/docs/05-faq/common-issues">
      <h2 className="text--truncate cardTitle">❓ FAQ & Troubleshooting</h2>
      <p className="text--truncate cardDescription">Common issues, solutions, and answers to frequent questions.</p>
    </a>
  </div>
</div>

<style>
  .cardContainer {
    border: 1px solid var(--ifm-color-emphasis-200);
    border-radius: var(--ifm-card-border-radius);
    display: block;
    height: 100%;
    transition: all 0.2s ease;
    text-decoration: none !important;
    color: inherit !important;
  }
  .cardContainer:hover {
    border-color: var(--ifm-color-primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  .cardTitle {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  .cardDescription {
    font-size: 0.9rem;
    color: var(--ifm-color-emphasis-700);
    margin-bottom: 0;
  }
</style>
