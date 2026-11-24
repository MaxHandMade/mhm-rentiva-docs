---
id: system-diagnostics-usage
title: "Systemzustand und Einstellungstest"
sidebar_label: "Systemzustand"
sidebar_position: 18
slug: /features-usage/system-diagnostics
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Mit dem Systemzustand und Einstellungstest kannst du überprüfen, ob alle Komponenten des Plugins (Zahlungs-Gateways, E-Mail, Cron-Jobs, Fahrzeugbestand) korrekt funktionieren. Du erreichst ihn über den Tab **MHM Rentiva > Einstellungen > Settings Test**.

Es wird empfohlen, diese Tests regelmäßig auszuführen, damit dein Geschäft reibungslos läuft.

---

## Kategoriebasierte Tests

Das Diagnosesystem prüft dein Geschäft unter den folgenden Punkten:

- **E-Mail-Zustellung:** Testet, ob Benachrichtigungen die Kunden erreichen.
- **Schreibrechte für Verzeichnisse:** Prüft die Ordnerberechtigungen für Fahrzeugbilder und Berichtsausgaben.
- **Links zu kritischen Seiten:** Überprüft, ob die Such-, Buchungs- und Zahlungsseiten online sind.
- **WP-Cron-Status:** Überwacht, ob geplante Aufgaben (Erinnerungen, Auszahlungsberechnungen) korrekt in die Warteschlange eingereiht werden.

---

### 🖼️ BILD: SYSTEMDIAGNOSEBERICHT
*(Seite des Einstellungstests und Erfolgs-/Fehlermeldungen)*

---

## Fehlerbehebung und Aktionen

Wenn ein Test fehlschlägt, bietet das System die folgenden Lösungen an:
- **Korrektur mit einem Klick:** Ist das Problem einfach – etwa eine fehlende Seite –, wird die Seite automatisch erstellt.
- **Detailliertes Protokoll:** Zeigt die technischen Details des Fehlers (z. B. Serverfehler 500), damit du leichter Support erhalten kannst.
- **Erneut prüfen:** Führe den Test nach der Behebung des Problems erneut aus, um den Status zu überprüfen.

---

### Zusammenfassung des Abschnitts
- **Betriebssicherheit:** Verhindere Kundenverluste durch Fehlkonfigurationen.
- **Schnelle Diagnose:** Stelle in Sekunden fest, ob ein Problem am Server oder an der Konfiguration liegt.

### Änderungsprotokoll
| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Dokumentation mit der aktuellen Plugin-Version synchronisiert. |
| 19.03.2026 | 4.21.2 | Anleitung zur Nutzung von Systemzustand und Einstellungstest erstellt. |
