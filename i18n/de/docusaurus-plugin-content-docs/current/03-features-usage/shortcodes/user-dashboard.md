---
title: "Master-Konto-Dashboard (eingestellt)"
description: "Der Shortcode, der Block und das Elementor-Widget für das Kunden-Dashboard wurden in Rentiva 6.2.0 eingestellt; Kunden nutzen die Seite „Mein Konto“."
sidebar_position: 13
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::warning Eingestellt in 6.2.0
Das separate Kunden-Dashboard wurde eingestellt. Die zentrale Anlaufstelle eines Kunden ist die Seite **Mein Konto** (die Kontoseite von WooCommerce), auf der Buchungen, Favoriten und Zahlungen aufgelistet werden. Entferne `[rentiva_user_dashboard]`, den zugehörigen Block oder das zugehörige Elementor-Widget von deinen Seiten.
:::

# 🚗 Master-Konto-Dashboard (eingestellt)

## Inhalt
- Was der Shortcode jetzt anzeigt
- Wohin Kunden stattdessen gehen
- Hinweise für Entwickler

## Was der Shortcode jetzt anzeigt

Der Shortcode ist weiterhin registriert, sodass eine Seite, die ihn enthält, nicht fehlerhaft dargestellt wird:

```shortcode
[rentiva_user_dashboard]
```

Seit Rentiva 6.2.0 geben der Shortcode, der Block **Master Account Dashboard** und das Elementor-Widget kein Dashboard mehr aus:

| Wer die Seite aufruft | Was angezeigt wird |
| :--- | :--- |
| Angemeldeter Kunde | Eine Zeile mit dem Hinweis, dass das Konto umgezogen ist, und ein Link **Zu meinem Konto** zur Seite „Mein Konto“. |
| Besucher (nicht angemeldet) | Dieselbe Zeile und derselbe Link **Zu meinem Konto** wie bei einem Kunden. |
| Administrator | Dieselbe Zeile und derselbe Link sowie ein Hinweis, dass dieses Dashboard veraltet ist und von der Seite entfernt werden sollte. Nur Administratoren sehen diesen Hinweis. |

- Der Block und das Elementor-Widget sind in den Editoren ausgeblendet und können daher nicht mehr zu neuen Seiten hinzugefügt werden.
- **MHM Rentiva > Shortcode-Seiten** bietet nicht mehr an, diese Seite zu erstellen.
- Auf einer Seite mit dem Slug `panel` werden Besucher und angemeldete Nicht-Administratoren zu „Mein Konto“ weitergeleitet; Administratoren können sie weiterhin öffnen.
- Der Shortcode hat keine Parameter.
- **Nicht angemeldete Besucher** sehen jetzt dieselbe Zeile „Dein Konto ist umgezogen“ und denselben Link **Zu meinem Konto** wie Kunden (früher sahen sie eine leere Seite). Nur die plugineigene Seite `/panel/` leitet einen Besucher weiter: Sie leitet zur Seite „Mein Konto“ weiter, auf der sich das Anmeldeformular befindet.

## Wohin Kunden stattdessen gehen

Nutze die Seite **Mein Konto**. Ihre Bereiche sind hier dokumentiert:

- [Meine Buchungen](./my-bookings)
- [Meine Favoriten](./my-favorites)
- [Zahlungsverlauf](./payment-history)

## Hinweise für Entwickler

- **HTML-Struktur:** Der Hinweis ist in `.mhm-rentiva-retired-dashboard` eingeschlossen; der Administrator-Hinweis ist `.mhm-rentiva-retired-dashboard__admin`.
- **Filter:** `mhmrentiva_retired_dashboard_notice` filtert das ausgegebene Markup (`$html`, `$role` = `customer` oder `admin`).
- **Entfernt in 6.2.0:** die Klassen des Kunden-Dashboards (`CustomerDashboard`, `DashboardConfig`, `DashboardContext`, `DashboardDataProvider`, `DashboardNavigation`) und die `mhmrentiva_dashboard_*`-Hooks. Siehe den [Release-Beitrag zu 6.2.0](/blog/rentiva-v6.2.0-release).

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 18.11.2026 | 6.4.0 | Besucher sehen jetzt die Zeile „Konto ist umgezogen“ statt einer leeren Seite. |
| 11.10.2026 | 6.2.0 | Seite neu geschrieben: Das Kunden-Dashboard wurde eingestellt; Kunden nutzen „Mein Konto“. |
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.0-docs | Seite alphabetisch sortiert und Bildplatzhalter hinzugefügt. |
