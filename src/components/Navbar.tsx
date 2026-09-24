import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets'
import { useCart } from '../cart/CartContext'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Blog', to: '/shop' },
  { label: 'Contact', to: '/shop' },
]

/**
 * Site header. Two variants:
 *  - solid (default): sticky pale bar used on Shop / Shop-detail pages.
 *  - overlay: fixed bar over the Home hero. Transparent + light-on-dark while
 *    the hero is in view; once the user scrolls it snaps to a solid pale bar
 *    that stays pinned to the top of the viewport.
 */
export default function Navbar({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { count, openCart } = useCart()

  // Overlay bar only: watch the scroll position so it can flip from the
  // transparent hero treatment to a solid, pinned bar.
  useEffect(() => {
    if (!overlay) return
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [overlay])

  // Light (transparent-over-hero) treatment only while the overlay bar is at
  // the top; scrolled or solid variants use the dark-on-pale treatment.
  const light = overlay && !scrolled

  const brand = light ? 'text-lime' : 'text-forest'
  const linkBase = light ? 'text-lime/85 hover:text-lime' : 'text-muted hover:text-forest'
  const linkActive = light ? 'text-lime font-medium' : 'text-forest font-medium'
  const iconWrap = light ? 'text-lime hover:bg-lime/10' : 'text-forest hover:bg-forest/10'

  const shell = overlay
    ? `fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled
          ? 'border-b border-forest/10 bg-paper/90 backdrop-blur-md shadow-[0_10px_30px_-22px_rgba(9,41,17,0.55)]'
          : 'border-b border-transparent bg-transparent'
      }`
    : 'sticky top-0 z-50 border-b border-forest/10 bg-paper/85 backdrop-blur-md'

  return (
    <header className={shell}>
      <nav
        className={`flex items-center justify-between ${
          overlay ? 'mx-auto max-w-[1600px] px-6 py-4 md:px-10' : 'mx-auto max-w-7xl px-5 py-4 md:px-10'
        }`}
      >
        <Link to="/" className={`flex items-center gap-2.5 ${brand}`} onClick={() => setOpen(false)}>
          <img
            src={assets.cloverArt}
            alt=""
            aria-hidden
            className="h-9 w-9 object-contain mix-blend-screen"
          />
          <span className="font-display text-2xl tracking-tight">Verdelux</span>
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l, i) => (
            <li key={i}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `text-sm link-underline ${
                    isActive && (l.label === 'Home' || l.label === 'Shop') ? linkActive : linkBase
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={`flex items-center gap-3 ${light ? 'text-lime' : 'text-forest'}`}>
          <button aria-label="Search" className={`hidden rounded-full p-2 transition sm:block ${iconWrap}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.2-3.2" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart, ${count} ${count === 1 ? 'item' : 'items'}`}
            className={`relative rounded-full p-2 transition ${iconWrap}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M6 7h13l-1.2 9.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 7Z" strokeLinejoin="round" />
              <path d="M9 7a3 3 0 0 1 6 0" strokeLinecap="round" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-clay px-1 text-[10px] font-semibold text-white">
                {count}
              </span>
            )}
          </button>
          <button aria-label="Account" className={`hidden rounded-full p-2 transition sm:block ${iconWrap}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" strokeLinecap="round" />
            </svg>
          </button>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className={`rounded-full p-2 transition md:hidden ${iconWrap}`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              {open ? (
                <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <ul
          className={`flex flex-col gap-1 px-5 py-3 md:hidden ${
            light
              ? 'mx-4 mb-2 rounded-2xl border border-lime/15 bg-forest-deep/80 backdrop-blur-md'
              : 'border-t border-forest/10 bg-paper'
          }`}
        >
          {links.map((l, i) => (
            <li key={i}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-3 py-2 text-sm ${
                  light ? 'text-lime hover:bg-lime/10' : 'text-forest hover:bg-forest/5'
                }`}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
