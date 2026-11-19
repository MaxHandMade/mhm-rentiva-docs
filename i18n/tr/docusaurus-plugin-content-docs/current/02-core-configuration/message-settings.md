---
id: message-settings
title: Mesaj Ayarları
sidebar_label: Mesaj Ayarları
sidebar_position: 10
slug: /core-configuration/message-settings
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro özelliği
Bu sayfa **MHM Rentiva Pro** eklentisinin bir yeteneğini anlatır. WordPress.org'daki ücretsiz
Lite sürümünün parçası değildir; Lite'ın yanına kurulu Pro ve geçerli bir lisans gerektirir.
Tam ayrım için: [Sürümler — Lite ve Pro farkı](/docs/). Pro'yu edinmek için: [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

Mesaj Ayarları sekmesi, müşteriler ve personel arasındaki dahili sohbet sistemini, bildirim tercihlerini ve iş akışı kategorilerini yapılandırdığınız bölümdür. **MHM Rentiva > Ayarlar > Mesaj Ayarları** altından ulaşılır.

:::important Pro Özelliği
Mesajlaşma sistemi Premium paket kapsamında sunulmaktadır. Ayarların aktif olması için lisansınızın bu özelliği desteklemesi gerekir.
:::

---

## 🛠️ Yönetim Araçları

- **Sohbetleri Sıfırla:** Tüm mesaj geçmişini veritabanından kalıcı olarak temizler (Operasyonel temizlik için kullanılır).
- **Bu Sekmeyi Sıfırla:** Mesaj ayarlarını varsayılan fabrika değerlerine döndürür.

---

## 📂 Ayar Sekmeleri

Mesaj sistemi dört ana başlık altında yapılandırılır:

### 1. Bildirimler
- **Yönetim E-postası:** Personel uyarıları için hedef adres (Boş bırakılırsa global admin e-postası kullanılır).
- **Giden Adı:** Mesaj bildirim e-postalarında görünecek gönderici ismi (boş bırakılırsa site adı kullanılır).
- **Yeni müşteri mesajları konusunda personeli uyarın:** Yeni bir müşteri mesajı geldiğinde personelin e-posta ile uyarılmasını sağlar.
- **Müşterilere personel yanıtlarını bildir:** Personel bir mesaja yanıt verdiğinde müşteriye e-posta gönderir.

### 2. Sistem Kuralları
- **Gösterge Paneli Görünürlüğü:** WordPress Kontrol Paneli (Dashboard) üzerinde mesaj widget'ını aktif eder.
- **Widget Kapasitesi:** Dashboard üzerinde listelenecek son mesaj sayısını belirler (Varsayılan: 5, 1 ile 20 arası).
- **Otomatik Yanıtlayıcı:** Müşteri mesaj gönderdiğinde ona otomatik bir teyit e-postası gönderir (varsayılan olarak kapalıdır).

### 3. Kategoriler
Mesajların konusuna göre sınıflandırılmasını sağlar. Varsayılan kategoriler şunlardır:
- Genel, Rezervasyon, Ödeme, Teknik Destek, Şikâyet, Öneri.
- *Kategorileri yeniden adlandırabilir veya silebilir, **Kategori Ekle** ile yenilerini ekleyebilirsiniz.*

### 4. İş Akışı Durumları
Mesajların yaşam döngüsünü takip etmek için kullanılır:
- Beklemede, Cevaplandı, Kapalı.
- *Üç durum sabittir; her birinin görünen adını değiştirebilirsiniz. Aciliyet durumla değil, mesaj önceliğiyle (Normal, Önemli, Acil) belirlenir.*

:::note İletişim formu mesajları
Sitenin iletişim formundan gelen mesajlar ayrı bir listede (**MHM Rentiva > İletişim iletileri**) ve kendi spam korumasıyla durur; bkz. [Contact form](../03-features-usage/shortcodes/contact.md).
:::

---

### 🖼️ GÖRSEL: MESAJ AYARLARI PANELİ
*(Ayarlar > Mesaj Ayarları sekmesi, kategori ve bildirim yönetim alanı)*

---

### Bölüm Özeti
- **Bildirimler** ile müşteri sorularına anında yanıt verme potansiyelinizi artırın.
- **Kategoriler** ile gelen talepleri ilgili birimlere (Satış, Destek vb.) yönlendirin.
- **İş Akışı** ile hiçbir müşteri talebinin yanıtsız kalmadığından emin olun.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 18.11.2026 | 6.5.0 | Alan adları, kategoriler ve sabit iş akışı durumları ekrana göre düzeltildi; İletişim iletileri ve spam korumasına yönlendirme eklendi. |
| 19.03.2026 | 4.21.2 | Mesaj Ayarları dökümanı 4 alt sekme ve kategori yönetimi detaylarıyla oluşturuldu. |
