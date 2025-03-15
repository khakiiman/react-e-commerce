import { createContext, useContext } from 'react';
import { Toaster, toast } from 'sonner';

/**
 * @typedef {Object} ToastContextValue
 * @property {function(string, string=, number=): void} showToast - Show a toast notification
 * @property {function(string): void} hideToast - Hide a specific toast by ID
 */

/** @type {React.Context<ToastContextValue>} */
const ToastContext = createContext(null);

/**
 * Toast provider component
 * Wraps the application with Sonner toast functionality
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 */
export function ToastProvider({ children }) {
  /**
   * Display a toast notification
   * 
   * @param {string} message - The message to display
   * @param {('success'|'error'|'info'|'warning')} [type='success'] - Toast type
   * @param {number} [duration=3000] - Duration in milliseconds
   */
  const showToast = (message, type = 'success', duration = 3000) => {
    
    switch(type) {
      case 'success':
        toast.success(message, { duration });
        break;
      case 'error':
        toast.error(message, { duration });
        break;
      case 'warning':
        toast.warning(message, { duration });
        break;
      case 'info':
        toast.info(message, { duration });
        break;
      default:
        toast(message, { duration });
    }
  };

  /**
   * Dismiss a toast notification
   * 
   * @param {string} id - Toast ID to dismiss
   */
  const hideToast = (id) => {
    toast.dismiss(id);
  };

  /** @type {ToastContextValue} */
  const contextValue = { showToast, hideToast };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Toaster 
        position="top-center"
        toastOptions={{
          className: 'custom-toast',
          style: {
            background: 'var(--background)',
            color: 'var(--foreground)',
            border: '1px solid var(--border)',
          },
        }}
        richColors
        expand={false}
        closeButton
      />
    </ToastContext.Provider>
  );
}

/**
 * Hook to use toast functionality
 * @returns {ToastContextValue} Toast context with show and hide methods
 * @throws {Error} If used outside of ToastProvider
 */
export function useToast() {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return context;
} 