---
id: framework-architecture
title: Kiralama Framework Mimarisi (Leasing Framework)
sidebar_label: Mimari ve Özelleştirme
sidebar_position: 2
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
Bu sayfa, MHM Rentiva'nın kiralama varlık modelini nasıl yönettiğini, Lite/Pro sürümleri arasındaki teknik farkları ve esnek nitelik (Attribute) sistemini açıklar.
:::

# 🏗️ Kiralama Framework Mimarisi

MHM Rentiva, sadece bir araç kiralama eklentisi değil; otomobil, bisiklet, tekne veya benzeri kiralık varlıklar için özelleştirilebilen esnek bir **Kiralama Framework'üdür**.

## 🛠️ Modüler Mimari (Lite vs Pro)

Lite'ta lisans katmanı yoktur. Eski `MHMRentiva\Admin\Licensing\Mode` sınıfı 5.2.0'da Lite'tan kaldırıldı, onunla birlikte bütün kapasite sınırları da gitti: Lite'ta **araç, rezervasyon, müşteri, galeri ya da ek hizmet sınırı yoktur**.

Lisanslama yalnız Rentiva Pro eklentisinde yaşar. Pro, her modülünü kaydetmeden önce kendi kapısı `MHMRentiva\Pro\Edition` sınıfına sorar.

### 📊 Pro lisans özellikleri
| Pro modülü | Kapı |
| :--- | :--- |
| Bayi pazaryeri, bayi ödemeleri, bayi raporları, ilan yaşam döngüsü | `Edition::canUseVendorMarketplace()` (lisans özelliği `vendor_marketplace`) |
| Mesajlar | `Edition::canUseMessages()` (`messaging`) |
| Raporlar | `Edition::canUseAdvancedReports()` (`advanced_reports`) |
| Genişletilmiş Dışa Aktarım (CSV ve JSON) | `Edition::canUseExport()` (`export`) |
| GDPR araçları | `Edition::canUseGdpr()` (`gdpr_tools`) |
| VIP Transfer | `Edition::isPro()` (herhangi bir etkin lisans) |

Lisans sunucusu `full_rest_api` ve `custom_emails` anahtarlarını da verir, ama kodda onları okuyan yer yoktur: hiçbir şeyin kilidini açmazlar.

---

## 🧬 Core vs Attributes Ayrımı

Platform, verileri operasyonel önceliğine göre iki ana gruba ayırır:

### 1. Çekirdek Alanlar (Core)
:::danger Silinemez / Devre Dışı Bırakılamaz
Bu alanlar sistemin fiyat hesaplama, rezervasyon ve faturalandırma motoru için zorunludur.
:::
- **Fiyatlandırma:** Günlük baz fiyat ve vergi oranları.
- **Müsaitlik:** Takvim tabanlı stok kontrolü.
- **Varlık Kimliği:** Plaka, seri numarası veya benzersiz ID.

### 2. Nitelik Alanlar (Attributes)
:::tip Özelleştirilebilir
İş modeline göre eklenebilir veya tamamen kaldırılabilir alanlardır.
:::
- **Vasıta Detayları:** Yakıt tipi, vites, koltuk sayısı.
- **Ekstra Parametreler:** `MHMRentiva\Core\Attribute\AllowlistRegistry` üzerinden yönetilen ve kısa kodlarda parametre olarak kullanılabilen alanlar.

---

## 🧩 Modül Esnekliği (Clean Slate)

Eklenti, **"Clean Slate" (Temiz Sayfa)** politikasını benimser. Bu sayede, ihtiyacınız olmayan özellikleri pasif hale getirerek arayüzü sadeleştirebilirsiniz:

- **Eklenti Ayarları:** `MHM Rentiva > Settings` altındaki sekmelerden kullanılmayan alanlar gizlenebilir.
- **UI Pipeline:** Bir alan gizlendiğinde, hem yönetim panelindeki (backend) formlardan hem de kullanıcı tarafındaki (frontend) teknik özellikler tablosundan otomatik olarak kaldırılır.

## Bölüm Sonu Özeti
- Sistem `Mode` sınıfı üzerinden limitleri denetler.
- **Pro** sürümü tüm teknik limitleri kaldırarak sınırsız ölçeklenme sağlar.
- Mimari, araç dışındaki kiralama modellerine de (teknik nitelikler değiştirilerek) uyum sağlar.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 09.11.2026 | 6.3.1 | Düzeltme: Lite kapasite tablosu (3 araç, 50 rezervasyon…) kaldırıldı; bu sınırlar ve `Mode` sınıfı 5.2.0'da Lite'tan çıktı. Yerine Pro `Edition` kapıları ve lisans özellikleri yazıldı. |
| 19.03.2026 | 4.21.2 | Sayfa, Lite/Pro limitleri ve güncel mimari detaylarıyla güncellendi. |
