---
id: messages
title: Mesajlaşma Sistemi
sidebar_position: 12
slug: /features-usage/messages
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info React SPA (v4.40.0'dan beri)
Mesajlar yönetici sayfası v4.40.0 sürümünde tam bir **React SPA**'ya taşındı (CSS rötuşları v4.41.0'da tamamlandı). 6 React bileşeninin tamamı `build/admin/messages.js` üzerinden sunulur. Sayfa, PHP tam sayfa render'ı olmadan yüklenir — veri `/wp-json/mhm-rentiva/v1/messages/*` REST uç noktaları üzerinden çekilir. Eski PHP render metotları kaldırıldı.
:::

Mesajlaşma Sistemi, kiralama öncesi veya sonrası müşterilerinizle doğrudan ve güvenli iletişim kurmanızı sağlayan merkezi bir destek hattıdır. **MHM Rentiva > Mesajlar** menüsü üzerinden tüm gelen talepleri yönetebilirsiniz.

---

## 📩 Mesaj Listesi ve Filtreleme

Gelen kutusu, taleplerin aciliyetine ve türüne göre organize edilmiştir. Liste şu ana kolonları içerir:

- **Konu & Etiketler:** "Yeni" (YENİ) mesajlar turuncu etiketle vurgulanır.
- **Öncelik:** "Düşük", "Normal" veya "Yüksek" olarak belirlenmiş aciliyet seviyesi.
- **Kategori:** Mesajın konusu (Genel, Destek, Rezervasyon Sorunu vb.).
- **Durum:** "Beklemede", "Yanıtlandı" veya "Kapatıldı" durum takibi.

---

## 💬 İletişim ve Yanıt Akışı

Bir mesaj tıkladığınızda açılan detay sayfası, müşteriyle olan diyaloğu bir "Thread" (İleti Dizisi) yapısında sunar:

1.  **Müşteri Kimliği:** Mesajı gönderen kişinin kullanıcı adı ve e-posta adresi en üstte yer alır.
2.  **Mesaj İçeriği:** Müşterinin gönderdiği asıl metin ve gönderim zamanı (Örn: "3 hafta önce").
3.  **Cevapla Butonu:** Admin panelinden müşteriye anında yanıt yazmanıza olanak tanır.

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>📸 GÖRSEL: MESAJ DETAYLARI VE YANIT AKIŞI</strong><br/>
  <em>mhm-rentiva-message-details-reply</em>
</div>

---

## ⚙️ Teknik Yönetim ve Rezervasyon İlişkilendirme

Mesaj düzenleme ekranı, operasyonel bağlamı korumak için kritik bir özelliğe sahiptir: **Rezervasyon Derneği.**

- **Kategori ve Durum Değişimi:** Mesajın türünü ve sürecini (Örn: Beklemede'den Yanıtlandı'ya) admin manuel olarak güncelleyebilir.
- **Rezervasyonla İlişkilendirme (Booking Mapping):** Gelen mesajı mevcut bir rezervasyon numarasına (#3037 gibi) bağlayabilirsiniz. Bu sayede, rezervasyon detaylarına baktığınızda o işlemle ilgili tüm geçmiş yazışmaları görebilirsiniz.

---

## 📱 Mobil Duyarlı (v4.48.0+)

Mesaj tablosu küçük ekranlarda (≤782px) **yığılmış kart düzenine** geçer. Sütun başlıkları CSS `attr(data-label)` ile satır içi enjekte edilir — yatay kaydırma yok. İleti dizisi görünümü de dikey olarak yığılır.

---

## React Bileşenleri (v4.40.0+)

| Bileşen | Amaç |
| :--- | :--- |
| `MessagesPage` | Kök — liste görünümü + ileti dizisi görünümü + ayarlar görünümü |
| `MessageTable` | Sıralanabilir, filtrelenebilir mesaj gelen kutusu |
| `ThreadView` | Yanıt formlu sohbet baloncuğu ileti dizisi |
| `SettingsView` | Kategori ve durum yönetimi |

**REST Ad Alanı:** `GET/POST /wp-json/mhm-rentiva/v1/messages/*`

---

### Bölüm Özeti
- **Mesaj Filtreleme** ile destek taleplerini organize edin.
- **Yanıt Akışı** ile müşteri memnuniyetini artırın.
- **Rezervasyon İlişkilendirme** ile iletişim geçmişini operasyonel verilerle eşleştirin.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 11.05.2026 | 4.48.0 | Mesaj tablosu için mobil yığılmış düzen (≤782px). |
| 11.05.2026 | 4.41.0 | CSS rötuşları tamamlandı. Ödemeler yönetici menüsü eklendi. |
| 11.05.2026 | 4.40.0 | Tam React SPA geçişi. MessagesPage, MessageTable, ThreadView, SettingsView bileşenleri. |
| 19.03.2026 | 4.21.2 | Mesaj dökümanı, yanıt akışı ve rezervasyon ilişkilendirme özellikleriyle gerçek arayüze göre güncellendi. |
| 26.02.2026 | 4.21.0 | İlk sürüm oluşturuldu. |

