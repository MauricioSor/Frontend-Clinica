import React from 'react';
import { X } from 'lucide-react';
import { Evolucion } from '../../types';
import EvolucionDetails from './EvolucionDetails';
import RecetaDigitalDetails from '../recetas/RecetaDigitalDetails';
import PedidoLaboratorioDetails from '../laboratorio/PedidoLaboratorioDetails';

interface EvolucionModalProps {
  evolucion: Evolucion;
  onClose: () => void;
}

const EvolucionModal: React.FC<EvolucionModalProps> = ({ evolucion, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Detalles de la Evolución
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          <EvolucionDetails evolucion={evolucion} />
          {evolucion.recetaDigital && (
            <RecetaDigitalDetails recetaDigital={evolucion.recetaDigital} />
          )}
          {evolucion.pedidoLaboratorio && (
            <PedidoLaboratorioDetails pedidoLaboratorio={evolucion.pedidoLaboratorio} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EvolucionModal;