---
id: transfer-settings
title: "Transfer-Einstellungen (globale Konfiguration)"
sidebar_label: "Transfer-Einstellungen"
sidebar_position: 8
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite dokumentiert eine Funktion des Add-ons **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und setzt voraus, dass Pro zusätzlich zu Lite installiert ist und eine gültige Lizenz vorliegt.
Siehe [Editionen — Lite vs. Pro](/docs/) für die vollständige Aufteilung, oder hol dir Pro unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Zweck
Diese Seite beschreibt die Klasse `TransferSettings`, die das globale Verhalten des Transfer-Moduls festlegt (Zahlungsregeln, Anzahlungssätze und benutzerdefinierte Standorttypen).
:::

# ⚙️ Transfer-Einstellungen

`TransferSettings` ist die zentrale Klasse, die die finanziellen und strukturellen Regeln für Transfer-Vorgänge festlegt. Sie ist vollständig in Rentivas moderne `SettingsHelper`- und `SettingsCore`-Architektur integriert.

---

## 🏗️ Einstellungsgruppen und Felder

Die Klasse verwaltet im Admin-Bereich die folgenden Einstellungen unter der ID `mhmrentiva_transfer_section`:

### 1. Zahlungsverhalten (Zahlungsart)
Legt das Zahlungsmodell fest, das der Kunde bei einer Transfer-Buchung verwendet:
- **Vollständige Zahlung erforderlich:** Der gesamte Betrag wird zum Zeitpunkt der Buchung eingezogen.
- **Anzahlung (Prozentsatz):** Es wird nur ein festgelegter Prozentsatz (Anzahlung) eingezogen.

### 2. Anzahlungssatz
Der Satz, der angewendet wird, wenn das Zahlungsmodell auf „Prozentsatz“ eingestellt ist.
- **Standard:** 20 %
- **Bereich:** 0 % – 100 % (typsichere `number_field`-Validierung).

### 3. Benutzerdefinierte Standorttypen
Typen, die zusätzlich zu den Standard-Standorttypen (Flughafen, Hotel usw.) manuell eingegeben werden, um betriebliche Anforderungen abzudecken.
- **Format:** Eingabe über ein `textarea_field`, eine Kategorie pro Zeile.
- **Beispiel:** `Stadium`, `Exhibition Center`, `Yacht Marina`.

---

## 🛠️ Technische Integration

### Registrierung
Die Einstellungsfelder werden typsicher über `SettingsHelper` registriert:

```php
SettingsHelper::select_field(
    $page_slug,
    'mhmrentiva_transfer_deposit_type',
    __( 'Payment Type', 'mhm-rentiva' ),
    $options,
    $description,
    self::SECTION_TRANSFER
);
```

### Zugriffsmethoden
Für den sicheren Zugriff auf diese Einstellungen aus anderen Teilen des Codes stehen statische Methoden zur Verfügung:
- `TransferSettings::get_deposit_type()`
- `TransferSettings::get_deposit_rate()`

---

## 🛡️ Validierungsregeln

- **Bereinigung:** String-Werte werden über `sanitize_text_field` gefiltert, Textarea-Werte über `sanitize_textarea_field`.
- **Validierung:** Numerische Felder werden über `absint` in Ganzzahlen umgewandelt und dürfen die festgelegten Min-/Max-Werte nicht überschreiten.

## Zusammenfassung des Abschnitts
- Alle globalen Regeln für das Transfer-Modul werden von dieser Klasse verwaltet.
- Die Einstellungen werden als integrierter Abschnitt auf Rentivas allgemeiner Einstellungsseite angezeigt.
- Die Zahlungsregeln werden direkt von `TransferBookingHandler` referenziert.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Klasse TransferSettings aktualisiert, um Zahlungsmodelle und Standorttypen abzubilden. |
