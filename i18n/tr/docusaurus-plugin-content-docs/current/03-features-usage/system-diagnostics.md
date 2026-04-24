---
id: system-diagnostics-usage
title: Sistem Sağlığı ve Ayarlar Testi (Usage)
sidebar_label: Sistem Sağlığı
sidebar_position: 18
slug: /features-usage/system-diagnostics
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Sistem Sağlığı ve Ayarlar Testi, eklentinin tüm bileşenlerinin (Ödeme kapıları, E-posta, Cron görevleri, Araç envanteri) doğru çalışıp çalışmadığını denetlemenizi sağlar. **MHM Rentiva > Ayarlar > Ayarlar Testi** sekmesinden ulaşılır.

İşletmenizin sorunsuz hizmet vermesi için periyodik olarak bu testleri çalıştırmanız önerilir.

---

## 🔍 Kategori Bazlı Testler

Tanılama sistemi, işletmenizi şu başlıklarda tarar:

- **E-posta Gönderimi:** Bildirimlerin müşteriye ulaşıp ulaşmadığını test eder.
- **Dizin Yazma Yetkileri:** Araç görselleri ve rapor çıktıları için klasör izinlerini kontrol eder.
- **Kritik Sayfa Bağlantıları:** Arama, rezervasyon ve ödeme sayfalarının yayında olup olmadığını doğrular.
- **WP Cron Durumu:** Zamanlanmış görevlerin (Hatırlatıcılar, Payout hesaplamaları) sıraya alınıp alınmadığını izler.

---

### 🖼️ GÖRSEL: SİSTEM TANILAMA RAPORU
*(Ayarlar testi sayfası ve başarı/hata bildirimleri)*

---

## 📉 Hata Giderme ve Aksiyonlar

Bir test başarısız olduğunda sistem size şu çözümleri sunar:
- **Tek Tıkla Çöz:** Eğer sorun bir sayfanın eksik olması gibi basit bir durumsa, sayfayı otomatik oluşturur.
- **Detaylı Log:** Hatanın teknik detayını (örn: sunucu hatası 500) göstererek destek almanızı kolaylaştırır.
- **Yeniden Tara:** Sorunu çözdükten sonra testi tekrar çalıştırarak durumu doğrulayabilirsiniz.

---

### Bölüm Özeti
- **Operasyonel Güvence:** Hatalı yapılandırmalardan kaynaklı müşteri kaybını önleyin.
- **Hızlı Teşhis:** Sorunun sunucu kaynaklı mı yoksa ayar kaynaklı mı olduğunu saniyeler içinde anlayın.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 19.03.2026 | 4.21.2 | Sistem Sağlığı ve Ayarlar Testi kullanım rehberi oluşturuldu. |
