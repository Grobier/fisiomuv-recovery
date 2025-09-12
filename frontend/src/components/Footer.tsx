import React from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { analytics } from '../lib/analytics';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (link: string) => {
    analytics.trackCtaClick(`footer_${link}`);
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="section-container">
        {/* Contenido principal */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-4">
                FisioMuv <span className="text-primary-400">Recovery</span>
              </h3>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Tu centro de recuperación y bienestar físico. Combinamos fisioterapia, 
                masajes terapéuticos y sauna para ofrecerte la mejor experiencia de recuperación.
              </p>
              <div className="flex items-center text-sm text-gray-400">
                <Heart className="h-4 w-4 mr-2 text-red-500" />
                Hecho con pasión por tu bienestar
              </div>
            </div>

            {/* Servicios */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <button
                    onClick={() => {
                      handleLinkClick('masaje');
                      document.getElementById('precios')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-primary-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                  >
                    Masaje Terapéutico
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLinkClick('pistola');
                      document.getElementById('precios')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-primary-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                  >
                    Pistola de Masaje
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLinkClick('sauna');
                      document.getElementById('precios')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-primary-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                  >
                    Sesión de Sauna
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLinkClick('pack');
                      document.getElementById('precios')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-primary-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                  >
                    Pack Completo
                  </button>
                </li>
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 text-primary-400" />
                  <span className="text-sm">hola@fisiomuv.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3 text-primary-400" />
                  <span className="text-sm">+57 (1) 234-5678</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-3 text-primary-400 mt-0.5" />
                  <span className="text-sm">
                    Bogotá, Colombia<br />
                    Próximamente
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-gray-800"></div>

        {/* Bottom */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} FisioMuv Recovery. Todos los derechos reservados.
            </div>
            
            <div className="flex space-x-6">
              <button
                onClick={() => handleLinkClick('terms')}
                className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
              >
                Términos y Condiciones
              </button>
              <button
                onClick={() => handleLinkClick('privacy')}
                className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
              >
                Política de Privacidad
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};


