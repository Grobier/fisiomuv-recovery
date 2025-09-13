import React from 'react';
import { Check, Star } from 'lucide-react';
import { analytics } from '../lib/analytics';

interface Service {
  id: string;
  name: string;
  duration: string;
  originalPrice: number;
  features: string[];
  popular?: boolean;
  isPack?: boolean;
  memberPrice?: number;
}

// Servicios individuales y packs según la imagen
const individualServices: Service[] = [
  {
    id: 'masaje',
    name: 'Masaje Manual',
    duration: '30 min',
    originalPrice: 27000,
    features: [
      'Técnicas de masaje especializadas',
      'Evaluación inicial personalizada',
      'Tratamiento de puntos específicos',
      'Relajación profunda',
    ],
  },
  {
    id: 'pistola',
    name: 'Pistola de Percusión',
    duration: '20 min',
    originalPrice: 17000,
    features: [
      'Tecnología de percusión avanzada',
      'Múltiples velocidades y cabezales',
      'Alivio inmediato de tensión',
      'Tratamiento de músculos específicos',
    ],
  },
  {
    id: 'sauna',
    name: 'Sauna',
    duration: '20 min',
    originalPrice: 20000,
    features: [
      'Sauna infrarroja de última generación',
      'Ambiente controlado y seguro',
      'Hidratación incluida',
      'Desintoxicación natural',
    ],
  },
];

const packServices: Service[] = [
  {
    id: 'pack-recovery',
    name: 'Pack Recovery',
    duration: '70 min',
    originalPrice: 43000,
    memberPrice: 32000,
    features: [
      'Masaje manual (30 min)',
      'Pistola de percusión (20 min)',
      'Sauna (20 min)',
      'Guía para potenciar tu recuperación en el sueño',
      'Protocolo de recovery científico',
    ],
    isPack: true,
    popular: true,
  },
  {
    id: 'pack-express',
    name: 'Pack Express',
    duration: '40 min',
    originalPrice: 27000,
    memberPrice: 22000,
    features: [
      'Masaje manual (30 min)',
      'Pistola de percusión (10 min)',
      'Sesión rápida y efectiva',
    ],
    isPack: true,
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price);
};

interface PricingProps {
  onServiceSelect?: (serviceId: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onServiceSelect }) => {
  const handleViewContent = () => {
    analytics.trackViewContent('precios');
  };

  const handleCtaClick = (serviceId: string) => {
    analytics.trackCtaClick(`precios_${serviceId}`);
    onServiceSelect?.(serviceId);
  };

  React.useEffect(() => {
    handleViewContent();
  }, []);

  return (
    <section id="precios" className="section-padding bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Servicios y Precios
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Recupera tu cuerpo después de entrenar con masaje, percusión y sauna en una sola sesión
          </p>
          
          {/* Banner de preventa */}
          <div className="inline-flex items-center bg-orange-500 text-white px-6 py-3 rounded-full text-sm font-medium mb-8">
            <Star className="h-4 w-4 mr-2" />
            SOLO 10 CUPOS - Reserva tu preventa
          </div>
        </div>

        {/* Servicios Individuales */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Servicios Individuales (Valor Normal)
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {individualServices.map((service) => (
              <div
                key={service.id}
                className="relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border-2 border-gray-100"
              >
                <div className="p-8">
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {service.name}
                    </h4>
                    <p className="text-gray-500 text-sm">{service.duration}</p>
                  </div>

                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-3xl font-bold text-primary-600">
                        {formatPrice(service.originalPrice)}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleCtaClick(service.id)}
                    className="w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 btn-secondary"
                    aria-label={`Reservar preventa para ${service.name}`}
                  >
                    Reservar preventa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Packs */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Packs (Más Convenientes)
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {packServices.map((service) => (
              <div
                key={service.id}
                className={`relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border-2 ${
                  service.popular 
                    ? 'border-primary-500 ring-2 ring-primary-200' 
                    : 'border-gray-100'
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Más Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {service.name}
                    </h4>
                    <p className="text-gray-500 text-sm">{service.duration}</p>
                  </div>

                  <div className="text-center mb-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary-600">
                          {formatPrice(service.memberPrice!)}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">Socios</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="text-lg font-semibold text-gray-600">
                          {formatPrice(service.originalPrice)}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">Normal</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, index) => {
                      const isBonus = feature.includes('Guía para potenciar') || feature.includes('Protocolo de recovery');
                      return (
                        <li key={index} className="flex items-start">
                          <Check className={`h-5 w-5 mr-3 mt-0.5 flex-shrink-0 ${isBonus ? 'text-yellow-500' : 'text-green-500'}`} />
                          <span className={`text-sm ${isBonus ? 'text-yellow-700 font-semibold' : 'text-gray-600'}`}>
                            {isBonus && '🎁 '}{feature}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  <button
                    onClick={() => handleCtaClick(service.id)}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                      service.popular
                        ? 'btn-primary'
                        : 'btn-secondary'
                    }`}
                    aria-label={`Reservar preventa para ${service.name}`}
                  >
                    Reservar preventa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nota sobre socios */}
        <div className="mt-16 text-center">
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-teal-800 text-sm">
              <strong>*SOCIO:</strong> Alumnos/as de Kutral con matrícula vigente
            </p>
          </div>
        </div>

        {/* Beneficios */}
        <div className="mt-8 text-center">
          <div className="bg-teal-500 text-white px-6 py-4 rounded-lg">
            <p className="text-sm font-medium">
              REDUCE LA FATIGA • MEJORA TU MOVILIDAD • ACELERA TU RECUPERACIÓN
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

