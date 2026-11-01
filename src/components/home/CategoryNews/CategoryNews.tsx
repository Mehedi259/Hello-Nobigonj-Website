import React from 'react'
import {
  NATIONAL_NEWS,
  ENTERTAINMENT_NEWS,
  SPORTS_NEWS,
  CategoryNewsItem
} from '../../../constants/data'
import { useNews } from '../../../context/NewsContext'

interface CategoryColumnProps {
  title: string
  news: CategoryNewsItem[]
  seeAllText?: string
  onSeeAll?: () => void
}

const CategoryColumn: React.FC<CategoryColumnProps> = ({
  title,
  news,
  seeAllText = 'সব খবর →',
  onSeeAll
}) => (
  <div className="category-column">
    <div className="category-tabs">
      <span className="category-tab category-tab--active">{title}</span>
      <span
        className="category-tab__see-all"
        onClick={onSeeAll}
        style={{ cursor: 'pointer' }}
      >
        {seeAllText}
      </span>
    </div>
    {news.map((item) => (
      <div key={item.id} className="category-card">
        <div className="category-card__image-wrapper">
          <img
            src={item.image}
            alt={item.title}
            className="category-card__image"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/news-national.jpg'
            }}
          />
        </div>
        <div className="category-card__body">
          <h3 className="category-card__title">{item.title}</h3>
          {item.bullets && (
            <ul className="category-card__bullets">
              {item.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    ))}
  </div>
)

export const CategoryNews: React.FC = () => {
  const { navigateToCategory } = useNews()

  return (
    <section className="category-section" id="national">
      <div className="container">
        <div className="category-grid">
          <CategoryColumn
            title="জাতীয়"
            news={NATIONAL_NEWS}
            onSeeAll={() => navigateToCategory('জাতীয়')}
          />
          <CategoryColumn
            title="বিনোদন"
            news={ENTERTAINMENT_NEWS}
            onSeeAll={() => navigateToCategory('বিনোদন')}
          />
          <CategoryColumn
            title="খেলাধুলা"
            news={SPORTS_NEWS}
            onSeeAll={() => navigateToCategory('খেলাধুলা')}
          />
        </div>
      </div>
    </section>
  )
}

export default CategoryNews
