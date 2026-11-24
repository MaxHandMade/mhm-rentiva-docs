---
title: "Kontobuchungen"
description: "Nutzungsanleitung und technische Referenz für das Modul „Kontobuchungen“."
sidebar_position: 2
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Diese Seite beschreibt das Modul „Kontobuchungen“ als Standardreferenz und deckt sowohl technische als auch betriebliche Aspekte ab.
:::

# 🚗 Kontobuchungen

## Inhalt
- Verwendung
- Funktionen
- Hinweise für Entwickler

Das Modul „Kontobuchungen“ dient dazu, **Konto**-Buchungsprozesse auf der Rentiva-Plattform zu verwalten und Besuchern anzuzeigen.

## Verwendung

:::tip BILD FOLGT IN KÜRZE
Hier wird ein Screenshot ergänzt, der die Frontend-Darstellung (für Besucher sichtbar) dieses Moduls zeigt.
:::

Um dieses Modul in eine beliebige Seite oder einen Beitrag einzufügen, verwende den folgenden Shortcode:

```shortcode
[rentiva_my_bookings limit="10"]
```

Du kannst es auch visuell im Gutenberg-Blockeditor einfügen, indem du **„MHM Rentiva → Account Bookings“** auswählst.

### Parameter

Die folgenden Parameter stehen im Shortcode zur Verfügung:

| Parameter | Standard | Beschreibung |
| :--- | :--- | :--- |
| `limit` | `10` | Maximale Anzahl der anzuzeigenden Einträge. |
| `status` | `(empty)` | Steuert das **Workflow**-Verhalten des Moduls. |
| `order` | `DESC` | Steuert die **allgemeine** Sortierrichtung des Moduls. |
| `hide_nav` | `false` | Sichtbarkeitsschalter. `1` (an) oder `0` (aus). |


## Funktionen

### 📱 Responsives Design
- **Mobil:** Einspaltiges Layout.
- **Tablet (unter 782px):** Optimierte Ansicht.
- **Desktop:** Vollständige Ansicht mit der eingestellten Spaltenanzahl oder Breite.

### 🚀 Leistungsorientiert
- **Intelligentes Caching:** Datenbankabfragen werden vom System optimiert und zwischengespeichert.
- **Bedingtes Laden:** Statische Assets werden nur auf Seiten eingebunden, auf denen das Modul verwendet wird.

## Hinweise für Entwickler

- **HTML-Struktur:** Alle Container beginnen mit der Klasse `.mhm-rentiva-my-bookings-wrapper`.
- **Anpassung:** CSS-Variablen (`--mhm-color-primary` usw.) werden aus der globalen Datei `css-variables.css` übernommen.

## Zusammenfassung des Abschnitts
- Die Seite „Kontobuchungen“ wurde an die Standardstruktur der Dokumentation mit einheitlichen Referenzüberschriften angepasst.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 11.10.2026 | 6.2.0 | `orderby` entfernt: 6.2.0 liest es nicht mehr aus. |
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.0-docs | Seite alphabetisch einsortiert und Bildplatzhalter hinzugefügt. |
