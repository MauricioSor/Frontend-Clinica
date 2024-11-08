import React, { useState, useEffect } from 'react';
import { X, Plus, Trash, Search } from 'lucide-react';
import { RecetaDigital, Medicamento } from '../types';

interface RecetaDigitalModalProps {
  onClose: () => void;
  onSave: (receta: RecetaDigital) => void;
  medicoNombre: string;
  recetaExistente?: RecetaDigital | null;
}

// Simulación de una base de datos de medicamentos
const medicamentosDB = [
  { codigo: 'MED001', marca: 'Farmacorp', nombre: 'Paracetamol' },
  { codigo: 'MED002', marca: 'Bayer', nombre: 'Aspirina' },
  { codigo: 'MED003', marca: 'Roche', nombre: 'Ibuprofeno' },
  // Agrega más medicamentos aquí...
];

export const RecetaDigitalModal: React.FC<RecetaDigitalModalProps> = ({ onClose, onSave, medicoNombre, recetaExistente }) => {
  const [receta, setReceta] = useState<RecetaDigital>(
    recetaExistente || {
      id: Date.now().toString(),
      fechaHoraReceta: new Date().toISOString(),
      codigoBarras: '',
      qr: '',
      firma: '',
      estado: 'activa',
      medicamentos: [],
    }
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Medicamento[]>([]);

  useEffect(() => {
    if (!recetaExistente) {
      setReceta(prev => ({
        ...prev,
        codigoBarras: `RD-${prev.id}`,
        qr: `https://clinicapp.com/recetas/${prev.id}`,
        firma: `Dr. ${medicoNombre} - ${new Date().toISOString()}`
      }));
    }
  }, [medicoNombre, recetaExistente]);

  const handleSearch = () => {
    const results = medicamentosDB.filter(med => 
      med.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.marca.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleAddMedicamento = (med: Medicamento) => {
    setReceta(prev => ({
      ...prev,
      medicamentos: [...prev.medicamentos, { ...med, dosis: '' }]
    }));
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleRemoveMedicamento = (index: number) => {
    setReceta(prev => ({
      ...prev,
      medicamentos: prev.medicamentos.filter((_, i) => i !== index)
    }));
  };

  const handleDosisChange = (index: number, dosis: string) => {
    setReceta(prev => ({
      ...prev,
      medicamentos: prev.medicamentos.map((med, i) => 
        i === index ? { ...med, dosis } : med
      )
    }));
  };

  const handleSave = () => {
    onSave(receta);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {recetaExistente ? 'Editar Receta Digital' : 'Nueva Receta Digital'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Buscar Medicamento
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Buscar por código, nombre o marca"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {searchResults.length > 0 && (
            <div className="mt-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Resultados de búsqueda</h4>
              <ul className="bg-gray-100 dark:bg-gray-700 rounded-md divide-y divide-gray-200 dark:divide-gray-600">
                {searchResults.map((med) => (
                  <li key={med.codigo} className="px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer" onClick={() => handleAddMedicamento(med)}>
                    <span className="font-medium">{med.nombre}</span> - {med.marca} (Código: {med.codigo})
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Medicamentos en la receta</h4>
            {receta.medicamentos.map((med, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <span className="flex-grow">{med.nombre} - {med.marca}</span>
                <input
                  type="text"
                  placeholder="Dosis"
                  value={med.dosis}
                  onChange={(e) => handleDosisChange(index, e.target.value)}
                  className="w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <button
                  onClick={() => handleRemoveMedicamento(index)}
                  className="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 dark:hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            Guardar Receta
          </button>
        </div>
      </div>
    </div>
  );
};