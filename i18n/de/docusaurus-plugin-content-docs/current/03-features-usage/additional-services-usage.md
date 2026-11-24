---
id: additional-services-usage
title: "Verwaltung der Zusatzleistungen"
sidebar_label: "Zusatzleistungen"
sidebar_position: 9
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Zusatzleistungen sind der Verwaltungsbereich, in dem du Produkte definierst, die Buchungen von Mietfahrzeugen einen Mehrwert verleihen (Babysitz, GPS, Vollkaskoversicherung, Hafengepäck usw.). Du erreichst diesen Bereich über **MHM Rentiva > Zusatzleistungen**.

Diese Leistungen werden zur Buchungssumme hinzugefügt und verbessern die betriebliche Effizienz.

---

## 🧺 Neue Zusatzleistung erstellen

Beim Hinzufügen eines Produkts oder einer Leistung werden die folgenden Parameter konfiguriert:

- **Name der Leistung:** Der Name, den der Kunde im Warenkorb sieht (z. B. Babysitz).
- **Beschreibung:** Ausführliche Informationen zum Produkt und zu seinen Nutzungsbedingungen.
- **Preisgestaltung:**
    - **Tagespreis:** Wird für jeden Tag der Miete berechnet (z. B. 50 $ / Tag).
    - **Festpreis:** Wird einmal pro Buchung berechnet (z. B. Versicherungspaket 500 $).
- **Pflichtleistung:** Wenn aktiviert, kann der Kunde keine Buchung ohne diese Leistung abschließen (z. B. Standardversicherung).
- **Maximale Menge:** Wie viele Einheiten für ein einzelnes Fahrzeug ausgewählt werden können (z. B. max. 2 Babysitze).

---

### 🖼️ BILD: VERWALTUNG DER ZUSATZLEISTUNGEN
*(Liste der Zusatzleistungen und Preiseinstellungen)*

---

## 🚘 Fahrzeugkompatibilität (Zuweisung)

Nicht jede Leistung ist für jedes Fahrzeug geeignet.
- **Fahrzeugspezifisch:** Du kannst einen Gepäckservice für 8–9 Personen ausschließlich für die Gruppe „Minibus“ definieren.
- **Globale Zuweisung:** Einige Leistungen (z. B. internationale Ausreisegenehmigung) werden automatisch auf die gesamte Flotte angewendet.

---

## 🛒 Kundenauswahl und Warenkorbverwaltung

Der Kunde sieht diese Leistungen als Liste auf der Fahrzeugdetailseite oder im Checkout-Schritt.
- **Echtzeitberechnung:** Wenn eine Zusatzleistung ausgewählt wird, aktualisiert sich der Gesamtbetrag sofort per Ajax.
- **Zusammenfassung:** Die ausgewählten Zusatzleistungen werden sowohl in der E-Mail an den Kunden als auch im Buchungsdatensatz im Adminbereich einzeln aufgeführt.

---

---

## 🆕 v4.36.0 — Kontext & Preistyp

Ab v4.36.0 hat jede Zusatzleistung zwei neue Felder auf dem Bearbeitungsbildschirm:

### Kontext (`mhmrentiva_addon_context`-Taxonomie)

Eine Radio-Metabox in der Seitenleiste mit drei Optionen:

| Kontext | Bedeutung |
| :--- | :--- |
| **Nur Vermietung** | Wird nur im Buchungsablauf für Mietfahrzeuge angezeigt |
| **Nur Transfer** | Wird nur im Buchungsablauf für Transfers angezeigt (Modal-Auswahl) |
| **Beide** | Wird in beiden Abläufen angezeigt |

- **Standard:** `Rental only` (bestehende Zusatzleistungen werden beim Upgrade automatisch darauf migriert)
- **Wo der Kunde sie sieht:**
    - Vermietung: die bestehenden Checkboxen im Buchungsformular (unverändert)
    - Transfer: ein Hinweis „+ N Zusatzleistungen verfügbar“ über dem Button „In den Warenkorb“ auf jeder Suchergebniskarte; ein Klick auf den Button öffnet eine Modal-Auswahl

### Preistyp (`_mhmrentiva_addon_pricing_type`-Post-Meta)

Ein Auswahlfeld in der Haupt-Metabox mit drei Optionen:

