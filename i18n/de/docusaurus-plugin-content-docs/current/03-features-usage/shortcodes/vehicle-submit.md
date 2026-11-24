---
title: "Fahrzeugeinreichung durch Anbieter"
description: "Nutzungsanleitung und technische Referenz für das Modul zur Fahrzeugeinreichung durch Anbieter."
sidebar_position: 25
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Diese Seite beschreibt das Modul zur Fahrzeugeinreichung durch Anbieter als Standardreferenz und behandelt sowohl technische als auch betriebliche Aspekte.
:::

# 🚗 Fahrzeugeinreichung durch Anbieter

## Inhalt
- Verwendung
- Funktionen
- Hinweise für Entwickler

Das Modul zur Fahrzeugeinreichung durch Anbieter dient dazu, die Prozesse zur Fahrzeugeinreichung durch **Anbieter** auf der Rentiva-Plattform zu verwalten und Besuchern darzustellen.

## Verwendung

:::tip BILD FOLGT IN KÜRZE
Hier wird ein Screenshot ergänzt, der die Frontend-Ansicht (für Besucher) dieses Moduls zeigt.
:::

Um dieses Modul zu einer beliebigen Seite oder einem Beitrag hinzuzufügen, verwende den folgenden Shortcode:

```shortcode
[rentiva_vehicle_submit]
```

Du kannst es auch visuell im Gutenberg-Blockeditor einfügen, indem du **„MHM Rentiva → Fahrzeugeinreichung durch Anbieter“** auswählst.

### Parameter

Innerhalb des Shortcodes stehen die folgenden Parameter zur Verfügung:

| Parameter | Standard | Beschreibung |
| :--- | :--- | :--- |
| - | - | Dieser Shortcode akzeptiert keine Parameter. |


## Funktionen

### 📱 Responsives Design
- **Mobil:** Einspaltiges Layout.
- **Tablet (unter 782px):** Optimierte Ansicht.
- **Desktop:** Vollständige Ansicht mit der konfigurierten Spaltenanzahl oder Breite.

### 🚀 Leistungsorientiert
- **Intelligentes Caching:** Datenbankabfragen werden vom System optimiert und zwischengespeichert.
- **Bedingtes Laden:** Statische Assets werden nur auf Seiten eingebunden, auf denen das Modul verwendet wird.

### 🚗 Auswahl von Transfer-Standorten und -Routen (v4.23.0)

Seit v4.23.0 enthält das Formular zur Fahrzeugeinreichung spezielle Felder für das Transfer-Modul.

#### Nach Stadt gefilterte Standortauswahl
Transfer-Standorte werden automatisch anhand des Meta-Werts `_vendor_city` des Anbieters gefiltert. Die Abfrage erfolgt über `LocationProvider::get_by_city()`. Anbieter können nur Standorte in ihrer eigenen Stadt sehen und auswählen.

- **Meta-Schlüssel:** `_mhmrentiva_transfer_locations` (Array)
- **Meta-Schlüssel:** `_mhmrentiva_transfer_routes` (Array)

#### Preiseingabe pro Route
Für jede ausgewählte Route kann der Anbieter einen eigenen Preis innerhalb des vom Administrator festgelegten Bereichs `min_price` / `max_price` eingeben. Preise außerhalb dieses Bereichs werden abgelehnt.

- **Meta-Schlüssel:** `_mhmrentiva_transfer_route_prices` (JSON)
- **Fallback:** Ist kein Anbieterpreis festgelegt, wird der Wert `base_price` der Route verwendet.

#### Passagier- und Gepäckkapazität
- **Passagierkapazität:** Maximale Anzahl an Passagieren, die das Fahrzeug befördern kann.
- **Großes Gepäck:** Maximale Kapazität für große Koffer.
- **Kleines Gepäck:** Maximale Kapazität für kleine Taschen/Handgepäck.

#### Hochladen des Fahrzeugdokuments (Zulassung)
Der Anbieter kann die Zulassungsbescheinigung des Fahrzeugs über das Formular hochladen. Das Dokument wird vom Administrator zur Verifizierung geprüft.

## Hinweise für Entwickler

- **HTML-Struktur:** Alle Container beginnen mit der Klasse `.mhm-rentiva-vehicle-submit-wrapper`.
- **Anpassung:** CSS-Variablen (`--mhm-color-primary` usw.) werden aus der globalen Datei `css-variables.css` übernommen.
- **Transfer-Felder:** Werden per JS-Umschalter ein- bzw. ausgeblendet, wenn der Servicetyp auf „Transfer“ oder „Beide“ gesetzt ist.

## Zusammenfassung des Abschnitts
- Das Formular zur Fahrzeugeinreichung durch Anbieter enthält neben den grundlegenden Fahrzeuginformationen die Auswahl von Transfer-Standorten/-Routen, Preise pro Route und Kapazitätsfelder.
- Die stadtbasierte Filterung stellt sicher, dass Anbieter nur Standorte in ihrer eigenen Region sehen können.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 27.03.2026 | 4.23.0 | Nach Stadt gefilterte Auswahl von Transfer-Standorten/-Routen, Preise pro Route, Kapazitätsfelder und Hochladen der Zulassung dokumentiert. |
| 19.03.2026 | 4.21.0-docs | Seite alphabetisch geordnet und Bildplatzhalter hinzugefügt. |
