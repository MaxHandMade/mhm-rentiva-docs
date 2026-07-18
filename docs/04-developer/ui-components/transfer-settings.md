---
id: transfer-settings
title: Transfer Settings (Global Config)
sidebar_label: Transfer Settings
sidebar_position: 8
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro feature
This page documents a capability of the **MHM Rentiva Pro** add-on. It is not part of the free
Lite edition on WordPress.org and requires Pro installed alongside Lite plus a valid licence.
See [Editions — Lite vs Pro](/docs/) for the full split, or get Pro at [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Purpose
This page describes the `TransferSettings` class, which defines the global behavior of the transfer module (payment rules, deposit rates, and custom location types).
:::

# ⚙️ Transfer Settings

`TransferSettings` is the central class that defines the financial and structural rules for transfer operations. It is fully integrated with Rentiva's modern `SettingsHelper` and `SettingsCore` architecture.

---

## 🏗️ Setting Groups and Fields

The class manages the following settings in the admin panel under the `mhm_rentiva_transfer_section` ID:

### 1. Payment Behavior (Payment Type)
Determines the payment model the customer uses when making a transfer booking:
- **Full Payment Required:** The full amount is collected at the time of booking.
- **Deposit (Percentage):** Only a specified percentage (deposit) is collected.

### 2. Deposit Rate
The rate applied when the payment model is set to "Percentage".
- **Default:** 20%
- **Range:** 0% – 100% (type-safe `number_field` validation).

### 3. Custom Location Types
Types entered manually to meet operational needs, in addition to default location types (Airport, Hotel, etc.).
- **Format:** Entered via a `textarea_field`, one category per line.
- **Example:** `Stadium`, `Exhibition Center`, `Yacht Marina`.

---

## 🛠️ Technical Integration

### Registration
Settings fields are registered with type safety via `SettingsHelper`:

```php
SettingsHelper::select_field(
    $page_slug,
    'mhm_transfer_deposit_type',
    __( 'Payment Type', 'mhm-rentiva' ),
    $options,
    $description,
    self::SECTION_TRANSFER
);
```

### Accessors
Static methods are available for safe access to these settings from other parts of the code:
- `TransferSettings::get_deposit_type()`
- `TransferSettings::get_deposit_rate()`

---

## 🛡️ Validation Rules

- **Sanitization:** String values are filtered via `sanitize_text_field`; textarea values via `sanitize_textarea_field`.
- **Validation:** Numeric fields are coerced to integers via `absint` and cannot exceed the specified min/max values.

## Section Summary
- All global rules for the transfer module are managed by this class.
- Settings are presented as an integrated section on Rentiva's general settings page.
- Payment rules are referenced directly by `TransferBookingHandler`.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | TransferSettings class updated to reflect payment models and location types. |
