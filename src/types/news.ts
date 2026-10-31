export interface NewsAuthor {
  name: string;
  role: string;
  location: string;
  avatar: string;
}

export interface NewsComment {
  id: string;
  articleId: string;
  authorName: string;
  avatar?: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  image: string;
  imageCaption?: string;
  publishedAt: string;
  timeAgo: string;
  author: NewsAuthor;
  views: number;
  tags: string[];
  isBreaking?: boolean;
  isHero?: boolean;
  isFeatured?: boolean;
  isPopular?: boolean;
  popularRank?: number;
  featuredOrder?: number;
  prevArticleId?: string;
  nextArticleId?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  count: number;
  description?: string;
}

export interface WeatherData {
  city: string;
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: string;
  forecast?: { day: string; temp: number; icon: string }[];
}
