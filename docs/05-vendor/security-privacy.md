---
id: vendor-security-privacy
title: Vendor Security & Privacy Architecture
sidebar_label: Security & Privacy
slug: /developer/vendor/security-privacy
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-09.03.2026-orange?style=flat-square)

:::info Purpose
This page documents the security architecture protecting vendor financial data — including IBAN encryption, the admin-approved IBAN change workflow, media library isolation, audit trail logging, and permission models.
:::

## Table of Contents
- Overview
- IBAN Encryption (AES-256-CBC)
- IBAN Change Approval Workflow
- Admin IBAN Masking
- Media Library Isolation
- Permission & Capability Model
- Audit Trail (AdvancedLogger)
- Email Notification Security
- Nonce & CSRF Protection
- Pro-Gating

---

## Overview

The Vendor Security module implements a **defense-in-depth** strategy across multiple layers:

| Layer | Protection |
|-------|-----------|
| **Data at Rest** | IBAN encrypted with AES-256-CBC |
| **Data in Transit** | WordPress nonce verification on all forms |
| **Access Control** | Role-based with `rentiva_vendor` and `manage_options` |
| **Change Management** | Critical field changes require admin approval |
| **Audit** | All financial operations logged via AdvancedLogger |
| **Isolation** | Vendor media library restricted to own uploads |

---

## IBAN Encryption (AES-256-CBC)

### Encryption Process

All IBAN numbers are encrypted before database storage. **Plain-text IBANs are NEVER stored.**

```php
// src/Admin/Vendor/VendorApplicationManager.php

public static function encrypt_iban(string $raw_iban): string
{
    if (! function_exists('openssl_encrypt')) {
        return ''; // Fail-safe: return empty, never store plain text
    }

    $key    = AUTH_KEY;           // WordPress security constant
    $iv     = substr(SECURE_AUTH_SALT, 0, 16);  // 16-byte IV from salt
    $method = 'AES-256-CBC';

    $encrypted = openssl_encrypt($raw_iban, $method, $key, 0, $iv);

    return $encrypted !== false ? base64_encode($encrypted) : '';
}
```

### Decryption Process

```php
public static function decrypt_iban(string $encrypted_iban): string
{
    if (! function_exists('openssl_decrypt') || $encrypted_iban === '') {
        return '';
    }

    $key    = AUTH_KEY;
    $iv     = substr(SECURE_AUTH_SALT, 0, 16);
    $method = 'AES-256-CBC';

    $decoded   = base64_decode($encrypted_iban, true);
    $decrypted = openssl_decrypt($decoded, $method, $key, 0, $iv);

    return is_string($decrypted) ? $decrypted : '';
}
```

### Key Security Properties

| Property | Implementation |
|----------|---------------|
| **Algorithm** | AES-256-CBC (industry standard) |
| **Key Source** | `AUTH_KEY` WordPress constant |
| **IV Source** | First 16 bytes of `SECURE_AUTH_SALT` |
| **Fail Mode** | Returns empty string — never stores plain text |
| **Key Rotation** | Changing `AUTH_KEY` invalidates all encrypted IBANs |

:::warning Critical Note
If `AUTH_KEY` or `SECURE_AUTH_SALT` constants are changed in `wp-config.php`, all existing encrypted IBANs become unrecoverable. Ensure these constants are backed up before any modification.
:::

### Where Encrypted IBANs Are Stored

| Context | Meta Key | Storage |
|---------|----------|---------|
| Application | `_vendor_iban` | Post meta on `mhm_vendor_application` |
| Active Vendor | `_rentiva_vendor_iban` | User meta |
| Pending Change | `_rentiva_pending_iban` | User meta |

---

## IBAN Change Approval Workflow

When a vendor updates their IBAN through the **Payment Settings** tab, the change does **NOT** overwrite the active IBAN immediately. Instead, it triggers a two-step admin approval process.

### Workflow Diagram

