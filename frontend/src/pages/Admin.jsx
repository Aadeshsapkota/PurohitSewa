import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {
    LayoutDashboard,
    CalendarCheck,
    Sparkles,
    CalendarDays,
    Bell,
    FileBarChart2,
    UserCircle2,
} from 'lucide-react'
import './Admin.css'
import Sidebar from '../components/admin_components/Sidebar'

const NAV_ITEMS = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: 'dashboard' },
    { key: 'booking', label: 'Booking', icon: CalendarCheck, path: 'booking' },
    { key: 'manage_events', label: 'Manage events', icon: Sparkles, path: 'manage-events' },
    { key: 'calender', label: 'Calender', icon: CalendarDays, path: 'calender' },
    { key: 'notification', label: 'Notification', icon: Bell, path: 'notification' },
    { key: 'reports', label: 'Reports', icon: FileBarChart2, path: 'reports' },
]

function Admin() {
    const [active, setActive] = useState('dashboard')
    const navigate = useNavigate()

    const handleNavClick = (key, path) => {
        setActive(key)
        navigate(path)
    }

    return (
        <div className="admin">
            <Sidebar
                NAV_ITEMS={NAV_ITEMS}
                setActive={setActive}
                active={active}
                onNavClick={handleNavClick}
            />
            <main className='admin-content'>
                <Outlet />
            </main>
        </div>
    )
}

export default Admin