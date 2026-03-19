---
id: vehicle-settings
title: Araç Ayarları
sidebar_label: Araç Ayarları
sidebar_position: 6
slug: /core-configuration/vehicle-settings
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

Araç Ayarları sayfası, filonuzdaki araçların hem verisel yapısını (vites, yakıt, plaka vb.) hem de kullanıcıya sunum şeklini belirlediğiniz kontrol merkezidir. **MHM Rentiva > Araç Ayarları** menüsü üzerinden iki ana sekmede yönetilir.

---

## 1. Alan Tanımları (Field Definitions)

Bu sekmede her araç kartı ve detay sayfası için hangi veri alanlarının (data fields) aktif olacağını ve hangilerinin zorunlu tutulacağını belirlersiniz.

### 🏠 Araç Detayları
Araç kartlarında ve detay sayfalarında görülen teknik verileri yönetebilirsiniz:
- **Temel Detaylar:** Günlük Fiyat, Plaka, Model, Model Yılı, Marka, Depozito ve Kullanılabilirlik Durumu.
- **Özellikler ve Özel Ayrıntılar:** Kilometre, Koltuk Sayısı, Vites Tipi, Motor Hacmi, Renk, Kapı Sayısı ve Yakıt Tipi.

### ⚙️ Araç Özellikleri (Features)
Araçların sahip olduğu konfor donanımlarını (Klima, ABS, Hidrolik Direksiyon, Bluetooth vb.) seçebilir ve özel özellikler ekleyebilirsiniz.

### 🎒 Araç Ekipmanları (Equipment)
Araç içerisinde sunulan fiziksel donanımları (Yedek Lastik, İlk Yardım Çantası, GPS Takip Cihazı vb.) yönetebilirsiniz.

### ➕ Özel Alan Ekleme (Custom Add-ons)
Sistemde ön tanımlı olmayan bir alan mı eklemek istiyorsunuz? "Özel detay adı" kutusuna istediğiniz başlığı yazıp, veri tipini (Metin, Sayı vb.) belirleyerek kendi teknik alanlarınızı oluşturabilirsiniz.

---

### 🖼️ GÖRSEL: ARAÇ ALAN TANIMLARI
*(MHM Rentiva > Araç Ayarları > Alan Tanımları sekmesi ekran görüntüsü)*

---

## 2. Görüntüleme Seçenekleri (Display Options)

Bu sekme, tanımladığınız alanların frontend (kullanıcı tarafı) arayüzündeki yerleşimini ve görünürlüğünü kontrol eder.

### 🔄 Görünür Kart Öğeleri & Sıralama
- **Sürükle-Bırak:** Araç kartlarında (listeleme sayfasında) hangi bilginin önce görüneceğini öğeleri tutup sürükleyerek belirleyebilirsiniz.
- **Gizleme:** İstemediğiniz öğeleri "Görünen öğeler" listesinden yanındaki `x` butonuna basarak kaldırabilirsiniz.

### 🌟 Öne Çıkan Özellikler (Highlighted Features)
Araç detay sayfalarında, teknik özellikler tablosundan bağımsız olarak en üstte vurgulanacak (vurgulanmış ikonlu alanlar) özelliklerin sırasını ve varlığını buradan yönetebilirsiniz.

### 📊 Karşılaştırma Tablosu Ayarları
Kullanıcı araç karşılaştırma özelliğini kullandığında, tabloda hangi detayların, özelliklerin veya ekipmanların kıyaslanacağını tek tek seçebilirsiniz.

---

### 🖼️ GÖRSEL: GÖRÜNTÜLEME VE SIRALAMA AYARLARI
*(MHM Rentiva > Araç Ayarları > Görüntüleme Seçenekleri sekmesi ekran görüntüsü)*

---

## 💡 Teknik Notlar ve Öneriler

:::important Veri Güvenliği
Bir alanı "Alan Tanımları" kısmından kapatırsanız, o alanla ilgili daha önce girdiğiniz veriler **silinmez**, sadece kullanıcıya gösterilmez. Tekrar açtığınızda veriler geri gelir.
:::

- **Sıralama:** Sürükle-bırak ile yaptığınız sıralamalar; araç tabloları, liste görünümleri ve "Hesabım" sayfasındaki listeler için geçerlidir.
- **İkonlar:** Standart özellikler ve donanımlar için sistem uygun ikonları otomatik olarak atar.

### Bölüm Özeti
- **Alan Tanımları:** Hangi verilerin toplanacağını belirler.
- **Görüntüleme Seçenekleri:** Verilerin nasıl ve hangi sırada sunulacağını belirler.
- **Özel Alanlar:** Sınırsız sayıda teknik detay eklenmesine olanak tanır.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 19.03.2026 | 4.21.2 | Alan tanımları ve görüntüleme seçenekleri detaylı olarak eklendi. |
| 26.02.2026 | 4.21.0 | İlk sürüm oluşturuldu. |
