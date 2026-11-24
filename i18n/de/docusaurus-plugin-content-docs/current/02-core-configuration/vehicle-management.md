---
id: vehicle-management
title: "Fahrzeugverwaltung (Einstellungen)"
sidebar_label: "Fahrzeugverwaltung"
sidebar_position: 2
slug: /core-configuration/vehicle-management
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Der Tab „Fahrzeugverwaltung“ ist der zentrale Bereich, in dem du die Mietpreise (multiplikatorbasiert) und die Buchungsbeschränkungen für die Fahrzeuge deiner Flotte verwaltest. Du erreichst ihn über **MHM Rentiva > Einstellungen > Fahrzeugverwaltung**.

---

## 💰 Einstellungen für Fahrzeugpreise

Optimiere die Preise aller Fahrzeuge im System zentral an einer Stelle mithilfe von Multiplikatoren.

- **Basispreis-Multiplikator:** Dient dazu, alle Fahrzeugpreise global zu erhöhen oder zu senken (z. B. 1.0 = Normalpreis, 1.2 = 20 % Aufschlag).
- **Wochenendpreis-Multiplikator:** Der Preisaufschlag, der freitags, samstags und sonntags angewendet wird (gib z. B. 1.2 für einen Wochenendzuschlag von 20 % ein).
- **Steuereinstellungen (WooCommerce):** Die Einstellungen „Preise inklusive Steuern“ und „Steuersatz (%)“ sind vollständig in das zentrale Steuersystem von WooCommerce integriert. Änderungen werden aus dem WooCommerce-Panel übernommen.

---

### 🖼️ BILD: PANEL FÜR FAHRZEUGPREISE
*(Einstellungen > Tab „Fahrzeugverwaltung“, Preismultiplikatoren und Steuerfelder)*

---

## 📅 Einstellungen für Fahrzeugverfügbarkeit

Hier legst du die Regeln fest, wie lange und unter welchen Bedingungen Kunden Fahrzeuge mieten können.

- **Minimale / maximale Mietdauer:** Die minimale und maximale Anzahl an Tagen, für die Fahrzeuge gemietet werden können (Standard: 1 – 30 Tage).
- **Tage für Vorausbuchung:** Wie weit im Voraus (ab heute) Kunden eine Buchung vornehmen können (z. B. 365 Tage).
- **Buchung am selben Tag erlauben:** Ist diese Option aktiviert, können Kunden eine Buchungsanfrage für den aktuellen Tag erstellen (Notfallmiete).
- **Standard-Mietstandort (Fallback):** Ist für ein Fahrzeug oder dessen Eigentümer (Anbieter) kein bestimmter Standort festgelegt, verwendet das System diesen „Fallback“-Standort.

---

## 💡 Technische Hinweise

:::tip Logik der Preisberechnung
Das System berechnet den Preis mit folgender Formel:
`Daily Rate × Number of Days × Base Multiplier × [Weekend Multiplier if applicable]`
:::

---

### Zusammenfassung des Abschnitts
- Nutze **Preismultiplikatoren**, um einen Rabatt oder Aufschlag auf einmal für die gesamte Flotte anzuwenden.
- Nutze **Verfügbarkeitsgrenzen**, um deine betrieblichen Rahmenbedingungen festzulegen (min./max. Tage).
- Die **WooCommerce-Integration** sorgt für fehlerfreie Steuer- und Centberechnungen.

### Änderungsprotokoll
| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Dokumentation zur Fahrzeugverwaltung (Einstellungen) auf Grundlage eines Panel-Screenshots und einer Codeanalyse erstellt. |
