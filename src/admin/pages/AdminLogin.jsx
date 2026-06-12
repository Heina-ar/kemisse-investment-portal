import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Lock, Mail, Eye, EyeOff, LogIn } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function AdminLogin() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/admin/dashboard'

  const [form, setForm]     = useState({ email:'', password:'' })
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: err } = await signIn(form.email, form.password)
    setLoading(false)
    if (err) setError(err.message)
    else navigate(from, { replace: true })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-accent mx-auto flex items-center justify-center mb-4 shadow-lg">
            <Lock size={28} className="text-white" />
          </div>
          <h1 className="text-white font-bold text-2xl mb-1">Admin Portal</h1>
          <p className="text-white/60 text-sm">Kemisse Investment Office</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-bold text-gov-text mb-6">Sign In</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 mb-5 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 text-red-500 font-bold text-xs">!</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label-gov">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" required placeholder="admin@kemisseinvestment.gov.et"
                  value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))}
                  className="input-gov pl-10" />
              </div>
            </div>
            <div>
              <label className="label-gov">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showPwd?'text':'password'} required placeholder="••••••••"
                  value={form.password} onChange={e => setForm(p => ({...p, password: e.target.value}))}
                  className="input-gov pl-10 pr-10" />
                <button type="button" onClick={() => setShowPwd(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPwd ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="btn-primary w-full justify-center py-3.5 disabled:opacity-60">
              {loading
                ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>Signing in...</>
                : <><LogIn size={16}/>Sign In</>
              }
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            © 2026 Kemisse Town Administration
          </p>
        </div>
      </div>
    </div>
  )
}
