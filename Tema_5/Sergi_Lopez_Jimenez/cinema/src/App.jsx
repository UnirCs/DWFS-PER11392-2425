import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Header } from './components/header'
import { Footer } from './components/footer'
import Overview from './views/Overview'


function App() {

  return (
    <div>
      <Header />
      <Overview />
      <Footer />
    </div>

  )
}

export default App
