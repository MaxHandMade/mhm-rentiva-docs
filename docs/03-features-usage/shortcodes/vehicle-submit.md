---
title: Vendor vehicle submission
description: Usage guide and technical reference for the Vendor Vehicle Submission module.
sidebar_position: 25
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
This page describes the Vendor Vehicle Submission module as a standard reference, covering both technical and operational aspects.
:::

# 🚗 Vendor Vehicle Submission

## Contents
- Usage
- Features
- Developer Notes

The Vendor Vehicle Submission module is designed to manage and present **vendor** vehicle submission processes to visitors on the Rentiva platform.

## Usage

:::tip IMAGE COMING SOON
A screenshot showing the frontend (visitor-facing) appearance of this module will be added here.
:::

To add this module to any page or post, use the shortcode below:

```shortcode
[rentiva_vehicle_submit]
```

You can also insert it visually from the Gutenberg block editor by selecting **"MHM Rentiva → Vendor Vehicle Submission"**.

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

### 🚗 Transfer Location and Route Selection (v4.23.0)

As of v4.23.0, the vehicle submission form includes fields specific to the transfer module.

#### City-Filtered Location Selection
Transfer locations are automatically filtered based on the vendor's `_vendor_city` meta value. Queried via `LocationProvider::get_by_city()`. Vendors can only see and select locations belonging to their own city.

- **Meta key:** `_mhm_rentiva_transfer_locations` (array)
- **Meta key:** `_mhm_rentiva_transfer_routes` (array)

#### Per-Route Price Entry
For each selected route, the vendor can enter their own price within the `min_price` / `max_price` range set by the admin. Prices outside the range are rejected.

- **Meta key:** `_mhm_rentiva_transfer_route_prices` (JSON)
- **Fallback:** If no vendor price is set, the route's `base_price` value is used.

#### Passenger and Luggage Capacity
- **Passenger capacity:** Maximum number of passengers the vehicle can carry.
- **Large luggage:** Maximum large suitcase capacity.
- **Small luggage:** Maximum small bag/carry-on capacity.

#### Vehicle Document (Registration) Upload
The vendor can upload the vehicle registration document via the form. The document is reviewed by the admin for verification.

## Developer Notes

- **HTML Structure:** All containers start with the `.mhm-rentiva-vehicle-submit-wrapper` class.
- **Customization:** CSS variables (`--mhm-color-primary`, etc.) are inherited from the global `css-variables.css` file.
- **Transfer fields:** Shown/hidden via JS toggle when service type is set to "Transfer" or "Both".

## Section Summary
- The Vendor Vehicle Submission form includes transfer location/route selection, per-route pricing, and capacity fields in addition to core vehicle information.
- City-based filtering ensures vendors can only see locations within their own region.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 27.03.2026 | 4.23.0 | City-filtered transfer location/route selection, per-route pricing, capacity fields, and registration upload documented. |
| 19.03.2026 | 4.21.0-docs | Page alphabetized and image placeholder added. |
