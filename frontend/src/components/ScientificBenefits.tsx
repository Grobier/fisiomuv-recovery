import React from 'react';
import { CheckCircle, BookOpen, TrendingUp, Heart, Zap, Shield } from 'lucide-react';
import { analytics } from '../lib/analytics';

export const ScientificBenefits: React.FC = () => {
  const handleViewContent = () => {
    analytics.trackViewContent('beneficios_cientificos');
  };

  React.useEffect(() => {
    handleViewContent();
  }, []);

  return (
    <section id="beneficios-cientificos" className="section-padding bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Beneficios Científicamente Comprobados
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            La ciencia respalda los beneficios de usar sauna inmediatamente después de entrenar. 
            Aquí tienes la evidencia con estudios citados.
          </p>
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Beneficios Principales */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <TrendingUp className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Mejora del Rendimiento</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">+32% tiempo hasta el agotamiento</p>
                    <p className="text-sm text-gray-600">En corredores entrenados tras 3 semanas de sauna post-entreno</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">+7% volumen plasmático</p>
                    <p className="text-sm text-gray-600">Más sangre disponible para rendir</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Mejor recuperación neuromuscular</p>
                    <p className="text-sm text-gray-600">Salto CMJ mejorado tras sesiones de fuerza</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <Heart className="h-8 w-8 text-red-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Beneficios Cardiovasculares</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">-8 mmHg presión sistólica</p>
                    <p className="text-sm text-gray-600">En ensayo de 8 semanas con población general</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Mayor capacidad cardiorrespiratoria</p>
                    <p className="text-sm text-gray-600">Mejora del VO₂máx estimado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hipertrofia y Recuperación */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <Zap className="h-8 w-8 text-yellow-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Apoyo a la Hipertrofia</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Potencia vía Akt-mTOR</p>
                    <p className="text-sm text-gray-600">Señales anabólicas mejoradas tras ejercicio de fuerza</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Mayor capilarización muscular</p>
                    <p className="text-sm text-gray-600">Mejor perfusión y aporte de nutrientes</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Aumento de masa muscular segmentaria</p>
                    <p className="text-sm text-gray-600">Estudio de 12 sesiones mostró mejoras en piernas</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <Shield className="h-8 w-8 text-purple-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Recuperación y Prevención</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Menor dolor muscular (DOMS)</p>
                    <p className="text-sm text-gray-600">Efectos profilácticos tras ejercicio excéntrico</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Mejor recuperación con sauna infrarroja</p>
                    <p className="text-sm text-gray-600">Menor frecuencia cardíaca post-sesión</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Referencias */}
        <div className="mt-8 text-center">
          <div className="bg-gray-50 rounded-lg p-4 w-full">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Referencias Científicas</h4>
            <p className="text-xs text-gray-600 mb-2">
              Todos los beneficios están respaldados por estudios publicados en PubMed, 
              Frontiers, y otras revistas científicas revisadas por pares.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              <span>• PubMed</span>
              <span>• Frontiers in Physiology</span>
              <span>• Journal of Applied Physiology</span>
              <span>• European Journal of Applied Physiology</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
