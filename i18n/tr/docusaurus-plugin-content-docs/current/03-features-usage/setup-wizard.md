---
id: setup-wizard
title: Kurulum Sihirbazı (Setup Wizard)
sidebar_label: Kurulum Sihirbazı
sidebar_position: 15
slug: /features-usage/setup-wizard
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Kurulum Sihirbazı, yeni bir WordPress kurulumunda MHM Rentiva'yı hazırlamanızda ve ayarlarını yapılandırmanızda size yol gösterir. Sihirbazı istediğiniz zaman **MHM Rentiva > Kurulum sihirbazı** yolundan yeniden açabilirsiniz. Her biri kart olarak gösterilen beş numaralı adımı vardır: Sistem kontrolü, Gerekli sayfalar, E-posta ayarları, Ön yüz ve görünüm, Özet ve testler.

---

## Adım 1: Sistem gereksinimleri (Sistem kontrolü)

WordPress ortamınızı tarayarak Rentiva'nın güvenilir şekilde çalışabildiğini doğrular. Her satırda mevcut değer, önerilen değer ve durum görünür. Devam etmeden önce gerekli olarak işaretlenen her şeyi çözün:

- **WooCommerce:** Kurulu ve Aktif olup olmadığı denetlenir (zorunlu).
- **PHP sürümü:** Eklentinin gerektirdiği en düşük sürümle karşılaştırılır (PHP 8.1+).
- **WordPress sürümü:** Eklentinin gerektirdiği en düşük sürümle karşılaştırılır (WordPress 7.0+).
- **Veritabanı sürümü:** MySQL 5.7+ veya MariaDB 10.3+ önerilir.
- **PHP bellek sınırı:** 256 MB önerilir. Altındaysa adım, `wp-config.php` dosyasına eklenecek satırı gösteren bir not çıkarır.
- **PHP `max_execution_time`:** 60 saniyenin altında *Uyarı*; büyük içe aktarmalar için artırın.
- **HTTPS / SSL:** Geçerli bir SSL sertifikası algılanmazsa *Uyarı*.
- **WP-Cron:** WP-Cron kapalıysa *Uyarı*; zamanlanmış e-postalar ve hatırlatmalar bunu ya da gerçek bir sunucu cron işini gerektirir.
- **E-posta teslimatı:** SMTP sağlayıcısı algılanmazsa *Uyarı*.

En düşük PHP ve WordPress sürümleri eklentinin kendisinden okunur; bu adım her zaman eklentinin gerçek gereksinimleriyle uyumludur.

---

## Adım 2: Gerekli sayfalar

Rentiva; arama, araç ayrıntıları, rezervasyon ve iletişim için özel WordPress sayfaları (kısa kod sayfaları) kullanır. Bu sayfaları **Eksik sayfaları oluştur** düğmesiyle oluşturabilir ya da mevcut sayfaları bağlamak için **Kısa kod sayfalarını aç** düğmesini kullanabilirsiniz. Sihirbazın yapılandırdığı sayfalar (önerilen adresleriyle):

1. **Rezervasyon formu** (`[rentiva_booking_form]`) -> `/rentiva/booking-form/`
2. **Araç arama** (`[rentiva_unified_search]`) -> `/rentiva/search/`
3. **Arama sonuçları** (`[rentiva_search_results]`) -> `/rentiva/search-results/`
4. **Araç ayrıntıları** (`[rentiva_vehicle_details]`) -> `/rentiva/vehicle/`
5. **Araç listesi** (`[rentiva_vehicles_list]`) -> `/rentiva/vehicles/`
6. **İletişim formu** (`[rentiva_contact]`) -> `/rentiva/contact/`

:::info İsteğe Bağlı Sayfalar
**Araç Izgarası** (`[rentiva_vehicles_grid]`) ve **Araç Karşılaştırma** (`[rentiva_vehicle_comparison]`) sayfaları isteğe bağlıdır ve sihirbaz tarafından zorunlu tutulmaz. Bunları gerektiğinde elle oluşturabilirsiniz.
:::

