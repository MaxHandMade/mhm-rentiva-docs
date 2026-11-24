---
id: maintenance
title: "Wartung & Datenbankbereinigung"
sidebar_label: "Datenbankbereinigung"
sidebar_position: 14
slug: /core-configuration/maintenance
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Das regelmäßige Entfernen unnötiger Daten und das Optimieren der Datenbanktabellen ist entscheidend für die langfristige Leistung des Systems. Diese Vorgänge werden im Tab **MHM Rentiva > Einstellungen > Datenbankbereinigung** verwaltet.

---

## 🧹 Werkzeuge zur Datenbankbereinigung

Das Panel bietet sechs Buttons, die du mit einem einzigen Klick ausführen kannst:

1.  **Analyze Database:** Durchsucht die Datenbank und füllt den **Bericht zur Datenbankbereinigung** darunter aus (der Button lautet danach *Analyze Integrity*).
2.  **Clean Orphaned Meta:** Entfernt Metadaten, die von gelöschten Fahrzeugen oder Buchungen übrig geblieben sind.
3.  **Clean Expired Transients:** Löscht abgelaufene temporäre Systemdaten (Transients).
4.  **Optimize Autoload:** Optimiert die `autoload`-Optionen, die WordPress bei jeder Anfrage lädt, und verbessert so die Geschwindigkeit.
5.  **Optimize Tables:** Gibt ungenutzten Speicher (Overhead) in MySQL-Tabellen frei und aktualisiert die Indizes.
6.  **Purge Old Logs:** Löscht Protokolle und Warteschlangeneinträge, die älter als 30 Tage sind, dauerhaft.

**Ungültige Meta-Schlüssel** werden direkt im Bericht bereinigt: Nach einer Analyse zeigt die Zeile *Invalid Meta Keys* einen Button **Bereinigen** an, sofern es etwas zu entfernen gibt. Seit 6.1.5 lässt diese Bereinigung Schlüssel unter `_mhmcs_` unangetastet – sie gehören zu MHM Currency Switcher (die festen Preise jedes Produkts und, wenn Bestellungen als Beiträge gespeichert werden, die bei jeder Bestellung erfasste Währung und der Wechselkurs), nicht zu Rentiva.

:::info Kein Backup, keine Löschung (6.1.5)
Die Bereinigungen von ungültigen Metadaten, verwaisten Metadaten und alten Protokollen kopieren die zu entfernenden Daten zuerst in eine Backup-Tabelle. Kann diese Backup-Tabelle nicht erstellt oder befüllt werden, **löscht die Bereinigung nichts**, nennt dir den Grund und entfernt die Backup-Tabelle, die sie nicht befüllen konnte. Die Backups jedes Durchlaufs werden unter **Inkrementelle Bereinigungs-Backups** aufgelistet.
:::

---

### 🖼️ BILD: PANEL DER DATENBANKBEREINIGUNG
*(Tab „Einstellungen > Datenbankbereinigung“ und Tabelle des Bereinigungsberichts)*

---

## 💾 System-Snapshot (Backup)

Bevor du einen kritischen Vorgang ausführst, kannst du ein vollständiges Backup all deiner Vermietungsdaten (Fahrzeuge, Definitionen, Buchungen) erstellen.

- **Sichere Speicherung:** Backups werden in einem geschützten Verzeichnis ohne öffentlichen Webzugriff gespeichert.
- **Wiederherstellen (Rollback):** Tritt ein Fehler auf, kannst du mit einem einzigen Klick in der Liste „Inkrementelle Bereinigungs-Backups“ zu einem früheren Zustand zurückkehren.

:::caution Kritische Warnung
Bereinigungsvorgänge können nicht rückgängig gemacht werden. Erstelle vor dem Fortfahren immer eine Kopie deines Systems über den Button **„Snapshot erstellen“**.
:::

---

## 📊 Bericht zur Datenbankbereinigung

Nach einem Vorgang liefert das System einen detaillierten Bericht, der zeigt, wie viele Daten (nach Anzahl und Größe) in jeder Kategorie bereinigt wurden.

### Überwachung eigener Tabellen
Auf diesem Bildschirm kannst du die Zeilenanzahl und die Speichergröße plugin-spezifischer Tabellen wie `payment_log`, `transfer_routes` und `message_logs` in Echtzeit verfolgen.

---

