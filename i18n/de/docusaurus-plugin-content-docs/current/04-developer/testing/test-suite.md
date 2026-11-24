---
id: test-suite
title: "Testsuite & Infrastruktur"
sidebar_label: "Testwerkzeuge"
sidebar_position: 2
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Diese Seite erklärt Entwicklern das Test-Ökosystem von Rentiva – PHPUnit-Konfiguration, CI-Matrix, Docker-Wrapper und die eigene Listener-Struktur.
:::

# Architektur der Testsuite

Rentiva verwendet eine für WordPress angepasste **PHPUnit 9.6**-Infrastruktur. Diese Infrastruktur wird durch eigene Werkzeuge ergänzt, die sowohl die Testgeschwindigkeit als auch eine saubere Bereinigung der Datenbank garantieren.

---

## Aktuelle Test-Baseline

| Version | Tests | Assertions | Übersprungen | Datum |
|---|---|---|---|---|
| **v4.63.0** (aktuell) | **1.366** | **4.060** | 26 | 02.07.2026 |
| v4.60.0 | 1.350 | — | — | 23.06.2026 |
| v4.58.2 | 1.237 | 3.736 | 15 | 22.05.2026 |
| v4.58.1 | 1.231 | 3.726 | 15 | 21.05.2026 |
| v4.58.0 | 1.215 | — | — | 15.05.2026 |
| v4.39.0 | 1.115 | 3.425 | — | 10.05.2026 |
| v4.38.2 | 1.070 | 3.332 | 7 | 09.05.2026 |
| v4.37.0 | 982 | 3.162 | — | 05.05.2026 |
| v4.27.0 | 728 | — | 6 | 23.04.2026 |
| v4.26.5 | 720 | 2.601 | 6 | 15.04.2026 |
| v4.23.0 | 567 | 2.036 | 4 | 26.03.2026 |
| v4.20.0 (erste festgeschriebene Baseline) | 268 | 1.379 | — | — |

> **Hinweis zu übersprungenen Tests:** Die 26 übersprungenen Tests sind von WooCommerce abhängige Integrationstests (`WP_Ajax_UnitTestCase`), die in Umgebungen übersprungen werden, in denen WooCommerce nicht in der PHPUnit-Testdatenbank gebootstrappt wird – eine bekannte Lücke der Umgebung, kein Fehler. Die Korrektheit dieser Codepfade wird separat über eine Live-Reproduktion mit `wp eval` und Browser-Smoke-Tests überprüft. Die zuvor dokumentierten `saas_block`-Baseline-Fehler aufgrund von Umgebungskontingenten gelten nicht mehr – diese Orchestrierungsschicht wurde in v4.60.0 entfernt.

---

## Testkategorien

### Shortcode-Render-Tests
13 Shortcode-Render-Testdateien validieren die Ausgabe aller Shortcodes. Diese Tests decken die CAM-Pipeline durchgängig ab: `AllowlistRegistry` -> `CanonicalAttributeMapper` -> Shortcode `render()`.

### SettingsSanitizer-Tests
4 SettingsSanitizer-Testdateien testen die Bereinigung und Validierung von Einstellungswerten.

### AllowlistRegistry-Tests
Überprüft werden 199 eindeutige Attributschlüssel, 19 TAG_MAPPING-Einträge und die Konsistenz der Enum-Werte.

### KeyNormalizer-Tests
27 Tests, 32 Assertions – camelCase/snake_case-Konvertierung, Alias-Auflösung und Grenzfälle.

---

## CI-Matrix

Die CI-Pipeline läuft auf folgender Matrix:

| | PHP 8.1 | PHP 8.2 | PHP 8.3 |
|---|---|---|---|
| **WP 6.7** | PHPUnit | PHPUnit | PHPUnit |
| **WP latest** | PHPUnit | PHPUnit + PHPCS | PHPUnit |

- **Gesamt:** 6 parallele Jobs (PHP 8.1/8.2/8.3 x WP 6.7/latest)
- **PHPCS-Gate:** Läuft über `composer phpcs` unter PHP 8.2 und ist ein verpflichtendes Gate
- Ein Merge ist erst möglich, wenn alle Jobs erfolgreich sind

