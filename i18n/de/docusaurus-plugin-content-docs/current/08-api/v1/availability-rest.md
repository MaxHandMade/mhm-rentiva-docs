---
id: availability-rest
title: "Verfügbarkeitsprüfung (Availability REST)"
sidebar_label: "Availability REST"
sidebar_position: 40
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Dieser Endpunkt prüft, ob ein bestimmtes Fahrzeug innerhalb eines ausgewählten Datums- und Zeitraums zur Miete verfügbar ist, und berechnet die aktuellen Preise.
:::

# 🚗 Endpunkt für die Verfügbarkeitsprüfung

Die Verfügbarkeitsprüfung ist der erste und wichtigste Schritt im Buchungsprozess. Sie liefert Ergebnisse in Echtzeit mithilfe der Klassen `Util::has_overlap()` und `PricingEngine`.

---

## 📍 Details zum Endpunkt
- **URL:** `/wp-json/mhm-rentiva/v1/availability`
- **Methode:** `POST`
- **Berechtigung:** Öffentlich (sofern es sich nicht um eine Admin-/Anbieter-Oberfläche handelt)

---

## 📥 Anfrageparameter (JSON-Body)

| Parameter | Typ | Erforderlich | Beschreibung |
|---|---|---|---|
| `vehicle_id` | `int` | Ja | Die ID des zu prüfenden Fahrzeugs. |
| `pickup_date` | `string` | Ja | Abholdatum (`YYYY-MM-DD`). |
| `pickup_time` | `string` | Ja | Abholzeit (`HH:MM`). |
| `return_date` | `string` | Ja | Rückgabedatum (`YYYY-MM-DD`). |
| `return_time` | `string` | Ja | Rückgabezeit (`HH:MM`). |
| `location_id` | `int` | Nein | Lieferort (kann sich auf den Preis auswirken). |

---

## 📤 Beispiel für eine erfolgreiche Antwort

```json
{
  "success": true,
  "data": {
    "available": true,
    "pricing": {
      "base_price": 1200.00,
      "service_fee": 150.00,
      "total_price": 1350.00,
      "currency": "TRY"
    },
    "duration": {
      "days": 3,
      "hours": 0
    }
  }
}
```

---

## 🛡️ Sicherheit und Validierung
1. **Datumsreihenfolge:** Das Rückgabedatum darf nicht vor dem Abholdatum liegen.
2. **Zeitprüfung:** Die Abholzeit muss den Regeln zur Mindestbuchungsdauer entsprechen.
3. **`RateLimiter`:** Mehrere Anfragen von derselben IP innerhalb einer Sekunde werden automatisch gedrosselt.
4. **Bereinigung:** Alle Eingabedaten werden über `Sanitizer::absint()` und `sanitize_text_field()` bereinigt.

---

## ❌ Fehlerzustände

| Code | Meldung | Grund |
|---|---|---|
| **400** | `INVALID_DATE_RANGE` | Abhol-/Rückgabedaten sind unlogisch. |
| **404** | `VEHICLE_NOT_FOUND` | Es wurde kein Fahrzeug mit der angegebenen ID gefunden. |
| **409** | `VEHICLE_NOT_AVAILABLE` | Das Fahrzeug ist für die angegebenen Daten bereits gebucht. |
| **429** | `TOO_MANY_REQUESTS` | Rate-Limit überschritten. |

## Zusammenfassung des Abschnitts
- Der Endpunkt `availability` liefert sowohl Verfügbarkeits- als auch Preisinformationen.
- `Util::has_overlap()` erkennt Konflikte innerhalb von Sekunden.
- Wird für reaktive Aktualisierungen in Frontend-Kalendern und Buchungsformularen verwendet.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | JSON-Anfrage-/Antwortschema und Fehlercodes detailliert beschrieben. |
