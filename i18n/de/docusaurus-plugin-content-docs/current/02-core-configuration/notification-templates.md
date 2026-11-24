---
id: notification-templates
title: "Benachrichtigungs-Templates"
sidebar_label: "Benachrichtigungs-Templates"
sidebar_position: 9
slug: /core-configuration/notification-templates
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Der Tab „Benachrichtigungs-Templates“ ist die zentrale Stelle, an der du alle an Kunden und Administratoren gesendeten E-Mail-Inhalte (HTML) anpassen, testen und wiederherstellen kannst – einschließlich der Rückkehr zum „Gold Standard“-Design. Du erreichst ihn über **MHM Rentiva > Einstellungen > Benachrichtigungs-Templates**. Ist ein Feld leer, verwendet das System das Gold-Standard-Layout.

---

## 🛠️ Verwaltungswerkzeuge

Oben rechts auf der Seite befinden sich zwei wichtige Buttons:
- **E-Mail-Einstellungen:** Bietet schnellen Zugriff auf globale Einstellungen wie Absendername und Farbe.
- **Gold Standard wiederherstellen:** Dient dazu, Fehler in Templates zu beheben oder zum ursprünglichen professionellen Design zurückzukehren.

---

## 📂 Template-Kategorien

Benachrichtigungen sind in Tabs gruppiert:

### 1. Buchungsbenachrichtigungen
Kernnachrichten rund um den Mietprozess des Kunden. Jede hat ihren eigenen Schalter **Aktiviert** (sofern zutreffend), **Betreff** und **Inhalt (HTML)**:
- **E-Mail zu neuer Buchung:** Wird an den Kunden gesendet, wenn eine Buchung erstellt wird. Ihr Standardbetreff lautet „Booking Received: #…“ – die Buchung ist eingegangen, aber noch nicht bestätigt; die Bestätigung erhält der Kunde über die Status-E-Mail, sobald die Zahlung eingeht.
- **E-Mail zur Änderung des Buchungsstatus:** Statusaktualisierungen wie Bestätigt oder Ausstehend.
- **Admin-Benachrichtigungs-E-Mail:** Die Benachrichtigung, die du bei einer neuen Buchung erhältst (die Empfängeradresse legst du selbst fest).
- **E-Mail zur automatischen Stornierung:** Wird gesendet, wenn die Zahlungsfrist abläuft.
- **E-Mail zur manuellen Stornierung:** Wird gesendet, wenn Mitarbeiter eine Buchung stornieren.
- **E-Mail zur Abholungserinnerung:** Wird kurz vor der Abholung gesendet; nennt Abholung und Rückgabe.
- **Willkommens-E-Mail für Kunden:** Wird nach der ersten Buchung des Kunden gesendet.

Betreff und Inhalt, die du in diesen Feldern siehst, werden genau so versendet. Wenn du die Einstellungsseite mit einem früheren Standardbetreff gespeichert hast, wird der neue Standardbetreff angezeigt und verwendet; einen selbst geschriebenen Betreff behält das System bei.

### 2. Erstattungs-E-Mails
Templates speziell für Erstattungsprozesse:
- **Erstattungs-E-Mail an den Kunden:** Der erstattete Betrag, die Buchungsnummer und wie das Geld den Kunden erreicht.
- **Erstattungs-E-Mail an den Admin:** Informationen an den Administrator für Buchhaltung und betriebliche Nachverfolgung.

Wenn eine Erstattung manuell ausgezahlt wird (Banküberweisung, bar), erhält der Kunde statt der WooCommerce-E-Mail „Deine Bestellung wurde erstattet“ die Rentiva-E-Mail „Die Erstattung wird dir manuell ausgezahlt“. Ist die Rentiva-E-Mail deaktiviert oder hat die Buchung keine gültige Adresse, wird wie bisher die WooCommerce-E-Mail gesendet. Bei einer Erstattung, die das Zahlungs-Gateway selbst zurückzahlt, bleibt die WooCommerce-E-Mail unverändert. Wenn du die manuelle Auszahlung einer Erstattung bestätigst, erhält der Kunde eine zweite E-Mail: „…deine Erstattung wurde dir ausgezahlt“, mit der Auszahlungsreferenz, falls du eine eingegeben hast.

