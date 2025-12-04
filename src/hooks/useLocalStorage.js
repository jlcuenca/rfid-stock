import { useState } from 'react';

/**
 * Hook personalizado para manejar LocalStorage con sincronización automática
 * @param {string} key - Clave para almacenar en localStorage
 * @param {*} initialValue - Valor inicial si no existe en localStorage
 * @returns {[*, Function]} - [valor, función para actualizar]
 */
const useLocalStorage = (key, initialValue) => {
    // Estado para almacenar el valor
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Obtener del localStorage
            const item = window.localStorage.getItem(key);
            // Parsear JSON almacenado o retornar initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error loading ${key} from localStorage:`, error);
            return initialValue;
        }
    });

    // Función para actualizar el valor
    const setValue = (value) => {
        try {
            // Permitir que value sea una función como en useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            // Guardar estado
            setStoredValue(valueToStore);

            // Guardar en localStorage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error saving ${key} to localStorage:`, error);
        }
    };

    return [storedValue, setValue];
};

export default useLocalStorage;
