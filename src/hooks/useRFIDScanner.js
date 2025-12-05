import { useEffect, useCallback, useRef } from 'react';

/**
 * Hook para capturar lecturas RFID desde el teclado
 * Los lectores RFID envían códigos seguidos de Tab o Enter
 * Puede leer múltiples etiquetas en secuencia
 * 
 * @param {Function} onScan - Callback cuando se completa una lectura (recibe array de códigos)
 * @param {boolean} enabled - Si el listener está activo
 * @returns {Object} - { buffer, clearBuffer, scannedCodes }
 */
const useRFIDScanner = (onScan, enabled = true) => {
    const bufferRef = useRef('');
    const codesRef = useRef([]);
    const timeoutRef = useRef(null);

    const clearBuffer = useCallback(() => {
        bufferRef.current = '';
        codesRef.current = [];
    }, []);

    const processCode = useCallback((code) => {
        const trimmedCode = code.trim();
        if (trimmedCode) {
            codesRef.current.push(trimmedCode);
        }
    }, []);

    const finalizeScan = useCallback(() => {
        if (codesRef.current.length > 0) {
            onScan([...codesRef.current]);
            clearBuffer();
        }
    }, [onScan, clearBuffer]);

    useEffect(() => {
        if (!enabled) return;

        const handleKeyDown = (event) => {
            // Ignorar si el foco está en un input, textarea o select
            const activeElement = document.activeElement;
            if (
                activeElement &&
                (activeElement.tagName === 'INPUT' ||
                    activeElement.tagName === 'TEXTAREA' ||
                    activeElement.tagName === 'SELECT')
            ) {
                return;
            }

            // Teclas delimitadoras comunes en lectores RFID
            if (event.key === 'Tab' || event.key === 'Enter' || event.key === ';') {
                event.preventDefault();

                // Procesar lo que hay en el buffer
                if (bufferRef.current) {
                    processCode(bufferRef.current);
                    bufferRef.current = '';
                }

                // Reiniciar el temporizador para finalizar el lote
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }

                // Esperar un poco más (500ms) por si es un flujo continuo de múltiples tags
                timeoutRef.current = setTimeout(() => {
                    finalizeScan();
                }, 500);

                return;
            }

            // Ignorar otras teclas especiales que no sean Backspace
            if (event.key.length > 1 && event.key !== 'Backspace') {
                return;
            }

            // Manejo de Backspace
            if (event.key === 'Backspace') {
                bufferRef.current = bufferRef.current.slice(0, -1);
                return;
            }

            // Agregar carácter al buffer
            bufferRef.current += event.key;

            // También reiniciamos el timeout al escribir, para mantener el lote "vivo" 
            // mientras entran datos muy rápido
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                if (bufferRef.current) {
                    // Si quedó algo en el buffer tras el timeout (ej. último código sin Enter)
                    processCode(bufferRef.current);
                    bufferRef.current = '';
                }
                finalizeScan();
            }, 500);
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [enabled, processCode, finalizeScan]);

    return {
        buffer: bufferRef.current,
        clearBuffer,
        scannedCodes: codesRef.current
    };
};

export default useRFIDScanner;
