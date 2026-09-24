import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.tsx'
import { CartProvider } from './cart/CartContext'
import { products } from './data'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <CartProvider catalogue={products}>
        <App />
      </CartProvider>
    </HashRouter>
  </StrictMode>,
)
