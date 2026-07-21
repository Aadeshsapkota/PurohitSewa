import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import HeroPage from './pages/Hero'
import { Route, Routes } from 'react-router-dom'
import Booking from './pages/Booking'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HeroPage />} />
        <Route path='/booking' element={<Booking />} />
      </Routes>

    </>
  )
}

export default App
