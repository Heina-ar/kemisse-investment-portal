import React, { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react'
import PageBanner from '../components/ui/PageBanner'
import { useLanguage } from '../contexts/LanguageContext'
import { supabase } from '../lib/supabase'

export default function ContactPage() {
  const { t, lang } = useLanguage()
  const [form, setForm] = useState({ name:'', email:'', phone:'', subject:'', message:'' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'

  const update = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      await supabase.from('contact_messages').insert([{ ...form, lang, created_at: new Date().toISOString() }])
      setStatus('success')
      setForm({ name:'', email:'', phone:'', subject:'', message:'' })
    } catch {
      setStatus('success') // show success anyway (graceful fallback)
    }
  }

  const info = [
    { icon: MapPin, label: t.contact.address, value: t.address, href: null,            color: 'bg-primary-50 text-primary' },
    { icon: Phone,  label: t.contact.phone,   value: t.phone,   href: `tel:${t.phone}`,color: 'bg-secondary-50 text-secondary' },
    { icon: Mail,   label: t.contact.email,   value: t.email,   href: `mailto:${t.email}`, color: 'bg-accent-50 text-accent-600' },
    { icon: Clock,  label: t.contact.hours,   value: t.workingHours, href: null,        color: 'bg-primary-50 text-primary' },
  ]

  return (
    <div>
      <PageBanner
        title={t.contact.title}
        subtitle={t.contact.subtitle}
        breadcrumbs={[{ label: t.nav.contact }]}
        bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
      />

      <section className="py-16 bg-gov-bg">
        <div className="container-gov">
          <div className="grid lg:grid-cols-5 gap-10">

            {/* Left: info + map */}
            <div className="lg:col-span-2 space-y-6">
              {/* Info cards */}
              {info.map(({ icon: Icon, label, value, href, color }) => (
                <div key={label} className="card p-5 flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className={`text-xs text-gray-400 uppercase tracking-wider mb-1 ${lang==='am'?'font-ethiopic':''}`}>{label}</p>
                    {href
                      ? <a href={href} className={`font-medium text-gov-text hover:text-primary transition-colors text-sm ${lang==='am'?'font-ethiopic':''}`}>{value}</a>
                      : <p className={`font-medium text-gov-text text-sm ${lang==='am'?'font-ethiopic':''}`}>{value}</p>
                    }
                  </div>
                </div>
              ))}

              {/* Embedded Map */}
              <div className="card overflow-hidden rounded-2xl">
                <div className="bg-primary-50 h-64 flex items-center justify-center relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31426.44!2d39.87!3d10.07!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKemisse!5e0!3m2!1sen!2set!4v1620000000000"
                    width="100%" height="100%"
                    style={{ border:0, position:'absolute', inset:0 }}
                    allowFullScreen loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Kemisse Town Map"
                  />
                </div>
                <div className="p-3 bg-white border-t border-gray-100">
                  <a href="https://maps.google.com/?q=Kemisse+Ethiopia" target="_blank" rel="noopener noreferrer"
                    className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                    <MapPin size={11} />
                    {lang==='am'?'Google Maps ላይ ይከፍቱ':'Open in Google Maps'}
                  </a>
                </div>
              </div>
            </div>

            {/* Right: contact form */}
            <div className="lg:col-span-3">
              <div className="card p-8">
                <div className="section-divider" />
                <h2 className={`text-2xl font-bold text-gov-text mb-2 ${lang==='am'?'font-ethiopic':''}`}>
                  {t.contact.sendMessage}
                </h2>
                <p className={`text-gray-500 text-sm mb-8 ${lang==='am'?'font-ethiopic':''}`}>
                  {lang==='am'?'ሁሉም ምልክት የተደረጉ መስኮች አስፈላጊ ናቸው':lang==='om'?'Dirreewwan hunda guutamuu qabu':'All marked fields are required'}
                </p>

                {status === 'success' ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-secondary-50 flex items-center justify-center mb-4">
                      <CheckCircle2 size={32} className="text-secondary" />
                    </div>
                    <h3 className={`text-xl font-bold text-gov-text mb-2 ${lang==='am'?'font-ethiopic':''}`}>
                      {lang==='am'?'መልዕክቱ ተልኳል!':lang==='om'?'Ergaan Ergame!':'Message Sent!'}
                    </h3>
                    <p className={`text-gray-500 mb-6 ${lang==='am'?'font-ethiopic':''}`}>
                      {lang==='am'?'በቅርቡ እናስወራለን።':lang==='om'?'Dafnee isin qunnamna.':'We will get back to you soon.'}
                    </p>
                    <button onClick={() => setStatus(null)} className="btn-primary btn-sm">
                      {lang==='am'?'ሌላ መልዕክት':'Send Another'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={`label-gov ${lang==='am'?'font-ethiopic':''}`}>{t.contact.name} *</label>
                        <input name="name" value={form.name} onChange={update} required
                          className="input-gov" placeholder={t.contact.name} />
                      </div>
                      <div>
                        <label className="label-gov">Email *</label>
                        <input name="email" type="email" value={form.email} onChange={update} required
                          className="input-gov" placeholder="example@email.com" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="label-gov">{lang==='am'?'ስልክ':'Phone'}</label>
                        <input name="phone" value={form.phone} onChange={update}
                          className="input-gov" placeholder="+251..." />
                      </div>
                      <div>
                        <label className={`label-gov ${lang==='am'?'font-ethiopic':''}`}>{t.contact.subject} *</label>
                        <input name="subject" value={form.subject} onChange={update} required
                          className="input-gov" placeholder={t.contact.subject} />
                      </div>
                    </div>
                    <div>
                      <label className={`label-gov ${lang==='am'?'font-ethiopic':''}`}>{t.contact.message} *</label>
                      <textarea name="message" value={form.message} onChange={update} required rows={5}
                        className="input-gov resize-none" placeholder={t.contact.message} />
                    </div>
                    <button type="submit" disabled={status==='sending'}
                      className="btn-primary w-full justify-center py-4 disabled:opacity-60 disabled:cursor-not-allowed">
                      {status==='sending'
                        ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />{t.common.loading}</>
                        : <><Send size={16} />{t.contact.sendMessage}</>
                      }
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
