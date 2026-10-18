// JEV Template Engine & Curated Western Photobooth Presets
// Guided by TypeSafe JEV principles: Structured Judgments, Balanced Margins & Zero-Obstruction Photo Framing

export const JEV_TEMPLATES = [
  {
    id: 'vintage_parchment',
    name: 'คราฟท์หนังตะวันตก (3 รูป)',
    badge: '3 รูป 📜',
    shots: 3,
    tag: 'คราฟท์โบราณ & ตะเข็บหนัง',
    description: 'แถบ 3 รูปสไตล์คาวบอยแท้ กระดาษหนังโบราณ ลายขอบเย็บด้าย ตราดาวนายอำเภอ และเกือกม้านำโชค',
    frameId: 'vintage_parchment',
    frame: {
      id: 'vintage_parchment',
      name: 'คราฟท์หนังตะวันตก',
      type: 'pattern',
      design: 'parchment',
      baseColor: '#fef3c7',
      accent: '#b45309',
      text: '#78350f',
      bg: 'radial-gradient(circle at 12px 12px, rgba(180,83,9,0.08) 1.5px, transparent 2px), linear-gradient(180deg, #fef3c7 0%, #fde68a 100%)',
    },
    brandText: '★ WILD WEST MEMORIES · 1889 ★',
    decorations: [
      { stickerId: 'cb_star', x: 50, y: 4.5, scale: 0.42, rotation: 0 },
      { stickerId: 'cb_boots', x: 6, y: 22, scale: 0.34, rotation: -12 },
      { stickerId: 'cb_horseshoe', x: 94, y: 30, scale: 0.32, rotation: 12 },
      { stickerId: 'cb_cactus', x: 6, y: 50, scale: 0.34, rotation: -6 },
      { stickerId: 'cb_hat', x: 94, y: 60, scale: 0.34, rotation: 10 },
      { stickerId: 'sp_star_double', x: 94, y: 80, scale: 0.34, rotation: 8 },
    ],
    aiPrompt: 'Wild West wanted poster photo strip background, aged vintage parchment paper texture, burned edges, rugged brown leather border with orange saddle stitching, brass rivets, antique saloon wood tabletop background, authentic 1880s western aesthetic, warm sepia tones, 8k resolution'
  },
  {
    id: 'wild_west_sky',
    name: 'คาวบอยสกายบลู (4 รูป)',
    badge: '4 รูป ✨',
    shots: 4,
    tag: 'ฟ้าคราม & เมฆนุ่ม',
    description: 'แถบ 4 รูปสไตล์เกาหลี Haru Film ฟ้าครามลายเมฆ นุ่มนวลละมุน ผสมกลิ่นอายคาวบอยหวานเท่',
    frameId: 'wild_west_sky',
    frame: {
      id: 'wild_west_sky',
      name: 'คาวบอยสกายบลู',
      type: 'pattern',
      design: 'sky_clouds',
      baseColor: '#bde0fe',
      accent: '#2563eb',
      text: '#1e3a8a',
      bg: 'radial-gradient(circle at 18px 18px, rgba(255,255,255,0.85) 2px, transparent 3px), linear-gradient(180deg, #cbe7ff 0%, #a0c4ff 100%)',
    },
    brandText: '♡ WILD WEST SKY · HARU FILM ♡',
    decorations: [
      { stickerId: 'sp_heart_lace', x: 50, y: 4.2, scale: 0.45, rotation: 0 },
      { stickerId: 'cb_fluffy_cloud', x: 6, y: 18, scale: 0.35, rotation: -6 },
      { stickerId: 'sp_star_double', x: 94, y: 25, scale: 0.32, rotation: 10 },
      { stickerId: 'ct_daisy', x: 6, y: 46, scale: 0.3, rotation: -12 },
      { stickerId: 'cb_star', x: 94, y: 55, scale: 0.32, rotation: 8 },
      { stickerId: 'cb_horseshoe', x: 6, y: 76, scale: 0.32, rotation: 14 },
      { stickerId: 'sp_butterfly', x: 94, y: 82, scale: 0.34, rotation: -10 },
    ],
    aiPrompt: 'Photobooth strip background, vertical pastel sky blue aesthetic, soft puffy fluffy white clouds, delicate cherry illustrations, tiny silver stars, vintage Korean Haru Film photo strip layout, cute scalloped lace photo frame borders, high key soft studio lighting, clean minimal vector details, 8k resolution, flat lay'
  },
  {
    id: 'dark_saloon_glam',
    name: 'ดาร์กซาลูนแกลม (4 รูป)',
    badge: '4 รูป 🖤',
    shots: 4,
    tag: 'ดำคริสตัล & โบว์เงิน',
    description: 'แถบ 4 รูปโทนดำกลิทเทอร์ลึก หรูหราเท่ หมุดเพชรคริสตัล และริบบิ้นโบว์เงินประกาย ขอบเฟรมทองสไตล์ภาพตัวอย่าง',
    frameId: 'dark_saloon_glam',
    frame: {
      id: 'dark_saloon_glam',
      name: 'ดาร์กซาลูนแกลม',
      type: 'pattern',
      design: 'dark_glam',
      baseColor: '#121214',
      accent: '#fbbf24',
      text: '#fef08a',
      bg: 'radial-gradient(circle at 14px 14px, rgba(255,255,255,0.2) 1.5px, transparent 2px), linear-gradient(180deg, #18181b 0%, #09090b 100%)',
    },
    brandText: '✦ HARU FILM · WILD NOIR ✦',
    decorations: [
      { stickerId: 'sp_bow_silver', x: 50, y: 4.2, scale: 0.45, rotation: 0 },
      { stickerId: 'sp_gem_rhinestone', x: 6, y: 16, scale: 0.32, rotation: 0 },
      { stickerId: 'sp_star4', x: 94, y: 24, scale: 0.34, rotation: 12 },
      { stickerId: 'sp_safety_pin', x: 6, y: 48, scale: 0.32, rotation: -25 },
      { stickerId: 'sp_heart_chrome', x: 94, y: 58, scale: 0.32, rotation: 10 },
      { stickerId: 'sp_gem_rhinestone', x: 6, y: 78, scale: 0.32, rotation: 0 },
      { stickerId: 'sp_star_double', x: 94, y: 84, scale: 0.34, rotation: -8 },
    ],
    aiPrompt: 'Vertical photobooth frame background, dark black glitter night texture, shimmering crystal rhinestones border, sparkling silver ribbon bows, metallic chrome stars, vintage cursive glitter typography, glossy film noir saloon chic, luxury western photostrip, high contrast, studio quality'
  }
];

