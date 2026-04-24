---
id: api-key-manager
title: API Key Management (API Key Manager)
sidebar_label: API Key Manager
sidebar_position: 30
---

![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

:::info Purpose
`APIKeyManager` is the central key management hub that enables MHM Rentiva to communicate securely with the outside world. This page explains the lifecycle of keys and the security standards that govern them.
:::

# 🔑 API Key Management

API keys are digital identities that allow third-party software (Mobile Apps, ERP systems, accounting software, etc.) to access Rentiva data.

---

## 🏗️ 1. Component Role and Architecture

The `APIKeyManager` class works in coordination with `AuthHelper` to handle the following tasks:
- **Uniqueness:** Guarantees that every key is unique across the system.
- **Permission Assignment:** Assigns `read_only` or `read_write` permissions to keys.
- **Monitoring:** Records which key was used, when, and from which IP, via `AdvancedLogger`.

---

## 🔄 2. Key Lifecycle

### Generation
- Keys are generated from cryptographically secure random strings (`wp_generate_password`).
- The hashed version of the generated key is stored in the database.

### Activation and Usage
- A key becomes active the moment it is generated.
- It is sent via the `X-Rentiva-API-Key` header during requests.

### Rotation
- **Security Policy:** Keys are recommended to be rotated every 90 days.
- **Grace Period:** When a new key is generated, the old one may continue to work for 24 hours "until invalidated" (depending on configuration).

---

## 🛡️ 3. Security and Privacy Rules

- **Logging Prohibited:** The plaintext value of API keys must never be written to log files (`debug.log`).
- **Database Security:** Keys are stored in the database hashed with `MD5` or `SHA-256` (per WP standards).
- **IP Restriction:** Specific API keys can be restricted to only accept requests from defined IP addresses.

---

## 🛠️ 4. Operational Recommendations

1. **Environment Separation:** Always use different keys for staging and production environments.
2. **Least Privilege:** If an integration only reads data, never assign it `read_write` permission.
3. **Instant Revocation:** In the event of a suspected leak, the relevant key should be revoked with a single click from the admin panel.

## Section Summary
- `APIKeyManager` is the heart of all REST security.
- Keys are never stored or shared in plaintext.
- Periodic rotation and IP restriction are considered best practices.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Key lifecycle, Grace Period, and IP restriction details added. |
