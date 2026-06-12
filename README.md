# ከሚሴ ኢንቨስትመንት ፖርታል — Setup Guide

## Kemisse Town Administration Industry & Investment Office Portal
**Domain:** kemisseinvestment.gov.et

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd kemisse-portal
npm install
```

### 2. Supabase Setup
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Open **SQL Editor** and run the contents of `supabase-schema.sql`
3. Copy your **Project URL** and **anon key** from Settings → API

### 3. Environment Variables
Create a `.env.local` file:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run Development Server
```bash
npm run dev
```
Open: http://localhost:5173

### 5. Build for Production
```bash
npm run build
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/          # ProtectedRoute
│   ├── layout/        # Header, Footer, Navbar, AdminLayout
│   ├── sections/      # Homepage sections
│   └── ui/            # Reusable components
├── pages/             # Public pages
├── admin/pages/       # Admin panel pages
├── contexts/          # Language + Auth contexts
├── locales/           # AM / EN / OM translations
└── lib/               # Supabase client
```

---

## 🌐 Pages

| Route | Page |
|-------|------|
| `/` | Homepage |
| `/about` | About Office |
| `/departments` | Departments list |
| `/departments/:id` | Department detail |
| `/staff` | Staff directory |
| `/staff/:id` | Staff profile |
| `/investment` | Investment opportunities |
| `/news` | News & announcements |
| `/news/:id` | News detail |
| `/documents` | Documents center |
| `/gallery` | Photo gallery |
| `/contact` | Contact & map |
| `/admin/login` | Admin login |
| `/admin/dashboard` | Admin dashboard |

---

## 🔐 Admin Panel

URL: `/admin/login`

Create admin user in Supabase:
1. Go to Supabase Dashboard → Authentication → Users
2. Click **Invite User** or **Add User**
3. Enter email and password
4. Use those credentials to login at `/admin/login`

---

## 🗄️ Database Tables

| Table | Purpose |
|-------|---------|
| `employees` | Staff directory |
| `departments` | Office departments |
| `news` | News & announcements |
| `documents` | Downloadable files |
| `gallery` | Photo gallery |
| `announcements` | Scrolling announcements |
| `contact_messages` | Contact form submissions |
| `settings` | Site configuration |
| `visitor_counter` | Visit tracking |

---

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Government Blue | `#0F4C81` | Primary |
| Investment Green | `#2E7D32` | Secondary |
| Gold | `#D4A017` | Accent |
| Background | `#F8FAFC` | Section bg |

---

## 📦 Tech Stack

- **React 18** + Vite
- **Tailwind CSS** — Styling
- **React Router v6** — Routing
- **Supabase** — DB + Auth + Storage
- **Lucide React** — Icons
- **Noto Sans** + **Noto Sans Ethiopic** — Fonts

---

## 🌍 Languages

- 🇪🇹 **አማርኛ** (Amharic)
- 🇬🇧 **English**
- 🟢 **Afaan Oromo**

Switch language via header switcher. Preference saved to localStorage.

---

## 📞 Support

**Office:** Kemisse Town Administration Industry & Investment Office  
**Email:** info@kemisseinvestment.gov.et  
**Domain:** kemisseinvestment.gov.et

---

© 2026 Kemisse Town Administration. All Rights Reserved.
