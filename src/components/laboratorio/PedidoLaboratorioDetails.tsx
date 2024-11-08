import React from 'react';
import { PedidoLaboratorio } from '../types';
import { formatDate } from '../../utils/dateUtils';

interface PedidoLaboratorioDetailsProps {
  pedidoLaboratorio: PedidoLaboratorio;
}

const PedidoLaboratorioDetails: React.FC<PedidoLaboratorioDetailsProps> = ({
  pedidoLaboratorio,
}) => {
  return (
    <div>
      <p className="font-semibold text-gray-700 dark:text-gray-300">
        Pedido de Laboratorio:
      </p>
      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
        <p className="text-gray-600 dark:text-gray-400">
          Fecha: {formatDate(pedidoLaboratorio.fecha)}
        </p>
        <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap mt-2">
          {pedidoLaboratorio.textoDescripcion}
        </p>
      </div>
    </div>
  );
};

export default PedidoLaboratorioDetails;
