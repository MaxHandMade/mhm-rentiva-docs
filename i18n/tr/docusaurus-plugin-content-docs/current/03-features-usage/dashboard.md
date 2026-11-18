---
id: dashboard
title: Kontrol Paneli (Dashboard)
sidebar_label: Kontrol Paneli
sidebar_position: 2
slug: /features-usage/dashboard
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Kontrol Paneli işletmenizi tek bakışta gösterir: rezervasyon rakamları, henüz tahsil edilmemiş tutarlar, önümüzdeki yedi gün ve hızlı kısayollar. **MHM Rentiva > Başlangıç ekranı** altından ulaşılır. Sayfa başlığı "Başlangıç ekranı", alt başlığı "MHM Rentiva · Genel bakış" olarak görünür.

<div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', backgroundColor: '#f9fafb', textAlign: 'center', margin: '20px 0' }}>
  <p style={{ margin: 0, color: '#6b7280', fontWeight: 'bold' }}>🖼️ GÖRSEL: BAŞLANGIÇ EKRANI</p>
  <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#9ca3af' }}>mhm-rentiva-dashboard-calendar-view</p>
</div>

---

## 📊 Özet Kartları

Üstte dört kart yer alır. Tüm zamanların rakamını, bu ayın rakamını ve geçen aya göre değişimi gösterir:

- **Toplam rezervasyon:** iptal edilen ve iade edilenler hariç tüm rezervasyonlar; yanında bu ayın sayısı.
- **Rezervasyon tutarı:** onaylı, devam eden ve tamamlanan rezervasyonların fiyatı. Bu, rezerve edilen tutardır; tahsilat değildir. Henüz ödenmemiş tutar **Ödemeler** kutusundadır.
- **Aktif araçlar:** şu anda aktif olan araçlar, toplam araç sayınızdan.
- **Bu ay kiralayan:** bu ay rezervasyon yapan farklı müşteri sayısı (iptal ve iade edilen rezervasyonlar sayılmaz).

:::info 6.4.0'da değişti
İptal edilen ve iade edilen rezervasyonlar artık **Toplam rezervasyon**, bu ayın sayısı ve **Bu ay kiralayan** içinde sayılmaz; **Rezervasyon durumları** kutusunda görünür. "Toplam gelir" kartı **Rezervasyon tutarı** oldu ve sağ üstteki çalışmayan "Son 30 gün" seçicisi kaldırıldı.
:::

---

## 📈 Grafik ve Listeler

- **Yeni rezervasyon tutarı (son 7 gün):** son yedi günün günlük rezerve edilen tutarını gösteren çubuk grafik; toplamı **Bu hafta:** satırında. Günler kiralama tarihine göre değil, rezervasyonun oluşturulduğu tarihe göre sayılır.
- **Son rezervasyonlar:** en yeni oluşturulan önce olmak üzere son rezervasyonlar; Araç, Müşteri, Tarih, Tutar ve Durum sütunları ile **← Önceki / Sonraki →** sayfalama.
- **Yaklaşan işlemler:** önümüzdeki 7 gün içinde başlayacak kiralamalar (araç, plaka, alış → dönüş tarihleri, müşteri ve durum) ve transferler (Pro). Yoksa "Önümüzdeki 7 gün içinde yaklaşan işlem yok." yazar.
- **Rezervasyon durumları:** her durumdaki rezervasyon sayısı; iptal edilen ve iade edilenler dahil.
- **Ödemeler:** iki rakam.
  - **Bekleyen ödeme:** rezervasyonların henüz borçlu olduğu tutar; rezervasyon listesinin **Ödeme** sütunuyla aynı okunur: kaporadan kalan bakiye, hiç ödenmemiş rezervasyonlar (çevrim dışı kayıtlar dahil) ve ödeme bekleyenler. İptal edilen, iade edilen ve tamamı ödenmiş rezervasyonlar borç sayılmaz.
  - **Kapora (bloke):** kapora olarak alınmış, onaylı ve devam eden rezervasyonların kaporaları.

---

## ⚡ Hızlı İşlemler

**Yeni rezervasyon ekle**, **Tüm rezervasyonlar**, **Yeni araç ekle**, **Tüm araçlar**, **Ayarlar**, **Müşteriler** ve **Ek hizmetler** kısayolları. Rentiva Pro kendi ekranlarına (Raporlar, Bayiler, Mesajlar, Dışa aktarma) kısayol ekler; her biri yalnızca lisansınız o özelliği içeriyorsa görünür.

---

## Lite ve Pro

Panodaki her kutu Lite'ta çalışır. Hiçbir kutu Pro'ya ayrılmamıştır.

---

### Bölüm Özeti
- Kartlar ve kutular **rezerve edileni** sayar; **Bekleyen ödeme** henüz tahsil edilmemiş tutarı gösterir.
- İptal ve iade edilen rezervasyonlar toplamlara girmez, **Rezervasyon durumları** altında görünür.
- Eklentiyi kurduktan sonra ilk gördüğünüz ekran budur.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 18.11.2026 | 6.4.0 | Başlangıç ekranı güncel hâline göre yeniden yazıldı: Rezervasyon tutarı kartı, iptallerin sayılmaması, kapora bakiyelerini ve ödenmemiş çevrim dışı kayıtları sayan Bekleyen ödeme, en yeni oluşturulan önce sıralama, "Son 30 gün" seçicisinin kalkması. |
| 09.11.2026 | 6.3.1 | Düzeltme: Gelir Grafiği ve Yaklaşan İşlemler yalnız Pro değildir; tüm pano parçaları Lite'ta çalışır. Pro'nun hızlı kısayolları eklendi. |
| 10.05.2026 | 4.36.0 | Tam React SPA geçişi. Eski PHP parçaları kaldırıldı. |
| 19.03.2026 | 4.6.3 | Pano rehberi gerçek arayüz metrikleriyle güncellendi. |
