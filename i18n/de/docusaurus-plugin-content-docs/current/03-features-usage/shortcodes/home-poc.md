---
title: "Experimenteller POC-Shortcode"
description: "Nutzungsanleitung und technische Referenz für das Modul „Experimental POC Shortcode“."
sidebar_position: 11
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Diese Seite beschreibt das Modul „Experimental POC Shortcode“ als Standardreferenz und behandelt sowohl technische als auch betriebliche Aspekte.
:::

# 🚗 Experimental POC Shortcode

## Inhalt
- Verwendung
- Funktionen
- Hinweise für Entwickler

Das Modul „Experimental POC Shortcode“ dient dazu, **Support**-Prozesse auf der Rentiva-Plattform zu verwalten und Besuchern darzustellen.

## Verwendung

:::tip BILD FOLGT IN KÜRZE
Hier wird ein Screenshot ergänzt, der die Frontend-Darstellung (für Besucher) dieses Moduls zeigt.
:::

Um dieses Modul zu einer beliebigen Seite oder einem Beitrag hinzuzufügen, verwende den folgenden Shortcode:

```shortcode
[rentiva_home_poc]
```

Du kannst es auch visuell im Gutenberg-Blockeditor einfügen, indem du **„MHM Rentiva → Experimental POC Shortcode“** auswählst.

### Parameter

Die folgenden Parameter stehen im Shortcode zur Verfügung:

| Parameter | Standard | Beschreibung |
| :--- | :--- | :--- |
| - | - | Dieser Shortcode akzeptiert keine Parameter. |


## Funktionen

### 📱 Responsives Design
- **Mobil:** Einspaltiges Layout.
- **Tablet (unter 782px):** Optimierte Ansicht.
- **Desktop:** Vollständige Ansicht mit der eingestellten Spaltenanzahl oder Breite.

### 🚀 Auf Performance ausgelegt
- **Intelligentes Caching:** Datenbankabfragen werden vom System optimiert und zwischengespeichert.
- **Bedingtes Laden:** Statische Assets werden nur auf Seiten eingebunden, auf denen das Modul verwendet wird.

## Hinweise für Entwickler

- **HTML-Struktur:** Alle Container beginnen mit der Klasse `.mhm-rentiva-home-poc-wrapper`.
- **Anpassung:** CSS-Variablen (`--mhm-color-primary` usw.) werden aus der globalen Datei `css-variables.css` übernommen.

## Zusammenfassung des Abschnitts
- Die Seite „Experimental POC Shortcode“ wurde an die Standardstruktur der Dokumentation mit einheitlichen Referenzüberschriften angepasst.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.0-docs | Seite alphabetisch sortiert und Bildplatzhalter hinzugefügt. |
