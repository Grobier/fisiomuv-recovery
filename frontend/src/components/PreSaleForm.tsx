import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Send } from 'lucide-react';
import { preventaSchema, PreVentaFormData, Interes } from '../lib/validation';
import { api } from '../lib/api';
import { analytics } from '../lib/analytics';
import { useToast, ToastContainer } from './Toast';

interface PreSaleFormProps {
  onSuccess?: () => void;
}

export const PreSaleForm: React.FC<PreSaleFormProps> = ({ onSuccess }) => {
  const { toasts, showSuccess, showError, removeToast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<PreVentaFormData>({
    resolver: zodResolver(preventaSchema),
    defaultValues: {
      email: '',
      nombre: '',
      interes: 'Masaje Manual',
      consent: false,
    },
  });

  const watchedInteres = watch('interes');

  const onSubmit = async (data: PreVentaFormData) => {
    try {
      setIsSubmitting(true);
      analytics.trackPreventaSubmitAttempt();

      await api.registrarPreventa(data);

      analytics.trackPreventaSuccess();
      console.log('Mostrando mensaje de éxito');
      showSuccess('¡Listo! Te contactaremos para agendar tu cita.');
      
      reset();
      onSuccess?.();
    } catch (error: any) {
      console.error('Error submitting form:', error);
      console.log('Error message:', error.message);
      console.log('Error includes lead_duplicado:', error.message?.includes('lead_duplicado'));
      
      let errorMessage = 'Hubo un error al enviar tu solicitud. Intenta de nuevo.';
      
      if (error.message?.includes('Ya tienes una reserva para este servicio')) {
        // Si ya existe, mostrar mensaje de éxito en lugar de error
        analytics.trackPreventaSuccess();
        console.log('Mostrando mensaje de éxito para duplicado');
        showSuccess('¡Perfecto! Ya tienes una reserva para este servicio. Te contactaremos pronto.');
        reset();
        onSuccess?.();
        return;
      } else if (error.message?.includes('validation_error')) {
        errorMessage = 'Por favor revisa los datos ingresados.';
      }
      
      analytics.trackPreventaError(error.message || 'unknown_error');
      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInteresChange = (interes: Interes) => {
    setValue('interes', interes);
    analytics.trackCtaClick(`form_interes_${interes.toLowerCase()}`);
  };

  React.useEffect(() => {
    analytics.trackViewContent('formulario_preventa');
  }, []);

  return (
    <section id="preventa-form" className="section-padding bg-gray-50">
      {/* Toast Container */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
      
      <div className="section-container">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Reserva tu Preventa
            </h2>
            <p className="text-xl text-gray-600">
              Completa el formulario y te contactaremos para agendar tu cita
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className={`input-field ${errors.email ? 'input-error' : ''}`}
                placeholder="tu@email.com"
                aria-describedby={errors.email ? 'email-error' : undefined}
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && (
                <p id="email-error" className="mt-2 text-sm text-red-600" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre (opcional)
              </label>
              <input
                {...register('nombre')}
                type="text"
                id="nombre"
                className="input-field"
                placeholder="Tu nombre"
              />
            </div>

            {/* Interés */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Servicio de interés *
              </label>
              <div className="space-y-4">
                {/* Servicios Individuales */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Servicios Individuales</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(['Masaje Manual', 'Pistola de Percusión', 'Sauna'] as const).map((interes) => (
                      <button
                        key={interes}
                        type="button"
                        onClick={() => handleInteresChange(interes)}
                        className={`p-4 rounded-lg border-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                          watchedInteres === interes
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300'
                        }`}
                        aria-pressed={watchedInteres === interes}
                      >
                        {interes}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Packs */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Packs (Más Convenientes)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(['Pack Recovery', 'Pack Express'] as const).map((interes) => (
                      <button
                        key={interes}
                        type="button"
                        onClick={() => handleInteresChange(interes)}
                        className={`p-4 rounded-lg border-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                          watchedInteres === interes
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300'
                        }`}
                        aria-pressed={watchedInteres === interes}
                      >
                        {interes}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {errors.interes && (
                <p className="mt-2 text-sm text-red-600" role="alert">
                  {errors.interes.message}
                </p>
              )}
            </div>

            {/* Consentimiento */}
            <div>
              <div className="flex items-start">
                <input
                  {...register('consent')}
                  type="checkbox"
                  id="consent"
                  className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  aria-describedby={errors.consent ? 'consent-error' : 'consent-help'}
                  aria-invalid={errors.consent ? 'true' : 'false'}
                />
                <label htmlFor="consent" className="ml-3 text-sm text-gray-700">
                  Acepto los{' '}
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-500 underline focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                    onClick={(e) => {
                      e.preventDefault();
                      // TODO: Abrir modal o página de términos y condiciones
                    }}
                  >
                    términos y condiciones
                  </a>{' '}
                  y la{' '}
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-500 underline focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                    onClick={(e) => {
                      e.preventDefault();
                      // TODO: Abrir modal o página de política de privacidad
                    }}
                  >
                    política de privacidad
                  </a>
                  *
                </label>
              </div>
              {errors.consent && (
                <p id="consent-error" className="mt-2 text-sm text-red-600" role="alert">
                  {errors.consent.message}
                </p>
              )}
              <p id="consent-help" className="mt-2 text-xs text-gray-500">
                Necesitamos tu consentimiento para procesar tu solicitud de preventa.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              aria-describedby={isSubmitting ? 'submitting-status' : undefined}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Reservar preventa
                </>
              )}
            </button>

            {isSubmitting && (
              <p id="submitting-status" className="text-center text-sm text-gray-500">
                Procesando tu solicitud...
              </p>
            )}
          </form>

          {/* Información adicional */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Te contactaremos en las próximas 24 horas para confirmar tu cita.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

