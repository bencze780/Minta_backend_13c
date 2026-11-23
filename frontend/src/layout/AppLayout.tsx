import { NavLink, Outlet } from 'react-router-dom'
import { useState } from 'react'
import './AppLayout.css'

const groups = [
  { title: 'Lekérdezések', links: [
    { to: '/szolgaltatasok', label: 'Összes szolgáltatás', method: 'GET' },
    { to: '/elerheto', label: 'Elérhető szolgáltatások', method: 'GET' },
    { to: '/kereses', label: 'Keresés megnevezés szerint', method: 'GET' },
    { to: '/statisztika', label: 'Kategória-statisztika', method: 'GET' },
    { to: '/dragak', label: 'Drága szolgáltatások', method: 'GET' },
    { to: '/reszletek', label: 'Lekérdezés ID alapján', method: 'GET' }
  ]},
  { title: 'CRUD műveletek', links: [
    { to: '/letrehozas', label: 'Új szolgáltatás', method: 'POST' },
    { to: '/modositas', label: 'Módosítás', method: 'PUT' },
    { to: '/torles', label: 'Törlés', method: 'DELETE' }
  ]}
]

export default function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <div className="brand"><div className="brand-icon">SZ</div><div><strong>Szerviz API</strong><small>Adminisztrációs felület</small></div></div>
        <nav className="side-navigation">
          {groups.map(group => <div className="nav-group" key={group.title}>
            <h2>{group.title}</h2>
            {group.links.map(link => <NavLink key={link.to} to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
              <span className={`nav-method nav-${link.method.toLowerCase()}`}>{link.method}</span>
              <span>{link.label}</span>
            </NavLink>)}
          </div>)}
        </nav>
        <div className="sidebar-footer">React · TypeScript · REST API</div>
      </aside>

      <div className="main-area">
        <header className="mobile-header">
          <button className="menu-toggle" onClick={() => setMenuOpen(open => !open)} aria-label="Menü megnyitása">
            <span></span><span></span><span></span>
          </button>
          <strong>Szerviz API</strong>
        </header>
        {menuOpen && <button className="mobile-overlay" aria-label="Menü bezárása" onClick={() => setMenuOpen(false)} />}
        <main className="content"><Outlet /></main>
      </div>
    </div>
  )
}
