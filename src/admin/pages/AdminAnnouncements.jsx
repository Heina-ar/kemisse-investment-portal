import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, ToggleRight, ToggleLeft, Megaphone } from 'lucide-react'
import { supabase, TABLES } from '../../lib/supabase'

const EMPTY = { text_am:'', text_en:'', text_om:'', is_active:false }

export default function AdminAnnouncements() {
  const [items, setItems]   = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal]   = useState(null)
  const [form, setForm]     = useState(EMPTY)
  const [saving, setSaving] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    try {
      const { data } = await supabase.from(TABLES.ANNOUNCEMENTS).select('*').order('created_at', { ascending: false })
      setItems(data || [])
    } catch {} finally { setLoading(false) }
  }

  async function handleSave() {
    setSaving(true)
    try {
      const payload = { ...form, updated_at: new Date().toISOString() }
      if (modal === 'add') {
        await supabase.from(TABLES.ANNOUNCEMENTS).insert([payload])
      } else {
        await supabase.from(TABLES.ANNOUNCEMENTS).update(payload).eq('id', form.id)
      }
      await load(); setModal(null)
    } catch (e) { alert('Error: ' + e.message) }
    setSaving(false)
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this announcement?')) return
    await supabase.from(TABLES.ANNOUNCEMENTS).delete().eq('id', id)
    await load()
  }

  async function toggleActive(item) {
    // Deactivate all others first, then activate this one
    if (!item.is_active) {
      await supabase.from(TABLES.ANNOUNCEMENTS).update({ is_active: false }).neq('id', item.id)
    }
    await supabase.from(TABLES.ANNOUNCEMENTS).update({ is_active: !item.is_active }).eq('id', item.id)
    await load()
  }

  const upd = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Announcements</h1>
          <p className="text-gray-500 text-sm">Only one announcement can be active at a time</p>
        </div>
        <button onClick={() => { setForm(EMPTY); setModal('add') }} className="btn-primary btn-sm">
          <Plus size={15}/>Add Announcement
        </button>
      </div>

      {/* Active banner preview */}
      {items.find(i => i.is_active) && (
        <div className="bg-secondary text-white rounded-xl p-4 mb-6 flex items-center gap-3">
          <Megaphone size={18} className="text-accent flex-shrink-0"/>
          <p className="text-sm font-medium truncate">{items.find(i => i.is_active)?.text_en}</p>
          <span className="ml-auto text-xs bg-white/20 px-2 py-0.5 rounded-full flex-shrink-0">Live</span>
        </div>
      )}

      <div className="space-y-4">
        {loading ? Array(2).fill(0).map((_,i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-card animate-pulse h-20"/>
        )) : items.length === 0 ? (
          <div className="text-center py-12 text-gray-400 bg-white rounded-xl shadow-card">
            <Megaphone size={36} className="mx-auto mb-2 opacity-20"/>
            <p>No announcements yet</p>
          </div>
        ) : items.map(item => (
          <div key={item.id} className={`bg-white rounded-xl p-5 shadow-card border-l-4 transition-all
            ${item.is_active ? 'border-secondary' : 'border-transparent'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 text-sm truncate mb-0.5">{item.text_en || item.text_am}</p>
                {item.text_am && <p className="text-gray-400 text-xs font-ethiopic truncate">{item.text_am}</p>}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => toggleActive(item)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all
                    ${item.is_active?'bg-secondary text-white':'bg-gray-100 text-gray-500 hover:bg-secondary-50 hover:text-secondary'}`}>
                  {item.is_active ? <ToggleRight size={14}/> : <ToggleLeft size={14}/>}
                  {item.is_active ? 'Active' : 'Inactive'}
                </button>
                <button onClick={() => { setForm(item); setModal('edit') }}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary-50 transition-colors">
                  <Edit2 size={14}/>
                </button>
                <button onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                  <Trash2 size={14}/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="p-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-800">{modal==='add'?'Add Announcement':'Edit Announcement'}</h2>
            </div>
            <div className="p-5 space-y-4">
              {[
                { name:'text_am', label:'ጽሑፍ (አማርኛ)', placeholder:'ማስታወቂያ ጽሑፍ...' },
                { name:'text_en', label:'Text (English)', placeholder:'Announcement text...' },
                { name:'text_om', label:'Barreeffama (Afaan Oromo)', placeholder:'Beeksisa barreeffama...' },
              ].map(f => (
                <div key={f.name}>
                  <label className="label-gov">{f.label}</label>
                  <textarea name={f.name} value={form[f.name]||''} onChange={upd}
                    rows={2} className="input-gov resize-none" placeholder={f.placeholder}/>
                </div>
              ))}
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={!!form.is_active}
                    onChange={e => setForm(p => ({ ...p, is_active: e.target.checked }))}/>
                  <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-secondary after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"/>
                </label>
                <span className="text-sm font-medium text-gray-700">Set as Active (will deactivate others)</span>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setModal(null)} className="btn-outline btn-sm">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary btn-sm">
                {saving?'Saving...':'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
