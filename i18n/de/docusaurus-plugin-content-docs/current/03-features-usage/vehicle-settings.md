---
id: vehicle-settings-usage
title: "Globale Fahrzeugeinstellungen"
sidebar_label: "Fahrzeugeinstellungen"
sidebar_position: 5
slug: /features-usage/vehicle-settings
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Mit den globalen Fahrzeugeinstellungen verwaltest du das gemeinsame Verhalten aller Fahrzeuge im System, die angezeigten Datenfelder und die Ausstattungslisten. Du erreichst sie über **MHM Rentiva > Fahrzeugeinstellungen**.

---

## Felddefinitionen

Dieser Tab ist die zentrale Verwaltungsstelle für alle Datenfelder, die die technische Identität eines Fahrzeugs bilden.

### 1. Fahrzeugdetails
Verwende den Button „Namen bearbeiten“, um vordefinierte Felder wie **Tagespreis, Baujahr, Kennzeichen, Marke, Modell, Anzahlung** zu lokalisieren oder umzubenennen.
- **Individuelles Detail hinzufügen:** Füge über die Standardfelder hinaus neue Datenfelder im Text- oder Zahlenformat hinzu (z. B. „Schadenshistorie“, „Versicherungsart“).

### 2. Fahrzeugmerkmale
Komfort- und Sicherheitsausstattung wie Klimaanlage, ABS und Bluetooth. Füge über das Feld „Name des individuellen Merkmals“ neue Ausstattung zu deiner Liste hinzu.

### 3. Fahrzeugausrüstung
Physische Ausrüstung wie Ersatzreifen und Verbandskasten wird hier definiert.

---

## Anzeigeoptionen

In diesem Tab steuerst du, wo und wie die von dir definierten Felder im Frontend erscheinen.

### Sichtbare Kartenelemente (Drag & Drop)
Lege per Drag & Drop fest, welche technischen Daten auf den Fahrzeugkarten (Raster/Liste) in den Suchergebnissen angezeigt werden.
- **Sortierung:** Ziehe Elemente nach oben oder unten, um die Priorität zu ändern (z. B. zuerst Kraftstoffart, dann Getriebe).
- **Ausblenden:** Ziehe ein Element in die rechte Spalte (Verfügbare Elemente), um es zu deaktivieren und auf der Karte auszublenden.

### Hervorgehobene Merkmale in den Fahrzeugdetails
Wähle oben auf der Fahrzeugseite die 4–5 wichtigsten Merkmale aus (z. B. Anzahl der Sitze, Getriebe, Klimaanlage), die der Kunde auf den ersten Blick sehen soll.

### Einstellungen der Fahrzeugvergleichstabelle
Wenn Kunden mehrere Fahrzeuge vergleichen, wählst du über die Checkliste aus, welche Details, Merkmale und Ausrüstung in der Vergleichstabelle erscheinen.
- **Massenaktionen:** Verwende „Alle auswählen“, um die gesamte Ausrüstung in die Vergleichstabelle aufzunehmen.

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>BILD: ANZEIGEOPTIONEN UND KARTENEINSTELLUNGEN</strong><br/>
  <em>mhm-rentiva-display-options-drag-drop</em>
</div>

---

### Zusammenfassung des Abschnitts
- Strukturiere deine Datenbank mit den **Felddefinitionen**.
- Optimiere Design und Benutzererfahrung mit den **Anzeigeoptionen**.
- Passe Listenansichten ohne Programmierung über die **Drag & Drop**-Oberfläche an.

### Änderungsprotokoll
| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Dokumentation mit der aktuellen Plugin-Version synchronisiert. |
| 19.03.2026 | 4.21.2 | Anzeigeoptionen und Drag-&-Drop-Einstellungen anhand der tatsächlichen Oberfläche detailliert beschrieben. |
| 26.02.2026 | 4.21.0 | Erste Version erstellt. |
