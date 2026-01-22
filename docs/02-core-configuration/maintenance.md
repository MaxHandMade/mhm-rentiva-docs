![Version](https://img.shields.io/badge/version-4.6.2-blue?style=flat-square) ![Security](https://img.shields.io/badge/security-WPCS%20Compliant-green?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-22.01.2026-orange?style=flat-square)

# Bakım ve Sistem Ayarları (Maintenance Settings)

Sistem bakımı, veri temizliği ve kritik kaldırma işlemleri ayarları.

## Sistem Temizliği

Bu bölümdeki ayarlar eklentinin veritabanı üzerindeki etkisini yönetir.

| Ayar Adı | Açıklama | Tip | Varsayılan |
|----------|----------|-----|------------|
| **Kaldırma Sırasında Verileri Temizle** | Eklenti silindiğinde tüm verilerin kalıcı olarak silinmesini sağlar. | Checkbox | Kapalı (0) |

## ⚠️ Tehlikeli İşlemler: Veri Temizleme

"Kaldırma Sırasında Verileri Temizle" (`mhm_rentiva_uninstall_on_delete`) ayarı etkinleştirildiğinde:

1.  Eklentiyi WordPress yönetim panelinden sildiğinizde (**Eklentiler > Yüklü Eklentiler > Sil**), MHM Rentiva'ya ait tüm veriler silinir.
2.  **Neler Silinir?**
    - Tüm araç verileri ve galeriler.
    - Tüm rezervasyon geçmişi ve ödeme kayıtları.
    - Müşteri verileri ve mesajlar.
    - Tüm özel veritabanı tabloları (`wp_mhm_rentiva_*`).
    - Yapılan tüm ayarlar.

> **Bu işlem geri alınamaz!** Bu seçeneği etkinleştirmeden önce tüm verilerinizin yedeğini aldığınızdan emin olun. Geliştirme ortamları veya tam temizlik istenen durumlar dışında kapalı tutulması önerilir.

## 🧹 Veritabanı Bakımı (Database Maintenance)

Eklenti, veritabanınızı sağlıklı ve hızlı tutmak için yerleşik bir **Veritabanı Temizleyici (Database Cleaner)** aracı içerir. Bu araç, artık kullanılmayan "orphaned" (yetim) verileri tespit eder ve temizler.

### Güvenli Temizlik (Safe Cleanup)
Versiyon **4.6.1** itibariyle, temizlik aracı aşağıdaki verileri otomatik olarak koruma altına alır:

- **Sistem Verileri:** Sipariş geçmişi, loglar, iptal politikaları.
- **Rezervasyon Verileri:** `_mhm_` ile başlayan tüm rezervasyon detayları (tarihler, saatler, süreler).
- **Müşteri Verileri:** İletişim bilgileri, IP adresleri.
- **Finansal Veriler:** Fiyatlar, depozito tutarları, vergi hesaplamaları.
- **Entegrasyon Verileri:** WooCommerce sipariş ID'leri ve ödeme ağ geçidi yanıtları.

:::tip Güvenlik Notu
`DatabaseCleaner` sınıfı, 40'tan fazla kritik meta anahtarını (`get_valid_meta_keys`) tanımlı bir "beyaz liste" (whitelist) içinde tutar. Temizlik işlemi sırasında bu listedeki hiçbir veri **asla silinmez**.
:::
