---
id: payouts-ledger
title: "Auszahlungen & Hauptbuch"
sidebar_label: "Auszahlungen & Hauptbuch"
sidebar_position: 10
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite dokumentiert eine Funktion des Add-ons **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und erfordert, dass Pro zusätzlich zu Lite installiert ist, sowie eine gültige Lizenz.
Siehe [Editionen – Lite vs. Pro](/docs/) für die vollständige Aufteilung oder hol dir Pro unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Zweck
MHM Rentiva verwendet eine Finanz-Engine namens „Model B“ – unveränderlich und jederzeit prüfbar. Dieses Dokument erklärt, wie die Einnahmen der Anbieter berechnet und wie Auszahlungsprozesse atomar verwaltet werden.
:::

# 💳 Finanz-Engine & Auszahlungszyklus

Das System berechnet die Guthaben der Anbieter mithilfe eines Append-only-Hauptbuchs statt eines dynamischen Guthabenfelds.

---

## 🏗️ 1. Hauptbuchstruktur von Model B

Das Hauptbuch ist die einzige maßgebliche Quelle für alle Finanzdaten im System.

### Unveränderlichkeitsprinzip
- **Aktualisieren/Löschen verboten:** Keine Zeile des Hauptbuchs kann aktualisiert oder gelöscht werden.
- **Korrekturbuchungen:** Eine fehlerhafte Transaktion kann nur durch eine Stornobuchung korrigiert werden.
- **SaaS-Isolation:** Jeder Eintrag ist mit einer `tenant_id` verknüpft.

### Buchungsarten
| Art | Richtung | Beschreibung |
|---|---|---|
| `commission_credit` | `+` | Einnahmen aus einer abgeschlossenen Buchung. |
| `payout_debit` | `−` | Guthabenminderung durch eine genehmigte Auszahlungsanfrage. |
| `refund` | `−` | Erstattung aus einer stornierten Buchung. |

### Wer die Gutschrift erhält und wie Erstattungen funktionieren

- **Der Eigentümer des Fahrzeugs erhält die Gutschrift.** Die Provisionsgutschrift wird dem Anbieter gutgeschrieben, dem das gemietete Fahrzeug gehört – unabhängig davon, wer die Buchung angelegt hat (ein Kunde an der Kasse oder ein Administrator, der sie manuell eingibt). Die Werte **Ausstehend (in Abrechnung)** und **Buchungen, letzte 30 Tage** im Anbieter-Panel zählen die Buchungen der Fahrzeuge dieses Anbieters.
- **Deine eigene Flotte erzeugt keine Zeile.** Ein Fahrzeug, das der Website und nicht einem Anbieter gehört, erzeugt keine Zeile im Hauptbuch.
- **Eine Erstattung kehrt die zugehörige Gutschrift um.** Eine Erstattung wird von dem Anbieter abgezogen, dessen Gutschrift sie umkehrt, und zwar zum Provisionssatz dieser Gutschrift – auch wenn das Fahrzeug später den Eigentümer gewechselt hat.
- **Keine Gutschrift, keine Belastung.** Eine Erstattung für eine Bestellung, die nie bezahlt wurde (zum Beispiel eine Banküberweisung, die erstattet wurde, während sie noch in Bearbeitung war), schreibt nichts, und der Anbieter wird nicht belastet. Wird die Bestellung später bezahlt, werden Gutschrift und Erstattung gemeinsam zum Provisionssatz der Gutschrift geschrieben; eine Bestellung per Banküberweisung, die vor der Bezahlung vollständig erstattet wird, hinterlässt nichts auf dem Konto des Anbieters.
- **Das Badge im Anbieterprofil** wird aktualisiert, wenn eine Miete abgeschlossen wird.

:::info Geändert in Pro 6.5.0
Vor 6.5.0 konnte die Provision dem Kunden gutgeschrieben werden, der die Buchung vorgenommen hatte, und eine Erstattung für ein eigenes Fahrzeug der Website konnte den Kunden belasten. Zeilen, die vor dem Update geschrieben wurden, werden nicht korrigiert.
:::

---

## ⚛️ 2. Atomarer Auszahlungsprozess (`AtomicPayoutService`)

Auszahlungsgenehmigungen erfolgen innerhalb einer **Transaktion** auf Datenbankebene. So wird sichergestellt, dass der gesamte Prozess zurückgerollt wird, wenn ein Schritt fehlschlägt.

### Prozessschritte:
1. **Vorabprüfung:** Überprüfung von Guthaben und Status (außerhalb der Transaktion).
2. **START TRANSACTION:** DB-Sperre wird gesetzt.
3. **Schutz vor Nebenläufigkeit:** `post_status` wird erneut aus der DB gelesen (Vermeidung von Race Conditions).
4. **Schreiben ins Hauptbuch:** Ein `payout_pending_debit`-Eintrag wird erstellt.
5. **CPT-Aktualisierung:** Der Auszahlungs-Post wird auf den Status `publish` gesetzt.
6. **COMMIT:** Bei Erfolg werden alle Vorgänge dauerhaft gespeichert.

---

## 🛡️ 3. Schutzebenen gegen Doppelausgaben

Es gibt vier Schutzebenen gegen das Risiko von Doppelausgaben:

| Ebene | Mechanismus | Stufe |
|---|---|---|
| **L1: Anwendung** | Prüfung von `vendor_has_pending_payout()`. | PHP / AJAX |
| **L2: Guthaben** | Validierung von `Ledger::get_balance() >= amount`. | Domänenlogik |
| **L3: Transaktion** | InnoDB-Zeilensperre und Schutz des Status vor Nebenläufigkeit. | Datenbank |
| **L4: Idempotenz** | Eindeutige UUID im Format `payout_{id}`. | Eindeutiger DB-Schlüssel |

---

## ⚙️ 4. Technische API-Referenz

### Guthabenabfrage
```php
// Returns the sum of entries with 'cleared' and 'reserved' statuses only.
$balance = Ledger::get_balance($vendor_id);
```

### Erstellen einer Auszahlungsanfrage
```php
// PayoutService::request_payout()
// 1. Minimum limit (mhmrentiva_min_payout_amount) is checked.
// 2. Presence of a pending request is verified.
// 3. mhmrentiva_payout post is created.
```

---

## 📧 5. Benachrichtigungen & Hooks

| Hook | Auslöser | Empfänger |
|---|---|---|
| `mhmrentiva_payout_approved` | Wenn die Auszahlung atomar genehmigt wird. | Anbieter |
| `mhmrentiva_payout_rejected` | Wenn die Auszahlung vom Admin abgelehnt wird. | Anbieter |

## Zusammenfassung des Abschnitts
- Die Hauptbuchtabelle verwendet eine `APPEND-ONLY`-Architektur.
- `AtomicPayoutService` garantiert die Datenbankkonsistenz durch Transaktionen.
- Der Schutz vor Doppelausgaben (Idempotenz) wird auf UUID-Ebene durchgesetzt.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 18.11.2026 | Pro 6.5.0 | Dokumentiert: Provision wird dem Eigentümer des Fahrzeugs gutgeschrieben, Erstattungen gegen die ursprüngliche Gutschrift, keine Zeile für die eigene Flotte der Website. |
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Details zur Model-B-Engine, zu atomaren Transaktionen und zur SaaS-Isolation hinzugefügt. |
