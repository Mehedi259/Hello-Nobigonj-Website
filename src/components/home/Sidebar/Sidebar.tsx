import React from 'react'
import { WEATHER_DATA } from '../../../constants/data'

interface SidebarProps {
  onOpenModal?: (type: 'about' | 'ads' | 'privacy' | 'contact') => void
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenModal }) => {
  return (
    <aside className="sidebar">
      {/* Today's Update Widget */}
      <div className="widget-today">
        <div className="widget-today__icon">📰</div>
        <h3 className="widget-today__title">নবীগঞ্জে আজকের আবহাওয়া</h3>
        <p className="widget-today__subtitle">সর্বশেষ আপডেট</p>
      </div>

      {/* Weather Widget */}
      <div className="widget-weather">
        <div className="widget-weather__header">
          <div style={{ fontSize: '32px', marginBottom: '4px' }}>🌤️</div>
          <div className="widget-weather__temp">{WEATHER_DATA.temperature}</div>
          <div className="widget-weather__condition">{WEATHER_DATA.condition}</div>
        </div>
        <div className="widget-weather__details">
          <div className="widget-weather__detail">
            <div className="widget-weather__detail-label">আদ্রতা</div>
            <div className="widget-weather__detail-value">{WEATHER_DATA.humidity}</div>
          </div>
          <div className="widget-weather__detail">
            <div className="widget-weather__detail-label">বাতাস</div>
            <div className="widget-weather__detail-value">{WEATHER_DATA.wind}</div>
          </div>
          <div className="widget-weather__detail">
            <div className="widget-weather__detail-label">চাপ</div>
            <div className="widget-weather__detail-value">{WEATHER_DATA.pressure}</div>
          </div>
        </div>
      </div>

      {/* Quote Widget */}
      <div className="widget-quote">
        <p className="widget-quote__text">
          নবীগঞ্জের টেকসই উন্নয়ন নবীগঞ্জের মানুষের আন্তরিক ঐক্যের হাতে
        </p>
        <p className="widget-quote__source">— নবীগঞ্জবাসী</p>
      </div>

      {/* Nature CTA */}
      <div className="widget-cta">
        <img
          src="/images/tea-garden.jpg"
          alt="নবীগঞ্জের প্রকৃতি"
          className="widget-cta__image"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/nabiganj-nature.jpg'
          }}
        />
        <div className="widget-cta__body">
          <h3 className="widget-cta__title">নবীগঞ্জকে আরো সুন্দর করি</h3>
          <p className="widget-cta__subtitle">পরিচ্ছন্ন ও সবুজ নবীগঞ্জ গড়ার প্রত্যয়</p>
          <button
            className="widget-cta__btn"
            onClick={() => onOpenModal && onOpenModal('contact')}
          >
            আমাদের সাথে যোগ দিন
          </button>
        </div>
      </div>

      {/* Photo Stories */}
      <div className="widget-stories">
        <h3 className="widget-stories__title">নবীগঞ্জ ছবিতে কথা বলে</h3>
        <p className="widget-stories__subtitle">আলোকচিত্র ও লোকসংস্কৃতি গ্যালারি</p>
        <button
          className="widget-stories__btn"
          onClick={() => {
            const el = document.getElementById('nobigonj-places')
            if (el) el.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          গ্যালারি দেখুন →
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
