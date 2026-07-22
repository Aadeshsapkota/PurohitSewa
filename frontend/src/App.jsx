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
import ManageEvents from './components/admin_components/ManageEvents'
import Calender from './components/admin_components/Calender'
import Reports from './components/admin_components/Reports'
import Notification from './components/admin_components/Notification'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HeroPage />} />
        <Route path='/booking' element={<Booking />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="booking" element={<AdminBooking />} />
          <Route path="manage-events" element={<ManageEvents />} />
          <Route path="calender" element={<Calender />} />
          <Route path="notification" element={<Notification />} />
          <Route path="reports" element={<Reports />} />
        </Route>

      </Routes>

    </>
  )
}

export default App
