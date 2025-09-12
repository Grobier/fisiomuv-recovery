import React from 'react';

export const Test: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🚀 FisioMuv Recovery
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Página de prueba funcionando correctamente
        </p>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Sistema de Preventa
          </h2>
          <p className="text-gray-600 mb-6">
            El frontend está funcionando. Ahora vamos a probar el formulario.
          </p>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            onClick={() => {
              console.log('Botón clickeado');
              alert('¡Frontend funcionando correctamente!');
            }}
          >
            Probar Frontend
          </button>
        </div>
      </div>
    </div>
  );
};
