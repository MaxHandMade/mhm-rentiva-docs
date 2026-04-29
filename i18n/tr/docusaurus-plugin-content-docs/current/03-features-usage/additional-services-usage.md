---
id: additional-services-usage
title: Ek Hizmet Yönetimi (Addons)
sidebar_label: Ek Hizmetler
sidebar_position: 9
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Ek Hizmetler, araç kiralama rezervasyonlarınıza ekstradan değer katan ürünlerin (Bebek Koltuğu, GPS, Tam Sigorta, Port Bagaj vb.) tanımlandığı yönetim alanıdır. **MHM Rentiva > Ek hizmetler** menüsünden ulaşılır.

Bu hizmetler rezervasyon toplamına eklenir ve operasyonel verimliliği artırır.

---

## 🧺 Yeni Ek Hizmet Oluşturma

Bir ürün veya hizmet eklerken aşağıdaki parametreler belirlenir:

- **Hizmet Adı:** Müşterinin sepette göreceği isim (Örn: Bebek Koltuğu).
- **Açıklama:** Ürünün detaylı bilgisi ve kullanım şartları.
- **Fiyatlandırma:**
    - **Günlük Fiyat:** Kiralanan her gün için (Örn: 50 TL / Gün).
    - **Sabit Fiyat:** Rezervasyon başına bir kez (Örn: Sigorta Paketi 500 TL).
- **Zorunlu Hizmet:** İşaretlendiğinde müşteri bu hizmeti çıkarmadan rezervasyon yapamaz (Örn: Standart Sigorta).
- **Maksimum Adet:** Bir araç için en fazla kaç adet seçilebilir? (Örn: Maks 2 Bebek Koltuğu).

---

### 🖼️ GÖRSEL: EK HİZMET YÖNETİMİ
*(Ek hizmet listesi ve fiyatlandırma ayarları)*

---

## 🚘 Araçlarla Uyumluluk (Assignment)

Tüm hizmetler her araç için uygun olmayabilir.
- **Seçili Araca ÖZEL:** Sadece "Minibüs" grubu için 8-9 kişilik bagaj hizmeti tanımlayabilirsiniz.
- **Global Atama:** Bazı hizmetler (Yurtdışı Çıkış İzni gibi) tüm filoya otomatik uygulanır.

---

## 🛒 Müşteri Seçimi ve Sepet Yönetimi

Müşteri araç detay sayfasında veya sepet (Checkout) aşamasında bu hizmetleri liste halinde görür.
- **Anlık Hesaplama:** Bir ek hizmet seçildiğinde toplam tutar "Ajax" ile anlık güncellenir.
- **Özet:** Seçilen ekstralar hem müşterinin e-postasında hem de yönetici panelindeki rezervasyonda kalem kalem listelenir.

---

---

## 🆕 v4.36.0 — Bağlam ve Fiyatlandırma Tipi

v4.36.0 ile her ek hizmette düzenleme ekranında iki yeni alan görünür:

### Bağlam (`addon_context` taxonomy)

Yan paneldeki radio metabox üç seçenek sunar:

| Bağlam | Anlamı |
| :--- | :--- |
| **Sadece kiralama** | Yalnızca kiralama rezervasyon akışında görünür |
| **Sadece transfer** | Yalnızca transfer rezervasyon akışında (modal seçicide) görünür |
| **Her ikisi de** | Her iki akışta da görünür |

- **Varsayılan:** `Sadece kiralama` (mevcut ek hizmetler yükseltmede otomatik bu bağlama alınır)
- **Müşteri nerede görür:**
    - Kiralama: rezervasyon formundaki mevcut checkbox'lar (değişmedi)
    - Transfer: arama sonucu kartında "Sepete ekle" butonunun üstünde "+ N ek hizmet mevcut" küçük etiketi; butona tıklanınca modal seçici açılır

### Fiyatlandırma Tipi (`_mhm_addon_pricing_type` post meta)

Ana metabox'ta üç seçenekli select alanı:

