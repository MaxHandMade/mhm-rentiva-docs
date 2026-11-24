---
id: financial-troubleshooting
title: "Fehlerbehebung im Finanzbereich & Fehlermatrix"
sidebar_label: "Fehlerbehebung Finanzen"
sidebar_position: 2
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Diese Seite ist ein Leitfaden, um technische Fehler in den Finanzmodulen zu diagnostizieren und schnell zu beheben.
:::

# 🔍 Fehlerbehebung im Finanzbereich

Finanzielle Fehler entstehen typischerweise durch Netzwerkunterbrechungen, fehlende Berechtigungen oder Dateninkonsistenzen.

---

## 🛠️ Matrix für Fehlercodes & Lösungen

| Fehlercode | Bedeutung | Erste Maßnahme |
|---|---|---|
| `401 Unauthorized` | HMAC-/Signaturfehler | Prüfe, ob der API-Secret-Schlüssel übereinstimmt, und die Serverzeit (NTP). |
| `403 Forbidden` | Governance-Sperre | Prüfe über `GovernanceService`, ob sich der Anbieter im Status `Freeze` befindet. |
| `409 Invalid State` | Statuskonflikt | Stelle sicher, dass der Webhook-Callback nur für Auszahlungen im Status `Processing` oder `Approved` eingeht. |
| `429 Too Many Requests` | Ratenlimit überschritten | Lösche die `WebhookRateLimiter`-Einträge oder lockere die Limits. |
| `Atomic Failure` | DB-Rollback | Die Verbindung wurde während der Transaktion möglicherweise unterbrochen. Stelle sicher, dass es in `Ledger` keine doppelten Einträge gibt. |

---

## 🚩 Häufige Szenarien und Diagnose

### 1. Erwarteter Saldo ist falsch (Saldoabweichung)
Wenn das Dashboard des Anbieters nicht mit den Ledger-Tabellen übereinstimmt:
- **Diagnose:** Durchsuche die Tabelle `mhmrentiva_ledger` mit einem `source_type`-Filter.
- **Lösung:** Löse `Ledger::calculate_net_balance()` asynchron aus, um eine Neuberechnung in der Datenbank zu erzwingen.

### 2. Auszahlung bleibt „Freigegeben“ (kein Callback)
Wenn eine freigegebene Zahlung nicht in den Status „Bestätigt“ wechselt:
- **Diagnose:** Prüfe die `WebhookLog`-Einträge, um den Benachrichtigungsfehler der Bank zu finden.
- **Lösung:** Löse den Webhook manuell erneut aus (per cURL mit Signatursimulation).

### 3. Doppelter Eintrag
Wenn zwei Ledger-Einträge mit derselben Transaktions-ID erstellt wurden:
- **Diagnose:** Führe das Skript `ForensicHardeningTest` für diesen Benutzer aus.
- **Lösung:** Neutralisiere den zweiten Eintrag mit `record_reversal()`. **Niemals manuell löschen.**

---

## 📄 Vorgehen beim Durchsuchen der Logs

Überwache die folgenden Log-Kanäle, um die Ursache eines Problems zu finden:
- **WP Debug Log:** Für PHP-Fehler und `Util`-Warnungen.
- **Stitch-/API-Logs:** Zur Validierung des Inhalts der Webhook-Payload.
- **Audit-Logs:** Für von `GovernanceService` protokollierte verweigerte Berechtigungen.

## Zusammenfassung des Abschnitts
- Die meisten Fehler entstehen durch Probleme mit **HMAC** oder **NTP** (Zeitsynchronisation).
- Bei Ledger-Inkonsistenzen sind immer die Datenbankzeilen (WPDB) maßgeblich.
- Logs sind forensische Beweise für das Problem und dürfen nicht gelöscht werden.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Fehlermatrix und Probleme mit asynchronem Saldo hinzugefügt. |
