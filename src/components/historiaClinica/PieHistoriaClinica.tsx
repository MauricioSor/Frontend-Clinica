import React from 'react';
import { FileText, Printer } from 'lucide-react';

interface PieHistoriaClinicaProps {
  onExportPDF: () => void;
  onPrint: () => void;
}

export const PieHistoriaClinica: React.FC<PieHistoriaClinicaProps> = ({
  onExportPDF,
  onPrint,
}) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 border-t border-gray-200 dark:border-gray-600 flex justify-end space-x-4">
      <button
        onClick={onExportPDF}
        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        <FileText className="w-5 h-5 mr-2" /> Exportar PDF
      </button>
      <button
        onClick={onPrint}
        className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:bg-green-600 dark:hover:bg-green-700"
      >
        <Printer className="w-5 h-5 mr-2" /> Imprimir
      </button>
    </div>
  );
};