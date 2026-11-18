---
id: setup-wizard
title: Kurulum Sihirbazı
sidebar_label: Kurulum Sihirbazı
sidebar_position: 3
slug: /getting-started/setup-wizard
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

MHM Rentiva'yı ilk kez etkinleştirdiğinizde, etkileşimli bir **Kurulum Sihirbazı** sizi temel yapılandırma adımlarında yönlendirir. Sihirbaz, eklentinin sitenizle sorunsuz çalışması için gereken kritik ayarları birkaç dakika içinde tamamlamanızı sağlar. Her adım numaralı bir karttır; adımlar ekranın üstünde sıralanır.

---
### 🖼️ IMAGE: SETUP WIZARD WELCOME SCREEN
*(Numaralı adımları ve Sistem kontrolü kartını gösteren geniş bir ekran görüntüsü)*

---

## Sihirbaz Adımları

Kurulum Sihirbazı 5 adımdan oluşur:

### 1. Sistem kontrolü
İlk adım, sunucunuzun MHM Rentiva'yı çalıştırmaya hazır olup olmadığını denetler.
- WooCommerce durumu, **PHP sürümü**, **WordPress sürümü**, veritabanı sürümü, PHP bellek sınırı, `max_execution_time`, HTTPS, WP-Cron ve e-posta teslimatı kontrol edilir.
- Gösterilen en düşük PHP ve WordPress sürümleri eklentinin kendi gerektirdiği sürümlerdir. Bir gereksinim karşılanmıyorsa devam etmeden önce uyarı alırsınız.
- **Sihirbazı atla** ile istediğiniz an sihirbazdan çıkabilirsiniz.

### 2. Gerekli sayfalar
Eklenti; araç arama, listeleme, ayrıntı ve rezervasyon gibi özellikler için özel sayfalara ihtiyaç duyar.
- **Tek tıkla** (**Eksik sayfaları oluştur**) gerekli tüm sayfaları kısa kodlarıyla birlikte otomatik oluşturabilirsiniz. Toplam **6 gerekli sayfa** denetlenir: Rezervasyon formu, Araç arama, Arama sonuçları, Araç ayrıntıları, Araç listesi ve İletişim formu.
- Bu sayfalar zaten varsa sihirbaz bunları algılar ve "Mevcut" olarak işaretler.
- **Not:** Araç Izgarası (`rentiva_vehicles_grid`) ve Araç Karşılaştırma (`rentiva_vehicle_comparison`) sayfaları isteğe bağlıdır ve sihirbaz tarafından zorunlu tutulmaz.

### 3. E-posta ayarları
Rezervasyon onayları ve müşteri iletişimi için gönderen bilgilerinizi belirleyin.
- **Gönderen adı**, **Gönderen e-postası** ve **Yanıt adresi** burada yapılandırılır.
- **Test kipi**, siz canlıya geçmeye hazır olana kadar tüm e-postaları yalnızca **Test e-posta adresi**ne gönderir.
- **Otomasyon:** e-posta göndermeyi, otomatik göndermeyi ve e-posta günlüğünü açıp kapatabilirsiniz.
- **SMTP Notu:** Sitenizde e-posta teslim sorunlarını önlemek için harici bir SMTP eklentisi (WP Mail SMTP veya Fluent SMTP) kullanmanız şiddetle önerilir.

### 4. Ön yüz ve görünüm
Rezervasyon formları ve araç kartları için varsayılan değerleri belirleyin.
- **Para birimi ve Para birimi konumu:** WooCommerce kuruluysa bunlar WooCommerce tarafından yönetilir ve yalnızca bilgi olarak gösterilir; WooCommerce ayarlarından değiştirin. Sihirbaz para birimini değiştirmez.
- **Varsayılan, minimum ve maksimum kiralama gün sayısı:** Formlarda kullanılan kiralama süreleri ve sınırlar.
- **Ana renk:** **Ayarlar > Ön yüz ve görünüm > Renkler** ile aynı ayardır (Otomatik veya Özel).

### 5. Özet ve testler
Her adımın durumunu gösteren son bir kontrol listesi sunulur.
- WordPress kalıcı bağlantılarınız "Düz" ise, ön yüz sayfaları bunu gerektirdiği için "Yazı adı" gibi bir yapıya geçmenizi isteyen bir uyarı çıkar.
- Son kontrol için **Ayarları aç**, **Kısa kod sayfalarını incele** veya **Test e-postası gönder** düğmelerini kullanın, ardından **Kurulumu tamamla** (ya da **Başlangıç ekranına git**) deyin.

:::info Lisans
Sihirbazda lisans adımı yoktur. Rentiva Pro kullanıyorsanız anahtarınızı **Lisans** sayfasından etkinleştirin.
:::

---

## Sihirbazı Yeniden Başlatma

Sihirbazı tamamladıktan sonra ayarlarda hata yaptığınızı düşünüyorsanız ya da eksik sayfaları yeniden oluşturmak istiyorsanız:

1. WordPress yönetim panelinde **MHM Rentiva > Kurulum sihirbazı** sayfasına gidin.
2. Yapılandırmayı güncellemek için adımları baştan izleyin.

:::important Veri Kaybı Uyarısı
Sihirbazı tekrar çalıştırmak mevcut verilerinizi (araçlar, rezervasyonlar) **silmez**, sadece genel ayarları ve sayfa eşleşmelerini günceller.
:::

---

## Teknik Not: Otomatik Yönlendirme (Geliştiriciler İçin)

Eklenti ilk yüklendiğinde `mhmrentiva_setup_redirect` opsiyonunu `1` olarak set eder. `admin_init` hook'u bu opsiyonu kontrol ederek kullanıcıyı sihirbaza yönlendirir ve opsiyonu siler. Birden fazla eklenti birlikte etkinleştirildiğinde yönlendirme yapılmaz.

Programatik olarak sihirbaz durumunu kontrol etmek için:
```php
$is_completed = get_option('mhmrentiva_setup_completed'); // '1' ise tamamlanmıştır
```

---

### Bölüm Özeti
- Kurulum Sihirbazı **5 adımdan** oluşur.
- **Otomatik sayfa oluşturma** özelliği kurulumu hızlandırır.
- Ayarlar bittikten sonra sihirbaz kapatılabilir.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 18.11.2026 | 6.4.0 | Numaralı adımlarla yeni görünüm; Ön yüz ve görünüm adımına ana renk eklendi; araç kartı kutuları kaldırıldı; adımlar eklentideki haliyle listelendi (lisans adımı yok). |
| 27.03.2026 | 4.22.1 | Zorunlu sayfa listesi güncellendi: `rentiva_vehicle_details` eklendi, `rentiva_vehicles_grid` ve `rentiva_vehicle_comparison` kaldırıldı (opsiyonel). 7 -> 6 sayfa. |
| 18.03.2026 | 4.21.2 | İçerik hibrit modele (kullanıcı + teknik) göre güncellendi. |
| 26.02.2026 | 4.21.0 | İlk sürüm oluşturuldu. |
