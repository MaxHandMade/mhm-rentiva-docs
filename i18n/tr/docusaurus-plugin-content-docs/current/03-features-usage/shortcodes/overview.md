---
id: shortcodes-overview
title: Tüm Kısa Kodlar Listesi
sidebar_label: Tüm Kısa Kodlar Listesi
sidebar_position: 1
slug: /features-usage/shortcodes/overview
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Kısa Kod Sayfaları, MHM Rentiva'nın tüm frontend (ön yüz) fonksiyonlarını WordPress ile entegre eden mimarinin merkezidir. Sistemimizde aktif olarak görev yapan **24 adet kısa kod (shortcode)** bulunmaktadır. Bu araçları ister klasik (metin), ister sayfa oluşturucu entegrasyonlarıyla sitenizin her yerine konumlandırabilirsiniz.

---

## 🏗️ Gutenberg Blokları ve Elementor Desteği

MHM Rentiva, modern WordPress mimarisini benimsemektedir. Bu nedenle burada yer alan **24 listelenmiş kısa kod**, arka planda standart bir "Render Çıktısı" oluşturur.

- **Gutenberg Blokları:** Kısa kodların tamamı klasik editöre manuel eklemek zorunda kalmadan, Gutenberg editöründe yerel (native) bloklar halinde sürükle-bırak yöntemiyle kullanılabilir. Kısa kod parametreleri, sağ taraftaki blok ayarları (Inspector) penceresine yansıtılır.
- **Elementor Widget'leri:** Eklentinin kendi bileşenleri birer widget (araç) olarak Elementor panelinde yer alır. Elementor kullanırken kısa kod (`[rentiva_...]`) girmeksizin ilgili bileşeni ekleyip görsel ayarlarını yapabilirsiniz. 

Her iki kullanımda da arka plan (Render Parity) tek noktadan yani buradaki kısa kod altyapısından sağlanır.

---

## 📋 Aktif 24 Kısa Kod ve Kullanımları

Sistem, işlevlerine göre 6 ana kategoriye ayrılmış kısa kodlar sunar. Aşağıda kısa kodları ve parametre içeren örneklerini bulabilirsiniz.

### 1. Rezervasyon (Booking) Modülü
Kiralama akışını başlatmak ve bitirmek için kullanılan hayati kodlar:

**1. Rezervasyon Formu:** Kiralama tarihlerini, sigorta ve ek hizmetleri seçme formu.
*   **Kısa Kod:** `[rentiva_booking_form]`
*   **Temel Parametreler:** `vehicle_id`, `show_payment_options`, `show_addons`
*   **Örnek Kullanım:** `[rentiva_booking_form vehicle_id="101" show_payment_options="1" show_addons="1"]`

**2. Uygunluk Takvimi:** Aracın aylık veya günlük takvimini çizer.
*   **Kısa Kod:** `[rentiva_availability_calendar]`
*   **Temel Parametreler:** `vehicle_id`, `months_to_show`, `show_pricing`
*   **Örnek Kullanım:** `[rentiva_availability_calendar vehicle_id="101" months_to_show="2" show_pricing="1"]`

**3. Rezervasyon Onayı:** Ödeme ve rezervasyon detayı doğrulama sayfası.
*   **Kısa Kod:** `[rentiva_booking_confirmation]`
*   **Temel Parametreler:** `show_print_btn`, `show_download_pdf`
*   **Örnek Kullanım:** `[rentiva_booking_confirmation show_print_btn="1" show_download_pdf="1"]`

### 2. Araç (Vehicle) Listeleme & Arama Modülü
Müşterilerin araç filtreleme ve araç detay süreçlerini görselleştirir:

**4. Araç Detayları:** Tekil bir aracın tüm özelliklerini listeler.
*   **Kısa Kod:** `[rentiva_vehicle_details]`
*   **Temel Parametreler:** `vehicle_id`, `show_gallery`, `show_features`, `show_similar_vehicles`
*   **Örnek Kullanım:** `[rentiva_vehicle_details vehicle_id="45" show_gallery="1"]`

