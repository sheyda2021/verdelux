import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { assets } from '../assets'
import { products, type Category } from '../data'
import ProductCard from '../components/ProductCard'
import { fadeUp, stagger, viewportOnce } from '../components/motion'

const categoryList: Category[] = [
  'Indoor', 'Low Maintenance', 'Flowering', 'Air-Purifying', 'Statement',
]

type Sort = 'featured' | 'price-asc' | 'price-desc' | 'rating'

export default function Shop() {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState<Category | 'All'>('All')
  const [maxPrice, setMaxPrice] = useState(360)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sort, setSort] = useState<Sort>('featured')

  const results = useMemo(() => {
    let list = products.filter((p) => {
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.latin.toLowerCase().includes(query.toLowerCase())
      const matchesCat = cat === 'All' || p.categories.includes(cat)
      const matchesPrice = p.price <= maxPrice
      const matchesStock = !inStockOnly || p.inStock
      return matchesQuery && matchesCat && matchesPrice && matchesStock
    })
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    return list
  }, [query, cat, maxPrice, inStockOnly, sort])

  const reset = () => {
    setQuery('')
    setCat('All')
    setMaxPrice(360)
    setInStockOnly(false)
  }

  return (
    <>
      {/* ------------------------------------------------- Shop hero */}
      <section className="mx-auto max-w-7xl px-5 pt-6 md:px-10">
        <div className="relative overflow-hidden rounded-[24px] card-shadow">
          <img src={assets.tropicalDark} alt="" aria-hidden className="h-[300px] w-full object-cover md:h-[360px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/80 via-forest-deep/45 to-forest/20" />
          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
            <nav className="text-sm text-lime/70">
              <Link to="/" className="link-underline hover:text-lime">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-lime">Shop</span>
            </nav>
            <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-lime md:text-5xl">
              The whole greenhouse, one scroll away
            </h1>
            <p className="mt-4 max-w-lg text-lime/80">
              Filter by light, care level or budget — every plant ships nursery-fresh
              with our 30-day stay-alive promise.
            </p>
          </div>
        </div>
      </section>

      {/* --------------------------------------------- Filters + grid */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[260px_1fr] md:px-10">
        {/* Filters sidebar */}
        <aside className="space-y-8 md:sticky md:top-24 md:self-start">
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-muted">Search</label>
            <div className="mt-2 flex items-center gap-2 rounded-full border border-forest/15 px-4 py-2.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.2-3.2" strokeLinecap="round" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Monstera, snake…"
                className="w-full bg-transparent text-sm focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-widest text-muted">Max price</label>
              <span className="font-display text-clay">${maxPrice}</span>
            </div>
            <input
              type="range"
              min={60}
              max={360}
              step={4}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-3 w-full accent-leaf"
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">Availability</p>
            <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-forest">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="h-4 w-4 accent-forest"
              />
              In stock only
            </label>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">Categories</p>
            <ul className="mt-3 space-y-1">
              {(['All', ...categoryList] as (Category | 'All')[]).map((c) => (
                <li key={c}>
                  <button
                    onClick={() => setCat(c)}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                      cat === c ? 'bg-forest text-cream' : 'text-forest hover:bg-forest/5'
                    }`}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button onClick={reset} className="text-sm text-clay link-underline">
            Reset filters
          </button>
        </aside>

        {/* Results */}
        <div>
          <div className="flex flex-col gap-3 border-b border-forest/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              Showing <span className="font-medium text-forest">{results.length}</span> of {products.length} plants
            </p>
            <label className="flex items-center gap-2 text-sm text-muted">
              Sort by
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="rounded-full border border-forest/15 bg-paper px-3 py-1.5 text-forest focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
            </label>
          </div>

          {results.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-display text-2xl text-forest">Nothing matches — yet.</p>
              <p className="mt-2 text-muted">Try widening your budget or clearing a filter.</p>
              <button onClick={reset} className="btn btn-ghost mt-6">Reset filters</button>
            </div>
          ) : (
            <motion.div
              key={`${cat}-${sort}-${maxPrice}-${inStockOnly}-${query}`}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={stagger}
              className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3"
            >
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </motion.div>
          )}

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="mt-16 overflow-hidden rounded-3xl bg-cream/70 p-8 text-center md:p-12"
          >
            <h3 className="font-display text-2xl text-forest md:text-3xl">Not sure where to start?</h3>
            <p className="mx-auto mt-2 max-w-md text-muted">
              Take our 60-second light quiz and we’ll hand-pick three plants for your space.
            </p>
            <Link to="/shop-detail/snake-plant" className="btn btn-primary mt-6">See an easy pick</Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
