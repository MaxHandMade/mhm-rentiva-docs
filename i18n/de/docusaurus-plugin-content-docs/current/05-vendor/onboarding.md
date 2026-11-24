---
id: onboarding
title: "Anbieter-Onboarding"
sidebar_label: "Onboarding"
sidebar_position: 2
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite dokumentiert eine Funktion des Add-ons **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und setzt voraus, dass Pro zusätzlich zu Lite installiert ist und eine gültige Lizenz vorliegt.
Die vollständige Aufteilung findest du unter [Editionen – Lite vs. Pro](/docs/), Pro erhältst du unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Zweck
Diese Seite erklärt technisch den Onboarding-Prozess für Anbieter – vom Bewerbungsformular über die Freigabe durch den Admin und die Rollenzuweisung bis zur Datensynchronisierung.
:::

# 🚀 Onboarding-Prozess für Anbieter

Das Onboarding-Modul von Rentiva verwendet einen **zweistufigen Freigabemechanismus**, um eine kontrollierte Marktplatz-Struktur zu gewährleisten.

---

## 📝 1. Bewerbungsformular & Shortcode

Anbieterbewerbungen werden über ein Formular eingereicht, das vom Shortcode `[rentiva_vendor_apply]` ausgegeben wird.

### Technische Umsetzung
- **Klasse:** `MHMRentiva\Admin\Frontend\Shortcodes\Vendor\VendorApply`
- **AJAX-Handler:** Läuft über die Methode `handle_ajax()` bei der Action `mhmrentiva_vendor_apply`.
- **Sicherheit:** Der CSRF-Schutz wird für jede Bewerbung über `wp_create_nonce('mhmrentiva_vendor_apply_nonce')` bereitgestellt.

### Pflichtfelder
| Feld | Meta-Schlüssel | Typ | Verschlüsselt |
|---|---|---|---|
| Vollständiger Name | `_vendor_full_name` | Text | Nein |
| Telefon | `_vendor_phone` | Text | Nein |
| Stadt / Region | `_vendor_city` | SelectWoo | Nein |
| **IBAN** | `_vendor_iban` | Text | **Ja (AES-256)** |
| **Kontoinhaber** | `_vendor_account_holder` | Text | Nein |
| Ausweisdokument | `_vendor_doc_id` | Datei | Nein |
| Führerschein | `_vendor_doc_license` | Datei | Nein |
| Adressnachweis | `_vendor_doc_address` | Datei | Nein |

### Optionale Felder
| Feld | Meta-Schlüssel | Typ | Hinweis |
|---|---|---|---|
| Finanzamt | `_vendor_tax_office` | Text | Hinzugefügt in v4.23.1 |

:::info Formularänderungen in v4.23.1
- **Servicegebiete:** Der Checkbox-Bereich wurde entfernt und durch einen Informationshinweis ersetzt.
- **Fahrzeugversicherung:** Aus dem Bewerbungsformular entfernt und in das Formular zum Einreichen von Fahrzeugen (`[rentiva_vehicle_submit]`) verschoben.
- **Stadtauswahl:** Von einem Texteingabefeld (`<datalist>`) auf eine `<select>` + WooCommerce-SelectWoo-Komponente (`CityHelper::render_select()`) umgestellt.
- **Kontoinhaber:** Neues Pflichtfeld – Angaben zum Inhaber des Bankkontos.
- **Finanzamt:** Neues optionales Feld.
:::

### Anbietervereinbarung (v4.61.0)

Du kannst verlangen, dass Bewerber eine **Anbietervereinbarung** lesen und akzeptieren, bevor sie die Bewerbung absenden können.

- Aktiviere **Anbietervertrag erforderlich** unter **Einstellungen → Anbieter-Marktplatz → Anbietervereinbarung**. Das darunterliegende Feld **Vertragstext** enthält den Text, der Bewerbern angezeigt wird.
- Ist die Option aktiviert, zeigt das Bewerbungsformular die Vereinbarung und eine **Pflicht-Checkbox zur Zustimmung** an – das Formular kann erst abgesendet werden, wenn sie angehakt ist. Dieselbe Anforderung wird auch **serverseitig** durchgesetzt, sodass die Sperre nicht durch Manipulation des Formulars umgangen werden kann.
- Die Zustimmung wird als Nachweis (mit **Zeitstempel**) bei der Bewerbung gespeichert und in den Bewerbungsdetails angezeigt. So hast du einen Beleg darüber, wer wann zugestimmt hat.
- **Leerer Text:** Wenn du die Vereinbarung aktivierst und den Text leer lässt, sehen Bewerber eine integrierte Vorlage mit acht Abschnitten: deine Fahrzeuge und Inserate, Buchungen, Provision und Auszahlungen, Stornierungen, Schäden, Versicherung und Haftung, personenbezogene Daten, Sperrung und Beendigung der Vereinbarung sowie Änderungen. Die Vorlage ist ein Ausgangspunkt und keine Rechtsberatung: Prüfe sie und passe sie an dein Unternehmen und das geltende lokale Recht an.
- **Formatierung:** Der Text unterstützt einfache Formatierungen: `# Heading`, `**bold**`, `- list item` und `---` für eine Linie. Anderes HTML wird nicht ausgegeben.

