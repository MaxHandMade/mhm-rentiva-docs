---
id: setup-wizard
title: Kurulum Sihirbazı (Setup Wizard)
sidebar_label: Kurulum Sihirbazı
sidebar_position: 15
slug: /features-usage/setup-wizard
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Kurulum Sihirbazı, yeni bir WordPress kurulumunda MHM Rentiva'yı hazırlamak ve ayarları yapılandırmak için izlenen adımlardır. Bu sihirbazı daha sonra **MHM Rentiva > Kurulum Sihirbazı** menüsünden dilediğiniz zaman yeniden açabilirsiniz. Sihirbaz ekranının üst kısmında, sistemde çözülmesi gereken bildirimler veya hatalar (Örn: Harekete geçirici Eylem Planlayıcı mesajları) sürekli olarak gösterilir.

---

## 🛠️ Adım 1: Sistem Gereksinimleri (Sistem Kontrolü)

Rentiva'nın güvenilir bir şekilde çalışabilmesi için WordPress ortamınızı tarar. Devam etmeden önce "Gerekli" veya "Uyarı" olarak işaretlenmiş tüm öğelerin incelenmesi önerilir:

- **WooCommerce:** Yüklü ve Aktif durumu kontrol edilir.
- **PHP Sürümü:** Minimum 7.4+ (Örn: `8.2.30` desteklenir).
- **WordPress Versiyonu:** Minimum 6.0+ gereksinimi (Örn: `6.9.4` Hazır).
- **Veritabanı Sürümü:** MySQL 5.7+ veya MariaDB 10.3+ gerektirir.
- **PHP Bellek Sınırı (Memory Limit):** 256 MB önerilir ve denetlenir.
- **PHP `max_execution_time`:** *Uyarı* - Büyük içe aktarmalar (Import) için bu değerin 60 saniye veya üzerine çıkartılması önerilir (Örn: 30s ise uyarı verir).
- **HTTPS / SSL:** *Uyarı* - Müşteri verilerini korumak için geçerli bir SSL sertifikası algılanıp algılanmadığını denetler.
- **WP Cron:** Planlanmış e-postalar ve otomatik işler için aktifliği taranır.
- **E-posta Teslimatı:** SMTP sağlayıcısının (SMTP plugin vs.) kurulu olup olmadığı kontrol edilir.

---

## 🔑 Adım 2: Lisans Etkinleştirme

Lisansınızı etkinleştirerek yöneticilerin (Admin) Pro özelliklerinin kilidini (çevrimiçi ödemeler, sınırsız araç, gelişmiş dışa aktarma) açtığı ekrandır.
- **Mevcut Durum:** Bu sitede aktif olan Pro lisans durumu, "LİSANS ANAHTARI", "PLAN" ve "SON KULLANMA TARİHİ" sütunlarıyla özetlenir.
- **Geliştirici Modu (Developer Mode):** Eklenti, bir yerel sunucu (localhost vb.) veya hazırlık (staging) ortamı algılarsa, lisans olmadan eklentiyi test edebilmeniz için "Geliştirici modu algılandı" bildirimi verir. Ancak canlı yayına geçmeden lisans etkinleştirmesi zorunludur.
- Anahtarı devredışı bırakmak isterseniz "Lisans Sayfasını Aç" butonu ana lisans yöneticisine yönlendirir.

---

## 📄 Adım 3: Gerekli Sayfalar

