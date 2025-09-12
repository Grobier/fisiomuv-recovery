import { PreVentaFormData } from './validation';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface ApiResponse<T = any> {
  ok: boolean;
  message?: string;
  data?: T;
  error?: string;
  details?: any;
}

// Función para extraer parámetros UTM de la URL
export const getUTMParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
    const value = urlParams.get(param);
    if (value) {
      utm[param] = value;
    }
  });
  
  return Object.keys(utm).length > 0 ? utm : undefined;
};

// Función para hacer requests a la API
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const url = new URL(endpoint, API_BASE_URL);
    
    // Agregar parámetros UTM a la URL si existen
    const utmParams = getUTMParams();
    if (utmParams) {
      Object.entries(utmParams).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      // Para errores de duplicado, usar el campo 'error' en lugar de 'message'
      const errorMessage = data.error === 'lead_duplicado' ? data.message : (data.message || `Error ${response.status}`);
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Endpoints específicos
export const api = {
  // Health check
  health: () => apiRequest<{ ok: boolean; timestamp: number; uptime: number }>('/api/health'),

  // Registrar lead de preventa
  registrarPreventa: async (data: PreVentaFormData) => {
    const response = await apiRequest('/api/preventa', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response;
  },
};

// Función para verificar el estado de la API
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await api.health();
    return response.ok;
  } catch {
    return false;
  }
};

