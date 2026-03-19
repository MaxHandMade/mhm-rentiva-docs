---
id: notification-templates
title: Bildirim Şablonları
sidebar_label: Bildirim Şablonları
sidebar_position: 9
slug: /core-configuration/notification-templates
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

Bildirim Şablonları sekmesi, müşterilere ve yöneticilere giden tüm e-posta içeriklerini (HTML) özelleştirebileceğiniz, test edebileceğiniz ve "Altın Standart" (Gold Standard) tasarımına geri dönebileceğiniz merkezdir. **MHM Rentiva > Ayarlar > Bildirim Şablonları** altından ulaşılır.

---

## 🛠️ Yönetim Araçları

Sayfanın sağ üst kısmında iki kritik buton bulunur:
- **E-Posta Ayarları:** Gönderen ismi ve renk gibi global ayarlara hızlı geçiş sağlar.
- **Altın Standardını Geri Getir:** Şablonlarda yapılan hataları düzeltmek veya orijinal profesyonel tasarıma dönmek için kullanılır.

---

## 📂 Şablon Kategorileri

Bildirimler dört ana sekme altında gruplanmıştır:

### 1. Rezervasyon Bildirimleri
Müşteri kiralama süreciyle ilgili temel mesajlar:
- **Yeni Rezervasyon (Müşteri):** Rezervasyon oluşturulduğu an gider.
- **Durum Değişikliği:** Onaylandı, Beklemede gibi statü güncellemeleri.
- **Yönetici Bildirimi:** Yeni sipariş geldiğinde size gelen uyarı.
- **İptal Mesajları:** Manuel veya ödeme zaman aşımı (Otomatik) iptal durumları.
- **Hatırlatma ve Karşılama:** Teslimat öncesi hatırlatma ve kayıt sonrası "Hoş Geldiniz" mesajları.

### 2. Geri Ödeme E-postaları
İade süreçlerine özel şablonlar:
- **Müşteri İade Bilgisi:** İade edilen tutar ve rezervasyon numarası detayları.
- **Yönetici İade Uyarısı:** Muhasebe ve operasyon takibi için yöneticiye giden bilgi.

### 3. Mesaj Bildirimleri
Mesajlaşma sistemi (Pro özelliği) uyarıları:
- **Yeni Mesaj:** Müşteriden gelen sorular için yönetici bildirimi.
- **Mesaj Cevabı:** Sizin yanıtınız müşteriye ulaştığında giden e-posta.
- **Otomatik Yanıt:** Mesaj alındığında müşteriye giden teyit mesajı.

---

## 🔍 E-Posta Önizleme ve Test

Şablonların canlı halini kontrol etmek için bu sekmeyi kullanın:
- **Canlı Önizleme:** Sağ tarafta, e-postanın müşterinin gelen kutusunda nasıl görüneceğini anlık (Responsive) olarak gösterir.
- **Test Gönderimi:** Belirli bir şablonu seçip istediğiniz bir adrese "Test Maili yolla" diyerek gönderimi doğrulayabilirsiniz.

---

## 🏷️ Kullanılabilir Dinamik Etiketler (Placeholders)

Şablon içeriklerine `{}` parantezleri içinde aşağıdaki kodları ekleyerek verilerin otomatik gelmesini sağlayabilirsiniz:
- `{booking_id}`: Rezervasyon NO.
- `{vehicle_title}`: Araç adı.
- `{pickup_date}` / `{dropoff_date}`: Tarih bilgileri.
- `{total_price}`: Toplam tutar.
- `{contact_name}`: Müşteri adı.
- `{site_name}`: Sitenizin adı.

---

### 🖼️ GÖRSEL: BİLDİRİM ŞABLONLARI PANELİ
*(Ayarlar > Bildirim Şablonları sekmesi, şablon listesi ve önizleme aracı)*

---

### Bölüm Özeti
- **Gold Standard** ile profesyonel bir e-posta tasarımıyla başlayın.
- **Dinamik Etiketler** ile mesajları kişiselleştirin.
- **Önizleme Aracı** ile hataları yayına girmeden önce düzeltin.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 19.03.2026 | 4.21.2 | Bildirim Şablonları dökümanı 4 farklı sekme ve önizleme aracı detaylarıyla oluşturuldu. |
