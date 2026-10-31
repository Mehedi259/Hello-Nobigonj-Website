import React from 'react'
import { Clock, ArrowRight } from 'lucide-react'
import { useNews } from '../../context/NewsContext'

export const MoreNewsSection: React.FC = () => {
  const { articles, navigateToArticle, navigateToCategory } = useNews()

  // Filter bottom row items (ids more-1 through more-5)
  const bottomArticles = articles.filter((a) => a.id.startsWith('more-'))
  const items = bottomArticles.length === 5 ? bottomArticles : articles.slice(4, 9)

  return (
    <section className="more-news-section">
      <div className="section-header">
        <h2 className="section-title">আরও খবর</h2>
        <span
          className="view-all-link"
          onClick={() => navigateToCategory('all')}
        >
          সব দেখুন <ArrowRight size={13} />
        </span>
      </div>

      <div className="more-news-grid">
        {items.map((item) => (
          <article
            key={item.id}
            className="more-news-card"
            onClick={() => navigateToArticle(item)}
            title={item.title}
          >
            <div className="more-news-thumb">
              <img src={item.image} alt={item.title} />
            </div>

            <div className="more-news-body">
              <div>
                <span className="more-news-category">{item.category}</span>
                <h3 className="more-news-title">{item.title}</h3>
              </div>
              <div className="more-news-time">
                <Clock size={11} />
                <span>{item.timeAgo}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
