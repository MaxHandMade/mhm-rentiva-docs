---
id: settings-test
title: Settings Test (Diagnostic Testing)
sidebar_label: Settings Test
sidebar_position: 16
slug: /core-configuration/settings-test
---

![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

The Settings Test tab is a diagnostic tool that automatically checks whether all parts of the plugin (Database, Email, File System, WooCommerce Integration, etc.) are correctly configured. Access it via **MHM Rentiva > Settings > Settings Test**.

It ensures your system meets all requirements after installing the plugin or making server changes.

---

## 🩺 Comprehensive Test Categories

The system performs an in-depth scan under the following main headings:

- **Email Infrastructure:** SMTP connection, email sender name, template availability, and test message deliverability.
- **File System Permissions:** Verifies that CSS, JS, and log files can be written to the designated directories (e.g., `/uploads/mhm-rentiva/`).
- **Security Configuration:** Validity of auth keys, and whether IP restriction mechanisms and brute-force protection are active.
- **WooCommerce Integration:** Checks that payment methods, tax rules, and product synchronization are fully compatible with the plugin.
- **Internal System Health:** SQL Mode suitability for performance, PHP version, and the correctness of core WordPress settings (Timezone, etc.).

---

### 🛡️ Diagnostic Report Results

The meaning of each row in the report screen:

| Icon | Status | Description |
| :---: | :--- | :--- |
| ✅ | **PASSED** | The relevant system component meets all requirements and is working without issues. |
| ❌ | **FAILED** | A critical configuration error (e.g., missing file write permission). Must be fixed. |
| ⚠️ | **WARNING** | The system is operational but a performance or configuration improvement is recommended. |

---

### 🖼️ IMAGE: SETTINGS TEST REPORT
*(Settings > Settings Test tab — diagnostic results list and report summary screen)*

---

### Section Summary
- Run this test after every configuration change for **Quick Troubleshooting**.
- Share the results on this page with our team before **Support Requests** to speed up the diagnostic process.
- Perform a **Secure Installation** to ensure your customers do not encounter errors during the booking process.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Settings Test (Diagnostic) documentation created as a standalone page. |
