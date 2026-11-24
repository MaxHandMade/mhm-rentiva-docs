---
title: "Fahrzeugvergleich"
description: "Benutzungsanleitung und technische Referenz für das Modul „Fahrzeugvergleich“."
sidebar_position: 19
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Diese Seite beschreibt das Modul „Fahrzeugvergleich“ als Standardreferenz und deckt sowohl technische als auch betriebliche Aspekte ab.
:::

# 🚗 Fahrzeugvergleich

## Inhalt
- Verwendung
- Funktionen
- Hinweise für Entwickler

Das Modul „Fahrzeugvergleich“ dient dazu, **Fahrzeug**-Vergleiche auf der Rentiva-Plattform zu verwalten und Besuchern zu präsentieren.

## Verwendung

:::tip BILD FOLGT IN KÜRZE
Hier wird ein Screenshot eingefügt, der die Frontend-Ansicht (für Besucher) dieses Moduls zeigt.
:::

Um dieses Modul zu einer beliebigen Seite oder einem Beitrag hinzuzufügen, verwende den folgenden Shortcode:

```shortcode
[rentiva_vehicle_comparison vehicle_ids=""]
```

Du kannst es auch visuell im Gutenberg-Blockeditor einfügen, indem du **„MHM Rentiva → Vehicle Comparison“** auswählst.

### Parameter

Die folgenden Parameter stehen im Shortcode zur Verfügung:

| Parameter | Standard | Beschreibung |
| :--- | :--- | :--- |
| `vehicle_ids` | `(empty)` | Steuert das **Funktions**-Filterverhalten des Moduls. |
| `max_vehicles` | `4` | Steuert das **allgemeine** Anzeigeverhalten des Moduls. |
| `show_add_vehicle` | `1` | Steuert das **allgemeine** Anzeigeverhalten des Moduls. |
| `show_remove_buttons` | `1` | Steuert das **allgemeine** Anzeigeverhalten des Moduls. |
| `show_prices` | `1` | Steuert das **allgemeine** Anzeigeverhalten des Moduls. |
| `show_images` | `1` | Steuert das **allgemeine** Anzeigeverhalten des Moduls. |
| `show_booking_buttons` | `1` | Steuert das **allgemeine** Anzeigeverhalten des Moduls. |
| `layout` | `table` | Steuert das **allgemeine** Layoutverhalten des Moduls. |
| `title` | `(empty)` | Steuert das **allgemeine** Anzeigeverhalten des Moduls. |
| `manual_add` | `0` | Steuert das **allgemeine** Anzeigeverhalten des Moduls. |
| `class` | `(empty)` | Steuert das **allgemeine** Layoutverhalten des Moduls. |


## Funktionen

### 📱 Responsives Design
- **Mobil:** Einspaltiges Layout.
- **Tablet (unter 782px):** Optimierte Ansicht.
- **Desktop:** Vollständige Ansicht mit der konfigurierten Spaltenanzahl bzw. Breite.

### 🚀 Leistungsorientiert
- **Intelligentes Caching:** Datenbankabfragen werden vom System optimiert und zwischengespeichert.
- **Bedingtes Laden:** Statische Assets werden nur auf Seiten eingebunden, auf denen das Modul verwendet wird.

## Hinweise für Entwickler

- **HTML-Struktur:** Alle Container beginnen mit der Klasse `.mhm-rentiva-vehicle-comparison-wrapper`.
- **Anpassung:** CSS-Variablen (`--mhm-color-primary` usw.) werden aus der globalen Datei `css-variables.css` übernommen.

## Zusammenfassung des Abschnitts
- Die Seite „Fahrzeugvergleich“ wurde an die Standardstruktur der Dokumentation mit einheitlichen Referenzüberschriften angepasst.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 11.10.2026 | 6.2.0 | `show_features` entfernt: 6.2.0 liest es nicht mehr aus. |
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.0-docs | Seite alphabetisch sortiert und Bildplatzhalter hinzugefügt. |
