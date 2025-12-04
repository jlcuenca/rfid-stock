import React from 'react';

const RFIDReader = ({ buffer, scannedCodes, action, location, onActionChange, onLocationChange }) => {
    return (
        <div className="space-y-6">
            {/* Sección de Lectura RFID Activa */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-1">Lectura RFID Activa</h2>
                        <p className="text-sm text-gray-600">
                            El lector captura múltiples códigos separados por Tab o Enter
                        </p>
                    </div>
                    <div className="flex items-center">
                        <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                        <span className="text-sm font-medium text-green-600">Activo</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg px-4 py-3">
                        <span className="text-sm font-medium text-gray-700">Buffer actual:</span>
                        <div className="mt-1 font-mono text-blue-600">
                            {buffer || <span className="text-gray-400">Esperando lectura...</span>}
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg px-4 py-3">
                        <span className="text-sm font-medium text-gray-700">Códigos capturados:</span>
                        <div className="mt-1 text-2xl font-bold text-gray-900">
                            {scannedCodes?.length || 0}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección de Configuración de Lectura */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Configuración de Lectura</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Acción a Aplicar
                        </label>
                        <select
                            value={action}
                            onChange={(e) => onActionChange(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="salida">Asignar Carga (Salida)</option>
                            <option value="entrada">Recibir Carga (Entrada)</option>
                            <option value="verificar">Verificar Estado</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ubicación
                        </label>
                        <select
                            value={location}
                            onChange={(e) => onLocationChange(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Seleccionar ubicación</option>
                            <option value="bodega">Bodega Principal</option>
                            <option value="ensamblaje">Área de Ensamblaje</option>
                            <option value="oficina">Oficina Central</option>
                        </select>
                    </div>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                    <p>• Cada código escaneado se procesa con la acción y ubicación seleccionadas</p>
                    <p>• Nuevo código → Alta automática → Aplicación de acción</p>
                    <p>• Puede procesar múltiples códigos en una sola lectura</p>
                </div>
            </div>
        </div>
    );
};

export default RFIDReader;
