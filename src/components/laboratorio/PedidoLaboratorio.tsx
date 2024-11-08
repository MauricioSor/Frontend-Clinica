import React from 'react';
import { Trash } from 'lucide-react';
import { type PedidoLaboratorio } from '../types';

interface PedidoLaboratorioProps {
  pedido: PedidoLaboratorio;
  onRemove: () => void;
  formatDate: (dateString: string) => string;
}

const PedidoLaboratorio: React.FC<PedidoLaboratorioProps> = ({
  pedido,
  onRemove,
  formatDate,
}) => {
  return (
    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
          Pedido de Laboratorio
        </h4>
        <button
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
        >
          <Trash className="w-5 h-5" />
        </button>
      </div>
      <p className="text-sm text-blue-600 dark:text-blue-300">
        Fecha: {formatDate(pedido.fecha)}
      </p>
      <div className="mt-2">
        <p className="text-blue-600 dark:text-blue-300 whitespace-pre-wrap">
          {pedido.textoDescripcion}
        </p>
      </div>
    </div>
  );
};

export default PedidoLaboratorio;
