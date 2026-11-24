---
id: controller-audit
title: "Controller-Architektur und Geschäftslogik"
sidebar_label: "Controller-Audit"
sidebar_position: 20
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
MHM Rentiva lagert die Geschäftslogik in Service-Klassen aus, um das Anti-Pattern „Fat Controller“ zu vermeiden. Diese Seite ist ein technischer Audit-Bericht über die aktuellen Controller.
:::

# 🧬 Architektur der Controller- und Service-Schicht

Die Plugin-Architektur beruht darauf, dass Controller nur Anfragen entgegennehmen, Berechtigungsprüfungen durchführen und die Arbeit an die zuständigen Service-Klassen delegieren.

---

## 🏗️ 1. Design-Patterns für Controller

Alle `*Controller.php`-Klassen müssen diese Regeln einhalten:
- **Nur Präsentation:** Dürfen keine Datenberechnungen durchführen.
- **Validierung:** Müssen die Eingabedaten der Anfrage validieren.
- **Autorisierung:** Müssen Berechtigungsprüfungen über `current_user_can` oder `SecurityHelper` durchführen.

---

## 📊 2. Bericht zu den AJAX-Controllern

### A. AnalyticsController (Thin Controller)
- **Datei:** `src/Core/Dashboard/AnalyticsController.php`
- **Aufgabe:** Verarbeitet Statistikanfragen.
- **Geschäftslogik:** Umsatz-, Auslastungs- und Diagrammdaten liegen vollständig in `AnalyticsService`.
- **Ergebnis:** ✅ **Standardkonform.**

### B. PayoutAjaxController (Thin Controller)
- **Datei:** `src/Core/Financial/PayoutAjaxController.php`
- **Aufgabe:** Stößt Auszahlungsanfragen an.
- **Geschäftslogik:** Die Klassen `PayoutService` und `AtomicPayoutService` (Transaktion) führen den Vorgang aus.
- **Ergebnis:** ✅ **Standardkonform.**

---

## 🌐 3. Bericht zu den REST-Controllern

### A. HealthController (Audit-Status)
- **Datei:** `src/Api/REST/HealthController.php`
- **Beobachtung:** Einige Datenbank-Health-Abfragen befinden sich direkt im Controller.
- **Empfehlung:** Die Verlagerung dieser Logik in eine `SystemHealthService`-Klasse ist geplant.
- **Ergebnis:** ⚠️ **Verbesserung ausstehend.**

### B. PayoutCallbackController (Transaktions-Controller)
- **Datei:** `src/Api/REST/PayoutCallbackController.php`
- **Aufgabe:** Verarbeitet Zahlungs-Callbacks samt ihren Nachweisen.
- **Sicherheit:** Die Prüfung der HMAC-Signatur erfolgt zentral über `AuthHelper`.
- **Ergebnis:** ✅ **Standardkonform.**

---

## 🛠️ 4. Architekturstandards und Empfehlungen

Zur Vereinheitlichung der Fehlerbehandlung werden folgende Methoden verwendet:
1. **`ErrorHandler::format_error()`:** Alle Fehlerantworten werden über diese Methode standardisiert.
2. **DTO-Klassen:** Bei der Rückgabe großer JSON-Payloads werden statt Arrays DTO-Klassen verwendet, um einen Datenvertrag zu garantieren.
3. **`Sanitizer::*`:** Alle eingehenden Variablen werden über die Bereinigungsschicht verarbeitet statt als Rohdaten.

## Zusammenfassung des Abschnitts
- Controller werden „schlank“ (Thin) gehalten.
- Die Geschäftslogik ist in „Service“-Klassen zentralisiert.
- Die API-Sicherheit wird durch `AuthHelper` und `SecurityHelper` gewährleistet.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Controller-Audit-Bericht und Design-Patterns hinzugefügt. |
