import React from 'react';
import { MessageCircle, X } from 'lucide-react';
import { analytics } from '../lib/analytics';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  businessName?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  message = "¡Hola! Me interesa conocer más sobre los servicios de FisioMuv Recovery.",
  businessName = "FisioMuv Recovery"
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);

  // Limpiar el número de teléfono (solo dígitos)
  const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
  
  // Codificar el mensaje para URL
  const encodedMessage = encodeURIComponent(message);
  
  // URL de WhatsApp
  const whatsappUrl = `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`;

  const handleWhatsAppClick = () => {
    analytics.trackCtaClick('whatsapp_float_button');
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  const toggleTooltip = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      analytics.trackCtaClick('whatsapp_tooltip_open');
    }
  };

  const closeButton = () => {
    setIsVisible(false);
    analytics.trackCtaClick('whatsapp_button_close');
  };

  if (!isVisible) return null;

  return (
    <div className="whatsapp-float-container">
      {/* Tooltip/Mensaje */}
      {isOpen && (
        <div className="whatsapp-tooltip">
          <div className="whatsapp-tooltip-content">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="whatsapp-avatar">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">{businessName}</h4>
                  <p className="text-xs text-green-600">En línea</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Cerrar chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="whatsapp-message-bubble">
              <p className="text-sm text-gray-700 mb-3">
                ¡Hola! 👋 ¿Tienes alguna pregunta sobre nuestros servicios de recuperación?
              </p>
              <p className="text-xs text-gray-500 mb-3">
                Te responderemos lo antes posible.
              </p>
              
              <button
                onClick={handleWhatsAppClick}
                className="whatsapp-chat-button"
                aria-label="Abrir chat de WhatsApp"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Iniciar Chat
              </button>
            </div>
          </div>
          
          {/* Flecha del tooltip */}
          <div className="whatsapp-tooltip-arrow"></div>
        </div>
      )}

      {/* Botón principal */}
      <button
        onClick={toggleTooltip}
        className="whatsapp-float-button"
        aria-label="Abrir WhatsApp"
        title="¿Necesitas ayuda? Escríbenos por WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
        
        {/* Indicador de notificación */}
        <span className="whatsapp-notification-dot"></span>
      </button>

      {/* Botón de cerrar (pequeño) */}
      <button
        onClick={closeButton}
        className="whatsapp-close-button"
        aria-label="Cerrar botón de WhatsApp"
        title="Cerrar"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
};

export default WhatsAppButton;
