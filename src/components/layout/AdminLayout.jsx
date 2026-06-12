import React, { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, Building2, Newspaper,
  FileText, Image, Megaphone, UserCog, Settings,
  LogOut, Menu, X, ChevronRight
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'

const navItems = (t) => [
  { path: '/admin/dashboard',     icon: LayoutDashboard, label: t.admin.dashboard },
  { path: '/admin/employees',     icon: Users,           label: t.admin.employees },
  { path: '/admin/departments',   icon: Building2,       label: t.admin.departments },
  { path: '/admin/news',          icon: Newspaper,       label: t.admin.news },
  { path: '/admin/documents',     icon: FileText,        label: t.admin.documents },
  { path: '/admin/gallery',       icon: Image,           label: t.admin.gallery },
  { path: '/admin/announcements', icon: Megaphone,       label: t.admin.announcements },
  { path: '/admin/users',         icon: UserCog,         label: t.admin.users },
  { path: '/admin/settings',      icon: Settings,        label: t.admin.settings },
]

export default function AdminLayout() {
  const { t } = useLanguage()
  const { signOut, user } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await signOut()
    navigate('/admin/login')
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm">Kemisse Portal</p>
            <p className="text-white/50 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems(t).map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
               ${isActive
                 ? 'bg-accent text-white shadow-sm'
                 : 'text-white/70 hover:text-white hover:bg-white/10'
               }`
            }
          >
            <Icon size={17} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm flex-shrink-0">
            {user?.email?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-medium truncate">{user?.email}</p>
            <p className="text-white/50 text-xs">Administrator</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-red-500/20 transition-all"
        >
          <LogOut size={15} />
          {t.admin.logout}
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-60 bg-primary flex-col flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative w-64 bg-primary flex flex-col">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white"
            >
              <X size={20} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-gray-800 font-semibold text-sm">
            Kemisse Administration Portal
          </h1>
          <div className="ml-auto flex items-center gap-2 text-xs text-gray-500">
            <span>kemisseinvestment.gov.et</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
