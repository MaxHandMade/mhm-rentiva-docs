---
title: "Beliebte Routen"
description: "Anleitung und technische Referenz für das Showcase-Modul „Beliebte Routen“."
sidebar_position: 18
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite dokumentiert eine Funktion des Add-ons **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und setzt voraus, dass Pro zusätzlich zu Lite installiert ist und eine gültige Lizenz vorliegt.
Die vollständige Aufteilung findest du unter [Editionen – Lite vs. Pro](/docs/), Pro erhältst du unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Zweck
Diese Seite beschreibt das Modul „Beliebte Routen“ – das Startseiten-Showcase für VIP-Transferrouten – und behandelt die Nutzung im Betrieb, die vollständige Attributreferenz sowie die Erweiterungspunkte für Entwickler.

Eingeführt in [v4.34.0](/blog/rentiva-v4.34.0-release); klickbare Karten und Vorbelegung per Deep-Link kamen in [v4.34.1](/blog/rentiva-v4.34.1-release) hinzu.
:::

# 🌟 Beliebte Routen

## Inhalt
- Was dieses Modul ist
- Admin-Ablauf – Routen anheften
- Verwendung im Frontend (Shortcode / Gutenberg-Block / Elementor-Widget)
- Attributreferenz (16 Attribute)
- Klickverhalten der Karten – Vorbelegung per Deep-Link
- Erweiterungspunkte für Entwickler (Filter-Hooks)
- Verhalten in Lite vs. Pro
- Leerer Zustand

Das Modul „Beliebte Routen“ präsentiert deine stärksten VIP-Transferrouten auf der Startseite als A → B-Karten (Start → Ziel, durchschnittliche Dauer, Entfernung, Preis ab). Jede Karte ist ein klickbarer Link, der per Deep-Link zum Transfer-Suchformular führt, in dem Start und Ziel bereits ausgewählt sind – der Besucher ergänzt nur noch Datum/Uhrzeit und sendet ab.

## Was dieses Modul ist

Eine **Conversion-Fläche für das Transfer-Modul**, keine Suchoberfläche. Das Transfer-Modul enthält bereits das Suchformular (`[rentiva_transfer_search]`) und die Ergebnisliste (`[rentiva_transfer_results]`). „Beliebte Routen“ ist der vorgelagerte Anstoß, der Besuchern zeigt, dass VIP-Transfer angeboten wird, und ihnen einen Ein-Klick-Weg von „Ich sehe eine Route, die ich möchte“ zu „Das Suchformular hat sie bereits vorausgewählt“ bietet.

Drei Darstellungsflächen teilen sich einen einzigen kanonischen Renderer (Render-Parity-Vertrag):

| Fläche | Bezeichner |
| :--- | :--- |
| Shortcode | `[rentiva_popular_routes]` |
| Gutenberg-Block | `mhm-rentiva/popular-routes` (Titel „MHM Popular Transfer Routes“) |
| Elementor-Widget | `mhmrentiva_popular_routes` (Titel „MHM Popular Routes“) |

Block und Widget delegieren über `do_shortcode()` an den Shortcode. Was der Shortcode ausgibt, geben Block und Widget identisch aus – kein doppelter Codepfad.

## Admin-Ablauf – Routen anheften

Das Modul liest aus der bestehenden Tabelle **Transferrouten** – es gibt keine separate Datenquelle für „beliebte Routen“. Welche Routen beliebt sind, legst du durch Aktivieren eines Kontrollkästchens fest.

### 1. Routen definieren

Gehe zu **MHM Rentiva → Transferrouten** und erstelle oder bearbeite Routen wie gewohnt: Wähle Start- und Zielort, lege Entfernung und Dauer fest, wähle eine Preismethode (Festpreis oder pro km) und gib den Preis ein.

### 2. Gewünschte Routen auf der Startseite anheften

Im Bearbeitungsformular jeder Route befindet sich unten ein Kontrollkästchen:

> **🌟 Vitrine Koy (an den Block „Beliebte Routen“ anheften)**
>
> Hervorgehobene Routen werden im `[rentiva_popular_routes]`-Block, im Gutenberg-Block und im Elementor-Widget auf der Startseite zuerst angezeigt.

