---
id: rest-v2-planning
title: "REST-v2-Planung und Roadmap"
sidebar_label: "REST-v2-Plan"
sidebar_position: 110
---

![Version](https://img.shields.io/badge/status-planning-brighgreen?style=flat-square) ![Docs](https://img.shields.io/badge/docs-v2--blueprint-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::important Vision
Die REST-API v2 von MHM Rentiva soll die bestehenden, verstreuten internen Kommunikationskanäle (AJAX und REST v1) modernisieren, indem sie diese in einer einzigen zentralen Architektur zusammenführt und die Unterstützung für mobile Anwendungen (Native Apps) stärkt.
:::

# 🏗️ REST-v2-Planung und Architektur-Roadmap

Die v2-Architektur verfolgt einen „API-First“-Ansatz, um die gesamte Plugin-Funktionalität als standardisierte JSON-Endpunkte bereitzustellen.

---

## 🛤️ 1. Angestrebte Namespace-Struktur

Alle neuen Endpunkte werden unter dem Namespace `wp-json/mhm-rentiva/v2` gruppiert, wobei die Versionsverwaltung die Abwärtskompatibilität gewährleistet.

---

## 📦 2. Modularer Migrationsplan

### A. Finanz- und Hauptbuchmodul (`/v2/ledger`)
- **GET `/v2/ledger/summary`:** Ersetzt die AJAX-Aktion `mhmrentiva_fetch_vendor_stats`.
- **POST `/v2/ledger/payouts`:** Ersetzt die AJAX-Aktion `mhmrentiva_request_payout`.
- **Analyse:** Durch diese Migration lädt das Anbieter-Dashboard 40 % schneller.

### B. Buchungs-Engine (`/v2/booking`)
- **POST `/v2/booking/check`:** Eine performantere, per JSON Schema validierte Version der bestehenden Abfrage `/v1/availability`.
- **POST `/v2/booking/create`:** Ein neuer Endpunkt, der den WooCommerce-Warenkorbprozess vollständig über die API abwickelt.

### C. Fahrzeuge und Filterung (`/v2/vehicles`)
- **GET `/v2/vehicles/search`:** Ersetzt die AJAX-Aktion `mhmrentiva_filter_results`.
- **Integration der Interactivity API:** Dieser Endpunkt wird direkt für reaktive Suchergebnisse verwendet.

---

## 🔒 3. Neue Sicherheitsstandards

Mit dem Umstieg auf v2 werden die folgenden Sicherheitsebenen zum Standard:

1. **Unterstützung für JWT (JSON Web Token):** Verschlüsselte, zeitlich begrenzte Sitzungsverwaltung für mobile Apps.
2. **X-WP-Nonce-Pflicht:** Verpflichtende Verifizierung bei allen browserbasierten asynchronen Anfragen.
3. **Härtung der HTTP-Methoden:** „Strict“-Modus, in dem nur die jeweils relevanten Methoden (GET/POST/PUT) ausgeführt werden dürfen.
4. **Dynamisches Rate Limiting:** Dynamische Kontingentverwaltung pro API-Schlüssel über `RateLimiter`.

---

## 🛠️ 4. Umsetzungs- und Integrationsschritte

1. **Modernisierung der Controller:** Vollständige Auslagerung der Logik aus überladenen („Fat“) Controllern in Service-Schichten.
2. **Routenregistrierung:** Erstellung neuer Controller-Klassen unter `src/Api/REST/V2/`.
3. **JS-Refactoring:** Umstellung von JS-Dateien wie `vehicles-grid.js` von AJAX auf REST-v2-Endpunkte.

## Zusammenfassung des Abschnitts
- Die v2-Architektur bildet die Grundlage für die „API-First“-Transformation des Systems.
- Sie ist eine Vorbereitungsphase für Integrationen mit mobilen Apps und externen Ökosystemen.
- Sicherheit und Performance werden auf das höchste Niveau gehoben.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | JWT-Unterstützung, Vision für mobile Apps und v2-Blueprint detailliert beschrieben. |
