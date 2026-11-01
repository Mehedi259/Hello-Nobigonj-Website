import React, { useState, useEffect } from 'react'
import { getBengaliDate } from '../../../utils/helpers'
import { MARQUEE_TEXT } from '../../../constants/data'
import { FaFacebookF, FaYoutube, FaInstagram, FaXTwitter } from 'react-icons/fa6'
import { FiMoon, FiSun, FiSearch } from 'react-icons/fi'
import { useNews } from '../../../context/NewsContext'

export const TopBar: React.FC = () => {
  const currentDate = getBengaliDate()
  const { setIsSearchOpen } = useNews()
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('hellonobigonj_theme') === 'dark'
  })

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode')
      localStorage.setItem('hellonobigonj_theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark-mode')
      localStorage.setItem('hellonobigonj_theme', 'light')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className="top-bar">
      <div className="container">
        <div className="top-bar__left">
          <div className="top-bar__marquee">
            <span>{MARQUEE_TEXT}</span>
          </div>
        </div>
        <div className="top-bar__right">
          <span className="top-bar__date">{currentDate}</span>
          <div className="top-bar__socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><FaXTwitter /></a>
          </div>
          <div className="top-bar__actions">
            <button onClick={toggleDarkMode} aria-label="Dark Mode Toggle">
              {isDarkMode ? <FiSun /> : <FiMoon />} {isDarkMode ? 'লাইট' : 'ডার্ক'}
            </button>
            <button onClick={() => setIsSearchOpen(true)} aria-label="Search">
              <FiSearch /> সার্চ
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar
