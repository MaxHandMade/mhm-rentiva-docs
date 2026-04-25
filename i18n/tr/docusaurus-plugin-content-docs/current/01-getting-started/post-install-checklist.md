---
id: post-install-checklist
title: Kurulum Sonrası Kontrol Listesi
sidebar_label: Kontrol Listesi
sidebar_position: 4
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Kurulum adımlarını ve sihirbazı tamamladıktan sonra, sitenizin tam işlevsel olduğundan emin olmak için aşağıdaki kontrol listesini takip edin. Bu liste, canlı rezervasyon almaya başlamadan önceki son emniyet kilididir.

---

### 🛠️ Yapılandırma Kontrolü
- [ ] **Ayarlar Kaydedildi:** `MHM Rentiva > Settings` sayfasındaki tüm sekmeler kontrol edildi ve kaydedildi.
- [ ] **Para Birimi:** `General Settings` sekmesinde para birimi ve sembolü doğru görünüyor.
- [ ] **Tarih & Saat:** Sitenizin zaman dilimi (`Settings > General`) işletmenizin lokasyonuyla uyumlu.
- [ ] **Lisans:** `License` sayfasında anahtarınızın "Active" olduğu doğrulandı.

### 📄 Sayfalar ve Kısa Kodlar (Shortcodes)
- [ ] **Sayfa Eşleşmeleri:** `Settings > Shortcode Pages` sekmesinde her fonksiyon (Arama, Liste, Detay, Ödeme, Hesabım) doğru bir sayfaya atanmış.
- [ ] **Görünüm Testi:** Oluşturulan bu sayfalar frontend tarafında şık ve hatasız açılıyor.
- [ ] **Menü Entegrasyonu:** Müşteri paneli (Hesabım) ve Arama sayfası ana menüye eklendi.

### 💰 Ödeme ve Finans
- [ ] **Ödeme Ağ Geçitleri:** WooCommerce ödeme yöntemleri (Stripe, PayPal, Havale vb.) aktif edildi.
- [ ] **Test Ödemesi:** Sandbox/Test modunda en az bir başarılı rezervasyon ödemesi gerçekleştirildi.
- [ ] **Fiyat Hesaplama:** Araç günlük fiyatları ve ekstralar sepete doğru yansıyor.

### 📧 Bildirim Sistemi
- [ ] **Test E-postası:** `Settings > Email Templates` üzerinden bir deneme e-postası gönderildi.
- [ ] **SMTP Doğrulaması:** E-postalar "Spam" klasörüne düşmeden alıcıya ulaşıyor (SMTP kullanımı önerilir).
- [ ] **Admin Bildirimleri:** Yeni bir rezervasyon geldiğinde admin e-postasına bildirim düşüyor.

### 🚗 Araç ve Stok Yönetimi
- [ ] **Örnek Araç:** En az bir adet gerçek özellikli araç sisteme eklendi.
- [ ] **Kategoriler:** Araçlar sınıflarına (Ekonomik, SUV, VIP vb.) göre ayrıldı.
- [ ] **Takvim Kontrolü:** Araç müsaitlik takvimi rezervasyon sonrası doğru şekilde güncelleniyor.

---

## Teknik Doğrulama (Geliştiriciler İçin)

Eğer teknik bir sorun yaşıyorsanız, aşağıdaki noktaları kontrol edin:

1. **Permalinks:** `Settings > Permalinks` sayfasını ziyaret edip "Save Changes" butonuna basarak rotaları yenileyin (`flush_rewrite_rules`).
2. **WooCommerce Sync:** Rentiva'nın WooCommerce sepetine veri gönderip göndermediğini `WooCommerceBridge` loglarından takip edin.
3. **Database Check:** `wp_mhm_rentiva_sessions` tablosunda aktif oturum verisi olup olmadığını PHPMyAdmin üzerinden doğrulayabilirsiniz.

---

### Bölüm Özeti
- Kontrol listesi **5 ana kategoriden** oluşur.
- **Canlıya çıkmadan önce** test ödemesi yapılması kritiktir.
- **Permalink yenileme** birçok sayfa hatasını çözer.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 18.03.2026 | 4.21.2 | Checklist yapısı modern ikonlar ve kategorilerle yenilendi. |
| 26.02.2026 | 4.21.0 | İlk sürüm oluşturuldu. |

