import { createClient } from '@supabase/supabase-js'

// ⚠️  Replace these with your actual Supabase project URL and anon key
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://YOUR_PROJECT.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_ANON_KEY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ─── Table names (centralized) ─────────────────────────────────────────────
export const TABLES = {
  EMPLOYEES:    'employees',
  DEPARTMENTS:  'departments',
  NEWS:         'news',
  DOCUMENTS:    'documents',
  GALLERY:      'gallery',
  ANNOUNCEMENTS:'announcements',
  USERS:        'users',
  SETTINGS:     'settings',
  VISITOR:      'visitor_counter',
}

// ─── Storage bucket names ──────────────────────────────────────────────────
export const BUCKETS = {
  EMPLOYEES:  'employee-photos',
  NEWS:       'news-images',
  DOCUMENTS:  'documents',
  GALLERY:    'gallery-images',
}

export default supabase
