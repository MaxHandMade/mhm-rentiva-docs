---
id: bookings
title: Rezervasyon Yönetimi
sidebar_label: Rezervasyonlar
sidebar_position: 6
slug: /features-usage/bookings
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-18.03.2026-orange?style=flat-square)

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

*İpucu: Takvim üzerindeki bir kayda tıkladığınızda müşteri ve araç detaylarını içeren hızlı bir özet paneli açılır.*

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

### Para Yatırma Geçmişi (Timeline)
Rezervasyonun oluşturulmasından, ödemelerin alınmasına ve durum değişikliklerine kadar her adım bir zaman çizelgesi (Log) olarak kaydedilir. Bu, hatalı işlemlerin takibi için kritiktir.

### Sağ Kenar Çubuğu (Side Actions)
- **E-posta Gönder:** Manuel olarak "Rezervasyon Onayı" veya "Hatırlatma" e-postaları tetiklenebilir.
- **Ödeme Makbuzu:** Müşteriden gelen ödeme dekontları sisteme yüklenip admin tarafından onaylanabilir.
- **Müşteri Hesabı:** Rezervasyon sahibi ile doğrudan iletişim veya hesap bağlantısı kurulabilir.

---

### Bölüm Özeti
- **Dashboard** ile anlık doluluk oranını izleyin.
- **Zaman Çizelgesi** ile her operasyonel adımı denetleyin.
- **Finansal Panel** ile ödeme ve kalan bakiye takibini hatasız yapın.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 19.03.2026 | 4.21.2 | Rezervasyon listesi, takvim, manuel kayıt ve ödeme yönetimi gerçek arayüze göre baştan yazıldı. |
| 18.03.2026 | 4.21.0 | İlk sürüm oluşturuldu. |
