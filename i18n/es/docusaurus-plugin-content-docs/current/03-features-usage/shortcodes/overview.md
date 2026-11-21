---
id: shortcodes-overview
title: "Lista de todos los shortcodes"
sidebar_label: "Lista de shortcodes"
sidebar_position: 1
slug: /features-usage/shortcodes/overview
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

La sección de shortcodes es el núcleo central de la arquitectura que integra toda la funcionalidad de la parte pública de MHM Rentiva con WordPress. El sistema incluye **28 shortcodes activos** en total. Puedes colocarlos en cualquier parte de tu sitio usando el editor de texto clásico o las integraciones con maquetadores.

---

## 🏗️ Compatibilidad con bloques de Gutenberg y Elementor

MHM Rentiva adopta la arquitectura moderna de WordPress. Los **28 shortcodes listados** aquí generan internamente una «salida de renderizado» estándar.

- **Bloques de Gutenberg:** todos los shortcodes están disponibles como bloques nativos de arrastrar y soltar en el editor Gutenberg, sin necesidad de introducir shortcodes manualmente. Los parámetros del shortcode se reflejan en el panel de ajustes del bloque (Inspector) a la derecha.
- **Widgets de Elementor:** los componentes propios del plugin están disponibles como widgets en el panel de Elementor. Al usar Elementor, puedes añadir el componente correspondiente y configurar sus ajustes visuales sin introducir un shortcode (`[rentiva_...]`).

En ambos casos, el motor de renderizado (Render Parity) se alimenta de una única fuente: la infraestructura de shortcodes de esta página.

---

## 📋 28 shortcodes activos y su uso

El sistema ofrece shortcodes organizados en 6 categorías principales según su función. A continuación encontrarás cada shortcode con ejemplos de parámetros.

### 1. Módulo de reservas
Shortcodes esenciales para iniciar y completar el flujo de alquiler:

**1. Formulario de reserva:** formulario para seleccionar las fechas de alquiler, el seguro y los servicios adicionales.
*   **Shortcode:** `[rentiva_booking_form]`
*   **Parámetros clave:** `vehicle_id`, `show_addons`
*   **Ejemplo:** `[rentiva_booking_form vehicle_id="101" show_addons="1"]`

**2. Calendario de disponibilidad:** muestra el calendario de disponibilidad mensual o diario de un vehículo.
*   **Shortcode:** `[rentiva_availability_calendar]`
*   **Parámetros clave:** `vehicle_id`, `months_to_show`, `show_pricing`
*   **Ejemplo:** `[rentiva_availability_calendar vehicle_id="101" months_to_show="2" show_pricing="1"]`

### 2. Módulo de listado y búsqueda de vehículos
Muestra a los clientes los procesos de filtrado de vehículos y de detalle del vehículo:

**3. Detalles del vehículo:** lista todos los atributos de un único vehículo.
*   **Shortcode:** `[rentiva_vehicle_details]`
*   **Parámetros clave:** `vehicle_id`, `show_gallery`, `show_features`, `show_similar_vehicles`
*   **Ejemplo:** `[rentiva_vehicle_details vehicle_id="45" show_gallery="1"]`

**4. Lista de vehículos (vista de lista):**
*   **Shortcode:** `[rentiva_vehicles_list]`
*   **Parámetros clave:** `limit`, `category`, `orderby`, `order`
*   **Ejemplo:** `[rentiva_vehicles_list limit="10" order="asc"]`

**5. Vehículos destacados:**
*   **Shortcode:** `[rentiva_featured_vehicles]`
*   **Parámetros clave:** `limit`, `autoplay`, `layout`
*   **Ejemplo:** `[rentiva_featured_vehicles limit="6" autoplay="1" layout="grid"]`

**6. Cuadrícula de vehículos (vista de cuadrícula):**
*   **Shortcode:** `[rentiva_vehicles_grid]`
*   **Parámetros clave:** `limit`, `columns`, `category`, `show_price`
*   **Ejemplo:** `[rentiva_vehicles_grid limit="12" columns="3" category="suv"]`

**7. Búsqueda unificada:** formulario combinado de búsqueda de alquiler.
*   **Shortcode:** `[rentiva_unified_search]`
*   **Parámetros clave:** `default_tab`, `show_location_select`, `style`
*   **Ejemplo:** `[rentiva_unified_search default_tab="rental" style="glass"]`

