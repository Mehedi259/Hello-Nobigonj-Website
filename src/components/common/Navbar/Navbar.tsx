import React, { useState } from 'react'
import { NAV_ITEMS, NavItem } from '../../../constants/data'
import { FiSearch, FiMenu, FiX } from 'react-icons/fi'
import { useNews } from '../../../context/NewsContext'

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('home')
  const [searchInput, setSearchInput] = useState('')
  const { navigateToHome, navigateToCategory, setSearchQuery, setIsSearchOpen } = useNews()

  const handleNavClick = (item: NavItem, e: React.MouseEvent) => {
    setActiveItem(item.id)
    setMobileOpen(false)

    if (item.id === 'home') {
      e.preventDefault()
      navigateToHome()
    } else if (item.id === 'national') {
      e.preventDefault()
      navigateToCategory('জাতীয়')
    } else if (item.id === 'entertainment') {
      e.preventDefault()
      navigateToCategory('বিনোদন')
    } else if (item.id === 'sports') {
      e.preventDefault()
      navigateToCategory('খেলাধুলা')
    } else if (item.href.startsWith('#')) {
      const el = document.querySelector(item.href)
      if (el) {
        e.preventDefault()
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      setSearchQuery(searchInput.trim())
      setIsSearchOpen(true)
    }
  }

  return (
    <nav className="navbar">
      <div className="container">
        <a href="#" onClick={(e) => { e.preventDefault(); navigateToHome() }} className="navbar__logo">
          <div className="navbar__logo-icon">হে</div>
          <div className="navbar__logo-text">
            <h1>Hello Nobigonj</h1>
            <p>নবীগঞ্জের মানুষ, নবীগঞ্জের গল্প</p>
          </div>
        </a>

        <div className={`navbar__menu ${mobileOpen ? 'navbar__menu--open' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(item, e)}
              className={`navbar__menu-item ${activeItem === item.id ? 'navbar__menu-item--active' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <form className="navbar__search" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="সার্চ করুন..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="navbar__search-btn" aria-label="Search">
            <FiSearch />
          </button>
        </form>

        <button
          className="navbar__mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
