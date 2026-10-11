// JEV Template Engine & Curated Western Photobooth Presets
// Guided by TypeSafe JEV principles: Structured Judgments, Balanced Composition & Aesthetic Harmony

export const JEV_TEMPLATES = [
  {
    id: 'wild_west_sky',
    name: 'คาวบอยสกายบลู (Wild West Sky)',
    badge: 'JEV แนะนำ ✨',
    tag: 'ฟ้าคราม & เมฆนุ่ม',
    description: 'สไตล์ฟ้าครามลายเมฆ นุ่มนวล ละมุน สไตล์ตู้ Haru Film ผสมกลิ่นอายคาวบอย พร้อมดาวประกายและดอกไม้',
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
    brandText: '♡  WILD WEST SKY · HARU FILM  ♡',
    decorations: [
      { stickerId: 'sp_heart_lace', x: 50, y: 5.2, scale: 0.85, rotation: 0 },
      { stickerId: 'cb_fluffy_cloud', x: 8, y: 16, scale: 0.6, rotation: -6 },
      { stickerId: 'sp_star_double', x: 92, y: 22, scale: 0.52, rotation: 10 },
      { stickerId: 'ct_daisy', x: 8, y: 46, scale: 0.48, rotation: -12 },
      { stickerId: 'cb_star', x: 92, y: 56, scale: 0.5, rotation: 8 },
      { stickerId: 'cb_horseshoe', x: 8, y: 76, scale: 0.5, rotation: 14 },
      { stickerId: 'sp_butterfly', x: 92, y: 82, scale: 0.52, rotation: -10 },
    ],
    aiPrompt: 'Photobooth strip background, vertical pastel sky blue aesthetic, soft puffy fluffy white clouds, delicate cherry illustrations, tiny silver stars, vintage Korean Haru Film photo strip layout, cute scalloped lace photo frame borders, high key soft studio lighting, clean minimal vector details, 8k resolution, flat lay'
  },
  {
    id: 'dark_saloon_glam',
    name: 'ดาร์กซาลูนแกลม (Wanted Noir)',
    badge: 'สไตล์ในรูปจริง 🖤',
    tag: 'ดำคริสตัล & โบว์เงิน',
    description: 'โทนดำกลิทเทอร์ลึก หรูหรา เท่ ป้าย Haru Film วิ้งวับ หมุดเพชรคริสตัล และริบบิ้นโบว์เงินประกาย',
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
      { stickerId: 'sp_bow_silver', x: 50, y: 5.5, scale: 0.85, rotation: 0 },
      { stickerId: 'sp_gem_rhinestone', x: 8, y: 16, scale: 0.5, rotation: 0 },
      { stickerId: 'sp_star4', x: 92, y: 24, scale: 0.58, rotation: 12 },
      { stickerId: 'sp_safety_pin', x: 8, y: 48, scale: 0.52, rotation: -25 },
      { stickerId: 'sp_heart_chrome', x: 92, y: 58, scale: 0.52, rotation: 10 },
      { stickerId: 'sp_gem_rhinestone', x: 8, y: 78, scale: 0.5, rotation: 0 },
      { stickerId: 'wa_yeehaw', x: 92, y: 84, scale: 0.62, rotation: -8 },
    ],
    aiPrompt: 'Vertical photobooth frame background, dark black glitter night texture, shimmering crystal rhinestones border, sparkling silver ribbon bows, metallic chrome stars, vintage cursive glitter typography, glossy film noir saloon chic, luxury western photostrip, high contrast, studio quality'
  },
  {
    id: 'vintage_parchment',
    name: 'คราฟท์หนังตะวันตก (Parchment & Stitches)',
    badge: 'คาวบอยแท้ 📜',
    tag: 'กระดาษโบราณ & หนังคราฟท์',
    description: 'กระดาษหนังคราฟท์โบราณ ลายขอบเย็บด้ายตะวันตก ตราดาวนายอำเภอทองคำ และป้าย WANTED คลาสสิก',
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
    brandText: '★  WILD WEST MEMORIES · 1889  ★',
    decorations: [
      { stickerId: 'cb_wanted', x: 50, y: 5.5, scale: 0.8, rotation: 0 },
      { stickerId: 'cb_boots', x: 8, y: 20, scale: 0.52, rotation: -12 },
      { stickerId: 'cb_horseshoe', x: 92, y: 30, scale: 0.5, rotation: 12 },
      { stickerId: 'cb_cactus', x: 8, y: 54, scale: 0.55, rotation: -6 },
      { stickerId: 'cb_hat', x: 92, y: 68, scale: 0.55, rotation: 12 },
      { stickerId: 'ct_tape', x: 50, y: 92, scale: 0.72, rotation: -4 },
    ],
    aiPrompt: 'Wild West wanted poster photo strip background, aged vintage parchment paper texture, burned edges, rugged brown leather border with orange saddle stitching, brass rivets, antique saloon wood tabletop background, authentic 1880s western aesthetic, warm sepia tones, 8k resolution'
  },
  {
    id: 'desert_sunset',
    name: 'ซันเซ็ตทไวไลท์ (Desert Twilight)',
    badge: 'โรแมนติก 🌅',
    tag: 'ส้มแอมเบอร์ & ม่วงทไวไลท์',
    description: 'ไล่เฉดสีส้มแอมเบอร์ถึงชมพูม่วงพลบค่ำ อบอุ่น มีเสน่ห์แบบยุคเรโทรเวสเทิร์น โรแมนติกน่าหลงใหล',
    frameId: 'desert_sunset',
    frame: {
      id: 'desert_sunset',
      name: 'ซันเซ็ตทไวไลท์',
      type: 'pattern',
      design: 'sunset',
      baseColor: '#fed7aa',
      accent: '#c2410c',
      text: '#7c2d12',
      bg: 'linear-gradient(180deg, #fdba74 0%, #f472b6 55%, #c084fc 100%)',
    },
    brandText: '♡  SUNSET SALOON MOMENTS  ♡',
    decorations: [
      { stickerId: 'wa_wild', x: 50, y: 5.5, scale: 0.82, rotation: 0 },
      { stickerId: 'sp_star4', x: 8, y: 22, scale: 0.55, rotation: 15 },
      { stickerId: 'sp_butterfly', x: 92, y: 32, scale: 0.52, rotation: -10 },
      { stickerId: 'cb_mustache', x: 8, y: 54, scale: 0.54, rotation: -8 },
      { stickerId: 'sp_heart_chrome', x: 92, y: 66, scale: 0.52, rotation: 12 },
      { stickerId: 'ct_kiss', x: 8, y: 82, scale: 0.55, rotation: 10 },
    ],
    aiPrompt: 'Retro Arizona desert sunset photobooth background, aesthetic gradient from golden amber orange to pastel rose pink and lavender violet, distant silhouette of saguaro cactus and desert mountains, soft glowing twilight stars, romantic vintage western vibe, ultra smooth gradient, cinematic lighting'
  },
  {
    id: 'cowboy_denim',
    name: 'คลาสสิกเดนิม (Vintage Denim & Rivets)',
    badge: 'ยีนส์สุดเท่ 👖',
    tag: 'ผ้ายีนส์ & ตะเข็บทอง',
    description: 'ผ้ายีนส์น้ำเงินเข้ม เดินด้ายคู่สีส้มทองและหมุดทองเหลือง สไตล์คาวบอยสมบุกสมบันแต่ชิคสุดๆ',
    frameId: 'cowboy_denim',
    frame: {
      id: 'cowboy_denim',
      name: 'คลาสสิกเดนิม',
      type: 'pattern',
      design: 'denim',
      baseColor: '#1e3a8a',
      accent: '#f59e0b',
      text: '#fde68a',
      bg: 'radial-gradient(circle at 10px 10px, rgba(255,255,255,0.12) 1px, transparent 1.5px), linear-gradient(180deg, #1e3a8a 0%, #172554 100%)',
    },
    brandText: '★  DENIM & BOOTS STUDIO  ★',
    decorations: [
      { stickerId: 'wa_howdy', x: 50, y: 5.5, scale: 0.8, rotation: 0 },
      { stickerId: 'cb_star', x: 8, y: 20, scale: 0.54, rotation: -10 },
      { stickerId: 'sp_star_double', x: 92, y: 30, scale: 0.55, rotation: 12 },
      { stickerId: 'cb_glasses', x: 8, y: 54, scale: 0.54, rotation: 6 },
      { stickerId: 'cb_horseshoe', x: 92, y: 68, scale: 0.52, rotation: -12 },
    ],
    aiPrompt: 'Classic indigo blue denim jeans texture photobooth background, heavy twill fabric weave, double yellow and copper orange contrast stitching along the border, shiny metallic brass rivets, vintage Levi western jacket vibe, crisp texture, photorealistic, studio shot'
  },
  {
    id: 'rodeo_pink',
    name: 'โรดีโอคาวเกิร์ล (Rodeo Sweet Pink)',
    badge: 'คาวเกิร์ลหวาน 🌸',
    tag: 'พาสเทลพิงค์ & โบว์น่ารัก',
    description: 'ชมพูพาสเทลหวานซ่อนเปรี้ยว ผสมผสานหมวกคาวบอย โบว์ริบบิ้นชมพู ดอกเดซี่ และเกือกม้านำโชค',
    frameId: 'rodeo_pink',
    frame: {
      id: 'rodeo_pink',
      name: 'โรดีโอคาวเกิร์ล',
      type: 'pattern',
      design: 'rodeo_pink',
      baseColor: '#fce7f3',
      accent: '#db2777',
      text: '#9d174d',
      bg: 'radial-gradient(circle at 15px 15px, rgba(255,255,255,0.7) 2px, transparent 2.5px), linear-gradient(180deg, #fdf2f8 0%, #fbcfe8 100%)',
    },
    brandText: '♡  RODEO SWEETHEART ♡ YEEHAW  ♡',
    decorations: [
      { stickerId: 'sp_ribbon', x: 50, y: 5.5, scale: 0.85, rotation: 0 },
      { stickerId: 'ct_daisy', x: 8, y: 18, scale: 0.48, rotation: 12 },
      { stickerId: 'cb_horseshoe', x: 92, y: 26, scale: 0.5, rotation: -10 },
      { stickerId: 'sp_heart_chrome', x: 8, y: 48, scale: 0.5, rotation: -8 },
      { stickerId: 'cb_hat', x: 92, y: 58, scale: 0.52, rotation: 14 },
      { stickerId: 'ct_kiss', x: 8, y: 78, scale: 0.52, rotation: 10 },
      { stickerId: 'wa_besties', x: 92, y: 84, scale: 0.62, rotation: -6 },
    ],
    aiPrompt: 'Cowgirl sweetheart aesthetic photobooth strip background, soft baby pink paper texture, gingham plaid pattern borders, cute pink bandana print, delicate white lace frills, golden lucky horseshoes, sparkles, y2k sweet western photostrip, high resolution, bright kawaii lighting'
  }
];

// JEV Smart Auto-Decorator function (Semantic Judgment for layout balance)
export function getJevBalancedDecorations(mood = 'cowboy') {
  const pools = {
    cowboy: [
      ['wa_yeehaw', 'wa_howdy', 'wa_wild', 'cb_wanted'],
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
    { stickerId: topBadge, x: 50, y: 5.5, scale: 0.82, rotation: 0 },
    { stickerId: sideL1, x: 8, y: 22, scale: 0.52, rotation: Math.floor((Math.random() - 0.5) * 20) },
    { stickerId: sideR1, x: 92, y: 32, scale: 0.52, rotation: Math.floor((Math.random() - 0.5) * 20) },
    { stickerId: sideL2, x: 8, y: 56, scale: 0.52, rotation: Math.floor((Math.random() - 0.5) * 20) },
    { stickerId: sideR2, x: 92, y: 70, scale: 0.52, rotation: Math.floor((Math.random() - 0.5) * 20) },
  ];
}