| Typ | Berechnung | Gültig in |
| :--- | :--- | :--- |
| **Pro Buchung (pauschal)** | `mhmrentiva_addon_price` (pauschal) | Beiden Kontexten |
| **Pro Tag** | `addon_price × rental_days` | Vermietung |
| **Pro Fahrgast** | `addon_price × (adults + children)` | Transfer |

- **Standard:** `Per booking (fixed)` (bestehende Zusatzleistungen werden automatisch migriert)
- **Dynamische Admin-Oberfläche:** Wenn du die Kontext-Auswahl änderst, deaktiviert das Auswahlfeld „Preistyp“ inkompatible Optionen mit dem Zusatz `(incompatible with context)`. Per JS gesteuert, für die Vorschau ist kein Speichern nötig.
- **Serverseitige Absicherung:** Falls durch Umgehung des JS doch eine ungültige Kombination gespeichert wird (z. B. `Rental only` + `Per passenger`), setzt der Server den Preistyp auf `Per booking` zurück und zeigt einen Admin-Hinweis an.

### Vorschau des Transfer-Modals

Wenn ein Kunde bei einem Transfer-Suchergebnis auf „In den Warenkorb“ klickt und mindestens eine Zusatzleistung mit Transfer-Kontext existiert:

```
┌─ Modal ──────────────────────────────────┐
│ Add-ons for your VIP transfer            │
│ İstanbul Havalimanı ➝ Taksim Ofis        │
├──────────────────────────────────────────┤
│ ☑ Welcome Banner (required)  +30 ₺       │
│ ☐ Child Seat                  +25 ₺      │
│ ☐ VIP Assistant   +15 ₺ × 3 yolcu = 45 ₺ │
├──────────────────────────────────────────┤
│ Vehicle 280 ₺ + add-ons 95 ₺ = 375 ₺     │
│           [ Cancel ]   [ Add to cart ]   │
└──────────────────────────────────────────┘
```

- Pflicht-Zusatzleistungen erscheinen oben, sind vorausgewählt und gesperrt.
- Die Summe aktualisiert sich live, während der Kunde Checkboxen an- oder abwählt.
- „Abbrechen“ schließt das Modal, ohne etwas zu senden; „In den Warenkorb“ übermittelt die Auswahl zusammen mit den bestehenden Transferdaten.
- Sind keine Zusatzleistungen mit Transfer-Kontext konfiguriert, wird das Modal unterdrückt und das bisherige direkte Hinzufügen bleibt unverändert.

### Migration

Beim ersten `init` nach dem Upgrade auf v4.36.0 wird jedem bestehenden `vehicle_addon`-Datensatz automatisch Folgendes zugewiesen:
- `addon_context = rental`
- `_mhmrentiva_addon_pricing_type = per_booking`

Dies ist **idempotent** — eine manuelle Änderung durch den Betreiber (Kontext auf `transfer` oder Preistyp auf `per_day` geändert) wird bei späteren Starts nie überschrieben. Die Migration wird über ein internes Options-Flag gesteuert.

### Keine Begrenzung der Zusatzleistungen

Lite hat **keine Begrenzung der Anzahl an Zusatzleistungen**. Veröffentliche so viele, wie du brauchst; Pro ändert daran nichts.

---

### Zusammenfassung des Abschnitts
- Biete vielfältige Leistungsoptionen an, um **zusätzliche Einnahmequellen** zu schaffen.
- Decke deine Kosten mit **Preisstrategien** (täglich / fest / pro Buchung / pro Fahrgast).
- Nutze **fahrzeugspezifische Darstellung** und **Kontext-Zuordnung**, um die richtigen Zusatzleistungen im richtigen Ablauf anzuzeigen.
- Transfer-Kunden sehen eine übersichtliche **Modal-Auswahl** mit Live-Summen, die Multiplikatoren berücksichtigen.

### Änderungsprotokoll
| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 09.11.2026 | 6.3.1 | Korrektur: Der Hinweis „Lite ist auf 4 veröffentlichte Zusatzleistungen begrenzt“ wurde entfernt. Lite hat keine Begrenzung der Zusatzleistungen. |
| 29.04.2026 | 4.36.0 | `mhmrentiva_addon_context`-Taxonomie (Vermietung / Transfer / beide) und `_mhmrentiva_addon_pricing_type` (per_booking / per_day / per_passenger) hinzugefügt. Transfer-Modal-Auswahl mit Live-Summe. Idempotente Datenmigration. |
| 19.03.2026 | 4.21.2 | Anleitung zur Nutzung der Zusatzleistungen erstellt. |
