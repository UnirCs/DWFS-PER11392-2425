import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Cinema } from './views/movies.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Cinema />
  </StrictMode>,
)
