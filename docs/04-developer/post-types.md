---
id: post-types
title: Custom Post Types
sidebar_label: Custom Post Types
sidebar_position: 10
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
Rentiva extends standard WordPress tables with a Custom Post Type (CPT) architecture to manage complex business logic.
:::

# 🗄️ Custom Post Types

The plugin stores data in two main groups: "Operational" (Vehicles/Bookings) and "System" (Payouts/Logs).

---

## 💰 1. Financial Post Types

### `mhmrentiva_payout` (Payout Requests)
Manages vendor payment requests within the Model B workflow.
- **Usage:** Holds off-ledger workflow statuses (Pending, Approved, Processing).
- **Security:** Only users with `manage_options` or `rentiva_financial_manager` capability can view these records.
- **Relationship:** Each payout record maps to `mhmrentiva_ledger` rows in the database via Transaction ID.

---

## 💬 2. Communication Post Types

### `mhmrentiva_message` (Messages)
Manages messaging traffic between customers, vendors, and admins.
- **Thread Management:** Groups messages via the `_mhmrentiva_thread_id` meta key.
- **UUID Support:** Thread IDs support both integer and UUID (string) formats.
- **Visibility:** Hidden from the standard admin menu; managed through a dedicated messaging interface.

---

## 🪵 3. System and Audit Post Types

### `mhmrentiva_app_log` (Application Logs)
Stores system errors, critical API calls, and audit trails.
- **Automatic Cleanup (Retention):** The `LogRetention::purge()` routine deletes records older than 30 days by default, running daily.
- **Categories:** Logs at Error, Info, and Critical severity levels.

---

## 4. Operational Post Types

The plugin works with the following CPTs:
- **`mhmrentiva_vehicle`:** Rental vehicle portfolio.
- **`mhmrentiva_booking`:** Booking records and calendar.
- **`mhmrentiva_addon`:** Vehicle add-ons (child seat, GPS, insurance, etc.).

---

## 5. Vendor Marketplace Post Types (Pro)

### `mhmrentiva_vendor_app` (Vendor Applications)
Manages vendor applications within the vendor marketplace.
- **CPT Slug:** `mhmrentiva_vendor_app` (14 characters — compliant with WordPress's 20-character limit). **NOTE:** NOT `mhmrentiva_vendor_application`.
- **Usage:** The vendor onboarding process (application, approval, rejection, suspension) runs through this CPT.
- **Management:** CRUD operations via `VendorApplicationManager`; status transitions (approve/reject/suspend) via `VendorOnboardingController`.
- **Security:** IBAN data is encrypted with AES-256-CBC (`OPENSSL_RAW_DATA` flag). If OpenSSL is unavailable, an empty string is returned — plain text is NEVER stored.
- **File:** `src/Admin/Vendor/PostType/VendorApplication.php`

## Section Summary
- CPTs are optimized with `no_found_rows` and limited meta queries to reduce database load.
- Financial records (`mhmrentiva_payout`) are never deleted directly from the database; they are archived via status change.
- Logs (`mhmrentiva_app_log`) are purged regularly for performance.
- Vendor applications are stored in the `mhmrentiva_vendor_app` CPT (14 characters, within WP 20-char limit).

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 27.03.2026 | 4.23.0 | `mhmrentiva_addon` and `mhmrentiva_vendor_app` CPTs and vendor marketplace details added. |
| 19.03.2026 | 4.21.2 | `mhmrentiva_payout`, `mhmrentiva_message`, and `LogRetention` details added. |
