---
id: vip-transfer
title: "VIP-Transfer-Modul"
sidebar_label: "VIP-Transfer"
sidebar_position: 10
slug: /features-usage/vip-transfer
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite dokumentiert eine Funktion des Add-ons **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und erfordert, dass Pro zusätzlich zu Lite installiert ist, sowie eine gültige Lizenz.
Siehe [Editionen — Lite vs. Pro](/docs/) für die vollständige Aufteilung, oder hol dir Pro unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

Das VIP-Transfer-Modul dient dazu, Beförderungsleistungen mit Chauffeur (Flughafentransfers, Überlandfahrten usw.) getrennt von der regulären Fahrzeugvermietung zu verwalten. Das Modul basiert auf routenbasierter Preisgestaltung und Kapazitätskontrolle.

---

## Transferrouten

Unter **MHM Rentiva > Transferrouten** legst du die Orte fest, die du bedienst, sowie die Preise zwischen diesen Orten.

### 1. Standorte definieren
Lege die Orte an, an denen Transfers beginnen oder enden (Flughafen, Hotel, Stadtzentrum usw.).
- **Tipp:** Denk daran, die Koordinaten der Standorte für die Kartenintegration einzugeben.

### 2. Route und Preisgestaltung
Definiere die Hauptroute zwischen zwei Standorten.
- **Pauschalpreis:** Lege einen festen Preis pro Route fest (`base_price`).
- **Höchstpreis:** Die Preisobergrenze, die Anbieter festlegen können (`max_price`). *(v4.23.0)*
- **Kilometerbasiert:** Dynamische Preisgestaltung, die sich mit zunehmender Entfernung ändert.
- **Anbieterpreis:** In einer Struktur mit mehreren Anbietern kann jeder Anbieter seinen eigenen Routenpreis festlegen. *(v4.23.0)*

---

## Kapazität und Fahrzeugkompatibilität

Der wichtigste Faktor bei Transferbuchungen ist die Anzahl der Fahrgäste und Gepäckstücke.
- **Anzahl der Fahrgäste:** Die Filterung basiert auf der in der Fahrzeugregistrierung angegebenen Sitzplatzkapazität.
- **Gepäckkapazität:** Die im Buchungsformular angegebene Anzahl der Gepäckstücke wird mit dem Gepäckvolumen des Fahrzeugs abgeglichen.

:::warning Wichtig
Wenn ein Fahrzeug ein „VIP-Minibus“ mit einer Kapazität von 8 Personen ist, erscheint es nicht in den Ergebnissen, wenn eine Gruppe von 10 Personen sucht.
:::

---

## Routenbasierte Suchmaschine (v4.23.0)

Die Transfer-Suchmaschine wurde in v4.23.0 neu aufgebaut:
- Fahrzeuge werden anhand der Routen gefiltert, die zu den ausgewählten Abhol- und Rückgabeorten passen.
- Wenn ein Anbieterpreis vorhanden ist, wird dieser verwendet; andernfalls wird ersatzweise `base_price` der Route angewendet.
- Die Kapazität für Fahrgäste und Gepäck wird automatisch geprüft.

---

## Benutzerablauf und Buchung

1. **Suche:** Der Benutzer wählt einen Abhol- und einen Rückgabeort, Datum/Uhrzeit sowie die Anzahl der Fahrgäste aus.
2. **Fahrzeugauswahl:** Fahrzeuge, die zur Route und zur Kapazität passen, werden mit den Anbieterpreisen aufgelistet.
3. **Zahlung:** Die Zahlung wird über WooCommerce abgeschlossen.
4. **Bestätigung:** Im Admin-Bereich erscheint eine Buchung vom Typ „Transfer“.

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>BILD FOLGT IN KÜRZE: Transfer-Suchformular</strong><br/>
  <em>Frontend-Ansicht der Transfer-Suchmaschine.</em>
</div>

---

## Technischer Hinweis: Hooks und Filter

Entwickler können die Transfer-Preisgestaltung anpassen oder zusätzliche Regeln hinzufügen:

```php
// To filter the transfer price:
add_filter('mhmrentiva_transfer_price', function($price, $route_id) {
    // Custom campaign logic
    return $price * 0.9; 
}, 10, 2);
```

---

### Zusammenfassung des Abschnitts
- **Transfer** ist ein auf Routen und Kapazität ausgerichtetes Modul.
- Die **Preisgestaltung** kann fest oder entfernungsbasiert sein.
- **Kapazitätsgrenzen** (Fahrgäste/Gepäck) werden vom System automatisch durchgesetzt.

### Änderungsprotokoll
| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Dokumentation mit der aktuellen Plugin-Version synchronisiert. |
| 26.03.2026 | 4.23.0 | Routenbasierte Suchmaschine, Anbieterpreise, max_price und Stadt-zu-Ort-Hierarchie hinzugefügt. |
| 18.03.2026 | 4.21.2 | Inhalt an das Hybridmodell angepasst. |
| 26.02.2026 | 4.21.0 | Erste Version erstellt. |
