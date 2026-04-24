---
title: Availability calendar
description: Usage guide and technical reference for the Availability Calendar module.
sidebar_position: 6
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
This page describes the Availability Calendar module as a standard reference, covering both technical and operational aspects.
:::

# 🚗 Availability Calendar

## Contents
- Usage
- Features
- Developer Notes

The Availability Calendar module is designed to manage and present **booking** availability to visitors on the Rentiva platform.

## Usage

:::tip IMAGE COMING SOON
A screenshot showing the frontend (visitor-facing) appearance of this module will be added here.
:::

To add this module to any page or post, use the shortcode below:

```shortcode
[rentiva_availability_calendar vehicle_id=""]
```

You can also insert it visually from the Gutenberg block editor by selecting **"MHM Rentiva → Availability Calendar"**.

### Parameters

The following parameters are available inside the shortcode:

| Parameter | Default | Description |
| :--- | :--- | :--- |
| `vehicle_id` | `(empty)` | Controls the module's **feature** filter behavior. |
| `show_pricing` | `apply_filters(mhm_rentiva/availability_calendar/show_pricing` | Controls the module's **general** display behavior. |
| `show_seasonal_prices` | `apply_filters(mhm_rentiva/availability_calendar/show_seasonal_prices` | Controls the module's **general** display behavior. |
| `show_discounts` | `apply_filters(mhm_rentiva/availability_calendar/show_discounts` | Controls the module's **general** display behavior. |
| `show_booking_button` | `apply_filters(` | Controls the module's **general** display behavior. |
| `theme` | `apply_filters(mhm_rentiva/availability_calendar/theme` | Controls the module's **general** display behavior. |
| `start_date` | `(empty)` | Controls the module's **general** display behavior. |
| `months_ahead` | `apply_filters(mhm_rentiva/availability_calendar/months_ahead` | Controls the module's **general** display behavior. |
| `months_to_show` | `apply_filters(mhm_rentiva/availability_calendar/months_to_show` | Controls the module's **general** display behavior. |
| `start_month` | `(empty)` | Controls the module's **general** display behavior. |
| `show_weekends` | `apply_filters(mhm_rentiva/availability_calendar/show_weekends` | Controls the module's **general** display behavior. |
| `show_past_dates` | `apply_filters(mhm_rentiva/availability_calendar/show_past_dates` | Controls the module's **general** display behavior. |
| `integrate_pricing` | `apply_filters(mhm_rentiva/availability_calendar/integrate_pricing` | Controls the module's **general** display behavior. |
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

- **HTML Structure:** All containers start with the `.mhm-rentiva-availability-calendar-wrapper` class.
- **Customization:** CSS variables (`--mhm-color-primary`, etc.) are inherited from the global `css-variables.css` file.

## Section Summary
- The Availability Calendar page has been aligned to the standard documentation structure with consistent reference headings.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.0-docs | Page alphabetized and image placeholder added. |
