import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Search, Download, FileCheck } from 'lucide-react'
import { supabase, TABLES } from '../../lib/supabase'

const EMPTY = { title_am:'', title_en:'', title_om:'', desc_am:'', desc_en:'', category:'forms', file_url:'', display_order:0, status:'active', downloads:0 }
const CATS = ['forms','guidelines','policies','directives','reports']

export default function AdminDocuments() {
  const [items, setItems]   = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modal, setModal]   = useState(null)
  const [form, setForm]     = useState(EMPTY)
  const [saving, setSaving] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    try {
      const { data } = await supabase.from(TABLES.DOCUMENTS).select('*').order('display_order')
      setItems(data || [])
    } catch {} finally { setLoading(false) }
  }

  async function handleSave() {
    setSaving(true)
    try {
      if (modal === 'add') {
        await supabase.from(TABLES.DOCUMENTS).insert([form])
      } else {
        await supabase.from(TABLES.DOCUMENTS).update(form).eq('id', form.id)
      }
      await load(); setModal(null)
    } catch (e) { alert('Error: ' + e.message) }
    setSaving(false)
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this document?')) return
    await supabase.from(TABLES.DOCUMENTS).delete().eq('id', id)
    await load()
  }

  const filtered = items.filter(d =>
    search === '' || (d.title_en||'').toLowerCase().includes(search.toLowerCase()) || (d.title_am||'').includes(search)
  )
  const upd = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const CAT_STYLE = { forms:'bg-primary-50 text-primary', guidelines:'bg-secondary-50 text-secondary-600', policies:'bg-accent-50 text-accent-600', directives:'bg-purple-50 text-purple-600', reports:'bg-red-50 text-red-500' }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Documents</h1>
          <p className="text-gray-500 text-sm">{items.length} total documents</p>
        </div>
        <button onClick={() => { setForm(EMPTY); setModal('add') }} className="btn-primary btn-sm"><Plus size={15}/>Add Document</button>
      </div>

      <div className="relative mb-5">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search documents..." className="input-gov pl-9 max-w-sm"/>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? Array(3).fill(0).map((_,i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-card animate-pulse">
            <div className="h-10 w-10 bg-gray-100 rounded-xl mb-3"/><div className="h-4 bg-gray-100 rounded mb-2"/><div className="h-3 bg-gray-100 rounded w-2/3"/>
          </div>
        )) : filtered.map(doc => (
          <div key={doc.id} className="bg-white rounded-xl p-5 shadow-card hover:shadow-gov transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${CAT_STYLE[doc.category]||'bg-primary-50 text-primary'}`}>
                <FileCheck size={18}/>
              </div>
              <div className="flex gap-1">
                <button onClick={() => { setForm(doc); setModal('edit') }} className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary-50 transition-colors"><Edit2 size={13}/></button>
                <button onClick={() => handleDelete(doc.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={13}/></button>
              </div>
            </div>
            <span className={`badge text-xs mb-2 ${CAT_STYLE[doc.category]||'bg-primary-50 text-primary'}`}>{doc.category}</span>
            <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-1">{doc.title_en || doc.title_am}</h3>
            <p className="text-gray-400 text-xs line-clamp-2 mb-3">{doc.desc_en || doc.desc_am}</p>
            <div className="flex items-center gap-1 text-gray-400 text-xs border-t border-gray-100 pt-3">
              <Download size={11}/><span>{doc.downloads||0} downloads</span>
              <span className={`ml-auto badge ${doc.status==='active'?'bg-secondary-50 text-secondary':'bg-gray-100 text-gray-400'}`}>{doc.status}</span>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-800">{modal==='add'?'Add Document':'Edit Document'}</h2>
            </div>
            <div className="p-5 space-y-4">
              {[
                { name:'title_am', label:'ርዕስ (አማ)' }, { name:'title_en', label:'Title (EN)' }, { name:'title_om', label:'Mata-duree (OM)' },
                { name:'desc_am', label:'መግለጫ (አማ)' }, { name:'desc_en', label:'Description (EN)' },
                { name:'file_url', label:'File URL / PDF Link' },
              ].map(f => (
                <div key={f.name}>
                  <label className="label-gov">{f.label}</label>
                  <input name={f.name} value={form[f.name]||''} onChange={upd} className="input-gov"/>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-gov">Category</label>
                  <select name="category" value={form.category} onChange={upd} className="input-gov">
                    {CATS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label-gov">Status</label>
                  <select name="status" value={form.status||'active'} onChange={upd} className="input-gov">
                    <option value="active">Active</option><option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="label-gov">Display Order</label>
                  <input type="number" name="display_order" value={form.display_order||0} onChange={upd} className="input-gov"/>
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setModal(null)} className="btn-outline btn-sm">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary btn-sm">{saving?'Saving...':'Save Document'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
