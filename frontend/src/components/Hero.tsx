import React from 'react';
import { ArrowDown } from 'lucide-react';
import { analytics } from '../lib/analytics';

interface HeroProps {
  onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const handleCtaClick = () => {
    analytics.trackCtaClick('hero');
    onCtaClick();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-white">
      <div className="section-container text-center">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          {/* Logo/Brand */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              FisioMuv{' '}
              <span className="text-gradient">Recovery</span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Recupérate mejor. Rinde más.
          </p>

          {/* Description */}
          <p className="text-lg text-gray-500 mb-12 max-w-3xl mx-auto">
            Descubre nuestra experiencia única de recuperación con servicios profesionales 
            de fisioterapia, masajes terapéuticos, pistola de masaje y sauna. 
            Diseñado para atletas, deportistas y cualquier persona que busque 
            optimizar su bienestar físico.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={handleCtaClick}
              className="btn-primary text-lg px-8 py-4 w-full sm:w-auto"
              aria-label="Reservar preventa - Scroll al formulario"
            >
              Reserva tu preventa
            </button>
            
            <button
              onClick={() => {
                analytics.trackCtaClick('hero_learn_more');
                document.getElementById('beneficios')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto"
              aria-label="Conoce más sobre los beneficios"
            >
              Conoce más
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => {
                analytics.trackCtaClick('hero_scroll_down');
                document.getElementById('beneficios')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex flex-col items-center text-gray-400 hover:text-primary-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg p-2"
              aria-label="Desplazarse hacia abajo"
            >
              <span className="text-sm mb-2">Descubre más</span>
              <ArrowDown className="h-6 w-6 animate-bounce" />
            </button>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-accent-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-2000"></div>
      </div>
    </section>
  );
};

