---
id: financial-operations-runbook
title: "Runbook für Finanzvorgänge (L1/L2)"
sidebar_label: "Betriebs-Runbook"
sidebar_position: 1
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Dieser Leitfaden legt die täglichen Routinen und kritischen Eingriffsschritte für das Rentiva-Team für Finanzvorgänge und die Systemadministratoren fest.
:::

# 📖 Runbook für Finanzvorgänge

Finanzvorgänge bestehen aus aufeinanderfolgenden Schritten, die den Cashflow und die Datenintegrität des Systems sicherstellen sollen.

---

## 🕒 Täglicher Abgleich

Die folgenden Prüfungen müssen zu Beginn jedes Geschäftstages durchgeführt werden:
1. **Ausstehende Auszahlungen:** Prüfe das Alter ausstehender Anfragen über das `Payout List Table`. Markiere alle Anfragen, die älter als 48 Stunden sind, zur Überprüfung.
2. **Ledger-Saldo:** Überprüfe, ob der Gesamtsaldo aus Soll und Haben in den Ledger-Tabellen mit dem vom System gemeldeten `Net Balance` übereinstimmt.
3. **Fehlgeschlagene Webhooks:** Durchsuche die Tabelle `WebhookLog`, um fehlgeschlagene Zahlungsbenachrichtigungen zu ermitteln.

---

## ⚖️ Governance-Vorgänge

Eingriffsverfahren über `GovernanceService` für kritische Situationen:

### ❄️ Anbieter sperren (Freeze)
Wenn verdächtige Aktivitäten erkannt werden:
- Gib die Anbieter-ID im Bereich `Governance` ein.
- Aktiviere das Kennzeichen **Freeze**.
- Diese Aktion setzt alle ausstehenden Auszahlungen des Anbieters aus und verhindert, dass er neue Anfragen erstellt.

### 🔓 Freigabezyklus für Auszahlungen (Vier-Augen-Prinzip)
- **Maker:** Der Mitarbeiter für Finanzvorgänge prüft die Anfrage und listet sie auf.
- **Checker:** Der Finanzmanager führt die Aktion `Bulk Approve` aus, nachdem er bestätigt hat, dass der Mitarbeiter für Finanzvorgänge keine Auszahlung auf sein eigenes Konto freigegeben hat.

---

## 📝 Überprüfung des Audit-Logs

Bei finanziellen Streitfällen:
1. Suche die Transaktions-ID in der Tabelle `mhmrentiva_ledger`.
2. Überprüfe, ob sie mit dem von `GovernanceService::log_decision()` erstellten Audit-Eintrag übereinstimmt.
3. Bestätige die forensische Integrität, indem du die Konsistenz von Zeitstempel und IP-Adresse prüfst.

---

## 🔄 Verwaltung von Stornobuchungen

Bei fehlerhaften oder doppelten Zahlungen:
- Verwende die Methode `Ledger::record_reversal()`, um einen neuen „Reversal“-Eintrag (Stornobuchung) hinzuzufügen.
- Lösche oder aktualisiere **niemals** einen bestehenden Ledger-Eintrag.

## Zusammenfassung des Abschnitts
- Die Berechtigung „Löschen“ existiert in den operativen Schritten auf keiner Ebene.
- Jeder Eingriff muss einen Audit-Eintrag hinterlassen.
- Der tägliche Abgleich ist für die finanzielle Gesundheit des Systems verpflichtend.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Seite um operative Schritte für Abgleich und Governance aktualisiert. |
