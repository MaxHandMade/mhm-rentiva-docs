---
id: financial-ledger-model
title: "Ledger-Datenmodell (Schema & Logik)"
sidebar_label: "Ledger-Modell"
sidebar_position: 11
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite dokumentiert eine Funktion des Add-ons **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und erfordert, dass Pro zusätzlich zu Lite installiert ist, sowie eine gültige Lizenz.
Siehe [Editionen – Lite vs. Pro](/docs/) für die vollständige Aufteilung oder hol dir Pro unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Zweck
Diese Seite beschreibt das Datenschema, die Speicherregeln und die Finanzlogik des unveränderlichen Ledgers (Immutable Ledger), die die Grundlage des Rentiva-Finanzsystems bilden.
:::

# 🧾 Ledger-Datenmodell

Die Tabelle `wp_mhmrentiva_ledger` ist der endgültige Datenspeicher für alle finanziellen Ereignisse. Diese Tabelle ist **Append-Only** (nur Anfügen); bestehende Zeilen werden niemals aktualisiert oder gelöscht.

---

## 🏗️ SQL-Schema (technisches Schema)

Unten siehst du die Haupttabellenstruktur, die das System verwendet. Für präzise Finanzberechnungen wird `DECIMAL(12,2)` verwendet.

```sql
CREATE TABLE wp_mhmrentiva_ledger (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    tenant_id BIGINT UNSIGNED NOT NULL DEFAULT 1,
    transaction_uuid CHAR(36) NOT NULL, -- Idempotency Key
    vendor_id BIGINT UNSIGNED NOT NULL,
    booking_id BIGINT UNSIGNED NULL,
    order_id BIGINT UNSIGNED NULL,
    type VARCHAR(30) NOT NULL,          -- Transaction Type
    amount DECIMAL(12,2) NOT NULL,      -- Net Impact Amount
    gross_amount DECIMAL(12,2) NULL,    -- WC Order Total
    status VARCHAR(30) NOT NULL,        -- 'cleared', 'pending', 'void'
    policy_id BIGINT UNSIGNED NULL,     -- Associated Policy ID
    policy_version_hash CHAR(64) NULL,  -- Policy Hash for Auditing
    created_at DATETIME NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (transaction_uuid),      -- Duplicate Entry Prevention
    INDEX (vendor_id, status, created_at)
) ENGINE=InnoDB;
```

---

## 🔄 Transaktionstypen und Auswirkung auf den Saldo

Die Spalte `type` bestimmt, wie sich die Transaktion auf den Saldo des Anbieters auswirkt:

| Transaktionstyp (`type`) | Auswirkung auf den Saldo | Beschreibung |
| :--- | :--- | :--- |
| `commission_credit` | **Positiv (+)** | Einnahmen aus einem abgeschlossenen Verkauf. |
| `commission_refund` | **Negativ (-)** | Gegenbuchung für eine erstattete Bestellung. |
| `payout_debit` | **Negativ (-)** | Erfolgreiche Auszahlung an den Anbieter (Abfluss). |
| `payout_reversal` | **Positiv (+)** | Stornierung einer fehlgeschlagenen/zurückgebuchten Auszahlung. |

---

## 🛡️ Domänenregeln und Sicherheit

### 1. Unveränderlichkeit
Gemäß den Standards für Finanzprüfungen sind `UPDATE`- oder `DELETE`-Operationen auf dieser Tabelle strikt verboten. Ist eine Korrektur nötig, muss eine neue Gegenbuchung (Korrektur/Erstattung) hinzugefügt werden, die den Fehler neutralisiert.

### 2. Transaktions-UUID (Idempotenz)
Jedes finanzielle Ereignis (Zahlung einer Bestellung, Freigabe einer Auszahlung) erzeugt an seiner Quelle eine UUID. Die `UNIQUE`-Einschränkung auf Datenbankebene verhindert auf Hardwareebene, dass das System dasselbe Ereignis zweimal verarbeitet.

### 3. Zeitliche Prüfung
Alle Transaktionen werden über die Spalte `created_at` mit einem UTC-Zeitstempel versehen. Mit den Feldern `policy_id` und `policy_version_hash` lässt sich die zum Zeitpunkt der Transaktion gültige Provisionsrichtlinie auch noch 2 Jahre später überprüfen.

---

## 📊 Logik der Saldoberechnung

Der aktuelle Saldo eines Anbieters wird immer durch Summieren aller „cleared“ (abgerechneten) Zeilen ermittelt:

```sql
SELECT SUM(amount) FROM wp_mhmrentiva_ledger 
WHERE vendor_id = %d AND status = 'cleared';
```

## Zusammenfassung des Abschnitts
- Der Datentyp ist immer **DECIMAL** (Float ist verboten).
- Die Tabellenstruktur ist **Append-Only** und **mandantenisoliert** (Tenant-Isolated).
- Jeder Eintrag hat eine eindeutige **UUID**.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Seite mit dem LedgerMigration-Schema und der Matrix zur Auswirkung auf den Saldo aktualisiert. |
