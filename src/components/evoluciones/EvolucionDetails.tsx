import React from 'react';
import { Evolucion } from '../types';
import { formatDate } from '../../utils/dateUtils';

interface EvolucionDetailsProps {
  evolucion: Evolucion;
}

const EvolucionDetails: React.FC<EvolucionDetailsProps> = ({ evolucion }) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
          {formatDate(evolucion.fechaEC)}
        </p>
      </div>
      <div>
        <p className="font-semibold text-gray-700 dark:text-gray-300">
          Diagnóstico:
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          {evolucion.diagnostico}
        </p>
      </div>
      <div>
        <p className="font-semibold text-gray-700 dark:text-gray-300">
          Médico:
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          Dr. {evolucion.medico.nombre} {evolucion.medico.apellido}
        </p>
      </div>
      <div>
        <p className="font-semibold text-gray-700 dark:text-gray-300">
          Evolución:
        </p>
        <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
          {evolucion.texto}
        </p>
      </div>
    </>
  );
};

export default EvolucionDetails;