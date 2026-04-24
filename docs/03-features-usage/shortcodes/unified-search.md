---
title: Unified search
description: Usage guide and technical reference for the Unified Search module.
sidebar_position: 18
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
This page describes the Unified Search module as a standard reference, covering both technical and operational aspects.
:::

# 🚗 Unified Search

## Contents
- Usage
- Features
- Developer Notes

The Unified Search module is designed to manage and present **vehicle** search processes to visitors on the Rentiva platform.

## Usage

:::tip IMAGE COMING SOON
A screenshot showing the frontend (visitor-facing) appearance of this module will be added here.
:::

To add this module to any page or post, use the shortcode below:

```shortcode
[rentiva_unified_search default_tab="default"]
```

You can also insert it visually from the Gutenberg block editor by selecting **"MHM Rentiva → Unified Search"**.

### Parameters

The following parameters are available inside the shortcode:

| Parameter | Default | Description |
| :--- | :--- | :--- |
| `default_tab` | `default` | Controls the module's **workflow** behavior. |
| `default_tab_alias` | `defaultTab` | Controls the module's **feature** filter behavior. |
| `show_rental_tab` | `default` | Visibility toggle. `1` (on) or `0` (off). |
| `show_transfer_tab` | `default` | Visibility toggle. `1` (on) or `0` (off). |
| `show_location_select` | `default` | Visibility toggle. `1` (on) or `0` (off). |
| `show_time_select` | `default` | Visibility toggle. `1` (on) or `0` (off). |
| `show_date_picker` | `default` | Visibility toggle. `1` (on) or `0` (off). |
| `show_dropoff_location` | `default` | Visibility toggle. `1` (on) or `0` (off). |
| `show_pax` | `default` | Visibility toggle. `1` (on) or `0` (off). |
| `show_luggage` | `default` | Visibility toggle. `1` (on) or `0` (off). |
| `service_type` | `both` | Controls the module's **feature** filter behavior. |
| `filter_categories` | `(empty)` | Controls the module's **feature** filter behavior. |
| `redirect_page` | `default` | Controls the module's **workflow** behavior. |
| `layout` | `horizontal` | Controls the module's **general** layout behavior. |
| `search_layout` | `(empty)` | Controls the module's **layout** behavior. |
| `style` | `glass` | Controls the module's **layout** behavior. |
| `location_required` | `0` | Controls whether location selection is required. `1` (required) or `0` (optional). |
| `class` | `(empty)` | Controls the module's **general** layout behavior. |

### Field Requirement Behavior

Field requirement behavior in the search form differs by tab:

- **Rental tab:** Field requirements are conditional, based on the `mhm_rentiva_fields_required` global setting. Default value is `0` (not required).
- **Transfer tab:** Transfer fields (`origin_id`, `destination_id`, `date`, `luggage_count`, `luggage_large`) are always required (hardcoded `required`). Because transfer is a route-based service, these fields cannot be left empty.

:::tip Settings Management
The `mhm_rentiva_fields_required` value can be changed via **MHM Rentiva > Settings**. This setting only affects the rental tab; the transfer tab is always required.
:::

## Features

### 📱 Responsive Design
- **Mobile:** Single-column layout.
- **Tablet (under 782px):** Optimized view.
- **Desktop:** Full view at the configured column count or width.

### 🚀 Performance-Focused
- **Smart Caching:** Database queries are optimized and cached by the system.
- **Conditional Loading:** Static assets are only enqueued on pages where the module is used.

## Developer Notes

- **HTML Structure:** All containers start with the `.mhm-rentiva-unified-search-wrapper` class.
- **Customization:** CSS variables (`--mhm-color-primary`, etc.) are inherited from the global `css-variables.css` file.

## Section Summary
- The Unified Search page has been aligned to the standard documentation structure with consistent reference headings.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 27.03.2026 | 4.22.1 | `location_required` parameter added. Field requirement (fields_required) behavior documented: rental is conditional, transfer is always required. |
| 19.03.2026 | 4.21.0-docs | Page alphabetized and image placeholder added. |
