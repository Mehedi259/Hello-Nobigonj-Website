import React from 'react'
import { Clock, ArrowLeft } from 'lucide-react'
import { useNews } from '../context/NewsContext'
import { CATEGORIES } from '../data/categories'
import { WeatherWidget } from '../components/news/WeatherWidget'
import { PopularNewsWidget } from '../components/news/PopularNewsWidget'
import { NewsletterWidget } from '../components/news/NewsletterWidget'

export const CategoryPage: React.FC = () => {
  const { currentCategory, articles, navigateToArticle, navigateToHome } = useNews()

  const currentCatObj = CATEGORIES.find((c) => c.slug === currentCategory)
  const categoryName = currentCatObj ? currentCatObj.name : 'সকল সংবাদ'

  const filteredArticles = currentCategory === 'all'
    ? articles
    : articles.filter((a) => a.categorySlug === currentCategory || a.category === categoryName)

  return (
    <div className="container" style={{ padding: '24px 16px 48px' }}>
      {/* Category Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '16px', borderBottom: '2px solid var(--border-light)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={navigateToHome}
            className="action-btn"
            title="হোমে ফিরে যান"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-main)' }}>
            {categoryName}
          </h1>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 600,
              background: 'var(--color-primary-soft)',
              color: 'var(--color-primary-dark)',
              padding: '3px 10px',
              borderRadius: '9999px'
            }}
          >
            {filteredArticles.length} টি সংবাদ
          </span>
        </div>
      </div>

      <div className="detail-layout-grid">
        {/* News Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {filteredArticles.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
              এই বিভাগে বর্তমানে কোনো সংবাদ নেই
            </div>
          ) : (
            filteredArticles.map((item) => (
              <article
                key={item.id}
                className="featured-card"
                onClick={() => navigateToArticle(item)}
              >
                <div className="featured-card-image" style={{ height: '170px' }}>
                  <img src={item.image} alt={item.title} />
                  <span className="featured-card-badge" style={{ background: 'var(--color-primary)' }}>
                    {item.category}
                  </span>
                </div>
                <div className="featured-card-body">
                  <h3 className="featured-card-title" style={{ fontSize: '15px' }}>{item.title}</h3>
                  <p className="featured-card-excerpt" style={{ fontSize: '13px' }}>{item.excerpt}</p>
                  <div className="featured-card-footer">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {item.timeAgo}
                    </span>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Sidebar */}
        <aside>
          <div style={{ marginBottom: '20px' }}>
            <WeatherWidget />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <PopularNewsWidget />
          </div>
          <div>
            <NewsletterWidget />
          </div>
        </aside>
      </div>
    </div>
  )
}
