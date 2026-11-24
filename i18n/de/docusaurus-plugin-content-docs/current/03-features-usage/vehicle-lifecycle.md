---
id: vehicle-lifecycle
title: "Verwaltung des Fahrzeug-Lebenszyklus"
sidebar_label: "Lebenszyklus"
sidebar_position: 4
slug: /features-usage/vehicle-lifecycle
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite dokumentiert eine Funktion des Add-ons **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und erfordert, dass Pro zusätzlich zu Lite installiert ist und eine gültige Lizenz vorliegt.
Siehe [Editionen – Lite vs. Pro](/docs/) für die vollständige Aufteilung oder hol dir Pro unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

Die Verwaltung des Fahrzeug-Lebenszyklus steuert die gesamte Lebensdauer jedes Fahrzeugs auf der Plattform – von der Aktivierung bis zum Ablauf, vom Zurückziehen bis zum erneuten Einstellen – über einen regelbasierten Zustandsautomaten. **Erfordert eine Pro-Lizenz.**

---

## Zustandsautomat

Jedes Fahrzeug befindet sich in einem der folgenden 5 Zustände:

| Zustand | Beschreibung |
|-------|-------------|
| `pending_review` | Fahrzeug wartet auf Prüfung, noch nicht live |
| `active` | Fahrzeug ist aktiv; Kunden können es ansehen und mieten |
| `paused` | Anbieter hat es vorübergehend pausiert; Fahrzeug ist ausgeblendet |
| `expired` | 90-tägiger Listungszeitraum ist abgelaufen; Fahrzeug ist nicht mehr gelistet |
| `withdrawn` | Anbieter hat es zurückgezogen; Fahrzeug hat die Plattform verlassen |

### Erlaubte Übergänge

```
pending_review → active         (admin approval)
active         → paused         (vendor pause)
active         → withdrawn      (vendor withdraw)
paused         → active         (vendor resume)
paused         → withdrawn      (vendor withdraw)
expired        → active         (vendor renew)
withdrawn      → active         (vendor re-list)
```

Nicht definierte Übergänge werden von `VehicleLifecycleManager` abgelehnt.

---

## 90-tägiger Listungszeitraum

- Wenn ein Fahrzeug in den Zustand `active` wechselt, beginnt ein **90-Tage-Countdown**.
- Ein täglicher Cronjob ermittelt Fahrzeuge, deren Zeit abgelaufen ist, und versetzt sie in den Zustand `expired`.
- Warn-E-Mails werden automatisch an den Anbieter gesendet:
  - **10 Tage** vor Ablauf
  - **3 Tage** vor Ablauf

> Ein Anbieter kann für ein abgelaufenes Fahrzeug mit der Aktion **„Erneuern“** einen neuen 90-tägigen Zeitraum starten.

---

## Self-Service-Aktionen für Anbieter

Anbieter können ihre Fahrzeuge ohne Eingreifen eines Administrators verwalten:

### Pausieren
Das aktive Fahrzeug wird vorübergehend aus der Listung genommen. Ausstehende Buchungen sind davon nicht betroffen – das Fahrzeug kann lediglich keine neuen Buchungen erhalten.

### Fortsetzen
Das pausierte Fahrzeug wird reaktiviert. Die verbleibende Listungszeit läuft weiter (während das Fahrzeug pausiert ist, läuft die Zeit nicht ab).

### Zurückziehen
Das Fahrzeug wird dauerhaft von der Plattform entfernt. **Es kann eine Strafe anfallen** (siehe unten).

### Erneuern
Ein abgelaufenes Fahrzeug wird reaktiviert und ein neuer 90-tägiger Zeitraum beginnt.

### Erneut einstellen
Ein zurückgezogenes Fahrzeug wird wieder auf der Plattform eingestellt. Der bisherige Strafzähler bleibt erhalten.

---

## Strafsystem für das Zurückziehen

Um willkürliches Zurückziehen von Fahrzeugen durch Anbieter zu verhindern, wird eine gestaffelte Strafe angewendet:

| Anzahl der Rückzüge | Strafsatz |
|------------------|--------------|
| 1. Rückzug | Kostenlos |
| 2. Rückzug | **10 %** des durchschnittlichen Monatsumsatzes |
| 3. und weitere | **25 %** des durchschnittlichen Monatsumsatzes |

**Gleitendes 12-Monats-Fenster:** Der Strafzähler zählt Rückzüge innerhalb der letzten 12 Monate. Rückzüge, die älter als 12 Monate sind, werden nicht mitgezählt.

Abzüge werden automatisch im Ledger erfasst und bei der nächsten Berechnung der Auszahlung abgezogen.

### Erfassung des Rückzugsgrunds & Einspruch (v4.35.0)

Seit [v4.35.0](/blog/rentiva-v4.35.0-release) können Anbieter beim Zurückziehen eines Fahrzeugs einen Grund angeben. Der bisherige Browser-Dialog `confirm()` wurde durch das gemeinsam genutzte **Anbieter-Meldungs-Modal** ersetzt, das zur Eingabe eines Grunds auffordert (mindestens 20 Zeichen). Wenn ein Grund angegeben wird:

