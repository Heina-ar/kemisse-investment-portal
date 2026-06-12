import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const SLIDES = [
  {
    id: 1,
    bg: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80',
    overlay: 'from-primary/85 via-primary/60 to-transparent',
    titleKey: 'slide1Title',
    subtitleKey: 'slide1Subtitle',
    btnKey: 'slide1Btn',
    btnTo: '/about',
    btnVariant: 'accent',
  },
  {
    id: 2,
    bg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80',
    overlay: 'from-secondary/85 via-secondary/60 to-transparent',
    titleKey: 'slide2Title',
    subtitleKey: null,
    btnKey: 'slide2Btn',
    btnTo: '/about',
    btnVariant: 'white',
  },
  {
    id: 3,
    bg: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80',
    overlay: 'from-primary/80 via-primary/50 to-transparent',
    titleKey: 'slide3Title',
    subtitleKey: null,
    btnKey: 'slide3Btn',
    btnTo: '/investment',
    btnVariant: 'accent',
  },
]

export default function HeroSlider() {
  const { t, lang } = useLanguage()
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((index) => {
    if (animating) return
    setAnimating(true)
    setCurrent(index)
    setTimeout(() => setAnimating(false), 700)
  }, [animating])

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo])
  const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo])

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const slide = SLIDES[current]

  return (
    <section className="relative h-[88vh] min-h-[500px] max-h-[750px] overflow-hidden bg-primary">

      {/* Slides */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out
            ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <img
            src={s.bg}
            alt=""
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${s.overlay}`} />
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full container-gov flex flex-col justify-center">
        <div className="max-w-2xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-accent text-xs font-semibold tracking-wide uppercase">
              {lang === 'am' ? 'ከሚሴ ከተማ አስተዳደር' : lang === 'om' ? 'Bulchiinsa Magaalaa Qammiis' : 'Kemisse Town Administration'}
            </span>
          </div>

          {/* Title */}
          <h1
            key={`title-${current}`}
            className={`text-white font-bold leading-tight mb-4 animate-slide-up
              ${lang === 'am' ? 'font-ethiopic text-3xl sm:text-4xl lg:text-5xl' : 'text-3xl sm:text-4xl lg:text-5xl'}
            `}
            style={{ whiteSpace: 'pre-line' }}
          >
            {t.hero[slide.titleKey]}
          </h1>

          {/* Subtitle */}
          {slide.subtitleKey && (
            <p
              key={`sub-${current}`}
              className={`text-white/80 text-lg mb-8 animate-slide-up max-w-lg
                ${lang === 'am' ? 'font-ethiopic' : ''}
              `}
            >
              {t.hero[slide.subtitleKey]}
            </p>
          )}

          {/* CTA Buttons */}
          <div
            key={`btn-${current}`}
            className="flex flex-wrap gap-3 animate-slide-up"
          >
            <Link
              to={slide.btnTo}
              className={`
                inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm
                transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5
                ${slide.btnVariant === 'accent'
                  ? 'bg-accent text-white hover:bg-accent-600'
                  : 'bg-white text-primary hover:bg-gray-50'
                }
              `}
            >
              {t.hero[slide.btnKey]}
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm
                border-2 border-white/50 text-white hover:bg-white/10 hover:border-white
                transition-all duration-200"
            >
              {lang === 'am' ? 'ያግኙን' : lang === 'om' ? 'Nu Qunnamaa' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </div>

      {/* Arrow Controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
          bg-white/20 hover:bg-white/40 text-white flex items-center justify-center
          transition-all duration-200 backdrop-blur-sm"
        aria-label="Previous"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
          bg-white/20 hover:bg-white/40 text-white flex items-center justify-center
          transition-all duration-200 backdrop-blur-sm"
        aria-label="Next"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full
              ${i === current ? 'w-8 h-2.5 bg-accent' : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 right-6 flex flex-col items-center gap-1 text-white/50">
        <div className="w-px h-10 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 w-full h-1/2 bg-accent/60 animate-bounce" />
        </div>
        <span className="text-xs rotate-90 origin-center tracking-widest">SCROLL</span>
      </div>

    </section>
  )
}
