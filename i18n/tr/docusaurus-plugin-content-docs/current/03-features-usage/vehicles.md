---
id: vehicles
title: Araç Yönetimi
sidebar_label: Araç Listesi
sidebar_position: 3
slug: /features-usage/vehicles
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Araçlar, MHM Rentiva sisteminin temel yapı taşlarıdır. **MHM Rentiva > Araçlar** menüsü, filonuzdaki tüm araçların listelendiği, durumlarının takip edildiği ve yeni araç girişlerinin yapıldığı ana yönetim ekranıdır.

---

## 🚘 Araç Listesi ve Hızlı İşlemler

Araç listesi, filonuzun genel dökümünü sunar. **"Hızlı Düzenle"** seçeneği ile sayfayı yenilemeden plaka, fiyat ve müsaitlik durumunu güncelleyebilirsiniz.

- **Liste Sütunları:** Başlık, Araç Kategorileri, Plaka, Günlük Fiyat, Koltuk Sayısı, Vites, Yakıt ve Müsaitlik (Aktif/Pasif).
- **Filtreleme:** Kategoriye, tarihe veya mevcut durumuna göre araçları süzebilirsiniz.

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>📸 GÖRSEL: ARAÇ LİSTESİ VE HIZLI DÜZENLEME</strong><br/>
  <em>mhm-rentiva-vehicle-list-quick-edit</em>
</div>

---

## ➕ Araç Tanımlama ve Detaylar

Yeni bir araç eklerken veya mevcut olanı düzenlerken **"Araç Detayları"** panelinde aşağıdaki verileri eksiksiz doldurmanız önerilir:

### 1. Temel Teknik Veriler
- **Kullanılabilirlik:** Aracın sistemde aktif/pasif olma durumu.
- **Lokasyon:** Aracın hangi ofis veya vendor bölgesine ait olduğu.
- **Fiyat ve Finans:** Günlük kiralama bedeli ve Depozito tutarı.
- **Kimlik Bilgileri:** Plaka, Marka, Model ve Model Yılı.
- **Kapasite:** Koltuk Sayısı ve Kapı Sayısı.
- **Mekanik:** Vites Tipi (Otomatik/Manuel), Yakıt Tipi (Benzin/Dizel/Hibrit/Elektrik) ve Motor Hacmi.

---

## 🛠️ Özellikler ve Ekipmanlar

Her araç için müşterilerin filtreleme yapabileceği iki ana kontrol listesi bulunur:

### Araç Özellikleri (Vehicle Features)
Klima, Hidrolik Direksiyon, ABS, Hava Yastıkları, Merkezi Kilit, Elektrikli Camlar/Aynalar, Sis Farları, Hız Sabitleyici, Bluetooth, Navigasyon, Tavan Penceresi ve Isıtmalı Koltuklar.

### Araç Ekipmanları (Equipment)
Yedek Lastik, İlk Yardım Çantası, Yangın Söndürücü, Uyarı Üçgeni, Araba Örtüsü, Çocuk Koltuğu, GPS Takip Cihazı, Araç Kamerası ve Temizlik Kiti.

---

## ✈️ Transfer Ayarları (VIP Modülü)

MHM Rentiva, klasik kiralamanın dışında VIP Transfer operasyonlarını da destekler. Aracın en alt kısmındaki bu panelden şu ayarlar yapılır:

- **Hizmet Türü:** Sadece Kiralama, Sadece Transfer veya Her İkisi.
- **Yolcu Kapasitesi:** Maksimum yolcu sayısı.
- **Bagaj Limitleri:** Maksimum büyük ve küçük bagaj kapasiteleri (Puan tabanlı hesaplama için).
- **Fiyat Çarpanı:** Belirli araçlara özel (örn: VIP araçlar için 1.2x) fiyat çarpanı atama.

---

## Galeri ve Gorsel Yonetimi

- **Arac Goruntusu:** Arama sonuclarinda gorunecek ana profil fotografi.
- **Arac Galerisi:** Aracin ic ve dis detaylarini gosteren maksimum 10 adet fotograf.

---

## Arac Belgeleri (v4.23.1)

Arac ekleme formunda (`[rentiva_vehicle_submit]`) iki belge yukleme alani bulunur:

### Arac Ruhsati (Vehicle Registration Document)
Vendor, arac ruhsat belgesini form uzerinden yukler. Admin tarafindan dogrulama icin incelenir.

### Arac Sigortasi (Vehicle Insurance Document)
v4.23.1 ile eklenmistir. Arac ruhsatindan hemen sonra gelen bu bolum, aracin sigorta belgesinin yuklenmesini saglar.

- **Meta key:** `_mhm_rentiva_vehicle_insurance_doc`
- **Islem:** VehicleSubmit.php AJAX handler tarafindan islenir ve WordPress Media Library'de saklanir.
- **Gecmis:** Bu alan onceden vendor basvuru formunda bulunuyordu. v4.23.1 ile her araca ozel sigorta belgesi yuklenebilmesi icin arac ekleme formuna tasindi.

---

## Bloklu Tarihler (Blocked Dates)

Aracın belirli tarihlerde kiralanmasını engellemek için **Bloklu Tarihler** meta kutusu kullanılır. v4.23.0 ile "Tumune Uygula" (Apply to All) işlevi duzeltilmistir:

- **Eski davranis:** JS yalnızca `vehicle_id` gonderiyordu, PHP tarafinda DB'den okuma yapiliyordu (henuz kaydedilmemis veriler için calismiyordu).
- **Yeni davranis (v4.23.0):** JS artik `dates` + `notes` verilerini JSON payload olarak gonderir. PHP, oncelikle payload'tan okur; bulamazsa DB'ye duser (fallback).
- **Ilgili dosyalar:** `BlockedDatesMetaBox.php`, `assets/js/admin/blocked-dates.js`

---

## ⚡ AssetManager Admin Kapsami

v4.22.0 itibariyla `AssetManager::enqueue_admin_assets()` yalnızca Rentiva admin sayfalarında çalışır (`is_rentiva_admin_page()` guard). v4.22.1 ile `vehicle`, `vehicle_booking` ve `vehicle_addon` post type'lari da guard'a eklenmiştir. Bu sayede CSS degiskenleri (`css-variables.css`) dogru sekilde yüklenir ve KPI kartlari bozulmaz.

---

### Bölüm Özeti
- Araclar **CPT** (Custom Post Type) olarak saklanir ve her araç kendine ozel meta alanlara sahiptir.
- **Hizli Düzenleme** ile operasyonel hiz kazanin.
- **VIP Modulu** ile transfer kapasitelerini ve fiyat carpanlarini yonetin.
- **Bloklu Tarihler** artik "Tumune Uygula" işlevinde JSON payload kullanir.

### Degisiklik Gunlugu
| Tarih | Surum | Not |
| :--- | :--- | :--- |
| 28.03.2026 | 4.23.1 | Arac sigorta belgesi yukleme bolumu eklendi. Sehir secimi SelectWoo'ya donusturuldu. |
| 27.03.2026 | 4.23.0 | Bloklu Tarihler "Tumune Uygula" fix, AssetManager admin guard dokumante edildi. |
| 19.03.2026 | 4.21.2 | Arac detaylari, ozellikler, ekipmanlar ve VIP modulu gercek arayuze gore guncellendi. |
| 26.02.2026 | 4.21.0 | Ilk surum olusturuldu. |

