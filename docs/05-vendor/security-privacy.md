---
id: vendor-security-privacy
title: Vendor Security & Privacy Architecture
sidebar_label: Security & Privacy
sidebar_position: 30
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
MHM Rentiva uses a multi-layer security architecture (Defense-in-Depth) to protect vendors' financial data and personal information. This page explains encryption methods, data isolation, and audit trail mechanisms.
:::

# 🛡️ Security & Privacy Layers

Vendor data is protected by four main layers, from the database level to the application interface.

---

## 🔒 1. Financial Data Encryption (IBAN Security)

Vendors' IBAN data is never stored as plain text in the database.

### AES-256-CBC Encryption
- **Algorithm:** Industry-standard `AES-256-CBC`.
- **Key Management:** Keys derived from WordPress `AUTH_KEY` and `SECURE_AUTH_SALT` constants.
- **Fail-Safe:** If the encryption library (OpenSSL) is not available, the system returns an empty value and stops the save to prevent data leakage.

```php
// VendorApplicationManager::encrypt_iban();
// Encrypted data is stored using base64_encode().
```

:::warning Critical Warning
Changing the security keys in `wp-config.php` renders all existing encrypted IBAN data unreadable. These keys must always be backed up.
:::

---

## 🚦 2. High-Criticality Field Change Approval

Changes to critical fields such as IBAN by the vendor do not take effect immediately — an **Admin Approval Process** is triggered.

### IBAN Change Workflow
1. **Request:** The vendor enters a new IBAN.
2. **Temporary Storage:** The new IBAN is encrypted and stored in the `_mhm_rentiva_pending_iban` meta field.
3. **Admin Notification:** A counter badge appears in the admin panel.
4. **Approve/Reject:** If the admin approves, the temporary IBAN is moved to the main IBAN field. If rejected, the temporary data is deleted and the vendor receives an email.

---

## 📁 3. Data & Media Isolation

Vendors cannot access other users' data or media files.

- **Media Isolation:** The `ajax_query_attachments_args` filter restricts vendors to seeing only the images they have uploaded.
- **Dashboard Isolation:** The `VendorOwnershipEnforcer` class automatically adds a `post_author` filter to all database queries, preventing unauthorized access.

---

## 📝 4. Audit Trail

All critical security events are logged via `AdvancedLogger`.

| Event | Content | Level |
|---|---|---|
| IBAN Change | "Vendor #X requested an IBAN change." | `INFO` |
| Login Attempt | Failed vendor dashboard login attempts. | `WARNING` |
| Payout Approval | "Admin #Y approved a payout for Vendor #X." | `CRITICAL` |

Logs can be monitored from the **System Logs** section of the admin panel and are automatically purged based on the `mhm_rentiva_log_retention_days` setting.

---

## ⚙️ 5. Technical Security Summary

| Mechanism | Protection Type | Detail |
|---|---|---|
| **Nonce (CSRF)** | Form Security | Unique token for every AJAX and form operation. |
| **Capability** | Authorization | Access outside the `rentiva_vendor` role is blocked. |
| **Masking** | Privacy | Only the last 4 digits of IBANs are shown in the UI. |

## Section Summary
- IBAN data is stored encrypted with `AES-256-CBC`.
- Critical changes are subject to admin approval.
- Multi-layer isolation keeps vendor data separated from one another.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Data encryption, IBAN approval workflow, and media isolation details added. |
