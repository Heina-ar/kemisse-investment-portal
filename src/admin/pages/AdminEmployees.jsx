import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Search, ToggleLeft, ToggleRight, User } from 'lucide-react'
import { supabase, TABLES } from '../../lib/supabase'

const EMPTY = { name:'', name_en:'', position_am:'', position_en:'', dept_am:'', dept_en:'', dept_slug:'', phone:'', email:'', office:'', bio_am:'', bio_en:'', display_order:0, status:'active', photo:'' }

export default function AdminEmployees() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading]     = useState(true)
  const [search, setSearch]       = useState('')
  const [modal, setModal]         = useState(null) // null | 'add' | 'edit'
  const [form, setForm]           = useState(EMPTY)
  const [saving, setSaving]       = useState(false)
  const [deleteId, setDeleteId]   = useState(null)

  useEffect(() => { loadEmployees() }, [])

  async function loadEmployees() {
    setLoading(true)
    try {
      const { data } = await supabase.from(TABLES.EMPLOYEES).select('*').order('display_order')
      setEmployees(data || [])
    } catch {} finally { setLoading(false) }
  }

  async function handleSave() {
    setSaving(true)
    try {
      if (modal === 'add') {
        await supabase.from(TABLES.EMPLOYEES).insert([{ ...form }])
      } else {
        await supabase.from(TABLES.EMPLOYEES).update({ ...form }).eq('id', form.id)
      }
      await loadEmployees()
      setModal(null)
    } catch (e) { alert('Error: ' + e.message) }
    setSaving(false)
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this employee?')) return
    await supabase.from(TABLES.EMPLOYEES).delete().eq('id', id)
    await loadEmployees()
    setDeleteId(null)
  }

  async function toggleStatus(emp) {
    const newStatus = emp.status === 'active' ? 'inactive' : 'active'
    await supabase.from(TABLES.EMPLOYEES).update({ status: newStatus }).eq('id', emp.id)
    await loadEmployees()
  }

  const filtered = employees.filter(e =>
    search === '' || (e.name||'').toLowerCase().includes(search.toLowerCase()) ||
    (e.name_en||'').toLowerCase().includes(search.toLowerCase())
  )

  const openAdd  = () => { setForm(EMPTY); setModal('add') }
  const openEdit = emp => { setForm(emp); setModal('edit') }
  const upd = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const FIELDS = [
    { name:'name', label:'ስም (አማ)', type:'text' },
    { name:'name_en', label:'Name (EN)', type:'text' },
    { name:'position_am', label:'ቦታ (አማ)', type:'text' },
    { name:'position_en', label:'Position (EN)', type:'text' },
    { name:'dept_am', label:'ክፍል (አማ)', type:'text' },
    { name:'dept_en', label:'Department (EN)', type:'text' },
    { name:'phone', label:'Phone', type:'tel' },
    { name:'email', label:'Email', type:'email' },
    { name:'office', label:'Office No.', type:'text' },
    { name:'photo', label:'Photo URL', type:'url' },
    { name:'display_order', label:'Display Order', type:'number' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Employees</h1>
          <p className="text-gray-500 text-sm">{employees.length} total employees</p>
        </div>
        <button onClick={openAdd} className="btn-primary btn-sm">
          <Plus size={15}/>Add Employee
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search employees..." className="input-gov pl-9 max-w-sm" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>{['Photo','Name','Position','Department','Phone','Status','Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array(4).fill(0).map((_,i) => (
                  <tr key={i}>{Array(7).fill(0).map((_,j) => (
                    <td key={j} className="px-4 py-3"><div className="h-4 bg-gray-100 rounded animate-pulse w-20"/></td>
                  ))}</tr>
                ))
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-gray-400">No employees found</td></tr>
              ) : filtered.map(emp => (
                <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    {emp.photo
                      ? <img src={emp.photo} alt="" className="w-9 h-9 rounded-full object-cover"/>
                      : <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center"><User size={16} className="text-primary"/></div>
                    }
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">{emp.name_en || emp.name}</td>
                  <td className="px-4 py-3 text-gray-600">{emp.position_en || emp.position_am}</td>
                  <td className="px-4 py-3 text-gray-500">{emp.dept_en || emp.dept_am}</td>
                  <td className="px-4 py-3 text-gray-500">{emp.phone}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleStatus(emp)}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full transition-colors
                        ${emp.status==='active'?'bg-secondary-50 text-secondary':'bg-gray-100 text-gray-400'}`}>
                      {emp.status==='active'?<ToggleRight size={14}/>:<ToggleLeft size={14}/>}
                      {emp.status==='active'?'Active':'Inactive'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEdit(emp)} className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary-50 transition-colors"><Edit2 size={14}/></button>
                      <button onClick={() => handleDelete(emp.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={14}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <h2 className="font-bold text-gray-800 text-lg">{modal==='add'?'Add Employee':'Edit Employee'}</h2>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              {FIELDS.map(f => (
                <div key={f.name} className={f.name==='photo'?'col-span-2':''}>
                  <label className="label-gov">{f.label}</label>
                  <input type={f.type} name={f.name} value={form[f.name]||''} onChange={upd} className="input-gov"/>
                </div>
              ))}
              <div className="col-span-2">
                <label className="label-gov">ስለ ሠራተኛው (አማ)</label>
                <textarea name="bio_am" value={form.bio_am||''} onChange={upd} rows={3} className="input-gov resize-none"/>
              </div>
              <div className="col-span-2">
                <label className="label-gov">Biography (EN)</label>
                <textarea name="bio_en" value={form.bio_en||''} onChange={upd} rows={3} className="input-gov resize-none"/>
              </div>
              <div>
                <label className="label-gov">Status</label>
                <select name="status" value={form.status||'active'} onChange={upd} className="input-gov">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setModal(null)} className="btn-outline btn-sm">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary btn-sm">
                {saving?'Saving...':'Save Employee'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
