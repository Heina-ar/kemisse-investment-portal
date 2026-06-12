import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

export default function PageBanner({ title, subtitle, breadcrumbs = [], bgImage }) {
  const { lang } = useLanguage()

  const defaultBg = 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80'

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={bgImage || defaultBg}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/60" />
      </div>

      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-secondary/10 rounded-full translate-y-1/2" />

      <div className="relative container-gov">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-white/60 text-sm mb-6">
          <Link to="/" className="hover:text-accent transition-colors flex items-center gap-1">
            <Home size={13} />
            <span>{lang === 'am' ? 'መነሻ' : lang === 'om' ? 'Mana' : 'Home'}</span>
          </Link>
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              <ChevronRight size={13} className="text-white/30" />
              {crumb.to ? (
                <Link to={crumb.to} className="hover:text-accent transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white/90">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Title */}
        <h1 className={`text-white font-bold text-3xl sm:text-4xl mb-3 max-w-2xl
          ${lang === 'am' ? 'font-ethiopic' : ''}`}>
          {title}
        </h1>
        {subtitle && (
          <p className={`text-white/75 text-base max-w-xl ${lang === 'am' ? 'font-ethiopic' : ''}`}>
            {subtitle}
          </p>
        )}

        {/* Accent line */}
        <div className="mt-5 w-16 h-1 bg-accent rounded-full" />
      </div>
    </section>
  )
}