Aktiviere das Kästchen und speichere. Die Route erscheint nun mit dem Badge „🌟 Showcase“ in der Routenliste und ist in jeder Fläche, die den Shortcode/Block/das Widget ausgibt, ganz oben im Bereich „Beliebte Routen“ angeheftet.

Der Transient-Cache (1 Stunde TTL) wird bei jedem Speichern und Löschen automatisch invalidiert, sodass Änderungen beim nächsten Seitenaufruf live sind.

## Verwendung im Frontend

### Shortcode

Füge den Shortcode in eine beliebige Seite oder einen Beitrag ein:

```shortcode
[rentiva_popular_routes]
```

Damit wird die Standardansicht ausgegeben – sechs Karten, drei Spalten auf dem Desktop, Sortierung „hervorgehobene zuerst“, alle Sichtbarkeitsoptionen aktiv, helles Theme.

Ein stärker konfiguriertes Beispiel:

```shortcode
[rentiva_popular_routes
    columns="3"
    limit="6"
    order="featured"
    heading="Popüler Transfer Rotaları"
    subheading="En çok tercih edilen güzergahlar"
    filter_origin_city="Istanbul"
    show_view_all="true"]
```

### Gutenberg-Block

Füge den Block **MHM Popular Transfer Routes** über den Block-Inserter hinzu (Kategorie: Widgets). Die Inspector-Steuerelemente sind in vier Bereiche gruppiert:

| Bereich | Steuerelemente |
| :--- | :--- |
| Layout | Spalten (2/3/4), maximale Kartenanzahl, Theme (hell/dunkel) |
| Überschrift | Titel, Untertitel, Schalter „Alle anzeigen“, URL-Überschreibung für „Alle anzeigen“ |
| Sortierung & Filter | Sortierreihenfolge (5 Optionen), Schalter „nur angeheftete“, Filter nach Startstadt, Filter nach Starttyp |
| Kartenanzeige | Dauer anzeigen, Entfernung anzeigen, Verkehrshinweis anzeigen, Preis ab anzeigen, Währungssymbol |

Der Block verwendet `ServerSideRender`, daher entspricht die Vorschau im Editor exakt dem Live-Frontend.

### Elementor-Widget

Füge das Widget **MHM Popular Routes** über das Elementor-Panel hinzu (Kategorie: MHM Rentiva). Es stehen dieselben vier Steuerungsbereiche zur Verfügung, dazu die Standard-Wrapper-Stilsteuerungen von Elementor (Außenabstand, Innenabstand, Farbe, Typografie).

## Attributreferenz

Alle 16 Attribute akzeptieren die kanonische snake_case-Form (vom Shortcode verwendet) und einen camelCase-Alias (von Block / Widget verwendet). Der CAM (Canonical Attribute Mapper) des Plugins normalisiert beide auf dieselbe interne Form.

| Attribut | Standard | Typ | Zweck |
| :--- | :--- | :--- | :--- |
| `limit` | `6` | int (1-50) | Maximale Anzahl ausgegebener Karten. |
| `columns` | `3` | enum | Rasterspalten auf dem Desktop: `2`, `3` oder `4`. Tablet immer 2, Mobilgerät immer 1. |
| `order` | `featured` | enum | `featured` / `price_asc` / `price_desc` / `alphabetical` / `newest` |
| `heading` | „Beliebte Routen“ | string | Titel des Bereichs (übersetzbar). |
| `subheading` | „Beliebteste VIP-Transferrouten“ | string | Untertitel des Bereichs (übersetzbar). |
| `show_view_all` | `true` | bool | Zeigt den Link „Transfers suchen“ im Kopf des Bereichs an. |
| `view_all_url` | leer | url | Überschreibt das Linkziel. Ist es leer, wird der Filter `mhmrentiva_popular_routes_view_all_url` verwendet; ist auch dieser leer, wird der Link ausgeblendet. |
| `show_duration` | `true` | bool | Gibt auf jeder Karte die Zeile „Ca. X Min.“ aus. |
| `show_distance` | `true` | bool | Gibt auf jeder Karte die Zeile „X km“ aus. |
| `show_traffic_note` | `true` | bool | Gibt den Hinweis „Kann je nach Verkehr variieren“ aus. |
| `show_price` | `true` | bool | Gibt auf jeder Karte die Zeile mit dem Preis ab aus. |
| `currency_symbol` | `₺` | string | Präfix für den Preis (einzelnes Zeichen oder kurzer Code). |
| `filter_origin_city` | leer | string | Zeigt nur Routen, deren Startort in dieser Stadt liegt (ohne Beachtung der Groß-/Kleinschreibung). |
| `filter_origin_type` | leer | enum | Zeigt nur Routen, deren Start von diesem Typ ist – ein gespeicherter Ortstyp: `airport` / `hotel` / `port` / `station` / `city_center` / `hospital` oder ein von dir hinzugefügter eigener Typ. Seit Pro 6.3.0 listen die Editoren diese Typen auf; die alten festen Optionen `train` und `marina` passten zu keinem Ort und wurden entfernt. |
| `featured_only` | `false` | bool | Gibt nur Routen aus, bei denen das Kontrollkästchen „🌟 Showcase“ aktiviert ist. |
| `theme` | `light` | enum | `light` / `dark` (hell ist der im Produktivbetrieb getestete Standard). |

