---
id: transfer-routes
title: "Transferrouten und Routenverwaltung"
sidebar_label: "Transferrouten"
sidebar_position: 8
slug: /features-usage/transfer-routes
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite dokumentiert eine Funktion des Add-ons **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und erfordert, dass Pro zusätzlich zu Lite installiert ist, sowie eine gültige Lizenz.
Die vollständige Aufteilung findest du unter [Editionen – Lite vs. Pro](/docs/), Pro erhältst du unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

Unter „Transferrouten“ legst du die Hauptrouten für deinen VIP-Transferservice sowie die Preise für diese Routen fest. Du erreichst den Bereich über **MHM Rentiva > Transferrouten**.

Hier erstellst du die Verbindungen zwischen den Punkten, die du zuvor in der [Standortverwaltung](./locations.md) definiert hast.

---

## Routenerstellung (Routendefinition)

Eine Route beschreibt die Beziehung zwischen mindestens zwei Standorten:

- **Abholpunkt:** Der Punkt, an dem das Fahrzeug den Fahrgast abholt.
- **Absetzpunkt:** Der Hauptpunkt, an dem der Fahrgast abgesetzt wird.
- **Rückroute:** Ermöglicht es, die umgekehrte Route im System zu speichern (z. B. Flughafen–Hotel und Hotel–Flughafen).

---

## Preise und Zusatzgebühren

Der Mietpreis für eine Route ändert sich dynamisch je nach Kundenanforderungen:

- **Pauschalpreis:** Ein fester Betrag pro Route (`base_price`).
- **Höchstpreis (v4.23.0):** Die vom Admin für eine Route festgelegte Preisobergrenze (`max_price`). Anbieter können innerhalb dieses Rahmens eigene Preise festlegen.
- **Kilometerbasierte Preise:** Ein Preistarif, der mit zunehmender Entfernung steigt.
- **Fahrgast-/Gepäcklimit:** Je nach Kapazität (z. B. 8 Personen) ändert sich der Preis oder das Fahrzeug wird aus den Suchergebnissen ausgeschlossen.
- **Nachttarif:** Ein Aufschlagsfaktor, der zu bestimmten Uhrzeiten (z. B. 00:00–06:00) angewendet wird (z. B. 1,25x).

### Preismodell für Anbieter (v4.23.0)

In einer Multi-Anbieter-Struktur kann jeder Anbieter innerhalb des vom Admin festgelegten Bereichs `min_price` – `max_price` einen eigenen routenspezifischen Preis festlegen:

- Der **Admin** definiert beim Erstellen einer Route `base_price` und `max_price`.
- Der **Anbieter** gibt im Formular zum Einreichen von Fahrzeugen für die von ihm bedienten Routen seinen Preis innerhalb dieses Bereichs ein.
- Die **Suchmaschine** verwendet beim Filtern nach Route den Anbieterpreis; ist kein Anbieterpreis festgelegt, greift sie auf den Wert `base_price` der Route zurück.
- Anbieterpreise werden als JSON im Meta-Schlüssel `_mhmrentiva_transfer_route_prices` gespeichert.

---

### 🖼️ BILD: TRANSFERROUTENVERWALTUNG
*(Routenliste, Preistabelle und Kapazitätsbeschränkungen)*

---

## Transfer-Suchmaschine (v4.23.0)

Die Transfer-Suchmaschine unterstützt seit v4.23.0 **routenbasierte Fahrzeugfilterung** und **Anbieterpreise**:

- Bei einer Suche werden Routen gefunden, die zu den gewählten Abhol- und Absetzpunkten passen.
- Fahrzeuge, die diesen Routen zugewiesen sind, werden nach Fahrgast- und Gepäckkapazität gefiltert.
- Die Ergebnisse zeigen den Preis des Anbieters für die Route; ist kein Anbieterpreis festgelegt, wird der Wert `base_price` der Route verwendet.

---

## Kundenerlebnis beim VIP-Transfer

Wenn ein Kunde im Frontend sucht, werden Fahrzeuge über diese Routen aufgelistet:
1. **Routenauswahl:** Der Kunde wählt Abhol- und Absetzpunkt.
2. **Anzahl der Fahrgäste:** Fahrzeuge, die zur Gruppengröße passen (VIP-Van, Minibus usw.), werden aufgelistet.
3. **Preisvergleich:** Die Preise verschiedener Anbieter für dieselbe Route können verglichen werden.
4. **Buchung:** Nach der Bestätigung erscheint im Betriebs-Panel eine Buchung vom Typ „Transfer“.

---

### Zusammenfassung des Abschnitts
- Definiere deine **Punkt-zu-Punkt**-Services.
- Sichere deine Rentabilität mit **dynamischer Preisgestaltung**.
- Verhindere falsche Fahrzeugbuchungen mit der **Kapazitätskontrolle**.

### Änderungsprotokoll
| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Dokumentation mit der aktuellen Plugin-Version synchronisiert. |
| 26.03.2026 | 4.23.0 | Preismodell für Anbieter, max_price, routenbasierte Suchmaschine und Stadt-zu-Punkt-Hierarchie hinzugefügt. |
| 19.03.2026 | 4.21.2 | Anleitung zur Nutzung der Transferrouten (Routenverwaltung) erstellt. |
