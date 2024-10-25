import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/Authcontext.jsx';
import { FormProvider } from './context/FormContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <FormProvider>
        <App />
      </FormProvider>
    </AuthProvider>
  </StrictMode>
);
