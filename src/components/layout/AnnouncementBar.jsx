import React, { useState, useEffect } from 'react'
import { X, Megaphone } from 'lucide-react'
import { supabase, TABLES } from '../../lib/supabase'
import { useLanguage } from '../../contexts/LanguageContext'

export default function AnnouncementBar() {
  const { lang } = useLanguage()
  const [announcement, setAnnouncement] = useState(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    fetchAnnouncement()
  }, [])

  async function fetchAnnouncement() {
    try {
      const { data } = await supabase
        .from(TABLES.ANNOUNCEMENTS)
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (data) setAnnouncement(data)
    } catch {
      // No active announcement or Supabase not configured
    }
  }

  if (!announcement || dismissed) return null

  const text = lang === 'am' ? announcement.text_am
             : lang === 'om' ? announcement.text_om
             : announcement.text_en

  if (!text) return null

  return (
    <div className="bg-secondary text-white py-2 relative overflow-hidden">
      <div className="container-gov flex items-center gap-3">
        <div className="flex-shrink-0 flex items-center gap-1.5 text-accent">
          <Megaphone size={15} />
          <span className="font-bold text-xs uppercase tracking-wider hidden sm:inline">
            {lang === 'am' ? 'ማስታወቂያ' : lang === 'om' ? 'Beeksisa' : 'Notice'}
          </span>
        </div>

        {/* Scrolling text */}
        <div className="flex-1 overflow-hidden">
          <div className="whitespace-nowrap animate-[marquee_25s_linear_infinite] inline-block text-sm">
            {text}
          </div>
        </div>

        {/* Dismiss */}
        <button
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 p-1 rounded hover:bg-white/20 transition-colors"
          aria-label="Dismiss"
        >
          <X size={14} />
        </button>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  )
}
