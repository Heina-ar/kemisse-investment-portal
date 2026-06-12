import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Briefcase, User, ArrowLeft, CheckCircle2, Building2 } from 'lucide-react'
import PageBanner from '../components/ui/PageBanner'
import { useLanguage } from '../contexts/LanguageContext'
import { supabase, TABLES } from '../lib/supabase'

const FALLBACK = {
  1: { id:1, name:'አቶ አብዲ ሙሐመድ', name_en:'Mr. Abdi Mohammed', position_am:'የጽ/ቤቱ ኃላፊ', position_en:'Office Head', dept_am:'አስተዳደር', dept_en:'Administration', dept_slug:'admin', phone:'+251033XXX001', email:'abdi@kemisseinvestment.gov.et', office:'001', photo:'https://randomuser.me/api/portraits/men/32.jpg',
    bio_am:'አቶ አብዲ ሙሐመድ ለዓመታት የኢንቨስትመንት ዘርፍ ተሞክሮ ያላቸው ከሚሴ ከተማ ምርጡ አስተዳዳሪ ናቸው። ኢኮኖሚያዊ ዕድገትን ለማምጣት ያላቸው ቁርጠኝነት ለጽ/ቤቱ ዕድገት ትልቅ አስተዋጽኦ አድርጓል።',
    bio_en:'Mr. Abdi Mohammed is an experienced administrator with years of experience in the investment sector. His commitment to bringing economic growth has made a great contribution to the development of the office.',
    responsibilities_am:['ጽ/ቤቱን ያስተዳድራሉ','ከሌሎች አካላት ጋር ትብብር ያደርጋሉ','ዓመታዊ ዕቅድ ይቀርጻሉ','ሠራተኞችን ያስተዳድራሉ'],
    responsibilities_en:['Administers the office','Cooperates with other bodies','Formulates annual plans','Manages employees'] },
}