// JEV Smart Auto-Decorator function (Semantic Judgment for layout balance)
export function getJevBalancedDecorations(mood = 'cowboy') {
  const pools = {
    cowboy: [
      ['wa_yeehaw', 'wa_howdy', 'cb_star', 'cb_wanted'],
      ['cb_hat', 'cb_star', 'cb_boots', 'cb_horseshoe', 'cb_cactus', 'cb_glasses'],
      ['sp_star4', 'sp_star_double', 'ct_tape', 'sp_safety_pin', 'sp_gem_rhinestone']
    ],
    cute: [
      ['sp_ribbon', 'sp_heart_lace', 'wa_besties'],
      ['ct_daisy', 'sp_butterfly', 'cb_fluffy_cloud', 'ct_paw', 'sp_bow_silver'],
      ['sp_heart_chrome', 'ct_kiss', 'sp_cherries', 'sp_star_double']
    ]
  };

  const pool = pools[mood] || pools.cowboy;
  const topBadge = pool[0][Math.floor(Math.random() * pool[0].length)];
  const sideL1 = pool[1][Math.floor(Math.random() * pool[1].length)];
  const sideR1 = pool[2][Math.floor(Math.random() * pool[2].length)];
  const sideL2 = pool[1][(Math.floor(Math.random() * pool[1].length) + 1) % pool[1].length];
  const sideR2 = pool[2][(Math.floor(Math.random() * pool[2].length) + 1) % pool[2].length];

  return [
    { stickerId: topBadge, x: 50, y: 4.2, scale: 0.42, rotation: 0 },
    { stickerId: sideL1, x: 6, y: 22, scale: 0.32, rotation: Math.floor((Math.random() - 0.5) * 16) },
    { stickerId: sideR1, x: 94, y: 32, scale: 0.32, rotation: Math.floor((Math.random() - 0.5) * 16) },
    { stickerId: sideL2, x: 6, y: 56, scale: 0.32, rotation: Math.floor((Math.random() - 0.5) * 16) },
    { stickerId: sideR2, x: 94, y: 70, scale: 0.32, rotation: Math.floor((Math.random() - 0.5) * 16) },
  ];
}
