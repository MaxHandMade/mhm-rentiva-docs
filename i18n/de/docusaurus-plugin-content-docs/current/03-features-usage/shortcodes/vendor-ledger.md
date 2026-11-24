---
title: "Anbieter-Finanzbuch"
description: "Benutzerhandbuch und technische Referenz für den Shortcode des anbieterseitigen Finanzbuchs – seitenweise Transaktionshistorie mit Filterung."
sidebar_position: 29
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite dokumentiert eine Funktion des Add-ons **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und erfordert, dass Pro zusätzlich zu Lite installiert ist, sowie eine gültige Lizenz.
Siehe [Editionen – Lite vs. Pro](/docs/) für die vollständige Aufteilung oder hol dir Pro unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Zweck
Diese Seite dokumentiert den Shortcode `[rentiva_vendor_ledger]` – das anbieterseitige Finanzbuch, das jede Transaktion (Provisionsgutschriften aus Buchungen, Erstattungen, Auszahlungen) auf dem Konto des aktuellen Anbieters auflistet. Wird im Anbieter-Panel (`/panel/`) verwendet; nicht für die öffentliche Platzierung gedacht.
:::

# 📊 Anbieter-Finanzbuch (Finanztransaktionen)

## Inhalt
- Was dieser Shortcode ist
- Authentifizierung & Rollenprüfung
- Angezeigte Transaktionsarten
- Verwendung im Frontend (URL-Filter)
- Seitennummerierung
- Leere Zustände
- Einordnung im Anbieter-Panel

## Was dieser Shortcode ist

`[rentiva_vendor_ledger]` gibt die Finanztransaktionshistorie des Anbieters aus – pro Buchung verdiente Gutschriften, stornierte Erstattungen und geleistete Auszahlungen – gestützt auf den zentralen Service `Ledger`. Jede Zeile zeigt Transaktionstyp, zugehörige Buchung (sofern zutreffend), Betrag (formatiert über die Währungseinstellungen von WooCommerce) und Zeitstempel.

Dies ist die **transparente Aufzeichnung** hinter der Verdienstzahl des Anbieters im Dashboard. Wenn ein Kunde eines der Fahrzeuge des Anbieters bucht und bezahlt, landet hier automatisch ein Gutschriftseintrag; die Gutschrift geht immer an den Anbieter, dem das Fahrzeug gehört. Wenn der Admin eine Auszahlung verarbeitet, landet hier eine entsprechende Belastung. Wenn eine Buchung erstattet wird, wird ein Gegeneintrag zulasten des Anbieters geschrieben, dessen Gutschrift er rückgängig macht, sodass das Finanzbuch nie aus dem Gleichgewicht gerät. Die Erstattung einer nie bezahlten Bestellung schreibt nichts, bis die Bestellung bezahlt ist (dann werden Gutschrift und Erstattung zusammen geschrieben), und die eigenen Fahrzeuge der Website schreiben keine Zeilen.

## Authentifizierung & Rollenprüfung

Der Shortcode führt zwei Prüfungen durch:

1. `is_user_logged_in()` – anonyme Besucher erhalten eine leere Zeichenkette.
2. Der aktuelle Benutzer muss die Rolle `rentiva_vendor` haben – Benutzer, die keine Anbieter sind, sehen den Hinweis „Zugriff verweigert. Nur Anbieter können das Finanzbuch anzeigen.“

Die Pro-Prüfung wird **von der Seite geerbt** – die typische Platzierung ist `/panel/`, die bereits die Pro-Funktion `vendor_marketplace` voraussetzt.

## Angezeigte Transaktionsarten

| Art | Quelle | Richtung |
| :--- | :--- | :--- |
| Buchungsprovision | Wird geschrieben, wenn die WooCommerce-Bestellung der Buchung bezahlt oder abgeschlossen ist, zugunsten des Eigentümers des gemieteten Fahrzeugs | Gutschrift (+) |
| Erstattung | Wird geschrieben, wenn die Bestellung erstattet wird, gegen die Gutschrift, die sie rückgängig macht | Belastung (−) |
| Auszahlung | Die Auszahlungsabwicklung durch den Admin schreibt über `Ledger::debit()` | Belastung (−) |
| Manuelle Korrektur | Manuelle Finanzbucheinträge auf Admin-Seite (selten) | Beides |

