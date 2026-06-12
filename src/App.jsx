import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import { AuthProvider } from './contexts/AuthContext'
import MainLayout from './components/layout/MainLayout'
import AdminLayout from './components/layout/AdminLayout'
import LoadingSpinner from './components/ui/LoadingSpinner'

// ─── Public Pages (lazy loaded) ───────────────────────────────────────────
const HomePage        = lazy(() => import('./pages/HomePage'))
const AboutPage       = lazy(() => import('./pages/AboutPage'))
const DepartmentsPage = lazy(() => import('./pages/DepartmentsPage'))
const DepartmentDetail= lazy(() => import('./pages/DepartmentDetail'))
const StaffPage       = lazy(() => import('./pages/StaffPage'))
const StaffProfile    = lazy(() => import('./pages/StaffProfile'))
const InvestmentPage  = lazy(() => import('./pages/InvestmentPage'))
const NewsPage        = lazy(() => import('./pages/NewsPage'))
const NewsDetail      = lazy(() => import('./pages/NewsDetail'))
const DocumentsPage   = lazy(() => import('./pages/DocumentsPage'))
const GalleryPage     = lazy(() => import('./pages/GalleryPage'))
const ContactPage     = lazy(() => import('./pages/ContactPage'))
const NotFoundPage    = lazy(() => import('./pages/NotFoundPage'))

// ─── Admin Pages (lazy loaded) ────────────────────────────────────────────
const AdminLogin         = lazy(() => import('./admin/pages/AdminLogin'))
const AdminDashboard     = lazy(() => import('./admin/pages/AdminDashboard'))
const AdminEmployees     = lazy(() => import('./admin/pages/AdminEmployees'))
const AdminDepartments   = lazy(() => import('./admin/pages/AdminDepartments'))
const AdminNews          = lazy(() => import('./admin/pages/AdminNews'))
const AdminDocuments     = lazy(() => import('./admin/pages/AdminDocuments'))
const AdminGallery       = lazy(() => import('./admin/pages/AdminGallery'))
const AdminAnnouncements = lazy(() => import('./admin/pages/AdminAnnouncements'))
const AdminUsers         = lazy(() => import('./admin/pages/AdminUsers'))
const AdminSettings      = lazy(() => import('./admin/pages/AdminSettings'))

import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <Routes>
              {/* Public Routes */}
              <Route element={<MainLayout />}>
                <Route path="/"                element={<HomePage />} />
                <Route path="/about"           element={<AboutPage />} />
                <Route path="/departments"     element={<DepartmentsPage />} />
                <Route path="/departments/:id" element={<DepartmentDetail />} />
                <Route path="/staff"           element={<StaffPage />} />
                <Route path="/staff/:id"       element={<StaffProfile />} />
                <Route path="/investment"      element={<InvestmentPage />} />
                <Route path="/news"            element={<NewsPage />} />
                <Route path="/news/:id"        element={<NewsDetail />} />
                <Route path="/documents"       element={<DocumentsPage />} />
                <Route path="/gallery"         element={<GalleryPage />} />
                <Route path="/contact"         element={<ContactPage />} />
                <Route path="*"               element={<NotFoundPage />} />
              </Route>

              {/* Admin Login */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Admin Protected Routes */}
              <Route path="/admin" element={
                <ProtectedRoute><AdminLayout /></ProtectedRoute>
              }>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard"     element={<AdminDashboard />} />
                <Route path="employees"     element={<AdminEmployees />} />
                <Route path="departments"   element={<AdminDepartments />} />
                <Route path="news"          element={<AdminNews />} />
                <Route path="documents"     element={<AdminDocuments />} />
                <Route path="gallery"       element={<AdminGallery />} />
                <Route path="announcements" element={<AdminAnnouncements />} />
                <Route path="users"         element={<AdminUsers />} />
                <Route path="settings"      element={<AdminSettings />} />
              </Route>
            </Routes>
          </Suspense>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  )
}

export default App
