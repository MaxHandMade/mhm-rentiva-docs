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

Araç listesi, filonuzun genel dökümünü sunar. Listenin üstünde dört kart yer alır: **Toplam araç sayısı** (bu ay kaç aracın rezerve edildiğiyle birlikte), **Bugün aktif** (şu anda müşteride olan araçlar), **Bu ayki doluluk** ve **Bu ay rezervasyon tutarı** (geçen ayla karşılaştırmalı). **Liste / Kartlar / Takvim** düğmeleri filonun görünümünü değiştirir.

- **Liste Sütunları:** Araç (fotoğraf, başlık; altında plaka, kategori ve ekleyenin adı), Konum (yalnız Konumlar özelliği etkinse), Özellikler (koltuk, vites ve yakıt), Fiyat/gün, Bu hafta (7 günlük müsaitlik şeridi), Müsait, Yaşam döngüsü ve Öne çıkarılmış.
- **Hızlı Düzenleme:** Satırdaki **"Hızlı Düzenle"** ile sayfayı yenilemeden plaka, fiyat, müsaitlik ve diğer hızlı alanları güncelleyebilirsiniz.
- **Filtreleme:** Araçları kategoriye, müsaitlik durumuna, konuma (etkinse) veya yaşam döngüsü durumuna (Aktif, Duraklatılmış, Süresi dolmuş, Geri çekilmiş ya da Arşiv) göre süzebilirsiniz.
- **Rezervasyon tutarı:** "Bu ay rezervasyon tutarı" kartı, bu ayın onaylı, devam eden ve tamamlanan rezervasyonlarının fiyatını toplar. Bu, rezerve edilen tutardır; tahsilat değildir. İptal edilen ya da iade edilen rezervasyonlar sayılmaz.

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>📸 GÖRSEL: ARAÇ LİSTESİ VE HIZLI DÜZENLEME</strong><br/>
  <em>mhm-rentiva-vehicle-list-quick-edit</em>
</div>

---

## ➕ Araç Tanımlama ve Detaylar

Araç düzenleme ekranında sayfa başlığının altında **"← Araçlar"** bağlantısı ve araç adı bulunur. Ana sütunda yukarıdan aşağıya **Araç galerisi**, **Araç ayrıntıları** ve **Kapalı tarihler** kutuları yer alır. Yan sütunda **Yayımla**, **Öne çıkarılmış**, **Araç kategorileri** ve **Araç görseli** kutuları, ardından (Pro) kutuları olan **Yaşam Döngüsü Durumu**, **Araç Belgeleri** ve **Transfer Ayarları (VIP Modülü)** gelir. Kutuları sürükleyip kendi sıranızı verirseniz sıranız korunur.

Yeni bir araç eklerken veya mevcut olanı düzenlerken **"Araç ayrıntıları"** kutusundaki verileri eksiksiz doldurmanız önerilir. Bu kutuda hangi alanların görüneceği **Araç Ayarları**'ndan belirlenir (bkz. [Araç Ayarları](./vehicle-settings.md)).

Araç ayrıntılarını, özellikleri ve ekipmanları sürükleyerek istediğiniz sıraya dizebilirsiniz; sıra **Güncelle** ile, her araç için ayrı ayrı kaydedilir.

### 1. Temel Teknik Veriler
- **Kullanılabilirlik:** Aracın sistemde aktif/pasif olma durumu.
- **Lokasyon:** Aracın hangi ofis veya vendor bölgesine ait olduğu.
- **Fiyat ve Finans:** Günlük kiralama bedeli ve Depozito tutarı.
- **Kimlik Bilgileri:** Plaka, Marka, Model ve Model Yılı.
- **Kapasite:** Koltuk Sayısı ve Kapı Sayısı.
- **Mekanik:** Vites Tipi (Otomatik/Manuel), Yakıt Tipi (Benzin, Dizel, Hibrit, Elektrik, LPG, CNG ya da Hidrojen) ve Motor Hacmi.

---

## 🛠️ Özellikler ve Ekipmanlar

Her araç için müşterilerin filtreleme yapabileceği iki ana kontrol listesi bulunur:

### Araç Özellikleri (Vehicle Features)
Klima, Hidrolik Direksiyon, ABS, Hava Yastıkları, Merkezi Kilit, Elektrikli Camlar/Aynalar, Sis Farları, Hız Sabitleyici, Bluetooth, Navigasyon, Tavan Penceresi ve Isıtmalı Koltuklar.

### Araç Ekipmanları (Equipment)
Yedek Lastik, İlk Yardım Çantası, Yangın Söndürücü, Uyarı Üçgeni, Araba Örtüsü, Çocuk Koltuğu, GPS Takip Cihazı, Araç Kamerası ve Temizlik Kiti.

---

## ✈️ Transfer Ayarları (VIP Modülü) (Pro)

> Transfer Ayarları kutusu **MHM Rentiva Pro**'nun parçasıdır.

MHM Rentiva Pro, klasik kiralamanın dışında VIP Transfer operasyonlarını da destekler. Aracın yan sütunundaki **Transfer Ayarları (VIP Modülü)** kutusundan şu ayarlar yapılır:

- **Hizmet Türü:** Sadece Kiralama, Sadece Transfer veya Her İkisi.
- **Yolcu Kapasitesi:** Maksimum yolcu sayısı.
- **Bagaj Limitleri:** Maksimum büyük ve küçük bagaj kapasiteleri (Puan tabanlı hesaplama için).
- **Fiyat Çarpanı:** Belirli araçlara özel (örn: VIP araçlar için 1.2x) fiyat çarpanı atama.

---

## Galeri ve Görsel Yönetimi

