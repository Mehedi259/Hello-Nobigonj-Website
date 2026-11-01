import React from 'react'
import { TOP_PLACES } from '../../../constants/data'

export const TopPlaces: React.FC = () => {
  return (
    <section className="top-places">
      <div className="container">
        <div className="section-header">
          <h2 className="section-header__title">নবীগঞ্জের সেরা স্থানসমূহ</h2>
          <span className="section-header__link">সব দেখুন →</span>
        </div>
        <div className="top-places__grid">
          {TOP_PLACES.map((place) => (
            <div key={place.id} className="place-card">
              <div className="place-card__image-wrapper">
                <img
                  src={place.image}
                  alt={place.title}
                  className="place-card__image"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    (e.target as HTMLImageElement).src = '/images/nabiganj-nature.jpg'
                  }}
                />
              </div>
              <div className="place-card__body">
                <h3 className="place-card__title">{place.title}</h3>
                <p className="place-card__location">{place.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TopPlaces
