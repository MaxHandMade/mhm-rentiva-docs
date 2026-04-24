---
title: Vehicles Grid
description: Usage guide and technical reference for the Vehicles Grid module.
sidebar_position: 22
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
This page describes the Vehicles Grid module as a standard reference, covering both technical and operational aspects.
:::

# 🚗 Vehicles Grid

## Contents
- Usage
- Features
- Developer Notes

The Vehicles Grid module is designed to manage and present **vehicle** listings to visitors on the Rentiva platform.

## Usage

:::tip IMAGE COMING SOON
A screenshot showing the frontend (visitor-facing) appearance of this module will be added here.
:::

To add this module to any page or post, use the shortcode below:

```shortcode
[rentiva_vehicles_grid limit="12"]
```

You can also insert it visually from the Gutenberg block editor by selecting **"MHM Rentiva → Vehicles Grid"**.

### Parameters

The following parameters are available inside the shortcode:

| Parameter | Default | Description |
| :--- | :--- | :--- |
| `limit` | `12` | Maximum number of items to display. |
| `columns` | `2` | Controls the module's **general** layout behavior. |
| `orderby` | `title` | Controls the module's **general** sorting behavior. |
| `order` | `ASC` | Controls the module's **general** sorting direction. |
| `category` | `(empty)` | Controls the module's **feature** filter behavior. |
| `featured` | `0` | Visibility toggle. `1` (on) or `0` (off). |
| `show_image` | `1` | Visibility toggle. `1` (on) or `0` (off). |
| `show_title` | `1` | Controls the module's **general** display behavior. |
| `show_price` | `1` | Controls the module's **general** display behavior. |
| `show_features` | `1` | Controls the module's **general** display behavior. |
| `show_rating` | `1` | Controls the module's **general** display behavior. |
| `show_booking_button` | `1` | Controls the module's **general** display behavior. |
| `show_favorite_button` | `1` | Controls the module's **general** display behavior. |
| `show_category` | `1` | Controls the module's **general** display behavior. |
| `show_brand` | `0` | Visibility toggle. `1` (on) or `0` (off). |
| `show_badges` | `1` | Controls the module's **general** display behavior. |
| `show_description` | `0` | Visibility toggle. `1` (on) or `0` (off). |
| `show_availability` | `0` | Controls the module's **general** display behavior. |
| `show_compare_button` | `1` | Controls the module's **general** display behavior. |
| `enable_lazy_load` | `1` | Visibility toggle. `1` (on) or `0` (off). |
| `enable_ajax_filtering` | `0` | Visibility toggle. `1` (on) or `0` (off). |
| `enable_infinite_scroll` | `0` | Visibility toggle. `1` (on) or `0` (off). |
| `image_size` | `medium` | Controls the module's **layout** behavior. |
| `class` | `(empty)` | Controls the module's **general** layout behavior. |
| `custom_css_class` | `(empty)` | Controls the module's **layout** behavior. |
| `min_rating` | `(empty)` | Controls the module's **query** behavior. |
| `min_reviews` | `(empty)` | Controls the module's **query** behavior. |
| `layout` | `grid` | Controls the module's **general** layout behavior. |


## Features

### 📱 Responsive Design
- **Mobile:** Single-column layout.
- **Tablet (under 782px):** Optimized view.
- **Desktop:** Full view at the configured column count or width.

### 🚀 Performance-Focused
- **Smart Caching:** Database queries are optimized and cached by the system.
- **Conditional Loading:** Static assets are only enqueued on pages where the module is used.

## Developer Notes

- **HTML Structure:** All containers start with the `.mhm-rentiva-vehicles-grid-wrapper` class.
- **Customization:** CSS variables (`--mhm-color-primary`, etc.) are inherited from the global `css-variables.css` file.

## Section Summary
- The Vehicles Grid page has been aligned to the standard documentation structure with consistent reference headings.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2-docs | English translation added. |
| 19.03.2026 | 4.21.0-docs | Page alphabetized and image placeholder added. |
