---
id: privacy-personal-data
title: "Datenschutz und personenbezogene Daten"
sidebar_label: "Datenschutz"
sidebar_position: 17
slug: /features-usage/privacy-personal-data
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

MHM Rentiva bindet sich in die WordPress-eigenen Werkzeuge für personenbezogene Daten ein. Wenn ein Kunde wissen möchte, welche Daten du über ihn speicherst, oder deren Löschung verlangt, bearbeitest du die Anfrage unter **Werkzeuge > Personenbezogene Daten exportieren** und **Werkzeuge > Personenbezogene Daten löschen**, und Rentiva ergänzt beide um seine Daten. Außerdem fügt es deinem Leitfaden für die Datenschutzerklärung einen fertigen Abschnitt hinzu.

> Mit **(Pro)** gekennzeichnete Teile erfordern **MHM Rentiva Pro**. Sie funktionieren auch nach Ablauf einer Lizenz weiter, da die Daten und die Rechte des Kunden daran bestehen bleiben.

---

## Personenbezogene Daten exportieren

Gib die E-Mail-Adresse des Kunden ein; der Export sammelt Folgendes (die WordPress-eigenen Werkzeuge exportieren das WordPress-Konto und die von WooCommerce die Rechnungsfelder):

| Gruppe | Was enthalten ist |
| :--- | :--- |
| **MHM Rentiva-Buchungen** | Jede Buchung der Person, einschließlich Gastbuchungen (zugeordnet über die E-Mail-Adresse): Nummer, Status, Fahrzeug, Abhol- und Rückgabedatum, Name, E-Mail, Telefon, Notizen, Gesamtbetrag, Zahlungsstatus, Stornierungs- und Erstattungsdetails, Link und Notiz zum Zahlungsbeleg, die Zeile **Mietvertrag akzeptiert** (Datum und Textversion) sowie die Verlaufsnotizen der Buchung, einschließlich Mitarbeiternotizen. Wer storniert hat und das interne Aktionsprotokoll werden nicht exportiert. |
| **MHM Rentiva-Kontaktnachrichten** | Datum, Typ, Name, E-Mail, Telefon, Firma, Nachricht, Einwilligung, IP-Adresse, Browser und Name des Anhangs. |
| **MHM Rentiva-E-Mail-Protokoll** | Datum und Betreff der versendeten E-Mails. |
| **MHM Rentiva-Kontodaten** | Telefon, Adresse, Lieblingsfahrzeuge, Fahrzeuge zum Vergleichen, letzte Anmeldung und Aktivität sowie die Benachrichtigungseinstellungen (Willkommens-E-Mail, Buchungsbenachrichtigungen, Marketing-E-Mails). |
| **MHM Rentiva Pro-Nachrichten (Pro)** | Die Nachrichtenverläufe der Person. |
| **MHM Rentiva Pro-Anbieterdaten (Pro)** | Anbieterprofil, jede Bewerbung, jede Auszahlung (einschließlich abgelehnter, mit ihrem Status) und die Berichte, seitenweise. Das Bankkonto (IBAN) erscheint **nur mit den letzten 4 Ziffern**. |
| **MHM Rentiva Pro-Einwilligungsnachweise (Pro)** | Wann die Datenschutz-Einwilligung erteilt oder widerrufen wurde. |

---

## Personenbezogene Daten löschen

Die Löschung folgt diesen Regeln:

- **Buchungen:** Abgeschlossene, stornierte, erstattete und nicht wahrgenommene Buchungen werden **anonymisiert**: Name, Kontaktdaten und Notizen werden entfernt; Datum, Fahrzeug und Betrag bleiben für deine Buchhaltung erhalten, und auch die Kopie in der Position der verknüpften WooCommerce-Bestellung wird anonymisiert. Ausstehende, bestätigte oder laufende Buchungen werden **beibehalten** und im Ergebnis aufgeführt, da bei einer laufenden Miete noch jemand erreichbar sein muss. Führe die Löschung erneut aus, sobald sie beendet sind. Kann eine Buchung nicht vollständig anonymisiert werden, weist das Ergebnis darauf hin; führe die Löschung dann in 15 Minuten erneut aus.
- **Kontaktnachrichten, E-Mail-Protokoll und Bewerbungsprotokoll:** werden gelöscht.
- **Kontodaten:** Die Kontodaten von Rentiva werden gelöscht. Das WordPress-Benutzerkonto wird **nicht** gelöscht; lösche es bei Bedarf unter **Benutzer**. Hatte der Kunde eine E-Mail-Benachrichtigung **deaktiviert**, bleibt diese Einstellung erhalten, damit das gelöschte Konto nicht wieder E-Mails erhält.
- **Verknüpfte WooCommerce-Bestellungen** behalten ihre Rechnungsdaten gemäß deiner WooCommerce-Datenschutzeinstellung.
- **Nachrichten (Pro):** Die Nachrichtenverläufe der Person werden vollständig gelöscht, einschließlich deiner Antworten.
- **Anbieterdaten (Pro):** Bewerbungen, Auszahlungen, das Kontobuch und Berichte werden aufgrund gesetzlicher Aufbewahrungspflichten **beibehalten**, und das Ergebnis weist darauf hin.
- **Einwilligungsnachweise (Pro):** werden gelöscht. Das Ergebnis erinnert dich außerdem daran, dass Kopien in Bericht-Caches innerhalb von 24 Stunden aktualisiert werden.

