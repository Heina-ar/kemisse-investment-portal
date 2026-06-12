import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sprout, Factory, ShoppingCart, Landmark, CheckCircle2, Download, Phone } from 'lucide-react'
import PageBanner from '../components/ui/PageBanner'
import { useLanguage } from '../contexts/LanguageContext'

const SECTORS = [
  { key:'agriculture', icon:Sprout, color:'bg-secondary', img:'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80',
    why:{ am:['ለም አፈር','ምቹ አየር ሁኔታ','ዘመናዊ መስኖ ስርዓት','የግብርና ባለሙያ ድጋፍ'], en:['Fertile soil','Favorable climate','Modern irrigation','Agricultural expert support'], om:["Lafa beelayyaa","Haala qilleensaa mijataa","Jallisii ammayyaa","Deeggarsa ogeessa qonnaa"] } },
  { key:'manufacturing', icon:Factory, color:'bg-primary', img:'https://images.unsplash.com/photo-1565108401767-8e531b9bbb4d?w=800&q=80',
    why:{ am:['ርካሽ ሰው ኃይል','ኃይል ማቅረቢያ','ምቹ ቦታ','የጥሬ ዕቃ ቅርበት'], en:['Affordable labor','Power supply','Strategic location','Raw material proximity'], om:["Humna namaa gatii gadi'aa","Dhiyaatinsa humna ibsaa","Bakka mijataa","Dhiyaatinsa qabeenya hiyyaas"] } },
  { key:'trade', icon:ShoppingCart, color:'bg-accent', img:'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80',
    why:{ am:['ዋና መስቀለኛ መንገድ','ትልቅ ገበያ','ሕጋዊ ድጋፍ','ምቹ ሥነ-ምህዳር'], en:['Major crossroads','Large market','Legal support','Favorable ecosystem'], om:["Karaa guddaa","Gabaa bal'aa","Deeggarsa seeraa","Haala mijataa"] } },
  { key:'tourism', icon:Landmark, color:'bg-secondary', img:'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80',
    why:{ am:['ታሪካዊ ቦታዎች','ተፈጥሮ ሀብት','ሆቴሎች','ቱሪዝም ፕሮሞሽን'], en:['Historical sites','Natural resources','Hotels','Tourism promotion'], om:["Bakkoota seenaa","Qabeenya uumamaa","Hootelota","Beeksisa turistii"] } },
]

const PROCEDURES = {
  am: ['የኢንቨስትመንት ማመልከቻ ቅጽ ሙሉ','ለጽ/ቤቱ ቅጹን ያስገቡ','ግምገማ ያካሂዱ (5-7 ቀናት)','ፈቃዱ ይሰጣል','ኦፕሬሽን ይጀምሩ'],
  en: ['Complete investment application form','Submit form to the office','Evaluation conducted (5-7 days)','License issued','Start operations'],
  om: ["Foomii iyyannoo invastimantii guutuu","Foomii biiroof dhiheessuu","Madaallii gaggeessuu (guyyaa 5-7)","Hayyamni kennama","Hojii jalqabuu"],
}

export default function InvestmentPage() {
  const { t, lang } = useLanguage()

  return (
    <div>
      <PageBanner title={t.investment.title} subtitle={t.investment.subtitle}
        breadcrumbs={[{ label: t.nav.investment }]}
        bgImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80" />

      {/* Sectors */}
      <section className="py-16 bg-white">
        <div className="container-gov">
          <div className="text-center mb-12">
            <div className="section-divider mx-auto" />
            <h2 className={`section-title ${lang==='am'?'font-ethiopic':''}`}>
              {lang==='am'?'የኢንቨስትመንት ዘርፎች':lang==='om'?"Dameelee Invastimantii":'Investment Sectors'}
            </h2>
          </div>
          <div className="space-y-12">
            {SECTORS.map((s, i) => {
              const Icon = s.icon
              const even = i % 2 === 0
              return (
                <div key={s.key} className={`grid lg:grid-cols-2 gap-10 items-center ${even?'':'lg:flex-row-reverse'}`}>
                  <div className={even?'order-1':'order-1 lg:order-2'}>
                    <div className="relative rounded-2xl overflow-hidden shadow-gov-lg h-72">
                      <img src={s.img} alt={t.investment.sectors[s.key]} className="w-full h-full object-cover" />
                      <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl ${s.color} flex items-center justify-center`}>
                        <Icon size={22} className="text-white" />
                      </div>
                    </div>
                  </div>
                  <div className={even?'order-2':'order-2 lg:order-1'}>
                    <div className="section-divider" />
                    <h3 className={`text-2xl font-bold text-gov-text mb-4 ${lang==='am'?'font-ethiopic':''}`}>
                      {t.investment.sectors[s.key]}
                    </h3>
                    <ul className="space-y-3 mb-6">
                      {s.why[lang].map((w, j) => (
                        <li key={j} className="flex items-center gap-3">
                          <CheckCircle2 size={18} className="text-secondary flex-shrink-0" />
                          <span className={`text-gray-600 ${lang==='am'?'font-ethiopic':''}`}>{w}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact" className="btn-primary btn-sm">
                      {lang==='am'?'ተጨማሪ ይወቁ':'Learn More'} <ArrowRight size={14}/>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Procedures */}
      <section className="py-16 bg-gov-bg">
        <div className="container-gov">
          <div className="text-center mb-12">
            <div className="section-divider mx-auto" />
            <h2 className={`section-title ${lang==='am'?'font-ethiopic':''}`}>
              {lang==='am'?'የኢንቨስትመንት ሂደት':lang==='om'?'Tartiiba Invastimantii':'Investment Procedure'}
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {PROCEDURES[lang].map((step, i) => (
              <div key={i} className="flex gap-5 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm">{i+1}</div>
                <div className="flex-1 card p-4 flex items-center">
                  <p className={`text-gray-700 font-medium ${lang==='am'?'font-ethiopic':''}`}>{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container-gov text-center">
          <h2 className={`text-3xl font-bold mb-3 ${lang==='am'?'font-ethiopic':''}`}>
            {lang==='am'?'ዛሬ ይጀምሩ!':lang==='om'?'Har\'a Jalqabaa!':'Start Today!'}
          </h2>
          <p className={`text-white/75 mb-8 ${lang==='am'?'font-ethiopic':''}`}>
            {lang==='am'?'ለኢንቨስትመንት ፈቃድ እና ድጋፍ ያግኙን':'Contact us for investment license and support'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-accent"><Phone size={16}/>{lang==='am'?'አሁን ያግኙን':'Contact Now'}</Link>
            <Link to="/documents" className="btn-outline border-white text-white hover:bg-white hover:text-primary"><Download size={16}/>{lang==='am'?'ቅጹን አውርዱ':'Download Form'}</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
