---
id: shortcodes-overview
title: "Liste aller Shortcodes"
sidebar_label: "Alle Shortcodes"
sidebar_position: 1
slug: /features-usage/shortcodes/overview
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Der Bereich „Shortcodes“ ist die zentrale Schaltstelle der Architektur, die sämtliche Frontend-Funktionen von MHM Rentiva in WordPress einbindet. Das System umfasst insgesamt **28 aktive Shortcodes**. Du kannst sie überall auf deiner Website platzieren – entweder mit dem klassischen Texteditor oder über die Page-Builder-Integrationen.

---

## 🏗️ Unterstützung für Gutenberg-Blöcke und Elementor

MHM Rentiva setzt auf die moderne WordPress-Architektur. Alle hier **aufgeführten 28 Shortcodes** erzeugen im Hintergrund eine standardisierte „Render-Ausgabe“.

- **Gutenberg-Blöcke:** Alle Shortcodes stehen im Gutenberg-Editor als native Drag-and-drop-Blöcke zur Verfügung – ein manuelles Eingeben von Shortcodes ist nicht nötig. Die Shortcode-Parameter werden im Block-Einstellungsbereich (Inspector) auf der rechten Seite abgebildet.
- **Elementor-Widgets:** Die plugineigenen Komponenten stehen im Elementor-Panel als Widgets zur Verfügung. Wenn du Elementor verwendest, kannst du die entsprechende Komponente hinzufügen und ihre visuellen Einstellungen konfigurieren, ohne einen Shortcode (`[rentiva_...]`) einzugeben.

In beiden Fällen wird das Rendering-Backend (Render Parity) aus einer einzigen Quelle gespeist – der Shortcode-Infrastruktur auf dieser Seite.

---

## 📋 28 aktive Shortcodes und ihre Verwendung

Das System stellt Shortcodes bereit, die nach Funktion in 6 Hauptkategorien gegliedert sind. Nachfolgend findest du jeden Shortcode mit Parameterbeispielen.

### 1. Buchungsmodul
Grundlegende Shortcodes zum Starten und Abschließen des Mietablaufs:

**1. Buchungsformular:** Formular zur Auswahl von Mietzeitraum, Versicherung und Zusatzleistungen.
*   **Shortcode:** `[rentiva_booking_form]`
*   **Wichtige Parameter:** `vehicle_id`, `show_addons`
*   **Beispiel:** `[rentiva_booking_form vehicle_id="101" show_addons="1"]`

**2. Verfügbarkeitskalender:** Zeigt den monatlichen oder täglichen Verfügbarkeitskalender für ein Fahrzeug an.
*   **Shortcode:** `[rentiva_availability_calendar]`
*   **Wichtige Parameter:** `vehicle_id`, `months_to_show`, `show_pricing`
*   **Beispiel:** `[rentiva_availability_calendar vehicle_id="101" months_to_show="2" show_pricing="1"]`

### 2. Modul für Fahrzeugliste und Suche
Visualisiert für Kunden das Filtern von Fahrzeugen und die Fahrzeugdetails:

**3. Fahrzeugdetails:** Listet alle Eigenschaften eines einzelnen Fahrzeugs auf.
*   **Shortcode:** `[rentiva_vehicle_details]`
*   **Wichtige Parameter:** `vehicle_id`, `show_gallery`, `show_features`, `show_similar_vehicles`
*   **Beispiel:** `[rentiva_vehicle_details vehicle_id="45" show_gallery="1"]`

**4. Fahrzeugliste (Listenansicht):**
*   **Shortcode:** `[rentiva_vehicles_list]`
*   **Wichtige Parameter:** `limit`, `category`, `orderby`, `order`
*   **Beispiel:** `[rentiva_vehicles_list limit="10" order="asc"]`

**5. Hervorgehobene Fahrzeuge:**
*   **Shortcode:** `[rentiva_featured_vehicles]`
*   **Wichtige Parameter:** `limit`, `autoplay`, `layout`
*   **Beispiel:** `[rentiva_featured_vehicles limit="6" autoplay="1" layout="grid"]`

**6. Fahrzeugraster (Rasteransicht):**
*   **Shortcode:** `[rentiva_vehicles_grid]`
*   **Wichtige Parameter:** `limit`, `columns`, `category`, `show_price`
*   **Beispiel:** `[rentiva_vehicles_grid limit="12" columns="3" category="suv"]`

**7. Einheitliche Suche:** Kombiniertes Suchformular für Mietfahrzeuge.
*   **Shortcode:** `[rentiva_unified_search]`
*   **Wichtige Parameter:** `default_tab`, `show_location_select`, `style`
*   **Beispiel:** `[rentiva_unified_search default_tab="rental" style="glass"]`