- **Araç Görseli:** Arama sonuçlarında görünecek ana profil fotoğrafı.
- **Araç Galerisi:** Aracın iç ve dış detaylarını gösteren maksimum 10 adet fotoğraf.

---

## Araç Belgeleri (v4.23.1)

Araç ekleme formunda (`[rentiva_vehicle_submit]`) iki belge yükleme alanı bulunur:

### Araç Ruhsatı (Vehicle Registration Document)
Bayi, araç ruhsat belgesini form üzerinden yükler. Yönetici tarafından doğrulama için incelenir.

### Araç Sigortası (Vehicle Insurance Document)
v4.23.1 ile eklenmiştir. Araç ruhsatından hemen sonra gelen bu bölüm, aracın sigorta belgesinin yüklenmesini sağlar. Belge WordPress Ortam Kitaplığı'nda saklanır.

Bu alan önceden bayi başvuru formunda bulunuyordu; her araca özel sigorta belgesi yüklenebilmesi için araç ekleme formuna taşındı.

---

## Kapalı Tarihler

Aracı belirli tarihlerde kapatmak için **Kapalı tarihler** kutusunu kullanın. Takvimde günlere tıklayarak kapatın; kapalı günler kırmızı gösterilir ve bir rozet **"N gün kapalı"** der. Kapalı her gün **Kapalı günler** altında, isteğe bağlı bir notla (**"Not ekle... (isteğe bağlı)"**) listelenir; **Tümünü temizle** bu aracın tüm günlerini yeniden açar. Değişiklikler **Güncelle** ile kaydedilir.

- **Tüm araçlara uygula:** Yayımlanmış diğer tüm araçların kapalı günlerini bu aracın kapalı günleriyle değiştirir.
- **Tüm araçlardan kaldır:** Yalnız bu aracın kapalı günlerini yayımlanmış diğer araçlardan kaldırır; onların diğer kapalı günleri durur.

(Pro) Bir bayinin iptal cezasının kapattığı günler bu düğmelerle ne kopyalanır ne kaldırılır; 30 gün sonra kendiliğinden kalkar. Elle kapattığınız tarihler korunur.

İki düğme de tüm filoya yazdığı için yalnız başkalarının içeriğini düzenleyebilen kullanıcılara (yöneticilere) açıktır.

Notlarda Türkçe karakterler ve tırnak işaretleri dahil her karakter kullanılabilir.

### Aylık Rezervasyon Takvimi'nden hızlı kapatma (v4.61.0)

Tek bir günü, aracı düzenlemeye açmadan doğrudan **Aylık Rezervasyon Takvimi'nden** de kapatabilir veya açabilirsiniz:

- **Boş bir güne tıklayın** — yeni rezervasyonlara kapatır.
- **Kapalı bir güne tıklayın** — yeniden açar.

Halihazırda rezervasyonu olan günler değişmez — açılır penceresini korur ve bu yolla kapatılamaz.

---

## Aracı Çöpe Atma ve Geri Yükleme

Aracı satır eyleminden, toplu işlemden ya da düzenleme ekranından çöpe atabilirsiniz. Yaklaşan rezervasyonu olan bir araç reddedilmez: rezervasyonlar aracı korur, ancak müşteriler aracın sayfasını artık açamaz. Bu yüzden böyle bir aracı çöpe attığınızda Araçlar listesinde bir uyarı çıkar: yaklaşan rezervasyon sayısı, her rezervasyona bir bağlantı (ilk beşi, sonra "ve N tane daha") ve **Aracı geri yükle** düğmesi.

**Aracı geri yükle** (ve Çöp kutusundaki **Geri yükle**) aracı çöpe atılmadan önceki durumunda geri getirir; yayımda olan araç yeniden yayımda olur ve sayfası yeniden açılır.

---

## ⚡ AssetManager Yönetici Kapsamı

v4.22.0 itibarıyla `AssetManager::enqueue_admin_assets()` yalnızca Rentiva yönetici sayfalarında çalışır (`is_rentiva_admin_page()` koruması). v4.22.1 ile `mhmrentiva_vehicle`, `mhmrentiva_booking` ve `mhmrentiva_addon` yazı türleri de bu korumaya eklenmiştir. Bu sayede CSS değişkenleri (`css-variables.css`) doğru şekilde yüklenir ve KPI kartları bozulmaz.

---

### Bölüm Özeti
- Araçlar **CPT** (Custom Post Type) olarak saklanır ve her araç kendine özel meta alanlara sahiptir.
- **Hızlı Düzenleme** ile operasyonel hız kazanın.
- **VIP Modülü** (Pro) ile transfer kapasitelerini ve fiyat çarpanlarını yönetin.
- **Kapalı tarihler** kutusuyla aracı belirli günlerde kiralamaya kapatın; **Tüm araçlara uygula** ile tüm filoya yayın.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 18.11.2026 | 6.4.0 | Araç listesi kartları ve sütunları, yeni araç düzenleme ekranı, Kapalı tarihler kutusu ile çöp uyarısı ve Aracı geri yükle belgelendi. |
| 29.06.2026 | 4.61.0 | "Ekleyen" (bayi/operatör) araç-listesi sütunu ve Aylık Rezervasyon Takvimi'nden hızlı gün kapatma belgelendi. |
| 28.03.2026 | 4.23.1 | Araç sigorta belgesi yükleme bölümü eklendi. Şehir seçimi SelectWoo'ya dönüştürüldü. |
| 27.03.2026 | 4.23.0 | Kapalı Tarihler "Tümüne Uygula" düzeltmesi, AssetManager yönetici koruması belgelendi. |
| 19.03.2026 | 4.21.2 | Araç detayları, özellikler, ekipmanlar ve VIP modülü gerçek arayüze göre güncellendi. |
| 26.02.2026 | 4.21.0 | İlk sürüm oluşturuldu. |

