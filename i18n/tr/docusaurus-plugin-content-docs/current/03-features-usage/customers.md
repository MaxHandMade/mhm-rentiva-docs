---
id: customers
title: Müşteri Yönetimi
sidebar_label: Müşteriler
sidebar_position: 10
slug: /features-usage/customers
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info React SPA (v4.39.0'dan beri)
Müşteriler sayfası v4.39.0 sürümünde, REST API ile desteklenen tam bir **React SPA**'ya taşındı. Eski `CustomersListTable.php`, `CustomersListPage.php`, `customers.js` ve ilgili CSS dosyaları silindi. Sayfa artık canlı arama, sıralanabilir sütunlar, kayan detay paneli ve toplu silme ile anında yükleniyor — tamamı sayfa yenilemesi olmadan.
:::

Müşteri Yönetimi, sadık müşteri kitlesi oluşturmak ve rezervasyon geçmişini takip etmek için kullanılan merkezi bölümdür. **MHM Rentiva > Müşteriler** menüsü üzerinden tüm müşteri veritabanına erişebilirsiniz.

---

## 📊 Müşteri Analitiği (Üst Metrikler)

Sayfanın üst kısmında, müşteri tabanınızın büyümesini ve aktifliğini gösteren dört kart yer alır:

:::info Müşteri sınırı yok
Lite'ta müşteri sayısında sınır yoktur; bu yüzden bu ekranda sınır bildirimi de yoktur.
:::

- **Toplam müşteri:** Sistemdeki tüm müşterilerin sayısı.
- **Bu ay yeni:** Son 30 gün içinde kayıt olan müşteri sayısı.
- **Aktif müşteriler:** Son 90 günde rezervasyonu olan müşteriler.
- **Ort. harcama:** Müşteri başına ortalama harcama.

---

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>📸 GÖRSEL: MÜŞTERİ LİSTESİ VE ANALİZ PANELİ</strong><br/>
  <em>mhm-rentiva-customer-list-analytics</em>
</div>

---

## 👥 Müşteri Listesi ve Finansal Özet

Müşteri tablosu, her bir kullanıcının işletmeniz için değerini (LTV - Lifetime Value) ölçmenizi sağlar:

Sütunlar: **Müşteri** (ad ve e-posta), **Telefon**, **Rezervasyonlar**, **Toplam harcama** ve **Durum** (VIP, Yeni ya da Aktif). Listeyi daraltmak için tablonun üstündeki **Tümü / Aktif / Yeni / VIP** süzgecini kullanın.

- **Rezervasyonlar:** Müşterinin toplamda kaç adet kiralama/transfer işlemi yaptığı.
- **Toplam harcama:** Müşterinin tüm işlemlerinden elde edilen toplam ciro (para birimi ile).

---

## ➕ Yeni Müşteri Tanımlama

Operasyonel hız için manuel müşteri kaydı açma ekranı basitleştirilmiştir. **"Müşteri ekle"** butonu ile şu verileri girebilirsiniz:

- **Müşteri Adı:** (Zorunlu)
- **E-posta:** (Zorunlu) - Sistemdeki benzersiz kimliktir.
- **Telefon:** İletişim amaçlı.
- **Adres:** Faturalandırma veya teslimat noktası belirleme için temel adres bilgisi.

---

## 🖱️ Müşteri Detay Kayan Paneli (v4.39.0+)

Müşteri tablosundaki herhangi bir satıra tıklayarak sayfa yenilemesi olmadan **kayan bir detay paneli** açabilirsiniz:

- **Ad, E-posta, Telefon, Adres**
- **Kayıt tarihi**
- **Toplam Rezervasyon** ve **Toplam Harcama**
- **İlk / Son Rezervasyon** tarihleri
- Hızlı bağlantılar: **Müşteriyi Düzenle**, **Rezervasyonları Gör**

Paneli kapatmak için **Escape**'e basın veya panelin dışına tıklayın.

---

## 🔍 Canlı Arama ve Sütun Sıralama (v4.39.0+)

- **Canlı arama:** 300 ms debounce — sayfa yenilemesi yok.
- **Sıralanabilir sütunlar:** **Müşteri**, **Rezervasyonlar** ve **Toplam harcama**. Sütun başlığındaki düğmeyi kullanın: ilk tıklama en büyükten başlar (azalan), aynı sütuna ikinci tıklama sırayı tersine çevirir. Sıralanan sütun ekran okuyucuya duyurulur.
- **Tümünü seç:** Yalnız bazı satırlar seçiliyken tümünü seç kutusu çizgili (karışık) görünür, seçili satırlar açık mavi boyanır. Sıralamayı değiştirmek seçimi temizler.
- **Toplu silme:** Onay kutusuyla satırları seçin, "Seçilenleri Sil"e tıklayın. Tarayıcı onay koruması yanlışlıkla silmeyi önler.
- **CSV Dışa Aktar:** Tüm müşterileri (sayfalı) veya yalnızca seçili ID'leri indirir. İşlem admin-post.php üzerinden sunucu tarafında işlenir.

---

## React Bileşenleri (v4.39.0+)

| Bileşen | Amaç |
| :--- | :--- |
| `StatsCards` | Sayfa üstünde dört KPI gradyan kartı |
| `SearchBar` | Debounce'lu canlı arama girdisi |
| `FilterBar` | Durum / segment filtre kontrolleri |
| `CustomerTable` | Sıralanabilir sayfalandırılmış tablo |
| `CustomerPanel` | Kayan detay paneli |
| `Pagination` | Sayfa navigasyon kontrolleri |

**REST Uç Noktaları:**
- `GET /wp-json/mhm-rentiva/v1/customers` — sayfalandırma, arama, sıralama
- `GET /wp-json/mhm-rentiva/v1/customers/{id}` — detay
- `DELETE /wp-json/mhm-rentiva/v1/customers/bulk` — toplu silme

Tüm uç noktalar `manage_options` yetkisi gerektirir.

---

### Bölüm Özeti
- **Analitik Kartları** ile müşteri büyümesini izleyin.
- **Toplam Harcama** sütunu ile VIP müşterilerinizi belirleyin.
- **Kayan Panel** ile müşteri detaylarını anında görüntüleyin (sayfa yenilemesi yok).
- **Merkezi Veritabanı** ile tüm rezervasyonları müşteri üzerinden ilişkilendirin.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 18.11.2026 | 6.4.0 | Müşteriler tablosunda sütun başlığından sıralama ve ekran okuyucu duyurusu, karışık tümünü seç işareti ve boyalı seçili satırlar belgelendi; kartlar, sütunlar ve süzgeç güncel ekrana göre düzeltildi. |
| 09.11.2026 | 6.3.1 | Düzeltme: "Lite sınır bildirimi" kutusu kaldırıldı. Lite'ta müşteri sınırı yok, sınır bildirimi de gösterilmez. |
| 11.05.2026 | 4.39.0 | Tam React SPA geçişi. Canlı arama, sıralanabilir sütunlar, kayan panel, toplu silme, CSV dışa aktarma. Eski PHP liste tablosu + jQuery kaldırıldı. |
| 27.03.2026 | 4.23.0 | Lite bildirim konumu (KPI kartlari altında) dokumante edildi. |
| 19.03.2026 | 4.21.2 | Müşteri listesi, analiz kartları ve kayıt formu gerçek arayüze göre güncellendi. |
| 26.02.2026 | 4.21.0 | İlk sürüm oluşturuldu. |

