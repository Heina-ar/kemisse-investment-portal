import React from 'react'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export default function NotFoundPage() {
  const { lang } = useLanguage()
  return (
    <div className="min-h-screen bg-gov-bg flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-primary-100 mb-4 select-none">404</div>
        <div className="w-16 h-16 rounded-2xl bg-primary mx-auto flex items-center justify-center mb-6">
          <span className="text-white text-2xl font-bold">K</span>
        </div>
        <h1 className={`text-2xl font-bold text-gov-text mb-2 ${lang==='am'?'font-ethiopic':''}`}>
          {lang==='am'?'ገጹ አልተገኘም':lang==='om'?'Fuulni Hin Argamne':'Page Not Found'}
        </h1>
        <p className={`text-gray-500 mb-8 ${lang==='am'?'font-ethiopic':''}`}>
          {lang==='am'?'የፈለጉት ገጽ አይገኝም። ወደ መነሻ ይመለሱ።':lang==='om'?'Fuulli barbaaddan hin argamu. Gara jalqabaatti deebi\'aa.':'The page you are looking for does not exist.'}
        </p>
        <div className="flex gap-3 justify-center">
          <Link to="/" className="btn-primary"><Home size={16}/>{lang==='am'?'መነሻ ገጽ':'Home'}</Link>
          <button onClick={() => window.history.back()} className="btn-outline"><ArrowLeft size={16}/>{lang==='am'?'ተመለስ':'Go Back'}</button>
        </div>
      </div>
    </div>
  )
}
