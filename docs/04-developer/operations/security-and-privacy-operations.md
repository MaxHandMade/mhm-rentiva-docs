---
id: security-and-privacy-operations
title: Security & Privacy Operations
sidebar_label: Security and Privacy
sidebar_position: 4
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
This guide covers data protection in the Rentiva infrastructure, GDPR/KVKK compliance, and incident response processes.
:::

# 🔒 Security & Privacy Operations

Rentiva operates under the "Security by Design" principle, maintaining strict control over data from the moment it is collected to the moment it is destroyed.

---

## 🛡️ Security Layers and Tools

### 🔑 Access Control (`AuthHelper`)
All admin and API access passes through `AuthHelper::verify_request()`.
- **Capability Checks:** Operational actions can be restricted with the custom `rentiva_financial_manager` capability instead of `manage_options`.
- **API Key Rotation:** API keys should be rotated every 90 days as a precaution against potential compromise.

### 🛡️ Input Security (`SecurityHelper`)
Every value entering the database passes through `SecurityHelper::validate_*` methods:
- **XSS Protection:** HTML content is filtered through a whitelist via `wp_kses`.
- **SQLi Protection:** Raw SQL is prohibited; all queries are parameterized using `$wpdb->prepare()`.

---

## ⚖️ Data Privacy (Privacy & GDPR)

### 🧹 Data Anonymization
When a user account is deleted or the legal retention period expires:
- `PrivacyManager::anonymize_user_data()` is triggered, masking names, email addresses, and IP addresses as `deleted_u_{id}`.
- **Rule:** Financial `Ledger` records are anonymized but not deleted, in order to preserve accounting integrity.

### 📅 Data Retention Policy
- **Web Logs:** Automatically purged after 30 days.
- **Audit Logs:** Retained as read-only for 2 years as required by law.

---

## 🚨 Incident Response Protocol

When a data breach or anomaly is detected:
1. **Isolation:** Affected IP addresses are globally blocked via `RateLimiter`.
2. **Snapshot:** The current state of the database is backed up for forensic analysis.
3. **Analysis:** `AdvancedLogger` records are scanned to determine the scope of the breach.
4. **Notification:** Affected users and authorities are notified within the legal timeframe (72 hours for GDPR).

---

## 🔄 Security Flow Diagram

```mermaid
graph TD
    A[Request] --> B{AuthHelper?}
    B -- Denied --> C[403 Forbidden]
    B -- Approved --> D{SecurityHelper?}
    D -- Clean --> E[Process]
    D -- Malicious --> F[WAF Block & Log]
```

## Section Summary
- Security operations follow the "Least Privilege" principle.
- `Ledger` data is the most sensitive part of the system; direct intervention is prohibited.
- Privacy and security are guaranteed through continuous monitoring.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Page updated with SecurityHelper and anonymization protocols. |
