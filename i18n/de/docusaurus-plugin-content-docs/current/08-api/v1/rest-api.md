---
id: rest-api-v1
title: "Überblick über die REST API v1"
sidebar_label: "REST API"
sidebar_position: 10
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Doku](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Aktualisiert](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Die REST API v1 von MHM Rentiva stellt zentrale Endpunkte für die Integration externer Systeme, die Unterstützung mobiler Apps und asynchrone Vorgänge bereit. Alle Endpunkte werden unter dem Namespace `wp-json/mhm-rentiva/v1` bereitgestellt.
:::

# 🌐 Struktur der REST API v1

Die API-Schicht v1 bietet sicheren und schnellen Datenzugriff und bleibt dabei abwärtskompatibel.

---

## 🔑 1. Authentifizierung und Sicherheit

Der Zugriff auf die API-Endpunkte erfolgt je nach Art des Vorgangs über drei verschiedene Methoden:

| Methode | Anwendungsfall | Details |
|---|---|---|
| **Öffentlich** | Standorte, Verfügbarkeit | Für öffentlich zugängliche Daten ist keine Authentifizierung erforderlich. |
| **Nonce** | AJAX-/Web-Interaktionen | Überprüfung des Headers/Parameters `_wpnonce` erforderlich. |
| **API-Schlüssel** | Integrationen externer Dienste | Authentifizierung über `X-Rentiva-API-Key` oder Bearer-Token. |

---

## 🚀 2. Zentrale Endpunkte

### A. Systemzustand (`/health`)
- **Methode:** `GET`
- **Funktion:** Prüft das Vorhandensein der Datenbanktabellen, die Plugin-Version und den Lizenzstatus.
- **Antwort:** `{"status": "ok", "version": "4.21.2"}`

### B. Standortdienste (`/locations`)
- **Methode:** `GET`
- **Funktion:** Gibt die definierten aktiven Standorte für die Buchungs- und Transfer-Module zurück.
- **Parameter:** `?type=airport`, `?city=istanbul`

### C. Verfügbarkeit und Preise (`/availability`)
- **Methode:** `POST`
- **Funktion:** Prüft die Verfügbarkeit für bestimmte Daten und eine Fahrzeug-ID und berechnet den Nettopreis über die Pricing Engine.
- **Eingabe:** `vehicle_id`, `pickup_date`, `return_date`

---

## 🛡️ 3. Sicherheitsschicht (AuthHelper)

`AuthHelper` wird bei allen „schreibenden“ Vorgängen (POST/PUT/DELETE) aktiv:
- **Rate Limiting:** Begrenzung der Anfragen pro Minute für jeden API-Schlüssel.
- **HMAC-Verifizierung:** Gewährleistet die Datenintegrität bei Webhook-Callbacks.

---

## 📊 4. Antwort- und Fehlerformat

Das System gibt standardisierte JSON-Antworten zurück:

```json
{
  "success": true,
  "data": { ... },
  "message": "İşlem başarılı."
}
```

Im Fehlerfall:
```json
{
  "success": false,
  "error_code": "INVALID_PARAMS",
  "message": "Eksik parametre gönderildi."
}
```

---

## ⚛️ 5. Endpunkte der Admin-React-SPA (v4.36.0+)

Seit v4.36.0 wurden alle wichtigen Admin-Seiten zu React-SPAs migriert. Jede Seite wird von einem eigenen REST-Controller bedient. Alle Endpunkte erfordern die Berechtigung `manage_options`.

### Dashboard (v4.36.0)

| Methode | Endpunkt | Beschreibung |
| :--- | :--- | :--- |
| `GET` | `/dashboard/stats` | KPI-Karten: Buchungen gesamt, Umsatz, aktive Fahrzeuge, Kunden |
| `GET` | `/dashboard/recent-bookings` | Paginiertes Widget mit den neuesten Buchungen |
| `GET` | `/dashboard/recent-transfers` | Übersicht der anstehenden Transfers |

### Berichte (v4.37.x)

| Methode | Endpunkt | Beschreibung |
| :--- | :--- | :--- |
| `GET` | `/reports/overview` | Tab-übergreifende zusammenfassende Statistiken |
| `GET` | `/reports/revenue` | Daten für das Umsatz-Balkendiagramm + tägliche Detailliste |
| `GET` | `/reports/bookings` | Verteilung der Buchungsstatus |
| `GET` | `/reports/vehicles` | Leistungs-KPIs der Fahrzeuge + Top-Fahrzeuge |
| `GET` | `/reports/customers` | Diagramm zum Kundenlebenszyklus + zusammenfassende Kennzahlen |

Alle Berichts-Endpunkte akzeptieren `?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD` zur Filterung nach Zeitraum.

### Kunden (v4.39.0)

| Methode | Endpunkt | Beschreibung |
| :--- | :--- | :--- |
| `GET` | `/customers` | Paginierte Liste – unterstützt `?search=`, `?sort_by=`, `?sort_order=`, `?page=` |
| `GET` | `/customers/{id}` | Details zu einem einzelnen Kunden (Anzahl der Buchungen, Gesamtausgaben, erste/letzte Buchung) |
| `DELETE` | `/customers/bulk` | Massenlöschung – akzeptiert ein `ids[]`-Array im Request-Body |

### Nachrichten (v4.40.0)

| Methode | Endpunkt | Beschreibung |
| :--- | :--- | :--- |
| `GET` | `/messages` | Paginierter Posteingang – filterbar nach Status, Priorität, Kategorie |
| `GET` | `/messages/{id}` | Verlaufsansicht für eine einzelne Nachricht |
| `POST` | `/messages/{id}/reply` | Eine Antwort in einem Verlauf senden |
| `POST` | `/messages/{id}/status` | Nachrichtenstatus aktualisieren (ausstehend/beantwortet/geschlossen) |

### Anbieter-Meldungen (v4.40.0)

| Methode | Endpunkt | Beschreibung |
| :--- | :--- | :--- |
| `GET` | `/vendor-reports` | Paginierte Liste – filterbar nach Status und Kontexttyp |
| `GET` | `/vendor-reports/{id}` | Details zu einer einzelnen Meldung mit vollständiger Beschreibung und Prüfprotokoll |
| `POST` | `/vendor-reports/{id}/resolve` | Als gelöst markieren (löst je nach Kontext die Aufhebung oder Anwendung einer Strafe aus) |
| `POST` | `/vendor-reports/{id}/reject` | Meldung ablehnen (löst beim Kontext vehicle_action eine aufgeschobene Strafe aus) |

### Anbieterverwaltung (v4.40.0)

| Methode | Endpunkt | Beschreibung |
| :--- | :--- | :--- |
| `GET` | `/vendor-management/applications` | Ausstehende Anbieter-Bewerbungen |
| `GET` | `/vendor-management/vendors` | Liste aktiver Anbieter mit Suche/Filter |
| `GET` | `/vendor-management/{id}` | Anbieterdetails (maskierte IBAN, Dokumente, Statistiken) |
| `POST` | `/vendor-management/{id}/approve` | Eine ausstehende Bewerbung genehmigen |
| `POST` | `/vendor-management/{id}/reject` | Eine ausstehende Bewerbung ablehnen |
| `POST` | `/vendor-management/{id}/suspend` | Einen aktiven Anbieter sperren |
| `POST` | `/vendor-management/{id}/unsuspend` | Sperre eines Anbieters aufheben (v4.43.0) |
| `GET` | `/vendor-management/{id}/audit-log` | Prüfprotokoll für Provisionen + Strafen (v4.43.0) |

### Export (v4.52.0)

| Methode | Endpunkt | Beschreibung |
| :--- | :--- | :--- |
| `GET` | `/admin/export/history` | Paginiertes Export-Protokoll – auf Transients basierend, max. 50 Einträge, TTL von 1 Woche |
| `DELETE` | `/admin/export/{id}` | Einen bestimmten Eintrag aus dem Export-Verlauf entfernen |
| `POST` | `/admin/export/preview` | Gesamtzahl der Datensätze + Stichprobe von 5 Zeilen für den ausgewählten Inhaltstyp und die Datumsfilter |

---

## Zusammenfassung des Abschnitts
- Die API v1 wird unter `mhm-rentiva/v1` bereitgestellt.
- Die Authentifizierungsmethode richtet sich danach, wie kritisch der Vorgang ist.
- Alle Vorgänge werden über die zentralen Komponenten `AuthHelper` und `ErrorHandler` protokolliert.
- Alle Endpunkte der Admin-React-SPA (v4.36.0+) erfordern die Berechtigung `manage_options`.

## Änderungsprotokoll
| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 12.05.2026 | 4.52.0 | Export-REST-Controller: `/admin/export/history`, `/admin/export/{id}`, `/admin/export/preview`. |
| 07.05.2026 | 4.43.0 | Endpunkte `/vendor-management/{id}/unsuspend` + `/vendor-management/{id}/audit-log` hinzugefügt. |
| 06.05.2026 | 4.40.0 | REST-Controller für Nachrichten, Anbieter-Meldungen und Anbieterverwaltung hinzugefügt (12 neue Endpunkte). |
| 10.04.2026 | 4.39.0 | Kunden-REST-Controller: `GET /customers`, `/customers/{id}`, `DELETE /customers/bulk`. |
| 05.04.2026 | 4.37.x | Berichte-REST-Controller: 5 Tab-Endpunkte mit Zeitraumfilter. |
| 10.05.2026 | 4.36.0 | Dashboard-REST-Controller: /dashboard/stats, /dashboard/recent-bookings, /dashboard/recent-transfers. |
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Architektur und Sicherheitsschichten der API v1 aktualisiert. |
