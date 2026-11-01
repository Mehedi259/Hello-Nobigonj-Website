// Navigation menu items
export interface NavItem {
  id: string
  label: string
  href: string
  active?: boolean
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'হোম', href: '#', active: true },
  { id: 'hello-nobigonj', label: 'হ্যালো নবীগঞ্জ', href: '#hello-nobigonj' },
  { id: 'nobigonj-identity', label: 'নবীগঞ্জ পরিচিতি', href: '#nobigonj-identity' },
  { id: 'news', label: 'নিউজ', href: '#news' },
  { id: 'national', label: 'জাতীয়', href: '#national' },
  { id: 'entertainment', label: 'বিনোদন', href: '#entertainment' },
  { id: 'sports', label: 'খেলাধুলা', href: '#sports' },
]

// Stats section data
export interface StatItem {
  id: string
  icon: string
  value: string
  label: string
  sublabel?: string
}

export const STATS_DATA: StatItem[] = [
  {
    id: 'population',
    icon: '👥',
    value: '৪,৫৫,০৮৭',
    label: 'নবীগঞ্জের মানুষ',
    sublabel: '(আনুমানিক)',
  },
  {
    id: 'area',
    icon: '🗺️',
    value: '৪৩৯.৬০',
    label: 'বর্গ কিলোমিটার',
    sublabel: 'আয়তন',
  },
  {
    id: 'upazila',
    icon: '🏛️',
    value: '১টি',
    label: 'উপজেলা',
    sublabel: 'হবিগঞ্জ জেলা',
  },
  {
    id: 'union',
    icon: '🏘️',
    value: '১৩টি',
    label: 'ইউনিয়ন',
    sublabel: 'সমগ্র উপজেলা',
  },
  {
    id: 'municipality',
    icon: '🏙️',
    value: '১টি',
    label: 'পৌরসভা',
    sublabel: 'নবীগঞ্জ পৌরসভা',
  },
]

// Dignitaries (MP, Mayor/Administrator)
export interface PersonItem {
  id: string
  title: string
  name: string
  designation: string
}

export const PERSONS: PersonItem[] = [
  {
    id: 'mp',
    title: 'সংসদীয় আসন',
    name: 'হবিগঞ্জ-১',
    designation: '(নবীগঞ্জ-বাহুবল)',
  },
  {
    id: 'dc',
    title: 'পৌরসভা',
    name: 'পৌর প্রশাসক',
    designation: 'নবীগঞ্জ পৌরসভা',
  },
]

// Top places data
export interface PlaceItem {
  id: string
  image: string
  title: string
  location: string
}

export const TOP_PLACES: PlaceItem[] = [
  {
    id: 'tea-garden',
    image: '/images/tea-garden.jpg',
    title: 'দিনারপুর চা বাগান',
    location: 'সবুজ প্রকৃতির অনুপম সৌন্দর্য',
  },
  {
    id: 'kushiyara-river',
    image: '/images/kushiyara-river.jpg',
    title: 'কুশিয়ারা নদী',
    location: 'নবীগঞ্জের প্রাণরেখা ও ঐতিহ্য',
  },
  {
    id: 'mosque-shrine',
    image: '/images/mosque-shrine.jpg',
    title: 'হযরত শাহ তাজউদ্দিন (র.) আস্তানা',
    location: 'ঐতিহাসিক আধ্যাত্মিক কেন্দ্র',
  },
  {
    id: 'haor-wetland',
    image: '/images/haor-wetland.jpg',
    title: 'দিনারপুর পাহাড় ও হাওর',
    location: 'হাওরের নৈসর্গিক রূপ ও জীববৈচিত্র্য',
  },
  {
    id: 'nabiganj-bridge',
    image: '/images/nabiganj-bridge.jpg',
    title: 'কুশিয়ারা ও নবীগঞ্জ সেতু',
    location: 'যোগাযোগ ও বাণিজ্যের প্রতীক',
  },
  {
    id: 'village-heritage',
    image: '/images/village-heritage.jpg',
    title: 'গ্রামীণ ঐতিহ্য ও সংস্কৃতি',
    location: 'নবীগঞ্জের শেকড়ের লোকঐতিহ্য',
  },
]

// News articles for Hello Nobigonj section
export interface HelloNewsItem {
  id: string
  image: string
  title: string
  excerpt: string
  date: string
  views: string
  featured: boolean
}

