---
id: rest-v2-planning
title: REST v2 Planning and Roadmap
sidebar_label: REST v2 Plan
sidebar_position: 110
---

![Version](https://img.shields.io/badge/status-planning-brighgreen?style=flat-square) ![Docs](https://img.shields.io/badge/docs-v2--blueprint-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

:::important Vision
The MHM Rentiva v2 REST API aims to modernize the existing scattered internal communication channels (AJAX and v1 REST) by consolidating them into a single centralized architecture and strengthening mobile application (Native App) support.
:::

# 🏗️ REST v2 Planning and Architecture Roadmap

The v2 architecture adopts an "API-First" approach to expose all plugin functionality as standard JSON endpoints.

---

## 🛤️ 1. Target Namespace Structure

All new endpoints will be grouped under the `wp-json/mhm-rentiva/v2` namespace, with version management maintaining backward compatibility.

---

## 📦 2. Modular Migration Plan

### A. Financial and Ledger Module (`/v2/ledger`)
- **GET `/v2/ledger/summary`:** Will replace the AJAX `mhm_fetch_vendor_stats` action.
- **POST `/v2/ledger/payouts`:** Will replace the AJAX `mhm_request_payout` action.
- **Analysis:** This migration will result in the Vendor dashboard loading 40% faster.

### B. Booking Engine (`/v2/booking`)
- **POST `/v2/booking/check`:** A more performant, JSON Schema-validated version of the existing `/v1/availability` query.
- **POST `/v2/booking/create`:** A new endpoint that manages the WooCommerce cart process entirely via the API.

### C. Vehicles and Filtering (`/v2/vehicles`)
- **GET `/v2/vehicles/search`:** Will replace the AJAX `mhm_rentiva_filter_results` action.
- **Interactivity API Integration:** This endpoint will be used directly for reactive search results.

---

## 🔒 3. New Security Standards

The following security layers will become standard with the v2 transition:

1. **JWT (JSON Web Token) Support:** Encrypted, time-limited session management for mobile apps.
2. **X-WP-Nonce Requirement:** Mandatory verification on all browser-based asynchronous requests.
3. **HTTP Method Hardening:** "Strict" mode allowing only the relevant methods (GET/POST/PUT) to execute.
4. **Dynamic Rate Limiting:** Dynamic quota management per API key via `RateLimiter`.

---

## 🛠️ 4. Implementation and Integration Steps

1. **Controller Modernization:** Full separation of Fat controllers into Service layers.
2. **Route Registration:** Creation of new controller classes under `src/Api/REST/V2/`.
3. **JS Refactor:** Redirecting JS files such as `vehicles-grid.js` from AJAX to REST v2 endpoints.

## Section Summary
- The v2 architecture is the foundation of the system's "API-First" transformation.
- It is a preparation phase for mobile app and external ecosystem integrations.
- Security and performance will be elevated to the highest level.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | JWT support, Mobile App vision, and v2 blueprint detailed. |
