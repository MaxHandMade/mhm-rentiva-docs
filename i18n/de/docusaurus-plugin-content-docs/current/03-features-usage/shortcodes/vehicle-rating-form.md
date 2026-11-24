---
title: "Fahrzeugbewertungsformular"
description: "Bedienungsanleitung und technische Referenz für das Modul „Fahrzeugbewertungsformular“."
sidebar_position: 21
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Diese Seite beschreibt das Modul „Fahrzeugbewertungsformular“ als Standardreferenz und deckt sowohl technische als auch betriebliche Aspekte ab.
:::

# 🚗 Fahrzeugbewertungsformular

## Inhalt
- Verwendung
- Funktionen
- Hinweise für Entwickler

Das Modul „Fahrzeugbewertungsformular“ dient dazu, Besuchern auf der Rentiva-Plattform **Support**-Bewertungsformulare bereitzustellen und diese zu verwalten.

## Verwendung

:::tip BILD FOLGT IN KÜRZE
Hier wird ein Screenshot ergänzt, der die Frontend-Ansicht (für Besucher) dieses Moduls zeigt.
:::

Um dieses Modul zu einer beliebigen Seite oder einem Beitrag hinzuzufügen, verwende den folgenden Shortcode:

```shortcode
[rentiva_vehicle_rating_form vehicle_id=""]
```

Du kannst es auch visuell im Gutenberg-Blockeditor einfügen, indem du **„MHM Rentiva → Vehicle Rating Form“** auswählst.

### Parameter

Innerhalb des Shortcodes stehen die folgenden Parameter zur Verfügung:

| Parameter | Standardwert | Beschreibung |
| :--- | :--- | :--- |
| `vehicle_id` | `(empty)` | Steuert das **Funktions**-Filterverhalten des Moduls. |
| `show_rating_display` | `1` | Sichtbarkeitsschalter. `1` (an) oder `0` (aus). |
| `show_form` | `1` | Sichtbarkeitsschalter. `1` (an) oder `0` (aus). |
| `show_ratings_list` | `1` | Sichtbarkeitsschalter. `1` (an) oder `0` (aus). |
| `class` | `(empty)` | Steuert das **allgemeine** Layoutverhalten des Moduls. |


## Funktionen

### 📱 Responsives Design
- **Mobil:** Einspaltiges Layout.
- **Tablet (unter 782px):** Optimierte Ansicht.
- **Desktop:** Vollständige Ansicht mit der eingestellten Spaltenanzahl oder Breite.

### 🚀 Leistungsorientiert
- **Intelligentes Caching:** Datenbankabfragen werden vom System optimiert und zwischengespeichert.
- **Bedingtes Laden:** Statische Assets werden nur auf Seiten eingebunden, auf denen das Modul verwendet wird.

## Hinweise für Entwickler

- **HTML-Struktur:** Alle Container beginnen mit der Klasse `.mhm-rentiva-vehicle-rating-form-wrapper`.
- **Anpassung:** CSS-Variablen (`--mhm-color-primary` usw.) werden aus der globalen Datei `css-variables.css` übernommen.

## Zusammenfassung des Abschnitts
- Die Seite „Fahrzeugbewertungsformular“ wurde an die Standardstruktur der Dokumentation mit einheitlichen Referenzüberschriften angepasst.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.0-docs | Seite alphabetisch eingeordnet und Bildplatzhalter hinzugefügt. |
