---
id: developer-reading-order
title: Geliştirici Rehberi Yol Haritası
sidebar_label: Okuma Sırası
sidebar_position: 1
slug: /developer/reading-order
hide_table_of_contents: true
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

# 💻 Geliştirici Rehberi Yol Haritası

MHM Rentiva teknik mimarisini anlamak ve eklenti üzerinde geliştirme yapabilmek için aşağıdaki teknik okuma sırasını takip etmenizi öneririz.

:::tip TEKNİK BAŞLANGIÇ
Eklentinin çekirdek yapısından başlayarak, finansal motor ve API katmanlarına kadar uzanan hiyerarşik bir öğrenme süreci tasarlanmıştır.
:::

---

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #0f766e' }}>
      <h3 className="cardTitle">⚙️ 1. Core & Mimari</h3>
      <p className="cardDescription">Modül yapısı, Transfer mimarisi ve Layout Pipeline gibi çekirdek bileşenler.</p>
      <a className="button button--secondary button--block" href="/mhm-rentiva-docs/docs/developer/core/framework-architecture">Çekirdek Yapı</a>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #3578e5' }}>
      <h3 className="cardTitle">🌐 2. API & Haberleşme</h3>
      <p className="cardDescription">REST v1/v2 uç noktaları, Webhook güvenliği ve Sinir Sistemi hiyerarşisi.</p>
      <a className="button button--secondary button--block" href="/mhm-rentiva-docs/docs/api/overview">API Rehberi</a>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #e5ad24' }}>
      <h3 className="cardTitle">💰 3. Finansal Motor</h3>
      <p className="cardDescription">Ledger modeli, Komisyon politikaları, Payout yönetimi ve Audit kripto bütünlüğü.</p>
      <a className="button button--secondary button--block" href="/mhm-rentiva-docs/docs/developer/financial/governance-controls">Finansal Mimari</a>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #df3c29' }}>
      <h3 className="cardTitle">🧪 4. Test & Operasyon</h3>
      <p className="cardDescription">Unit test stratejileri, Webhook simülasyonları ve Go-Live kontrolleri.</p>
      <a className="button button--secondary button--block" href="/mhm-rentiva-docs/docs/developer/testing/controller-audit">Test Rehberi</a>
    </div>
  </div>
</div>

---

## 🔝 Önemli Teknik Kaynaklar
Geliştiricilerin sıkça başvurduğu diğer dökümanlar:

- 📑 [Özel Yazı Tipleri (Post Types)](/mhm-rentiva-docs/docs/developer/post-types)
- 🎨 [UI Bileşenleri & Dashboard](/mhm-rentiva-docs/docs/developer/ui-components/dashboard-widgets)
- 🔒 [Güvenlik & Gizlilik Standartları](/mhm-rentiva-docs/docs/vendor/security-privacy)

---

### Bölüm Özeti
- Teknik dökümantasyon, bağımlılık ilişkilerine göre (Dependency Chain) sıralanmıştır.
- İlk aşamada **Core + API**, ikinci aşamada **Finans + Test** bölümlerinin incelenmesi önerilir.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 21.03.2026 | 4.21.3 | Kırık linkler (Finansal Mimari, Test Rehberi) doğru rotalara güncellendi. |
| 19.03.2026 | 4.21.2 | Geliştirici Rehberi için premium kart tasarımlı yol haritası oluşturuldu. |
