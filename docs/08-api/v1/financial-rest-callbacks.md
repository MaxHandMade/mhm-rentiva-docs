---
id: financial-rest-callbacks
title: Payment Callback API (Payout Callback)
sidebar_label: Payout Callback API
sidebar_position: 50
---

![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

:::info Purpose
This endpoint is used to securely receive payout results from external payment processors (banks, payment institutions) and update Ledger records accordingly.
:::

# 🧾 Payment Callback API

The Payout Callback API is the final step in the financial cycle. It updates the system's financial state based on "Success" or "Failure" signals received from the outside world.

---

## 📍 Endpoint Details
- **URL:** `/wp-json/mhm-rentiva/v1/payouts/{id}/callback`
- **Method:** `POST`
- **Verification:** HMAC SHA-256 (Required)

---

## 🛡️ 1. Security and Verification (HMAC)

To prevent forged notifications, every request must include the following headers:
- **`X-MHM-Timestamp`:** UTC timestamp of when the request was made. If the difference from server time exceeds 300 seconds, the request is rejected.
- **`X-MHM-Signature`:** The `HMAC SHA-256` hash value produced using the request payload and the Secret Key.

---

## 📥 Request Body (Payload)

```json
{
  "status": "confirmed",
  "external_reference": "TRX_998877",
  "reason": "" 
}
```

- **`status`:** `confirmed` (Success) or `failed` (Failure).
- **`external_reference`:** The transaction reference number from the payment institution.
- **`reason`:** The rejection reason in case of failure.

---

## ⚙️ 2. Business Rules and Ledger Update

The system performs atomic operations on the Ledger based on the incoming status:

| Status | Operation | Description |
|---|---|---|
| **confirmed** | Status Update | The payout record is marked as `completed`. No new row is added to the Ledger (the balance was already deducted). |
| **failed** | `payout_reversal` | Since the payment failed, the previously deducted balance is refunded to the Vendor. A reverse entry is added to the Ledger. |
| **Duplicate Request** | Idempotency | If the `payout_id` in question is already in a final status, no action is taken and `200 OK` is returned. |

---

## 🚦 3. Error Handling
- **401 Unauthorized:** Signature verification failed.
- **404 Not Found:** Invalid Payout ID.
- **429 Too Many Requests:** Rate limit (20 requests/minute) exceeded.

## Section Summary
- The Callback API uses HMAC verification to ensure financial data integrity.
- An automatic balance refund mechanism (`reversal`) runs on `failed` status.
- All operations are recorded as an audit trail via `AdvancedLogger`.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | HMAC verification details and Reversal logic added. |
