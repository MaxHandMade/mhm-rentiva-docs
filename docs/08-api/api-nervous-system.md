---
id: api-nervous-system
title: Nervous System (Internal Communication)
sidebar_label: Nervous System
sidebar_position: 10
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
MHM Rentiva uses a three-layer communication architecture ("Nervous System") to manage user interactions and synchronize data across modules: **AJAX**, **REST API (v1)**, and the **Interactivity API**.
:::

# 🧠 Nervous System: Communication Channels

The plugin's internal communication architecture is optimized for high performance and low latency.

---

## ⚡ 1. AJAX Layer (admin-ajax.php)

The primary channel used for Vendor dashboard and front-end form interactions.

| Hook (Action) | Responsible Controller | Function |
| :--- | :--- | :--- |
| `mhm_fetch_vendor_stats` | `AnalyticsController` | Fetches dashboard KPI and Sparkline data. |
| `mhm_request_payout` | `PayoutAjaxController` | Initiates payout requests atomically. |
| `mhm_rentiva_filter_results` | `SearchResults` | Filters the vehicle list without a page reload. |
| `mhm_approve_iban` | `VendorOnboardingController` | Approves IBAN changes from the admin panel. |

---

## 🌐 2. REST API v1 (mhm-rentiva/v1)

The architecture that communicates with external services (payment providers, mobile apps) and handles complex configurations.

### Core Endpoints:
- **`/locations`:** Provides geographic location data for the Transfer and Booking modules.
- **`/health`:** Audits database tables, license status, and the PHP environment.
- **`/payouts/{id}/callback`:** Uses HMAC verification to reject unsigned requests from payment systems.
- **`/availability`:** Performs real-time calendar availability checks and price calculation via the Pricing Engine.

---

## 🧪 3. Interactivity API (WP 6.5+)

Used for block-based and reactive interfaces in line with WordPress's new standards.

- **`mhmLive.endpoint`:** Used to reflect a server-side state change on the frontend in real time (e.g., Favorites counter).
- **Filtering:** Provides asynchronous data loading using `data-wp-context`.
- **Micro-interactions:** Button animations and form validation feedback use this layer.

---

## 🛡️ 4. Security and Verification

The following security layers are required across all communication channels:
- **Nonce (CSRF):** Verification of the `_wpnonce` field on every AJAX request.
- **Capability:** Role-based access control via `current_user_can`.
- **AuthHelper:** API key-based verification for external access.

## Section Summary
- AJAX is optimized for user dashboard interactions.
- REST API v1 is the gateway to system integrity and the outside world.
- The Interactivity API offers reactive methods for a modern, fluid user experience.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Interactivity API and AJAX audit details added. |
