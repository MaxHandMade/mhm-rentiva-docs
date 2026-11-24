---
id: api-nervous-system
title: "Nervensystem (interne Kommunikation)"
sidebar_label: "Nervensystem"
sidebar_position: 10
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
MHM Rentiva nutzt eine dreischichtige Kommunikationsarchitektur („Nervensystem“), um Benutzerinteraktionen zu verwalten und Daten zwischen den Modulen zu synchronisieren: **AJAX**, **REST API (v1)** und die **Interactivity API**.
:::

# 🧠 Nervensystem: Kommunikationskanäle

Die interne Kommunikationsarchitektur des Plugins ist auf hohe Performance und geringe Latenz optimiert.

---

## ⚡ 1. AJAX-Schicht (admin-ajax.php)

Der primäre Kanal für Interaktionen im Anbieter-Dashboard und in Frontend-Formularen.

| Hook (Action) | Zuständiger Controller | Funktion |
| :--- | :--- | :--- |
| `mhmrentiva_fetch_vendor_stats` | `AnalyticsController` | Ruft KPI- und Sparkline-Daten für das Dashboard ab. |
| `mhmrentiva_request_payout` | `PayoutAjaxController` | Löst Auszahlungsanfragen atomar aus. |
| `mhmrentiva_filter_results` | `SearchResults` | Filtert die Fahrzeugliste ohne Neuladen der Seite. |
| `mhmrentiva_approve_iban` | `VendorOnboardingController` | Genehmigt IBAN-Änderungen über den Admin-Bereich. |

---

## 🌐 2. REST API v1 (mhm-rentiva/v1)

Die Architektur, die mit externen Diensten (Zahlungsanbietern, mobilen Apps) kommuniziert und komplexe Konfigurationen verarbeitet.

### Zentrale Endpunkte:
- **`/locations`:** Stellt geografische Standortdaten für die Module Transfer und Buchung bereit.
- **`/health`:** Prüft Datenbanktabellen, Lizenzstatus und die PHP-Umgebung.
- **`/payouts/{id}/callback`:** Verwendet HMAC-Verifizierung, um nicht signierte Anfragen von Zahlungssystemen abzulehnen.
- **`/availability`:** Führt über die Pricing Engine Verfügbarkeitsprüfungen im Kalender und Preisberechnungen in Echtzeit durch.

---

## 🧪 3. Interactivity API (WP 6.5+)

Wird für blockbasierte und reaktive Oberflächen im Einklang mit den neuen Standards von WordPress verwendet.

- **`mhmLive.endpoint`:** Dient dazu, eine serverseitige Zustandsänderung in Echtzeit im Frontend widerzuspiegeln (z. B. Favoritenzähler).
- **Filterung:** Ermöglicht asynchrones Laden von Daten mit `data-wp-context`.
- **Mikrointeraktionen:** Button-Animationen und Rückmeldungen zur Formularvalidierung nutzen diese Schicht.

---

## 🛡️ 4. Sicherheit und Verifizierung

Die folgenden Sicherheitsebenen sind für alle Kommunikationskanäle erforderlich:
- **Nonce (CSRF):** Überprüfung des Feldes `_wpnonce` bei jeder AJAX-Anfrage.
- **Capability:** Rollenbasierte Zugriffskontrolle über `current_user_can`.
- **AuthHelper:** API-Schlüssel-basierte Verifizierung für externen Zugriff.

## Zusammenfassung des Abschnitts
- AJAX ist für Interaktionen im Benutzer-Dashboard optimiert.
- REST API v1 ist das Tor zur Systemintegrität und zur Außenwelt.
- Die Interactivity API bietet reaktive Methoden für ein modernes, flüssiges Benutzererlebnis.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Details zur Interactivity API und zum AJAX-Audit hinzugefügt. |
