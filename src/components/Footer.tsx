import { Link } from 'react-router-dom'

const columns = [
  {
    title: 'Shop',
    items: [
      { label: 'All plants', to: '/shop' },
      { label: 'Low maintenance', to: '/shop' },
      { label: 'Statement plants', to: '/shop' },
      { label: 'Pots & care', to: '/shop' },
    ],
  },
  {
    title: 'Verdelux',
    items: [
      { label: 'Our story', to: '/' },
      { label: 'Sustainability', to: '/' },
      { label: 'Blog', to: '/' },
      { label: 'Stockists', to: '/' },
    ],
  },
  {
    title: 'Help',
    items: [
      { label: 'Care guides', to: '/' },
      { label: 'Shipping', to: '/' },
      { label: 'Returns', to: '/' },
      { label: 'Contact us', to: '/' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-forest-deep text-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-3xl">Verdelux</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
              Rare and everyday houseplants, hand-thrown pots and honest care
              advice — grown with patience, delivered with roots intact.
            </p>
            <form
              className="mt-6 flex max-w-sm items-center gap-2 rounded-full border border-cream/20 p-1.5"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="Your email for care tips"
                className="w-full bg-transparent px-4 text-sm placeholder:text-cream/40 focus:outline-none"
              />
              <button className="btn btn-primary shrink-0 !px-5 !py-2 !text-sm">Join</button>
            </form>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-cream/60">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((item, i) => (
                  <li key={i}>
                    <Link
                      to={item.to}
                      className="text-sm text-cream/80 link-underline hover:text-leaf-bright"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-cream/15 pt-6 text-sm text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Verdelux by Sheyda Asadi. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="link-underline hover:text-cream">Instagram</a>
            <a href="#" className="link-underline hover:text-cream">Pinterest</a>
            <a href="#" className="link-underline hover:text-cream">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
