---
id: locations
title: "Standortverwaltung"
sidebar_label: "Standortverwaltung"
sidebar_position: 7
slug: /features-usage/locations
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

In der Standortverwaltung legst du die physischen Punkte (Flughafen, Büro, Hotel usw.) für deine Fahrzeugvermietung und deine Transfer-Abläufe fest. Du erreichst sie über **MHM Rentiva > Standorte**.

Fahrzeuge und Transfer-Routen im System bauen auf diesen Standorten auf.

---

## 📍 Neuen Standort hinzufügen und Details

Gib beim Anlegen eines Standorts folgende Informationen ein:

- **Standortname:** Der Titel, den der Kunde sieht (z. B. Istanbul Airport (IST)).
- **Standorttyp:** Auswahl einer Kategorie wie Flughafen, Hotel oder Büro.
- **Stadt:** Die Stadt, zu der der Standort gehört. Dieses Feld ist entscheidend für die **Hierarchie Stadt → Punkt**. Anbieter sehen nur Standorte und Routen in ihrer eigenen Stadt. *(Hinzugefügt in v4.23.0)*
- **Adresse und Koordinaten:** Die genaue Position auf der Karte (erforderlich für die Google-Maps-Integration).
- **Öffnungszeiten:** Die Zeitfenster, in denen dieser Standort für die Abholung und Rückgabe von Fahrzeugen geöffnet ist.
- **Zusatzgebühren:** Hier werden standortspezifische Gebühren für Zustellung/Rückgabe (Einweg) festgelegt.

---

### 🖼️ BILD: PANEL DER STANDORTVERWALTUNG
*(Standortliste und Formular zum Anlegen eines neuen Standorts)*

---

## 🚘 Fahrzeugzuweisung

Du kannst jedes Fahrzeug einem oder mehreren Standorten „zuweisen“. So werden, wenn ein Kunde Istanbul Airport auswählt, nur Fahrzeuge aufgelistet, die diesen Bereich bedienen.

---

## 🗺️ Transfer-Verknüpfung

Standorte bilden die Abhol- und Rückgabepunkte für das VIP-Transfer-Modul. Eine Transfer-Route kann erst erstellt werden, wenn hier ein Standort definiert ist.

### Hierarchie Stadt → Punkt (v4.23.0)

Seit v4.23.0 hat jeder Standort ein Feld **Stadt**. Diese Hierarchie ermöglicht Folgendes:
- **Admin:** Kann alle Standorte und Routen ansehen und bearbeiten.
- **Anbieter:** Kann nur Standorte in der Stadt sehen, die in seiner Bewerbung angegeben ist. Das Formular zum Einreichen von Fahrzeugen listet nur Standorte und Routen in seiner eigenen Stadt auf.
- **Suchmaschine:** Die routenbasierte Filterung zeigt dem Kunden nur aktive Fahrzeuge in der jeweiligen Stadt.

:::tip Datenbank
Diese Funktion basiert auf der Spalte `city` VARCHAR(100), die mit `DatabaseMigrator v3.4.0` eingeführt wurde.
:::

---

### Zusammenfassung des Abschnitts
- **Punkte festlegen:** Lege deine Einsatzgebiete klar fest.
- **Öffnungszeiten:** Blockiere Zustellungen außerhalb der Öffnungszeiten oder lege Zuschläge dafür fest.
- **Standortbasierter Bestand:** Biete deine Fahrzeuge in den richtigen Regionen an.

### Änderungsprotokoll
| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Dokumentation mit der aktuellen Plugin-Version synchronisiert. |
| 26.03.2026 | 4.23.0 | Dokumentation zum Feld „Stadt“ und zur Hierarchie Stadt→Punkt hinzugefügt. |
| 19.03.2026 | 4.21.2 | Anleitung zur Standortverwaltung erstellt. |
