import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, Factory, Wallet, Users, BarChart3, ShoppingBag } from 'lucide-react'
import PageBanner from '../components/ui/PageBanner'
import { useLanguage } from '../contexts/LanguageContext'
import { supabase, TABLES } from '../lib/supabase'

const ICON_MAP = {
  'investment-promotion': TrendingUp,
  'industry-development': Factory,
  'finance': Wallet,
  'human-resource': Users,
  'planning-monitoring': BarChart3,
  'trade': ShoppingBag,
}

const FALLBACK = [
  { id:1, slug:'investment-promotion', icon:'TrendingUp', color:'text-primary',    bg:'bg-primary-50',   border:'border-primary/15',
    name:{am:'የኢንቨስትመንት ፕሮሞሽን',en:'Investment Promotion',om:'Babal\'ina Invastimantii'},
    desc:{am:'ሀገር ውስጥ እና ውጭ ሀገር ኢንቨስተሮችን ወደ ከሚሴ ለመሳብ የሚሰራ ክፍል',en:'Department working to attract domestic and foreign investors to Kemisse',om:'Invastara biyya keessaa fi alaa Qammiis filataniif hojjatu'} },
  { id:2, slug:'industry-development', icon:'Factory',    color:'text-secondary',  bg:'bg-secondary-50', border:'border-secondary/15',
    name:{am:'የኢንዱስትሪ ልማት',en:'Industry Development',om:'Guddina Industirii'},
    desc:{am:'የኢንዱስትሪ ዕድገትን ለማምጣት እና አዳዲስ ኢንዱስትሪዎችን ለማቋቋም',en:'Works to bring industrial growth and establish new industries',om:'Guddina industirii fiduu fi industirii haaraa hundeessuuf'} },
  { id:3, slug:'finance',              icon:'Wallet',     color:'text-accent-600',  bg:'bg-accent-50',    border:'border-accent/15',
    name:{am:'ፋይናንስ',en:'Finance',om:'Faayinaansii'},
    desc:{am:'የጽ/ቤቱን የፋይናንስ አስተዳደር እና ሂሳብ ስራዎችን ያስተዳድራል',en:'Manages financial administration and accounting operations',om:'To\'annoo faayinaansii fi hojii herreega biiroo bulcha'} },
  { id:4, slug:'human-resource',       icon:'Users',      color:'text-primary',    bg:'bg-primary-50',   border:'border-primary/15',
    name:{am:'ሰው ኃይል',en:'Human Resource',om:'Humna Namaa'},
    desc:{am:'ሠራተኞችን ማስተዳደር፣ ማሰልጠን እና ማበረታታት',en:'Managing, training and motivating employees',om:'Hojjettoota bulchuu, leenjisuu fi jajjabeessuu'} },
  { id:5, slug:'planning-monitoring',  icon:'BarChart3',  color:'text-secondary',  bg:'bg-secondary-50', border:'border-secondary/15',
    name:{am:'ዕቅድ እና ክትትል',en:'Planning & Monitoring',om:'Karoora fi Hordoffii'},
    desc:{am:'የጽ/ቤቱን ዕቅዶች መቅረጽ፣ ተግባራዊ ማድረግ እና ክትትል',en:'Formulates, implements and monitors office plans',om:'Karoora biiroo baasa, hojiirra oolcha fi hordofii godha'} },
  { id:6, slug:'trade',                icon:'ShoppingBag',color:'text-accent-600', bg:'bg-accent-50',    border:'border-accent/15',
    name:{am:'ንግድ',en:'Trade',om:'Daldalaa'},
    desc:{am:'የንግድ ፈቃዶችን ማስተዳደር እና ትክክለኛ ንግድ እንዲካሄድ',en:'Manages trade licenses and supports fair business',om:'Hayyama daldalaaa bulcha fi daldala sirrii gargaara'} },
]

export default function DepartmentsPage() {
  const { t, lang } = useLanguage()
  const [depts, setDepts] = useState(FALLBACK)

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase.from(TABLES.DEPARTMENTS).select('*').eq('status','active').order('display_order')
        if (data?.length) setDepts(data)
      } catch {}
    }
    load()
  }, [])

  return (
    <div>
      <PageBanner
        title={t.departments.title}
        subtitle={t.departments.subtitle}
        breadcrumbs={[{ label: t.nav.departments }]}
        bgImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
      />

      <section className="py-16 bg-gov-bg">
        <div className="container-gov">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {depts.map((dept) => {
              const Icon = ICON_MAP[dept.slug] || TrendingUp
              const name = dept.name?.[lang] || dept[`name_${lang}`] || dept.name_en
              const desc = dept.desc?.[lang] || dept[`description_${lang}`] || dept.description_en
              return (
                <div key={dept.id} className={`card-gov p-6 border ${dept.border || 'border-gray-100'} group`}>
                  <div className={`w-14 h-14 rounded-xl ${dept.bg || 'bg-primary-50'} flex items-center justify-center mb-5
                    group-hover:scale-110 transition-transform`}>
                    <Icon size={26} className={dept.color || 'text-primary'} />
                  </div>
                  <h3 className={`font-bold text-gov-text text-lg mb-3 ${lang === 'am' ? 'font-ethiopic' : ''}`}>{name}</h3>
                  <p className={`text-gray-500 text-sm leading-relaxed mb-6 ${lang === 'am' ? 'font-ethiopic' : ''}`}>{desc}</p>
                  <Link to={`/departments/${dept.slug || dept.id}`}
                    className={`inline-flex items-center gap-2 text-sm font-semibold ${dept.color || 'text-primary'} hover:gap-3 transition-all`}>
                    {t.departments.viewDept} <ArrowRight size={14} />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
