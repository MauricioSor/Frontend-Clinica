import React from 'react';
import { ChevronRight, FileText, FlaskConical } from 'lucide-react';
import { Evolucion } from '../types';
import { formatDate } from '../../utils/dateUtils';
//import { formatDate } from '../utils/dateUtils';

interface EvolucionItemProps {
  evolucion: Evolucion;
  onClick: () => void;
}

const EvolucionItem: React.FC<EvolucionItemProps> = ({ evolucion, onClick }) => {
  return (
    <li
      className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-indigo-600 dark:text-indigo-400">
            {formatDate(evolucion.fechaEC)}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            {evolucion.diagnostico}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Dr. {evolucion.medico.apellido}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {evolucion.recetaDigital && (
            <FileText
              className="w-5 h-5 text-green-500 dark:text-green-400"
              title="Tiene receta médica"
            />
          )}
          {evolucion.pedidoLaboratorio && (
            <FlaskConical
              className="w-5 h-5 text-blue-500 dark:text-blue-400"
              title="Tiene pedido de laboratorio"
            />
          )}
          <ChevronRight className="text-gray-400" />
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
        {evolucion.texto}
      </p>
    </li>
  );
};

export default EvolucionItem;