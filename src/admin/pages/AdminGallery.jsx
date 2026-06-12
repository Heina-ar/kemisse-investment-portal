import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Search } from 'lucide-react'
import { supabase, TABLES } from '../../lib/supabase'

const CATS = ['office','events','projects','investment']
const EMPTY = { image_url:'', title:'', description:'', category:'office', status:'active' }

export default function AdminGallery() {
  const [items, setItems]   = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal]   = useState(false)
  const [form, setForm]     = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [catFilter, setCatFilter] = useState('all')

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    try {
      const { data } = await supabase.from(TABLES.GALLERY).select('*').order('created_at', { ascending: false })
      setItems(data || [])
    } catch {} finally { setLoading(false) }
  }

  async function handleSave() {
    if (!form.image_url) return alert('Image URL is required')
    setSaving(true)
    try {
      await supabase.from(TABLES.GALLERY).insert([{ ...form, created_at: new Date().toISOString() }])
      await load(); setModal(false); setForm(EMPTY)
    } catch (e) { alert('Error: ' + e.message) }
    setSaving(false)
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this image?')) return
    await supabase.from(TABLES.GALLERY).delete().eq('id', id)
    await load()
  }

  const filtered = catFilter === 'all' ? items : items.filter(i => i.category === catFilter)
  const upd = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Gallery</h1>
          <p className="text-gray-500 text-sm">{items.length} total images</p>
        </div>
        <button onClick={() => setModal(true)} className="btn-primary btn-sm"><Plus size={15}/>Add Image</button>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['all', ...CATS].map(c => (
          <button key={c} onClick={() => setCatFilter(c)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all
              ${catFilter===c?'bg-primary text-white':'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary shadow-card'}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {loading ? Array(8).fill(0).map((_,i) => (
          <div key={i} className="aspect-square bg-gray-100 rounded-xl animate-pulse"/>
        )) : filtered.map(item => (
          <div key={item.id} className="group relative aspect-square rounded-xl overflow-hidden shadow-card">
            <img src={item.image_url || item.src} alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
              <p className="text-white text-xs font-medium text-center px-2 mb-3">{item.title}</p>
              <button onClick={() => handleDelete(item.id)}
                className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600">
                <Trash2 size={14}/>
              </button>
            </div>
            <div className="absolute top-2 left-2">
              <span className="bg-primary/80 text-white text-xs px-2 py-0.5 rounded-full capitalize">{item.category}</span>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-800">Add Gallery Image</h2>
            </div>
            <div className="p-5 space-y-4">
              {form.image_url && (
                <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 mb-2">
                  <img src={form.image_url} alt="" className="w-full h-full object-cover" onError={e => e.target.style.display='none'}/>
                </div>
              )}
              <div>
                <label className="label-gov">Image URL *</label>
                <input name="image_url" value={form.image_url} onChange={upd} className="input-gov" placeholder="https://..."/>
              </div>
              <div>
                <label className="label-gov">Title</label>
                <input name="title" value={form.title} onChange={upd} className="input-gov"/>
              </div>
              <div>
                <label className="label-gov">Description</label>
                <input name="description" value={form.description} onChange={upd} className="input-gov"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-gov">Category</label>
                  <select name="category" value={form.category} onChange={upd} className="input-gov">
                    {CATS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label-gov">Status</label>
                  <select name="status" value={form.status} onChange={upd} className="input-gov">
                    <option value="active">Active</option><option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setModal(false)} className="btn-outline btn-sm">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary btn-sm">{saving?'Saving...':'Add Image'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
