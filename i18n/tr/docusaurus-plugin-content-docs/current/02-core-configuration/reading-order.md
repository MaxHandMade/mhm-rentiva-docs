---
id: core-configuration-reading-order
title: Temel Yapılandırma Yol Haritası
sidebar_label: Okuma Sırası
sidebar_position: 1
slug: /core-configuration/reading-order
hide_table_of_contents: true
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

# ⚙️ Temel Yapılandırma Yol Haritası

Eklentiyi kurduktan sonra, operasyonel süreçlerin sağlıklı işlemesi için ayarların belirli bir mantık çerçevesinde yapılması gerekir. Bu bölüm, sistemin "kalbi" sayılan temel yapılandırma adımlarını kapsar.

:::tip YAPILANDIRMA REHBERİ
Sistemi eksiksiz kurmak için aşağıdaki kategorize edilmiş kartları takip edin. Her kart, ilgili ayar grubuna hızlı ulaşım sağlar.
:::

---

<div className="row">
  <div className="col col--4 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #0f766e' }}>
      <h3 className="cardTitle">🏢 1. Genel Ayarlar</h3>
      <p className="cardDescription">Şirket bilgileri, para birimi ve temel çalışma modlarını belirleyin.</p>
      <a className="button button--secondary button--block" href="/mhm-rentiva-docs/docs/core-configuration/settings">Genel Ayarlar</a>
    </div>
  </div>
  <div className="col col--4 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #3578e5' }}>
      <h3 className="cardTitle">📅 2. Rezervasyon</h3>
      <p className="cardDescription">Kiralama süreleri, depozito oranları ve rezervasyon davranışları.</p>
      <a className="button button--secondary button--block" href="/mhm-rentiva-docs/docs/core-configuration/booking-settings">Rezervasyon</a>
    </div>
  </div>
  <div className="col col--4 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #e5ad24' }}>
      <h3 className="cardTitle">💳 3. Ödemeler</h3>
      <p className="cardDescription">WooCommerce ödeme geçitleri ve tahsilat kurallarını yapılandırın.</p>
      <a className="button button--secondary button--block" href="/mhm-rentiva-docs/docs/core-configuration/payments">Ödeme Ayarları</a>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--4 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #df3c29' }}>
      <h3 className="cardTitle">📧 4. Bildirimler</h3>
      <p className="cardDescription">E-posta şablonları, SMTP ayarları ve otomatik bilgilendirmeler.</p>
      <a className="button button--secondary button--block" href="/mhm-rentiva-docs/docs/core-configuration/emails">E-posta Ayarları</a>
    </div>
  </div>
  <div className="col col--4 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #6366f1' }}>
      <h3 className="cardTitle">🏎️ 5. Araç Alanları</h3>
      <p className="cardDescription">Teknik veriler (yakıt, vites vb.) ve araç özellikleri tanımı.</p>
      <a className="button button--secondary button--block" href="/mhm-rentiva-docs/docs/core-configuration/vehicle-settings">Araç Ayarları</a>
    </div>
  </div>
  <div className="col col--4 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #ec4899' }}>
      <h3 className="cardTitle">🔑 6. Lisans</h3>
      <p className="cardDescription">Pro özelliklerin kilidini açmak için anahtarınızı aktif edin.</p>
      <a className="button button--secondary button--block" href="/mhm-rentiva-docs/docs/core-configuration/license">Lisans Yönetimi</a>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #8b5cf6' }}>
      <h3 className="cardTitle">⚡ 7. Sistem & Performans</h3>
      <p className="cardDescription">Önbellekleme, güvenlik kuralları ve sistem sağlığı denetimi.</p>
      <a className="button button--secondary button--block" href="/mhm-rentiva-docs/docs/core-configuration/system-performance">Sistem & Hız</a>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #10b981' }}>
      <h3 className="cardTitle">🛠️ 8. Bakım & Araçlar</h3>
      <p className="cardDescription">Veritabanı temizliği, cron izleme ve teşhis araçları.</p>
      <a className="button button--secondary button--block" href="/mhm-rentiva-docs/docs/core-configuration/maintenance">Bakım Sayfası</a>
    </div>
  </div>
</div>

---

## 📈 Yapılandırma Akış Diyagramı

```mermaid
graph TD
    Start((BAŞLAT)) --> GS[1. Genel Ayarlar]
    GS --> BS[2. Rezervasyon Yönetimi]
    BS --> PS[3. Ödeme Ayarları]
    PS --> ES[4. E-posta Kapıları]
    ES --> AS[5. Araç Alanları]
    AS --> LZ[6. Lisans Aktivasyonu]
    LZ --> SP[7. Sistem & Güvenlik]
    SP --> UT[8. Bakım ve Teşhis]
    UT --> End((TAMAMLANDI))
```

---

### Bölüm Özeti
- Doğru sıralı yapılandırma, sistem çakışmalarını önler.
- En sonda sistemi **Bakım ve Teşhis** araçlarıyla doğrulamanız önerilir.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | Temel Yapılandırma için premium kart tasarımlı yol haritası oluşturuldu. |
