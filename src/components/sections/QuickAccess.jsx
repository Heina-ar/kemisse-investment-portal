import React from 'react'
import { Link } from 'react-router-dom'
import { Users, Building2, FileText, Newspaper, ArrowRight } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const CARDS = [
  {
    icon: Users,
    labelKey: 'staff',
    to: '/staff',
    color: 'text-primary',
    bg: 'bg-primary-50',
    border: 'border-primary/20',
    hover: 'hover:bg-primary hover:text-white hover:border-primary',
    iconHover: 'group-hover:text-white',
  },
  {
    icon: Building2,
    labelKey: 'departments',
    to: '/departments',
    color: 'text-secondary',
    bg: 'bg-secondary-50',
    border: 'border-secondary/20',
    hover: 'hover:bg-secondary hover:text-white hover:border-secondary',
    iconHover: 'group-hover:text-white',
  },
  {
    icon: FileText,
    labelKey: 'documents',
    to: '/documents',
    color: 'text-accent-600',
    bg: 'bg-accent-50',
    border: 'border-accent/20',
    hover: 'hover:bg-accent hover:text-white hover:border-accent',
    iconHover: 'group-hover:text-white',
  },
  {
    icon: Newspaper,
    labelKey: 'news',
    to: '/news',
    color: 'text-primary',
    bg: 'bg-primary-50',
    border: 'border-primary/20',
    hover: 'hover:bg-primary hover:text-white hover:border-primary',
    iconHover: 'group-hover:text-white',
  },
]

export default function QuickAccess() {
  const { t, lang } = useLanguage()

  return (
    <section className="py-10 bg-white relative z-10">
      <div className="container-gov">
        {/* Title */}
        <div className="text-center mb-8">
          <p className={`text-sm font-semibold text-accent uppercase tracking-widest mb-1
            ${lang === 'am' ? 'font-ethiopic' : ''}`}>
            {t.quickAccess.title}
          </p>
          <div className="w-12 h-0.5 bg-accent mx-auto rounded-full" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CARDS.map(({ icon: Icon, labelKey, to, color, bg, border, hover, iconHover }) => (
            <Link
              key={to}
              to={to}
              className={`
                group flex flex-col items-center gap-4 p-6 rounded-xl
                border-2 ${border} ${bg}
                ${hover}
                transition-all duration-300 hover:-translate-y-1 hover:shadow-gov
              `}
            >
              <div className={`w-14 h-14 rounded-xl ${bg} flex items-center justify-center
                group-hover:bg-white/20 transition-colors`}>
                <Icon size={28} className={`${color} ${iconHover} transition-colors`} />
              </div>
              <span className={`font-semibold text-center text-sm leading-snug
                ${color} ${iconHover} transition-colors
                ${lang === 'am' ? 'font-ethiopic' : ''}
              `}>
                {t.quickAccess[labelKey]}
              </span>
              <ArrowRight
                size={16}
                className={`${color} ${iconHover} transition-all
                  opacity-0 group-hover:opacity-100 -mt-2`}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
