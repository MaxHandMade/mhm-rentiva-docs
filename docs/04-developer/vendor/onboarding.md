---
id: vendor-onboarding
title: Vendor Onboarding & Application Lifecycle
sidebar_label: Onboarding
slug: /developer/vendor/onboarding
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-09.03.2026-orange?style=flat-square)

:::info Purpose
This page documents the complete vendor onboarding lifecycle — from the initial application form to admin review, approval, and role assignment.
:::

## Table of Contents
- Overview
- Application Form & Shortcode
- Eligibility Checks
- Application Data Storage
- Admin Review & Approval
- Role Assignment & Meta Sync
- Action Hooks
- Pro-Gating

---

## Overview

The Vendor Onboarding module provides a **two-stage approval process** for users who want to become vehicle rental vendors on the platform. Users submit an application through a frontend form; administrators review and approve or reject applications from the WordPress admin panel.

**Pro-Gating:** All vendor marketplace features are controlled by:

```php
\MHMRentiva\Admin\Licensing\Mode::canUseVendorMarketplace()
```

If the license does not support the vendor marketplace, the entire onboarding flow is disabled.

---

## Application Form & Shortcode

The application form is rendered by the `[rentiva_vendor_apply]` shortcode, implemented in:

```
src/Admin/Frontend/Shortcodes/Vendor/VendorApply.php
```

### Form Fields

| Field | Meta Key | Type | Required |
|-------|----------|------|----------|
| Full Name | `_vendor_full_name` | Text | ✅ |
| Phone | `_vendor_phone` | Tel | ✅ |
| City | `_vendor_city` | Text | ✅ |
| Service Areas | `_vendor_service_areas` | Checkbox Array | ✅ |
| IBAN | `_vendor_iban` | Text (encrypted) | ✅ |
| Tax Number | `_vendor_tax_number` | Text | ❌ |
| Bio | `_vendor_bio` | Textarea | ❌ |
| Documents | `_vendor_documents` | File Upload | ❌ |

### AJAX Submission

The form submits via AJAX through `VendorApply::handle_ajax()`:

```php
add_action('wp_ajax_mhm_vendor_apply', [VendorApply::class, 'handle_ajax']);
```

---

## Eligibility Checks

Before a user can submit an application, `VendorApplicationManager::can_apply()` performs the following checks:

```php
public static function can_apply(int $user_id): bool
{
    // 1. User must NOT already have the 'rentiva_vendor' role
    // 2. User must NOT have a pending application (post_status = 'pending')
    // Returns true only if both conditions are satisfied
}
```

**Prevented Scenarios:**
- Existing vendors cannot re-apply
- Users with a pending (unreviewed) application cannot submit duplicates

---

## Application Data Storage

Applications are stored as `mhm_vendor_application` Custom Post Type entries:

| Field | Storage | Notes |
|-------|---------|-------|
| Post Author | `post_author` | The applicant's `user_id` |
| Post Status | `post_status` | `pending` → `publish` (approved) or `trash` (rejected) |
| IBAN | `_vendor_iban` (post meta) | **AES-256-CBC encrypted** before storage |
| Other Fields | Post meta | Sanitized and stored as `_vendor_*` meta keys |

### IBAN Encryption at Application Time

```php
$encrypted = VendorApplicationManager::encrypt_iban($raw_iban);
// Uses openssl_encrypt with AES-256-CBC
// Key: AUTH_KEY constant
// IV:  derived from SECURE_AUTH_SALT
// Returns empty string on failure — plain text is NEVER stored
```

---

## Admin Review & Approval

Administrators manage applications from the **Vendor Management** admin page:

```
Admin Menu → MHM Rentiva → Vendor Management → Pending Applications tab
```

### Application Detail View

The admin sees:
- Applicant name, email, phone, city
- Service areas and bio
- Uploaded documents
- **Masked IBAN** (e.g., `TR12******5678`) — full IBAN is never shown in the list view

### Approval Flow

```
┌──────────────┐    Admin clicks     ┌─────────────────┐
│   Pending    │ ──────────────────► │ VendorOnboarding │
│  Application │    "Approve"        │  Controller      │
└──────────────┘                     │  ::approve()     │
                                     └────────┬────────┘
                                              │
                              ┌───────────────┼───────────────┐
                              ▼               ▼               ▼
                     Assign Role      Sync Meta Data    Fire Hook
                   'rentiva_vendor'   to User Meta    'mhm_rentiva_
                                                     vendor_approved'
```

### Meta Sync on Approval

When approved, `VendorOnboardingController::approve()` copies application meta to **user meta**:

```php
// Application post meta → User meta mapping
'_vendor_phone'         → '_rentiva_vendor_phone'
'_vendor_city'          → '_rentiva_vendor_city'
'_vendor_iban'          → '_rentiva_vendor_iban'        // stays encrypted
'_vendor_service_areas' → '_rentiva_vendor_service_areas'
'_vendor_bio'           → '_rentiva_vendor_bio'
'_vendor_tax_number'    → '_rentiva_vendor_tax_number'
```

---

## Role Assignment

### Vendor Role Registration

```php
// Registered in Plugin::register_vendor_role() at init priority 20
add_role('rentiva_vendor', __('Rentiva Vendor', 'mhm-rentiva'), [
    'read'                   => true,
    'edit_posts'             => true,
    'upload_files'           => true,
    'edit_published_posts'   => true,
    'delete_posts'           => true,
]);
```

### Suspension

Administrators can suspend vendors via `VendorOnboardingController::suspend()`:
- Removes `rentiva_vendor` role
- Adds `customer` role
- Sets `_rentiva_vendor_status` meta to `suspended`

---

## Action Hooks

| Hook | Parameters | Fired When |
|------|-----------|------------|
| `mhm_rentiva_vendor_application_submitted` | `(int $user_id)` | User submits application form |
| `mhm_rentiva_vendor_approved` | `(int $user_id, int $application_id)` | Admin approves application |
| `mhm_rentiva_vendor_rejected` | `(int $user_id, int $application_id, string $reason)` | Admin rejects application |

### Email Notifications

All hooks are consumed by `VendorNotifications` class which sends transactional emails:

```php
// Registered in VendorNotifications::register()
add_action('mhm_rentiva_vendor_approved', [self::class, 'on_vendor_approved'], 10, 2);
add_action('mhm_rentiva_vendor_rejected', [self::class, 'on_vendor_rejected'], 10, 3);
```

---

## Key Source Files

| File | Responsibility |
|------|---------------|
| `src/Admin/Vendor/VendorApplicationManager.php` | CRUD, eligibility, IBAN encryption |
| `src/Admin/Vendor/VendorOnboardingController.php` | Approve, reject, suspend logic |
| `src/Admin/Vendor/AdminVendorApplicationsPage.php` | Admin UI tabs and form handlers |
| `src/Admin/Frontend/Shortcodes/Vendor/VendorApply.php` | Frontend application form shortcode |
| `src/Admin/Emails/Notifications/VendorNotifications.php` | Transactional email handlers |

---

## Changelog
| Date | Version | Note |
|------|---------|------|
| 2026-03-09 | 4.21.0-docs | Initial vendor onboarding documentation created. |
