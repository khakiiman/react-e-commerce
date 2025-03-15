import { useState } from 'react';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';
import StatusWrapper from '../components/ui/StatusWrapper';
import Button from '../components/ui/Button';

const ComponentDemo = () => {
  const [demoState, setDemoState] = useState({
    isLoading: false,
    isError: false,
    isEmpty: false
  });

  const toggleState = (state) => {
    setDemoState(prev => {
      const reset = { isLoading: false, isError: false, isEmpty: false };
      return { ...reset, [state]: !prev[state] };
    });
  };

  const simulateApiCall = async () => {
    setDemoState({ isLoading: true, isError: false, isEmpty: false });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const rand = Math.random();
      if (rand < 0.33) {
        setDemoState({ isLoading: false, isError: true, isEmpty: false });
      } else if (rand < 0.66) {
        setDemoState({ isLoading: false, isError: false, isEmpty: true });
      } else {
        setDemoState({ isLoading: false, isError: false, isEmpty: false });
      }
    } catch (error) {
      setDemoState({ isLoading: false, isError: true, isEmpty: false });
    }
  };
  
  return (
    <div className="wrapper">
      <div className="max-w-4xl p-6 mx-auto my-8 bg-white shadow-md dark:bg-grayshade-400 rounded-xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">Component Demo</h1>
        
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">UI State Management</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            This demonstrates how to use our reusable components for consistent loading, error, and empty states throughout the application.
          </p>
          
          <div className="grid grid-cols-2 gap-3 mb-6 md:grid-cols-4">
            <Button onClick={() => toggleState('isLoading')} variant={demoState.isLoading ? 'primary' : 'outline'}>
              {demoState.isLoading ? 'Hide Loading' : 'Show Loading'}
            </Button>
            <Button onClick={() => toggleState('isError')} variant={demoState.isError ? 'danger' : 'outline'}>
              {demoState.isError ? 'Hide Error' : 'Show Error'}
            </Button>
            <Button onClick={() => toggleState('isEmpty')} variant={demoState.isEmpty ? 'warning' : 'outline'}>
              {demoState.isEmpty ? 'Hide Empty' : 'Show Empty'}
            </Button>
            <Button onClick={simulateApiCall} variant="primary" disabled={demoState.isLoading}>
              Simulate API Call
            </Button>
          </div>
          
          <div className="p-4 overflow-hidden border rounded-lg bg-gray-50 dark:bg-grayshade-500">
            <h3 className="mb-4 text-lg font-medium text-gray-700 dark:text-gray-200">StatusWrapper Demo</h3>
            
            <StatusWrapper
              isLoading={demoState.isLoading}
              isError={demoState.isError}
              error={demoState.isError ? new Error('This is a simulated error') : null}
              isEmpty={demoState.isEmpty}
              onRetry={() => simulateApiCall()}
              loadingText="Loading content..."
              errorText="An error occurred while loading the content."
              emptyText="No content available. Please try a different filter."
            >
              <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-grayshade-400">
                <h4 className="mb-2 text-lg font-medium">Content Loaded Successfully!</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  This is the content that would be displayed when data is successfully loaded.
                </p>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="p-4 bg-gray-100 rounded-lg dark:bg-grayshade-500">
                      <div className="flex items-center justify-center h-20">
                        Item {i}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </StatusWrapper>
          </div>
        </section>
        
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Individual Components</h2>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="overflow-hidden border rounded-lg">
              <div className="px-4 py-2 font-medium bg-gray-100 dark:bg-grayshade-500">
                LoadingState Component
              </div>
              <div className="p-4">
                <div className="mb-2">
                  <h4 className="font-medium">Small:</h4>
                  <LoadingState size="small" text="Loading..." />
                </div>
                <div className="mb-2">
                  <h4 className="font-medium">Medium:</h4>
                  <LoadingState size="medium" text="Processing data..." />
                </div>
              </div>
            </div>
            
            <div className="overflow-hidden border rounded-lg">
              <div className="px-4 py-2 font-medium bg-gray-100 dark:bg-grayshade-500">
                ErrorState Component
              </div>
              <div className="p-4">
                <ErrorState 
                  message="Failed to load data. Please check your connection and try again."
                  onRetry={() => alert('Retry clicked')}
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Implementation Guide</h2>
          
          <div className="p-4 overflow-auto text-white bg-gray-800 rounded-lg">
            <pre className="text-sm">
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ComponentDemo; 