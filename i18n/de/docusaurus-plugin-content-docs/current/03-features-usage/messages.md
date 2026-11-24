---
id: messages
title: "Nachrichtensystem"
sidebar_position: 12
slug: /features-usage/messages
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite beschreibt eine Funktion des Add-ons **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und setzt voraus, dass Pro zusätzlich zu Lite installiert ist und eine gültige Lizenz vorliegt.
Unter [Editionen — Lite vs. Pro](/docs/) findest du die vollständige Aufteilung, oder hol dir Pro unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info React-SPA (seit v4.40.0)
Die Admin-Seite „Nachrichten“ wurde in v4.40.0 vollständig auf eine **React-SPA** umgestellt (der CSS-Feinschliff wurde in v4.41.0 abgeschlossen). Alle 6 React-Komponenten werden aus `build/admin/messages.js` ausgeliefert. Die Seite lädt ohne vollständiges PHP-Rendering der Seite — die Daten werden über `/wp-json/mhm-rentiva/v1/messages/*`-REST-Endpunkte abgerufen. Die alten PHP-Render-Methoden wurden entfernt.
:::

Das Nachrichtensystem ist ein zentraler Support-Kanal, über den du vor oder nach einer Miete direkt und sicher mit deinen Kunden kommunizieren kannst. Verwalte alle eingehenden Anfragen unter **MHM Rentiva > Nachrichten**.

---

## 📩 Nachrichtenliste und Filterung

Der Posteingang ist nach Dringlichkeit und Art der Anfrage geordnet. Die Liste enthält die folgenden Hauptspalten:

- **Betreff & Labels:** Neue Nachrichten (NEW) werden mit einem orangefarbenen Label hervorgehoben.
- **Priorität:** Dringlichkeitsstufe, festgelegt als „Normal“, „Hoch“ oder „Dringend“.
- **Kategorie:** Das Thema der Nachricht (Allgemein, Buchung, Zahlung, Technischer Support usw.; die Liste verwaltest du in den [Nachrichteneinstellungen](../02-core-configuration/message-settings.md)).
- **Status:** Statusverfolgung als „Ausstehend“, „Beantwortet“ oder „Geschlossen“.

:::note Nachrichten aus dem Kontaktformular
Nachrichten, die Besucher über das [Kontaktformular](./shortcodes/contact.md) der Website senden, befinden sich in einer anderen Liste: **MHM Rentiva > Kontaktnachrichten**. Dort wird die ausgewählte Buchung an der Nachricht angezeigt, der Typfilter entspricht den Typen im Formular, und dort befinden sich auch der Spamschutz des Formulars und der Filter **Spam**.
:::

---

## 💬 Kommunikation und Antwortablauf

Ein Klick auf eine Nachricht öffnet eine Detailseite, die den Dialog mit dem Kunden als Thread darstellt:

1.  **Kundenidentität:** Benutzername und E-Mail-Adresse des Absenders werden oben angezeigt.
2.  **Nachrichteninhalt:** Der eigentliche Text, den der Kunde gesendet hat, und der Sendezeitpunkt (z. B. „vor 3 Wochen“).
3.  **Antworten-Button:** Damit kannst du dem Kunden direkt aus dem Admin-Bereich antworten.

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>📸 BILD: NACHRICHTENDETAILS UND ANTWORTABLAUF</strong><br/>
  <em>mhm-rentiva-message-details-reply</em>
</div>

---

## ⚙️ Technische Verwaltung und Buchungszuordnung

Der Bearbeitungsbildschirm für Nachrichten bietet eine entscheidende Funktion, um den betrieblichen Kontext zu wahren: **Buchungszuordnung.**

- **Änderung von Kategorie und Status:** Der Admin kann den Nachrichtentyp und dessen Status manuell aktualisieren (z. B. von „Ausstehend“ auf „Beantwortet“).
- **Buchungsverknüpfung:** Du kannst eine eingehende Nachricht mit einer bestehenden Buchungsnummer (z. B. #3037) verknüpfen. So siehst du beim Aufrufen der Buchungsdetails die gesamte bisherige Korrespondenz zu diesem Vorgang.

---

## 📱 Mobil-responsiv (v4.48.0+)

Auf kleinen Bildschirmen (≤782px) wechselt die Nachrichtentabelle in ein **gestapeltes Kartenlayout**. Die Spaltenüberschriften werden per CSS `attr(data-label)` inline eingefügt — kein horizontales Scrollen. Auch die Thread-Ansicht wird vertikal gestapelt.

---

## React-Komponenten (v4.40.0+)

| Komponente | Zweck |
| :--- | :--- |
| `MessagesPage` | Root — Listenansicht + Thread-Ansicht + Einstellungsansicht |
| `MessageTable` | Sortierbarer, filterbarer Nachrichteneingang |
| `ThreadView` | Thread im Chat-Blasen-Stil mit Antwortformular |
| `SettingsView` | Verwaltung von Kategorien und Status |

**REST-Namespace:** `GET/POST /wp-json/mhm-rentiva/v1/messages/*`

---

### Zusammenfassung des Abschnitts
- Organisiere Support-Anfragen mit der **Nachrichtenfilterung**.
- Steigere die Kundenzufriedenheit mit dem **Antwortablauf**.
- Gleiche den Kommunikationsverlauf mithilfe der **Buchungszuordnung** mit den betrieblichen Daten ab.

### Änderungsprotokoll
| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 11.05.2026 | 4.48.0 | Mobiles gestapeltes Layout für die Nachrichtentabelle (≤782px). |
| 11.05.2026 | 4.41.0 | CSS-Feinschliff abgeschlossen. Admin-Menü für Auszahlungen hinzugefügt. |
| 11.05.2026 | 4.40.0 | Vollständige Migration zur React-SPA. Komponenten MessagesPage, MessageTable, ThreadView, SettingsView. |
| 23.04.2026 | 4.27.2 | Dokumentation mit der aktuellen Plugin-Version synchronisiert. |
| 19.03.2026 | 4.21.2 | Nachrichtendokumentation anhand der tatsächlichen Oberfläche um Antwortablauf und Buchungszuordnung ergänzt. |
| 26.02.2026 | 4.21.0 | Erste Version erstellt. |
