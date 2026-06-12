import React, { useState, useEffect } from 'react'
import { FileCheck, Download, Eye, Search, Filter } from 'lucide-react'
import PageBanner from '../components/ui/PageBanner'
import { useLanguage } from '../contexts/LanguageContext'
import { supabase, TABLES } from '../lib/supabase'

const FALLBACK = [
  { id:1, category:'guidelines', downloads:142, title_am:'የኢንቨስትመንት መምሪያ',      title_en:'Investment Guide',              title_om:"Qajeelcha Invastimantii",         desc_am:'ለኢንቨስተሮች ሙሉ መምሪያ',    desc_en:'Complete guide for investors',    file_url:'#' },
  { id:2, category:'forms',      downloads:98,  title_am:'ማመልከቻ ቅጽ',              title_en:'Application Form',              title_om:"Foomii Iyyannoo",                  desc_am:'የኢንቨስትመንት ማመልከቻ',     desc_en:'Investment application form',     file_url:'#' },
  { id:3, category:'policies',   downloads:75,  title_am:'የኢንቨስትመንት ፖሊሲ',       title_en:'Investment Policy',             title_om:"Imaammata Invastimantii",          desc_am:'ሙሉ ፖሊሲ ሰነድ',           desc_en:'Full policy document',            file_url:'#' },
  { id:4, category:'directives', downloads:60,  title_am:'የንግድ ፈቃድ መምሪያ',        title_en:'Trade License Directive',       title_om:"Qajeelfama Hayyama Daldalaaa",     desc_am:'ለነጋዴዎች የሚሆን',          desc_en:'For traders and businesses',      file_url:'#' },
  { id:5, category:'reports',    downloads:45,  title_am:'ዓመታዊ ሪፖርት 2025/26',    title_en:'Annual Report 2025/26',         title_om:"Gabaasa Waggaa 2025/26",           desc_am:'የጽ/ቤቱ ዓመታዊ ሪፖርት',     desc_en:'Office annual report',            file_url:'#' },
  { id:6, category:'forms',      downloads:30,  title_am:'የቦታ ሊዝ ቅጽ',            title_en:'Land Lease Application Form',   title_om:"Foomii Kadhannaa Qooda Lafa",      desc_am:'ቦታ ሊዝ ለጠቋሚዎች',         desc_en:'For land lease applicants',       file_url:'#' },
  { id:7, category:'guidelines', downloads:55,  title_am:'የፋብሪካ ምዝገባ መምሪያ',     title_en:'Factory Registration Guideline',title_om:"Qajeelcha Galmee Faabrikkaa",      desc_am:'አዲስ ፋብሪካ ለሚጀምሩ',       desc_en:'For new factory registrants',     file_url:'#' },
  { id:8, category:'policies',   downloads:22,  title_am:'የሠራተኛ ፖሊሲ',           title_en:'Employee Policy',               title_om:"Imaammata Hojjettootaa",           desc_am:'ለሠራተኞች የሚሆን ፖሊሲ',    desc_en:'Policy for employees',            file_url:'#' },
]

const CATS = ['all','forms','guidelines','policies','directives','reports']
const CAT_COLORS = {
  forms:'bg-primary-50 text-primary', guidelines:'bg-secondary-50 text-secondary-600',
  policies:'bg-accent-50 text-accent-600', directives:'bg-purple-50 text-purple-600', reports:'bg-red-50 text-red-600'
}

export default function DocumentsPage() {
  const { t, lang } = useLanguage()
  const [docs, setDocs] = useState(FALLBACK)
  const [cat, setCat] = useState('all')
  const [search, setSearch] = useState('')
  const [downloadCounts, setDownloadCounts] = useState({})

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase.from(TABLES.DOCUMENTS).select('*').eq('status','active').order('display_order')
        if (data?.length) setDocs(data)
      } catch {}
    }
    load()
  }, [])

  const filtered = docs.filter(d => {
    const title = d[`title_${lang}`] || d.title_en || ''
    return (cat==='all' || d.category===cat) && (search==='' || title.toLowerCase().includes(search.toLowerCase()))
  })

  const handleDownload = async (doc) => {
    const newCount = (doc.downloads || 0) + 1
    setDownloadCounts(prev => ({ ...prev, [doc.id]: newCount }))
    try {
      await supabase.from(TABLES.DOCUMENTS).update({ downloads: newCount }).eq('id', doc.id)
    } catch {}
    if (doc.file_url && doc.file_url !== '#') window.open(doc.file_url, '_blank')
  }

  return (
    <div>
      <PageBanner title={t.documents.title} subtitle={t.documents.subtitle}
        breadcrumbs={[{ label: t.nav.documents }]}
        bgImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80" />

      <section className="py-16 bg-gov-bg">
        <div className="container-gov">

          {/* Filters */}
          <div className="bg-white rounded-2xl p-5 shadow-card mb-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder={t.common.search + '...'} className="input-gov pl-9" />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATS.map(c => (
                <button key={c} onClick={() => setCat(c)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all
                    ${cat===c?'bg-primary text-white':'bg-gov-bg text-gray-600 hover:bg-primary-50 hover:text-primary'}`}>
                  <span className={lang==='am'?'font-ethiopic':''}>
                    {c==='all'?(lang==='am'?'ሁሉም':'All'):t.documents.categories[c]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map(doc => {
              const title   = doc[`title_${lang}`] || doc.title_en
              const desc    = doc[`desc_${lang}`]  || doc.description_en || ''
              const count   = downloadCounts[doc.id] ?? doc.downloads ?? 0
              const colors  = CAT_COLORS[doc.category] || 'bg-primary-50 text-primary'
              return (
                <div key={doc.id} className="card group p-5 flex flex-col gap-4 hover:-translate-y-1 transition-all">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors} group-hover:scale-110 transition-transform`}>
                    <FileCheck size={22} />
                  </div>
                  <div className="flex-1">
                    <span className={`badge text-xs mb-2 ${colors}`}>
                      {t.documents.categories[doc.category] || doc.category}
                    </span>
                    <h4 className={`font-bold text-gov-text text-sm leading-snug ${lang==='am'?'font-ethiopic':''}`}>{title}</h4>
                    {desc && <p className={`text-gray-400 text-xs mt-1 line-clamp-2 ${lang==='am'?'font-ethiopic':''}`}>{desc}</p>}
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <Download size={11} /><span>{count} {t.documents.downloads}</span>
                  </div>
                  <div className="flex gap-2 pt-2 border-t border-gray-100">
                    <button onClick={() => handleDownload(doc)}
                      className="flex-1 btn-primary btn-sm text-xs justify-center py-2">
                      <Download size={13}/>{t.documents.download}
                    </button>
                    <button className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-primary hover:text-primary transition-all">
                      <Eye size={15}/>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </section>
    </div>
  )
}
