import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { Diagnostico } from '../../types';

interface BuscadorDiagnosticosProps {
  diagnosticosCIE10: Diagnostico[];
  onDiagnosisSelect: (diagnosis: Diagnostico) => void;
  onClose: () => void;
}

const BuscadorDiagnosticos: React.FC<BuscadorDiagnosticosProps> = ({
  diagnosticosCIE10,
  onDiagnosisSelect,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDiagnoses, setFilteredDiagnoses] = useState(diagnosticosCIE10);

  useEffect(() => {
    const lowercasedSearch = searchTerm.toLowerCase();
    const filtered = diagnosticosCIE10.filter(
      (diag) =>
        diag.codigo.toLowerCase().includes(lowercasedSearch) ||
        diag.nombre.toLowerCase().includes(lowercasedSearch)
    );
    setFilteredDiagnoses(filtered);
  }, [searchTerm, diagnosticosCIE10]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Buscar Diagnóstico CIE-10
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Buscar por código o nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" />
        </div>
        <div className="max-h-60 overflow-y-auto">
          {filteredDiagnoses.map((diag) => (
            <button
              key={diag.id}
              onClick={() => {
                onDiagnosisSelect(diag);
                onClose();
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
            >
              <span className="font-semibold">{diag.codigo}</span> -{' '}
              {diag.nombre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuscadorDiagnosticos;