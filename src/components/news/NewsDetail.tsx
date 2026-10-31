import React, { useState } from 'react'
import {
  Clock,
  Bookmark,
  Share2,
  Type,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  ThumbsUp,
  Link as LinkIcon,
  Send
} from 'lucide-react'
import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaLinkedinIn
} from 'react-icons/fa'
import { useNews } from '../../context/NewsContext'
import { WeatherWidget } from './WeatherWidget'
import { NewsletterWidget } from './NewsletterWidget'

export const NewsDetail: React.FC = () => {
  const {
    selectedArticle,
    articles,
    navigateToArticle,
    navigateToHome,
    navigateToCategory,
    isBookmarked,
    toggleBookmark,
    fontSizeLevel,
    cycleFontSize,
    comments,
    addComment,
    showToast
  } = useNews()

  const article = selectedArticle || articles[0]

  // Comment input state
  const [commentName, setCommentName] = useState('')
  const [commentContent, setCommentContent] = useState('')

  if (!article) return null

  const bookmarked = isBookmarked(article.id)
  const articleComments = comments[article.slug] || comments[article.id] || []

  // Related articles (matching category or popular)
  const relatedList = articles
    .filter((a) => a.id !== article.id && a.slug !== article.slug)
    .slice(0, 5)

  // Prev / Next articles
  const currentIndex = articles.findIndex((a) => a.id === article.id || a.slug === article.slug)
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : articles[articles.length - 1]
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : articles[0]

  // Share handlers
  const currentUrl = window.location.href
  const handleShare = (platform: string) => {
    let shareUrl = ''
    if (platform === 'fb') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
    } else if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(currentUrl)}`
    } else if (platform === 'wa') {
      shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' ' + currentUrl)}`
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`
    }
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=450')
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl)
    showToast('সংবাদের লিংক কপি করা হয়েছে!')
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentContent.trim()) return
    addComment(article.slug || article.id, commentName, commentContent)
    setCommentName('')
    setCommentContent('')
  }

  return (
    <div className="container detail-page-container">
      {/* Breadcrumbs */}
      <div className="detail-breadcrumbs">
        <span className="breadcrumb-link" onClick={navigateToHome}>হোম</span>
        <span>›</span>
        <span
          className="breadcrumb-link"
          onClick={() => navigateToCategory(article.categorySlug)}
        >
          {article.category}
        </span>
        <span>›</span>
        <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>
          {article.title}
        </span>
      </div>

      <div className="detail-layout-grid">
        {/* Main Article Content */}
        <div className="detail-main-content">
          <div className="detail-header">
            <span
              className="badge-pill"
              style={{
                background:
                  article.category === 'রাজনীতি'
                    ? 'var(--color-brand-red)'
                    : 'var(--color-primary)'
              }}
            >
              {article.category}
            </span>

            <h1 className="detail-title">{article.title}</h1>

            {article.subtitle && (
              <p className="detail-subtitle">{article.subtitle}</p>
            )}
          </div>

          {/* Author & Share Bar */}
          <div className="detail-author-bar">
            <div className="author-info-left">
              <div className="author-avatar">
                <img src={article.author.avatar || '/images/reporter-rakib.jpg'} alt={article.author.name} />
              </div>
              <div>
                <div className="author-name">রিপোর্টার: {article.author.name}</div>
                <div className="author-meta">
                  <span>{article.author.location}</span>
                  <span>•</span>
                  <span>{article.publishedAt}</span>
                </div>
              </div>
            </div>

            <div className="article-actions-right">
              {/* Social Share Circles */}
              <button
                className="social-share-circle share-fb"
                title="ফেসবুকে শেয়ার করুন"
                onClick={() => handleShare('fb')}
              >
                <FaFacebookF />
              </button>
              <button
                className="social-share-circle share-x"
                title="এক্সে (টুইটার) শেয়ার করুন"
                onClick={() => handleShare('twitter')}
              >
                <FaTwitter />
              </button>
              <button
                className="social-share-circle share-wa"
                title="হোয়াটসঅ্যাপে শেয়ার করুন"
                onClick={() => handleShare('wa')}
              >
                <FaWhatsapp />
              </button>
              <button
                className="social-share-circle share-in"
                title="লিঙ্কডইনে শেয়ার করুন"
                onClick={() => handleShare('linkedin')}
              >
                <FaLinkedinIn />
              </button>
              <button
                className="social-share-circle share-copy"
                title="লিংক কপি করুন"
                onClick={handleCopyLink}
              >
                <LinkIcon size={14} />
              </button>

              {/* Bookmark Button */}
              <button
                className={`action-pill-btn ${bookmarked ? 'active' : ''}`}
                onClick={() => toggleBookmark(article.id)}
                title={bookmarked ? 'সংরক্ষিত' : 'সংরক্ষণ করুন'}
              >
                <Bookmark size={15} fill={bookmarked ? 'currentColor' : 'none'} />
                <span>{bookmarked ? 'সংরক্ষিত' : 'সংরক্ষণ'}</span>
              </button>

              {/* Font Size Toggle */}
              <button
                className="action-pill-btn"
                onClick={cycleFontSize}
                title="ফন্ট সাইজ পরিবর্তন করুন"
              >
                <Type size={15} />
                <span>Aa পড়ার সুবিধা</span>
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="detail-featured-media">
            <div className="detail-image-box">
              <img src={article.image} alt={article.title} />
            </div>
            {article.imageCaption && (
              <p className="detail-caption">{article.imageCaption}</p>
            )}
          </div>

          {/* Article Body Content */}
          <div className={`article-body-content font-${fontSizeLevel}`}>
            {article.content.split('\n\n').map((paragraph, idx) => {
              // Quote block detection
              if (paragraph.startsWith('>')) {
                const quoteText = paragraph.replace(/>/g, '').trim()
                return (
                  <blockquote key={idx} className="quote-callout">
                    <p>“{quoteText}”</p>
                    <cite>— বঙ্গবন্ধু শেখ মুজিবুর রহমান, ৭ মার্চ ১৯৭১</cite>
                  </blockquote>
                )
              }
              return <p key={idx}>{paragraph}</p>
            })}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="article-tags-wrap">
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>ট্যাগ:</span>
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="tag-badge"
                  onClick={() => navigateToCategory('all')}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Previous / Next Article Navigation */}
          <div className="prev-next-nav">
            {prevArticle && (
              <div
                className="nav-card"
                onClick={() => navigateToArticle(prevArticle)}
              >
                <div className="nav-card-label">
                  <ChevronLeft size={14} /> পূর্ববর্তী সংবাদ
                </div>
                <div className="nav-card-title">{prevArticle.title}</div>
              </div>
            )}
            {nextArticle && (
              <div
                className="nav-card"
                onClick={() => navigateToArticle(nextArticle)}
                style={{ textAlign: 'right' }}
              >
                <div className="nav-card-label" style={{ justifyContent: 'flex-end' }}>
                  পরবর্তী সংবাদ <ChevronRight size={14} />
                </div>
                <div className="nav-card-title">{nextArticle.title}</div>
              </div>
            )}
          </div>

          {/* Comments Section */}
          <div className="comments-section">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <MessageSquare size={18} color="var(--color-primary)" />
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>মন্তব্য ({articleComments.length})</h3>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <input
                type="text"
                placeholder="আপনার নাম লিখুন..."
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-light)',
                  marginBottom: '10px',
                  fontSize: '13.5px'
                }}
              />
              <textarea
                className="comment-input"
                placeholder="আপনার গঠনমূলক মন্তব্য লিখুন..."
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                required
              />
              <button type="submit" className="comment-submit-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Send size={14} />
                <span>মন্তব্য প্রকাশ করুন</span>
              </button>
            </form>

            {/* Existing Comments */}
            <div className="comment-list">
              {articleComments.map((comm) => (
                <div key={comm.id} className="comment-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="comment-author">{comm.authorName}</div>
                    <span style={{ fontSize: '11px', color: 'var(--text-light)' }}>{comm.createdAt}</span>
                  </div>
                  <p className="comment-text">{comm.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar on Detail Page */}
        <aside className="detail-sidebar">
          {/* Related News Widget */}
          <div className="popular-card" style={{ marginBottom: '20px' }}>
            <div className="section-header">
              <h3 className="section-title" style={{ fontSize: '17px' }}>সম্পর্কিত সংবাদ</h3>
              <span
                className="view-all-link"
                onClick={() => navigateToCategory(article.categorySlug)}
              >
                সব দেখুন
              </span>
            </div>

            <div className="latest-news-list">
              {relatedList.map((rel) => (
                <div
                  key={rel.id}
                  className="news-list-item"
                  onClick={() => navigateToArticle(rel)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="news-list-thumb">
                    <img src={rel.image} alt={rel.title} />
                  </div>
                  <div className="news-list-content">
                    <span className="news-list-category">{rel.category}</span>
                    <h4 className="news-list-title" style={{ fontSize: '13px' }}>{rel.title}</h4>
                    <span className="news-list-time">{rel.timeAgo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weather Widget */}
          <div style={{ marginBottom: '20px' }}>
            <WeatherWidget />
          </div>

          {/* Newsletter Widget */}
          <div style={{ marginBottom: '20px' }}>
            <NewsletterWidget />
          </div>

          {/* Social Media Follow Section */}
          <div className="popular-card" style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '12px' }}>সোশ্যাল মিডিয়া</h4>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="social-share-circle share-fb"
                onClick={() => window.open('https://facebook.com', '_blank')}
              >
                <FaFacebookF />
              </button>
              <button
                className="social-share-circle share-fb"
                style={{ background: '#ff0000' }}
                onClick={() => window.open('https://youtube.com', '_blank')}
              >
                ▶
              </button>
              <button
                className="social-share-circle share-x"
                onClick={() => window.open('https://x.com', '_blank')}
              >
                <FaTwitter />
              </button>
              <button
                className="social-share-circle"
                style={{ background: '#e1306c' }}
                onClick={() => window.open('https://instagram.com', '_blank')}
              >
                📷
              </button>
            </div>
          </div>

          {/* Promo Card Banner */}
          <div className="promo-watermark-card">
            <img src="/logo.png" alt="Hello Desh" style={{ maxHeight: '36px', objectFit: 'contain' }} />
            <div className="promo-tagline">সত্য খবর, সবার আগে</div>
          </div>
        </aside>
      </div>
    </div>
  )
}
