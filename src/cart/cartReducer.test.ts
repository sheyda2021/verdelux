import { describe, it, expect } from 'vitest'
import {
  cartReducer,
  cartCount,
  cartSubtotal,
  emptyCart,
  type CartState,
} from './cartReducer'
import type { Product } from '../data'

// Two lightweight fixtures — the reducer only cares about id + price.
const fern: Product = {
  id: 'fern',
  name: 'Boston Fern',
  latin: 'Nephrolepis exaltata',
  price: 40,
  image: 'monstera',
  gallery: ['monstera'],
  categories: ['Indoor'],
  rating: 4.5,
  reviews: 10,
  light: 'Indirect',
  water: 'Weekly',
  size: 'Small',
  tagline: '',
  blurb: '',
  inStock: true,
}
const palm: Product = { ...fern, id: 'palm', name: 'Areca Palm', price: 90 }

describe('cartReducer', () => {
  it('adds a new line', () => {
    const s = cartReducer(emptyCart, { type: 'ADD', product: fern, qty: 1 })
    expect(s.lines).toHaveLength(1)
    expect(s.lines[0]).toEqual({ product: fern, qty: 1 })
  })

  it('merges quantity when the same product is added again', () => {
    let s = cartReducer(emptyCart, { type: 'ADD', product: fern, qty: 2 })
    s = cartReducer(s, { type: 'ADD', product: fern, qty: 3 })
    expect(s.lines).toHaveLength(1)
    expect(s.lines[0].qty).toBe(5)
  })

  it('keeps distinct products on separate lines', () => {
    let s = cartReducer(emptyCart, { type: 'ADD', product: fern, qty: 1 })
    s = cartReducer(s, { type: 'ADD', product: palm, qty: 1 })
    expect(s.lines).toHaveLength(2)
  })

  it('clamps add quantity to a floored minimum of 1', () => {
    const s = cartReducer(emptyCart, { type: 'ADD', product: fern, qty: 0 })
    expect(s.lines[0].qty).toBe(1)
    const s2 = cartReducer(emptyCart, { type: 'ADD', product: fern, qty: 2.9 })
    expect(s2.lines[0].qty).toBe(2)
  })

  it('removes a line by id', () => {
    let s = cartReducer(emptyCart, { type: 'ADD', product: fern, qty: 1 })
    s = cartReducer(s, { type: 'ADD', product: palm, qty: 1 })
    s = cartReducer(s, { type: 'REMOVE', id: 'fern' })
    expect(s.lines).toHaveLength(1)
    expect(s.lines[0].product.id).toBe('palm')
  })

  it('sets an explicit quantity, clamped to >= 1', () => {
    let s = cartReducer(emptyCart, { type: 'ADD', product: fern, qty: 1 })
    s = cartReducer(s, { type: 'SET_QTY', id: 'fern', qty: 7 })
    expect(s.lines[0].qty).toBe(7)
    s = cartReducer(s, { type: 'SET_QTY', id: 'fern', qty: 0 })
    expect(s.lines[0].qty).toBe(1)
  })

  it('clears the whole cart', () => {
    let s = cartReducer(emptyCart, { type: 'ADD', product: fern, qty: 2 })
    s = cartReducer(s, { type: 'CLEAR' })
    expect(s).toEqual(emptyCart)
  })

  it('hydrates from a saved state', () => {
    const saved: CartState = { lines: [{ product: palm, qty: 4 }] }
    const s = cartReducer(emptyCart, { type: 'HYDRATE', state: saved })
    expect(s).toEqual(saved)
  })
})

describe('cart selectors', () => {
  const state: CartState = {
    lines: [
      { product: fern, qty: 2 }, // 2 * 40 = 80
      { product: palm, qty: 1 }, // 1 * 90 = 90
    ],
  }
  it('cartCount sums quantities', () => {
    expect(cartCount(state)).toBe(3)
    expect(cartCount(emptyCart)).toBe(0)
  })
  it('cartSubtotal sums price * qty', () => {
    expect(cartSubtotal(state)).toBe(170)
    expect(cartSubtotal(emptyCart)).toBe(0)
  })
})
