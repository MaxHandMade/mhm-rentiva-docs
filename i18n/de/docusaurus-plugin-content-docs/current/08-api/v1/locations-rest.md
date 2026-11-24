---
id: locations-rest
title: "Standortdienste (Locations REST)"
sidebar_label: "Locations REST"
sidebar_position: 60
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Dieser Endpunkt dient dazu, die im System definierten Vermietungs- und Transfer-Standorte (Flughäfen, Hotels, Stadtzentren usw.) aufzulisten.
:::

# 📍 Endpunkt für Standortdienste

Die Standortdaten werden für die Module „Rent-a-Car“ (Vermietung) und „Transfer“ aus einer zentralen Quelle bereitgestellt. Die Klasse `LocationProvider` verarbeitet die von diesem Endpunkt zurückgegebenen Daten, um UI-Komponenten zu befüllen.

---

## 📍 Endpunkt-Details
- **URL:** `/wp-json/mhm-rentiva/v1/locations`
- **Methode:** `GET`
- **Berechtigung:** Öffentlich

---

## 🔍 1. Filter- und Abfrageparameter

Mit den folgenden Parametern kannst du die Standortliste nach Bedarf eingrenzen:

| Parameter | Typ | Werte | Beschreibung |
|---|---|---|---|
| `type` | `string` | `rental`, `transfer`, `both` | Filtert nach Diensttyp. |
| `class` | `string` | `airport`, `city`, `hotel` | Filtert nach Standortkategorie. |
| `active_only` | `bool` | `0`, `1` | Gibt nur veröffentlichte Standorte zurück (Standard: `1`). |
| `search` | `string` | Freitext | Sucht im Standortnamen oder -code. |

---

## 📤 2. Beispiel für die Antwortstruktur

```json
{
  "success": true,
  "data": [
    {
      "id": 101,
      "title": "İstanbul Havalimanı (IST)",
      "type": "both",
      "class": "airport",
      "coordinates": {
        "lat": 41.2752,
        "lng": 28.7519
      },
      "code": "IST"
    },
    {
      "id": 102,
      "title": "Sabiha Gökçen Havalimanı (SAW)",
      "type": "both",
      "class": "airport",
      "coordinates": {
        "lat": 40.8986,
        "lng": 29.3092
      },
      "code": "SAW"
    }
  ]
}
```

---

## ⚡ 3. Performance und Caching

Da sich die Daten der Standortliste nur selten ändern:
- **`MetricCacheManager`:** Speichert die Standortliste 1 Stunde lang im Cache.
- **`LocationProvider`:** Minimiert die JSON-Größe, indem bei der Rückgabe nur die notwendigen Felder (ID, Titel, Koordinaten) ausgewählt werden.

---

## 🚀 4. Hinweise zum Betrieb
- **Geografische Daten:** Koordinaten ermöglichen eine kartenbasierte Auswahl.
- **Transfer-Integration:** Die Berechnungen von Transfer-Entfernung und -Preis basieren auf den von diesem Endpunkt zurückgegebenen IDs.
- **SEO-freundlich:** Die Felder `title` und `code` ermöglichen benutzerfreundliche Suchen in Suchformularen.

## Zusammenfassung des Abschnitts
- Der Locations-Endpunkt ist die Grundlage aller standortbasierten Module.
- Bietet flexible Filterung nach Typ und Klasse.
- Mit `MetricCacheManager` für hohe Performance optimiert.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Unterstützung für Koordinaten, Filter nach Diensttyp und Details zum Caching hinzugefügt. |
