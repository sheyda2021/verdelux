import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// Vitest runs against jsdom with the React plugin for JSX. Kept separate from
// vite.config.ts so the production `tsc` build never type-checks Vitest's own
// (duplicated) Vite types. Tailwind isn't needed here — component tests assert
// behaviour and a11y, not computed styles (css: false).
export default defineConfig({
  plugins: [react()],
  // Stop Vite walking up the tree to a stray parent-dir postcss.config.js.
  css: { postcss: {} },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['src/cart/**', 'src/components/Stars.tsx'],
    },
  },
})
