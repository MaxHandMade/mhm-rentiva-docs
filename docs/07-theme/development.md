---
id: development
title: Technical Guide & CI/CD Pipeline
sidebar_label: Technical & Development
slug: /theme/development
---
![Version](https://img.shields.io/badge/version-v0.3.0-blue?style=flat-square) ![PHP](https://img.shields.io/badge/PHP-8.1+-777bb4?style=flat-square) ![CI](https://img.shields.io/badge/CI-GitHub_Actions-success?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
This guide covers the development workflow, asset compilation, and the theme's testing infrastructure and CI/CD pipeline.
:::

## Development Workflow

The `mhm-rentiva-theme` is designed for performance and strict adherence to WordPress Coding Standards (WPCS).

### Asset Management — 6 CSS Files

Static files are stored in the `/assets` directory. As of v0.3.0 the CSS stack consists of 6 files:

| # | File | Purpose |
|---|-------|------|
| 1 | `header.css` | Top navigation, mobile navigation overlay (dark theme `#101922`). |
| 2 | `3-layout.css` | Page layout, `content-wide` mode, max-width: `var(--wp--style--global--content-size, 1280px)`. `@layer layout` **REMOVED**. |
| 3 | `components.css` | Reusable UI components such as cards, buttons, and badges. |
| 4 | `utilities.css` | Helper classes (spacing, visibility, typography). |
| 5 | `plugin-pages.css` | Style overrides specific to plugin pages. |
| 6 | `elementor-compat.css` | Elementor compatibility layer. |

- `/assets/js`: Lightweight vanilla JS (e.g., `header.js` for the mobile menu).

:::caution CSS Architecture Note
The `@layer layout` previously used in `3-layout.css` **was removed in v0.3.0**. Additionally, `white-space: nowrap` was added to the `rv-trust-value` class (10,000+ stats card fix).
:::

#### Loading Logic

All assets are loaded via `mhm_rentiva_theme_enqueue_header_assets()` inside `functions.php`:

```php
wp_enqueue_style( 'mhm-theme-plugin-pages', $css_uri . 'plugin-pages.css', array(), $ver );
wp_enqueue_script( 'mhm-theme-header', $js_uri . 'header.js', array(), $ver, true );
```

### Dependency Management

The theme uses **Composer** for development dependencies (PHPUnit, PHPCS) and **npm/npx** for asset minification (where applicable).

- **Install Dependencies**: `composer install`

---

## Testing Infrastructure

The theme includes a comprehensive PHPUnit test suite located in `/tests`.

### Key Test Suites

| Test Suite | File | Responsibility |
|------------|------|----------------|
| **Theme Structure** | `ThemeStructureTest.php` | Ensures `templates/`, `parts/`, and `theme.json` exist. |
| **Asset Check** | `AssetEnqueueTest.php` | Validates correct enqueuing of CSS and JS. |
| **Patterns** | `PatternRegistrationTest.php` | Verifies `rentiva` category and essential patterns. |
| **Templates** | `ThemeTemplatesSemanticTest.php`| Ensures key templates like `single-vehicle.html` are correct. |

### Running Tests Locally

Use the included `phpunit.xml.dist` configuration:

```bash
vendor/bin/phpunit
```

---

## CI/CD Pipeline

The theme uses GitHub Actions (`.github/workflows/ci.yml`) for automated quality checks.

### Workflow Stages

1. **PHP Lint**: Checks for syntax errors across all versions.
2. **PHP Coding Standards (PHPCS)**: Validates adherence to `WordPress-Core` and `WordPress-Extra`.
3. **Unit Testing**: Runs the complete PHPUnit suite in a headless WordPress environment.
4. **Build Check**: Verifies `theme.json` schema validity.

### Workflow Configuration

```yaml
# Examples from .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  phpcs:
    runs-on: ubuntu-latest
    steps:
      - name: PHPCS Check
        run: vendor/bin/phpcs --standard=phpcs.xml.dist .
```

---

## Coding Standards

The theme follows these strict rules (as defined in `phpcs.xml.dist`):
- `declare(strict_types=1);` mandatory for all PHP files.
- No direct usage of `extract()`.
- Use of `@since` and `@return` tags in docblocks.
- Prefixing all functions with `mhm_rentiva_theme_`.

---

## DemoSeeder & WP-CLI

### DemoSeeder Bug Fixes (v0.3.0)
7 bugs were fixed in DemoSeeder in v0.3.0. The most important: the `add_booking_review()` method now works fully compatible with the testimonials shortcode. The testimonials shortcode reads from `vehicle_booking` post meta (`_mhm_rentiva_customer_review`), **not** from WP comments.

### WP-CLI Page Creation
To avoid bash `!` escaping issues when creating WordPress pages via WP-CLI, the `wp eval-file -` heredoc method is used:

```bash
wp eval-file - <<'PHPEOF'
<?php
// Page creation code here
wp_insert_post([
    'post_title'   => 'Vehicles',
    'post_name'    => 'vehicles',
    'post_content' => '<!-- wp:shortcode -->[rentiva_vehicles_grid]<!-- /wp:shortcode -->',
    'post_status'  => 'publish',
    'post_type'    => 'page',
]);
PHPEOF
```

## Changelog
| Date | Version | Note |
|-------|-------|-----|
| 23.04.2026 | v0.3.0 | English translation applied to mixed-language sections. |
| 27.03.2026 | v0.3.0 | CSS stack (6 files) details, DemoSeeder fixes, and WP-CLI method added. |
| 09.03.2026 | 4.21.0-docs | Development guide and CI/CD documentation created. |
