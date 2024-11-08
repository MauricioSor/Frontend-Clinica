import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

export const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full text-center p-8">
        <ShieldAlert className="mx-auto h-16 w-16 text-red-500" />
        <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
          Acceso no autorizado
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          No tienes permisos para acceder a esta página.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};