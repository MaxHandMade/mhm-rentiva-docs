---
id: payout-requests
title: "Auszahlungsanfragen"
sidebar_label: "Auszahlungsanfragen"
sidebar_position: 1
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Aktualisiert](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite dokumentiert eine Funktion des Add-ons **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und setzt voraus, dass Pro zusätzlich zu Lite installiert ist und eine gültige Lizenz vorliegt.
Siehe [Editionen – Lite vs. Pro](/docs/) für die vollständige Aufteilung oder hol dir Pro unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

Wenn das Anbieter-Ökosystem aktiv ist, wird die Weiterleitung der verdienten Mieteinnahmen an die Anbieter über das Menü **MHM Rentiva > Alle Auszahlungsanfragen** verwaltet.

---

## 📅 Ablauf einer Auszahlungsanfrage

Die Einnahmen der Anbieter werden dem Guthaben gutgeschrieben, nachdem die Zahlung des Kunden bestätigt wurde. Der Ablauf ist wie folgt:
1. **Erstellung der Anfrage:** Der Anbieter erstellt in seinem Dashboard eine Auszahlungsanfrage.
2. **Prüfung durch den Admin:** Der Admin sieht die ausstehenden Anfragen in der Liste.
3. **Genehmigung & Zahlung:** Die tatsächliche Überweisung erfolgt über die festgelegte Bank oder den festgelegten Zahlungskanal.
4. **Statusaktualisierung:** Sobald die Zahlung abgeschlossen ist, wird die Anfrage als „Bezahlt“ markiert.

---

## 🏧 Parameter der Einnahmenberechnung

Das System berücksichtigt die folgenden Posten:
- **Gesamtmietpreis:** Der Netto-Mietbetrag für das Fahrzeug.
- **Plattformprovision:** Der Anteil, den der Admin einbehält.
- **Zusätzliche Einnahmen:** Weitere Einnahmen aus Leistungen wie Versicherung, Kindersitz usw.

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>📸 Bild folgt in Kürze: Liste der Auszahlungsanfragen</strong><br/>
  <em>Hier wird der Bildschirm zur Auszahlungsverwaltung von MHM Rentiva angezeigt.</em>
</div>

---

## 📄 Auszahlungsabrechnungen (v4.61.0)

Wenn du eine Auszahlung genehmigst, erstellt das System automatisch eine **Zahlungsabrechnung** (_hakediş makbuzu_) für den Zeitraum, den diese Auszahlung abdeckt. Die Abrechnung ist **fortlaufend nummeriert** (z. B. `MKB-2026-0001`) und wird im Moment der Genehmigung als **unveränderlicher Datensatz** festgeschrieben – sie wird danach nie mehr überschrieben und gibt daher immer die Zahlen so wieder, wie sie zum Zeitpunkt der Zahlung an den Anbieter waren.

Die Abrechnung listet jede Kontobewegung im Zeitraum auf – Einnahmen und etwaige Strafen – zusammen mit den Summen des Zeitraums und dem ausgezahlten Betrag. Der Anbieter erhält automatisch eine **E-Mail** mit einem Link, über den er die Abrechnung in seinem Panel ansehen und ausdrucken kann.

### Wo du sie findest

- **Admin:** Die Abrechnungsnummer und ein Link **Anzeigen** erscheinen in der Liste **Alle Auszahlungsanfragen** neben der genehmigten Auszahlung.
- **Anbieter:** Die Abrechnung erscheint im Auszahlungsverlauf des Anbieters, und die E-Mail verlinkt direkt darauf (geöffnet innerhalb der eigenen Sitzung des Anbieters im Panel).

### Aufschlüsselung der Provision

Jede Einnahmenzeile der Abrechnung zeigt die vollständige Aufteilung, sodass der Anbieter genau sieht, wie sein Nettobetrag berechnet wurde:

| Spalte | Bedeutung |
| :--- | :--- |
| **Brutto** | Der gesamte Buchungsbetrag vor Abzug der Provision. |
| **Provision** | Der Satz der Plattform und der abgezogene Betrag (z. B. `%20 · 400.00`). |
| **Netto** | Was der Anbieter tatsächlich verdient hat (Brutto − Provision). |

Eine Zeile **„Abgezogene Provision gesamt“** für den Zeitraum summiert die Provision über alle Einnahmen in der Abrechnung. Straf- und Erstattungszeilen zeigen „—“ bei Brutto/Provision (für sie fällt keine Provision an). Abrechnungen, die **vor v4.61.0** ausgestellt wurden, wurden nicht mit dieser Detailtiefe erfasst und zeigen nur den Nettobetrag.

### Branding der Abrechnung

Die Abrechnung trägt die Identität deines Unternehmens. Unter **Einstellungen → Anbieter-Marktplatz → Abrechnungs-Branding** kannst du Folgendes festlegen:

- Firmenname, Adresse, Finanzamt und Steuernummer, Telefon und E-Mail
- Ein Firmen-**Logo**
- Einen eigenen **Fußzeilenhinweis** (z. B. einen rechtlichen Hinweis)

Das Branding wird **beim Anzeigen der Abrechnung** angewendet, sodass Änderungen an diesen Einstellungen sofort auf jeder Abrechnung sichtbar sind – auch auf bereits ausgestellten.

---

## 🛠️ Technische Infrastruktur

Alle Einnahmenprotokolle werden atomar in der Tabelle `mhmrentiva_vendor_transactions` gespeichert. Wird eine Buchung storniert, wird dies als Belastung auf dem Konto des Anbieters verbucht. Abrechnungen werden als unveränderlicher Snapshot im Datensatz der genehmigten Auszahlung gespeichert und bei Bedarf gerendert.

---

### Zusammenfassung des Abschnitts
- **Auszahlung** ist das System, das die Einnahmen der Anbieter verwaltet.
- **Die Guthabenverfolgung** wird nach jeder Buchung automatisch aktualisiert.
- **Anfragen** werden mit der Genehmigung durch den Admin abgeschlossen.

### Änderungsprotokoll
| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 29.06.2026 | 4.61.0 | Auszahlungsabrechnungen (nummeriert, druckbar), Aufschlüsselung der Provision und Branding der Abrechnung dokumentiert. |
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 18.03.2026 | 4.21.2 | Neues Dokument erstellt. |