### Details zur Sortierreihenfolge

- **`featured`** – angeheftete Routen zuerst (innerhalb der angehefteten Routen in `created_at DESC`-Reihenfolge), danach nicht angeheftete Routen (ebenfalls `created_at DESC`). Dies ist der Standard und die vorgesehene Showcase-Reihenfolge.
- **`price_asc`** / **`price_desc`** – sortiert auf- oder absteigend nach `min_price` (berechnete Preise) bzw. `base_price` (Festpreise).
- **`alphabetical`** – sortiert nach Startname, dann nach Zielname.
- **`newest`** – rein nach `created_at DESC`, unabhängig vom Anheftstatus.

### Symbole für Starttypen

In der oberen rechten Ecke der Karte wird ein Symbol abhängig vom Typ des Startorts angezeigt:

| Typ | Standardsymbol |
| :--- | :--- |
| `airport` | ✈️ |
| `station` | 🚆 |
| `hotel` | 🏨 |
| `port` | ⛵ |
| `city_center` | 🏙️ |
| (sonstige) | ↗ |

Die Zuordnung kannst du mit dem Filter `mhmrentiva_popular_routes_type_icon` überschreiben (siehe Erweiterungspunkte für Entwickler weiter unten).

## Klickverhalten der Karten – Vorbelegung per Deep-Link

Jede Karte ist von einem `<a>`-Element umschlossen. Ein Klick darauf führt zur Transfer-Suchseite (über Filter ermittelt, siehe unten), wobei die gewählten Werte `origin_id` und `destination_id` als Query-Parameter angehängt werden:

```
.../transfer/?origin_id=73&destination_id=76
```

Der Transfer-Such-Shortcode liest diese Query-Parameter und wählt die passenden Optionen in seinen `<select>`-Elementen vor. Der Besucher sieht:

> **TESLİM ALMA KONUMU:** İstanbul Havalimanı (IST)
> **BIRAKMA KONUMU:** Taksim Ofis
> **TARİH:** _(leer – Besucher gibt es ein)_
> **SAAT:** 10:00

… und muss nur noch das Datum ergänzen und absenden. Der Weg von „Klick auf eine Karte auf der Startseite“ bis „Ergebnisse sehen“ umfasst zwei statt vier Interaktionen.

Die Vorbelegung ist **abwärtskompatibel**: Eine Transfer-Suchseite, die ohne Query-Parameter geladen wird, verhält sich genau wie vor v4.34.1. Die Änderung ist rein additiv.

## Erweiterungspunkte für Entwickler

### `mhmrentiva_popular_routes_view_all_url`

Filter für das Ziel des **Links im Bereichskopf** (Link „Transfers suchen“). Wird von `resolve_view_all_url()` zurückgegeben.

```php
add_filter('mhmrentiva_popular_routes_view_all_url', function ($url) {
    return home_url('/transfer/');
});
```

