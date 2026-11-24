---
id: integration-settings
title: "Integrationseinstellungen (REST API)"
sidebar_label: "Integrationseinstellungen"
sidebar_position: 13
slug: /core-configuration/integration-settings
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Der Tab „Integrationseinstellungen“ ist der Bereich, in dem du die REST-API-Infrastruktur verwaltest, über die MHM Rentiva mit externen Anwendungen (mobile Apps, Websites von Drittanbietern usw.) kommuniziert. Du erreichst ihn über **MHM Rentiva > Einstellungen > Integrationseinstellungen**.

---

## ⚡ REST-API-Konfiguration

Grundlegende API-Parameter zur Sicherung von Systemleistung und Sicherheit:

### 1. Ratenbegrenzung
- **API-Ratenbegrenzung:** Beschränkt die Anfragehäufigkeit, um missbräuchliche Nutzung zu verhindern.
- **Limit für authentifizierte Anfragen:** Maximale Anzahl an Anfragen pro Minute für authentifizierte Benutzer (z. B. 60).
- **Limit für öffentliche Anfragen:** Maximale Anzahl an Anfragen pro Minute für anonyme Besucher (z. B. 10).

### 2. Token-Einstellungen
- **Token-Ablauf (Stunden):** Die Gültigkeitsdauer ausgegebener API-Schlüssel (z. B. 24 Stunden).
- **Token-Aktualisierung:** Ermöglicht es, alte Tokens durch neue zu ersetzen, sodass die Sitzung erhalten bleibt.

### 3. Sicherheitseinstellungen
- **HTTPS erforderlich:** Erzwingt SSL-Verschlüsselung für die gesamte API-Kommunikation.
- **User-Agent-Filter:** Blockiert Bots und Scraping-Tools wie `curl` und `wget`.
- **IP-Whitelist:** Beschränkt den Zugriff auf bestimmte IP-Adressen (kommagetrennte Liste).

### 4. API-Caching
- Speichert API-Antworten für einen festgelegten Zeitraum (in Sekunden), um die Datenbanklast zu verringern.

---

## 🔑 Sichere API-Zugriffstokens

Erstelle hier eigene Zugriffsschlüssel, damit externe Anwendungen auf deine Daten zugreifen können:

- **Client-ID:** Ein Name, der angibt, für welche Anwendung der Schlüssel bestimmt ist (z. B. „Android-App“).
- **Berechtigungsstufe:**
    - **READ:** Kann Daten nur auflisten.
    - **WRITE:** Kann Buchungen erstellen oder aktualisieren.
    - **ADMIN:** Vollzugriff.

---

### 🖼️ BILD: API-VERWALTUNGSBEREICH
*(Einstellungen > Tab „Integrationseinstellungen“, Bereich für Ratenbegrenzung und API-Schlüsselverwaltung)*

---

## 📚 Endpunkt-Referenz für Entwickler

In diesem Abschnitt werden alle API-Endpunkte aufgeführt, die das Plugin bereitstellt. Für jeden Endpunkt werden folgende Informationen angegeben:

- **Methode:** GET, POST usw.
- **Endpunkt:** API-Adresse (z. B. `mhm-rentiva/v1/vehicles`).
- **Namespace:** Standardmäßig `mhm-rentiva/v1`.

:::note Erweiterte Diagnose
Aktiviere während der Entwicklung „Fehlerprotokollierung“, um API-Fehler im Detail nachzuverfolgen. Lass diese Option auf Live-Websites aus Sicherheitsgründen deaktiviert.
:::

---

### Zusammenfassung des Abschnitts
- Nutze **API-Sicherheit**, um deine Daten vor unbefugtem externem Zugriff zu schützen.
- Nutze **Zugriffstokens**, um deine eigenen mobilen Anwendungen mit dem Plugin zu verbinden.
- Nutze die **Endpunktliste** als fertige technische Referenz für deine Entwickler.

### Änderungsprotokoll
| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Dokumentation der Integrationseinstellungen (REST API) mit vollständigen Details zu Sicherheit und Schlüsselverwaltung erstellt. |
