import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export type ToastType = 'success' | 'error';

interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  onClose: (id: string) => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  id,
  type,
  message,
  onClose,
  duration = 5000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, onClose, duration]);

  const handleClose = () => {
    onClose(id);
  };

  const toastClasses = type === 'success' 
    ? 'toast-success border-green-200 bg-green-50 text-green-800' 
    : 'toast-error border-red-200 bg-red-50 text-red-800';

  return (
    <div
      className={`toast ${toastClasses}`}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={handleClose}
          className="ml-4 flex-shrink-0 p-1 rounded-md hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          aria-label="Cerrar notificación"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// Hook para manejar múltiples toasts
export const useToast = () => {
  const [toasts, setToasts] = React.useState<Array<{
    id: string;
    type: ToastType;
    message: string;
  }>>([]);

  const addToast = (type: ToastType, message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showSuccess = (message: string) => addToast('success', message);
  const showError = (message: string) => addToast('error', message);

  return {
    toasts,
    showSuccess,
    showError,
    removeToast,
  };
};

// Componente contenedor de toasts
interface ToastContainerProps {
  toasts: Array<{
    id: string;
    type: ToastType;
    message: string;
  }>;
  onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={onClose}
        />
      ))}
    </div>
  );
};



