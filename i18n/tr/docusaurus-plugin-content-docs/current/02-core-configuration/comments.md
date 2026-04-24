---
id: comments
title: Yorumlar ve Puanlama (Ayarlar)
sidebar_label: Yorumlar
sidebar_position: 7
slug: /core-configuration/comments
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Yorumlar sekmesi, araç kiralama deneyimi sonrası müşterilerin yapacağı geri bildirimlerin, puanlamaların ve spam korumasının yönetildiği merkezdir. **MHM Rentiva > Ayarlar > Yorumlar** altından ulaşılır.

---

## ⚙️ Genel Yapılandırma

Yorum sisteminin temel çalışma kuralları buradan belirlenir:

- **Yorumları Otomatik Olarak Onayla:** İşaretlendiğinde yorumlar admin onayına düşmeden anında yayınlanır.
- **Giriş Gerekli:** Sadece üye girişi yapmış kullanıcıların yorum yapabilmesini sağlar.
- **Misafir Yorumlarına İzin Ver:** Üye olmayan kullanıcıların da isim/e-posta ile yorum yapabilmesine olanak tanır.

---

## 🎨 Görüntü Ayarları

Frontend (kullanıcı tarafı) görünüm tercihleridir:

- **Sayfa Başına Yorumlar:** Bir sayfada kaç adet yorum listeleneceği (Örn: 10).
- **Puanları Göster:** Yıldızlı puanlama sistemini aktif/pasif yapar.
- **Avatarları Göster:** Kullanıcıların profil resimlerini (Gravatar) görüntüler.
- **Düzenleme ve Silme:** Kullanıcıların kendi yorumlarını belirli bir süre (Dakika) içinde düzeltmesine veya silmesine izin verir.

---

## 🛡️ Spam ve Güvenlik

Sistemi kötü niyetli içeriklerden ve botlardan korur:

- **Spam Koruması:** Akıllı filtreleme sistemini aktif eder.
- **Hız Sınırlamayı Etkinleştir (Rate Limiting):** Bir kullanıcının kısa sürede çok fazla yorum yapmasını engeller (Örn: 1 dakikada 1 yorum sınırı).
- **İstenmeyen Sözcükler:** Yorumlarda geçmesi durumunda içeriği otomatik engeleyen kara liste (Blacklist). Virgülle ayırarak eklenir (Örn: spam, casino, viagra).

---

### 🖼️ GÖRSEL: YORUM AYARLARI PANELİ
*(Ayarlar > Yorumlar sekmesi, akordiyon yapısındaki ayar grupları)*

---

## ⚡ Önbellek ve Performans

Yüksek trafikli sitelerde veritabanı yükünü azaltmak için kullanılır:

- **Yorum Önbelleğini Etkinleştir:** Yorum listelerini geçici hafızaya alır.
- **Önbellek Süresi (Dakika):** Listelerin ne kadar süre güncel kalacağı (Örn: 5 dk).

---

### Bölüm Özeti
- **Onay Süreci** ile içerik kalitesini denetleyin.
- **Spam Filtreleri** ile temiz bir geri bildirim alanı oluşturun.
- **Puanlama Sistemi** ile diğer müşterilere sosyal kanıt sunun.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 19.03.2026 | 4.21.2 | Yorumlar (Ayarlar) dökümanı panel ekran görüntüsü ve kod analizine göre oluşturuldu. |
