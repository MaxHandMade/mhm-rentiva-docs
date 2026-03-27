---
id: customers
title: Müşteri Yönetimi
sidebar_label: Müşteriler
sidebar_position: 10
slug: /features-usage/customers
---
![Version](https://img.shields.io/badge/version-4.23.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-27.03.2026-orange?style=flat-square)

Müşteri Yönetimi, sadık müşteri kitlesi oluşturmak ve rezervasyon geçmişini takip etmek için kullanılan merkezi bölümdür. **MHM Rentiva > Müşteriler** menüsü üzerinden tüm müşteri veritabanına erişebilirsiniz.

---

## 📊 Müşteri Analitigi (Top Metrics)

Sayfanin ust kisminda, müşteri tabaninizin buyumesini ve aktifligini gosteren 4 ana kart yer alir:

:::info Lite Bildirim Konumu (v4.22.2)
Lite sürümde gosterilen limit bildirimi artik KPI kartlarinin **altında**, liste baslamadan **once** konumlandirmistir. Bu standartlastirma `VehicleColumns`, `BookingColumns`, `CustomersPage` ve `TransferAdmin` için geçerlidir.
:::

- **Toplam Müşteri:** Sisteme kayıtlı tüm kullanıcıların sayısı.
- **Aktif Müşteriler:** Son 30 gün içinde rezervasyon yapmış veya sisteme giriş yapmış kullanıcılar.
- **Bu Ayın Yenilikleri (Yeni):** İçinde bulunulan ay içerisinde sisteme kayıt olan yeni müşteri sayısı.
- **Aylık Ortalama Müşteri Sayısı:** Aylık kayıt trendinin bir önceki aya göre değişim oranı (%).

---

## 🗓️ Müşteri Aktivite Takvimi

Müşteriler sayfasında yer alan takvim, günlük bazda müşteri etkileşimlerini (yeni kayıtlar veya aktivite yoğunluğu) görselleştirir. Bu sayede hangi günlerde müşteri trafiğinin yoğunlaştığını tek bakışta görebilirsiniz.

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>📸 GÖRSEL: MÜŞTERİ LİSTESİ VE ANALİZ PANELİ</strong><br/>
  <em>mhm-rentiva-customer-list-analytics</em>
</div>

---

## 👥 Müşteri Listesi ve Finansal Özet

Müşteri tablosu, her bir kullanıcının işletmeniz için değerini (LTV - Lifetime Value) ölçmenizi sağlar:

- **Rezervasyonlar:** Müşterinin toplamda kaç adet kiralama/transfer işlemi yaptığı.
- **Toplam Harcama:** Müşterinin tüm işlemlerinden elde edilen toplam ciro (Para Birimi ile).
- **Son Rezervasyon:** En son hangi tarihte işlem yaptığı.
- **Kayıt Tarihi:** Sisteme ilk giriş yaptığı tarih.

---

## ➕ Yeni Müşteri Tanımlama

Operasyonel hız için manuel müşteri kaydı açma ekranı basitleştirilmiştir. **"Yeni Müşteri Ekleyin"** butonu ile şu verileri girebilirsiniz:

- **Müşteri Adı:** (Zorunlu)
- **E-posta:** (Zorunlu) - Sistemdeki benzersiz kimliktir.
- **Telefon:** İletişim amaçlı.
- **Adres:** Faturalandırma veya teslimat noktası belirleme için temel adres bilgisi.

---

### Bölüm Özeti
- **Analitik Kartları** ile müşteri büyümesini izleyin.
- **Toplam Harcama** sütunu ile VIP müşterilerinizi belirleyin.
- **Merkezi Veritabanı** ile tüm rezervasyonları müşteri üzerinden ilişkilendirin.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 27.03.2026 | 4.23.0 | Lite bildirim konumu (KPI kartlari altında) dokumante edildi. |
| 19.03.2026 | 4.21.2 | Müşteri listesi, analiz kartlari ve kayıt formu gerçek arayuze gore güncellendi. |
| 26.02.2026 | 4.21.0 | İlk sürüm oluşturuldu. |

