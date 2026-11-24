---
id: rate-limits-and-errors
title: "API-Fehlerbehandlung und Rate Limiting"
sidebar_label: "Rate Limit und Fehlercodes"
sidebar_position: 90
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Ein Satz von Regeln, der die Verfügbarkeit der MHM Rentiva API-Dienste sicherstellt und Fehlerzustände in einer einheitlichen Sprache meldet.
:::

# 🚦 API-Fehlerbehandlung und Rate Limiting

Das System verwendet die Klassen `RateLimiter` und `ErrorHandler`, um sowohl böswillige Angriffe (Brute-Force, DoS) abzuwehren als auch einheitliche Fehlermeldungen an Clients zurückzugeben.

---

## 🛑 1. Rate Limiting

Rate Limits werden pro API-Schlüssel (v1) oder IP-Adresse (Public) angewendet.

| Ebene | Limit (Anfragen/Minute) | Ergebnis bei Überschreitung |
|---|---|---|
| **Public API** | 30 | HTTP 429 |
| **Authentifiziert (API-Schlüssel)** | 60 | HTTP 429 |
| **Admin/intern** | 120 | HTTP 429 |

**Schutzmechanismen:**
- **`RateLimiter::check()`:** Setzt das Anfragelimit innerhalb definierter Zeitfenster durch (Sliding Window).
- **Protokollierung:** Limitverstöße werden über `AdvancedLogger` auf der Ebene `SECURITY_WARNING` protokolliert.

---

## ❌ 2. Standard-Fehlercodes

Alle API-Antworten verwenden standardmäßige HTTP-Statuscodes und eigene Anwendungsfehlercodes.

| HTTP-Code | Anwendungscode | Beschreibung |
|---|---|---|
| **400** | `INVALID_PARAMS` | Fehlender oder falsch formatierter Parameter. |
| **401** | `AUTH_REQUIRED` | Authentifizierungs-Header fehlt oder ist ungültig. |
| **403** | `PERMISSION_DENIED` | Der Benutzer oder Schlüssel hat keine Berechtigung für diesen Vorgang. |
| **404** | `RESOURCE_NOT_FOUND` | Kein Datensatz mit der angegebenen ID gefunden. |
| **409** | `STATE_CONFLICT` | Der Vorgang ist mit dem aktuellen Zustand der Ressource nicht vereinbar (z. B. Buchung eines nicht verfügbaren Fahrzeugs). |
| **429** | `RATE_LIMIT_EXCEEDED` | Anfragelimit pro Minute überschritten. |
| **500** | `INTERNAL_ERROR` | Ein unerwarteter Serverfehler ist aufgetreten. |

---

## 🛠️ 3. Protokollierung und Correlation ID

Das System erzeugt zu jeder Fehlerantwort eine **Correlation ID** (z. B. `req_abc123`):
- **Tipp für Entwickler:** Technische Fehlerdetails (Stack-Trace usw.) werden niemals im Fehler-Body zurückgegeben. Stattdessen wird eine ID zurückgegeben, mit der sich der zugehörige Eintrag in den Logs finden lässt.
- **`ErrorHandler::format_error()`:** Fängt alle Fehler zentral ab, protokolliert sie und liefert sie den Clients in einem sicheren JSON-Format aus.

---

## 📤 4. Beispiel für eine Fehlerantwort

```json
{
  "success": false,
  "error": {
    "code": "PERMISSION_DENIED",
    "message": "Bu işlem için 'rentiva_vendor' yetkisi gereklidir.",
    "correlation_id": "err_1773849524"
  }
}
```

## Zusammenfassung des Abschnitts
- `RateLimiter` schützt das System; `ErrorHandler` vereinheitlicht die Kommunikation.
- Fehler werden niemals als rohe PHP-Fehler zurückgegeben, sondern als formatiertes JSON.
- Die Correlation ID erleichtert die Nachverfolgung von Fehlern im Produktivbetrieb.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Rate-Limit-Ebenen, Anwendungsfehlercodes und Details zur Correlation ID hinzugefügt. |
