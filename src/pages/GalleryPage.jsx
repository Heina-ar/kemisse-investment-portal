import React, { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import PageBanner from '../components/ui/PageBanner'
import { useLanguage } from '../contexts/LanguageContext'
import { supabase, TABLES } from '../lib/supabase'

const FALLBACK = [
  { id:1, category:'office',    src:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', title:'Office Building' },
  { id:2, category:'events',    src:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', title:'Investment Forum' },
  { id:3, category:'projects',  src:'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80', title:'Development Project' },
  { id:4, category:'investment',src:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80', title:'Investment Meeting' },
  { id:5, category:'office',    src:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', title:'Office Interior' },
  { id:6, category:'events',    src:'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',   title:'Training Event' },
  { id:7, category:'projects',  src:'https://images.unsplash.com/photo-1565108401767-8e531b9bbb4d?w=800&q=80', title:'Industry Project' },
  { id:8, category:'investment',src:'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80', title:'Agriculture Investment' },
  { id:9, category:'office',    src:'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80', title:'Staff Meeting' },
  { id:10,category:'events',    src:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', title:'Community Event' },
  { id:11,category:'projects',  src:'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80', title:'Tourism Project' },
  { id:12,category:'investment',src:'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80',   title:'Trade Investment' },
]

const CATS = ['all','office','events','projects','investment']

export default function GalleryPage() {
  const { t, lang } = useLanguage()
  const [items, setItems]       = useState(FALLBACK)
  const [cat, setCat]           = useState('all')
  const [lightbox, setLightbox] = useState(null) // index

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase.from(TABLES.GALLERY).select('*').eq('status','active').order('created_at',{ascending:false})
        if (data?.length) setItems(data.map(d => ({ ...d, src: d.image_url || d.src })))
      } catch {}
    }
    load()
  }, [])

  const filtered = cat==='all' ? items : items.filter(i => i.category===cat)

  const openLightbox = idx => { setLightbox(idx); document.body.style.overflow = 'hidden' }
  const closeLightbox = () => { setLightbox(null); document.body.style.overflow = '' }
  const prevImg = () => setLightbox(i => (i - 1 + filtered.length) % filtered.length)
  const nextImg = () => setLightbox(i => (i + 1) % filtered.length)

  useEffect(() => {
    const onKey = e => {
      if (lightbox === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevImg()
      if (e.key === 'ArrowRight') nextImg()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <div>
      <PageBanner title={t.gallery.title} subtitle={t.gallery.subtitle}
        breadcrumbs={[{ label: t.nav.gallery }]}
        bgImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80" />

      <section className="py-16 bg-gov-bg">
        <div className="container-gov">

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all
                  ${cat===c?'bg-primary text-white shadow-gov':'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary shadow-card'}`}>
                <span className={lang==='am'?'font-ethiopic':''}>
                  {c==='all'?t.gallery.categories.all:t.gallery.categories[c]}
                </span>
              </button>
            ))}
          </div>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item, idx) => (
              <div key={item.id}
                className={`relative overflow-hidden rounded-xl cursor-pointer group shadow-card hover:shadow-gov-lg transition-all duration-300 hover:-translate-y-0.5
                  ${idx % 7 === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}`}
                style={{ aspectRatio: idx % 7 === 0 ? '1/1' : '4/3' }}
                onClick={() => openLightbox(idx)}
              >
                <img src={item.src || item.image_url} alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <p className="text-white text-xs font-medium truncate">{item.title}</p>
                    <ZoomIn size={16} className="text-white flex-shrink-0 ml-2" />
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="bg-primary/80 text-white text-xs px-2 py-0.5 rounded-full capitalize">
                    {t.gallery.categories[item.category] || item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center lightbox-overlay"
          onClick={closeLightbox}>
          <button onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center z-10">
            <X size={20} />
          </button>
          <button onClick={e => { e.stopPropagation(); prevImg() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center z-10">
            <ChevronLeft size={24} />
          </button>
          <button onClick={e => { e.stopPropagation(); nextImg() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center z-10">
            <ChevronRight size={24} />
          </button>

          <div className="max-w-4xl max-h-[90vh] w-full mx-4" onClick={e => e.stopPropagation()}>
            <img src={filtered[lightbox]?.src || filtered[lightbox]?.image_url} alt={filtered[lightbox]?.title}
              className="w-full h-full object-contain rounded-xl max-h-[80vh]" />
            <p className="text-white/70 text-sm text-center mt-3">
              {filtered[lightbox]?.title} · {lightbox + 1} / {filtered.length}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
