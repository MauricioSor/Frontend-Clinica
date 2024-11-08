import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, FileText, FlaskConical } from 'lucide-react';
import { useEvolutionStore } from '../store/evolutionStore';
import { RecetaDigitalModal } from '../components/recetas/RecetaDigitalModal';
import DiagnosticosPrevios from '../components/diagnosticos/DiagnosticosPrevios';
import NuevoDiagnosticoChip from '../components/diagnosticos/NuevoDiagnosticoChip';
import DescripcionEvolucion from '../components/evoluciones/DescripcionEvolucion';
import Plantilla from '../components/plantillas/Plantilla';
import Receta from '../components/recetas/Receta';
import PedidoLaboratorioModal from '../components/laboratorio/PedidoLaboratorioModal';
import PedidoLaboratorio from '../components/laboratorio/PedidoLaboratorio';
import { Diagnostico } from '../types';

// Simulación de una lista de diagnósticos CIE-10
const diagnosticosCIE10 = [
  { id: '1', codigo: 'A00', nombre: 'Cólera' },
  { id: '2', codigo: 'A15', nombre: 'Tuberculosis respiratoria' },
  { id: '3', codigo: 'E11', nombre: 'Diabetes mellitus tipo 2' },
  { id: '4', codigo: 'I10', nombre: 'Hipertensión esencial (primaria)' },
  { id: '5', codigo: 'J45', nombre: 'Asma' },
  // Agrega más diagnósticos aquí...
];

const plantillas = [
  'Control de rutina',
  'Seguimiento de tratamiento',
  'Evaluación post-operatoria',
  // Agrega más plantillas según sea necesario
];

