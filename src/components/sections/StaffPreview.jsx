import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, ArrowRight, User } from 'lucide-react'
import { supabase, TABLES } from '../../lib/supabase'
import { useLanguage } from '../../contexts/LanguageContext'

const FALLBACK_STAFF = [
  { id: 1, name: 'አቶ አብዲ ሙሐመድ',      name_en: 'Mr. Abdi Mohammed',    position_am: 'የጽ/ቤቱ ኃላፊ',           position_en: 'Office Head',               dept_am: 'አስተዳደር',             dept_en: 'Administration',   photo: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 2, name: 'ወ/ሮ ሰናይት ተሰፋዬ',    name_en: 'Ms. Senait Tesfaye',   position_am: 'ምክትል ኃላፊ',             position_en: 'Deputy Head',              dept_am: 'አስተዳደር',             dept_en: 'Administration',   photo: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 3, name: 'አቶ ካሌብ ኃይሉ',       name_en: 'Mr. Kaleb Hailu',      position_am: 'የኢንቨስትመንት ባለሙያ',      position_en: 'Investment Expert',        dept_am: 'ኢንቨስትመንት',          dept_en: 'Investment',       photo: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { id: 4, name: 'ወ/ሮ ሄለን ዳዊት',      name_en: 'Ms. Helen Dawit',      position_am: 'የኢንዱስትሪ ባለሙያ',        position_en: 'Industry Expert',          dept_am: 'ኢንዱስትሪ',            dept_en: 'Industry',         photo: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: 5, name: 'አቶ ሙሉጌታ አስፋው',    name_en: 'Mr. Mulugeta Asfaw',   position_am: 'ፋይናንስ ባለሙያ',          position_en: 'Finance Expert',           dept_am: 'ፋይናንስ',             dept_en: 'Finance',          photo: 'https://randomuser.me/api/portraits/men/55.jpg' },
  { id: 6, name: 'አቶ ዳዊት ታደሰ',      name_en: 'Mr. Dawit Tadesse',    position_am: 'ዕቅድ ባለሙያ',            position_en: 'Planning Expert',          dept_am: 'ዕቅድ እና ክትትል',       dept_en: 'Planning',         photo: 'https://randomuser.me/api/portraits/men/22.jpg' },
]

export default function StaffPreview() {
  const { t, lang } = useLanguage()
  const [staff, setStaff] = useState(FALLBACK_STAFF)

  useEffect(() => {
    async function fetchStaff() {
      try {
        const { data } = await supabase
          .from(TABLES.EMPLOYEES)
          .select('*')
          .eq('status', 'active')
          .order('display_order', { ascending: true })
          .limit(6)
        if (data?.length) setStaff(data)
      } catch { /* use fallback */ }
    }
    fetchStaff()
  }, [])

  return (
    <section className="py-16 bg-white">
      <div className="container-gov">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="section-divider" />
            <h2 className={`section-title ${lang === 'am' ? 'font-ethiopic' : ''}`}>
              {t.staff.title}
            </h2>
            <p className={`section-subtitle ${lang === 'am' ? 'font-ethiopic' : ''}`}>
              {t.staff.subtitle}
            </p>
          </div>
          <Link to="/staff" className="btn-outline btn-sm flex-shrink-0">
            {t.staff.viewAll}
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {staff.map((member) => {
            const name     = lang === 'am' ? (member.name || member.name_am)     : (member.name_en || member.name)
            const position = lang === 'am' ? (member.position_am || member.position) : (member.position_en || member.position)
            const dept     = lang === 'am' ? (member.dept_am || member.department)   : (member.dept_en || member.department)

            return (
              <Link
                key={member.id}
                to={`/staff/${member.id}`}
                className="card group text-center p-4 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Photo */}
                <div className="relative w-20 h-20 mx-auto mb-3">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={name}
                      className="w-full h-full rounded-full object-cover border-2 border-primary-100
                        group-hover:border-primary transition-colors"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-primary-50 flex items-center justify-center
                      border-2 border-primary-100 group-hover:border-primary transition-colors">
                      <User size={28} className="text-primary-300" />
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-secondary
                    border-2 border-white" />
                </div>

                <h4 className={`font-semibold text-gov-text text-xs leading-snug mb-0.5 line-clamp-2
                  ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                  {name}
                </h4>
                <p className={`text-primary text-xs mb-0.5 line-clamp-1
                  ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                  {position}
                </p>
                <p className={`text-gray-400 text-xs line-clamp-1
                  ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                  {dept}
                </p>
              </Link>
            )
          })}
        </div>

      </div>
    </section>
  )
}
