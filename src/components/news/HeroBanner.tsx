import React, { useState, useEffect } from 'react'
import { ArrowRight, Clock, Tag, ChevronLeft, ChevronRight } from 'lucide-react'
import { useNews } from '../../context/NewsContext'
import { NewsItem } from '../../types/news'

export const HeroBanner: React.FC = () => {
  const { articles, navigateToArticle } = useNews()

  // Find hero / featured news
  const heroArticles = articles.filter((a) => a.isHero || a.isFeatured).slice(0, 3)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto advance hero carousel every 8 seconds
  useEffect(() => {
    if (heroArticles.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroArticles.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [heroArticles.length])

  const activeArticle: NewsItem = heroArticles[currentIndex] || articles[0]

  if (!activeArticle) return null

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === 0 ? heroArticles.length - 1 : prev - 1))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % heroArticles.length)
  }

  return (
    <section className="hero-section">
      <div className="hero-card">
        {/* Left Content Column */}
        <div className="hero-content">
          <div className="hero-badge-row">
            <span className="badge-pill badge-breaking">সর্বশেষ</span>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--color-primary)',
                background: 'var(--color-primary-soft)',
                padding: '2px 8px',
                borderRadius: '9999px'
              }}
            >
              ব্রেকিং নিউজ
            </span>
          </div>

          <h1
            className="hero-title"
            onClick={() => navigateToArticle(activeArticle)}
          >
            {activeArticle.title}
          </h1>

          <p className="hero-excerpt">{activeArticle.excerpt}</p>

          <div className="hero-meta-row">
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={14} />
              {activeArticle.timeAgo}
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Tag size={14} />
              {activeArticle.category}
            </span>
          </div>

          <button
            className="hero-btn"
            onClick={() => navigateToArticle(activeArticle)}
          >
            <span>আরও পড়ুন</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Right Image Column */}
        <div
          className="hero-image-wrap"
          onClick={() => navigateToArticle(activeArticle)}
          style={{ cursor: 'pointer' }}
        >
          <img
            src={activeArticle.image}
            alt={activeArticle.title}
            className="hero-image"
          />

          {/* Prev/Next overlay controls */}
          <button
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0, 0, 0, 0.45)',
              color: '#fff',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(4px)',
              cursor: 'pointer'
            }}
            title="পূর্ববর্তী খবর"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0, 0, 0, 0.45)',
              color: '#fff',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(4px)',
              cursor: 'pointer'
            }}
            title="পরবর্তী খবর"
          >
            <ChevronRight size={18} />
          </button>

          {/* Carousel Dots */}
          <div
            className="hero-dots"
            onClick={(e) => e.stopPropagation()}
          >
            {heroArticles.map((_, idx) => (
              <span
                key={idx}
                className={`hero-dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
                title={`স্লাইড ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
