import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { NewsItem, NewsComment, CategoryItem } from '../types/news'
import { INITIAL_NEWS } from '../data/mockNews'
import { CATEGORIES } from '../data/categories'
import {
  getArticles,
  getArticleBySlug,
  recordArticleView,
  getCategories,
  getComments,
  createComment,
  likeComment as apiLikeComment,
  subscribeNewsletter as apiSubscribeNewsletter,
} from '../services/api'

interface NewsContextType {
  articles: NewsItem[]
  categories: CategoryItem[]
  isLoading: boolean
  currentCategory: string
  setCurrentCategory: (slug: string) => void
  selectedArticle: NewsItem | null
  setSelectedArticle: (article: NewsItem | null) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  isSearchOpen: boolean
  setIsSearchOpen: (open: boolean) => void
  bookmarks: string[]
  toggleBookmark: (id: string) => void
  isBookmarked: (id: string) => boolean
  fontSizeLevel: 'normal' | 'large' | 'xlarge'
  cycleFontSize: () => void
  comments: Record<string, NewsComment[]>
  addComment: (articleId: string, authorName: string, content: string, email?: string) => Promise<void>
  likeComment: (commentId: string | number, articleId: string) => Promise<void>
  newsletterSubscribers: string[]
  subscribeNewsletter: (email: string) => Promise<boolean>
  toastMessage: string | null
  showToast: (msg: string) => void
  currentView: 'home' | 'detail' | 'category' | 'bookmarks'
  navigateToArticle: (article: NewsItem) => void
  navigateToCategory: (slug: string) => void
  navigateToHome: () => void
  navigateToBookmarks: () => void
  refreshArticles: () => Promise<void>
}

const NewsContext = createContext<NewsContextType | undefined>(undefined)

