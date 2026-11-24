---
id: license-server-protocols
title: "Lizenzserver und Sicherheitsprotokolle"
sidebar_label: "Lizenzprotokolle"
sidebar_position: 105
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-security_hardened-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
MHM Rentiva wickelt die Lizenzvalidierung und -aktivierung mit dem externen Lizenzserver (`https://api.maxhandmade.com/v1`) über ein asynchrones Protokoll mit hoher Sicherheit ab.
:::

# 🛡️ Lizenzserver und Sicherheitsprotokolle

Das System schreibt eine Signierung mit **HMAC-SHA256** sowie eine Datenverschlüsselung vor, um Manipulationen von Lizenzschlüsseln und Man-in-the-Middle-Angriffe zu verhindern.

---

## 🏗️ 1. Kommunikationsarchitektur

Das Plugin verwaltet alle Lizenzvorgänge über den Dienst `LicenseManager`.

| Kriterium | Technisches Detail |
| :--- | :--- |
| **Signaturmethode** | HMAC-SHA256 (Hash-based Message Authentication Code) |
| **Verschlüsselung** | Der Datenstrom wird über `TLS 1.2/1.3` (HTTPS) verschlüsselt. |
| **Verifizierung** | Zweiseitige Signaturprüfung mithilfe eines gemeinsamen HMAC-Secrets. |
| **API-Schlüssel** | `MHMRENTIVA_LICENSE_API_KEY` wird zur Identifizierung gegenüber dem Server verwendet. |

---

## ✍️ 2. Signaturerzeugung

Für jede Anfrage wird dynamisch eine Signatur erzeugt und über den Header `X-MHM-SIGNATURE` gesendet.

### A. Kanonische Nachrichtenstruktur
Vor dem Signieren werden die folgenden Daten zur Rohnachricht verkettet:
1. **HTTP-Methode:** (z. B. `POST`)
2. **Kanonischer Pfad:** (z. B. `/v1/licenses/validate`)
3. **Zeitstempel:** (z. B. `1709825400`)
4. **Roher Body:** Der im JSON-Format gesendete Datensatz.

### B. PHP-Codebeispiel für die Signatur
```php
$message   = "POST" . "/v1/licenses/validate" . "1709825400" . $raw_body;
$signature = hash_hmac('sha256', $message, $hmac_secret);
```

---

## 📡 3. HTTP-Sicherheitsheader

Benutzerdefinierte Header, die zur Absicherung der Anfragen verwendet werden:

- **`X-MHM-API-KEY`:** Identifizierender Lizenz-API-Schlüssel.
- **`X-MHM-TIMESTAMP`:** Zeitstempel der Anfrage (Toleranz von +/- 300 Sekunden).
- **`X-MHM-SIGNATURE`:** Mit `HMAC-SHA256` erzeugte digitale Signatur.
- **`X-MHM-SITE-HASH`:** Die eindeutige, einwegverschlüsselte Identität der Website.
- **`X-Environment`:** Modus (`production`, `staging`, `development`).

---

## ⏳ 4. Fehlerbehandlung und Kulanzzeitraum

Wenn die Verbindung zum Server unterbrochen wird, deaktiviert sich das Plugin nicht sofort:

1. **7-tägiger Kulanzzeitraum:** Wenn die Website zuvor aktiv war und seit der letzten erfolgreichen Prüfung weniger als 7 Tage vergangen sind, behält das Plugin den Status „Aktiv“ bei, selbst wenn ein Verbindungsfehler auftritt.
2. **Prüfung im Offline-Modus:** Kritische Funktionen (z. B. das Annehmen von Zahlungen) werden in diesem Zeitraum nicht eingeschränkt. Kann jedoch bis zum Ende des 7. Tages keine gültige Verifizierung durchgeführt werden, werden die Pro-Funktionen deaktiviert.
3. **SSL-Verifizierung:** In Produktivumgebungen ist die Verifizierung des SSL-Zertifikats verpflichtend.

## Zusammenfassung des Abschnitts
- Das Lizenzprotokoll schützt das geistige Eigentum des Plugins und die Integrität der Benutzerdaten.
- HMAC-SHA256 garantiert, dass Anfragen nicht manipuliert wurden (Integrität).
- Der Kulanzzeitraum stellt sicher, dass Serverausfälle die Benutzererfahrung nicht beeinträchtigen.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | HMAC-Signaturarchitektur, Kulanzzeitraum und Regeln für den Offline-Modus detailliert beschrieben. |
