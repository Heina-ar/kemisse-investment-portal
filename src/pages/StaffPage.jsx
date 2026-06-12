import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, User, Phone, Mail, ArrowRight } from 'lucide-react'
import PageBanner from '../components/ui/PageBanner'
import { useLanguage } from '../contexts/LanguageContext'
import { supabase, TABLES } from '../lib/supabase'

const FALLBACK_STAFF = [
  { id:1, name:'አቶ አብዲ ሙሐመድ',      name_en:'Mr. Abdi Mohammed',   position_am:'የጽ/ቤቱ ኃላፊ',         position_en:'Office Head',           dept_am:'አስተዳደር',         dept_en:'Administration',   dept_slug:'admin',              photo:'https://randomuser.me/api/portraits/men/32.jpg',  phone:'+251033XXX001', email:'abdi@kemisseinvestment.gov.et' },
  { id:2, name:'ወ/ሮ ሰናይት ተሰፋዬ',   name_en:'Ms. Senait Tesfaye',  position_am:'ምክትል ኃላፊ',           position_en:'Deputy Head',           dept_am:'አስተዳደር',         dept_en:'Administration',   dept_slug:'admin',              photo:'https://randomuser.me/api/portraits/women/44.jpg',phone:'+251033XXX002', email:'senait@kemisseinvestment.gov.et' },
  { id:3, name:'አቶ ካሌብ ኃይሉ',      name_en:'Mr. Kaleb Hailu',     position_am:'የኢንቨስትመንት ባለሙያ',   position_en:'Investment Expert',     dept_am:'ኢንቨስትመንት',      dept_en:'Investment',       dept_slug:'investment-promotion',photo:'https://randomuser.me/api/portraits/men/45.jpg',  phone:'+251033XXX003', email:'kaleb@kemisseinvestment.gov.et' },
  { id:4, name:'ወ/ሮ ሄለን ዳዊት',     name_en:'Ms. Helen Dawit',     position_am:'የኢንዱስትሪ ባለሙያ',     position_en:'Industry Expert',       dept_am:'ኢንዱስትሪ',        dept_en:'Industry',         dept_slug:'industry-development',photo:'https://randomuser.me/api/portraits/women/68.jpg',phone:'+251033XXX004', email:'helen@kemisseinvestment.gov.et' },
  { id:5, name:'አቶ ሙሉጌታ አስፋው',   name_en:'Mr. Mulugeta Asfaw',  position_am:'ፋይናንስ ባለሙያ',        position_en:'Finance Expert',        dept_am:'ፋይናንስ',          dept_en:'Finance',          dept_slug:'finance',            photo:'https://randomuser.me/api/portraits/men/55.jpg',  phone:'+251033XXX005', email:'mulugeta@kemisseinvestment.gov.et' },
  { id:6, name:'አቶ ዳዊት ታደሰ',     name_en:'Mr. Dawit Tadesse',   position_am:'ዕቅድ ባለሙያ',          position_en:'Planning Expert',       dept_am:'ዕቅድ እና ክትትል',   dept_en:'Planning',         dept_slug:'planning-monitoring',photo:'https://randomuser.me/api/portraits/men/22.jpg',  phone:'+251033XXX006', email:'dawit@kemisseinvestment.gov.et' },
  { id:7, name:'ወ/ሮ ያዕቆብ ዘለቀ',   name_en:'Ms. Yaqob Zeleke',    position_am:'ሰው ኃይል ባለሙያ',      position_en:'HR Expert',             dept_am:'ሰው ኃይል',        dept_en:'Human Resource',   dept_slug:'human-resource',     photo:'https://randomuser.me/api/portraits/women/33.jpg',phone:'+251033XXX007', email:'yaqob@kemisseinvestment.gov.et' },
  { id:8, name:'አቶ ቴድሮስ ለማ',     name_en:'Mr. Tedros Lema',     position_am:'ንግድ ባለሙያ',          position_en:'Trade Expert',          dept_am:'ንግድ',            dept_en:'Trade',            dept_slug:'trade',              photo:'https://randomuser.me/api/portraits/men/76.jpg',  phone:'+251033XXX008', email:'tedros@kemisseinvestment.gov.et' },
]

