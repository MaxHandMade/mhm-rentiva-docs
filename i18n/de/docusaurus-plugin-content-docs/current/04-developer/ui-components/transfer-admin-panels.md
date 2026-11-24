---
id: transfer-admin-panels
title: "Transfer-Admin-Panels (UI & Dashboards)"
sidebar_label: "Transfer-Admin-Panels"
sidebar_position: 7
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite dokumentiert eine Funktion des Add-ons **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und setzt voraus, dass Pro zusätzlich zu Lite installiert ist und eine gültige Lizenz vorliegt.
Die vollständige Aufteilung findest du unter [Editionen – Lite vs. Pro](/docs/), Pro erhältst du unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Zweck
Diese Seite beschreibt die technische Architektur und die Regeln zur Dateneingabe der Admin-Oberflächen, mit denen die Fahrzeug-Transfer-Abläufe von Rentiva (Flughafen-VIP, Intercity usw.) verwaltet werden.
:::

# 🛣️ Transfer-Admin-Panels

Das Transfer-Modul arbeitet – anders als die normale Fahrzeugvermietung – mit einer standortbasierten Netzstruktur. Die Klasse `TransferAdmin` steuert zentral die Bildschirme (Standorte, Routen, Statistiken), auf denen dieses Netz verwaltet wird.

---

## 🏗️ Architekturkomponenten

Das Modul nutzt drei Hauptkomponenten für Dateneingabe und Visualisierung:
1.  **Statistikkarten:** Oberer Bereich mit Daten zu Standorten, Routen und dem letzten Vorgang.
2.  **Standortverwaltung:** Festlegung von Transferpunkten wie Flughäfen, Hotels und Häfen.
3.  **Routenkonfiguration:** Regeln für Entfernung, Dauer und Preise zwischen zwei Standorten.

---

## 📊 Transfer-Statistikkarten

Die Methode `render_transfer_stats()` oben im Admin-Panel zeigt operative Daten in Echtzeit:

- **Standorte gesamt:** Aktive Transferpunkte in der Tabelle `rentiva_transfer_locations`.
- **Aktive Routen:** Festgelegte und bepreiste gültige Routen.
- **Letzter Vorgang:** Datum der neuesten Buchung vom Typ `transfer`.

---

## Standorttypen

Das System unterstützt die folgenden internen Typen, die die im Dashboard angezeigten Symbole bestimmen:
- **Flughafen:** Transferpunkte an Flughäfen.
- **Hotel:** Unterkünfte.
- **Hafen:** Hafen- und Kreuzfahrtterminals.
- **Bahnhof:** Bahn- und Busterminals.
- **Stadtzentrum:** Punkte im Stadtzentrum.

### Felder des Standortformulars

Seit v4.23.0 enthält das Standortformular ein Feld **city** (Stadt). Dieses Feld wird in der Anbieter-Marktplatz-Integration für die Filterung nach Städten verwendet:

| Feld | Typ | Beschreibung |
|---|---|---|
| `name` | VARCHAR(255) | Name des Standorts |
| `type` | ENUM | airport, hotel, port, station, city_center |
| `city` | VARCHAR(100) | Stadt, in der sich der Standort befindet (v4.23.0) |
| `lat` / `lng` | DECIMAL | Koordinaten |

---

## Routenformular und Preisfelder

In v4.23.0 wurde dem Routenformular ein Feld **max_price** hinzugefügt. Im Anbieter-Marktplatz legen Anbieter ihre eigenen Preise innerhalb des vom Admin festgelegten Bereichs `min_price`/`max_price` fest:

| Feld | Typ | Beschreibung |
|---|---|---|
| `origin_id` | BIGINT | Startstandort |
| `destination_id` | BIGINT | Zielstandort |
| `base_price` | DECIMAL(10,2) | Grundpreis |
| `min_price` | DECIMAL(10,2) | Mindestpreis für Anbieter |
| `max_price` | DECIMAL(10,2) | Höchstpreis für Anbieter (v4.23.0) |
| `distance_km` | FLOAT | Entfernung (km) |
| `duration_min` | INT | Geschätzte Dauer (Min.) |

---

## Meta-Box für Anbieterfahrzeuge (`VehicleTransferMetaBox.php`)

Wenn du im Admin-Panel das Fahrzeug eines Anbieters bearbeitest, zeigt `VehicleTransferMetaBox` die Stadtinformation des Anbieters an. So sieht der Admin, auf die Routen welcher Stadt der Anbieter zugreifen kann.

---

## Speichern von Daten und Sicherheit

Alle Formularvorgänge werden asynchron und sicher (per Nonce geschützt) über `admin_post`-Hooks verarbeitet:

```php
// Example: hooks triggered during route saving
add_action('admin_post_mhmrentiva_save_route', array(self::class, 'handle_save_route'));
add_action('admin_post_mhmrentiva_delete_route', array(self::class, 'handle_delete_route'));
```

---

## 📦 Abwärtskompatibilität der Datenbank (DB-Fallback)

Transfer-Tabellen verwenden das moderne Präfix `rentiva_`, erkennen über die Methode `resolve_table_name()` aber auch automatisch ältere `mhm_`-Tabellen aus früheren Systemen und erhalten deren Daten.

## Zusammenfassung des Abschnitts
- Transfer-Panels folgen einem **Statistik-zuerst**-Ansatz.
- Das Feld **city** im Standortformular ist für die Anbieter-Marktplatz-Integration erforderlich.
- Die Felder **min_price/max_price** im Routenformular legen die Preisspanne für Anbieter fest.
- `VehicleTransferMetaBox` zeigt beim Bearbeiten eines Anbieterfahrzeugs die Stadtinformation an.
- Alle Dateneingaben erfolgen atomar über die Klasse `TransferAdmin`.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 27.03.2026 | 4.23.0 | Feld „Stadt“ zum Standortformular hinzugefügt, Feld max_price zum Routenformular hinzugefügt, Stadtinformation des Anbieters in VehicleTransferMetaBox hinzugefügt. |
| 19.03.2026 | 4.21.2 | Seite aktualisiert, um die TransferAdmin-Statistikkarten und die moderne Standortstruktur abzubilden. |
