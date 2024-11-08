import React from 'react';
import { X } from 'lucide-react';
import { RecetaDigital } from '../types';

interface DetalleRecetaModalProps {
  receta: RecetaDigital & { evolucion: any };
  onClose: () => void;
  formatDate: (date: string) => string;
}

export const DetalleRecetaModal: React.FC<DetalleRecetaModalProps> = ({
  receta,
  onClose,
  formatDate,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Detalles de la Receta
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
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              Fecha de la receta:
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {formatDate(receta.fechaHoraReceta)}
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              Médico:
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Dr. {receta.evolucion.medico.nombre} {receta.evolucion.medico.apellido}
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              Estado de la receta:
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {receta.estado}
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              Medicamentos:
            </p>
            <ul className="list-disc list-inside">
              {receta.medicamentos.map((med, index) => (
                <li key={index} className="text-gray-600 dark:text-gray-400">
                  {med.nombre} - {med.marca} (Dosis: {med.dosis || 'No especificada'})
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              Código de barras:
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {receta.codigoBarras}
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              QR:
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {receta.qr}
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              Firma digital:
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {receta.firma}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};