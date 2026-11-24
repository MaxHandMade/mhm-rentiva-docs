---
id: introduction
title: "Einführung in das Theme"
sidebar_label: "Einführung"
slug: /theme/introduction
---
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=flat-square) ![FSE](https://img.shields.io/badge/FSE-Full_Site_Editing-success?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Das `mhm-rentiva-theme` ist ein modernes, leistungsstarkes **Full Site Editing (FSE)**-Theme, das speziell als Ergänzung zur `mhm-rentiva`-Plugin-Suite entwickelt wurde. Es bietet eine nahtlose, einheitliche Designsprache sowohl für statische Inhalte als auch für dynamische Vermietungsfunktionen.
:::

## Überblick

Im Gegensatz zu klassischen WordPress-Themes nutzt das `mhm-rentiva-theme` die neuesten blockbasierten Möglichkeiten von WordPress. Das bedeutet, dass jeder Teil der Website – vom Header und Footer bis hin zu den Fahrzeuglisten und dem Anbieter-Dashboard – direkt im Website-Editor angepasst werden kann.

### Warum es „perfekt passt“

Theme und Plugin werden gemeinsam entwickelt, um Folgendes sicherzustellen:
1. **Einheitliche Designsprache**: Konsistente Verwendung von Typografie (Plus Jakarta Sans) und Farbpaletten.
2. **Optimierte Layouts**: Vorgefertigte Block-Vorlagen für gängige Vermietungsszenarien (Hero-Suche, Fahrzeugdetails, Ergebnisraster).
3. **Performance**: Minimale PHP-Logik, gestützt auf Standard-Gutenberg-Blöcke und ein schlankes CSS-Utility-System.
4. **Reaktivität**: Integrierte Unterstützung für die AJAX-gesteuerten Komponenten des Plugins (Dashboard, Auszahlungen, Suche).

---

## Technischer Stack

- **Kern**: WordPress Block API (Gutenberg).
- **Styling**: `theme.json` für globale Stile + Atomic-CSS-Utilities für Feinanpassungen.
- **Typografie**: `Plus Jakarta Sans` für Überschriften und `Inter` für Fließtext.
- **Icons**: `Material Symbols Outlined` (Google Fonts).
- **FSE-Templates**: HTML-basierte Templates für Standard- und benutzerdefinierte Inhaltstypen (z. B. `single-vehicle`, `archive-vehicle`).

---

## Visuelle Hierarchie (Blockstruktur)

Wichtige Seiten folgen einer modularen Blockstruktur:

### Fahrzeug-Detailseite (`single-vehicle.html`)
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

## Wichtige Verzeichnisse

- `/templates`: HTML-Struktur für Seiten und Beiträge.
- `/parts`: Wiederverwendbare Website-Teile wie `header` und `footer`.
- `/patterns`: Komplexe Blockzusammenstellungen (z. B. Startseiten-Hero, Leistungsraster).
- `/assets`: Theme-spezifische CSS-Komponenten und JavaScript für UI-Interaktivität.

---

## Änderungsprotokoll
| Datum | Version | Hinweis |
|------|---------|------|
| 2026-03-09 | 1.0.0-docs | Erste Dokumentation zur Einführung in das Theme. |
