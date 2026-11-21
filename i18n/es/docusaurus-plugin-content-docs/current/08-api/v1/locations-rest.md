---
id: locations-rest
title: "Servicios de ubicaciones (Locations REST)"
sidebar_label: "Locations REST"
sidebar_position: 60
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Finalidad
Este endpoint se utiliza para listar las ubicaciones de alquiler y de transferencia definidas en el sistema (aeropuertos, hoteles, centros urbanos, etc.).
:::

# 📍 Endpoint de servicios de ubicaciones

Los datos de ubicaciones se obtienen de una fuente central tanto para el módulo «Rent-a-Car» (alquiler) como para el de «Transferencia». La clase `LocationProvider` procesa los datos que devuelve este endpoint para rellenar los componentes de la interfaz.

---

## 📍 Detalles del endpoint
- **URL:** `/wp-json/mhm-rentiva/v1/locations`
- **Método:** `GET`
- **Permiso:** Público

---

## 🔍 1. Filtrado y parámetros de consulta

Puedes usar los siguientes parámetros para acotar la lista de ubicaciones según lo necesites:

| Parámetro | Tipo | Valores | Descripción |
|---|---|---|---|
| `type` | `string` | `rental`, `transfer`, `both` | Filtra por tipo de servicio. |
| `class` | `string` | `airport`, `city`, `hotel` | Filtra por categoría de ubicación. |
| `active_only` | `bool` | `0`, `1` | Devuelve solo las ubicaciones publicadas (por defecto: `1`). |
| `search` | `string` | Texto libre | Busca en el nombre o el código de la ubicación. |

---

## 📤 2. Ejemplo de estructura de respuesta

```json
{
  "success": true,
  "data": [
    {
      "id": 101,
      "title": "İstanbul Havalimanı (IST)",
      "type": "both",
      "class": "airport",
      "coordinates": {
        "lat": 41.2752,
        "lng": 28.7519
      },
      "code": "IST"
    },
    {
      "id": 102,
      "title": "Sabiha Gökçen Havalimanı (SAW)",
      "type": "both",
      "class": "airport",
      "coordinates": {
        "lat": 40.8986,
        "lng": 29.3092
      },
      "code": "SAW"
    }
  ]
}
```

---

## ⚡ 3. Rendimiento y caché

Como los datos de la lista de ubicaciones cambian con poca frecuencia:
- **`MetricCacheManager`:** Almacena en caché la lista de ubicaciones durante 1 hora.
- **`LocationProvider`:** Reduce al mínimo el tamaño del JSON seleccionando solo los campos necesarios (ID, título, coordenadas) al devolver los datos.

---

## 🚀 4. Notas operativas
- **Datos geográficos:** Las coordenadas permiten la selección basada en mapas.
- **Integración con transferencias:** Los cálculos de distancia y precio de las transferencias se realizan con los ID que devuelve este endpoint.
- **Compatible con SEO:** Los campos `title` y `code` permiten búsquedas fáciles para el usuario en los formularios de búsqueda.

## Resumen de la sección
- El endpoint de ubicaciones es la base de todos los módulos basados en ubicaciones.
- Ofrece un filtrado flexible por tipo y clase.
- Optimizado con `MetricCacheManager` para un alto rendimiento.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se han añadido la compatibilidad con coordenadas, los filtros por tipo de servicio y los detalles de caché. |
