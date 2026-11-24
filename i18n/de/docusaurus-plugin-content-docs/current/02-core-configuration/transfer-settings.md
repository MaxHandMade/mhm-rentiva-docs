---
id: transfer-settings
title: "Transfer-Einstellungen"
sidebar_label: "Transfer-Einstellungen"
sidebar_position: 4
slug: /core-configuration/transfer-settings
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Aktualisiert](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite dokumentiert eine Funktion des Add-ons **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und setzt voraus, dass Pro zusätzlich zu Lite installiert ist und eine gültige Lizenz vorliegt.
Siehe [Editionen – Lite vs. Pro](/docs/) für die vollständige Aufteilung oder hol dir Pro unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

Im Tab „Transfer-Einstellungen“ konfigurierst du Zahlungsmethoden, Anzahlungssätze und benutzerdefinierte Standorttypen für VIP-Transferdienste. Du erreichst ihn über den Tab **MHM Rentiva > Einstellungen > Transfer-Einstellungen**.

---

## 🛠️ Schnellzugriff-Werkzeuge

In der oberen rechten Ecke der Seite erscheinen Schaltflächen als Abkürzungen zur Verwaltung von Transfer-Vorgängen:

- **Standortverwaltung:** Leitet zu der Seite weiter, auf der du Flughäfen, Hotels oder benutzerdefinierte Zonen festlegen kannst.
- **Routen verwalten:** Führt zu dem Bereich, in dem du Transferpreise und Verbindungen zwischen festgelegten Standorten definierst.

---

## 💳 Transfer-Konfiguration

Regeln, die festlegen, wie Kunden für Transfer-Buchungen bezahlen:

- **Zahlungsart:**
    - **Vollständige Zahlung erforderlich:** Der gesamte Betrag wird zum Zeitpunkt der Buchung eingezogen.
    - **Anzahlung:** Nur ein festgelegter Prozentsatz wird eingezogen; der Rest wird bei der Leistungserbringung bezahlt.
    - **Zahlung vor Ort (bar):** Bei der Buchung wird nichts berechnet; die vollständige Zahlung erfolgt zum Zeitpunkt des Transfers.
- **Anzahlungssatz (%):** Wenn die Zahlungsart auf „Anzahlung“ gesetzt ist, legt dieser Wert den Prozentsatz fest, der online eingezogen wird (Standard: 20 %).
- **Benutzerdefinierte Standorttypen:** Gib hier Namen für benutzerdefinierte Kategorien ein, die über die Standardtypen (Flughafen/Hotel) hinausgehen (z. B. Stadion, Messezentrum). Gib einen Eintrag pro Zeile ein.

---

### 🖼️ BILD: TRANSFER-EINSTELLUNGEN-PANEL
*(Tab „Einstellungen > Transfer-Einstellungen“, Zahlungs- und benutzerdefinierte Standortfelder)*

---

## 💡 Verwandte Links
Für die vollständige Nutzung des Transfer-Systems siehe die folgende Dokumentation:
- [Standortdefinitionen](../03-features-usage/locations.md)
- [Transfer-Routen & Preise](../03-features-usage/transfer-routes.md)

---

### Zusammenfassung des Abschnitts
- Verwende **Zahlungsarten**, um deine Einzugsstrategie (vollständig/teilweise) festzulegen.
- Verwende **Benutzerdefinierte Standorte**, um die Taxonomie des Systems zu erweitern.
- Verwende die **Schnellzugriff**-Schaltflächen, um direkt zu den Standort- und Routenseiten zu springen.

### Änderungsprotokoll
| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Dokumentation der Transfer-Einstellungen anhand eines Panel-Screenshots und einer Code-Analyse aktualisiert. |
