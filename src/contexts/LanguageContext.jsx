import React, { createContext, useContext, useState, useEffect } from 'react'
import am from '../locales/am'
import en from '../locales/en'
import om from '../locales/om'

const translations = { am, en, om }

const LanguageContext = createContext()

export const LANGUAGES = [
  { code: 'am', label: 'አማ', fullName: 'አማርኛ', dir: 'ltr' },
  { code: 'en', label: 'EN',  fullName: 'English', dir: 'ltr' },
  { code: 'om', label: 'OM',  fullName: 'Afaan Oromo', dir: 'ltr' },
]

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('kemisse_lang') || 'am'
  })

  const t = translations[lang] || translations['am']

  useEffect(() => {
    localStorage.setItem('kemisse_lang', lang)
    document.documentElement.lang = lang
    // Apply Ethiopic font class for Amharic
    if (lang === 'am') {
      document.body.classList.add('font-ethiopic')
    } else {
      document.body.classList.remove('font-ethiopic')
    }
  }, [lang])

  const changeLanguage = (code) => {
    if (translations[code]) setLang(code)
  }

  return (
    <LanguageContext.Provider value={{ lang, t, changeLanguage, LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
