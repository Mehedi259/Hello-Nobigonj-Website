import React, { useEffect, useState } from 'react'
import { Header } from './components/common/Header'
import { Footer } from './components/common/Footer'
import { SearchModal } from './components/common/SearchModal'
import { MobileBottomNav } from './components/common/MobileBottomNav'
import { InformationModal } from './components/common/InformationModal'
import { HomePage } from './pages/HomePage'
import { NewsDetail } from './components/news/NewsDetail'
import { CategoryPage } from './pages/CategoryPage'
import { BookmarksPage } from './pages/BookmarksPage'
import { useNews } from './context/NewsContext'
import { CheckCircle2 } from 'lucide-react'

export const App: React.FC = () => {
  const { currentView, toastMessage, setIsSearchOpen, showToast } = useNews()
  const [infoModalType, setInfoModalType] = useState<'about' | 'ads' | 'privacy' | 'contact' | null>(null)

  // Support Ctrl+K / Cmd+K hotkey for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setIsSearchOpen])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1 }}>
        {currentView === 'home' && <HomePage />}
        {currentView === 'detail' && <NewsDetail />}
        {currentView === 'category' && <CategoryPage />}
        {currentView === 'bookmarks' && <BookmarksPage />}
      </main>

      <Footer onOpenModal={(t) => setInfoModalType(t)} />
      <SearchModal />

      {/* App-like Mobile Bottom Navigation */}
      <MobileBottomNav onOpenInfoModal={(t) => setInfoModalType(t)} />

      {/* Shared Informational Modals (About, Ads, Privacy, Contact) */}
      <InformationModal
        type={infoModalType}
        onClose={() => setInfoModalType(null)}
        showToast={showToast}
      />

      {/* Floating Toast Message */}
      {toastMessage && (
        <div className="toast-container">
          <div className="toast-msg">
            <CheckCircle2 size={16} color="var(--color-primary-light)" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  )
}
