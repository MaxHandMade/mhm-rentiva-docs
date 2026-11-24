---
id: payout-webhook-auth
title: "Authentifizierung von Zahlungs-Webhooks"
sidebar_label: "Auszahlungs-Webhook-Auth"
sidebar_position: 80
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
`PayoutWebhookAuth` ist eine spezialisierte Sicherheitsschicht, mit der die Echtheit von Benachrichtigungen (Webhooks) überprüft wird, die von externen Zahlungsdiensten eingehen.
:::

# 🔒 Authentifizierung von Zahlungs-Webhooks

MHM Rentiva unterzieht jede von außen eingehende Zahlungsbenachrichtigung einem strengen Prüfverfahren, um die Integrität der Finanzdaten zu wahren.

---

## 🛡️ 1. Authentifizierungsmodell

Diese Komponente arbeitet als Erweiterung der Klasse `AuthHelper` und verwendet ausschließlich die eigens für Zahlungsdienstleister (PSPs) definierten Schlüssel.

- **Quellenprüfung:** Stellt sicher, dass Anfragen nur von bekannten IP-Adressen oder mit einer gültigen Anwendungsidentität stammen.
- **Geheimer Schlüssel:** Für jede PSP-Integration wird ein eindeutiger `Webhook Secret` definiert.

---

## ✍️ 2. Signaturprüfung

Die am häufigsten verwendete Sicherheitsmethode ist `HMAC-SHA256`. Der Vorgang besteht aus den folgenden Schritten:

1. **Auslesen des Headers:** Der Wert `X-Rentiva-Signature` wird aus dem Header der Anfrage abgerufen.
2. **Hash-Erzeugung:** Serverseitig wird aus dem eingehenden Roh-Body der Anfrage und dem `Webhook Secret` des Systems ein neuer Hash berechnet.
3. **Vergleich:** Der berechnete Hash wird mit `hash_equals()` (sicher gegen Timing-Angriffe) mit der Signatur im Header verglichen.

---

## ⏳ 3. Replay- und Ratenschutz

### Zeitstempelprüfung
Der Zeitstempel in der Anfrage wird mit der Serverzeit verglichen. Überschreitet die Abweichung 5 Minuten (300 s), wird die Anfrage als „Replay-Angriff“ behandelt und abgelehnt.

### Webhook-Ratenbegrenzung
- Gehen pro Sekunde mehrere Benachrichtigungen für dieselbe Transaktions-ID ein, verarbeitet das System nur die erste.
- Die Klasse `WebhookRateLimiter` verwaltet doppelte Aufrufe (Wiederholungsversuche), die vom Zahlungsanbieter ausgehen.

---

## ⚙️ 4. Strategie für idempotente Verarbeitung

Wenn der Zahlungsdienstleister dieselbe Erfolgsbenachrichtigung (`confirmed`) erneut sendet:
- Prüft das System den Status dieses Vorgangs in der Datenbank.
- Ist der Vorgang bereits „Abgeschlossen“, wird kein Ledger-Vorgang ausgeführt, aber `200 OK` an den Dienstleister zurückgegeben, um zu signalisieren, dass der Prozess beendet ist.

## Zusammenfassung des Abschnitts
- `PayoutWebhookAuth` ist die wichtigste Sicherheitsschicht zur Verhinderung finanzieller Manipulationen.
- Die Verwendung von `hash_equals` schützt vor Timing-Angriffen.
- Der Replay-Schutz verhindert, dass alte oder abgefangene Anfragen erneut ausgeführt werden.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Details zu HMAC-SHA256, hash_equals und zum Schutz vor Replay-Angriffen hinzugefügt. |
