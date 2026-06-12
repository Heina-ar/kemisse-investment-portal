import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, Tag, ArrowLeft, Share2, Facebook, Twitter } from 'lucide-react'
import PageBanner from '../components/ui/PageBanner'
import { useLanguage } from '../contexts/LanguageContext'
import { supabase, TABLES } from '../lib/supabase'

const FALLBACK = {
  1: { id:1, category:'announcement', date:'2026-06-01',
    img:'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80',
    title_am:'አዲስ የኢንቨስትመንት ምዝገባ መምሪያ ታተመ', title_en:'New Investment Registration Guideline Published',
    content_am:'ከሚሴ ከተማ አስተዳደር ኢንዱስትሪና ኢንቨስትመንት ጽ/ቤት ለኢንቨስተሮች ምቹ ሁኔታ ለመፍጠር አዲስ ምዝገባ ሂደት አዘጋጅቷል። አዲሱ ሂደት ምዝገባን ቀልጣፋ፣ ግልጽ እና ለሁሉም ተደራሽ ለማድረግ ዓላማ አለው። ይህ መምሪያ ለሁሉም አዲስ ኢንቨስተሮች ሙሉ ሂደቱን ያስረዳል።',
    content_en:'The Kemisse Town Administration Industry and Investment Office has developed a new registration process to create a favorable environment for investors. The new process aims to make registration efficient, transparent and accessible to all. This guideline explains the full process for all new investors.' }
}

const CAT_COLORS = { news:'badge-primary', announcement:'bg-secondary-50 text-secondary-600', tender:'bg-accent-50 text-accent-600', event:'bg-purple-50 text-purple-600' }

export default function NewsDetail() {
  const { id } = useParams()
  const { t, lang } = useLanguage()
  const [item, setItem] = useState(null)
  const [related, setRelated] = useState([])

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase.from(TABLES.NEWS).select('*').eq('id', id).single()
        if (data) { setItem(data); loadRelated(data.category) }
        else { setItem(FALLBACK[parseInt(id)] || FALLBACK[1]) }
      } catch { setItem(FALLBACK[parseInt(id)] || FALLBACK[1]) }
    }
    async function loadRelated(cat) {
      try {
        const { data } = await supabase.from(TABLES.NEWS).select('*').eq('category', cat).neq('id', id).limit(3)
        if (data?.length) setRelated(data)
      } catch {}
    }
    load()
  }, [id])

  if (!item) return <div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"/></div>

  const title   = item[`title_${lang}`]   || item.title_en
  const content = item[`content_${lang}`] || item.content_en || ''

  return (
    <div>
      <PageBanner title={title} breadcrumbs={[{label:t.nav.news,to:'/news'},{label:title}]}
        bgImage={item.img||item.featured_image} />

      <section className="py-16 bg-gov-bg">
        <div className="container-gov">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Article */}
            <div className="lg:col-span-2">
              <div className="card overflow-hidden">
                {(item.img||item.featured_image) && (
                  <img src={item.img||item.featured_image} alt={title} className="w-full h-72 object-cover" />
                )}
                <div className="p-8">
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className={`badge ${CAT_COLORS[item.category]||'badge-primary'}`}>
                      <Tag size={11} className="mr-1" />{t.news.categories[item.category]}
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-400 text-sm">
                      <Calendar size={13} />
                      {new Date(item.date||item.created_at).toLocaleDateString(lang==='am'?'am-ET':'en-GB',{year:'numeric',month:'long',day:'numeric'})}
                    </span>
                  </div>
                  <h1 className={`text-2xl font-bold text-gov-text mb-6 leading-snug ${lang==='am'?'font-ethiopic':''}`}>{title}</h1>
                  <div className={`text-gray-600 leading-loose whitespace-pre-line text-base ${lang==='am'?'font-ethiopic':''}`}>{content}</div>

                  {/* Share */}
                  <div className="mt-10 pt-6 border-t border-gray-100 flex items-center gap-3">
                    <span className="text-sm text-gray-400 font-medium flex items-center gap-1"><Share2 size={14}/>{lang==='am'?'አጋሩ':'Share'}</span>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                      <Facebook size={16}/>
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${title}`} target="_blank" rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors">
                      <Twitter size={16}/>
                    </a>
                  </div>
                </div>
              </div>
              <Link to="/news" className="btn-outline mt-4 inline-flex">
                <ArrowLeft size={15}/>{lang==='am'?'ሁሉም ዜናዎች':'All News'}
              </Link>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {related.length > 0 && (
                <div className="card p-5">
                  <h3 className={`font-bold text-gov-text mb-4 text-sm border-b border-gray-100 pb-3 ${lang==='am'?'font-ethiopic':''}`}>
                    {lang==='am'?'ተዛማጅ ዜናዎች':lang==='om'?'Oduu Wal-qabataa':'Related News'}
                  </h3>
                  <div className="space-y-4">
                    {related.map(r => (
                      <Link key={r.id} to={`/news/${r.id}`} className="flex gap-3 group">
                        <img src={r.img||r.featured_image||'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=200&q=80'}
                          alt="" className="w-16 h-14 rounded-lg object-cover flex-shrink-0 group-hover:opacity-80 transition-opacity" />
                        <div>
                          <p className={`text-xs font-semibold text-gov-text line-clamp-2 group-hover:text-primary transition-colors ${lang==='am'?'font-ethiopic':''}`}>
                            {r[`title_${lang}`]||r.title_en}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">{new Date(r.date||r.created_at).toLocaleDateString('en-GB',{month:'short',day:'numeric'})}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
