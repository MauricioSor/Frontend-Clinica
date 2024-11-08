import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { PedidoLaboratorio } from '../types';

interface PedidoLaboratorioModalProps {
  onClose: () => void;
  onSave: (pedido: PedidoLaboratorio) => void;
  pedidoExistente?: PedidoLaboratorio | null;
}

const PedidoLaboratorioModal: React.FC<PedidoLaboratorioModalProps> = ({
  onClose,
  onSave,
  pedidoExistente,
}) => {
  const [fecha, setFecha] = useState(
    pedidoExistente?.fecha || new Date().toISOString().substr(0, 10)
  );
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState('');
  const [textoPersonalizado, setTextoPersonalizado] = useState(
    pedidoExistente?.textoDescripcion || ''
  );

  // Define tus plantillas de pedidos de laboratorio aquí
  const plantillas = [
    {
      nombre: 'Hemograma completo',
      texto: 'Se solicita un hemograma completo para evaluar los componentes celulares de la sangre, incluyendo recuento de glóbulos rojos, glóbulos blancos y plaquetas, así como los índices eritrocitarios.',
    },
    {
      nombre: 'Perfil metabólico básico',
      texto: 'Se solicita un perfil metabólico básico que incluye glucemia, creatinina, electrolitos y enzimas hepáticas para evaluar el estado metabólico general del paciente.',
    },
    {
      nombre: 'Perfil lipídico',
      texto: 'Se solicita un perfil lipídico completo para evaluar el riesgo cardiovascular del paciente, incluyendo colesterol total, HDL, LDL y triglicéridos.',
    },
    {
      nombre: 'Evaluación tiroidea',
      texto: 'Se solicita una evaluación de la función tiroidea mediante la medición de TSH (Tirotropina) para descartar alteraciones en la glándula tiroides.',
    },
    {
      nombre: 'Perfil renal',
      texto: 'Se solicita un perfil renal que incluye creatinina, urea y ácido úrico para evaluar la función renal del paciente.',
    },
  ];

  const handlePlantillaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlantilla = plantillas.find(
      (p) => p.nombre === e.target.value
    );
    if (selectedPlantilla) {
      setPlantillaSeleccionada(selectedPlantilla.nombre);
      setTextoPersonalizado(selectedPlantilla.texto);
    } else {
      setPlantillaSeleccionada('');
      setTextoPersonalizado('');
    }
  };

  const handleSave = () => {
    const nuevoPedido: PedidoLaboratorio = {
      id: pedidoExistente?.id || Date.now().toString(),
      fecha,
      textoDescripcion: textoPersonalizado,
    };
    onSave(nuevoPedido);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Pedido de Laboratorio
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="fecha"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Fecha
            </label>
            <input
              type="date"
              id="fecha"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="plantilla"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Plantilla
            </label>
            <select
              id="plantilla"
              value={plantillaSeleccionada}
              onChange={handlePlantillaChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Seleccione una plantilla</option>
              {plantillas.map((plantilla) => (
                <option key={plantilla.nombre} value={plantilla.nombre}>
                  {plantilla.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="textoPersonalizado"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Texto personalizado
            </label>
            <textarea
              id="textoPersonalizado"
              value={textoPersonalizado}
              onChange={(e) => setTextoPersonalizado(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 dark:hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            Guardar Pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default PedidoLaboratorioModal;