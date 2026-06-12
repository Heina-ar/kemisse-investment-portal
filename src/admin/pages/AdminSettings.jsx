import React, { useState } from 'react'
import { Save, Globe, Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function AdminSettings() {
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    siteName_am: 'ከሚሴ ከተማ አስተዳደር ኢንዱስትሪና ኢንቨስትመንት ጽ/ቤት',
    siteName_en: 'Kemisse Town Administration Industry and Investment Office',
    phone: '+251 033 XXX XXXX',
    email: 'info@kemisseinvestment.gov.et',
    address_am: 'ከሚሴ ከተማ፣ ኦሮሚያ ዞን፣ አማራ ክልል፣ ኢትዮጵያ',
    address_en: 'Kemisse Town, Oromia Zone, Amhara Region, Ethiopia',
    workingHours: 'Mon - Fri: 8:30 AM - 5:30 PM',
    facebook: '', twitter: '', youtube: '', linkedin: '',
  })

  const upd = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000) }

  const sections = [
    { title:'Office Information', icon:Globe, fields:[
      { name:'siteName_am', label:'ስም (አማ)', type:'text' },
      { name:'siteName_en', label:'Site Name (EN)', type:'text' },
    ]},
    { title:'Contact Details', icon:Phone, fields:[
      { name:'phone', label:'Phone Number', type:'tel' },
      { name:'email', label:'Email Address', type:'email' },
      { name:'address_am', label:'አድራሻ (አማ)', type:'text' },
      { name:'address_en', label:'Address (EN)', type:'text' },
      { name:'workingHours', label:'Working Hours', type:'text' },
    ]},
    { title:'Social Media', icon:Globe, fields:[
      { name:'facebook', label:'Facebook URL', type:'url' },
      { name:'twitter', label:'Twitter / X URL', type:'url' },
      { name:'youtube', label:'YouTube URL', type:'url' },
      { name:'linkedin', label:'LinkedIn URL', type:'url' },
    ]},
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-500 text-sm">Portal configuration</p>
        </div>
        <button onClick={handleSave} className={`btn-sm transition-all ${saved?'bg-secondary text-white border-secondary':'btn-primary'}`}>
          <Save size={15}/>{saved?'Saved!':'Save Changes'}
        </button>
      </div>

      <div className="space-y-6">
        {sections.map(({ title, icon: Icon, fields }) => (
          <div key={title} className="bg-white rounded-xl shadow-card p-6">
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
              <Icon size={16} className="text-primary"/>
              <h2 className="font-bold text-gray-800 text-sm">{title}</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {fields.map(f => (
                <div key={f.name}>
                  <label className="label-gov">{f.label}</label>
                  <input type={f.type} name={f.name} value={form[f.name]||''} onChange={upd} className="input-gov"/>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
