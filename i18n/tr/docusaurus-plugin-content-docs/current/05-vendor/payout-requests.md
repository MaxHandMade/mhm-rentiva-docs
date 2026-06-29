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

## 📄 Hakediş Makbuzları (v4.61.0)

Bir ödemeyi onayladığınızda sistem, o ödemenin kapsadığı döneme ait bir **hakediş makbuzu** otomatik olarak oluşturur. Makbuz **sıra numaralıdır** (ör. `MKB-2026-0001`) ve onay anında **değiştirilemez bir kayıt** olarak dondurulur — sonradan asla yeniden yazılmaz, böylece her zaman bayinin ödendiği andaki rakamları yansıtır.

Makbuz, dönemdeki tüm defter hareketlerini — hakedişleri ve varsa cezaları — dönem toplamları ve ödenen tutarla birlikte listeler. Bayi, panelinden görüntüleyip yazdırabileceği bir bağlantıyı içeren bir **e-posta**yı otomatik olarak alır.

### Nereden bulunur

- **Yönetici:** makbuz numarası ve bir **Görüntüle** bağlantısı, onaylanan ödemenin yanında **All Payout Requests** listesinde görünür.
- **Bayi:** makbuz, bayinin ödeme geçmişinde yer alır ve e-posta doğrudan ona bağlanır (panelde bayinin kendi oturumundan açılır).

### Komisyon dökümü

Makbuzdaki her hakediş satırı tam dökümü gösterir; böylece bayi, netinin tam olarak nasıl hesaplandığını görür:

| Sütun | Anlamı |
| :--- | :--- |
| **Brüt** | Komisyon öncesi toplam rezervasyon tutarı. |
| **Komisyon** | Platformun oranı ve kesilen tutar (ör. `%20 · 400,00`). |
| **Net** | Bayinin gerçekte kazandığı tutar (Brüt − Komisyon). |

Döneme ait bir **"Toplam komisyon kesintisi"** satırı, makbuzdaki tüm hakedişlerin komisyonunu toplar. Ceza ve iade satırları Brüt/Komisyon için "—" gösterir (komisyon taşımazlar). **v4.61.0'dan önce** oluşturulmuş makbuzlar bu ayrıntıyla kaydedilmemişti ve yalnızca net tutarı gösterir.

### Makbuz markalama

Makbuz firma kimliğinizi taşır. **Ayarlar → Vendor Marketplace → Makbuz Markalama** altında şunları ayarlayabilirsiniz:

- Firma adı, adres, vergi dairesi ve vergi numarası, telefon ve e-posta
- Bir firma **logosu**
- Özel bir **dipnot** (ör. yasal bir ibare)

Markalama, makbuz **görüntülendiğinde** uygulanır; dolayısıyla bu ayarları güncellemek, halihazırda oluşturulmuş olanlar dahil her makbuza anında yansır.

---

## 🛠️ Teknik Altyapı

Tüm kazanç logları `mhm_rentiva_vendor_transactions` tablosunda atomik olarak saklanır. Bir rezervasyon iptal edildiğinde vendor hanesine borç (Debit) olarak yansıtılır. Makbuzlar, onaylanan ödeme kaydında değiştirilemez bir anlık görüntü olarak saklanır ve talep üzerine oluşturulur.

---

### Bölüm Özeti
- **Payout**, vendorların hakkedişlerini yöneten sistemdir.
- **Bakiye takibi** her rezervasyon sonrası otomatik güncellenir.
- **Talepler** yönetici onayıyla finalize edilir.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 29.06.2026 | 4.61.0 | Hakediş makbuzları (numaralı, yazdırılabilir), komisyon dökümü ve makbuz markalama dokümante edildi. |
| 18.03.2026 | 4.21.2 | Yeni döküman oluşturuldu. |
