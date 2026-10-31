import React, { useState } from 'react'
import { Search, X, Clock, ArrowRight } from 'lucide-react'
import { useNews } from '../../context/NewsContext'

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, articles, navigateToArticle } = useNews()
  const [query, setQuery] = useState('')

  if (!isSearchOpen) return null

  const filtered = query.trim()
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          a.category.toLowerCase().includes(query.toLowerCase()) ||
          (a.tags && a.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())))
      )
    : articles.slice(0, 5)

  return (
    <div className="modal-overlay" onClick={() => setIsSearchOpen(false)}>
      <div
        className="search-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="search-modal-input-wrap">
          <Search size={20} color="var(--color-primary)" />
          <input
            type="text"
            className="search-modal-input"
            placeholder="খবর, বিভাগ বা বিষয় অনুসন্ধান করুন..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            style={{ color: 'var(--text-light)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="search-results-list">
          <div style={{ padding: '6px 12px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
            {query.trim() ? `অনুসন্ধানের ফলাফল (${filtered.length})` : 'সর্বশেষ খবর'}
          </div>

          {filtered.length === 0 ? (
            <div style={{ padding: '30px 12px', textAlign: 'center', color: 'var(--text-muted)' }}>
              কোনো সংবাদ পাওয়া যায়নি
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="search-result-item"
                onClick={() => {
                  navigateToArticle(item)
                  setIsSearchOpen(false)
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '56px', height: '42px', borderRadius: '4px', objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '11px', color: 'var(--color-primary)', fontWeight: 600 }}>
                    {item.category}
                  </span>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.3 }}>
                    {item.title}
                  </div>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Clock size={11} />
                  <span>{item.timeAgo}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
