import React from 'react'
import { Clock, ArrowRight } from 'lucide-react'
import { useNews } from '../../context/NewsContext'

export const FeaturedNewsCards: React.FC = () => {
  const { articles, navigateToArticle } = useNews()

  // Find center column articles: students-rally and padma-bridge
  const centerArticles = articles.filter(
    (a) => a.id === 'students-rally-1' || a.id === 'padma-bridge-1'
  )

  const items = centerArticles.length === 2 ? centerArticles : articles.slice(1, 3)

  return (
    <div className="center-column">
      {items.map((item) => {
        const isPolitics = item.category === 'রাজনীতি'
        return (
          <article
            key={item.id}
            className="featured-card"
            onClick={() => navigateToArticle(item)}
          >
            <div className="featured-card-image">
              <img src={item.image} alt={item.title} />
              <span
                className="featured-card-badge"
                style={{
                  background: isPolitics ? 'var(--color-brand-red)' : 'var(--color-primary)'
                }}
              >
                {item.category}
              </span>
            </div>

            <div className="featured-card-body">
              <h3 className="featured-card-title">{item.title}</h3>
              <p className="featured-card-excerpt">{item.excerpt}</p>

              <div className="featured-card-footer">
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} />
                  {item.timeAgo}
                </span>
                <span className="read-more-arrow">
                  <ArrowRight size={15} />
                </span>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
