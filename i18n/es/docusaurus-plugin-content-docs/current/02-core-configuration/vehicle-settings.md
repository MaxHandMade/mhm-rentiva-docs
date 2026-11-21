---
id: vehicle-settings
title: "Ajustes del vehículo"
sidebar_label: "Ajustes del vehículo"
sidebar_position: 6
slug: /core-configuration/vehicle-settings
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

La página Ajustes del vehículo es el centro de control donde defines tanto la estructura de datos (transmisión, tipo de combustible, matrícula, etc.) como el formato de presentación de los vehículos de tu flota. Se gestiona en dos pestañas principales desde el menú **MHM Rentiva > Ajustes del vehículo**.

---

## 1. Definiciones de campos

En esta pestaña determinas qué campos de datos están activos en cada tarjeta y página de detalle de vehículo, y cuáles son obligatorios.

### 🏠 Detalles del vehículo
Gestiona los datos técnicos que se muestran en las tarjetas y páginas de detalle de los vehículos:
- **Detalles básicos:** precio diario, matrícula, modelo, año del modelo, marca, anticipo y estado de disponibilidad.
- **Características y detalles personalizados:** kilometraje, número de asientos, tipo de transmisión, cilindrada del motor, color, número de puertas y tipo de combustible.

### ⚙️ Características del vehículo
Selecciona el equipamiento de confort del que disponen los vehículos (aire acondicionado, ABS, dirección asistida, Bluetooth, etc.) y añade características personalizadas.

### 🎒 Equipamiento del vehículo
Gestiona los accesorios físicos disponibles en el vehículo (rueda de repuesto, botiquín de primeros auxilios, dispositivo de seguimiento GPS, etc.).

### ➕ Añadir campos personalizados
¿Quieres añadir un campo que no está predefinido en el sistema? Escribe la etiqueta que quieras en el cuadro «Nombre del detalle personalizado», selecciona el tipo de dato (texto, número, etc.) y crea tus propios campos técnicos.

---

### 🖼️ IMAGEN: DEFINICIONES DE CAMPOS DEL VEHÍCULO
*(Captura de pantalla de la pestaña MHM Rentiva > Ajustes del vehículo > Definiciones de campos)*

---

## 2. Opciones de visualización

Esta pestaña controla la disposición y la visibilidad de los campos que has definido en la interfaz pública (la que ven los usuarios).

### 🔄 Elementos visibles de la tarjeta y orden
- **Arrastrar y soltar:** determina qué información aparece primero en las tarjetas de vehículos (página de listado) arrastrando y soltando los elementos.
- **Ocultar:** quita de la lista «Elementos visibles» los elementos que no quieras haciendo clic en el botón `x` que hay junto a ellos.

### 🌟 Características destacadas
En las páginas de detalle de vehículos, de forma independiente a la tabla de especificaciones técnicas, gestiona el orden y la presencia de las características destacadas en la parte superior (campos con iconos destacados).

### 📊 Ajustes de la tabla comparativa
Cuando un usuario utiliza la función de comparación de vehículos, selecciona individualmente qué detalles, características o equipamiento se comparan en la tabla.

---

### 🖼️ IMAGEN: AJUSTES DE VISUALIZACIÓN Y ORDEN
*(Captura de pantalla de la pestaña MHM Rentiva > Ajustes del vehículo > Opciones de visualización)*

---

## 💡 Notas técnicas y recomendaciones

:::important Seguridad de los datos
Si desactivas un campo en «Definiciones de campos», los datos que hayas introducido previamente para ese campo **no se eliminan**: simplemente se ocultan a los usuarios. Los datos vuelven a aparecer cuando vuelves a activar el campo.
:::

- **Orden:** el orden definido con arrastrar y soltar se aplica a las tablas de vehículos, las vistas de lista y las listas de la página «Mi cuenta».
- **Iconos:** el sistema asigna automáticamente los iconos adecuados a las características y el equipamiento estándar.

### Resumen de la sección
- **Definiciones de campos:** determina qué datos se recopilan.
- **Opciones de visualización:** determina cómo y en qué orden se presentan los datos.
- **Campos personalizados:** permite añadir un número ilimitado de detalles técnicos.

### Registro de cambios
| Fecha | Versión | Nota |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se han añadido en detalle las definiciones de campos y las opciones de visualización. |
| 26.02.2026 | 4.21.0 | Se ha creado la versión inicial. |
