---
id: message-settings
title: "Nachrichten-Einstellungen"
sidebar_label: "Nachrichten-Einstellungen"
sidebar_position: 10
slug: /core-configuration/message-settings
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite beschreibt eine Funktion des Add-ons **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und erfordert, dass Pro zusätzlich zu Lite installiert ist, sowie eine gültige Lizenz.
Die vollständige Aufteilung findest du unter [Editionen – Lite vs. Pro](/docs/), Pro erhältst du unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

Im Tab „Nachrichten-Einstellungen“ konfigurierst du das interne Chat-System zwischen Kunden und Mitarbeitern, die Benachrichtigungseinstellungen und die Workflow-Kategorien. Du erreichst ihn über **MHM Rentiva > Einstellungen > Nachrichten-Einstellungen**.

:::important Pro-Funktion
Das Nachrichtensystem ist Teil des Premium-Pakets. Deine Lizenz muss diese Funktion unterstützen, damit die Einstellungen aktiv sind.
:::

---

## 🛠️ Verwaltungswerkzeuge

- **Unterhaltungen zurücksetzen:** Löscht den gesamten Nachrichtenverlauf dauerhaft aus der Datenbank (für die betriebliche Bereinigung).
- **Diesen Tab zurücksetzen:** Setzt die Nachrichten-Einstellungen auf ihre Werkseinstellungen zurück.

---

## 📂 Einstellungs-Tabs

Das Nachrichtensystem wird unter vier Hauptüberschriften konfiguriert:

### 1. Benachrichtigungen
- **Verwaltungs-E-Mail:** Die Zieladresse für Benachrichtigungen an Mitarbeiter (bleibt das Feld leer, wird die globale Administrator-E-Mail-Adresse verwendet).
- **Absendername:** Der Absendername, der in E-Mails zu Nachrichtenbenachrichtigungen angezeigt wird (bleibt das Feld leer, wird der Name der Website verwendet).
- **Mitarbeiter bei neuen Kundennachrichten benachrichtigen:** Sendet den Mitarbeitern eine E-Mail-Benachrichtigung, wenn eine neue Kundennachricht eingeht.
- **Kunden bei Antworten von Mitarbeitern benachrichtigen:** Sendet dem Kunden eine E-Mail, wenn ein Mitarbeiter auf eine Nachricht antwortet.

### 2. Systemregeln
- **Sichtbarkeit im Dashboard:** Aktiviert das Nachrichten-Widget im WordPress-Dashboard.
- **Widget-Kapazität:** Legt fest, wie viele aktuelle Nachrichten im Dashboard aufgelistet werden (Standard: 5, von 1 bis 20).
- **Automatische Antwort:** Sendet dem Kunden eine automatische Eingangsbestätigung per E-Mail, wenn er eine Nachricht sendet (standardmäßig deaktiviert).

### 3. Kategorien
Ermöglicht es, Nachrichten nach Thema zu klassifizieren. Die Standardkategorien sind:
- Allgemein, Buchung, Zahlung, Technischer Support, Beschwerde, Vorschlag.
- *Du kannst Kategorien umbenennen oder löschen und mit **Kategorie hinzufügen** neue hinzufügen.*

### 4. Workflow-Status
Dienen dazu, den Lebenszyklus von Nachrichten zu verfolgen:
- Ausstehend, Beantwortet, Geschlossen.
- *Die drei Status sind fest vorgegeben; du kannst jedoch umbenennen, wie jeder angezeigt wird. Die Dringlichkeit wird über die Nachrichtenpriorität (Normal, Hoch, Dringend) festgelegt, nicht über einen Status.*

:::note Nachrichten aus dem Kontaktformular
Nachrichten, die über das Kontaktformular der Website gesendet werden, bilden eine separate Liste (**MHM Rentiva > Kontaktnachrichten**) mit eigenem Spamschutz; siehe [Kontaktformular](../03-features-usage/shortcodes/contact.md).
:::

---

### 🖼️ BILD: NACHRICHTEN-EINSTELLUNGEN
*(Einstellungen > Tab „Nachrichten-Einstellungen“, Bereich zur Verwaltung von Kategorien und Benachrichtigungen)*

---

### Zusammenfassung des Abschnitts
- Nutze **Benachrichtigungen**, um möglichst schnell auf Kundenanfragen reagieren zu können.
- Nutze **Kategorien**, um eingehende Anfragen an die zuständigen Abteilungen (Vertrieb, Support usw.) weiterzuleiten.
- Nutze den **Workflow**, damit keine Kundenanfrage unbeantwortet bleibt.

### Änderungsprotokoll
| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 18.11.2026 | 6.5.0 | Feldnamen, Kategorien und die festen Workflow-Status an die Anzeige auf dem Bildschirm angepasst; Verweis auf Kontaktnachrichten und Spamschutz hinzugefügt. |
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Dokumentation der Nachrichten-Einstellungen mit 4 Unter-Tabs und Details zur Kategorienverwaltung erstellt. |
