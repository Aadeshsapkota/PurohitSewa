import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import HeroPage from './pages/Hero'
import { Route, Routes } from 'react-router-dom'
import Booking from './pages/Booking'
import Admin from './pages/Admin'
import Dashboard from './components/admin_components/Dashboard'
import AdminBooking from './components/admin_components/AdminBooking'
import AdminRegister from './pages/AdminRegister'
import AdminLogin from './pages/AdminLogin'
import ProtectedRoute from './components/protected_route/ProtectedRoute'



function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HeroPage />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/adminregister' element={<AdminRegister/>} />
        <Route path='/adminlogin' element={<AdminLogin/>} />


        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Admin />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="booking" element={<AdminBooking />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
