import type { Product } from '../data'

// A cart line: the product plus how many of it are in the basket.
export interface CartLine {
  product: Product
  qty: number
}

export interface CartState {
  lines: CartLine[]
}

export type CartAction =
  | { type: 'ADD'; product: Product; qty: number }
  | { type: 'REMOVE'; id: string }
  | { type: 'SET_QTY'; id: string; qty: number }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; state: CartState }

export const emptyCart: CartState = { lines: [] }

// Pure reducer — no side effects — so it can be unit-tested in isolation and
// reused for both the live store and the persistence layer.
export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const qty = Math.max(1, Math.floor(action.qty))
      const existing = state.lines.find((l) => l.product.id === action.product.id)
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.product.id === action.product.id ? { ...l, qty: l.qty + qty } : l,
          ),
        }
      }
      return { lines: [...state.lines, { product: action.product, qty }] }
    }
    case 'REMOVE':
      return { lines: state.lines.filter((l) => l.product.id !== action.id) }
    case 'SET_QTY': {
      const qty = Math.max(1, Math.floor(action.qty))
      return {
        lines: state.lines.map((l) =>
          l.product.id === action.id ? { ...l, qty } : l,
        ),
      }
    }
    case 'CLEAR':
      return emptyCart
    case 'HYDRATE':
      return action.state
    default:
      return state
  }
}

// Derived selectors — kept beside the reducer so every consumer counts the same.
export const cartCount = (s: CartState) => s.lines.reduce((n, l) => n + l.qty, 0)
export const cartSubtotal = (s: CartState) =>
  s.lines.reduce((sum, l) => sum + l.product.price * l.qty, 0)
