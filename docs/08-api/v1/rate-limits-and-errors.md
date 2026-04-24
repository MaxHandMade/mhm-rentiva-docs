---
id: rate-limits-and-errors
title: API Error Handling and Rate Limiting
sidebar_label: Rate Limit and Error Codes
sidebar_position: 90
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
A set of rules used to ensure the continuity of MHM Rentiva API services and to report error states in a standardized language.
:::

# 🚦 API Error Handling and Rate Limiting

The system uses the `RateLimiter` and `ErrorHandler` classes both to block malicious attacks (brute-force, DoS) and to return consistent error messages to clients.

---

## 🛑 1. Rate Limiting

Rate limits are applied per API key (v1) or IP address (Public).

| Layer | Limit (Requests/Minute) | Result on Excess |
|---|---|---|
| **Public API** | 30 | HTTP 429 |
| **Authenticated (API Key)** | 60 | HTTP 429 |
| **Admin/internal** | 120 | HTTP 429 |

**Protections:**
- **`RateLimiter::check()`:** Enforces the request limit within defined time windows (Sliding Window).
- **Logging:** Limit violations are recorded via `AdvancedLogger` at the `SECURITY_WARNING` level.

---

## ❌ 2. Standard Error Codes

All API responses use standard HTTP status codes and custom application error codes.

| HTTP Code | Application Code | Description |
|---|---|---|
| **400** | `INVALID_PARAMS` | Missing or incorrectly formatted parameter. |
| **401** | `AUTH_REQUIRED` | Authentication header missing or invalid. |
| **403** | `PERMISSION_DENIED` | The user or key does not have permission for this operation. |
| **404** | `RESOURCE_NOT_FOUND` | No record found with the specified ID. |
| **409** | `STATE_CONFLICT` | The operation is incompatible with the resource's current state (e.g., booking an unavailable vehicle). |
| **429** | `RATE_LIMIT_EXCEEDED` | Per-minute request limit exceeded. |
| **500** | `INTERNAL_ERROR` | An unexpected server error occurred. |

---

## 🛠️ 3. Logging and Correlation ID

The system generates a **Correlation ID** (e.g., `req_abc123`) alongside every error response:
- **Developer Tip:** Technical error details (stack trace, etc.) are never returned in the error body. Instead, an ID is returned that helps locate the relevant entry in the logs.
- **`ErrorHandler::format_error()`:** Centrally catches, logs, and serves all errors to clients in a safe JSON format.

---

## 📤 4. Error Response Example

```json
{
  "success": false,
  "error": {
    "code": "PERMISSION_DENIED",
    "message": "Bu işlem için 'rentiva_vendor' yetkisi gereklidir.",
    "correlation_id": "err_1773849524"
  }
}
```

## Section Summary
- `RateLimiter` protects the system; `ErrorHandler` standardizes communication.
- Errors are never returned as raw PHP errors, but as formatted JSON.
- Correlation ID makes it easy to track production errors.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Rate limit layers, Application Error Codes, and Correlation ID details added. |
