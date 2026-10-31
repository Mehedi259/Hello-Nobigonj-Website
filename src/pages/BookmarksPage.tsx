import React from 'react'
import { Bookmark, ArrowLeft, Trash2, Clock } from 'lucide-react'
import { useNews } from '../context/NewsContext'

export const BookmarksPage: React.FC = () => {
  const { bookmarks, articles, navigateToArticle, navigateToHome, toggleBookmark } = useNews()

  const bookmarkedArticles = articles.filter((a) => bookmarks.includes(a.id))

  return (
    <div className="container" style={{ padding: '24px 16px 60px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '16px', borderBottom: '2px solid var(--border-light)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={navigateToHome} className="action-btn" title="হোমে ফিরে যান">
            <ArrowLeft size={18} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bookmark size={24} color="var(--color-primary)" />
            <h1 style={{ fontSize: '26px', fontWeight: 800 }}>সংরক্ষিত সংবাদ</h1>
          </div>
          <span style={{ fontSize: '13px', fontWeight: 600, background: 'var(--color-primary-soft)', color: 'var(--color-primary)', padding: '3px 10px', borderRadius: '9999px' }}>
            {bookmarkedArticles.length} টি খবর
          </span>
        </div>
      </div>

      {bookmarkedArticles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', background: '#fff', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
          <Bookmark size={48} color="var(--text-light)" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>আপনার কোনো সংরক্ষিত খবর নেই</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>
            যেকোনো সংবাদের বুকমার্ক বাটনে ক্লিক করে পরে পড়ার জন্য এখানে সংরক্ষণ করুন।
          </p>
          <button
            onClick={navigateToHome}
            className="hero-btn"
            style={{ margin: '0 auto' }}
          >
            হোমপেজে যান
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {bookmarkedArticles.map((item) => (
            <div
              key={item.id}
              className="featured-card"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div onClick={() => navigateToArticle(item)} style={{ cursor: 'pointer' }}>
                <div className="featured-card-image" style={{ height: '180px' }}>
                  <img src={item.image} alt={item.title} />
                  <span className="featured-card-badge" style={{ background: 'var(--color-primary)' }}>
                    {item.category}
                  </span>
                </div>
                <div style={{ padding: '16px' }}>
                  <h3 className="featured-card-title" style={{ fontSize: '16px' }}>{item.title}</h3>
                  <p className="featured-card-excerpt" style={{ fontSize: '13px' }}>{item.excerpt}</p>
                </div>
              </div>

              <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} /> {item.timeAgo}
                </span>
                <button
                  onClick={() => toggleBookmark(item.id)}
                  style={{ color: 'var(--color-brand-red)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600 }}
                  title="মুছে ফেলুন"
                >
                  <Trash2 size={14} />
                  <span>মুছুন</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
