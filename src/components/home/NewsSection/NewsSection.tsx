import React from 'react'
import { HELLO_NEWS } from '../../../constants/data'
import { FiCalendar, FiEye } from 'react-icons/fi'
import { useNews } from '../../../context/NewsContext'
import { NewsItem } from '../../../types/news'

export const NewsSection: React.FC = () => {
  const { articles, navigateToArticle } = useNews()

  // Use API articles if available, otherwise fallback to HELLO_NEWS
  const hasApiArticles = articles && articles.length > 0
  const featuredArticle = hasApiArticles ? articles[0] : null
  const smallArticles = hasApiArticles ? articles.slice(1, 5) : null

  const featuredFallback = HELLO_NEWS.find((n) => n.featured) || HELLO_NEWS[0]
  const smallFallback = HELLO_NEWS.filter((n) => !n.featured)

  const handleFeaturedClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (featuredArticle) {
      navigateToArticle(featuredArticle)
    } else {
      // Mock article object
      navigateToArticle({
        id: 1,
        title: featuredFallback.title,
        subtitle: featuredFallback.excerpt,
        content: featuredFallback.excerpt + '\n\nনবীগঞ্জ উপজেলার সার্বিক উন্নয়ন এবং স্থানীয় অবকাঠামো সংস্কারে এটি একটি যুগান্তকারী পদক্ষেপ।',
        category: 'স্থানীয় সংবাদ',
        image: featuredFallback.image,
        author: { id: 1, name: 'বিশেষ প্রতিবেদক', role: 'নবীগঞ্জ প্রতিনিধি', avatar: '/images/reporter-rakib.jpg' },
        published_at: featuredFallback.date,
        views: 1240,
        slug: 'nabiganj-featured-news',
        is_breaking: true,
        tags: ['নবীগঞ্জ', 'উন্নয়ন', 'যোগাযোগ']
      } as NewsItem)
    }
  }

  const handleSmallClick = (item: any, fallbackItem: any, e: React.MouseEvent) => {
    e.preventDefault()
    if (item) {
      navigateToArticle(item)
    } else {
      navigateToArticle({
        id: fallbackItem.id,
        title: fallbackItem.title,
        subtitle: 'নবীগঞ্জের সর্বশেষ খবর ও বিশেষ প্রতিবেদন',
        content: fallbackItem.title + ' নিয়ে নবীগঞ্জে বিস্তারিত আলোচনা এবং কর্মসূচি চলছে।',
        category: 'নবীগঞ্জ',
        image: fallbackItem.image,
        author: { id: 1, name: 'নবীগঞ্জ প্রতিনিধি', role: 'স্টাফ রিপোর্টার', avatar: '/images/reporter-rakib.jpg' },
        published_at: fallbackItem.date,
        views: 850,
        slug: fallbackItem.id,
        is_breaking: false,
        tags: ['নবীগঞ্জ', 'সংবাদ']
      } as NewsItem)
    }
  }

  return (
    <div className="news-main">
      <div className="section-header">
        <h2 className="section-header__title">হ্যালো নবীগঞ্জ</h2>
      </div>
      <div className="news-grid">
        {/* Featured news */}
        <div className="news-featured">
          <div
            className="news-featured__card"
            onClick={handleFeaturedClick}
            style={{ cursor: 'pointer' }}
          >
            <div className="news-featured__image-wrapper">
              <img
                src={featuredArticle ? featuredArticle.image : featuredFallback.image}
                alt={featuredArticle ? featuredArticle.title : featuredFallback.title}
                className="news-featured__image"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/news-road.jpg'
                }}
              />
              <div className="news-featured__overlay">
                <span className="news-featured__overlay-tag">নবীগঞ্জে আপনাকে স্বাগতম</span>
              </div>
            </div>
            <div className="news-featured__body">
              <h3 className="news-featured__title">
                {featuredArticle ? featuredArticle.title : featuredFallback.title}
              </h3>
              <p className="news-featured__excerpt">
                {featuredArticle
                  ? (featuredArticle.subtitle || featuredArticle.content.slice(0, 140) + '...')
                  : featuredFallback.excerpt}
              </p>
              <div className="news-featured__meta">
                <span>
                  <FiCalendar /> {featuredArticle ? featuredArticle.published_at : featuredFallback.date}
                </span>
                <span>
                  <FiEye /> {featuredArticle ? `${featuredArticle.views}` : featuredFallback.views}
                </span>
              </div>
              <a href="#" className="news-featured__read-more" onClick={handleFeaturedClick}>
                বিস্তারিত পড়ুন →
              </a>
            </div>
          </div>
        </div>

        {/* Small news cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {hasApiArticles && smallArticles
            ? smallArticles.map((news) => (
                <div
                  key={news.id}
                  className="news-small"
                  onClick={(e) => handleSmallClick(news, null, e)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="news-small__image-wrapper">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="news-small__image"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/news-education.jpg'
                      }}
                    />
                  </div>
                  <div className="news-small__body">
                    <h4 className="news-small__title">{news.title}</h4>
                    <div className="news-small__meta">
                      <span><FiCalendar /> {news.published_at}</span>
                      <span><FiEye /> {news.views}</span>
                    </div>
                  </div>
                </div>
              ))
            : smallFallback.map((news) => (
                <div
                  key={news.id}
                  className="news-small"
                  onClick={(e) => handleSmallClick(null, news, e)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="news-small__image-wrapper">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="news-small__image"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/news-development.jpg'
                      }}
                    />
                  </div>
                  <div className="news-small__body">
                    <h4 className="news-small__title">{news.title}</h4>
                    <div className="news-small__meta">
                      <span><FiCalendar /> {news.date}</span>
                      <span><FiEye /> {news.views}</span>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}

export default NewsSection
