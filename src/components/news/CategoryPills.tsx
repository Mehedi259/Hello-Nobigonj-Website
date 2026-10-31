import React from 'react'
import {
  Landmark,
  Megaphone,
  TrendingUp,
  Globe,
  Trophy,
  Film,
  Cpu,
  HeartHandshake
} from 'lucide-react'
import { CATEGORIES } from '../../data/categories'
import { useNews } from '../../context/NewsContext'

const ICON_MAP: Record<string, React.ReactNode> = {
  Landmark: <Landmark size={22} />,
  Megaphone: <Megaphone size={22} />,
  TrendingUp: <TrendingUp size={22} />,
  Globe: <Globe size={22} />,
  Trophy: <Trophy size={22} />,
  Film: <Film size={22} />,
  Cpu: <Cpu size={22} />,
  HeartHandshake: <HeartHandshake size={22} />,
}

export const CategoryPills: React.FC = () => {
  const { currentCategory, navigateToCategory, navigateToHome } = useNews()

  return (
    <section className="category-strip-section">
      <div className="category-strip">
        {CATEGORIES.map((cat) => {
          const isActive = currentCategory === cat.slug
          return (
            <div
              key={cat.id}
              className={`category-pill-card ${isActive ? 'active' : ''}`}
              onClick={() => {
                if (isActive) {
                  navigateToHome()
                } else {
                  navigateToCategory(cat.slug)
                }
              }}
              title={`${cat.name} বিভাগের খবর দেখুন`}
            >
              <div className="category-pill-icon">
                {ICON_MAP[cat.iconName] || <Landmark size={22} />}
              </div>
              <span className="category-pill-name">{cat.name}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
