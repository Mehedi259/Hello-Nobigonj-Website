import React, { useState } from 'react'
import { FaFacebookF, FaYoutube, FaTwitter, FaInstagram } from 'react-icons/fa'
import { useNews } from '../../context/NewsContext'
import { InformationModal } from './InformationModal'

interface FooterProps {
  onOpenModal?: (type: 'about' | 'ads' | 'privacy' | 'contact') => void
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
  const { navigateToHome, showToast } = useNews()
  const [internalModalType, setInternalModalType] = useState<'about' | 'ads' | 'privacy' | 'contact' | null>(null)

  const handleOpen = (type: 'about' | 'ads' | 'privacy' | 'contact') => {
    if (onOpenModal) {
      onOpenModal(type)
    } else {
      setInternalModalType(type)
    }
  }

  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            {/* Logo */}
            <div onClick={navigateToHome} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #e11d48 0%, #0f172a 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 900,
                fontSize: '18px'
              }}>H</div>
              <span style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>
                Hello<span style={{ color: '#e11d48' }}>Nobigonj</span>
              </span>
            </div>

            {/* Quick links */}
            <ul className="footer-nav-links">
              <li onClick={() => handleOpen('about')}>আমাদের সম্পর্কে</li>
              <li onClick={() => handleOpen('ads')}>বিজ্ঞাপন</li>
              <li onClick={() => handleOpen('privacy')}>গোপনীয়তা নীতি</li>
              <li onClick={() => handleOpen('contact')}>যোগাযোগ</li>
            </ul>

            {/* Social icons */}
            <div className="footer-social-row">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-icon"
                title="Facebook"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-icon"
                title="YouTube"
              >
                <FaYoutube size={14} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-icon"
                title="X (Twitter)"
              >
                <FaTwitter size={14} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-icon"
                title="Instagram"
              >
                <FaInstagram size={14} />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="footer-bottom">
            <p>© ২০২৬ Hello Nobigonj. সর্বস্বত্ব সংরক্ষিত। সত্যের পক্ষে, মানুষের পাশে।</p>
          </div>
        </div>
      </footer>

      {/* Information Modal (fallback if not handled by parent) */}
      {!onOpenModal && (
        <InformationModal
          type={internalModalType}
          onClose={() => setInternalModalType(null)}
          showToast={showToast}
        />
      )}
    </>
  )
}
