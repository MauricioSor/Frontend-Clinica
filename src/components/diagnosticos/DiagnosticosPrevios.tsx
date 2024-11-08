import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import BuscadorDiagnosticos from './BuscadorDiagnosticos';
import { Diagnostico } from '../../types';

interface DiagnosticosPreviosProps {
  prevDiagnoses: Diagnostico[];
  selectedDiagnosis: Diagnostico | null;
  onDiagnosisSelect: (diagnosis: Diagnostico) => void;
  diagnosticosCIE10: Diagnostico[];
  onNewDiagnosisSelect: (diagnosis: Diagnostico) => void;
}

const DiagnosticosPrevios: React.FC<DiagnosticosPreviosProps> = ({
  prevDiagnoses,
  selectedDiagnosis,
  onDiagnosisSelect,
  diagnosticosCIE10,
  onNewDiagnosisSelect,
}) => {
  const [showDiagnosisModal, setShowDiagnosisModal] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Diagnósticos Previos
      </label>
      <div className="flex flex-wrap gap-2 mb-2">
        {prevDiagnoses.map((diagnosis) => (
          <button
            key={diagnosis.id}
            onClick={() => onDiagnosisSelect(diagnosis)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedDiagnosis && selectedDiagnosis.id === diagnosis.id
                ? 'bg-indigo-600 text-white dark:bg-indigo-500'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {diagnosis.nombre}
          </button>
        ))}
        <button
          onClick={() => setShowDiagnosisModal(true)}
          className="px-3 py-1 rounded-full text-sm bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 flex items-center"
        >
          <PlusCircle className="w-4 h-4 mr-1" /> Nuevo
        </button>
      </div>

      {/* Modal de búsqueda de diagnósticos */}
      {showDiagnosisModal && (
        <BuscadorDiagnosticos
          diagnosticosCIE10={diagnosticosCIE10.filter(
            (d) => !prevDiagnoses.some((pd) => pd.id === d.id)
          )}
          onDiagnosisSelect={(diagnosis) => {
            onNewDiagnosisSelect(diagnosis);
            setShowDiagnosisModal(false);
          }}
          onClose={() => setShowDiagnosisModal(false)}
        />
      )}
    </div>
  );
};

export default DiagnosticosPrevios;