---
id: templates-patterns
title: Custom Templates & Block Patterns
sidebar_label: Templates & Patterns
slug: /theme/templates-patterns
---
![Version](https://img.shields.io/badge/version-v0.3.0-blue?style=flat-square) ![FSE](https://img.shields.io/badge/FSE-Full_Site_Editing-success?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-27.03.2026-orange?style=flat-square)

:::info Purpose
This page documents the block templates and patterns that drive the visual representation of rental listings, search results, and vendor management interfaces.
:::

## Temel Şablonlar (`/templates`) — 10 Adet

Bu HTML şablonlari, belirli post tipleri ve gorunumler için temel yapisal düzeni tanımlar:

| Şablon | Dosya | Açıklama |
|--------|-------|----------|
| **Ana Sayfa** | `front-page.html` | Site ana sayfası düzeni. |
| **Genel Sayfa** | `page.html` | Standart WordPress sayfaları için `content-wide` düzeni. |
| **Tekil Arac** | `single-vehicle.html` | Tekil araç listeleme sayfası düzeni. |
| **Araç Arsivi** | `archive-vehicle.html` | Arama sonuçları ve genel araç arsivi. |
| **Hesap Sayfasi** | `page-account.html` | Vendor Paneli için birlesik kabuk. |
| **404 Sayfasi** | `404.html` | Bulunamayan sayfa için ozel hata sayfası. |
| **Genel Arsiv** | `archive.html` | Varsayılan arsiv şablonu. |
| **Ana Index** | `index.html` | WordPress varsayılan fallback şablonu. |
| **Arama** | `search.html` | WordPress arama sonuçları sayfası. |
| **Tekil Yazi** | `single.html` | Standart blog yazisi şablonu. |

### Vehicle Archive Layout (`archive-vehicle.html`)
```text
┌──────────────────────────────────────────┐
│              [Header Part]               │
├──────────────────────────────────────────┤
│           [Search Hero Pattern]          │
├───────────────────┬──────────────────────┤
│                   │                      │
│   [Filter Block]  │    [Results Grid]    │
│   (Collapsible on │    (3-column card)   │
│    Mobile)        │                      │
│                   │                      │
├───────────────────┴──────────────────────┤
│              [Footer Part]               │
└──────────────────────────────────────────┘
```

---

## Blok Desenleri (`/patterns`) — 31 Adet

Blok desenleri, `rentiva` kategorisi altında on-yapilandirilmis Gutenberg blok montajlaridir. v0.3.0 ile 31 desene ulasilmistir:

### Ana Sayfa Desenleri

| Desen | Dosya | Açıklama |
|-------|-------|----------|
| **Hero** | `homepage-hero.php` | Ana sayfa hero bölümü. |
| **Arama Hero** | `rentiva-search-hero.php` | Lokasyon/tarih girişli one cikan arama. |
| **Guven Seridi** | `homepage-trust-strip.php` | Guvenilen marka logolari. |
| **Nasil Calisir** | `homepage-how-it-works.php` | Adim adim kullanim rehberi. |
| **Hizmetler** | `homepage-services.php` | Hizmet tanitim bölümü. |
| **Bilgi Izgarasi** | `homepage-info-grid.php` | Bilgi kartlari izgarasi. |
| **One Cikan Araclar** | `homepage-featured-vehicles.php` | Ana sayfada araç vitrin bölümü. |
| **Rezervasyon CTA** | `homepage-booking-cta.php` | Rezervasyon aksiyona cagri. |
| **Referanslar** | `homepage-testimonials.php` | Müşteri yorumlari bölümü. |

### Sayfa Desenleri

| Desen | Dosya | Açıklama |
|-------|-------|----------|
| **Hakkimizda** | `rentiva-about-page.php` | Hakkimizda sayfası içeriği. |
| **Iletisim** | `rentiva-contact-page.php` | Iletisim sayfası formu. |
| **SSS** | `rentiva-faq-page.php` | Sikca sorulan sorular. |
| **Gizlilik** | `rentiva-privacy-page.php` | Gizlilik politikasi. |
| **Kosullar** | `rentiva-terms-page.php` | Kullanim kosullari. |
| **Vendor Başvuru** | `rentiva-vendor-apply-page.php` | Tedarikci başvuru sayfası. |

### Bileşen Desenleri

| Desen | Dosya | Açıklama |
|-------|-------|----------|
| **Hesap Kabugu** | `rentiva-account-shell.php` | Vendor paneli ana konteyneri. |
| **Araç Detay** | `rentiva-vehicle-details.php` | Tekil araç bilgi izgarasi. |
| **Araclar Izgara** | `rentiva-vehicles-grid-section.php` | Araç kartlari izgarasi. |
| **One Cikan Araclar** | `rentiva-featured-vehicles-section.php` | One cikan araclar bölümü. |
| **Araç Karşılaştırma** | `rentiva-vehicle-comparison-page.php` | Araç karşılaştırma sayfası. |
| **Araç Yorumlari** | `rentiva-vehicle-reviews.php` | Araç değerlendirmeleri. |
| **Arama Sonuçları** | `rentiva-search-results.php` | Arama sonuçları düzeni. |
| **Transfer Arama** | `rentiva-transfer-search.php` / `rentiva-transfer-search-page.php` | Transfer arama formu ve sayfası. |
| **Transfer Sonuçları** | `rentiva-transfer-results.php` / `rentiva-transfer-results-page.php` | Transfer sonuçları düzeni. |
| **Markalar** | `rentiva-brands.php` | Araç markalari bölümü. |
| **Birincil CTA** | `rentiva-primary-cta.php` | Genel aksiyona cagri. |
| **Rezervasyon CTA** | `rentiva-booking-cta.php` | Rezervasyon aksiyona cagri. |
| **Guvenilen Takimlar** | `rentiva-trusted-teams.php` | Guvenilen is ortaklari. |
| **404 Icerigi** | `404-content.php` | 404 sayfası içeriği. |

---

## Responsive Design Implementation

The theme uses a "Fluid Typography and Spacing" approach:

```json
/* theme.json - Fluid Header font size example */
"fontSizes": [
  {
    "slug": "xx-large",
    "size": "clamp(2rem, 4vw, 3rem)",
    "name": "XX Large"
  }
]
```

**Mobile-First Grid System**:
- All patterns are designed using **CSS Grid** or **Flexbox**.
- The Results Grid pattern uses `repeat(auto-fill, minmax(300px, 1fr))` for automatic column adjustment.

---

## How to Customize Templates

Since this is an FSE theme, templates can be overridden in the WordPress Site Editor:
1. Navigate to **Appearance → Editor → Templates**.
2. Select the template (e.g., `Single Vehicle`).
3. Add, remove, or reorder blocks as needed.
4. **Publish**: Your changes are saved to the database, leaving the theme files intact.

### Overriding via Child Theme (Optional)
If you prefer file-based customization, you can create a child theme and place your HTML templates in the same folder structure.

---

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|-------|-------|-----|
| 27.03.2026 | v0.3.0 | Tam şablon (10) ve desen (31) listesi güncellendi; Türkçe içerik. |
| 09.03.2026 | 1.0.0-docs | Şablon ve desen dokumantasyonu oluşturuldu. |
