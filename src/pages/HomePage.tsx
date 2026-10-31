import React from 'react'
import { HeroBanner } from '../components/news/HeroBanner'
import { CategoryPills } from '../components/news/CategoryPills'
import { LatestNewsList } from '../components/news/LatestNewsList'
import { FeaturedNewsCards } from '../components/news/FeaturedNewsCards'
import { WeatherWidget } from '../components/news/WeatherWidget'
import { PopularNewsWidget } from '../components/news/PopularNewsWidget'
import { NewsletterWidget } from '../components/news/NewsletterWidget'
import { MoreNewsSection } from '../components/news/MoreNewsSection'

export const HomePage: React.FC = () => {
  return (
    <div className="container">
      {/* 1. Hero Breaking News Banner */}
      <HeroBanner />

      {/* 2. Category Navigation Strip */}
      <CategoryPills />

      {/* 3. Main 3-Column Layout */}
      <div className="main-grid">
        {/* Left Column: Latest News (সর্বশেষ খবর) */}
        <LatestNewsList />

        {/* Center Column: Featured News Cards (ছাত্রদের নতুন কর্মসূচি & পদ্মা সেতু) */}
        <FeaturedNewsCards />

        {/* Right Column: Widgets (Weather, Popular News, Newsletter) */}
        <div className="right-column">
          <WeatherWidget />
          <PopularNewsWidget />
          <NewsletterWidget />
        </div>
      </div>

      {/* 4. Bottom Grid: More News (আরও খবর) */}
      <MoreNewsSection />
    </div>
  )
}
