import React from 'react';
import { Paciente } from '../types';

interface ListaDiagnosticosProps {
  paciente: Paciente;
}

export const ListaDiagnosticos: React.FC<ListaDiagnosticosProps> = ({ paciente }) => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-300">
        Diagnósticos
      </h4>
      {paciente.historiaClinica.diagnosticos.length > 0 ? (
        <ul className="space-y-2">
          {paciente.historiaClinica.diagnosticos.map((diagnostico) => (
            <li
              key={diagnostico.id}
              className="bg-white dark:bg-gray-700 p-3 rounded-md shadow"
            >
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                {diagnostico.nombre}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Código: {diagnostico.codigo}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Evoluciones: {diagnostico.evoluciones.length}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">
          No hay diagnósticos registrados para este paciente.
        </p>
      )}
    </div>
  );
};