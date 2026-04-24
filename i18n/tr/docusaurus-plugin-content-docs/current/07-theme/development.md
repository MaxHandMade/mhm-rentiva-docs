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

### Asset Yönetimi — 6 CSS Dosyası

Statik dosyalar `/assets` dizininde saklanir. v0.3.0 itibariyla CSS yigini 6 dosyadan olusur:

| # | Dosya | Amac |
|---|-------|------|
| 1 | `header.css` | Ust menu, mobil navigasyon overlay (koyu tema `#101922`). |
| 2 | `3-layout.css` | Sayfa düzeni, `content-wide` modu, max-width: `var(--wp--style--global--content-size, 1280px)`. `@layer layout` **KALDIRILDI**. |
| 3 | `components.css` | Kart, buton, badge gibi tekrar kullanilan UI bileşenleri. |
| 4 | `utilities.css` | Yardimci siniflar (spacing, visibility, typography). |
| 5 | `plugin-pages.css` | Eklenti sayfalarına ozel stil overridelari. |
| 6 | `elementor-compat.css` | Elementor uyumluluk katmani. |

- `/assets/js`: Hafif vanilla JS (ornegin mobil menu için `header.js`).

:::caution CSS Mimarisi Notu
`3-layout.css` dosyasında daha once kullanilan `@layer layout` **v0.3.0 ile kaldirilmistir**. Ayrica `rv-trust-value` sınıfına `white-space: nowrap` eklenmiştir (10.000+ istatistik karti fix).
:::

#### Yükleme Mantigi

Tum asset'ler `functions.php` icerisinde `mhm_rentiva_theme_enqueue_header_assets()` üzerinden yüklenir:

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

---

## DemoSeeder ve WP-CLI

### DemoSeeder Hata Düzeltmeleri (v0.3.0)
v0.3.0 sürümünde DemoSeeder'da 7 hata düzeltildi. Bunlardan en önemlisi: `add_booking_review()` metodu artik testimonials shortcode'u ile tam uyumlu çalışmaktadir. Testimonials shortcode'u `vehicle_booking` post meta'dan (`_mhm_rentiva_customer_review`) okur, WP comment'lerden **değil**.

### WP-CLI Sayfa Oluşturma
WordPress sayfalarınin WP-CLI ile olusturulmasi sırasında bash `!` escaping sorunundan kacinmak için `wp eval-file -` heredoc yontemi kullanılır:

```bash
wp eval-file - <<'PHPEOF'
<?php
// Sayfa oluşturma kodu burada
wp_insert_post([
    'post_title'   => 'Araclar',
    'post_name'    => 'araclar',
    'post_content' => '<!-- wp:shortcode -->[rentiva_vehicles_grid]<!-- /wp:shortcode -->',
    'post_status'  => 'publish',
    'post_type'    => 'page',
]);
PHPEOF
```

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|-------|-------|-----|
| 27.03.2026 | v0.3.0 | CSS yigini (6 dosya) detaylari, DemoSeeder düzeltmeleri, WP-CLI yontemi eklendi. |
| 09.03.2026 | 4.21.0-docs | Gelistirme rehberi ve CI/CD dokumantasyonu oluşturuldu. |
