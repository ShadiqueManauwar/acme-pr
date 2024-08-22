import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { Toaster } from 'sonner';

import App from './App';
import { ThemeProvider } from './components/theme-provider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster
        toastOptions={{
          classNames: {
            success: 'bg-green-500 text-white border-green-700',
            error: 'bg-red-500 text-white border-red-700',
          },
        }}
        duration={3000}
        position="bottom-center"
      />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