**8. Vista de resultados de búsqueda:** formato de cuadrícula de vehículos devuelto por la búsqueda.
*   **Shortcode:** `[rentiva_search_results]`
*   **Parámetros clave:** `layout`, `results_per_page`, `show_filters`
*   **Ejemplo:** `[rentiva_search_results layout="grid" results_per_page="12"]`

**9. Comparación de vehículos:** comparación de características en paralelo.
*   **Shortcode:** `[rentiva_vehicle_comparison]`
*   **Parámetros clave:** `max_vehicles`, `show_prices`
*   **Ejemplo:** `[rentiva_vehicle_comparison max_vehicles="4" show_prices="1"]`

### 3. Módulo de cuenta de usuario
(**Auth=Yes**: solo activo para usuarios conectados):

**10. Panel del cliente (retirado en la 6.2.0):** muestra a un cliente conectado una línea y un enlace a Mi cuenta; los visitantes no ven nada. Usa la página Mi cuenta en su lugar.
*   **Shortcode:** `[rentiva_user_dashboard]`
*   **Parámetros clave:** -
*   **Referencia:** [Panel principal de la cuenta (retirado)](./user-dashboard)

**11. Mis reservas:** lista de reservas activas o históricas.
*   **Shortcode:** `[rentiva_my_bookings]`
*   **Parámetros clave:** `limit`, `status`
*   **Ejemplo:** `[rentiva_my_bookings limit="10" status="confirmed"]`

**12. Mis favoritos:** vehículos guardados como favoritos por el usuario.
*   **Shortcode:** `[rentiva_my_favorites]`
*   **Parámetros clave:** `limit`, `columns`, `show_availability_status`
*   **Ejemplo:** `[rentiva_my_favorites columns="4"]`

**13. Historial de pagos:** recibos y registros de transacciones.
*   **Shortcode:** `[rentiva_payment_history]`
*   **Parámetros clave:** `limit`, `show_payment_method`
*   **Ejemplo:** `[rentiva_payment_history limit="20"]`

**14. Resolución de comisiones:** sistema específico para afiliados / vendedores.
*   **Shortcode:** `[rentiva_commission_resolver]`
*   **Parámetros clave:** -
*   **Ejemplo:** `[rentiva_commission_resolver]`

### 4. Módulo de servicios de transferencia

**15. Formulario de búsqueda de transferencias:** selección de recogida / devolución de pasajeros.
*   **Shortcode:** `[rentiva_transfer_search]`
*   **Parámetros clave:** `show_pickup`, `show_dropoff`
*   **Ejemplo:** `[rentiva_transfer_search show_pickup="1" show_dropoff="1"]`

**16. Resultados de transferencias:** listado de tarifas de transferencia.
*   **Shortcode:** `[rentiva_transfer_results]`
*   **Parámetros clave:** `limit`, `show_luggage_info`
*   **Ejemplo:** `[rentiva_transfer_results limit="10" show_luggage_info="1"]`

**17. Rutas populares (v4.34.0+):** escaparate en la página de inicio de las rutas de transferencia VIP; las tarjetas en las que se puede hacer clic enlazan directamente a la búsqueda de transferencias.
*   **Shortcode:** `[rentiva_popular_routes]`
*   **Parámetros clave:** `limit`, `columns`, `order`, `featured_only`, `filter_origin_city`
*   **Ejemplo:** `[rentiva_popular_routes columns="3" limit="6" order="featured"]`
*   **Referencia:** [Rutas populares](./popular-routes)

### 5. Módulo de soporte e interacción

**18. Mensajes (sistema de tickets):**
*   **Shortcode:** `[rentiva_messages]`
*   **Parámetros clave:** `show_thread_preview`
*   **Ejemplo:** `[rentiva_messages show_thread_preview="1"]`

**19. Formulario de contacto y comentarios:**
*   **Shortcode:** `[rentiva_contact]`
*   **Parámetros clave:** `email_to`, `type`, `show_booking_id_field`
*   **Ejemplo:** `[rentiva_contact email_to="info@rentiva.com" show_booking_id_field="1"]`

