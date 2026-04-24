---
title: Account payments
description: Usage guide and technical reference for the Account Payments module.
sidebar_position: 5
---
![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

:::info Purpose
This page describes the Account Payments module as a standard reference, covering both technical and operational aspects.
:::

# 🚗 Account Payments

## Contents
- Usage
- Features
- Developer Notes

The Account Payments module is designed to manage and present **account** payment history to visitors on the Rentiva platform.

## Usage

:::tip IMAGE COMING SOON
A screenshot showing the frontend (visitor-facing) appearance of this module will be added here.
:::

To add this module to any page or post, use the shortcode below:

```shortcode
[rentiva_payment_history limit="20"]
```

You can also insert it visually from the Gutenberg block editor by selecting **"MHM Rentiva → Account Payments"**.

### Parameters

The following parameters are available inside the shortcode:

| Parameter | Default | Description |
| :--- | :--- | :--- |
| `limit` | `20` | Maximum number of items to display. |
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

- **HTML Structure:** All containers start with the `.mhm-rentiva-payment-history-wrapper` class.
- **Customization:** CSS variables (`--mhm-color-primary`, etc.) are inherited from the global `css-variables.css` file.

## Section Summary
- The Account Payments page has been aligned to the standard documentation structure with consistent reference headings.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.0-docs | Page alphabetized and image placeholder added. |
