import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useKitchen } from '../store/kitchen'

const NAV = [
  { to: '/recipes', label: 'Recipes' },
  { to: '/method', label: 'How it works' },
]

export default function Header() {
  const savedCount = useKitchen((s) => s.saved.length)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-40 bg-ticket-50/95 backdrop-blur-sm border-b border-ticket-200">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-6">
          <Link to="/" className="shrink-0">
            <span className="font-display text-2xl md:text-[1.7rem] text-char-950 block leading-none tracking-tight">
              MISE
            </span>
            <span className="docket text-[0.55rem]">EN PLACE · FOURTEEN RECIPES</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm transition-colors duration-300 ${
                    isActive ? 'text-copper-500' : 'text-char-800/80 hover:text-char-950'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/saved"
              className="flex items-center gap-2 px-3.5 py-2 border border-char-700 text-sm text-char-900 transition-colors duration-300 hover:bg-char-900 hover:text-ticket-50"
            >
              <span className="hidden sm:inline">Saved</span>
              <span className="font-mono text-xs">{savedCount}</span>
            </Link>

            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden p-2 text-char-900"
              aria-label="Menu"
              aria-expanded={open}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <nav className="md:hidden pb-4 flex flex-col border-t border-ticket-200 pt-3">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`py-2 text-sm ${
                  pathname === item.to ? 'text-copper-500' : 'text-char-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
