import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from '../data'
import {
  cartReducer,
  cartCount,
  cartSubtotal,
  emptyCart,
  type CartState,
} from './cartReducer'

const STORAGE_KEY = 'verdelux.cart.v1'

// Re-read persisted product data from the current catalogue so prices/details
// can never go stale against a snapshot saved in an earlier visit.
function loadInitial(catalogue: Product[]): CartState {
  if (typeof window === 'undefined') return emptyCart
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyCart
    const parsed = JSON.parse(raw) as { id: string; qty: number }[]
    if (!Array.isArray(parsed)) return emptyCart
    const lines = parsed
      .map(({ id, qty }) => {
        const product = catalogue.find((p) => p.id === id)
        return product ? { product, qty: Math.max(1, Math.floor(qty)) } : null
      })
      .filter((l): l is { product: Product; qty: number } => l !== null)
    return { lines }
  } catch {
    return emptyCart
  }
}

interface CartContextValue {
  lines: CartState['lines']
  count: number
  subtotal: number
  add: (product: Product, qty?: number) => void
  remove: (id: string) => void
  setQty: (id: string, qty: number) => void
  clear: () => void
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({
  children,
  catalogue,
  initialState,
}: {
  children: ReactNode
  catalogue: Product[]
  initialState?: CartState
}) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState ?? loadInitial(catalogue),
  )
  const [isOpen, setIsOpen] = useState(false)

  // Persist only ids + quantities — the catalogue is the source of truth for
  // everything else, so saved carts survive product-detail edits.
  useEffect(() => {
    try {
      const slim = state.lines.map((l) => ({ id: l.product.id, qty: l.qty }))
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slim))
    } catch {
      /* storage full or unavailable — cart still works for this session */
    }
  }, [state])

  const value = useMemo<CartContextValue>(
    () => ({
      lines: state.lines,
      count: cartCount(state),
      subtotal: cartSubtotal(state),
      add: (product, qty = 1) => {
        dispatch({ type: 'ADD', product, qty })
        setIsOpen(true)
      },
      remove: (id) => dispatch({ type: 'REMOVE', id }),
      setQty: (id, qty) => dispatch({ type: 'SET_QTY', id, qty }),
      clear: () => dispatch({ type: 'CLEAR' }),
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }),
    [state, isOpen],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
