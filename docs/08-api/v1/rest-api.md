---
id: rest-api-v1
title: REST API v1 Overview
sidebar_label: REST API
sidebar_position: 10
---

![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

:::info Purpose
The MHM Rentiva v1 REST API provides core endpoints for external system integration, mobile app support, and asynchronous operations. All endpoints are served under the `wp-json/mhm-rentiva/v1` namespace.
:::

# 🌐 REST API v1 Structure

The v1 API layer provides secure and fast data access while maintaining backward compatibility.

---

## 🔑 1. Authentication and Security

Access to API endpoints is provided through three different methods depending on the type of operation:

| Method | Use Case | Details |
|---|---|---|
| **Public** | Locations, Availability | No authentication required for publicly accessible data. |
| **Nonce** | AJAX/Web interactions | `_wpnonce` header/parameter verification required. |
| **API Key** | External Service Integrations | Authentication via `X-Rentiva-API-Key` or Bearer Token. |

---

## 🚀 2. Core Endpoints

### A. System Health (`/health`)
- **Method:** `GET`
- **Function:** Checks the existence of database tables, plugin version, and license status.
- **Response:** `{"status": "ok", "version": "4.21.2"}`

### B. Location Services (`/locations`)
- **Method:** `GET`
- **Function:** Returns defined active locations for the booking and transfer modules.
- **Parameters:** `?type=airport`, `?city=istanbul`

### C. Availability and Pricing (`/availability`)
- **Method:** `POST`
- **Function:** Checks availability for specific dates and a vehicle ID, and calculates the net price via the Pricing Engine.
- **Input:** `vehicle_id`, `pickup_date`, `return_date`

---

## 🛡️ 3. Security Layer (AuthHelper)

`AuthHelper` is engaged for all "write" (POST/PUT/DELETE) operations:
- **Rate Limiting:** Per-minute request limit for each API key.
- **HMAC Verification:** Guarantees data integrity on webhook callbacks.

---

## 📊 4. Response and Error Format

The system returns standard JSON responses:

```json
{
  "success": true,
  "data": { ... },
  "message": "İşlem başarılı."
}
```

On error:
```json
{
  "success": false,
  "error_code": "INVALID_PARAMS",
  "message": "Eksik parametre gönderildi."
}
```

## Section Summary
- v1 API serves under `mhm-rentiva/v1`.
- Authentication method varies based on the criticality of the operation.
- All operations are audited via the central `AuthHelper` and `ErrorHandler`.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | v1 API architecture and security layers updated. |
