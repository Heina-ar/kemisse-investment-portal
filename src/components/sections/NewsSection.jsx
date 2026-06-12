import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, ArrowRight, Tag } from 'lucide-react'
import { supabase, TABLES } from '../../lib/supabase'
import { useLanguage } from '../../contexts/LanguageContext'

// Fallback static news
const FALLBACK_NEWS = [
  {
    id: 1,
    slug: '1',
    img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80',
    category: 'announcement',
    date: '2026-06-01',
    title: {
      am: 'አዲስ የኢንቨስትመንት ምዝገባ መምሪያ ታተመ',
      en: 'New Investment Registration Guideline Published',
      om: 'Qajeelcha Galmee Invastimantii Haaraan Ba\'e',
    },
    excerpt: {
      am: 'ለኢንቨስተሮች ምቹ ሁኔታ ለመፍጠር አዲስ ምዝገባ ሂደት ተዘርጋዋል...',
      en: 'A new registration process has been established to create a favorable environment for investors...',
      om: 'Haala mijataa invastara uumuuf tartiiba galmee haaraan qindaa\'eera...',
    },
  },
  {
    id: 2,
    slug: '2',
    img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80',
    category: 'news',
    date: '2026-05-20',
    title: {
      am: 'የኢንዱስትሪ ልማት ስልጠና ተካሄደ',
      en: 'Industrial Development Training Conducted',
      om: 'Leenjiin Guddina Industirii Adeemsifame',
    },
    excerpt: {
      am: 'ለአነስተኛ እና መካከለኛ ኢንዱስትሪ ባለቤቶች ስልጠና ተዘጋጅቷል...',
      en: 'Training has been organized for small and medium industry owners...',
      om: 'Leenjiin abbootii industirii xiqqaa fi giddu-galeessaatiif qophaayeera...',
    },
  },
  {
    id: 3,
    slug: '3',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    category: 'tender',
    date: '2026-05-10',
    title: {
      am: 'ለኢንቨስትመንት ቦታ ሊዝ ጨረታ ይካሄዳል',
      en: 'Tender for Investment Site Lease Announced',
      om: 'Xiyyeeffannoon Qooda Invastimantii Beeksiifame',
    },
    excerpt: {
      am: 'ለተለያዩ ዘርፎች ቦታ ሊዝ ጨረታ ተዘጋጅቷል ሁሉም ፍላጎት ያላቸው...',
      en: 'Site lease tender prepared for various sectors, all interested parties...',
      om: 'Xiyyeeffannoon qooda gibiraa dameelee garagaraatiif qophaayeera...',
    },
  },
]

const CATEGORY_COLORS = {
  news:         'badge-primary',
  announcement: 'bg-secondary-50 text-secondary-600',
  tender:       'bg-accent-50 text-accent-600',
  event:        'bg-purple-50 text-purple-600',
}

function formatDate(dateStr, lang) {
  const date = new Date(dateStr)
  if (lang === 'am') {
    return date.toLocaleDateString('am-ET', { year: 'numeric', month: 'long', day: 'numeric' })
  }
  return date.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function NewsSection() {
  const { t, lang } = useLanguage()
  const [news, setNews] = useState(FALLBACK_NEWS)

  useEffect(() => {
    async function fetchNews() {
      try {
        const { data } = await supabase
          .from(TABLES.NEWS)
          .select('*')
          .eq('is_published', true)
          .order('created_at', { ascending: false })
          .limit(3)
        if (data?.length) setNews(data)
      } catch { /* use fallback */ }
    }
    fetchNews()
  }, [])

  return (
    <section className="py-16 bg-gov-bg">
      <div className="container-gov">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="section-divider" />
            <h2 className={`section-title ${lang === 'am' ? 'font-ethiopic' : ''}`}>
              {t.news.title}
            </h2>
            <p className={`section-subtitle ${lang === 'am' ? 'font-ethiopic' : ''}`}>
              {t.news.subtitle}
            </p>
          </div>
          <Link to="/news" className="btn-outline btn-sm flex-shrink-0">
            {t.news.allNews}
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item) => {
            const title   = typeof item.title   === 'object' ? item.title[lang]   : (item[`title_${lang}`]   || item.title_en)
            const excerpt = typeof item.excerpt === 'object' ? item.excerpt[lang] : (item[`excerpt_${lang}`] || item.excerpt_en)
            const imgSrc  = item.img || item.featured_image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80'

            return (
              <div key={item.id} className="card group overflow-hidden">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`badge text-xs ${CATEGORY_COLORS[item.category] || 'badge-primary'}`}>
                      <Tag size={10} className="mr-1" />
                      {t.news.categories[item.category] || item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
                    <Calendar size={12} />
                    <span>{formatDate(item.date || item.created_at, lang)}</span>
                  </div>

                  <h3 className={`font-bold text-gov-text text-base mb-2 line-clamp-2 leading-snug
                    ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                    {title}
                  </h3>

                  <p className={`text-gray-500 text-sm line-clamp-3 leading-relaxed mb-4
                    ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                    {excerpt}
                  </p>

                  <Link
                    to={`/news/${item.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary
                      hover:gap-2.5 transition-all"
                  >
                    {t.news.readMore}
                    <ArrowRight size={14} />
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
