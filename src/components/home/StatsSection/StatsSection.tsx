import React from 'react'
import { STATS_DATA, PERSONS } from '../../../constants/data'

export const StatsSection: React.FC = () => {
  return (
    <section className="stats" id="nobigonj-identity">
      <div className="container">
        {STATS_DATA.map((stat) => (
          <div key={stat.id} className="stats__item">
            <div className="stats__icon">{stat.icon}</div>
            <div>
              <div className="stats__value">{stat.value}</div>
              <div className="stats__label">
                {stat.label}
                {stat.sublabel && <br />}
                {stat.sublabel}
              </div>
            </div>
          </div>
        ))}
        {PERSONS.map((person) => (
          <div key={person.id} className="stats__person">
            <div className="stats__person-avatar">👤</div>
            <div>
              <div className="stats__person-name">{person.title}</div>
              <div className="stats__person-name">{person.name}</div>
              <div className="stats__person-designation">{person.designation}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StatsSection
