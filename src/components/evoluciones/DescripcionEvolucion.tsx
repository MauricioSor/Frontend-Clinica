// DescripcionEvolucion.tsx
import React from 'react';

interface DescripcionEvolucionProps {
  evolucion: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const DescripcionEvolucion: React.FC<DescripcionEvolucionProps> = ({ evolucion, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      Evolución
    </label>
    <textarea
      value={evolucion}
      onChange={onChange}
      rows={2}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      placeholder="Escriba la evolución aquí..."
    />
  </div>
);

export default DescripcionEvolucion;