---

## Text für den Leitfaden zur Datenschutzerklärung

Unter **Einstellungen > Datenschutz** (dem Leitfaden zur Datenschutzerklärung) fügt Rentiva zwei Vorschläge hinzu, die du in deine eigene Datenschutzerklärung kopierst. Übernimm, was auf deine Website zutrifft, und passe die Aufbewahrungsfristen an:

- **MHM Rentiva:** Abschnitte zu **Buchungen**, **Kontaktformular**, **E-Mails und Protokolle** und **Dein Konto**, dazu ein Hinweis, dass mit den Datenbank-Werkzeugen von Rentiva erstellte Datenbank-Backups diese Daten enthalten und durch eine Löschanfrage nicht verändert werden: Lösche alte Backups selbst.
- **MHM Rentiva Pro (Pro):** Abschnitte zu **Nachrichten**, **Anbieter** und **Einwilligung**, dazu ein Hinweis, dass Bericht-Caches bis zu 24 Stunden lang Kopien von Kundennamen und E-Mail-Adressen enthalten, dass in `uploads/mhm-rentiva-exports/` gespeicherte CSV-Berichtsdateien nicht automatisch gelöscht werden (lösche sie, wenn du sie nicht mehr brauchst) und dass das Administrator-Audit-Protokoll, das festhält, welcher Mitarbeiter Bank- oder Dokumentdaten eingesehen hat, beibehalten wird.

---

## Datenschutz-Einstellungen in „Mein Konto“ (Pro)

Kunden sehen Folgendes unter **Mein Konto**:

- **Karte zur Datenschutz-Einwilligung:** Solange der Kunde keine Einwilligung erteilt hat, erscheint oben im Dashboard von „Mein Konto“ innerhalb der Seite eine Karte mit **Akzeptieren** und **Ablehnen**. Sie ist kein Pop-up mehr über anderen Seiten.
- Abschnitt **Datenschutz-Einstellungen**: **Datenexport anfordern**, **Datenlöschung anfordern** und, erst nachdem der Kunde seine Einwilligung erteilt hat, **Einwilligung widerrufen**.

**Datenexport anfordern** und **Datenlöschung anfordern** starten eine Standard-Anfrage von WordPress, die der Kunde per E-Mail bestätigt (eine neue Bestätigungs-E-Mail kann alle 10 Minuten gesendet werden). Nach der Bestätigung bearbeitest du die Anfrage über die oben genannten **Werkzeuge**-Seiten. Die auf der Karte angezeigte Einwilligung ist dieselbe Antwort, die die Einwilligungsprüfung des Buchungsformulars ausliest.

:::info Geändert in 6.4.0
Export und Löschung personenbezogener Daten, der Text für den Leitfaden zur Datenschutzerklärung und die Anfragen in „Mein Konto“ sind neu in 6.4.0. **Einwilligung widerrufen** erscheint jetzt erst, nachdem der Kunde seine Einwilligung erteilt hat, und die Einwilligungskarte befindet sich oben im Dashboard von „Mein Konto“, statt sich in einem Feld über der Seite zu öffnen.
:::

---

### Zusammenfassung des Abschnitts
- Verwende **Werkzeuge > Personenbezogene Daten exportieren / löschen**; Rentiva ergänzt Buchungen, Kontaktnachrichten, E-Mail-Protokoll, Kontodaten und das Bewerbungsprotokoll (nur bei der Löschung). Pro ergänzt Nachrichten, Anbieterdaten und Einwilligungsnachweise.
- Abgeschlossene Buchungen werden anonymisiert, laufende werden beibehalten.
- Kopiere die Abschnitte aus dem Leitfaden in deine Datenschutzerklärung.

### Änderungsprotokoll
| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 18.11.2026 | 6.4.0 / Pro 6.5.0 | Seite erstellt: Export und Löschung personenbezogener Daten, Text für den Leitfaden zur Datenschutzerklärung, Datenschutz-Einstellungen in „Mein Konto“. |
