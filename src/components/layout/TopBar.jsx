import React from 'react'
import { Phone, Mail, Globe } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

export default function TopBar() {
  const { t, lang, changeLanguage, LANGUAGES } = useLanguage()

  return (
    <div className="bg-primary text-white text-sm py-2 hidden md:block">
      <div className="container-gov flex items-center justify-between">

        {/* Left: Contact Info */}
        <div className="flex items-center gap-6">
          <a
            href={`tel:${t.phone}`}
            className="flex items-center gap-1.5 hover:text-accent transition-colors"
          >
            <Phone size={13} />
            <span>{t.phone}</span>
          </a>
          <a
            href={`mailto:${t.email}`}
            className="flex items-center gap-1.5 hover:text-accent transition-colors"
          >
            <Mail size={13} />
            <span>{t.email}</span>
          </a>
        </div>

        {/* Right: Language Switcher */}
        <div className="flex items-center gap-1">
          <Globe size={13} className="mr-1 opacity-70" />
          {LANGUAGES.map((l, i) => (
            <React.Fragment key={l.code}>
              <button
                onClick={() => changeLanguage(l.code)}
                className={`
                  px-2 py-0.5 rounded text-xs font-semibold transition-all
                  ${lang === l.code
                    ? 'bg-accent text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                  }
                `}
                title={l.fullName}
              >
                {l.label}
              </button>
              {i < LANGUAGES.length - 1 && (
                <span className="text-white/30 text-xs">|</span>
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </div>
  )
}
