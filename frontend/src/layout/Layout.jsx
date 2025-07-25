import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router'

const Layout = () => {
    return (
        <div className='bg-[var(--uni)]'>
            <Header /> 
            <main className="min-h-screen px-4 text-[var(--tri)]">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout