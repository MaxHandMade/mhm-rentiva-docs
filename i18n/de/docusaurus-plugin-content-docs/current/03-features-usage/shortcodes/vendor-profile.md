---
title: "Öffentliches Anbieterprofil"
description: "Anleitung und technische Referenz für das Modul „Öffentliches Anbieterprofil“ – Shortcode, Gutenberg-Block und Elementor-Widget."
sidebar_position: 26
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite dokumentiert eine Funktion des Add-ons **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und erfordert, dass Pro zusätzlich zu Lite installiert ist, sowie eine gültige Lizenz.
Siehe [Editionen – Lite vs. Pro](/docs/) für die vollständige Aufteilung oder hol dir Pro unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Zweck
Diese Seite dokumentiert das Modul „Öffentliches Anbieterprofil“ – die öffentliche Vertrauensseite, auf der Kunden landen, bevor sie bei einem Anbieter buchen. Behandelt werden die Nutzung im Betrieb, die vollständige Attributreferenz, das Schema-/SEO-Verhalten und die Erweiterungspunkte für Entwickler.

Eingeführt in [v4.37.0](/blog/rentiva-v4.37.0-release); Anbindung des Badge-Filters + Fallback für Bewertungs-Metadaten hinzugefügt in [v4.37.1](/blog/rentiva-v4.37.1-release); UX-Verbesserungen (Avatar, Fahrzeug-Vorschaubilder, SEO-Prüfung, mobiler Breakpoint) in [v4.37.2](/blog/rentiva-v4.37.2-release); Korrektur von Slug-Kollisionen bei der Bearbeitung im Adminbereich in [v4.38.1](/blog/rentiva-v4.38.1-release).
:::

# 👤 Öffentliches Anbieterprofil

## Inhalt
- Was dieses Modul ist
- URL-Struktur (`/vendor/{slug}/` EN, `/bayi/{slug}/` TR)
- Admin-Ablauf – Slug, Avatar, Badge-Berechtigung
- Nutzung im Frontend (Shortcode / Gutenberg-Block / Elementor-Widget)
- Attributreferenz (12 Attribute)
- Schema.org `LocalBusiness` JSON-LD + Prüfung auf SEO-Plugins
- Erweiterungspunkte für Entwickler (6 Filter-Hooks)
- Verhalten in Lite vs. Pro
- Leere Zustände

Das Modul „Öffentliches Anbieterprofil“ gibt jedem freigegebenen Anbieter eine eigene Vertrauensseite unter einer sauberen, teilbaren URL. Besucher können sich vor der Buchung die Identität des Anbieters, den Badge-Status, eine Übersicht der Flotte, aktuelle Bewertungen und den Standort ansehen – und so die Vertrauenslücke zwischen „Ich sehe ein Fahrzeug, das mir gefällt“ und „Ich bin bereit, dieser Person meine Daten zu schicken“ schließen.

## Was dieses Modul ist

Eine **Conversion-Fläche für den Marktplatz**, kein Admin-Panel. Das Anbieter-Bewerbungsformular (`[rentiva_vendor_apply]`) übernimmt das Onboarding; die Seite „Anbieter-Panel“ (Rentiva Pro 6.2.0+) übernimmt den Betrieb. Das öffentliche Anbieterprofil ist die öffentliche, schreibgeschützte Ansicht, die ein Kunde sieht, wenn er auf einer Fahrzeugkarte auf „Anbieter ansehen“ klickt oder über die Suche bzw. einen geteilten Link dorthin gelangt.

Drei Darstellungsflächen teilen sich einen einzigen kanonischen Renderer (Render-Parity-Vertrag):

| Fläche | Bezeichner |
| :--- | :--- |
| Shortcode | `[rentiva_vendor_profile]` |
| Gutenberg-Block | `mhm-rentiva/vendor-profile` (Titel „MHM Vendor Profile“) |
| Elementor-Widget | `mhmrentiva_vendor_profile` (Titel „MHM Vendor Profile“) |

Block und Widget delegieren über `do_shortcode()` an den Shortcode. Was immer der Shortcode ausgibt, geben Block und Widget identisch aus – kein doppelter Codepfad.

