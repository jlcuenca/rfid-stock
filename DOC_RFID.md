# 📡 Funcionalidad RFID - Documentación Técnica

## 📋 Descripción General
El sistema implementa un lector RFID inteligente capaz de procesar múltiples etiquetas en secuencia rápida, diseñado para trabajar con lectores de mano (handheld) o fijos que emulan teclado.

---

## ⚙️ Características Técnicas

### 1. Captura de Datos (`useRFIDScanner`)
- **Modo de entrada:** Emulación de teclado (Keyboard Wedge)
- **Delimitadores soportados:** `Tab` y `Enter`
- **Buffer:** Acumula caracteres hasta encontrar un delimitador
- **Procesamiento por lotes:** Agrupa múltiples lecturas en una ventana de tiempo (300ms)
- **Filtrado inteligente:** Ignora entradas cuando el foco está en campos de texto

### 2. Procesamiento de Lógica (`App.js`)
- **Detección automática:** Identifica si el activo es nuevo o existente
- **Alta automática:** Crea nuevos activos automáticamente si no existen
- **Registro de movimientos:** Genera un historial de cada lectura
- **Actualización de estado:** Cambia el estado (Inventario/Tránsito) según la acción seleccionada

### 3. Interfaz de Usuario
- **Indicador de estado:** Muestra si el lector está activo (punto verde pulsante)
- **Visualización de buffer:** Muestra los caracteres que se están recibiendo en tiempo real
- **Contador de lote:** Muestra cuántos códigos se han capturado en la sesión actual
- **Feedback visual:** Mensajes de éxito/error tras el procesamiento

---

## 🚀 Flujo de Trabajo

1. **Configuración:**
   - Seleccionar Acción (Entrada/Salida/Verificar)
   - Seleccionar Ubicación

2. **Lectura:**
   - El usuario escanea múltiples etiquetas
   - El lector envía: `CODIGO1` + `Tab` + `CODIGO2` + `Enter` ...

3. **Procesamiento:**
   - El sistema captura los códigos en el buffer
   - Espera 300ms de inactividad para confirmar fin de lote
   - Envía el array de códigos a `handleRFIDScan`

4. **Resultado:**
   - **Nuevos:** Se registran como "Charola Tipo A" (por defecto)
   - **Existentes:** Se actualiza su estado y ubicación
   - **Todos:** Se genera un registro en el historial de movimientos

---

## 🔧 Configuración del Lector Físico

Para un funcionamiento óptimo, configure su lector RFID con los siguientes parámetros:
- **Modo:** USB HID (Emulación de teclado)
- **Terminador:** Tab o Enter (Tab recomendado para velocidad)
- **Delay entre caracteres:** 0ms o mínimo posible
- **Idioma de teclado:** US English o Español (asegurar compatibilidad de caracteres)

---

## 🐛 Solución de Problemas

**El lector no captura nada:**
- Verifique que el foco no esté en un input de texto
- Confirme que el indicador "Activo" esté verde

**Los códigos aparecen cortados:**
- Aumente el delay entre caracteres en la configuración del lector
- Verifique la configuración de idioma del teclado

**Se procesan códigos uno por uno en lugar de en lote:**
- El delay entre lecturas es mayor a 300ms. Ajuste la velocidad de escaneo.
