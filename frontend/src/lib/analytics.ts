import React from 'react';

// Analytics stub - Interfaz simple para disparar eventos
// Compatible con GA4 y Plausible

interface AnalyticsEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}

interface AnalyticsConfig {
  trackingId?: string;
  enabled: boolean;
}

class Analytics {
  private config: AnalyticsConfig;

  constructor() {
    this.config = {
      enabled: import.meta.env.PROD, // Solo habilitado en producción
    };
  }

  // Inicializar analytics (GA4)
  init(trackingId?: string) {
    if (!this.config.enabled || !trackingId) return;

    this.config.trackingId = trackingId;
    
    // Cargar Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);

    // Configurar gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    
    gtag('js', new Date());
    gtag('config', trackingId);
    
    (window as any).gtag = gtag;
  }

  // Enviar evento personalizado
  track(event: AnalyticsEvent) {
    if (!this.config.enabled) {
      console.log('Analytics event (dev):', event);
      return;
    }

    // Google Analytics 4
    if (this.config.trackingId && (window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
    }

    // Plausible (si está disponible)
    if ((window as any).plausible) {
      (window as any).plausible(event.action, {
        props: {
          category: event.category,
          label: event.label,
        },
      });
    }
  }

  // Eventos específicos de la aplicación
  trackPageView(page: string) {
    this.track({
      action: 'page_view',
      category: 'navigation',
      label: page,
    });
  }

  trackCtaClick(location: string) {
    this.track({
      action: 'cta_click',
      category: 'engagement',
      label: location,
    });
  }

  trackPreventaSubmitAttempt() {
    this.track({
      action: 'preventa_submit_attempt',
      category: 'conversion',
    });
  }

  trackPreventaSuccess() {
    this.track({
      action: 'preventa_enviada',
      category: 'conversion',
    });
  }

  trackPreventaError(error: string) {
    this.track({
      action: 'preventa_error',
      category: 'error',
      label: error,
    });
  }

  trackViewContent(section: string) {
    this.track({
      action: 'view_content',
      category: 'engagement',
      label: section,
    });
  }
}

// Instancia global
export const analytics = new Analytics();

// Inicializar automáticamente si hay tracking ID en las variables de entorno
if (import.meta.env.VITE_GA_TRACKING_ID) {
  analytics.init(import.meta.env.VITE_GA_TRACKING_ID);
}

// Hook para tracking automático de secciones
export const useSectionTracking = (sectionName: string) => {
  React.useEffect(() => {
    analytics.trackViewContent(sectionName);
  }, [sectionName]);
};
