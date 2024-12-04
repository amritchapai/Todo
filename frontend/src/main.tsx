import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import { AppProvider} from './Context/appContext.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <App />
      <Toaster />
    </AppProvider>
  </StrictMode>
);
