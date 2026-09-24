// Vitest global setup: register jest-dom matchers (toBeInTheDocument, etc.)
// and clear the DOM + localStorage between tests so cases stay isolated.
import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
  localStorage.clear()
})
