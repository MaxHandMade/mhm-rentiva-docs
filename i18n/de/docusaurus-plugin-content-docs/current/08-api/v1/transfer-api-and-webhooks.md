---
id: transfer-api-and-webhooks
title: "Transfer-Services und Webhook-Abläufe"
sidebar_label: "Transfer-API und Webhooks"
sidebar_position: 100
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Diese Seite erklärt die asynchrone Ablaufstruktur des Transfer-Moduls, den Vorgang zum Hinzufügen zum Warenkorb und die Webhook-Kommunikation mit externen Diensten.
:::

# 🛣️ Transfer-Services und Webhook-Abläufe

Im Gegensatz zum Vermietungsmodul umfasst das Transfer-Modul eine Punkt-zu-Punkt-Preisberechnung und individuelle Routenberechnungen. Diese Prozesse werden hybrid über AJAX und die REST-API abgewickelt.

---

## 🛒 1. Ablauf der Transfer-Buchung (Frontend)

Interaktionen auf Kundenseite werden für eine hohe Performance über AJAX ausgeführt:

- **Aktion:** `rentiva_transfer_add_to_cart`
- **Sicherheit:** Eine `rentiva_transfer_nonce`-Prüfung ist erforderlich.
- **Datenmodell:** Wird mit einem `booking_type=transfer`-Tag zum WooCommerce-Warenkorb hinzugefügt.
- **Ablauf:** Der ausgewählte Fahrzeugtyp, die Anzahl der Fahrgäste und die Routeninformationen werden von `TransferPricingEngine` validiert, bevor sie in den Warenkorb übernommen werden.

---

## 📡 2. Webhook- und Callback-Mechanismus

Die Kommunikation mit externen Zahlungsanbietern und Transfer-Partnern erfolgt über REST-Endpunkte.

### Auszahlungs- und Buchungs-Callback
- **Route:** `/mhm-rentiva/v1/payouts/{id}/callback`
- **Verifizierung:** `HMAC-SHA256`-basierte Signaturprüfung.
- **Ablauf:** Nachdem vom Zahlungsdienst ein „Erfolgreich“-Signal empfangen wurde, bestätigt `TransferService` die Buchung und sendet Benachrichtigungen an die beteiligten Parteien (Kunde/Anbieter).

---

## 🏥 3. System-Zustandsprüfung (Health-Endpunkt)

Ermöglicht die externe Beobachtbarkeit (Monitoring) des Systems.

- **URL:** `/wp-json/mhm-rentiva/v1/health`
- **Anwendungsfälle:** Uptime-Monitoring, Smoke-Tests und Liveness-Prüfungen nach CI/CD.
- **Zurückgegebene Daten:** Status der Datenbanktabellen, Schreibrechte für das Verzeichnis `/tmp` und Kompatibilität der PHP-Version.

---

## 🛡️ 4. Sicherheit und Rate-Limiting

- **Allgemeines Limit:** 30 Anfragen pro Minute für Transfer-Suchendpunkte.
- **Callback-Limit:** Individuelle Limits werden pro PSP-Identität angewendet, nicht pro IP.
- **Idempotenz:** Wiederholte Anfragen mit derselben Benachrichtigungs-ID werden nicht verarbeitet, stattdessen wird `200 OK` zurückgegeben.

## Zusammenfassung des Abschnitts
- Das Transfer-Modul nutzt die Ebenen AJAX (Frontend) und REST (Backend/extern) gemeinsam.
- Alle finanziellen Interaktionen unterliegen einer signaturbasierten (`HMAC`) Verifizierung.
- Der Endpunkt `Health` ermöglicht die Echtzeitüberwachung des Betriebsstatus des Systems.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Integration der TransferPricingEngine, Details zum Health-Endpunkt und HMAC-Verifizierungsablauf hinzugefügt. |
