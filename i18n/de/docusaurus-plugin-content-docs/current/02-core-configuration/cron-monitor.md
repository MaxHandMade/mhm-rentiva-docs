---
id: cron-monitor
title: "Cronjob-Monitor"
sidebar_label: "Cronjob-Monitor"
sidebar_position: 15
slug: /core-configuration/cron-monitor
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Der Tab „Cronjob-Monitor“ ist der Verwaltungsbereich, in dem du den Status der automatisierten Aufgaben (geplanten Vorgänge), die MHM Rentiva im Hintergrund ausführt, in Echtzeit überwachst. Du erreichst ihn über **MHM Rentiva > Einstellungen > Cronjob-Monitor**.

Das Plugin nutzt das WP-Cron-System für Vorgänge wie E-Mail-Versand, Buchungsstornierungen und Datenbereinigung.

---

## 🕒 Wichtigste überwachte Aufgaben

In diesem Panel kannst du alle Plugin-spezifischen Warteschlangen und geplanten Jobs einsehen:

- **Automatische Buchungsstornierung:** Entfernt auf Zahlung wartende Buchungen, deren Frist abgelaufen ist, automatisch aus dem System.
- **E-Mail-Warteschlange:** Reiht fällige Bestätigungs-, Erinnerungs- oder Dankesnachrichten an Kunden in die Warteschlange ein und versendet sie.
- **Richtlinien zur Datenaufbewahrung:** Bereinigt alte Protokolle und temporäre Daten entsprechend den in den Einstellungen festgelegten Aufbewahrungsfristen.
- **Lizenz- und Update-Prüfung:** Führt regelmäßig eine Lizenzvalidierung durch und prüft, ob neue Plugin-Versionen verfügbar sind.

---

### 🖼️ BILD: CRONJOB-MONITOR-PANEL
*(Tab „Einstellungen > Cronjob-Monitor“ – Liste der aktiven Aufgaben und Schaltflächen „Jetzt ausführen“)*

---

:::tip Manuelles Eingreifen
Wenn eine Aufgabe als „Geplant“ angezeigt wird, aber zu hängen scheint, oder wenn sie sofort ausgeführt werden soll, klicke auf die Schaltfläche **„Jetzt ausführen“** neben dem entsprechenden Job, um ihn manuell auszulösen.
:::

---

### Zusammenfassung des Abschnitts
- Nutze die **Transparenz im Hintergrund**, um zu sehen, welche Aufgaben das System wann ausführt.
- **Vereinfachte Fehlererkennung** – ein nicht laufender Cronjob kann den E-Mail-Versand zum Stillstand bringen.
- Behalte die **operative Kontrolle**, indem du kritische Aufgaben (z. B. Stornierung) bei Bedarf manuell auslöst.

### Änderungsprotokoll
| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Dokumentation zum Cronjob-Monitor als eigenständige Seite erstellt. |
