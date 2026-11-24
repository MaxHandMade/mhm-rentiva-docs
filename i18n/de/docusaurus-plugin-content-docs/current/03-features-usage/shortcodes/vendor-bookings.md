---
title: "Buchungsliste für Anbieter"
description: "Nutzungsanleitung und technische Referenz für den Shortcode des anbieterseitigen Buchungseingangs – listet jede Reservierung auf, die für Fahrzeuge des aktuellen Anbieters getätigt wurde."
sidebar_position: 28
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite dokumentiert eine Funktion des Add-ons **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und erfordert, dass Pro zusätzlich zu Lite installiert ist, sowie eine gültige Lizenz.
Siehe [Editionen – Lite vs. Pro](/docs/) für die vollständige Aufteilung oder hol dir Pro unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Zweck
Diese Seite dokumentiert den Shortcode `[rentiva_vendor_bookings]` – den anbieterseitigen Eingang, der jede Reservierung auflistet, die Kunden für Fahrzeuge des aktuellen Anbieters getätigt haben. Wird im Anbieter-Panel (`/panel/`) verwendet; nicht für die öffentliche Platzierung gedacht.
:::

# 📥 Anbieter-Buchungen (Eingang im Anbieter-Panel)

## Inhalt
- Was dieser Shortcode ist
- Authentifizierung & Rollenprüfung
- Verwendung im Frontend
- Attributreferenz
- Leere Zustände
- Einordnung im Anbieter-Panel

## Was dieser Shortcode ist

`[rentiva_vendor_bookings]` ist ein **Panel-Widget nur für Anbieter**. Der aktuell angemeldete Benutzer muss die Rolle `rentiva_vendor` besitzen; andernfalls gibt der Shortcode einen leeren String zurück. Die Ausgabe ist eine Liste von `mhmrentiva_booking`-Beiträgen, deren zugrunde liegendes Fahrzeug mit `post_author` dem aktuellen Benutzer zugeordnet ist – mit anderen Worten: jede Reservierung, die ein Kunde für ein Auto dieses Anbieters getätigt hat.

Dies ist **nicht** die kundenseitige Liste „Meine Buchungen“ (dafür ist `[rentiva_my_bookings]` da). „Meine Buchungen“ für Kunden liest Buchungen, die der **aktuelle Benutzer getätigt hat**; Anbieter-Buchungen liest Buchungen, für die der **aktuelle Benutzer den Fahrzeugbestand besitzt**. Die beiden sind bewusst getrennte Shortcodes, da anbieterseitige Abfragen auch die Identität des Kunden anzeigen müssen, während kundenseitige Abfragen das Fahrzeug und den Anbieter anzeigen.

Wird intern von der Anbieter-Panel-Seite unter `/panel/` verwendet (das Dashboard wechselt zwischen Inseraten, Buchungsanfragen sowie Kontobuch & Auszahlungen). Wer ein eigenes Anbieter-Panel-Layout erstellt, kann diesen Shortcode bei Bedarf in eine Pro-geschützte Seite einfügen.

## Authentifizierung & Rollenprüfung

Zwei Ebenen schützen die Ausgabe:

1. **Anmeldung erforderlich.** `requires_auth = true` in der Registry – nicht angemeldete Besucher sehen über den Filter `mhmrentiva_shortcode_auth_error` einen Hinweis „Auth error“ (Standard: „Bitte melde dich an, um diesen Inhalt anzuzeigen.“).
2. **Rolle erforderlich.** Der Handler bricht mit `error => 'not_vendor'` ab, wenn dem aktuellen Benutzer die Rolle `rentiva_vendor` fehlt. Das Template rendert in diesem Fall nichts.

Die Pro-Prüfung wird **von der Seite geerbt** – die typische Platzierung ist `/panel/`, die bereits die Pro-Funktion `vendor_marketplace` voraussetzt. Lite-Anbieter haben von vornherein keinen Zugriff auf die Panel-Seite.

## Verwendung im Frontend

```shortcode
[rentiva_vendor_bookings]
```

Der Shortcode liest nur ein Attribut, `limit`:

```shortcode
[rentiva_vendor_bookings limit="10"]
```

Der Abfrageablauf:

1. Alle `mhmrentiva_vehicle`-IDs abrufen, die dem aktuellen Anbieter gehören (`post_author = $user_id`, `post_status` in `[publish, pending]`).
2. Eine `mhmrentiva_booking`-Abfrage ausführen, die über das Meta-Feld `_mhmrentiva_vehicle_id` mit diesen Fahrzeug-IDs verknüpft wird.
3. Die resultierende Liste mit Kundenidentität, Fahrzeug, Daten und Status rendern.

Die Paginierung erfolgt serverseitig und liest `?paged=N` aus der Anfrage.

## Attributreferenz

| Attribut | Standard | Typ | Zweck |
| :--- | :--- | :--- | :--- |
| `limit` | `10` | int | Anzahl der pro Seite angezeigten Buchungen. |

## Leere Zustände

| Zustand | Ausgabe |
| :--- | :--- |
| Anbieter ohne eigene Fahrzeuge | Leere Liste mit Hinweis „noch kein Fahrzeugbestand“ |
| Anbieter mit Fahrzeugen, aber ohne Buchungen | Leere Liste mit Hinweis „noch keine Buchungen“ |
| Benutzer, der kein Anbieter ist | Leerer String (stillschweigend) |
| Abgemeldeter Benutzer | Hinweis „Auth error“ (gefiltert über `mhmrentiva_shortcode_auth_error`) |

## Einordnung im Anbieter-Panel

Das Anbieter-Panel unter `/panel/` besteht aus drei Bereichen (`/hesabim/` des Kunden und `/panel/` des Anbieters sind bewusst getrennte Routen):

| Panel-Bereich | Shortcode |
| :--- | :--- |
| Inserate | `[rentiva_vehicle_submit]` (hinzufügen/bearbeiten) + native Fahrzeugliste des Anbieters |
| Buchungsanfragen | `[rentiva_vendor_bookings]` ← **diese Seite** |
| Kontobuch & Auszahlungen | `[rentiva_vendor_ledger]` ([Referenz](./vendor-ledger)) |

Das kundenseitige Gegenstück ist `[rentiva_my_bookings]` ([Referenz](./my-bookings)) – jenes arbeitet mit dem Meta-Feld `_mhmrentiva_customer_user_id`, dieses mit dem Autor des Fahrzeugs.

## Siehe auch

- [Shortcode für das Anbieter-Kontobuch](./vendor-ledger) – Liste der Finanztransaktionen des Anbieters
- [Anbieter-Bewerbungsformular](./vendor-apply) – Onboarding
- [Öffentliches Anbieterprofil](./vendor-profile) – die öffentliche Vertrauensseite
- [Shortcode „Meine Buchungen“ für Kunden](./my-bookings) – das kundenseitige Gegenstück (anderer Abfrageablauf)
- [Anbieter-Onboarding](/docs/vendor/onboarding) – Leitfaden für den Betrieb
