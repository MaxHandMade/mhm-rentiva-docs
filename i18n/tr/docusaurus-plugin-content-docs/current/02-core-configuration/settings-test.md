---
id: settings-test
title: Ayarlar Testi (Diagnostic Testing)
sidebar_label: Ayarlar Testi
sidebar_position: 16
slug: /core-configuration/settings-test
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Ayarlar Testi sekmesi, eklentinin tüm parçalarının (Veritabanı, E-posta, Dosya Sistemi, WooCommerce Entegrasyonu vb.) doğru yapılandırılıp yapılandırılmadığını otomatik olarak denetleyen teşhis (Diagnostic) aracıdır. **MHM Rentiva > Ayarlar > Ayarlar Testi** altından ulaşılır.

Eklentiyi kurduğunuzda veya sunucu değişikliği yaptığınızda sistemin tüm gereksinimleri karşıladığından emin olmanızı sağlar.

---

## 🩺 Kapsamlı Test Kategorileri

Sistem şu ana başlıklar altında derinlemesine tarama yapar:

- **E-posta Altyapısı:** SMTP bağlantısı, e-posta gönderici adı, şablonların mevcudiyeti ve test mesajı gönderilebilirliği.
- **Dosya Sistemi İzinleri:** CSS, JS ve log dosyalarının belirlenen dizinlere (`/uploads/mhm-rentiva/` vb.) yazılabildiğini kontrol eder.
- **Güvenlik Yapılandırması:** Auth anahtarlarının geçerliliği, IP kısıtlama mekanizmalarının ve brute-force korumasının aktifiği.
- **WooCommerce Entegrasyonu:** Ödeme yöntemleri, vergi kuralları ve ürün senkronizasyonunun eklentiyle tam uyumlu çalışıp çalışmadığı.
- **Dahili Sistem Sağlığı:** SQL Mode'un performansa uygunluğu, PHP sürümü ve WordPress temel ayarlarının (Timezone vb.) doğruluğu.

---

### 🛡️ Teşhis Raporu Sonuçları

Rapor ekranındaki her satırın anlamı şudur:

| Simge | Durum | Açıklama |
| :---: | :--- | :--- |
| ✅ | **GEÇTİ** | İlgili sistem birimi tüm şartları sağlıyor ve sorunsuz çalışıyor. |
| ❌ | **BAŞARISIZ** | Kritik bir yapılandırma hatası (Dosya yazma izni eksik olabilir vb.). Mutlaka düzeltilmelidir. |
| ⚠️ | **UYARI** | Sistem çalışır durumda ancak performans veya yapılandırma iyileştirilmesi önerilir. |

---

### 🖼️ GÖRSEL: AYARLAR TEST RAPORU
*(Ayarlar > Ayarlar Testi sekmesindeki Diagnostic sonuçları listesi ve rapor özet ekranı)*

---

### Bölüm Özeti
- **Hızlı Sorun Giderme** (Troubleshooting) için bu testi her yapılandırma değişikliği sonrası çalıştırın.
- **Destek Başvuruları** öncesi bu sayfadaki sonuçları ekibimizle paylaşarak teşhis sürecini hızlandırın.
- **Güvenli Kurulum** yaparak müşterilerinizin rezervasyon sürecinde hata almamasını sağlayın.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 19.03.2026 | 4.21.2 | Ayarlar Testi (Diagnostic) dökümanı ayrı bir sayfa olarak oluşturuldu. |