**8. Ansicht der Suchergebnisse:** Fahrzeugraster mit den Ergebnissen der Suche.
*   **Shortcode:** `[rentiva_search_results]`
*   **Wichtige Parameter:** `layout`, `results_per_page`, `show_filters`
*   **Beispiel:** `[rentiva_search_results layout="grid" results_per_page="12"]`

**9. Fahrzeugvergleich:** Vergleich der Ausstattung nebeneinander.
*   **Shortcode:** `[rentiva_vehicle_comparison]`
*   **Wichtige Parameter:** `max_vehicles`, `show_prices`
*   **Beispiel:** `[rentiva_vehicle_comparison max_vehicles="4" show_prices="1"]`

### 3. Benutzerkontomodul
(**Auth=Ja** – nur für angemeldete Benutzer aktiv):

**10. Kunden-Dashboard (in 6.2.0 eingestellt):** Zeigt angemeldeten Kunden eine Zeile und einen Link zu „Mein Konto“; Besucher sehen nichts. Verwende stattdessen die Seite „Mein Konto“.
*   **Shortcode:** `[rentiva_user_dashboard]`
*   **Wichtige Parameter:** -
*   **Referenz:** [Zentrales Konto-Dashboard (eingestellt)](./user-dashboard)

**11. Meine Buchungen:** Liste aktiver oder vergangener Buchungen.
*   **Shortcode:** `[rentiva_my_bookings]`
*   **Wichtige Parameter:** `limit`, `status`
*   **Beispiel:** `[rentiva_my_bookings limit="10" status="confirmed"]`

**12. Meine Favoriten:** Vom Benutzer als Favoriten gespeicherte Fahrzeuge.
*   **Shortcode:** `[rentiva_my_favorites]`
*   **Wichtige Parameter:** `limit`, `columns`, `show_availability_status`
*   **Beispiel:** `[rentiva_my_favorites columns="4"]`

**13. Zahlungsverlauf:** Transaktionsbelege und -aufzeichnungen.
*   **Shortcode:** `[rentiva_payment_history]`
*   **Wichtige Parameter:** `limit`, `show_payment_method`
*   **Beispiel:** `[rentiva_payment_history limit="20"]`

**14. Provisionsermittlung:** Affiliate-/anbieterspezifisches System.
*   **Shortcode:** `[rentiva_commission_resolver]`
*   **Wichtige Parameter:** -
*   **Beispiel:** `[rentiva_commission_resolver]`

### 4. Modul für Transferdienste

**15. Transfer-Suchformular:** Auswahl von Abhol- und Absetzort der Fahrgäste.
*   **Shortcode:** `[rentiva_transfer_search]`
*   **Wichtige Parameter:** `show_pickup`, `show_dropoff`
*   **Beispiel:** `[rentiva_transfer_search show_pickup="1" show_dropoff="1"]`

**16. Transfer-Ergebnisse:** Auflistung der Transfertarife.
*   **Shortcode:** `[rentiva_transfer_results]`
*   **Wichtige Parameter:** `limit`, `show_luggage_info`
*   **Beispiel:** `[rentiva_transfer_results limit="10" show_luggage_info="1"]`

**17. Beliebte Strecken (ab v4.34.0):** Präsentation von VIP-Transferstrecken auf der Startseite; anklickbare Karten verlinken direkt in die Transfersuche.
*   **Shortcode:** `[rentiva_popular_routes]`
*   **Wichtige Parameter:** `limit`, `columns`, `order`, `featured_only`, `filter_origin_city`
*   **Beispiel:** `[rentiva_popular_routes columns="3" limit="6" order="featured"]`
*   **Referenz:** [Beliebte Strecken](./popular-routes)

### 5. Modul für Support und Interaktion

**18. Nachrichten (Ticketsystem):**
*   **Shortcode:** `[rentiva_messages]`
*   **Wichtige Parameter:** `show_thread_preview`
*   **Beispiel:** `[rentiva_messages show_thread_preview="1"]`

**19. Kontakt- und Feedbackformular:**
*   **Shortcode:** `[rentiva_contact]`
*   **Wichtige Parameter:** `email_to`, `type`, `show_booking_id_field`
*   **Beispiel:** `[rentiva_contact email_to="info@rentiva.com" show_booking_id_field="1"]`

