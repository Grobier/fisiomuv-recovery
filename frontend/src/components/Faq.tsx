import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { analytics } from '../lib/analytics';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: '¿Qué incluye el servicio de preventa?',
    answer: 'La preventa incluye acceso prioritario a nuestros servicios con precios especiales, reserva garantizada para los primeros clientes y un plan personalizado de recuperación adaptado a tus necesidades.',
  },
  {
    question: '¿Los precios de preventa son finales?',
    answer: 'Sí, los precios mostrados son los precios finales para clientes de preventa. Una vez que abramos al público general, los precios regulares serán aplicados.',
  },
  {
    question: '¿Puedo cambiar mi servicio después de reservar?',
    answer: 'Sí, puedes cambiar tu servicio seleccionado contactándonos antes de tu cita programada. Te ayudaremos a encontrar la opción que mejor se adapte a tus necesidades.',
  },
  {
    question: '¿Qué pasa si no puedo asistir en la fecha programada?',
    answer: 'Entendemos que pueden surgir imprevistos. Te permitimos reprogramar tu cita con al menos 24 horas de anticipación sin costo adicional.',
  },
  {
    question: '¿Ofrecen paquetes corporativos?',
    answer: 'Sí, ofrecemos paquetes especiales para empresas que buscan promover el bienestar de sus empleados. Contáctanos para más información sobre nuestros programas corporativos.',
  },
];

interface FaqItemComponentProps {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

const FaqItemComponent: React.FC<FaqItemComponentProps> = ({
  item,
  index,
  isOpen,
  onToggle,
}) => {
  const handleToggle = () => {
    analytics.trackCtaClick(`faq_${index}_${isOpen ? 'close' : 'open'}`);
    onToggle();
  };

  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        onClick={handleToggle}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg transition-colors duration-200"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="font-medium text-gray-900">{item.question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
        )}
      </button>
      
      {isOpen && (
        <div
          id={`faq-answer-${index}`}
          className="px-6 pb-4 text-gray-600 leading-relaxed"
          role="region"
          aria-labelledby={`faq-question-${index}`}
        >
          {item.answer}
        </div>
      )}
    </div>
  );
};

export const Faq: React.FC = () => {
  const [openItems, setOpenItems] = useState(new Set<number>());

  const toggleItem = (index: number) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  React.useEffect(() => {
    analytics.trackViewContent('faq');
  }, []);

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-gray-600">
              Resolvemos las dudas más comunes sobre nuestros servicios
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((item, index) => (
              <FaqItemComponent
                key={index}
                item={item}
                index={index}
                isOpen={openItems.has(index)}
                onToggle={() => toggleItem(index)}
              />
            ))}
          </div>

          {/* CTA final */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              ¿No encuentras la respuesta que buscas?
            </p>
            <button
              onClick={() => {
                analytics.trackCtaClick('faq_contact');
                document.getElementById('preventa-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary text-lg px-8 py-4"
              aria-label="Contactar para más información"
            >
              Contáctanos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};



