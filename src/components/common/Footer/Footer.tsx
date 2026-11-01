import React, { useState } from 'react'
import { FOOTER_LINKS } from '../../../constants/data'
import { FaFacebookF, FaYoutube, FaInstagram, FaXTwitter } from 'react-icons/fa6'
import { useNews } from '../../../context/NewsContext'

interface FooterProps {
  onOpenModal?: (type: 'about' | 'ads' | 'privacy' | 'contact') => void
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
  const [email, setEmail] = useState('')
  const { showToast, navigateToHome, navigateToCategory } = useNews()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      showToast('দয়া করে একটি সঠিক ইমেইল ঠিকানা দিন')
      return
    }
    showToast('ধন্যবাদ! আপনি সফলভাবে নিউজলেটারে যুক্ত হয়েছেন')
    setEmail('')
  }

  const handleLinkClick = (label: string, href: string, e: React.MouseEvent) => {
    if (label === 'আমাদের সম্পর্কে') {
      e.preventDefault()
      onOpenModal && onOpenModal('about')
    } else if (label === 'বিজ্ঞাপন দিন' || label === 'বিজ্ঞাপন রেট') {
      e.preventDefault()
      onOpenModal && onOpenModal('ads')
    } else if (label === 'গোপনীয়তা নীতি') {
      e.preventDefault()
      onOpenModal && onOpenModal('privacy')
    } else if (label === 'যোগাযোগ তথ্য' || label === 'যোগাযোগ ও ঠিকানা') {
      e.preventDefault()
      onOpenModal && onOpenModal('contact')
    } else if (label === 'হোম') {
      e.preventDefault()
      navigateToHome()
    } else if (label === 'জাতীয়' || label === 'বিনোদন' || label === 'খেলাধুলা') {
      e.preventDefault()
      navigateToCategory(label)
    } else if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) {
        e.preventDefault()
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        {/* Brand Column */}
        <div className="footer__brand">
          <div className="footer__logo">
            <div className="footer__logo-icon">হে</div>
            <div className="footer__logo-text">
              <h3>Hello Nobigonj</h3>
              <p>নবীগঞ্জের মানুষ, নবীগঞ্জের গল্প</p>
            </div>
          </div>
          <p className="footer__description">
            নবীগঞ্জের সব খবর, মানুষের গল্প, ইতিহাস, ঐতিহ্য ও উন্নয়নের কথা – সব এক প্ল্যাটফর্মে।
          </p>
          <div className="footer__socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><FaXTwitter /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer__column">
          <h4>দ্রুত লিংক</h4>
          <ul>
            {FOOTER_LINKS.quickLinks.map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(link.label, link.href, e)}
                >
                  › {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Info Links */}
        <div className="footer__column">
          <h4>তথ্য ও সহায়তা</h4>
          <ul>
            {FOOTER_LINKS.infoLinks.map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(link.label, link.href, e)}
                >
                  › {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer__newsletter">
          <h4>নিউজলেটার সাবস্ক্রাইব করুন</h4>
          <p>নবীগঞ্জের তাজাতম খবর ও আপডেট ইমেইলে পেতে</p>
          <form className="footer__newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="আপনার ইমেইল লিখুন"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">সাবস্ক্রাইব</button>
          </form>
          <div className="footer__heart-badge">
            <span>Nabiganj</span> Always in Our Hearts ♡
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer__bottom">
        <div className="container">
          <p>© ২০২৬ Hello Nobigonj. সর্বস্বত্ব সংরক্ষিত।</p>
          <p>নবীগঞ্জের মানুষ, নবীগঞ্জের কথা। | Made with ❤️ for Nabiganj</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
