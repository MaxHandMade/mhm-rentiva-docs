---
id: development
title: "Technischer Leitfaden & CI/CD-Pipeline"
sidebar_label: "Technik & Entwicklung"
slug: /theme/development
---
![Version](https://img.shields.io/badge/version-v0.3.0-blue?style=flat-square) ![PHP](https://img.shields.io/badge/PHP-8.1+-777bb4?style=flat-square) ![CI](https://img.shields.io/badge/CI-GitHub_Actions-success?style=flat-square) ![Aktualisiert](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Dieser Leitfaden behandelt den Entwicklungsablauf, die Asset-Kompilierung sowie die Testinfrastruktur und CI/CD-Pipeline des Themes.
:::

## Entwicklungsablauf

Das `mhm-rentiva-theme` ist auf Performance und die strikte Einhaltung der WordPress Coding Standards (WPCS) ausgelegt.

### Asset-Verwaltung – 6 CSS-Dateien

Statische Dateien werden im Verzeichnis `/assets` abgelegt. Seit v0.3.0 besteht der CSS-Stack aus 6 Dateien:

| # | Datei | Zweck |
|---|-------|------|
| 1 | `header.css` | Obere Navigation, mobiles Navigations-Overlay (dunkles Theme `#101922`). |
| 2 | `3-layout.css` | Seitenlayout, `content-wide`-Modus, max-width: `var(--wp--style--global--content-size, 1280px)`. `@layer layout` **ENTFERNT**. |
| 3 | `components.css` | Wiederverwendbare UI-Komponenten wie Karten, Buttons und Badges. |
| 4 | `utilities.css` | Hilfsklassen (Abstände, Sichtbarkeit, Typografie). |
| 5 | `plugin-pages.css` | Stil-Überschreibungen speziell für Plugin-Seiten. |
| 6 | `elementor-compat.css` | Elementor-Kompatibilitätsschicht. |

- `/assets/js`: Schlankes Vanilla-JS (z. B. `header.js` für das mobile Menü).

:::caution Hinweis zur CSS-Architektur
Das zuvor in `3-layout.css` verwendete `@layer layout` **wurde in v0.3.0 entfernt**. Zusätzlich wurde `white-space: nowrap` zur Klasse `rv-trust-value` hinzugefügt (Fix für Statistikkarten mit über 10.000).
:::

#### Ladelogik

Alle Assets werden über `mhmrentiva_theme_enqueue_header_assets()` innerhalb von `functions.php` geladen:

```php
wp_enqueue_style( 'mhm-theme-plugin-pages', $css_uri . 'plugin-pages.css', array(), $ver );
wp_enqueue_script( 'mhm-theme-header', $js_uri . 'header.js', array(), $ver, true );
```

### Abhängigkeitsverwaltung

Das Theme verwendet **Composer** für Entwicklungsabhängigkeiten (PHPUnit, PHPCS) und **npm/npx** für die Asset-Minifizierung (sofern zutreffend).

- **Abhängigkeiten installieren**: `composer install`

---

## Testinfrastruktur

Das Theme enthält eine umfassende PHPUnit-Testsuite in `/tests`.

### Wichtige Testsuiten

| Testsuite | Datei | Zuständigkeit |
|------------|------|----------------|
| **Theme-Struktur** | `ThemeStructureTest.php` | Stellt sicher, dass `templates/`, `parts/` und `theme.json` vorhanden sind. |
| **Asset-Prüfung** | `AssetEnqueueTest.php` | Prüft das korrekte Einbinden (Enqueuing) von CSS und JS. |
| **Patterns** | `PatternRegistrationTest.php` | Überprüft die Kategorie `rentiva` und die wesentlichen Patterns. |
| **Templates** | `ThemeTemplatesSemanticTest.php`| Stellt sicher, dass zentrale Templates wie `single-vehicle.html` korrekt sind. |

### Tests lokal ausführen

Verwende die mitgelieferte `phpunit.xml.dist`-Konfiguration:

```bash
vendor/bin/phpunit
```

---

## CI/CD-Pipeline

Das Theme nutzt GitHub Actions (`.github/workflows/ci.yml`) für automatisierte Qualitätsprüfungen.

### Workflow-Phasen

1. **PHP Lint**: Prüft alle Versionen auf Syntaxfehler.
2. **PHP Coding Standards (PHPCS)**: Prüft die Einhaltung von `WordPress-Core` und `WordPress-Extra`.
3. **Unit-Tests**: Führt die vollständige PHPUnit-Suite in einer Headless-WordPress-Umgebung aus.
4. **Build-Prüfung**: Überprüft die Gültigkeit des `theme.json`-Schemas.

### Workflow-Konfiguration

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

Das Theme folgt diesen strikten Regeln (wie in `phpcs.xml.dist` definiert):
- `declare(strict_types=1);` ist für alle PHP-Dateien verpflichtend.
- Keine direkte Verwendung von `extract()`.
- Verwendung der Tags `@since` und `@return` in Docblocks.
- Alle Funktionen erhalten das Präfix `mhmrentiva_theme_`.

---

## DemoSeeder & WP-CLI

### DemoSeeder-Fehlerbehebungen (v0.3.0)
In v0.3.0 wurden 7 Fehler im DemoSeeder behoben. Die wichtigste Änderung: Die Methode `add_booking_review()` ist jetzt vollständig kompatibel mit dem Testimonials-Shortcode. Der Testimonials-Shortcode liest aus den `mhmrentiva_booking`-Post-Metadaten (`_mhmrentiva_customer_review`), **nicht** aus WP-Kommentaren.

### Seitenerstellung mit WP-CLI
Um Escaping-Probleme mit `!` in der Bash beim Erstellen von WordPress-Seiten über WP-CLI zu vermeiden, wird die Heredoc-Methode `wp eval-file -` verwendet:

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

## Änderungsprotokoll
| Datum | Version | Hinweis |
|-------|-------|-----|
| 23.04.2026 | v0.3.0 | Englische Übersetzung auf gemischtsprachige Abschnitte angewendet. |
| 27.03.2026 | v0.3.0 | Details zum CSS-Stack (6 Dateien), DemoSeeder-Fehlerbehebungen und WP-CLI-Methode hinzugefügt. |
| 09.03.2026 | 4.21.0-docs | Entwicklungsleitfaden und CI/CD-Dokumentation erstellt. |
