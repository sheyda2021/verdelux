import { describe, it, expect } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { CartProvider, useCart } from './CartContext'
import type { Product } from '../data'

const rose: Product = {
  id: 'rose',
  name: 'Desert Rose',
  latin: 'Adenium obesum',
  price: 55,
  image: 'monstera',
  gallery: ['monstera'],
  categories: ['Flowering'],
  rating: 4.7,
  reviews: 12,
  light: 'Bright',
  water: 'Sparse',
  size: 'Small',
  tagline: '',
  blurb: '',
  inStock: true,
}
const catalogue = [rose]

// Tiny probe that surfaces cart state + an add button for the test to drive.
function Probe() {
  const { count, subtotal, add } = useCart()
  return (
    <div>
      <span data-testid="count">{count}</span>
      <span data-testid="subtotal">{subtotal}</span>
      <button onClick={() => add(rose, 2)}>add</button>
    </div>
  )
}

describe('CartContext', () => {
  it('adds items and reflects count + subtotal', () => {
    render(
      <CartProvider catalogue={catalogue}>
        <Probe />
      </CartProvider>,
    )
    expect(screen.getByTestId('count').textContent).toBe('0')
    act(() => {
      screen.getByText('add').click()
    })
    expect(screen.getByTestId('count').textContent).toBe('2')
    expect(screen.getByTestId('subtotal').textContent).toBe('110')
  })

  it('persists a slim {id, qty} array to localStorage', () => {
    render(
      <CartProvider catalogue={catalogue}>
        <Probe />
      </CartProvider>,
    )
    act(() => {
      screen.getByText('add').click()
    })
    const raw = localStorage.getItem('verdelux.cart.v1')
    expect(raw).toBeTruthy()
    expect(JSON.parse(raw!)).toEqual([{ id: 'rose', qty: 2 }])
  })

  it('rehydrates saved ids against the live catalogue', () => {
    localStorage.setItem('verdelux.cart.v1', JSON.stringify([{ id: 'rose', qty: 3 }]))
    render(
      <CartProvider catalogue={catalogue}>
        <Probe />
      </CartProvider>,
    )
    // Price comes from the catalogue, not the saved snapshot: 3 * 55 = 165.
    expect(screen.getByTestId('count').textContent).toBe('3')
    expect(screen.getByTestId('subtotal').textContent).toBe('165')
  })

  it('drops saved ids that are no longer in the catalogue', () => {
    localStorage.setItem(
      'verdelux.cart.v1',
      JSON.stringify([{ id: 'ghost-plant', qty: 2 }]),
    )
    render(
      <CartProvider catalogue={catalogue}>
        <Probe />
      </CartProvider>,
    )
    expect(screen.getByTestId('count').textContent).toBe('0')
  })
})
