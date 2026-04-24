---
id: theme-json
title: Theme Configuration (theme.json)
sidebar_label: theme.json
slug: /theme/theme-json
---
![Version](https://img.shields.io/badge/version-v0.3.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
`theme.json` is the configuration hub for global styles, settings, and behavior. It defines the color palette, typography hierarchy, spacing scales, and global block styles.
:::

## Global Settings

### 🎨 Color Palette

The theme uses a comprehensive, harmonized color system:

| Slug | Color | Name | Usage |
|------|-------|------|-------|
| `base` | `#FFFFFF` | Base | Global background. |
| `surface` | `#F7F7F7` | Surface | Background for sections and cards. |
| `contrast` | `#222222` | Contrast | Primary text and headings. |
| `accent` | `#0066FF` | Accent | Links, active states, and primary actions. |
| `cta` | `#FF5A5F` | CTA | Call-to-action buttons (e.g., Book Now). |
| `success` | `#00A699` | Success | Payouts, confirmed status labels. |
| `warning` | `#FFB400` | Warning | Pending IBAN changes or alerts. |

### 🔡 Typography Hierarchy

Integrated fonts: **Plus Jakarta Sans** (Primary) and **Inter** (Secondary).

| Scale (Slug) | Size | Name |
|--------------|------|------|
| `display` | `clamp(3rem, 6vw, 4.5rem)` | High-impact homepage headers. |
| `xx-large` | `clamp(2rem, 4vw, 3rem)` | Primary page headings. |
| `medium` | `1rem` | Standard body text. |
| `small` | `0.875rem` | Footer links and metadata labels. |

### 📏 Spacing System

The theme uses proportional spacing steps from `3xs` to `3xl`:

```json
{
  "slug": "xs",
  "size": "0.75rem",
  "name": "XS"
},
{
  "slug": "m",
  "size": "1.5rem",
  "name": "M"
}
```

---

## Global Styles

### Core Elements

`theme.json` enforces global styles to ensure plugin-generated components inherit the correct theme aesthetics:

```json
"styles": {
  "typography": {
    "fontFamily": "var(--wp--preset--font-family--jakarta)",
    "lineHeight": "1.65"
  },
  "elements": {
    "button": {
      "border": { "radius": "9999px" },
      "color": { "background": "var(--wp--preset--color--accent)" }
    }
  }
}
```

### Layout Constraints

- **Content Size**: `1280px` (standard width).
- **Wide Size**: `1440px` (for full-width or wide-aligned sections).

:::info v0.3.0 Change
The `page.html` template now uses `content-wide` instead of `content-narrow`. The `max-width` value in `3-layout.css` has been synchronized to `theme.json` via `var(--wp--style--global--content-size, 1280px)`. This means changing the content-size in the theme editor automatically updates plugin pages as well.
:::

---

## Why this Architecture Matters

By centralizing all design tokens in `theme.json`, the `mhm-rentiva` plugin can reference these variables directly in its CSS:

```css
/* Inheriting global theme colors in plugin components */
.mhm-payout-card {
    background-color: var(--wp--preset--color--surface);
    border-color: var(--wp--preset--color--accent-subtle);
}
```

**This "Tight Coupling"** ensures that any global color change in the theme editor automatically propagates to:
- The Booking Widget
- Vendor Analytics Cards
- Search Results Grid
- Payout Management UI

---

## Changelog
| Date | Version | Note |
|-------|-------|-----|
| 23.04.2026 | v0.3.0 | English translation applied to Turkish sections. |
| 27.03.2026 | v0.3.0 | `content-wide` layout and CSS variable synchronization documented. |
| 09.03.2026 | 4.21.0-docs | Theme configuration documentation created. |
