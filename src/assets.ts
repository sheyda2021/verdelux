// Central image registry. Importing each file lets Vite fingerprint and bundle
// it, so the built app is fully self-contained (no remote URLs). Source photos
// were exported from the Figma design and live in ./assets/raw.

// Clean potted-plant product shots
import monstera from './assets/raw/h18.jpeg'
import monsteraAlt from './assets/raw/d7.jpeg'
import variegated from './assets/raw/d8.jpeg'
import snake from './assets/raw/d19.png'
import zz from './assets/raw/d2.jpeg'
import aglaonemaRed from './assets/raw/h8.jpeg'
import aglaonemaPink from './assets/raw/h16.jpeg'
import calathea from './assets/raw/h17.jpeg'
import birdOfParadise from './assets/raw/h3.jpeg'
import bonsai from './assets/raw/h7.jpeg'

// Accessories
import growLight from './assets/raw/d6.jpeg'
import vaseKintsugi from './assets/raw/d1.jpeg'
import vaseSculpted from './assets/raw/d20.jpeg'

// Cutouts / decorative
import eucalyptus from './assets/raw/h6.png'
import sprig from './assets/raw/h5.png'
import cloverArt from './assets/raw/h10.png'

// Leafy neutral backdrops
import leafFrameA from './assets/raw/h4.jpeg'
import leafFrameB from './assets/raw/h1.jpeg'
import leafFrameC from './assets/raw/d10.jpeg'

// Dark tropical / macro (banners & journal)
import tropicalDark from './assets/raw/h11.jpeg'
import seedlings from './assets/raw/h12.png'
import dewLeaves from './assets/raw/h9.jpeg'

// Lifestyle / community
import lifeA from './assets/raw/h13.jpeg'
import lifeB from './assets/raw/h14.jpeg'
import lifeC from './assets/raw/h15.jpeg'
import lifeD from './assets/raw/h19.jpeg'
import lifeE from './assets/raw/h20.jpeg'

export const assets = {
  monstera, monsteraAlt, variegated, snake, zz,
  aglaonemaRed, aglaonemaPink, calathea, birdOfParadise, bonsai,
  growLight, vaseKintsugi, vaseSculpted,
  eucalyptus, sprig, cloverArt,
  leafFrameA, leafFrameB, leafFrameC,
  tropicalDark, seedlings, dewLeaves,
  lifeA, lifeB, lifeC, lifeD, lifeE,
}

export type AssetKey = keyof typeof assets
