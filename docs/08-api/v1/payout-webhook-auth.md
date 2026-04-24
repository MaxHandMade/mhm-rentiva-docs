---
id: payout-webhook-auth
title: Payment Webhook Authentication
sidebar_label: Payout Webhook Auth
sidebar_position: 80
---

![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

:::info Purpose
`PayoutWebhookAuth` is a specialized security layer used to verify the authenticity of notifications (webhooks) arriving from external payment services.
:::

# 🔒 Payment Webhook Authentication

MHM Rentiva subjects every payment notification received from the outside world to a strict verification process to maintain financial data integrity.

---

## 🛡️ 1. Authentication Model

This component operates as an extension of the `AuthHelper` class and uses only the dedicated keys defined for payment service providers (PSPs).

- **Source Verification:** Checks that requests originate only from known IP addresses or with a valid application identity.
- **Secret Key:** A unique `Webhook Secret` is defined for each PSP integration.

---

## ✍️ 2. Signature Verification

The most commonly used security method is `HMAC-SHA256`. The process consists of the following steps:

1. **Header Extraction:** The `X-Rentiva-Signature` value from the request header is retrieved.
2. **Hash Generation:** A new hash is computed server-side using the incoming raw request body and the system's `Webhook Secret`.
3. **Comparison:** The computed hash is compared against the signature in the header using `hash_equals()` (timing-attack safe).

---

## ⏳ 3. Replay and Rate Protection

### Timestamp Check
The timestamp within the request is compared against the server time. If the difference exceeds 5 minutes (300s), the request is treated as a "Replay Attack" and rejected.

### Webhook Rate Limiter
- If more than one notification arrives for the same transaction ID per second, the system processes only the first.
- The `WebhookRateLimiter` class manages duplicate calls (retries) originating from the payment provider.

---

## ⚙️ 4. Idempotent Operation Strategy

If the payment service provider sends the same successful notification (`confirmed`) again:
- The system checks the status of that operation in the database.
- If the operation is already "Completed", no Ledger operation is performed, but `200 OK` is returned to the service provider to signal that the process has concluded.

## Section Summary
- `PayoutWebhookAuth` is the most critical security layer preventing financial manipulation.
- The use of `hash_equals` protects against timing attacks.
- Replay protection prevents old or intercepted requests from being re-executed.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | HMAC-SHA256, hash_equals, and Replay Attack protection details added. |
