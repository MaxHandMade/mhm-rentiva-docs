---
id: maintenance
title: Bakım ve Veri Tabanı Temizliği
sidebar_label: Veri tabanı temizleme
sidebar_position: 14
slug: /core-configuration/maintenance
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Sistemin uzun vadeli performansı için gereksiz verilerin periyodik olarak temizlenmesi ve veritabanı tablolarının optimize edilmesi kritik önem taşır. Bu işlemler **MHM Rentiva > Ayarlar > Veri tabanı temizleme** sekmesinden yönetilir.

---

## 🧹 Veritabanı Temizleme Araçları

Panel üzerinde tek tıkla çalıştırabileceğiniz 6 ana bakım aracı bulunmaktadır:

1.  **Bütünlüğü Analiz Et:** Veritabanındaki tutarsızlıkları ve eksik tabloları tarar.
2.  **Temiz Yetim Meta:** Silinmiş araçlara veya rezervasyonlara ait sahipsiz (orphan) meta verilerini temizler.
3.  **Sistem Önbelleğini Temizle:** Geçici süreli (transient) sistem verilerini sıfırlar.
4.  **Otomatik Yüklemeyi Optimize Et:** WordPress'in her açılışta yüklediği `autoload` seçeneklerini düzenleyerek hızı artırır.
5.  **Tabloları Optimize Et:** MySQL tablolarındaki boş alanları (overhead) geri kazanır ve dizinleri (index) yeniler.
6.  **Eski Günlükleri Temizle:** 30 günden eski işlem kayıtlarını ve logları kalıcı olarak siler.

---

### 🖼️ GÖRSEL: VERİ TABANI TEMİZLEME PANELİ
*(Ayarlar > Veri tabanı temizleme sekmesi ve temizleme raporu tablosu)*

---

## 💾 Sistem Anlık Görüntüsü (Backup)

Sistemde kritik bir işlem yapmadan önce tüm kiralama verilerinizin (Araçlar, Tanımlar, Rezervasyonlar) tam bir yedeğini alabilirsiniz.

- **Güvenli Depolama:** Alınan yedekler, web erişimine kapalı, korumalı bir dizinde saklanır.
- **Geri Yükleme (Rollback):** Bir hata almanız durumunda "Artımlı Temizleme Yedeklemeleri" listesinden tek tıkla eski haline dönebilirsiniz.

:::caution Kritik Uyarı
Temizleme işlemleri geri alınamaz. İşlem yapmadan önce mutlaka **"Anlık Görüntüyü Başlat"** butonuyla sisteminizin bir kopyasını oluşturun.
:::

---

## 📊 Veritabanı Temizleme Raporu

İşlem sonrası sistem size hangi kategoride ne kadar verinin (Sayı ve Boyut bazlı) temizlendiğine dair detaylı bir rapor sunar.

### Özel Tablo Takibi
`payment_log`, `transfer_routes`, `message_logs` gibi eklentiye özel tabloların satır sayısı ve diskteki boyutunu bu ekrandan canlı olarak takip edebilirsiniz.

---

## Kaldırma (Uninstall) ve Tablo Temizliği

Eklenti tamamen kaldırıldığında (silindiğinde), kaldırıcı önce kendi içeriğini siler, sonra kendi tablolarını düşürür.

**Sildiği içerik.** Araçlar, rezervasyonlar, ek hizmetler, iletişim mesajları ve iki günlük tipi tablo değil **WordPress içeriğidir** ve içerik olarak silinir: `mhmrentiva_vehicle`, `mhmrentiva_booking`, `mhmrentiva_addon`, `mhmrentiva_contact`, `mhmrentiva_app_log`, `mhmrentiva_email_log`. 6.0.0 öncesi `vehicle` ve `vehicle_booking` içerik tiplerini hâlâ taşıyan kayıtlar da bunlarla birlikte silinir.

**Düşürdüğü tablolar.**

- Kuyruk ve raporlar: `mhmrentiva_queue`, `mhmrentiva_report_queue`, `mhmrentiva_notification_queue`
- Değerlendirmeler: `mhmrentiva_ratings`
- Ödeme kayıtları: `mhmrentiva_payment_log`
- Oturumlar: `mhmrentiva_sessions`
- Mesaj günlükleri: `mhmrentiva_message_logs`
- Çok siteli kurulum defteri: `mhmrentiva_tenants`, `mhmrentiva_usage_metrics`
- Kurtarma kopyaları: `mhmrentiva_backup_records`
- Transfer lokasyonları: `rentiva_transfer_locations` (+ eski `mhm_rentiva_transfer_locations`)
- Transfer rotaları: `rentiva_transfer_routes` (+ eski `mhm_rentiva_transfer_routes`)

Bu adların 6.0.0 öncesi yazımları da düşürülür; eklentinin kendi `mhmrentiva_` tablo öneki altında geriye kalan başka bir şey varsa o da ardından süpürülür.

:::info Add-on'un altı tablosu düşürülmez
Komisyon defteri, komisyon politikası, bayi raporları, arka plan işleri, ödeme denetim izi ve anahtar kaydı ücretli eklentiye aittir; Lite kaldırılınca bunlara dokunulmaz. İçlerinde yalnız-ekleme yapılan finansal geçmiş var ve Lite'ı kaldıran bir site onu yeniden kurmak üzere olabilir. Her eklenti kendi verisini kaldırır; bunları silmek için add-on'u kaldırın.
:::

:::caution
Kaldırma işlemi geri alınamaz. Araç, rezervasyon ve transfer verileri kalıcı olarak silinir.

**Müşteri hesapları kalır.** Müşteriler WordPress kullanıcısıdır; kaldırıcı kullanıcıları ve profil verilerini silmez — yalnızca onlara atıf yapan rezervasyonları siler.
:::

---

## Önbellek Yönetimi

Sistem onbelleği **Bakim** sekmesi altındaki **Önbellek** akordiyonundan yonetilir. Bu bölüm `MaintenanceSettings::render_group_cache()` tarafından render edilir ve tek bir yerden kontrol sağlar (v4.22.1 ile cift render sorunu giderilmistir).

---

### Bölüm Özeti
- Veritabanı şişmesini önlemek için **periyodik temizlik** yapılmalıdır.
- **Yedekleme (Snapshot)** sistemi ile her işlem öncesi güvenlik sağlanır.
- Loglar 30 günden sonra otomatik temizlenmek üzere yapılandırılabilir.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 27.03.2026 | 4.22.1 | Uninstaller'a 5 eksik tablo eklendi. Önbellek bölümü tek render noktasi olarak belgelendi. |
| 19.03.2026 | 4.21.2 | Veritabanı temizleme ve yedekleme detayları eklendi. |
