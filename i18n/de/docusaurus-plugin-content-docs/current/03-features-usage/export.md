---
id: export
title: "Export"
sidebar_position: 13
slug: /features-usage/export
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite beschreibt eine Funktion des Add-ons **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und erfordert, dass Pro zusätzlich zu Lite installiert ist, sowie eine gültige Lizenz.
Siehe [Editionen — Lite vs. Pro](/docs/) für die vollständige Aufteilung oder hol dir Pro unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

Mit dem Export-Werkzeug kannst du deine Vermietungsdaten in verschiedenen Formaten für Analysen, Buchhaltung oder Datensicherung exportieren. Umfassende Datenexporte findest du unter **MHM Rentiva > Export**.

:::info React SPA (seit v4.52.0)
Die Export-Seite wurde in v4.52.0 vollständig auf eine **React SPA** migriert, die auf der REST-API basiert. Rund 780 Zeilen veralteter PHP-Render-Code wurden ersetzt und drei veraltete AJAX-Handler (`wp_ajax_mhmrentiva_export_*`) entfernt. Die Seite bietet jetzt eine Live-Vorschau der Datensätze, einen REST-basierten Exportverlauf mit Löschfunktion pro Eintrag sowie den beibehaltenen CSV-Download-Ablauf über `admin-post.php` — alles ohne Neuladen der Seite.
:::

---

## 📂 Datenexport-Module

Das System stellt die Daten je nach Zweck in vier Kategorien bereit:

1.  **Buchungsexport:** Enthält Kundeninformationen, Mietdetails und Status. (Formate: **CSV**, **JSON**)
2.  **Zahlungsprotokoll-Export:** Gibt Zahlungsvorgänge für Buchhaltung und Finanzanalyse aus. (Formate: **CSV**, **JSON**)
3.  **Fahrzeugexport:** Exportiert den Fahrzeugbestand, technische Daten und Preiskriterien. (Formate: **CSV**, **JSON**)
4.  **Berichtsexport:** Leitet zu Analyseberichten mit Zusammenfassungen zu Umsatz, Kunden und Fahrzeugleistung weiter.

---

## ⚙️ Erweiterte Exportfilter

Nutze erweiterte Filter, um die Daten vor dem Export einzugrenzen und nur die benötigten Datensätze abzurufen:

- **Zeitraum:** Wähle Datensätze aus einem bestimmten Zeitraum aus (Heute, Dieser Monat usw.).
- **Buchungs- und Zahlungsstatus:** Filtere nach Datensätzen mit bestimmten Status wie „Abgeschlossen“ oder „Bezahlt“.
- **Zahlungsgateway:** Trenne Transaktionen, die über eine bestimmte Zahlungsmethode getätigt wurden (Bargeld, Kreditkarte usw.).
- **Betragsbereich (Min./Max.):** Ziele auf Buchungen innerhalb einer bestimmten Preisspanne ab (z. B. 5.000 $ – 20.000 $).

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>📸 BILD: EXPORT-BEREICH UND FILTER</strong><br/>
  <em>mhm-rentiva-export-filters-history</em>
</div>

---

## 📜 Exportverlauf

Das System protokolliert jeden Exportvorgang:
- **Format und Anzahl der Datensätze:** Das verwendete Format (CSV/JSON) und die Anzahl der enthaltenen Zeilen/Datensätze.
- **Status:** Ob der Vorgang „ABGESCHLOSSEN“ ist.
- **Details:** Prüfe, welche Filter bei einem früheren Export angewendet wurden.

---

## v4.23.0 Fehlerbehebungen beim Export

In dieser Version wurden vier kritische Fehler im Exportmodul behoben:

1. **Abweichender post_type beim Zahlungsprotokoll:** Das Exportformular sendete `mhmrentiva_payment_log`, der tatsächliche CPT war jedoch `mhmrentiva_app_log`. Der Fehler „Ungültiger Exporttyp“ wurde behoben.
2. **Anzahl der Datensätze lieferte 0:** Der Abfrageparameter `no_found_rows => true` führte dazu, dass `found_posts` immer 0 zurückgab. Die Zählabfrage wurde mit einer separaten Überschreibung korrigiert.
3. **Löschen des Verlaufs:** Die Löschfunktion für den Exportverlauf war Platzhaltercode und funktionierte nicht. Es wurde ein direkter, Transient-basierter Löschmechanismus hinzugefügt.
4. **PHP-8-Fehler bei Fahrzeug-CSV/JSON:** An `get_status_label()` wurde der falsche Parametertyp (String statt Int) übergeben. Dies verursachte unter PHP 8 mit strikten Typen einen fatalen Fehler.

---

## 🔎 Live-Vorschau (v4.52.0+)

Bevor du einen Export startest, liefert die Aktion **Vorschau** die Gesamtzahl der Datensätze sowie eine Stichprobe von 5 Zeilen für den ausgewählten Beitragstyp und die Datumsfilter. Die Schaltfläche **CSV-Datei exportieren** wird automatisch deaktiviert, wenn die Anzahl `0` beträgt, sodass du nie einen leeren Export auslöst.

---

## React-Komponenten (v4.52.0+)

| Komponente | Zweck |
| :--- | :--- |
| `ExportCards` | Visuelle Kartenauswahl für die drei Exporttypen (Buchungen, Fahrzeuge, App-Protokolle) |
| `AdvancedFilters` | Einklappbarer Datumsfilter-Bereich — vordefinierte Zeiträume + eigene Von/Bis-Eingaben |
| `PreviewBar` | Zeigt nach einem Vorschau-Aufruf die Anzahl der Datensätze + eine Stichprobe von 5 Zeilen; deaktiviert den Export bei Anzahl 0 |
| `ExportForm` | Löst über `useRef` das Absenden eines versteckten `admin-post.php`-Formulars aus — kein Neuladen, keine SPA-Navigation |
| `ExportHistory` | Lädt das Exportprotokoll beim Einbinden über REST; Inline-Löschen pro Zeile mit optimistischem Entfernen |

**REST-Endpunkte:**
- `GET /wp-json/mhm-rentiva/v1/admin/export/history` — paginiertes Exportprotokoll (Transient-basiert, max. 50 Einträge, TTL von 1 Woche)
- `DELETE /wp-json/mhm-rentiva/v1/admin/export/{id}` — entfernt einen bestimmten Verlaufseintrag
- `POST /wp-json/mhm-rentiva/v1/admin/export/preview` — Anzahl der Datensätze + Stichprobe von 5 Zeilen für den ausgewählten Typ und die Datumsfilter

Alle Endpunkte erfordern die Berechtigung `manage_options`.

---

### Zusammenfassung des Abschnitts
- Übertrage deine Daten dank **CSV- und JSON**-Unterstützung in Software von Drittanbietern.
- Nimm mit der **betragsbasierten Filterung** eine finanzielle Segmentierung vor.
- Prüfe frühere Datensätze mit dem **Exportverlauf**.

### Änderungsprotokoll
| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 12.05.2026 | 4.52.0 | Vollständige Migration auf React SPA. Live-Vorschau der Datensätze, REST-basierter Exportverlauf mit Löschfunktion pro Eintrag, beibehaltener CSV-Download über admin-post.php. ~780 Zeilen veralteter PHP-Render-Code entfernt. |
| 23.04.2026 | 4.27.2 | Dokumentation mit der aktuellen Plugin-Version synchronisiert. |
| 26.03.2026 | 4.23.0 | 4 kritische Exportfehler behoben (post_type, Anzahl der Datensätze, Löschen des Verlaufs, PHP-8-Typfehler). |
| 19.03.2026 | 4.21.2 | Exportmodule, Filteroptionen und Exportverlauf anhand der tatsächlichen Oberfläche erklärt. |
| 26.02.2026 | 4.21.0 | Erste Version erstellt. |