```
 Vendor Dashboard                    Admin Panel
 (Payment Settings)              (IBAN Requests Tab)
       │                                │
       │  Submit new IBAN               │
       ├──────────────────┐             │
       │                  ▼             │
       │    Encrypt new IBAN            │
       │    Store as _rentiva_          │
       │     pending_iban              │
       │    Set status = 'pending'      │
       │                  │             │
       │    Log: "Vendor #X             │
       │     requested IBAN change"     │
       │                  │             │
       │                  └────────────►│  Badge counter updates
       │                                │
       │  ◄─ Warning notice:            │  Admin sees:
       │  "IBAN pending approval"       │  • Current IBAN (masked)
       │                                │  • New IBAN (full, green)
       │                                │  • [Approve] [Reject]
       │                                │
       │                                ├── Approve:
       │                                │   pending → active IBAN
       │                                │   delete pending meta
       │                                │   Log + Email vendor
       │                                │
       │                                └── Reject:
       │                                    delete pending meta
       │                                    Log + Email vendor
```

### Vendor-Side Implementation

```php
// templates/account/partials/vendor-settings.php

// Compare sanitized IBANs
$new_iban_sanitized     = str_replace(' ', '', strtoupper($new_iban));
$current_iban_sanitized = str_replace(' ', '', strtoupper($current_raw_iban));

if ($new_iban_sanitized !== '' && $new_iban_sanitized !== $current_iban_sanitized) {
    $encrypted = VendorApplicationManager::encrypt_iban($new_iban_sanitized);
    update_user_meta($user_id, '_rentiva_pending_iban', $encrypted);
    update_user_meta($user_id, '_rentiva_iban_change_status', 'pending');
}
```

### Admin-Side Implementation

```php
// src/Admin/Vendor/AdminVendorApplicationsPage.php

// Approve handler
public static function handle_iban_approve_post(): void
{
    // 1. Verify manage_options capability
    // 2. Verify nonce: 'mhm_vendor_iban_approve_' . $vendor_id
    // 3. Move: _rentiva_pending_iban → _rentiva_vendor_iban
    // 4. Delete: _rentiva_pending_iban, _rentiva_iban_change_status
    // 5. Log via AdvancedLogger
    // 6. Fire: do_action('mhm_rentiva_iban_change_approved', $vendor_id)
}
```

### Admin Panel Feature — Badge Counter

The **IBAN Requests** tab displays a real-time counter badge:

```php
$pending_count = static::get_pending_iban_count();
// Uses WP_User_Query with meta_key = '_rentiva_iban_change_status', meta_value = 'pending'

if ($pending_count > 0) {
    $iban_title .= ' <span class="update-plugins count-' . $pending_count . '">
        <span class="plugin-count">' . $pending_count . '</span>
    </span>';
}
```

### IBAN Request Actions

| Action | Admin Post Hook | Nonce |
|--------|----------------|-------|
| Approve | `admin_post_mhm_vendor_iban_approve` | `mhm_vendor_iban_approve_{vendor_id}` |
| Reject | `admin_post_mhm_vendor_iban_reject` | `mhm_vendor_iban_reject_{vendor_id}` |

---

## Admin IBAN Masking

When IBANs are displayed in admin interfaces, they are **always masked**:

```php
$raw = VendorApplicationManager::decrypt_iban($encrypted);
$masked = strlen($raw) > 4
    ? substr($raw, 0, 2) . '******' . substr($raw, -4)
    : 'Not set';

// Example: TR76001200920010000000000 → TR******0000
```

**Exception:** In the IBAN Requests tab, the **new (pending) IBAN** is shown in full to allow admin comparison and verification.

---

## Media Library Isolation

Vendor-uploaded media is isolated per-user:

```php
// src/Admin/Vendor/VendorMediaIsolation.php

class VendorMediaIsolation
{
    public static function register(): void
    {
        // Restricts wp.media queries to only show the current vendor's uploads
        // Prevents vendors from viewing/using other vendors' media files
        add_filter('ajax_query_attachments_args', [self::class, 'filter_media']);
    }

    public static function filter_media(array $query): array
    {
        if (current_user_can('rentiva_vendor') && ! current_user_can('manage_options')) {
            $query['author'] = get_current_user_id();
        }
        return $query;
    }
}
```

---

## Permission & Capability Model

### Role Hierarchy

