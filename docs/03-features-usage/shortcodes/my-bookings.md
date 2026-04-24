---
title: Account bookings
description: Usage guide and technical reference for the Account Bookings module.
sidebar_position: 2
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
This page describes the Account Bookings module as a standard reference, covering both technical and operational aspects.
:::

# 🚗 Account Bookings

## Contents
- Usage
- Features
- Developer Notes

The Account Bookings module is designed to manage and present **account** booking processes to visitors on the Rentiva platform.

## Usage

:::tip IMAGE COMING SOON
A screenshot showing the frontend (visitor-facing) appearance of this module will be added here.
:::

To add this module to any page or post, use the shortcode below:

```shortcode
[rentiva_my_bookings limit="10"]
```

You can also insert it visually from the Gutenberg block editor by selecting **"MHM Rentiva → Account Bookings"**.

### Parameters

The following parameters are available inside the shortcode:

| Parameter | Default | Description |
| :--- | :--- | :--- |
| `limit` | `10` | Maximum number of items to display. |
| `status` | `(empty)` | Controls the module's **workflow** behavior. |
| `orderby` | `date` | Controls the module's **general** sorting behavior. |
| `order` | `DESC` | Controls the module's **general** sorting direction. |
| `hide_nav` | `false` | Visibility toggle. `1` (on) or `0` (off). |


## Features

### 📱 Responsive Design
- **Mobile:** Single-column layout.
- **Tablet (under 782px):** Optimized view.
- **Desktop:** Full view at the configured column count or width.

### 🚀 Performance-Focused
- **Smart Caching:** Database queries are optimized and cached by the system.
- **Conditional Loading:** Static assets are only enqueued on pages where the module is used.

## Developer Notes

- **HTML Structure:** All containers start with the `.mhm-rentiva-my-bookings-wrapper` class.
- **Customization:** CSS variables (`--mhm-color-primary`, etc.) are inherited from the global `css-variables.css` file.

## Section Summary
- The Account Bookings page has been aligned to the standard documentation structure with consistent reference headings.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.0-docs | Page alphabetized and image placeholder added. |
