---
title: Account messages
description: Usage guide and technical reference for the Account Messages module.
sidebar_position: 4
---
![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

:::info Purpose
This page describes the Account Messages module as a standard reference, covering both technical and operational aspects.
:::

# 🚗 Account Messages

## Contents
- Usage
- Features
- Developer Notes

The Account Messages module is designed to manage and present **support** messaging processes to visitors on the Rentiva platform.

## Usage

:::tip IMAGE COMING SOON
A screenshot showing the frontend (visitor-facing) appearance of this module will be added here.
:::

To add this module to any page or post, use the shortcode below:

```shortcode
[rentiva_messages]
```

You can also insert it visually from the Gutenberg block editor by selecting **"MHM Rentiva → Account Messages"**.

### Parameters

The following parameters are available inside the shortcode:

| Parameter | Default | Description |
| :--- | :--- | :--- |
| - | - | This shortcode accepts no parameters. |


## Features

### 📱 Responsive Design
- **Mobile:** Single-column layout.
- **Tablet (under 782px):** Optimized view.
- **Desktop:** Full view at the configured column count or width.

### 🚀 Performance-Focused
- **Smart Caching:** Database queries are optimized and cached by the system.
- **Conditional Loading:** Static assets are only enqueued on pages where the module is used.

## Developer Notes

- **HTML Structure:** All containers start with the `.mhm-rentiva-messages-wrapper` class.
- **Customization:** CSS variables (`--mhm-color-primary`, etc.) are inherited from the global `css-variables.css` file.

## Section Summary
- The Account Messages page has been aligned to the standard documentation structure with consistent reference headings.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.0-docs | Page alphabetized and image placeholder added. |
