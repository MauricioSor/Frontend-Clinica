import React, { useState, useEffect } from 'react';
import { useEvolutionStore } from '../../store/evolutionStore';
import { useNavigate, useLocation } from 'react-router-dom';
import { DatosPaciente } from '../pacientes/DatosPaciente';
import { ListaEvoluciones } from '../evoluciones/ListaEvoluciones';
import { ListaDiagnosticos } from '../diagnosticos/ListaDiagnosticos';
import { ListaRecetas } from '../recetas/ListaRecetas';
import { EncabezadoHistoriaClinica } from './EncabezadoHistoriaClinica';
import { PieHistoriaClinica } from './PieHistoriaClinica';

export const HistoriaClinica: React.FC = () => {
  const [activeTab, setActiveTab] = useState('datos');
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPaciente, resetSelectedPaciente } = useEvolutionStore();

  useEffect(() => {
    if (location.state?.fromEvolution) {
      setActiveTab('evoluciones');
    } else {
      setActiveTab('datos');
    }
  }, [location.state, selectedPaciente]);

  const handleNuevaEvolucion = () => {
    if (selectedPaciente) {
      navigate(`/pacientes/${selectedPaciente.id}/nueva-evolucion`);
    }
  };

  const handleExportPDF = () => {
    alert('Funcionalidad de exportar a PDF no implementada aún.');
  };

  const handlePrint = () => {
    alert('Funcionalidad de imprimir no implementada aún.');
  };

  const handleSearchNewPatient = () => {
    resetSelectedPaciente();
    navigate('/pacientes/lista', { replace: true, state: {} });
  };

  if (!selectedPaciente) {
    return <div>No se ha seleccionado ningún paciente.</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      <EncabezadoHistoriaClinica
        paciente={selectedPaciente}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSearchNewPatient={handleSearchNewPatient}
      />

      <div className="p-4 sm:p-6">
        <div className="max-w-full overflow-x-auto">
          {activeTab === 'datos' && <DatosPaciente paciente={selectedPaciente} />}

          {activeTab === 'evoluciones' && (
            <ListaEvoluciones
              paciente={selectedPaciente}
              onNuevaEvolucion={handleNuevaEvolucion}
            />
          )}

          {activeTab === 'diagnosticos' && (
            <ListaDiagnosticos paciente={selectedPaciente} />
          )}

          {activeTab === 'recetas' && <ListaRecetas paciente={selectedPaciente} />}
        </div>
      </div>

      <PieHistoriaClinica
        onExportPDF={handleExportPDF}
        onPrint={handlePrint}
      />
    </div>
  );
};