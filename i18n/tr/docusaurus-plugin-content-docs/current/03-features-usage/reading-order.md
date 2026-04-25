---
id: features-usage-reading-order
title: Özellikler ve Kullanım Yol Haritası
sidebar_label: Okuma Sırası
sidebar_position: 1
slug: /features-usage/reading-order
hide_table_of_contents: true
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

# 🚗 Özellikler ve Kullanım Yol Haritası

MHM Rentiva'nın sunduğu zengin özellikleri en verimli şekilde kullanabilmeniz için aşağıdaki operasyonel sırayı takip etmenizi öneririz.

:::tip KULLANIM REHBERİ
Günlük kiralama operasyonlarınızı yönetmek, araç eklemek ve rapor alabilmek için aşağıdaki kategorize edilmiş kartları kullanın.
:::

---

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #0f766e' }}>
      <h3 className="cardTitle">🏎️ 1. Araç ve Envanter</h3>
      <p className="cardDescription">Araç ekleme, kategori yönetimi, fiyatlandırma ve global araç ayarları.</p>
      <a className="button button--secondary button--block" href="/docs/features-usage/vehicles">Araç Yönetimi</a>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #3578e5' }}>
      <h3 className="cardTitle">📅 2. Rezervasyon Takibi</h3>
      <p className="cardDescription">Gelen talepleri yönetin, takvimi izleyin ve rezervasyon detaylarını inceleyin.</p>
      <a className="button button--secondary button--block" href="/docs/features-usage/bookings">Rezervasyonlar</a>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #e5ad24' }}>
      <h3 className="cardTitle">✨ 3. Ek Hizmetler & VIP</h3>
      <p className="cardDescription">Bebek koltuğu, sigorta gibi ekstralar ve VIP transfer güzergah tanımları.</p>
      <a className="button button--secondary button--block" href="/docs/features-usage/additional-services-usage">Ekstra Hizmetler</a>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #df3c29' }}>
      <h3 className="cardTitle">💬 4. Müşteri & İletişim</h3>
      <p className="cardDescription">Müşteri portalı yönetimi, sadakat programı ve dahili mesajlaşma sistemi.</p>
      <a className="button button--secondary button--block" href="/docs/features-usage/customers">Müşteri Yönetimi</a>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--12 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #8b5cf6' }}>
      <h3 className="cardTitle">📊 5. Raporlama ve Analiz</h3>
      <p className="cardDescription">İşletme performans grafikleri, gelir raporları ve verilerin dışa aktarımı.</p>
      <a className="button button--secondary button--block" href="/docs/features-usage/reports">Raporlar ve Export</a>
    </div>
  </div>
</div>

---

## 📈 Operasyonel Döngü

```mermaid
graph TD
    A[<b>1. Araç Ekleme</b>] --> B[<b>2. Rezervasyon Alma</b>]
    B --> C[<b>3. Operasyon / Teslimat</b>]
    C --> D[<b>4. Müşteri İlişkileri</b>]
    D --> E[<b>5. Raporlama ve Analiz</b>]
    E --> A
    
    style A fill:#f0fdf4,stroke:#16a34a,stroke-width:2px
    style B fill:#eff6ff,stroke:#2563eb,stroke-width:2px
    style C fill:#fff1f2,stroke:#e11d48,stroke-width:2px
    style D fill:#faf5ff,stroke:#9333ea,stroke-width:2px
    style E fill:#fffbeb,stroke:#d97706,stroke-width:2px
```

---

### Bölüm Özeti
- Bu bölüm, eklentinin günlük kullanımına yönelik iş akışlarını kapsar.
- Operasyonel döngü, sürdürülebilir bir kiralama işletmesi için tasarlanmıştır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 21.03.2026 | 4.21.3 | Tüm kart linkleri (Araçlar, Rezervasyonlar, Ekstra Hizmetler vb.) relative path olarak düzeltildi. |
| 19.03.2026 | 4.21.2 | Özellikler ve Kullanım için premium kart tasarımlı yol haritası oluşturuldu. |
