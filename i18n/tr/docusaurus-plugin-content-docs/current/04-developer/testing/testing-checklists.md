---
id: testing-checklists
title: Test Kontrol Listeleri (Checklists)
sidebar_label: Test Listeleri
sidebar_position: 3
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
Bu sayfa, yeni bir özellik geliştirildiğinde veya sürüm yayınlanmadan önce tamamlanması gereken kritik kontrol listelerini içerir.
:::

# ✅ Test Kontrol Listeleri

Otomatik testlerin ötesinde, sistem bütünlüğünü korumak için aşağıdaki kontrol listelerinin manuel veya yarı-otomatik olarak koşturulması zorunludur.

---

## 🛠️ Geliştirme Süreci (Lokal Kontrol)

Kodun test ortamına (Staging) gönderilmeden önceki son katmanıdır:
- [ ] **Strict Typing:** Tüm yeni PHP dosyalarında `declare(strict_types=1);` var mı?
- [ ] **Sanitization:** Tüm `$_POST` ve `$_GET` verileri sanitize edildi mi?
- [ ] **Escaping:** Tüm HTML çıktıları `esc_html` veya `wp_kses` ile süzüldü mü?
- [ ] **i18n:** Tüm kullanıcıya bakan metinler `mhm-rentiva` text domain ile işaretlendi mi?

---

## 💰 Finansal & Senaryo Testleri

Finansal katmanı etkileyen değişikliklerde şu senaryolar doğrulanmalıdır:
- [ ] **Ledger Integrity:** İşlem sonrası bakiye `Ledger` üzerinde doğru yansıdı mı?
- [ ] **Dual Approval:** Maker-Checker prensibi çalışıyor mu? (Kendi işlemini onaylama engeli).
- [ ] **CSV Export:** Ödeme listesi Excel uyumlu (UTF-8 BOM) dışa aktarılabiliyor mu?
- [ ] **Negative Flow:** Yetersiz bakiye veya geçersiz tarih hataları yakalanıyor mu?

---

## 🚀 Canlıya Alım Öncesi (Release Checklist)

Ana sürümlerden (Minor/Major) önce tamamlanması gereken adımlar:
- [ ] **Migration Check:** Yeni tablolar veya kolonlar için SQL migration'ları (up/down) hazır mı?
- [ ] **Cache Flush:** `CacheManager` üzerinden eski transient'ler temizlendi mi?
- [ ] **Shortcode Audit:** Tüm frontend kısa kodları (`[rentiva_...]`) doğru render ediliyor mu?
- [ ] **Rate Limit:** API uç noktalarında rate limiting aktif mi?

---

## 📱 UI/UX Kalite Kontrolü

- [ ] **Responsive Design:** Elementor widget'ları mobil ve tablet modunda düzgün mü?
- [ ] **Date Picker:** Takvim seçimi tüm tarayıcılarda (Chrome, Safari, Firefox) çalışıyor mu?
- [ ] **Error UI:** Form hata mesajları kullanıcıyı doğru yönlendiriyor mu?

## Bölüm Sonu Özeti
- Kontrol listeleri, sistemin operasyonel kalitesini garanti eder.
- Finansal maddelerin tamamlanması **opsiyonel değildir**.
- Her kontrol listesi tamamlandıktan sonra `Sprint Report` içinde belgelenir.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | Sayfa, teknik borç ve finansal stres testi maddeleriyle güncellendi. |

