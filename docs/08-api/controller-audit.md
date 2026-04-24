---
id: controller-audit
title: Controller Architecture and Business Logic
sidebar_label: Controller Audit
sidebar_position: 20
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
MHM Rentiva aims to delegate business logic to service classes in order to prevent the "Fat Controller" anti-pattern. This page is a technical audit report of the current controllers.
:::

# 🧬 Controller and Service Layer Architecture

The plugin architecture is based on controllers only receiving requests, performing authorization checks, and delegating work to the relevant service classes.

---

## 🏗️ 1. Controller Design Patterns

All `*Controller.php` classes must follow these rules:
- **Presentation-Only:** Must not perform data calculations.
- **Validation:** Must validate request input data.
- **Authorization:** Must perform capability checks via `current_user_can` or `SecurityHelper`.

---

## 📊 2. AJAX Controllers Report

### A. AnalyticsController (Thin Controller)
- **File:** `src/Core/Dashboard/AnalyticsController.php`
- **Role:** Handles statistics requests.
- **Business Logic:** Revenue, occupancy, and chart data are entirely within `AnalyticsService`.
- **Result:** ✅ **Compliant with standards.**

### B. PayoutAjaxController (Thin Controller)
- **File:** `src/Core/Financial/PayoutAjaxController.php`
- **Role:** Initiates payout requests.
- **Business Logic:** The `PayoutService` and `AtomicPayoutService` (Transaction) classes execute the operation.
- **Result:** ✅ **Compliant with standards.**

---

## 🌐 3. REST Controllers Report

### A. HealthController (Audit Status)
- **File:** `src/Api/REST/HealthController.php`
- **Observation:** Some database health queries are located directly inside the controller.
- **Recommendation:** Migrating this logic to a `SystemHealthService` class is planned.
- **Result:** ⚠️ **Improvement pending.**

### B. PayoutCallbackController (Transaction Controller)
- **File:** `src/Api/REST/PayoutCallbackController.php`
- **Role:** Processes payment callbacks with their evidence.
- **Security:** HMAC signature verification is handled centrally via `AuthHelper`.
- **Result:** ✅ **Compliant with standards.**

---

## 🛠️ 4. Architectural Standards and Recommendations

The following methods are used to standardize error handling:
1. **`ErrorHandler::format_error()`:** All error responses are standardized through this method.
2. **DTO Classes:** When returning large JSON payloads, DTO classes are used instead of arrays to guarantee a data contract.
3. **`Sanitizer::*`:** All incoming variables are processed through the sanitization layer rather than as raw data.

## Section Summary
- Controllers are kept "Thin."
- Business logic is centralized in "Service" classes.
- API security is provided by `AuthHelper` and `SecurityHelper`.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Controller audit report and design patterns added. |
