---
id: payout-requests
title: Ödeme Talepleri (Payout Requests)
sidebar_label: Payout Talepleri
sidebar_position: 1
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Vendor (Tedarikçi) ekosistemi aktif olduğunda, vendorların kazandığı kiralama bedellerinin onlara aktarılması süreci **MHM Rentiva > All Payout Requests** menüsünden yönetilir.

---

## 📅 Ödeme Talep Akışı

Vendor kazancı, müşterinin ödemesi onaylandıktan sonra hesaba (Balance) geçer. Süreç şu şekilde işler:
1. **Talep Oluşturma:** Vendor, panelinden bir ödeme talebi oluşturur (Payout Request).
2. **Yönetici İncelemesi:** Yönetici bekleyen talepleri listeden görür.
3. **Onay ve Ödeme:** Belirlenen banka veya ödeme kanalı üzerinden fiziksel para gönderimi yapılır.
4. **Statü Güncelleme:** Ödeme bittiğinde talep "Paid" (Ödendi) olarak işaretlenir.

---

## 🏧 Kazanç Hesaplama Parametreleri

Sistem şu kalemleri hesaba katar:
- **Toplam Kirası:** Aracın net kiralama bedeli.
- **Platform Komisyonu:** Yöneticiye kalan pay.
- **Ekstra Gelirler:** Sigorta, çocuk koltuğu vb. servislerden gelen ekstralar.

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>📸 Görsel Bekleniyor: Payout Talep Listesi</strong><br/>
  <em>Buraya MHM Rentiva payout yönetim ekranı gelecek.</em>
</div>

---

## 🛠️ Teknik Altyapı

Tüm kazanç logları `mhm_rentiva_vendor_transactions` tablosunda atomik olarak saklanır. Bir rezervasyon iptal edildiğinde vendor hanesine borç (Debit) olarak yansıtılır.

---

### Bölüm Özeti
- **Payout**, vendorların hakkedişlerini yöneten sistemdir.
- **Bakiye takibi** her rezervasyon sonrası otomatik güncellenir.
- **Talepler** yönetici onayıyla finalize edilir.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 18.03.2026 | 4.21.2 | Yeni döküman oluşturuldu. |