export default function StaffProfile() {
  const { id } = useParams()
  const { t, lang } = useLanguage()
  const [member, setMember] = useState(FALLBACK[1])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase.from(TABLES.EMPLOYEES).select('*').eq('id', id).single()
        if (data) setMember(data)
        else if (FALLBACK[parseInt(id)]) setMember(FALLBACK[parseInt(id)])
      } catch {
        if (FALLBACK[parseInt(id)]) setMember(FALLBACK[parseInt(id)])
      } finally { setLoading(false) }
    }
    load()
  }, [id])

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"/></div>
  if (!member) return <div className="min-h-screen flex items-center justify-center text-gray-400">Staff not found</div>

  const name  = lang==='am' ? member.name  : (member.name_en  || member.name)
  const pos   = lang==='am' ? member.position_am : (member.position_en  || member.position)
  const dept  = lang==='am' ? member.dept_am     : (member.dept_en      || member.department)
  const bio   = lang==='am' ? member.bio_am      : (member.bio_en       || member.biography || '')
  const resps = lang==='am' ? (member.responsibilities_am || []) : (member.responsibilities_en || [])

  return (
    <div>
      <PageBanner
        title={name}
        subtitle={pos}
        breadcrumbs={[
          { label: t.nav.staff, to: '/staff' },
          { label: name },
        ]}
        bgImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80"
      />

      <section className="py-16 bg-gov-bg">
        <div className="container-gov">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Sidebar profile card */}
            <div className="space-y-5">
              <div className="card overflow-hidden">
                <div className="h-56 bg-primary-50 relative">
                  {member.photo
                    ? <img src={member.photo} alt={name} className="w-full h-full object-cover object-top" />
                    : <div className="w-full h-full flex items-center justify-center"><User size={64} className="text-primary-200"/></div>
                  }
                </div>
                <div className="p-5 text-center">
                  <h2 className={`font-bold text-gov-text text-lg mb-1 ${lang==='am'?'font-ethiopic':''}`}>{name}</h2>
                  <p className={`text-primary font-medium text-sm mb-0.5 ${lang==='am'?'font-ethiopic':''}`}>{pos}</p>
                  <p className={`text-gray-400 text-sm ${lang==='am'?'font-ethiopic':''}`}>{dept}</p>
                </div>
              </div>

              {/* Contact info */}
              <div className="card p-5 space-y-3">
                <h3 className={`font-bold text-gov-text text-sm border-b border-gray-100 pb-3 mb-3 ${lang==='am'?'font-ethiopic':''}`}>
                  {t.contact.title}
                </h3>
                {[
                  { icon: Phone,    label: t.contact.phone,  value: member.phone,  href: `tel:${member.phone}` },
                  { icon: Mail,     label: t.contact.email,  value: member.email,  href: `mailto:${member.email}` },
                  { icon: Building2,label: lang==='am'?'ቢሮ ቁጥር':lang==='om'?'Lakk. Biiroo':'Office No.', value: member.office || member.office_number, href: null },
                  { icon: MapPin,   label: t.contact.address,value: lang==='am'?'ከሚሴ ከተማ':'Kemisse Town', href: null },
                ].filter(i => i.value).map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon size={15} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className={`text-xs text-gray-400 ${lang==='am'?'font-ethiopic':''}`}>{label}</p>
                      {href
                        ? <a href={href} className={`text-sm text-gov-text hover:text-primary font-medium transition-colors ${lang==='am'?'font-ethiopic':''}`}>{value}</a>
                        : <p className={`text-sm text-gov-text font-medium ${lang==='am'?'font-ethiopic':''}`}>{value}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/staff" className="btn-outline w-full justify-center">
                <ArrowLeft size={15} />
                {lang==='am'?'ሁሉም ሠራተኞች':lang==='om'?'Hojjettoota Hunda':'All Staff'}
              </Link>
            </div>

            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Bio */}
              {bio && (
                <div className="card p-7">
                  <h3 className={`font-bold text-gov-text text-lg mb-4 flex items-center gap-2 ${lang==='am'?'font-ethiopic':''}`}>
                    <User size={20} className="text-primary" />
                    {lang==='am'?'ስለ ሠራተኛው':lang==='om'?'Waa\'ee Hojjettaa':'Biography'}
                  </h3>
                  <p className={`text-gray-600 leading-relaxed ${lang==='am'?'font-ethiopic':''}`}>{bio}</p>
                </div>
              )}

              {/* Dept */}
              <div className="card p-7">
                <h3 className={`font-bold text-gov-text text-lg mb-4 flex items-center gap-2 ${lang==='am'?'font-ethiopic':''}`}>
                  <Briefcase size={20} className="text-primary" />
                  {lang==='am'?'የሥራ መረጃ':lang==='om'?'Odeeffannoo Hojii':'Job Information'}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: lang==='am'?'ቦታ':lang==='om'?'Bakka':'Position', value: pos },
                    { label: lang==='am'?'ክፍል':lang==='om'?'Kutaa':'Department', value: dept },
                    { label: lang==='am'?'ቢሮ ቁጥር':'Office Number', value: member.office || member.office_number || 'N/A' },
                    { label: lang==='am'?'ሁኔታ':lang==='om'?'Haala':'Status', value: lang==='am'?'ንቁ':'Active' },
                  ].map(item => (
                    <div key={item.label} className="bg-gov-bg rounded-xl p-4">
                      <p className={`text-xs text-gray-400 mb-1 ${lang==='am'?'font-ethiopic':''}`}>{item.label}</p>
                      <p className={`font-semibold text-gov-text text-sm ${lang==='am'?'font-ethiopic':''}`}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Responsibilities */}
              {resps.length > 0 && (
                <div className="card p-7">
                  <h3 className={`font-bold text-gov-text text-lg mb-4 flex items-center gap-2 ${lang==='am'?'font-ethiopic':''}`}>
                    <CheckCircle2 size={20} className="text-secondary" />
                    {lang==='am'?'ኃላፊነቶች':'Responsibilities'}
                  </h3>
                  <ul className="space-y-3">
                    {resps.map((r, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-secondary flex-shrink-0 mt-0.5" />
                        <span className={`text-gray-600 text-sm ${lang==='am'?'font-ethiopic':''}`}>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