**5. Araç Listesi (Liste Görünümü):**
*   **Kısa Kod:** `[rentiva_vehicles_list]`
*   **Temel Parametreler:** `limit`, `category`, `orderby`, `order`
*   **Örnek Kullanım:** `[rentiva_vehicles_list limit="10" order="asc"]`

**6. Öne Çıkan Araçlar:**
*   **Kısa Kod:** `[rentiva_featured_vehicles]`
*   **Temel Parametreler:** `limit`, `autoplay`, `layout`
*   **Örnek Kullanım:** `[rentiva_featured_vehicles limit="6" autoplay="1" layout="grid"]`

**7. Araçlar Grid (Izgara Görünümü):**
*   **Kısa Kod:** `[rentiva_vehicles_grid]`
*   **Temel Parametreler:** `limit`, `columns`, `category`, `show_price`
*   **Örnek Kullanım:** `[rentiva_vehicles_grid limit="12" columns="3" category="suv"]`

**8. Birleşik Arama (Unified Search):** Karma kiralama formu.
*   **Kısa Kod:** `[rentiva_unified_search]`
*   **Temel Parametreler:** `default_tab`, `show_location_select`, `style`
*   **Örnek Kullanım:** `[rentiva_unified_search default_tab="rental" style="glass"]`

**9. Arama Sonuçları Görünümü:** Aramadan dönen araç grid formatı.
*   **Kısa Kod:** `[rentiva_search_results]`
*   **Temel Parametreler:** `layout`, `results_per_page`, `show_filters`
*   **Örnek Kullanım:** `[rentiva_search_results layout="grid" results_per_page="12"]`

**10. Araç Karşılaştırma:** Özelliklerin kıyaslanması.
*   **Kısa Kod:** `[rentiva_vehicle_comparison]`
*   **Temel Parametreler:** `max_vehicles`, `show_technical_specs`
*   **Örnek Kullanım:** `[rentiva_vehicle_comparison max_vehicles="4" show_technical_specs="1"]`

### 3. Kullanıcı (Account) Paneli Modülü
(Sadece giriş yapmış kullanıcılarda çalışan **Auth=Yes** yetki kodlarıdır):

**11. Müşteri Ana Paneli:** Müşteri özet ekranı.
*   **Kısa Kod:** `[rentiva_user_dashboard]`
*   **Temel Parametreler:** (Desteklenen parametre harici standart paneldir)
*   **Örnek Kullanım:** `[rentiva_user_dashboard]`

**12. Rezervasyonlarım:** Aktif ya da tarihli işlem listesi.
*   **Kısa Kod:** `[rentiva_my_bookings]`
*   **Temel Parametreler:** `limit`, `status`
*   **Örnek Kullanım:** `[rentiva_my_bookings limit="10" status="confirmed"]`

**13. Favorilerim:** Kullanıcı tarafından favorilere alınan araçlar.
*   **Kısa Kod:** `[rentiva_my_favorites]`
*   **Temel Parametreler:** `limit`, `columns`, `show_availability_status`
*   **Örnek Kullanım:** `[rentiva_my_favorites columns="4"]`

**14. Ödeme Geçmişi:** İşlem makbuzu/Transaction tutanakları.
*   **Kısa Kod:** `[rentiva_payment_history]`
*   **Temel Parametreler:** `limit`, `show_invoice_download`
*   **Örnek Kullanım:** `[rentiva_payment_history limit="20" show_invoice_download="1"]`

**15. Komisyon Çözümleyici:** Affiliate / Satıcılara özel sistem.
*   **Kısa Kod:** `[rentiva_commission_resolver]`
*   **Temel Parametreler:** -
*   **Örnek Kullanım:** `[rentiva_commission_resolver]`

### 4. Transfer Hizmetleri Modülü

**16. Transfer Arama Formu:** Yolcu alma / bırakma seçimi.
*   **Kısa Kod:** `[rentiva_transfer_search]`
*   **Temel Parametreler:** `show_pickup`, `show_dropoff`
*   **Örnek Kullanım:** `[rentiva_transfer_search show_pickup="1" show_dropoff="1"]`

