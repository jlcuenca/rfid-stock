import React, { useState } from 'react';

const AssetModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        rfid: '',
        tipoActivo: '', // 'charola' o 'tarima'
        tipoCharola: '', // 'A' o 'B' (solo si es charola)
        responsable: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Limpiar tipoCharola si cambia a tarima
        if (name === 'tipoActivo' && value === 'tarima') {
            setFormData(prev => ({ ...prev, tipoCharola: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación
        if (!formData.rfid.trim() || !formData.tipoActivo || !formData.responsable.trim()) {
            return;
        }

        if (formData.tipoActivo === 'charola' && !formData.tipoCharola) {
            return;
        }

        setIsSubmitting(true);

        // Simular proceso de alta
        setTimeout(() => {
            onSubmit(formData);
            setFormData({ rfid: '', tipoActivo: '', tipoCharola: '', responsable: '' });
            setIsSubmitting(false);
            onClose();
        }, 800);
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => !isSubmitting && onClose()}
        >
            <div
                className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-5 text-white">
                    <h2 className="text-2xl font-bold flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Nuevo Activo Retornable
                    </h2>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Código RFID */}
                            <div>
                                <label htmlFor="rfid" className="block text-sm font-medium text-gray-700 mb-1">
                                    Código RFID
                                </label>
                                <input
                                    type="text"
                                    id="rfid"
                                    name="rfid"
                                    value={formData.rfid}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Ej: RFID-2023-001"
                                />
                            </div>

                            {/* Tipo de Activo */}
                            <div>
                                <label htmlFor="tipoActivo" className="block text-sm font-medium text-gray-700 mb-1">
                                    Tipo de Activo
                                </label>
                                <select
                                    id="tipoActivo"
                                    name="tipoActivo"
                                    value={formData.tipoActivo}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                >
                                    <option value="">Seleccione una opción</option>
                                    <option value="charola">Charola</option>
                                    <option value="tarima">Tarima</option>
                                </select>
                            </div>

                            {/* Tipo de Charola (solo si es charola) */}
                            {formData.tipoActivo === 'charola' && (
                                <div>
                                    <label htmlFor="tipoCharola" className="block text-sm font-medium text-gray-700 mb-1">
                                        Tipo de Charola
                                    </label>
                                    <select
                                        id="tipoCharola"
                                        name="tipoCharola"
                                        value={formData.tipoCharola}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                    >
                                        <option value="">Seleccione tipo</option>
                                        <option value="A">Tipo A</option>
                                        <option value="B">Tipo B</option>
                                    </select>
                                </div>
                            )}

                            {/* Responsable */}
                            <div>
                                <label htmlFor="responsable" className="block text-sm font-medium text-gray-700 mb-1">
                                    Responsable
                                </label>
                                <input
                                    type="text"
                                    id="responsable"
                                    name="responsable"
                                    value={formData.responsable}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Juan Pérez"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-500">
                                <span className="font-medium text-gray-700">Nota:</span> Este activo se registrará automáticamente en inventario y estará listo para escaneo RFID
                            </p>
                        </div>
                    </form>
                </div>

                <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-4">
                    <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-75 flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Registrando...
                            </>
                        ) : (
                            'Registrar Activo'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssetModal;
