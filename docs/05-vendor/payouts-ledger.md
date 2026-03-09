---
id: vendor-payouts-ledger
title: Payouts, Ledger & Financial Settlement
sidebar_label: Payouts & Ledger
slug: /developer/vendor/payouts-ledger
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-09.03.2026-orange?style=flat-square)

:::info Purpose
This page documents the complete payout lifecycle — from vendor withdrawal requests to admin approval, ledger debiting, and email notifications. It covers the AJAX-based request flow, double-spending prevention, and the immutable ledger model.
:::

## Table of Contents
- Overview
- Ledger Model
- Payout Request Flow (AJAX)
- PayoutService API
- Admin Approval / Rejection
- Double-Spending Prevention
- Email Notifications
- External Callback (REST API)
- Action Hooks
- Pro-Gating

---

## Overview

The Payout & Ledger module implements a **Model B financial engine** where:

1. **Ledger** stores immutable, append-only financial records (credits and debits)
2. **Payout CPT** (`mhm_payout`) stores mutable workflow state (pending → approved/rejected)
3. **PayoutService** bridges the two, writing to the ledger only at the moment of approval

**Pro-Gating:**

```php
\MHMRentiva\Admin\Licensing\Mode::canUseVendorPayout()
```

---

## Ledger Model

The Ledger is the **single source of truth** for vendor balances.

### Entry Types

| Type | Direction | When Created |
|------|-----------|-------------|
| `commission_credit` | `+` (positive) | Booking completed + cleared |
| `payout_debit` | `−` (negative) | Payout approved by admin |
| `refund` | `−` (negative) | Booking refunded after clearing |

### LedgerEntry Structure

```php
new LedgerEntry(
    $uuid,              // Idempotency key (e.g., 'payout_123')
    $vendor_id,         // User ID
    $booking_id,        // Nullable
    $order_id,          // Nullable
    'payout_debit',     // entry_type
    $amount * -1,       // Negative for debits
    $gross_amount,      // Nullable
    $commission_amount, // Nullable
    $commission_rate,   // Nullable
    $currency,          // e.g., 'TRY'
    'payout',           // category
    'cleared'           // status
);
```

### Balance Calculation

```php
// src/Core/Financial/Ledger.php
Ledger::get_balance(int $vendor_id): float
// Returns SUM of all 'cleared' entries for the vendor
// Positive = available balance
```

### Architectural Invariants
- ❌ **No UPDATE or DELETE** on ledger rows
- ✅ **INSERT only** — corrections are made via counter-entries
- ✅ **Idempotent** — UUID prevents duplicate entries

---

## Payout Request Flow (AJAX)

### Sequence Diagram

```
 Vendor Dashboard          PayoutAjaxController         PayoutService          Ledger
       │                          │                          │                    │
       │  Submit Payout Form      │                          │                    │
       │ ────────────────────►    │                          │                    │
       │   (AJAX: fetch())        │                          │                    │
       │                          │ check_ajax_referer()     │                    │
       │                          │ current_user_can()       │                    │
       │                          │                          │                    │
       │                          │ vendor_has_pending?  ────►                    │
       │                          │ ◄──── false              │                    │
       │                          │                          │                    │
       │                          │ amount >= min_payout? ──►│                    │
       │                          │ ◄──── true               │                    │
       │                          │                          │                    │
       │                          │ request_payout() ────────►                    │
       │                          │                          │ wp_insert_post()   │
       │                          │                          │ (status: pending)  │
       │                          │ ◄──── success            │                    │
       │  ◄─── JSON success       │                          │                    │
       │  (hide form, show msg)   │                          │                    │
```

### AJAX Endpoint

```php
// src/Core/Financial/PayoutAjaxController.php
class PayoutAjaxController
{
    public static function register(): void
    {
        add_action('wp_ajax_mhm_request_payout', [self::class, 'handle_request_payout']);
    }
}
```

### Frontend Handler

```javascript
// assets/js/frontend/user-dashboard.js → initPayoutDashboardAjax()
// 1. Intercepts form submit event
// 2. Shows spinner, disables button
// 3. POSTs to admin-ajax.php with action 'mhm_request_payout'
// 4. On success: hides form, updates status label to "Pending"
// 5. On error: displays error message in notice div
// 6. Always: re-enables button, hides spinner
```

### Pre-Submission Validations (Server-Side)

| Check | Error Response |
|-------|---------------|
| Nonce verification | `check_ajax_referer()` failure |
| `rentiva_vendor` capability | 403 Unauthorized |
| Amount > 0 | 400 Invalid amount |
| No pending payout exists | 400 Pending exists |
| Amount ≥ minimum threshold | 400 Below minimum |
| Balance sufficient | `PayoutService` WP_Error |

---

## PayoutService API

```
src/Core/Financial/PayoutService.php
```

### Methods

#### `get_minimum_payout_amount(): float`
Returns the configurable minimum payout threshold:

```php
(float) get_option('mhm_min_payout_amount', 100.0);
```

#### `vendor_has_pending_payout(int $vendor_id): bool`
Checks for any `mhm_payout` posts with `pending` status authored by this vendor.

#### `request_payout(int $vendor_id, float $amount): int|WP_Error`
Creates a new payout request:
1. Validates amount, minimum threshold, pending state, and available balance
2. Creates `mhm_payout` post with `pending` status
3. Stores `_mhm_payout_amount` meta
4. Returns post ID on success

