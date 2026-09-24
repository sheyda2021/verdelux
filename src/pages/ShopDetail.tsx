import { useMemo, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { assets } from '../assets'
import { getProduct, similarProducts } from '../data'
import ProductCard from '../components/ProductCard'
import Stars from '../components/Stars'
import { useCart } from '../cart/CartContext'
import { stagger, viewportOnce } from '../components/motion'

const tabs = ['Description', 'Plant care', 'Reviews'] as const
type Tab = (typeof tabs)[number]

export default function ShopDetail() {
  const { id } = useParams()
  const product = id ? getProduct(id) : undefined
  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState<Tab>('Description')
  const { add } = useCart()

  const similar = useMemo(() => (product ? similarProducts(product.id) : []), [product])

  if (!product) return <Navigate to="/shop" replace />

  const gallery = product.gallery

  return (
    <>
      {/* ------------------------------------------------- Breadcrumb */}
      <div className="mx-auto max-w-7xl px-5 pt-8 md:px-10">
        <nav className="text-sm text-muted">
          <Link to="/" className="link-underline hover:text-forest">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="link-underline hover:text-forest">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-forest">{product.name}</span>
        </nav>
      </div>

      {/* ---------------------------------------------- Product detail */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-10 md:grid-cols-2 md:px-10">
        {/* Gallery */}
        <div className="flex flex-col-reverse gap-4 sm:flex-row">
          <div className="flex gap-3 sm:flex-col">
            {gallery.map((g, i) => (
              <button
                key={g}
                onClick={() => setActiveImg(i)}
                className={`overflow-hidden rounded-2xl ring-2 transition ${
                  activeImg === i ? 'ring-leaf' : 'ring-transparent hover:ring-forest/20'
                }`}
              >
                <img src={assets[g]} alt="" className="h-16 w-16 object-cover sm:h-20 sm:w-20" />
              </button>
            ))}
          </div>
          <motion.div
            key={activeImg}
            initial={{ opacity: 0.3, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex-1 overflow-hidden rounded-3xl bg-cream"
          >
            <img src={assets[gallery[activeImg]]} alt={product.name} className="aspect-[4/5] w-full object-cover" />
          </motion.div>
        </div>

        {/* Info */}
        <div className="md:py-4">
          <div className="flex flex-wrap gap-2">
            {product.categories.map((c) => (
              <span key={c} className="rounded-full bg-cream px-3 py-1 text-xs text-forest">{c}</span>
            ))}
          </div>
          <h1 className="mt-4 text-4xl text-forest md:text-5xl">{product.name}</h1>
          <p className="mt-1 text-lg italic text-muted">{product.latin}</p>

          <div className="mt-4 flex items-center gap-3 text-sm">
            <Stars value={product.rating} />
            <span className="font-medium text-forest">{product.rating}</span>
            <span className="text-muted">· {product.reviews} reviews</span>
          </div>

          <p className="mt-5 font-display text-4xl text-clay">${product.price}</p>
          <p className="mt-4 max-w-md leading-relaxed text-muted">{product.blurb}</p>

          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-cream/60 p-5 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-muted">Light</dt>
              <dd className="mt-0.5 font-medium text-forest">{product.light}</dd>
            </div>
            <div>
              <dt className="text-muted">Water</dt>
              <dd className="mt-0.5 font-medium text-forest">{product.water}</dd>
            </div>
            <div>
              <dt className="text-muted">Size</dt>
              <dd className="mt-0.5 font-medium text-forest">{product.size}</dd>
            </div>
          </dl>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full border border-forest/15">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-2.5 text-forest" aria-label="Decrease">−</button>
              <span className="w-8 text-center font-medium text-forest">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-4 py-2.5 text-forest" aria-label="Increase">+</button>
            </div>
            <button
              className="btn btn-primary flex-1 sm:flex-none"
              disabled={!product.inStock}
              onClick={() => product.inStock && add(product, qty)}
            >
              {product.inStock ? `Add to cart · $${product.price * qty}` : 'Join the waitlist'}
            </button>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-moss">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" /></svg>
            {product.inStock ? 'In stock · ships within 48 hours' : 'Back in ~3 weeks · no charge until it ships'}
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------- Tabs */}
      <section className="mx-auto max-w-7xl px-5 pb-6 md:px-10">
        <div className="flex gap-6 border-b border-forest/10">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative pb-3 text-sm transition ${
                tab === t ? 'text-forest' : 'text-muted hover:text-forest'
              }`}
            >
              {t}
              {tab === t && (
                <motion.span layoutId="tab-underline" className="absolute inset-x-0 -bottom-px h-0.5 rounded bg-leaf" />
              )}
            </button>
          ))}
        </div>

        <div className="py-8 text-muted">
          {tab === 'Description' && (
            <div className="grid gap-8 md:grid-cols-2">
              <p className="leading-relaxed">
                {product.blurb} A living thing, not a print — expect gentle variation
                in leaf count and shape. It settles into a new home within a fortnight,
                then rewards steady light and a consistent routine with vigorous new growth.
              </p>
              <ul className="space-y-3">
                {['Nursery-grown in peat-free soil', 'Ships in a recyclable root-lock crate', 'Pet-safety notes included in the care journal', 'Free re-potting guidance for life'].map((x) => (
                  <li key={x} className="flex items-start gap-3">
                    <span className="mt-1 text-leaf">✓</span>
                    <span className="text-forest">{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {tab === 'Plant care' && (
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { h: 'Light', b: product.light + '. Rotate a quarter-turn weekly for even growth.' },
                { h: 'Water', b: product.water + '. Let the top few centimetres dry between drinks.' },
                { h: 'Home', b: 'Loves 18–26°C and a little humidity. Keep clear of cold draughts.' },
              ].map((c) => (
                <div key={c.h} className="rounded-2xl bg-cream/60 p-5">
                  <h4 className="text-forest">{c.h}</h4>
                  <p className="mt-2 text-sm leading-relaxed">{c.b}</p>
                </div>
              ))}
            </div>
          )}
          {tab === 'Reviews' && (
            <div className="space-y-6">
              {[
                { n: 'Sheyda Asadi', r: 'Arrived in perfect health and honestly bigger than I expected. The care card took all the anxiety out of it.', d: '2 weeks ago' },
                { n: 'Marcus T.', r: 'Second plant from Verdelux. Packaging is the best I’ve seen — not a single bent leaf.', d: '1 month ago' },
                { n: 'Priya R.', r: 'Thriving under a north window exactly as the light guide promised. Will be back.', d: '2 months ago' },
              ].map((rv) => (
                <div key={rv.n} className="rounded-2xl border border-forest/10 p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-forest">{rv.n}</p>
                    <span className="text-xs text-muted">{rv.d}</span>
                  </div>
                  <Stars value={5} className="mt-1" />
                  <p className="mt-2 text-sm leading-relaxed text-forest">{rv.r}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------- Similar products */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-10">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl text-forest md:text-4xl">You may also like</h2>
          <Link to="/shop" className="btn btn-ghost">Back to shop</Link>
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger}
          className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4"
        >
          {similar.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </motion.div>
      </section>
    </>
  )
}
