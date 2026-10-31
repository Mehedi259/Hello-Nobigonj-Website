import React, { useState } from 'react'
import {
  Home,
  Grid,
  Search,
  Bookmark,
  Menu,
  X,
  ExternalLink,
  Type,
  CloudSun,
  ShieldCheck,
  Phone,
  FileText,
  ChevronRight
} from 'lucide-react'
import { useNews } from '../../context/NewsContext'
import { CATEGORIES } from '../../data/categories'

export const MobileBottomNav: React.FC<{ onOpenInfoModal?: (type: 'about' | 'ads' | 'privacy' | 'contact') => void }> = ({ onOpenInfoModal }) => {
  const {
    currentView,
    currentCategory,
    navigateToHome,
    navigateToCategory,
    navigateToBookmarks,
    setIsSearchOpen,
    bookmarks,
    articles,
    fontSizeLevel,
    cycleFontSize,
    showToast
  } = useNews()

  const [categorySheetOpen, setCategorySheetOpen] = useState(false)
  const [menuSheetOpen, setMenuSheetOpen] = useState(false)

  const handleOpenCategories = () => {
    setMenuSheetOpen(false)
    setCategorySheetOpen(true)
  }

  const handleOpenMenu = () => {
    setCategorySheetOpen(false)
    setMenuSheetOpen(true)
  }

  const handleSelectCategory = (slug: string) => {
    navigateToCategory(slug)
    setCategorySheetOpen(false)
  }

  const handleCategorySheetClose = () => {
    setCategorySheetOpen(false)
  }

  const handleMenuSheetClose = () => {
    setMenuSheetOpen(false)
  }

  // Count articles per category
  const getCategoryCount = (slug: string) => {
    return articles.filter(a => a.categorySlug === slug).length
  }

  return (
    <>
      {/* App-like Fixed Mobile Bottom Navigation Bar */}
      <nav className="mobile-bottom-nav" aria-label="মোবাইল নেভিগেশন">
        <div className="mobile-nav-container">
          {/* 1. Home */}
          <button
            type="button"
            className={`mobile-nav-item ${currentView === 'home' && !categorySheetOpen && !menuSheetOpen ? 'active' : ''}`}
            onClick={() => {
              handleCategorySheetClose()
              handleMenuSheetClose()
              navigateToHome()
            }}
            aria-label="হোম"
          >
            <div className="mobile-nav-icon-wrap">
              <Home size={21} strokeWidth={currentView === 'home' ? 2.4 : 1.9} />
            </div>
            <span className="mobile-nav-label">হোম</span>
          </button>

          {/* 2. Categories */}
          <button
            type="button"
            className={`mobile-nav-item ${(currentView === 'category' || categorySheetOpen) && !menuSheetOpen ? 'active' : ''}`}
            onClick={handleOpenCategories}
            aria-label="বিভাগসমূহ"
          >
            <div className="mobile-nav-icon-wrap">
              <Grid size={21} strokeWidth={categorySheetOpen ? 2.4 : 1.9} />
            </div>
            <span className="mobile-nav-label">বিভাগ</span>
          </button>

          {/* 3. Search */}
          <button
            type="button"
            className="mobile-nav-item search-tab"
            onClick={() => {
              handleCategorySheetClose()
              handleMenuSheetClose()
              setIsSearchOpen(true)
            }}
            aria-label="অনুসন্ধান"
          >
            <div className="mobile-nav-icon-wrap search-circle">
              <Search size={20} strokeWidth={2.4} />
            </div>
            <span className="mobile-nav-label">খুঁজুন</span>
          </button>

          {/* 4. Bookmarks */}
          <button
            type="button"
            className={`mobile-nav-item ${currentView === 'bookmarks' && !categorySheetOpen && !menuSheetOpen ? 'active' : ''}`}
            onClick={() => {
              handleCategorySheetClose()
              handleMenuSheetClose()
              navigateToBookmarks()
            }}
            aria-label="সংরক্ষিত"
          >
            <div className="mobile-nav-icon-wrap" style={{ position: 'relative' }}>
              <Bookmark size={21} strokeWidth={currentView === 'bookmarks' ? 2.4 : 1.9} />
              {bookmarks.length > 0 && (
                <span className="mobile-nav-badge">{bookmarks.length}</span>
              )}
            </div>
            <span className="mobile-nav-label">সংরক্ষিত</span>
          </button>

          {/* 5. Menu / More */}
          <button
            type="button"
            className={`mobile-nav-item ${menuSheetOpen ? 'active' : ''}`}
            onClick={handleOpenMenu}
            aria-label="আরও মেনু"
          >
            <div className="mobile-nav-icon-wrap">
              <Menu size={21} strokeWidth={menuSheetOpen ? 2.4 : 1.9} />
            </div>
            <span className="mobile-nav-label">মেনু</span>
          </button>
        </div>
      </nav>

      {/* Category Bottom Sheet Modal */}
      {categorySheetOpen && (
        <div className="mobile-sheet-overlay" onClick={handleCategorySheetClose}>
          <div className="mobile-sheet-card" onClick={e => e.stopPropagation()}>
            <div className="mobile-sheet-header">
              <div className="mobile-sheet-pill-handle"></div>
              <div className="mobile-sheet-title-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Grid size={18} color="var(--color-brand-red)" />
                  <h3>সংবাদের সকল বিভাগ</h3>
                </div>
                <button
                  className="mobile-sheet-close-btn"
                  onClick={handleCategorySheetClose}
                  aria-label="বন্ধ করুন"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="mobile-sheet-body">
              <div className="mobile-category-grid">
                <button
                  className={`mobile-cat-pill ${currentCategory === 'all' ? 'active' : ''}`}
                  onClick={() => {
                    navigateToHome()
                    handleCategorySheetClose()
                  }}
                >
                  <span className="mobile-cat-name">সব খবর (মূল পাতা)</span>
                  <span className="mobile-cat-badge">{articles.length}</span>
                </button>

                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    className={`mobile-cat-pill ${currentCategory === cat.slug ? 'active' : ''}`}
                    onClick={() => handleSelectCategory(cat.slug)}
                  >
                    <span className="mobile-cat-name">{cat.name}</span>
                    <span className="mobile-cat-badge">{getCategoryCount(cat.slug)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* More Options / Settings Bottom Sheet Modal */}
      {menuSheetOpen && (
        <div className="mobile-sheet-overlay" onClick={handleMenuSheetClose}>
          <div className="mobile-sheet-card" onClick={e => e.stopPropagation()}>
            <div className="mobile-sheet-header">
              <div className="mobile-sheet-pill-handle"></div>
              <div className="mobile-sheet-title-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img src="/logo.png" alt="Hello Desh" style={{ height: '20px', objectFit: 'contain' }} />
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#64748b' }}>মেনু ও সেটিংস</span>
                </div>
                <button
                  className="mobile-sheet-close-btn"
                  onClick={handleMenuSheetClose}
                  aria-label="বন্ধ করুন"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="mobile-sheet-body">
              {/* Quick Actions Grid */}
              <div className="mobile-menu-quick-actions">
                <button
                  className="quick-action-item"
                  onClick={() => {
                    cycleFontSize()
                    showToast(`ফন্ট সাইজ: ${fontSizeLevel === 'normal' ? 'বড়' : fontSizeLevel === 'large' ? 'অতি বড়' : 'সাধারণ'}`)
                  }}
                >
                  <Type size={20} color="var(--color-primary)" />
                  <span>ফন্ট সাইজ ({fontSizeLevel === 'normal' ? 'সাধারণ' : fontSizeLevel === 'large' ? 'বড়' : 'অতি বড়'})</span>
                </button>

                <a
                  href="https://admin.hellodesh.com"
                  target="_blank"
                  rel="noreferrer"
                  className="quick-action-item admin-highlight"
                >
                  <ExternalLink size={20} color="var(--color-brand-red)" />
                  <span>অ্যাডমিন ড্যাশবোর্ড</span>
                </a>
              </div>

              {/* Informational Links */}
              <div className="mobile-menu-links-list">
                <button
                  className="mobile-menu-row"
                  onClick={() => {
                    handleMenuSheetClose()
                    onOpenInfoModal?.('about')
                  }}
                >
                  <div className="mobile-menu-row-left">
                    <FileText size={18} color="#64748b" />
                    <span>আমাদের সম্পর্কে</span>
                  </div>
                  <ChevronRight size={16} color="#94a3b8" />
                </button>

                <button
                  className="mobile-menu-row"
                  onClick={() => {
                    handleMenuSheetClose()
                    onOpenInfoModal?.('contact')
                  }}
                >
                  <div className="mobile-menu-row-left">
                    <Phone size={18} color="#64748b" />
                    <span>যোগাযোগ ও বার্তা বিভাগ</span>
                  </div>
                  <ChevronRight size={16} color="#94a3b8" />
                </button>

                <button
                  className="mobile-menu-row"
                  onClick={() => {
                    handleMenuSheetClose()
                    onOpenInfoModal?.('ads')
                  }}
                >
                  <div className="mobile-menu-row-left">
                    <CloudSun size={18} color="#64748b" />
                    <span>বিজ্ঞাপন ও বাণিজ্যিক তথ্য</span>
                  </div>
                  <ChevronRight size={16} color="#94a3b8" />
                </button>

                <button
                  className="mobile-menu-row"
                  onClick={() => {
                    handleMenuSheetClose()
                    onOpenInfoModal?.('privacy')
                  }}
                >
                  <div className="mobile-menu-row-left">
                    <ShieldCheck size={18} color="#64748b" />
                    <span>গোপনীয়তা ও শর্তাবলী</span>
                  </div>
                  <ChevronRight size={16} color="#94a3b8" />
                </button>
              </div>

              {/* App Version / Credit */}
              <div className="mobile-menu-footer-credits">
                <p>© ২০২৬ হ্যালো দেশ | সত্য খবর, সবার আগে</p>
                <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>মোবাইল ওয়েব সংস্করণ ২.০</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