Zusätzlich zur manuellen Platzierung registriert das Modul eine **Rewrite-Regel**, die unter `/{base}/{slug}/` automatisch eine ganzseitige Darstellung ausliefert. Sobald einem Anbieter ein Slug zugewiesen ist (manuell oder automatisch erzeugt), ist die Seite erreichbar, ohne dass du dafür eine WordPress-Seite anlegen musst.

## URL-Struktur

Das Basissegment ist übersetzbar:

| Sprache | URL |
| :--- | :--- |
| EN (Standard) | `/vendor/{slug}/` |
| TR | `/bayi/{slug}/` (`.po`-Übersetzung von `_x('vendor', 'URL slug', ...)`) |
| Benutzerdefiniert | Mit dem Filter `mhmrentiva_vendor_profile_url_base` überschreiben |

Der Slug ist immer ASCII (lateinisch) – `sanitize_title(remove_accents($display_name))`. Türkische diakritische Zeichen im Anzeigenamen (z. B. „Akif Ötömötiv Şirketi“) werden in ASCII umgewandelt (`akif-otomotiv-sirketi`), damit die URL in jedem Browser, E-Mail-Programm und älteren Teilen-Ziel sicher funktioniert.

Änderungen am Slug erzeugen eine dauerhafte **301-Weiterleitung** von der alten URL – der bisherige Slug wird an ein Verlaufs-Meta angehängt, das auf 10 Einträge begrenzt ist, und `VendorProfileRewrite::handle_request()` erkennt alte Slugs und leitet auf den aktuellen weiter.

## Admin-Ablauf

### 1. Slug & Avatar – Benutzerprofil des Anbieters

Gehe für den Anbieter zu **Benutzer → Benutzer bearbeiten**. Unter „MHM Rentiva Anbieter-Einstellungen“ erscheinen drei neue Felder:

- **Standard-Filiale/-Standort** – betrieblich, ohne Bezug zum öffentlichen Profil.
- **Anbieter-Avatar** – eigener Upload über die WP-Mediathek. Ist das Feld leer, greift das öffentliche Profil auf Gravatar (passende E-Mail-Adresse) und zuletzt auf einen deterministischen SVG-Initialen-Avatar zurück, der aus dem Anzeigenamen abgeleitet wird (so erhält jeder Anbieter ein unverwechselbares, themeunabhängiges Identitätsbild ohne „Mystery Man“).
- **Titelform der öffentlichen Profil-URL** – manuell festlegen oder leer lassen, damit sie automatisch aus dem Anzeigenamen erzeugt wird. Eine Änderung erstellt automatisch eine 301-Weiterleitung von der alten URL.

Das Speichern läuft (seit [v4.38.1](/blog/rentiva-v4.38.1-release)) über `VendorSlugManager::change_slug()`, sodass Kollisionssuffixe (`-2`, `-3`, …) automatisch angehängt werden, wenn zwei Anbieter denselben Roh-Slug übermitteln.

### 2. Badge-Berechtigung – automatisiert

Das Badge „✓ Verifizierter Anbieter“ wird vollständig über Schwellenwerte gesteuert. Ein Anbieter gilt als verifiziert, wenn **alle drei** Bedingungen erfüllt sind:

| Schwellenwert | Standard | Einstellungsschlüssel |
| :--- | :--- | :--- |
| Kontoalter (Tage seit Freigabe) | 180 | `vendor_badge_min_age_days` |
| Zuverlässigkeitswert (0–100) | 80 | `vendor_badge_min_score` |
| Abgeschlossene Buchungen (insgesamt) | 10 | `vendor_badge_min_completed_bookings` |

Passe sie unter **MHM Rentiva → Einstellungen → Anbieter-Marktplatz** an (oder überschreibe sie pro Anbieter mit dem Filter `mhmrentiva_vendor_badge_eligibility`, siehe „Erweiterungspunkte für Entwickler“).

Anbieter, die noch nicht alle drei Schwellenwerte erreicht haben, erhalten stattdessen den Hinweis „Yeni Bayi“ – eine positive Darstellung für neue Konten, ohne negatives Signal in irgendeine Richtung.

### 3. Bio, Stadt – aus dem Onboarding übernommen

Der Abschnitt „Über“ liest aus `_mhmrentiva_vendor_bio` (beim Onboarding erfasst). Die Hero-Zeile „📍 Stadt · Mitglied seit JJJJ“ liest aus `_mhmrentiva_vendor_city` und `_mhmrentiva_vendor_approved_at`. Anbieter können beides jederzeit über ihr Dashboard aktualisieren – Änderungen machen den 1-Stunden-Transient-Cache automatisch ungültig.

## Nutzung im Frontend

### Manuelle Platzierung (Seite oder Beitrag)

Bei den meisten Installationen übernimmt die Rewrite-Regel die Arbeit: Der Slug eines Anbieters genügt, es muss keine Seite angelegt werden. Du kannst den Shortcode aber auch an beliebiger Stelle einfügen:

```shortcode
[rentiva_vendor_profile slug="akif-otomotiv"]
```

Konfiguriertes Beispiel:

```shortcode
[rentiva_vendor_profile
    slug="akif-otomotiv"
    show_badge="yes"
    show_about="yes"
    show_vehicles="yes"
    max_vehicles="6"
    vehicle_sort="rating-newest"
    show_reviews="yes"
    max_reviews="10"
    show_location="no"]
```

Wenn `slug` leer ist UND die Seite über die Rewrite-Regel aufgerufen wird, wird der Slug automatisch aus der Query-Variable `mhmrentiva_vendor_slug` gelesen.

### Gutenberg-Block

Füge den Block **MHM Vendor Profile** über den Inserter hinzu (Kategorie: Widgets). Die Inspector-Steuerelemente stellen jedes Shortcode-Attribut in Inspector-Panels bereit.

### Elementor-Widget

Füge das Widget **MHM Vendor Profile** über das Elementor-Panel hinzu (Kategorie: MHM Rentiva). Automatisch abgeglichene Steuerelemente entsprechen den Shortcode-Attributen; die Standard-Styling-Steuerelemente des Elementor-Wrappers (Außenabstand, Innenabstand, Farbe, Typografie) umschließen das ausgegebene HTML.

## Attributreferenz

Alle 12 Attribute akzeptieren die kanonische snake_case-Form (vom Shortcode verwendet) und einen camelCase-Alias (vom Block / Widget verwendet). Der CAM (Canonical Attribute Mapper) des Plugins normalisiert beide auf dieselbe interne Form.

| Attribut | Standard | Typ | Zweck |
| :--- | :--- | :--- | :--- |
| `slug` | leer | string | Anbieter-Slug. Leer + über Rewrite-Regel aufgerufene Seite liest aus der Query-Variable. |
| `show_badge` | `yes` | bool | Den Hinweis „✓ Verifizierter Anbieter“ / „Yeni Bayi“ im Hero anzeigen. |
| `show_rating` | `yes` | bool | Die Gesamtbewertungsleiste (★★★★½ 4.6) und die Anzahl der Bewertungen im Hero anzeigen. |
| `show_about` | `yes` | bool | Den Abschnitt „Über“ ausgeben (ausgeblendet, wenn `_mhmrentiva_vendor_bio` leer ist). |
| `show_vehicles` | `yes` | bool | Den Rasterabschnitt mit aktiven Fahrzeugen ausgeben. |
| `max_vehicles` | `6` | int (1–50) | Maximale Anzahl ausgegebener Fahrzeugkarten. Wird auf den Bereich begrenzt. |
| `vehicle_sort` | `rating-newest` | enum | Sortierreihenfolge für das Fahrzeugraster. Derzeit nur ein Modus (Bewertung absteigend, dann `post_date` absteigend). |
| `show_reviews` | `yes` | bool | Den Abschnitt mit aktuellen Bewertungen ausgeben. |
| `max_reviews` | `10` | int (1–50) | Maximale Anzahl ausgegebener Bewertungen. Jede Bewertung verlinkt zurück auf das zugehörige Fahrzeug. |
| `show_location` | `no` | bool | Den eigenen Abschnitt „Standort“ ausgeben. **Standard in v4.37.2 auf `no` geändert** – der Hero zeigt die Stadt bereits an. Der eigene Abschnitt ist für die Transfer-Karten-Erweiterung ab v4.40.0 reserviert; bis dahin dupliziert er die Hero-Metadaten. |
| `empty_vehicles_message` | leer | string | Überschreibt den Text „Dieser Anbieter bietet derzeit keine Fahrzeuge an.“ |
| `empty_reviews_message` | leer | string | Überschreibt den Text „Noch keine Bewertungen – sei der Erste, der eine abgibt.“ |
| `class` | leer | string | Zusätzliche CSS-Klasse(n) am Wrapper. Mehrere Tokens möglich; jedes wird einzeln bereinigt. |

