---
title: "Anbieterverzeichnis"
description: "Nutzungsanleitung und technische Referenz für das Modul „Anbieterverzeichnis“ – öffentlicher Katalog aktiver Anbieter mit Filtern für Stadt, Abzeichen und Bewertung."
sidebar_position: 27
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite dokumentiert eine Funktion des Add-ons **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und erfordert, dass Pro zusätzlich zu Lite installiert ist, sowie eine gültige Lizenz.
Siehe [Editionen – Lite vs. Pro](/docs/) für die vollständige Aufteilung oder hol dir Pro unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Zweck
Diese Seite dokumentiert das Modul „Anbieterverzeichnis“ – den Pro-pflichtigen öffentlichen Katalog unter `/vendors/` (EN) / `/bayiler/` (TR), der jeden aktiven Anbieter mit Filtern für Stadt, Abzeichen und Mindestbewertung auflistet. Behandelt werden die Nutzung im Betrieb, die Attributreferenz, Schema/SEO und Erweiterungspunkte für Entwickler.

Eingeführt in [v4.38.0](/blog/rentiva-v4.38.0-release); Lebenszyklus-Parität der Fahrzeuganzahl, Strict-Type-Korrektur der Paginierung sowie Paritätsprüfungen für SEO/Cache kamen in [v4.38.1](/blog/rentiva-v4.38.1-release) hinzu.
:::

# 🗂️ Anbieterverzeichnis

## Inhalt
- Was dieses Modul ist
- URL-Struktur (`/vendors/` EN, `/bayiler/` TR)
- Verwendung im Frontend (Shortcode / Gutenberg-Block / Elementor-Widget)
- Filter-Oberfläche (Stadt, Abzeichen, Mindestbewertung, Sortierung)
- Paginierung
- Attributreferenz (8 Attribute)
- Schema.org `ItemList` + `BreadcrumbList` JSON-LD
- Cache-Strategie (30-Minuten-Transient + Invalidierung per Präfix-Platzhalter)
- Erweiterungspunkte für Entwickler (5 Filter-Hooks + `seo_disable`-Notschalter)
- Zweistufige Pro-Sperre
- Leere Zustände

Das Anbieterverzeichnis schließt den Entdeckungskreislauf des Marktplatzes. Profilseiten gibt es bereits (eingeführt in [v4.37.0](/blog/rentiva-v4.37.0-release)), sie sind aber ohne eine Liste nicht erreichbar. Das Verzeichnis ist diese Liste – serverseitig gerendert, ohne JavaScript nutzbar, SEO-orientiert, im Stil von Dokan.

## Was dieses Modul ist

Eine **Entdeckungsoberfläche für Anbieter**, analog dazu, wie `[rentiva_vehicles_grid]` eine Entdeckungsoberfläche für Fahrzeuge ist. Kunden kennen die Namen der Anbieter in der Regel nicht im Voraus; sie möchten eine Liste durchsehen, nach Ort filtern und ein Profil anklicken. Das Anbieterverzeichnis ist genau diese Übersichtsliste – in einer Form, die auch Crawler und Screenreader verstehen.

Drei Darstellungsoberflächen nutzen einen gemeinsamen kanonischen Renderer (Render-Paritäts-Vertrag):

| Oberfläche | Bezeichner |
| :--- | :--- |
| Shortcode | `[rentiva_vendor_directory]` |
| Gutenberg-Block | `mhm-rentiva/vendor-directory` (Titel „MHM Vendor Directory“) |
| Elementor-Widget | `mhmrentiva_vendor_directory` (Titel „MHM Vendor Directory“) |

Block und Widget delegieren über `do_shortcode()` an den Shortcode. Was auch immer der Shortcode rendert, rendern Block und Widget identisch – kein doppelter Codepfad.

Zusätzlich zur manuellen Platzierung registriert das Modul eine **Rewrite-Regel**, die unter `/{base}/` automatisch eine ganzseitige Hülle ausliefert – es ist keine WordPress-Seite nötig.

