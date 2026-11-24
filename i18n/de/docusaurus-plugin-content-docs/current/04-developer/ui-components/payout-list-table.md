---
id: payout-list-table
title: "Auszahlungs-Listentabelle (Admin-Oberfläche)"
sidebar_label: "Auszahlungs-Listentabelle"
sidebar_position: 6
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite dokumentiert eine Funktion der Erweiterung **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und erfordert, dass Pro zusätzlich zu Lite installiert ist, sowie eine gültige Lizenz.
Siehe [Editionen — Lite vs. Pro](/docs/) für die vollständige Aufteilung oder hol dir Pro unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Zweck
Dieses Dokument beschreibt die technischen Fähigkeiten und den Betriebsablauf der Klasse `PayoutListTable`, die den Bildschirm „Auszahlungsanfragen“ im Admin-Bereich verwaltet.
:::

# 🧾 Auszahlungs-Listentabelle

`PayoutListTable` ist die zentrale Admin-Komponente der Finanzsteuerungsebene von Rentiva. Sie basiert auf der Klasse `WP_List_Table` und stellt komplexe Finanzdaten in einem lesbaren, handlungsorientierten Format dar.

---

## 🏗️ Kernaufgaben

1.  **Analyseansicht:** Echtzeitanzeige der Anbieter-Guthaben und der angeforderten Auszahlungsbeträge.
2.  **Sichere Filterung:** Es werden nur Auszahlungsanfragen in gültigen Status aufgelistet.
3.  **Transaktionsverwaltung:** Integration von Sammelgenehmigung und CSV-Export.

---

## 📊 Spaltenstruktur und Datenquellen

Jede Spalte der Tabelle wird aus unterschiedlichen Ebenen der Datenbank gespeist:

| Spalte | Datenquelle | Beschreibung |
| :--- | :--- | :--- |
| **Anbieter** | `WP_User` | Anzeigename und ID des Anbieters, der die Anfrage gestellt hat. |
| **Betrag** | `post_meta` | Angeforderter Auszahlungsbetrag (formatiert mit `wc_price`). |
| **Guthaben** | `Ledger` | Aktuell verfügbares Guthaben des Anbieters in der Ledger-Tabelle. |
| **Status** | `post_status` | Status der Anfrage (Ausstehend, Genehmigt, Abgelehnt). |
| **Angefordert**| `post_date` | Datum, an dem die Anfrage erstellt wurde (mit GMT-Normalisierung). |

---

## ⚡ Massenaktionen

### Sammelgenehmigung
Administratoren können mehrere Anfragen auswählen und den zentralen Genehmigungsmechanismus auslösen:
- **Methode:** `process_bulk_approve()`
- **Funktionsweise:** Ruft `GovernanceService::process_approval` für jede ausgewählte ID auf.
- **Idempotenz:** Nur Anfragen mit `pending` werden verarbeitet; bereits genehmigte werden übersprungen (Schutz vor doppelter Belastung).

---

## 🔄 Status und Farbcodes

Die Tabelle stellt Transaktionsstatus mit dynamischen Farben dar:
- 🟡 **Ausstehend:** Wartet auf Genehmigung.
- 🔵 **Genehmigt:** Genehmigt (Zahlungsauftrag erteilt).
- 🟢 **Bestätigt:** Abgeschlossen (auf Seiten der Bank bzw. des Zahlungsdienstleisters erledigt).
- 🔴 **Abgelehnt / Fehlgeschlagen:** Abgelehnt oder ein Fehler ist aufgetreten.

## 🛡️ Sicherheit und Berechtigungen

- **Berechtigung:** Für Massenaktionen ist die Berechtigung `mhmrentiva_approve_payout` erforderlich.
- **Nonce:** Alle Massenaktionen durchlaufen die Standard-Sicherheitsprüfung von WP.
- **Idempotenz-Schutz:** Innerhalb von `PayoutListTable` wird vor jedem Vorgang eine `post_status`-Prüfung durchgeführt, um eine doppelte Verarbeitung auf Code-Ebene zu verhindern.

## Zusammenfassung des Abschnitts
- `PayoutListTable` ist ein internes Admin-Werkzeug, das das Finanz-Ledger anzeigt.
- Die Daten werden hybrid aus `Ledger` und `post_meta` abgerufen.
- Die Sammelgenehmigung durchläuft den **GovernanceService**-Filter.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Klasse PayoutListTable um Sammelgenehmigung und Ledger-Integration erweitert. |