**20. Testimonios / opiniones:**
*   **Shortcode:** `[rentiva_testimonials]`
*   **Parámetros clave:** `limit`, `columns`, `filter_rating`
*   **Ejemplo:** `[rentiva_testimonials limit="5" columns="3" filter_rating="5"]`

**21. Formulario de valoración y opinión del vehículo:**
*   **Shortcode:** `[rentiva_vehicle_rating_form]`
*   **Parámetros clave:** `vehicle_id`, `show_form`, `show_ratings_list`
*   **Ejemplo:** `[rentiva_vehicle_rating_form vehicle_id="45"]`

**22. Prueba de concepto (POC) de la página de inicio:**
*   **Shortcode:** `[rentiva_home_poc]`
*   **Parámetros clave:** (Experimental)
*   **Ejemplo:** `[rentiva_home_poc]`

### 6. Módulo de vendedores
Para socios comerciales que quieren publicar sus vehículos para alquiler en la plataforma:

**23. Formulario de solicitud de vendedor / empresa:**
*   **Shortcode:** `[rentiva_vendor_apply]`
*   **Parámetros clave:** -
*   **Ejemplo:** `[rentiva_vendor_apply]`

**24. Pantalla de envío de vehículos:**
*   **Shortcode:** `[rentiva_vehicle_submit]`
*   **Parámetros clave:** (Parámetros de verificación de la cuenta)
*   **Ejemplo:** `[rentiva_vehicle_submit]`

**25. Perfil público del vendedor (v4.37.0+):**
*   **Shortcode:** `[rentiva_vendor_profile]`
*   **Parámetros clave:** `slug`, `show_badge`, `show_about`, `show_vehicles`, `show_reviews`, `show_location`, `max_vehicles`, `max_reviews`
*   **Ejemplo:** `[rentiva_vendor_profile slug="akif-otomotiv"]`
*   **Referencia:** [Perfil público del vendedor](./vendor-profile)

**26. Directorio de vendedores (v4.38.0+):**
*   **Shortcode:** `[rentiva_vendor_directory]`
*   **Parámetros clave:** `per_page`, `default_sort`, `show_filter_bar`, `show_breadcrumb`, `show_pagination`, `empty_message`
*   **Ejemplo:** `[rentiva_vendor_directory per_page="12" default_sort="rating"]`
*   **Referencia:** [Directorio de vendedores](./vendor-directory)

**27. Bandeja de reservas del vendedor (solo en el panel):**
*   **Shortcode:** `[rentiva_vendor_bookings]`
*   **Parámetros clave:** `limit` (tamaño de página, 10 por defecto)
*   **Ejemplo:** `[rentiva_vendor_bookings limit="10"]`
*   **Referencia:** [Lista de reservas del vendedor](./vendor-bookings)

**28. Libro de cuentas del vendedor (solo en el panel, transacciones financieras):**
*   **Shortcode:** `[rentiva_vendor_ledger]`
*   **Parámetros clave:** Ninguno (solo filtros de URL: `paged`, tipo, rango de fechas)
*   **Ejemplo:** `[rentiva_vendor_ledger]`
*   **Referencia:** [Libro de cuentas del vendedor](./vendor-ledger)

---

## 🛠️ Gestión y comprobación de páginas que faltan

La pantalla MHM Rentiva > Páginas de shortcodes (Escritorio) ofrece la siguiente información para ayudar a los administradores:

*   **Mensajes de 19 páginas activas:** al instalar el plugin, se crean automáticamente las **páginas de URL principales vinculadas a 19 de estos shortcodes** (`/booking/`, `/support/`, etc.) y se muestran como «Activo». El resto de shortcodes se pueden añadir a páginas adicionales según sea necesario (p. ej., `/vendor-panel/`).
*   **Depuración y caché:** si se elimina accidentalmente un shortcode de una página, el contador **«Páginas que faltan»** y el botón «Depurar» del panel te permiten identificar qué función ya no está operativa.

### Resumen de la sección
- **28 shortcodes:** cubren todos los puntos de tu proyecto, desde las reservas hasta el B2B.
- **Renderizado desde un único punto:** usa los shortcodes en el editor clásico, Elementor o Gutenberg; todos se basan en el mismo sistema central.
- **Flexibilidad paramétrica:** pasa datos externos a cada shortcode para cambiar el diseño, los límites de consulta y mucho más.
