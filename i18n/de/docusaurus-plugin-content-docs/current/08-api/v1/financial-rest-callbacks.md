---
id: financial-rest-callbacks
title: "Zahlungs-Callback-API (Auszahlungs-Callback)"
sidebar_label: "Auszahlungs-Callback-API"
sidebar_position: 50
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Dieser Endpunkt dient dazu, Auszahlungsergebnisse von externen Zahlungsdienstleistern (Banken, Zahlungsinstituten) sicher zu empfangen und die Ledger-Einträge entsprechend zu aktualisieren.
:::

# 🧾 Zahlungs-Callback-API

Die Auszahlungs-Callback-API ist der letzte Schritt im Finanzzyklus. Sie aktualisiert den finanziellen Zustand des Systems anhand der „Erfolgreich“- oder „Fehlgeschlagen“-Signale, die von außen eingehen.

---

## 📍 Details zum Endpunkt
- **URL:** `/wp-json/mhm-rentiva/v1/payouts/{id}/callback`
- **Methode:** `POST`
- **Verifizierung:** HMAC SHA-256 (erforderlich)

---

## 🛡️ 1. Sicherheit und Verifizierung (HMAC)

Um gefälschte Benachrichtigungen zu verhindern, muss jede Anfrage die folgenden Header enthalten:
- **`X-MHM-Timestamp`:** UTC-Zeitstempel des Zeitpunkts, zu dem die Anfrage gestellt wurde. Weicht er um mehr als 300 Sekunden von der Serverzeit ab, wird die Anfrage abgelehnt.
- **`X-MHM-Signature`:** Der `HMAC SHA-256`-Hashwert, der aus der Nutzlast der Anfrage und dem Secret Key erzeugt wird.

---

## 📥 Anfrage-Body (Payload)

```json
{
  "status": "confirmed",
  "external_reference": "TRX_998877",
  "reason": "" 
}
```

- **`status`:** `confirmed` (Erfolg) oder `failed` (Fehlschlag).
- **`external_reference`:** Die Transaktionsreferenznummer des Zahlungsinstituts.
- **`reason`:** Der Ablehnungsgrund im Fehlerfall.

---

## ⚙️ 2. Geschäftsregeln und Ledger-Aktualisierung

Das System führt abhängig vom eingehenden Status atomare Operationen im Ledger aus:

| Status | Operation | Beschreibung |
|---|---|---|
| **confirmed** | Statusaktualisierung | Der Auszahlungsdatensatz wird als `completed` markiert. Im Ledger wird keine neue Zeile hinzugefügt (das Guthaben wurde bereits abgezogen). |
| **failed** | `payout_reversal` | Da die Zahlung fehlgeschlagen ist, wird das zuvor abgezogene Guthaben dem Anbieter erstattet. Im Ledger wird eine Gegenbuchung hinzugefügt. |
| **Doppelte Anfrage** | Idempotenz | Befindet sich die betreffende `payout_id` bereits in einem Endstatus, wird keine Aktion ausgeführt und `200 OK` zurückgegeben. |

---

## 🚦 3. Fehlerbehandlung
- **401 Unauthorized:** Die Signaturprüfung ist fehlgeschlagen.
- **404 Not Found:** Ungültige Auszahlungs-ID.
- **429 Too Many Requests:** Ratenlimit (20 Anfragen/Minute) überschritten.

## Zusammenfassung des Abschnitts
- Die Callback-API verwendet HMAC-Verifizierung, um die Integrität der Finanzdaten sicherzustellen.
- Beim Status `failed` greift ein automatischer Mechanismus zur Guthabenerstattung (`reversal`).
- Alle Operationen werden über `AdvancedLogger` als Audit-Trail protokolliert.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Details zur HMAC-Verifizierung und Logik für Gegenbuchungen hinzugefügt. |
