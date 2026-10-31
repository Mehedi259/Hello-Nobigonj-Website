import React from 'react'
import { Clock, ArrowRight } from 'lucide-react'
import { useNews } from '../../context/NewsContext'

export const LatestNewsList: React.FC = () => {
  const { articles, navigateToArticle, navigateToCategory } = useNews()

  // Items for latest news list
  const latestList = articles.filter((a) => !a.isHero).slice(0, 6)

  return (
    <div className="latest-column">
      <div className="section-header">
        <h2 className="section-title">সর্বশেষ খবর</h2>
        <span
          className="view-all-link"
          onClick={() => navigateToCategory('national')}
        >
          সব দেখুন <ArrowRight size={13} />
        </span>
      </div>

      <div className="latest-news-list">
        {latestList.map((item) => (
          <article
            key={item.id}
            className="news-list-item"
            onClick={() => navigateToArticle(item)}
            title={item.title}
          >
            <div className="news-list-thumb">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="news-list-content">
              <div>
                <span className="news-list-category">{item.category}</span>
                <h3 className="news-list-title">{item.title}</h3>
              </div>
              <div className="news-list-time">
                <Clock size={12} />
                <span>{item.timeAgo}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
