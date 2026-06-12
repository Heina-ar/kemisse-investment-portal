import React, { useState, useEffect } from 'react'
import { UserCog, Mail, Shield } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const { data: { users: u } } = await supabase.auth.admin.listUsers()
        setUsers(u || [])
      } catch {} finally { setLoading(false) }
    }
    load()
  }, [])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">Admin Users</h1>
        <p className="text-gray-500 text-sm">Manage admin portal access</p>
      </div>
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center gap-2">
          <Shield size={16} className="text-primary"/>
          <span className="text-sm font-medium text-gray-700">Users are managed via Supabase Auth dashboard</span>
        </div>
        {loading ? (
          <div className="p-10 text-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"/></div>
        ) : users.length === 0 ? (
          <div className="p-10 text-center text-gray-400">
            <UserCog size={36} className="mx-auto mb-2 opacity-20"/>
            <p className="text-sm">No users found or insufficient permissions.</p>
            <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer"
              className="text-primary text-sm hover:underline mt-1 inline-block">Open Supabase Dashboard →</a>
          </div>
        ) : users.map(u => (
          <div key={u.id} className="flex items-center gap-4 px-5 py-4 border-b border-gray-50 last:border-0">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
              {u.email?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-gray-800 text-sm">{u.email}</p>
              <p className="text-gray-400 text-xs">Last sign in: {u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleString() : 'Never'}</p>
            </div>
            <span className="ml-auto badge bg-secondary-50 text-secondary text-xs">Admin</span>
          </div>
        ))}
      </div>
    </div>
  )
}
