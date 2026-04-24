---
id: templates-patterns
title: Custom Templates & Block Patterns
sidebar_label: Templates & Patterns
slug: /theme/templates-patterns
---
![Version](https://img.shields.io/badge/version-v0.3.0-blue?style=flat-square) ![FSE](https://img.shields.io/badge/FSE-Full_Site_Editing-success?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
This page documents the block templates and patterns that drive the visual representation of rental listings, search results, and vendor management interfaces.
:::

## Core Templates (`/templates`) — 10 Total

These HTML templates define the base structural layout for specific post types and views:

| Template | File | Description |
|--------|-------|----------|
| **Homepage** | `front-page.html` | Site homepage layout. |
| **General Page** | `page.html` | `content-wide` layout for standard WordPress pages. |
| **Single Vehicle** | `single-vehicle.html` | Single vehicle listing page layout. |
| **Vehicle Archive** | `archive-vehicle.html` | Search results and general vehicle archive. |
| **Account Page** | `page-account.html` | Unified shell for the Vendor Dashboard. |
| **404 Page** | `404.html` | Custom error page for not-found content. |
| **General Archive** | `archive.html` | Default archive template. |
| **Main Index** | `index.html` | WordPress default fallback template. |
| **Search** | `search.html` | WordPress search results page. |
| **Single Post** | `single.html` | Standard blog post template. |

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

## Block Patterns (`/patterns`) — 31 Total

Block patterns are pre-configured Gutenberg block assemblies registered under the `rentiva` category. v0.3.0 reaches 31 patterns:

### Homepage Patterns

| Pattern | File | Description |
|-------|-------|----------|
| **Hero** | `homepage-hero.php` | Homepage hero section. |
| **Search Hero** | `rentiva-search-hero.php` | Prominent search with location/date inputs. |
| **Trust Strip** | `homepage-trust-strip.php` | Trusted brand logos. |
| **How It Works** | `homepage-how-it-works.php` | Step-by-step usage guide. |
| **Services** | `homepage-services.php` | Service introduction section. |
| **Info Grid** | `homepage-info-grid.php` | Information card grid. |
| **Featured Vehicles** | `homepage-featured-vehicles.php` | Vehicle showcase section on the homepage. |
| **Booking CTA** | `homepage-booking-cta.php` | Booking call-to-action. |
| **Testimonials** | `homepage-testimonials.php` | Customer reviews section. |

### Page Patterns

| Pattern | File | Description |
|-------|-------|----------|
| **About Us** | `rentiva-about-page.php` | About page content. |
| **Contact** | `rentiva-contact-page.php` | Contact page form. |
| **FAQ** | `rentiva-faq-page.php` | Frequently asked questions. |
| **Privacy** | `rentiva-privacy-page.php` | Privacy policy. |
| **Terms** | `rentiva-terms-page.php` | Terms of use. |
| **Vendor Apply** | `rentiva-vendor-apply-page.php` | Vendor application page. |

### Component Patterns

| Pattern | File | Description |
|-------|-------|----------|
| **Account Shell** | `rentiva-account-shell.php` | Vendor dashboard main container. |
| **Vehicle Details** | `rentiva-vehicle-details.php` | Single vehicle information grid. |
| **Vehicles Grid** | `rentiva-vehicles-grid-section.php` | Vehicle card grid. |
| **Featured Vehicles** | `rentiva-featured-vehicles-section.php` | Featured vehicles section. |
| **Vehicle Comparison** | `rentiva-vehicle-comparison-page.php` | Vehicle comparison page. |
| **Vehicle Reviews** | `rentiva-vehicle-reviews.php` | Vehicle rating reviews. |
| **Search Results** | `rentiva-search-results.php` | Search results layout. |
| **Transfer Search** | `rentiva-transfer-search.php` / `rentiva-transfer-search-page.php` | Transfer search form and page. |
| **Transfer Results** | `rentiva-transfer-results.php` / `rentiva-transfer-results-page.php` | Transfer results layout. |
| **Brands** | `rentiva-brands.php` | Vehicle brands section. |
| **Primary CTA** | `rentiva-primary-cta.php` | General call-to-action. |
| **Booking CTA** | `rentiva-booking-cta.php` | Booking call-to-action. |
| **Trusted Teams** | `rentiva-trusted-teams.php` | Trusted business partners. |
| **404 Content** | `404-content.php` | 404 page content. |

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
|-------|-------|-----|
| 23.04.2026 | v0.3.0 | English translation applied to Turkish sections. |
| 27.03.2026 | v0.3.0 | Full template (10) and pattern (31) list updated. |
| 09.03.2026 | 1.0.0-docs | Templates and patterns documentation created. |
