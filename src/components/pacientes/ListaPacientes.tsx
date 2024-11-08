import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEvolutionStore } from '../../store/evolutionStore';
import { BuscadorPacientes } from './BuscadorPacientes';
import { HistoriaClinica } from '../historiaClinica/HistoriaClinica';

export const ListaPacientes: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedPaciente, resetSelectedPaciente } = useEvolutionStore();

  useEffect(() => {
    // Solo reiniciamos el paciente seleccionado si no venimos de la página de evolución
    if (!location.state?.fromEvolution) {
      resetSelectedPaciente();
      // Limpiamos el estado de navegación
      navigate('.', { replace: true, state: {} });
    }
  }, [resetSelectedPaciente, location.state?.fromEvolution, navigate]);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition-colors duration-200">
      {!selectedPaciente && <BuscadorPacientes />}
      {selectedPaciente && <HistoriaClinica />}
    </div>
  );
};