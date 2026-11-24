---
id: vendor-reports
title: "Anbieterberichte & Einsprüche"
sidebar_label: "Anbieterberichte"
sidebar_position: 12
slug: /features-usage/vendor-reports
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite dokumentiert eine Funktion des Add-ons **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und erfordert, dass Pro zusätzlich zu Lite installiert ist, sowie eine gültige Lizenz.
Siehe [Editionen – Lite vs. Pro](/docs/) für die vollständige Aufteilung oder hol dir Pro unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info React SPA (seit v4.40.0)
Die Admin-Seite „Anbieterberichte“ wurde in v4.40.0 (Faz 6) zu einer **React SPA** migriert. Die Daten werden über `/wp-json/mhm-rentiva/v1/vendor-reports/*`-REST-Endpunkte abgerufen. Komponenten: `VendorReportsPage`, `FilterBar`, `ReportTable`, `DetailView`, `ActionForm`, `StatusBadge`. Flash-Meldungen verwenden das `window.mhmRentivaVendorReports.flash`-Muster (PHP `enqueue_assets()` liest `$_GET['updated']`/`$_GET['error']`, bevor `history.replaceState` die Parameter entfernt).
:::

Das Anbieterberichtssystem bietet Anbietern einen strukturierten Kanal, um Probleme an den Plattformadministrator zu eskalieren und gegen automatisierte Maßnahmen (wie Strafen beim Zurückziehen) Einspruch einzulegen. Eine eigene Tabelle, ein gemeinsames Modal, eine Admin-Seite – fünf verschiedene Kontexte lösen es aus. **Erfordert eine Pro-Lizenz.**

Eingeführt in [v4.35.0](/blog/rentiva-v4.35.0-release).

---

## Was ist ein Anbieterbericht?

Ein Anbieterbericht ist eine strukturierte Nachricht eines Anbieters an den Plattformadministrator. Er ist **keine** Nachricht an Kunden und **keine** öffentliche Bewertung. Das System unterstützt fünf verschiedene Kontexte:

| Kontext | Verwendet für | Wo sich der Auslöser befindet |
| :--- | :--- | :--- |
| `booking` | Kundenprobleme (Nichterscheinen, Schaden, Streitfall) | Schaltfläche „Sorun Bildir“ auf jeder Buchungskarte des Anbieters |
| `mhmrentiva_vehicle` | Einsprüche gegen ein pausiertes/zurückgezogenes Fahrzeug | Schaltfläche „İtiraz Et“ auf der Anzeigenseite (nur in den Zuständen pausiert/zurückgezogen) |
| `vehicle_action` | Erfassung des Grundes beim Zurückziehen/Pausieren – setzt die Strafe aus | Modal öffnet sich automatisch, wenn der Anbieter auf „Zurückziehen“ oder „Pausieren“ klickt |
| `penalty` | Einspruch gegen einen bereits angewendeten Strafeintrag im Hauptbuch | Schaltfläche „Einspruch“ in jeder Zeile der Tabelle mit dem Punkteverlauf |
| `general` | „Yöneticiye Yaz“ – direkter Draht zum Admin | Link in der Fußzeile auf jeder Seite des Anbieter-Panels |

Alle fünf teilen dieselbe Datenstruktur (eine Zeile in `wp_mhmrentiva_vendor_reports`) und dieselbe Admin-Oberfläche. Die Nebenwirkungen bei der Erledigung unterscheiden sich je nach Kontext.

---

## Ablauf für Anbieter – einen Bericht einreichen

### Über die Buchungskarte

1. Der Anbieter öffnet **Hesabım → Rezervasyonlar**
2. Jede Buchungskarte hat neben „Details anzeigen“ eine Schaltfläche „Sorun Bildir“
3. Klick → ein Modal mit Feldern für Titel und Beschreibung öffnet sich
4. Absenden → der Bericht wird mit `context_type=booking`, `context_id=<booking_id>`, `status=open` gespeichert
5. Eine E-Mail geht an den Plattformadministrator

### Ein Fahrzeug zurückziehen (die Not-2-Erweiterung)

Der Ablauf beim Zurückziehen ist der folgenreichste Kontext. Standardmäßig werden beim Zurückziehen eines Fahrzeugs 10 Punkte vom Zuverlässigkeitswert des Anbieters abgezogen und ein Belastungseintrag in das Finanz-Hauptbuch geschrieben (dessen Höhe vom bisherigen Rückzugsverlauf des Anbieters abhängt – der erste ist kostenlos, danach 10 % / 25 % des durchschnittlichen Monatsumsatzes).

