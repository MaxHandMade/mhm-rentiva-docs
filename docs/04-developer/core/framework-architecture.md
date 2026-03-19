---
id: framework-architecture
title: Kiralama Framework Mimarisi (Leasing Framework)
sidebar_label: Mimari ve Özelleştirme
sidebar_position: 2
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, MHM Rentiva'nın kiralama varlık modelini nasıl yönettiğini, Lite/Pro sürümleri arasındaki teknik farkları ve esnek nitelik (Attribute) sistemini açıklar.
:::

# 🏗️ Kiralama Framework Mimarisi

MHM Rentiva, sadece bir araç kiralama eklentisi değil; otomobil, bisiklet, tekne veya benzeri kiralık varlıklar için özelleştirilebilen esnek bir **Kiralama Framework'üdür**.

## 🛠️ Modüler Mimari (Lite vs Pro)

Sistem mimarisi, `MHMRentiva\Admin\Licensing\Mode` sınıfı üzerinden yönetilen bir yetkilendirme katmanına sahiptir.

### 📊 Versiyon Kısıtlamaları ve Kapasite
Aşağıdaki tablo, sistemin çekirdek kapasite limitlerini gösterir:

| Özellik | Lite (Ücretsiz) | Pro (Premium) |
| :--- | :--- | :--- |
| **Maksimum Araç** | 3 Adet | Limitsiz |
| **Aylık Rezervasyon** | 50 Adet | Limitsiz |
| **Müşteri Kaydı** | 3 Adet | Limitsiz |
| **Galeri Görseli** | 3 Adet / Araç | Limitsiz |
| **VIP Transfer** | 3 Güzergah | Limitsiz |

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
| 19.03.2026 | 4.21.2 | Sayfa, Lite/Pro limitleri ve güncel mimari detaylarıyla güncellendi. |
