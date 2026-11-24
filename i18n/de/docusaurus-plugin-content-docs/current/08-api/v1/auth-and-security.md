---
id: auth-and-security
title: "API-Authentifizierung und Sicherheit"
sidebar_label: "Auth und Sicherheit"
sidebar_position: 20
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Erläutert die Sicherheitsprotokolle, mit denen die Integrität und Vertraulichkeit des Datenaustauschs in der API-Schicht von MHM Rentiva sichergestellt werden.
:::

# 🔐 API-Sicherheitsarchitektur

Das System verfolgt sowohl für interne als auch für externe Anfragen eine mehrstufige Verifizierungsstrategie.

---

## 🛡️ 1. Authentifizierungsmethoden

### A. Nonce-(CSRF-)Schutz (intern)
Wird für interne AJAX- und Interactivity-API-Anfragen verwendet.
- **Header:** `X-WP-Nonce`
- **Verifizierung:** `check_ajax_referer()` oder `rest_cookie_check_errors()`.

### B. API-Schlüssel (extern)
Wird für externe Integrationen über `AuthHelper` verwaltet.
- **Header:** `X-Rentiva-API-Key`
- **Funktion:** Der API-Schlüssel bestimmt die diesem Schlüssel zugewiesene Berechtigungsstufe (Lesen/Schreiben).

### C. HMAC-Signaturprüfung (Webhook)
Ein entscheidender Sicherheitsschritt für Zahlungs-Callbacks.
- **Header:** `X-Rentiva-Signature`
- **Logik:** Der aus dem eingehenden JSON-Body und dem geheimen Schlüssel (Secret Key) erzeugte Hash wird mit dem Wert im Header verglichen.

---

## 🚦 2. Autorisierung

Nach der Authentifizierung wird geprüft, ob der Benutzer berechtigt ist, den Vorgang auszuführen:
- **`current_user_can('manage_options')`:** Vorgänge auf Admin-Ebene.
- **`current_user_can('rentiva_vendor')`:** Vorgänge auf Anbieter-Ebene.
- **`Mode::featureEnabled()`:** Funktionseinschränkung abhängig von der Lizenzstufe.

---

## 🚀 3. Anfragesicherheit und Bereinigung

### Parametervalidierung
Alle Endpunkte validieren Daten über ein `args`-Array:
```php
'id' => [
    'validate_callback' => function($param) {
        return is_numeric($param);
    },
    'sanitize_callback' => 'absint',
]
```

### Ratenbegrenzung
Übermäßig viele Anfragen von derselben IP-Adresse oder demselben API-Schlüssel werden über die Methode `RateLimiter::check()` blockiert. Standardlimit: 60 Anfragen pro Minute.

---

## 📦 4. Sicherheit der Datenübertragung
- **HTTPS:** Für alle API-Endpunkte ist HTTPS erforderlich.
- **Geheimnisse:** API-Schlüssel werden verschlüsselt in der Datenbank gespeichert.
- **Preflight (CORS):** Es werden nur Anfragen von zugelassenen Ursprüngen akzeptiert.

## Checkliste
1. Gibt es bei allen POST-Anfragen eine Nonce-Prüfung?
2. Erfolgt die Verifizierung des API-Schlüssels über `AuthHelper`?
3. Werden sensible Werte in JSON-Antworten maskiert?
4. Ist `RateLimiter` aktiv?

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Details zu Nonce, API-Schlüssel, HMAC und Ratenbegrenzung hinzugefügt. |
