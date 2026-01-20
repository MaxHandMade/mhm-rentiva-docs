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

> [!CAUTION]
> **Bu işlem geri alınamaz!** Bu seçeneği etkinleştirmeden önce tüm verilerinizin yedeğini aldığınızdan emin olun. Geliştirme ortamları veya tam temizlik istenen durumlar dışında kapalı tutulması önerilir.
