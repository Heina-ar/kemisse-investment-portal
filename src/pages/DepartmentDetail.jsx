import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Phone, Mail, User, ArrowLeft, CheckCircle2, TrendingUp, Factory, Wallet, Users, BarChart3, ShoppingBag } from 'lucide-react'
import PageBanner from '../components/ui/PageBanner'
import { useLanguage } from '../contexts/LanguageContext'
import { supabase, TABLES } from '../lib/supabase'

const DEPT_DETAILS = {
  'investment-promotion': {
    icon: TrendingUp,
    color: 'text-primary', bg: 'bg-primary-50',
    name: { am: 'የኢንቨስትመንት ፕሮሞሽን', en: 'Investment Promotion', om: "Babal'ina Invastimantii" },
    desc: { am: 'ሀገር ውስጥ እና ውጭ ሀገር ኢንቨስተሮችን ወደ ከሚሴ ለመሳብ፣ ያሉ ኢንቨስትመንቶችን ለማደፍረስ እና አዳዲስ ዕድሎችን ለማስተዋወቅ የሚሰራ ዋና ክፍል ነው።', en: 'The main department working to attract domestic and foreign investors to Kemisse, strengthen existing investments and promote new opportunities.', om: "Invastara biyya keessaa fi alaa Qammiis filataniif, invastimantii jiru cimsuuf fi carraalee haaraa babal'isuuf hojjatu." },
    responsibilities: {
      am: ['የኢንቨስትመንት ፕሮሞሽን ማስፋፋት','ለኢንቨስተሮች ድጋፍ እና ምክር ማቅረብ','የኢንቨስትመንት ፈቃድ ማስተዳደር','ከዓለምአቀፍ ድርጅቶች ጋር ትብብር','የኢንቨስትመንት ዕቅድ ማዘጋጀት'],
      en: ['Expand investment promotion','Provide support and advice to investors','Manage investment licenses','Cooperate with international organizations','Prepare investment plans'],
      om: ["Invastimantii babal'isuu","Invastara deeggarsa fi gorsa dhiheessuu","Hayyama invastimantii bulchuu","Dhaabbilee idil-addunyaa wajjin hojjachuu","Karoora invastimantii qopheessuu"],
    },
    phone: '+251 90000000', email: 'investment@kemisseinvestment.gov.et',
  },
  'industry-development': {
    icon: Factory,
    color: 'text-secondary', bg: 'bg-secondary-50',
    name: { am: 'የኢንዱስትሪ ልማት', en: 'Industry Development', om: 'Guddina Industirii' },
    desc: { am: 'ኢንዱስትሪያዊ ዕድገትን ለማምጣት፣ አዳዲስ ኢንዱስትሪዎችን ለማቋቋም እና ያሉ ኢንዱስትሪዎችን ለማጠናከር የሚሰራ ክፍል።', en: 'Department working to achieve industrial growth, establish new industries and strengthen existing ones.', om: 'Guddina industirii fiduu, industirii haaraa hundeessuu fi kan jiru cimsuuf hojjatu.' },
    responsibilities: {
      am: ['አዳዲስ ኢንዱስትሪዎችን ማቋቋም','ያሉ ኢንዱስትሪዎችን ማጠናከር','የቴክኖሎጂ ሽግግር ማስፋፋት','ለኢንዱስትሪ ባለቤቶች ስልጠና','የኢንዱስትሪ ምርምር ማካሄድ'],
      en: ['Establish new industries','Strengthen existing industries','Expand technology transfer','Training for industry owners','Conduct industry research'],
      om: ["Industirii haaraa hundeessuu","Kan jiru cimsuuf hojjachuu","Jijjiirama teeknooloojii babal'isuu","Abbootii industirii leenjisuu","Qorannoo industirii gaggeessuu"],
    },
    phone: '+251 033 XXX 0002', email: 'industry@kemisseinvestment.gov.et',
  },
  'finance': {
    icon: Wallet,
    color: 'text-accent-600', bg: 'bg-accent-50',
    name: { am: 'ፋይናንስ', en: 'Finance', om: 'Faayinaansii' },
    desc: { am: 'የጽ/ቤቱን ሁሉንም የፋይናንስ ስራዎች፣ ሂሳብ አስተዳደር እና ዓመታዊ ሪፖርቶችን የሚያስተዳድር ክፍል።', en: 'Department managing all financial operations, accounting management and annual reports of the office.', om: 'Hojii faayinaansii hunda, bulcha herreegaa fi gabaasaalee waggaa biiroo bulchu.' },
    responsibilities: {
      am: ['የዓመት ሂሳብ ማዘጋጀት','ወጪ እና ገቢ ማስተዳደር','የፋይናንስ ሪፖርት ማቅረብ','የበጀት ዕቅድ','ኦዲት ማካሄድ'],
      en: ['Prepare annual accounts','Manage expenses and revenue','Present financial reports','Budget planning','Conduct audits'],
      om: ["Herreega waggaa qopheessuu","Baasii fi galii bulchuu","Gabaasa faayinaansii dhiheessuu","Karoora bajataa","Awditii gaggeessuu"],
    },
    phone: '+251 033 XXX 0003', email: 'finance@kemisseinvestment.gov.et',
  },
  'human-resource': {
    icon: Users,
    color: 'text-primary', bg: 'bg-primary-50',
    name: { am: 'ሰው ኃይል', en: 'Human Resource', om: 'Humna Namaa' },
    desc: { am: 'ሠራተኞችን ማቅጠር፣ ማሰልጠን፣ ማበረታታት እና ጥሩ የሥራ ሁኔታ ለመፍጠር የሚሰራ ክፍል።', en: 'Department working to hire, train, motivate employees and create a good working environment.', om: 'Hojjettoota ramaduu, leenjisuu, jajjabeessuu fi haala hojii gaarii uumuuf hojjatu.' },
    responsibilities: {
      am: ['ሠራተኞችን ቅጥር','ስልጠና ማዘጋጀት','የሠራተኛ ፍላጎት አስተዳደር','ተጠያቂነት ስርዓት','ደሞዝ አስተዳደር'],
      en: ['Employee recruitment','Organize training','Employee needs management','Accountability system','Salary management'],
      om: ["Hojjettoota ramaduu","Leenjii qopheessuu","Fedhii hojjettootaa bulchuu","Sirna itti gaafatamummaa","Mindaa bulchuu"],
    },
    phone: '+251 033 XXX 0004', email: 'hr@kemisseinvestment.gov.et',
  },
  'planning-monitoring': {
    icon: BarChart3,
    color: 'text-secondary', bg: 'bg-secondary-50',
    name: { am: 'ዕቅድ እና ክትትል', en: 'Planning & Monitoring', om: 'Karoora fi Hordoffii' },
    desc: { am: 'የጽ/ቤቱን ዓመታዊ ዕቅዶች መቅረጽ፣ ተግባራዊ ማድረግ፣ ሂደቱን ክትትል ማድረግ እና ሪፖርት ማቅረብ።', en: 'Formulating annual plans, implementing, monitoring progress and reporting.', om: 'Karoora waggaa baasuu, hojiirra oolchuu, hordofii godhuuf gabaasa dhiheessuu.' },
    responsibilities: {
      am: ['ዓመታዊ ዕቅድ ማዘጋጀት','ሂደት ክትትል','ሪፖርት ማቅረብ','ተጠያቂነት ስርዓት','ዕቅድ ዳሰሳ'],
      en: ['Prepare annual plans','Progress monitoring','Report preparation','Accountability system','Plan review'],
      om: ["Karoora waggaa qopheessuu","Hordoffii adeemsaa","Gabaasa qopheessuu","Sirna itti gaafatamummaa","Sakatta'a karoora"],
    },
    phone: '+251 033 XXX 0005', email: 'planning@kemisseinvestment.gov.et',
  },
  'trade': {
    icon: ShoppingBag,
    color: 'text-accent-600', bg: 'bg-accent-50',
    name: { am: 'ንግድ', en: 'Trade', om: 'Daldalaa' },
    desc: { am: 'የንግድ ፈቃዶችን ማስተዳደር፣ ሕጋዊ ንግድ እንዲካሄድ ድጋፍ ማቅረብ እና ሸማቾችን ለመጠበቅ የሚሰራ ክፍል።', en: 'Managing trade licenses, supporting legal business practices and protecting consumers.', om: 'Hayyama daldalaaa bulchuu, daldala seeraa gargaaruu fi maamiltootaa eeguuf hojjatu.' },
    responsibilities: {
      am: ['የንግድ ፈቃድ ማስተዳደር','ሕጋዊ ዋጋ ክትትል','ሸማቾችን ጥበቃ','የገበያ ክትትል','ንግድ ዳሰሳ'],
      en: ['Manage trade licenses','Legal price monitoring','Consumer protection','Market monitoring','Trade inspection'],
      om: ["Hayyama daldalaaa bulchuu","Hordoffii gatii seeraa","Maamiltootaa eeguu","Hordoffii gabaa","Sakatta'a daldalaaa"],
    },
    phone: '+251 033 XXX 0006', email: 'trade@kemisseinvestment.gov.et',
  },
}