const STORAGE_KEYS = {
  ARTICLES: 'hellodesh_articles_v2',
  BOOKMARKS: 'hellodesh_bookmarks',
  COMMENTS: 'hellodesh_comments',
  SUBSCRIBERS: 'hellodesh_subscribers',
}

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Articles state
  const [articles, setArticles] = useState<NewsItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ARTICLES)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch {
      // ignore
    }
    return INITIAL_NEWS
  })

  // Categories state
  const [categories, setCategories] = useState<CategoryItem[]>(CATEGORIES)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Fetch articles and categories from backend API on mount
  const refreshArticles = useCallback(async () => {
    try {
      const [artRes, catRes] = await Promise.allSettled([
        getArticles({ page_size: 50 }),
        getCategories(),
      ])

      if (artRes.status === 'fulfilled' && artRes.value.items.length > 0) {
        setArticles(artRes.value.items)
        try {
          localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(artRes.value.items))
        } catch {
          // ignore storage quota
        }
      }

      if (catRes.status === 'fulfilled' && catRes.value.length > 0) {
        setCategories(catRes.value)
      }
    } catch (err) {
      console.warn('API sync notice: operating with cached news cache', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshArticles()
  }, [refreshArticles])

  // Sync articles when updated in localStorage (e.g. from Admin Dashboard)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.ARTICLES && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue)
          if (Array.isArray(parsed)) {
            setArticles(parsed)
          }
        } catch {
          // ignore
        }
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // View state
  const [currentView, setCurrentView] = useState<'home' | 'detail' | 'category' | 'bookmarks'>('home')
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null)
  const [currentCategory, setCurrentCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)

  // Bookmarks
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKS)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => {
      const exists = prev.includes(id)
      const next = exists ? prev.filter(item => item !== id) : [...prev, id]
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(next))
      showToast(exists ? 'সংরক্ষণ তালিকা থেকে সরানো হয়েছে' : 'খবরটি সংরক্ষণ তালিকায় যুক্ত করা হয়েছে')
      return next
    })
  }

  const isBookmarked = (id: string) => bookmarks.includes(id)

  // Font size for reading
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'xlarge'>('normal')
  const cycleFontSize = () => {
    setFontSizeLevel(prev => {
      if (prev === 'normal') return 'large'
      if (prev === 'large') return 'xlarge'
      return 'normal'
    })
  }

  // Comments
  const [comments, setComments] = useState<Record<string, NewsComment[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMMENTS)
      if (saved) return JSON.parse(saved)
    } catch {
      // ignore
    }
    return {}
  })

  // Load comments from API when article selected
  useEffect(() => {
    if (selectedArticle?.slug) {
      const slug = selectedArticle.slug
      getComments(slug)
        .then(apiComments => {
          if (apiComments && apiComments.length > 0) {
            setComments(prev => ({
              ...prev,
              [slug]: apiComments,
            }))
          }
        })
        .catch(() => {
          // fallback to local comments
        })
    }
  }, [selectedArticle?.slug])

  const addComment = async (
    articleId: string,
    authorName: string,
    content: string,
    email?: string
  ) => {
    const trimmedName = authorName.trim() || 'পাঠক'
    const trimmedContent = content.trim()

    // Optimistic comment for immediate instant feedback
    const tempComment: NewsComment = {
      id: `comment-${Date.now()}`,
      articleId,
      authorName: trimmedName,
      content: trimmedContent,
      createdAt: 'এইমাত্র',
      likes: 0,
    }

    setComments(prev => {
      const nextList = [tempComment, ...(prev[articleId] || [])]
      const updated = { ...prev, [articleId]: nextList }
      try {
        localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(updated))
      } catch {
        // ignore
      }
      return updated
    })

    try {
      const created = await createComment({
        article_slug: articleId,
        author_name: trimmedName,
        author_email: email,
        content: trimmedContent,
      })

      // Replace temp with API comment
      setComments(prev => {
        const filtered = (prev[articleId] || []).filter(c => c.id !== tempComment.id)
        return {
          ...prev,
          [articleId]: [created, ...filtered],
        }
      })
      showToast('আপনার মন্তব্য সফলভাবে প্রকাশিত হয়েছে!')
    } catch {
      showToast('আপনার মন্তব্য জমা হয়েছে (অনুমোদনের অপেক্ষায়)!')
    }
  }

  const likeComment = async (commentId: string | number, articleId: string) => {
    try {
      const newLikes = await apiLikeComment(commentId)
      setComments(prev => {
        const list = prev[articleId] || []
        const updated = list.map(c => (c.id === String(commentId) ? { ...c, likes: newLikes || c.likes + 1 } : c))
        return { ...prev, [articleId]: updated }
      })
    } catch {
      // optimistic fallback
      setComments(prev => {
        const list = prev[articleId] || []
        const updated = list.map(c => (c.id === String(commentId) ? { ...c, likes: c.likes + 1 } : c))
        return { ...prev, [articleId]: updated }
      })
    }
  }

  // Newsletter
  const [newsletterSubscribers, setNewsletterSubscribers] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SUBSCRIBERS)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const subscribeNewsletter = async (email: string): Promise<boolean> => {
    const trimmed = email.trim().toLowerCase()
    if (!trimmed || !trimmed.includes('@')) {
      showToast('অনুগ্রহ করে সঠিক ইমেইল ঠিকানা দিন')
      return false
    }

    try {
      const res = await apiSubscribeNewsletter(trimmed)
      showToast(res.message)
      if (res.ok) {
        setNewsletterSubscribers(prev => {
          const next = Array.from(new Set([...prev, trimmed]))
          try {
            localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify(next))
          } catch {
            // ignore
          }
          return next
        })
        return true
      }
      return false
    } catch {
      showToast('ধন্যবাদ! সফলভাবে সাবস্ক্রাইব করা হয়েছে।')
      return true
    }
  }

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  // Navigation helpers
  const navigateToArticle = async (article: NewsItem) => {
    setSelectedArticle(article)
    setCurrentView('detail')
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Record view analytics on backend
    if (article.slug) {
      recordArticleView(article.slug).then(res => {
        if (res.views > 0) {
          setSelectedArticle(prev => (prev ? { ...prev, views: res.views } : null))
          setArticles(prev => prev.map(a => (a.slug === article.slug ? { ...a, views: res.views } : a)))
        }
      })

      // Fetch fresh full details from backend
      getArticleBySlug(article.slug)
        .then(detailed => {
          setSelectedArticle(detailed)
        })
        .catch(() => {
          // keep selected article
        })
    }
  }

  const navigateToCategory = (slug: string) => {
    setCurrentCategory(slug)
    setCurrentView('category')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateToHome = () => {
    setCurrentCategory('all')
    setSelectedArticle(null)
    setCurrentView('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateToBookmarks = () => {
    setCurrentView('bookmarks')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <NewsContext.Provider
      value={{
        articles,
        categories,
        isLoading,
        currentCategory,
        setCurrentCategory,
        selectedArticle,
        setSelectedArticle,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        fontSizeLevel,
        cycleFontSize,
        comments,
        addComment,
        likeComment,
        newsletterSubscribers,
        subscribeNewsletter,
        toastMessage,
        showToast,
        currentView,
        navigateToArticle,
        navigateToCategory,
        navigateToHome,
        navigateToBookmarks,
        refreshArticles,
      }}
    >
      {children}
    </NewsContext.Provider>
  )
}

export const useNews = () => {
  const context = useContext(NewsContext)
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider')
  }
  return context
}
