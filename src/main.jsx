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
    <footer>
      <CreditsFooter />
    </footer>
  </StrictMode>,
)
