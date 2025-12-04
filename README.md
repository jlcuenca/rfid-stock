# 🏷️ RFID Stock - Sistema de Gestión de Activos Retornables

Sistema moderno de gestión de inventario con tecnología RFID para control de activos retornables (Charolas y Tarimas).

![Version](https://img.shields.io/badge/version-0.2.0-blue.svg)
![React](https://img.shields.io/badge/React-19.2.0-61dafb.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Modelo de Datos](#-modelo-de-datos)
- [Próximos Pasos](#-próximos-pasos)

---

## ✨ Características

### Funcionalidades Principales:

- ✅ **Gestión de Activos Retornables**
  - Alta de Charolas (Tipo A y B)
  - Alta de Tarimas
  - Edición y eliminación de activos

- ✅ **Dashboard en Tiempo Real**
  - Contador de inventario
  - Activos en tránsito
  - Activos en uso
  - Cálculo de pérdidas

- ✅ **Persistencia de Datos**
  - LocalStorage automático
  - Recuperación al recargar
  - Sin necesidad de backend

- ✅ **Interfaz Moderna**
  - Diseño responsive
  - Animaciones suaves
  - Feedback visual

- ✅ **Validaciones Robustas**
  - Formularios validados
  - Confirmaciones de acciones
  - Prevención de errores

---

## 🛠️ Tecnologías

- **Frontend:** React 19.2.0
- **Estilos:** CSS3 + Tailwind-like utilities
- **Persistencia:** LocalStorage API
- **Build Tool:** Create React App
- **Control de Versiones:** Git

---

## 🚀 Instalación

### Prerrequisitos:
- Node.js 14+ 
- npm 6+

### Pasos:

1. **Clonar el repositorio:**
```bash
git clone <repository-url>
cd rfid-stock
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Iniciar el servidor de desarrollo:**
```bash
npm start
```

4. **Abrir en el navegador:**
```
http://localhost:3000
```

---

## 💡 Uso

### Alta de Activos:

1. Click en el botón **"Alta"** en el header
2. Completar el formulario:
   - **Código RFID:** Identificador único
   - **Tipo de Activo:** Charola o Tarima
   - **Tipo de Charola:** A o B (solo si es charola)
   - **Responsable:** Nombre del encargado
3. Click en **"Registrar Activo"**

### Gestión de Activos:

- **Ver lista:** Scroll en la tabla de activos
- **Editar:** Click en "Editar" en la fila del activo
- **Eliminar:** Click en "Eliminar" (requiere confirmación)

### Reset del Sistema:

- Click en el botón **"Reset"** (rojo) en el header
- Confirmar la acción
- ⚠️ **Advertencia:** Esta acción elimina todos los datos

---

## 📁 Estructura del Proyecto

```
rfid-stock/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Barra de navegación
│   │   ├── Dashboard.jsx       # Métricas del sistema
│   │   ├── AssetModal.jsx      # Modal de alta/edición
│   │   ├── AssetList.jsx       # Tabla de activos
│   │   └── RFIDReader.jsx      # Configuración RFID
│   ├── hooks/
│   │   └── useLocalStorage.js  # Hook de persistencia
│   ├── App.js                  # Componente principal
│   ├── App.css                 # Estilos principales
│   ├── index.js                # Punto de entrada
│   └── index.css               # Estilos globales
├── ESTADO_ACTUAL.md            # Estado del proyecto
├── CAMBIOS_IMPLEMENTADOS.md    # Log de cambios
├── RESUMEN_IMPLEMENTACION.md   # Resumen ejecutivo
├── package.json
└── README.md
```

---

## 📊 Modelo de Datos

### Estructura de Activo:

```javascript
{
  id: "1733328000000",           // Timestamp único
  rfid: "RFID-001",              // Código RFID
  tipoActivo: "charola",         // "charola" | "tarima"
  tipoCharola: "A",              // "A" | "B" | null
  responsable: "Juan Pérez",     // Nombre del responsable
  estado: "Inventario",          // Estado actual
  ubicacion: "Bodega Principal", // Ubicación física
  fechaRegistro: "2025-12-04",   // ISO Date
  valorEstimado: 200             // Valor en pesos
}
```

### Estados Posibles:
- `Inventario` - En bodega
- `En Tránsito` - En movimiento
- `En Uso` - Asignado
- `Perdido` - Extraviado

### Tipos de Activos:
- **Charola Tipo A** - Valor: $200
- **Charola Tipo B** - Valor: $200
- **Tarima** - Valor: $500

---

## 🎯 Próximos Pasos

### 🔥 Alta Prioridad:

- [ ] Integración RFID real con lector
- [ ] Modal de edición de activos
- [ ] Búsqueda y filtros en tabla
- [ ] Notificaciones toast

### 📈 Media Prioridad:

- [ ] Historial de movimientos
- [ ] Exportación a CSV/Excel
- [ ] Validación de RFIDs duplicados
- [ ] Gráficos y reportes

### 🌟 Baja Prioridad:

- [ ] Backend API (Node.js)
- [ ] Base de datos (MongoDB/PostgreSQL)
- [ ] Autenticación de usuarios
- [ ] Modo oscuro

---

## 📝 Scripts Disponibles

### `npm start`
Inicia el servidor de desarrollo en modo watch.

### `npm test`
Ejecuta los tests en modo interactivo.

### `npm run build`
Crea el build de producción optimizado.

### `npm run eject`
⚠️ **Operación irreversible.** Expone la configuración de webpack.

---

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es privado y de uso interno.

---

## 👥 Contacto

**Proyecto:** RFID Stock  
**Versión:** 0.2.0  
**Última Actualización:** 2025-12-04

---

## 📚 Documentación Adicional

- [Estado Actual](./ESTADO_ACTUAL.md) - Estado detallado del proyecto
- [Cambios Implementados](./CAMBIOS_IMPLEMENTADOS.md) - Log de cambios técnicos
- [Resumen de Implementación](./RESUMEN_IMPLEMENTACION.md) - Resumen ejecutivo

---

**Hecho con ❤️ para la gestión eficiente de activos retornables**