## URL-Struktur

Das Basissegment ist übersetzbar:

| Sprache | URL |
| :--- | :--- |
| EN (Standard) | `/vendors/` |
| TR | `/bayiler/` (`.po`-Übersetzung von `_x('vendors', 'URL slug', ...)`) |
| Benutzerdefiniert | Mit dem Filter `mhmrentiva_vendor_directory_url_base` überschreiben |

Die Basis steht neben der Basis des Anbieterprofils, ist aber davon getrennt – das Profil betrifft einen einzelnen Anbieter mit einer Slug-Erfassungsgruppe (`/vendor/{slug}/`), das Verzeichnis besteht nur aus der Basis (`/vendors/`).

Filter-, Sortier- und Paginierungsstatus werden im Query-String übertragen:

```
/vendors/?city=Istanbul&badge=verified&min_rating=4&sort=rating&paged=2
```

Jede Kombination ist eine eindeutige, indexierbare URL – Suchmaschinen crawlen die vollständige Filtermatrix.

## Verwendung im Frontend

### Manuelle Platzierung (Seite oder Beitrag)

Füge den Shortcode in eine beliebige Seite ein:

```shortcode
[rentiva_vendor_directory]
```

Damit wird die Standardansicht gerendert – 12 Anbieter pro Seite, absteigend nach Bewertung sortiert, alle Oberflächenbereiche sichtbar.

Konfiguriertes Beispiel:

```shortcode
[rentiva_vendor_directory
    per_page="12"
    default_sort="rating"
    show_filter_bar="yes"
    show_breadcrumb="yes"
    show_pagination="yes"
    empty_message="Şu an aktif bayi bulunmuyor."]
```

### Gutenberg-Block

Füge den Block **MHM Vendor Directory** über den Inserter hinzu (Kategorie: Widgets). Die Inspector-Steuerelemente stellen jedes Shortcode-Attribut in Inspector-Panels bereit.

### Elementor-Widget

Füge das Widget **MHM Vendor Directory** über das Elementor-Panel hinzu (Kategorie: MHM Rentiva). Automatisch angeglichene Steuerelemente entsprechen den Shortcode-Attributen.

## Filter-Oberfläche

Die Standard-Filterleiste ist eine horizontale Reihe aus vier `<select>`-Dropdowns + einem Absende-Button „Anwenden“ (`<form method="get">`). Jedes Steuerelement ist ein natives HTML-Element – das Formular funktioniert ohne JavaScript. Die JS-Schicht (sofern aktiviert) ergänzt als Progressive Enhancement ein optionales automatisches Absenden beim `change`-Ereignis.

| Steuerelement | Query-Parameter | Optionen |
| :--- | :--- | :--- |
| Stadt | `city` | Alle Städte (Firmensitze der Anbieter ∪ Abholorte der Fahrzeuge, ohne Duplikate) |
| Abzeichen | `badge` | Alle / Verifizierte Anbieter / Neue Anbieter |
| Mindestbewertung | `min_rating` | Alle Bewertungen / 3+ ★ / 4+ ★ / 5 ★ |
| Sortieren | `sort` | Beste Bewertung (Standard) / Neueste / A → Z |

Auf Mobilgeräten (≤600px) klappt die Filterleiste zu zwei Buttons zusammen („Filter (N)“ + „Sortieren“), die über ein natives `<details>`-Element ein Vollbild-Panel öffnen – weiterhin ohne JS.

### Standardsortierung: Bewertung absteigend, Neueste als Gleichstandsregel

Absteigende Bewertung ist der Standard, weil so die stärksten Anbieter zuerst erscheinen. Anbieter ohne Bewertungen (oder mit identischer Bewertung) werden nach `user_registered` absteigend sortiert – neuere Konten erscheinen bei gleicher Bewertung vor älteren, damit ein junger Marktplatz nicht stagnierend wirkt.

