import React from 'react'
import { Link } from 'react-router-dom'
import {
  TrendingUp, Factory, Wallet, Users, BarChart3, ShoppingBag, ArrowRight
} from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const DEPT_DATA = [
  {
    id: 1,
    icon: TrendingUp,
    slug: 'investment-promotion',
    color: 'text-primary',
    bg: 'bg-primary-50',
    border: 'border-primary/15',
    desc: {
      am: 'ሀገር ውስጥ እና ውጭ ሀገር ኢንቨስተሮችን ወደ ከሚሴ ለመሳብ የሚሰራ ክፍል',
      en: 'Department working to attract domestic and foreign investors to Kemisse',
      om: 'Invastara biyya keessaa fi alaa Qammiis akka filataniif hojjatu',
    },
  },
  {
    id: 2,
    icon: Factory,
    slug: 'industry-development',
    color: 'text-secondary',
    bg: 'bg-secondary-50',
    border: 'border-secondary/15',
    desc: {
      am: 'የኢንዱስትሪ ዕድገትን ለማምጣት እና አዳዲስ ኢንዱስትሪዎችን ለማቋቋም የሚሰራ',
      en: 'Works to bring industrial growth and establish new industries',
      om: 'Guddina industirii fiduu fi industirii haaraa hundeessuuf hojjata',
    },
  },
  {
    id: 3,
    icon: Wallet,
    slug: 'finance',
    color: 'text-accent-600',
    bg: 'bg-accent-50',
    border: 'border-accent/15',
    desc: {
      am: 'የጽ/ቤቱን የፋይናንስ አስተዳደር እና ሂሳብ ስራዎችን የሚሰራ ክፍል',
      en: 'Department managing financial administration and accounting operations',
      om: 'To\'annoo faayinaansii fi hojii herreega biiroo bulcha',
    },
  },
  {
    id: 4,
    icon: Users,
    slug: 'human-resource',
    color: 'text-primary',
    bg: 'bg-primary-50',
    border: 'border-primary/15',
    desc: {
      am: 'ሠራተኞችን ማስተዳደር፣ ማሰልጠን እና ማበረታታት ዋና ተልዕኮው ነው',
      en: 'Main mission is to manage, train and motivate employees',
      om: 'Ergama guddaan hojjettoota bulchuu, leenjisuu fi jajjabeessuu dha',
    },
  },
  {
    id: 5,
    icon: BarChart3,
    slug: 'planning-monitoring',
    color: 'text-secondary',
    bg: 'bg-secondary-50',
    border: 'border-secondary/15',
    desc: {
      am: 'የጽ/ቤቱን ዕቅዶች መቅረጽ፣ ተግባራዊ ማድረግ እና ክትትል ያደርጋል',
      en: 'Formulates, implements and monitors office plans and programs',
      om: 'Karoora biiroo baasa, hojiirra oolcha fi hordofii godha',
    },
  },
  {
    id: 6,
    icon: ShoppingBag,
    slug: 'trade',
    color: 'text-accent-600',
    bg: 'bg-accent-50',
    border: 'border-accent/15',
    desc: {
      am: 'የንግድ ፈቃዶችን ማስተዳደር እና ትክክለኛ ንግድ እንዲካሄድ ይደግፋል',
      en: 'Manages trade licenses and supports fair business practices',
      om: 'Hayyama daldalaaa bulcha fi daldala sirrii akka raawwatamu gargaara',
    },
  },
]

export default function DepartmentsSection() {
  const { t, lang } = useLanguage()

  const deptNames = [
    t.departments.list.investment,
    t.departments.list.industry,
    t.departments.list.finance,
    t.departments.list.hr,
    t.departments.list.planning,
    t.departments.list.trade,
  ]

  return (
    <section className="py-16 bg-gov-bg">
      <div className="container-gov">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="section-divider" />
            <h2 className={`section-title ${lang === 'am' ? 'font-ethiopic' : ''}`}>
              {t.departments.title}
            </h2>
            <p className={`section-subtitle ${lang === 'am' ? 'font-ethiopic' : ''}`}>
              {t.departments.subtitle}
            </p>
          </div>
          <Link to="/departments" className="btn-outline btn-sm flex-shrink-0">
            {t.common.viewAll}
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEPT_DATA.map((dept, i) => {
            const Icon = dept.icon
            return (
              <div
                key={dept.id}
                className={`card-gov p-6 border ${dept.border} group`}
              >
                <div className={`w-12 h-12 rounded-xl ${dept.bg} flex items-center justify-center mb-4
                  group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} className={dept.color} />
                </div>

                <h3 className={`font-bold text-gov-text mb-2 text-base
                  ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                  {deptNames[i]}
                </h3>

                <p className={`text-gray-500 text-sm leading-relaxed mb-5
                  ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                  {dept.desc[lang]}
                </p>

                <Link
                  to={`/departments/${dept.slug}`}
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold
                    ${dept.color} hover:gap-2.5 transition-all`}
                >
                  {t.departments.viewDept}
                  <ArrowRight size={14} />
                </Link>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
