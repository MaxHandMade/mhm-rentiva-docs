---
id: theme-overview
title: Tema Uyumluluğu ve Görsel Standartlar
sidebar_label: Genel Bakış
sidebar_position: 1
hide_table_of_contents: true
---

import Link from '@docusaurus/Link';

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Theme](https://img.shields.io/badge/theme-v0.3.0-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

# 🎨 Tema ve Görsel Standartlar

MHM Rentiva, modern WordPress blok temaları (FSE) ve klasik temalarla kusursuz uyum sağlar. Görsel bütünlük için gereken tüm tasarım kılavuzuna buradan erişebilirsiniz.

:::tip TASARIM REHBERİ
Aşağıdaki kartlar üzerinden tema mimarisi, şablon hiyerarşisi ve stil özelleştirme imkanlarını keşfedebilirsiniz.
:::

---

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #0f766e' }}>
      <h3 className="cardTitle">🏗️ Tema Mimarisi</h3>
      <p className="cardDescription">Eklentinin tema üzerindeki etkisi, CSS/JS yükleme politikaları ve Asset Manager entegrasyonu.</p>
      <Link className="button button--secondary button--block" to="/docs/theme/introduction">Mimarisi İlke</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #3578e5' }}>
      <h3 className="cardTitle">📦 Şablon & Desenler</h3>
      <p className="cardDescription">Block Patterns kullanımı, tekil araç sayfası şablonları (Single Vehicle) ve Liste görünümleri.</p>
      <Link className="button button--secondary button--block" to="/docs/theme/templates-patterns">Şablon Rehberi</Link>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #e5ad24' }}>
      <h3 className="cardTitle">🛠️ theme.json Desteği</h3>
      <p className="cardDescription">Global renk paletleri, tipografi ayarları ve eklentinin temaya has stil parametreleri.</p>
      <Link className="button button--secondary button--block" to="/docs/theme/theme-json">Stil Kuralları</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #df3c29' }}>
      <h3 className="cardTitle">💻 Tema Geliştirme</h3>
      <p className="cardDescription">Özel tema geliştirmek isteyenler için kancalar (Hooks) ve override mekanizmaları rehberi.</p>
      <Link className="button button--secondary button--block" to="/docs/theme/development">Geliştirme Detayları</Link>
    </div>
  </div>
</div>

---

### Tema v0.3.0 Temel Bilgiler

| Metrik | Değer |
|---|---|
| **Tema Sürümü** | v0.3.0 |
| **Şablonlar (templates/)** | 10 adet (front-page, page, single-vehicle, archive-vehicle, page-account, 404, archive, index, search, single) |
| **Desenler (patterns/)** | 31 adet (homepage, rentiva, 404 kategorilerinde) |
| **CSS Dosyaları** | 6 adet: `header.css`, `3-layout.css`, `components.css`, `utilities.css`, `plugin-pages.css`, `elementor-compat.css` |
| **WordPress Sayfaları** | 10+ sayfa (Türkçe slug'lar ile) |

### Mimari Notlar
- Tema **FSE (Full Site Editing)** mimarisi üzerine inşa edilmiştir.
- **Mobil navigasyon overlay:** Koyu tema (`#101922`), `backdrop-filter` `::before` pseudo-element'e taşınmıştır (containing-block fix).
- **header.html:** `style` attribute'u WP block comment ile eşleştirilmiştir (block validation fix).
- **3-layout.css:** `@layer layout` KALDIRILDI; `rv-trust-value` için `white-space: nowrap` eklendi (10.000+ istatistik karti fix).
- **Sayfa genişliği:** `content-narrow` yerine `content-wide` kullanılmaktadır; `3-layout.css` max-width değeri `var(--wp--style--global--content-size, 1280px)` ile `theme.json`'a senkronize edilmiştir.
- Tum görsel bileşenler `AssetManager` üzerinden merkezi olarak yönetilmektedir.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 27.03.2026 | 4.23.0 | Tema v0.3.0 bilgileri eklendi: 31 pattern, 10 template, 6 CSS dosyası, mimari notlar. |
| 19.03.2026 | 4.21.2 | Tema kategorisi için premium kart tasarımlı Genel Bakış sayfası oluşturuldu. |
