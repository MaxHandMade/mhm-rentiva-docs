---
id: development
title: Technical Guide & CI/CD Pipeline
sidebar_label: Technical & Development
slug: /theme/development
---
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=flat-square) ![PHP](https://img.shields.io/badge/PHP-8.1+-777bb4?style=flat-square) ![CI](https://img.shields.io/badge/CI-GitHub_Actions-success?style=flat-square)

:::info Purpose
This guide covers the development workflow, asset compilation, and the theme's testing infrastructure and CI/CD pipeline.
:::

## Development Workflow

The `mhm-rentiva-theme` is designed for performance and strict adherence to WordPress Coding Standards (WPCS).

### Asset Management

Assets are stored in the `/assets` directory:
- `/assets/css`: Modular CSS files (`header.css`, `3-layout.css`, `components.css`).
- `/assets/js`: Lightweight vanilla JS (e.g., `header.js` for mobile menu).

#### Enqueuing Logic

All assets are enqueued in `functions.php` via `mhm_rentiva_theme_enqueue_header_assets()`:

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

## Changelog
| Date | Version | Note |
|------|---------|------|
| 2026-03-09 | 4.21.0-docs | Development guide and CI/CD documentation created. |
