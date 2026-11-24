---
id: analytics
title: "Anbieter-Analysen"
sidebar_label: "Analysen"
sidebar_position: 20
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Aktualisiert](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite dokumentiert eine Funktion des Add-ons **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und erfordert, dass Pro zusätzlich zu Lite installiert ist, sowie eine gültige Lizenz.
Die vollständige Aufteilung findest du unter [Editionen – Lite vs. Pro](/docs/), Pro erhältst du unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Zweck
MHM Rentiva stellt Anbietern Business Intelligence in Echtzeit bereit. Dieses Dokument erklärt die Berechnung der KPI-Karten, die Trendanalyse und die Strategien zur Datenaggregation auf Datenbankebene.
:::

# 📊 Analyse- und Berichtssystem

Die **einzige verlässliche Datenquelle** (Single Source of Truth) für Finanzanalysen ist die Ledger-Tabelle. Betriebliche Kennzahlen werden dynamisch anhand der Buchungsstatus berechnet.

---

## 🏗️ 1. Strategie zur Datenaggregation (`AnalyticsService`)

`AnalyticsService` arbeitet mit der Ledger-Tabelle und verwendet die Filter `status = 'cleared'` und `vendor_id`.

### Finanzkennzahlen
- **Nettoumsatz:** Die Summe der Einträge `commission_credit` (positiv) und `commission_refund` (negativ) innerhalb eines bestimmten Zeitraums.
- **Durchschnittlicher Buchungswert (ABV):** Gesamter Nettoumsatz geteilt durch die Anzahl unterschiedlicher `booking_id`-Werte.

### Betriebskennzahlen
- **Auslastungsquote:** `(Rented Days / Total Available Days) * 100`.
- **Stornierungsquote:** `(Cancelled Bookings / Total Requests) * 100`.

---

## 📉 2. Wachstums- und Trendanalyse

Das System berechnet Wachstumsraten, indem es den ausgewählten Zeitraum mit dem vorherigen gleich langen Zeitraum vergleicht.

### Berechnungsmodell
`Growth = ((Current Period - Previous Period) / Previous Period) * 100`

**Technische Details:**
- **Zeitfenster-Spiegelung:** Wenn die letzten 7 Tage ausgewählt sind, werden die vorherigen 7 Tage (ohne Überschneidung) als Vergleichsbasis verwendet.
- **Schutz vor Division durch null:** Wenn der Umsatz des vorherigen Zeitraums 0 beträgt, gibt die Wachstumsrate `NULL` statt `0%` zurück. In der Oberfläche wird dies als „—“ angezeigt.

---

## 📈 3. Datenstruktur der Sparklines

Die Methode `get_sparkline_data()` wird für die Trenddiagramme im Dashboard verwendet.

- **Auffüllen von Lücken:** Tage ohne Aktivität, die von der Datenbank leer zurückgegeben werden, werden auf PHP-Seite automatisch mit `0.0` aufgefüllt.
- **UTC-Normalisierung:** Alle Datumsgruppierungen verwenden die MySQL-Funktion `DATE()` auf Basis von UTC, um Zeitzonenverschiebungen zu vermeiden.

---

## ⚡ 4. Performance und Caching (`MetricCacheManager`)

Analysedaten erfordern aufwendige SQL-Abfragen, daher wird ein mehrstufiger Caching-Mechanismus verwendet.

| Ebene | Dauer | Invalidierung |
|---|---|---|
| **Transients** | 15 Minuten | Neue Buchung, Zahlungsbestätigung oder Statusänderung. |
| **Object Cache** | Pro Sitzung | Keine erneute Abfrage beim Wechseln der Dashboard-Tabs. |
| **Umgehung** | — | Der Cache ist bei Suchen mit benutzerdefiniertem Zeitraum deaktiviert. |

---

## ⚙️ 5. Technische API-Referenz

### Umsatzberechnung
```php
// AnalyticsService::get_revenue_period($vendor_id, $from_ts, $to_ts)
// PostgreSQL/MySQL compatible UTC normalization.
```

### Leistung pro Fahrzeug
```php
// AnalyticsService::get_vehicle_performance($vehicle_id, $from_ts, $to_ts)
// Returns occupancy and revenue report for a specific vehicle.
```

## Zusammenfassung des Abschnitts
- Als Grundlage für Finanzberichte werden ausschließlich `cleared`-Ledger-Einträge verwendet.
- Wachstumsraten werden mit einem linearen Zeitverschiebungsalgorithmus berechnet.
- `MetricCacheManager` minimiert die Datenbanklast.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Ledger-basierte Analysen und Wachstumsformeln dokumentiert. |
