import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import AuthProvider from './Context/AuthProvider.tsx'
import { AppProvider } from './Context/appProvider.tsx'



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <AppProvider>
        <App />
        <Toaster />
      </AppProvider>
    </AuthProvider>
  </StrictMode>
);
