import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

export default function ContactStrip() {
  const { t, lang } = useLanguage()

  const items = [
    { icon: Phone,  label: t.contact.phone,   value: t.phone,        href: `tel:${t.phone}` },
    { icon: Mail,   label: t.contact.email,   value: t.email,        href: `mailto:${t.email}` },
    { icon: MapPin, label: t.contact.address, value: t.address,      href: '#map' },
    { icon: Clock,  label: t.contact.hours,   value: t.workingHours, href: null },
  ]

  return (
    <section className="py-16 bg-primary text-white">
      <div className="container-gov">

        <div className="text-center mb-10">
          <h2 className={`text-3xl font-bold text-white mb-2 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
            {t.contact.title}
          </h2>
          <p className={`text-white/70 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {items.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="flex flex-col items-center text-center gap-3 p-5
              bg-white/10 rounded-xl hover:bg-white/15 transition-colors">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Icon size={22} className="text-accent" />
              </div>
              <div>
                <p className={`text-white/60 text-xs uppercase tracking-wider mb-1
                  ${lang === 'am' ? 'font-ethiopic' : ''}`}>{label}</p>
                {href ? (
                  <a href={href} className={`text-white font-medium text-sm hover:text-accent transition-colors
                    ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                    {value}
                  </a>
                ) : (
                  <p className={`text-white font-medium text-sm ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                    {value}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/contact" className="btn-accent">
            {lang === 'am' ? 'ሙሉ ገጹን ይመልከቱ' : lang === 'om' ? 'Fuula Guutuu Ilaali' : 'View Full Contact Page'}
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  )
}
