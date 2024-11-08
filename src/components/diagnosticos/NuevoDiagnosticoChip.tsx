import React from 'react';
import { XCircle } from 'lucide-react';
import { Diagnostico } from '../../types';

interface NuevoDiagnosticoChipProps {
  newDiagnosis: Diagnostico;
  onDiagnosisSelect: (diagnosis: Diagnostico) => void;
  onRemoveNewDiagnosis: () => void;
}

const NuevoDiagnosticoChip: React.FC<NuevoDiagnosticoChipProps> = ({
  newDiagnosis,
  onDiagnosisSelect,
  onRemoveNewDiagnosis,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Nuevo Diagnóstico
    </label>
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onDiagnosisSelect(newDiagnosis)}
        className="px-3 py-1 rounded-full text-sm flex items-center bg-green-100 text-green-700 border border-green-300 dark:bg-green-800 dark:text-green-200 dark:border-green-600"
      >
        <span className="mr-2">{newDiagnosis.nombre}</span>
        <XCircle
          className="w-4 h-4 cursor-pointer rounded-full hover:text-red-600 hover:bg-red-100 dark:hover:text-red-400 dark:hover:bg-red-900"
          onClick={(e) => {
            e.stopPropagation();
            onRemoveNewDiagnosis();
          }}
        />
      </button>
    </div>
  </div>
);

export default NuevoDiagnosticoChip;