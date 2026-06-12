import React, { useState } from 'react'
import PageBanner from '../components/ui/PageBanner'
import { useLanguage } from '../contexts/LanguageContext'
import { Eye, Target, Heart, History, Award, Users, CheckCircle2, Quote } from 'lucide-react'

const CONTENT = {
  am: {
    profile: `የከሚሴ ከተማ አስተዳደር ኢንዱስትሪና ኢንቨስትመንት ጽ/ቤት ሀገር ውስጥ እና ከውጭ ሀገር ኢንቨስተሮችን ወደ ከሚሴ ከተማ ለመሳብ፣ ያሉ ኢንዱስትሪዎችን ለማደፍረስ እና አዳዲስ ኢንቨስትመንቶችን ለማስፋፋት ዓላማ ይሰራል። ጽ/ቤቱ ለዜጎች ወቅታዊ፣ ቀልጣፋ እና ጥራት ያለው አገልግሎት ለመስጠት ቁርጠኛ ነው።`,
    history: `ጽ/ቤቱ ከሚሴ ከተማ ከፍ ባለ ደረጃ ኢኮኖሚያዊ ዕድገት ለማምጣት ሲባል ተቋቁሟል። ባለፉት ዓመታት ኢንቨስትመንትን ለማስፋፋት፣ ዜጎችን ለማስጠቀም እና ሀብቱን ለአካባቢ ልማት ለመጠቀም ብዙ ስኬቶችን አስመዝግቧል።`,
    vision: 'ሁሉን አቀፍ ኢኮኖሚያዊ ዕድገትን በሚያረጋግጥ ተወዳዳሪ የኢንቨስትመንት መዳረሻ ሆኖ ከሚሴ ከተማ እንዲታወቅ ማድረግ።',
    mission: 'ለኢንቨስተሮች ምቹ ሁኔታ ፈጥሮ ኢንቨስትመንትን ማስፋፋት፣ ኢንዱስትሪያዊ ልማትን ማረጋገጥ እና ዜጎችን ጥራት ባለው አገልግሎት ማስጠቀም።',
    values: ['ሐቀኝነት', 'ግልጽነት', 'ቀልጣፋ አሰራር', 'ፈጠራ', 'ዜጎችን ማስቀደም', 'ተጠያቂነት'],
    leaderMsg: `ወደ ጽ/ቤታችን ድህረ-ገጽ እንኳን ደህና መጡ። ከሚሴ ከተማ ለኢንቨስትመንት ሰፊ ዕድሎች ያሉ ቦታ ነው። ለም መሬት፣ ውኃ ሀብት፣ ሰው ኃይል እና አስፈላጊ መሠረተ ልማቶች ካሉ ወደ ከሚሴ ልንወስዳችሁ ዝግጁ ነን። ከእኛ ጋር ልትሰሩ ትጋብዛላችሁ።`,
  },
  en: {
    profile: `The Kemisse Town Administration Industry and Investment Office works to attract domestic and foreign investors to Kemisse town, strengthen existing industries, and expand new investments. The office is committed to providing citizens with timely, efficient, and quality services.`,
    history: `The office was established to bring higher-level economic growth to Kemisse town. Over the years, it has recorded many achievements in expanding investment, benefiting citizens, and utilizing resources for local development.`,
    vision: 'To make Kemisse Town recognized as a competitive investment destination that ensures inclusive economic growth.',
    mission: 'To expand investment by creating a favorable environment for investors, ensure industrial development, and serve citizens with quality services.',
    values: ['Integrity', 'Transparency', 'Efficiency', 'Innovation', 'Citizen-First', 'Accountability'],
    leaderMsg: `Welcome to our office website. Kemisse Town is a place with wide opportunities for investment. We are ready to guide you to Kemisse, where there is fertile land, water resources, human resources, and necessary infrastructure. We invite you to work with us.`,
  },
  om: {
    profile: `Biiroo Industirii fi Invastimantii Bulchiinsa Magaalaa Qammiis invastara biyya keessaa fi alaa Qammiis akka filataniif, industirii jiran cimsuuf fi invastimantii haaraa babal'isuuf hojjata. Biiroon tajaajila yeroo isaa, si'ataa fi qulqullina qabu lammiilaaf kennuuf kutannoo qaba.`,
    history: `Biiroon kun guddina dinagdee sadarkaa olaanaa Magaalaa Qammiisiif fiduu akka danda'uuf hundaa'e. Waggoota darban keessatti invastimantii babal'isuuf, lammiileen bu'aa akka arganiif fi qabeenna guddina naannootiif oolchuuf milkiileen hedduu galmeeffameera.`,
    vision: 'Magaalaan Qammiis bakka invastimantii dorgomaa ta\'ee guddina dinagdee hammatamaaa mirkaneessu jedhamee beekamuu.',
    mission: 'Haala mijataa invastara uumuun invastimantii babal\'isuu, guddina industirii mirkaneessuu fi lammiilee tajaajila qulqullina qabun tajaajiluuf.',
    values: ['Dhugummaa', 'Iftoominaa', 'Si\'ataa', 'Haaromsa', 'Lammiilee Dursu', 'Itti Gaafatamummaa'],
    leaderMsg: `Gara weebsaayitii biiroo keenyaa baga nagaan dhuftan. Magaalaan Qammiis carraalee invastimantii bal\'aa qabdudha. Lafa beelayyaa, qabeenya bishaan, humna namaa fi bu'uuraalee misoomaa barbaachisoo wajjin isin dursiisuuf qophii dha. Nuun hojjechuuf isin afeerranna.`,
  },
}

