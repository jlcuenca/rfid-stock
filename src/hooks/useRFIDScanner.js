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

            // Tab o Enter finalizan un código
            if (event.key === 'Tab' || event.key === 'Enter') {
                event.preventDefault();

                // Procesar el código actual del buffer
                if (bufferRef.current) {
                    processCode(bufferRef.current);
                    bufferRef.current = '';
                }

                // Limpiar timeout anterior
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }

                // Esperar 300ms para ver si vienen más códigos
                timeoutRef.current = setTimeout(() => {
                    finalizeScan();
                }, 300);

                return;
            }

            // Ignorar teclas especiales
            if (event.key.length > 1 && event.key !== 'Backspace') {
                return;
            }

            // Backspace
            if (event.key === 'Backspace') {
                bufferRef.current = bufferRef.current.slice(0, -1);
                return;
            }

            // Agregar carácter al buffer
            bufferRef.current += event.key;
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
