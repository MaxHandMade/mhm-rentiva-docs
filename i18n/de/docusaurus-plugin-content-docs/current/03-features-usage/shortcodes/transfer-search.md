---
title: "Transfer-Suchformular"
description: "Bedienungsanleitung und technische Referenz für das Modul „Transfer-Suchformular“."
sidebar_position: 17
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Aktualisiert](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite dokumentiert eine Funktion des Add-ons **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und setzt voraus, dass Pro zusätzlich zu Lite installiert ist und eine gültige Lizenz vorliegt.
Eine vollständige Gegenüberstellung findest du unter [Editionen – Lite vs. Pro](/docs/), Pro erhältst du unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Zweck
Diese Seite beschreibt das Modul „Transfer-Suchformular“ als Standardreferenz und behandelt sowohl technische als auch betriebliche Aspekte.
:::

# 🚗 Transfer-Suchformular

## Inhalt
- Verwendung
- Funktionen
- Hinweise für Entwickler

Das Modul „Transfer-Suchformular“ dient dazu, Besuchern auf der Rentiva-Plattform die Suche nach **Transfers** bereitzustellen und diese Suchvorgänge zu verwalten.

## Verwendung

:::tip BILD FOLGT IN KÜRZE
Hier wird ein Screenshot ergänzt, der das Frontend (die Ansicht für Besucher) dieses Moduls zeigt.
:::

Um dieses Modul in eine beliebige Seite oder einen beliebigen Beitrag einzufügen, verwende den folgenden Shortcode:

```shortcode
[rentiva_transfer_search]
```

Du kannst es auch visuell im Gutenberg-Blockeditor einfügen, indem du **„MHM Rentiva → Transfer-Suchformular“** auswählst.

### Parameter

Im Shortcode stehen folgende Parameter zur Verfügung:

| Parameter | Standard | Beschreibung |
| :--- | :--- | :--- |
| - | - | Dieser Shortcode akzeptiert keine Parameter. |


## Funktionen

### 📱 Responsives Design
- **Mobil:** Einspaltiges Layout.
- **Tablet (unter 782px):** Optimierte Ansicht.
- **Desktop:** Vollständige Ansicht mit der eingestellten Spaltenanzahl bzw. Breite.

### 🚀 Auf Performance ausgelegt
- **Intelligentes Caching:** Datenbankabfragen werden vom System optimiert und zwischengespeichert.
- **Bedingtes Laden:** Statische Assets werden nur auf Seiten eingebunden, auf denen das Modul verwendet wird.

## Hinweise für Entwickler

- **HTML-Struktur:** Alle Container beginnen mit der Klasse `.mhm-rentiva-transfer-search-wrapper`.
- **Anpassung:** CSS-Variablen (`--mhm-color-primary` usw.) werden aus der globalen Datei `css-variables.css` übernommen.

## Zusammenfassung des Abschnitts
- Die Seite „Transfer-Suchformular“ wurde an die Standardstruktur der Dokumentation mit einheitlichen Referenzüberschriften angepasst.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.0-docs | Seite alphabetisch eingeordnet und Bildplatzhalter hinzugefügt. |
