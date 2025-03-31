import { createContext, ReactNode, useContext } from 'react';
import { toast, Toaster } from 'sonner';

import { Toast } from '../types/store';

interface ToastContextType {
  showToast: (message: string | Toast) => void;
  hideToast: (id: string) => void;
}

interface ToastProviderProps {
  children: ReactNode;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: ToastProviderProps) {
  const showToast = (messageOrToast: string | Toast, type = 'success', duration = 3000) => {
    if (typeof messageOrToast === 'object') {
      const {
        message,
        type: toastType = 'success',
        duration: toastDuration = 3000,
      } = messageOrToast;
      switch (toastType) {
        case 'success':
          toast.success(message, { duration: toastDuration });
          break;
        case 'error':
          toast.error(message, { duration: toastDuration });
          break;
        case 'info':
          toast.info(message, { duration: toastDuration });
          break;
        case 'warning':
          toast.warning(message, { duration: toastDuration });
          break;
        default:
          toast(message, { duration: toastDuration });
      }
      return;
    }

    switch (type) {
      case 'success':
        toast.success(messageOrToast, { duration });
        break;
      case 'error':
        toast.error(messageOrToast, { duration });
        break;
      case 'info':
        toast.info(messageOrToast, { duration });
        break;
      case 'warning':
        toast.warning(messageOrToast, { duration });
        break;
      default:
        toast(messageOrToast, { duration });
    }
  };

  const hideToast = (id: string) => {
    toast.dismiss(id);
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      <Toaster
        position="top-center"
        toastOptions={{
          className: 'custom-toast',
          duration: 3000,
        }}
        closeButton
        richColors
      />
      {children}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
