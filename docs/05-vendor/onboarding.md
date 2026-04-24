---
id: vendor-onboarding
title: Vendor Onboarding
sidebar_label: Onboarding
sidebar_position: 2
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
This page provides a technical explanation of the vendor onboarding process — from the application form to admin approval, role assignment, and data synchronization.
:::

# 🚀 Vendor Onboarding Process

The Rentiva onboarding module uses a **two-stage approval mechanism** to guarantee a controlled Marketplace structure.

---

## 📝 1. Application Form & Shortcode

Vendor applications are submitted through a form rendered by the `[rentiva_vendor_apply]` shortcode.

### Technical Implementation
- **Class:** `MHMRentiva\Admin\Frontend\Shortcodes\Vendor\VendorApply`
- **AJAX Handler:** Runs via the `handle_ajax()` method on the `mhm_vendor_apply` action.
- **Security:** CSRF protection is provided using `wp_create_nonce('mhm_vendor_apply_nonce')` for each application.

### Required Fields
| Field | Meta Key | Type | Encrypted |
|---|---|---|---|
| Full Name | `_vendor_full_name` | Text | No |
| Phone | `_vendor_phone` | Text | No |
| City / Region | `_vendor_city` | SelectWoo | No |
| **IBAN** | `_vendor_iban` | Text | **Yes (AES-256)** |
| **Account Holder** | `_vendor_account_holder` | Text | No |
| ID Document | `_vendor_doc_id` | File | No |
| Driver's License | `_vendor_doc_license` | File | No |
| Proof of Address | `_vendor_doc_address` | File | No |

### Optional Fields
| Field | Meta Key | Type | Note |
|---|---|---|---|
| Tax Office | `_vendor_tax_office` | Text | Added in v4.23.1 |

:::info v4.23.1 Form Changes
- **Service Areas:** The checkbox section was removed and replaced with an informational note.
- **Vehicle Insurance:** Removed from the application form and moved to the vehicle submission form (`[rentiva_vehicle_submit]`).
- **City Selection:** Converted from a text input (`<datalist>`) to a `<select>` + WooCommerce SelectWoo component (`CityHelper::render_select()`).
- **Account Holder:** New required field — bank account holder information.
- **Tax Office:** New optional field.
:::

---

## 🛡️ 2. Eligibility Checks (`Eligibility`)

Before a user can apply, the following rules are checked via `VendorApplicationManager::can_apply()`:
1. The user must not already hold the `rentiva_vendor` role.
2. There must be no existing Pending application.
3. The `Mode::canUseVendorMarketplace()` check must confirm that the license supports this feature.

---

## 🔒 3. Data Storage & Security

Applications are stored as `mhm_vendor_app` CPT entries.

### IBAN Encryption Protocol
IBAN data is never written to the database as plain text:
```php
// VendorApplicationManager::encrypt_iban()
$key = substr(hash('sha256', AUTH_KEY . SECURE_AUTH_SALT), 0, 32);
$iv  = openssl_random_pseudo_bytes(16);
$cipher = openssl_encrypt($raw_iban, 'AES-256-CBC', $key, OPENSSL_RAW_DATA, $iv);
return base64_encode($iv . $cipher);
```
**Note:** If `AUTH_KEY` or `SECURE_AUTH_SALT` change, previously encrypted IBANs can no longer be decrypted.

---

## ⚙️ 4. Admin Approval & Role Assignment

### Approval Flow (`Approve`)
When "Approve" is clicked in the admin panel, `VendorOnboardingController::approve()` performs the following in sequence:
1. **Role Upgrade:** The user is assigned the `rentiva_vendor` role.
2. **Meta Sync:** Data from the application post (`_vendor_*`) is copied to the user meta tables (`_rentiva_vendor_*`). From v4.23.1, the `_vendor_account_holder` and `_vendor_tax_office` fields are also synchronized.
3. **Logging:** The approval date and the approving admin's ID are recorded.
4. **Notification:** The `mhm_rentiva_vendor_approved` hook is triggered.

### Rejection Flow (`Reject`)
When the admin rejects an application:
1. The application status is moved to `trash`.
2. The rejection reason is written to `_vendor_rejection_note`.
3. The `mhm_rentiva_vendor_rejected` hook is triggered.

---

## 📧 5. Email Notifications

All status changes in the vendor lifecycle are handled by the `VendorNotifications` class:
- **Application Received:** The applicant is notified that the application is under review.
- **Approved:** A welcome message and dashboard access details are sent.
- **Rejected:** An informational email is sent with the rejection reason.

---

## 🚗 6. Vehicle Submission Process (v4.23.0)

After a vendor is approved, they can add vehicles using the `[rentiva_vehicle_submit]` form. Features added in v4.23.0:

### City-Filtered Location/Route Selection
Transfer locations and routes are filtered based on the vendor's `_vendor_city` meta value. `LocationProvider::get_by_city()` is used to query by city.

### Per-Route Pricing
Vendors can set their own price for each route. The `min_price` / `max_price` range defined by the admin is enforced. Meta key: `_mhm_rentiva_transfer_route_prices` (JSON).

### Capacity Fields
- **Passenger capacity:** Maximum number of passengers.
- **Luggage limits:** Large and small luggage capacities.

### Vehicle Registration Document Upload
Vendors can upload the vehicle registration document via the form. This document is reviewed by the admin for verification.

### Vehicle Insurance Document Upload (v4.23.1)
An insurance document can be uploaded in addition to the registration. Meta key: `_mhm_rentiva_vehicle_insurance_doc`. This field was moved from the application form to the vehicle submission form — allowing a separate insurance document per vehicle.

### Paid Listing Gate (v4.24.1)

If the paid listing system is enabled by the admin, the vehicle is saved as a **draft** when the vendor submits the form, and the vendor is redirected to the WooCommerce payment page. Once payment is complete, the vehicle automatically moves to the "Pending Review" status. See [Paid Listing System](/mhm-rentiva-docs/docs/vendor/vendor-management#-paid-listing-system-v4241) for details.

### Edit & Re-Review
When a vendor makes a change to a critical field (make, model, plate number, etc.), the vehicle is automatically re-queued for review (`VendorVehicleReviewManager`). Minor changes (price, description) are published immediately.

### Vendor Badge
Vendor vehicles are marked with a vendor badge on vehicle cards.

---

## Section Summary
- The onboarding process is fully AJAX-based and requires no page refresh.
- Sensitive financial data (IBAN) is encrypted at the hardware/server level.
- Role and meta synchronization runs as an atomic operation.
- The application form supports 3 document uploads (ID, license, proof of address). Insurance document was moved to the vehicle submission form in v4.23.1.
- The vehicle submission form includes city-filtered location/route selection, per-route pricing, and insurance document upload.
- City selection uses the SelectWoo component across all forms (v4.23.1).
- If the paid listing feature is enabled, the vehicle form submission redirects to the WC payment page (v4.24.1).

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 01.04.2026 | 4.24.1 | Paid listing gate: vehicle submission → draft → WC payment → pending review flow added. |
| 28.03.2026 | 4.23.1 | Application form: Service Areas and Vehicle Insurance removed. Account Holder (required) and Tax Office (optional) added. City selection converted to SelectWoo. Vehicle insurance document moved to vehicle submission form. Meta synchronization updated. |
| 27.03.2026 | 4.23.0 | Document uploads (4 types), vehicle submission process, city-filtered route selection, route pricing, capacity fields, and re-review mechanism added. |
| 19.03.2026 | 4.21.2 | Page updated with HMAC encryption and meta synchronization details. |