Ab v4.35.0 kann der Anbieter beim Zurückziehen einen Grund angeben:

1. Der Anbieter öffnet **Hesabım → İlanlar**
2. Klick auf „Çek“ bei einem aktiven Fahrzeug
3. **Das Modal zur Erfassung des Grundes öffnet sich** (ersetzt den bisherigen `confirm()`-Dialog des Browsers)
4. Der Anbieter gibt einen Grund ein – mindestens 20 Zeichen erforderlich
5. Absenden → zwei Dinge geschehen nacheinander:
   - Ein `vehicle_action`-Bericht wird mit `status=open` erstellt
   - Der AJAX-Aufruf zum Zurückziehen wird ausgeführt
6. Innerhalb von `VehicleLifecycleManager::withdraw()` läuft der neue Filter `mhmrentiva_before_apply_penalty`. Der Callback `PenaltySuspensionHook` erkennt den offenen Bericht und gibt `false` zurück. **Punkteabzug und Belastung im Hauptbuch werden übersprungen.**
7. Das Fahrzeug wechselt trotzdem zu `withdrawn` (Beitragsstatus, Lifecycle-Meta und Sperrfrist-Datum werden gesetzt), aber die finanzielle Strafe wird bis zur Prüfung durch den Admin ausgesetzt.

Derselbe Ablauf gilt für Pausierungen.

### Einspruch gegen eine frühere Strafe

1. Der Anbieter öffnet **Hesabım → Güvenilirlik & Cezalar → Score History**
2. Jede Zeile, die eine Strafe darstellt (negatives Delta, das mit einem Fahrzeug verknüpft ist), hat eine Schaltfläche „Einspruch“
3. Klick → das Modal öffnet sich, der Titel ist mit `Appeal: <event> on <vehicle>` vorausgefüllt
4. Absenden → der Bericht wird mit `context_type=penalty`, `context_id=<ledger_uuid>` gespeichert

Hinweis: Einsprüche gegen Strafen machen den angewendeten Hauptbucheintrag derzeit nicht rückgängig – dafür ist der Helfer für Ausgleichsbuchungen erforderlich, der in v4.36.0+ kommt. Die Erledigung aktualisiert den Berichtsstatus, sendet dem Anbieter eine E-Mail und markiert den Einspruch zu Dokumentationszwecken als stattgegeben.

### Den Administrator kontaktieren

Jede Seite des Anbieter-Panels hat in der Fußzeile einen Link „Yöneticiye Yaz“. Dieser öffnet das Modal mit `context_type=general` (ohne `context_id`) und ermöglicht es dem Anbieter, dem Admin eine frei formulierte Nachricht zu senden. Verwende dies für Funktionsvorschläge, Fragen zum Konto oder alles, was in keinen der anderen vier Kontexte passt.

---

## Ablauf für Admins – einen Bericht bearbeiten

### Listenseite

**Yönetim → MHM Rentiva → Bayi Raporları** öffnet eine seitenweise Liste, gefiltert nach Status (Standard: `open`) und Kontext. Spalten:

- Berichts-ID
- Anbietername + ID
- Kontextbezeichnung (Rezervasyon / Araç / Araç işlemi / Ceza itirazı / Genel)
- Titel (Link zur Detailansicht)
- Status-Badge
- Erstellungsdatum
- Aktionsschaltfläche (Details öffnen)

### Detailseite

Ein Klick auf einen Bericht öffnet die Detailansicht mit:

- Berichtstitel (Überschrift)
- Status, Anbieter, Kontext (mit context_id-Link, falls zutreffend)
- Zeitstempel der Einreichung
- Vollständige Beschreibung in einem formatierten Block
- Vorhandene Admin-Notiz (falls vorhanden)
- Aktionsformular (nur für nicht abgeschlossene Berichte):
  - Optionales Textfeld für eine Admin-Notiz
  - Drei Absende-Schaltflächen: **Als erledigt markieren**, **Ablehnen**, **Als in Prüfung markieren**

### Nebenwirkungen der Erledigung