## Deinstallation & Tabellenbereinigung

Wenn das Plugin vollständig entfernt (gelöscht) wird, löscht das Deinstallationsprogramm seine Inhalte und entfernt seine eigenen Tabellen.

**Inhalte, die gelöscht werden.** Fahrzeuge, Buchungen, Zusatzleistungen, Kontaktnachrichten und die beiden Protokolltypen sind WordPress-Beiträge, keine Tabellen, und werden als Beiträge gelöscht: `mhmrentiva_vehicle`, `mhmrentiva_booking`, `mhmrentiva_addon`, `mhmrentiva_contact`, `mhmrentiva_app_log`, `mhmrentiva_email_log`. Einträge, die noch die Beitragstypen `vehicle` und `vehicle_booking` aus der Zeit vor 6.0.0 tragen, werden mit gelöscht.

**Tabellen, die entfernt werden.**

- Warteschlange und Berichte: `mhmrentiva_queue`, `mhmrentiva_report_queue`, `mhmrentiva_notification_queue`
- Bewertungen: `mhmrentiva_ratings`
- Zahlungsdatensätze: `mhmrentiva_payment_log`
- Sitzungen: `mhmrentiva_sessions`
- Nachrichtenprotokolle: `mhmrentiva_message_logs`
- Multisite-Verwaltung: `mhmrentiva_tenants`, `mhmrentiva_usage_metrics`
- Wiederherstellungskopien: `mhmrentiva_backup_records`
- Transfer-Standorte: `rentiva_transfer_locations` (+ Legacy `mhm_rentiva_transfer_locations`)
- Transfer-Routen: `rentiva_transfer_routes` (+ Legacy `mhm_rentiva_transfer_routes`)

Schreibweisen dieser Namen aus der Zeit vor 6.0.0 werden ebenfalls entfernt, und alles andere, was unter dem plugin-eigenen Tabellenpräfix `mhmrentiva_` übrig bleibt, wird anschließend beseitigt.

:::info Die sechs Tabellen des Add-ons werden NICHT entfernt
Das Provisionsbuch, die Provisionsrichtlinie, die Anbieterberichte, die Hintergrundjobs, das Prüfprotokoll der Auszahlungen und die Schlüsselregistrierung gehören zum kostenpflichtigen Add-on, und das Entfernen von Lite lässt sie unangetastet. Sie enthalten eine nur erweiterbare Finanzhistorie, und eine Website, die Lite entfernt, installiert es möglicherweise gleich wieder. Jedes Plugin entfernt seine eigenen Daten; deinstalliere das Add-on, um diese zu entfernen.
:::

:::caution
Die Deinstallation kann nicht rückgängig gemacht werden. Fahrzeug-, Buchungs- und Transferdaten werden dauerhaft gelöscht.

**Kundenkonten bleiben erhalten.** Kunden sind WordPress-Benutzer, und das Deinstallationsprogramm löscht weder Benutzer noch deren Profildaten – nur die Buchungen, die auf sie verwiesen haben.
:::

---

## Cache-Verwaltung

Der System-Cache wird über das Akkordeon **Cache** im Tab **Wartung** verwaltet. Dieser Bereich wird von `MaintenanceSettings::render_group_cache()` gerendert und bietet einen einzigen Kontrollpunkt (das Problem der doppelten Darstellung wurde in v4.22.1 behoben).

---

### Zusammenfassung des Abschnitts
- Führe eine **regelmäßige Bereinigung** durch, um ein Aufblähen der Datenbank zu verhindern.
- Das **Snapshot**-System bietet vor jedem Vorgang ein Sicherheitsnetz.
- Protokolle können so konfiguriert werden, dass sie nach 30 Tagen automatisch bereinigt werden.

### Änderungsprotokoll
| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 17.09.2026 | 6.1.5 | Werkzeugbezeichnungen an den Bildschirm angepasst; Bereinigung ungültiger Metadaten, Currency-Switcher-Schlüssel und die Regel „kein Backup, keine Löschung“ dokumentiert. |
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 27.03.2026 | 4.22.1 | 5 fehlende Tabellen zum Deinstallationsprogramm hinzugefügt. Cache-Bereich als einziger Render-Punkt dokumentiert. |
| 19.03.2026 | 4.21.2 | Details zu Datenbankbereinigung und Backup hinzugefügt. |
