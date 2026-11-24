---
id: post-types
title: "Custom Post Types"
sidebar_label: "Custom Post Types"
sidebar_position: 10
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Rentiva erweitert die Standard-Tabellen von WordPress um eine Architektur aus Custom Post Types (CPT), um komplexe Geschäftslogik zu verwalten.
:::

# 🗄️ Custom Post Types

Das Plugin speichert Daten in zwei Hauptgruppen: „Operativ“ (Fahrzeuge/Buchungen) und „System“ (Auszahlungen/Protokolle).

---

## 💰 1. Finanz-Post-Types

### `mhmrentiva_payout` (Auszahlungsanfragen)
Verwaltet die Zahlungsanfragen von Anbietern im Workflow von Modell B.
- **Verwendung:** Enthält Workflow-Status außerhalb des Hauptbuchs (Ausstehend, Genehmigt, In Bearbeitung).
- **Sicherheit:** Nur Benutzer mit der Berechtigung `manage_options` oder `rentiva_financial_manager` können diese Datensätze sehen.
- **Beziehung:** Jeder Auszahlungsdatensatz wird über die Transaktions-ID den `mhmrentiva_ledger`-Zeilen in der Datenbank zugeordnet.

---

## 💬 2. Kommunikations-Post-Types

### `mhmrentiva_message` (Nachrichten)
Verwaltet den Nachrichtenverkehr zwischen Kunden, Anbietern und Administratoren.
- **Thread-Verwaltung:** Gruppiert Nachrichten über den Meta-Schlüssel `_mhmrentiva_thread_id`.
- **UUID-Unterstützung:** Thread-IDs unterstützen sowohl Ganzzahl- als auch UUID-Formate (String).
- **Sichtbarkeit:** Im Standard-Adminmenü ausgeblendet; die Verwaltung erfolgt über eine eigene Nachrichtenoberfläche.

---

## 🪵 3. System- und Audit-Post-Types

### `mhmrentiva_app_log` (Anwendungsprotokolle)
Speichert Systemfehler, kritische API-Aufrufe und Audit-Trails.
- **Automatische Bereinigung (Aufbewahrung):** Die Routine `LogRetention::purge()` läuft täglich und löscht standardmäßig Datensätze, die älter als 30 Tage sind.
- **Kategorien:** Protokolliert in den Schweregraden Error, Info und Critical.

---

## 4. Operative Post-Types

Das Plugin arbeitet mit den folgenden CPTs:
- **`mhmrentiva_vehicle`:** Fahrzeugbestand für die Vermietung.
- **`mhmrentiva_booking`:** Buchungsdatensätze und Kalender.
- **`mhmrentiva_addon`:** Zusatzleistungen für Fahrzeuge (Kindersitz, GPS, Versicherung usw.).

---

## 5. Post-Types für den Anbieter-Marktplatz (Pro)

### `mhmrentiva_vendor_app` (Anbieterbewerbungen)
Verwaltet Anbieterbewerbungen innerhalb des Anbieter-Marktplatzes.
- **CPT-Slug:** `mhmrentiva_vendor_app` (14 Zeichen – entspricht dem 20-Zeichen-Limit von WordPress). **HINWEIS:** NICHT `mhmrentiva_vendor_application`.
- **Verwendung:** Der Onboarding-Prozess für Anbieter (Bewerbung, Genehmigung, Ablehnung, Sperrung) läuft über diesen CPT.
- **Verwaltung:** CRUD-Operationen über `VendorApplicationManager`; Statusübergänge (genehmigen/ablehnen/sperren) über `VendorOnboardingController`.
- **Sicherheit:** IBAN-Daten werden mit AES-256-CBC verschlüsselt (Flag `OPENSSL_RAW_DATA`). Ist OpenSSL nicht verfügbar, wird ein leerer String zurückgegeben – Klartext wird NIEMALS gespeichert.
- **Datei:** `src/Admin/Vendor/PostType/VendorApplication.php`

## Zusammenfassung des Abschnitts
- CPTs sind mit `no_found_rows` und begrenzten Meta-Abfragen optimiert, um die Datenbanklast zu verringern.
- Finanzdatensätze (`mhmrentiva_payout`) werden nie direkt aus der Datenbank gelöscht; sie werden per Statusänderung archiviert.
- Protokolle (`mhmrentiva_app_log`) werden aus Performancegründen regelmäßig bereinigt.
- Anbieterbewerbungen werden im CPT `mhmrentiva_vendor_app` gespeichert (14 Zeichen, innerhalb des 20-Zeichen-Limits von WP).

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 27.03.2026 | 4.23.0 | CPTs `mhmrentiva_addon` und `mhmrentiva_vendor_app` sowie Details zum Anbieter-Marktplatz hinzugefügt. |
| 19.03.2026 | 4.21.2 | Details zu `mhmrentiva_payout`, `mhmrentiva_message` und `LogRetention` hinzugefügt. |
