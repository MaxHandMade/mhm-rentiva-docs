---
title: "Kundenbewertungen"
description: "Nutzungsanleitung und technische Referenz für das Modul „Kundenbewertungen“."
sidebar_position: 15
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Diese Seite beschreibt das Modul „Kundenbewertungen“ als Standardreferenz und deckt sowohl technische als auch betriebliche Aspekte ab.
:::

# 🚗 Kundenbewertungen

## Inhalt
- Verwendung
- Funktionen
- Hinweise für Entwickler

Das Modul „Kundenbewertungen“ dient dazu, **Support**-Bewertungen auf der Rentiva-Plattform zu verwalten und Besuchern anzuzeigen.

## Verwendung

:::tip BILD FOLGT IN KÜRZE
Hier wird ein Screenshot ergänzt, der das Frontend-Erscheinungsbild (für Besucher sichtbar) dieses Moduls zeigt.
:::

Um dieses Modul zu einer beliebigen Seite oder einem Beitrag hinzuzufügen, verwende den folgenden Shortcode:

```shortcode
[rentiva_testimonials limit="apply_filters(mhmrentiva_testimonials_limit"]
```

Du kannst es auch visuell im Gutenberg-Blockeditor einfügen, indem du **„MHM Rentiva → Testimonials“** auswählst.

### Parameter

Innerhalb des Shortcodes stehen die folgenden Parameter zur Verfügung:

| Parameter | Standard | Beschreibung |
| :--- | :--- | :--- |
| `limit` | `apply_filters(mhmrentiva_testimonials_limit` | Maximale Anzahl der angezeigten Einträge. |
| `rating` | `apply_filters(mhmrentiva_testimonials_rating` | Steuert das **Funktions**-Filterverhalten des Moduls. |
| `vehicle_id` | `apply_filters(mhmrentiva_testimonials_vehicle_id` | Steuert das **Funktions**-Filterverhalten des Moduls. |
| `orderby` | `apply_filters(mhmrentiva_testimonials_orderby` | Steuert das **allgemeine** Sortierverhalten des Moduls. |
| `order` | `apply_filters(mhmrentiva_testimonials_order` | Steuert die **allgemeine** Sortierrichtung des Moduls. |
| `show_rating` | `apply_filters(mhmrentiva_testimonials_show_rating` | Steuert das **allgemeine** Anzeigeverhalten des Moduls. |
| `show_date` | `apply_filters(mhmrentiva_testimonials_show_date` | Sichtbarkeitsschalter. `1` (an) oder `0` (aus). |
| `show_vehicle` | `apply_filters(mhmrentiva_testimonials_show_vehicle` | Sichtbarkeitsschalter. `1` (an) oder `0` (aus). |
| `show_customer` | `apply_filters(mhmrentiva_testimonials_show_customer` | Sichtbarkeitsschalter. `1` (an) oder `0` (aus). |
| `layout` | `apply_filters(mhmrentiva_testimonials_layout` | Steuert das **allgemeine** Layoutverhalten des Moduls. |
| `columns` | `apply_filters(mhmrentiva_testimonials_columns` | Steuert das **allgemeine** Layoutverhalten des Moduls. |
| `auto_rotate` | `apply_filters(mhmrentiva_testimonials_auto_rotate` | Sichtbarkeitsschalter. `1` (an) oder `0` (aus). |
| `class` | `apply_filters(mhmrentiva_testimonials_class` | Steuert das **allgemeine** Layoutverhalten des Moduls. |


## Funktionen

### 📱 Responsives Design
- **Mobil:** Einspaltiges Layout.
- **Tablet (unter 782px):** Optimierte Ansicht.
- **Desktop:** Vollständige Ansicht mit der konfigurierten Spaltenanzahl oder Breite.

### 🚀 Leistungsorientiert
- **Intelligentes Caching:** Datenbankabfragen werden vom System optimiert und zwischengespeichert.
- **Bedingtes Laden:** Statische Assets werden nur auf Seiten eingebunden, auf denen das Modul verwendet wird.

## Hinweise für Entwickler

- **HTML-Struktur:** Alle Container beginnen mit der Klasse `.mhm-rentiva-testimonials-wrapper`.
- **Anpassung:** CSS-Variablen (`--mhm-color-primary` usw.) werden aus der globalen Datei `css-variables.css` übernommen.

## Zusammenfassung des Abschnitts
- Die Seite „Kundenbewertungen“ wurde an die Standardstruktur der Dokumentation mit einheitlichen Referenzüberschriften angepasst.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.0-docs | Seite alphabetisch eingeordnet und Bildplatzhalter hinzugefügt. |
