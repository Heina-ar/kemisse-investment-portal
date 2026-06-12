import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sprout, Factory, ShoppingCart, Landmark } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const SECTORS = [
  {
    key: 'agriculture',
    icon: Sprout,
    img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80',
    color: 'bg-secondary',
    desc: {
      am: 'ለም መሬት እና ምቹ የአየር ሁኔታ ያለው ከሚሴ ለግብርና ኢንቨስትመንት አስተማማኝ ቦታ ነው።',
      en: 'Kemisse with fertile land and favorable climate is an ideal location for agricultural investment.',
      om: 'Qammiis lafa beelayyaa fi haala qilleensaa mijataatiin invastimantii qonnaa bakka gaariidha.',
    },
  },
  {
    key: 'manufacturing',
    icon: Factory,
    img: 'https://images.unsplash.com/photo-1565108401767-8e531b9bbb4d?w=600&q=80',
    color: 'bg-primary',
    desc: {
      am: 'ለፋብሪካዎች እና ማምረቻ ኢንዱስትሪዎች ምቹ ሁኔታዎች እና ድጋፍ እናቀርባለን።',
      en: 'We offer favorable conditions and support for factories and manufacturing industries.',
      om: 'Faabrikalee fi industirii moomichaa haala mijeessaa fi deeggarsa ni dhiheessina.',
    },
  },
  {
    key: 'trade',
    icon: ShoppingCart,
    img: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80',
    color: 'bg-accent',
    desc: {
      am: 'ዋና የንግድ መስቀለኛ መንገድ ሆኖ ከሚሴ ለንግድ ኢንቨስትመንት እጅግ ጥሩ አቋም አለው።',
      en: 'As a major trade crossroads, Kemisse has an excellent position for trade investment.',
      om: 'Karaa daldala guddaa ta\'uudhaan, Qammiis invastimantii daldalaa bakka gaariidha.',
    },
  },
  {
    key: 'tourism',
    icon: Landmark,
    img: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&q=80',
    color: 'bg-secondary',
    desc: {
      am: 'ቱሪዝምን ለማስፋፋት ዕምቅ ሀብቶች ያሏቸው ቦታዎች በከሚሴ ዙሪያ ይገኛሉ።',
      en: 'Potential tourism resources are found around Kemisse to develop tourism.',
      om: 'Qabeenyi turistii guddisuuf dandeessisan naannoo Qammiis ni argamu.',
    },
  },
]

export default function InvestmentSection() {
  const { t, lang } = useLanguage()

  return (
    <section className="py-16 bg-white">
      <div className="container-gov">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="section-divider" />
            <h2 className={`section-title ${lang === 'am' ? 'font-ethiopic' : ''}`}>
              {t.investment.title}
            </h2>
            <p className={`section-subtitle ${lang === 'am' ? 'font-ethiopic' : ''}`}>
              {t.investment.subtitle}
            </p>
          </div>
          <Link to="/investment" className="btn-outline btn-sm flex-shrink-0">
            {t.common.viewAll}
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SECTORS.map((sector) => {
            const Icon = sector.icon
            return (
              <div key={sector.key} className="card group overflow-hidden">
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={sector.img}
                    alt={t.investment.sectors[sector.key]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {/* Icon badge */}
                  <div className={`absolute top-3 right-3 w-9 h-9 rounded-lg ${sector.color} 
                    flex items-center justify-center shadow-lg`}>
                    <Icon size={18} className="text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className={`font-bold text-gov-text mb-2
                    ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                    {t.investment.sectors[sector.key]}
                  </h3>
                  <p className={`text-gray-500 text-sm leading-relaxed mb-4
                    ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                    {sector.desc[lang]}
                  </p>
                  <Link
                    to="/investment"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary
                      hover:gap-2.5 transition-all"
                  >
                    {t.investment.readMore}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-primary to-primary-700 p-8 text-white
          flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className={`text-xl font-bold mb-1 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
              {lang === 'am' ? 'ዛሬ ኢንቨስት ያድርጉ!'
               : lang === 'om' ? 'Har\'a Invastii Godha!'
               : 'Invest in Kemisse Today!'}
            </h3>
            <p className={`text-white/80 text-sm ${lang === 'am' ? 'font-ethiopic' : ''}`}>
              {lang === 'am' ? 'ለኢንቨስትመንት ፈቃድ እና ድጋፍ ያግኙን'
               : lang === 'om' ? 'Hayyama invastimantii fi deeggarsa argachuuf nu qunnamaa'
               : 'Contact us for investment license and support'}
            </p>
          </div>
          <Link to="/contact" className="btn-accent flex-shrink-0">
            {lang === 'am' ? 'አሁን ያግኙን' : lang === 'om' ? 'Amma Nu Qunnamaa' : 'Contact Now'}
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  )
}