const DEPARTMENTS = [
  { slug:'all',                  label:{ am:'ሁሉም', en:'All', om:'Hunda' } },
  { slug:'admin',                label:{ am:'አስተዳደር', en:'Administration', om:'Bulchiinsa' } },
  { slug:'investment-promotion', label:{ am:'ኢንቨስትመንት', en:'Investment', om:'Invastimantii' } },
  { slug:'industry-development', label:{ am:'ኢንዱስትሪ', en:'Industry', om:'Industirii' } },
  { slug:'finance',              label:{ am:'ፋይናንስ', en:'Finance', om:'Faayinaansii' } },
  { slug:'human-resource',       label:{ am:'ሰው ኃይል', en:'Human Resource', om:'Humna Namaa' } },
  { slug:'planning-monitoring',  label:{ am:'ዕቅድ', en:'Planning', om:'Karoora' } },
  { slug:'trade',                label:{ am:'ንግድ', en:'Trade', om:'Daldalaa' } },
]

export default function StaffPage() {
  const { t, lang } = useLanguage()
  const [staff, setStaff]     = useState(FALLBACK_STAFF)
  const [search, setSearch]   = useState('')
  const [deptFilter, setDeptFilter] = useState('all')

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase.from(TABLES.EMPLOYEES).select('*').eq('status','active').order('display_order')
        if (data?.length) setStaff(data)
      } catch {}
    }
    load()
  }, [])

  const filtered = staff.filter(m => {
    const name = (lang === 'am' ? m.name : m.name_en || m.name) || ''
    const pos  = (lang === 'am' ? m.position_am : m.position_en || m.position) || ''
    const matchSearch = search === '' || name.toLowerCase().includes(search.toLowerCase()) || pos.toLowerCase().includes(search.toLowerCase())
    const matchDept   = deptFilter === 'all' || m.dept_slug === deptFilter || m.department_slug === deptFilter
    return matchSearch && matchDept
  })

  return (
    <div>
      <PageBanner
        title={t.staff.title}
        subtitle={t.staff.subtitle}
        breadcrumbs={[{ label: t.nav.staff }]}
        bgImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80"
      />

      <section className="py-16 bg-gov-bg">
        <div className="container-gov">

          {/* Filters */}
          <div className="bg-white rounded-2xl p-5 shadow-card mb-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t.staff.search}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-gov pl-9"
              />
            </div>
            <div className="relative">
              <Filter size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={deptFilter}
                onChange={e => setDeptFilter(e.target.value)}
                className="input-gov pl-9 pr-10 min-w-[180px] appearance-none cursor-pointer"
              >
                {DEPARTMENTS.map(d => (
                  <option key={d.slug} value={d.slug}>{d.label[lang]}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Count */}
          <p className={`text-sm text-gray-500 mb-6 ${lang==='am'?'font-ethiopic':''}`}>
            {filtered.length} {lang==='am'?'ሠራተኛ ተገኝቷል':lang==='om'?'hojjettoo argame':'staff found'}
          </p>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <User size={48} className="mx-auto mb-3 opacity-30" />
              <p className={lang==='am'?'font-ethiopic':''}>{t.common.noData}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map(member => {
                const name = lang==='am' ? member.name : (member.name_en || member.name)
                const pos  = lang==='am' ? member.position_am : (member.position_en || member.position)
                const dept = lang==='am' ? member.dept_am : (member.dept_en || member.department)
                return (
                  <div key={member.id} className="card group overflow-hidden hover:-translate-y-1 transition-all duration-300">
                    {/* Photo */}
                    <div className="relative h-44 bg-primary-50 overflow-hidden">
                      {member.photo
                        ? <img src={member.photo} alt={name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                        : <div className="w-full h-full flex items-center justify-center"><User size={52} className="text-primary-200" /></div>
                      }
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className={`font-bold text-gov-text text-sm leading-snug mb-0.5 ${lang==='am'?'font-ethiopic':''}`}>{name}</h3>
                      <p className={`text-primary text-xs mb-0.5 ${lang==='am'?'font-ethiopic':''}`}>{pos}</p>
                      <p className={`text-gray-400 text-xs mb-4 ${lang==='am'?'font-ethiopic':''}`}>{dept}</p>

                      {/* Quick contact */}
                      <div className="flex gap-2 mb-3">
                        {member.phone && (
                          <a href={`tel:${member.phone}`} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-primary-50 text-primary hover:bg-primary hover:text-white transition-all text-xs">
                            <Phone size={11} />
                          </a>
                        )}
                        {member.email && (
                          <a href={`mailto:${member.email}`} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-secondary-50 text-secondary hover:bg-secondary hover:text-white transition-all text-xs">
                            <Mail size={11} />
                          </a>
                        )}
                      </div>

                      <Link to={`/staff/${member.id}`}
                        className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg border border-primary text-primary text-xs font-semibold hover:bg-primary hover:text-white transition-all">
                        {t.staff.viewProfile} <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
