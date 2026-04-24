---
id: go-live-checklist
title: Go-Live Checklist (Release Protocol)
sidebar_label: Go-Live Checklist
sidebar_position: 3
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::important Critical Warning
All items must be "Green" (Passed) before going live. In particular, the correctness of financial keys prevents irrecoverable data errors.
:::

# 🚀 Go-Live Checklist

This protocol is designed to guarantee system continuity and data security during Rentiva version transitions.

---

## 🏗️ 1. Infrastructure and License Checks

- [ ] **Pro Mode Activation:** Has the license key been validated on the live server for `Mode::featureEnabled()` checks?
- [ ] **SQL Migrations:** Have the required `up()` scripts for `{$wpdb->prefix}mhm_rentiva_*` tables run without errors?
- [ ] **SSL Enforcement:** Has it been confirmed that payout and webhook traffic flows only over HTTPS?
- [ ] **SMTP / Mailer:** Has a test email been successfully delivered via `Mailer::send()`?

---

## 💰 2. Financial Security Settings

- [ ] **HMAC Secrets:** Have the dedicated API Secret and Key sets for the production environment been entered correctly?
- [ ] **Webhook Idempotency:** Has it been verified that repeated callbacks do not create duplicate entries in `Ledger` (with test mode off)?
- [ ] **Currency Codes:** Has it been confirmed that the current WooCommerce currency settings are compatible with Rentiva `CurrencyHelper`?
- [ ] **Governance Freeze:** Have critical financial permissions (Bulk Approve) been assigned exclusively to authorized `Checker` roles?

---

## ⚡ 3. Application and Performance

- [ ] **Asset Minification:** Have CSS and JS files been minified for the production environment?
- [ ] **Cache Flush:** Have transients and object caches left over from the previous version been cleared via `CacheManager`?
- [ ] **Shortcode Audit:** Are the `[rentiva_...]` shortcodes on critical booking pages rendering correctly?
- [ ] **Cron Health:** Are the financial reporting jobs triggered via `wp-cron` active?

---

## 🚨 4. Emergency (Rollback) Readiness

- [ ] **DB Backup:** Has accessibility of a current database backup been verified?
- [ ] **Version Rollback:** Is a `git` tag or package backup ready to revert to the previous stable version in case of error?
- [ ] **Communication:** Have all stakeholders (Vendors, Operations Team) been informed about the release window?

## Section Summary
- The go-live protocol is an integral part of the version release process.
- A single gap in financial items puts the release into "Blocked" status.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Page expanded with PRO activation and financial security items. |
