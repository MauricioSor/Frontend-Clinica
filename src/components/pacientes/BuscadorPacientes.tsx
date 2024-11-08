import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { useEvolutionStore } from '../../store/evolutionStore';

// Simulación de una base de datos de pacientes
const pacientesDB = [
  {
    id: 1,
    nombre: 'Juan',
    apellido: 'Pérez',
    cuil: '20-12345678-9',
    pasaporte: 'AB123456',
    fechaNacimiento: '1980-05-15',
    foto: 'https://randomuser.me/api/portraits/men/70.jpg',
    obraSocial: 'OSDE',
    nroAfiliado: '12345678',
  },
  {
    id: 2,
    nombre: 'María',
    apellido: 'González',
    cuil: '27-98765432-1',
    pasaporte: 'CD789012',
    fechaNacimiento: '1992-11-30',
    foto: 'https://randomuser.me/api/portraits/women/22.jpg',
    obraSocial: 'Swiss Medical',
    nroAfiliado: '87654321',
  },
  {
    id: 3,
    nombre: 'Carlos',
    apellido: 'Rodríguez',
    cuil: '23-45678901-2',
    pasaporte: 'EF345678',
    fechaNacimiento: '1975-08-22',
    foto: 'https://randomuser.me/api/portraits/men/72.jpg',
    obraSocial: 'Galeno',
    nroAfiliado: '23456789',
  },
];

export const BuscadorPacientes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<typeof pacientesDB>([]);
  const [error, setError] = useState('');

  const { selectedPaciente, setPaciente, addPaciente, pacientes } = useEvolutionStore();

  const handleSearch = () => {
    setError('');
    if (!searchTerm.trim()) {
      setError('Por favor, ingrese un término de búsqueda.');
      return;
    }

    const results = pacientesDB.filter(
      (paciente) =>
        paciente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paciente.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paciente.cuil.includes(searchTerm) ||
        paciente.pasaporte.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (results.length === 0) {
      setError('No se encontraron pacientes con los datos ingresados.');
    }

    setSearchResults(results);
    setPaciente(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePatientSelect = (patient: typeof pacientesDB[0]) => {
    const existingPatient = pacientes.find(p => p.id === patient.id);
    if (existingPatient) {
      setPaciente(existingPatient);
    } else {
      const newPatient = {
        ...patient,
        historiaClinica: {
          nroHistoriaClinica: `HC-${patient.id}`,
          fechaCreacion: new Date().toISOString().split('T')[0],
          horaCreacion: new Date().toTimeString().split(' ')[0],
          diagnosticos: []
        }
      };
      addPaciente(newPatient);
      setPaciente(newPatient);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        Buscar Paciente
      </h2>

      <div className="mb-6 flex">
        <input
          type="text"
          placeholder="Ingrese CUIL, pasaporte o nombre del paciente"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {searchResults.length > 0 && !selectedPaciente && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-300">
            Resultados de la búsqueda
          </h3>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {searchResults.map((patient) => (
              <li
                key={patient.id}
                className="py-4 flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => handlePatientSelect(patient)}
              >
                <img
                  src={patient.foto}
                  alt={`${patient.nombre} ${patient.apellido}`}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {patient.nombre} {patient.apellido}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    HC: {patient.id} | Nacimiento: {patient.fechaNacimiento}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};