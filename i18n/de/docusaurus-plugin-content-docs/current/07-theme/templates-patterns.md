---
id: templates-patterns
title: "Benutzerdefinierte Templates & Block-Patterns"
sidebar_label: "Templates & Patterns"
slug: /theme/templates-patterns
---
![Version](https://img.shields.io/badge/version-v0.3.0-blue?style=flat-square) ![FSE](https://img.shields.io/badge/FSE-Full_Site_Editing-success?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Diese Seite dokumentiert die Block-Templates und Patterns, die die visuelle Darstellung von Miet-Angeboten, Suchergebnissen und Oberflächen zur Anbieterverwaltung steuern.
:::

## Kern-Templates (`/templates`) – insgesamt 10

Diese HTML-Templates definieren das grundlegende strukturelle Layout für bestimmte Inhaltstypen und Ansichten:

| Template | Datei | Beschreibung |
|--------|-------|----------|
| **Startseite** | `front-page.html` | Layout der Website-Startseite. |
| **Allgemeine Seite** | `page.html` | `content-wide`-Layout für normale WordPress-Seiten. |
| **Einzelnes Fahrzeug** | `single-vehicle.html` | Layout der Detailseite eines einzelnen Fahrzeugs. |
| **Fahrzeug-Archiv** | `archive-vehicle.html` | Suchergebnisse und allgemeines Fahrzeug-Archiv. |
| **Kontoseite** | `page-account.html` | Einheitlicher Rahmen für das Anbieter-Dashboard. |
| **404-Seite** | `404.html` | Benutzerdefinierte Fehlerseite für nicht gefundene Inhalte. |
| **Allgemeines Archiv** | `archive.html` | Standard-Archiv-Template. |
| **Haupt-Index** | `index.html` | Standard-Fallback-Template von WordPress. |
| **Suchen** | `search.html` | WordPress-Suchergebnisseite. |
| **Einzelner Beitrag** | `single.html` | Standard-Template für Blogbeiträge. |

### Layout des Fahrzeug-Archivs (`archive-vehicle.html`)
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

## Block-Patterns (`/patterns`) – insgesamt 31

Block-Patterns sind vorkonfigurierte Zusammenstellungen von Gutenberg-Blöcken, die unter der Kategorie `rentiva` registriert sind. Mit v0.3.0 sind es 31 Patterns:

### Patterns für die Startseite

| Pattern | Datei | Beschreibung |
|-------|-------|----------|
| **Hero** | `homepage-hero.php` | Hero-Bereich der Startseite. |
| **Such-Hero** | `rentiva-search-hero.php` | Prominente Suche mit Eingabefeldern für Ort und Datum. |
| **Vertrauensleiste** | `homepage-trust-strip.php` | Logos vertrauenswürdiger Marken. |
| **So funktioniert’s** | `homepage-how-it-works.php` | Schritt-für-Schritt-Anleitung zur Nutzung. |
| **Leistungen** | `homepage-services.php` | Bereich zur Vorstellung der Leistungen. |
| **Info-Raster** | `homepage-info-grid.php` | Raster aus Informationskarten. |
| **Hervorgehobene Fahrzeuge** | `homepage-featured-vehicles.php` | Fahrzeug-Showcase auf der Startseite. |
| **Buchungs-CTA** | `homepage-booking-cta.php` | Call-to-Action für Buchungen. |
| **Kundenstimmen** | `homepage-testimonials.php` | Bereich mit Kundenbewertungen. |

### Seiten-Patterns

| Pattern | Datei | Beschreibung |
|-------|-------|----------|
| **Über uns** | `rentiva-about-page.php` | Inhalt der „Über uns“-Seite. |
| **Kontakt** | `rentiva-contact-page.php` | Formular der Kontaktseite. |
| **FAQ** | `rentiva-faq-page.php` | Häufig gestellte Fragen. |
| **Datenschutz** | `rentiva-privacy-page.php` | Datenschutzerklärung. |
| **Nutzungsbedingungen** | `rentiva-terms-page.php` | Nutzungsbedingungen. |
| **Anbieter-Bewerbung** | `rentiva-vendor-apply-page.php` | Bewerbungsseite für Anbieter. |

### Komponenten-Patterns

| Pattern | Datei | Beschreibung |
|-------|-------|----------|
| **Konto-Rahmen** | `rentiva-account-shell.php` | Haupt-Container des Anbieter-Dashboards. |
| **Fahrzeugdetails** | `rentiva-vehicle-details.php` | Informationsraster für ein einzelnes Fahrzeug. |
| **Fahrzeugraster** | `rentiva-vehicles-grid-section.php` | Raster aus Fahrzeugkarten. |
| **Hervorgehobene Fahrzeuge** | `rentiva-featured-vehicles-section.php` | Bereich mit hervorgehobenen Fahrzeugen. |
| **Fahrzeugvergleich** | `rentiva-vehicle-comparison-page.php` | Seite für den Fahrzeugvergleich. |
| **Fahrzeugbewertungen** | `rentiva-vehicle-reviews.php` | Bewertungen von Fahrzeugen. |
| **Suchergebnisse** | `rentiva-search-results.php` | Layout der Suchergebnisse. |
| **Transfersuche** | `rentiva-transfer-search.php` / `rentiva-transfer-search-page.php` | Formular und Seite für die Transfersuche. |
| **Transfer-Ergebnisse** | `rentiva-transfer-results.php` / `rentiva-transfer-results-page.php` | Layout der Transfer-Ergebnisse. |
| **Marken** | `rentiva-brands.php` | Bereich mit Fahrzeugmarken. |
| **Primärer CTA** | `rentiva-primary-cta.php` | Allgemeiner Call-to-Action. |
| **Buchungs-CTA** | `rentiva-booking-cta.php` | Call-to-Action für Buchungen. |
| **Vertrauenswürdige Teams** | `rentiva-trusted-teams.php` | Vertrauenswürdige Geschäftspartner. |
| **404-Inhalt** | `404-content.php` | Inhalt der 404-Seite. |

---

## Umsetzung des responsiven Designs

Das Theme verwendet einen Ansatz mit „fließender Typografie und fließenden Abständen“:

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

**Mobile-First-Rastersystem**:
- Alle Patterns sind mit **CSS Grid** oder **Flexbox** gestaltet.
- Das Pattern für das Ergebnisraster verwendet `repeat(auto-fill, minmax(300px, 1fr))` zur automatischen Anpassung der Spalten.

---

## So passt du Templates an

Da es sich um ein FSE-Theme handelt, können Templates im WordPress-Website-Editor überschrieben werden:
1. Gehe zu **Design → Editor → Templates**.
2. Wähle das Template aus (z. B. `Single Vehicle`).
3. Füge Blöcke nach Bedarf hinzu, entferne sie oder ändere ihre Reihenfolge.
4. **Veröffentlichen**: Deine Änderungen werden in der Datenbank gespeichert, die Theme-Dateien bleiben unverändert.

### Überschreiben per Child-Theme (optional)
Wenn du eine dateibasierte Anpassung bevorzugst, kannst du ein Child-Theme erstellen und deine HTML-Templates in derselben Ordnerstruktur ablegen.

---

## Änderungsprotokoll
| Datum | Version | Hinweis |
|-------|-------|-----|
| 23.04.2026 | v0.3.0 | Englische Übersetzung auf die türkischen Abschnitte angewendet. |
| 27.03.2026 | v0.3.0 | Vollständige Liste der Templates (10) und Patterns (31) aktualisiert. |
| 09.03.2026 | 1.0.0-docs | Dokumentation zu Templates und Patterns erstellt. |