Rentiva; rezervasyon, onay ve müşteri hesabı ekranları için WordPress tarafında özel sayfalar kullanır (Kısa Kod/Shortcode Altyapısı). Bu sayfaları tekil oluşturabilir veya tabloda listelenmiş hâliyle **Eksik Sayfaları Oluştur** butonu ile tek seferde hazırlayabilirsiniz. Sihirbazda otomatik ayarlanan sayfalar ve kısa kodları (önerilen URL'leri ile) şunlardır:

1. **Rezervasyon Formu** (`[rentiva_booking_form]`) -> `/rentiva/booking-form/`
2. **Birleşik Arama** (`[rentiva_unified_search]`) -> `/rentiva/search/`
3. **Arama Sonuçları** (`[rentiva_search_results]`) -> `/rentiva/search-results/`
4. **Araç Detayları** (`[rentiva_vehicle_details]`) -> `/rentiva/vehicle/`
5. **Araç Listesi** (`[rentiva_vehicles_list]`) -> `/rentiva/vehicles/`
6. **İletişim Formu** (`[rentiva_contact]`) -> `/rentiva/contact/`

:::info Opsiyonel Sayfalar
**Araçlar Tablosu** (`[rentiva_vehicles_grid]`) ve **Araç Karşılaştırması** (`[rentiva_vehicle_comparison]`) sayfaları opsiyoneldir ve sihirbaz tarafından zorunlu tutulmaz. Bu sayfaları ihtiyacınıza göre manuel olarak oluşturabilirsiniz.
:::

Tüm sayfaların karşısında anlık mevcut "Durum" bilgisi bulunur ve "Düzenle" linki ile ilgili sayfaya yönlendirir.

---

## 📧 Adım 4: E-posta Ayarları ve Bildirimler

Gönderen bilgilerini yapılandırdığınız ve rezervasyonlar için otomatik e-posta bildirimlerini aktifleştirdiğiniz ekrandır.
*Sistem Ön Uyarısı: Varsayılan WordPress (PHP) posta sisteminin güvenilir olmadığı, WP Mail SMTP veya Fluent SMTP gibi eklentilerin kurulması gerektiği uyarısını baştan yapar.*

**Yapılandırma Alanları:**
- **Gönderen adı & E-postası:** Müşteriye giden maildeki unvan ve yanıt e-postası (Örn: `1` vs `admin@localhost.com` gibi ayarlanabilir).
- **Cevap Adresi (Reply-to):** Müşteri e-postaya "Yanıtla" dediğinde kime gideceğini belirler.
- **Test Modu & Adresi:** Sistem e-postalarını yayından önce, sadece belirlediğiniz **Test E-posta Adresi**ne gitmek üzere izole eder.

**Otomasyon Seçenekleri:**
- E-posta gönderme yetkisi
- Otomatik e-posta gönderme (Rezervasyon durumu değiştiğinde vb.)
- **E-posta Günlüğü:** Gönderi türünde (Post Type) e-postaları veritabanına log/kayıt olarak tutma seçeneği.

---

## 🖥️ Adım 5: Ön Uç ve Ekran

Rezervasyon formlarında ve araç kartlarında müşteri (Frontend) tarafında yansıyacak temel finansal ve süre ayarlarıdır:

- **Para Birimi ve Pozisyonu:** *MHM Rentiva, WooCommerce ile entegredir.* Bu sihirbaz adımında direkt olarak "WooCommerce tarafından yönetilmektedir: (Örn: Turkish Lira - Sağ Alan 100₺)" şeklinde senkronizasyon bilgisini gösterir. Değişim istenirse uyarıdaki link üzerinden WooCommerce Ayarlarına gidilebilir.
- **Varsayılan Kiralama Günleri:** Kullanıcı tarihsiz arama yaptığında formlarda varsayılan kaç günlük kira süresi dolacağı (Örn: 1).
- **Minimum Kiralama Süresi:** Sistemin kabul edeceği en alt gün limiti (Örn: 1).
- **Maksimum Kiralama Gün Sayısı:** Daha uzun süreli kiralamaları önleyen limit (Örn: 30).
- ~~**Araç Kartları Sviçleri:**~~ v4.22.1 ile kaldırıldı. Daha once burada bulunan "Özellik rozetlerini goster" ve "Musaitlik rözetini goster" ayarlari kodda kullanilmadigi için cikarilmistir. Bu kontroller artik dogrudan kisa kod parametreleri (`show_features`, `show_badges` vb.) üzerinden yonetilir.

---

### Bölüm Özeti
- Kurulum Sihirbazı (Setup Wizard); PHP sistem gereksinimlerinden başlayıp, WooCommerce altyapısını senkronize ederek sorunsuz bir temel hazırlar. 
- Sihirbaz tamamlandığında gerekli sayfalar, kısa kodları ve mail otomasyonu hazır hale gelir. İlerleyen günlerde herhangi bir altyapısal değişikliği bu ekranlardan "Mevcut değer / Tavsiye edilen" şeklinde analiz edebilirsiniz.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 27.03.2026 | 4.22.1 | Zorunlu sayfa listesi güncellendi: `rentiva_vehicle_details` eklendi, `rentiva_vehicles_grid` ve `rentiva_vehicle_comparison` kaldırıldı (opsiyonel). 7 -> 6 sayfa. |
| 19.03.2026 | 4.21.2 | Kullanim kilavuzu oluşturuldu. |

