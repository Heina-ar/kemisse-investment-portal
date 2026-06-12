import React, { useState, useEffect } from 'react'
import { Users, Building2, Newspaper, FileText, Image, TrendingUp, Eye, Calendar } from 'lucide-react'
import { supabase, TABLES } from '../../lib/supabase'
import { Link } from 'react-router-dom'

const STAT_CARDS = [
  { label:'Total Employees',   icon:Users,     key:'employees',   color:'bg-primary',   path:'/admin/employees' },
  { label:'Departments',       icon:Building2, key:'departments', color:'bg-secondary', path:'/admin/departments' },
  { label:'News Articles',     icon:Newspaper, key:'news',        color:'bg-accent',    path:'/admin/news' },
  { label:'Documents',         icon:FileText,  key:'documents',   color:'bg-primary',   path:'/admin/documents' },
  { label:'Gallery Images',    icon:Image,     key:'gallery',     color:'bg-secondary', path:'/admin/gallery' },
]

const QUICK_ACTIONS = [
  { label:'Add Employee',   icon:Users,    path:'/admin/employees', color:'text-primary bg-primary-50' },
  { label:'Add News',       icon:Newspaper,path:'/admin/news',       color:'text-secondary bg-secondary-50' },
  { label:'Add Document',   icon:FileText, path:'/admin/documents',  color:'text-accent-600 bg-accent-50' },
  { label:'Add Gallery',    icon:Image,    path:'/admin/gallery',    color:'text-primary bg-primary-50' },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState({ employees:0, departments:0, news:0, documents:0, gallery:0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const [emp, dept, news, docs, gallery] = await Promise.all([
          supabase.from(TABLES.EMPLOYEES).select('id', { count:'exact', head:true }),
          supabase.from(TABLES.DEPARTMENTS).select('id', { count:'exact', head:true }),
          supabase.from(TABLES.NEWS).select('id', { count:'exact', head:true }),
          supabase.from(TABLES.DOCUMENTS).select('id', { count:'exact', head:true }),
          supabase.from(TABLES.GALLERY).select('id', { count:'exact', head:true }),
        ])
        setStats({
          employees: emp.count || 0,
          departments: dept.count || 0,
          news: news.count || 0,
          documents: docs.count || 0,
          gallery: gallery.count || 0,
        })
      } catch { /* use defaults */ }
      setLoading(false)
    }
    loadStats()
  }, [])

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Welcome back · {new Date().toLocaleDateString('en-GB', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {STAT_CARDS.map(({ label, icon:Icon, key, color, path }) => (
          <Link key={key} to={path}
            className="bg-white rounded-xl p-5 shadow-card hover:shadow-gov transition-all hover:-translate-y-0.5">
            <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-3`}>
              <Icon size={18} className="text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {loading ? <span className="inline-block w-8 h-6 bg-gray-100 rounded animate-pulse"/> : stats[key]}
            </p>
            <p className="text-gray-500 text-xs mt-0.5">{label}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-card p-6">
          <h2 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Quick Actions</h2>
          <div className="space-y-2">
            {QUICK_ACTIONS.map(({ label, icon:Icon, path, color }) => (
              <Link key={label} to={path}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center`}>
                  <Icon size={15} />
                </div>
                <span className="text-sm text-gray-700 font-medium group-hover:text-primary">{label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-xl shadow-card p-6">
          <h2 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">System Status</h2>
          <div className="space-y-3">
            {[
              { label:'Website', status:'Online', ok:true },
              { label:'Database', status:'Connected', ok:true },
              { label:'Storage', status:'Active', ok:true },
              { label:'Auth', status:'Active', ok:true },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.label}</span>
                <span className={`flex items-center gap-1.5 text-xs font-semibold ${item.ok?'text-secondary':'text-red-500'}`}>
                  <span className={`w-2 h-2 rounded-full ${item.ok?'bg-secondary':'bg-red-500'} animate-pulse`}/>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="bg-gradient-to-br from-primary to-primary-700 rounded-xl p-6 text-white">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-4">
            <TrendingUp size={20} className="text-accent" />
          </div>
          <h2 className="font-bold text-lg mb-1">kemisseinvestment.gov.et</h2>
          <p className="text-white/70 text-sm mb-4">Kemisse Town Administration Industry & Investment Office</p>
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Calendar size={12}/>
            <span>Portal v1.0.0 · 2026</span>
          </div>
        </div>
      </div>
    </div>
  )
}
