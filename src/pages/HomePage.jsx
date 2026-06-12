import React from 'react'
import HeroSlider       from '../components/sections/HeroSlider'
import QuickAccess      from '../components/sections/QuickAccess'
import HeadMessage      from '../components/sections/HeadMessage'
import StatsSection     from '../components/sections/StatsSection'
import DepartmentsSection from '../components/sections/DepartmentsSection'
import InvestmentSection  from '../components/sections/InvestmentSection'
import StaffPreview     from '../components/sections/StaffPreview'
import NewsSection      from '../components/sections/NewsSection'
import DocumentsSection from '../components/sections/DocumentsSection'
import ContactStrip     from '../components/sections/ContactStrip'

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <QuickAccess />
      <HeadMessage />
      <StatsSection />
      <DepartmentsSection />
      <InvestmentSection />
      <StaffPreview />
      <NewsSection />
      <DocumentsSection />
      <ContactStrip />
    </>
  )
}
