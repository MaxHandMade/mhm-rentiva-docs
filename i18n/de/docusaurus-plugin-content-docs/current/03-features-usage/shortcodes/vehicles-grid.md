---
title: "Fahrzeugraster"
description: "Nutzungsanleitung und technische Referenz für das Modul „Fahrzeugraster“."
sidebar_position: 22
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Diese Seite beschreibt das Modul „Vehicles Grid“ als Standardreferenz und deckt sowohl technische als auch betriebliche Aspekte ab.
:::

# 🚗 Fahrzeugraster

## Inhalt
- Verwendung
- Funktionen
- Hinweise für Entwickler

Das Modul „Vehicles Grid“ dient dazu, **Fahrzeug**-Einträge auf der Rentiva-Plattform zu verwalten und Besuchern zu präsentieren.

## Verwendung

![Frontend-Ansicht dieses Shortcodes](/img/docs/screens/sc-vehicles-grid.webp)

Um dieses Modul zu einer beliebigen Seite oder einem Beitrag hinzuzufügen, verwende den folgenden Shortcode:

```shortcode
[rentiva_vehicles_grid limit="12"]
```

Du kannst es auch visuell im Gutenberg-Blockeditor einfügen, indem du **„MHM Rentiva → Vehicles Grid“** auswählst.

### Parameter

Folgende Parameter stehen im Shortcode zur Verfügung:

| Parameter | Standard | Beschreibung |
| :--- | :--- | :--- |
| `limit` | `12` | Maximale Anzahl der angezeigten Elemente. |
| `columns` | `2` | Steuert das **allgemeine** Layoutverhalten des Moduls. |
| `orderby` | `title` | Steuert das **allgemeine** Sortierverhalten des Moduls. |
| `order` | `ASC` | Steuert die **allgemeine** Sortierrichtung des Moduls. |
| `category` | `(empty)` | Steuert das **Merkmals**-Filterverhalten des Moduls. |
| `featured` | `0` | Sichtbarkeitsschalter. `1` (an) oder `0` (aus). |
| `show_image` | `1` | Sichtbarkeitsschalter. `1` (an) oder `0` (aus). |
| `show_title` | `1` | Steuert das **allgemeine** Anzeigeverhalten des Moduls. |
| `show_price` | `1` | Steuert das **allgemeine** Anzeigeverhalten des Moduls. |
| `show_features` | `1` | Steuert das **allgemeine** Anzeigeverhalten des Moduls. |
| `show_rating` | `1` | Steuert das **allgemeine** Anzeigeverhalten des Moduls. |
| `show_booking_button` | `1` | Steuert das **allgemeine** Anzeigeverhalten des Moduls. |
| `show_favorite_button` | `1` | Steuert das **allgemeine** Anzeigeverhalten des Moduls. |
| `show_category` | `1` | Steuert das **allgemeine** Anzeigeverhalten des Moduls. |
| `show_brand` | `0` | Sichtbarkeitsschalter. `1` (an) oder `0` (aus). |
| `show_compare_button` | `1` | Steuert das **allgemeine** Anzeigeverhalten des Moduls. |
| `enable_lazy_load` | `1` | Sichtbarkeitsschalter. `1` (an) oder `0` (aus). |
| `enable_ajax_filtering` | `0` | Sichtbarkeitsschalter. `1` (an) oder `0` (aus). |
| `enable_infinite_scroll` | `0` | Sichtbarkeitsschalter. `1` (an) oder `0` (aus). |
| `image_size` | `medium` | Steuert das **Layout**-Verhalten des Moduls. |
| `class` | `(empty)` | Steuert das **allgemeine** Layoutverhalten des Moduls. |
| `custom_css_class` | `(empty)` | Steuert das **Layout**-Verhalten des Moduls. |
| `min_rating` | `(empty)` | Steuert das **Abfrage**-Verhalten des Moduls. |
| `min_reviews` | `(empty)` | Steuert das **Abfrage**-Verhalten des Moduls. |
| `layout` | `grid` | Steuert das **allgemeine** Layoutverhalten des Moduls. |


## Funktionen

### 📱 Responsives Design
- **Mobil:** Einspaltiges Layout.
- **Tablet (unter 782px):** Optimierte Ansicht.
- **Desktop:** Vollständige Ansicht mit der eingestellten Spaltenanzahl bzw. Breite.

### 🚀 Auf Performance ausgelegt
- **Intelligentes Caching:** Datenbankabfragen werden vom System optimiert und zwischengespeichert.
- **Bedingtes Laden:** Statische Assets werden nur auf Seiten eingebunden, auf denen das Modul verwendet wird.

## Details der Fahrzeugkarte

- **Pflichtleistungen im Gesamtpreis:** Wird die Seite mit Daten aufgerufen (zum Beispiel aus einer Suche), zeigt jede Karte den Gesamtpreis für den Zeitraum. Wenn du einige Zusatzleistungen als Pflicht markiert hast, nennt eine Zeile unter dem Gesamtpreis diese, zum Beispiel „Pflichtleistung inklusive: Vollkasko 25“ (mehrere Leistungen werden durch Kommas getrennt mit einem gemeinsamen Betrag aufgeführt; eine Leistung mit Tagespreis wird mit der Anzahl der Tage multipliziert). Eine Karte ohne Daten zeigt den Tagespreis und keine solche Zeile.
- **Anordnung von Preis und Button:** Die Breite der Karte selbst bestimmt das Layout. In einer schmalen Karte (zum Beispiel bei hervorgehobenen Fahrzeugen auf der Startseite oder auf einer dreispaltigen Fahrzeugseite) steht der Preis über dem Button **Buchung vornehmen**; in einer breiten Karte (zum Beispiel bei Suchergebnissen mit Daten) stehen beide nebeneinander. Karten in derselben Zeile sehen immer gleich aus.
- **Zahlenformat:** Kilometerstand und Hubraum richten sich nach der Sprache der Seite: Englisch „18,500 km“ und „1.6 L“, Türkisch „18.500 km“ und „1,6 L“.

## Hinweise für Entwickler

- **HTML-Struktur:** Alle Container beginnen mit der Klasse `.mhm-rentiva-vehicles-grid-wrapper`.
- **Anpassung:** CSS-Variablen (`--mhm-color-primary` usw.) werden aus der globalen Datei `css-variables.css` übernommen.

## Zusammenfassung des Abschnitts
- Die Seite „Vehicles Grid“ wurde an die Standardstruktur der Dokumentation mit einheitlichen Referenzüberschriften angepasst.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 18.11.2026 | 6.4.0 | Details der Fahrzeugkarte: Zeile für Pflichtleistungen, Anordnung von Preis/Button, Zahlenformat. |
| 11.10.2026 | 6.2.0 | `show_badges`, `show_description` und `show_availability` entfernt: 6.2.0 liest sie nicht mehr aus. |
| 23.04.2026 | 4.27.2-docs | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.0-docs | Seite alphabetisch sortiert und Bildplatzhalter hinzugefügt. |