---

## Kernkomponenten

### 1. PHPUnit-Konfiguration (`phpunit.xml`)
Der Testprozess bootstrappt die WordPress-Testumgebung über `tests/bootstrap.php`.
- **Coverage:** Erfasst das Verzeichnis `./src/` mit einem Ziel von 100 % Abdeckung.
- **Multisite:** Standardmäßig auf `0` (false) gesetzt.

### 2. MHM Test Listener (`MHM_Test_Listener`)
Ein eigener Listener, der die „Hybrid Reset“-Strategie anwendet.
- **Zweck:** Bereinigt automatisch temporäre Tabellen (mit dem Präfix `wptests_`), die bei isolierten Testläufen (`MHM_TEST_IS_ISOLATED`) erstellt werden.
- **Sicherheit:** Löscht nur Tabellen, die einem kontrollierten Muster entsprechen (`DROP TABLE IF EXISTS`).

---

## Verwendung von Docker und CLI

Tests laufen unabhängig vom Host-Betriebssystem (Windows/macOS/Linux) in einem isolierten **Docker**-Container.

```bash
# Run all tests
npm run test

# Run only a specific group
docker exec -it mhm-container vendor/bin/phpunit --group financial

# PHPCS check (CI gate)
composer phpcs
```

---

## Bericht zur Codeabdeckung

Das System setzt strenge Abdeckungsregeln für kritische Finanz- und Kernmodule durch.
- **HTML-Bericht:** Wird im Verzeichnis `build/coverage` erzeugt.
- **Kritische Module:** Die Module `src/Core/Financial` und `src/Core/Security` werden immer geprüft.

---

## Test-Fixtures

Testdaten werden im Verzeichnis `tests/fixtures` abgelegt.
- **Idempotenz:** Da die Datenbank vor jeder Testsuite bereinigt wird, sind die Tests voneinander unabhängig.
- **Isolation:** Dank `MHM_Test_Listener` kollidieren Daten bei parallelen Testläufen nicht.

## Zusammenfassung des Abschnitts
- Die Testinfrastruktur basiert auf **PHPUnit 9.6**.
- **1.366 Tests, 4.060 Assertions, 26 übersprungen** (Baseline v4.63.0; die übersprungenen Tests sind eine bekannte Lücke der Umgebung bei WooCommerce in PHPUnit, keine Fehler).
- CI-Matrix: **6 Jobs** (PHP 8.1/8.2/8.3 x WP 6.7/latest) + PHPCS-Gate.
- Eine Verunreinigung der Datenbank wird durch die **Hybrid Reset**-Strategie verhindert.
- Während der Entwicklung ist `npm run test` der primäre Validierungsbefehl.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 02.07.2026 | 4.63.0 | Baseline-Tabelle aktualisiert (aktuelle Zeile v4.63.0 – 1.366 / 4.060 / 26). Veralteten `saas_block`-Hinweis entfernt (diese Orchestrierungsschicht wurde in v4.60.0 entfernt); ersetzt durch einen zutreffenden Hinweis, warum die 26 übersprungenen Tests auftreten (Lücke der Umgebung bei WooCommerce in PHPUnit). Meilensteinzeile v4.60.0 hinzugefügt. |
| 22.05.2026 | 4.58.2 | Baseline-Tabelle aktualisiert (aktuelle Zeile v4.58.2 – 1.237 / 3.736 / 15). 7 dokumentierte `saas_block`-Baseline-Fehler aufgrund von Umgebungskontingenten vermerkt (außerhalb des Umfangs). Aktuelle Meilensteine zwischen v4.23.0 und v4.58.2 hinzugefügt. |
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 27.03.2026 | 4.23.0 | Test-Baseline v4.23.0 (567/2036/4), CI-Matrix (6 Jobs + PHPCS) und Testkategorien (Shortcode-Render, Sanitizer, Allowlist, Key Normalizer) hinzugefügt. |
| 19.03.2026 | 4.21.2 | Dokumentation zu PHPUnit 9.6 und MHM_Test_Listener hinzugefügt. |
