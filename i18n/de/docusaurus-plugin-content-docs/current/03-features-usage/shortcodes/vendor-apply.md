---
title: "Anbieter-Bewerbungsformular"
description: "Bedienungsanleitung und technische Referenz für das Modul „Anbieter-Bewerbungsformular“."
sidebar_position: 24
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Aktualisiert](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite dokumentiert eine Funktion des Add-ons **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und erfordert, dass Pro zusätzlich zu Lite installiert ist, sowie eine gültige Lizenz.
Die vollständige Aufteilung findest du unter [Editionen — Lite vs. Pro](/docs/), Pro erhältst du unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Zweck
Diese Seite beschreibt das Modul „Anbieter-Bewerbungsformular“ als Standardreferenz und behandelt sowohl technische als auch betriebliche Aspekte.
:::

# 🚗 Anbieter-Bewerbungsformular

## Inhalt
- Verwendung
- Funktionen
- Hinweise für Entwickler

Das Modul „Anbieter-Bewerbungsformular“ dient dazu, Onboarding-Prozesse für **Anbieter** auf der Rentiva-Plattform zu verwalten und Besuchern zu präsentieren.

## Verwendung

:::tip BILD FOLGT IN KÜRZE
Hier wird ein Screenshot ergänzt, der die Frontend-Darstellung (für Besucher sichtbar) dieses Moduls zeigt.
:::

Um dieses Modul zu einer beliebigen Seite oder einem Beitrag hinzuzufügen, verwende den folgenden Shortcode:

```shortcode
[rentiva_vendor_apply]
```

Du kannst es auch visuell im Gutenberg-Blockeditor einfügen, indem du **„MHM Rentiva → Anbieter-Bewerbungsformular“** auswählst.

### Parameter

Innerhalb des Shortcodes stehen die folgenden Parameter zur Verfügung:

| Parameter | Standard | Beschreibung |
| :--- | :--- | :--- |
| - | - | Dieser Shortcode akzeptiert keine Parameter. |


## Funktionen

### 📱 Responsives Design
- **Mobil:** Einspaltiges Layout.
- **Tablet (unter 782px):** Optimierte Ansicht.
- **Desktop:** Vollständige Ansicht mit der konfigurierten Spaltenanzahl bzw. Breite.

### 🚀 Auf Performance ausgelegt
- **Intelligentes Caching:** Datenbankabfragen werden vom System optimiert und zwischengespeichert.
- **Bedingtes Laden:** Statische Assets werden nur auf Seiten eingebunden, auf denen das Modul verwendet wird.

### 📜 Anbietervereinbarung

Wenn **Anbietervertrag erforderlich** aktiviert ist (**Einstellungen → Anbieter-Marktplatz → Anbietervereinbarung**), zeigt das Formular den Vereinbarungstext und eine Pflicht-Checkbox zur Zustimmung an; ohne diese kann die Bewerbung nicht abgeschickt werden. Ist der Text leer, wird stattdessen eine integrierte Vorlage angezeigt. Sie ist ein Ausgangspunkt, keine Rechtsberatung: Prüfe sie und passe sie an dein Unternehmen und das geltende Recht vor Ort an. Der Text akzeptiert `# Heading`, `**bold**`, `- list item` und `---`. Siehe [Anbieter-Onboarding](/docs/vendor/onboarding).

## Hinweise für Entwickler

- **HTML-Struktur:** Alle Container beginnen mit der Klasse `.mhm-rentiva-vendor-apply-wrapper`.
- **Anpassung:** CSS-Variablen (`--mhm-color-primary` usw.) werden aus der globalen Datei `css-variables.css` übernommen.

## Zusammenfassung des Abschnitts
- Die Seite „Anbieter-Bewerbungsformular“ wurde an die Standardstruktur der Dokumentation mit einheitlichen Referenzüberschriften angepasst.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 18.11.2026 | Pro 6.5.0 | Anzeige der Anbietervereinbarung im Formular, einschließlich der integrierten Vorlage bei leerem Text, dokumentiert. |
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.0-docs | Seite alphabetisch eingeordnet und Bildplatzhalter hinzugefügt. |
