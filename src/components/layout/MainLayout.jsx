import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import TopBar from './TopBar'
import Navbar from './Navbar'
import Footer from './Footer'
import AnnouncementBar from './AnnouncementBar'

export default function MainLayout() {
  const { pathname } = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top contact bar (desktop) */}
      <TopBar />

      {/* Sticky Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1">
        {/* Announcement bar (shown on homepage and other pages above content) */}
        <AnnouncementBar />

        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