Her sayfanın yanında "Mevcut" ya da "Eksik" durumu ve mevcut sayfalar için "Düzenle" bağlantısı görünür.

---

## Adım 3: E-posta ayarları ve bildirimler

Gönderen bilgilerini ve rezervasyonlar için otomatik e-posta bildirimlerini yapılandırdığınız ekran.
*Sihirbaz başta, varsayılan WordPress e-posta sisteminin güvenilmez olabileceği konusunda uyarır ve WP Mail SMTP ya da Fluent SMTP gibi bir SMTP eklentisi önerir.*

**Yapılandırma alanları:**
- **Gönderen adı** ve **Gönderen e-postası:** Müşterilere giden e-postalarda kullanılan ad ve adres.
- **Yanıt adresi:** Müşteri "Yanıtla"ya bastığında e-postanın gideceği adres.
- **Test kipi** ve **Test e-posta adresi:** Test kipi açıkken tüm e-postalar yalnızca test adresine gider. Canlıya geçmeden önce kapatın.

**Otomasyon seçenekleri:**
- **E-posta gönderme etkinleştirildi**
- **Otomatik e-posta gönderme etkinleştirildi** (örneğin rezervasyon durumu değiştiğinde)
- **E-postaları e-posta günlüğü yazı türünde günlüğe kaydet:** gönderilen e-postaların kaydını tutar.

---

## Adım 4: Ön yüz ve görünüm

Müşteri tarafında, rezervasyon formlarında ve araç kartlarında görünen temel para, süre ve renk ayarları:

- **Para birimi ve Para birimi konumu:** *MHM Rentiva, WooCommerce ile bütünleşir.* WooCommerce etkinken sihirbaz "WooCommerce tarafından yönetilmektedir: …" bilgisini gösterir ve para birimini değiştirmez; değişiklik gerekiyorsa bağlantı sizi WooCommerce ayarlarına götürür.
- **Varsayılan kiralama gün sayısı:** Formlarda önceden doldurulan varsayılan kiralama süresi (1–30).
- **Minimum kiralama gün sayısı:** Sistemin kabul edeceği en az gün sayısı.
- **Maksimum kiralama gün sayısı:** Aşırı uzun kiralamaları önleyen sınır.
- **Ana renk:** **Ayarlar > Ön yüz ve görünüm > Renkler** ile aynı ayardır (Otomatik veya Özel, ön izlemeyle).

:::info 6.4.0'da değişti
Araç kartları için "Özellik rozetlerini göster" ve "Uygunluk rozetini göster" kutuları kaldırıldı; bunlar kısa kod parametreleriyle (`show_features`, `show_badges` vb.) yönetilir.
:::

---

## Adım 5: Özet ve testler

Her adımı durumuyla listeler. Kalıcı bağlantı yapınız "Düz" ise, ön yüz sayfalarının çalışması için bunu (örneğin "Yazı adı" olarak) değiştirmenizi isteyen bir uyarı çıkar. Kontrol için **Ayarları aç**, **Kısa kod sayfalarını incele** veya **Test e-postası gönder** düğmelerini kullanın, ardından **Kurulumu tamamla** düğmesine basın.

---

### Bölüm Özeti
- Kurulum Sihirbazı sistem kontrolüyle başlar ve para birimi için WooCommerce'i kullanarak sağlam bir temel hazırlar.
- Sihirbaz tamamlandığında gerekli sayfalar, kısa kodlar ve e-posta otomasyonu hazırdır.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 18.11.2026 | 6.4.0 | Sihirbaz gerçek beş adımını yansıtır (lisans adımı sihirbazın parçası değildir); ana renk eklendi; e-posta ve görünüm adımları güncellendi; en düşük sürümler eklentiden okunur. |
| 27.03.2026 | 4.22.1 | Zorunlu sayfa listesi güncellendi: `rentiva_vehicle_details` eklendi, `rentiva_vehicles_grid` ve `rentiva_vehicle_comparison` kaldırıldı (opsiyonel). 7 -> 6 sayfa. |
| 19.03.2026 | 4.21.2 | Kullanım kılavuzu oluşturuldu. |