:::warning Important
`request_payout()` does **NOT** debit the ledger. The debit only occurs upon admin approval.
:::

#### `approve_payout(int $payout_id): true|WP_Error`
1. Validates post exists and is `pending`
2. Creates `payout_debit` LedgerEntry (negative amount)
3. Updates post status to `publish`
4. Flushes metric cache
5. Fires `mhm_rentiva_payout_approved` hook

#### `reject_payout(int $payout_id, string $reason = ''): true|WP_Error`
1. Validates post exists and is `pending`
2. Updates post status to `trash`
3. Stores rejection reason in meta
4. Flushes metric cache
5. Fires `mhm_rentiva_payout_rejected` hook

#### `create_refund_entry(int $vendor_id, int $booking_id, float $amount): true|WP_Error`
Creates a negative `refund` ledger entry for booking cancellations after clearing.

---

## Admin Approval / Rejection

Payout management is handled from the WordPress admin panel within the existing booking/payout admin interface.

### Payout CPT Storage

| Meta Key | Type | Description |
|----------|------|-------------|
| `_mhm_payout_amount` | float | Requested payout amount |
| `_mhm_payout_rejection_reason` | string | Rejection reason (if rejected) |

### Post Status Mapping

| WP Status | Payout State | Meaning |
|-----------|-------------|---------|
| `pending` | Awaiting Review | Vendor submitted, admin hasn't acted |
| `publish` | Approved / Completed | Ledger debited, payout processed |
| `trash` | Rejected | Request declined, no ledger impact |

---

## Double-Spending Prevention

The system uses a **multi-layer defense** against double-spending:

| Layer | Mechanism | Code |
|-------|-----------|------|
| **Layer 1** | Pending check before request | `vendor_has_pending_payout()` |
| **Layer 2** | Balance check at request time | `Ledger::get_balance() >= amount` |
| **Layer 3** | Status check at approval time | `post_status === 'pending'` |
| **Layer 4** | Idempotent ledger UUID | `'payout_' . $payout_id` |

```php
// Layer 1: Frontend + Controller
if (PayoutService::vendor_has_pending_payout($vendor_id)) {
    wp_send_json_error(['message' => 'Pending payout exists'], 400);
}

// Layer 4: Idempotent UUID prevents duplicate ledger entries
$uuid = 'payout_' . $payout_id;
```

---

## Email Notifications

### Payout Events

| Event | Hook | Email Template | Recipient |
|-------|------|---------------|-----------|
| Payout Approved | `mhm_rentiva_payout_approved` | `payout-approved.html.php` | Vendor |
| Payout Rejected | `mhm_rentiva_payout_rejected` | `payout-rejected.html.php` | Vendor |

### Handler Registration

```php
// src/Admin/Emails/Notifications/VendorNotifications.php
add_action('mhm_rentiva_payout_approved', [self::class, 'on_payout_approved'], 10, 3);
add_action('mhm_rentiva_payout_rejected', [self::class, 'on_payout_rejected'], 10, 4);
```

### Email Context

```php
$ctx = [
    'vendor' => ['name' => $user->display_name, 'email' => $user->user_email],
    'payout' => [
        'id'               => $payout_id,
        'amount_formatted' => self::format_amount($amount),  // e.g., "₺5,000.00"
    ],
    'site'  => ['name' => get_bloginfo('name'), 'url' => home_url('/')],
    'panel' => ['url' => home_url('/panel/')],
];
```

---

## External Callback (REST API)

For external payment processors, a REST callback endpoint exists:

```
POST /wp-json/mhm-rentiva/v1/payouts/{id}/callback
```

Implemented in `src/Api/REST/PayoutCallbackController.php`:
- **Authentication:** HMAC signature verification
- **Idempotent:** If `_mhm_payout_status` meta already set, returns 200 OK without re-processing
- **Success callback:** Marks payout as completed
- **Failure callback:** Creates a ledger reversal entry

---

## Action Hooks Reference

| Hook | Parameters | When |
|------|-----------|------|
| `mhm_rentiva_payout_approved` | `(int $payout_id, int $vendor_id, float $amount)` | Admin approves payout |
| `mhm_rentiva_payout_rejected` | `(int $payout_id, int $vendor_id, float $amount, string $reason)` | Admin rejects payout |

---

## Key Source Files

| File | Responsibility |
|------|---------------|
| `src/Core/Financial/PayoutService.php` | Core payout logic |
| `src/Core/Financial/PayoutAjaxController.php` | AJAX endpoint for vendor requests |
| `src/Core/Financial/Ledger.php` | Immutable financial ledger |
| `src/Core/Financial/LedgerEntry.php` | Ledger entry value object |
| `src/Api/REST/PayoutCallbackController.php` | External processor callback |
| `src/Admin/PostTypes/Payouts/PostType.php` | `mhm_payout` CPT registration |
| `templates/account/partials/vendor-payouts.php` | Frontend payout UI template |
| `assets/js/frontend/user-dashboard.js` | AJAX payout JS handler |

---

## Changelog
| Date | Version | Note |
|------|---------|------|
| 2026-03-09 | 4.21.0-docs | Initial payouts & ledger documentation. AJAX flow and email hooks documented. |