### Datenschutzvertrag

Die folgenden user_meta-Schlüssel werden im öffentlichen Profil **niemals** ausgegeben, auch nicht bei extremen Attributkombinationen:

- `_mhmrentiva_vendor_phone` – für das Anbieter-Onboarding erfasst, nur für Admins sichtbar (Schutz vor Spam-Scraping).
- `_mhmrentiva_vendor_iban` – Finanzdaten.
- `_mhmrentiva_vendor_account_holder` – Finanzdaten.
- `_mhmrentiva_vendor_tax_number` – Finanzdaten.

Die Klasse `VendorProfileProvider` lässt per Allowlist genau die Felder zu, die in das Render-Array einfließen; sensible Felder werden nicht gelesen. Der Docblock des Filters `mhmrentiva_vendor_profile_data` warnt, dass über diesen Filter eingeschleuste sensible Werte in den 1-Stunden-Transient gelangen würden – halte Filter-Callbacks daher schreibgeschützt.

## Schema.org `LocalBusiness` JSON-LD + Prüfung auf SEO-Plugins

Das Modul gibt für jede aktive Anbieterprofilseite einen `<script type="application/ld+json">`-Block mit einem `LocalBusiness`-Schema in `<head>` aus. Befüllte Felder:

- `@type: LocalBusiness`
- `name` (Anzeigename, hex-kodiert gegen `</script>`-Injection – Flag JSON_HEX_TAG)
- `url` (kanonische Profil-URL)
- `address.addressLocality` (Stadt des Anbieters, sofern gesetzt)
- `aggregateRating` (gewichteter Durchschnitt auf Anbieterebene + Anzahl der Bewertungen, sofern mindestens 1 Bewertung vorhanden ist)

Die JSON-Kodierung verwendet `JSON_HEX_TAG | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES` – türkische Zeichen bleiben erhalten (`Ö` als Literal), schädliche `</script>`-Injections werden hex-kodiert.

Der Seitentitel (`{vendor name} — {site name}`) und die Meta-Beschreibung (Bio des Anbieters, an einer Wortgrenze auf 155 Zeichen gekürzt) werden **nur dann** ausgegeben, wenn kein SEO-Plugin aktiv ist. Die Prüfung umfasst Yoast SEO, Rank Math, AIOSEO, SEOPress, The SEO Framework und SmartCrawl; ist eines davon aktiv, bleibt unsere Ausgabe von Titel/Beschreibung wirkungslos (Google untersagt doppelte Metadaten, und diese Plugins bieten umfangreichere Einstellungsoberflächen).

Die Schema.org-JSON-LD-Ausgabe überlässt außerdem dem Canonical-Tag-Filter des SEO-Plugins den Vorrang, über `wpseo_canonical` (Yoast) und `rank_math/frontend/canonical` (Rank Math) mit Priorität `PHP_INT_MAX - 10`, damit die kanonische URL konsistent bleibt.

## Erweiterungspunkte für Entwickler

### `mhmrentiva_vendor_profile_url_base`

Überschreibt das Basissegment der URL. Nützlich, wenn du unabhängig von der Sprache einen eigenen Slug wie `/dealers/` oder `/firmalar/` möchtest.

```php
add_filter('mhmrentiva_vendor_profile_url_base', function ($base) {
    return 'firmalar';
});
```

Der Watcher für Sprachänderungen erkennt den neuen Wert und leert die Rewrite-Regeln automatisch.

### `mhmrentiva_vendor_profile_data`

Filtert das gesamte Render-Daten-Array (Identität, Badge-Status, Fahrzeugliste, Bewertungsaggregat, Schema-Daten), bevor das Template ausgeführt wird. Damit kannst du zusätzliche Felder einschleusen, die ein eigenes Template-Partial liest, oder Felder pro Seite entfernen.

```php
add_filter('mhmrentiva_vendor_profile_data', function (array $data) {
    $data['custom_extra_text'] = 'Member of Antalya Tourism Association';
    return $data;
});
```

**Per Konvention schreibgeschützt.** Hier eingeschleuste sensible Werte würden in den 1-Stunden-Transient-Cache gelangen.

### `mhmrentiva_vendor_badge_eligibility`

