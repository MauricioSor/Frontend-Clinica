import React from 'react';
import { Paciente } from '../../types';

interface DatosPacienteProps {
  paciente: Paciente;
}

export const DatosPaciente: React.FC<DatosPacienteProps> = ({ paciente }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      <div className="flex flex-col items-center md:items-start">
        <img
          src={paciente.foto}
          alt={`${paciente.nombre} ${paciente.apellido}`}
          className="w-32 h-32 rounded-full object-cover shadow-lg mb-4"
        />
      </div>
      <div className="flex-1 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nombre completo</p>
              <p className="text-base font-semibold text-gray-800 dark:text-gray-200">
                {paciente.nombre} {paciente.apellido}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">CUIL</p>
              <p className="text-base text-gray-800 dark:text-gray-200">{paciente.cuil}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pasaporte</p>
              <p className="text-base text-gray-800 dark:text-gray-200">{paciente.pasaporte}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Fecha de Nacimiento</p>
              <p className="text-base text-gray-800 dark:text-gray-200">{paciente.fechaNacimiento}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Obra Social</p>
              <p className="text-base text-gray-800 dark:text-gray-200">{paciente.obraSocial}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nro. Afiliado</p>
              <p className="text-base text-gray-800 dark:text-gray-200">{paciente.nroAfiliado}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};