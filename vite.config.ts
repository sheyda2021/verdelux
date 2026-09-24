import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Tailwind v4 runs via @tailwindcss/vite — disable PostCSS config discovery.
  css: { postcss: {} },
  // Pin the dev port so the preview harness and Vite agree on it.
  server: { port: 5181, strictPort: true },
})
