---
title: Search results
description: Usage guide and technical reference for the Search Results module.
sidebar_position: 14
---
![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

:::info Purpose
This page describes the Search Results module as a standard reference, covering both technical and operational aspects.
:::

# 🚗 Search Results

## Contents
- Usage
- Features
- Developer Notes

The Search Results module is designed to manage and present **vehicle** search results to visitors on the Rentiva platform.

## Usage

:::tip IMAGE COMING SOON
A screenshot showing the frontend (visitor-facing) appearance of this module will be added here.
:::

To add this module to any page or post, use the shortcode below:

```shortcode
[rentiva_search_results layout="grid"]
```

You can also insert it visually from the Gutenberg block editor by selecting **"MHM Rentiva → Search Results"**.

### Parameters

The following parameters are available inside the shortcode:

| Parameter | Default | Description |
| :--- | :--- | :--- |
| `layout` | `grid` | Controls the module's **general** layout behavior. |
| `show_filters` | `1` | Controls the module's **general** display behavior. |
| `results_per_page` | `12` | Controls the module's **general** display behavior. |
| `show_pagination` | `1` | Controls the module's **general** display behavior. |
| `show_sorting` | `1` | Controls the module's **general** display behavior. |
| `show_view_toggle` | `1` | Controls the module's **general** display behavior. |
| `show_favorite_button` | `1` | Controls the module's **general** display behavior. |
| `show_compare_button` | `1` | Controls the module's **general** display behavior. |
| `show_booking_button` | `1` | Controls the module's **general** display behavior. |
| `show_price` | `1` | Controls the module's **general** display behavior. |
| `show_title` | `1` | Controls the module's **general** display behavior. |
| `show_features` | `1` | Controls the module's **general** display behavior. |
| `show_rating` | `1` | Controls the module's **general** display behavior. |
| `show_badges` | `1` | Controls the module's **general** display behavior. |
| `default_sort` | `price_asc` | Controls the module's **general** sorting behavior. |
| `class` | `(empty)` | Controls the module's **general** layout behavior. |


## Features

### 📱 Responsive Design
- **Mobile:** Single-column layout.
- **Tablet (under 782px):** Optimized view.
- **Desktop:** Full view at the configured column count or width.

### 🚀 Performance-Focused
- **Smart Caching:** Database queries are optimized and cached by the system.
- **Conditional Loading:** Static assets are only enqueued on pages where the module is used.

## Sidebar Filters

### Location Filter (Multi-Select)

As of v4.22.1, the location filter uses **checkboxes** instead of radio buttons. This allows users to select multiple locations at once. Selected locations are queried with an `IN()` SQL clause.

- Single selection: selecting one location lists only vehicles at that location.
- Multi-selection: selecting multiple locations shows vehicles available at any of the selected locations.

## Developer Notes

- **HTML Structure:** All containers start with the `.mhm-rentiva-search-results-wrapper` class.
- **Customization:** CSS variables (`--mhm-color-primary`, etc.) are inherited from the global `css-variables.css` file.
- **Availability Query:** `QueryHelper::get_availability_subquery()` is protected against empty date parameters. `strtotime('')` returns today's timestamp in PHP instead of `false`; this was fixed in v4.22.1. When an empty date is passed, the availability filter is disabled.
- **Location Query:** `QueryHelper::get_location_subquery()` accepts both single (`int`) and multiple (`array`) location IDs.

## Section Summary
- The Search Results page has been aligned to the standard documentation structure with consistent reference headings.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 27.03.2026 | 4.22.1 | Location filter changed from radio to checkbox (multi-select). Availability query protected against empty dates. QueryHelper information added to Developer Notes. |
| 19.03.2026 | 4.21.0-docs | Page alphabetized and image placeholder added. |