1. Eine `vehicle_action`-Meldung wird mit `status=open` eingereicht, bevor der AJAX-Aufruf für das Zurückziehen ausgeführt wird.
2. Innerhalb von `VehicleLifecycleManager::withdraw()` prüft der neue Filter `mhmrentiva_before_apply_penalty`, ob eine offene Meldung vorliegt. Der Callback `PenaltySuspensionHook` gibt `false` zurück und **setzt damit sowohl den Punktabzug als auch die Belastung im Ledger aus**.
3. Das Fahrzeug wechselt trotzdem in den Zustand `withdrawn` (Beitragsstatus, Lebenszyklus-Metadaten und Sperrfrist-Datum werden alle gesetzt), die finanzielle Strafe wird jedoch bis zur Prüfung durch den Administrator ausgesetzt.

Der Administrator prüft den Einspruch unter **MHM Rentiva → Bayi Raporları**:

- **Erledigt** (Grund des Anbieters akzeptiert) → keine Aktion. Punktzahl und Ledger wurden nie verändert. Der Anbieter hat null Punkte und null TL verloren.
- **Abgelehnt** (Administrator hält die Strafe aufrecht) → `apply_deferred_penalty()` wird ausgeführt: `ReliabilityScoreCalculator::update()` berechnet neu (der Rückzug ist im Zustand erfasst, daher sinkt die Punktzahl), und `PenaltyRecorder::record_penalty()` schreibt die zurückgestellte Belastung in das Ledger. Die Strafe gilt rückwirkend.

Einreichungen ohne den POST-Parameter `reason` bleiben abwärtskompatibel – sie wenden die Strafe wie bisher sofort an. Die vollständige Dokumentation des Systems findest du auf der Seite [Anbieter-Meldungen](./vendor-reports).

---

## Schutz vor Manipulation: Schutz gesperrter Daten

Um Preismanipulation zu verhindern:

- Ein Anbieter kann ein Fahrzeug mit einer aktiven Buchung nicht stornieren und es für dieselben Daten zu einem höheren Preis erneut einstellen.
- Daten von Buchungen, die vom Anbieter storniert wurden, bleiben **30 Tage** lang für neue Buchungen gesperrt.
- `AntiGamingBlocker` speichert diese Sperren über den Meta-Schlüssel `_mhmrentiva_anti_gaming_blocks`.

---

## Zuverlässigkeitswert des Anbieters

Für jeden Anbieter wird ein Zuverlässigkeitswert zwischen 0 und 100 berechnet:

- Wird täglich von `ReliabilityScoreCalculator` neu berechnet.
- **In die Formel einbezogene Faktoren:**
  - Quote abgeschlossener Buchungen (positiv)
  - Stornoquote (negativ)
  - Häufigkeit von Rückzügen (negativ)
  - Pausendauer (leicht negativ)

| Wert | Bedeutung |
|-------|----------------|
| 80–100 | Zuverlässiger Anbieter |
| 60–79 | Durchschnittlich |
| 40–59 | Erfordert Aufmerksamkeit |
| 0–39 | Hohes Risiko |

Der Administrator sieht den aktuellen Wert jedes Anbieters in der Benutzerliste.

---

## E-Mail-Benachrichtigungen zum Lebenszyklus

Für alle Zustandsübergänge gibt es automatische E-Mail-Vorlagen:

| Ereignis | Empfänger |
|-------|-----------|
| Fahrzeug aktiviert | Anbieter |
| Fahrzeug pausiert | Anbieter |
| Pause beendet | Anbieter |
| Fahrzeug zurückgezogen | Anbieter + Administrator |
| 10-Tage-Warnung | Anbieter |
| 3-Tage-Warnung | Anbieter |
| Listungszeitraum abgelaufen | Anbieter + Administrator |
| Fahrzeug erneuert | Anbieter |
| Fahrzeug erneut eingestellt | Anbieter |

---

## Admin-Oberfläche

### Spalte in der Fahrzeugliste
Der Lebenszyklus-Status jedes Fahrzeugs wird mit einem farbcodierten Badge angezeigt:
- Grün Aktiv
- Gelb Pausiert
- Rot Abgelaufen
- Schwarz Zurückgezogen

### Meta-Box in der Fahrzeugbearbeitung
Die Meta-Box **„Lebenszyklus“** auf der Bearbeitungsseite des Fahrzeugs zeigt:
- Anzeige des aktuellen Status
- Schaltfläche für Statusübergänge (erlaubte Übergänge)
- Ablaufdatum des Listungszeitraums
- Strafzähler für Rückzüge

### Benutzerliste
Bei Anbieter-Zeilen wurde eine Spalte für den Zuverlässigkeitswert hinzugefügt.

---

## Aktiv-Filter im Frontend

6 Frontend-Shortcodes filtern jetzt automatisch Fahrzeuge heraus, die sich in Wartung oder in einem passiven Zustand befinden:

- `[rentiva_vehicles_grid]`
- `[rentiva_vehicles_list]`
- `[rentiva_featured_vehicles]`
- `[rentiva_vehicle_details]`
- `[rentiva_search_results]`
- `[rentiva_transfer_results]`

Fahrzeuge im Zustand `expired` oder `withdrawn` werden über `MetaQueryHelper` automatisch aus Abfragen ausgeschlossen.

---

> **Notiz:** Die Verwaltung des Fahrzeug-Lebenszyklus erfordert eine **Pro**-Lizenz. In der Lite-Edition werden Fahrzeuge nur über den WordPress-Beitragsstatus (`publish`/`draft`) verwaltet; Zustandsautomat, Strafsystem und Zuverlässigkeitswert sind nicht verfügbar.
