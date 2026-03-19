---
id: license-management
title: Lisans Yönetimi
sidebar_label: Lisans Yönetimi
sidebar_position: 8
slug: /core-configuration/license
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

MHM Rentiva, tüm özelliklerin (VIP Transfer, Mesajlaşma, Gelişmiş Raporlar vb.) tam performansta çalışabilmesi için geçerli bir lisans anahtarı gerektirir. **MHM Rentiva > Lisans** menüsü üzerinden anahtarınızı yönetebilirsiniz.

---

## 💻 Geliştirici Modu (Developer Mode)

Rentiva, yerel (localhost) veya staging ortamlarında çalıştığını otomatik algılayarak sayfanın sağ üstünde **"Geliştirici Modu Etkin"** uyarısı verir. Bu moddayken gerçek bir lisans anahtarı girmeden de tüm Pro özellikler (Vendor & Payout dahil) kullanılabilir.

*   **Zorunlu Doğrulama Seçeneği:** Canlı yayına geçmeden önce veya geliştirme sırasındayken lisans sisteminin gerçekten bağlandığını test etmek isterseniz, ekrandaki **"Otomatik geliştirici modunu devre dışı bırak (gerçek lisans doğrulamasını zorla)"** kutucuğunu işaretleyerek sistemi normal akışına döndürebilirsiniz.

---

## 🟢 Lisans Durumu ve Etkinleştirme

Sayfanın yönetim paneli üç ana bloğa bölünmüştür:

1. **Lisans Durumu:**
   Mevcut lisansın geçerliliğini gösterir. Lisans geçerli olduğunda yeşil renkli tik ile **"Pro Lisans Etkin"** yazar ve altında kilidi açılan özelliklerin bir özeti bulunur: *(All Pro features active: Unlimited vehicles/bookings, export, advanced reports, Vendor & Payout)*.

2. **Lisans Etkinleştirme:**
   Satın aldığınız lisans anahtarını `XXXX-XXXX-XXXX-XXXX` formatındaki kutuya yapıştırıp **"Lisansı Etkinleştir"** butonuna basmanız yeterlidir. API anında doğrulama yapar.

3. **Lisans Yönetimi (Serbest Bırakma):**
   Eklentiyi başka bir web sitesine (domaine) taşımak isterseniz veya gerçek bir lisansı test/iptal etmek isterseniz, alttaki **"Lisansı Devre Dışı Bırak"** düğmesini kullanmalısınız. Aksi takdirde yeni domainde aktivasyon hatası (Too many activations) alabilirsiniz.

---

## 💎 Lite ve Pro Karşılaştırması

Sayfanın en altında bulunan şeffaflık tablosu, lisansın kapalı (Lite) olduğu durumdaki kısıtlamalar ile lisanslı (Pro) durumun genişliğini kıyaslamanızı sağlar:

| Özellik | Lite (Sınır) | Pro (Limitsiz) |
| :--- | :--- | :--- |
| **Maksimum Araç Sayısı** | 3 Araç | Sınırsız |
| **Rezervasyon Kapasitesi** | 50 Rezervasyon | Sınırsız |
| **Müşteri Veritabanı** | 3 Müşteri | Sınırsız |
| **Ek Hizmetler (Eklentiler)** | 4 Ek hizmet | Sınırsız |
| **VIP Transfer Güzergahları**| 3 Güzergah | Sınırsız |
| **Galeri Resimleri** | 3 Araç/Görseli | Sınırsız |
| **Gelişmiş Raporlar** | 30 Gün (Maks 500 satır) | Sınırsız Tarih & Satır |
| **Dışa Aktarım Biçimleri** | Sadece CSV | CSV, JSON |
| **Mesajlaşma & Vendor Sistemi**| Mevcut değil | Mevcut |
| **REST API Erişimi** | Sınırlı | Tam REST API |

---

### Bölüm Özeti
- Lisansınız **MHM Rentiva > Lisans** menüsünden tek tuşla aktifleştirilir veya iptal edilir.
- Geliştirici ortamları sistem tarafından tespit edilir ve kolaylık sağlamak için "Geliştirici Modu" ile Pro özelliklerin denenebilmesine olanak tanır.
- Domain taşıma öncesi eski lisans mutlaka **Devre Dışı Bırak** butonuyla serbest bırakılmalıdır.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 19.03.2026 | 4.21.2 | Lisans yönetimi rehberi görseller ve teknik notlarla modernize edildi. |
| 26.02.2026 | 4.21.0 | İlk sürüm oluşturuldu. |