| Tip | Hesaplama | Geçerli olduğu bağlam |
| :--- | :--- | :--- |
| **Rezervasyon başına (sabit)** | `addon_price` (sabit) | Her iki bağlam |
| **Günlük** | `addon_price × kiralama_günü` | Kiralama |
| **Yolcu başına** | `addon_price × (yetişkin + çocuk)` | Transfer |

- **Varsayılan:** `Rezervasyon başına (sabit)` (mevcut ek hizmetler otomatik bu tipe alınır)
- **Dinamik admin UI:** Bağlam radio'sunu değiştirdiğinizde, Fiyatlandırma Tipi select'i uyumsuz seçenekleri `(bağlam ile uyumsuz)` ekiyle disable eder. JS ile çalışır, kaydetmeden önizleme yapabilirsiniz.
- **Sunucu tarafı koruma:** JS bypass'lı bir kayıt geçerse (örn. `Sadece kiralama` + `Yolcu başına`), sunucu fiyatlandırma tipini `Rezervasyon başına`'ya çevirir ve admin uyarısı gösterir.

### Transfer modal önizlemesi

Müşteri transfer arama sonucunda "Sepete ekle"'ye tıkladığında ve en az bir transfer-bağlamlı ek hizmet varsa:

```
┌─ Modal ───────────────────────────────────┐
│ VIP Transfer için ek hizmetler            │
│ İstanbul Havalimanı ➝ Taksim Ofis         │
├───────────────────────────────────────────┤
│ ☑ Welcome Banner (zorunlu)  +30 ₺         │
│ ☐ Çocuk koltuğu              +25 ₺        │
│ ☐ VIP Asistan     +15 ₺ × 3 yolcu = 45 ₺  │
├───────────────────────────────────────────┤
│ Araç 280 ₺ + ek hizmetler 95 ₺ = 375 ₺    │
│           [ Vazgeç ]   [ Sepete ekle ]    │
└───────────────────────────────────────────┘
```

- Zorunlu ek hizmetler en üstte, önceden işaretli ve kilitli görünür.
- Müşteri checkbox'ları açıp kapadıkça toplam canlı güncellenir.
- "Vazgeç" hiçbir şey göndermeden modaldan çıkar; "Sepete ekle" seçimi mevcut transfer payload'ı yanında gönderir.
- Sıfır transfer-bağlamlı ek hizmet yapılandırılmışsa modal hiç açılmaz, mevcut direct-add davranışı dokunulmadan devreye girer.

### Migration

v4.36.0'a yükseltme sonrası ilk `init`'te her mevcut `vehicle_addon` kaydı otomatik olarak şu şekilde atanır:
- `addon_context = rental`
- `_mhm_addon_pricing_type = per_booking`

Bu **idempotent**'tir — operatör manuel override (bağlamı `transfer`'a veya fiyatlandırmayı `per_day`'e değiştirme) sonraki boot'larda asla üzerine yazılmaz. Migration bir option flag ile kapatılır.

### Lite limit

Lite hâlâ toplam **4 published ek hizmetle** sınırlıdır (kiralama + transfer ortak). Bayi slot'ları nasıl bölüştüreceğine karar verir. Pro sınırsızdır.

---

### Bölüm Özeti
- **Ek Gelir Kanalları** yaratmak için zengin hizmet seçenekleri sunun.
- **Fiyatlandırma Stratejileri** ile (günlük / sabit / rezervasyon başına / yolcu başına) maliyetlerinizi karşılayın.
- **Araca Özel Sunum** ve **Bağlam Hedeflemesi** yaparak doğru ek hizmeti doğru akışta gösterin.
- Transfer müşterileri canlı çarpan-uyumlu toplamlı **modal seçici** ile odaklanmış bir deneyim yaşar.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 29.04.2026 | 4.36.0 | `addon_context` taxonomy (kiralama / transfer / her ikisi) ve `_mhm_addon_pricing_type` (rezervasyon başına / günlük / yolcu başına) eklendi. Canlı toplamlı transfer modal seçici. Idempotent veri-şeritli migration. |
| 19.03.2026 | 4.21.2 | Ek Hizmetler (Addons) kullanım rehberi oluşturuldu. |
