import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  const navLinks = [['/', 'Home'], ['/about', 'About Us'], ['/products', 'All Products'], ['/categories', 'Categories'], ['/contact', 'Contact Us']]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300 ${scrolled ? 'px-6 md:px-12 py-3' : 'px-6 md:px-14 py-5'}`}
      style={{ background: 'rgba(253,250,245,0.94)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(61,43,31,0.08)' }}
    >
      <Link to="/" className="flex items-center h-12">
        <img src="/logos.png" alt="BloomShine" className="h-full object-contain" />
      </Link>

      <ul className="hidden md:flex gap-8 list-none">
        {navLinks.map(([path, label]) => (
          <li key={path}>
            <Link to={path} className="text-l tracking-widest uppercase font-normal transition-colors hover:text-terracotta"
              style={{ color: location.pathname === path ? '#C4714A' : '#3D2B1F', borderBottom: location.pathname === path ? '1px solid #C4714A' : 'none', paddingBottom: '2px' }}>
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="hidden md:flex gap-4 items-center">
        <Link to="/products" className="bg-bark text-cream text-xs tracking-widest uppercase px-5 py-2.5 transition-all hover:bg-terracotta">
          Shop Now
        </Link>
      </div>

      <button className="md:hidden p-2 text-bark" onClick={() => setMenuOpen(!menuOpen)}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
          {menuOpen ? (<><line x1="4" y1="4" x2="18" y2="18"/><line x1="18" y1="4" x2="4" y2="18"/></>) : (<><line x1="3" y1="6" x2="19" y2="6"/><line x1="3" y1="11" x2="19" y2="11"/><line x1="3" y1="16" x2="19" y2="16"/></>)}
        </svg>
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 border-t border-linen p-6 flex flex-col gap-5 md:hidden shadow-lg" style={{ background: 'var(--warm-white)' }}>
          {[...navLinks, ['/admin', 'Admin']].map(([path, label]) => (
            <Link key={path} to={path} className="text-sm tracking-widest uppercase text-bark font-normal">{label}</Link>
          ))}
          <Link to="/products" className="bg-bark text-cream text-xs tracking-widest uppercase px-5 py-3 text-center mt-2">Shop Now</Link>
        </div>
      )}
    </nav>
  )
}
