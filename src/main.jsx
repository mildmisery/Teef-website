import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.jsx'
import CreditsFooter from "./components/CreditsFooter.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <main>
      <App />
    </main>
  </StrictMode>,
)

createRoot(document.getElementsByTagName('footer')[0]).render(
  <StrictMode>
    <CreditsFooter />
  </StrictMode>,
)
