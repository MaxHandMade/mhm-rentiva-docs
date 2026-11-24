---
id: vehicle-settings
title: "Fahrzeugeinstellungen"
sidebar_label: "Fahrzeugeinstellungen"
sidebar_position: 6
slug: /core-configuration/vehicle-settings
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Die Seite „Fahrzeugeinstellungen“ ist die Steuerzentrale, in der du sowohl die Datenstruktur (Getriebe, Kraftstoffart, Kennzeichen usw.) als auch das Darstellungsformat für die Fahrzeuge deiner Flotte festlegst. Sie wird über das Menü **MHM Rentiva > Fahrzeugeinstellungen** in zwei Haupt-Tabs verwaltet.

---

## 1. Felddefinitionen

In diesem Tab legst du fest, welche Datenfelder für jede Fahrzeugkarte und Detailseite aktiv sind und welche Pflichtfelder sind.

### 🏠 Fahrzeugdetails
Verwalte die technischen Daten, die auf Fahrzeugkarten und Detailseiten angezeigt werden:
- **Grunddaten:** Tagespreis, Kennzeichen, Modell, Baujahr, Marke, Anzahlung und Verfügbarkeitsstatus.
- **Merkmale & individuelle Details:** Kilometerstand, Anzahl der Sitze, Getriebeart, Hubraum, Farbe, Anzahl der Türen und Kraftstoffart.

### ⚙️ Fahrzeugmerkmale
Wähle die Komfortausstattung, mit der die Fahrzeuge ausgestattet sind (Klimaanlage, ABS, Servolenkung, Bluetooth usw.), und füge eigene Merkmale hinzu.

### 🎒 Fahrzeugausrüstung
Verwalte das physische Zubehör, das im Fahrzeug vorhanden ist (Ersatzreifen, Verbandskasten, GPS-Ortungsgerät usw.).

### ➕ Individuelle Felder hinzufügen
Du möchtest ein Feld hinzufügen, das im System nicht vordefiniert ist? Gib die gewünschte Bezeichnung in das Feld „Name des individuellen Details“ ein, wähle den Datentyp (Text, Zahl usw.) und erstelle deine eigenen technischen Felder.

---

### 🖼️ BILD: FAHRZEUG-FELDDEFINITIONEN
*(Screenshot: MHM Rentiva > Fahrzeugeinstellungen > Tab „Felddefinitionen“)*

---

## 2. Anzeigeoptionen

Dieser Tab steuert das Layout und die Sichtbarkeit der von dir definierten Felder in der Frontend-Oberfläche (für Nutzer sichtbar).

### 🔄 Sichtbare Kartenelemente & Reihenfolge
- **Drag & Drop:** Lege per Drag & Drop fest, welche Informationen auf den Fahrzeugkarten (Listenseite) zuerst erscheinen.
- **Ausblenden:** Entferne Elemente, die du nicht möchtest, aus der Liste „Sichtbare Elemente“, indem du auf die Schaltfläche `x` daneben klickst.

### 🌟 Hervorgehobene Merkmale
Verwalte auf den Fahrzeug-Detailseiten – unabhängig von der Tabelle mit den technischen Daten – die Reihenfolge und das Vorhandensein der oben hervorgehobenen Merkmale (Felder mit hervorgehobenen Icons).

### 📊 Einstellungen der Vergleichstabelle
Wenn ein Nutzer die Fahrzeugvergleichsfunktion verwendet, wähle einzeln aus, welche Details, Merkmale oder Ausrüstungsgegenstände in der Tabelle verglichen werden.

---

### 🖼️ BILD: ANZEIGE- & REIHENFOLGE-EINSTELLUNGEN
*(Screenshot: MHM Rentiva > Fahrzeugeinstellungen > Tab „Anzeigeoptionen“)*

---

## 💡 Technische Hinweise & Empfehlungen

:::important Datensicherheit
Wenn du ein Feld in „Felddefinitionen“ deaktivierst, werden die Daten, die du zuvor für dieses Feld eingegeben hast, **nicht gelöscht** – sie werden lediglich vor den Nutzern ausgeblendet. Die Daten erscheinen wieder, sobald du das Feld erneut aktivierst.
:::

- **Reihenfolge:** Die Drag-&-Drop-Reihenfolge gilt für Fahrzeugtabellen, Listenansichten und Listen auf der Seite „Mein Konto“.
- **Icons:** Das System weist Standardmerkmalen und -ausrüstung automatisch passende Icons zu.

### Zusammenfassung des Abschnitts
- **Felddefinitionen:** Legt fest, welche Daten erfasst werden.
- **Anzeigeoptionen:** Legt fest, wie und in welcher Reihenfolge die Daten dargestellt werden.
- **Individuelle Felder:** Ermöglicht das Hinzufügen beliebig vieler technischer Details.

### Änderungsprotokoll
| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Felddefinitionen und Anzeigeoptionen ausführlich ergänzt. |
| 26.02.2026 | 4.21.0 | Erste Version erstellt. |