const TABS = [
  { key: 'profile',  icon: Award,   label: { am: 'ስለ ጽ/ቤቱ',   en: 'Profile',     om: 'Waa\'ee Biiroo' } },
  { key: 'history',  icon: History, label: { am: 'ታሪክ',        en: 'History',     om: 'Seenaa' } },
  { key: 'vision',   icon: Eye,     label: { am: 'ራዕይ',        en: 'Vision',      om: 'Mul\'ata' } },
  { key: 'mission',  icon: Target,  label: { am: 'ተልዕኮ',       en: 'Mission',     om: 'Ergama' } },
  { key: 'values',   icon: Heart,   label: { am: 'እሴቶች',       en: 'Values',      om: 'Qabeenya' } },
  { key: 'leader',   icon: Users,   label: { am: 'የኃላፊ መልዕክት',en: 'Leadership',  om: 'Hoogganaa' } },
]

export default function AboutPage() {
  const { t, lang } = useLanguage()
  const [activeTab, setActiveTab] = useState('profile')
  const c = CONTENT[lang]

  return (
    <div>
      <PageBanner
        title={t.about.title}
        subtitle={lang === 'am' ? 'ስለ ጽ/ቤቱ ሁሉንም ይወቁ' : lang === 'om' ? 'Waa\'ee biiroo hunda baradhaa' : 'Learn everything about our office'}
        breadcrumbs={[{ label: t.nav.about }]}
        bgImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
      />

      <section className="py-16 bg-white">
        <div className="container-gov">

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-10 border-b border-gray-100 pb-4">
            {TABS.map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                  ${activeTab === key
                    ? 'bg-primary text-white shadow-gov'
                    : 'text-gray-500 hover:text-primary hover:bg-primary-50'
                  }`}
              >
                <Icon size={15} />
                <span className={lang === 'am' ? 'font-ethiopic' : ''}>{label[lang]}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl">

            {/* Profile */}
            {activeTab === 'profile' && (
              <div className="grid lg:grid-cols-2 gap-12 items-center animate-fade-in">
                <div>
                  <div className="section-divider" />
                  <h2 className={`section-title mb-4 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                    {lang === 'am' ? 'የጽ/ቤቱ መገለጫ' : lang === 'om' ? 'Ibsa Biiroo' : 'Office Profile'}
                  </h2>
                  <p className={`text-gray-600 leading-relaxed text-base ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                    {c.profile}
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    {[
                      { label: lang === 'am' ? 'ሠራተኞች' : 'Employees', value: '12+' },
                      { label: lang === 'am' ? 'ክፍሎች' : 'Departments', value: '6' },
                      { label: lang === 'am' ? 'ዕድሎች' : 'Opportunities', value: '25+' },
                      { label: lang === 'am' ? 'ሰነዶች' : 'Documents', value: '100+' },
                    ].map(item => (
                      <div key={item.label} className="bg-gov-bg rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-primary">{item.value}</p>
                        <p className={`text-gray-500 text-sm ${lang === 'am' ? 'font-ethiopic' : ''}`}>{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -top-3 -left-3 w-full h-full bg-primary-50 rounded-2xl" />
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
                    alt="Office Building"
                    className="relative rounded-2xl shadow-gov-lg object-cover w-full h-72"
                  />
                </div>
              </div>
            )}

            {/* History */}
            {activeTab === 'history' && (
              <div className="animate-fade-in">
                <div className="section-divider" />
                <h2 className={`section-title mb-6 ${lang === 'am' ? 'font-ethiopic' : ''}`}>{t.about.history}</h2>
                <p className={`text-gray-600 leading-relaxed text-base mb-8 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                  {c.history}
                </p>

                {/* Timeline */}
                <div className="space-y-6">
                  {[
                    { year: '2000', label: lang === 'am' ? 'ጽ/ቤቱ ተቋቁሟል' : 'Office Established' },
                    { year: '2005', label: lang === 'am' ? 'የኢንቨስትመንት ማበረታቻ መርሃ ግብር ጀምሯል' : 'Investment Incentive Program Launched' },
                    { year: '2010', label: lang === 'am' ? 'ከ10 ኢንቨስተሮች ጋር ሥምምነት ተፈረመ' : 'Agreement signed with 10+ investors' },
                    { year: '2020', label: lang === 'am' ? 'ዲጂታላይዜሽን ፕሮጀክት ተጀምሯል' : 'Digitalization project launched' },
                    { year: '2026', label: lang === 'am' ? 'አዲስ ድህረ ገጽ ተጀምሯል' : 'New portal website launched' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
                        {item.year}
                      </div>
                      <div className="flex-1 pt-3 border-b border-gray-100 pb-4">
                        <p className={`text-gov-text font-medium ${lang === 'am' ? 'font-ethiopic' : ''}`}>{item.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vision */}
            {activeTab === 'vision' && (
              <div className="animate-fade-in">
                <div className="section-divider" />
                <h2 className={`section-title mb-6 ${lang === 'am' ? 'font-ethiopic' : ''}`}>{t.about.vision}</h2>
                <div className="bg-gradient-to-br from-primary to-primary-700 rounded-2xl p-10 text-white text-center">
                  <Eye size={48} className="mx-auto mb-6 text-accent" />
                  <Quote size={32} className="mx-auto mb-4 text-white/30" />
                  <p className={`text-xl font-semibold leading-relaxed max-w-2xl mx-auto
                    ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                    {c.vision}
                  </p>
                </div>
              </div>
            )}

            {/* Mission */}
            {activeTab === 'mission' && (
              <div className="animate-fade-in">
                <div className="section-divider" />
                <h2 className={`section-title mb-6 ${lang === 'am' ? 'font-ethiopic' : ''}`}>{t.about.mission}</h2>
                <div className="bg-gradient-to-br from-secondary to-secondary-700 rounded-2xl p-10 text-white text-center">
                  <Target size={48} className="mx-auto mb-6 text-accent" />
                  <Quote size={32} className="mx-auto mb-4 text-white/30" />
                  <p className={`text-xl font-semibold leading-relaxed max-w-2xl mx-auto
                    ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                    {c.mission}
                  </p>
                </div>
              </div>
            )}

            {/* Values */}
            {activeTab === 'values' && (
              <div className="animate-fade-in">
                <div className="section-divider" />
                <h2 className={`section-title mb-6 ${lang === 'am' ? 'font-ethiopic' : ''}`}>{t.about.values}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {c.values.map((v, i) => (
                    <div key={i} className="card-gov p-5 flex items-center gap-3">
                      <CheckCircle2 size={22} className="text-secondary flex-shrink-0" />
                      <span className={`font-semibold text-gov-text ${lang === 'am' ? 'font-ethiopic' : ''}`}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Leadership */}
            {activeTab === 'leader' && (
              <div className="animate-fade-in grid lg:grid-cols-2 gap-10 items-center">
                <div className="relative">
                  <div className="absolute -bottom-3 -right-3 w-full h-full bg-accent-50 rounded-2xl" />
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80"
                    alt="Office Head"
                    className="relative rounded-2xl shadow-gov-lg w-full h-80 object-cover object-top"
                  />
                </div>
                <div>
                  <div className="section-divider" />
                  <h2 className={`section-title mb-4 ${lang === 'am' ? 'font-ethiopic' : ''}`}>{t.about.leadership}</h2>
                  <Quote size={36} className="text-primary-100 mb-3" />
                  <p className={`text-gray-600 leading-relaxed ${lang === 'am' ? 'font-ethiopic text-base' : ''}`}>
                    {c.leaderMsg}
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      {lang === 'am' ? 'ኃ' : 'H'}
                    </div>
                    <div>
                      <p className={`font-bold text-gov-text ${lang === 'am' ? 'font-ethiopic' : ''}`}>
                        {lang === 'am' ? 'አቶ/ወ/ሮ [ስም]' : 'Mr./Ms. [Name]'}
                      </p>
                      <p className="text-secondary text-sm">
                        {lang === 'am' ? 'የጽ/ቤቱ ኃላፊ' : 'Office Head'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>
    </div>
  )
}
