---
id: payout-csv-exporter
title: "Auszahlungs-CSV-Exporter (Berichte)"
sidebar_label: "Auszahlungs-CSV-Exporter"
sidebar_position: 13
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite dokumentiert eine Funktion des Add-ons **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und erfordert, dass Pro zusätzlich zu Lite installiert ist, sowie eine gültige Lizenz.
Siehe [Editionen — Lite vs. Pro](/docs/) für die vollständige Aufteilung oder hol dir Pro unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Zweck
Diese Seite beschreibt die technische Funktionsweise und die Datensicherheitsregeln der Komponente `PayoutCsvExporter`, die den Massenexport finanzieller Auszahlungsdatensätze ermöglicht.
:::

# 📊 Auszahlungs-CSV-Exporter

`PayoutCsvExporter` ist eine Hilfsklasse, mit der Administratoren den Auszahlungsverlauf prüfen oder Massendaten für Bankintegrationen abrufen. Sie streamt die Daten direkt an den Browser, ohne sie in den Speicher zu laden, und sorgt so für hohe Performance.

---

## 🛠️ Technische Funktionsweise

### 1. Zugriff und Sicherheit
Der Exportvorgang läuft über einen standardmäßigen WordPress-`admin_post`-Hook:
- **Endpunkt:** `/wp-admin/admin-post.php?action=mhmrentiva_export_payouts`
- **Berechtigungsprüfung:** Nur Benutzer mit der Berechtigung `manage_options` (Administrator) können darauf zugreifen.
- **Nonce-Prüfung:** Die Gültigkeit der Anfrage wird über eine **WP-Nonce** mit dem Schlüssel `mhmrentiva_export_payouts` geprüft.

### 2. Datenformat (Excel-Kompatibilität)
Das System verwendet **UTF-8 mit BOM (Byte Order Mark)**, damit CSV-Dateien in Excel korrekt geöffnet werden:
- **BOM:** Die Zeichenfolge `\xEF\xBB\xBF` wird dem Dateianfang vorangestellt.
- **Trennzeichen:** Als Trennzeichen wird das Standard-Komma (`,`) verwendet.

---

## 📋 CSV-Spaltenstruktur (Zuordnung)

Die Spalten in der exportierten Datei und ihre Quellen sind wie folgt:

| Spaltenname | Datenquelle | Beschreibung |
| :--- | :--- | :--- |
| `Payout ID` | `Post ID` | Vom System vergebene eindeutige Kennung. |
| `Vendor Name` | `WP_User` Anzeigename | Vollständiger Name des Anbieters, der die Zahlung erhält. |
| `Amount` | `_mhmrentiva_payout_amount` | Auszahlungsbetrag (Dezimalformat). |
| `Currency` | WC-Währung | Basiswährung von WooCommerce. |
| `CPT Status` | `post_status` | Status auf WordPress-Seite (Ausstehend, Genehmigt usw.). |
| `Processor Status`| `_mhmrentiva_payout_status` | Vom Zahlungsabwickler zurückgegebener Statuscode (n/a, falls ausstehend). |
| `Requested At` | `post_date_gmt` | UTC-Zeitstempel der Anfrage. |

---

## 🔒 Sicherheitsprotokolle

### Maskierung personenbezogener Daten (PII)
Da CSV-Ausgaben für die Finanzprüfung gedacht sind, sind sensible Anbieterinformationen (IBAN, Steuernummer) standardmäßig nicht in diesem Export enthalten. Diese Daten sind nur über die verschlüsselte Meta-Ebene innerhalb des Auszahlungsdatensatzes zugänglich.

### Protokollierung
Jeder Exportvorgang wird in der Tabelle `mhmrentiva_payout_audit` mit der Aktion „export_triggered“ erfasst. Wer wann Daten heruntergeladen hat, ist im Forensiksystem nachvollziehbar.

---

## 💡 Hinweise für Entwickler

Verwende auf PHP-Seite die folgende Methode, um den Export-Link dynamisch zu erzeugen:

```php
// Get a secure (Nonce-protected) Export URL
$export_url = \MHMRentiva\Admin\PostTypes\Payouts\PayoutCsvExporter::get_export_url();
```

## Zusammenfassung des Abschnitts
- `PayoutCsvExporter` verwendet für große Datenmengen die **Streaming**-Methode.
- Der gesamte Vorgang ist durch **Nonce**- und **Berechtigungs**prüfungen geschützt.
- Die Ausgaben liegen im Format **Excel-fertig (UTF-8 BOM)** vor.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Seite aktualisiert, um die Streaming-Logik und die Excel-BOM-Struktur in PayoutCsvExporter abzubilden. |
