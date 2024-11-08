// Plantilla.tsx
import React from 'react';

interface PlantillaProps {
  plantilla: string;
  onPlantillaSelect: (plantilla: string) => void;
  plantillas: string[];
}

const Plantilla: React.FC<PlantillaProps> = ({
  plantilla,
  onPlantillaSelect,
  plantillas,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      Plantilla
    </label>
    <select
      value={plantilla}
      onChange={(e) => onPlantillaSelect(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      <option value="">Seleccione una plantilla</option>
      {plantillas.map((plant) => (
        <option key={plant} value={plant}>
          {plant}
        </option>
      ))}
    </select>
  </div>
);

export default Plantilla;
