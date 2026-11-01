import React from 'react'
import { HERO_TAGS } from '../../../constants/data'

export const HeroBanner: React.FC = () => {
  return (
    <section className="hero">
      <img
        src="/images/hero-banner.jpg"
        alt="নবীগঞ্জের সৌন্দর্য"
        className="hero__image"
        loading="eager"
      />
      <div className="hero__overlay">
        <div className="hero__content">
          <div className="hero__text">
            <h2 className="hero__title">নবীগঞ্জ</h2>
            <p className="hero__subtitle">আমাদের অহংকার</p>
            <p className="hero__description">
              সবুজে ঘেরা, সম্ভাবনায় ভরা, মানুষের নবীগঞ্জ
            </p>
            <div className="hero__tags">
              {HERO_TAGS.map((tag, index) => (
                <span key={index} className="hero__tag">
                  {tag.icon} {tag.label}
                </span>
              ))}
            </div>
          </div>
          <div className="hero__badge">
            <p className="hero__badge-title">Nabiganj Habiganj Bangladesh</p>
            <p className="hero__badge-text">
              My<br />Nabiganj<br />My Pride
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
