---
id: vehicle-settings-usage
title: "Ajustes globales de vehículos"
sidebar_label: "Ajustes del vehículo"
sidebar_position: 5
slug: /features-usage/vehicle-settings
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Los ajustes globales de vehículos te permiten gestionar los comportamientos comunes de todos los vehículos del sistema, los campos de datos que se muestran y las listas de equipamiento. Accede a ellos desde **MHM Rentiva > Ajustes del vehículo**.

---

## Definiciones de campos

Esta pestaña es el punto central de gestión de todos los campos de datos que forman la identidad técnica de un vehículo.

### 1. Detalles del vehículo
Usa el botón «Editar nombres» para traducir o cambiar el nombre de los campos predefinidos, como **Precio diario, Año del modelo, Matrícula, Marca, Modelo, Anticipo**.
- **Añadir detalle personalizado:** añade nuevos campos de datos en formato Texto o Número además de los campos estándar (p. ej., «Registro de daños», «Tipo de seguro»).

### 2. Características del vehículo
Equipamiento de confort y seguridad como aire acondicionado, ABS y Bluetooth. Añade nuevo equipamiento a tu lista desde el campo «Nombre de la característica personalizada».

### 3. Equipamiento del vehículo
Aquí se define el equipamiento físico, como la rueda de repuesto y el botiquín de primeros auxilios.

---

## Opciones de visualización

Desde esta pestaña controlas dónde y cómo aparecen en la parte pública los campos que has definido.

### Elementos visibles en la tarjeta (arrastrar y soltar)
Determina mediante arrastrar y soltar qué datos técnicos se muestran en las tarjetas del listado de vehículos (cuadrícula/lista) en los resultados de búsqueda.
- **Ordenación:** arrastra los elementos hacia arriba o hacia abajo para cambiar el orden de prioridad (p. ej., primero el tipo de combustible y después la transmisión).
- **Ocultación:** suelta un elemento en la columna derecha (Elementos disponibles) para desactivarlo y ocultarlo de la tarjeta.

### Especificaciones destacadas en los detalles del vehículo
En la parte superior de la página del vehículo, selecciona las 4–5 especificaciones más importantes (p. ej., número de plazas, transmisión, aire acondicionado) que quieres que el cliente vea de un vistazo.

### Ajustes de la tabla de comparación de vehículos
Cuando los clientes comparan varios vehículos, usa la lista de casillas para elegir qué detalles, características y equipamiento aparecen en la tabla de comparación.
- **Acciones en lote:** usa «Seleccionar todo» para incluir todo el equipamiento en la tabla de comparación.

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>IMAGEN: OPCIONES DE VISUALIZACIÓN Y AJUSTES DE LA TARJETA</strong><br/>
  <em>mhm-rentiva-display-options-drag-drop</em>
</div>

---

### Resumen de la sección
- Estructura tu base de datos con **Definiciones de campos**.
- Optimiza el diseño y la experiencia de usuario con **Opciones de visualización**.
- Personaliza las vistas de listado sin escribir código con la interfaz de **arrastrar y soltar**.

### Registro de cambios
| Fecha | Versión | Nota |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Documentación sincronizada con la versión actual del plugin. |
| 19.03.2026 | 4.21.2 | Opciones de visualización y ajustes de arrastrar y soltar detallados según la interfaz real. |
| 26.02.2026 | 4.21.0 | Versión inicial creada. |
