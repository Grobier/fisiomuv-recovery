import React from 'react';
import { Heart, Zap, Shield, Users, Clock, Award } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { analytics } from '../lib/analytics';

interface Benefit {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: Heart,
    title: 'Recuperación Personalizada',
    description: 'Tratamientos adaptados a tus necesidades específicas y objetivos de rendimiento.',
  },
  {
    icon: Zap,
    title: 'Tecnología Avanzada',
    description: 'Equipamiento de última generación para maximizar la efectividad de cada sesión.',
  },
  {
    icon: Shield,
    title: 'Profesionales Certificados',
    description: 'Fisioterapeutas con amplia experiencia en deporte y rehabilitación.',
  },
  {
    icon: Users,
    title: 'Enfoque Holístico',
    description: 'Combinamos fisioterapia, masajes y sauna para una recuperación completa.',
  },
  {
    icon: Clock,
    title: 'Flexibilidad Horaria',
    description: 'Horarios adaptados a tu rutina, incluyendo fines de semana y horarios extendidos.',
  },
  {
    icon: Award,
    title: 'Resultados Comprobados',
    description: 'Métodos respaldados por evidencia científica y testimonios de clientes satisfechos.',
  },
];

interface BenefitsProps {
  onCtaClick?: () => void;
}

export const Benefits: React.FC<BenefitsProps> = ({ onCtaClick }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  
  const handleViewContent = () => {
    analytics.trackViewContent('beneficios');
  };

  React.useEffect(() => {
    handleViewContent();
  }, []);

  return (
    <section id="beneficios" className="section-padding bg-gray-50">
      <div className="section-container">
        <div 
          ref={ref}
          className={`text-center mb-16 scroll-animate ${isVisible ? 'visible' : ''}`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            ¿Por qué elegir FisioMuv Recovery?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nuestro enfoque integral combina ciencia, tecnología y experiencia 
            para ofrecerte la mejor experiencia de recuperación.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className={`bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:transform hover:-translate-y-2 scroll-animate-stagger ${isVisible ? 'visible' : ''} delay-${(index + 1) * 100}`}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary-100 rounded-lg mr-4">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA adicional */}
        <div className="text-center mt-16">
          <button
            onClick={() => {
              analytics.trackCtaClick('beneficios_cta');
              onCtaClick?.();
            }}
            className="btn-primary text-lg px-8 py-4"
            aria-label="Reservar preventa desde sección de beneficios"
          >
            Reserva tu preventa ahora
          </button>
        </div>
      </div>
    </section>
  );
};



