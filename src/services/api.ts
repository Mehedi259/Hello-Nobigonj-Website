/**
 * Hello Desh REST API Service Client
 * Senior-Architected API integration for Hello Desh News Portal
 * Production Base URL: https://api.hellodesh.com/api/v1
 */

import { NewsItem, NewsComment, CategoryItem } from '../types/news'

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '') ||
  (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:8015/api/v1'
    : 'https://api.hellonabiganj.com/api/v1')

const DEFAULT_HEADERS: HeadersInit = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

interface PaginatedResponse<T> {
  count: number
  total_pages: number
  current_page: number
  next: string | null
  previous: string | null
  results: T[]
}

interface RawBackendArticle {
  id: number | string
  title: string
  slug: string
  subtitle?: string | null
  excerpt: string
  content?: string
  category: string
  categorySlug: string
  category_id?: number
  category_color?: string
  image: string
  image_caption?: string | null
  author?: {
    id: number
    name: string
    role: string
    location: string
    avatar: string
  }
  author_name?: string
  status: string
  views: number
  tags?: string[]
  publishedAt?: string
  publishedDate?: string
  timeAgo?: string
  readTime?: string
  isHero?: boolean
  isBreaking?: boolean
  isFeatured?: boolean
  isPopular?: boolean
  featuredOrder?: number
  popularRank?: number
  prev_article?: { id: number; title: string; slug: string } | null
  next_article?: { id: number; title: string; slug: string } | null
  comments_count?: number
}

interface RawBackendCategory {
  id: number
  name: string
  name_en?: string
  slug: string
  icon_name?: string
  color?: string
  description?: string | null
  order?: number
  article_count?: number
  count?: number
}

interface RawBackendComment {
  id: number | string
  article: number | string
  articleId?: string
  article_title?: string
  article_slug?: string
  author_name: string
  authorName?: string
  author_email?: string
  avatar_url?: string | null
  content: string
  likes: number
  status: string
  time_ago?: string
  createdAt?: string
  created_at?: string
}

/**
 * Normalizes backend article response to NewsItem interface
 */
export function normalizeArticle(raw: RawBackendArticle): NewsItem {
  return {
    id: String(raw.id),
    title: raw.title || '',
    slug: raw.slug || '',
    subtitle: raw.subtitle || undefined,
    excerpt: raw.excerpt || '',
    content: raw.content || raw.excerpt || '',
    category: raw.category || 'জাতীয়',
    categorySlug: raw.categorySlug || 'national',
    image: raw.image || '/images/padma-bridge.jpg',
    imageCaption: raw.image_caption || undefined,
    publishedAt: raw.publishedAt || raw.publishedDate || 'আজ',
    timeAgo: raw.timeAgo || 'কিছুক্ষণ আগে',
    author: {
      name: raw.author?.name || raw.author_name || 'ডেস্ক রিপোর্ট',
      role: raw.author?.role || 'প্রধান প্রতিবেদক',
      location: raw.author?.location || 'ঢাকা',
      avatar: raw.author?.avatar || '/images/reporter-rakib.jpg',
    },
    views: typeof raw.views === 'number' ? raw.views : 0,
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    isBreaking: Boolean(raw.isBreaking),
    isHero: Boolean(raw.isHero),
    isFeatured: Boolean(raw.isFeatured),
    isPopular: Boolean(raw.isPopular),
    popularRank: raw.popularRank || 0,
    featuredOrder: raw.featuredOrder || 0,
    prevArticleId: raw.prev_article?.slug,
    nextArticleId: raw.next_article?.slug,
  }
}

/**
 * Normalizes backend comment response to NewsComment interface
 */
export function normalizeComment(raw: RawBackendComment): NewsComment {
  return {
    id: String(raw.id),
    articleId: String(raw.article_slug || raw.articleId || raw.article),
    authorName: raw.author_name || raw.authorName || 'পাঠক',
    avatar: raw.avatar_url || undefined,
    content: raw.content || '',
    createdAt: raw.time_ago || raw.createdAt || 'এইমাত্র',
    likes: raw.likes || 0,
  }
}

/**
 * Normalizes backend category response to CategoryItem interface
 */
export function normalizeCategory(raw: RawBackendCategory): CategoryItem {
  return {
    id: String(raw.id),
    name: raw.name,
    slug: raw.slug,
    iconName: raw.icon_name || 'Globe',
    count: raw.article_count ?? raw.count ?? 0,
    description: raw.description || undefined,
  }
}

// -------------------------------------------------------------
// Articles API
// -------------------------------------------------------------

