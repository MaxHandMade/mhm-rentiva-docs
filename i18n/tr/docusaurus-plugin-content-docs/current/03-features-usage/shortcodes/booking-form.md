---
title: Booking form
description: Booking form modülünün kullanım kılavuzu ve teknik detayları.
sidebar_position: 8
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
Bu sayfa, Booking form modülü konusunu teknik ve operasyonel açıdan standart bir referans formatında açıklar.
:::

# 🚗 Booking form

## İçindekiler
- Kullanım
- Özellikler
- Geliştirici Notları

Booking form modülü, Rentiva platformundaki **reservation** süreçlerini yönetmek ve kullanıcılara sunmak için tasarlanmıştır.

## Kullanım

:::tip GÖRSEL GELECEK
Buraya bu modülün frontend (kullanıcı tarafı) görünümünü temsil eden bir ekran görüntüsü eklenecektir.
:::

Bu modülü herhangi bir sayfaya veya yazıya eklemek için aşağıdaki kısa kodu (shortcode) kullanabilirsiniz:

```shortcode
[rentiva_booking_form vehicle_id=""]
```

Gutenberg blok editöründe **"MHM Rentiva -> Booking form"** bloğunu seçerek görsel olarak da ekleyebilirsiniz.

### Parametreler

Aşağıdaki parametreler kısa kod içerisinde kullanılabilir:

| Parametre | Varsayılan | Açıklama |
| :--- | :--- | :--- |
| `vehicle_id` | `(boş)` | Modülün **feature** davranışını kontrol eder. |
| `start_date` | `(boş)` | Modülün **general** davranışını kontrol eder. |
| `end_date` | `(boş)` | Modülün **workflow** davranışını kontrol eder. |
| `show_vehicle_selector` | `1` | Modülün **general** davranışını kontrol eder. |
| `default_days` | `(ayarlardan gelir)` | Modülün **workflow** davranışını kontrol eder. |
| `show_addons` | `1` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `class` | `(boş)` | Modülün **general** davranışını kontrol eder. |
| `redirect_url` | `(boş)` | Modülün **workflow** davranışını kontrol eder. |
| `enable_deposit` | `1` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `form_title` | `(boş)` | Modülün **content** davranışını kontrol eder. |
| `show_vehicle_info` | `1` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `show_time_select` | `1` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |


## Özellikler

### 📱 Responsive Tasarım
- **Mobil:** Tek sütun düzeni.
- **Tablet (782px altı):** Optimize edilmiş görünüm.
- **Masaüstü:** Ayarlanan sütun veya genişlikte tam görünüm.

### 🚀 Performans Odaklı
- **Akıllı Önbellek:** Veritabanı sorguları sistem tarafından optimize edilerek önbelleğe alınır.
- **Koşullu Yükleme:** Statik dosyalar sadece modülün kullanıldığı sayfalarda yüklenir.

## Bilmekte fayda var

### Kiralama sözleşmesi
**Kiralama sözleşmesi zorunlu olsun** ayarını açarsanız (bkz. [Rezervasyon ayarları](../../02-core-configuration/booking-settings.md)) form, ek hizmetlerin altında **Kiralama sözleşmesi** bölümünü gösterir: kaydırılabilir bir metin kutusu ve **Kiralama sözleşmesini okudum ve kabul ediyorum.** işaret kutusu. İşareti koymayan müşteri "Rezervasyonunuzu tamamlamak için kiralama sözleşmesini kabul edin." mesajını görür ve rezervasyon reddedilir; bu denetim hem tarayıcıda hem sunucuda yapılır. Kabul tarihi ve saati ile metnin sürümü rezervasyonla birlikte kaydedilir.

Müşterinin sayfası açıkken (ya da sayfanın önbellekteki bir kopyası varken) metni değiştirirseniz, gönderimi "Kiralama sözleşmesi değişti. Rezervasyon yapmadan önce sayfayı yenileyip sözleşmeyi inceleyin." mesajıyla reddedilir; müşteri yeni metni gözden geçirir. Sözleşme transfer rezervasyonlarında gösterilmez.

### Dönüş ve teslim alma tarihleri
- Dönüş, teslim almadan önce ya da aynı anda ise form "Dönüş tarihi teslim alma tarihinden sonra olmalıdır." der ve tarihler düzelene kadar **Rezervasyon yap** düğmesini kilitler.
- Geçmişte kalmış bir teslim alma saati için müşteri fiyat alamaz, rezervasyon yapamaz: "Teslim alma zamanı geçti. Lütfen daha ileri bir tarih veya saat seçin." Yönetici geriye dönük bir kaydı yine elle girebilir.

### Araç doluysa
Seçilen araç o tarihlerde doluysa form "Seçilen araç müsait değil, ancak benzer araçlar önerebiliriz:" der ve aynı tarihlerde boş araçları listeler; her birinde tarihleri koruyan **Bu aracı seç** düğmesi bulunur.

:::info 6.4.0 güncellemesinden sonra sayfa önbelleği
Güncellemeden sonra sayfa önbelleğinizi bir kez temizleyin. Bkz. [Performans ve önbellek](../../06-faq/performance-cache.md).
:::

## Geliştirici Notları

- **HTML Yapısı:** Tüm kapsayıcılar `.mhm-rentiva-booking-form-wrapper` sınıfı ile başlar.
- **Özelleştirme:** CSS değişkenleri (`--mhm-color-primary` vb.) global `css-variables.css` dosyasından miras alınır.

## Bölüm Sonu Özeti
- Booking form sayfası, tekil referans başlıklarıyla standart dokümantasyon yapısına alınmıştır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 18.11.2026 | 6.4.0 | Kiralama sözleşmesi, tarih denetimleri ve benzer araç önerileri eklendi. |
| 11.10.2026 | 6.2.0 | `min_days`, `max_days`, `show_payment_options` ve `default_payment` kaldırıldı: 6.2.0 bunları artık okumuyor; genel ayarlar uygulanmaya devam ediyor. |
| 19.03.2026 | 4.21.0-docs | Sayfa alfabetik olarak sıralandı ve görsel yer tutucusu eklendi. |
