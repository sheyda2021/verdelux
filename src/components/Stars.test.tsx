import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Stars from './Stars'

describe('Stars', () => {
  it('exposes a single text label to assistive tech', () => {
    render(<Stars value={4.8} />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('aria-label', 'Rated 4.8 out of 5')
  })

  it('honours a custom count in the label', () => {
    render(<Stars value={3} count={10} />)
    expect(screen.getByRole('img')).toHaveAttribute(
      'aria-label',
      'Rated 3 out of 10',
    )
  })

  it('renders the requested number of glyphs, all hidden from AT', () => {
    const { container } = render(<Stars value={4} count={5} />)
    // Each star is an aria-hidden span wrapper directly under the role="img".
    const hidden = container.querySelectorAll('[aria-hidden="true"]')
    expect(hidden.length).toBeGreaterThanOrEqual(5)
  })
})
