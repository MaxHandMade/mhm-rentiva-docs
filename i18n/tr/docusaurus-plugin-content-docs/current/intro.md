---
slug: /
sidebar_position: 0
title: Hoş Geldiniz
hide_table_of_contents: true
---

import Link from '@docusaurus/Link';

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

# MHM Rentiva Dokümantasyonu

WordPress tabanlı araç kiralama operasyonlarınızı profesyonel bir seviyeye taşıyan **MHM Rentiva** eklentisinin resmi dokümantasyon merkezine hoş geldiniz. Bu merkez, hem site sahipleri hem de geliştiriciler için kapsamlı bir rehber sunar.

:::tip Hızlı Erişim
Hangi özelliği arıyorsunuz? Aşağıdaki ana kategoriler aracılığıyla ihtiyacınız olan bilgiye hızla ulaşabilirsiniz.
:::

---

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #0f766e' }}>
      <h3 className="cardTitle">🚀 Başlangıç Rehberi</h3>
      <p className="cardDescription">Sistemi dakikalar içinde kurun. Gereksinimler, aktivasyon ve ilk ayarlar için adım adım yol haritası.</p>
      <Link className="button button--secondary button--block" to="/docs/getting-started/reading-order">Hemen Başla</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #3578e5' }}>
      <h3 className="cardTitle">⚙️ Temel Yapılandırma</h3>
      <p className="cardDescription">Genel ayarlar, WooCommerce ödeme ağ geçitleri, vergi yapılandırması ve e-posta bildirim sistemleri.</p>
      <Link className="button button--secondary button--block" to="/docs/core-configuration/settings">Ayarları Yapılandır</Link>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #e5ad24' }}>
      <h3 className="cardTitle">🚗 Özellikler ve Kullanım</h3>
      <p className="cardDescription">Araç yönetimi, rezervasyon takibi, müşteri portalı ve raporlama modüllerini en verimli şekilde kullanın.</p>
      <Link className="button button--secondary button--block" to="/docs/features-usage/reading-order">Kullanım Kılavuzu</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #df3c29' }}>
      <h3 className="cardTitle">💻 Geliştirici Rehberi</h3>
      <p className="cardDescription">Eklentiyi özelleştirmek isteyenler için REST API referansları, Hook/Filter listeleri ve veritabanı şeması.</p>
      <Link className="button button--secondary button--block" to="/docs/developer/reading-order">Teknik Detaylar</Link>
    </div>
  </div>
</div>

---

## 🔝 Popüler Başlıklar
Hızlı çözüm mü arıyorsunuz? En çok ziyaret edilen konulara göz atın:

- 💳 [WooCommerce Ödeme Entegrasyonu](./core-configuration/payments)
- 📧 [E-posta Şablonlarını Özelleştirme](./core-configuration/emails)
- 🏎️ [Araç Ekleme ve Müsaitlik Takvimi](./features-usage/vehicles)
- 🧩 [Kısa Kod (Shortcode) Listesi](./features-usage/shortcodes/overview)
- ✅ [Kurulum Sonrası Kontrol Listesi](./getting-started/post-install-checklist)
- ➕ [Ek Hizmet Yönetimi](./features-usage/additional-services-usage)
- 🛠️ [Sorun Giderme Rehberi](./faq/common-issues)

---

## 🏗️ Teknik Kaynaklar
Geliştiriciler için derinlemesine teknik dökümanlar:

- 🧱 [Modül Mimarisi](./developer/core/technical-architecture)
- 💰 [Finansal Yönetişim](./developer/financial/governance-controls)
- 🧾 [Ledger Veri Modeli](./developer/financial/financial-ledger-model)
- 🧪 [Test Denetimi (Controller Audit)](./developer/testing/test-suite)
- 🧠 [REST API Mimarisi](./api/overview)
- 🌐 [v1 REST API Referansı](./api/v1/rest-api-v1)

---

## 🤝 Tedarikçi (Vendor) Ekosistemi
- 🚀 [Vendor Oryantasyonu](./vendor/onboarding)
- 💳 [Payout & Ledger Sistemi](./vendor/payouts-ledger)
- 📊 [Analiz ve Performans](./vendor/analytics)
- 🛡️ [Güvenlik ve Gizlilik](./vendor/security-privacy)

---

## 🌐 Destek ve Topluluk
- **Hata Bildirimi:** [GitHub Issues](https://github.com/MaxHandMade/mhm-rentiva/issues)
- **Topluluk Forumu:** [WordPress Destek](https://wordpress.org/support/plugin/mhm-rentiva)
- **Geliştirici Blogu:** [Blog](/blog)

---

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Settings Testing pollution hotfix + duplicate Addon notice dedupe. |
| 23.04.2026 | 4.27.1 | i18n locale-leak hotfix. |
| 23.04.2026 | 4.27.0 | WordPress.org submission readiness. |
| 21.03.2026 | 4.21.5 | Tüm rota ID'leri ve kategori eşleşmeleri %100 doğrulandı. |
