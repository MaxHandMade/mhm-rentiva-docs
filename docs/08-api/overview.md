---
id: overview
title: REST API ve Sinir Sistemi (Nervous System)
sidebar_label: Genel Bakış
sidebar_position: 1
hide_table_of_contents: true
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-21.03.2026-orange?style=flat-square)

# 🧠 REST API ve Sinir Sistemi

MHM Rentiva'nın tüm modülleri arasındaki veri akışını, dış sistem entegrasyonlarını ve modern arayüz (Interactivity API) haberleşmesini yöneten merkezi sinir sistemine hoş geldiniz.

:::tip TEKNİK REHBER
Aşağıdaki kartlar aracılığıyla sistemin asenkron katmanları, güvenli protokolleri ve gelecek planları hakkında detaylı teknik bilgiye ulaşabilirsiniz.
:::

---

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #0f766e' }}>
      <h3 className="cardTitle">🌐 v1 Endpoints (Current)</h3>
      <p className="cardDescription">Mevcut aktif kullanılan REST uç noktaları. Kiralama, konum servisleri ve sağlık denetimi (Health) referansları.</p>
      <a className="button button--secondary button--block" href="./v1/rest-api-v1">v1 Referansı</a>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #3578e5' }}>
      <h3 className="cardTitle">🏗️ v2 Planning (Future)</h3>
      <p className="cardDescription">Sistemin API-First dönüşümü. Mobil uygulama desteği, JWT kurgusu ve gelecek nesil API mimarisi yol haritası.</p>
      <a className="button button--secondary button--block" href="./rest-v2-planning">v2 Planı</a>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #e5ad24' }}>
      <h3 className="cardTitle">🛡️ Güvenlik ve Lisans</h3>
      <p className="cardDescription">HMAC imzalama, API anahtarı yönetimi ve harici lisans sunucusu haberleşme protokolleri.</p>
      <a className="button button--secondary button--block" href="./license-server-protocols">Güvenlik Detayları</a>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #df3c29' }}>
      <h3 className="cardTitle">🔍 Denetim ve Mimari</h3>
      <p className="cardDescription">Controller (Denetleyici) denetimi, Sinir Sistemi hiyerarşisi ve performans optimizasyon raporları.</p>
      <a className="button button--secondary button--block" href="./api-nervous-system">Mimari Analiz</a>
    </div>
  </div>
</div>

---

## 🔝 Popüler Teknik Konular
Geliştiricilerin en çok ihtiyaç duyduğu API başlıkları:

- 🛡️ [API Kimlik Doğrulama Yöntemleri](./v1/auth-and-security)
- 🔑 [API Key Manager Kullanımı](./v1/api-key-manager)
- 🧾 [Ödeme Geri Bildirim (Callback) API](./v1/financial-rest-callbacks)
- 🚦 [Hata Kodları ve Rate Limiting](./v1/rate-limits-and-errors)

---

### Bölüm Özeti
- Bu kısımdaki dökümanlar, eklentinin teknik altyapısını anlamak isteyen geliştiriciler için hazırlanmıştır.
- Tüm `v1` ve `v2` geçiş süreçleri standartize edilmiş bir hiyerarşiyle sunulur.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 21.03.2026 | 4.21.3 | Kırık linkler (v1 Referansı, v2 Planı vb.) relative path olarak düzeltildi. |
| 19.03.2026 | 4.21.2 | API Kategorisi için premium kart tasarımlı ana sayfa oluşturuldu. |
