import { CategoryItem, WeatherData } from '../types/news'

export const CATEGORIES: CategoryItem[] = [
  { id: '1', name: 'জাতীয়', slug: 'national', iconName: 'Landmark', count: 482 },
  { id: '2', name: 'রাজনীতি', slug: 'politics', iconName: 'Megaphone', count: 261 },
  { id: '3', name: 'নবীগঞ্জ ও সিলেট', slug: 'nobigonj-sylhet', iconName: 'MapPin', count: 320 },
  { id: '4', name: 'প্রবাস', slug: 'probash', iconName: 'Plane', count: 245 },
  { id: '5', name: 'অর্থনীতি', slug: 'economy', iconName: 'TrendingUp', count: 185 },
  { id: '6', name: 'খেলাধুলা', slug: 'sports', iconName: 'Trophy', count: 164 },
  { id: '7', name: 'বিনোদন', slug: 'entertainment', iconName: 'Film', count: 142 },
  { id: '8', name: 'প্রযুক্তি', slug: 'technology', iconName: 'Cpu', count: 198 },
  { id: '9', name: 'মতামত', slug: 'opinion', iconName: 'FileText', count: 86 },
]

export const DEFAULT_WEATHER: WeatherData = {
  city: 'নবীগঞ্জ, সিলেট',
  temp: 28,
  condition: 'রোদ্রোজ্জ্বল',
  humidity: 62,
  windSpeed: 'বাতাস ৯ কিমি/ঘ.',
  forecast: [
    { day: 'আজ', temp: 28, icon: 'Sun' },
    { day: 'কাল', temp: 29, icon: 'CloudSun' },
    { day: 'পরশু', temp: 27, icon: 'CloudRain' },
  ]
}

