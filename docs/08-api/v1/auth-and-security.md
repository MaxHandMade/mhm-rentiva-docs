---
id: auth-and-security
title: API Authentication and Security
sidebar_label: Auth and Security
sidebar_position: 20
---

![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

:::info Purpose
Explains the security protocols used to ensure the integrity and confidentiality of data exchange in the MHM Rentiva API layer.
:::

# 🔐 API Security Architecture

The system follows a multi-layer verification strategy for both internal and external requests.

---

## 🛡️ 1. Authentication Methods

### A. Nonce (CSRF) Protection (Internal)
Used for internal AJAX and Interactivity API requests.
- **Header:** `X-WP-Nonce`
- **Verification:** `check_ajax_referer()` or `rest_cookie_check_errors()`.

### B. API Key (External)
Managed via `AuthHelper` for external integrations.
- **Header:** `X-Rentiva-API-Key`
- **Function:** The API key determines the permission level (Read/Write) assigned to that key.

### C. HMAC Signature Verification (Webhook)
A critical security step for payment callbacks.
- **Header:** `X-Rentiva-Signature`
- **Logic:** The hash produced using the incoming JSON body and the Secret Key is compared against the value in the header.

---

## 🚦 2. Authorization

After authentication, the user's permission to perform the operation is checked:
- **`current_user_can('manage_options')`:** Admin-level operations.
- **`current_user_can('rentiva_vendor')`:** Vendor-level operations.
- **`Mode::featureEnabled()`:** Feature restriction based on license tier.

---

## 🚀 3. Request Security and Sanitization

### Parameter Validation
All endpoints validate data through an `args` array:
```php
'id' => [
    'validate_callback' => function($param) {
        return is_numeric($param);
    },
    'sanitize_callback' => 'absint',
]
```

### Rate Limiting
Excessive requests from the same IP or API key are blocked via the `RateLimiter::check()` method. Default limit: 60 requests per minute.

---

## 📦 4. Data Transport Security
- **HTTPS:** HTTPS is required for all API endpoints.
- **Secrets:** API keys are stored encrypted in the database.
- **Preflight (CORS):** Only requests from allowed origins are accepted.

## Checklist
1. Is there a Nonce check on all POST requests?
2. Is API key verification performed via `AuthHelper`?
3. Are sensitive values masked in JSON responses?
4. Is `RateLimiter` active?

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Nonce, API Key, HMAC, and Rate Limiting details added. |
