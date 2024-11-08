import React from 'react';
import { Plus } from 'lucide-react';
import { Paciente } from '../types';
import EvolucionList from './EvolucionList';

interface ListaEvolucionesProps {
  paciente: Paciente;
  onNuevaEvolucion: () => void;
}

export const ListaEvoluciones: React.FC<ListaEvolucionesProps> = ({
  paciente,
  onNuevaEvolucion,
}) => {
  return (
    <div>
      <button
        onClick={onNuevaEvolucion}
        className="mb-4 flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:bg-green-600 dark:hover:bg-green-700"
      >
        <Plus className="w-5 h-5 mr-2" /> Nueva Evolución
      </button>
      <EvolucionList selectedPaciente={paciente} />
    </div>
  );
};

export default ListaEvoluciones;