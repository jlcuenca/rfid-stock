import React, { useState, useMemo } from 'react';
import './App.css';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import RFIDReader from './components/RFIDReader';
import AssetModal from './components/AssetModal';
import AssetList from './components/AssetList';
import ScanStatus from './components/ScanStatus';
import useLocalStorage from './hooks/useLocalStorage';
import useRFIDScanner from './hooks/useRFIDScanner';

const App = () => {
  // Estado persistente con LocalStorage
  const [assets, setAssets] = useLocalStorage('rfid-assets', []);
  const [movements, setMovements] = useLocalStorage('rfid-movements', []);

  // Estado local
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState('salida');
  const [location, setLocation] = useState('bodega');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastScanResult, setLastScanResult] = useState(null);

  // Procesar códigos RFID escaneados
  const handleRFIDScan = async (codes) => {
    setIsProcessing(true);
    setLastScanResult(null);

    let nuevos = 0;
    let existentes = 0;
    const processedAssets = [];
    const processedMovements = [];

    for (const rfidCode of codes) {
      // Buscar si el activo ya existe
      const existingAsset = assets.find(a => a.rfid === rfidCode);

      if (!existingAsset) {
        // Alta automática de nuevo activo
        const newAsset = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          rfid: rfidCode,
          tipoActivo: 'charola', // Por defecto, se puede mejorar con un modal
          tipoCharola: 'A', // Por defecto
          responsable: 'Sistema',
          estado: action === 'entrada' ? 'Inventario' : 'En Tránsito',
          ubicacion: location || 'Bodega Principal',
          fechaRegistro: new Date().toISOString(),
          valorEstimado: 200
        };
        processedAssets.push(newAsset);
        nuevos++;
      } else {
        existentes++;
      }

      // Registrar movimiento
      const movement = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        rfid: rfidCode,
        accion: action,
        ubicacion: location || 'Bodega Principal',
        fecha: new Date().toISOString(),
        usuario: 'Sistema'
      };
      processedMovements.push(movement);

      // Actualizar estado del activo existente
      if (existingAsset) {
        const updatedAsset = {
          ...existingAsset,
          estado: action === 'entrada' ? 'Inventario' :
            action === 'salida' ? 'En Tránsito' : existingAsset.estado,
          ubicacion: location || existingAsset.ubicacion
        };
        processedAssets.push(updatedAsset);
      }
    }

    // Simular procesamiento
    await new Promise(resolve => setTimeout(resolve, 800));

    // Actualizar assets
    setAssets(prev => {
      const existingIds = new Set(prev.map(a => a.id));
      const newAssets = processedAssets.filter(a => !existingIds.has(a.id));
      const updatedExisting = prev.map(asset => {
        const updated = processedAssets.find(pa => pa.id === asset.id);
        return updated || asset;
      });
      return [...updatedExisting, ...newAssets];
    });

    // Agregar movimientos
    setMovements(prev => [...prev, ...processedMovements]);

    setLastScanResult({
      message: `Procesados ${codes.length} código(s) exitosamente`,
      nuevos,
      existentes,
      total: codes.length
    });

    setIsProcessing(false);

    // Limpiar resultado después de 5 segundos
    setTimeout(() => setLastScanResult(null), 5000);
  };

  // Hook de escaneo RFID
  const { buffer, scannedCodes } = useRFIDScanner(handleRFIDScan, !isModalOpen);

  // Calcular estadísticas basadas en los activos
  const stats = useMemo(() => {
    const inventario = assets.filter(a => a.estado === 'Inventario').length;
    const enTransito = assets.filter(a => a.estado === 'En Tránsito').length;
    const enUso = assets.filter(a => a.estado === 'En Uso').length;
    const perdida = assets.filter(a => a.estado === 'Perdido').reduce((sum, a) => sum + (a.valorEstimado || 0), 0);

    return {
      inventario,
      enTransito,
      enUso,
      perdida
    };
  }, [assets]);

  // Manejar el registro manual de activo
  const handleAssetSubmit = (formData) => {
    const newAsset = {
      id: Date.now().toString(),
      rfid: formData.rfid,
      tipoActivo: formData.tipoActivo,
      tipoCharola: formData.tipoCharola || null,
      responsable: formData.responsable,
      estado: 'Inventario',
      ubicacion: location || 'Bodega Principal',
      fechaRegistro: new Date().toISOString(),
      valorEstimado: formData.tipoActivo === 'tarima' ? 500 : 200
    };

    setAssets(prev => [...prev, newAsset]);
  };

  // Manejar edición de activo
  const handleEdit = (asset) => {
    console.log('Editar activo:', asset);
    // TODO: Implementar modal de edición
  };

  // Manejar eliminación de activo
  const handleDelete = (assetId) => {
    if (window.confirm('¿Estás seguro de eliminar este activo?')) {
      setAssets(prev => prev.filter(a => a.id !== assetId));
    }
  };

  // Manejar reset completo
  const handleReset = () => {
    if (window.confirm('¿Estás seguro de resetear todos los datos? Esta acción no se puede deshacer.')) {
      setAssets([]);
      setMovements([]);
      setAction('salida');
      setLocation('bodega');
      setLastScanResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onOpenModal={() => setIsModalOpen(true)}
        onReset={handleReset}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Estado de Escaneo */}
        <ScanStatus
          scannedCodes={scannedCodes}
          isProcessing={isProcessing}
          lastScanResult={lastScanResult}
        />

        {/* Sección de Lectura RFID */}
        <RFIDReader
          buffer={buffer}
          scannedCodes={scannedCodes}
          action={action}
          location={location}
          onActionChange={setAction}
          onLocationChange={setLocation}
        />

        {/* Dashboard de Métricas */}
        <Dashboard stats={stats} />

        {/* Lista de Activos */}
        <AssetList
          assets={assets}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      {/* Modal de Alta */}
      <AssetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAssetSubmit}
      />
    </div>
  );
};

export default App;