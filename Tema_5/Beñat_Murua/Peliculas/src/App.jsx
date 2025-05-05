import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Header } from './components/header'
import {Pelicula} from './components/pelicula'
import {ConjuntoPeliculas} from './components/conjunto_peliculas'
import { Footer } from './components/footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div classname="contenedor_peliculas">
      <Header />
      <ConjuntoPeliculas />
      <Footer />
      </div>
    </>
  )
}

export default App
