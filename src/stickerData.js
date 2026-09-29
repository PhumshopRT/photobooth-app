// High-quality SVG Sticker Assets for Cowboy & Photobooth Chic
// Encoded as SVG Data URIs for crisp vector rendering on both Web UI and Canvas Export

const svgToUri = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;

export const STICKER_CATEGORIES = [
  { id: 'cowboy', name: '🤠 คาวบอย (Cowboy)' },
  { id: 'sparkles', name: '✨ วิ้งวับ & Y2K' },
  { id: 'cute', name: '🌸 น่ารัก & ดอกไม้' },
  { id: 'wordart', name: '🔤 ข้อความสุดชิค' },
  { id: 'classic', name: '👑 คลาสสิก' }
];

export const BUILTIN_STICKERS = [
  // --- COWBOY PACK ---
  {
    id: 'cb_hat',
    category: 'cowboy',
    name: 'หมวกคาวบอยหนัง',
    dataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <defs>
          <linearGradient id="hatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#b45309"/>
            <stop offset="50%" stop-color="#78350f"/>
            <stop offset="100%" stop-color="#451a03"/>
          </linearGradient>
          <linearGradient id="bandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#f59e0b"/>
            <stop offset="50%" stop-color="#fbbf24"/>
            <stop offset="100%" stop-color="#d97706"/>
          </linearGradient>
          <filter id="hatShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#000000" flood-opacity="0.4"/>
          </filter>
        </defs>
        <g filter="url(#hatShadow)">
          <!-- Crown -->
          <path d="M 32,58 C 30,32 36,22 45,26 C 50,28 50,28 55,26 C 64,22 70,32 68,58 Z" fill="url(#hatGrad)" stroke="#261005" stroke-width="2" stroke-linejoin="round"/>
          <!-- Dent on top -->
          <path d="M 42,26 C 50,32 50,32 58,26" fill="none" stroke="#381504" stroke-width="2.5" stroke-linecap="round"/>
          <!-- Hat band -->
          <path d="M 32,54 Q 50,60 68,54 L 68,59 Q 50,65 32,59 Z" fill="url(#bandGrad)" stroke="#78350f" stroke-width="1"/>
          <!-- Star buckle on band -->
          <polygon points="50,54 51.5,57.5 55,57.5 52,59.5 53.5,63 50,61 46.5,63 48,59.5 45,57.5 48.5,57.5" fill="#fef08a" stroke="#b45309" stroke-width="0.6"/>
          <!-- Brim -->
          <path d="M 10,66 C 18,52 38,62 50,62 C 62,62 82,52 90,66 C 82,78 62,72 50,72 C 38,72 18,78 10,66 Z" fill="url(#hatGrad)" stroke="#261005" stroke-width="2.2" stroke-linejoin="round"/>
          <!-- Brim stitching/highlight -->
          <path d="M 16,65 C 24,56 40,64 50,64 C 60,64 76,56 84,65" fill="none" stroke="#d97706" stroke-width="1.2" stroke-dasharray="2,2"/>
        </g>
      </svg>
    `)
  },
  {
    id: 'cb_star',
    category: 'cowboy',
    name: 'ดาวนายอำเภอทองคำ',
    dataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fef08a"/>
            <stop offset="35%" stop-color="#f59e0b"/>
            <stop offset="70%" stop-color="#d97706"/>
            <stop offset="100%" stop-color="#92400e"/>
          </linearGradient>
          <filter id="starShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000000" flood-opacity="0.5"/>
          </filter>
        </defs>
        <g filter="url(#starShadow)">
          <!-- 6-Point Sheriff Star with Ball Tips -->
          <polygon points="50,14 58,35 80,30 68,48 85,62 63,65 60,86 50,70 40,86 37,65 15,62 32,48 20,30 42,35" fill="url(#goldGrad)" stroke="#78350f" stroke-width="2" stroke-linejoin="round"/>
          <!-- Ball tips -->
          <circle cx="50" cy="14" r="4.5" fill="#fef08a" stroke="#78350f" stroke-width="1.5"/>
          <circle cx="80" cy="30" r="4.5" fill="#fef08a" stroke="#78350f" stroke-width="1.5"/>
          <circle cx="85" cy="62" r="4.5" fill="#fef08a" stroke="#78350f" stroke-width="1.5"/>
          <circle cx="60" cy="86" r="4.5" fill="#fef08a" stroke="#78350f" stroke-width="1.5"/>
          <circle cx="40" cy="86" r="4.5" fill="#fef08a" stroke="#78350f" stroke-width="1.5"/>
          <circle cx="15" cy="62" r="4.5" fill="#fef08a" stroke="#78350f" stroke-width="1.5"/>
          <circle cx="20" cy="30" r="4.5" fill="#fef08a" stroke="#78350f" stroke-width="1.5"/>
          <!-- Center Badge Ring -->
          <circle cx="50" cy="50" r="17" fill="#78350f" stroke="#fbbf24" stroke-width="2"/>
          <circle cx="50" cy="50" r="14" fill="url(#goldGrad)"/>
          <text x="50" y="53" text-anchor="middle" font-family="serif" font-weight="900" font-size="6.5" fill="#451a03" letter-spacing="0.5">SHERIFF</text>
        </g>
      </svg>
    `)
  },
  {
    id: 'cb_boots',
    category: 'cowboy',
    name: 'บูทคาวบอยหนัง',
    dataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <defs>
          <linearGradient id="bootGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#b45309"/>
            <stop offset="50%" stop-color="#78350f"/>
            <stop offset="100%" stop-color="#451a03"/>
          </linearGradient>
          <filter id="bootShadow">
            <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000000" flood-opacity="0.4"/>
          </filter>
        </defs>
        <g filter="url(#bootShadow)">
          <!-- Left Boot -->
          <path d="M 28,24 C 36,28 42,28 48,24 L 46,56 C 46,62 52,66 62,68 C 68,70 70,76 66,80 C 58,84 38,84 30,80 C 26,78 26,72 26,64 Z" fill="url(#bootGrad)" stroke="#261005" stroke-width="2"/>
          <!-- Heel -->
          <path d="M 26,76 L 36,76 L 35,85 L 26,85 Z" fill="#261005"/>
          <!-- Western Stitch pattern on boot -->
          <path d="M 32,34 Q 38,44 32,54 M 42,34 Q 36,44 42,54" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M 37,32 L 37,56" fill="none" stroke="#fde68a" stroke-width="1.2" stroke-linecap="round"/>
          <!-- Spur -->
          <circle cx="24" cy="74" r="3" fill="#fbbf24" stroke="#78350f" stroke-width="1"/>
          <polygon points="20,74 15,71 17,74 15,77" fill="#fbbf24"/>
        </g>
      </svg>
    `)
  },
  {
    id: 'cb_horseshoe',
    category: 'cowboy',
    name: 'เกือกม้านำโชค',
    dataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <defs>
          <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fef08a"/>
            <stop offset="40%" stop-color="#eab308"/>
            <stop offset="80%" stop-color="#b45309"/>
            <stop offset="100%" stop-color="#78350f"/>
          </linearGradient>
        </defs>
        <g filter="drop-shadow(0px 3px 3px rgba(0,0,0,0.4))">
          <path d="M 24,25 L 36,25 C 36,48 40,65 50,65 C 60,65 64,48 64,25 L 76,25 C 76,55 68,78 50,78 C 32,78 24,55 24,25 Z" fill="url(#metalGrad)" stroke="#451a03" stroke-width="2.5" stroke-linejoin="round"/>
          <!-- Nail holes -->
          <circle cx="30" cy="35" r="2.2" fill="#261005"/>
          <circle cx="31" cy="48" r="2.2" fill="#261005"/>
          <circle cx="35" cy="60" r="2.2" fill="#261005"/>
          <circle cx="70" cy="35" r="2.2" fill="#261005"/>
          <circle cx="69" cy="48" r="2.2" fill="#261005"/>
          <circle cx="65" cy="60" r="2.2" fill="#261005"/>
          <!-- Tips -->
          <rect x="22" y="22" width="16" height="5" rx="1.5" fill="#fef08a" stroke="#451a03" stroke-width="1.5"/>
          <rect x="62" y="22" width="16" height="5" rx="1.5" fill="#fef08a" stroke="#451a03" stroke-width="1.5"/>
        </g>
      </svg>
    `)
  },
  {
    id: 'cb_cactus',
    category: 'cowboy',
    name: 'ต้นกระบองเพชร',
    dataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <defs>
          <linearGradient id="cactusGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#15803d"/>
            <stop offset="50%" stop-color="#22c55e"/>
            <stop offset="100%" stop-color="#166534"/>
          </linearGradient>
        </defs>
        <g filter="drop-shadow(0px 3px 4px rgba(0,0,0,0.35))">
          <!-- Main Stem -->
          <path d="M 44,88 L 44,24 C 44,18 56,18 56,24 L 56,88 Z" fill="url(#cactusGrad)" stroke="#14532d" stroke-width="2.5"/>
          <!-- Left Arm -->
          <path d="M 44,55 L 28,55 C 24,55 24,42 24,36 C 24,32 32,32 32,36 L 32,46 L 44,46 Z" fill="url(#cactusGrad)" stroke="#14532d" stroke-width="2.5" stroke-linejoin="round"/>
          <!-- Right Arm -->
          <path d="M 56,64 L 72,64 C 76,64 76,50 76,44 C 76,40 68,40 68,44 L 68,55 L 56,55 Z" fill="url(#cactusGrad)" stroke="#14532d" stroke-width="2.5" stroke-linejoin="round"/>
          <!-- Needles -->
          <line x1="50" y1="28" x2="50" y2="82" stroke="#86efac" stroke-width="1.2" stroke-dasharray="1,4"/>
          <line x1="28" y1="36" x2="28" y2="48" stroke="#86efac" stroke-width="1" stroke-dasharray="1,3"/>
          <line x1="72" y1="44" x2="72" y2="56" stroke="#86efac" stroke-width="1" stroke-dasharray="1,3"/>
          <!-- Flower on top -->
          <circle cx="50" cy="18" r="4.5" fill="#f43f5e"/>
          <circle cx="50" cy="18" r="2" fill="#fef08a"/>
        </g>
      </svg>
    `)
  },
  {
    id: 'cb_mustache',
    category: 'cowboy',
    name: 'หนวดคลาสสิก',
    dataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <defs>
          <linearGradient id="mustacheGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#3f3f46"/>
            <stop offset="40%" stop-color="#18181b"/>
            <stop offset="100%" stop-color="#09090b"/>
          </linearGradient>
        </defs>
        <g filter="drop-shadow(0px 3px 4px rgba(0,0,0,0.4))">
          <path d="M 50,56 C 44,48 30,42 16,48 C 6,52 6,65 14,64 C 24,62 38,66 50,75 C 62,66 76,62 86,64 C 94,65 94,52 84,48 C 70,42 56,48 50,56 Z" fill="url(#mustacheGrad)" stroke="#09090b" stroke-width="2"/>
          <path d="M 22,52 C 32,50 42,56 48,60" fill="none" stroke="#71717a" stroke-width="1" stroke-linecap="round"/>
          <path d="M 78,52 C 68,50 58,56 52,60" fill="none" stroke="#71717a" stroke-width="1" stroke-linecap="round"/>
        </g>
      </svg>
    `)
  },
  {
    id: 'cb_glasses',
    category: 'cowboy',
    name: 'แว่นตาวินเทจ',
    dataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <defs>
          <linearGradient id="lensGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#b45309" stop-opacity="0.9"/>
            <stop offset="50%" stop-color="#78350f" stop-opacity="0.85"/>
            <stop offset="100%" stop-color="#1c1917" stop-opacity="0.95"/>
          </linearGradient>
        </defs>
        <g filter="drop-shadow(0px 3px 4px rgba(0,0,0,0.5))">
          <!-- Frame Bridge -->
          <path d="M 44,46 Q 50,42 56,46" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M 42,42 Q 50,38 58,42" fill="none" stroke="#f59e0b" stroke-width="1.8" stroke-linecap="round"/>
          <!-- Left Lens Frame -->
          <ellipse cx="32" cy="52" rx="15" ry="13" fill="url(#lensGrad)" stroke="#f59e0b" stroke-width="2.5"/>
          <!-- Right Lens Frame -->
          <ellipse cx="68" cy="52" rx="15" ry="13" fill="url(#lensGrad)" stroke="#f59e0b" stroke-width="2.5"/>
          <!-- Glare Highlights -->
          <path d="M 24,45 Q 34,42 38,50" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity="0.6"/>
          <path d="M 60,45 Q 70,42 74,50" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity="0.6"/>
          <!-- Temples -->
          <line x1="17" y1="48" x2="8" y2="44" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>
          <line x1="83" y1="48" x2="92" y2="44" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>
        </g>
      </svg>
    `)
  },
  {
    id: 'cb_wanted',
    category: 'cowboy',
    name: 'ป้าย WANTED',
    dataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <defs>
          <filter id="parchmentShadow">
            <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000000" flood-opacity="0.45"/>
          </filter>
        </defs>
        <g filter="url(#parchmentShadow)">
          <!-- Parchment Paper -->
          <rect x="22" y="16" width="56" height="68" rx="2" fill="#fef3c7" stroke="#78350f" stroke-width="2"/>
          <rect x="25" y="19" width="50" height="62" fill="none" stroke="#b45309" stroke-width="1" stroke-dasharray="3,1.5"/>
          <!-- Header text -->
          <text x="50" y="32" text-anchor="middle" font-family="serif" font-weight="900" font-size="9" fill="#451a03" letter-spacing="1">WANTED</text>
          <!-- Star icon -->
          <text x="50" y="44" text-anchor="middle" font-size="9" fill="#d97706">★</text>
          <!-- Subtext -->
          <text x="50" y="55" text-anchor="middle" font-family="serif" font-weight="700" font-size="6" fill="#78350f">DEAD OR ALIVE</text>
          <!-- Reward -->
          <rect x="28" y="62" width="44" height="13" fill="#78350f" rx="1.5"/>
          <text x="50" y="71" text-anchor="middle" font-family="serif" font-weight="900" font-size="7" fill="#fef08a">$10,000</text>
        </g>
      </svg>
    `)
  },

  // --- SPARKLES & Y2K PACK ---
  {
    id: 'sp_star4',
    category: 'sparkles',
    name: 'ดาวเปล่งประกายทอง',
    dataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <defs>
          <linearGradient id="sparkleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fffbeb"/>
            <stop offset="30%" stop-color="#fef08a"/>
            <stop offset="70%" stop-color="#f59e0b"/>
            <stop offset="100%" stop-color="#d97706"/>
          </linearGradient>
        </defs>
        <g filter="drop-shadow(0px 0px 8px rgba(245,158,11,0.8))">
          <!-- 4-point Diamond Star -->
          <path d="M 50,12 Q 50,50 88,50 Q 50,50 50,88 Q 50,50 12,50 Q 50,50 50,12 Z" fill="url(#sparkleGrad)"/>
          <circle cx="50" cy="50" r="6" fill="#ffffff"/>
        </g>
      </svg>
    `)
  },
  {
    id: 'sp_star_double',
    category: 'sparkles',
    name: 'วิ้งวับคู่',
    dataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <g filter="drop-shadow(0px 0px 6px rgba(251,191,36,0.8))">
          <!-- Big Star -->
          <path d="M 42,16 Q 42,46 72,46 Q 42,46 42,76 Q 42,46 12,46 Q 42,46 42,16 Z" fill="#fbbf24"/>
          <circle cx="42" cy="46" r="4.5" fill="#ffffff"/>
          <!-- Little Star -->
          <path d="M 72,55 Q 72,70 87,70 Q 72,70 72,85 Q 72,70 57,70 Q 72,70 72,55 Z" fill="#fde047"/>
          <circle cx="72" cy="70" r="2.5" fill="#ffffff"/>
        </g>
      </svg>
    `)
  },
  {
    id: 'sp_heart_chrome',
    category: 'sparkles',
    name: 'หัวใจโครเมียม',
    dataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <defs>
          <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f43f5e"/>
            <stop offset="40%" stop-color="#e11d48"/>
            <stop offset="80%" stop-color="#be123c"/>
            <stop offset="100%" stop-color="#881337"/>
          </linearGradient>
        </defs>
        <g filter="drop-shadow(0px 4px 6px rgba(190,18,60,0.5))">
          <path d="M 50,82 C 20,62 14,42 22,26 C 29,14 42,18 50,30 C 58,18 71,14 78,26 C 86,42 80,62 50,82 Z" fill="url(#heartGrad)" stroke="#fda4af" stroke-width="2"/>
          <!-- Gloss Reflection -->
          <path d="M 28,26 C 24,34 26,45 32,52" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.75"/>
          <circle cx="36" cy="24" r="2.5" fill="#ffffff" opacity="0.8"/>
        </g>
      </svg>
    `)
  },
  {
    id: 'sp_ribbon',
    category: 'sparkles',
    name: 'โบว์ริบบิ้นชมพู',
    dataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <defs>
          <linearGradient id="bowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#f472b6"/>
            <stop offset="100%" stop-color="#db2777"/>
          </linearGradient>
        </defs>
        <g filter="drop-shadow(0px 3px 4px rgba(219,39,119,0.4))">
          <!-- Left Wing -->
          <path d="M 46,48 C 30,30 14,35 18,52 C 22,65 38,58 46,52 Z" fill="url(#bowGrad)" stroke="#be185d" stroke-width="1.8"/>
          <!-- Right Wing -->
          <path d="M 54,48 C 70,30 86,35 82,52 C 78,65 62,58 54,52 Z" fill="url(#bowGrad)" stroke="#be185d" stroke-width="1.8"/>
          <!-- Tails -->
          <path d="M 45,54 L 32,80 L 44,76 L 48,60 Z" fill="url(#bowGrad)" stroke="#be185d" stroke-width="1.5"/>
          <path d="M 55,54 L 68,80 L 56,76 L 52,60 Z" fill="url(#bowGrad)" stroke="#be185d" stroke-width="1.5"/>
          <!-- Center Knot -->
          <circle cx="50" cy="50" r="7" fill="#fbcfe8" stroke="#be185d" stroke-width="2"/>
        </g>
      </svg>
    `)
  },
  {
    id: 'sp_butterfly',
    category: 'sparkles',
    name: 'ผีเสื้อโฮโลแกรม',
    dataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <defs>
          <linearGradient id="wingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#67e8f9"/>
            <stop offset="50%" stop-color="#c084fc"/>
            <stop offset="100%" stop-color="#f472b6"/>
          </linearGradient>
        </defs>
        <g filter="drop-shadow(0px 3px 5px rgba(168,85,247,0.45))">
          <!-- Upper wings -->
          <path d="M 48,50 C 40,24 16,22 18,46 C 20,60 38,56 48,54 Z" fill="url(#wingGrad)" stroke="#ffffff" stroke-width="1.5"/>
          <path d="M 52,50 C 60,24 84,22 82,46 C 80,60 62,56 52,54 Z" fill="url(#wingGrad)" stroke="#ffffff" stroke-width="1.5"/>
          <!-- Lower wings -->
          <path d="M 48,55 C 38,62 26,72 32,82 C 40,86 46,72 48,58 Z" fill="url(#wingGrad)" stroke="#ffffff" stroke-width="1.2"/>
          <path d="M 52,55 C 62,62 74,72 68,82 C 60,86 54,72 52,58 Z" fill="url(#wingGrad)" stroke="#ffffff" stroke-width="1.2"/>
          <!-- Body -->
          <ellipse cx="50" cy="54" rx="2.5" ry="14" fill="#3b0764"/>
          <!-- Antennae -->
          <path d="M 49,42 Q 44,32 38,34 M 51,42 Q 56,32 62,34" fill="none" stroke="#3b0764" stroke-width="1.5" stroke-linecap="round"/>
        </g>
      </svg>
    `)
  },
  {
    id: 'sp_cherries',
    category: 'sparkles',
    name: 'เชอร์รี่วินเทจ',
    dataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <defs>
          <linearGradient id="cherryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f43f5e"/>
            <stop offset="70%" stop-color="#9f1239"/>
            <stop offset="100%" stop-color="#4c0519"/>
          </linearGradient>
        </defs>
        <g filter="drop-shadow(0px 3px 4px rgba(0,0,0,0.4))">
          <!-- Stems -->
          <path d="M 36,60 C 40,36 50,25 58,22" fill="none" stroke="#15803d" stroke-width="3" stroke-linecap="round"/>
          <path d="M 66,66 C 64,42 56,26 58,22" fill="none" stroke="#15803d" stroke-width="3" stroke-linecap="round"/>
          <!-- Leaf -->
          <path d="M 58,22 C 72,16 80,24 74,32 C 66,34 60,26 58,22 Z" fill="#22c55e" stroke="#15803d" stroke-width="1.5"/>
          <!-- Left Cherry -->
          <circle cx="34" cy="66" r="14" fill="url(#cherryGrad)"/>
          <ellipse cx="30" cy="62" rx="3.5" ry="2" fill="#ffffff" opacity="0.75" transform="rotate(-30 30 62)"/>
          <!-- Right Cherry -->
          <circle cx="68" cy="70" r="14" fill="url(#cherryGrad)"/>
          <ellipse cx="64" cy="66" rx="3.5" ry="2" fill="#ffffff" opacity="0.75" transform="rotate(-30 64 66)"/>
        </g>
      </svg>
    `)
  },

  // --- CUTE & NATURAL DOODLES PACK ---
  {
    id: 'ct_daisy',
    category: 'cute',
    name: 'ดอกเดซี่สีขาว',
    dataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <g filter="drop-shadow(0px 3px 4px rgba(0,0,0,0.25))">
          <!-- 8 Petals -->
          <g fill="#ffffff" stroke="#e4e4e7" stroke-width="1.5">
            <ellipse cx="50" cy="24" rx="7" ry="14"/>
            <ellipse cx="50" cy="76" rx="7" ry="14"/>
            <ellipse cx="24" cy="50" rx="14" ry="7"/>
            <ellipse cx="76" cy="50" rx="14" ry="7"/>
            <ellipse cx="32" cy="32" rx="7" ry="14" transform="rotate(-45 32 32)"/>
            <ellipse cx="68" cy="68" rx="7" ry="14" transform="rotate(-45 68 68)"/>
            <ellipse cx="68" cy="32" rx="7" ry="14" transform="rotate(45 68 32)"/>
            <ellipse cx="32" cy="68" rx="7" ry="14" transform="rotate(45 32 68)"/>
          </g>
          <!-- Center -->
          <circle cx="50" cy="50" r="12" fill="#eab308" stroke="#ca8a04" stroke-width="2"/>
          <circle cx="48" cy="48" r="3" fill="#fef08a"/>
        </g>
      </svg>
    `)
  },
  {
    id: 'ct_paw',
    category: 'cute',
    name: 'อุ้งเท้าน้องแมว',
    dataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <g filter="drop-shadow(0px 3px 4px rgba(0,0,0,0.25))">
          <!-- Main Pad -->
          <path d="M 32,60 C 26,68 35,82 50,82 C 65,82 74,68 68,60 C 62,52 38,52 32,60 Z" fill="#fb7185" stroke="#f43f5e" stroke-width="2"/>
          <!-- Toes -->
          <ellipse cx="28" cy="44" rx="7" ry="9" fill="#fb7185" stroke="#f43f5e" stroke-width="1.8" transform="rotate(-20 28 44)"/>
          <ellipse cx="43" cy="34" rx="7" ry="10" fill="#fb7185" stroke="#f43f5e" stroke-width="1.8" transform="rotate(-6 43 34)"/>
          <ellipse cx="57" cy="34" rx="7" ry="10" fill="#fb7185" stroke="#f43f5e" stroke-width="1.8" transform="rotate(6 57 34)"/>
          <ellipse cx="72" cy="44" rx="7" ry="9" fill="#fb7185" stroke="#f43f5e" stroke-width="1.8" transform="rotate(20 72 44)"/>
        </g>
      </svg>
    `)
  },
  {
    id: 'ct_kiss',
    category: 'cute',
    name: 'รอยจูบลิปสติก',
    dataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <g filter="drop-shadow(0px 3px 4px rgba(225,29,72,0.4))" fill="#e11d48">
          <!-- Upper Lip -->
          <path d="M 22,46 C 30,36 42,38 50,44 C 58,38 70,36 78,46 C 84,52 74,58 64,54 C 55,50 45,50 36,54 C 26,58 16,52 22,46 Z"/>
          <!-- Lower Lip -->
          <path d="M 26,56 C 36,53 64,53 74,56 C 80,68 65,74 50,74 C 35,74 20,68 26,56 Z"/>
        </g>
      </svg>
    `)
  },
  {
    id: 'ct_tape',
    category: 'cute',
    name: 'เทปวาชิแปะรูป',
    dataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <g filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.3))" transform="rotate(-15 50 50)">
          <!-- Washi Tape Strip with zigzag torn ends -->
          <path d="M 12,38 L 16,42 L 12,46 L 16,50 L 12,54 L 16,58 L 12,62 L 88,62 L 84,58 L 88,54 L 84,50 L 88,46 L 84,42 L 88,38 Z" fill="#fef08a" fill-opacity="0.85" stroke="#ca8a04" stroke-width="1"/>
          <!-- Grid Pattern on Tape -->
          <line x1="25" y1="38" x2="25" y2="62" stroke="#eab308" stroke-width="1" stroke-dasharray="2,2"/>
          <line x1="40" y1="38" x2="40" y2="62" stroke="#eab308" stroke-width="1" stroke-dasharray="2,2"/>
          <line x1="55" y1="38" x2="55" y2="62" stroke="#eab308" stroke-width="1" stroke-dasharray="2,2"/>
          <line x1="70" y1="38" x2="70" y2="62" stroke="#eab308" stroke-width="1" stroke-dasharray="2,2"/>
        </g>
      </svg>
    `)
  },

  // --- VINTAGE WORD ART PACK ---
  {
    id: 'wa_yeehaw',
    category: 'wordart',
    name: 'ป้าย YEEHAW!',
    dataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 60" width="120" height="60">
        <defs>
          <linearGradient id="yeehawGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#fef08a"/>
            <stop offset="50%" stop-color="#f59e0b"/>
            <stop offset="100%" stop-color="#b45309"/>
          </linearGradient>
        </defs>
        <g filter="drop-shadow(0px 3px 4px rgba(0,0,0,0.6))">
          <!-- Western Ribbon Plaque -->
          <path d="M 10,12 L 110,12 L 102,30 L 110,48 L 10,48 L 18,30 Z" fill="#451a03" stroke="#f59e0b" stroke-width="2.5"/>
          <text x="60" y="37" text-anchor="middle" font-family="serif" font-weight="900" font-size="18" fill="url(#yeehawGrad)" stroke="#1c1917" stroke-width="1" letter-spacing="1.5">YEEHAW!</text>
        </g>
      </svg>
    `)
  },
  {
    id: 'wa_howdy',
    category: 'wordart',
    name: 'ป้าย HOWDY',
    dataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 60" width="120" height="60">
        <defs>
          <linearGradient id="howdyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#fed7aa"/>
            <stop offset="50%" stop-color="#f97316"/>
            <stop offset="100%" stop-color="#c2410c"/>
          </linearGradient>
        </defs>
        <g filter="drop-shadow(0px 3px 4px rgba(0,0,0,0.5))">
          <rect x="14" y="14" width="92" height="34" rx="8" fill="#18181b" stroke="#f97316" stroke-width="2.5"/>
          <text x="60" y="37" text-anchor="middle" font-family="serif" font-weight="900" font-size="17" fill="url(#howdyGrad)" letter-spacing="2">HOWDY 🤠</text>
        </g>
      </svg>
    `)
  },
  {
    id: 'wa_wild',
    category: 'wordart',
    name: 'WILD WEST',
    dataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 60" width="120" height="60">
        <g filter="drop-shadow(0px 3px 4px rgba(0,0,0,0.6))">
          <ellipse cx="60" cy="30" rx="52" ry="20" fill="#78350f" stroke="#fbbf24" stroke-width="2"/>
          <text x="60" y="35" text-anchor="middle" font-family="serif" font-weight="900" font-size="14" fill="#fef08a" letter-spacing="1">★ WILD WEST ★</text>
        </g>
      </svg>
    `)
  },
  {
    id: 'wa_besties',
    category: 'wordart',
    name: 'BESTIES',
    dataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 60" width="120" height="60">
        <g filter="drop-shadow(0px 3px 4px rgba(236,72,153,0.4))">
          <rect x="16" y="14" width="88" height="32" rx="16" fill="#fdf2f8" stroke="#ec4899" stroke-width="2.5"/>
          <text x="60" y="36" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="16" fill="#db2777" letter-spacing="1">BESTIES ✨</text>
        </g>
      </svg>
    `)
  }
];
