---
id: theme-json
title: "Theme-Konfiguration (theme.json)"
sidebar_label: "theme.json"
slug: /theme/theme-json
---
![Version](https://img.shields.io/badge/version-v0.3.0-blue?style=flat-square) ![Doku](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Aktualisiert](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
`theme.json` ist die zentrale Konfigurationsstelle für globale Stile, Einstellungen und Verhalten. Sie definiert die Farbpalette, die Typografie-Hierarchie, die Abstandsskalen und die globalen Block-Stile.
:::

## Globale Einstellungen

### 🎨 Farbpalette

Das Theme verwendet ein umfassendes, aufeinander abgestimmtes Farbsystem:

| Slug | Farbe | Name | Verwendung |
|------|-------|------|-------|
| `base` | `#FFFFFF` | Base | Globaler Hintergrund. |
| `surface` | `#F7F7F7` | Surface | Hintergrund für Abschnitte und Karten. |
| `contrast` | `#222222` | Contrast | Haupttext und Überschriften. |
| `accent` | `#0066FF` | Accent | Links, aktive Zustände und primäre Aktionen. |
| `cta` | `#FF5A5F` | CTA | Call-to-Action-Buttons (z. B. „Jetzt buchen“). |
| `success` | `#00A699` | Success | Auszahlungen, Statuslabels für Bestätigungen. |
| `warning` | `#FFB400` | Warning | Ausstehende IBAN-Änderungen oder Warnhinweise. |

### 🔡 Typografie-Hierarchie

Eingebundene Schriftarten: **Plus Jakarta Sans** (primär) und **Inter** (sekundär).

| Skala (Slug) | Größe | Name |
|--------------|------|------|
| `display` | `clamp(3rem, 6vw, 4.5rem)` | Auffällige Überschriften auf der Startseite. |
| `xx-large` | `clamp(2rem, 4vw, 3rem)` | Hauptüberschriften von Seiten. |
| `medium` | `1rem` | Standard-Fließtext. |
| `small` | `0.875rem` | Footer-Links und Metadaten-Labels. |

### 📏 Abstandssystem

Das Theme verwendet proportionale Abstandsstufen von `3xs` bis `3xl`:

```json
{
  "slug": "xs",
  "size": "0.75rem",
  "name": "XS"
},
{
  "slug": "m",
  "size": "1.5rem",
  "name": "M"
}
```

---

## Globale Stile

### Kernelemente

`theme.json` setzt globale Stile durch, damit vom Plugin erzeugte Komponenten die korrekte Theme-Gestaltung übernehmen:

```json
"styles": {
  "typography": {
    "fontFamily": "var(--wp--preset--font-family--jakarta)",
    "lineHeight": "1.65"
  },
  "elements": {
    "button": {
      "border": { "radius": "9999px" },
      "color": { "background": "var(--wp--preset--color--accent)" }
    }
  }
}
```

### Layout-Begrenzungen

- **Inhaltsbreite**: `1280px` (Standardbreite).
- **Weite Breite**: `1440px` (für Abschnitte in voller Breite oder weiter Ausrichtung).

:::info Änderung in v0.3.0
Das Template `page.html` verwendet jetzt `content-wide` statt `content-narrow`. Der Wert `max-width` in `3-layout.css` wurde über `var(--wp--style--global--content-size, 1280px)` mit `theme.json` synchronisiert. Das bedeutet: Wenn du die Inhaltsbreite im Theme-Editor änderst, werden auch die Plugin-Seiten automatisch aktualisiert.
:::

---

## Warum diese Architektur wichtig ist

Da alle Design-Tokens zentral in `theme.json` liegen, kann das Plugin `mhm-rentiva` diese Variablen direkt in seinem CSS referenzieren:

```css
/* Inheriting global theme colors in plugin components */
.mhm-payout-card {
    background-color: var(--wp--preset--color--surface);
    border-color: var(--wp--preset--color--accent-subtle);
}
```

**Diese „enge Kopplung“** sorgt dafür, dass sich jede globale Farbänderung im Theme-Editor automatisch auswirkt auf:
- Das Buchungs-Widget
- Die Analysekarten für Anbieter
- Das Raster der Suchergebnisse
- Die Oberfläche der Auszahlungsverwaltung

---

## Änderungsprotokoll
| Datum | Version | Hinweis |
|-------|-------|-----|
| 23.04.2026 | v0.3.0 | Englische Übersetzung auf die türkischen Abschnitte angewendet. |
| 27.03.2026 | v0.3.0 | Layout von `content-wide` und Synchronisierung der CSS-Variablen dokumentiert. |
| 09.03.2026 | 4.21.0-docs | Dokumentation zur Theme-Konfiguration erstellt. |
