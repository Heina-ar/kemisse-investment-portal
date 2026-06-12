import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, Calendar, Tag, ArrowRight } from 'lucide-react'
import PageBanner from '../components/ui/PageBanner'
import { useLanguage } from '../contexts/LanguageContext'
import { supabase, TABLES } from '../lib/supabase'

const FALLBACK = [
  { id:1, category:'announcement', date:'2026-06-01', img:'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80',
    title_am:'አዲስ የኢንቨስትመንት ምዝገባ መምሪያ ታተመ', title_en:'New Investment Registration Guideline Published', title_om:"Qajeelcha Galmee Invastimantii Haaraan Ba'e",
    excerpt_am:'ለኢንቨስተሮች ምቹ ሁኔታ ለመፍጠር አዲስ ምዝገባ ሂደት ተዘርጋዋል...', excerpt_en:'A new registration process has been established to create a favorable environment for investors...', excerpt_om:"Haala mijataa invastara uumuuf tartiiba galmee haaraan qindaa'eera..." },
  { id:2, category:'news', date:'2026-05-20', img:'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80',
    title_am:'የኢንዱስትሪ ልማት ስልጠና ተካሄደ', title_en:'Industrial Development Training Conducted', title_om:'Leenjiin Guddina Industirii Adeemsifame',
    excerpt_am:'ለአነስተኛ እና መካከለኛ ኢንዱስትሪ ባለቤቶች ስልጠና ተዘጋጅቷል...', excerpt_en:'Training has been organized for small and medium industry owners...', excerpt_om:'Leenjiin abbootii industirii xiqqaa fi giddu-galeessaatiif qophaayeera...' },
  { id:3, category:'tender', date:'2026-05-10', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    title_am:'ለኢንቨስትመንት ቦታ ሊዝ ጨረታ ይካሄዳል', title_en:'Tender for Investment Site Lease Announced', title_om:"Xiyyeeffannoon Qooda Invastimantii Beeksiifame",
    excerpt_am:'ለተለያዩ ዘርፎች ቦታ ሊዝ ጨረታ ተዘጋጅቷል...', excerpt_en:'Site lease tender prepared for various sectors...', excerpt_om:'Xiyyeeffannoon qooda gibiraa dameelee garagaraatiif qophaayeera...' },
  { id:4, category:'event', date:'2026-04-25', img:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    title_am:'የኢንቨስትመንት ፎረም ተካሄደ', title_en:'Investment Forum Held', title_om:"Foramii Invastimantii Adeemsifame",
    excerpt_am:'ዓለምአቀፍ ኢንቨስተሮችን ያሳተፈ ፎረም በከሚሴ ተካሄደ...', excerpt_en:'A forum involving international investors was held in Kemisse...', excerpt_om:'Foramiin invastara idil-addunyaa hirmaachise Qammiis keessatti adeemsifame...' },
  { id:5, category:'news', date:'2026-04-10', img:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
    title_am:'አዲስ ሕንፃ ፍቃድ ሂደት ቀለለ', title_en:'New Building Permit Process Simplified', title_om:"Tartiibni Hayyama Ijaarsaa Haaraan Salphifame",
    excerpt_am:'ሕንፃ ፍቃድ ለማምጣት የሚወሰደው ጊዜ ወደ 7 ቀናት ቀንሷል...', excerpt_en:'Time to obtain building permit reduced to 7 days...', excerpt_om:'Yeroon hayyama ijaarsaa argachuuf fudhatu guyyaa 7tti hir\'atame...' },
  { id:6, category:'announcement', date:'2026-03-15', img:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
    title_am:'ዓመታዊ ሪፖርት ታተመ', title_en:'Annual Report Published', title_om:"Gabaasni Waggaa Maxxanfame",
    excerpt_am:'የ2025/26 ዓ.ም ዓመታዊ ሪፖርት ለህዝብ ተለቀቀ...', excerpt_en:'The 2025/26 annual report has been released to the public...', excerpt_om:'Gabaasni waggaa 2025/26 ummataf maxxanfame...' },
]

const CATS = ['all','news','announcement','tender','event']
const CAT_COLORS = {
  news:'badge-primary', announcement:'bg-secondary-50 text-secondary-600',
  tender:'bg-accent-50 text-accent-600', event:'bg-purple-50 text-purple-600'
}

export default function NewsPage() {
  const { t, lang } = useLanguage()
  const [searchParams] = useSearchParams()
  const [allNews, setAllNews] = useState(FALLBACK)
  const [cat, setCat]  = useState('all')
  const [search, setSearch] = useState(searchParams.get('search') || '')

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase.from(TABLES.NEWS).select('*').eq('is_published',true).order('created_at',{ascending:false})
        if (data?.length) setAllNews(data)
      } catch {}
    }
    load()
  }, [])

  const filtered = allNews.filter(n => {
    const title = n[`title_${lang}`] || n.title_en || ''
    const matchCat = cat === 'all' || n.category === cat
    const matchSearch = search === '' || title.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div>
      <PageBanner title={t.news.title} subtitle={t.news.subtitle} breadcrumbs={[{ label: t.nav.news }]}
        bgImage="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80" />

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
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${cat===c ? 'bg-primary text-white' : 'bg-gov-bg text-gray-600 hover:text-primary hover:bg-primary-50'}`}>
                  <span className={lang==='am'?'font-ethiopic':''}>
                    {c==='all' ? (lang==='am'?'ሁሉም':'All') : t.news.categories[c]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className={lang==='am'?'font-ethiopic':''}>{t.common.noData}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(item => {
                const title   = item[`title_${lang}`]   || item.title_en
                const excerpt = item[`excerpt_${lang}`] || item.excerpt_en
                const img = item.img || item.featured_image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80'
                return (
                  <div key={item.id} className="card group overflow-hidden hover:-translate-y-1 transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3">
                        <span className={`badge text-xs ${CAT_COLORS[item.category]||'badge-primary'}`}>
                          <Tag size={10} className="mr-1" />{t.news.categories[item.category]||item.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
                        <Calendar size={12} />
                        <span>{new Date(item.date||item.created_at).toLocaleDateString(lang==='am'?'am-ET':'en-GB',{year:'numeric',month:'short',day:'numeric'})}</span>
                      </div>
                      <h3 className={`font-bold text-gov-text text-base mb-2 line-clamp-2 leading-snug ${lang==='am'?'font-ethiopic':''}`}>{title}</h3>
                      <p className={`text-gray-500 text-sm line-clamp-3 mb-4 ${lang==='am'?'font-ethiopic':''}`}>{excerpt}</p>
                      <Link to={`/news/${item.id}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all">
                        {t.news.readMore} <ArrowRight size={14} />
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
