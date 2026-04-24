---
title: Vehicle rating form
description: Usage guide and technical reference for the Vehicle Rating Form module.
sidebar_position: 21
---
![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

:::info Purpose
This page describes the Vehicle Rating Form module as a standard reference, covering both technical and operational aspects.
:::

# 🚗 Vehicle Rating Form

## Contents
- Usage
- Features
- Developer Notes

The Vehicle Rating Form module is designed to manage and present **support** review forms to visitors on the Rentiva platform.

## Usage

:::tip IMAGE COMING SOON
A screenshot showing the frontend (visitor-facing) appearance of this module will be added here.
:::

To add this module to any page or post, use the shortcode below:

```shortcode
[rentiva_vehicle_rating_form vehicle_id=""]
```

You can also insert it visually from the Gutenberg block editor by selecting **"MHM Rentiva → Vehicle Rating Form"**.

### Parameters

The following parameters are available inside the shortcode:

| Parameter | Default | Description |
| :--- | :--- | :--- |
| `vehicle_id` | `(empty)` | Controls the module's **feature** filter behavior. |
| `show_rating_display` | `1` | Visibility toggle. `1` (on) or `0` (off). |
| `show_form` | `1` | Visibility toggle. `1` (on) or `0` (off). |
| `show_ratings_list` | `1` | Visibility toggle. `1` (on) or `0` (off). |
| `class` | `(empty)` | Controls the module's **general** layout behavior. |


## Features

### 📱 Responsive Design
- **Mobile:** Single-column layout.
- **Tablet (under 782px):** Optimized view.
- **Desktop:** Full view at the configured column count or width.

### 🚀 Performance-Focused
- **Smart Caching:** Database queries are optimized and cached by the system.
- **Conditional Loading:** Static assets are only enqueued on pages where the module is used.

## Developer Notes

- **HTML Structure:** All containers start with the `.mhm-rentiva-vehicle-rating-form-wrapper` class.
- **Customization:** CSS variables (`--mhm-color-primary`, etc.) are inherited from the global `css-variables.css` file.

## Section Summary
- The Vehicle Rating Form page has been aligned to the standard documentation structure with consistent reference headings.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.0-docs | Page alphabetized and image placeholder added. |