### 3. Nachrichten- und Anbieter-Benachrichtigungen (Pro)
> Diese Tabs erscheinen, wenn **MHM Rentiva Pro** aktiv ist.

- **Nachrichten-Benachrichtigungen:** Benachrichtigung über neue Nachrichten an Mitarbeiter, die Antwort-E-Mail an den Kunden und die automatische Eingangsbestätigung.
- **Anbieter-Benachrichtigungen:** E-Mails für den Anbieter-Marktplatz.

### 4. E-Mail-Vorschau
Siehe unten.

---

## 🔍 E-Mail-Vorschau & Tests

Mit dem Tab **E-Mail-Vorschau** prüfst du den aktuellen Stand der Templates:
- **Live-Vorschau:** Zeigt, wie die E-Mail im Posteingang des Kunden erscheinen wird.
- **Test senden:** Wähle ein bestimmtes Template aus und sende eine „Test-E-Mail“ an eine beliebige Adresse, um die Zustellung zu prüfen.

---

## 🏷️ Verfügbare dynamische Tags (Platzhalter)

Füge die folgenden Codes in `{}`-Klammern in den Template-Inhalt ein, damit Daten automatisch eingesetzt werden. Die Tag-Liste wird außerdem über jedem Tab angezeigt. Die vollständige Liste findest du auf der Seite [E-Mails & Benachrichtigungen](./emails.md):
- `{booking_id}`: Buchungsnummer.
- `{vehicle_title}`: Fahrzeugname.
- `{pickup_date}` / `{dropoff_date}`: Daten.
- `{pickup_time}` / `{return_time}`: Uhrzeiten.
- `{pickup_datetime}` / `{return_datetime}`: Datum und Uhrzeit zusammen (nur Datum, wenn keine Uhrzeit gespeichert ist).
- `{total_price}`: Gesamtbetrag.
- `{contact_name}` / `{salutation_name}`: Kundenname; der zweite ist für Anreden gedacht und gibt „geschätzter Kunde“ aus, wenn kein Name vorhanden ist.
- `{site_name}`: Der Name deiner Website.

---

## ✉️ Eine E-Mail aus einer Buchung an einen Kunden senden

Auf der Bearbeitungsseite einer Buchung kannst du in der Box **E-Mail an Kunden senden** einen Typ auswählen – Buchungsbestätigung, Buchungserinnerung, Buchungsstornierung oder Individuelle Nachricht. Betreff und Text werden hier aus dem Template befüllt, und du kannst sie vor dem Senden ändern. Ein unverändertes Template wird genau wie die automatische E-Mail versendet; änderst du den Betreff, wird er zum Titel der E-Mail. Ist der Versand deaktiviert oder der Testmodus aktiv, weist dich die Box darauf hin; hat der Kunde Benachrichtigungen deaktiviert, wird ein Hinweis hinzugefügt. Der Versand wird im Buchungsverlauf protokolliert.

---

![Einstellungen > Tab „Benachrichtigungs-Templates“](/img/docs/screens/settings-email-templates.webp)

*Einstellungen > Tab „Benachrichtigungs-Templates“, Template-Liste und Vorschau-Werkzeug*

---

### Zusammenfassung des Abschnitts
- Starte mit einem professionellen E-Mail-Design auf Basis des **Gold Standard**.
- Personalisiere Nachrichten mit **dynamischen Tags**.
- Nutze das **Vorschau-Werkzeug**, um Fehler vor der Veröffentlichung zu beheben.

### Änderungsprotokoll
| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 18.11.2026 | 6.4.0 | Template-Typen, Datum-und-Uhrzeit-Tags, `{salutation_name}`, Betreff „Booking Received“ für neue Buchungen, Erstattungs-E-Mails für manuelle Auszahlungen und die Box „E-Mail an Kunden senden“ dokumentiert. |
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Dokumentation zu Benachrichtigungs-Templates mit 4 Tabs und Details zum Vorschau-Werkzeug erstellt. |
