import React, { useState } from 'react'
import { Mail, CheckCircle } from 'lucide-react'
import { useNews } from '../../context/NewsContext'

export const NewsletterWidget: React.FC = () => {
  const { subscribeNewsletter } = useNews()
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    const success = subscribeNewsletter(email)
    if (success) {
      setIsSubscribed(true)
      setEmail('')
    }
  }

  return (
    <div className="newsletter-card">
      <div className="newsletter-header">
        <Mail size={18} color="var(--color-primary-dark)" />
        <span>নিউজলেটার</span>
      </div>

      <p className="newsletter-desc">
        সর্বশেষ খবর সরাসরি আপনার ইমেইলে পেতে সাবস্ক্রাইব করুন
      </p>

      {isSubscribed ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', fontSize: '13px', padding: '10px 0', fontWeight: 600 }}>
          <CheckCircle size={18} />
          <span>সাবস্ক্রিপশন সম্পন্ন হয়েছে!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="newsletter-input"
            placeholder="আপনার ইমেইল লিখুন"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="newsletter-btn">
            সাবস্ক্রাইব করুন
          </button>
        </form>
      )}
    </div>
  )
}
