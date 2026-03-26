---
id: vip-transfer
title: VIP Transfer Modülü
sidebar_label: VIP Transfer
sidebar_position: 10
slug: /features-usage/vip-transfer
---

![Version](https://img.shields.io/badge/version-4.23.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.03.2026-orange?style=flat-square)

VIP Transfer modülü, standart araç kiralamadan farklı olarak, şoförlü ulaşım hizmetlerini (Havalimanı transferi, şehirlerarası ulaşım vb.) yönetmek için tasarlanmıştır. Bu modül, rota bazlı fiyatlandırma ve kapasite kontrolü üzerine inşa edilmiştir.

---

## 🗺️ Transfer Güzergahları (Routes)

Hizmet vereceğiniz noktaları ve bu noktalar arasındaki fiyatları tanımlamak için **MHM Rentiva > Transfer Güzergahları** menüsünü kullanın.

### 1. Konum Tanımlama (Locations)
Transferin başlayacağı veya biteceği noktaları (Havalimanı, Otel, Şehir Merkezi vb.) oluşturun.
- **İpucu:** Harita entegrasyonu için konumların koordinatlarını girmeyi unutmayın.

### 2. Rota ve Fiyatlandırma
İki konum arasındaki ana rotayı belirleyin.
- **Sabit Fiyat:** Rota başına net bir ücret (`base_price`) belirleyebilirsiniz.
- **Maksimum Fiyat:** Vendor'ların belirleyebileceği tavan fiyat (`max_price`). *(v4.23.0)*
- **Kilometre Bazlı:** Mesafe arttıkça değişen dinamik fiyatlandırma.
- **Vendor Fiyatı:** Çoklu tedarikçi yapısında her vendor kendi rota fiyatını belirleyebilir. *(v4.23.0)*

---

## 👥 Kapasite ve Araç Uyumluluğu

Transfer rezervasyonlarında en kritik nokta yolcu ve bagaj sayısıdır.
- **Yolcu Sayısı:** Aracın ruhsatındaki koltuk kapasitesine göre filtreleme yapılır.
- **Bagaj Kapasitesi:** Rezervasyon formunda belirtilen bagaj adedi, aracın bagaj hacmiyle karşılaştırılır.

:::warning Önemli
Eğer bir araç "VIP Minibüs" ise ve 8 yolcu kapasitesine sahipse, 10 kişilik bir grup arama yaptığında bu araç sonuçlarda görünmeyecektir.
:::

---

## 🔍 Rota Bazlı Arama Motoru (v4.23.0)

Transfer arama motoru v4.23.0 ile yeniden yapılandırılmıştır:
- Seçilen başlangıç ve bitiş noktaları eşleşen rotalara göre araç filtreleme yapılır.
- Vendor fiyatı varsa o kullanılır, yoksa rotanın `base_price` değeri fallback olarak uygulanır.
- Yolcu ve bagaj kapasitesi otomatik denetlenir.

---

## 🛒 Kullanıcı Akışı ve Rezervasyon

1. **Arama:** Kullanıcı başlangıç ve bitiş noktasını, tarih-saati ve kişi sayısını seçer.
2. **Araç Seçimi:** Rota ve kapasiteye uygun araçlar, vendor fiyatlarıyla birlikte listelenir.
3. **Ödeme:** WooCommerce üzerinden ödeme tamamlanır.
4. **Onay:** Yönetici paneline "Transfer" tipinde bir rezervasyon düşer.

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>📸 Görsel Bekleniyor: Transfer Arama Formu</strong><br/>
  <em>Frontend taraftaki transfer arama motoru görünümü.</em>
</div>

---

## 🛠️ Teknik Not: Hook ve Filtreler

Geliştiriciler için transfer fiyatlandırmasını manipüle etmek veya ek kurallar eklemek mümkündür:

```php
// Transfer fiyatını filtrelemek için:
add_filter('mhm_rentiva_transfer_price', function($price, $route_id) {
    // Özel kampanya mantığı
    return $price * 0.9; 
}, 10, 2);
```

---

### Bölüm Özeti
- **Transfer**, rota ve kapasite odaklı bir modüldür.
- **Fiyatlandırma** sabit veya mesafe bazlı olabilir.
- **Kapasite limitleri** (yolcu/bagaj) sistem tarafından otomatik denetlenir.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 26.03.2026 | 4.23.0 | Rota bazlı arama motoru, vendor fiyatlandırma, max_price ve Şehir→Nokta hiyerarşisi eklendi. |
| 18.03.2026 | 4.21.2 | İçerik hibrit modele göre güncellendi. |
| 26.02.2026 | 4.21.0 | İlk sürüm oluşturuldu. |
