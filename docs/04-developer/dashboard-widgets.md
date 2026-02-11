---
id: dashboard-widgets
title: 📊 Dashboard Widget Mimarisi
sidebar_label: Dashboard Widget'ları
description: MHM Rentiva dashboard widget'larının teknik yapısı, veri kaynakları ve güvenlik özellikleri
---

# Dashboard Widget'ları - Teknik Dokümantasyon

![Version](https://img.shields.io/badge/version-4.6.2-blue?style=flat-square) ![Security](https://img.shields.io/badge/security-WPCS%20Compliant-green?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-22.01.2026-orange?style=flat-square)

> **🎯 Amaç** - Bu belge, MHM Rentiva dashboard widget'larının teknik mimarisini, veri kaynaklarını ve güvenlik önlemlerini detaylandırır.

---

## 📋 İçindekiler

- [Genel Bakış](#genel-bakis)
- [Widget Türleri](#widget-turleri)
- [Veri Kaynağı Mimarisi](#veri-kaynagi-mimarisi)
- [Widget Render İşlemleri](#widget-render-islemleri)
- [Güvenlik ve Cache](#guvenlik-ve-cache)
- [Yeni Widget Ekleme](#yeni-widget-ekleme)

---

## 🏗️ Genel Bakış

MHM Rentiva, WordPress admin dashboard'una üç özel widget ekler:

1. **MHM Rentiva Statistics** - Genel istatistikler
2. **Revenue Chart** - Gelir tablosu (Chart.js)
3. **Upcoming Operations** - Yaklaşan operasyonlar

**Önemli Değişiklikler (v4.6.2):**
- ✅ **Veri Kaynağı:** `wp_posts` → `mhm_bookings` (Özel tablo)
- ✅ **Para Birimi:** Sabit "USD" → `wc_price()` ile WooCommerce entegrasyonu
- ✅ **Yeni Widget:** "Yaklaşan Operasyonlar" (Kiralama + Transfer)

---

## 📦 Widget Türleri

### 1. MHM Rentiva Statistics

**Konum:** `Reports::render_stats_widget()`

**Görüntülenen Veriler:**
| Metrik | Veri Kaynağı | Format |
|--------|--------------|--------|
| Toplam Rezervasyon | `ReportRepository::get_total_bookings_count()` | Sayısal (binlik ayraçlı) |
| Bu Ay Gelir | `ReportRepository::get_monthly_revenue_amount()` | `wc_price()` |
| Aktif Rezervasyonlar | `ReportRepository::get_active_bookings_count()` | Sayısal |
| Doluluk Oranı | `(active / total_vehicles) * 100` | Yüzde |

**Görsel:**
```html
<div class="mhm-rentiva-dashboard-stats">
    <div class="stat-item">
        <span class="stat-number">127</span>
        <span class="stat-label">Total Bookings</span>
    </div>
    <div class="stat-item">
        <span class="stat-number">₺45,280</span> <!-- wc_price() ile -->
        <span class="stat-label">This Month Revenue</span>
    </div>
    <!-- ... -->
</div>
```

### 2. Revenue Chart

**Konum:** `Reports::render_revenue_widget()`

**Teknoloji:** Chart.js

**Zaman Aralığı:** Son 30 gün (sabit)

**Veri Akışı:**
```php
$start_date = date('Y-m-d', strtotime('-30 days'));
$end_date = date('Y-m-d');
Charts::render_revenue_chart($start_date, $end_date);
```

**API:** `Reports::ajax_get_data()` → `RevenueReport::get_data()`

### 3. Upcoming Operations (YENİ)

**Konum:** `Reports::render_upcoming_ops_widget()`

**Özellik:** Hibrit widget - Hem Kiralama hem Transfer operasyonlarını listeler

**Veri Kaynağı:** `ReportRepository::get_upcoming_operations(5)`

**Sıralama:** Tarihe göre (Yakından uzağa)

**Görüntülenen Bilgiler:**
| Sütun | İçerik | Kaynak |
|-------|--------|--------|
| **Type** | `dashicons-airplane` veya `dashicons-car` | Operasyon tipi |
| **Time** | `date_i18n('d M H:i', $timestamp)` | Başlangıç tarihi |
| **Detail** | Araç başlığı veya Rota + Müşteri adı | `vehicle_title` veya `origin → destination` |

**Görsel:**
```html
<table class="widefat striped">
    <thead>
        <tr>
            <th>Type</th>
            <th>Time</th>
            <th>Detail</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align:center;">
                <span class="dashicons dashicons-car"></span>
            </td>
            <td>22 Oca 14:30</td>
            <td>
                <strong>BMW X5</strong><br>
                <small>Ahmet Yılmaz</small>
            </td>
        </tr>
        <tr>
            <td style="text-align:center;">
                <span class="dashicons dashicons-airplane"></span>
            </td>
            <td>22 Oca 16:00</td>
            <td>
                <strong>Havaalanı → Otel</strong><br>
                <small>Mehmet Kaya</small>
            </td>
        </tr>
    </tbody>
</table>
```

---

## 🗄️ Veri Kaynağı Mimarisi

### Eski Mimari (v4.5.x)

```sql
-- Eski: wp_posts tablosu kullanılıyordu
SELECT 
    COUNT(*) as total,
    SUM(meta_value) as revenue
FROM wp_posts p
JOIN wp_postmeta pm ON p.ID = pm.post_id
WHERE p.post_type = 'vehicle_booking'
  AND p.post_status = 'publish'
  AND pm.meta_key = '_booking_total'
```

**Sorunlar:**
- Yavaş sorgular (JOIN operasyonları)
- Büyük veri setlerinde performans düşüklüğü
- wp_posts yapısı için uygun değil

### Yeni Mimari (v4.6.2)

```sql
-- Yeni: Özel mhm_bookings tablosu
SELECT 
    COUNT(*) as total,
    SUM(booking_total) as revenue
FROM mhm_bookings
WHERE booking_status IN ('completed', 'confirmed')
  AND booking_date BETWEEN %s AND %s
```

**Avantajlar:**
- ✅ Hızlı sorgular (doğrudan tablo erişimi)
- ✅ Düşük bellek kullanımı
- ✅ Ölçeklenebilirlik
- ✅ Normalize edilmiş yapı

### ReportRepository Metodları

#### 1. Toplam Rezervasyon Sayısı
```php
public static function get_total_bookings_count(): int
{
    global $wpdb;
    return (int) $wpdb->get_var(
        "SELECT COUNT(*) FROM {$wpdb->prefix}mhm_bookings"
    );
}
```

#### 2. Aylık Gelir
```php
public static function get_monthly_revenue_amount(string $start, string $end): float
{
    global $wpdb;
    return (float) $wpdb->get_var($wpdb->prepare(
        "SELECT SUM(booking_total) 
         FROM {$wpdb->prefix}mhm_bookings 
         WHERE booking_status IN ('completed', 'confirmed')
         AND booking_date BETWEEN %s AND %s",
        $start, $end
    ));
}
```

#### 3. Aktif Rezervasyonlar
```php
public static function get_active_bookings_count(): int
{
    global $wpdb;
    return (int) $wpdb->get_var(
        "SELECT COUNT(*) 
         FROM {$wpdb->prefix}mhm_bookings 
         WHERE booking_status IN ('pending', 'confirmed', 'active')"
    );
}
```

#### 4. Yaklaşan Operasyonlar
```php
public static function get_upcoming_operations(int $limit = 5): array
{
    global $wpdb;
    
    // Kiralama operasyonları
    $bookings = $wpdb->get_results($wpdb->prepare(
        "SELECT 'booking' as type, start_date, vehicle_title, customer_name
         FROM {$wpdb->prefix}mhm_bookings
         WHERE start_date > NOW()
         ORDER BY start_date ASC
         LIMIT %d",
        $limit
    ));
    
    // Transfer operasyonları (varsa)
    $transfers = $wpdb->get_results($wpdb->prepare(
        "SELECT 'transfer' as type, start_date, origin, destination, customer_name
         FROM {$wpdb->prefix}mhm_transfers
         WHERE start_date > NOW()
         ORDER BY start_date ASC
         LIMIT %d",
        $limit
    ));
    
    // Birleştir ve tarihe göre sırala
    $operations = array_merge($bookings, $transfers);
    usort($operations, function($a, $b) {
        return strtotime($a->start_date) - strtotime($b->start_date);
    });
    
    return array_slice($operations, 0, $limit);
}
```

---

## 🎨 Widget Render İşlemleri

### Stats Widget Render

```php
public static function render_stats_widget(): void
{
    $stats = self::get_dashboard_stats();
    
    // Cache kontrolü
    if ($stats === false) {
        $stats = self::calculate_stats();
        // Cache'e kaydet
        if (class_exists('MHMRentiva\Admin\Core\Utilities\CacheManager')) {
            CacheManager::set_cache('dashboard_stats', '', $stats);
        }
    }
?>
    <div class="mhm-rentiva-dashboard-stats">
        <div class="stat-item">
            <span class="stat-number"><?php echo esc_html($stats['total_bookings']); ?></span>
            <span class="stat-label"><?php _e('Total Bookings', 'mhm-rentiva'); ?></span>
        </div>
        <div class="stat-item">
            <span class="stat-number">
                <?php
                if (function_exists('wc_price')) {
                    echo wp_kses_post(wc_price($stats['monthly_revenue_raw'] ?? 0));
                } else {
                    echo esc_html($stats['monthly_revenue'] . ' ' . \MHMRentiva\Admin\Core\CurrencyHelper::get_currency_symbol());
                }
                ?>
            </span>
            <span class="stat-label"><?php _e('This Month Revenue', 'mhm-rentiva'); ?></span>
        </div>
        <!-- ... -->
    </div>
<?php
}
```

### Revenue Chart Render

```php
public static function render_revenue_widget(): void
{
    $start_date = date('Y-m-d', strtotime('-30 days'));
    $end_date = date('Y-m-d');
    
    // Chart.js ile grafik render
    Charts::render_revenue_chart($start_date, $end_date);
}
```

### Upcoming Ops Widget Render

```php
public static function render_upcoming_ops_widget(): void
{
    $operations = ReportRepository::get_upcoming_operations(5);
    
    if (!empty($operations)) {
        echo '<div class="mhm-upcoming-ops-widget">';
        echo '<table class="widefat striped">';
        // Tablo başlıkları
        echo '<thead><tr>';
        echo '<th>' . esc_html__('Type', 'mhm-rentiva') . '</th>';
        echo '<th>' . esc_html__('Time', 'mhm-rentiva') . '</th>';
        echo '<th>' . esc_html__('Detail', 'mhm-rentiva') . '</th>';
        echo '</tr></thead>';
        echo '<tbody>';
        
        foreach ($operations as $op) {
            $icon = ($op['type'] === 'transfer') ? 'dashicons-airplane' : 'dashicons-car';
            $date_time = strtotime($op['start_date']);
            $formatted_time = date_i18n('d M H:i', $date_time);
            
            $customer = esc_html($op['customer_name']);
            $vehicle_or_route = ($op['type'] === 'transfer')
                ? esc_html($op['origin'] ?? '') . ' &rarr; ' . esc_html($op['destination'] ?? '')
                : esc_html($op['vehicle_title'] ?? '');
            
            echo '<tr>';
            echo '<td style="text-align:center;"><span class="dashicons ' . esc_attr($icon) . '"></span></td>';
            echo '<td>' . $formatted_time . '</td>';
            echo '<td><strong>' . $vehicle_or_route . '</strong><br><small>' . $customer . '</small></td>';
            echo '</tr>';
        }
        
        echo '</tbody></table>';
        echo '<div style="margin-top:10px; text-align:right;">';
        echo '<a href="' . admin_url('admin.php?page=mhm-rentiva-dashboard') . '">' . esc_html__('View Full Dashboard', 'mhm-rentiva') . '</a>';
        echo '</div>';
        echo '</div>';
    } else {
        echo '<p>' . esc_html__('No upcoming operations.', 'mhm-rentiva') . '</p>';
    }
}
```

---

## 🔒 Güvenlik ve Cache

### Cache Yönetimi

**Merkezi Cache Sistemi:**
```php
// Stats cache alma
$stats = \MHMRentiva\Admin\Core\Utilities\CacheManager::get_cache('dashboard_stats');

// Cache yoksa hesapla ve kaydet
if ($stats === false) {
    $stats = self::calculate_stats();
    \MHMRentiva\Admin\Core\Utilities\CacheManager::set_cache('dashboard_stats', '', $stats);
}
```

**Cache Anahtarları:**
- `dashboard_stats`: Genel istatistikler
- `mhm_rentiva_reports_revenue`: Gelir verisi
- `mhm_rentiva_reports_bookings`: Rezervasyon verisi
- `mhm_rentiva_dashboard_stats`: Dashboard widget cache'i

**Cache Temizleme:**
```php
public static function ajax_clear_cache(): void
{
    check_ajax_referer('mhm_reports_nonce', 'nonce');
    
    if (!current_user_can('manage_options')) {
        wp_send_json_error(__('Unauthorized access', 'mhm-rentiva'));
        return;
    }
    
    $cache_keys = [
        'mhm_rentiva_reports_revenue',
        'mhm_rentiva_reports_bookings',
        'mhm_rentiva_reports_customers',
        'mhm_rentiva_reports_vehicles',
        'mhm_rentiva_dashboard_stats'
    ];
    
    foreach ($cache_keys as $key) {
        delete_transient($key);
    }
    
    wp_send_json_success(__('Cache cleared successfully', 'mhm-rentiva'));
}
```

### Güvenlik Önlemleri

#### 1. Widget Erişim Kontrolü
```php
public static function render_stats_widget(): void
{
    // Widget render'ı için yetki kontrolü yok (WP dashboard yetkisi yeterli)
    // Ancak veri çekme yetkisi kontrol edilir
    if (!current_user_can('manage_options')) {
        return;
    }
    
    $stats = self::get_dashboard_stats();
    // Render...
}
```

#### 2. AJAX Güvenliği
```php
public static function ajax_get_data(): void
{
    check_ajax_referer('mhm_reports_nonce', 'nonce');
    
    if (!current_user_can('manage_options')) {
        wp_send_json_error(__('Unauthorized access', 'mhm-rentiva'));
        return;
    }
    
    // Girdi sanitizasyonu
    $type = sanitize_key($_POST['type'] ?? '');
    $start_date = sanitize_text_field((string) ($_POST['start_date'] ?? date('Y-m-d', strtotime('-30 days'))));
    $end_date = sanitize_text_field((string) ($_POST['end_date'] ?? date('Y-m-d')));
    
    // License kontrolü (Lite versiyon için)
    if (!Mode::featureEnabled(Mode::FEATURE_REPORTS_ADV)) {
        $max_days = Mode::reportsMaxRangeDays();
        $date_diff = (strtotime($end_date) - strtotime($start_date)) / (60 * 60 * 24);
        
        if ($date_diff > $max_days) {
            wp_send_json_error(__('Maximum 30 days of data can be displayed in Lite version.', 'mhm-rentiva'));
            return;
        }
    }
    
    // Veri çekme ve gönderme
    try {
        $data = RevenueReport::get_data($start_date, $end_date);
        wp_send_json_success($data);
    } catch (\Exception $e) {
        wp_send_json_error($e->getMessage());
    }
}
```

#### 3. Çıktı Kaçış Karakterleri
```php
// Widget başlığı (WordPress otomatik kaçış yapar)
wp_add_dashboard_widget(
    'mhm_rentiva_stats',
    __('MHM Rentiva Statistics', 'mhm-rentiva'),
    [self::class, 'render_stats_widget']
);

// İçerikte kaçış
echo '<span class="stat-number">' . esc_html($stats['total_bookings']) . '</span>';
echo '<span class="stat-label">' . esc_html__('Total Bookings', 'mhm-rentiva') . '</span>';

// URL'lerde kaçış
echo '<a href="' . esc_url(admin_url('admin.php?page=mhm-rentiva-dashboard')) . '">';
echo esc_html__('View Full Dashboard', 'mhm-rentiva');
echo '</a>';
```

---

## 🆕 Yeni Widget Ekleme

### Adım 1: Widget'ı Kaydet

```php
// src/Admin/Reports/Reports.php içinde
public static function add_dashboard_widgets(): void
{
    wp_add_dashboard_widget(
        'mhm_rentiva_stats',
        __('MHM Rentiva Statistics', 'mhm-rentiva'),
        [self::class, 'render_stats_widget']
    );

    wp_add_dashboard_widget(
        'mhm_rentiva_revenue_chart',
        __('Revenue Chart', 'mhm-rentiva'),
        [self::class, 'render_revenue_widget']
    );

    wp_add_dashboard_widget(
        'mhm_rentiva_upcoming_ops',
        __('Upcoming Operations', 'mhm-rentiva'),
        [self::class, 'render_upcoming_ops_widget']
    );
    
    // YENİ WIDGET EKLEME
    wp_add_dashboard_widget(
        'mhm_rentiva_custom_widget',
        __('My Custom Widget', 'mhm-rentiva'),
        [self::class, 'render_custom_widget']
    );
}
```

### Adım 2: Render Metodu

```php
public static function render_custom_widget(): void
{
    // Veri çekme
    $data = self::get_custom_data();
    
    // Cache kontrolü
    if ($data === false) {
        $data = self::calculate_custom_data();
        if (class_exists('MHMRentiva\Admin\Core\Utilities\CacheManager')) {
            CacheManager::set_cache('custom_widget_data', '', $data);
        }
    }
    
    // HTML render
    echo '<div class="mhm-custom-widget">';
    echo '<h4>' . esc_html__('Custom Data', 'mhm-rentiva') . '</h4>';
    echo '<p>' . esc_html($data['message']) . '</p>';
    echo '</div>';
}
```

### Adım 3: Veri Çekme

```php
private static function get_custom_data(): ?array
{
    global $wpdb;
    
    // Cache'den al
    $data = get_transient('mhm_custom_widget_data');
    if ($data !== false) {
        return $data;
    }
    
    // Veritabanından çek
    $data = $wpdb->get_row(
        "SELECT COUNT(*) as count, SUM(amount) as total 
         FROM {$wpdb->prefix}mhm_custom_table 
         WHERE date > DATE_SUB(NOW(), INTERVAL 30 DAY)",
        ARRAY_A
    );
    
    // Cache'le
    set_transient('mhm_custom_widget_data', $data, HOUR_IN_SECONDS);
    
    return $data;
}
```

---

## 📊 Performans Optimizasyonları

### 1. Sorgu Optimizasyonu

**Eski (Yavaş):**
```sql
SELECT p.*, pm.meta_value 
FROM wp_posts p
JOIN wp_postmeta pm ON p.ID = pm.post_id
WHERE p.post_type = 'vehicle_booking'
  AND pm.meta_key = '_booking_total'
```

**Yeni (Hızlı):**
```sql
SELECT * FROM mhm_bookings 
WHERE booking_status IN ('completed', 'confirmed')
```

### 2. Cache Stratejisi

```php
// Widget render'ında cache
public static function render_stats_widget(): void
{
    $stats = false;
    
    // 1. Seviye: Object Cache (Memcached/Redis)
    if (class_exists('MHMRentiva\Admin\Core\Utilities\CacheManager')) {
        $stats = CacheManager::get_cache('dashboard_stats');
    }
    
    // 2. Seviye: Transient (Database)
    if ($stats === false) {
        $stats = get_transient('mhm_rentiva_dashboard_stats');
    }
    
    // 3. Seviye: Hesapla ve cache'le
    if ($stats === false) {
        $stats = self::calculate_stats();
        
        // Object Cache
        if (class_exists('MHMRentiva\Admin\Core\Utilities\CacheManager')) {
            CacheManager::set_cache('dashboard_stats', '', $stats);
        }
        
        // Transient (1 saat)
        set_transient('mhm_rentiva_dashboard_stats', $stats, HOUR_IN_SECONDS);
    }
}
```

### 3. Lazy Loading

```php
// Widget'lar sadece dashboard sayfasında yüklenir
public static function enqueue_scripts(string $hook): void
{
    if ($hook !== 'index.php') {
        return; // Sadece dashboard
    }
    
    // CSS/JS yükle
    wp_enqueue_style('mhm-admin-reports', ...);
    wp_enqueue_script('mhm-admin-reports', ...);
}
```

---

## 🎯 İyi Pratikler

### 1. Veri Formatlama

```php
// Sayısal veriler
$stats['total_bookings'] = number_format($total_bookings);

// Para birimi
if (function_exists('wc_price')) {
    echo wp_kses_post(wc_price($monthly_revenue));
}

// Tarih ve saat
$formatted_time = date_i18n('d M H:i', $timestamp);
```

### 2. Hata Yönetimi

```php
try {
    $data = RevenueReport::get_data($start_date, $end_date);
    wp_send_json_success($data);
} catch (\Exception $e) {
    // Loglama
    error_log('MHM Rentiva Reports Error: ' . $e->getMessage());
    
    // Kullanıcıya bilgi
    wp_send_json_error(__('An error occurred while fetching data.', 'mhm-rentiva'));
}
```

### 3. Çeviri Desteği

```php
// Tüm metinler çeviri için
__('Total Bookings', 'mhm-rentiva')
__('Revenue Chart', 'mhm-rentiva')
__('Upcoming Operations', 'mhm-rentiva')

// HTML içinde
echo '<span class="stat-label">' . esc_html__('Total Bookings', 'mhm-rentiva') . '</span>';
```

---

## 📌 Referanslar

- **Kaynak Kod:** `src/Admin/Reports/Reports.php`
- **Repository:** `src/Admin/Reports/Repository/ReportRepository.php`
- **Business Logic:** `src/Admin/Reports/BusinessLogic/`
- **CSS:** `assets/css/admin/admin-reports.css`
- **JS:** `assets/js/admin/reports.js`

---

## 🔄 Değişiklik Günlüğü

| Tarih | Değişiklik | Sürüm |
|-------|------------|-------|
| 22.01.2026 | Yeni "Upcoming Operations" widget eklendi | 4.6.2 |
| 22.01.2026 | Veri kaynağı wp_posts → mhm_bookings | 4.6.2 |
| 22.01.2026 | wc_price() entegrasyonu | 4.6.2 |
| 22.01.2026 | Cache sistemi merkezileştirildi | 4.6.2 |
