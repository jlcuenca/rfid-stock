import React from 'react';

const ScanStatus = ({ scannedCodes, isProcessing, lastScanResult }) => {
    if (scannedCodes.length === 0 && !lastScanResult) {
        return null;
    }

    return (
        <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    {isProcessing ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="text-sm font-medium text-gray-700">
                                Procesando {scannedCodes.length} código(s)...
                            </span>
                        </>
                    ) : lastScanResult ? (
                        <>
                            <svg className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-medium text-green-700">
                                {lastScanResult.message}
                            </span>
                        </>
                    ) : null}
                </div>

                {lastScanResult && (
                    <div className="text-xs text-gray-500">
                        {lastScanResult.nuevos > 0 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800 mr-2">
                                {lastScanResult.nuevos} nuevo(s)
                            </span>
                        )}
                        {lastScanResult.existentes > 0 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                                {lastScanResult.existentes} existente(s)
                            </span>
                        )}
                    </div>
                )}
            </div>

            {scannedCodes.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {scannedCodes.map((code, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                            {code}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ScanStatus;