export const HELLO_NEWS: HelloNewsItem[] = [
  {
    id: 'news-1',
    image: '/images/news-road.jpg',
    title: 'নবীগঞ্জে কুশিয়ারা সংযোগ ও নতুন সড়ক প্রকল্পের কাজ শুরু',
    excerpt: 'নবীগঞ্জ উপজেলায় টেকসই যোগাযোগ ব্যবস্থার উন্নয়ন এবং নদীভাঙন রোধে কুশিয়ারা নদীর তীরবর্তী নতুন সড়ক ও সংরক্ষণ বাঁধ প্রকল্পের কাজ আনুষ্ঠানিকভাবে শুরু...',
    date: '০১ নভেম্বর ২০২৬',
    views: '১.২K',
    featured: true,
  },
  {
    id: 'news-2',
    image: '/images/news-education.jpg',
    title: 'নবীগঞ্জে শিক্ষার মানোন্নয়নে নতুন মডেল কলেজের উদ্যোগ',
    excerpt: '',
    date: '৩১ অক্টোবর ২০২৬',
    views: '৮৪২',
    featured: false,
  },
  {
    id: 'news-3',
    image: '/images/news-development.jpg',
    title: 'নবীগঞ্জে কৃষকদের মুখে হাসি, বোরো ধানের বাম্পার ফলন',
    excerpt: '',
    date: '৩০ অক্টোবর ২০২৬',
    views: '১.১K',
    featured: false,
  },
  {
    id: 'news-4',
    image: '/images/haor-wetland.jpg',
    title: 'নবীগঞ্জে যুবসমাজের উদ্যোগে পরিষ্কার-পরিচ্ছন্নতা অভিযান',
    excerpt: '',
    date: '২৯ অক্টোবর ২০২৬',
    views: '৯৯০',
    featured: false,
  },
  {
    id: 'news-5',
    image: '/images/nabiganj-bridge.jpg',
    title: 'নবীগঞ্জ পৌরসভায় নাগরিক সেবা ডিজিটালাইজেশন কার্যক্রম শুরু',
    excerpt: '',
    date: '২৮ অক্টোবর ২০২৬',
    views: '১.৩K',
    featured: false,
  },
]

// Category News Types & Data
export interface CategoryNewsItem {
  id: string
  image: string
  title: string
  bullets?: string[]
}

export const NATIONAL_NEWS: CategoryNewsItem[] = [
  {
    id: 'nat-1',
    image: '/images/news-national.jpg',
    title: 'অর্থনৈতিক সংস্কারে সরকারের নতুন উদ্যোগ, জাতীয় উন্নয়নের গতি ত্বরান্বিত',
    bullets: [
      'নতুন বিনিয়োগ নীতি ও প্রবাসবান্ধব সুবিধা ঘোষণা',
      'শিল্পখাতে গ্যাস ও বিদ্যুৎ সরবরাহে বিশেষ অগ্রাধিকার',
      'সারাদেশে ডিজিটাল নাগরিক সেবার ব্যাপক সম্প্রসারণ',
    ],
  },
]

export const ENTERTAINMENT_NEWS: CategoryNewsItem[] = [
  {
    id: 'ent-1',
    image: '/images/news-cinema.jpg',
    title: 'আন্তর্জাতিক চলচ্চিত্র উৎসবে দেশের সিনেমার ভূয়সী প্রশংসা',
    bullets: [
      'দেশ-বিদেশের উৎসবে তরুণ নির্মাতাদের সৃজনশীল চমক',
      'বাঙালি সংস্কৃতির ঐতিহ্যবাহী গল্পে মুগ্ধ বিচারক মণ্ডলী',
    ],
  },
]

export const SPORTS_NEWS: CategoryNewsItem[] = [
  {
    id: 'sport-1',
    image: '/images/news-cricket.jpg',
    title: 'বিশ্বমঞ্চে নতুন কৌশলে জয়ের প্রস্তুতি নিচ্ছে বাংলাদেশ',
    bullets: [
      'শক্তিশালী ব্যাটিং লাইনআপ নিয়ে জোরদার কন্ডিশনিং ক্যাম্প',
      'অলরাউন্ডারদের নৈপুণ্যে ভর করে আত্মবিশ্বাসী টাইগার দল',
    ],
  },
]

// Weather data
export const WEATHER_DATA = {
  temperature: '৩০°C',
  condition: 'আংশিক মেঘলা',
  location: 'নবীগঞ্জ',
  humidity: '৭৬%',
  feelsLike: '৩৫°C',
  wind: '১৮ কিমি/ঘণ্টা',
  pressure: '১০১২ hPa',
}

// Marquee text
export const MARQUEE_TEXT = '🔴 হ্যালো নবীগঞ্জ | নবীগঞ্জ, হবিগঞ্জ, সিলেট | মানুষের জন্য, এলাকার জন্য সত্য ও বস্তুনিষ্ঠ সংবাদ | সার্বক্ষণিক নিউজ বুলেটিন'

// Footer links
export const FOOTER_LINKS = {
  quickLinks: [
    { label: 'হোম', href: '#' },
    { label: 'হ্যালো নবীগঞ্জ', href: '#hello-nobigonj' },
    { label: 'নবীগঞ্জ পরিচিতি', href: '#nobigonj-identity' },
    { label: 'বিজ্ঞাপন দিন', href: '#ads' },
    { label: 'বিনোদন', href: '#entertainment' },
    { label: 'খেলাধুলা', href: '#sports' },
  ],
  infoLinks: [
    { label: 'আমাদের সম্পর্কে', href: '#about' },
    { label: 'সম্পাদকীয় নীতি', href: '#editorial' },
    { label: 'বিজ্ঞাপন রেট', href: '#ads' },
    { label: 'গোপনীয়তা নীতি', href: '#privacy' },
    { label: 'ব্যবহারের শর্তাবলি', href: '#terms' },
    { label: 'যোগাযোগ ও ঠিকানা', href: '#contact' },
  ],
}

// Hero tags
export const HERO_TAGS = [
  { icon: '🌿', label: 'প্রকৃতি' },
  { icon: '👥', label: 'মানুষ' },
  { icon: '📜', label: 'ইতিহাস' },
  { icon: '🚀', label: 'উন্নয়ন' },
  { icon: '🎭', label: 'সম্ভাবনা' },
]
