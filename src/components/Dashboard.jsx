import React from 'react';

const Dashboard = ({ stats }) => {
    const { inventario, enTransito, enUso, perdida } = stats;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Inventario */}
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">Inventario</p>
                    <p className="text-2xl font-bold text-gray-900">{inventario}</p>
                </div>
            </div>

            {/* En Tránsito */}
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">En Tránsito</p>
                    <p className="text-2xl font-bold text-gray-900">{enTransito}</p>
                </div>
            </div>

            {/* En Uso */}
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">En Uso</p>
                    <p className="text-2xl font-bold text-gray-900">{enUso}</p>
                </div>
            </div>

            {/* Pérdida */}
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
                <div className="bg-red-100 p-3 rounded-lg mr-4">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">Pérdida</p>
                    <p className="text-2xl font-bold text-gray-900">${perdida}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
