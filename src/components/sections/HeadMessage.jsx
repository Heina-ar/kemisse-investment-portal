import React from 'react'
import { Link } from 'react-router-dom'
import { Quote, ArrowRight, User } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const MESSAGE = {
  am: `የከሚሴ ከተማ አስተዳደር ኢንዱስትሪና ኢንቨስትመንት ጽ/ቤት ድህረ ገጽ እንኳን ደህና መጡ። ጽ/ቤታችን ኢንቨስትመንትን ለማስፋፋት፣ ኢንዱስትሪያዊ ልማትን ለማረጋገጥ እና ለዜጎቻችን ጥራት ያለው አገልግሎት ለመስጠት ቁርጠኛ ነው። ፈጣን ኢኮኖሚያዊ ዕድገትን ለማሳካት አብረን እንሰራ።`,
  en: `Welcome to the official website of Kemisse Town Administration Industry and Investment Office. Our office is committed to expanding investment, ensuring industrial development, and providing quality services to our citizens. Together, let us work towards achieving rapid economic growth.`,
  om: `Gara weebsaayitii Biiroo Industirii fi Invastimantii Bulchiinsa Magaalaa Qammiis baga nagaan dhuftan. Biiroon keenya invastimantii babal'isuu, guddina industirii mirkaneessuu fi lammiileef tajaajila qulqullina qabu kennuuf kutannoon hojjata.`,
}

export default function HeadMessage() {
  const { t, lang } = useLanguage()

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container-gov">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Image side */}
          <div className="relative">
            {/* Decorative background */}
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary-50 rounded-3xl -z-10" />
            <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-accent-50 rounded-3xl -z-10" />

            <div className="relative rounded-2xl overflow-hidden shadow-gov-lg aspect-[4/5] max-w-sm mx-auto lg:mx-0 bg-gray-100 flex items-center justify-center">
  <User size={80} className="text-gray-400" />
</div>

          {/* Message side */}
          <div>
            <div className="section-divider" />
            <h2 className={`section-title mb-6 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
              {t.headMessage.title}
            </h2>

            {/* Large quote icon */}
            <Quote size={48} className="text-primary-100 mb-4" />

            <p className={`text-gray-600 leading-relaxed text-base mb-4
              ${lang === 'am' ? 'font-ethiopic text-lg' : ''}`}>
              {MESSAGE[lang]}
            </p>

            {/* Signature */}
            <div className="flex items-center gap-4 py-5 border-t border-gray-100 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                {lang === 'am' ? 'ኃ' : 'H'}
              </div>
              <div>
                <p className={`font-bold text-gov-text ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                  {lang === 'am' ? 'አቶ/ወ/ሮ [ስም]' : lang === 'om' ? 'Obbo/Aaddee [Maqaa]' : 'Mr./Ms. [Name]'}
                </p>
                <p className="text-secondary text-sm font-medium">
                  {lang === 'am' ? 'የጽ/ቤቱ ኃላፊ - ከሚሴ ከተማ' : lang === 'om' ? 'Hogganaa Biiroo' : 'Office Head - Kemisse Town'}
                </p>
              </div>
            </div>

            <Link to="/about" className="btn-primary">
              {t.headMessage.readMore}
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
