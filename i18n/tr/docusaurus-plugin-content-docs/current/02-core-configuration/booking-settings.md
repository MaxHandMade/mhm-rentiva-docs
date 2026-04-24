---
id: booking-settings
title: Rezervasyon Yönetimi (Ayarlar)
sidebar_label: Rezervasyon Yönetimi
sidebar_position: 3
slug: /core-configuration/booking-settings
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

Rezervasyon Yönetimi sekmesi, kiralama sürecinin zamanlama kurallarını, otomatik iptal mekanizmalarını ve e-posta bildirim tercihlerini yapılandırdığınız alandır. **MHM Rentiva > Ayarlar > Rezervasyon Yönetimi** altından ulaşılır.

---

## 📋 Temel Rezervasyon Ayarları

- **Varsayılan Kiralama Günleri:** Rezervasyon formunda (frontend) tarih seçilmeden önce varsayılan olarak seçili gelecek kiralama süresidir (Örn: 1 Gün).

---

## ⏳ Zaman Yönetimi Ayarları

Rezervasyonların yaşam döngüsü ve operasyonel hazırlık süreleri buradan yönetilir.

- **İptal Son Tarihi (Saat):** Rezervasyon başlamadan ne kadar süre öncesine kadar müşterinin iptal hakkı olduğunu belirler (Örn: 24 Saat).
- **Ödeme Son Tarihi (Dakika):** Rezervasyon oluşturulduktan sonra ödemenin tamamlanması için tanınan süredir. `0` girilirse süre sınırı devre dışı kalır.
- **Otomatik İptal'i Etkinleştir:** Ödeme süresi dolan rezervasyonların sistem tarafından otomatik olarak "İptal Edildi" statüsüne alınmasını sağlar.
- **Tampon Süresi (Dakika):** İki rezervasyon arasına eklenen "hazırlık ve temizlik" payıdır. Bu süre içinde araç takvimde meşgul görünür.

---

### 🖼️ GÖRSEL: REZERVASYON ZAMAN YÖNETİMİ
*(Ayarlar > Rezervasyon Yönetimi sekmesi, iptal ve ödeme süreleri alanı)*

---

## 🔔 Bildirim Ayarları

Süreçteki kritik adımlarda gönderilecek otomatik e-posta bildirimlerini kontrol eder.

- **Onay E-postaları Gönder:** Rezervasyon onaylandığında müşteriye otomatik bilgi gider.
- **Hatırlatma E-postaları Gönder:** Rezervasyon başlangıç saatinden önce müşteriye hatırlatma e-postası gönderilir.
- **Yönetici Bildirimleri:** Yeni bir rezervasyon oluşturulduğunda site yöneticisine e-posta bildirimi gider.
- **Otomatik İptal E-postası Gönder:** Ödeme zaman aşımı nedeniyle sistem tarafından iptal edilen kayıtlar için müşteriye bilgilendirme yapılır.

---

## 💡 Teknik Notlar

:::important Cron Bağımlılığı
"Otomatik İptal" ve "Hatırlatma E-postaları" fonksiyonlarının çalışması için WordPress Cron sisteminin aktif olması gereklidir. Bu görevleri **Ayarlar > Cron İş Monitörü** sekmesinden takip edebilirsiniz.
:::

---

### Bölüm Özeti
- **Zaman Yönetimi** ile ödeme ve iptal kurallarını netleştirin.
- **Tampon Süresi (Buffer)** ile operasyonel hazırlığınıza zaman ayırın.
- **Otomatik Bildirimler** ile müşteri ve yönetici arasındaki iletişimi otomatize edin.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 19.03.2026 | 4.21.2 | Rezervasyon Yönetimi dökümanı panel ekran görüntüsü ve kod analizine göre güncellendi. |