## Paginierung

Klassische Paginierung mit Seitenzahlen – Query-Parameter `?paged=N`, kein AJAX. Standard sind 12 pro Seite (4 Spalten × 3 Zeilen auf dem Desktop, 2 × 6 auf dem Tablet, 1 × 12 auf dem Smartphone). Der Selektor `.current` ist unter `.mhm-vendor-directory-pagination` eingegrenzt, damit `.current`-Regeln des Themes das Styling nicht übernehmen (seit [v4.38.1](/blog/rentiva-v4.38.1-release) in Regressionstests geprüft).

## Attributreferenz

Alle 8 Attribute akzeptieren die kanonische snake_case-Form (vom Shortcode verwendet) und einen camelCase-Alias (von Block / Widget verwendet).

| Attribut | Standard | Typ | Zweck |
| :--- | :--- | :--- | :--- |
| `per_page` | `12` | int (1-50) | Karten pro Seite. Wird auf den Bereich begrenzt. |
| `default_sort` | `rating` | enum | Standardsortierung, wenn `?sort=` fehlt. Optionen: `rating`, `newest`, `alpha`. |
| `show_filter_bar` | `yes` | bool | Filterleiste über dem Raster rendern. |
| `show_breadcrumb` | `yes` | bool | `Anasayfa › Bayiler`-Breadcrumb des Plugins rendern (automatisch deaktiviert, wenn ein SEO-Plugin aktiv ist – siehe Schema/SEO unten). |
| `show_pagination` | `yes` | bool | Seitenzahlen-Navigation unterhalb des Rasters rendern. |
| `empty_message` | leer | string | Überschreibt den Text „No vendors matched these criteria.“ (leerer Zweig beim Filterergebnis). |
| `class` | leer | string | Zusätzliche CSS-Klasse(n) auf dem Wrapper. Mehrere Tokens möglich; jedes wird einzeln bereinigt. |
| `id` | leer | string | DOM-ID am Wrapper-Element. Bereinigt über `sanitize_html_class()`. |

## Schema.org `ItemList` + `BreadcrumbList` JSON-LD

Das Modul gibt für die Verzeichnisseite zwei `<script type="application/ld+json">`-Blöcke in `<head>` aus:

- **`ItemList`** – geordnete Liste der URLs der Anbieterprofile (nur die gerenderte Seite, nicht die gesamte Ergebnismenge, damit die Datenmenge begrenzt bleibt).
- **`BreadcrumbList`** – der `Home › Vendors`-Pfad, der den sichtbaren Breadcrumb widerspiegelt.

Die JSON-Kodierung nutzt `JSON_HEX_TAG | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES` – türkische Zeichen bleiben erhalten, schädliche `</script>`-Injektionen werden hex-kodiert.

### SEO-Plugin-Prüfung – zieht sich automatisch zurück

Sowohl die JSON-LD-Ausgabe als auch der sichtbare Breadcrumb sind **wirkungslos, wenn ein gängiges SEO-Plugin aktiv ist**. Geprüft wird auf:

- Yoast SEO (Konstante `WPSEO_VERSION` oder Klasse `WPSEO_Frontend`)
- Rank Math (Konstante `RANK_MATH_VERSION` oder Klasse `RankMath`)
- All in One SEO (Konstante `AIOSEO_VERSION` oder Klasse `AIOSEO\Plugin\AIOSEO`)
- SEOPress (Konstante `SEOPRESS_VERSION`)
- The SEO Framework (Konstante `THE_SEO_FRAMEWORK_VERSION`)
- SmartCrawl (Konstante `SMARTCRAWL_VERSION` oder Klasse `Smartcrawl_Init`)

