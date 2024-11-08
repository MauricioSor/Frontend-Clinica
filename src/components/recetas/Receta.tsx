import React from 'react';
import { Trash } from 'lucide-react';
import { RecetaDigital } from '../types';

interface RecetaProps {
  recetaDigital: RecetaDigital;
  onRemoveReceta: () => void;
  formatDate: (dateString: string) => string;
}

const Receta: React.FC<RecetaProps> = ({
  recetaDigital,
  onRemoveReceta,
  formatDate,
}) => (
  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
    <div className="flex justify-between items-center mb-2">
      <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
        Receta Digital
      </h4>
      <button
        onClick={onRemoveReceta}
        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
      >
        <Trash className="w-5 h-5" />
      </button>
    </div>
    <p className="text-sm text-blue-600 dark:text-blue-300">
      Fecha: {formatDate(recetaDigital.fechaHoraReceta)}
    </p>
    <div className="mt-2">
      <h5 className="font-medium text-blue-700 dark:text-blue-300">
        Medicamentos:
      </h5>
      <ul className="list-disc list-inside">
        {recetaDigital.medicamentos.map((med, index) => (
          <li key={index} className="text-blue-600 dark:text-blue-300">
            {med.nombre} - {med.marca} ({med.dosis})
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Receta;