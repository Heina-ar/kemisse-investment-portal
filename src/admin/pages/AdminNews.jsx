import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Search, Eye, EyeOff } from 'lucide-react'
import { supabase, TABLES } from '../../lib/supabase'

const EMPTY = { title_am:'', title_en:'', title_om:'', content_am:'', content_en:'', content_om:'', excerpt_am:'', excerpt_en:'', excerpt_om:'', category:'news', featured_image:'', is_published:false }
const CATS = ['news','announcement','tender','event']

export default function AdminNews() {
  const [items, setItems]   = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modal, setModal]   = useState(null)
  const [form, setForm]     = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [tab, setTab]       = useState('am')

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    try {
      const { data } = await supabase.from(TABLES.NEWS).select('*').order('created_at', { ascending: false })
      setItems(data || [])
    } catch {} finally { setLoading(false) }
  }

  async function handleSave() {
    setSaving(true)
    try {
      const payload = { ...form, updated_at: new Date().toISOString() }
      if (modal === 'add') {
        await supabase.from(TABLES.NEWS).insert([payload])
      } else {
        await supabase.from(TABLES.NEWS).update(payload).eq('id', form.id)
      }
      await load(); setModal(null)
    } catch (e) { alert('Error: ' + e.message) }
    setSaving(false)
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this news item?')) return
    await supabase.from(TABLES.NEWS).delete().eq('id', id)
    await load()
  }

  async function togglePublish(item) {
    await supabase.from(TABLES.NEWS).update({ is_published: !item.is_published }).eq('id', item.id)
    await load()
  }

  const filtered = items.filter(n =>
    search === '' || (n.title_en || '').toLowerCase().includes(search.toLowerCase()) ||
    (n.title_am || '').includes(search)
  )

  const upd = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const openAdd  = () => { setForm(EMPTY); setModal('add') }
  const openEdit = item => { setForm(item); setModal('edit') }

  const LANG_TABS = [
    { key: 'am', label: 'አማርኛ' },
    { key: 'en', label: 'English' },
    { key: 'om', label: 'Afaan Oromo' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">News Management</h1>
          <p className="text-gray-500 text-sm">{items.length} total articles</p>
        </div>
        <button onClick={openAdd} className="btn-primary btn-sm"><Plus size={15}/>Add News</button>
      </div>

      <div className="relative mb-5">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search news..." className="input-gov pl-9 max-w-sm"/>
      </div>

      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>{['Image','Title','Category','Date','Status','Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array(3).fill(0).map((_,i) => (
                  <tr key={i}>{Array(6).fill(0).map((_,j) => (
                    <td key={j} className="px-4 py-3"><div className="h-4 bg-gray-100 rounded animate-pulse w-24"/></td>
                  ))}</tr>
                ))
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-10 text-center text-gray-400">No news articles found</td></tr>
              ) : filtered.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    {item.featured_image
                      ? <img src={item.featured_image} alt="" className="w-14 h-10 rounded-lg object-cover"/>
                      : <div className="w-14 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-300 text-xs">No img</div>
                    }
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800 max-w-[200px] truncate">
                    {item.title_en || item.title_am}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`badge text-xs capitalize
                      ${item.category==='news'?'badge-primary':item.category==='announcement'?'bg-secondary-50 text-secondary-600':item.category==='tender'?'bg-accent-50 text-accent-600':'bg-purple-50 text-purple-600'}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {item.created_at ? new Date(item.created_at).toLocaleDateString('en-GB') : '-'}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => togglePublish(item)}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full transition-all
                        ${item.is_published?'bg-secondary-50 text-secondary hover:bg-red-50 hover:text-red-500':'bg-gray-100 text-gray-400 hover:bg-secondary-50 hover:text-secondary'}`}>
                      {item.is_published ? <><Eye size={12}/>Published</> : <><EyeOff size={12}/>Draft</>}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary-50 transition-colors"><Edit2 size={14}/></button>
                      <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={14}/></button>
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-800">{modal==='add'?'Add News Article':'Edit News Article'}</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold leading-none">×</button>
            </div>
            <div className="p-6 space-y-5">
              {/* Category + Featured Image */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-gov">Category</label>
                  <select name="category" value={form.category} onChange={upd} className="input-gov">
                    {CATS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label-gov">Featured Image URL</label>
                  <input name="featured_image" value={form.featured_image||''} onChange={upd} className="input-gov" placeholder="https://..."/>
                </div>
              </div>

              {/* Publish toggle */}
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={!!form.is_published}
                    onChange={e => setForm(p => ({...p, is_published: e.target.checked}))}/>
                  <div className="w-10 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"/>
                </label>
                <span className="text-sm font-medium text-gray-700">Publish immediately</span>
              </div>

              {/* Language Tabs */}
              <div>
                <div className="flex gap-1 mb-4 border-b border-gray-100">
                  {LANG_TABS.map(l => (
                    <button key={l.key} onClick={() => setTab(l.key)}
                      className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all
                        ${tab===l.key?'bg-primary text-white':'text-gray-500 hover:text-primary'}`}>
                      {l.label}
                    </button>
                  ))}
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="label-gov">Title ({tab.toUpperCase()})</label>
                    <input name={`title_${tab}`} value={form[`title_${tab}`]||''} onChange={upd} className="input-gov"/>
                  </div>
                  <div>
                    <label className="label-gov">Excerpt ({tab.toUpperCase()})</label>
                    <textarea name={`excerpt_${tab}`} value={form[`excerpt_${tab}`]||''} onChange={upd} rows={2} className="input-gov resize-none"/>
                  </div>
                  <div>
                    <label className="label-gov">Content ({tab.toUpperCase()})</label>
                    <textarea name={`content_${tab}`} value={form[`content_${tab}`]||''} onChange={upd} rows={6} className="input-gov resize-none"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setModal(null)} className="btn-outline btn-sm">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary btn-sm">
                {saving?'Saving...':'Save Article'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
