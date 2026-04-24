---
id: bookings
title: Rezervasyon Yönetimi
sidebar_label: Rezervasyonlar
sidebar_position: 6
slug: /features-usage/bookings
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Rezervasyonlar, MHM Rentiva sisteminin operasyonel ve finansal kalbidir. **MHM Rentiva > Rezervasyonlar** menüsü üzerinden tüm rezervasyon trafiğini izleyebilir, yeni kayıtlar açabilir ve finansal akışları yönetebilirsiniz.

---

## 📊 Rezervasyon Analitiği ve Özet

Sayfanın en üstünde, filonuzun anlık durumunu gösteren 4 ana gösterge kartı bulunur:
- **Beklemede:** Henüz onaylanmamış veya ödemesi beklenen talepler.
- **Onaylı:** Rezervasyonu kesinleşmiş işlemler.
- **Tamamlandı:** Süreci başarıyla bitmiş kiralama/transferler.
- **Aylık Gelir:** Seçilen ayın toplam cirosu ve bir önceki aya göre büyüme oranı (%).

---

## 📅 Aylık Rezervasyon Takvimi (Interactive)

Merkezi takvim, araçlarınızın doluluk oranını görselleştirir. 

**Durum Renkleri (Legend):**
- <span style={{color: '#facc15'}}>●</span> **Beklemede:** Henüz onaylanmamış veya ödemesi beklenen rezervasyonlar.
- <span style={{color: '#3b82f6'}}>●</span> **Onaylı:** Ödemesi alınmış veya admin tarafından onaylanmış işlemler.
- <span style={{color: '#f97316'}}>●</span> **Devam Etmekte:** Kiralama süreci başlamış, araç şu an müşteride olan işlemler.
- <span style={{color: '#22c55e'}}>●</span> **Tamamlandı:** Kiralama süreci başarıyla bitmiş ve araç teslim alınmış rezervasyonlar.
- <span style={{color: '#ef4444'}}>●</span> **İptal Edildi:** Müşteri veya sistem tarafından iptal edilmiş geçersiz kayıtlar.

*Ipucu: Takvim uzerindeki bir kayda tikladiginizda müşteri ve araç detaylarini iceren hizli bir ozet paneli acilir. v4.23.0 itibariyla popup'ta `_mhm_start_time` ve `_mhm_end_time` meta değerleri ile **saat bilgisi** de gosterilmektedir.*

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>📸 GÖRSEL: REZERVASYON TAKVİMİ VE ÖZET POPUP</strong><br/>
  <em>mhm-rentiva-booking-calendar-popup</em>
</div>

---

## ➕ Manuel Rezervasyon Oluşturma

Ofisinizden veya telefonla gelen talepleri sisteme işlemek için **"Yeni Ekle Rezervasyon"** butonunu kullanılır. Form 4 ana bölümden oluşur:

1.  **Araç ve Müşteri Seçimi:** Listeden aracı ve mevcut müşteriyi seçin.
2.  **Tarih ve Misafir:** Teslim alma/dönüş tarih-saatlerini ve yolcu sayısını belirleyin.
3.  **Ek Hizmetler:** Müşterinin talep ettiği ek donanımları (Navigasyon, Bebek Koltuğu vb.) seçin. Fiyatlar otomatik eklenir.
4.  **Ödeme ve Durum:** Ödeme türünü (Depozito/Tamamı), yöntemini (Nakit/Çevrimdışı) ve başlangıç durumunu belirleyip "Fiyatı Hesapla" butonuna basın.

---

## 📝 Rezervasyon Düzenleme ve Finans Yönetimi

Mevcut bir rezervasyonun detay sayfası, tam bir operasyonel kontrol paneli sunar:

