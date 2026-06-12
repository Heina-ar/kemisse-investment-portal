import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Download, Eye, ArrowRight, FileCheck } from 'lucide-react'
import { supabase, TABLES } from '../../lib/supabase'
import { useLanguage } from '../../contexts/LanguageContext'

const FALLBACK_DOCS = [
  {
    id: 1,
    title_am: 'የኢንቨስትመንት መምሪያ',
    title_en: 'Investment Guide',
    title_om: 'Qajeelcha Invastimantii',
    category: 'guidelines',
    downloads: 142,
    file_url: '#',
  },
  {
    id: 2,
    title_am: 'የኢንቨስትመንት ማመልከቻ ቅጽ',
    title_en: 'Investment Application Form',
    title_om: 'Foomii Iyyannoo Invastimantii',
    category: 'forms',
    downloads: 98,
    file_url: '#',
  },
  {
    id: 3,
    title_am: 'የኢንቨስትመንት ፖሊሲ ሰነድ',
    title_en: 'Investment Policy Document',
    title_om: 'Sanadaa Imaammata Invastimantii',
    category: 'policies',
    downloads: 75,
    file_url: '#',
  },
  {
    id: 4,
    title_am: 'የንግድ ፈቃድ ሂደት',
    title_en: 'Trade License Procedure',
    title_om: 'Tartiiba Hayyama Daldalaaa',
    category: 'directives',
    downloads: 60,
    file_url: '#',
  },
]

const CATEGORY_COLORS = {
  forms:      { bg: 'bg-primary-50',   text: 'text-primary',   icon: 'text-primary'   },
  guidelines: { bg: 'bg-secondary-50', text: 'text-secondary', icon: 'text-secondary' },
  policies:   { bg: 'bg-accent-50',    text: 'text-accent-600',icon: 'text-accent-600'},
  directives: { bg: 'bg-purple-50',    text: 'text-purple-600',icon: 'text-purple-600'},
  reports:    { bg: 'bg-red-50',       text: 'text-red-600',   icon: 'text-red-500'   },
}

export default function DocumentsSection() {
  const { t, lang } = useLanguage()
  const [docs, setDocs] = useState(FALLBACK_DOCS)

  useEffect(() => {
    async function fetchDocs() {
      try {
        const { data } = await supabase
          .from(TABLES.DOCUMENTS)
          .select('*')
          .eq('status', 'active')
          .order('display_order', { ascending: true })
          .limit(4)
        if (data?.length) setDocs(data)
      } catch { /* use fallback */ }
    }
    fetchDocs()
  }, [])

  async function handleDownload(doc) {
    // Increment download counter
    try {
      await supabase
        .from(TABLES.DOCUMENTS)
        .update({ downloads: (doc.downloads || 0) + 1 })
        .eq('id', doc.id)
    } catch { /* silent */ }

    if (doc.file_url && doc.file_url !== '#') {
      window.open(doc.file_url, '_blank')
    }
  }

  return (
    <section className="py-16 bg-gov-bg">
      <div className="container-gov">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="section-divider" />
            <h2 className={`section-title ${lang === 'am' ? 'font-ethiopic' : ''}`}>
              {t.documents.title}
            </h2>
            <p className={`section-subtitle ${lang === 'am' ? 'font-ethiopic' : ''}`}>
              {t.documents.subtitle}
            </p>
          </div>
          <Link to="/documents" className="btn-outline btn-sm flex-shrink-0">
            {t.common.viewAll}
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Document cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {docs.map((doc) => {
            const title = doc[`title_${lang}`] || doc.title_en || doc.title
            const colors = CATEGORY_COLORS[doc.category] || CATEGORY_COLORS.forms

            return (
              <div key={doc.id} className="card group p-5 flex flex-col gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center
                  group-hover:scale-110 transition-transform`}>
                  <FileCheck size={24} className={colors.icon} />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <span className={`badge text-xs mb-2 ${colors.bg} ${colors.text}`}>
                    {t.documents.categories[doc.category] || doc.category}
                  </span>
                  <h4 className={`font-semibold text-gov-text text-sm leading-snug
                    ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                    {title}
                  </h4>
                </div>

                {/* Download count */}
                <div className="flex items-center gap-1 text-gray-400 text-xs">
                  <Download size={11} />
                  <span>{doc.downloads || 0} {t.documents.downloads}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => handleDownload(doc)}
                    className="flex-1 btn-primary btn-sm text-xs justify-center"
                  >
                    <Download size={13} />
                    {t.documents.download}
                  </button>
                  <Link
                    to={`/documents`}
                    className="p-2 rounded-lg border border-gray-200 text-gray-500
                      hover:border-primary hover:text-primary transition-all"
                  >
                    <Eye size={15} />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
