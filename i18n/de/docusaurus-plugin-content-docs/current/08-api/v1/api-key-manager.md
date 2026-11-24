---
id: api-key-manager
title: "API-Schlüsselverwaltung (API Key Manager)"
sidebar_label: "API Key Manager"
sidebar_position: 30
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
`APIKeyManager` ist die zentrale Schlüsselverwaltung, über die MHM Rentiva sicher mit der Außenwelt kommuniziert. Diese Seite erklärt den Lebenszyklus der Schlüssel und die Sicherheitsstandards, die für sie gelten.
:::

# 🔑 API-Schlüsselverwaltung

API-Schlüssel sind digitale Identitäten, mit denen Software von Drittanbietern (mobile Apps, ERP-Systeme, Buchhaltungssoftware usw.) auf Rentiva-Daten zugreifen kann.

---

## 🏗️ 1. Rolle und Architektur der Komponente

Die Klasse `APIKeyManager` arbeitet mit `AuthHelper` zusammen, um folgende Aufgaben zu erledigen:
- **Eindeutigkeit:** Stellt sicher, dass jeder Schlüssel im gesamten System eindeutig ist.
- **Berechtigungsvergabe:** Weist Schlüsseln die Berechtigung `read_only` oder `read_write` zu.
- **Überwachung:** Protokolliert über `AdvancedLogger`, welcher Schlüssel wann und von welcher IP-Adresse verwendet wurde.

---

## 🔄 2. Lebenszyklus eines Schlüssels

### Erzeugung
- Schlüssel werden aus kryptografisch sicheren Zufallszeichenfolgen (`wp_generate_password`) erzeugt.
- In der Datenbank wird die gehashte Version des erzeugten Schlüssels gespeichert.

### Aktivierung und Verwendung
- Ein Schlüssel ist ab dem Moment seiner Erzeugung aktiv.
- Er wird bei Anfragen über den Header `X-Rentiva-API-Key` gesendet.

### Rotation
- **Sicherheitsrichtlinie:** Es wird empfohlen, Schlüssel alle 90 Tage zu rotieren.
- **Übergangsfrist:** Wenn ein neuer Schlüssel erzeugt wird, kann der alte (je nach Konfiguration) noch 24 Stunden lang weiter funktionieren, „bis er ungültig wird“.

---

## 🛡️ 3. Sicherheits- und Datenschutzregeln

- **Protokollierung verboten:** Der Klartextwert von API-Schlüsseln darf niemals in Logdateien geschrieben werden (`debug.log`).
- **Datenbanksicherheit:** Schlüssel werden in der Datenbank mit `MD5` oder `SHA-256` gehasht gespeichert (gemäß WP-Standards).
- **IP-Beschränkung:** Bestimmte API-Schlüssel können so beschränkt werden, dass sie nur Anfragen von festgelegten IP-Adressen akzeptieren.

---

## 🛠️ 4. Empfehlungen für den Betrieb

1. **Trennung der Umgebungen:** Verwende für Staging- und Produktionsumgebungen immer unterschiedliche Schlüssel.
2. **Minimale Rechte:** Wenn eine Integration nur Daten liest, weise ihr niemals die Berechtigung `read_write` zu.
3. **Sofortiger Widerruf:** Bei Verdacht auf ein Datenleck sollte der betreffende Schlüssel mit einem einzigen Klick im Admin-Bereich widerrufen werden.

## Zusammenfassung des Abschnitts
- `APIKeyManager` ist das Herzstück der gesamten REST-Sicherheit.
- Schlüssel werden niemals im Klartext gespeichert oder weitergegeben.
- Regelmäßige Rotation und IP-Beschränkung gelten als Best Practices.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Details zu Schlüssel-Lebenszyklus, Übergangsfrist und IP-Beschränkung hinzugefügt. |