Google straft doppeltes Schema ab, und diese Plugins bieten umfangreichere Einstellungsoberflächen als unseres, daher überlassen wir ihnen den Vortritt. Die Prüfung läuft sowohl beim frühen Return in `register()` (seit [v4.38.1](/blog/rentiva-v4.38.1-release)) als auch in jedem Callback als defensive zweite Ebene (falls ein SEO-Plugin erst nach unserer Verdrahtung geladen wird).

Seitentitel (Standard: `Vendors — {site name}`) und Meta-Beschreibung (Standard: `Discover all our vendors. {N} vendors · {M} vehicles`) folgen derselben Prüfung – sie werden nur ausgegeben, wenn kein SEO-Plugin aktiv ist. Beide Standardwerte lassen sich per Filter überschreiben (siehe Erweiterungspunkte für Entwickler).

## Cache-Strategie

Jede eindeutige Kombination aus Filter + Sortierung + Seite wird in einem Transient mit 30 Minuten TTL zwischengespeichert:

```
mhmrentiva_vendor_dir_{md5(query_args)}
```

Die Invalidierung ist eine **Teilmenge des Invalidators für Anbieterprofile** – nur Felder, die die Verzeichnisliste beeinflussen, lösen ein Leeren aus:

- Änderung des user_meta `_mhmrentiva_vendor_status` (aktiv ↔ gesperrt)
- Änderung des user_meta `_mhmrentiva_vendor_city` (Filter-Dropdown + Ergebnismenge pro Stadt)
- Änderung des user_meta `_mhmrentiva_vendor_reliability_score` (Gruppen des Abzeichenfilters)
- `save_post_mhmrentiva_vehicle` (Hinzufügen/Entfernen von Fahrzeugen ändert vehicle_count + Städtepool)
- `mhmrentiva_vehicle_lifecycle_changed` (aktiv/zurückgezogen/pausiert beeinflusst die Aufnahme)
- `transition_comment_status` (Freigabe einer Bewertung ändert den Bewertungsdurchschnitt)
- `profile_update` (Änderung des Anzeigenamens beeinflusst Kartenbeschriftung + alphabetische Sortierung)

Änderungen der Biografie und Avatar-Uploads werden **absichtlich nicht invalidiert** – Verzeichniskarten zeigen diese Felder nicht an, ein Leeren wäre also verschwendete Arbeit. Der Cache wird über ein SQL-`DELETE` mit Präfix-Platzhalter geleert (eine Abfrage entfernt alle zwischengespeicherten Varianten auf einmal).

Wenn sich der Lebenszyklusstatus nicht tatsächlich ändert, tut der Invalidator nichts (analog zum No-op beim Kommentarstatus seit [v4.38.1](/blog/rentiva-v4.38.1-release)) – erneutes Speichern von Fahrzeugen ohne Lebenszyklusübergang hebelt den Cache nicht aus.

## Erweiterungspunkte für Entwickler

### `mhmrentiva_vendor_directory_url_base`

Überschreibt das URL-Basissegment. Nützlich für eigene Marktplatz-Slugs.

```php
add_filter('mhmrentiva_vendor_directory_url_base', function ($base) {
    return 'firmalar';
});
```

Der Sprachwechsel-Watcher erkennt den neuen Wert und leert die Rewrite-Regeln automatisch.

### `mhmrentiva_vendor_directory_per_page`

Überschreibt die Obergrenze pro Seite von außerhalb des Shortcodes. So kannst du eine websiteweite Vorgabe festlegen, ohne jede Block-/Widget-Instanz zu bearbeiten.

```php
add_filter('mhmrentiva_vendor_directory_per_page', function () {
    return 24;
});
```

### `mhmrentiva_vendor_directory_empty_message`

Filtert den Text „keine Anbieter gefunden“. Zwei Kontexte:

- Leeres Filterergebnis (der Nutzer hat bis auf null Treffer gefiltert)
- Websiteweit null (nirgendwo aktive Anbieter)

Überschreibe abhängig vom Kontext:

