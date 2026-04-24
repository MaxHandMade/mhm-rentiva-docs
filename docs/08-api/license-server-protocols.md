---
id: license-server-protocols
title: License Server and Security Protocols
sidebar_label: License Protocols
sidebar_position: 105
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-security_hardened-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
MHM Rentiva handles license validation and activation processes with the external license server (`https://api.maxhandmade.com/v1`) via an asynchronous, high-security protocol.
:::

# 🛡️ License Server and Security Protocols

The system mandates **HMAC-SHA256** signing and data encryption to prevent license key manipulation and Man-in-the-Middle attacks.

---

## 🏗️ 1. Communication Architecture

The plugin manages all license operations through the `LicenseManager` service.

| Criterion | Technical Detail |
| :--- | :--- |
| **Signing Method** | HMAC-SHA256 (Hash-based Message Authentication Code) |
| **Encryption** | Data stream is encrypted over `TLS 1.2/1.3` (HTTPS). |
| **Verification** | Two-way signature check using a Shared HMAC Secret. |
| **API Key** | `MHM_RENTIVA_LICENSE_API_KEY` is used for server identification. |

---

## ✍️ 2. Signature Generation

A signature is generated dynamically for each request and sent via the `X-MHM-SIGNATURE` header.

### A. Canonical Message Structure
Before signing, the following data is concatenated to form the raw message:
1. **HTTP Method:** (e.g., `POST`)
2. **Canonical Path:** (e.g., `/v1/licenses/validate`)
3. **Timestamp:** (e.g., `1709825400`)
4. **Raw Body:** The dataset sent in JSON format.

### B. PHP Signature Code Example
```php
$message   = "POST" . "/v1/licenses/validate" . "1709825400" . $raw_body;
$signature = hash_hmac('sha256', $message, $hmac_secret);
```

---

## 📡 3. HTTP Security Headers

Custom headers used to ensure request security:

- **`X-MHM-API-KEY`:** Identifying License API Key.
- **`X-MHM-TIMESTAMP`:** Request timestamp (+/- 300 second tolerance).
- **`X-MHM-SIGNATURE`:** Digital signature generated with `HMAC-SHA256`.
- **`X-MHM-SITE-HASH`:** The site's unique, one-way encrypted identity.
- **`X-Environment`:** Mode (`production`, `staging`, `development`).

---

## ⏳ 4. Error Handling and Grace Period

When the connection to the server is lost, the plugin does not deactivate immediately:

1. **7-Day Grace Period:** If the site was previously active and fewer than 7 days have passed since the last successful check, the plugin maintains "Active" status even if a connection error occurs.
2. **Offline Mode Audit:** Critical functions (e.g., accepting payments) are not restricted during this period, but if a valid verification cannot be performed by the end of day 7, Pro features are deactivated.
3. **SSL Verification:** SSL certificate verification is mandatory in production environments.

## Section Summary
- The license protocol protects the plugin's intellectual property and user data integrity.
- HMAC-SHA256 guarantees that requests have not been tampered with (integrity).
- The Grace Period mechanism ensures server outages do not affect the user experience.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | HMAC signature architecture, Grace Period, and Offline Mode rules detailed. |
