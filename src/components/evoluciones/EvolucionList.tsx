import React, { useState } from 'react';
import { Paciente, Evolucion } from '../../types';
import EvolucionItem from './EvolucionItem';
import EvolucionModal from './EvolucionModal';

interface EvolucionListProps {
  selectedPaciente: Paciente;
}

export const EvolucionList: React.FC<EvolucionListProps> = ({
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
        <ul className="space-y-3">
          {evoluciones.map((evolucion) => (
            <EvolucionItem
              key={evolucion.id}
              evolucion={evolucion}
              onClick={() => handleEvolucionClick(evolucion)}
            />
          ))}
        </ul>
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

export default EvolucionList;