import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
 import { MovieList } from './components/MovieList'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MovieList />
  </StrictMode>,
)