```php
add_filter('mhmrentiva_vendor_directory_empty_message', function ($message, $context) {
    if ($context === 'site_wide_zero') {
        return 'Henüz kayıtlı bayimiz yok. Yakında!';
    }
    return $message;
}, 10, 2);
```

### `mhmrentiva_vendor_directory_page_title`

Überschreibt den Seitentitel (Standard: `Vendors — {site name}`). Wird von `VendorDirectorySeo::build_title()` zurückgegeben. Wirkungslos, wenn ein SEO-Plugin aktiv ist.

### `mhmrentiva_vendor_directory_meta_description`

Überschreibt die Meta-Beschreibung. Der Filter erhält drei Argumente – Standardtext, Anzahl der Anbieter, Anzahl der Fahrzeuge –, sodass du kontextbezogene Texte erstellen kannst.

```php
add_filter('mhmrentiva_vendor_directory_meta_description',
    function (string $default, int $vendor_count, int $vehicle_count): string {
        return sprintf(
            'Antalya rent-a-car marketplace — %d aktif bayi, %d araç.',
            $vendor_count,
            $vehicle_count
        );
    },
    10,
    3
);
```

### `mhmrentiva_vendor_directory_seo_disable`

Globaler Notschalter sowohl für das Schema-JSON-LD als auch für die Ausgabe von Titel/Beschreibung. Gibt standardmäßig `false` zurück; setze ihn auf `true`, um dich vollständig abzumelden (typischerweise, weil dein Theme die Verzeichnis-Metadaten auf eigene Weise verarbeitet).

```php
add_filter('mhmrentiva_vendor_directory_seo_disable', '__return_true');
```

## Zweistufige Pro-Sperre

Das Anbieterverzeichnis ist eine **reine Pro-Funktion** – es erfordert das Flag `vendor_marketplace`. Lite-Nutzer stoßen auf zwei Sperren:

1. **Sperre beim Dispatch** – der `template_redirect`-Handler gibt für `/{base}/`-Anfragen einen WordPress-404 zurück, wenn `Mode::canUseVendorMarketplace()` false ist. Der Nutzer sieht die 404-Seite des Themes.
2. **Sperre beim Rendern** – manuelle Shortcode-Nutzung durch Lite-Nutzer (Block / Widget / Shortcode in einer Seite) gibt einen leeren String zurück. Kein Upsell-Modal, kein Fehlerprotokoll, kein halb gerendertes HTML.

Upgrade-Hinweise befinden sich auf `/pricing` und im bestehenden Shortcode `[mhmrentiva_pricing_table]`.

## Leere Zustände

| Zustand | Darstellung |
| :--- | :--- |
| Leeres Filterergebnis (aktive Anbieter vorhanden, Filter schließen alle aus) | „Bu kriterlere uyan bayi bulunamadı.“ + Link „Filtreleri Temizle“, der zu `/{base}/` zurückführt |
| Websiteweit null (nirgendwo aktive Anbieter) | „Henüz kayıtlı bayimiz yok. Yakında!“ – per Filter überschreibbar |
| Lite-Nutzer | WordPress-404 (Dispatch-Sperre) oder leerer String (manuelle Platzierung) |

## Siehe auch

- [Versionshinweise v4.38.0](/blog/rentiva-v4.38.0-release) – ursprüngliche Einführung der Funktion
- [Versionshinweise v4.38.1](/blog/rentiva-v4.38.1-release) – Lebenszyklus-Parität der Fahrzeuganzahl, Strict-Type-Korrektur der Paginierung, Paritätsprüfungen für SEO/Cache
- [Shortcode für das öffentliche Anbieterprofil](./vendor-profile) – die Zielseite, auf die jede Verzeichniskarte verlinkt
- [Shortcode für das Anbieter-Bewerbungsformular](./vendor-apply) – das Onboarding-Formular
- [Anbieter-Onboarding](/docs/vendor/onboarding) – wie Anbieter überhaupt ins Verzeichnis gelangen
