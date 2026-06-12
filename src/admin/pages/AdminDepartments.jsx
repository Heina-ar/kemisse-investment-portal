import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { supabase, TABLES } from '../../lib/supabase'

const EMPTY = { name_am:'', name_en:'', name_om:'', description_am:'', description_en:'', slug:'', phone:'', email:'', display_order:0, status:'active' }

export default function AdminDepartments() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [form, setForm]   = useState(EMPTY)
  const [saving, setSaving] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    try {
      const { data } = await supabase.from(TABLES.DEPARTMENTS).select('*').order('display_order')
      setItems(data || [])
    } catch {} finally { setLoading(false) }
  }

  async function handleSave() {
    setSaving(true)
    try {
      if (modal === 'add') await supabase.from(TABLES.DEPARTMENTS).insert([form])
      else await supabase.from(TABLES.DEPARTMENTS).update(form).eq('id', form.id)
      await load(); setModal(null)
    } catch (e) { alert('Error: ' + e.message) }
    setSaving(false)
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this department?')) return
    await supabase.from(TABLES.DEPARTMENTS).delete().eq('id', id)
    await load()
  }

  const upd = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Departments</h1>
          <p className="text-gray-500 text-sm">{items.length} departments</p>
        </div>
        <button onClick={() => { setForm(EMPTY); setModal('add') }} className="btn-primary btn-sm"><Plus size={15}/>Add Department</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? Array(3).fill(0).map((_,i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-card animate-pulse h-36"/>
        )) : items.map(dept => (
          <div key={dept.id} className="bg-white rounded-xl p-5 shadow-card hover:shadow-gov transition-all">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-800 text-sm">{dept.name_en || dept.name_am}</h3>
              <div className="flex gap-1">
                <button onClick={() => { setForm(dept); setModal('edit') }} className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary-50 transition-colors"><Edit2 size={13}/></button>
                <button onClick={() => handleDelete(dept.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={13}/></button>
              </div>
            </div>
            {dept.name_am && <p className="text-gray-500 text-xs font-ethiopic mb-2">{dept.name_am}</p>}
            <p className="text-gray-400 text-xs line-clamp-2 mb-3">{dept.description_en}</p>
            <div className="flex gap-2">
              <span className={`badge text-xs ${dept.status==='active'?'bg-secondary-50 text-secondary':'bg-gray-100 text-gray-400'}`}>{dept.status}</span>
              {dept.slug && <span className="badge text-xs bg-primary-50 text-primary">/{dept.slug}</span>}
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-800">{modal==='add'?'Add Department':'Edit Department'}</h2>
            </div>
            <div className="p-5 space-y-4">
              {[
                { name:'name_am', label:'ስም (አማ)' }, { name:'name_en', label:'Name (EN)' }, { name:'name_om', label:'Maqaa (OM)' },
                { name:'slug', label:'Slug (URL)' }, { name:'phone', label:'Phone' }, { name:'email', label:'Email' },
              ].map(f => (
                <div key={f.name}>
                  <label className="label-gov">{f.label}</label>
                  <input name={f.name} value={form[f.name]||''} onChange={upd} className="input-gov"/>
                </div>
              ))}
              <div>
                <label className="label-gov">Description (EN)</label>
                <textarea name="description_en" value={form.description_en||''} onChange={upd} rows={3} className="input-gov resize-none"/>
              </div>
              <div>
                <label className="label-gov">መግለጫ (አማ)</label>
                <textarea name="description_am" value={form.description_am||''} onChange={upd} rows={3} className="input-gov resize-none"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-gov">Display Order</label>
                  <input type="number" name="display_order" value={form.display_order||0} onChange={upd} className="input-gov"/>
                </div>
                <div>
                  <label className="label-gov">Status</label>
                  <select name="status" value={form.status||'active'} onChange={upd} className="input-gov">
                    <option value="active">Active</option><option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setModal(null)} className="btn-outline btn-sm">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary btn-sm">{saving?'Saving...':'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
