import { assets, type AssetKey } from './assets'

export type Category =
  | 'Indoor'
  | 'Low Maintenance'
  | 'Flowering'
  | 'Air-Purifying'
  | 'Statement'

export interface Product {
  id: string
  name: string
  latin: string
  price: number
  image: AssetKey
  gallery: AssetKey[]
  categories: Category[]
  rating: number
  reviews: number
  light: string
  water: string
  size: string
  tagline: string
  blurb: string
  inStock: boolean
  bestseller?: boolean
}

// A single source of truth shared by Home, Shop and Shop Detail so links and
// prices never drift between pages.
export const products: Product[] = [
  {
    id: 'monstera-deliciosa',
    name: 'Monstera Deliciosa',
    latin: 'Monstera deliciosa',
    price: 140,
    image: 'monstera',
    gallery: ['monstera', 'monsteraAlt', 'variegated', 'eucalyptus', 'zz'],
    categories: ['Indoor', 'Statement', 'Air-Purifying'],
    rating: 4.8,
    reviews: 214,
    light: 'Bright, indirect',
    water: 'Weekly',
    size: 'Medium · 45–60cm',
    tagline: 'The one everyone starts with — and keeps.',
    blurb:
      'Glossy, fenestrated leaves that split more dramatically as the plant matures. Forgiving, fast-growing and happiest climbing a moss pole toward a bright window.',
    inStock: true,
    bestseller: true,
  },
  {
    id: 'snake-plant',
    name: 'Snake Plant',
    latin: 'Sansevieria zeylanica',
    price: 68,
    image: 'snake',
    gallery: ['snake', 'zz', 'monstera', 'eucalyptus'],
    categories: ['Low Maintenance', 'Air-Purifying', 'Indoor'],
    rating: 4.9,
    reviews: 331,
    light: 'Low to bright',
    water: 'Every 2–3 weeks',
    size: 'Medium · 40–55cm',
    tagline: 'Nearly impossible to kill. We tried.',
    blurb:
      'Architectural upright blades in a matte ceramic pot. Filters indoor air overnight and shrugs off the odd missed watering — the ideal desk or bedroom companion.',
    inStock: true,
    bestseller: true,
  },
  {
    id: 'zz-plant',
    name: 'ZZ Plant',
    latin: 'Zamioculcas zamiifolia',
    price: 74,
    image: 'zz',
    gallery: ['zz', 'snake', 'monsteraAlt', 'eucalyptus'],
    categories: ['Low Maintenance', 'Indoor', 'Air-Purifying'],
    rating: 4.7,
    reviews: 176,
    light: 'Low to medium',
    water: 'Every 2–3 weeks',
    size: 'Medium · 40–50cm',
    tagline: 'Waxy, glossy and unbothered by low light.',
    blurb:
      'Deep-green feathered stems that catch the light like they have been polished. Stores water in its rhizomes, so it thrives in the shady corners other plants sulk in.',
    inStock: true,
  },
  {
    id: 'variegated-monstera',
    name: 'Variegated Monstera',
    latin: 'Monstera deliciosa · Albo',
    price: 320,
    image: 'variegated',
    gallery: ['variegated', 'monstera', 'monsteraAlt', 'calathea'],
    categories: ['Statement', 'Indoor'],
    rating: 4.9,
    reviews: 58,
    light: 'Bright, indirect',
    water: 'Weekly',
    size: 'Small · 25–35cm',
    tagline: 'A living marble sculpture. Limited stock.',
    blurb:
      'Each creamy-white variegated leaf is unrepeatable. A genuine collector’s plant — we hand-pick every specimen for balanced marbling before it ships.',
    inStock: true,
  },
  {
    id: 'aglaonema-red',
    name: 'Aglaonema Red Valentine',
    latin: 'Aglaonema commutatum',
    price: 92,
    image: 'aglaonemaRed',
    gallery: ['aglaonemaRed', 'aglaonemaPink', 'calathea', 'variegated'],
    categories: ['Indoor', 'Statement', 'Air-Purifying'],
    rating: 4.6,
    reviews: 129,
    light: 'Medium, indirect',
    water: 'Weekly',
    size: 'Medium · 35–45cm',
    tagline: 'Rose-pink foliage, no flowers required.',
    blurb:
      'Painterly leaves splashed in crimson and green that hold their colour year-round. Loves warmth and humidity — a bathroom or kitchen showpiece.',
    inStock: true,
  },
  {
    id: 'calathea-white-star',
    name: 'Calathea White Star',
    latin: 'Goeppertia majestica',
    price: 86,
    image: 'calathea',
    gallery: ['calathea', 'aglaonemaPink', 'variegated', 'zz'],
    categories: ['Indoor', 'Air-Purifying'],
    rating: 4.4,
    reviews: 97,
    light: 'Medium, indirect',
    water: 'Keep evenly moist',
    size: 'Medium · 40–50cm',
    tagline: 'Pinstriped leaves that dance at dusk.',
    blurb:
      'Fine white-and-blush striping over deep green, with a nightly “prayer” fold. Rewards a humid spot and filtered water with theatrical, ever-moving foliage.',
    inStock: true,
  },
  {
    id: 'bird-of-paradise',
    name: 'Bird of Paradise',
    latin: 'Strelitzia reginae',
    price: 165,
    image: 'birdOfParadise',
    gallery: ['birdOfParadise', 'bonsai', 'monstera', 'calathea'],
    categories: ['Flowering', 'Statement', 'Indoor'],
    rating: 4.7,
    reviews: 84,
    light: 'Bright, some direct',
    water: 'Weekly',
    size: 'Large · 90–120cm',
    tagline: 'Tropical drama in a single crane-like bloom.',
    blurb:
      'Broad paddle leaves and, in maturity, the unmistakable orange-and-blue flower. Give it the brightest spot in the house and it will fill the room with the tropics.',
    inStock: true,
  },
  {
    id: 'flowering-bonsai',
    name: 'Bougainvillea Bonsai',
    latin: 'Bougainvillea glabra',
    price: 240,
    image: 'bonsai',
    gallery: ['bonsai', 'birdOfParadise', 'aglaonemaRed', 'calathea'],
    categories: ['Flowering', 'Statement'],
    rating: 4.8,
    reviews: 41,
    light: 'Full sun',
    water: 'When topsoil dries',
    size: 'Specimen · 45cm + tray',
    tagline: 'Decades of training in one flowering tree.',
    blurb:
      'A mature, hand-trained bonsai that erupts into papery blooms in three colours. Each is one of a kind and shipped with a stoneware tray and a care journal.',
    inStock: false,
  },
  {
    id: 'aglaonema-pink',
    name: 'Aglaonema Pink Aurora',
    latin: 'Aglaonema · Pink',
    price: 88,
    image: 'aglaonemaPink',
    gallery: ['aglaonemaPink', 'aglaonemaRed', 'calathea', 'variegated'],
    categories: ['Indoor', 'Air-Purifying', 'Statement'],
    rating: 4.5,
    reviews: 112,
    light: 'Medium, indirect',
    water: 'Weekly',
    size: 'Medium · 35–45cm',
    tagline: 'Bubblegum-pink leaves, low-effort care.',
    blurb:
      'A softer sister to the Red Valentine, with candy-pink centres feathering into green. Compact, tolerant and endlessly photogenic on a shelf.',
    inStock: true,
  },
]

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function similarProducts(id: string, count = 4): Product[] {
  const current = getProduct(id)
  if (!current) return products.slice(0, count)
  const shares = (p: Product) =>
    p.categories.filter((c) => current.categories.includes(c)).length
  return products
    .filter((p) => p.id !== id)
    .sort((a, b) => shares(b) - shares(a))
    .slice(0, count)
}

export const productImage = (key: AssetKey) => assets[key]
