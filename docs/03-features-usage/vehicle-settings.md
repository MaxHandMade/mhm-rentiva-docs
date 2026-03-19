---
id: vehicle-settings-usage
title: Global Araç Ayarları
sidebar_label: Araç Ayarları
sidebar_position: 5
slug: /features-usage/vehicle-settings
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-18.03.2026-orange?style=flat-square)

Global Araç Ayarları, sistemdeki tüm araçların ortak davranışlarını, görüntülenecek veri alanlarını ve teknik donanım listelerini yönetmenizi sağlar. **MHM Rentiva > Araç Ayarları** menüsünden ulaşılır.

---

## 🛠️ Alan Tanımları (Field Definitions)

Bu sekme, aracın teknik kimliğini oluşturan tüm veri alanlarının merkezi yönetim noktasıdır.

### 1. Araç Detayları
Sistemde ön tanımlı gelen **Günlük Fiyat, Model Yılı, Plaka, Marka, Model, Depozito** gibi alanların isimlerini buradan "İsimleri Düzenle" butonu ile Türkçeleştirebilir veya değiştirebilirsiniz.
- **Özel Ayrıntı Ekle:** Standart alanlar dışında (Örn: "Hasar Kaydı", "Kasko Türü") yeni veri alanlarını Metin veya Sayı formatında ekleyebilirsiniz.

### 2. Araç Özellikleri (Vehicle Features)
Klima, ABS, Bluetooth gibi konfor ve güvenlik donanımlarıdır. "Özel özellik adı" kutusundan listenize yeni donanımlar ekleyebilirsiniz.

### 3. Araç Ekipmanları (Equipment)
Yedek Lastik, İlk Yardım Çantası gibi fiziksel donanımlar burada tanımlanır.

---

## ⚙️ Görüntüleme Seçenekleri (Display Options)

Tanımladığınız alanların frontend (ön yüz) tarafında nerede ve nasıl görüneceğini bu sekmeden kontrol edersiniz.

### 🖼️ Görünür Kart Öğeleri (Drag & Drop)
Arama sonuçlarında ve araç listeleme kartlarında (Grid/List) hangi teknik verilerin görüneceğini sürükle-bırak yöntemiyle belirleyin.
- **Sıralama:** Öğeleri yukarı-aşağı kaydırarak öncelik sırasını değiştirebilirsiniz (Örn: Önce Yakıt Tipi, sonra Vites).
- **Gizleme:** Kartta görünmesini istemediğiniz öğeyi sağ sütuna (Uygun Öğeler) bırakarak pasif hale getirin.

### 🌟 Araç Detayları Öne Çıkan Özellikler
Araç sayfasının üst kısmında, müşterinin ilk bakışta görmesini istediğiniz en önemli 4-5 özelliği (Örn: Koltuk Sayısı, Vites, Klima) buradan seçebilirsiniz.

### 📊 Araç Karşılaştırma Tablosu Ayarları
Müşterileriniz birden fazla aracı kıyaslarken, karşılaştırma tablosunda hangi Detay, Özellik ve Ekipmanların döküleceğini checklist üzerinden seçebilirsiniz.
- **Toplu İşlemler:** "Tümünü Seç" ile tüm donanımları karşılaştırma tablosuna dahil edebilirsiniz.

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>📸 GÖRSEL: GÖRÜNTÜLEME VE KART AYARLARI</strong><br/>
  <em>mhm-rentiva-display-options-drag-drop</em>
</div>

---

### Bölüm Özeti
- **Alan Tanımları** ile veri tabanını yapılandırın.
- **Görüntüleme Seçenekleri** ile tasarımı ve kullanıcı deneyimini optimize edin.
- **Sürükle-Bırak** arayüzü ile kod yazmadan liste görünümlerini özelleştirin.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 19.03.2026 | 4.21.2 | Görüntüleme Seçenekleri ve Sürükle-Bırak ayarları gerçek arayüze göre detaylandırıldı. |
| 26.02.2026 | 4.21.0 | İlk sürüm oluşturuldu. |

