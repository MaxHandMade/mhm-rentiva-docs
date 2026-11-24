---
id: settings-test
title: "Einstellungstest (Diagnosetest)"
sidebar_label: "Einstellungstest"
sidebar_position: 16
slug: /core-configuration/settings-test
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Der Tab „Einstellungstest“ ist ein Diagnosewerkzeug, das automatisch prüft, ob alle Bereiche des Plugins (Datenbank, E-Mail, Dateisystem, WooCommerce-Integration usw.) korrekt konfiguriert sind. Du erreichst ihn über **MHM Rentiva > Einstellungen > Einstellungstest**.

Er stellt sicher, dass dein System nach der Installation des Plugins oder nach Änderungen am Server alle Anforderungen erfüllt.

---

## 🩺 Umfassende Testkategorien

Das System führt unter den folgenden Hauptbereichen eine gründliche Prüfung durch:

- **E-Mail-Infrastruktur:** SMTP-Verbindung, Absendername der E-Mails, Verfügbarkeit der Vorlagen und Zustellbarkeit von Testnachrichten.
- **Dateisystem-Berechtigungen:** Prüft, ob CSS-, JS- und Logdateien in die vorgesehenen Verzeichnisse (z. B. `/uploads/mhm-rentiva/`) geschrieben werden können.
- **Sicherheitskonfiguration:** Gültigkeit der Authentifizierungsschlüssel sowie ob IP-Beschränkungen und Brute-Force-Schutz aktiv sind.
- **WooCommerce-Integration:** Prüft, ob Zahlungsmethoden, Steuerregeln und die Produktsynchronisierung vollständig mit dem Plugin kompatibel sind.
- **Interner Systemzustand:** Eignung des SQL-Modus für die Performance, PHP-Version und die Korrektheit der grundlegenden WordPress-Einstellungen (Zeitzone usw.).

---

### 🛡️ Ergebnisse des Diagnoseberichts

Die Bedeutung der einzelnen Zeilen im Berichtsbildschirm:

| Symbol | Status | Beschreibung |
| :---: | :--- | :--- |
| ✅ | **BESTANDEN** | Die betreffende Systemkomponente erfüllt alle Anforderungen und funktioniert problemlos. |
| ❌ | **FEHLGESCHLAGEN** | Ein kritischer Konfigurationsfehler (z. B. fehlende Schreibberechtigung für Dateien). Muss behoben werden. |
| ⚠️ | **WARNUNG** | Das System ist funktionsfähig, aber eine Verbesserung der Performance oder Konfiguration wird empfohlen. |

---

### 🖼️ BILD: BERICHT DES EINSTELLUNGSTESTS
*(Einstellungen > Tab „Einstellungstest“ — Liste der Diagnoseergebnisse und Zusammenfassung des Berichts)*

---

### Zusammenfassung des Abschnitts
- Führe diesen Test nach jeder Konfigurationsänderung durch, um **Probleme schnell zu beheben**.
- Teile die Ergebnisse auf dieser Seite vor **Supportanfragen** mit unserem Team, um die Diagnose zu beschleunigen.
- Sorge für eine **sichere Installation**, damit deine Kunden während des Buchungsvorgangs auf keine Fehler stoßen.

### Änderungsprotokoll
| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Dokumentation zum Einstellungstest (Diagnose) als eigenständige Seite erstellt. |
