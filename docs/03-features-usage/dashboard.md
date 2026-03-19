---
id: dashboard
title: Kontrol Paneli (Dashboard)
sidebar_label: Kontrol Paneli
sidebar_position: 2
slug: /features-usage/dashboard
---

![Version](https://img.shields.io/badge/version-4.6.3-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

Kontrol Paneli, MHM Rentiva'nın kalbidir. İşletmenizin anlık durumunu, finansal performansını ve bekleyen operasyonel görevleri tek bir ekranda görmenizi sağlar. **MHM Rentiva > Kontrol Paneli** menüsünden ulaşılır.

Eklenti yüklendiğinde sizi karşılayan bu ekran, veriye dayalı kararlar almanız için kritik metrikleri sunar.

<div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', backgroundColor: '#f9fafb', textAlign: 'center', margin: '20px 0' }}>
  <p style={{ margin: 0, color: '#6b7280', fontWeight: 'bold' }}>🖼️ GÖRSEL: KONTROL PANELİ VE REZERVASYON TAKVİMİ</p>
  <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#9ca3af' }}>mhm-rentiva-dashboard-calendar-view</p>
</div>

---

## 📊 Özet İstatistik Kartları (Real-time Metrics)

Panelin en üstünde, mevcut aya ait (veya seçilen periyottaki) performans verileri simgesel kartlarla gösterilir:

- **Aylık Rezervasyonlu Araçlar:** Toplam rezervasyon alan araç sayısı ve bunların toplam rezervasyon adedi.
- **Etkin Olmayan Araçlar:** Şu an kiralamaya kapalı veya pasif durumdaki araç sayısı.
- **Bakım Altındaki Araçlar:** Teknik servis veya bakım modunda işaretlenmiş araçların sayısı.
- **Ort. Aylık Gelir:** Seçilen ayın toplam cirosu ve bir önceki aya göre büyüme/küçülme oranı (%).

---

## 📅 Aylık Rezervasyon Takvimi

Dashboard'un merkezinde yer alan interaktif takvim, tüm filonuzun doluluk oranını görselleştirir.

- **Araç Bazlı Satırlar:** Sol sütunda araç listesi (Model ve Plaka) yer alır.
- **Durum Renkleri (Legend):**
  - <span style={{color: '#facc15'}}>●</span> **Beklemede:** Henüz onaylanmamış rezervasyonlar.
  - <span style={{color: '#3b82f6'}}>●</span> **Onaylı:** Ödemesi alınmış veya admin tarafından onaylanmış işlemler.
  - <span style={{color: '#f97316'}}>●</span> **Devam Etmekte:** Araç şu an müşteride olan işlemler.
  - <span style={{color: '#22c55e'}}>●</span> **Tamamlandı:** Kiralama süreci başarıyla bitmiş rezervasyonlar.
  - <span style={{color: '#ef4444'}}>●</span> **İptal Edildi:** İptal edilmiş kayıtlar.
- **İnteraktif Navigasyon:** Ay butonları ile geçmiş ve gelecek dönemlere hızlı geçiş yapabilirsiniz.

---

## 🔍 Rezervasyon Detayları Paneli

Takvim üzerindeki herhangi bir rezervasyon kutucuğuna tıklandığında (veya üzerine gelindiğinde) detaylı bir pop-up açılır:

- **Müşteri Bilgileri:** Ad, E-posta ve Telefon.
- **Tarih ve Saat:** Teslim alma ve iade (Return) zamanları.
- **Finansal Özet:** Toplam rezervasyon bedeli.
- **Hızlı Erişim:** "Rezervasyonu Düzenle" butonu ile doğrudan işlem sayfasına gidebilirsiniz.

---

## 🛠️ İnteraktif Özellikler

Kontrol Paneli kullanıcı deneyimi için şu hızlı araçları sunar:

- **Dışa Aktar:** İstatistikleri veya listeleri rapor formatında indirme.
- **Widget Düzenleme:** Ekran ayarları (Screen Options) ile hangi kartların görüneceğini seçebilirsiniz.
- **Önbellek (Cache) Yönetimi:** "Önbelleği Temizle" ile anlık veritabanı yansımasına ulaşın.

---

### Bölüm Özeti
- **Dashboard** ile filonuzun 30 günlük projeksiyonunu izleyin.
- **Renk Kodları** ile hangi aracın hangi tarihte müsait olduğunu anında anlayın.
- **Müşteri Kartları** ile rezervasyon detaylarına saniyeler içinde ulaşın.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 19.03.2026 | 4.6.3 | Kontrol Paneli rehberi gerçek arayüz metrikleri ve takvim detaylarıyla güncellendi. |
