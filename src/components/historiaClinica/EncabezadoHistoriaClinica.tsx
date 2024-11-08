import React from 'react';
import { Search } from 'lucide-react';
import { Paciente } from '../../types';

interface EncabezadoHistoriaClinicaProps {
  paciente: Paciente;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSearchNewPatient: () => void;
}

export const EncabezadoHistoriaClinica: React.FC<EncabezadoHistoriaClinicaProps> = ({
  paciente,
  activeTab,
  setActiveTab,
  onSearchNewPatient,
}) => {
  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-700 p-4 border-b border-gray-200 dark:border-gray-600">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 break-words">
            Historia Clínica de {paciente.nombre} {paciente.apellido}
          </h3>
          <button
            onClick={onSearchNewPatient}
            className="w-full sm:w-auto flex items-center justify-center px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-200"
          >
            <Search className="w-4 h-4 mr-2" />
            Buscar otro paciente
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200 dark:border-gray-600 overflow-x-auto">
        <nav className="flex whitespace-nowrap">
          {['datos', 'evoluciones', 'diagnosticos', 'recetas'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium flex-shrink-0 ${
                activeTab === tab
                  ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};