Der im Anbieter-Dashboard angezeigte laufende Saldo ist `SUM(credits) - SUM(debits)` über das Finanzbuch des Anbieters.

## Verwendung im Frontend

```shortcode
[rentiva_vendor_ledger]
```

Keine Shortcode-Attribute – der Shortcode liest Filter stattdessen aus dem URL-Query-String, wodurch jede Filterkombination teilbar, als Lesezeichen speicherbar und von einer Seitennavigation des Anbieters aus verlinkbar bleibt:

| Query-Parameter | Zweck |
| :--- | :--- |
| `paged` | Seitenzahl (serverseitig, Standard 1) |
| Weitere Filterargumente | Typ, Datumsbereich, Buchungs-ID – verarbeitet innerhalb von `Ledger::query()` |

Der Shortcode validiert jeden Query-Parameter über eigene Hilfsfunktionen `get_query_int()` / `get_query_string()`; der Docblock vermerkt „complex shortcode wrappers limiting inputs securely via GET processing.“

## Seitennummerierung

Serverseitig. Die Standard-Seitengröße beträgt **15 Einträge** pro Seite; `?paged=N` blättert weiter. Die Seitennavigation unten am ausgegebenen Raster übernimmt alle aktiven URL-Filter, sodass beim Wechsel auf Seite 2 der Datumsbereich oder Typfilter erhalten bleibt, den der Benutzer auf Seite 1 angewendet hatte.

## Leere Zustände

| Zustand | Ausgabe |
| :--- | :--- |
| Anbieter noch ohne Transaktionen | Platzhalter „Noch keine Transaktionen“ (z. B. bei einem ganz neuen Anbieter) |
| Filter schließt alle Zeilen aus | „Keine Transaktionen entsprechen diesen Filtern“ mit einem Link „Filter zurücksetzen“ |
| Benutzer ist kein Anbieter | Hinweis „Zugriff verweigert. Nur Anbieter können das Finanzbuch anzeigen.“ |
| Abgemeldeter Benutzer | Leere Zeichenkette (stillschweigend) |

## Einordnung im Anbieter-Panel

Das Anbieter-Panel unter `/panel/` hat drei Bereiche; dieser Shortcode verantwortet den finanziellen Teil:

| Panel-Bereich | Shortcode |
| :--- | :--- |
| Inserate | `[rentiva_vehicle_submit]` (hinzufügen/bearbeiten) + native Fahrzeugliste des Anbieters |
| Buchungsanfragen | `[rentiva_vendor_bookings]` ([Referenz](./vendor-bookings)) |
| Finanzbuch & Auszahlungen | `[rentiva_vendor_ledger]` ← **diese Seite** |

Das kundenseitige Gegenstück für die Transaktionshistorie ist `[rentiva_payment_history]` ([Referenz](./payment-history)), das die Zahlungen des Kunden statt der Einnahmen des Anbieters anzeigt.

## Zugehörige Architektur

- **`Ledger`-Service** (`MHMRentiva\Core\Financial\Ledger`) – die einzige verlässliche Quelle für Anbietertransaktionen. Alle Schreibvorgänge im Finanzbuch laufen über diese Klasse, damit der laufende Saldo nie abweicht.
- **`CommissionBridge`** – lauscht auf Zahlungs-, Abschluss- und Erstattungsereignisse von WooCommerce und schreibt die Gutschrift sowie die gegenläufigen Erstattungseinträge, sodass der Prüfpfad in beide Richtungen nachvollziehbar bleibt.

## Siehe auch

- [Shortcode für Anbieter-Buchungen](./vendor-bookings) – anbieterseitiger Buchungseingang
- [Shortcode für den Zahlungsverlauf des Kunden](./payment-history) – das kundenseitige Gegenstück
- [Onboarding von Anbietern](/docs/vendor/onboarding) – Betriebsleitfaden
- [Dokumentation zum Auszahlungs-Finanzbuch](/docs/vendor/payouts-ledger) – Auszahlungsablauf auf Admin-Seite + Buchhaltungsmodell


## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 18.11.2026 | Pro 6.5.0 | Gutschrift geht an den Eigentümer des gemieteten Fahrzeugs; Erstattungen folgen der ursprünglichen Gutschrift; Quellen korrigiert. |