Gibt dieser Filter einen leeren Wert zurück, wird der Link im Bereichskopf ausgeblendet – nützlich für Installationen, die noch keine Transfer-Suchseite haben.

### `mhmrentiva_popular_routes_search_url`

Filter für die Basis-URL des **Klickziels der Karten** (eingeführt in v4.34.1). Unabhängig vom Link im Bereichskopf, sodass Themes beide auf unterschiedliche Seiten leiten können.

```php
add_filter('mhmrentiva_popular_routes_search_url', function ($url) {
    return home_url('/transfer-search/');
});
```

Ist er leer, wird auf den Filter `mhmrentiva_popular_routes_view_all_url` zurückgegriffen, der seinerseits auf `home_url('/transfer/')` zurückfällt.

### `mhmrentiva_popular_routes_type_icon`

Filtert das Symbol für den Starttyp. Erhält das Standardsymbol und den Typ-Slug.

```php
add_filter('mhmrentiva_popular_routes_type_icon', function ($icon, $type) {
    if ($type === 'airport') {
        return '🛫';
    }
    return $icon;
}, 10, 2);
```

Nützlich, wenn die Markenkommunikation andere Emojis oder kurze Textzeichen verlangt.

### `TransferRouteProvider::get_popular_routes()`

Die Repository-Klasse ist Teil der halböffentlichen API. Sie akzeptiert ein bereinigtes Argument-Array und gibt Routenobjekte mit verknüpften Start-/Zieldaten zurück. Themes, die ihr eigenes Karten-Markup ausgeben möchten, können sie direkt aufrufen:

```php
$routes = \MHMRentiva\Admin\Transfer\Engine\TransferRouteProvider::get_popular_routes([
    'limit'              => 6,
    'order'              => 'featured',
    'featured_only'      => false,
    'filter_origin_city' => 'Istanbul',
    'filter_origin_type' => 'airport',
]);

foreach ($routes as $route) {
    // $route->origin_name, $route->destination_name, $route->min_price,
    // $route->is_featured, $route->origin_type, etc.
}
```

Das Abfrageergebnis wird 1 Stunde lang als Transient gecacht. Ein Aufruf von `TransferRouteProvider::clear_cache()` invalidiert alle gecachten Varianten – das CRUD für Routen im Admin erledigt dies automatisch.

## Verhalten in Lite vs. Pro

VIP-Transfer und damit auch dieser Shortcode gehören zu Rentiva Pro und werden mit jeder aktiven Pro-Lizenz freigeschaltet. Es gibt kein Routenkontingent: Der Admin kann beliebig viele Routen definieren, und der Bereich gibt so viele Karten aus, wie das Attribut `limit` verlangt (Standard 6, max. 50). Ohne aktive Pro-Lizenz gibt der Tag nichts aus.

## Leerer Zustand

Wenn keine Route den Eignungsfilter besteht (beide Endpunkte `is_active=1` UND `allow_transfer=1`, zuzüglich aller vom Benutzer angegebenen Filter), gibt der Bereich **überhaupt nichts** aus – keinen Platzhalter „Demnächst …“, kein leeres Raster, keine Konsolenmeldungen. Neue Installationen sehen aufgeräumt aus; befüllte Installationen zeigen nur, was sie haben.

Das ist beabsichtigt. Ein leerer, aber vorhandener Bereich wirkt defekt; ein fehlender Bereich fällt nicht auf.

## Siehe auch

- [Release Notes v4.34.0](/blog/rentiva-v4.34.0-release) – ursprüngliche Einführung der Funktion
- [Release Notes v4.34.1](/blog/rentiva-v4.34.1-release) – klickbare Karten und Vorbelegung per Deep-Link
- [Release Notes v4.34.2](/blog/rentiva-v4.34.2-release) – Hotfix für das Styling der Transferkarten-Symbole
- [Shortcode für die Transfersuche](./transfer-search) – das Formular, zu dem „Beliebte Routen“ per Deep-Link führt
- [Shortcode für Transferergebnisse](./transfer-results) – die Ergebnisseite, die nach dem Absenden der Suche angezeigt wird
- [Modul VIP-Transfer](../vip-transfer) – Betriebsanleitung für die übergeordnete Transfer-Funktion
