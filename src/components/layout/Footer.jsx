import React from 'react'
import { Link } from 'react-router-dom'
import {
  Phone, Mail, MapPin, Clock,
  Facebook, Twitter, Youtube, Linkedin,
  ExternalLink, ChevronRight, Eye
} from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

function GovEmblem() {
  return (
    <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/20 flex-shrink-0">
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
        <circle cx="20" cy="20" r="18" stroke="#D4A017" strokeWidth="1.5" fill="none"/>
        <path d="M20 8 L22 16 L30 16 L24 21 L26 29 L20 24 L14 29 L16 21 L10 16 L18 16 Z"
              fill="#D4A017"/>
      </svg>
    </div>
  )
}

export default function Footer() {
  const { t, lang } = useLanguage()

  const quickLinks = [
    { path: '/',           label: t.nav.home },
    { path: '/about',      label: t.nav.about },
    { path: '/departments',label: t.nav.departments },
    { path: '/staff',      label: t.nav.staff },
    { path: '/investment', label: t.nav.investment },
    { path: '/news',       label: t.nav.news },
    { path: '/documents',  label: t.nav.documents },
    { path: '/gallery',    label: t.nav.gallery },
    { path: '/contact',    label: t.nav.contact },
  ]

  const socials = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter,  href: '#', label: 'Twitter / X' },
    { icon: Youtube,  href: '#', label: 'YouTube' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ]

  return (
    <footer className="bg-primary text-white">

      {/* ── Main Footer ── */}
      <div className="container-gov py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1: Office Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <GovEmblem />
              <div>
                <p className={`font-bold text-sm leading-snug ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                  {t.siteName}
                </p>
                <p className="text-accent text-xs mt-0.5 font-medium">{t.domain}</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              {lang === 'am'
                ? 'ኢንቨስትመንትን እና ኢንዱስትሪያዊ ልማትን በማስተዋወቅ ዜጎችን ማገልገል ዋና ተልዕኳችን ነው።'
                : lang === 'om'
                ? 'Invastimantii fi guddina industirii babal\'isuun lammiilee tajaajiluun ergama keenya guddaadha.'
                : 'Promoting investment and industrial development to serve citizens is our main mission.'
              }
            </p>

            {/* Social Media */}
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-accent flex items-center justify-center transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-accent text-sm uppercase tracking-wider mb-5 pb-2 border-b border-white/10">
              {lang === 'am' ? 'ፈጣን መዳረሻ' : lang === 'om' ? 'Seensa Hatattama' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-white/70 hover:text-accent text-sm transition-colors group"
                  >
                    <ChevronRight size={14} className="text-accent/50 group-hover:text-accent transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-bold text-accent text-sm uppercase tracking-wider mb-5 pb-2 border-b border-white/10">
              {t.contact.title}
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={16} className="text-accent flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">{t.address}</span>
              </li>
              <li>
                <a href={`tel:${t.phone}`} className="flex gap-3 items-center hover:text-accent transition-colors">
                  <Phone size={16} className="text-accent flex-shrink-0" />
                  <span className="text-white/70 text-sm hover:text-accent">{t.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${t.email}`} className="flex gap-3 items-center hover:text-accent transition-colors">
                  <Mail size={16} className="text-accent flex-shrink-0" />
                  <span className="text-white/70 text-sm hover:text-accent">{t.email}</span>
                </a>
              </li>
              <li className="flex gap-3">
                <Clock size={16} className="text-accent flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">{t.workingHours}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Gov Links */}
          <div>
            <h3 className="font-bold text-accent text-sm uppercase tracking-wider mb-5 pb-2 border-b border-white/10">
              {lang === 'am' ? 'ጠቃሚ ሊንኮች' : lang === 'om' ? 'Liinkii Barbaachisoo' : 'Useful Links'}
            </h3>
            <ul className="space-y-2">
              {[
                { label: lang === 'am' ? 'የኢትዮጵያ መንግስት' : 'Ethiopian Government', href: 'https://www.ethiopia.gov.et' },
                { label: lang === 'am' ? 'የኢትዮጵያ ኢንቨስትመንት ኮሚሽን' : 'Ethiopian Investment Commission', href: 'https://www.ethiopiainvestment.gov.et' },
                { label: lang === 'am' ? 'አማራ ክልል' : 'Amhara Region', href: '#' },
                { label: lang === 'am' ? 'ኦሮሚያ ዞን' : 'Oromia Zone', href: '#' },
                { label: 'Admin Panel', href: '/admin/login' },
              ].map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-2 text-white/70 hover:text-accent text-sm transition-colors group"
                  >
                    <ExternalLink size={12} className="text-accent/50 group-hover:text-accent" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── Footer Bottom ── */}
      <div className="border-t border-white/10">
        <div className="container-gov py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className={`text-white/60 text-xs text-center sm:text-left ${lang === 'am' ? 'font-ethiopic' : ''}`}>
            {t.common.allRights}
          </p>
          <div className="flex items-center gap-2 text-white/50 text-xs">
            <Eye size={13} />
            <span>
              {lang === 'am' ? 'ጎብኚዎች:' : lang === 'om' ? 'Daawwattoota:' : 'Visitors:'} <VisitorCount />
            </span>
          </div>
        </div>
      </div>

    </footer>
  )
}

// Simple visitor counter (localStorage-based fallback)
function VisitorCount() {
  const [count] = React.useState(() => {
    const saved = parseInt(localStorage.getItem('kemisse_visits') || '0')
    const newCount = saved + 1
    localStorage.setItem('kemisse_visits', newCount.toString())
    return newCount
  })
  return <span className="font-semibold text-accent">{count.toLocaleString()}</span>
}
