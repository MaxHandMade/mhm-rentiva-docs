---
id: templates-patterns
title: Custom Templates & Block Patterns
sidebar_label: Templates & Patterns
slug: /theme/templates-patterns
---
![Version](https://img.shields.io/badge/version-v3-blue?style=flat-square) ![FSE](https://img.shields.io/badge/FSE-Full_Site_Editing-success?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-09.03.2026-orange?style=flat-square)

:::info Purpose
This page documents the block templates and patterns that drive the visual representation of rental listings, search results, and vendor management interfaces.
:::

## Core Templates (`/templates`)

These HTML templates define the base structural layout for specific post types and views:

| Template | File | Description |
|----------|------|-------------|
| **Single Vehicle** | `single-vehicle.html` | Layout for a single vehicle listing. |
| **Archive Vehicle**| `archive-vehicle.html`| Search results and general vehicle archive. |
| **Account Page** | `page-account.html` | Unified shell for the Vendor Dashboard. |
| **404 Page** | `404.html` | Custom error page for vehicle not found. |

### Vehicle Archive Layout (`archive-vehicle.html`)
```text
┌──────────────────────────────────────────┐
│              [Header Part]               │
├──────────────────────────────────────────┤
│           [Search Hero Pattern]          │
├───────────────────┬──────────────────────┤
│                   │                      │
│   [Filter Block]  │    [Results Grid]    │
│   (Collapsible on │    (3-column card)   │
│    Mobile)        │                      │
│                   │                      │
├───────────────────┴──────────────────────┤
│              [Footer Part]               │
└──────────────────────────────────────────┘
```

---

## Block Patterns (`/patterns`)

Block patterns are pre-configured assemblies of Gutenberg blocks, categorized under the `rentiva` category:

### Key Patterns

| Pattern | Category | File | Description |
|---------|----------|------|-------------|
| **Search Hero** | `hero` | `rentiva-search-hero.php` | Featured search with location/date inputs. |
| **Vehicle Grid**| `grid` | `rentiva-vehicles-grid-section.php` | 4-column cards for homepage displays. |
| **Vendor Shell** | `dashboard` | `rentiva-account-shell.php` | The main container for the Vendor panel. |
| **Vehicle Detail**| `listing` | `rentiva-vehicle-details.php` | Information grids for the single view. |
| **Trust Strip** | `trust` | `homepage-trust-strip.php` | Featured logos of trusted teams/brands. |

---

## Responsive Design Implementation

The theme uses a "Fluid Typography and Spacing" approach:

```json
/* theme.json - Fluid Header font size example */
"fontSizes": [
  {
    "slug": "xx-large",
    "size": "clamp(2rem, 4vw, 3rem)",
    "name": "XX Large"
  }
]
```

**Mobile-First Grid System**:
- All patterns are designed using **CSS Grid** or **Flexbox**.
- The Results Grid pattern uses `repeat(auto-fill, minmax(300px, 1fr))` for automatic column adjustment.

---

## How to Customize Templates

Since this is an FSE theme, templates can be overridden in the WordPress Site Editor:
1. Navigate to **Appearance → Editor → Templates**.
2. Select the template (e.g., `Single Vehicle`).
3. Add, remove, or reorder blocks as needed.
4. **Publish**: Your changes are saved to the database, leaving the theme files intact.

### Overriding via Child Theme (Optional)
If you prefer file-based customization, you can create a child theme and place your HTML templates in the same folder structure.

---

## Changelog
| Date | Version | Note |
|------|---------|------|
| 2026-03-09 | 1.0.0-docs | Documentation for templates and patterns initialized. |
