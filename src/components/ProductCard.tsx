import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { assets } from '../assets'
import { fadeUp } from './motion'
import type { Product } from '../data'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article variants={fadeUp} className="group">
      <Link to={`/shop-detail/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-3xl bg-cream">
          <img
            src={assets[product.image]}
            alt={product.name}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-3 py-1 text-xs font-medium text-forest backdrop-blur">
            {product.categories[0]}
          </span>
          {product.bestseller && (
            <span className="absolute right-3 top-3 rounded-full bg-clay px-3 py-1 text-xs font-medium text-white">
              Bestseller
            </span>
          )}
          {!product.inStock && (
            <span className="absolute inset-x-3 bottom-3 rounded-full bg-forest-deep/85 py-2 text-center text-xs font-medium text-cream backdrop-blur">
              Waitlist only
            </span>
          )}
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg leading-tight text-forest">{product.name}</h3>
            <p className="text-sm italic text-muted">{product.latin}</p>
          </div>
          <span className="shrink-0 font-display text-lg text-clay">${product.price}</span>
        </div>
        <div className="mt-1.5 flex items-center gap-1 text-xs text-muted">
          <span aria-hidden className="text-clay-soft">★</span>
          <span className="font-medium text-forest">{product.rating}</span>
          <span>· {product.reviews} reviews</span>
        </div>
      </Link>
    </motion.article>
  )
}
