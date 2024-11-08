import React, { useState } from 'react';
import { Paciente } from '../../types';
import EvolucionList from './EvolucionList';
import EvolucionModal from './EvolucionModal';

interface ItemEvolucionProps {
  selectedPaciente: Paciente;
}

export const ItemEvolucion: React.FC<ItemEvolucionProps> = ({
  selectedPaciente,
}) => {
  const [selectedEvolucion, setSelectedEvolucion] = useState<Evolucion | null>(null);

  const handleEvolucionClick = (evolucion: Evolucion) => {
    setSelectedEvolucion(evolucion);
  };

  const closeModal = () => {
    setSelectedEvolucion(null);
  };

  const getAllEvoluciones = () => {
    return selectedPaciente.historiaClinica.diagnosticos.flatMap(diagnostico =>
      diagnostico.evoluciones.map(evolucion => ({
        ...evolucion,
        diagnostico: diagnostico.nombre
      }))
    );
  };

  const evoluciones = getAllEvoluciones();

  return (
    <div>
      <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Evoluciones
      </h4>
      {evoluciones.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          No hay evoluciones registradas para este paciente.
        </p>
      ) : (
        <EvolucionList
          evoluciones={evoluciones}
          onEvolucionClick={handleEvolucionClick}
        />
      )}

      {selectedEvolucion && (
        <EvolucionModal
          evolucion={selectedEvolucion}
          onClose={closeModal}
        />
      )}
    </div>
  );
};