| Kontext | „Als erledigt markieren“ | „Ablehnen“ |
| :--- | :--- | :--- |
| `booking` | Statusaktualisierung + E-Mail an den Anbieter | Gleich |
| `mhmrentiva_vehicle` | Gleich | Gleich |
| `vehicle_action` | **Keine Aktion** – die Strafe wurde bereits beim Zurückziehen ausgesetzt, der Anbieter behält seine Punkte | **`apply_deferred_penalty()` wird ausgeführt** – `ReliabilityScoreCalculator::update()` berechnet neu (der Rückzug ist im Zustand enthalten, daher sinkt der Wert) und `PenaltyRecorder::record_penalty()` schreibt die zurückgestellte Belastung ins Hauptbuch |
| `penalty` | (v4.36.0+ – Helfer für Ausgleichsbuchungen im Hauptbuch) | Keine Aktion (Strafe bereits angewendet; die Ablehnung schließt lediglich den Einspruch) |
| `general` | Statusaktualisierung + E-Mail | Gleich |

Beide Entscheidungen senden dem Anbieter eine E-Mail (Vorlage `vendor_report_resolved`) mit der Admin-Notiz und dem neuen Status.

### Als in Prüfung markieren

Setzt `status=in_review`. Die Aussetzung der Strafe bleibt aktiv (in_review zählt für den Filter-Callback als „offen“). Keine E-Mail an den Anbieter – dies ist eine interne Markierung für die Sichtung.

---

## Der Straffilter – `mhmrentiva_before_apply_penalty`

Zwei Filter-Hook-Punkte umschließen den Punkteabzug und den Hauptbucheintrag. Plugins oder Themes können sich in diesen Filter einhängen, um über Anbieterberichte hinaus weitere Gründe für eine Aussetzung einzuführen:

```php
/**
 * @param bool   $apply      Whether to apply the penalty. Default true.
 * @param int    $vehicle_id Vehicle post ID.
 * @param int    $vendor_id  Vendor user ID.
 * @param string $reason     Penalty reason ('withdrawal').
 * @param float  $penalty    Pre-calculated penalty amount.
 */
add_filter('mhmrentiva_before_apply_penalty', function ($apply, $vehicle_id, $vendor_id, $reason, $penalty) {
    if ($reason === 'withdrawal' && my_holiday_freeze_active()) {
        return false; // suspend penalties during a platform-wide freeze
    }
    return $apply;
}, 20, 5);
```

Das plugineigene `PenaltySuspensionHook` registriert sich mit Priorität 10. Jeder Filter-Callback, der `false` zurückgibt, blockiert die Strafe für diesen Hook-Aufruf; ein offener vendor_action-Bericht ist nur einer von mehreren möglichen Gründen.

---

## Datenbank

Neue eigene Tabelle `{prefix}mhmrentiva_vendor_reports`:

| Spalte | Typ | Hinweise |
| :--- | :--- | :--- |
| `id` | BIGINT UNSIGNED AUTO_INCREMENT | Primärschlüssel |
| `vendor_id` | BIGINT UNSIGNED | Indiziert |
| `context_type` | VARCHAR(20) | `booking` / `mhmrentiva_vehicle` / `vehicle_action` / `penalty` / `general` |
| `context_id` | VARCHAR(64) | Integer-ID, Hauptbuch-UUID oder NULL |
| `title` | VARCHAR(255) | |
| `description` | LONGTEXT | Mindestens 20 Zeichen, in der Service-Schicht erzwungen |
| `status` | VARCHAR(20) | `open` / `in_review` / `resolved` / `rejected` |
| `admin_note` | LONGTEXT | NULL bis zur ersten Admin-Aktion |
| `admin_user_id` | BIGINT UNSIGNED | NULL bis zur ersten Admin-Aktion |
| `created_at` | DATETIME | |
| `updated_at` | DATETIME | |
| `resolved_at` | DATETIME | Wird gesetzt, wenn der Status in einen Endzustand wechselt (resolved/rejected) |

Indizes: `vendor_id`, `context_type`, `context_id`, `status`, zusammengesetzt `(vendor_id, status)`, zusammengesetzt `(context_type, context_id, status)` (der häufig genutzte Pfad für die Suche nach offenen Berichten), `created_at`.

Migrationsklasse: `src/Core/Database/Migrations/VendorReportsMigration.php`. Registriert in `DatabaseMigrator::run_migrations()`. `DatabaseMigrator::CURRENT_VERSION` wurde von 3.5.0 auf 3.6.0 angehoben, um die Migration bei bestehenden Installationen auszulösen.

