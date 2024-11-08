import React from 'react';
import { RecetaDigital } from '../types';
import { formatDate } from '../../utils/dateUtils';

interface RecetaDigitalDetailsProps {
  recetaDigital: RecetaDigital;
}

const RecetaDigitalDetails: React.FC<RecetaDigitalDetailsProps> = ({ recetaDigital }) => {
  return (
    <div>
      <p className="font-semibold text-gray-700 dark:text-gray-300">
        Receta Digital:
      </p>
      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
        <p className="text-gray-600 dark:text-gray-400">
          Fecha: {formatDate(recetaDigital.fechaHoraReceta)}
        </p>
        <p className="font-semibold text-gray-700 dark:text-gray-300 mt-2">
          Medicamentos:
        </p>
        <ul className="list-disc list-inside">
          {recetaDigital.medicamentos.map((med, index) => (
            <li
              key={index}
              className="text-gray-600 dark:text-gray-400"
            >
              {med.nombre} - {med.marca} (Dosis: {med.dosis || 'No especificada'})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecetaDigitalDetails;