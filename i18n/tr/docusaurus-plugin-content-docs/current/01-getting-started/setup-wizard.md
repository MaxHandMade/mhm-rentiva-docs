---
id: setup-wizard
title: Kurulum Sihirbazı
sidebar_label: Kurulum Sihirbazı
sidebar_position: 3
slug: /getting-started/setup-wizard
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

MHM Rentiva'yı ilk kez etkinleştirdiğinizde, sizi temel yapılandırma adımlarında yönlendiren interaktif bir **Kurulum Sihirbazı** karşılar. Bu sihirbaz, eklentinin sitenizle kusursuz uyum sağlaması için kritik ayarları dakikalar içinde yapmanıza olanak tanır.

---
### 🖼️ GÖRSEL: KURULUM SİHİRBAZI KARŞILAMA EKRANI
*(6 adımı gösteren geniş bir ekran görüntüsü)*

---

## Sihirbaz Adımları

Kurulum sihirbazı toplam 6 ana adımdan oluşur:

### 1. Sistem Kontrolü
Sihirbazın ilk adımı, sunucunuzun MHM Rentiva için hazır olup olmadığını denetler.
- **PHP sürümü**, **WordPress sürümü** ve **WooCommerce durumu** kontrol edilir.
- Bir gereksinim karşılanmıyorsa, devam etmeden önce uyarı alırsınız.

### 2. Lisans Aktivasyonu
Eklentinin Pro özelliklerini (Online ödemeler, gelişmiş raporlar vb.) kullanabilmeniz için lisans anahtarınızı bu alana girmeniz önerilir.
- Lisansınız yoksa bu adımı geçebilir, daha sonra admin panelinden etkinleştirebilirsiniz.

### 3. Gerekli Sayfaların Oluşturulması
Eklenti, araç listeleme, rezervasyon detayı, ödeme ve müşteri paneli gibi işlevler için özel sayfalara ihtiyaç duyar.
- **Tek tıkla** tüm zorunlu sayfaları kısa kodları (shortcodes) ile birlikte otomatik oluşturabilirsiniz. Toplam **6 zorunlu sayfa** kontrol edilir: Rezervasyon Formu, Birlesik Arama, Arama Sonuçları, Araç Detaylari, Araç Listesi ve Iletisim Formu.
- Eğer bu sayfalar zaten varsa, sihirbaz bunları algılar ve "Mevcut" olarak işaretler.
- **Not:** Araçlar Tablosu (`rentiva_vehicles_grid`) ve Araç Karşılaştırması (`rentiva_vehicle_comparison`) sayfaları opsiyoneldir ve sihirbaz tarafından zorunlu tutulmaz.

### 4. E-posta ve Bildirimler
Rezervasyon onayları ve müşteri bilgilendirmeleri için gönderici bilgilerini ayarlarsınız.
- **Gönderici Adı** ve **E-posta Adresi** belirlenir.
- **SMTP Notu:** Sitenizin e-posta gönderiminde sorun yaşamaması için harici bir SMTP eklentisi kullanmanız şiddetle tavsiye edilir.

### 5. Frontend ve Görünüm
Sitenizdeki araç kartları ve arama formları için varsayılan değerleri belirlersiniz.
- **Para Birimi:** WooCommerce yüklü ise sistem otomatik olarak WooCommerce ayarlarını kullanır.
- **Kiralama Süreleri:** Minimum ve maksimum kiralama gün sayılarını set edersiniz.

### 6. Özet ve Tamamlama
Tüm adımların durumunu gösteren son bir kontrol listesi sunulur.
- Eksik bir adım varsa geri dönebilir veya doğrudan **Dashboard**'a geçiş yapabilirsiniz.

---

## Sihirbazı Yeniden Başlatmak

Sihirbazı tamamladıktan sonra ayarlarda bir hata yaptığınızı düşünüyorsanız veya sayfaları silip tekrar oluşturmak istiyorsanız:

1. WordPress panelinden **MHM Rentiva > Setup Wizard** menüsüne gidin.
2. Adımları baştan takip ederek yapılandırmayı güncelleyin.

:::important Veri Kaybı Uyarısı
Sihirbazı tekrar çalıştırmak mevcut verilerinizi (araçlar, rezervasyonlar) **silmez**, sadece genel ayarları ve sayfa eşleşmelerini günceller.
:::

---

## Teknik Not: Otomatik Yönlendirme (Geliştiriciler İçin)

Eklenti ilk yüklendiğinde `mhm_rentiva_setup_redirect` opsiyonunu `1` olarak set eder. `admin_init` hook'u bu opsiyonu kontrol ederek kullanıcıyı sihirbaza yönlendirir ve işlem bitince bu opsiyonu siler.

Programatik olarak sihirbaz durumunu kontrol etmek için:
```php
$is_completed = get_option('mhm_rentiva_setup_completed'); // '1' ise tamamlanmıştır
```

---

### Bölüm Özeti
- Kurulum Sihirbazı **6 adımdan** oluşur.
- **Otomatik sayfa oluşturma** özelliği kurulumu hızlandırır.
- Ayarlar bittikten sonra sihirbaz kapatılabilir.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 27.03.2026 | 4.22.1 | Zorunlu sayfa listesi güncellendi: `rentiva_vehicle_details` eklendi, `rentiva_vehicles_grid` ve `rentiva_vehicle_comparison` kaldırıldı (opsiyonel). 7 -> 6 sayfa. |
| 18.03.2026 | 4.21.2 | İçerik hibrit modele (kullanıcı + teknik) göre güncellendi. |
| 26.02.2026 | 4.21.0 | İlk sürüm oluşturuldu. |