---

## Lite vs. Pro

Das gesamte Anbieterberichtssystem ist durch `Mode::canUseVendorMarketplace()` abgesichert. Bei Lite-Plänen:

- Das Admin-Untermenü „Bayi Raporları“ wird nicht registriert.
- Der AJAX-Handler gibt 403 zurück.
- Das gemeinsame Modal wird nicht eingebunden.
- Der Filter-Callback für Strafen wird weiterhin registriert, gibt aber immer `apply` unverändert zurück (keine offenen Berichte, da Anbieter keine einreichen können).

Im Ergebnis ziehen Lite-Anbieter Fahrzeuge auf die alte Weise zurück – direkte Strafe, keine Erfassung des Grundes, kein Einspruchsweg. Ein Upgrade auf Pro schaltet das vollständige System frei.

Um dies lokal zu testen, aktiviere eine echte Lizenz auf der lokalen Website – seit 5.0.0 gibt es keine Konstante und keine Einstellung, die Pro ohne verifiziertes Lizenz-Token freischaltet.

---

## Erweiterungspunkte für Entwickler

| Hook / Klasse | Zweck |
| :--- | :--- |
| `mhmrentiva_before_apply_penalty` | Filter – steuert den Punkteabzug und den Hauptbucheintrag. Signatur mit 5 Argumenten. |
| `mhmrentiva_vendor_report_created` | Action – wird ausgelöst, nachdem ein Bericht gespeichert wurde. Das E-Mail-Subsystem lauscht darauf. 3 Argumente. |
| `mhmrentiva_vendor_report_resolved` | Action – wird ausgelöst, nachdem der Status in einen Endzustand gewechselt ist. 3 Argumente (report_id, vendor_id, new_status). |
| `VendorReportRepository` | Öffentliche API: `create()`, `find()`, `update_status()`, `find_by_vendor()`, `has_open_report_for()`, `reset_has_open_cache()` |
| `VendorReportService` | Öffentliche API: `create_report()`, `resolve_report()`, `reject_report()` |

---

## React-Komponenten (v4.40.0+)

| Komponente | Zweck |
| :--- | :--- |
| `VendorReportsPage` | Root – Steuerung von Listen- und Detailansicht |
| `FilterBar` | Filtersteuerelemente für Status und Kontext |
| `ReportTable` | Seitenweise, filterbare Berichtsliste |
| `DetailView` | Vollständige Berichtsdetails mit Anbieterinfos und Beschreibung |
| `ActionForm` | Formular zum Erledigen / Ablehnen / Als in Prüfung markieren mit Admin-Notiz |
| `StatusBadge` | Farbcodiertes Status-Badge (open / in_review / resolved / rejected) |

**REST-Endpunkte:**
- `GET /wp-json/mhm-rentiva/v1/vendor-reports` – seitenweise Liste, filterbar nach Status und Kontext
- `GET /wp-json/mhm-rentiva/v1/vendor-reports/{id}` – Details eines einzelnen Berichts

Alle Endpunkte erfordern die Berechtigung `manage_options`.

---

### Änderungsprotokoll

| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 06.05.2026 | 4.40.0 | Vollständige Migration zur React SPA. VendorReportsPage, FilterBar, ReportTable, DetailView, ActionForm, StatusBadge. Flash-Flag-Muster über `window.mhmRentivaVendorReports.flash`. |
| 23.04.2026 | 4.27.2 | Dokumentation mit der aktuellen Plugin-Version synchronisiert. |
| 05.04.2026 | 4.35.0 | Erste Version – Anbieterberichtssystem eingeführt. 5 Kontexte (booking, vehicle, vehicle_action, penalty, general), Filter zur Aussetzung von Strafen, eigene DB-Tabelle. |

---

## Siehe auch

- [Versionshinweise zu v4.35.0](/blog/rentiva-v4.35.0-release) – Einführung der Funktion
- [Fahrzeug-Lebenszyklus](./vehicle-lifecycle) – Ablauf für Pausieren/Zurückziehen/Ablaufen, in den sich der Kontext `vehicle_action` integriert
- [Anbieter-Bewerbung](./shortcodes/vendor-apply) – wie Anbieter überhaupt dem Marktplatz beitreten
