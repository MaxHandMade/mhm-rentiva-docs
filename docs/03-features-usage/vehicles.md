---
id: vehicles
title: Araç Yönetimi
sidebar_label: Araç Listesi
sidebar_position: 3
slug: /features-usage/vehicles
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-18.03.2026-orange?style=flat-square)

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

## 🖼️ Galeri ve Görsel Yönetimi

- **Araç Görüntüsü:** Arama sonuçlarında görünecek ana profil fotoğrafı.
- **Araç Galerisi:** Aracın iç ve dış detaylarını gösteren maksimum 10 adet fotoğraf.

---

### Bölüm Özeti
- Araçlar **CPT** (Custom Post Type) olarak saklanır ve her araç kendine özel meta alanlara sahiptir.
- **Hızlı Düzenleme** ile operasyonel hız kazanın.
- **VIP Modülü** ile transfer kapasitelerini ve fiyat çarpanlarını yönetin.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 19.03.2026 | 4.21.2 | Araç detayları, özellikler, ekipmanlar ve VIP modülü gerçek arayüze göre güncellendi. |
| 26.02.2026 | 4.21.0 | İlk sürüm oluşturuldu. |

