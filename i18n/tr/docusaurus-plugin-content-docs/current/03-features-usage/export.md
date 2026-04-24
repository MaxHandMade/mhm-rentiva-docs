---
id: export
title: Dışa Aktarım
sidebar_position: 13
slug: /features-usage/export
---
![Version](https://img.shields.io/badge/version-4.23.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.03.2026-orange?style=flat-square)

Dışa Aktar aracı, kiralama verilerinizi analiz, muhasebe veya yedekleme amacıyla farklı formatlarda sistem dışına almanızı sağlar. **MHM Rentiva > Dışa Aktar** menüsü üzerinden kapsamlı veri ihracatı yapabilirsiniz.

---

## 📂 Veri İhracat Modülleri

Sistem, verileri amacına göre 4 farklı kategoride sunar:

1.  **Rezervasyonların Dışa Aktarılması:** Müşteri bilgileri, kiralama detayları ve durumlarını içerir. (Format: **CSV**, **JSON**)
2.  **Ödeme Günlükleri Dışa Aktarma:** Muhasebe ve finansal analiz için ödeme işlemlerini raporlar. (Format: **CSV**, **JSON**)
3.  **Araç İhracı:** Araç envanteri, özellikleri ve fiyatlandırma ölçütlerini dışa aktarır. (Format: **CSV**, **JSON**)
4.  **Raporları Dışa Aktar:** Gelir, müşteri ve araç performans özetlerini içeren analiz raporlarına yönlendirir.

---

## ⚙️ Gelişmiş Dışa Aktarım Filtreleri

İhracat yapmadan önce veriyi daraltmak ve sadece ihtiyacınız olan seti almak için gelişmiş filtreleri kullanabilirsiniz:

- **Tarih Aralığı:** Sadece belirli bir zaman dilimine ait (Bugün, Bu Ay vb.) kayıtları seçin.
- **Rezervasyon ve Ödeme Durumu:** Sadece "Tamamlandı" veya "Ödendi" gibi spesifik durumlardaki kayıtları filtreleyin.
- **Ödeme Ağ Geçidi:** Belirli ödeme yöntemleriyle (Nakit, Kredi Kartı vb.) yapılmış işlemleri ayırın.
- **Miktar Aralığı (Min/Max):** Belirli bir fiyat aralığındaki (Örn: 5.000 TL - 20.000 TL) rezervasyonları hedefleyin.

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>📸 GÖRSEL: DIŞA AKTARIM PANELİ VE FİLTRELEME</strong><br/>
  <em>mhm-rentiva-export-filters-history</em>
</div>

---

## 📜 Dışa Aktar Geçmişi

Sistem, yapılan her ihracat etkinliğini kayıt altında tutar:
- **Biçim ve Kayıt Sayısı:** İhracatın hangi formatta (CSV/JSON) yapıldığı ve kaç adet satır/kayıt içerdiği.
- **Durum:** İşlemin "TAMAMLANDI" olup olmadığı takibi.
- **Detaylar:** Geçmiş bir dışa aktarımın hangi filtrelerle yapıldığını inceleyebilirsiniz.

---

## v4.23.0 Dışa Aktarım Düzeltmeleri

Bu sürümde dışa aktarım modülünde 4 kritik hata düzeltilmiştir:

1. **Ödeme Günlükleri post_type hatası:** Dışa aktarım formu `mhm_payment_log` gönderiyordu ancak gerçek CPT `mhm_app_log` idi. "Geçersiz dışa aktarım türü" hatası giderildi.
2. **Kayıt sayısı 0 hatası:** `no_found_rows => true` query parametresi `found_posts` değerinin daima 0 dönmesine neden oluyordu. Sayım sorgusu ayrı bir override ile düzeltildi.
3. **Geçmiş silme:** Dışa aktarım geçmişi silme işlemi placeholder kodda kalmıştı ve çalışmıyordu. Transient tabanlı doğrudan silme mekanizması eklendi.
4. **Araç CSV/JSON PHP 8 hatası:** `get_status_label()` fonksiyonuna yanlış parametre tipi (int yerine string) gönderiliyordu. PHP 8 strict types ile fatal error oluşuyordu.

---

### Bölüm Özeti
- **CSV ve JSON** desteği ile verilerinizi üçüncü taraf yazılımlara taşıyın.
- **Miktar Bazlı Filtrelemesi** ile finansal segmentasyon yapın.
- **İhracat Geçmişi** ile geçmiş veri setlerinizi denetleyin.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 26.03.2026 | 4.23.0 | 4 kritik dışa aktarım hatası düzeltildi (post_type, kayıt sayısı, geçmiş silme, PHP 8 tip hatası). |
| 19.03.2026 | 4.21.2 | Dışa aktarma modülleri, filtreleme seçenekleri ve ihracat geçmişi gerçek arayüze göre açıklandı. |
| 26.02.2026 | 4.21.0 | İlk sürüm oluşturuldu. |

