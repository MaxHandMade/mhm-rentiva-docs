---
id: transfer-api-and-webhooks
title: Transfer Services and Webhook Flows
sidebar_label: Transfer API and Webhooks
sidebar_position: 100
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
This page explains the Transfer module's asynchronous operation structure, the cart-addition process, and webhook communication traffic with external services.
:::

# 🛣️ Transfer Services and Webhook Flows

Unlike the rental module, the Transfer module includes point-to-point pricing and custom route calculations. These processes are managed in a hybrid manner over AJAX and the REST API.

---

## 🛒 1. Transfer Booking Flow (Frontend)

Customer-side interactions are executed via AJAX for high performance:

- **Action:** `rentiva_transfer_add_to_cart`
- **Security:** `rentiva_transfer_nonce` verification is required.
- **Data Model:** Added to the WooCommerce cart with a `booking_type=transfer` tag.
- **Workflow:** The selected vehicle type, passenger count, and route information are validated by `TransferPricingEngine` before being reflected in the cart.

---

## 📡 2. Webhook and Callback Mechanism

Communication with external payment providers and transfer partners is handled via REST endpoints.

### Payout and Booking Callback
- **Route:** `/mhm-rentiva/v1/payouts/{id}/callback`
- **Verification:** `HMAC-SHA256`-based signature check.
- **Flow:** After a "Success" signal is received from the payment service, `TransferService` confirms the booking and sends notifications to the relevant parties (Customer/Vendor).

---

## 🏥 3. System Health Check (Health Endpoint)

Provides external observability (monitoring) of the system.

- **URL:** `/wp-json/mhm-rentiva/v1/health`
- **Use Cases:** Uptime monitoring, smoke testing, and post-CI/CD liveness checks.
- **Returned Data:** Status of database tables, `/tmp` directory write permissions, and PHP version compatibility.

---

## 🛡️ 4. Security and Rate Limiting

- **General Limit:** 30 requests per minute for transfer search endpoints.
- **Callback Limit:** Custom limits are applied per PSP identity, not per IP.
- **Idempotency:** Repeated requests with the same notification ID are not processed, but `200 OK` is returned.

## Section Summary
- The Transfer module uses both AJAX (Frontend) and REST (Backend/External) layers together.
- All financial interactions are subject to signature-based (`HMAC`) verification.
- The `Health` endpoint allows real-time monitoring of the system's operational status.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | TransferPricingEngine integration, Health endpoint details, and HMAC verification flow added. |
