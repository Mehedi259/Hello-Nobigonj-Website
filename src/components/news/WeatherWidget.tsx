import React, { useState } from 'react'
import { MapPin, CloudSun, Droplets, Wind, Sun, CloudRain } from 'lucide-react'

const CITIES = [
  { city: 'ঢাকা', temp: 32, condition: 'আংশিক মেঘলা', humidity: 68, wind: '১২ কিমি/ঘ.', icon: 'sun-cloud' },
  { city: 'চট্টগ্রাম', temp: 30, condition: 'রৌদ্রোজ্জ্বল', humidity: 72, wind: '১৪ কিমি/ঘ.', icon: 'sun' },
  { city: 'সিলেট', temp: 28, condition: 'হালকা বৃষ্টি', humidity: 82, wind: '৯ কিমি/ঘ.', icon: 'rain' },
  { city: 'রাজশাহী', temp: 34, condition: 'পরিষ্কার আকাশ', humidity: 58, wind: '১০ কিমি/ঘ.', icon: 'sun' },
]

export const WeatherWidget: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState(0)
  const current = CITIES[selectedCity]

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div className="weather-city">
          <MapPin size={15} color="var(--color-primary)" />
          <span>{current.city}</span>
        </div>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>আবহাওয়া বার্তা</span>
      </div>

      {/* City Switcher Tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
        {CITIES.map((c, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCity(idx)}
            style={{
              padding: '2px 8px',
              fontSize: '11px',
              fontWeight: 600,
              borderRadius: '9999px',
              border: 'none',
              background: selectedCity === idx ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.7)',
              color: selectedCity === idx ? '#fff' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {c.city}
          </button>
        ))}
      </div>

      <div className="weather-main">
        <div style={{ color: current.icon === 'rain' ? '#0284c7' : '#f59e0b' }}>
          {current.icon === 'rain' ? <CloudRain size={38} /> : current.icon === 'sun' ? <Sun size={38} /> : <CloudSun size={38} />}
        </div>
        <div>
          <div className="weather-temp">{current.temp}°C</div>
          <div className="weather-condition">{current.condition}</div>
        </div>
      </div>

      <div className="weather-details">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Droplets size={12} color="#0284c7" />
            আর্দ্রতা {current.humidity}%
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Wind size={12} color="#64748b" />
            বাতাস {current.wind}
          </span>
        </div>
      </div>
    </div>
  )
}
