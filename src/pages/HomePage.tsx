import React from 'react'
import { HeroBanner } from '../components/home/HeroBanner/HeroBanner'
import { StatsSection } from '../components/home/StatsSection/StatsSection'
import { TopPlaces } from '../components/home/TopPlaces/TopPlaces'
import { NewsSection } from '../components/home/NewsSection/NewsSection'
import { Sidebar } from '../components/home/Sidebar/Sidebar'
import { CategoryNews } from '../components/home/CategoryNews/CategoryNews'

interface HomePageProps {
  onOpenModal?: (type: 'about' | 'ads' | 'privacy' | 'contact') => void
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenModal }) => {
  return (
    <div>
      <HeroBanner />
      <StatsSection />
      <div id="nobigonj-places">
        <TopPlaces />
      </div>
      <section className="news-section" id="hello-nobigonj">
        <div className="container">
          <NewsSection />
          <Sidebar onOpenModal={onOpenModal} />
        </div>
      </section>
      <CategoryNews />
    </div>
  )
}

export default HomePage
