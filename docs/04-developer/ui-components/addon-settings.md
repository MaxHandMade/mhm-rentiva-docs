---
id: addon-settings
title: AddonSettings Class Architecture (UI)
sidebar_label: Addon Settings (Technical)
sidebar_position: 1
---

![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

:::info Purpose
This page explains how Rentiva's "Additional Services" (Add-ons) settings are configured in the admin panel, and describes the technical architecture of the `AddonSettings` class.
:::

# 🛠️ AddonSettings Class

`AddonSettings` is a settings group built on top of the WP Settings API that manages the global behavior of add-ons.

---

## 🏗️ Architecture

The class integrates with `SettingsCore` and `SettingsHelper` using a modular structure:
- **Namespace:** `MHMRentiva\Admin\Settings\Groups`
- **Methods:** Registration (`register`), default value definition (`get_default_settings`), and access (`require_confirmation`) are all handled through static methods.

---

## 📝 Registration and Field Definitions

The `register()` method adds a new section and settings fields to WordPress:

```php
public static function register(): void {
    $page_slug = SettingsCore::PAGE;

    add_settings_section(
        self::SECTION_ID,
        __( 'Additional Services Settings', 'mhm-rentiva' ),
        array( self::class, 'render_section_description' ),
        $page_slug
    );

    // Field registration via SettingsHelper
    SettingsHelper::checkbox_field($page_slug, 'mhm_rentiva_addon_require_confirmation', ...);
    SettingsHelper::select_field($page_slug, 'mhm_rentiva_addon_display_order', ...);
}
```

---

## 📋 Available Settings Fields

| Option Key | UI Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `require_confirmation` | **Checkbox** | `0` (False) | Whether manual confirmation is required for add-ons. |
| `show_prices_in_calendar` | **Checkbox** | `1` (True) | Whether add-on prices are shown in the calendar. |
| `display_order` | **Select** | `menu_order` | Sorting criterion for add-ons (Title, Price, Date). |

---

## 🛡️ Data Access (Static Accessors)

Developers should use the type-safe accessor methods instead of raw `get_option`:

```php
// Check confirmation requirement
if ( AddonSettings::require_confirmation() ) {
    // Logic
}
```

## Section Summary
- `AddonSettings` is a modernization layer on top of the WP Settings API.
- All settings are fetched atomically via `SettingsCore::get()`.
- For visual design references, see assets under `/website/static/img/docs/ui-components/`.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Page updated to reflect modern SettingsHelper and modularity structure. |
