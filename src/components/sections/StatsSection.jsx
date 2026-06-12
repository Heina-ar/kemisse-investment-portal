import React, { useState, useEffect, useRef } from 'react'
import { Users, Building2, TrendingUp, FileText } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const STATS = [
  { icon: Users,      value: 12,  suffix: '+', labelKey: 'employees',    color: 'text-primary',   bg: 'bg-primary-50' },
  { icon: Building2,  value: 6,   suffix: '',  labelKey: 'departments',  color: 'text-secondary', bg: 'bg-secondary-50' },
  { icon: TrendingUp, value: 25,  suffix: '+', labelKey: 'opportunities',color: 'text-accent-600',bg: 'bg-accent-50' },
  { icon: FileText,   value: 100, suffix: '+', labelKey: 'documents',    color: 'text-primary',   bg: 'bg-primary-50' },
]

function useCounter(target, duration = 2000, started = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, started])

  return count
}

function StatCard({ icon: Icon, value, suffix, labelKey, color, bg }) {
  const { t, lang } = useLanguage()
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const count = useCounter(value, 2000, visible)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="stat-card group hover:shadow-gov-lg hover:-translate-y-1 transition-all duration-300">
      <div className={`w-16 h-16 rounded-2xl ${bg} flex items-center justify-center mx-auto mb-4
        group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={32} className={color} />
      </div>
      <div className={`text-4xl font-bold mb-1 ${color}`}>
        {count}{suffix}
      </div>
      <p className={`text-gray-500 font-medium text-sm ${lang === 'am' ? 'font-ethiopic' : ''}`}>
        {t.stats[labelKey]}
      </p>
    </div>
  )
}

export default function StatsSection() {
  const { lang } = useLanguage()

  return (
    <section className="py-16 bg-gov-bg">
      <div className="container-gov">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="section-divider mx-auto" />
          <h2 className={`section-title ${lang === 'am' ? 'font-ethiopic' : ''}`}>
            {lang === 'am' ? 'ጽ/ቤታችን በቁጥር'
             : lang === 'om' ? 'Biiroo Keenya Lakkoobsaan'
             : 'Our Office in Numbers'}
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map(stat => (
            <StatCard key={stat.labelKey} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
