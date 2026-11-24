---
title: "Transfer-Ergebnisse"
description: "Nutzungsanleitung und technische Referenz für das Modul „Transfer-Ergebnisse“."
sidebar_position: 16
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite dokumentiert eine Funktion der Erweiterung **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und setzt voraus, dass Pro zusätzlich zu Lite installiert ist und eine gültige Lizenz vorliegt.
Die vollständige Aufteilung findest du unter [Editionen – Lite vs. Pro](/docs/), Pro erhältst du unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Zweck
Diese Seite beschreibt das Modul „Transfer-Ergebnisse“ als Standardreferenz und behandelt sowohl technische als auch betriebliche Aspekte.
:::

# 🚗 Transfer-Ergebnisse

## Inhalt
- Verwendung
- Funktionen
- Hinweise für Entwickler

Das Modul „Transfer-Ergebnisse“ dient dazu, **Transfer**-Ergebnisse auf der Rentiva-Plattform zu verwalten und den Besuchern anzuzeigen.

## Verwendung

:::tip BILD FOLGT IN KÜRZE
Hier wird ein Screenshot ergänzt, der die Frontend-Darstellung (für Besucher sichtbar) dieses Moduls zeigt.
:::

Um dieses Modul in eine beliebige Seite oder einen Beitrag einzufügen, verwende den folgenden Shortcode:

```shortcode
[rentiva_transfer_results]
```

Du kannst es auch visuell im Gutenberg-Blockeditor einfügen, indem du **„MHM Rentiva → Transfer Results“** auswählst.

### Parameter

Innerhalb des Shortcodes stehen die folgenden Parameter zur Verfügung:

| Parameter | Standard | Beschreibung |
| :--- | :--- | :--- |
| - | - | Dieser Shortcode akzeptiert keine Parameter. |


## Funktionen

### 📱 Responsives Design
- **Mobil:** Einspaltiges Layout.
- **Tablet (unter 782px):** Optimierte Ansicht.
- **Desktop:** Vollständige Ansicht mit der eingestellten Spaltenanzahl bzw. Breite.

### 🚀 Leistungsorientiert
- **Intelligentes Caching:** Datenbankabfragen werden vom System optimiert und zwischengespeichert.
- **Bedingtes Laden:** Statische Assets werden nur auf Seiten eingebunden, auf denen das Modul verwendet wird.

## Hinweise für Entwickler

- **HTML-Struktur:** Alle Container beginnen mit der Klasse `.mhm-rentiva-transfer-results-wrapper`.
- **Anpassung:** CSS-Variablen (`--mhm-color-primary` usw.) werden aus der globalen Datei `css-variables.css` übernommen.

## Zusammenfassung des Abschnitts
- Die Seite „Transfer-Ergebnisse“ wurde an die Standardstruktur der Dokumentation mit einheitlichen Referenzüberschriften angepasst.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.0-docs | Seite alphabetisch eingeordnet und Bildplatzhalter hinzugefügt. |
