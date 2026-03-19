---
id: maintenance
title: Bakım ve Veri Tabanı Temizliği
sidebar_label: Veri tabanı temizleme
sidebar_position: 14
slug: /core-configuration/maintenance
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

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

### Bölüm Özeti
- Veritabanı şişmesini önlemek için **periyodik temizlik** yapılmalıdır.
- **Yedekleme (Snapshot)** sistemi ile her işlem öncesi güvenlik sağlanır.
- Loglar 30 günden sonra otomatik temizlenmek üzere yapılandırılabilir.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 19.03.2026 | 4.21.2 | Veritabanı temizleme ve yedekleme detayları eklendi. |