---

## 🛡️ 2. Berechtigungsprüfungen (`Eligibility`)

Bevor ein Benutzer sich bewerben kann, werden über `VendorApplicationManager::can_apply()` folgende Regeln geprüft:
1. Der Benutzer darf die Rolle `rentiva_vendor` nicht bereits besitzen.
2. Es darf keine bestehende ausstehende Bewerbung geben.
3. Die Prüfung `Mode::canUseVendorMarketplace()` muss bestätigen, dass die Lizenz diese Funktion unterstützt.

---

## 🔒 3. Datenspeicherung & Sicherheit

Bewerbungen werden als Einträge des CPT `mhmrentiva_vendor_app` gespeichert.

### Verschlüsselungsprotokoll für die IBAN
IBAN-Daten werden niemals im Klartext in die Datenbank geschrieben:
```php
// VendorApplicationManager::encrypt_iban()
$key = substr(hash('sha256', AUTH_KEY . SECURE_AUTH_SALT), 0, 32);
$iv  = openssl_random_pseudo_bytes(16);
$cipher = openssl_encrypt($raw_iban, 'AES-256-CBC', $key, OPENSSL_RAW_DATA, $iv);
return base64_encode($iv . $cipher);
```
**Hinweis:** Wenn sich `AUTH_KEY` oder `SECURE_AUTH_SALT` ändern, können zuvor verschlüsselte IBANs nicht mehr entschlüsselt werden.

---

## ⚙️ 4. Freigabe durch den Admin & Rollenzuweisung

### Freigabeablauf (`Approve`)
Wenn im Adminbereich auf „Freigeben“ geklickt wird, führt `VendorOnboardingController::approve()` nacheinander Folgendes aus:
1. **Rollen-Upgrade:** Dem Benutzer wird die Rolle `rentiva_vendor` zugewiesen.
2. **Meta-Synchronisierung:** Die Daten aus dem Bewerbungsbeitrag (`_vendor_*`) werden in die Benutzer-Meta-Tabellen (`_mhmrentiva_vendor_*`) kopiert. Ab v4.23.1 werden auch die Felder `_vendor_account_holder` und `_vendor_tax_office` synchronisiert.
3. **Protokollierung:** Das Freigabedatum und die ID des freigebenden Admins werden gespeichert.
4. **Benachrichtigung:** Der Hook `mhmrentiva_vendor_approved` wird ausgelöst.

### Ablehnungsablauf (`Reject`)
Wenn der Admin eine Bewerbung ablehnt:
1. Der Status der Bewerbung wird auf `trash` gesetzt.
2. Der Ablehnungsgrund wird in `_vendor_rejection_note` geschrieben.
3. Der Hook `mhmrentiva_vendor_rejected` wird ausgelöst.

---

## 📧 5. E-Mail-Benachrichtigungen

Alle Statusänderungen im Lebenszyklus eines Anbieters werden von der Klasse `VendorNotifications` verarbeitet:
- **Bewerbung eingegangen:** Der Bewerber wird benachrichtigt, dass die Bewerbung geprüft wird.
- **Freigegeben:** Eine Willkommensnachricht und die Zugangsdaten zum Dashboard werden gesendet.
- **Abgelehnt:** Eine Info-E-Mail mit dem Ablehnungsgrund wird gesendet.

---

## 🚗 6. Einreichen von Fahrzeugen (v4.23.0)

Nach der Freigabe kann ein Anbieter über das Formular `[rentiva_vehicle_submit]` Fahrzeuge hinzufügen. In v4.23.0 hinzugefügte Funktionen:

### Nach Stadt gefilterte Auswahl von Orten/Routen
Transfer-Orte und -Routen werden anhand des Meta-Werts `_vendor_city` des Anbieters gefiltert. Für die Abfrage nach Stadt wird `LocationProvider::get_by_city()` verwendet.

