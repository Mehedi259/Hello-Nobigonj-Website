import React, { useState } from 'react'
import { X, Send, CheckCircle2 } from 'lucide-react'

interface Props {
  type: 'about' | 'ads' | 'privacy' | 'contact' | null
  onClose: () => void
  showToast: (msg: string) => void
}

export const InformationModal: React.FC<Props> = ({ type, onClose, showToast }) => {
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMsg, setContactMsg] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!type) return null

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    showToast('আপনার বার্তা সফলভাবে গ্রহণ করা হয়েছে!')
    setTimeout(() => {
      onClose()
      setSubmitted(false)
    }, 1500)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="search-modal-box"
        style={{ maxWidth: '580px', padding: '24px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
            {type === 'about' && 'আমাদের সম্পর্কে | Hello Desh'}
            {type === 'ads' && 'বিজ্ঞাপন ও বাণিজ্যিক তথ্য | Hello Desh'}
            {type === 'privacy' && 'গোপনীয়তা ও ডেটা সুরক্ষা নীতি'}
            {type === 'contact' && 'যোগাযোগ ও বার্তা প্রেরণ'}
          </h3>
          <button onClick={onClose} style={{ color: 'var(--text-light)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {type === 'about' && (
          <div style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
            <p style={{ marginBottom: '12px' }}>
              <strong>হ্যালো দেশ (Hello Desh)</strong> বাংলাদেশের নিরপেক্ষ, বস্তুনিষ্ঠ ও আধুনিক ডিজিটাল সংবাদ মাধ্যম। "সত্যের পক্ষে, মানুষের পাশে" স্লোগান নিয়ে আমরা দেশের উন্নয়ন, তারুণ্যের সম্ভাবনা, রাজনীতি, অর্থনীতি ও প্রযুক্তি খাতের বস্তুনিষ্ঠ সংবাদ পরিবেশন করি।
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong>সম্পাদক ও প্রকাশক:</strong> মেহেদী হাসান<br />
              <strong>বার্তা প্রধান:</strong> মোহাম্মদ রাকিব<br />
              <strong>প্রধান কার্যালয়:</strong> কাওরান বাজার, ঢাকা-১২১৫, বাংলাদেশ।
            </p>
          </div>
        )}

        {type === 'ads' && (
          <div style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
            <p style={{ marginBottom: '12px' }}>
              হ্যালো দেশ পোর্টালে প্রতিদিন লক্ষাধিক পাঠক দেশ ও বিদেশের সর্বশেষ সংবাদ পড়েন। আপনার ব্র্যান্ড বা পণ্যের প্রসারে আমরা অফার করছি:
            </p>
            <ul style={{ paddingLeft: '20px', marginBottom: '14px' }}>
              <li>টপ ব্যানার ও হেডার স্পনসরশিপ</li>
              <li>নিউজলেটার স্পনসরড স্টোরি</li>
              <li>ভিডিও ও সোশ্যাল মিডিয়া প্রোমোশন</li>
            </ul>
            <p style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
              বিজ্ঞাপন বুকিংয়ের জন্য যোগাযোগ: ads@hellodesh.com | ফোন: +৮৮০ ১৯১২-৩৪৫৬৭৮
            </p>
          </div>
        )}

        {type === 'privacy' && (
          <div style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
            <p style={{ marginBottom: '12px' }}>
              হ্যালো দেশ পোর্টাল পাঠকের ব্যক্তিগত তথ্যের সুরক্ষাকে সর্বোচ্চ অগ্রাধিকার দেয়।
            </p>
            <p style={{ marginBottom: '12px' }}>
              ১. আমরা কোনো পাঠকের ব্যক্তিগত তথ্য তৃতীয় পক্ষের কাছে বিক্রয় বা হস্তান্তর করি না।<br />
              ২. নিউজলেটার সাবস্ক্রিপশনের ইমেইল শুধুমাত্র দৈনিক সংবাদ প্রেরণে ব্যবহৃত হয়।<br />
              ৩. ব্রাউজিং অভিজ্ঞতার উন্নতির স্বার্থে কুকিজ সংরক্ষিত হয়।
            </p>
          </div>
        )}

        {type === 'contact' && (
          <div>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--color-primary)' }}>
                <CheckCircle2 size={44} style={{ marginBottom: '10px' }} />
                <h4>ধন্যবাদ! বার্তাটি পাঠানো হয়েছে।</h4>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit}>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>আপনার নাম *</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-light)', fontSize: '13.5px' }}
                  />
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>ইমেইল ঠিকানা *</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-light)', fontSize: '13.5px' }}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>আপনার বার্তা *</label>
                  <textarea
                    rows={3}
                    required
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-light)', fontSize: '13.5px' }}
                  />
                </div>
                <button type="submit" className="hero-btn" style={{ width: '100%', justifyContent: 'center' }}>
                  <Send size={15} />
                  <span>বার্তা পাঠান</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
