import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { assets } from '../assets'
import { products, type Category } from '../data'
import ProductCard from '../components/ProductCard'
import Navbar from '../components/Navbar'
import Stars from '../components/Stars'
import { fadeUp, stagger, viewportOnce } from '../components/motion'

const blogPosts = [
  {
    img: 'birdOfParadise',
    tag: 'Wellbeing',
    title: 'Green Vibes Only: Why Plants Make Us Happier',
    body:
      "Feeling overwhelmed by everyday stress? You're not alone — and plants might be the natural remedy you didn’t know you needed. Studies show greenery can lift your mood, lower anxiety and sharpen focus. Whether it’s a leafy Monstera or a tiny succulent, a little living green brings calm and balance.",
  },
  {
    img: 'aglaonemaRed',
    tag: 'Care guide',
    title: 'Watering 101: The Fingertip Test That Ends Root Rot',
    body:
      'More houseplants are loved to death than neglected to death. Before you reach for the watering can, push a finger two knuckles into the soil — if it comes out damp, wait. This one habit fixes the single most common mistake new plant parents make.',
  },
] as const

const features = [
  {
    title: 'Grown, not warehoused',
    body: 'Every plant is raised in our own glasshouse and acclimatised to indoor life before it ever reaches your door.',
    icon: 'M12 3C7 7 5 11 5 15a7 7 0 0 0 14 0c0-4-2-8-7-12Z',
  },
  {
    title: 'Matched to your light',
    body: 'Tell us your window and we pair you with plants that will actually thrive — no guesswork, no sad leaves.',
    icon: 'M12 4v2m0 12v2m8-8h-2M6 12H4m12.5-5.5-1.4 1.4M8.9 15.1l-1.4 1.4m9.6 0-1.4-1.4M8.9 8.9 7.5 7.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  },
  {
    title: 'Packed to survive',
    body: 'Root-locked pots and recyclable moulded crates mean your greenery arrives upright and unbruised.',
    icon: 'm4 8 8-4 8 4v8l-8 4-8-4V8Zm8-4v16M4 8l8 4 8-4',
  },
  {
    title: 'Care for the long haul',
    body: 'A printed care journal ships with every plant, plus lifetime re-potting help from our team.',
    icon: 'M6 4h9l3 3v13H6V4Zm3 6h6M9 14h6',
  },
]

const categories: (Category | 'All')[] = [
  'All', 'Indoor', 'Low Maintenance', 'Flowering', 'Air-Purifying', 'Statement',
]

// Four distinct trust signals for the hero — each card says something new.
const trustStats = [
  { label: 'Trusted by', value: '1,400+', note: 'happy plant lovers' },
  { label: 'Delivered', value: '30k', note: 'plants, roots intact' },
  { label: 'Stay-alive', value: '30-day', note: 'replacement promise' },
  { label: 'Rated', value: '4.8★', note: 'across 900 reviews' },
]

// Rotating hero messages — the carousel dots below the banner step through
// these, and they also auto-advance.
const heroSlides = [
  {
    title: 'Bring nature home. Refresh your space, revive your soul',
    cta: 'Shop Now',
  },
  {
    title: 'Plants matched to your light — no guesswork, no sad leaves',
    cta: 'Find my match',
  },
  {
    title: 'Grown in our glasshouse, delivered with roots intact',
    cta: 'Meet the growers',
  },
]

export default function Home() {
  const [active, setActive] = useState<Category | 'All'>('All')
  const [slide, setSlide] = useState(0)
  const collection = products.filter(
    (p) => active === 'All' || p.categories.includes(active as Category),
  )
  const bestSellers = products.slice(0, 8)

  // Auto-advance the hero every 6s; any manual dot press resets the timer.
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 6000)
    return () => clearInterval(t)
  }, [slide])

  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      {/* Full-bleed banner — spans the whole viewport width, only a thin
          pale margin so the rounded corners read, exactly like the design. */}
      <section className="px-3 pt-5 md:px-5">
        <div className="relative overflow-hidden rounded-[28px] card-shadow">
          {/* Leafy backdrop + gradient for text legibility */}
          <img
            src={assets.tropicalDark}
            alt="A wall of lush tropical leaves"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(100deg, rgba(9,41,17,0.80) 0%, rgba(9,41,17,0.42) 48%, rgba(9,41,17,0.16) 100%)',
            }}
          />
          {/* Glowing four-leaf clover — screen blend drops its dark backdrop */}
          <img
            src={assets.cloverArt}
            alt=""
            aria-hidden
            className="pointer-events-none absolute right-1 top-20 hidden w-[300px] opacity-95 mix-blend-screen lg:block xl:w-[340px]"
          />

          {/* Foreground: overlaid header + copy + trust cards.
              The whole banner fits within one screen — its height tracks the
              viewport (clamped) so it never spills past the first scroll.
              Top padding reserves room for the fixed overlay navbar. */}
          <div className="relative flex min-h-[540px] flex-col pt-[64px] md:h-[calc(100svh-5rem)] md:min-h-[560px] md:max-h-[820px] md:pt-[72px]">
            <Navbar overlay />

            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="mt-12 px-6 md:mt-20 md:px-10"
            >
              <motion.h1
                key={slide}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="max-w-2xl text-4xl font-bold leading-[1.2] tracking-[0.01em] text-lime md:text-[46px]"
              >
                {heroSlides[slide].title}
              </motion.h1>
              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
                <Link to="/shop" className="btn btn-primary px-9">{heroSlides[slide].cta}</Link>
                <Link to="/shop" className="btn btn-outline">Contact Us</Link>
              </motion.div>
            </motion.div>

            {/* Trust cards row — four distinct proof points */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="mt-auto grid grid-cols-2 gap-3 px-6 pb-6 pt-6 sm:grid-cols-4 md:px-10 md:pb-8"
            >
              {trustStats.map((s) => (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  className="rounded-2xl border border-lime/15 bg-forest-deep/35 px-4 py-5 text-center backdrop-blur-md"
                >
                  <p className="text-xs text-lime/70">{s.label}</p>
                  <p className="mt-1 font-display text-2xl font-bold text-lime">{s.value}</p>
                  <p className="mt-1 text-xs text-lime/70">{s.note}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Carousel dots — real controls that jump to a slide */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {heroSlides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setSlide(i)}
              aria-label={`Show slide ${i + 1}: ${s.title}`}
              aria-current={slide === i}
              className={`focus-ring h-3 rounded-full transition-all ${
                slide === i ? 'w-28 bg-forest' : 'w-11 bg-leaf/70 hover:bg-leaf'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------ Features */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              className="rounded-3xl border border-forest/10 bg-paper p-7 transition hover:border-leaf hover:shadow-[0_24px_60px_-40px_rgba(20,34,24,0.5)]"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cream text-forest">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={f.icon} />
                </svg>
              </div>
              <h3 className="mt-5 text-xl text-forest">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --------------------------------------------------- Collection */}
      <section className="bg-cream/60 py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">Find your match</span>
              <h2 className="mt-3 text-4xl text-forest md:text-5xl">Explore our green collection</h2>
            </div>
            <Link to="/shop" className="btn btn-ghost self-start md:self-auto">View all plants</Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  active === c
                    ? 'bg-forest text-cream'
                    : 'border border-forest/15 text-forest hover:bg-forest/5'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <motion.div
            key={active}
            initial="hidden"
            animate="show"
            variants={stagger}
            className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4"
          >
            {collection.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------- Promo banner */}
      <section className="relative overflow-hidden py-24 text-cream">
        <img src={assets.tropicalDark} alt="" aria-hidden loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-forest-deep/70" />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger}
          className="relative mx-auto max-w-3xl px-5 text-center md:px-10"
        >
          <motion.span variants={fadeUp} className="eyebrow !text-leaf-bright">Autumn refresh</motion.span>
          <motion.h2 variants={fadeUp} className="mt-4 text-4xl md:text-5xl">
            15% off your first jungle
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-cream/80">
            New here? Start a room’s worth of green for less. Use code
            <span className="mx-1 rounded bg-cream/15 px-2 py-0.5 font-medium">GROW15</span>
            at checkout — free care journal included.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8">
            <Link to="/shop" className="btn btn-primary">Start shopping</Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ------------------------------------------------- Best selling */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Loved by our community</span>
            <h2 className="mt-3 text-4xl text-forest md:text-5xl">Best selling this season</h2>
          </div>
          <Link to="/shop" className="btn btn-ghost self-start md:self-auto">Shop all</Link>
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger}
          className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4"
        >
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </motion.div>
      </section>

      {/* ----------------------------------------------------- Blog */}
      <section className="relative overflow-hidden py-16">
        <img src={assets.dewLeaves} alt="" aria-hidden loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-forest-deep/45" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-10">
          <h2 className="text-3xl font-bold text-white md:text-4xl">Blog</h2>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={stagger}
            className="mt-8 grid gap-8 lg:grid-cols-2"
          >
            {blogPosts.map((post, i) => (
              <motion.article
                key={i}
                variants={fadeUp}
                className="glass-card rounded-2xl p-6 md:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-[1fr_auto]">
                  <div>
                    <span className="eyebrow !text-leaf-bright">{post.tag}</span>
                    <h3 className="mt-3 text-xl font-semibold leading-snug text-white">{post.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-white/85">{post.body}</p>
                  </div>
                  <img
                    src={assets[post.img]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-56 w-full rounded-lg object-cover sm:w-44"
                  />
                </div>
                <button className="btn btn-primary mt-6 px-10">Read More</button>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --------------------------------------------------- Community */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-10">
        <div className="text-center">
          <span className="eyebrow justify-center">#VerdeluxAtHome</span>
          <h2 className="mt-3 text-4xl text-forest md:text-5xl">Join our green community</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            30,000 plant people share their corners of calm. Tag us and your room could be next.
          </p>
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger}
          className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5"
        >
          {[assets.lifeA, assets.lifeB, assets.lifeC, assets.lifeD, assets.lifeE].map((img, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`overflow-hidden rounded-2xl ${i === 0 ? 'col-span-2 md:col-span-1' : ''}`}
            >
              <img src={img} alt="" loading="lazy" decoding="async" className="aspect-square w-full object-cover transition duration-700 hover:scale-105" />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* -------------------------------------------------- Testimonial */}
      <section className="bg-forest py-20 text-cream">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-5 text-center md:flex-row md:text-left md:px-10"
        >
          <img src={assets.monsteraAlt} alt="Sheyda Asadi" loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-full object-cover ring-4 ring-leaf/40" />
          <div>
            <Stars value={5} />
            <blockquote className="mt-3 font-display text-2xl leading-snug md:text-3xl">
              “Three plants in and my flat finally feels alive. They arrived
              perfect, and the care journal meant I didn’t kill a single one.”
            </blockquote>
            <p className="mt-4 text-sm text-cream/70">Sheyda Asadi · verified buyer</p>
          </div>
        </motion.div>
      </section>
    </>
  )
}