### Preise pro Route
Anbieter können für jede Route ihren eigenen Preis festlegen. Der vom Admin definierte Bereich `min_price` / `max_price` wird dabei durchgesetzt. Meta-Schlüssel: `_mhmrentiva_transfer_route_prices` (JSON).

### Kapazitätsfelder
- **Passagierkapazität:** Maximale Anzahl an Passagieren.
- **Gepäcklimits:** Kapazitäten für großes und kleines Gepäck.

### Hochladen des Fahrzeugscheins
Anbieter können den Fahrzeugschein über das Formular hochladen. Dieses Dokument wird vom Admin zur Verifizierung geprüft.

### Hochladen des Versicherungsnachweises (v4.23.1)
Zusätzlich zum Fahrzeugschein kann ein Versicherungsnachweis hochgeladen werden. Meta-Schlüssel: `_mhmrentiva_vehicle_insurance_doc`. Dieses Feld wurde vom Bewerbungsformular in das Formular zum Einreichen von Fahrzeugen verschoben – so ist pro Fahrzeug ein eigener Versicherungsnachweis möglich.

### Sperre für kostenpflichtige Inserate (v4.24.1)

Wenn der Admin das System für kostenpflichtige Inserate aktiviert hat, wird das Fahrzeug beim Absenden des Formulars als **Entwurf** gespeichert und der Anbieter zur WooCommerce-Zahlungsseite weitergeleitet. Nach Abschluss der Zahlung wechselt das Fahrzeug automatisch in den Status „Ausstehende Überprüfung“. Details findest du unter [System für kostenpflichtige Inserate](/docs/vendor/vendor-management#-paid-listing-system-v4241).

### Bearbeitung & erneute Prüfung
Ändert ein Anbieter ein kritisches Feld (Marke, Modell, Kennzeichen usw.), wird das Fahrzeug automatisch erneut zur Prüfung eingereiht (`VendorVehicleReviewManager`). Kleinere Änderungen (Preis, Beschreibung) werden sofort veröffentlicht.

### Anbieter-Badge
Fahrzeuge von Anbietern werden auf den Fahrzeugkarten mit einem Anbieter-Badge gekennzeichnet.

---

## Zusammenfassung des Abschnitts
- Der Onboarding-Prozess basiert vollständig auf AJAX und erfordert kein Neuladen der Seite.
- Sensible Finanzdaten (IBAN) werden auf Hardware-/Serverebene verschlüsselt.
- Die Rollen- und Meta-Synchronisierung läuft als atomare Operation.
- Das Bewerbungsformular unterstützt das Hochladen von 3 Dokumenten (Ausweis, Führerschein, Adressnachweis). Der Versicherungsnachweis wurde in v4.23.1 in das Formular zum Einreichen von Fahrzeugen verschoben.
- Das Formular zum Einreichen von Fahrzeugen umfasst eine nach Stadt gefilterte Auswahl von Orten/Routen, Preise pro Route und das Hochladen des Versicherungsnachweises.
- Die Stadtauswahl verwendet in allen Formularen die SelectWoo-Komponente (v4.23.1).
- Ist die Funktion für kostenpflichtige Inserate aktiviert, leitet das Absenden des Fahrzeugformulars zur WC-Zahlungsseite weiter (v4.24.1).

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 18.11.2026 | Pro 6.5.0 | Integrierte Vereinbarungsvorlage bei leerem Text und einfache Formatierung dokumentiert. |
| 29.06.2026 | 4.61.0 | Sperre durch Anbietervereinbarung dokumentiert: Pflicht-Checkbox zur Zustimmung im Bewerbungsformular, serverseitige Durchsetzung und Zustimmungsnachweis mit Zeitstempel bei der Bewerbung. |
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 01.04.2026 | 4.24.1 | Sperre für kostenpflichtige Inserate: Ablauf Fahrzeug einreichen → Entwurf → WC-Zahlung → ausstehende Überprüfung hinzugefügt. |
| 28.03.2026 | 4.23.1 | Bewerbungsformular: Servicegebiete und Fahrzeugversicherung entfernt. Kontoinhaber (Pflichtfeld) und Finanzamt (optional) hinzugefügt. Stadtauswahl auf SelectWoo umgestellt. Versicherungsnachweis in das Formular zum Einreichen von Fahrzeugen verschoben. Meta-Synchronisierung aktualisiert. |
| 27.03.2026 | 4.23.0 | Dokument-Uploads (4 Arten), Einreichen von Fahrzeugen, nach Stadt gefilterte Routenauswahl, Routenpreise, Kapazitätsfelder und Mechanismus zur erneuten Prüfung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Seite mit Details zur HMAC-Verschlüsselung und Meta-Synchronisierung aktualisiert. |
