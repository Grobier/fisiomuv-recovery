import React, { useState, useEffect } from 'react';
import { X, Users } from 'lucide-react';

export const PreventaFloatingWidget: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const cuposVendidos = 3;
  const cuposTotal = 10;
  const cuposDisponibles = cuposTotal - cuposVendidos;
  const porcentajeVendido = (cuposVendidos / cuposTotal) * 100;

  // Mostrar el widget después de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Animar la barra de progreso
      setTimeout(() => {
        setProgress(porcentajeVendido);
      }, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [porcentajeVendido]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleReservar = () => {
    document.getElementById('preventa-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-slideInLeft">
      <div className="bg-white rounded-xl shadow-2xl border border-orange-200 p-4 max-w-xs">
        {/* Header con botón cerrar */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Users className="h-4 w-4 text-orange-500 mr-2" />
            <span className="text-sm font-semibold text-gray-900">
              Preventa: {cuposVendidos}/{cuposTotal}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Cerrar"
          >
            <X className="h-3 w-3 text-gray-400" />
          </button>
        </div>

        {/* Barra de progreso */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-600">Progreso</span>
            <span className="text-xs font-bold text-orange-600">
              {Math.round(porcentajeVendido)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Efecto de brillo */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Mensaje de urgencia */}
        <div className="text-center mb-3">
          <p className="text-xs text-red-600 font-medium">
            Solo quedan {cuposDisponibles} cupos
          </p>
        </div>

        {/* Botón CTA */}
        <button
          onClick={handleReservar}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold py-2 px-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          Reservar Cupo
        </button>
      </div>
    </div>
  );
};
