import React from 'react'
import { ArrowRight } from 'lucide-react'
import { useNews } from '../../context/NewsContext'

export const PopularNewsWidget: React.FC = () => {
  const { articles, navigateToArticle, navigateToCategory } = useNews()

  // Items for popular news 1-5
  const popularList = articles.filter((a) => a.isPopular).sort((a, b) => (a.popularRank || 0) - (b.popularRank || 0))
  const items = popularList.length > 0 ? popularList.slice(0, 5) : articles.slice(0, 5)

  return (
    <div className="popular-card">
      <div className="section-header" style={{ marginBottom: '8px' }}>
        <h3 className="section-title" style={{ fontSize: '17px' }}>জনপ্রিয় খবর</h3>
      </div>

      <div className="popular-list">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="popular-item"
            onClick={() => navigateToArticle(item)}
            title={item.title}
          >
            <div className="popular-number">{index + 1}</div>
            <h4 className="popular-title">{item.title}</h4>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '14px', textAlign: 'right' }}>
        <span
          className="view-all-link"
          onClick={() => navigateToCategory('all')}
          style={{ justifyContent: 'flex-end' }}
        >
          সব দেখুন <ArrowRight size={13} />
        </span>
      </div>
    </div>
  )
}
