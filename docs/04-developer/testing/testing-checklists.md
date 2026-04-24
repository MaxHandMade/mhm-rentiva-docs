---
id: testing-checklists
title: Testing Checklists
sidebar_label: Testing Checklists
sidebar_position: 3
---

![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

:::info Purpose
This page contains the critical checklists that must be completed when a new feature is developed or before a release is published.
:::

# ✅ Testing Checklists

Beyond automated tests, the following checklists must be run manually or semi-automatically to maintain system integrity.

---

## 🛠️ Development Process (Local Checks)

This is the final layer before the code is sent to the staging environment:
- [ ] **Strict Typing:** Do all new PHP files contain `declare(strict_types=1);`?
- [ ] **Sanitization:** Have all `$_POST` and `$_GET` values been sanitized?
- [ ] **Escaping:** Have all HTML outputs been filtered with `esc_html` or `wp_kses`?
- [ ] **i18n:** Have all user-facing strings been marked with the `mhm-rentiva` text domain?

---

## 💰 Financial & Scenario Tests

For changes that affect the financial layer, the following scenarios must be verified:
- [ ] **Ledger Integrity:** Is the balance correctly reflected in `Ledger` after the transaction?
- [ ] **Dual Approval:** Is the Maker-Checker principle working? (Block on self-approval).
- [ ] **CSV Export:** Can the payment list be exported in Excel-compatible format (UTF-8 BOM)?
- [ ] **Negative Flow:** Are insufficient balance or invalid date errors being caught?

---

## 🚀 Pre-Release Checklist

Steps that must be completed before minor/major releases:
- [ ] **Migration Check:** Are SQL migrations (up/down) ready for new tables or columns?
- [ ] **Cache Flush:** Have old transients been cleared via `CacheManager`?
- [ ] **Shortcode Audit:** Are all frontend shortcodes (`[rentiva_...]`) rendering correctly?
- [ ] **Rate Limit:** Is rate limiting active on API endpoints?

---

## 📱 UI/UX Quality Control

- [ ] **Responsive Design:** Do Elementor widgets display correctly on mobile and tablet?
- [ ] **Date Picker:** Does the calendar picker work across all browsers (Chrome, Safari, Firefox)?
- [ ] **Error UI:** Do form error messages guide the user correctly?

## Section Summary
- Checklists guarantee the operational quality of the system.
- Completing the financial items is **not optional**.
- Each completed checklist is documented in the `Sprint Report`.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Page updated with technical debt and financial stress test items. |
