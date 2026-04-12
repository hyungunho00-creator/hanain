import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PartnerProvider } from './context/PartnerContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PartnerProvider>
      <App />
    </PartnerProvider>
  </StrictMode>,
)
