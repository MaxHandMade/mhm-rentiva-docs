---
id: introduction
title: Theme Introduction
sidebar_label: Introduction
slug: /theme/introduction
---
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=flat-square) ![FSE](https://img.shields.io/badge/FSE-Full_Site_Editing-success?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

:::info Purpose
The `mhm-rentiva-theme` is a modern, high-performance **Full Site Editing (FSE)** theme designed specifically to complement the `mhm-rentiva` plugin suite. It provides a seamless, unified design language for both static content and dynamic rental features.
:::

## Overview

Unlike traditional WordPress themes, the `mhm-rentiva-theme` leverages the latest block-based capabilities of WordPress. This means every part of the site — from the header and footer to the vehicle listings and vendor dashboard — can be customized directly within the Site Editor.

### Why it's the "Perfect Match"

The theme and plugin are developed in tandem to ensure:
1. **Unified Design Language**: Consistent use of typography (Plus Jakarta Sans) and color palettes.
2. **Optimized Layouts**: Pre-designed block patterns for common rental scenarios (Hero search, vehicle details, results grid).
3. **Performance**: Minimal PHP logic, relying on standard Gutenberg blocks and a lightweight CSS utility system.
4. **Reactivity**: Built-in support for the plugin's AJAX-driven components (Dashboard, Payouts, Search).

---

## Technical Stack

- **Core**: WordPress Block API (Gutenberg).
- **Styling**: `theme.json` for global styles + Atomic CSS utilities for micro-adjustments.
- **Typography**: `Plus Jakarta Sans` for headers and `Inter` for body text.
- **Icons**: `Material Symbols Outlined` (Google Fonts).
- **FSE Templates**: HTML-based templates for standard and custom post types (e.g., `single-vehicle`, `archive-vehicle`).

---

## Visual Hierarchy (Block Structure)

Key pages follow a modular block structure:

### Vehicle Detail Page (`single-vehicle.html`)
```text
┌──────────────────────────────────────────┐
│              [Header Part]               │
├──────────────────────────────────────────┤
│         [Vehicle Images Slider]          │
├───────────────────┬──────────────────────┤
│                   │                      │
│ [Vehicle Specs]   │  [Booking Widget]    │
│ [Description]     │  (Sticky in Sidebar) │
│ [Features List]   │                      │
│                   │                      │
├───────────────────┴──────────────────────┤
│        [Similar Vehicles Pattern]        │
├──────────────────────────────────────────┤
│              [Footer Part]               │
└──────────────────────────────────────────┘
```

---

## Key Directories

- `/templates`: HTML structure for pages and posts.
- `/parts`: Reusable site parts like `header` and `footer`.
- `/patterns`: Complex block assemblies (e.g., Homepage Hero, Services Grid).
- `/assets`: Theme-specific CSS components and JavaScript for UI interactivity.

---

## Changelog
| Date | Version | Note |
|------|---------|------|
| 2026-03-09 | 1.0.0-docs | Initial theme introduction documentation. |