export const NuevaEvolucion: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addEvolucion, selectedPaciente, getDiagnosticosByPacienteId, addDiagnostico } = useEvolutionStore();

  const [fecha, setFecha] = useState(new Date().toISOString().substr(0, 16));
  const [medico, setMedico] = useState({
    id: 1,
    nombre: 'Juan',
    apellido: 'Pérez',
    matricula: '12345',
    especialidad: 'Médico General'
  });
  const [evolucion, setEvolucion] = useState('');
  const [selectedDiagnostico, setSelectedDiagnostico] = useState<Diagnostico | null>(null);
  const [newDiagnostico, setNewDiagnostico] = useState<Diagnostico | null>(null);
  const [plantilla, setPlantilla] = useState('');
  const [showLaboratorioModal, setShowLaboratorioModal] = useState(false);
  const [showRecetaModal, setShowRecetaModal] = useState(false);
  const [recetaDigital, setRecetaDigital] = useState(null);
  const [pedidoLaboratorio, setPedidoLaboratorio] = useState(null);

  useEffect(() => {
    if (!selectedPaciente) {
      navigateToHistoriaClinica();
    }
  }, [selectedPaciente]);

  const navigateToHistoriaClinica = () => {
    navigate('/pacientes/lista', { 
      state: { 
        fromEvolution: true,
        activeTab: 'evoluciones'
      } 
    });
  };

  const handleSave = () => {
    if (!selectedPaciente || !selectedDiagnostico) return;

    const nuevaEvolucion = {
      id: Date.now().toString(),
      texto: evolucion,
      fechaEC: fecha,
      horaEC: new Date().toTimeString().split(' ')[0],
      recetaDigital: recetaDigital,
      pedidoLaboratorio: pedidoLaboratorio,
      plantilla: plantilla ? { nombre: plantilla, textoPlantilla: evolucion } : null,
      estadoEvolucion: 'EDITABLE',
      medico: medico
    };

    // Si es un nuevo diagnóstico, primero lo agregamos
    if (newDiagnostico) {
      addDiagnostico(selectedPaciente.id, newDiagnostico);
      addEvolucion(selectedPaciente.id, newDiagnostico.id, nuevaEvolucion);
    } else {
      addEvolucion(selectedPaciente.id, selectedDiagnostico.id, nuevaEvolucion);
    }

    console.log('Evolución guardada:', nuevaEvolucion);
    alert('Evolución guardada correctamente');
    navigateToHistoriaClinica();
  };

  const handleCancel = () => {
    navigateToHistoriaClinica();
  };

  const handlePlantillaSelect = (selectedPlantilla: string) => {
    setPlantilla(selectedPlantilla);
    setEvolucion((prevEvolucion) =>
      !prevEvolucion
        ? `${prevEvolucion}${selectedPlantilla}:`
        : `${prevEvolucion}\n\n${selectedPlantilla}:`
    );
  };

  const handleDiagnosticoSelect = (diagnostico: Diagnostico) => {
    setSelectedDiagnostico(diagnostico);
    setNewDiagnostico(null);
  };

  const handleNewDiagnosticoSelect = (diagnostico: Diagnostico) => {
    setNewDiagnostico(diagnostico);
    setSelectedDiagnostico(diagnostico);
  };

  const handleRemoveNewDiagnostico = () => {
    setNewDiagnostico(null);
    setSelectedDiagnostico(null);
  };

  const handleRecetaDigitalSave = (receta) => {
    setRecetaDigital(receta);
    setShowRecetaModal(false);
  };

  const handleRemoveReceta = () => {
    setRecetaDigital(null);
  };

  const handlePedidoLaboratorioSave = (pedido) => {
    setPedidoLaboratorio(pedido);
    setShowLaboratorioModal(false);
  };

  const handleRemovePedidoLaboratorio = () => {
    setPedidoLaboratorio(null);
  };

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

  if (!selectedPaciente) {
    return <div>Cargando...</div>;
  }

  const diagnosticosPrevios = getDiagnosticosByPacienteId(selectedPaciente.id);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Nueva Evolución para {selectedPaciente.nombre} {selectedPaciente.apellido}
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Fecha y hora
            </label>
            <input
              type="datetime-local"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Médico
            </label>
            <input
              type="text"
              value={`${medico.nombre} ${medico.apellido}`}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300"
            />
          </div>
        </div>

        <DiagnosticosPrevios
          prevDiagnoses={diagnosticosPrevios}
          selectedDiagnosis={selectedDiagnostico}
          onDiagnosisSelect={handleDiagnosticoSelect}
          diagnosticosCIE10={diagnosticosCIE10}
          onNewDiagnosisSelect={handleNewDiagnosticoSelect}
        />

        {newDiagnostico && (
          <NuevoDiagnosticoChip
            newDiagnosis={newDiagnostico}
            onDiagnosisSelect={() => handleDiagnosticoSelect(newDiagnostico)}
            onRemoveNewDiagnosis={handleRemoveNewDiagnostico}
          />
        )}

        <DescripcionEvolucion
          evolucion={evolucion}
          onChange={(e) => setEvolucion(e.target.value)}
        />

        <Plantilla
          plantilla={plantilla}
          onPlantillaSelect={handlePlantillaSelect}
          plantillas={plantillas}
        />

        {recetaDigital && (
          <Receta
            recetaDigital={recetaDigital}
            onRemoveReceta={handleRemoveReceta}
            formatDate={formatDate}
          />
        )}

        {pedidoLaboratorio && (
          <PedidoLaboratorio
            pedido={pedidoLaboratorio}
            onRemove={handleRemovePedidoLaboratorio}
            formatDate={formatDate}
          />
        )}

        <div className="flex space-x-4">
          <button
            onClick={() => setShowLaboratorioModal(true)}
            className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            <FlaskConical className="w-5 h-5 mr-2" />
            {pedidoLaboratorio ? 'Editar Pedido Lab.' : 'Nuevo Pedido Lab.'}
          </button>
          <button
            onClick={() => setShowRecetaModal(true)}
            className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:bg-green-500 dark:hover:bg-green-600"
          >
            <FileText className="w-5 h-5 mr-2" />
            {recetaDigital ? 'Editar Receta' : 'Nueva Receta'}
          </button>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 dark:hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            <Save className="w-5 h-5 mr-2" /> Guardar Evolución
          </button>
        </div>
      </div>

      {showLaboratorioModal && (
        <PedidoLaboratorioModal
          onClose={() => setShowLaboratorioModal(false)}
          onSave={handlePedidoLaboratorioSave}
          pedidoExistente={pedidoLaboratorio}
        />
      )}

      {showRecetaModal && (
        <RecetaDigitalModal
          onClose={() => setShowRecetaModal(false)}
          onSave={handleRecetaDigitalSave}
          medicoNombre={`${medico.nombre} ${medico.apellido}`}
          recetaExistente={recetaDigital}
        />
      )}
    </div>
  );
};