**17. Transfer Sonuçları:** Transfer tarifeleri listesi.
*   **Kısa Kod:** `[rentiva_transfer_results]`
*   **Temel Parametreler:** `limit`, `show_luggage_info`
*   **Örnek Kullanım:** `[rentiva_transfer_results limit="10" show_luggage_info="1"]`

### 5. Destek ve Etkileşim Modülü

**18. Mesajlar (Ticket Sistemi):**
*   **Kısa Kod:** `[rentiva_messages]`
*   **Temel Parametreler:** `limit_items`, `show_thread_preview`
*   **Örnek Kullanım:** `[rentiva_messages limit_items="20"]`

**19. İletişim Geri Bildirim Formu:**
*   **Kısa Kod:** `[rentiva_contact]`
*   **Temel Parametreler:** `recipient_email`, `show_map`, `show_booking_id_field`
*   **Örnek Kullanım:** `[rentiva_contact recipient_email="info@rentiva.com" show_map="1"]`

**20. Referanslar / Değerlendirmeler:**
*   **Kısa Kod:** `[rentiva_testimonials]`
*   **Temel Parametreler:** `limit`, `columns`, `filter_rating`
*   **Örnek Kullanım:** `[rentiva_testimonials limit="5" columns="3" filter_rating="5"]`

**21. Araç Değerlendirme & Yorum Formu:**
*   **Kısa Kod:** `[rentiva_vehicle_rating_form]`
*   **Temel Parametreler:** `vehicle_id`, `require_booking`, `show_photo_upload`
*   **Örnek Kullanım:** `[rentiva_vehicle_rating_form vehicle_id="45" require_booking="1"]`

**22. Ana Sayfa Kavram Kanıtı (POC):**
*   **Kısa Kod:** `[rentiva_home_poc]`
*   **Temel Parametreler:** (Deneyseldir)
*   **Örnek Kullanım:** `[rentiva_home_poc]`

### 6. Satıcı (Vendor / Tedarikçi) Modülü
Kendi araçlarını platformda kiralamak isteyen iş ortakları için:

**23. Satıcı / Şirket Başvuru Formu:**
*   **Kısa Kod:** `[rentiva_vendor_apply]`
*   **Temel Parametreler:** -
*   **Örnek Kullanım:** `[rentiva_vendor_apply]`

**24. Araç Ekleme (Submit) Ekranı:**
*   **Kısa Kod:** `[rentiva_vehicle_submit]`
*   **Temel Parametreler:** (Hesap doğrulama parametreleri)
*   **Örnek Kullanım:** `[rentiva_vehicle_submit]`

---

## 🛠️ Yönetim ve Eksik Sayfa Kontrolü

MHM Rentiva > Kısa Kod Sayfaları (Dashboard ekranı), admin'in işini kolaylaştırmak için aşağıdaki bilgileri verir:

*   **Toplam 19 Aktif Sayfa Mesajı:** Eklenti kurulduğunda ilk aşamada bu kodlardan **19 tanesine bağlı ana URL sayfalarını (`/rezervasyon/`, `/destek/` vb.) otomatik oluşturur ve "Aktif" olarak gösterir**.  Geriye kalan kısa kodları siz kendi ihtiyacınıza göre eklediğiniz (`/tedarikci-paneli/`) gibi ekstra sayfalara dâhil edebilirsiniz.
*   **Hata Ayıklama & Önbellek:** Sayfalardan kazara bir kısa kodu sildiğinizde, paneldeki **"Eksik Sayfalar" (Missing Pages)** sayacı ve "Hata Ayıklama" butonu ile hangi fonksiyonun artık yayında olmadığını tespit edebilirsiniz.

### Bölüm Özeti
- **24 Kısa Kod:** Projenizin rezervasyondan b2b'ye her noktasını içerir.
- **Tek Noktadan Render:** Kodları ister klasik, ister Elementor, ister Gutenberg'de kullanın; hepsi sistemin aynı çekirdeğinden güç alır.
- **Parametrik Serbestlik:** Her bir shortcode'a dışarıdan veri göndererek layout, sorgu limiti gibi değişiklikler yapabilirsiniz.



