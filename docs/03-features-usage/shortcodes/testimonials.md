---
title: Testimonials
description: Usage guide and technical reference for the Testimonials module.
sidebar_position: 15
---
![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

:::info Purpose
This page describes the Testimonials module as a standard reference, covering both technical and operational aspects.
:::

# 🚗 Testimonials

## Contents
- Usage
- Features
- Developer Notes

The Testimonials module is designed to manage and present **support** reviews to visitors on the Rentiva platform.

## Usage

:::tip IMAGE COMING SOON
A screenshot showing the frontend (visitor-facing) appearance of this module will be added here.
:::

To add this module to any page or post, use the shortcode below:

```shortcode
[rentiva_testimonials limit="apply_filters(mhm_rentiva/testimonials/limit"]
```

You can also insert it visually from the Gutenberg block editor by selecting **"MHM Rentiva → Testimonials"**.

### Parameters

The following parameters are available inside the shortcode:

| Parameter | Default | Description |
| :--- | :--- | :--- |
| `limit` | `apply_filters(mhm_rentiva/testimonials/limit` | Maximum number of items to display. |
| `rating` | `apply_filters(mhm_rentiva/testimonials/rating` | Controls the module's **feature** filter behavior. |
| `vehicle_id` | `apply_filters(mhm_rentiva/testimonials/vehicle_id` | Controls the module's **feature** filter behavior. |
| `orderby` | `apply_filters(mhm_rentiva/testimonials/orderby` | Controls the module's **general** sorting behavior. |
| `order` | `apply_filters(mhm_rentiva/testimonials/order` | Controls the module's **general** sorting direction. |
| `show_rating` | `apply_filters(mhm_rentiva/testimonials/show_rating` | Controls the module's **general** display behavior. |
| `show_date` | `apply_filters(mhm_rentiva/testimonials/show_date` | Visibility toggle. `1` (on) or `0` (off). |
| `show_vehicle` | `apply_filters(mhm_rentiva/testimonials/show_vehicle` | Visibility toggle. `1` (on) or `0` (off). |
| `show_customer` | `apply_filters(mhm_rentiva/testimonials/show_customer` | Visibility toggle. `1` (on) or `0` (off). |
| `layout` | `apply_filters(mhm_rentiva/testimonials/layout` | Controls the module's **general** layout behavior. |
| `columns` | `apply_filters(mhm_rentiva/testimonials/columns` | Controls the module's **general** layout behavior. |
| `auto_rotate` | `apply_filters(mhm_rentiva/testimonials/auto_rotate` | Visibility toggle. `1` (on) or `0` (off). |
| `class` | `apply_filters(mhm_rentiva/testimonials/class` | Controls the module's **general** layout behavior. |


## Features

### 📱 Responsive Design
- **Mobile:** Single-column layout.
- **Tablet (under 782px):** Optimized view.
- **Desktop:** Full view at the configured column count or width.

### 🚀 Performance-Focused
- **Smart Caching:** Database queries are optimized and cached by the system.
- **Conditional Loading:** Static assets are only enqueued on pages where the module is used.

## Developer Notes

- **HTML Structure:** All containers start with the `.mhm-rentiva-testimonials-wrapper` class.
- **Customization:** CSS variables (`--mhm-color-primary`, etc.) are inherited from the global `css-variables.css` file.

## Section Summary
- The Testimonials page has been aligned to the standard documentation structure with consistent reference headings.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.0-docs | Page alphabetized and image placeholder added. |
