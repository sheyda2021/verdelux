import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { assets } from '../assets'
import { useCart } from '../cart/CartContext'

/**
 * Slide-over shopping cart. Fully client-side: "checkout" completes into a
 * demo confirmation (no payment backend) and empties the basket. Handles the
 * accessibility basics of a modal dialog — focus move-in, Escape to close,
 * backdrop click, and a scroll lock on the page behind it.
 */
export default function CartDrawer() {
  const { lines, subtotal, count, remove, setQty, clear, isOpen, closeCart } = useCart()
  const [placed, setPlaced] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Escape closes; lock background scroll while open; move focus to the panel.
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeCart()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [isOpen, closeCart])

  // Reset the confirmation screen a moment after the drawer is dismissed.
  useEffect(() => {
    if (!isOpen && placed) {
      const t = setTimeout(() => setPlaced(false), 300)
      return () => clearTimeout(t)
    }
  }, [isOpen, placed])

  const checkout = () => {
    clear()
    setPlaced(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-forest-deep/50 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-forest/10 px-6 py-5">
              <h2 className="font-display text-xl text-forest">
                {placed ? 'Order confirmed' : `Your cart${count ? ` · ${count}` : ''}`}
              </h2>
              <button
                ref={closeRef}
                onClick={closeCart}
                aria-label="Close cart"
                className="rounded-full p-2 text-forest transition hover:bg-forest/10"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              </button>
            </header>

            {placed ? (
              <ConfirmationBody onClose={closeCart} />
            ) : lines.length === 0 ? (
              <EmptyBody onClose={closeCart} />
            ) : (
              <>
                <ul className="flex-1 divide-y divide-forest/10 overflow-y-auto px-6">
                  {lines.map((l) => (
                    <li key={l.product.id} className="flex gap-4 py-5">
                      <img
                        src={assets[l.product.image]}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="h-20 w-16 shrink-0 rounded-xl object-cover"
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <p className="font-medium text-forest">{l.product.name}</p>
                          <button
                            onClick={() => remove(l.product.id)}
                            aria-label={`Remove ${l.product.name}`}
                            className="text-muted transition hover:text-clay-soft"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                              <path d="M4 7h16M9 7V5h6v2m-8 0 1 13h8l1-13" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-sm text-muted">${l.product.price}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-forest/15">
                            <button onClick={() => setQty(l.product.id, l.qty - 1)} className="px-3 py-1.5 text-forest focus-ring rounded-l-full" aria-label={`Decrease ${l.product.name} quantity`}>−</button>
                            <span className="w-8 text-center text-sm font-medium text-forest" aria-live="polite">{l.qty}</span>
                            <button onClick={() => setQty(l.product.id, l.qty + 1)} className="px-3 py-1.5 text-forest focus-ring rounded-r-full" aria-label={`Increase ${l.product.name} quantity`}>+</button>
                          </div>
                          <span className="font-display text-clay">${l.product.price * l.qty}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <footer className="border-t border-forest/10 px-6 py-5">
                  <div className="flex items-center justify-between text-sm text-muted">
                    <span>Subtotal</span>
                    <span className="font-display text-xl text-forest">${subtotal}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted">Shipping &amp; the free care journal calculated at checkout.</p>
                  <button onClick={checkout} className="btn btn-primary mt-4 w-full">
                    Checkout · ${subtotal}
                  </button>
                </footer>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function EmptyBody({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-display text-2xl text-forest">Your cart is empty</p>
      <p className="max-w-xs text-muted">Add a plant or two and they will gather here, ready to come home.</p>
      <Link to="/shop" onClick={onClose} className="btn btn-primary mt-2">Browse plants</Link>
    </div>
  )
}

function ConfirmationBody({ onClose }: { onClose: () => void }) {
  // Stable within this mount — a friendly demo order reference.
  const ref = `VX-${String(Math.floor(1000 + Math.random() * 9000))}`
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-leaf/20 text-leaf">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
      <p className="font-display text-2xl text-forest">Thank you!</p>
      <p className="max-w-xs text-muted">
        Order <span className="font-medium text-forest">{ref}</span> is confirmed. This is a
        portfolio demo, so no payment was taken — but your plants would be on their way.
      </p>
      <Link to="/shop" onClick={onClose} className="btn btn-primary mt-2">Keep shopping</Link>
    </div>
  )
}
