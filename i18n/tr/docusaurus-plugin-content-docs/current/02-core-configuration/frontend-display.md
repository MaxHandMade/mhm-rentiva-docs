---
id: frontend-display
title: Ön Yüz ve Ekran Ayarları
sidebar_label: Ön Üç ve Ekran
sidebar_position: 12
slug: /core-configuration/frontend-display
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Ön Yüz ve Ekran sekmesi, eklentinin kullanıcı tarafındaki (frontend) görünümünü, buton metinlerini, uyarı mesajlarını ve sayfa bağlantılarını (URL) özelleştirdiğiniz kapsamlı bir yönetim alanıdır. **MHM Rentiva > Ayarlar > Ön Yüz ve Ekran** altından ulaşılır.

---

## 🖼️ Temel Araç Görüntüleme Ayarları

Araç listeleme sayfalarındaki görsel hiyerarşiyi buradan kontrol edebilirsiniz:

- **Sayfa Başına Araç Sayısı:** Tek bir sayfada listelenecek maksimum araç sayısı (Örn: 12).
- **Varsayılan Sıralama:** Listeleme sayfasının ilk açılışta hangi kritere göre dizileceği (Fiyata göre artan, Yıla göre azalan vb.).

:::note Kaldirilan Ayarlar (v4.22.1)
Daha önceki sürümlerde bulunan **Araç Resimlerini Göster** (`mhm_rentiva_vehicle_show_images`), **Özellikleri Göster** (`mhm_rentiva_vehicle_show_features`) ve **Müsaitlik Durumunu Göster** (`mhm_rentiva_vehicle_show_availability`) ayarlari kodda hicbir yerde kullanilmadigi için v4.22.1 ile kaldirilmistir. Bu görüntüleme kontrolleri artik dogrudan kisa kod (shortcode) parametreleri üzerinden yönetilmektedir (`show_features`, `show_badges` vb.).
:::

---

## ✍️ Özel Etiketler ve Metinler (Labels)

Eklentideki tüm buton ve form metinlerini dilinize veya marka dilinize göre saniyeler içinde değiştirebilirsiniz. Bu bölüm akordiyon yapısındadır:

- **Genel Butonlar:** "Hemen Kirala", "Detayları Gör", "Rezervasyon Yap" gibi buton metinleri.
- **Bildirim Mesajları:** "Favorilere eklendi", "Giriş yapmalısınız", "İşlem yapılıyor..." gibi anlık uyarılar.
- **Form Etiketleri:** Rezervasyon formundaki "Ad", "Soyad", "Telefon" gibi alan isimleri.
- **Ödeme ve Doğrulama:** "Hesaplanıyor...", "Ödeme başarılı", "Geçersiz tarih seçimi" gibi kritik sistem mesajları.

---

### 🖼️ GÖRSEL: ÖN YÜZ YAPILANDIRMA PANELİ
*(Ayarlar > Ön Yüz ve Ekran sekmesi, etiket grupları ve görüntüleme ayarları)*

---

## 🔗 Kalıcı Bağlantılar ve Sayfa URL Yapısı

Eklentinin doğru çalışması için kritik olan sayfa yollarını buradan elle belirleyebilirsiniz:

- **Rezervasyon Formu URL:** `[rentiva_booking_form]` kısa kodunun bulunduğu sayfanın tam adresi.
- **Giriş ve Kayıt Sayfası:** Müşterilerin yönlendirileceği özel giriş ve üyelik sayfaları.

:::tip Otomatik Tespit
Eğer bu alanları boş bırakırsanız, sistem ilgili kısa kodun bulunduğu sayfaları veritabanında otomatik olarak tarayacak ve bulacaktır. Ancak özel bir sayfa yapınız varsa buraya tam URL girmeniz önerilir.
:::

---

### Bölüm Özeti
- **Kullanıcı Deneyimi** için tüm butonları hedef kitlenizin diline göre özelleştirin.
- **Görsel Düzen** ile listeleme sayfalarınızı sitenizin tasarımına uydurun.
- **Sayfa Bağlantıları** ile rezervasyon akışının kesintisiz çalıştığından emin olun.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 27.03.2026 | 4.22.1 | Kullanilmayan görsel kontrol ayarlari (`show_images`, `show_features`, `show_availability`) kaldırıldı notu eklendi. |
| 19.03.2026 | 4.21.2 | Ön Yüz ve Ekran dökümanı tüm etiket grupları ve URL yapılandırmasıyla oluşturuldu. |