**20. Kundenstimmen / Bewertungen:**
*   **Shortcode:** `[rentiva_testimonials]`
*   **Wichtige Parameter:** `limit`, `columns`, `filter_rating`
*   **Beispiel:** `[rentiva_testimonials limit="5" columns="3" filter_rating="5"]`

**21. Formular für Fahrzeugbewertungen und Rezensionen:**
*   **Shortcode:** `[rentiva_vehicle_rating_form]`
*   **Wichtige Parameter:** `vehicle_id`, `show_form`, `show_ratings_list`
*   **Beispiel:** `[rentiva_vehicle_rating_form vehicle_id="45"]`

**22. Startseiten-Proof-of-Concept (POC):**
*   **Shortcode:** `[rentiva_home_poc]`
*   **Wichtige Parameter:** (Experimentell)
*   **Beispiel:** `[rentiva_home_poc]`

### 6. Anbietermodul
Für Geschäftspartner, die ihre Fahrzeuge auf der Plattform zur Vermietung anbieten möchten:

**23. Bewerbungsformular für Anbieter / Unternehmen:**
*   **Shortcode:** `[rentiva_vendor_apply]`
*   **Wichtige Parameter:** -
*   **Beispiel:** `[rentiva_vendor_apply]`

**24. Bildschirm zum Einreichen von Fahrzeugen:**
*   **Shortcode:** `[rentiva_vehicle_submit]`
*   **Wichtige Parameter:** (Parameter zur Kontoverifizierung)
*   **Beispiel:** `[rentiva_vehicle_submit]`

**25. Öffentliches Anbieterprofil (ab v4.37.0):**
*   **Shortcode:** `[rentiva_vendor_profile]`
*   **Wichtige Parameter:** `slug`, `show_badge`, `show_about`, `show_vehicles`, `show_reviews`, `show_location`, `max_vehicles`, `max_reviews`
*   **Beispiel:** `[rentiva_vendor_profile slug="akif-otomotiv"]`
*   **Referenz:** [Öffentliches Anbieterprofil](./vendor-profile)

**26. Anbieterverzeichnis (ab v4.38.0):**
*   **Shortcode:** `[rentiva_vendor_directory]`
*   **Wichtige Parameter:** `per_page`, `default_sort`, `show_filter_bar`, `show_breadcrumb`, `show_pagination`, `empty_message`
*   **Beispiel:** `[rentiva_vendor_directory per_page="12" default_sort="rating"]`
*   **Referenz:** [Anbieterverzeichnis](./vendor-directory)

**27. Buchungseingang für Anbieter (nur im Panel):**
*   **Shortcode:** `[rentiva_vendor_bookings]`
*   **Wichtige Parameter:** `limit` (Seitengröße, Standard 10)
*   **Beispiel:** `[rentiva_vendor_bookings limit="10"]`
*   **Referenz:** [Buchungsliste für Anbieter](./vendor-bookings)

**28. Anbieter-Kontobuch (nur im Panel, Finanztransaktionen):**
*   **Shortcode:** `[rentiva_vendor_ledger]`
*   **Wichtige Parameter:** Keine (nur URL-Filter – `paged`, Typ, Zeitraum)
*   **Beispiel:** `[rentiva_vendor_ledger]`
*   **Referenz:** [Anbieter-Kontobuch](./vendor-ledger)

---

## 🛠️ Verwaltung und Prüfung auf fehlende Seiten

Der Bildschirm MHM Rentiva > Shortcode-Seiten (Dashboard) stellt Administratoren folgende Informationen zur Verfügung:

*   **Meldungen zu 19 aktiven Seiten:** Bei der Installation des Plugins werden automatisch die **Haupt-URL-Seiten für 19 dieser Shortcodes** (`/booking/`, `/support/` usw.) erstellt und als „Aktiv“ angezeigt. Die übrigen Shortcodes kannst du bei Bedarf auf zusätzlichen Seiten einfügen (z. B. `/vendor-panel/`).
*   **Debugging und Caching:** Wird ein Shortcode versehentlich von einer Seite entfernt, kannst du über den Zähler **„Fehlende Seiten“** und die Schaltfläche „Debug“ im Panel feststellen, welche Funktion nicht mehr live ist.

### Zusammenfassung des Abschnitts
- **28 Shortcodes:** Decken jeden Bereich deines Projekts ab – von Buchungen bis B2B.
- **Rendering aus einer Quelle:** Verwende Shortcodes im klassischen Editor, in Elementor oder in Gutenberg – alle basieren auf demselben Kernsystem.
- **Flexible Parameter:** Übergib jedem Shortcode externe Daten, um Layout, Abfragelimits und mehr zu ändern.
