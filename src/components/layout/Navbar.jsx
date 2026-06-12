import React, { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Search, ChevronDown, Globe, Phone, Mail } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

// Government emblem placeholder (SVG)
function GovEmblem() {
  return (
    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center border-2 border-accent flex-shrink-0">
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
        <circle cx="20" cy="20" r="18" stroke="#D4A017" strokeWidth="1.5" fill="#0F4C81"/>
        <path d="M20 8 L22 16 L30 16 L24 21 L26 29 L20 24 L14 29 L16 21 L10 16 L18 16 Z"
              fill="#D4A017"/>
      </svg>
    </div>
  )
}

export default function Navbar() {
  const { t, lang, changeLanguage, LANGUAGES } = useLanguage()
  const [isOpen,    setIsOpen]    = useState(false)
  const [scrolled,  setScrolled]  = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef(null)
  const navigate = useNavigate()

  // Sticky on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setIsOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus()
  }, [searchOpen])

  const navItems = [
    { path: '/',            label: t.nav.home },
    { path: '/about',       label: t.nav.about },
    { path: '/departments', label: t.nav.departments },
    { path: '/staff',       label: t.nav.staff },
    { path: '/investment',  label: t.nav.investment },
    { path: '/news',        label: t.nav.news },
    { path: '/documents',   label: t.nav.documents },
    { path: '/gallery',     label: t.nav.gallery },
    { path: '/contact',     label: t.nav.contact },
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/news?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const activeLinkClass = ({ isActive }) =>
    `nav-link text-sm font-medium transition-all ${isActive ? 'nav-link-active' : ''}`

  return (
    <nav className={`
      sticky top-0 z-40 bg-white transition-shadow duration-300
      ${scrolled ? 'shadow-gov' : 'shadow-sm border-b border-gray-100'}
    `}>
      <div className="container-gov">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0" onClick={() => setIsOpen(false)}>
            <GovEmblem />
            <div className="hidden sm:block">
              <p className={`font-bold text-primary leading-tight ${lang === 'am' ? 'font-ethiopic' : ''}`}
                 style={{ fontSize: '0.78rem', maxWidth: '200px' }}>
                {lang === 'en'
                  ? 'Kemisse Industry & Investment'
                  : lang === 'om'
                  ? 'Biiroo Industirii fi Invastimantii'
                  : 'ከሚሴ ኢንዱስትሪና ኢንቨስትመንት'}
              </p>
              <p className="text-xs text-secondary font-medium">{t.domain}</p>
            </div>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={activeLinkClass}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-primary-50 transition-all"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Mobile Language */}
            <div className="flex lg:hidden items-center gap-0.5">
              {LANGUAGES.map(l => (
                <button
                  key={l.code}
                  onClick={() => changeLanguage(l.code)}
                  className={`px-1.5 py-0.5 rounded text-xs font-bold transition-all
                    ${lang === l.code ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-primary-50 transition-all"
              aria-label="Menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── Search Bar (dropdown) ── */}
        {searchOpen && (
          <div className="pb-3 pt-1 border-t border-gray-100 animate-slide-down">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t.common.search + '...'}
                className="input-gov flex-1"
              />
              <button type="submit" className="btn-primary btn-sm">
                <Search size={16} />
                {t.common.search}
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-primary hover:text-primary transition-all"
              >
                <X size={16} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ── Mobile Menu ── */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white shadow-lg animate-slide-down">
          {/* Mobile contact */}
          <div className="bg-primary-50 px-4 py-3 flex flex-col gap-1.5 md:hidden">
            <a href={`tel:${t.phone}`} className="flex items-center gap-2 text-xs text-primary font-medium">
              <Phone size={12} /> {t.phone}
            </a>
            <a href={`mailto:${t.email}`} className="flex items-center gap-2 text-xs text-primary font-medium">
              <Mail size={12} /> {t.email}
            </a>
          </div>

          {/* Nav links */}
          <div className="px-4 py-3 flex flex-col gap-1">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                   ${isActive
                     ? 'bg-primary text-white'
                     : 'text-gov-text hover:bg-primary-50 hover:text-primary'
                   }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