### Finansal Takip (Mevduat Yönetimi)
Sistem; **Toplam Tutar**, **Depozito Miktarı** ve **Kalan Miktar** verilerini anlık olarak hesaplar.
- **Ödeme Durumu:** "Ödeme Bekleniyor", "Ödendi" veya "İptal Edildi" olarak güncellenebilir.
- **İptal Politikası:** Belirlenen son iptal tarihine (Deadline) göre işlemin iptal edilebilir olup olmadığını gösterir.

### Kalan Ödeme (Pay Remaining) — v4.26.0

Depozito ile yapılmış rezervasyonlarda müşteriler kalan bakiyeyi doğrudan **Hesabım → Rezervasyon Detayı** sayfasından ödeyebilir.

**Nasıl Çalışır:**
1. Müşteri "Kalan Ödemeyi Yap" butonuna tıklar.
2. Sistem, kalan tutar için minimal bir WooCommerce siparişi oluşturur.
3. Müşteri WooCommerce'in native `order-pay` sayfasına yönlendirilir.
4. Sitede aktif olan herhangi bir ödeme yöntemiyle ödeme tamamlanır.

**Teknik Detaylar:**
- `_mhm_is_remaining_payment` flag'i ile kalan ödeme siparişleri tanımlanır.
- `_mhm_remaining_order_id` meta'sı ile duplicate sipariş koruması sağlanır — bekleyen sipariş varsa yeni sipariş oluşturulmaz.
- Herhangi bir ek entegrasyon veya ödeme eklentisi gerektirmez.

### Para Yatırma Geçmişi (Timeline)
Rezervasyonun oluşturulmasından, ödemelerin alınmasına ve durum değişikliklerine kadar her adım bir zaman çizelgesi (Log) olarak kaydedilir. Bu, hatalı işlemlerin takibi için kritiktir.

### Sağ Kenar Çubuğu (Side Actions)
- **E-posta Gönder:** Manuel olarak "Rezervasyon Onayı" veya "Hatırlatma" e-postaları tetiklenebilir.
- **Ödeme Makbuzu:** Müşteriden gelen ödeme dekontları sisteme yüklenip admin tarafından onaylanabilir.
- **Müşteri Hesabı:** Rezervasyon sahibi ile doğrudan iletişim veya hesap bağlantısı kurulabilir.

---

---

## 🆔 Gorunum ID'si (Display ID)

v4.23.0 itibariyla rezervasyon listelerinde ve widget'larda `mhm_rentiva_get_display_id()` fonksiyonu kullanılmaktadır. WooCommerce entegrasyonu aktifse, bu fonksiyon WC siparis ID'sini dondurur; değilse standart post ID gosterilir. Bu sayede müşteriye iletilen ID ile admin panelindeki ID tutarli olur.

---

## 🔄 Durum Degisikligi Hook'lari

Rezervasyon durumu degistiginde `update_post_meta` cagrilari standart `save_post` hook'unu tetiklemez. v4.23.0 ile `updated_post_meta` ve `added_post_meta` hook'lari dinlenerek dashboard widget'lari ve istatistiklerin anlik güncellenmesi saglanmistir.

---

### Bölüm Özeti
- **Dashboard** ile anlık doluluk oranını izleyin.
- **Zaman Çizelgesi** ile her operasyonel adımı denetleyin.
- **Finansal Panel** ile ödeme ve kalan bakiye takibini hatasız yapın.
- **Kalan Ödeme** ile depozito müşterilerine self-servis ödeme imkânı sunun.
- **Takvim popup'ı** artık saat bilgisi gösterir.
- **Display ID** ile WC sipariş ID'si tutarlılığı sağlanır.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 27.03.2026 | 4.23.0 | Takvim popup saat bilgisi, Display ID, durum hook'lari dokumante edildi. |
| 19.03.2026 | 4.21.2 | Rezervasyon listesi, takvim, manuel kayıt ve odeme yönetimi gerçek arayuze gore bastan yazildi. |
| 18.03.2026 | 4.21.0 | İlk sürüm oluşturuldu. |