export default function DepartmentDetail() {
  const { id } = useParams()
  const { t, lang } = useLanguage()
  const [staff, setStaff] = useState([])

  const dept = DEPT_DETAILS[id] || DEPT_DETAILS['investment-promotion']
  const Icon = dept.icon

  useEffect(() => {
    async function loadStaff() {
      try {
        const { data } = await supabase.from(TABLES.EMPLOYEES).select('*')
          .ilike('department_slug', `%${id}%`).eq('status','active').limit(4)
        if (data?.length) setStaff(data)
      } catch {}
    }
    loadStaff()
  }, [id])

  const name = dept.name[lang]
  const desc = dept.desc[lang]
  const responsibilities = dept.responsibilities[lang]

  return (
    <div>
      <PageBanner
        title={name}
        subtitle={desc}
        breadcrumbs={[
          { label: t.nav.departments, to: '/departments' },
          { label: name },
        ]}
      />

      <section className="py-16 bg-white">
        <div className="container-gov">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <div className="card p-8">
                <div className={`w-14 h-14 rounded-xl ${dept.bg} flex items-center justify-center mb-5`}>
                  <Icon size={28} className={dept.color} />
                </div>
                <h2 className={`text-xl font-bold text-gov-text mb-4 ${lang==='am'?'font-ethiopic':''}`}>
                  {lang==='am'?'ስለ ክፍሉ':lang==='om'?'Waa\'ee Kutaa':'About Department'}
                </h2>
                <p className={`text-gray-600 leading-relaxed ${lang==='am'?'font-ethiopic':''}`}>{desc}</p>
              </div>

              {/* Responsibilities */}
              <div className="card p-8">
                <h2 className={`text-xl font-bold text-gov-text mb-6 ${lang==='am'?'font-ethiopic':''}`}>
                  {lang==='am'?'ኃላፊነቶች':lang==='om'?'Itti Gaafatamummaawwan':'Responsibilities'}
                </h2>
                <ul className="space-y-3">
                  {responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-secondary flex-shrink-0 mt-0.5" />
                      <span className={`text-gray-600 ${lang==='am'?'font-ethiopic':''}`}>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Staff */}
              {staff.length > 0 && (
                <div className="card p-8">
                  <h2 className={`text-xl font-bold text-gov-text mb-6 ${lang==='am'?'font-ethiopic':''}`}>
                    {lang==='am'?'የክፍሉ ሠራተኞች':lang==='om'?'Hojjettoota Kutaa':'Department Staff'}
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {staff.map(m => (
                      <Link key={m.id} to={`/staff/${m.id}`}
                        className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-primary hover:bg-primary-50 transition-all">
                        {m.photo
                          ? <img src={m.photo} alt={m.name} className="w-10 h-10 rounded-full object-cover" />
                          : <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center"><User size={18} className="text-primary" /></div>
                        }
                        <div className="min-w-0">
                          <p className={`font-semibold text-xs text-gov-text truncate ${lang==='am'?'font-ethiopic':''}`}>
                            {lang==='am'?m.name:m.name_en||m.name}
                          </p>
                          <p className={`text-xs text-gray-400 truncate ${lang==='am'?'font-ethiopic':''}`}>
                            {lang==='am'?m.position_am:m.position_en||m.position}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className={`rounded-2xl p-6 ${dept.bg} border border-opacity-20`}>
                <h3 className={`font-bold text-gov-text mb-4 ${lang==='am'?'font-ethiopic':''}`}>
                  {lang==='am'?'ያግኙን':lang==='om'?'Nu Qunnamaa':'Contact'}
                </h3>
                <div className="space-y-3">
                  <a href={`tel:${dept.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors">
                    <Phone size={15} className={dept.color} />{dept.phone}
                  </a>
                  <a href={`mailto:${dept.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors break-all">
                    <Mail size={15} className={dept.color} />{dept.email}
                  </a>
                </div>
              </div>

              {/* All Depts */}
              <div className="card p-5">
                <h3 className={`font-bold text-gov-text mb-4 text-sm ${lang==='am'?'font-ethiopic':''}`}>
                  {lang==='am'?'ሌሎች ክፍሎች':lang==='om'?'Kutaalee Biroo':'Other Departments'}
                </h3>
                <div className="space-y-2">
                  {Object.entries(DEPT_DETAILS).map(([slug, d]) => (
                    <Link key={slug} to={`/departments/${slug}`}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all
                        ${id===slug?'bg-primary text-white':'text-gray-600 hover:bg-gov-bg hover:text-primary'}`}>
                      <d.icon size={14} />
                      <span className={lang==='am'?'font-ethiopic':''}>{d.name[lang]}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link to="/departments" className="btn-outline w-full justify-center">
                <ArrowLeft size={15} />
                {lang==='am'?'ሁሉም ክፍሎች':lang==='om'?'Kutaalee Hunda':'All Departments'}
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
