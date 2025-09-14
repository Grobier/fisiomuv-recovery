import React, { useState, useEffect } from 'react';
import { Users, Award, Star, Calendar } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const Counter: React.FC<CounterProps & { shouldStart: boolean }> = ({ 
  end, 
  duration = 2000, 
  suffix = '', 
  prefix = '', 
  shouldStart 
}) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Fallback: mostrar el número final después de 5 segundos si no ha empezado
    const fallbackTimer = setTimeout(() => {
      if (!hasStarted) {
        setCount(end);
        setHasStarted(true);
      }
    }, 5000);

    if (shouldStart && !hasStarted) {
      setHasStarted(true);
      clearTimeout(fallbackTimer);
      
      const totalSteps = Math.ceil(duration / 16);
      const increment = end / totalSteps;
      let current = 0;
      let step = 0;
      
      const timer = setInterval(() => {
        step++;
        current = Math.min(increment * step, end);
        
        if (step >= totalSteps || current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);

      return () => {
        clearInterval(timer);
        clearTimeout(fallbackTimer);
      };
    }

    return () => clearTimeout(fallbackTimer);
  }, [shouldStart, hasStarted, end, duration]);

  // Si por alguna razón no se ha iniciado después de mucho tiempo, mostrar el valor final
  useEffect(() => {
    const emergencyTimer = setTimeout(() => {
      setCount(end);
    }, 8000);

    return () => clearTimeout(emergencyTimer);
  }, [end]);

  return (
    <span>
      {prefix}{count}{suffix}
    </span>
  );
};

export const TrustIndicators: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [shouldStartCounters, setShouldStartCounters] = useState(false);

  // Fallback: iniciar contadores después de 1 segundo si no se detecta visibilidad
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setShouldStartCounters(true);
    }, 1000);

    if (isVisible) {
      setShouldStartCounters(true);
      clearTimeout(fallbackTimer);
    }

    return () => clearTimeout(fallbackTimer);
  }, [isVisible]);

  const stats = [
    {
      icon: Users,
      value: 1300,
      suffix: '+',
      label: 'Pacientes Atendidos',
      description: 'En total'
    },
    {
      icon: Calendar,
      value: 10,
      suffix: '+',
      label: 'Años de Experiencia',
      description: 'Como fisioterapeuta'
    },
    {
      icon: Star,
      value: 5,
      suffix: '/5',
      label: 'Calificación Promedio',
      description: 'Satisfacción del cliente'
    },
    {
      icon: Award,
      value: 15,
      suffix: '+',
      label: 'Certificaciones',
      description: 'Especializaciones'
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-blue-50">
      <div className="section-container">
        <div 
          ref={sectionRef}
          className={`text-center mb-16 scroll-animate ${isVisible ? 'visible' : ''}`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Resultados que Hablan por Sí Solos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Más de una década de experiencia respaldada por resultados reales y la confianza de nuestros pacientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`scroll-animate-scale ${isVisible ? 'visible' : ''} delay-${(index + 1) * 100} text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2`}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                  <Icon className="h-8 w-8 text-primary-600" />
                </div>
                
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  <Counter 
                    end={stat.value} 
                    suffix={stat.suffix}
                    duration={2000 + (index * 200)}
                    shouldStart={shouldStartCounters}
                  />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {stat.label}
                </h3>
                
                <p className="text-sm text-gray-600">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