| Role | Capabilities | Access Level |
|------|-------------|-------------|
| `manage_options` (Admin) | Full access | Approve/reject applications, IBANs, payouts |
| `rentiva_vendor` | Limited | Own dashboard, vehicles, bookings, payout requests |
| `customer` | Read only | View bookings, favorites |

### Capability Checks by Module

| Operation | Required Capability | Guard |
|-----------|-------------------|-------|
| Submit vendor application | `read` (any logged-in user) | `can_apply()` |
| Access vendor dashboard | `rentiva_vendor` | `DashboardContext::resolve()` |
| Request payout | `rentiva_vendor` | `PayoutAjaxController` |
| Approve/reject payout | `manage_options` | `PayoutService` admin handlers |
| Approve/reject IBAN | `manage_options` | `AdminVendorApplicationsPage` |
| View IBAN (decrypted) | `manage_options` | Admin panel only |

---

## Audit Trail (AdvancedLogger)

All security-critical operations are logged via `AdvancedLogger::info()`:

| Event | Log Message | Context Array |
|-------|-------------|---------------|
| IBAN change requested | `Vendor #X requested IBAN change.` | `{vendor, action: iban_change_request}` |
| IBAN approved | `Vendor #X IBAN change approved by Admin #Y.` | `{vendor, action: iban_change_approved}` |
| IBAN rejected | `Vendor #X IBAN change rejected by Admin #Y.` | `{vendor, action: iban_change_rejected}` |
| Payout approved | `Vendor #X IBAN change approved by Admin #Y.` | Logged via PayoutService hook |
| Payout rejected | `Vendor #X IBAN change rejected by Admin #Y.` | Logged via PayoutService hook |

### Logger Architecture

```php
// src/Admin/PostTypes/Logs/AdvancedLogger.php
AdvancedLogger::info(string $message, array $context = []): void
AdvancedLogger::error(string $message, array $context = []): void

// Stores as mhm_log CPT entries with structured metadata
// Retention controlled by: get_option('mhm_rentiva_log_retention_days')
```

---

## Email Notification Security

### IBAN Change Notifications

| Event | Hook | Template | Purpose |
|-------|------|---------|---------|
| IBAN Approved | `mhm_rentiva_iban_change_approved` | `iban-change-approved.html.php` | Notify vendor, alert if unauthorized |
| IBAN Rejected | `mhm_rentiva_iban_change_rejected` | `iban-change-rejected.html.php` | Notify vendor of rejection |

### Security Note in Approval Email

The IBAN approval email includes the line:
> *"If you did not request this change, please contact our support team immediately."*

This serves as a **passive security alert** — if a vendor's account was compromised and the attacker changed the IBAN, the legitimate vendor is notified and can act.

---

## Nonce & CSRF Protection

| Form/Action | Nonce Action | Nonce Field |
|-------------|-------------|-------------|
| Vendor settings form | `mhm_vendor_settings_{user_id}` | `mhm_vendor_settings_nonce` |
| Payout request (AJAX) | `mhm_rentiva_vendor_nonce` | Via `mhmRentivaAnalytics.nonce` |
| IBAN approve (admin) | `mhm_vendor_iban_approve_{vendor_id}` | URL query parameter |
| IBAN reject (admin) | `mhm_vendor_iban_reject_{vendor_id}` | URL query parameter |

---

## Key Source Files

| File | Security Responsibility |
|------|----------------------|
| `src/Admin/Vendor/VendorApplicationManager.php` | IBAN encryption/decryption |
| `src/Admin/Vendor/AdminVendorApplicationsPage.php` | IBAN approval admin handlers |
| `src/Admin/Vendor/VendorMediaIsolation.php` | Media library per-vendor isolation |
| `src/Admin/Vendor/VendorOwnershipEnforcer.php` | Vehicle ownership access control |
| `src/Admin/PostTypes/Logs/AdvancedLogger.php` | Structured audit logging |
| `src/Admin/Emails/Notifications/VendorNotifications.php` | Security alert emails |
| `templates/account/partials/vendor-settings.php` | Vendor self-service settings form |

---

## Changelog
| Date | Version | Note |
|------|---------|------|
| 2026-03-09 | 4.21.0-docs | Initial security & privacy documentation. IBAN approval workflow documented. |