export async function getArticles(params?: {
  category?: string
  category_id?: number
  search?: string
  is_breaking?: boolean
  is_hero?: boolean
  is_featured?: boolean
  is_popular?: boolean
  page?: number
  page_size?: number
}): Promise<{ items: NewsItem[]; total: number }> {
  const query = new URLSearchParams()
  if (params?.category && params.category !== 'all') query.set('category', params.category)
  if (params?.category_id) query.set('category_id', String(params.category_id))
  if (params?.search) query.set('search', params.search)
  if (params?.is_breaking !== undefined) query.set('is_breaking', String(params.is_breaking))
  if (params?.is_hero !== undefined) query.set('is_hero', String(params.is_hero))
  if (params?.is_featured !== undefined) query.set('is_featured', String(params.is_featured))
  if (params?.is_popular !== undefined) query.set('is_popular', String(params.is_popular))
  if (params?.page) query.set('page', String(params.page))
  query.set('page_size', String(params?.page_size || 50))

  const res = await fetch(`${API_BASE_URL}/articles/?${query.toString()}`, {
    headers: DEFAULT_HEADERS,
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch articles: ${res.statusText}`)
  }

  const data: PaginatedResponse<RawBackendArticle> = await res.json()
  return {
    items: data.results.map(normalizeArticle),
    total: data.count,
  }
}

export async function getArticleBySlug(slug: string): Promise<NewsItem> {
  const res = await fetch(`${API_BASE_URL}/articles/${encodeURIComponent(slug)}/`, {
    headers: DEFAULT_HEADERS,
  })

  if (!res.ok) {
    throw new Error(`Article not found: ${slug}`)
  }

  const raw: RawBackendArticle = await res.json()
  return normalizeArticle(raw)
}

export async function recordArticleView(slug: string): Promise<{ views: number }> {
  try {
    const res = await fetch(`${API_BASE_URL}/articles/${encodeURIComponent(slug)}/view/`, {
      method: 'POST',
      headers: DEFAULT_HEADERS,
    })
    if (res.ok) {
      const data = await res.json()
      return { views: data.views }
    }
  } catch (err) {
    // silently fail analytics increment without disrupting reader UX
    console.debug('Failed to record article view count:', err)
  }
  return { views: 0 }
}

// -------------------------------------------------------------
// Categories API
// -------------------------------------------------------------

export async function getCategories(): Promise<CategoryItem[]> {
  const res = await fetch(`${API_BASE_URL}/categories/`, {
    headers: DEFAULT_HEADERS,
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.statusText}`)
  }

  const data: PaginatedResponse<RawBackendCategory> = await res.json()
  return data.results.map(normalizeCategory)
}

// -------------------------------------------------------------
// Comments API
// -------------------------------------------------------------

export async function getComments(articleSlug?: string): Promise<NewsComment[]> {
  const query = new URLSearchParams()
  if (articleSlug) query.set('article__slug', articleSlug)
  query.set('status', 'Approved')

  const res = await fetch(`${API_BASE_URL}/comments/?${query.toString()}`, {
    headers: DEFAULT_HEADERS,
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch comments: ${res.statusText}`)
  }

  const data: PaginatedResponse<RawBackendComment> = await res.json()
  return data.results.map(normalizeComment)
}

export async function createComment(payload: {
  article_slug?: string
  article_id?: number | string
  author_name: string
  author_email?: string
  content: string
}): Promise<NewsComment> {
  // Look up article ID if slug provided and id is not numeric
  let numericArticleId = typeof payload.article_id === 'number' ? payload.article_id : null

  if (!numericArticleId && payload.article_slug) {
    try {
      const art = await getArticleBySlug(payload.article_slug)
      numericArticleId = Number(art.id)
    } catch {
      // fallback
    }
  }

  const bodyData: Record<string, unknown> = {
    author_name: payload.author_name.trim() || 'পাঠক',
    author_email: payload.author_email?.trim() || 'reader@hellodesh.com',
    content: payload.content.trim(),
  }

  if (numericArticleId) {
    bodyData.article = numericArticleId
  }

  const res = await fetch(`${API_BASE_URL}/comments/`, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(bodyData),
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Failed to submit comment: ${errorText}`)
  }

  const raw: RawBackendComment = await res.json()
  return normalizeComment(raw)
}

export async function likeComment(commentId: string | number): Promise<number> {
  const res = await fetch(`${API_BASE_URL}/comments/${commentId}/like/`, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
  })

  if (res.ok) {
    const data = await res.json()
    return data.likes
  }
  return 0
}

// -------------------------------------------------------------
// Newsletter Subscribers API
// -------------------------------------------------------------

export async function subscribeNewsletter(email: string): Promise<{ message: string; ok: boolean }> {
  const res = await fetch(`${API_BASE_URL}/subscribers/`, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ email: email.trim().toLowerCase() }),
  })

  const data = await res.json().catch(() => ({}))
  if (res.ok) {
    return {
      message: data.message || 'ধন্যবাদ! সফলভাবে সাবস্ক্রাইব করা হয়েছে।',
      ok: true,
    }
  }
  return {
    message: data.error || data.message || 'সাবস্ক্রিপশন ব্যর্থ হয়েছে। পুনরায় চেষ্টা করুন।',
    ok: false,
  }
}

// -------------------------------------------------------------
// Contact Messages API
// -------------------------------------------------------------

export async function submitContactMessage(payload: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}): Promise<{ ok: boolean; message: string }> {
  const res = await fetch(`${API_BASE_URL}/settings/contact/`, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(payload),
  })

  if (res.ok) {
    return { ok: true, message: 'আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে।' }
  }
  return { ok: false, message: 'বার্তা পাঠানো সম্ভব হয়নি। পুনরায় চেষ্টা করুন।' }
}

// -------------------------------------------------------------
// Site Settings API
// -------------------------------------------------------------

export async function getSiteSettings(): Promise<Record<string, unknown>> {
  const res = await fetch(`${API_BASE_URL}/settings/`, {
    headers: DEFAULT_HEADERS,
  })

  if (res.ok) {
    return res.json()
  }
  return {}
}
