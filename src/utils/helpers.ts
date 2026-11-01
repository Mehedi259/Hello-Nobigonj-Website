/**
 * Format a number with Bengali numerals
 */
export const toBengaliNumber = (num: number | string): string => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
  return String(num).replace(/[0-9]/g, (d) => bengaliDigits[parseInt(d, 10)])
}

/**
 * Get current Bengali date string
 */
export const getBengaliDate = (): string => {
  const months = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ]
  const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার']
  const now = new Date()
  return `${days[now.getDay()]}, ${toBengaliNumber(now.getDate())} ${months[now.getMonth()]} ${toBengaliNumber(now.getFullYear())}`
}

/**
 * Truncate text to a max length
 */
export const truncateText = (text: string, maxLength: number = 100): string => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}