Überschreibt das Badge-Ergebnis pro Anbieter. Typischer Einsatz: Schwellenwerte für „hervorgehobene“ Anbieter umgehen oder das Badge für einen Anbieter, der gerade überprüft wird, vorübergehend entziehen.

```php
add_filter('mhmrentiva_vendor_badge_eligibility', function (bool $eligible, int $vendor_id, array $context) {
    if (in_array($vendor_id, get_option('featured_vendor_ids', []), true)) {
        return true;
    }
    return $eligible;
}, 10, 3);
```

`$context` enthält `age_days`, `score`, `completed_bookings`.

### `mhmrentiva_vendor_completed_bookings_count`

Überschreibt die von `VendorBadgeEligibility` verwendete Gesamtzahl abgeschlossener Buchungen. Der Standard-Callback delegiert an `ReliabilityScoreCalculator::count_completed_bookings()`. Ersetze ihn für eine eigene Zählstrategie (z. B. nur bestimmte Produktkategorien zählen).

### `mhmrentiva_vendor_profile_view_all_url`

Filtert das Linkziel von „Alle Fahrzeuge ansehen →“ im Fahrzeugabschnitt. Ist es leer, wird der Link ausgeblendet – nützlich für Installationen, die noch keine Suchergebnisseite haben.

### `mhmrentiva_vendor_profile_seo_disable`

Globaler Ausschalter für die Ausgabe von Titel + Meta-Beschreibung. Gibt standardmäßig `false` zurück; setze ihn auf `true`, um die Ausgabe vollständig zu deaktivieren (typischerweise, weil dein Theme die Metadaten der Anbieter auf eigene Weise verarbeitet).

```php
add_filter('mhmrentiva_vendor_profile_seo_disable', '__return_true');
```

## Verhalten in Lite vs. Pro

Das öffentliche Anbieterprofil ist eine **reine Pro-Funktion** – sie erfordert das Flag `vendor_marketplace`. Lite-Nutzer erleben Folgendes:

- Die Rewrite-Regel ist registriert, aber `template_redirect` liefert in Lite einen 404-Fehler (`Mode::canUseVendorMarketplace()` gibt false zurück).
- Die manuelle Verwendung des Shortcodes auf einer Seite gibt einen leeren String zurück.
- Block und Elementor-Widget geben nichts aus (sie delegieren an den Shortcode).

Upgrade-Hinweise befinden sich auf `/pricing` und im vorhandenen Shortcode `[mhmrentiva_pricing_table]`.

## Leere Zustände

| Zustand | Ausgabe |
| :--- | :--- |
| Anbieter nicht gefunden / gesperrt / Slug fehlt | WordPress-404 (Status-Header 404, 404-Template des Themes) |
| 0 aktive Fahrzeuge | „Dieser Anbieter bietet derzeit keine Fahrzeuge an.“ (überschreibbar über `empty_vehicles_message`) |
| 0 Bewertungen | „Noch keine Bewertungen – sei der Erste, der eine abgibt.“ (überschreibbar über `empty_reviews_message`) |
| 0 Fahrzeuge + 0 Bewertungen (neuer Anbieter) | Beide leeren Zustände werden ausgegeben. Der Hero wird trotzdem angezeigt. Der Hinweis „Yeni Bayi“ liefert zusätzlichen Kontext. |

## Siehe auch

- [Versionshinweise v4.37.0](/blog/rentiva-v4.37.0-release) – ursprüngliche Einführung der Funktion
- [Versionshinweise v4.37.1](/blog/rentiva-v4.37.1-release) – Hotfix für die Badge-Anbindung + Fallback für Bewertungs-Metadaten
- [Versionshinweise v4.37.2](/blog/rentiva-v4.37.2-release) – UX-Verbesserungen (Avatar, Fahrzeug-Vorschaubilder, SEO-Prüfung, mobiler Breakpoint)
- [Versionshinweise v4.38.1](/blog/rentiva-v4.38.1-release) – Korrektur von Slug-Kollisionen bei der Bearbeitung im Adminbereich
- [Shortcode für das Anbieterverzeichnis](./vendor-directory) – die Katalogseite, die alle aktiven Anbieter auflistet
- [Shortcode für das Anbieter-Bewerbungsformular](./vendor-apply) – das Onboarding-Formular
- [Anbieter-Onboarding](/docs/vendor/onboarding) – Betriebsanleitung für die Freigabe von Anbietern
