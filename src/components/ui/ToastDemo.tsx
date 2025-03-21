import React, { useState } from 'react';
import { toast } from 'sonner';
import Button from './Button';
import { THEME } from '../../constants/config';

interface LoadingState {
  promise: boolean;
  error: boolean;
}

/**
 * Demonstrates various toast notification patterns using Sonner
 * Includes proper loading states and error handling
 */
const ToastDemo: React.FC = () => {
  const [loading, setLoading] = useState<LoadingState>({
    promise: false,
    error: false
  });

  
  const showBasicToast = () => toast('This is a default toast notification');
  
  const showSuccessToast = () => toast.success('Operation completed successfully!');
  
  const showErrorToast = () => toast.error('An error occurred while processing your request');
  
  const showWarningToast = () => toast.warning('Please be careful with this action');
  
  const showInfoToast = () => toast.info('Here is some information you might find useful');

  
  const showPromiseToast = (): void => {
    setLoading(prev => ({ ...prev, promise: true }));
    
    toast.promise(
      new Promise<{name: string}>((resolve) => {
        setTimeout(() => {
          resolve({ name: 'Sonner' });
        }, 2000);
      })
      .finally(() => {
        setLoading(prev => ({ ...prev, promise: false }));
      }),
      {
        loading: 'Loading...',
        success: (data) => `Successfully loaded ${data.name}!`,
        error: 'Failed to load data',
      }
    );
  };

  
  const showErrorHandlingToast = (): void => {
    setLoading(prev => ({ ...prev, error: true }));
    
    toast.promise(
      new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error('Network error'));
        }, 2000);
      })
      .catch((error: Error) => {
        console.error('Error in promise toast:', error);
        throw error; 
      })
      .finally(() => {
        setLoading(prev => ({ ...prev, error: false }));
      }),
      {
        loading: 'Attempting to fetch data...',
        success: 'Data fetched successfully!', 
        error: (err: Error) => `Error: ${err.message || 'Unknown error occurred'}`,
      }
    );
  };

  const showCustomToast = (): void => {
    toast(
      <div className="flex flex-col space-y-1">
        <span className="font-semibold">Custom Notification</span>
        <span className="text-sm">This toast has a custom component inside</span>
      </div>,
      {
        description: 'You can style it however you want',
        icon: '🔥',
        duration: 5000,
      }
    );
  };

  const showActionToast = (): void => {
    toast('Your cart has been updated', {
      description: 'New item has been added to your cart',
      action: {
        label: 'View Cart',
        onClick: () => console.log('View cart clicked')
      },
      duration: 5000,
    });
  };

  return (
    <div className="wrapper">
      <div className="max-w-4xl p-6 mx-auto my-8 bg-white shadow-md dark:bg-grayshade-400 rounded-xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">Toast Notification System</h1>
        
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Basic Notifications</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            These are the standard notification types available in the system.
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            <Button onClick={showBasicToast} variant="primary">Default Toast</Button>
            <Button onClick={showSuccessToast} variant="success">Success Toast</Button>
            <Button onClick={showErrorToast} variant="danger">Error Toast</Button>
            <Button onClick={showWarningToast} variant="warning">Warning Toast</Button>
            <Button onClick={showInfoToast} variant="info">Info Toast</Button>
          </div>
        </section>
        
        <section>
          <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Advanced Notifications</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            These examples demonstrate more complex toast notifications with loading states, promises, and interactive elements.
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Button 
              onClick={showPromiseToast} 
              variant="primary"
              disabled={loading.promise}
            >
              {loading.promise ? 'Loading...' : 'Promise Toast (Success)'}
            </Button>
            <Button 
              onClick={showErrorHandlingToast} 
              variant="primary"
              disabled={loading.error}
            >
              {loading.error ? 'Loading...' : 'Promise Toast (Error)'}
            </Button>
            <Button onClick={showCustomToast} variant="secondary">Custom Component Toast</Button>
            <Button onClick={showActionToast} variant="outline">Interactive Toast with Action</Button>
          </div>
        </section>

        {/* Theme colors from config displayed for reference */}
        <section className="pt-6 mt-10 border-t border-gray-200 dark:border-gray-600">
          <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Theme Colors</h2>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
            {Object.entries(THEME.colors).map(([name, color]) => (
              <div key={name} className="flex flex-col items-center">
                <div 
                  className="w-12 h-12 mb-2 rounded-full" 
                  style={{ backgroundColor: color }}
                ></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">{name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ToastDemo; 