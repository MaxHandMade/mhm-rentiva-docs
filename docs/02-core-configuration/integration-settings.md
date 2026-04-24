---
id: integration-settings
title: Integration Settings (REST API)
sidebar_label: Integration Settings
sidebar_position: 13
slug: /core-configuration/integration-settings
---

![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

The Integration Settings tab is the section where you manage the REST API infrastructure that enables MHM Rentiva to communicate with external applications (mobile apps, third-party websites, etc.). Access it via **MHM Rentiva > Settings > Integration Settings**.

---

## ⚡ REST API Configuration

Essential API parameters for maintaining system performance and security:

### 1. Rate Limiting
- **API Rate Limiting:** Restricts request frequency to prevent malicious usage.
- **Authenticated Request Limit:** Maximum requests per minute for authenticated users (e.g., 60).
- **Public Request Limit:** Maximum requests per minute for anonymous visitors (e.g., 10).

### 2. Token Settings
- **Token Expiry (Hours):** The validity period of issued API keys (e.g., 24 hours).
- **Token Refresh:** Allows old tokens to be replaced with new ones, maintaining session continuity.

### 3. Security Settings
- **Require HTTPS:** Enforces SSL encryption for all API communication.
- **User-Agent Filter:** Blocks bots and scraping tools such as `curl` and `wget`.
- **IP Whitelist:** Restricts access to specific IP addresses only (comma-separated list).

### 4. API Caching
- Stores API responses for a defined period (in seconds) to reduce database load.

---

## 🔑 Secure API Access Tokens

Create custom access keys here to allow external applications to access your data:

- **Client ID:** A name identifying which application the key is for (e.g., "Android App").
- **Permission Level:**
    - **READ:** Can only list data.
    - **WRITE:** Can create or update bookings.
    - **ADMIN:** Full access.

---

### 🖼️ IMAGE: API MANAGEMENT PANEL
*(Settings > Integration Settings tab, rate limiting and API key management area)*

---

## 📚 Developer Endpoint Reference

This section lists all API endpoints offered by the plugin. For each endpoint the following information is provided:

- **Method:** GET, POST, etc.
- **Endpoint:** API address (e.g., `mhm-rentiva/v1/vehicles`).
- **Namespace:** Default `mhm-rentiva/v1`.

:::note Advanced Diagnostics
During development, enable "Error Logging" to track API errors in detail. Keep this disabled on live sites for security.
:::

---

### Section Summary
- Use **API Security** to protect your data from unauthorized external access.
- Use **Access Tokens** to connect your own mobile applications to the plugin.
- Use the **Endpoint List** as a ready-made technical reference for your developers.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Integration Settings (REST API) documentation created with full security and key management details. |
