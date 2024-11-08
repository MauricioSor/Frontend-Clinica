import React, { useState } from 'react';
import { Paciente, RecetaDigital, Evolucion } from '../types';
import { DetalleRecetaModal } from './DetalleRecetaModal';

interface ListaRecetasProps {
  paciente: Paciente;
}

export const ListaRecetas: React.FC<ListaRecetasProps> = ({ paciente }) => {
  const [selectedReceta, setSelectedReceta] = useState<RecetaDigital | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleRecetaClick = (receta: RecetaDigital, evolucion: Evolucion) => {
    setSelectedReceta({ ...receta, evolucion });
  };

  const closeRecetaModal = () => {
    setSelectedReceta(null);
  };

  return (
    <div>
      <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-300">
        Recetas
      </h4>
      {paciente.historiaClinica.diagnosticos.some((d) =>
        d.evoluciones.some((e) => e.recetaDigital)
      ) ? (
        <ul className="space-y-2">
          {paciente.historiaClinica.diagnosticos.flatMap((diagnostico) =>
            diagnostico.evoluciones
              .filter((evolucion) => evolucion.recetaDigital)
              .map((evolucion) => (
                <li
                  key={evolucion.id}
                  className="bg-white dark:bg-gray-700 p-3 rounded-md shadow cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-150"
                  onClick={() => handleRecetaClick(evolucion.recetaDigital!, evolucion)}
                >
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    Receta del {formatDate(evolucion.fechaEC)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Diagnóstico: {diagnostico.nombre}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Medicamentos: {evolucion.recetaDigital?.medicamentos.length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Estado: {evolucion.recetaDigital?.estado}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Médico: Dr. {evolucion.medico.apellido} {evolucion.medico.nombre}
                  </p>
                </li>
              ))
          )}
        </ul>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">
          No hay recetas registradas para este paciente.
        </p>
      )}

      {selectedReceta && (
        <DetalleRecetaModal
          receta={selectedReceta}
          onClose={closeRecetaModal}
          formatDate={formatDate}
        />
      )}
    </div>
  );
};