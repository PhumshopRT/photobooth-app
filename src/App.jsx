import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Camera, Image as ImageIcon, Wand2, Download, QrCode, 
  Settings, Smile, ChevronRight, Sparkles, RefreshCcw, 
  X, Layers, Share2, Loader2, AlertCircle, ShieldAlert,
  Plus, Trash2, ImagePlus, Paintbrush, MonitorSmartphone, LayoutTemplate, Square, Move, Maximize2, Copy, Grid3X3, Type, Printer, Smartphone, Minus, FlipHorizontal, ArrowUp, ArrowDown
} from 'lucide-react';
import QRCode from 'qrcode';
import { STICKER_CATEGORIES, BUILTIN_STICKERS } from './stickerData.js';

// --- INITIAL CONFIGURATION & ASSETS ---
const LAYOUTS = {
  single: { id: 'single', name: '1 รูป (โพลารอยด์)', shots: 1, cols: 1, aspect: 'aspect-[3/4]', vW: 1200, vH: 1600 },
  strip: { id: 'strip', name: '3 รูป (แนวตั้ง)', shots: 3, cols: 1, aspect: 'aspect-[1/3]', vW: 800, vH: 2400 },
  strip_4: { id: 'strip_4', name: '4 รูป (แนวตั้ง)', shots: 4, cols: 1, aspect: 'aspect-[1/4]', vW: 800, vH: 3200 },
  scrapbook: {
    id: 'scrapbook', name: 'สมุดภาพหวานใจ (4 รูป)', shots: 4, cols: 1, aspect: 'aspect-[1/3]', vW: 800, vH: 2400,
    slots: [
      { id: 0, x: 13, y: 9, w: 74, h: 17 },
      { id: 1, x: 13, y: 31, w: 74, h: 17 },
      { id: 2, x: 13, y: 53, w: 74, h: 17 },
      { id: 3, x: 13, y: 75, w: 74, h: 17 },
    ],
    texts: [
      { id: 'scrapbook-top', text: '♡  OUR LITTLE MOMENTS  ♡', x: 50, y: 4.5, size: 5, color: '#3978a8' },
    ],
    frameId: 'scrapbook_blue',
    decorations: [
      { stickerId: 'sp_butterfly', x: 6, y: 20, scale: 0.34, rotation: -12 },
      { stickerId: 'sp_heart_chrome', x: 94, y: 29, scale: 0.34, rotation: 10 },
      { stickerId: 'ct_daisy', x: 6, y: 47, scale: 0.32, rotation: -8 },
      { stickerId: 'sp_star_double', x: 94, y: 54, scale: 0.34, rotation: 8 },
      { stickerId: 'ct_daisy', x: 6, y: 72, scale: 0.3, rotation: 12 },
      { stickerId: 'sp_butterfly', x: 94, y: 79, scale: 0.34, rotation: -10 },
    ],
    brandText: '♡ PHOTO MEMORIES ♡',
  },
  grid: { id: 'grid', name: '4 รูป (2x2)', shots: 4, cols: 2, aspect: 'aspect-square', vW: 1600, vH: 1600 },
  grid_6: { id: 'grid_6', name: '6 รูป (2x3)', shots: 6, cols: 2, aspect: 'aspect-[2/3]', vW: 1600, vH: 2400 },
};

const FILTERS = [
  { id: 'none', name: 'ปกติ', css: '' },
  { id: 'grayscale', name: 'ขาวดำ', css: 'grayscale(100%) contrast(120%)' },
  { id: 'sepia', name: 'วินเทจ', css: 'sepia(80%) contrast(110%) brightness(90%)' },
  { id: 'warm', name: 'อบอุ่น', css: 'sepia(30%) saturate(140%) hue-rotate(-10deg)' },
  { id: 'cool', name: 'เย็นตา', css: 'saturate(120%) hue-rotate(180deg) brightness(110%)' },
];

const DEFAULT_FRAMES = [
  { id: 'white', name: 'คลาสสิกขาว', type: 'color', bg: '#ffffff', text: '#000000' },
  { id: 'black', name: 'คลาสสิกดำ', type: 'color', bg: '#18181b', text: '#ffffff' },
  { id: 'y2k', name: 'Y2K ชมพู', type: 'color', bg: '#f472b6', text: '#ffffff' },
  { id: 'checkered', name: 'หมากรุก', type: 'pattern', bg: 'repeating-conic-gradient(#cbd5e1 0% 25%, #ffffff 0% 50%) 50% / 40px 40px', baseColor: '#ffffff', patternColor: '#cbd5e1', size: 40, text: '#000000' },
  { id: 'scrapbook_blue', name: 'สมุดภาพฟ้า', type: 'pattern', design: 'scrapbook', bg: 'radial-gradient(circle at 10px 10px, #fff9 1.5px, transparent 2px), linear-gradient(135deg,#d8efff,#a8d6f4)', baseColor: '#c7e5fa', accent: '#3978a8', text: '#173b5a' },
  { id: 'scrapbook_pink', name: 'สมุดภาพชมพู', type: 'pattern', design: 'scrapbook', bg: 'radial-gradient(circle at 10px 10px, #fff9 1.5px, transparent 2px), linear-gradient(135deg,#ffe1ec,#f5b9d0)', baseColor: '#f9d3e2', accent: '#b34c78', text: '#682640' }
];

const DEFAULT_STICKERS = ['👑', '✨', '💖', '🎉', '🌸', '😎', '🐱', '🎀', '🎈', '🔥', '💎', '🌈', '🦋'];
const LANDING_THEME_PRESETS = {
  cowboy: {
    title: 'Yeehaw Photo Booth',
    subtitle: 'ตู้ถ่ายรูปสไตล์คาวบอยตะวันตกสุดพรีเมียม ถ่ายช็อตเท่ๆ พร้อมบันทึกวิดีโอไทม์แลปส์เบื้องหลัง และสแกน QR Code รับรูปทันที! 🤠',
    buttonText: '🤠 เริ่มถ่ายรูปสไตล์คาวบอย',
    brandText: 'WILD WEST STUDIO',
    accentColor: '#d4a055',
    theme: 'cowboy',
  },
  korean: {
    title: 'Snap Your Best Moments',
    subtitle: 'บันทึกรอยยิ้มสไตล์เกาหลี พร้อมวิดีโอไทม์แลปส์เบื้องหลัง และดาวน์โหลดผ่าน QR Code ได้ทันที',
    buttonText: 'แตะเพื่อเริ่มถ่ายรูป ✨',
    brandText: 'HARU STUDIO',
    accentColor: '#818cf8',
    theme: 'korean',
  },
  y2k: {
    title: 'Y2K Cyber Photobooth',
    subtitle: 'ตู้ถ่ายรูปสุดชิคสไตล์ Y2K กลิ่นอายเรโทร ปรับแต่งสติกเกอร์ได้จุใจ!',
    buttonText: '⚡ START SHOOTING',
    brandText: 'Y2K BOOTH',
    accentColor: '#ec4899',
    theme: 'y2k',
  },
  film: {
    title: 'Analog Film Darkroom',
    subtitle: 'สัมผัสบรรยากาศฟิล์มคลาสสิก อบอุ่น โทนสีนุ่มนวลเหนือกาลเวลา',
    buttonText: '🎞️ เข้าตู้ถ่ายรูปฟิล์ม',
    brandText: 'RETRO FILM',
    accentColor: '#d97706',
    theme: 'film',
  },
};

// --- CUSTOM HOOK FOR LOCAL STORAGE ---
function useLocalStorage(key, initialValue) {
  const getMergedValue = (value) => {
    if (Array.isArray(initialValue)) {
      return Array.isArray(value) ? value : initialValue;
    }

    if (
      initialValue &&
      !Array.isArray(initialValue) &&
      typeof initialValue === 'object' &&
      value &&
      !Array.isArray(value) &&
      typeof value === 'object'
    ) {
      return { ...initialValue, ...value };
    }
    return value;
  };
  const initialValueRef = useRef(initialValue);
  const mergeValueRef = useRef(getMergedValue);
  initialValueRef.current = initialValue;
  mergeValueRef.current = getMergedValue;

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? getMergedValue(JSON.parse(item)) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  const [storageError, setStorageError] = useState('');
  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(getMergedValue(valueToStore));
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setStorageError('');
    } catch (error) {
      setStorageError(error?.name === 'QuotaExceededError'
        ? 'พื้นที่จัดเก็บในเบราว์เซอร์เต็ม กรุณาลด/ลบรูปพื้นหลังหรือส่งออกข้อมูลสำรอง'
        : 'เบราว์เซอร์ปฏิเสธการบันทึก กรุณาอนุญาตการจัดเก็บเว็บไซต์แล้วลองใหม่');
    }
  };
  useEffect(() => {
    const syncFromOtherTab = event => {
      if (event.key !== key) return;
      try {
        setStoredValue(event.newValue ? mergeValueRef.current(JSON.parse(event.newValue)) : initialValueRef.current);
      } catch {
        // Ignore malformed values from another tab and preserve the current good copy.
      }
    };
    window.addEventListener('storage', syncFromOtherTab);
    return () => window.removeEventListener('storage', syncFromOtherTab);
  }, [key]);
  return [storedValue, setValue, storageError];
}

// --- UTILS ---
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const isCustomLayout = (layout) => Array.isArray(layout?.slots) && layout.slots.length > 0;
const getLayoutShotCount = (layout) => isCustomLayout(layout) ? layout.slots.length : (layout?.shots || 1);
const getLayoutAspectStyle = (layout) => ({ aspectRatio: `${layout?.vW || 1200} / ${layout?.vH || 1600}` });
const getCaptureAspect = (layout, shotIndex = 0, photoConfig = {}) => {
  if (isCustomLayout(layout)) {
    const slot = layout.slots[Math.min(shotIndex, layout.slots.length - 1)];
    return (slot.w * layout.vW) / (slot.h * layout.vH);
  }
  const vW = layout?.vW || 1200;
  const vH = layout?.vH || 1600;
  const padding = vW * ((photoConfig.padding ?? 5) / 100);
  const spacing = vW * ((photoConfig.spacing ?? 5) / 100);
  const cols = layout?.cols || 1;
  const rows = Math.ceil(getLayoutShotCount(layout) / cols);
  const slotW = (vW - padding * 2 - spacing * (cols - 1)) / cols;
  const slotH = (vH - padding - vH * 0.1 - spacing * (rows - 1)) / rows;
  return slotW / slotH;
};
const getSafeCustomLayouts = (layouts) => (
  Array.isArray(layouts)
    ? layouts.filter(layout => (
        layout &&
        typeof layout === 'object' &&
        Array.isArray(layout.slots) &&
        layout.slots.length > 0
      ))
    : []
);

const drawScrapbookPaper = (ctx, width, height, frame) => {
  ctx.fillStyle = frame.baseColor || '#dceeff';
  ctx.fillRect(0, 0, width, height);
  const accent = frame.accent || '#3978a8';
  const inset = Math.max(24, width * 0.035);
  const cell = Math.max(72, width * 0.12);
  ctx.save();
  ctx.globalAlpha = 0.22;
  ctx.fillStyle = '#ffffff';
  for (let y = cell / 2; y < height; y += cell) {
    for (let x = cell / 2; x < width; x += cell) {
      ctx.beginPath();
      ctx.arc(x, y, Math.max(3, width * 0.004), 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 0.78;
  ctx.strokeStyle = accent;
  ctx.lineWidth = Math.max(3, width * 0.006);
  ctx.setLineDash([width * 0.012, width * 0.009]);
  ctx.strokeRect(inset, inset, width - inset * 2, height - inset * 2);
  ctx.setLineDash([]);
  const drawStar = (x, y, radius) => {
    ctx.fillStyle = accent;
    ctx.beginPath();
    for (let point = 0; point < 10; point++) {
      const angle = -Math.PI / 2 + (point * Math.PI) / 5;
      const r = point % 2 ? radius * 0.42 : radius;
      const px = x + Math.cos(angle) * r;
      const py = y + Math.sin(angle) * r;
      if (point === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
  };
  const radius = Math.max(10, width * 0.018);
  for (let i = 0; i < 9; i++) {
    const x = i % 2 ? inset + radius : width - inset - radius;
    const y = height * (0.08 + i * 0.105);
    drawStar(x, y, radius * (i % 3 === 0 ? 1.1 : 0.65));
  }
  ctx.restore();
};

const drawImageCover = (ctx, img, x, y, width, height) => {
  const imageAspect = img.width / img.height;
  const slotAspect = width / height;
  let sourceWidth;
  let sourceHeight;
  let sourceX;
  let sourceY;

  if (imageAspect > slotAspect) {
    sourceHeight = img.height;
    sourceWidth = img.height * slotAspect;
    sourceX = (img.width - sourceWidth) / 2;
    sourceY = 0;
  } else {
    sourceWidth = img.width;
    sourceHeight = img.width / slotAspect;
    sourceX = 0;
    sourceY = (img.height - sourceHeight) / 2;
  }

  ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
};

const drawVideoCover = (ctx, video, x, y, width, height) => {
  const sourceWidth = video.videoWidth || width;
  const sourceHeight = video.videoHeight || height;
  const sourceAspect = sourceWidth / sourceHeight;
  const targetAspect = width / height;
  let cropWidth = sourceWidth;
  let cropHeight = sourceHeight;
  let cropX = 0;
  let cropY = 0;
  if (sourceAspect > targetAspect) {
    cropWidth = sourceHeight * targetAspect;
    cropX = (sourceWidth - cropWidth) / 2;
  } else {
    cropHeight = sourceWidth / targetAspect;
    cropY = (sourceHeight - cropHeight) / 2;
  }
  ctx.drawImage(video, cropX, cropY, cropWidth, cropHeight, x, y, width, height);
};

// --- AUDIO TONE SYNTHESIZER ---
const playAudioTone = (type) => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (type === 'beep') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else if (type === 'pop') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === 'tap') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'shutter') {
      const bufferSize = ctx.sampleRate * 0.08;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 1200;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    }
  } catch (e) {
    // audio context muted or not permitted
  }
};

// --- DYNAMIC AURORA LIQUID BACKGROUND ---
function AuroraBackground({ theme = 'cowboy', bgImage = '', bgColor1 = '#09090b', bgColor2 = '#1a0e04' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (bgImage) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height;
    let time = 0;

    let themeColors = {
      blob1: '#f59e0b', // Glowing Amber
      blob2: '#c2410c', // Terracotta Desert Sunset
      blob3: '#78350f', // Rich Saddle Leather
      blob4: '#d97706', // Sunset Gold
    };

    if (theme === 'korean') {
      themeColors = { blob1: '#818cf8', blob2: '#c084fc', blob3: '#f472b6', blob4: '#38bdf8' };
    } else if (theme === 'y2k') {
      themeColors = { blob1: '#06b6d4', blob2: '#ec4899', blob3: '#8b5cf6', blob4: '#10b981' };
    } else if (theme === 'film') {
      themeColors = { blob1: '#d97706', blob2: '#b45309', blob3: '#78350f', blob4: '#f59e0b' };
    }

    const resize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Floating golden embers / dust particles
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * (window.innerWidth || 1200),
      y: Math.random() * (window.innerHeight || 800),
      radius: Math.random() * 2.2 + 0.6,
      speedY: Math.random() * 0.35 + 0.12,
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.6 + 0.2,
      twinkle: Math.random() * Math.PI * 2
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.007;

      // 1. Draw glowing liquid aurora blobs
      const blobs = [
        {
          x: width * 0.3 + Math.sin(time * 0.7) * 120,
          y: height * 0.3 + Math.cos(time * 0.9) * 100,
          radius: Math.min(width, height) * 0.55,
          color: themeColors.blob1,
          opacity: 0.35
        },
        {
          x: width * 0.7 + Math.cos(time * 0.8) * 140,
          y: height * 0.4 + Math.sin(time * 0.6) * 120,
          radius: Math.min(width, height) * 0.58,
          color: themeColors.blob2,
          opacity: 0.3
        },
        {
          x: width * 0.5 + Math.sin(time * 1.1) * 150,
          y: height * 0.75 + Math.cos(time * 0.5) * 110,
          radius: Math.min(width, height) * 0.62,
          color: themeColors.blob3,
          opacity: 0.25
        },
        {
          x: width * 0.2 + Math.cos(time * 0.5) * 100,
          y: height * 0.7 + Math.sin(time * 0.8) * 90,
          radius: Math.min(width, height) * 0.48,
          color: themeColors.blob4,
          opacity: 0.22
        }
      ];

      blobs.forEach(b => {
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        grad.addColorStop(0, b.color);
        grad.addColorStop(1, 'transparent');
        ctx.save();
        ctx.globalAlpha = b.opacity;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 2. Draw floating golden embers / campfire sparks
      particles.forEach(p => {
        p.y -= p.speedY;
        p.x += Math.sin(time + p.twinkle) * 0.3;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        ctx.save();
        ctx.fillStyle = theme === 'cowboy' ? '#fbbf24' : '#ffffff';
        ctx.globalAlpha = p.opacity * (0.6 + 0.4 * Math.sin(time * 2 + p.twinkle));
        ctx.shadowColor = theme === 'cowboy' ? '#f59e0b' : '#818cf8';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, bgImage]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" style={{ background: bgImage ? undefined : `linear-gradient(145deg, ${bgColor1}, ${bgColor2})` }}>
      {bgImage ? (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        </div>
      ) : (
        <>
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }} 
          />
        </>
      )}
    </div>
  );
}

// --- MAIN APP COMPONENT ---
export default function App() {
  const [view, setView] = useState('landing'); 
  const DEFAULT_CLOUD_CONFIG = { cloudName: '', uploadPreset: '' };
  const [cloudConfig, setCloudConfig] = useLocalStorage('studio-booth-cloud', DEFAULT_CLOUD_CONFIG);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('download') === '1') {
      setView('download');
    }
  }, []);

  const [config, setConfig] = useState({ layout: LAYOUTS.strip, filter: FILTERS[0], timer: 3 });
  const [photos, setPhotos] = useState([]);
  const [finalImage, setFinalImage] = useState(null);
  const [finalVideo, setFinalVideo] = useState(null);

  // Admin Managed Assets
  const [customFrames, setCustomFrames] = useLocalStorage('studio-booth-frames', DEFAULT_FRAMES);
  const [customStickers, setCustomStickers] = useLocalStorage('studio-booth-stickers', DEFAULT_STICKERS);
  const [enabledBuiltinStickerIds, setEnabledBuiltinStickerIds] = useLocalStorage(
    'studio-booth-enabled-stickers',
    BUILTIN_STICKERS.map(sticker => sticker.id)
  );

  const DEFAULT_LANDING_CONFIG = {
    title: 'Yeehaw Photo Booth',
    subtitle: 'ถ่ายรูปสไตล์คาวบอยตะวันตก กรอบสวย สติกเกอร์จัดเต็ม พร้อมวิดีโอไทม์แลปส์สุดเท่!',
    buttonText: '🤠 แตะเพื่อเริ่มถ่ายรูป',
    brandText: 'WILD WEST STUDIO',
    shareTitle: 'รูปภาพของคุณพร้อมแล้ว!',
    shareSubtitle: 'สแกนคิวอาร์โค้ดเพื่อเซฟลงมือถือได้เลย หรือกดปุ่มดาวน์โหลดด้านล่าง',
    fontFamily: 'Kanit',
    bgColor1: '#09090b',
    bgColor2: '#1a0e04',
    accentColor: '#d4a055',
    showStars: true,
    bgImage: '',
    theme: 'cowboy',
  };
  const [landingConfig, setLandingConfig, landingSaveError] = useLocalStorage('studio-booth-landing', DEFAULT_LANDING_CONFIG);
  const DEFAULT_PHOTO_CONFIG = { borderRadius: 0, padding: 5, spacing: 5 };
  const [photoConfig, setPhotoConfig] = useLocalStorage('studio-booth-photo', DEFAULT_PHOTO_CONFIG);
  const [customLayouts, setCustomLayouts] = useLocalStorage('studio-booth-custom-layouts', []);

  useEffect(() => {
    setCustomFrames(current => {
      const saved = Array.isArray(current) ? current : [];
      const savedIds = new Set(saved.map(frame => frame?.id));
      const missingDefaults = DEFAULT_FRAMES.filter(frame => !savedIds.has(frame.id));
      return missingDefaults.length ? [...saved, ...missingDefaults] : saved;
    });
  }, [setCustomFrames]);

  useEffect(() => {
    const font = landingConfig?.fontFamily || 'Kanit';
    document.body.style.fontFamily = `'${font}', sans-serif`;
    const linkId = `font-${font}`;
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}:wght@300;400;500;600;700;800&display=swap`;
      document.head.appendChild(link);
    }
  }, [landingConfig?.fontFamily]);

  const resetSession = () => {
    setPhotos([]);
    setFinalImage(null);
    setFinalVideo(null);
    setView('landing');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans overflow-hidden flex flex-col selection:bg-indigo-500/30">
      {view === 'landing' && (
        <LandingView 
          onStart={() => setView('setup')} 
          onAdmin={() => setView('admin')} 
          config={landingConfig}
          onUpdateConfig={setLandingConfig}
        />
      )}
      
      {view === 'admin' && (
        <AdminView 
          frames={customFrames} setFrames={setCustomFrames}
          stickers={customStickers} setStickers={setCustomStickers}
          enabledBuiltinStickerIds={enabledBuiltinStickerIds} setEnabledBuiltinStickerIds={setEnabledBuiltinStickerIds}
          landingConfig={landingConfig} setLandingConfig={setLandingConfig} landingSaveError={landingSaveError}
          cloudConfig={cloudConfig} setCloudConfig={setCloudConfig}
          photoConfig={photoConfig} setPhotoConfig={setPhotoConfig}
          customLayouts={customLayouts} setCustomLayouts={setCustomLayouts}
          onBack={() => setView('landing')} 
        />
      )}

      {view === 'setup' && (
        <SetupView 
          config={config} setConfig={setConfig} 
          customLayouts={customLayouts}
          onNext={() => setView('booth')} 
          onBack={() => setView('landing')} 
        />
      )}
      
      {view === 'booth' && (
        <BoothView 
          config={config} 
          photoConfig={photoConfig}
          onComplete={(captured, video) => { setPhotos(captured); setFinalVideo(video); setView('edit'); }} 
          onCancel={() => setView('setup')}
        />
      )}
      
      {view === 'edit' && (
        <EditorView 
          config={config} photos={photos} 
          availableFrames={customFrames} availableStickers={customStickers} enabledBuiltinStickerIds={enabledBuiltinStickerIds}
          brandText={landingConfig?.brandText || 'STUDIO BOOTH'}
          fontFamily={landingConfig?.fontFamily || 'Kanit'}
          photoConfig={photoConfig}
          finalVideo={finalVideo}
          onExport={(imgData, videoBlob) => { setFinalImage(imgData); setFinalVideo(videoBlob); setView('share'); }}
          onRetake={() => setView('booth')}
        />
      )}
      
      {view === 'share' && <ShareView image={finalImage} videoBlob={finalVideo} cloudConfig={cloudConfig} landingConfig={landingConfig} onDone={resetSession} />}

      {view === 'download' && <DownloadView />}
    </div>
  );
}

// --- VIEWS ---

function LandingView({ onStart, onAdmin, config, onUpdateConfig, preview = false }) {
  const currentTheme = config?.theme || 'cowboy';
  const isCowboy = currentTheme === 'cowboy';
  const accentColor = config?.accentColor || (isCowboy ? '#d4a055' : currentTheme === 'korean' ? '#818cf8' : currentTheme === 'y2k' ? '#ec4899' : '#d97706');

  const title = config?.title?.trim() || (isCowboy ? 'Yeehaw Photo Booth' : 'Snap Your Best Moments');
  const subtitle = config?.subtitle?.trim() || (isCowboy ? 'ตู้ถ่ายรูปสไตล์คาวบอยตะวันตกสุดพรีเมียม ถ่ายช็อตเท่ๆ พร้อมบันทึกวิดีโอไทม์แลปส์เบื้องหลัง และสแกน QR Code รับรูปทันที! 🤠' : 'บันทึกรอยยิ้มสไตล์เกาหลี พร้อมวิดีโอไทม์แลปส์เบื้องหลัง และดาวน์โหลดผ่าน QR Code ได้ทันที');
  const buttonText = config?.buttonText?.trim() || (isCowboy ? '🤠 เริ่มถ่ายรูปสไตล์คาวบอย' : 'แตะเพื่อเริ่มถ่ายรูป ✨');

  const selectTheme = (newTheme) => {
    if (!onUpdateConfig) return;
    onUpdateConfig({ ...config, ...LANDING_THEME_PRESETS[newTheme] });
  };

  return (
    <div className={`${preview ? 'w-full h-full min-h-0' : 'flex-1 min-h-screen'} flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden bg-zinc-950 text-zinc-100 select-none`}>
      <AuroraBackground theme={currentTheme} bgImage={config?.bgImage} bgColor1={config?.bgColor1} bgColor2={config?.bgColor2} />

      {/* Floating Cowboy Ambient Charms */}
      {isCowboy && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[20%] left-[6%] text-3xl sm:text-4xl animate-float opacity-30" style={{ animationDelay: '0s' }}>🌵</div>
          <div className="absolute bottom-[20%] left-[10%] text-2xl sm:text-3xl animate-float opacity-30" style={{ animationDelay: '2s' }}>🐎</div>
          <div className="absolute top-[26%] right-[8%] text-3xl sm:text-4xl animate-sway opacity-30" style={{ animationDelay: '0.8s' }}>🤠</div>
          <div className="absolute bottom-[24%] right-[12%] text-2xl sm:text-3xl animate-float opacity-30" style={{ animationDelay: '2.8s' }}>👢</div>
          {config?.showStars !== false && <>
            <div className="absolute top-[12%] right-[26%] text-xl sm:text-2xl animate-twinkle opacity-25">⭐</div>
            <div className="absolute bottom-[14%] left-[30%] text-xl sm:text-2xl animate-twinkle opacity-25" style={{ animationDelay: '1.2s' }}>⭐</div>
          </>}
        </div>
      )}

      {/* Top Bar: Brand Badge & Theme Switcher */}
      <header className="relative z-10 flex flex-wrap items-center justify-between gap-4 w-full max-w-6xl mx-auto pt-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-amber-500/30 shadow-lg backdrop-blur-md">
            <span className="text-amber-400 text-sm">⭐</span>
            <span className="text-xs font-semibold tracking-wide text-amber-200">
              {config?.brandText || 'WILD WEST STUDIO'} • PHOTO BOOTH KIOSK
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-white/10 text-[11px] text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            CAMERA READY
          </div>
        </div>

        {/* Theme Quick Switcher */}
        <div className={`${preview ? 'flex flex-wrap justify-center' : 'flex'} items-center gap-1.5 p-1 rounded-2xl glass border-white/10 text-xs shadow-md`}>
          <button
            onClick={() => selectTheme('cowboy')}
            className={`${preview ? 'px-2 py-1 text-[10px]' : 'px-3.5 py-1.5'} rounded-xl font-bold transition-all cursor-pointer ${
              currentTheme === 'cowboy' ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/40 ring-1 ring-amber-400/50' : 'text-zinc-400 hover:text-white'
            }`}
          >
            🤠 คาวบอย (Cowboy)
          </button>
          <button
            onClick={() => selectTheme('korean')}
            className={`${preview ? 'px-2 py-1 text-[10px]' : 'px-3 py-1.5'} rounded-xl font-medium transition-all cursor-pointer ${
              currentTheme === 'korean' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-zinc-400 hover:text-white'
            }`}
          >
            🌸 เกาหลี
          </button>
          <button
            onClick={() => selectTheme('y2k')}
            className={`${preview ? 'px-2 py-1 text-[10px]' : 'px-3 py-1.5'} rounded-xl font-medium transition-all cursor-pointer ${
              currentTheme === 'y2k' ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30' : 'text-zinc-400 hover:text-white'
            }`}
          >
            ⚡ Y2K
          </button>
          <button
            onClick={() => selectTheme('film')}
            className={`${preview ? 'px-2 py-1 text-[10px]' : 'px-3 py-1.5'} rounded-xl font-medium transition-all cursor-pointer ${
              currentTheme === 'film' ? 'bg-amber-700 text-white shadow-lg shadow-amber-700/30' : 'text-zinc-400 hover:text-white'
            }`}
          >
            🎞️ ฟิล์ม
          </button>
        </div>
      </header>

      {/* Main Content Hero */}
      <main className={`relative z-10 flex-1 flex flex-col ${preview ? 'items-center justify-center gap-4 py-3' : 'md:flex-row items-center justify-center gap-12 py-8'} w-full ${preview ? '' : 'max-w-6xl'} mx-auto my-auto`}>
        {/* Left Column: Heading, Subtitle & CTA */}
        <div className={`flex-1 text-center ${preview ? 'space-y-3 w-full' : 'md:text-left space-y-6 max-w-xl'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold glass border border-amber-500/30 text-amber-200/90 shadow-inner">
            <span className="text-amber-400 text-sm">🌵</span>
            <span>SALOON EXPERIENCE • HD PRINT & TIMELAPSE VIDEO 🐎</span>
          </div>

          <h1 className={`${preview ? 'text-3xl' : 'text-4xl sm:text-6xl lg:text-7xl'} font-extrabold tracking-tight leading-[1.08] font-serif`}>
            <span className={isCowboy ? 'bg-clip-text text-transparent bg-gradient-to-r from-amber-100 via-amber-300 to-orange-400 drop-shadow-[0_4px_24px_rgba(217,119,6,0.45)]' : ''} style={isCowboy ? {} : { color: accentColor }}>{title}</span>
          </h1>

          <p className={`${preview ? 'text-xs' : 'text-base sm:text-lg'} text-amber-100/85 leading-relaxed font-light`}>
            {subtitle}
          </p>

          {/* Three Feature Capsules */}
          <div className={`flex flex-wrap gap-2 justify-center ${preview ? '' : 'md:justify-start'} pt-1`}>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full glass border border-white/10 text-xs text-amber-200/80">
              <span>⚡</span> <span>คมชัดระดับ Studio HD</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full glass border border-white/10 text-xs text-amber-200/80">
              <span>🎬</span> <span>บันทึก Timelapse อัตโนมัติ</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full glass border border-white/10 text-xs text-amber-200/80">
              <span>📲</span> <span>สแกน QR รับรูปทันที</span>
            </div>
          </div>

          <div className={`pt-2 flex ${preview ? 'flex-col' : 'flex-col sm:flex-row'} items-center gap-4 justify-center ${preview ? '' : 'md:justify-start'}`}>
            <button
              onClick={onStart}
              className={`group relative ${preview ? 'px-5 py-3 text-sm' : 'px-10 py-5 text-lg'} rounded-2xl font-bold transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-3 overflow-hidden cursor-pointer border border-amber-400/40 ring-2 ring-amber-500/20`}
              style={{
                background: isCowboy
                  ? 'linear-gradient(135deg, #d97706 0%, #b45309 50%, #78350f 100%)'
                  : `linear-gradient(135deg, ${accentColor}, #6366f1)`,
                color: '#ffffff',
                boxShadow: isCowboy
                  ? '0 12px 45px rgba(217, 119, 6, 0.55)'
                  : `0 10px 40px ${accentColor}40`
              }}
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Camera className={`${preview ? 'w-4 h-4' : 'w-6 h-6'} transition-transform group-hover:rotate-12 text-yellow-200`} />
              <span className="font-serif tracking-wide">{buttonText}</span>
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>

            <span className="text-xs text-amber-200/60 font-mono tracking-wider hidden sm:block">
              TOUCH SCREEN OR CLICK TO START
            </span>
          </div>
        </div>

        {/* Right Column: 3D Floating Interactive Photo Strips Showcase */}
        {!preview && <div className="relative w-full max-w-[340px] h-[460px] flex items-center justify-center animate-float-slow">
          {/* Background Ambient Glow */}
          <div 
            className="absolute w-80 h-80 rounded-full blur-3xl opacity-45 -z-10" 
            style={{ background: `radial-gradient(circle, ${accentColor}, #ea580c)` }} 
          />

          {/* Left Tilt Strip (Desert Parchment / Wild West Card) */}
          <div className="absolute w-38 bg-[#fefce8] p-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] transform -rotate-12 -translate-x-14 translate-y-3 transition-transform duration-500 hover:rotate-0 hover:scale-105 z-10 border border-amber-200/90 cursor-pointer">
            <div className="space-y-1.5">
              <div className="h-26 bg-amber-100 rounded-xl overflow-hidden relative shadow-inner">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" alt="Preview 1" className="w-full h-full object-cover sepia-[0.3]" />
                <span className="absolute top-1.5 right-1.5 text-base drop-shadow">🤠</span>
              </div>
              <div className="h-26 bg-amber-100 rounded-xl overflow-hidden relative shadow-inner">
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80" alt="Preview 2" className="w-full h-full object-cover sepia-[0.2]" />
                <span className="absolute bottom-1.5 left-1.5 text-base drop-shadow">⭐</span>
              </div>
            </div>
            <div className="pt-2 text-center text-[10px] font-bold tracking-widest text-amber-950 font-serif">
              WILD WEST • STUDIO
            </div>
          </div>

          {/* Right Tilt Strip (Dark Saddle Leather Card) */}
          <div className="absolute w-38 bg-[#1c120c] p-3 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] transform rotate-6 translate-x-12 -translate-y-3 transition-transform duration-500 hover:rotate-0 hover:scale-105 z-20 border border-amber-500/40 cursor-pointer">
            <div className="space-y-1.5">
              <div className="h-26 bg-[#2e1c12] rounded-xl overflow-hidden relative shadow-inner">
                <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80" alt="Preview 3" className="w-full h-full object-cover" />
                <span className="absolute top-1.5 right-1.5 text-base drop-shadow">👢</span>
              </div>
              <div className="h-26 bg-[#2e1c12] rounded-xl overflow-hidden relative shadow-inner">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80" alt="Preview 4" className="w-full h-full object-cover" />
                <span className="absolute bottom-1.5 left-1.5 text-base drop-shadow">🌵</span>
              </div>
            </div>
            <div className="pt-2 text-center text-[10px] font-bold tracking-widest text-amber-400 font-serif">
              WANTED • YEEHAW
            </div>
          </div>
        </div>}
      </main>

      {/* Footer: Admin Settings Trigger */}
      {!preview && <footer className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between text-xs text-amber-200/60 pb-2">
        <button
          onClick={onAdmin}
          className="p-2.5 glass rounded-full opacity-35 hover:opacity-100 transition-all text-amber-400 hover:text-amber-200 hover:scale-110 shadow-lg cursor-pointer border border-amber-500/20"
          title="ตั้งค่าผู้ดูแลระบบ (Admin)"
        >
          <Settings className="w-4 h-4" />
        </button>
        <span className="text-[11px] font-mono tracking-wider">TAP ANYWHERE TO INTERACT • WILD WEST BOOTH</span>
      </footer>}
    </div>
  );
}

// --- NEW: ADMIN DASHBOARD ---

// --- CUSTOM LAYOUT EDITOR ---
const CANVAS_PRESETS = [
  { name: '4×6 แนวตั้ง', vW: 1200, vH: 1800 },
  { name: '2×6 สตริป', vW: 800, vH: 2400 },
  { name: '4×4 สี่เหลี่ยม', vW: 1600, vH: 1600 },
  { name: '4×6 แนวนอน', vW: 1800, vH: 1200 },
];

const LAYOUT_TEMPLATES = [
  { name: '2 รูปเท่ากัน (บน-ล่าง)', vW: 1200, vH: 1800, slots: [
    { id: 0, x: 5, y: 5, w: 90, h: 42 },
    { id: 1, x: 5, y: 52, w: 90, h: 42 },
  ]},
  { name: '4 รูป (2×2)', vW: 1600, vH: 1600, slots: [
    { id: 0, x: 3, y: 3, w: 46, h: 44 },
    { id: 1, x: 51, y: 3, w: 46, h: 44 },
    { id: 2, x: 3, y: 50, w: 46, h: 44 },
    { id: 3, x: 51, y: 50, w: 46, h: 44 },
  ]},
  { name: '1 ใหญ่ + 2 เล็ก', vW: 1200, vH: 1800, slots: [
    { id: 0, x: 5, y: 5, w: 90, h: 55 },
    { id: 1, x: 5, y: 63, w: 43, h: 32 },
    { id: 2, x: 52, y: 63, w: 43, h: 32 },
  ]},
  { name: '3 รูปสตริป', vW: 800, vH: 2400, slots: [
    { id: 0, x: 5, y: 3, w: 90, h: 28 },
    { id: 1, x: 5, y: 34, w: 90, h: 28 },
    { id: 2, x: 5, y: 65, w: 90, h: 28 },
  ]},
  { name: '1 ใหญ่ + 3 เล็ก', vW: 1600, vH: 1600, slots: [
    { id: 0, x: 3, y: 3, w: 60, h: 60 },
    { id: 1, x: 66, y: 3, w: 31, h: 28 },
    { id: 2, x: 66, y: 34, w: 31, h: 28 },
    { id: 3, x: 3, y: 66, w: 94, h: 28 },
  ]},
];

const PREVIEW_LAYOUTS = [LAYOUTS.single, LAYOUTS.strip, LAYOUTS.strip_4, LAYOUTS.scrapbook];
const getPresetOverrideId = (layoutId) => `preset_${layoutId}`;
const getAvailableLayouts = (customLayouts = []) => {
  const safeLayouts = getSafeCustomLayouts(customLayouts);
  const presets = PREVIEW_LAYOUTS.map(base => {
    const saved = safeLayouts.find(layout => layout.id === getPresetOverrideId(base.id));
    return saved ? { ...base, ...saved, id: base.id, presetOverride: true } : base;
  });
  const custom = safeLayouts.filter(layout => !layout.presetOverride && !PREVIEW_LAYOUTS.some(base => layout.id === getPresetOverrideId(base.id)));
  return [...presets, ...custom];
};

const getEditableSlots = (layout) => layout.slots || Array.from({ length: layout.shots || 1 }, (_, i) => ({
  id: i,
  x: layout.cols === 2 ? (i % 2) * 50 + 2 : 4,
  y: layout.cols === 2 ? Math.floor(i / 2) * (100 / Math.ceil((layout.shots || 1) / 2)) + 2 : i * (92 / (layout.shots || 1)) + 2,
  w: layout.cols === 2 ? 46 : 92,
  h: layout.cols === 2 ? (92 / Math.ceil((layout.shots || 1) / 2)) - 4 : (92 / (layout.shots || 1)) - 4,
}));

function LayoutEditorTab({ customLayouts = [], setCustomLayouts = () => {}, landingConfig = {}, setLandingConfig = () => {} }) {
  const safeCustomLayouts = getSafeCustomLayouts(customLayouts);
  const [editingLayout, setEditingLayout] = useState(null); // null = list mode, object = editing
  const [layoutName, setLayoutName] = useState('');
  const [brandText, setBrandText] = useState(landingConfig.brandText || 'STUDIO BOOTH');
  const [canvasSize, setCanvasSize] = useState({ vW: 1200, vH: 1800 });
  const [slots, setSlots] = useState([]);
  const [texts, setTexts] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedText, setSelectedText] = useState(null);
  const [dragState, setDragState] = useState(null); // { slotId, type: 'move'|'resize', startX, startY, origSlot }
  const canvasRef = useRef(null);

  const startNewLayout = (template) => {
    if (template) {
      setLayoutName(template.name);
      setBrandText(template.brandText || landingConfig.brandText || 'STUDIO BOOTH');
      setCanvasSize({ vW: template.vW, vH: template.vH });
      setSlots(getEditableSlots(template).map(s => ({...s})));
      setTexts((template.texts || []).map(t => ({...t})));
    } else {
      setLayoutName('เลย์เอาต์ใหม่');
      setCanvasSize({ vW: 1200, vH: 1800 });
      setSlots([{ id: 0, x: 10, y: 10, w: 80, h: 35 }]);
      setTexts([]);
    }
    setEditingLayout(template && PREVIEW_LAYOUTS.some(layout => layout.id === template.id)
      ? `preset:${template.id}`
      : 'new');
    setSelectedSlot(null);
  };

  const editLayout = (layout) => {
    setLayoutName(layout.name);
    setBrandText(layout.brandText || landingConfig.brandText || 'STUDIO BOOTH');
    setCanvasSize({ vW: layout.vW, vH: layout.vH });
    setSlots(layout.slots.map(s => ({...s})));
    setTexts((layout.texts || []).map(t => ({...t})));
    setEditingLayout(layout.id);
    setSelectedSlot(null);
  };

  const addSlot = () => {
    const newId = slots.length > 0 ? Math.max(...slots.map(s => s.id)) + 1 : 0;
    setSlots([...slots, { id: newId, x: 20, y: 20, w: 40, h: 30 }]);
  };

  const deleteSlot = (id) => {
    setSlots(slots.filter(s => s.id !== id));
    if (selectedSlot === id) setSelectedSlot(null);
  };

  const duplicateSlot = (id) => {
    const orig = slots.find(s => s.id === id);
    if (!orig) return;
    const newId = Math.max(...slots.map(s => s.id)) + 1;
    setSlots([...slots, { ...orig, id: newId, x: Math.min(orig.x + 5, 90), y: Math.min(orig.y + 5, 90) }]);
  };

  const addText = () => {
    const id = `text_${Date.now()}`;
    setTexts(prev => [...prev, { id, text: 'ข้อความใหม่', x: 50, y: 95, size: 5, color: '#111827' }]);
    setSelectedText(id); setSelectedSlot(null);
  };
  const updateText = (id, changes) => setTexts(prev => prev.map(t => t.id === id ? { ...t, ...changes } : t));
  const deleteText = (id) => { setTexts(prev => prev.filter(t => t.id !== id)); if (selectedText === id) setSelectedText(null); };
  const handleTextPointerDown = (e, textId) => {
    e.stopPropagation(); e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const t = texts.find(item => item.id === textId);
    setSelectedText(textId); setSelectedSlot(null);
    setDragState({ slotId: textId, type: 'text', startX: e.clientX, startY: e.clientY, origSlot: { ...t }, canvasW: rect.width, canvasH: rect.height });
  };

  const saveLayout = () => {
    if (!layoutName.trim()) return;
    const presetId = typeof editingLayout === 'string' && editingLayout.startsWith('preset:')
      ? editingLayout.slice('preset:'.length)
      : null;
    const savedId = presetId ? getPresetOverrideId(presetId) : editingLayout === 'new' ? `custom_${Date.now()}` : editingLayout;
    const layoutData = {
      id: savedId,
      ...(presetId ? { presetOverride: true, sourceLayoutId: presetId } : {}),
      ...(presetId && PREVIEW_LAYOUTS.find(layout => layout.id === presetId)?.decorations
        ? { frameId: PREVIEW_LAYOUTS.find(layout => layout.id === presetId).frameId, decorations: PREVIEW_LAYOUTS.find(layout => layout.id === presetId).decorations }
        : {}),
      name: layoutName,
      vW: canvasSize.vW,
      vH: canvasSize.vH,
      slots: slots.map((s, i) => ({ ...s, id: i })),
      texts,
      brandText,
    };
    
    setCustomLayouts(previous => {
      const layouts = getSafeCustomLayouts(previous);
      const existingIndex = layouts.findIndex(layout => layout.id === savedId);
      if (editingLayout === 'new' || existingIndex < 0) return [...layouts, layoutData];
      return layouts.map(layout => layout.id === savedId ? layoutData : layout);
    });
    setEditingLayout(null);
  };

  const deleteLayout = (id) => {
    setCustomLayouts(safeCustomLayouts.filter(l => l.id !== id));
  };

  // --- Pointer handlers for drag/resize ---
  const handlePointerDown = (e, slotId, type) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedSlot(slotId);
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const slot = slots.find(s => s.id === slotId);
    setDragState({
      slotId,
      type,
      startX: clientX,
      startY: clientY,
      origSlot: { ...slot },
      canvasW: rect.width,
      canvasH: rect.height,
    });
  };

  const handlePointerMove = useCallback((e) => {
    if (!dragState) return;
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const dx = ((clientX - dragState.startX) / dragState.canvasW) * 100;
    const dy = ((clientY - dragState.startY) / dragState.canvasH) * 100;
    const orig = dragState.origSlot;

    if (dragState.type === 'text') {
      setTexts(prev => prev.map(t => t.id === dragState.slotId ? { ...t, x: Math.max(0, Math.min(100, orig.x + dx)), y: Math.max(0, Math.min(100, orig.y + dy)) } : t));
      return;
    }

    setSlots(prev => prev.map(s => {
      if (s.id !== dragState.slotId) return s;
      if (dragState.type === 'move') {
        return { ...s, x: Math.max(0, Math.min(100 - s.w, orig.x + dx)), y: Math.max(0, Math.min(100 - s.h, orig.y + dy)) };
      } else {
        const newW = Math.max(10, Math.min(100 - orig.x, orig.w + dx));
        const newH = Math.max(10, Math.min(100 - orig.y, orig.h + dy));
        return { ...s, w: newW, h: newH };
      }
    }));
  }, [dragState]);

  const handlePointerUp = useCallback(() => {
    setDragState(null);
  }, []);

  useEffect(() => {
    if (dragState) {
      window.addEventListener('mousemove', handlePointerMove, { passive: false });
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchmove', handlePointerMove, { passive: false });
      window.addEventListener('touchend', handlePointerUp);
    }
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [dragState, handlePointerMove, handlePointerUp]);

  // --- LIST VIEW ---
  if (!editingLayout) {
    return (
      <div className="space-y-6 bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
        <h3 className="text-xl font-semibold flex items-center gap-2"><Grid3X3 className="text-green-400"/> จัดเลย์เอาต์ (Custom Layout Editor)</h3>
        
        <div>
          <h4 className="text-sm font-bold text-zinc-400 mb-3 uppercase tracking-wider">เลย์เอาต์เดียวกับหน้า Preview</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {getAvailableLayouts(safeCustomLayouts).filter(layout => PREVIEW_LAYOUTS.some(base => base.id === layout.id)).map(layout => (
              <button key={layout.id} onClick={() => startNewLayout(layout)} className="bg-zinc-800 border border-blue-500/40 rounded-xl p-3 text-left hover:border-green-500 transition-colors">
                <div className="w-full aspect-[3/4] rounded-lg relative mb-2 overflow-hidden p-2" style={{ background: DEFAULT_FRAMES.find(frame => frame.id === layout.frameId)?.bg || '#18181b' }}>
                  {isCustomLayout(layout) ? layout.slots.map((slot, index) => (
                    <div key={slot.id ?? index} className="absolute bg-blue-500/35 border border-blue-300/70 rounded-sm" style={{ left: `${slot.x}%`, top: `${slot.y}%`, width: `${slot.w}%`, height: `${slot.h}%` }} />
                  )) : (
                    <div className={`w-full h-full flex flex-col gap-1 ${layout.cols === 2 ? 'grid grid-cols-2' : ''}`}>
                      {Array.from({ length: layout.shots }).map((_, index) => <div key={index} className="flex-1 bg-blue-500/30 border border-blue-500/60 rounded-sm" />)}
                    </div>
                  )}
                  {(layout.texts || []).map(text => <span key={text.id} className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[5px] font-bold" style={{ left: `${text.x}%`, top: `${text.y}%`, color: text.color }}>{text.text}</span>)}
                </div>
                <span className="text-xs text-zinc-300 font-medium">{layout.name}</span>
              </button>
            ))}
            <button onClick={() => startNewLayout(null)} className="bg-zinc-800 hover:bg-zinc-700 border-2 border-dashed border-zinc-600 hover:border-green-500 rounded-xl p-3 transition-all flex flex-col items-center justify-center gap-2 min-h-[140px]"><Plus className="w-8 h-8 text-zinc-500" /><span className="text-xs text-zinc-400">สร้างเอง</span></button>
          </div>
        </div>

        {/* Saved Layouts */}
        {safeCustomLayouts.some(layout => !layout.presetOverride && !PREVIEW_LAYOUTS.some(base => layout.id === getPresetOverrideId(base.id))) && (
          <div>
            <h4 className="text-sm font-bold text-zinc-400 mb-3 uppercase tracking-wider">เลย์เอาต์ที่บันทึกไว้</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {safeCustomLayouts.filter(layout => !layout.presetOverride && !PREVIEW_LAYOUTS.some(base => layout.id === getPresetOverrideId(base.id))).map(l => (
                <div key={l.id} className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 relative group">
                  <div className="w-full aspect-[3/4] bg-zinc-900 rounded-lg relative mb-2 overflow-hidden cursor-pointer" onClick={() => editLayout(l)}>
                    {l.slots.map((s, j) => (
                      <div key={j} className="absolute bg-blue-500/30 border border-blue-500/60 rounded-sm flex items-center justify-center text-blue-300 text-xs font-bold" style={{ left: s.x + '%', top: s.y + '%', width: s.w + '%', height: s.h + '%' }}>
                        {j + 1}
                      </div>
                    ))}
                    {(l.texts || []).map(t => <span key={t.id} className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-bold text-[7px]" style={{ left: `${t.x}%`, top: `${t.y}%`, color: t.color }}>{t.text}</span>)}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-zinc-300 font-medium truncate">{l.name}</span>
                    <div className="flex gap-1">
                      <button onClick={() => editLayout(l)} className="p-1 text-zinc-500 hover:text-blue-400 transition-colors"><Settings className="w-4 h-4" /></button>
                      <button onClick={() => deleteLayout(l.id)} className="p-1 text-zinc-500 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <span className="text-[10px] text-zinc-500">{l.slots.length} รูป • {l.vW}×{l.vH}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- EDITOR VIEW ---
  const aspect = canvasSize.vW / canvasSize.vH;

  return (
    <div className="space-y-4 bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={() => setEditingLayout(null)} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm">
          <ChevronRight className="w-4 h-4 rotate-180" /> กลับ
        </button>
        <h3 className="text-lg font-semibold text-green-400">แก้ไขเลย์เอาต์</h3>
        <button onClick={saveLayout} className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-sm transition-colors shadow-lg shadow-green-600/20">
          💾 บันทึก
        </button>
      </div>

      {/* Settings Row */}
      <div className="flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[150px]">
          <label className="text-xs text-zinc-400 mb-1 block">ชื่อเลย์เอาต์</label>
          <input type="text" value={layoutName} onChange={e => setLayoutName(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500" />
        </div>
        <div>
          <label className="text-xs text-zinc-400 mb-1 block">ขนาด Canvas</label>
          <select value={canvasSize.vW + 'x' + canvasSize.vH} onChange={e => { const [w,h] = e.target.value.split('x').map(Number); setCanvasSize({vW:w, vH:h}); }} className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500">
            {CANVAS_PRESETS.map(p => <option key={p.name} value={p.vW + 'x' + p.vH}>{p.name} ({p.vW}×{p.vH})</option>)}
          </select>
        </div>
        <button onClick={addSlot} className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg text-sm font-bold transition-colors flex items-center gap-1">
          <Plus className="w-4 h-4"/> เพิ่มช่อง
        </button>
        <div className="min-w-[180px] flex-1"><label className="text-xs text-zinc-400 mb-1 block">ข้อความใต้เลย์เอาต์</label><input value={brandText} onChange={e => setBrandText(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm" /></div>
        <button onClick={addText} className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-sm font-bold transition-colors flex items-center gap-1">
          <Type className="w-4 h-4"/> เพิ่มตัวอักษร
        </button>
      </div>
      <div className="flex items-center gap-3 bg-zinc-800/70 border border-blue-500/30 rounded-xl p-3">
        <label className="text-sm text-blue-300 whitespace-nowrap">ข้อความใต้รูป (เชื่อมกับ Preview)</label>
        <input value={landingConfig.brandText || ''} onChange={e => setLandingConfig({ ...landingConfig, brandText: e.target.value })} className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white" placeholder="STUDIO BOOTH" />
      </div>

      {/* Canvas Editor */}
      <div className="grid md:grid-cols-[1fr_250px] gap-4">
        <div className="flex items-center justify-center bg-zinc-950 rounded-xl p-4 border border-zinc-800 min-h-[400px]">
          <div
            ref={canvasRef}
            className="bg-white relative shadow-2xl select-none"
            style={{ aspectRatio: aspect, width: aspect >= 1 ? '100%' : 'auto', height: aspect < 1 ? '100%' : 'auto', maxWidth: '100%', maxHeight: '70vh' }}
            onClick={() => setSelectedSlot(null)}
          >
            {slots.map((slot, idx) => (
              <div
                key={slot.id}
                className={"absolute border-2 flex items-center justify-center cursor-move transition-shadow " + (selectedSlot === slot.id ? 'border-green-500 shadow-lg shadow-green-500/30 z-20' : 'border-blue-400/70 hover:border-blue-300 z-10')}
                style={{
                  left: slot.x + '%', top: slot.y + '%', width: slot.w + '%', height: slot.h + '%',
                  background: selectedSlot === slot.id ? 'rgba(34,197,94,0.15)' : 'rgba(59,130,246,0.1)',
                }}
                onMouseDown={e => handlePointerDown(e, slot.id, 'move')}
                onTouchStart={e => handlePointerDown(e, slot.id, 'move')}
                onClick={e => { e.stopPropagation(); setSelectedSlot(slot.id); }}
              >
                <span className={"font-black text-2xl pointer-events-none " + (selectedSlot === slot.id ? 'text-green-600' : 'text-blue-500/60')}>{idx + 1}</span>
                
                {/* Delete button */}
                <button
                  className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 hover:bg-red-400 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg z-30"
                  onMouseDown={e => e.stopPropagation()}
                  onTouchStart={e => e.stopPropagation()}
                  onClick={e => { e.stopPropagation(); deleteSlot(slot.id); }}
                >×</button>

                {/* Resize handle */}
                <div
                  className={"absolute bottom-0 right-0 w-5 h-5 cursor-se-resize z-30 " + (selectedSlot === slot.id ? 'bg-green-500' : 'bg-blue-500')}
                  style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
                  onMouseDown={e => handlePointerDown(e, slot.id, 'resize')}
                  onTouchStart={e => handlePointerDown(e, slot.id, 'resize')}
                />
              </div>
            ))}
            {texts.map(t => (
              <div key={t.id} className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-move whitespace-nowrap px-2 border ${selectedText === t.id ? 'border-amber-500 bg-amber-100/50' : 'border-transparent'}`} style={{ left: `${t.x}%`, top: `${t.y}%`, color: t.color, fontSize: `${t.size}%`, zIndex: 40 }} onMouseDown={e => handleTextPointerDown(e, t.id)} onTouchStart={e => handleTextPointerDown(e, t.id)} onClick={e => { e.stopPropagation(); setSelectedText(t.id); setSelectedSlot(null); }}>{t.text}</div>
            ))}
            <div className="absolute bottom-[3%] left-1/2 -translate-x-1/2 text-black font-bold text-[clamp(8px,2vw,18px)] pointer-events-none whitespace-nowrap">{landingConfig.brandText || 'STUDIO BOOTH'}</div>
          </div>
        </div>

        {/* Slot List Panel */}
        <div className="bg-zinc-800/50 rounded-xl border border-zinc-700 p-3 space-y-2 overflow-y-auto max-h-[70vh]">
          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">ช่องรูปทั้งหมด ({slots.length})</h4>
          {slots.map((slot, idx) => (
            <div key={slot.id} onClick={() => setSelectedSlot(slot.id)} className={"flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors " + (selectedSlot === slot.id ? 'bg-green-500/20 border border-green-500/50' : 'bg-zinc-900 border border-transparent hover:border-zinc-600')}>
              <span className={"w-7 h-7 rounded-md flex items-center justify-center font-bold text-sm " + (selectedSlot === slot.id ? 'bg-green-500 text-white' : 'bg-zinc-700 text-zinc-300')}>{idx+1}</span>
              <div className="flex-1 min-w-0">
                <span className="text-xs text-zinc-300">Photo {idx+1}</span>
                <div className="text-[10px] text-zinc-500">{Math.round(slot.w)}% × {Math.round(slot.h)}%</div>
              </div>
              <div className="flex gap-1">
                <button onClick={e => { e.stopPropagation(); duplicateSlot(slot.id); }} className="p-1 text-zinc-500 hover:text-blue-400"><Copy className="w-3 h-3" /></button>
                <button onClick={e => { e.stopPropagation(); deleteSlot(slot.id); }} className="p-1 text-zinc-500 hover:text-red-400"><Trash2 className="w-3 h-3" /></button>
              </div>
            </div>
          ))}
          {slots.length === 0 && (
            <div className="text-center py-8 text-zinc-500 text-sm">
              กดปุ่ม "+ เพิ่มช่อง" เพื่อเริ่มต้น
            </div>
          )}

          <div className="border-t border-zinc-700 pt-3 mt-3">
            <div className="flex items-center justify-between mb-2"><h4 className="text-xs font-bold text-amber-400">ตัวอักษร ({texts.length})</h4><button onClick={addText} className="text-xs text-amber-400 hover:text-amber-300">+ เพิ่ม</button></div>
            {texts.map(t => <div key={t.id} onClick={() => { setSelectedText(t.id); setSelectedSlot(null); }} className={`flex gap-2 items-center p-2 rounded-lg ${selectedText === t.id ? 'bg-amber-500/20' : 'bg-zinc-900'}`}><input value={t.text} onChange={e => updateText(t.id, { text: e.target.value })} className="min-w-0 flex-1 bg-zinc-800 rounded px-2 py-1 text-xs text-white" /><input type="color" value={t.color} onChange={e => updateText(t.id, { color: e.target.value })} className="w-7 h-7" /><button onClick={() => deleteText(t.id)} className="text-red-400"><Trash2 className="w-3 h-3" /></button></div>)}
          </div>

          {/* Quick precision editing for selected slot */}
          {selectedSlot !== null && slots.find(s => s.id === selectedSlot) && (() => {
            const s = slots.find(sl => sl.id === selectedSlot);
            const updateSlot = (field, val) => setSlots(prev => prev.map(sl => sl.id === selectedSlot ? { ...sl, [field]: val } : sl));
            return (
              <div className="mt-4 p-3 bg-zinc-900 rounded-lg border border-green-500/30 space-y-2">
                <h5 className="text-xs font-bold text-green-400">ปรับค่าละเอียด</h5>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-zinc-500">X (%)</label>
                    <input type="number" min="0" max="100" step="1" value={Math.round(s.x)} onChange={e => updateSlot('x', Number(e.target.value))} className="w-full bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-white text-xs" />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-500">Y (%)</label>
                    <input type="number" min="0" max="100" step="1" value={Math.round(s.y)} onChange={e => updateSlot('y', Number(e.target.value))} className="w-full bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-white text-xs" />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-500">กว้าง (%)</label>
                    <input type="number" min="5" max="100" step="1" value={Math.round(s.w)} onChange={e => updateSlot('w', Number(e.target.value))} className="w-full bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-white text-xs" />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-500">สูง (%)</label>
                    <input type="number" min="5" max="100" step="1" value={Math.round(s.h)} onChange={e => updateSlot('h', Number(e.target.value))} className="w-full bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-white text-xs" />
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      <div className="text-xs text-zinc-500 text-center">💡 ลากช่องรูปเพื่อย้ายตำแหน่ง • ลากสามเหลี่ยมมุมขวาล่างเพื่อปรับขนาด • กด × เพื่อลบ</div>
    </div>
  );
}

function AdminView({ frames, setFrames, stickers, setStickers, enabledBuiltinStickerIds, setEnabledBuiltinStickerIds, landingConfig, setLandingConfig, landingSaveError, cloudConfig, setCloudConfig, photoConfig, setPhotoConfig, customLayouts, setCustomLayouts, onBack }) {
  const [activeTab, setActiveTab] = useState('landing');
  const [previewLayout, setPreviewLayout] = useState(LAYOUTS.strip);
  const [newSticker, setNewSticker] = useState('');
  const [stickerSearch, setStickerSearch] = useState('');
  const [editingStickerIndex, setEditingStickerIndex] = useState(null);
  const [editingStickerValue, setEditingStickerValue] = useState('');
  const quickEmojis = ['🤠', '⭐', '🌵', '🐎', '💖', '🎀', '🌸', '✨', '🦋', '📸', '🍒', '🪩', '☁️', '🌈', '🧸', '💌'];
  const [newFrameName, setNewFrameName] = useState('');
  const [newFrameColor, setNewFrameColor] = useState('#ff0000');
  const [newFrameTextColor, setNewFrameTextColor] = useState('#ffffff');
  const safeCustomLayouts = getSafeCustomLayouts(customLayouts);
  const availableLayouts = getAvailableLayouts(customLayouts);
  const visibleStickerEntries = stickers
    .map((sticker, index) => ({ sticker, index }))
    .filter(({ sticker, index }) => !stickerSearch.trim() || (sticker.startsWith('data:image') ? `รูปภาพสติกเกอร์ ${index + 1}` : sticker).toLocaleLowerCase().includes(stickerSearch.trim().toLocaleLowerCase()));

  const addSticker = () => {
    if(newSticker.trim()) {
      setStickers(previous => [...previous, newSticker.trim()]);
      setNewSticker('');
    }
  };

  const toggleBuiltinSticker = (stickerId) => {
    setEnabledBuiltinStickerIds(previous => {
      const enabled = Array.isArray(previous) ? previous : BUILTIN_STICKERS.map(sticker => sticker.id);
      return enabled.includes(stickerId)
        ? enabled.filter(id => id !== stickerId)
        : [...enabled, stickerId];
    });
  };

  const applyLandingTheme = theme => setLandingConfig(previous => ({ ...previous, ...LANDING_THEME_PRESETS[theme] }));

  const startStickerEdit = (index, sticker) => {
    setEditingStickerIndex(index);
    setEditingStickerValue(sticker.startsWith('data:image') ? '' : sticker);
  };

  const saveStickerEdit = (index) => {
    const nextValue = editingStickerValue.trim();
    if (!nextValue) return;
    setStickers(previous => previous.map((sticker, stickerIndex) => stickerIndex === index ? nextValue : sticker));
    setEditingStickerIndex(null);
    setEditingStickerValue('');
  };

  const replaceStickerImage = (index, dataUrl) => {
    setStickers(previous => previous.map((sticker, stickerIndex) => stickerIndex === index ? dataUrl : sticker));
    setEditingStickerIndex(null);
    setEditingStickerValue('');
  };

  const removeSticker = (index) => {
    setStickers(previous => previous.filter((_, stickerIndex) => stickerIndex !== index));
    setEditingStickerIndex(null);
  };

  const handleImageUpload = (e, callback) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => callback(event.target.result);
    reader.readAsDataURL(file);
  };

  const addImageSticker = (dataUrl) => {
    setStickers(previous => [...previous, dataUrl]);
  };

  const addFrame = () => {
    if(newFrameName.trim()) {
      const frame = {
        id: Date.now().toString(),
        name: newFrameName,
        type: 'color',
        bg: newFrameColor,
        text: newFrameTextColor
      };
      setFrames([...frames, frame]);
      setNewFrameName('');
    }
  };

  const addImageFrame = (dataUrl) => {
    const frame = {
      id: Date.now().toString(),
      name: newFrameName || 'Custom Frame',
      type: 'image',
      src: dataUrl,
      bg: 'transparent',
      text: newFrameTextColor
    };
    setFrames([...frames, frame]);
    setNewFrameName('');
  };

  const exportSettings = () => {
    const data = JSON.stringify({
      version: 2,
      frames,
      stickers,
      enabledBuiltinStickerIds,
      landingConfig,
      photoConfig,
      cloudConfig,
      customLayouts: safeCustomLayouts,
    });
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'photobooth-settings.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importSettings = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.frames) setFrames(data.frames);
        if (data.stickers) setStickers(data.stickers);
        if (Array.isArray(data.enabledBuiltinStickerIds)) setEnabledBuiltinStickerIds(data.enabledBuiltinStickerIds);
        if (data.landingConfig) setLandingConfig(data.landingConfig);
        if (data.photoConfig) setPhotoConfig(data.photoConfig);
        if (data.cloudConfig) setCloudConfig(data.cloudConfig);
        if (data.customLayouts) setCustomLayouts(getSafeCustomLayouts(data.customLayouts));
        alert("โหลดการตั้งค่าสำเร็จ!");
      } catch (err) {
        alert("ไฟล์ไม่ถูกต้อง");
      }
    };
    reader.readAsText(file);
    e.target.value = null; // reset input
  };

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 p-6 md:p-12 overflow-y-auto">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10 border-b border-zinc-800 pb-6">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-3 bg-zinc-900 hover:bg-zinc-800 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-2xl font-bold">ระบบหลังบ้าน (Admin Dashboard)</h2>
            <p className="text-zinc-400 text-sm mt-1">จัดการหน้าเว็บและทรัพยากร • บันทึกในเบราว์เซอร์อุปกรณ์นี้</p>
            <p role="status" aria-live="polite" className={`text-xs mt-2 ${landingSaveError ? 'text-red-300' : 'text-emerald-300'}`}>
              {landingSaveError ? `⚠️ ${landingSaveError}` : '✓ บันทึกการตั้งค่าหน้าเว็บแล้วในอุปกรณ์นี้'}
            </p>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <label className="flex-1 md:flex-none cursor-pointer bg-zinc-800 hover:bg-zinc-700 px-4 py-3 md:py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors">
            <Download className="w-4 h-4 rotate-180" /> นำเข้า (Import)
            <input type="file" accept=".json" className="hidden" onChange={importSettings} />
          </label>
          <button onClick={exportSettings} className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-700 px-4 py-3 md:py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors">
            <Download className="w-4 h-4" /> บันทึกการตั้งค่า (Export)
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'สติกเกอร์', value: stickers.length + (Array.isArray(enabledBuiltinStickerIds) ? enabledBuiltinStickerIds.length : BUILTIN_STICKERS.length), color: 'text-indigo-300', detail: 'เปิดใช้ในหน้าตกแต่งรูป' },
          { label: 'กรอบภาพ', value: frames.length, color: 'text-fuchsia-300', detail: 'พร้อมใช้ในหน้าแต่งภาพ' },
          { label: 'เลย์เอาต์', value: availableLayouts.length, color: 'text-green-300', detail: 'ต้นแบบและแบบที่บันทึก' },
          { label: 'การบันทึก', value: 'ในเครื่องนี้', color: 'text-amber-300', detail: 'บันทึกอัตโนมัติ · ยังไม่ซิงก์ข้ามเครื่อง' },
        ].map(card => (
          <div key={card.label} className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
            <div className="flex items-center justify-between gap-2"><span className="text-sm text-zinc-400">{card.label}</span><span className={`text-xl font-black ${card.color}`}>{card.value}</span></div>
            <p className="text-xs text-zinc-500 mt-1">{card.detail}</p>
          </div>
        ))}
      </div>

      <div className="flex overflow-x-auto gap-2 mb-8 pb-2 max-w-6xl mx-auto w-full border-b border-zinc-800">
        <button onClick={() => setActiveTab('landing')} className={`flex items-center gap-2 px-4 py-3 rounded-t-xl font-bold transition-colors whitespace-nowrap ${activeTab === 'landing' ? 'bg-zinc-800 text-amber-400 border-b-2 border-amber-400' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'}`}><Paintbrush className="w-4 h-4"/> หน้าแรก</button>
        <button onClick={() => setActiveTab('photo')} className={`flex items-center gap-2 px-4 py-3 rounded-t-xl font-bold transition-colors whitespace-nowrap ${activeTab === 'photo' ? 'bg-zinc-800 text-blue-400 border-b-2 border-blue-400' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'}`}><LayoutTemplate className="w-4 h-4"/> ตกแต่งรูปภาพ</button>
        <button onClick={() => setActiveTab('frames')} className={`flex items-center gap-2 px-4 py-3 rounded-t-xl font-bold transition-colors whitespace-nowrap ${activeTab === 'frames' ? 'bg-zinc-800 text-fuchsia-400 border-b-2 border-fuchsia-400' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'}`}><Square className="w-4 h-4"/> กรอบรูป</button>
        <button onClick={() => setActiveTab('stickers')} className={`flex items-center gap-2 px-4 py-3 rounded-t-xl font-bold transition-colors whitespace-nowrap ${activeTab === 'stickers' ? 'bg-zinc-800 text-indigo-400 border-b-2 border-indigo-400' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'}`}><Smile className="w-4 h-4"/> สติกเกอร์</button>
        <button onClick={() => setActiveTab('layouts')} className={`flex items-center gap-2 px-4 py-3 rounded-t-xl font-bold transition-colors whitespace-nowrap ${activeTab === 'layouts' ? 'bg-zinc-800 text-green-400 border-b-2 border-green-400' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'}`}><Grid3X3 className="w-4 h-4"/> จัดเลย์เอาต์</button>
        <button onClick={() => setActiveTab('cloud')} className={`flex items-center gap-2 px-4 py-3 rounded-t-xl font-bold transition-colors whitespace-nowrap ${activeTab === 'cloud' ? 'bg-zinc-800 text-zinc-100 border-b-2 border-zinc-100' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'}`}><MonitorSmartphone className="w-4 h-4"/> ระบบแชร์ (Cloud)</button>
      </div>

      <div className="max-w-6xl mx-auto w-full">
        {activeTab === 'landing' && (
          <div className="grid md:grid-cols-2 gap-12">
            <div className="md:col-span-2 space-y-6 bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
              <h3 className="text-xl font-semibold flex items-center gap-2"><Paintbrush className="text-amber-400"/> ตกแต่งหน้าแรก (Landing Page Design)</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <div className="bg-zinc-800/80 p-3 rounded-xl border border-white/10 space-y-2 mb-4">
                    <label className="text-xs font-bold text-zinc-300 block">🎨 เลือกพรีเซ็ตธีม (Quick Theme Presets)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => applyLandingTheme('korean')}
                        className="p-2 rounded-lg bg-indigo-500/20 border border-indigo-500/40 text-xs font-bold text-indigo-300 hover:bg-indigo-500/30 transition-all text-center cursor-pointer"
                      >
                        🌸 เกาหลี (Haru)
                      </button>
                      <button
                        type="button"
                        onClick={() => applyLandingTheme('y2k')}
                        className="p-2 rounded-lg bg-pink-500/20 border border-pink-500/40 text-xs font-bold text-pink-300 hover:bg-pink-500/30 transition-all text-center cursor-pointer"
                      >
                        ⚡ Cyber Y2K
                      </button>
                      <button
                        type="button"
                        onClick={() => applyLandingTheme('film')}
                        className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/40 text-xs font-bold text-amber-300 hover:bg-amber-500/30 transition-all text-center cursor-pointer"
                      >
                        🎞️ ฟิล์มวินเทจ
                      </button>
                      <button
                        type="button"
                        onClick={() => applyLandingTheme('cowboy')}
                        className="p-2 rounded-lg bg-amber-800/20 border border-amber-700/40 text-xs font-bold text-amber-200 hover:bg-amber-800/30 transition-all text-center cursor-pointer"
                      >
                        🤠 คาวบอย
                      </button>
                    </div>
                  </div>
                  <label className="text-xs text-zinc-400 mb-1 block">ชื่อหน้าแรก (Title)</label>
                    <input type="text" value={landingConfig.title} onChange={e => setLandingConfig({...landingConfig, title: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-amber-500" />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 mb-1 block">คำอธิบาย (Subtitle)</label>
                    <input type="text" value={landingConfig.subtitle} onChange={e => setLandingConfig({...landingConfig, subtitle: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-amber-500" />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 mb-1 block">ข้อความปุ่ม (Button Text)</label>
                    <input type="text" value={landingConfig.buttonText} onChange={e => setLandingConfig({...landingConfig, buttonText: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-amber-500" />
                  </div>
                  <div className="pt-4 border-t border-zinc-800">
                    <label className="text-xs text-zinc-400 mb-1 block">หัวข้อหน้าสแกนรูป (Share Title)</label>
                    <input type="text" value={landingConfig.shareTitle || 'รูปภาพของคุณพร้อมแล้ว!'} onChange={e => setLandingConfig({...landingConfig, shareTitle: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-amber-500 mb-4" />
                    
                    <label className="text-xs text-zinc-400 mb-1 block">คำอธิบายหน้าสแกนรูป (Share Subtitle)</label>
                    <input type="text" value={landingConfig.shareSubtitle || 'สแกนคิวอาร์โค้ดเพื่อเซฟลงมือถือได้เลย หรือกดปุ่มดาวน์โหลดด้านล่าง'} onChange={e => setLandingConfig({...landingConfig, shareSubtitle: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-amber-500" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-zinc-400 mb-1 block">สีพื้นหลัง 1</label>
                      <input type="color" value={landingConfig.bgColor1} onChange={e => setLandingConfig({...landingConfig, bgColor1: e.target.value})} className="w-full h-10 rounded cursor-pointer" />
                    </div>
                    <div>
                      <label className="text-xs text-zinc-400 mb-1 block">สีพื้นหลัง 2</label>
                      <input type="color" value={landingConfig.bgColor2} onChange={e => setLandingConfig({...landingConfig, bgColor2: e.target.value})} className="w-full h-10 rounded cursor-pointer" />
                    </div>
                    <div>
                      <label className="text-xs text-zinc-400 mb-1 block">สีเน้น (Accent)</label>
                      <input type="color" value={landingConfig.accentColor} onChange={e => setLandingConfig({...landingConfig, accentColor: e.target.value})} className="w-full h-10 rounded cursor-pointer" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="showStars" checked={landingConfig.showStars} onChange={e => setLandingConfig({...landingConfig, showStars: e.target.checked})} className="w-4 h-4 accent-amber-500" />
                    <label htmlFor="showStars" className="text-sm text-zinc-300">แสดงดาว (Show Stars)</label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <label className="bg-amber-600/20 hover:bg-amber-600/40 text-amber-400 border border-amber-500/50 cursor-pointer rounded-xl px-4 py-2 text-sm font-bold transition-colors flex items-center justify-center gap-2">
                      <ImagePlus className="w-4 h-4"/> อัปโหลดพื้นหลัง
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, (data) => setLandingConfig({...landingConfig, bgImage: data}))} />
                    </label>
                    {landingConfig.bgImage && (
                      <button onClick={() => setLandingConfig({...landingConfig, bgImage: ''})} className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-xl text-sm font-bold hover:bg-red-500/40 transition-colors">
                        ลบพื้นหลัง
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="md:sticky md:top-4 self-start w-full rounded-2xl border border-zinc-700 bg-zinc-950 p-3 shadow-2xl">
                  <div className="mb-2 flex items-center justify-between px-1">
                    <span className="text-xs font-bold text-zinc-200">ตัวอย่างหน้าเว็บจริง</span>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-300">อัปเดตสด</span>
                  </div>
                  <div className="h-[min(70vh,680px)] min-h-[480px] overflow-hidden rounded-xl border border-zinc-800">
                    <LandingView preview config={landingConfig} onUpdateConfig={setLandingConfig} onStart={() => {}} onAdmin={() => {}} />
                  </div>
                  <button type="button" onClick={() => setLandingConfig({ ...landingConfig })} className="mt-3 w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-indigo-500">บันทึกการตั้งค่าหน้านี้</button>
                  <p className="px-1 pt-2 text-[11px] leading-relaxed text-zinc-500">การบันทึกใช้พื้นที่เบราว์เซอร์นี้เท่านั้น ยังไม่ซิงก์ไปยัง iPad/เครื่องอื่น</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'photo' && (
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
               <h3 className="text-xl font-semibold flex items-center gap-2"><LayoutTemplate className="text-blue-400"/> ตกแต่งเลย์เอาต์รูปภาพ</h3>
               <div className="space-y-6">
                 <div>
                   <label className="flex justify-between text-sm font-bold text-zinc-300 mb-2">
                     <span>ความมนของมุมรูป (Border Radius)</span>
                     <span className="text-blue-400">{photoConfig?.borderRadius || 0}%</span>
                   </label>
                   <input type="range" min="0" max="50" value={photoConfig?.borderRadius || 0} onChange={e => setPhotoConfig({...photoConfig, borderRadius: parseInt(e.target.value)})} className="w-full accent-blue-500" />
                 </div>
                 <div>
                   <label className="flex justify-between text-sm font-bold text-zinc-300 mb-2">
                     <span>ระยะห่างระหว่างรูป (Spacing)</span>
                     <span className="text-blue-400">{photoConfig?.spacing || 5}</span>
                   </label>
                   <input type="range" min="0" max="20" value={photoConfig?.spacing || 0} onChange={e => setPhotoConfig({...photoConfig, spacing: parseInt(e.target.value)})} className="w-full accent-blue-500" />
                 </div>
                 <div>
                   <label className="flex justify-between text-sm font-bold text-zinc-300 mb-2">
                     <span>ขอบนอกสุด (Padding)</span>
                     <span className="text-blue-400">{photoConfig?.padding || 5}</span>
                   </label>
                   <input type="range" min="0" max="20" value={photoConfig?.padding || 0} onChange={e => setPhotoConfig({...photoConfig, padding: parseInt(e.target.value)})} className="w-full accent-blue-500" />
                 </div>
                 <div className="pt-4 border-t border-zinc-800">
                   <label className="text-xs text-zinc-400 mb-1 block">ข้อความใต้รูป (Brand Text)</label>
                   <input type="text" value={landingConfig.brandText || 'STUDIO BOOTH'} onChange={e => setLandingConfig({...landingConfig, brandText: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
                 </div>
                 <div>
                   <label className="text-xs text-zinc-400 mb-1 block">ฟอนต์ตัวอักษร (Font Family)</label>
                   <select value={landingConfig.fontFamily || 'Kanit'} onChange={e => setLandingConfig({...landingConfig, fontFamily: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500">
                     <option value="Kanit">Kanit (มาตรฐาน)</option>
                     <option value="Prompt">Prompt (โมเดิร์น)</option>
                     <option value="Mali">Mali (ลายมือ)</option>
                     <option value="Chonburi">Chonburi (คลาสสิก)</option>
                     <option value="Sarabun">Sarabun (ทางการ)</option>
                   </select>
                 </div>
               </div>
            </div>
            
            <div className="flex flex-col p-4 bg-zinc-800 rounded-xl border border-zinc-700">
              <div className="flex justify-between w-full mb-3 items-center">
                <span className="text-xs text-zinc-400">Live Preview</span>
                <div className="flex gap-1 flex-wrap justify-end">
                  {availableLayouts.map(l => (
                    <button 
                      key={l.id} 
                      onClick={() => setPreviewLayout(l)}
                      title={l.name}
                      className={`text-[10px] px-2 py-1 rounded transition-colors ${previewLayout.id === l.id ? 'bg-blue-500 text-white' : 'bg-zinc-700 text-zinc-400 hover:bg-zinc-600'}`}
                    >
                      {l.name || l.id}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center overflow-hidden min-h-[400px]">
                <div
                  className="w-[120px] bg-white relative flex flex-col scale-[0.9] origin-center shadow-xl"
                  style={{ ...getLayoutAspectStyle(previewLayout), padding: isCustomLayout(previewLayout) ? 0 : `${photoConfig?.padding ?? 5}%` }}
                >
                  {isCustomLayout(previewLayout) ? (
                    <div className="absolute inset-0">
                      {previewLayout.slots.map((slot, i) => (
                        <div key={i} className="absolute bg-zinc-300 overflow-hidden shadow-inner" style={{ left: `${slot.x}%`, top: `${slot.y}%`, width: `${slot.w}%`, height: `${slot.h}%`, borderRadius: `${photoConfig?.borderRadius || 0}%` }}>
                          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={`flex-1 grid ${previewLayout.cols === 2 ? 'grid-cols-2' : 'grid-cols-1'}`} style={{ gap: `${photoConfig?.spacing ?? 5}%` }}>
                      {Array.from({ length: getLayoutShotCount(previewLayout) }).map((_, i) => (
                        <div key={i} className="bg-zinc-300 overflow-hidden relative shadow-inner w-full h-full" style={{ borderRadius: `${photoConfig?.borderRadius || 0}%` }}>
                          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-cover absolute inset-0" />
                        </div>
                      ))}
                    </div>
                  )}
                  {(previewLayout.texts || []).map(t => <div key={t.id} className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-bold" style={{ left: `${t.x}%`, top: `${t.y}%`, color: t.color, fontSize: `${Math.max(4, t.size * 0.8)}px`, zIndex: 30 }}>{t.text}</div>)}
                  {isCustomLayout(previewLayout) && <div className="absolute bottom-[2%] left-0 right-0 text-center font-bold text-[6px] text-zinc-900">{previewLayout.brandText || landingConfig?.brandText || 'STUDIO BOOTH'}</div>}
                  
                  {!isCustomLayout(previewLayout) && (
                    <div className="h-[12%] min-h-[20px] w-full flex items-center justify-center shrink-0">
                      <span className="text-black font-bold text-[8px] tracking-wider" style={{ fontFamily: `'${landingConfig?.fontFamily || 'Kanit'}', sans-serif` }}>
                        {landingConfig?.brandText || 'STUDIO BOOTH'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'frames' && (
          <div className="space-y-6 bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
            <h3 className="text-xl font-semibold flex items-center gap-2"><Settings className="text-fuchsia-400"/> จัดการกรอบรูป (สีพื้นฐาน)</h3>
            
            <div className="space-y-4 bg-zinc-800/50 p-4 rounded-xl border border-zinc-700">
              <input 
                type="text" value={newFrameName} onChange={e => setNewFrameName(e.target.value)}
                placeholder="ชื่อกรอบรูป เช่น พาสเทลเขียว" 
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500"
              />
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs text-zinc-400 mb-1 block">สีพื้นหลัง</label>
                  <input type="color" value={newFrameColor} onChange={e => setNewFrameColor(e.target.value)} className="w-full h-12 rounded cursor-pointer" />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-zinc-400 mb-1 block">สีตัวอักษร</label>
                  <input type="color" value={newFrameTextColor} onChange={e => setNewFrameTextColor(e.target.value)} className="w-full h-12 rounded cursor-pointer" />
                </div>
              </div>
              <button onClick={addFrame} className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                <Plus className="w-5 h-5"/> สร้างกรอบสีใหม่
              </button>
              <div className="relative mt-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-700"></div></div>
                <div className="relative flex justify-center"><span className="px-2 bg-zinc-800/50 text-xs text-zinc-400 uppercase">หรือ</span></div>
              </div>
              <label className="w-full bg-fuchsia-600/20 hover:bg-fuchsia-600/40 text-fuchsia-400 border border-fuchsia-500/50 py-3 rounded-xl cursor-pointer font-bold transition-colors flex items-center justify-center gap-2 mt-2">
                <ImagePlus className="w-5 h-5"/> อัปโหลดกรอบรูป (Overlay PNG)
                <input type="file" accept="image/png" className="hidden" onChange={(e) => handleImageUpload(e, addImageFrame)} />
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              {frames.map((fr, i) => (
                <div key={i} className="flex items-center justify-between bg-zinc-800 p-3 rounded-xl border border-zinc-700">
                  <div className="flex items-center gap-3 w-3/4">
                    <div className="w-8 h-8 rounded-md shadow-inner border border-white/10 shrink-0 overflow-hidden bg-white flex items-center justify-center" style={{ background: fr.type === 'image' ? 'transparent' : fr.bg }}>
                      {fr.type === 'image' && <img src={fr.src} className="w-full h-full object-cover" />}
                    </div>
                    <span className="text-sm font-medium truncate">{fr.name}</span>
                  </div>
                  {!DEFAULT_FRAMES.some(defaultFrame => defaultFrame.id === fr.id) && (
                    <button onClick={() => setFrames(frames.filter(f => f.id !== fr.id))} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'stickers' && (
          <div className="space-y-6 bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
            <h3 className="text-xl font-semibold flex items-center gap-2"><Smile className="text-indigo-400"/> จัดการสติกเกอร์</h3>
            
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input 
                  type="text" value={newSticker} onChange={e => setNewSticker(e.target.value)}
                  placeholder="พิมพ์ข้อความหรืออีโมจิสติกเกอร์"
                  className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                />
                <button onClick={addSticker} className="bg-indigo-600 hover:bg-indigo-700 px-6 rounded-xl font-bold transition-colors">เพิ่ม</button>
              </div>
              <div className="flex flex-wrap gap-2" aria-label="อีโมจิแนะนำ">
                {quickEmojis.map(emoji => (
                  <button key={emoji} type="button" onClick={() => setNewSticker(value => `${value}${emoji}`)} title={`เพิ่ม ${emoji}`} className="w-10 h-10 rounded-xl border border-zinc-700 bg-zinc-800 hover:border-indigo-400 hover:bg-indigo-500/15 text-xl transition-colors">{emoji}</button>
                ))}
                <button type="button" onClick={addSticker} disabled={!newSticker.trim()} className="px-3 h-10 rounded-xl border border-indigo-500/40 bg-indigo-500/10 text-indigo-300 text-sm font-semibold disabled:opacity-40">เพิ่มข้อความ/อีโมจิ</button>
              </div>
              <div className="relative mt-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-800"></div></div>
                <div className="relative flex justify-center"><span className="px-2 bg-zinc-900/50 text-xs text-zinc-500 uppercase">หรือ</span></div>
              </div>
              <label className="w-full bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-400 border border-indigo-500/50 cursor-pointer rounded-xl px-4 py-3 text-center font-bold transition-colors flex items-center justify-center gap-2">
                <ImagePlus className="w-5 h-5"/> อัปโหลดรูปภาพสติกเกอร์ (PNG)
                <input type="file" accept="image/png, image/jpeg" className="hidden" onChange={(e) => handleImageUpload(e, addImageSticker)} />
              </label>
            </div>

            <section className="space-y-3 rounded-2xl border border-indigo-500/20 bg-zinc-950/50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="font-bold text-zinc-100">สติกเกอร์ในตัว</h4>
                  <p className="text-xs text-zinc-400 mt-1">เลือกเปิด/ปิดสติกเกอร์ชุดนี้ในหน้าตกแต่งได้ทันที</p>
                </div>
                <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">{(Array.isArray(enabledBuiltinStickerIds) ? enabledBuiltinStickerIds : []).length} / {BUILTIN_STICKERS.length} เปิดใช้งาน</span>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setEnabledBuiltinStickerIds(BUILTIN_STICKERS.map(sticker => sticker.id))} className="rounded-lg border border-indigo-400/30 px-3 py-1.5 text-xs font-semibold text-indigo-200 hover:bg-indigo-500/10">เปิดทั้งหมด</button>
                <button type="button" onClick={() => setEnabledBuiltinStickerIds([])} className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:bg-zinc-800">ปิดทั้งหมด</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {BUILTIN_STICKERS.map(sticker => {
                  const enabled = (Array.isArray(enabledBuiltinStickerIds) ? enabledBuiltinStickerIds : []).includes(sticker.id);
                  return (
                    <button key={sticker.id} type="button" onClick={() => toggleBuiltinSticker(sticker.id)} aria-pressed={enabled} className={`flex items-center gap-3 rounded-xl border p-2 text-left transition-colors ${enabled ? 'border-indigo-400/50 bg-indigo-500/10' : 'border-zinc-800 bg-zinc-900 opacity-60'}`}>
                      <img src={sticker.dataUri} alt="" className="h-10 w-10 object-contain" />
                      <span className="min-w-0 flex-1 truncate text-xs font-medium text-zinc-200">{sticker.name}</span>
                      <span className={`text-[10px] font-bold ${enabled ? 'text-emerald-300' : 'text-zinc-500'}`}>{enabled ? 'เปิด' : 'ปิด'}</span>
                    </button>
                  );
                })}
              </div>
            </section>
            <p className="text-sm text-zinc-400">อีโมจิและรูปที่เพิ่ม/แก้ไข/ลบ และสติกเกอร์ในตัวที่เปิด/ปิด จะสะท้อนในหน้าตกแต่งรูปทันทีบนเบราว์เซอร์นี้</p>
            <input value={stickerSearch} onChange={event => setStickerSearch(event.target.value)} placeholder="ค้นหาข้อความหรือสติกเกอร์รูปภาพ" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-4">
              {visibleStickerEntries.map(({ sticker: st, index: i }) => (
                <div key={`${i}_${st.slice(0, 24)}`} className="bg-zinc-800 rounded-xl flex flex-col gap-2 p-3 group border border-zinc-700 min-w-0">
                  <div className="aspect-square rounded-lg bg-zinc-900 flex items-center justify-center text-4xl overflow-hidden">
                    {st.startsWith('data:image') ? <img src={st} alt={`Sticker ${i + 1}`} className="w-full h-full object-contain p-2" /> : st}
                  </div>
                  {editingStickerIndex === i ? (
                    <div className="space-y-2">
                      {!st.startsWith('data:image') && <input value={editingStickerValue} onChange={event => setEditingStickerValue(event.target.value)} className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-2 py-1.5 text-white text-sm" aria-label={`แก้ไขสติกเกอร์ ${i + 1}`} />}
                      <label className="block text-center text-xs text-indigo-300 hover:text-indigo-200 cursor-pointer rounded-lg border border-indigo-500/40 px-2 py-1.5">
                        {st.startsWith('data:image') ? 'เปลี่ยนไฟล์รูป' : 'แทนที่ด้วยรูป'}
                        <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={event => handleImageUpload(event, dataUrl => replaceStickerImage(i, dataUrl))} />
                      </label>
                      <div className="flex gap-2">
                        {!st.startsWith('data:image') && <button onClick={() => saveStickerEdit(i)} className="flex-1 bg-indigo-600 hover:bg-indigo-500 rounded-lg py-1.5 text-xs font-bold">บันทึก</button>}
                        <button onClick={() => { setEditingStickerIndex(null); setEditingStickerValue(''); }} className="flex-1 bg-zinc-700 hover:bg-zinc-600 rounded-lg py-1.5 text-xs">ยกเลิก</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={() => startStickerEdit(i, st)} className="flex-1 bg-zinc-700 hover:bg-indigo-600 rounded-lg py-1.5 text-xs font-semibold">แก้ไข</button>
                      <button onClick={() => removeSticker(i)} className="px-3 bg-zinc-700 hover:bg-red-600 rounded-lg text-red-300 hover:text-white" aria-label={`ลบสติกเกอร์ ${i + 1}`}><Trash2 className="w-4 h-4" /></button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {visibleStickerEntries.length === 0 && <div className="text-center text-zinc-500 border border-dashed border-zinc-700 rounded-xl p-8">ไม่พบสติกเกอร์ที่ค้นหา</div>}
          </div>
        )}
        
        {activeTab === 'layouts' && (
          <LayoutEditorTab customLayouts={safeCustomLayouts} setCustomLayouts={setCustomLayouts} landingConfig={landingConfig} setLandingConfig={setLandingConfig} />
        )}

        {activeTab === 'cloud' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8">
             <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Settings className="w-5 h-5 text-amber-500" /> Cloudinary Settings (สำหรับ iPad / QR Code)</h3>
             <p className="text-zinc-400 text-sm mb-4">สมัครฟรีที่ cloudinary.com แล้วนำค่า 2 ตัวนี้มาใส่ เพื่อให้ QR Code โหลดรูปลงมือถือได้</p>
             <div className="flex flex-col gap-4">
                <div>
                   <label className="block text-sm font-bold text-zinc-400 mb-1">Cloud Name</label>
                   <input type="text" value={cloudConfig.cloudName} onChange={e => setCloudConfig({...cloudConfig, cloudName: e.target.value})} className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-2 text-white" placeholder="e.g. dxyzxyz" />
                </div>
                <div>
                   <label className="block text-sm font-bold text-zinc-400 mb-1">Upload Preset (Unsigned)</label>
                   <input type="text" value={cloudConfig.uploadPreset} onChange={e => setCloudConfig({...cloudConfig, uploadPreset: e.target.value})} className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-2 text-white" placeholder="e.g. my_unsigned_preset" />
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SetupView({ config, setConfig, customLayouts, landingConfig, onNext, onBack }) {
  const layouts = getAvailableLayouts(customLayouts);
  const currentTheme = landingConfig?.theme || 'cowboy';
  const isCowboy = currentTheme === 'cowboy';

  return (
    <div className="flex-1 min-h-screen flex flex-col p-4 sm:p-8 max-w-5xl mx-auto w-full relative z-10 select-none">
      <AuroraBackground theme={currentTheme} bgImage={landingConfig?.bgImage} />

      {/* Top Header with Step Flow */}
      <header className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-amber-500/20 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2.5 glass hover:bg-white/10 rounded-full transition-colors text-zinc-300 hover:text-white cursor-pointer border border-white/10">
            <X className="w-5 h-5" />
          </button>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Step 1 of 3</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
              {isCowboy ? '🤠 เลือกรูปแบบและสไตล์คาวบอย' : 'เลือกรูปแบบและโทนสี'}
            </h2>
          </div>
        </div>

        {/* Stepper Pills */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/25 border border-amber-500/40 text-amber-300 font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            1. สไตล์
          </div>
          <span className="text-zinc-600">→</span>
          <div className="px-3.5 py-1.5 rounded-full glass text-zinc-400 border border-white/5">
            2. ถ่ายรูป
          </div>
          <span className="text-zinc-600">→</span>
          <div className="px-3.5 py-1.5 rounded-full glass text-zinc-400 border border-white/5">
            3. ตกแต่ง
          </div>
        </div>
      </header>

      {/* Bento Grid */}
      <div className="relative z-10 grid md:grid-cols-3 gap-6 flex-1">
        {/* Left Column: Layouts & Timer (2-Cols on MD) */}
        <div className="md:col-span-2 space-y-6">
          {/* Layout Picker */}
          <div className="glass-card rounded-3xl p-6 space-y-4 border border-amber-500/20">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-base font-bold text-amber-100 font-serif">
                <Layers className="w-5 h-5 text-amber-400" />
                <span>รูปแบบกรอบรูป (Layout)</span>
              </div>
              <span className="text-xs text-amber-200/60">แตะเพื่อเลือก</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {layouts.map(layout => {
                const isSelected = config.layout.id === layout.id;
                const shotCount = getLayoutShotCount(layout);
                return (
                  <button
                    key={layout.id}
                    onClick={() => setConfig({ ...config, layout })}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/20 shadow-[0_0_25px_rgba(217,119,6,0.35)] scale-[1.02] ring-1 ring-amber-400/40'
                        : 'border-white/10 glass hover:border-amber-500/30 hover:scale-[1.01]'
                    }`}
                  >
                    <div
                      className="w-12 bg-zinc-900 rounded-md mb-3 border border-white/15 p-1 relative overflow-hidden shadow-inner flex items-center justify-center"
                      style={{ ...getLayoutAspectStyle(layout), background: DEFAULT_FRAMES.find(frame => frame.id === layout.frameId)?.bg || '#18181b' }}
                    >
                      {isCustomLayout(layout) ? (
                        layout.slots.map((slot, index) => (
                          <div
                            key={slot.id ?? index}
                            className="absolute bg-amber-500/60 rounded-[2px]"
                            style={{
                              left: `${slot.x}%`,
                              top: `${slot.y}%`,
                              width: `${slot.w}%`,
                              height: `${slot.h}%`,
                            }}
                          />
                        ))
                      ) : (
                        <div className={`w-full h-full flex flex-col gap-0.5 ${layout.cols === 2 ? 'grid grid-cols-2' : ''}`}>
                          {Array.from({ length: shotCount }).map((_, index) => (
                            <div key={index} className="flex-1 bg-amber-500/60 rounded-[2px] w-full h-full" />
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="font-semibold text-xs sm:text-sm text-zinc-100">{layout.name}</span>
                    <span className="text-[11px] text-amber-200/70 mt-0.5 font-mono">{shotCount} ช็อต</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Countdown Timer Selector */}
          <div className="glass-card rounded-3xl p-6 space-y-3 border border-amber-500/20">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-200 font-serif">
              <span>⏱️</span>
              <span>เวลานับถอยหลังต่อช็อต (Countdown Timer)</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { time: 3, label: '3 วินาที (ด่วน)' },
                { time: 5, label: '5 วินาที (แนะนำ 🤠)' },
                { time: 10, label: '10 วินาที (โพสจุใจ)' }
              ].map(t => (
                <button
                  key={t.time}
                  onClick={() => setConfig({ ...config, timer: t.time })}
                  className={`py-3.5 px-3 rounded-2xl border-2 transition-all font-bold text-xs sm:text-sm cursor-pointer ${
                    config.timer === t.time
                      ? 'border-amber-500 bg-amber-500/25 text-amber-300 shadow-[0_0_20px_rgba(217,119,6,0.3)] ring-1 ring-amber-400/40'
                      : 'border-white/10 glass text-zinc-400 hover:border-white/20 hover:text-zinc-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Filters (1-Col) */}
        <div className="glass-card rounded-3xl p-6 space-y-4 flex flex-col border border-amber-500/20">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-base font-bold text-amber-100 font-serif">
              <Wand2 className="w-5 h-5 text-amber-400" />
              <span>โทนสีภาพ (Filters)</span>
            </div>
          </div>

          <div className="space-y-2.5 flex-1 overflow-y-auto pr-1">
            {FILTERS.map(filter => {
              const isSelected = config.filter.id === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setConfig({ ...config, filter })}
                  className={`w-full flex items-center gap-3.5 p-3 rounded-2xl border-2 transition-all text-left cursor-pointer ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500/20 shadow-[0_0_20px_rgba(217,119,6,0.3)] ring-1 ring-amber-400/40'
                      : 'border-white/10 glass hover:border-white/20'
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-xl bg-[url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80')] bg-cover bg-center ring-2 ring-white/10 shrink-0 shadow-md"
                    style={{ filter: filter.css }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-zinc-100 flex items-center gap-2">
                      <span>{filter.name}</span>
                      {filter.id === 'sepia' && <span className="text-[10px] bg-amber-500/25 text-amber-300 px-1.5 py-0.5 rounded font-bold font-serif">🌟 คาวบอยแท้</span>}
                    </div>
                    <div className="text-[11px] text-zinc-400 truncate">
                      {filter.id === 'none' && 'สีธรรมชาติ คมชัดสมจริง'}
                      {filter.id === 'grayscale' && 'ขาวดำคลาสสิก Wanted Poster'}
                      {filter.id === 'sepia' && 'วินเทจเรโทร สไตล์คาวบอยย้อนยุค'}
                      {filter.id === 'warm' && 'อบอุ่น ละมุนตา แดดทะเลทราย'}
                      {filter.id === 'cool' && 'โทนเย็น ผิวสว่างสดใส'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <footer className="relative z-10 pt-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3.5 rounded-2xl text-sm font-semibold glass hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
        >
          ← กลับหน้าแรก
        </button>
        <button
          onClick={onNext}
          className="px-8 py-4 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 hover:from-amber-500 hover:to-yellow-500 text-white rounded-2xl text-base font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-3 shadow-xl shadow-amber-600/40 cursor-pointer border border-amber-400/40 font-serif"
        >
          <Camera className="w-5 h-5 text-yellow-200" />
          <span>เข้าตู้ถ่ายรูปเลย (ENTER BOOTH)</span>
          <span>→</span>
        </button>
      </footer>
    </div>
  );
}

function BoothView({ config, photoConfig, onComplete, onCancel }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const recordCanvasRef = useRef(null);
  const recorderRef = useRef(null);
  const requestRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const [viewportSize, setViewportSize] = useState(() => ({ width: window.innerWidth, height: window.innerHeight }));
  const [status, setStatus] = useState('idle'); 
  const [count, setCount] = useState(3);
  const [shotIndex, setShotIndex] = useState(0);
  const [captured, setCaptured] = useState([]);
  const shotCount = getLayoutShotCount(config.layout);
  const cameraAspect = getCaptureAspect(config.layout, shotIndex, photoConfig);
  const maxCameraHeight = Math.max(180, viewportSize.height - 300);
  const maxCameraWidth = Math.max(180, viewportSize.width - 48);
  const cameraHeight = Math.min(maxCameraHeight, maxCameraWidth / cameraAspect);
  const cameraWidth = cameraHeight * cameraAspect;

  useEffect(() => {
    const updateViewport = () => setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  useEffect(() => {
    async function startCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false 
        });
        streamRef.current = mediaStream;
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Camera error:", err);
        alert("ไม่สามารถเข้าถึงกล้องได้ กรุณาอนุญาตการใช้งานกล้องในเบราว์เซอร์");
      }
    }
    startCamera();
    return () => {
      streamRef.current?.getTracks().forEach(track => track.stop());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startRecording = () => {
    if (!videoRef.current || !recordCanvasRef.current) return;
    const video = videoRef.current;
    const canvas = recordCanvasRef.current;
    const captureAspect = getCaptureAspect(config.layout, 0, photoConfig);
    const sourceWidth = video.videoWidth || 1280;
    const sourceHeight = video.videoHeight || 720;
    if (sourceWidth / sourceHeight > captureAspect) {
      canvas.height = sourceHeight;
      canvas.width = Math.round(sourceHeight * captureAspect);
    } else {
      canvas.width = sourceWidth;
      canvas.height = Math.round(sourceWidth / captureAspect);
    }
    const ctx = canvas.getContext('2d');
    
    const render = () => {
      if (!videoRef.current) return;
      if (config.filter.css) ctx.filter = config.filter.css;
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      drawVideoCover(ctx, video, 0, 0, canvas.width, canvas.height);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      requestRef.current = requestAnimationFrame(render);
    };
    requestRef.current = requestAnimationFrame(render);
    
    try {
      chunksRef.current = [];
      const stream = canvas.captureStream(30);
      let options = { mimeType: 'video/webm' };
      if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
        options = { mimeType: 'video/webm;codecs=vp9' };
      } else if (MediaRecorder.isTypeSupported('video/mp4')) {
        options = { mimeType: 'video/mp4' };
      }
      recorderRef.current = new MediaRecorder(stream, options);
      recorderRef.current.ondataavailable = e => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorderRef.current.start(500);
    } catch(e) {
      console.error("Recording not supported", e);
    }
  };

  const stopRecording = () => {
    return new Promise(resolve => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (recorderRef.current && recorderRef.current.state === 'recording') {
        recorderRef.current.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: recorderRef.current.mimeType });
          resolve(blob);
        };
        recorderRef.current.stop();
      } else {
        resolve(null);
      }
    });
  };

  const startSequence = async () => {
    startRecording();
    let currentCaptured = [];
    
    for (let currentShot = 0; currentShot < shotCount; currentShot++) {
      setShotIndex(currentShot);
      setStatus('countdown');
      for (let i = config.timer; i > 0; i--) {
        setCount(i);
        playAudioTone('beep');
        await wait(1000);
      }
      setStatus('flashing');
      playAudioTone('shutter');
      await wait(180);
      
      // Capture
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const captureAspect = getCaptureAspect(config.layout, currentShot, photoConfig);
      const sourceWidth = video.videoWidth || 1280;
      const sourceHeight = video.videoHeight || 720;
      if (sourceWidth / sourceHeight > captureAspect) {
        canvas.height = sourceHeight;
        canvas.width = Math.round(sourceHeight * captureAspect);
      } else {
        canvas.width = sourceWidth;
        canvas.height = Math.round(sourceWidth / captureAspect);
      }
      const ctx = canvas.getContext('2d');
      if (config.filter.css) ctx.filter = config.filter.css;
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      drawVideoCover(ctx, video, 0, 0, canvas.width, canvas.height);
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      currentCaptured.push(imgData);
      setCaptured([...currentCaptured]);
      
      if (currentShot < shotCount - 1) {
         setStatus('idle');
         await wait(1000);
      }
    }
    
    setStatus('done');
    const finalBlob = await stopRecording();
    setTimeout(() => onComplete([...currentCaptured], finalBlob), 800);
  };

  return (
    <div className="h-[100dvh] min-h-[420px] flex flex-col bg-zinc-950 p-2 sm:p-6 relative select-none overflow-hidden">
      {/* Saloon Camera Viewfinder Kiosk */}
      <div className="flex-1 min-h-0 bg-black rounded-3xl border-4 border-amber-950/80 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden flex flex-col">
        
        {/* Screen Glare Reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/5 via-transparent to-transparent pointer-events-none z-30" />
        
        {/* Top Camera Sensor Indicator */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-black border-2 border-amber-600/60 rounded-full z-40 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
        </div>

        {/* Viewfinder Top Bar */}
        <header className="absolute top-5 left-5 right-5 z-40 flex justify-between items-center pointer-events-auto">
          <button 
            onClick={onCancel} 
            className="p-3 bg-black/60 hover:bg-black/90 backdrop-blur-md rounded-full text-white transition-all hover:scale-110 active:scale-95 border border-white/10 shadow-xl cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Central REC Indicator */}
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-500/30 shadow-xl text-xs font-mono tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-red-400 font-bold">REC TIMELAPSE • SALOON CAM</span>
          </div>

          {/* Shot Count Badge */}
          <div className="bg-black/60 backdrop-blur-md px-5 py-2 rounded-full text-xs sm:text-sm font-bold border border-amber-500/30 shadow-xl text-amber-200 font-mono">
            SHOT {shotIndex + 1} / {shotCount}
          </div>
        </header>

        {/* Camera Feed Container */}
        <div className="flex-1 min-h-0 relative flex items-center justify-center overflow-hidden bg-zinc-950">
          <div className="relative shrink-0 overflow-hidden rounded-2xl border border-amber-500/35 shadow-[0_0_50px_rgba(0,0,0,0.65)] bg-black" style={{ width: `${cameraWidth}px`, height: `${cameraHeight}px` }}>
          <video 
            ref={videoRef} autoPlay playsInline muted 
            className="absolute inset-0 w-full h-full object-cover -scale-x-100"
            style={{ filter: config.filter.css }}
          />
          <canvas ref={canvasRef} className="hidden" />
          <canvas ref={recordCanvasRef} className="hidden" />

          {/* Rule of Thirds Grid Lines */}
          <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 opacity-20">
            <div className="border-r border-b border-amber-200" />
            <div className="border-r border-b border-amber-200" />
            <div className="border-b border-amber-200" />
            <div className="border-r border-b border-amber-200" />
            <div className="border-r border-b border-amber-200" />
            <div className="border-b border-amber-200" />
            <div className="border-r border-b border-amber-200" />
            <div className="border-r border-b border-amber-200" />
            <div />
          </div>

          {/* Antique Brass Corner Framing Marks */}
          <div className="absolute inset-6 sm:inset-10 pointer-events-none z-20">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-400/80 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-400/80 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-400/80 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-400/80 rounded-br-lg" />
          </div>

          {/* Shutter Flash Animation Screen */}
          {status === 'flashing' && (
            <div className="absolute inset-0 bg-white z-50 pointer-events-none opacity-100 animate-[pulse_0.15s_ease-out]" />
          )}

          {/* Large Countdown Overlay */}
          {status === 'countdown' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] z-40 pointer-events-none">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-amber-400/80 flex items-center justify-center bg-black/60 backdrop-blur-md shadow-[0_0_60px_rgba(245,158,11,0.5)] animate-pulse">
                <span className="text-7xl sm:text-9xl font-black text-amber-300 font-serif drop-shadow-[0_0_30px_rgba(245,158,11,0.9)]">
                  {count}
                </span>
              </div>
            </div>
          )}

          {/* Idle Shutter Trigger Button */}
          {status === 'idle' && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-40">
              <button 
                onClick={startSequence}
                className="group relative w-24 h-24 rounded-full border-4 border-amber-500 bg-amber-600/30 p-2 flex items-center justify-center hover:bg-amber-600/50 hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(217,119,6,0.7)] cursor-pointer"
              >
                <div className="w-full h-full bg-gradient-to-tr from-amber-600 to-yellow-500 rounded-full group-hover:from-amber-500 group-hover:to-yellow-400 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.8)] transition-all duration-300 shadow-inner" />
              </button>
              <span className="text-amber-100 text-xs sm:text-sm font-bold tracking-wider bg-black/70 px-5 py-2 rounded-full backdrop-blur-md border border-amber-500/30 animate-pulse font-serif">
                🤠 แตะเพื่อเริ่มถ่ายรูป ({shotCount} ช็อต)
              </span>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* Captured Preview Strip at Bottom */}
      <div className="h-28 sm:h-32 mt-3 shrink-0 glass rounded-2xl p-2.5 flex gap-3 overflow-x-auto items-center justify-center z-10 border border-amber-500/20">
        {Array.from({ length: shotCount }).map((_, i) => (
          <div 
            key={i} 
            className={`h-full rounded-xl border-2 overflow-hidden bg-zinc-900 transition-all duration-300 relative shrink-0 ${
              i === shotIndex && status !== 'idle'
                ? 'border-amber-500 scale-105 shadow-lg shadow-amber-500/40 ring-2 ring-amber-400/50' 
                : 'border-white/10'
            }`}
            style={{ aspectRatio: getCaptureAspect(config.layout, i, photoConfig) }}
          >
            {captured[i] ? (
              <img src={captured[i]} alt={`Shot ${i+1}`} className="w-full h-full object-cover animate-in fade-in" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 gap-1">
                <ImageIcon className="w-5 h-5 opacity-40 text-amber-500/40" />
                <span className="text-[10px] font-mono text-zinc-500">ช็อต {i + 1}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- DRAGGABLE STICKER COMPONENT (SUPER SMOOTH & INTUITIVE) ---
function DraggableSticker({ 
  sticker, 
  containerRef, 
  onUpdate, 
  onDelete, 
  onDuplicate,
  onFlip,
  isSelected, 
  onSelect 
}) {
  const [activeAction, setActiveAction] = useState(null); // 'drag' | 'resize' | 'rotate'
  const stickerRef = useRef(null);
  const startRef = useRef({ 
    clientX: 0, 
    clientY: 0, 
    stickerX: 0, 
    stickerY: 0, 
    scale: 1, 
    rotation: 0,
    containerWidth: 1,
    containerHeight: 1
  });

  const getContainerDimensions = () => {
    if (!containerRef.current) return { width: 1, height: 1 };
    const rect = containerRef.current.getBoundingClientRect();
    return { width: rect.width || 1, height: rect.height || 1 };
  };

  // Drag start (moving the sticker)
  const handlePointerDown = (e) => {
    e.stopPropagation();
    onSelect();
    setActiveAction('drag');

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const { width, height } = getContainerDimensions();

    startRef.current = {
      clientX,
      clientY,
      stickerX: sticker.x,
      stickerY: sticker.y,
      scale: sticker.scale || 1,
      rotation: sticker.rotation || 0,
      containerWidth: width,
      containerHeight: height
    };
    playAudioTone('tap');
  };

  // Resize start (bottom right corner handle)
  const handleResizeStart = (e) => {
    e.stopPropagation();
    setActiveAction('resize');

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const { width, height } = getContainerDimensions();

    startRef.current = {
      clientX,
      clientY,
      stickerX: sticker.x,
      stickerY: sticker.y,
      scale: sticker.scale || 1,
      rotation: sticker.rotation || 0,
      containerWidth: width,
      containerHeight: height
    };
  };

  // Rotate start (top stalk knob)
  const handleRotateStart = (e) => {
    e.stopPropagation();
    setActiveAction('rotate');

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    startRef.current = {
      clientX,
      clientY,
      stickerX: sticker.x,
      stickerY: sticker.y,
      scale: sticker.scale || 1,
      rotation: sticker.rotation || 0
    };
  };

  const handlePointerMove = useCallback((e) => {
    if (!activeAction || !containerRef.current) return;
    if (e.cancelable) e.preventDefault();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    if (activeAction === 'drag') {
      const deltaX = clientX - startRef.current.clientX;
      const deltaY = clientY - startRef.current.clientY;
      const deltaPercentX = (deltaX / startRef.current.containerWidth) * 100;
      const deltaPercentY = (deltaY / startRef.current.containerHeight) * 100;

      onUpdate(sticker.id, {
        x: Math.max(0, Math.min(100, startRef.current.stickerX + deltaPercentX)),
        y: Math.max(0, Math.min(100, startRef.current.stickerY + deltaPercentY))
      });
    } else if (activeAction === 'resize') {
      const deltaX = clientX - startRef.current.clientX;
      const deltaY = clientY - startRef.current.clientY;
      const delta = (deltaX + deltaY) / (startRef.current.containerWidth * 0.7);
      const newScale = Math.max(0.35, Math.min(4.0, startRef.current.scale + delta));
      onUpdate(sticker.id, { scale: Math.round(newScale * 100) / 100 });
    } else if (activeAction === 'rotate') {
      if (stickerRef.current) {
        const rect = stickerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const radians = Math.atan2(clientY - centerY, clientX - centerX);
        let degrees = Math.round(radians * (180 / Math.PI)) + 90;
        if (degrees > 180) degrees -= 360;
        if (degrees < -180) degrees += 360;
        onUpdate(sticker.id, { rotation: degrees });
      }
    }
  }, [activeAction, onUpdate, sticker.id, containerRef]);

  const handlePointerUp = useCallback(() => {
    setActiveAction(null);
  }, []);

  useEffect(() => {
    if (activeAction) {
      window.addEventListener('mousemove', handlePointerMove, { passive: false });
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchmove', handlePointerMove, { passive: false });
      window.addEventListener('touchend', handlePointerUp);
    }
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [activeAction, handlePointerMove, handlePointerUp]);

  const isFlipped = sticker.flipH ? -1 : 1;

  return (
    <div
      ref={stickerRef}
      onMouseDown={handlePointerDown}
      onTouchStart={handlePointerDown}
      className={`absolute cursor-grab active:cursor-grabbing select-none inline-block transition-[ring,shadow] ${
        isSelected 
          ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-black/50 rounded-2xl p-1 bg-amber-400/10 shadow-[0_0_25px_rgba(245,158,11,0.35)]' 
          : 'hover:ring-1 hover:ring-white/30 rounded-xl'
      }`}
      style={{
        left: `${sticker.x}%`,
        top: `${sticker.y}%`,
        transform: `translate(-50%, -50%) rotate(${sticker.rotation || 0}deg) scale(${sticker.scale || 1}) scaleX(${isFlipped})`,
        transformOrigin: 'center center',
        zIndex: isSelected ? 50 : 10,
        fontSize: '4.2rem',
        lineHeight: 1,
        touchAction: 'none'
      }}
    >
      {/* Sticker Content (Image / SVG / Emoji / Text) */}
      {sticker.content.startsWith('data:image') ? (
        <img 
          src={sticker.content} 
          alt="sticker"
          className="w-full h-full object-contain pointer-events-none drop-shadow-md select-none" 
          draggable={false} 
          style={{ width: '1em', height: '1em' }} 
        />
      ) : (
        <span 
          style={{ 
            color: sticker.color || 'inherit', 
            fontFamily: sticker.fontFamily || 'inherit', 
            whiteSpace: 'nowrap',
            display: 'inline-block'
          }}
          className="drop-shadow-md select-none"
        >
          {sticker.content}
        </span>
      )}

      {/* --- SELECTION CONTROLS (DIRECTLY ON STICKER) --- */}
      {isSelected && (
        <>
          {/* 1. Rotate Stalk & Knob (Top Center) */}
          <div 
            className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-50 pointer-events-auto"
            style={{ transform: `scaleX(${isFlipped})` }}
          >
            <div 
              onMouseDown={handleRotateStart}
              onTouchStart={handleRotateStart}
              className="w-8 h-8 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 flex items-center justify-center cursor-grab active:cursor-grabbing shadow-xl border-2 border-white transition-transform hover:scale-110 active:scale-95"
              title="กดค้างแล้วหมุน (Drag to Rotate)"
            >
              <RefreshCcw className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="w-0.5 h-3 bg-amber-400 shadow-sm" />
          </div>

          {/* 2. Scale Knob (Bottom Right) */}
          <div 
            onMouseDown={handleResizeStart}
            onTouchStart={handleResizeStart}
            className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 flex items-center justify-center cursor-se-resize shadow-xl border-2 border-white transition-transform hover:scale-110 active:scale-95 z-50 pointer-events-auto"
            title="ปรับขนาด (Drag to Scale)"
            style={{ transform: `scaleX(${isFlipped})` }}
          >
            <Maximize2 className="w-4 h-4 stroke-[2.5]" />
          </div>

          {/* 3. Delete Button (Top Right) */}
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(sticker.id); playAudioTone('tap'); }}
            onTouchStart={(e) => { e.stopPropagation(); onDelete(sticker.id); playAudioTone('tap'); }}
            className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-xl border-2 border-white transition-transform hover:scale-110 active:scale-95 z-50 pointer-events-auto cursor-pointer"
            title="ลบสติกเกอร์ (Delete)"
            style={{ transform: `scaleX(${isFlipped})` }}
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>

          {/* 4. Duplicate Button (Top Left) */}
          <button 
            onClick={(e) => { e.stopPropagation(); onDuplicate(sticker.id); }}
            onTouchStart={(e) => { e.stopPropagation(); onDuplicate(sticker.id); }}
            className="absolute -top-3 -left-3 w-8 h-8 bg-amber-600 hover:bg-amber-500 text-white rounded-full flex items-center justify-center shadow-xl border-2 border-white transition-transform hover:scale-110 active:scale-95 z-50 pointer-events-auto cursor-pointer"
            title="ทำซ้ำ (Duplicate)"
            style={{ transform: `scaleX(${isFlipped})` }}
          >
            <Copy className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* 5. Flip Horizontal Button (Bottom Left) */}
          <button 
            onClick={(e) => { e.stopPropagation(); onFlip(sticker.id); }}
            onTouchStart={(e) => { e.stopPropagation(); onFlip(sticker.id); }}
            className="absolute -bottom-3 -left-3 w-8 h-8 bg-zinc-800 hover:bg-zinc-700 text-amber-300 rounded-full flex items-center justify-center shadow-xl border-2 border-amber-400/80 transition-transform hover:scale-110 active:scale-95 z-50 pointer-events-auto cursor-pointer"
            title="พลิกซ้าย-ขวา (Flip Horizontal)"
            style={{ transform: `scaleX(${isFlipped})` }}
          >
            <FlipHorizontal className="w-4 h-4 stroke-[2.5]" />
          </button>
        </>
      )}
    </div>
  );
}

function EditorView({ config, photos, availableFrames, availableStickers, enabledBuiltinStickerIds, brandText, fontFamily, finalVideo, photoConfig, onExport, onRetake }) {
  const [stickers, setStickers] = useState(() => (config.layout.decorations || []).flatMap((decoration, index) => {
    const asset = BUILTIN_STICKERS.find(item => item.id === decoration.stickerId);
    return asset ? [{
      id: `layout-decoration-${index}`,
      content: asset.dataUri,
      x: decoration.x,
      y: decoration.y,
      scale: decoration.scale,
      rotation: decoration.rotation || 0,
      flipH: false,
    }] : [];
  }));
  const [selectedStickerId, setSelectedStickerId] = useState(null);
  const [activeTab, setActiveTab] = useState('stickers'); 
  const [selectedCategory, setSelectedCategory] = useState('sparkles');
  const [selectedFrame, setSelectedFrame] = useState(() => availableFrames.find(frame => frame.id === config.layout.frameId) || availableFrames[0] || DEFAULT_FRAMES[0]);
  const [isExporting, setIsExporting] = useState(false);
  const customLayout = isCustomLayout(config.layout);
  const enabledBuiltins = Array.isArray(enabledBuiltinStickerIds)
    ? new Set(enabledBuiltinStickerIds)
    : new Set(BUILTIN_STICKERS.map(sticker => sticker.id));
  
  const layoutRef = useRef(null); // The actual frame container

  const addSticker = (content) => {
    const newSticker = {
      id: Date.now().toString(),
      content,
      x: 50, // Center %
      y: 50, // Center %
      scale: 1,
      rotation: (Math.random() - 0.5) * 16,
      flipH: false
    };
    setStickers(prev => [...prev, newSticker]);
    setSelectedStickerId(newSticker.id);
    playAudioTone('pop');
  };

  const duplicateSticker = (id) => {
    const target = stickers.find(s => s.id === id);
    if (!target) return;
    const newSticker = {
      ...target,
      id: Date.now().toString(),
      x: Math.min(92, target.x + 5),
      y: Math.min(92, target.y + 5),
    };
    setStickers(prev => [...prev, newSticker]);
    setSelectedStickerId(newSticker.id);
    playAudioTone('pop');
  };

  const flipSticker = (id) => {
    setStickers(prev => prev.map(s => s.id === id ? { ...s, flipH: !s.flipH } : s));
    playAudioTone('tap');
  };

  const bringToFront = (id) => {
    setStickers(prev => {
      const target = prev.find(s => s.id === id);
      if (!target) return prev;
      return [...prev.filter(s => s.id !== id), target];
    });
    playAudioTone('tap');
  };

  const sendToBack = (id) => {
    setStickers(prev => {
      const target = prev.find(s => s.id === id);
      if (!target) return prev;
      return [target, ...prev.filter(s => s.id !== id)];
    });
    playAudioTone('tap');
  };

  const updateSticker = (id, newProps) => setStickers(prev => prev.map(s => s.id === id ? { ...s, ...newProps } : s));
  
  const deleteSticker = (id) => {
    setStickers(prev => prev.filter(s => s.id !== id));
    setSelectedStickerId(null);
    playAudioTone('tap');
  };

  const clearAllStickers = () => {
    if (stickers.length === 0) return;
    if (window.confirm("คุณต้องการลบสติกเกอร์ทั้งหมดบนภาพหรือไม่?")) {
      setStickers([]);
      setSelectedStickerId(null);
      playAudioTone('tap');
    }
  };

  const selectedSticker = stickers.find(s => s.id === selectedStickerId);

  // --- VIRTUAL CANVAS EXPORT LOGIC ---
  const handleExport = async () => {
    setIsExporting(true);
    setSelectedStickerId(null); 
    await wait(100);

    try {
      const vW = config.layout.vW;
      const vH = config.layout.vH;
      
      const canvas = document.createElement('canvas');
      canvas.width = vW;
      canvas.height = vH;
      const ctx = canvas.getContext('2d');

      // 1. Draw Frame Background
      if (selectedFrame.type === 'color') {
        ctx.fillStyle = selectedFrame.bg;
        ctx.fillRect(0, 0, vW, vH);
      } else if (selectedFrame.type === 'gradient' || selectedFrame.type === 'pattern') {
        if (selectedFrame.design === 'scrapbook') {
          drawScrapbookPaper(ctx, vW, vH, selectedFrame);
        } else {
          ctx.fillStyle = selectedFrame.baseColor || selectedFrame.colors?.[0] || '#ffffff';
          ctx.fillRect(0, 0, vW, vH);
        }
        
        if (selectedFrame.id === 'checkered') {
          ctx.fillStyle = selectedFrame.patternColor;
          const s = 100;
          for(let y=0; y<vH; y+=s) {
            for(let x=0; x<vW; x+=s) {
              if (Math.floor(x/s + y/s) % 2 === 0) ctx.fillRect(x, y, s, s);
            }
          }
        }
      } else if (selectedFrame.type === 'image') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, vW, vH);
      }

      // 2. Calculate Photo Layout Mathematics
      const padding = vW * ((photoConfig?.padding ?? 5) / 100); 
      const bottomArea = vH * 0.1;
      const contentW = vW - (padding * 2);
      const contentH = vH - padding - bottomArea;
      
      const cols = config.layout.cols || 1;
      const rows = Math.ceil(getLayoutShotCount(config.layout) / cols);
      const spacing = vW * ((photoConfig?.spacing ?? 5) / 100);

      const slotW = (contentW - (spacing * (cols - 1))) / cols;
      const slotH = (contentH - (spacing * (rows - 1))) / rows;

      // 3. Load & Draw Photos
      const loadPromises = photos.map((photoSrc, i) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            let x, y, width, height;

            if (customLayout) {
              const slot = config.layout.slots[i];
              x = (slot.x / 100) * vW;
              y = (slot.y / 100) * vH;
              width = (slot.w / 100) * vW;
              height = (slot.h / 100) * vH;
            } else {
              const row = Math.floor(i / cols);
              const col = i % cols;
              x = padding + (col * (slotW + spacing));
              y = padding + (row * (slotH + spacing));
              width = slotW;
              height = slotH;
            }

            const radius = Math.min(width, height) * ((photoConfig?.borderRadius ?? 0) / 100);

            ctx.save();
            ctx.beginPath();
            ctx.roundRect(x, y, width, height, radius);
            ctx.clip();

            ctx.fillStyle = '#e4e4e7';
            ctx.fillRect(x, y, width, height);

            drawImageCover(ctx, img, x, y, width, height);

            ctx.restore();
            resolve();
          };
          img.onerror = () => {
            console.warn(`Photo ${i} failed to load, skipping`);
            resolve();
          };
          img.src = photoSrc;
        });
      });

      await Promise.all(loadPromises);

      // 3.5 Draw Custom Frame Overlay
      if (selectedFrame.type === 'image') {
        await new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, 0, 0, vW, vH);
            resolve();
          };
          img.onerror = () => {
            console.warn('Frame overlay image failed to load, skipping');
            resolve();
          };
          img.src = selectedFrame.src;
        });
      }

      // 4. Draw Branding and Date
      if (selectedFrame.type !== 'image' && !customLayout) {
        ctx.fillStyle = selectedFrame.text;
        
        ctx.font = `bold ${vW * 0.04}px '${fontFamily}', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(brandText, vW / 2, vH - (bottomArea / 2));

        const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        ctx.font = `bold ${vW * 0.02}px '${fontFamily}', sans-serif`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(today, vW * 0.04, vH * 0.02);
      }

      if (customLayout) {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        for (const text of config.layout.texts || []) {
          ctx.fillStyle = text.color || selectedFrame.text || '#111827';
          ctx.font = `bold ${Math.max(vW * 0.018, vW * ((text.size || 4) / 100))}px '${fontFamily}', sans-serif`;
          ctx.fillText(text.text, (text.x / 100) * vW, (text.y / 100) * vH, vW * 0.9);
        }
        if (config.layout.brandText) {
          ctx.fillStyle = selectedFrame.text || '#111827';
          ctx.font = `bold ${vW * 0.032}px '${fontFamily}', sans-serif`;
          ctx.fillText(config.layout.brandText, vW / 2, vH * 0.985, vW * 0.9);
        }
      }

      // 5. Draw Stickers (Mapping % to absolute canvas pixels)
      for (const s of stickers) {
        ctx.save();
        const absX = (s.x / 100) * vW;
        const absY = (s.y / 100) * vH;
        
        ctx.translate(absX, absY); 
        ctx.rotate((s.rotation * Math.PI) / 180);
        if (s.flipH) {
          ctx.scale(-1, 1);
        }
        
        const baseFontSize = vW * 0.12; 
        const size = baseFontSize * s.scale;
        
        if (s.content.startsWith('data:image')) {
          await new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              ctx.drawImage(img, -size/2, -size/2, size, size);
              resolve();
            };
            img.onerror = () => {
              console.warn(`Sticker image failed to load: ${s.content.substring(0, 30)}...`);
              resolve();
            };
            img.src = s.content;
          });
        } else {
          ctx.font = `${s.isText ? 'bold ' : ''}${size}px '${s.fontFamily || fontFamily}', sans-serif`;
          ctx.fillStyle = s.color || '#111827';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(s.content, 0, 0);
        }
        ctx.restore();
      }

      const finalDataUrl = canvas.toDataURL('image/jpeg', 0.95);
      onExport(finalDataUrl, finalVideo);
    } catch (err) {
      console.error("Export failed:", err);
      alert("เกิดข้อผิดพลาดในการสร้างรูปภาพ กรุณาลองใหม่");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="h-[100dvh] min-h-0 flex flex-col md:flex-row bg-zinc-950 relative overflow-hidden" onClick={() => setSelectedStickerId(null)}>
      <AuroraBackground />
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-600/10 via-zinc-950/80 to-zinc-950" />

      {/* Top/Left Toolbar */}
      <div className="w-full md:w-20 bg-zinc-900/90 backdrop-blur-xl border-b md:border-b-0 md:border-r border-amber-500/20 flex flex-row md:flex-col items-center py-3.5 px-3 gap-4 md:gap-6 z-30 shrink-0 shadow-2xl">
        <button 
          onClick={onRetake} 
          className="p-3 text-zinc-400 hover:text-amber-300 hover:bg-amber-500/10 rounded-2xl transition-all cursor-pointer" 
          title="ถ่ายใหม่ (Retake)"
        >
          <RefreshCcw className="w-5 h-5" />
        </button>
        
        <div className="w-px h-6 bg-zinc-800 hidden md:block" />
        <div className="h-px w-6 bg-zinc-800 block md:hidden" />
        
        <button 
          onClick={(e) => { e.stopPropagation(); setActiveTab('stickers'); }} 
          className={`p-3 rounded-2xl transition-all relative cursor-pointer ${
            activeTab === 'stickers' 
              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 font-bold shadow-lg shadow-amber-500/30' 
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
          title="ตกแต่งสติกเกอร์ (Stickers)"
        >
          <Smile className="w-6 h-6" />
          {stickers.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-zinc-950 text-[10px] font-black flex items-center justify-center shadow-md">
              {stickers.length}
            </span>
          )}
        </button>
        
        <button 
          onClick={(e) => { e.stopPropagation(); setActiveTab('frame'); }} 
          className={`p-3 rounded-2xl transition-all cursor-pointer ${
            activeTab === 'frame' 
              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 font-bold shadow-lg shadow-amber-500/30' 
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
          title="เปลี่ยนกรอบรูป (Frames)"
        >
          <Settings className="w-6 h-6" />
        </button>

        <div className="flex-1" />
        
        <button 
          onClick={handleExport}
          disabled={isExporting}
          className="py-3 px-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 rounded-2xl transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(245,158,11,0.4)] cursor-pointer flex items-center gap-2 font-black text-sm"
          title="เสร็จสิ้น & พิมพ์/แชร์"
        >
          {isExporting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Share2 className="w-5 h-5 stroke-[2.5]" />}
          <span className="hidden md:inline font-serif">เสร็จสิ้น</span>
        </button>
      </div>

      {/* Main Canvas Area (Photo Layout Container) */}
      <div className="flex-1 min-h-0 flex items-center justify-center p-2 sm:p-4 md:p-8 overflow-hidden relative z-10">
        <div className="relative max-w-full max-h-full flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-visible">
          
          <div 
            ref={layoutRef}
            className={`relative overflow-hidden ${customLayout ? '' : config.layout.aspect} flex flex-col transition-colors duration-300 ring-2 ring-amber-500/30 rounded-2xl max-w-full max-h-full w-auto h-[min(52dvh,680px)] md:h-[min(84dvh,780px)]`}
            style={{ 
              background: selectedFrame.type === 'image' ? '#ffffff' : selectedFrame.bg,
              padding: customLayout ? 0 : `${photoConfig?.padding ?? 5}%`,
              ...(customLayout ? getLayoutAspectStyle(config.layout) : {})
            }}
          >
            {/* Photos Grid */}
            {customLayout ? (
              <div className="absolute inset-0 z-10">
                {config.layout.slots.map((slot, index) => (
                  <div
                    key={slot.id ?? index}
                    className="absolute bg-zinc-200 overflow-hidden shadow-inner"
                    style={{
                      left: `${slot.x}%`,
                      top: `${slot.y}%`,
                      width: `${slot.w}%`,
                      height: `${slot.h}%`,
                      borderRadius: `${photoConfig?.borderRadius || 0}%`,
                    }}
                  >
                    {photos[index] && <img src={photos[index]} alt="" className="w-full h-full object-cover absolute inset-0" />}
                  </div>
                ))}
              </div>
            ) : (
              <div 
                className={`flex-1 grid relative z-10 ${config.layout.cols === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}
                style={{ gap: `${photoConfig?.spacing ?? 5}%` }}
              >
                {photos.map((photo, index) => (
                  <div 
                    key={index} 
                    className="bg-zinc-200 overflow-hidden relative shadow-inner w-full h-full"
                    style={{ borderRadius: `${photoConfig?.borderRadius || 0}%` }}
                  >
                    <img src={photo} alt="" className="w-full h-full object-cover absolute inset-0" />
                  </div>
                ))}
              </div>
            )}

            {(config.layout.texts || []).map(t => (
              <div key={t.id} className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-bold pointer-events-none z-30" style={{ left: `${t.x}%`, top: `${t.y}%`, color: t.color, fontSize: `${Math.max(12, (t.size || 5) * 0.25)}vw`, fontFamily: `'${fontFamily}', sans-serif` }}>{t.text}</div>
            ))}
            {!customLayout && selectedFrame.type !== 'image' && (
              <div className="h-[10%] min-h-[40px] flex items-center justify-center shrink-0 z-20">
                <span className="font-bold text-[clamp(12px,2vh,24px)] tracking-widest font-serif" style={{ color: selectedFrame.text }}>
                  {brandText || 'WILD WEST STUDIO'}
                </span>
              </div>
            )}
            {customLayout && (
              <div className="absolute bottom-[2%] left-0 right-0 text-center font-bold text-[clamp(12px,2vh,24px)] tracking-widest pointer-events-none z-30 font-serif" style={{ color: selectedFrame.text }}>
                {config.layout.brandText || brandText || 'WILD WEST STUDIO'}
              </div>
            )}
            
            {/* Frame Overlay Image */}
            {selectedFrame.type === 'image' && (
              <img src={selectedFrame.src} className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10" />
            )}

            {/* Draggable Stickers Overlay */}
            <div className="absolute inset-0 z-50 pointer-events-none" style={{ clipPath: 'inset(0 0 0 0)' }}>
              <div className="relative w-full h-full pointer-events-auto">
                {stickers.map(sticker => (
                  <DraggableSticker
                    key={sticker.id}
                    sticker={sticker}
                    containerRef={layoutRef}
                    isSelected={selectedStickerId === sticker.id}
                    onSelect={() => setSelectedStickerId(sticker.id)}
                    onUpdate={updateSticker}
                    onDelete={deleteSticker}
                    onDuplicate={duplicateSticker}
                    onFlip={flipSticker}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right/Bottom Panel (Controls & Sticker Drawer) */}
      <div 
        className="w-full h-[36dvh] max-h-[36dvh] md:h-auto md:max-h-full md:w-88 bg-zinc-900/95 backdrop-blur-2xl border-t md:border-t-0 md:border-l border-amber-500/20 p-3 sm:p-5 md:p-6 flex flex-col gap-4 md:gap-5 z-20 shrink-0 shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {activeTab === 'stickers' && (
          <div className="space-y-5 animate-in fade-in duration-300">
            {/* Header with Title and Clear All */}
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" /> ตกแต่งสติกเกอร์ & อิโมจิ
              </h3>
              {stickers.length > 0 && (
                <button 
                  onClick={clearAllStickers}
                  className="text-[11px] text-zinc-400 hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" /> ล้างทั้งหมด ({stickers.length})
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
              {STICKER_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20 scale-[1.02]'
                      : 'bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-amber-500 text-zinc-950 font-bold shadow-md'
                    : 'bg-zinc-800/80 text-zinc-400 hover:text-white'
                }`}
              >
                ✨ ทั้งหมด
              </button>
            </div>

            {/* Sticker Grid Picker */}
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 gap-2.5 max-h-48 md:max-h-56 overflow-y-auto p-1 bg-zinc-950/40 rounded-2xl border border-zinc-800/80">
              {/* Built-in high quality vector stickers */}
              {BUILTIN_STICKERS
                .filter(s => enabledBuiltins.has(s.id) && (selectedCategory === 'all' || s.category === selectedCategory))
                .map(s => (
                  <button
                    key={s.id}
                    onClick={() => addSticker(s.dataUri)}
                    title={s.name}
                    className="aspect-square bg-zinc-800/50 hover:bg-amber-500/15 rounded-2xl flex items-center justify-center p-2 transition-all hover:scale-110 active:scale-95 border border-zinc-700/60 hover:border-amber-400/80 shadow-sm cursor-pointer group"
                  >
                    <img 
                      src={s.dataUri} 
                      alt={s.name} 
                      className="w-full h-full object-contain pointer-events-none drop-shadow-sm group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] transition-all" 
                    />
                  </button>
                ))
              }

              {/* Classic / Custom uploaded stickers */}
              {(selectedCategory === 'all' || selectedCategory === 'classic') && availableStickers.map((item, i) => (
                <button
                  key={`custom_${i}`}
                  onClick={() => addSticker(item)}
                  className="aspect-square bg-zinc-800/50 hover:bg-amber-500/15 rounded-2xl flex items-center justify-center text-3xl transition-all hover:scale-110 active:scale-95 border border-zinc-700/60 hover:border-amber-400/80 shadow-sm cursor-pointer"
                >
                  {item.startsWith('data:image') ? (
                    <img src={item} className="w-full h-full object-contain p-2 pointer-events-none" />
                  ) : (
                    <span>{item}</span>
                  )}
                </button>
              ))}
            </div>

            {/* Selected Sticker Detail Controls */}
            {selectedSticker ? (
              <div className="p-4 bg-zinc-950/80 rounded-2xl border border-amber-500/30 shadow-inner space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-amber-500/30 flex items-center justify-center overflow-hidden">
                      {selectedSticker.content.startsWith('data:image') ? (
                        <img src={selectedSticker.content} className="w-7 h-7 object-contain" />
                      ) : (
                        <span className="text-xl">{selectedSticker.content}</span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-amber-300">สติกเกอร์ที่เลือก</h4>
                      <p className="text-[10px] text-zinc-400">ลากบนรูป หรือปรับจากแถบนี้ได้เลย</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteSticker(selectedSticker.id)}
                    className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                    title="ลบสติกเกอร์"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Size Controls */}
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-300 mb-1.5">
                    <span className="font-medium">ขนาด (Size)</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-amber-400">{Math.round((selectedSticker.scale || 1) * 100)}%</span>
                      <button 
                        onClick={() => updateSticker(selectedSticker.id, { scale: 1 })}
                        className="text-[10px] text-zinc-500 hover:text-zinc-300 underline"
                      >
                        100%
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateSticker(selectedSticker.id, { scale: Math.max(0.35, Math.round(((selectedSticker.scale || 1) - 0.1) * 10) / 10) })}
                      className="p-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-300 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input 
                      type="range" min="0.4" max="3" step="0.05"
                      className="w-full accent-amber-500 cursor-pointer"
                      value={selectedSticker.scale || 1}
                      onChange={(e) => updateSticker(selectedSticker.id, { scale: parseFloat(e.target.value) })}
                    />
                    <button 
                      onClick={() => updateSticker(selectedSticker.id, { scale: Math.min(3.5, Math.round(((selectedSticker.scale || 1) + 0.1) * 10) / 10) })}
                      className="p-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-300 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Rotation Controls */}
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-300 mb-1.5">
                    <span className="font-medium">หมุน (Rotation)</span>
                    <span className="font-mono text-amber-400">{selectedSticker.rotation || 0}°</span>
                  </div>
                  <input 
                    type="range" min="-180" max="180" step="1"
                    className="w-full accent-amber-500 cursor-pointer"
                    value={selectedSticker.rotation || 0}
                    onChange={(e) => updateSticker(selectedSticker.id, { rotation: parseInt(e.target.value) })}
                  />
                  {/* Quick Snap Angle Pills */}
                  <div className="flex justify-between gap-1 mt-1.5">
                    {[-90, -45, 0, 45, 90].map(deg => (
                      <button
                        key={deg}
                        onClick={() => { updateSticker(selectedSticker.id, { rotation: deg }); playAudioTone('tap'); }}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                          selectedSticker.rotation === deg ? 'bg-amber-500 text-zinc-950 font-bold' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {deg}°
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Action Toolbar */}
                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  <button 
                    onClick={() => flipSticker(selectedSticker.id)}
                    className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white flex flex-col items-center gap-1 text-[10px] transition-colors cursor-pointer"
                    title="พลิกกลับด้าน"
                  >
                    <FlipHorizontal className="w-4 h-4 text-amber-400" />
                    <span>พลิก</span>
                  </button>
                  <button 
                    onClick={() => bringToFront(selectedSticker.id)}
                    className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white flex flex-col items-center gap-1 text-[10px] transition-colors cursor-pointer"
                    title="ย้ายมาหน้าสุด"
                  >
                    <ArrowUp className="w-4 h-4 text-amber-400" />
                    <span>บนสุด</span>
                  </button>
                  <button 
                    onClick={() => sendToBack(selectedSticker.id)}
                    className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white flex flex-col items-center gap-1 text-[10px] transition-colors cursor-pointer"
                    title="ย้ายไปหลังสุด"
                  >
                    <ArrowDown className="w-4 h-4 text-amber-400" />
                    <span>ล่างสุด</span>
                  </button>
                  <button 
                    onClick={() => duplicateSticker(selectedSticker.id)}
                    className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white flex flex-col items-center gap-1 text-[10px] transition-colors cursor-pointer"
                    title="ทำซ้ำ"
                  >
                    <Copy className="w-4 h-4 text-amber-400" />
                    <span>ทำซ้ำ</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-5 text-center border-2 border-dashed border-zinc-800/90 rounded-2xl text-zinc-400 text-xs leading-relaxed bg-zinc-950/30">
                <div className="text-2xl mb-1.5">🤠</div>
                <span className="font-semibold text-amber-300">วิธีตกแต่งรูป:</span>
                <p className="mt-1 text-zinc-400">
                  แตะสติกเกอร์ที่ต้องการจากรายการด้านบน เพื่อวางลงบนรูป จากนั้นแตะบนรูปเพื่อหมุน ขยาย ย้าย หรือพลิกด้านได้อย่างอิสระ!
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'frame' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
              <Settings className="w-4 h-4 text-amber-400" /> รูปแบบกรอบภาพ (Frames)
            </h3>
            <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
              {availableFrames.map(frame => (
                <button
                  key={frame.id}
                  onClick={() => { setSelectedFrame(frame); playAudioTone('tap'); }}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                    selectedFrame.id === frame.id 
                      ? 'border-amber-400 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.25)] scale-[1.02]' 
                      : 'border-zinc-800 bg-zinc-800/30 hover:border-zinc-600'
                  }`}
                >
                  <div 
                    className="w-full h-16 rounded-xl shadow-inner border border-zinc-700/50 overflow-hidden flex items-center justify-center bg-white"
                    style={{ background: frame.type === 'image' ? 'transparent' : frame.bg }}
                  >
                    {frame.type === 'image' && <img src={frame.src} className="w-full h-full object-cover" />}
                  </div>
                  <span className="text-xs font-medium text-zinc-300 truncate w-full text-center">{frame.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ShareView({ image, videoBlob, cloudConfig, landingConfig, onDone }) {
  const [isUploading, setIsUploading] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [printableImage, setPrintableImage] = useState(null);

  const downloadVideo = () => {
    if (!videoBlob) return;
    const url = URL.createObjectURL(videoBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `photobooth-timelapse-${Date.now()}.webm`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (!image) return;
    
    if (!cloudConfig?.cloudName || !cloudConfig?.uploadPreset) {
      setErrorMsg("⚠️ ยังไม่ได้ตั้งค่า Cloudinary ในเมนู Admin ทำให้ QR Code สแกนโหลดไฟล์ไม่ได้ (รันแบบออฟไลน์)");
      return;
    }

    let isMounted = true;

    const uploadToCloudinary = async () => {
      setIsUploading(true);
      try {
        const uploadFile = async (file, resourceType = 'image') => {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', cloudConfig.uploadPreset);
          const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudConfig.cloudName}/${resourceType}/upload`, {
            method: 'POST',
            body: formData
          });
          const data = await res.json();
          if (data.error) throw new Error(data.error.message);
          return data.secure_url;
        };

        // If 'image' is a data URL, fetch it to a blob first
        const resImage = await fetch(image);
        const imageBlob = await resImage.blob();
        const imgUrl = await uploadFile(imageBlob, 'image');
        
        let vidUrl = '';
        if (videoBlob) {
          vidUrl = await uploadFile(videoBlob, 'video');
          vidUrl = vidUrl.replace(/\.(webm|ogg)$/i, '.mp4'); // Force Cloudinary to convert to mp4 for iOS support
        }
        
        const url = new URL(window.location.href);
        url.searchParams.set('download', '1');
        url.searchParams.set('img', imgUrl);
        if (vidUrl) url.searchParams.set('vid', vidUrl);
        
        if (isMounted) {
          setShareUrl(url.toString());
          let finalQrDataUrl = null;
          
          try {
            finalQrDataUrl = await QRCode.toDataURL(url.toString(), {
              width: 300, margin: 2, color: { dark: '#000000', light: '#ffffff' }
            });
          } catch (qrErr) {
            console.error("Local QR generation failed:", qrErr);
            finalQrDataUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url.toString())}&bgcolor=ffffff&color=000000`;
          }

          setQrCodeUrl(finalQrDataUrl);
          
          // Generate composite image with QR code for printing/downloading
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const baseImg = new Image();
          baseImg.crossOrigin = "Anonymous";
          
          baseImg.onload = () => {
            canvas.width = baseImg.width;
            canvas.height = baseImg.height;
            ctx.drawImage(baseImg, 0, 0);

            const qrImg = new Image();
            qrImg.crossOrigin = "Anonymous"; // Important if falling back to external API
            qrImg.onload = () => {
              const qrSize = Math.max(canvas.width * 0.12, 100); 
              const padding = canvas.width * 0.04;
              const x = canvas.width - qrSize - padding;
              const y = padding;
              
              // Draw white background for QR
              ctx.fillStyle = '#ffffff';
              ctx.fillRect(x - 4, y - 4, qrSize + 8, qrSize + 8);
              // Draw QR Code
              ctx.drawImage(qrImg, x, y, qrSize, qrSize);
              
              try {
                setPrintableImage(canvas.toDataURL('image/jpeg', 0.95));
              } catch (e) {
                console.error("Failed to composite QR code (CORS issue):", e);
              }
            };
            qrImg.onerror = (e) => console.error("QR Image failed to load on canvas", e);
            qrImg.src = finalQrDataUrl;
          };
          baseImg.onerror = (e) => console.error("Base image failed to load on canvas", e);
          baseImg.src = image;
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setErrorMsg("อัปโหลดไม่สำเร็จ: " + err.message);
        }
      } finally {
        if (isMounted) {
          setIsUploading(false);
        }
      }
    };

    uploadToCloudinary();
    return () => { isMounted = false; };
  }, [image, videoBlob, cloudConfig]);

  const handleDownload = () => {
    if (!image) return;
    try {
      const link = document.createElement('a');
      link.href = printableImage || image;
      link.download = `StudioBooth_${new Date().getTime()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch(e) {
      alert("ดาวน์โหลดล้มเหลว กรุณาแตะค้างที่รูปภาพเพื่อบันทึก");
    }
  };

  const handlePrint = () => {
    if (!image) return;
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);
    
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <html>
        <head>
          <title>Print Photobooth</title>
          <style>
            @page { margin: 0; }
            body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: white; }
            img { max-width: 100%; max-height: 100%; object-fit: contain; }
          </style>
        </head>
        <body>
          <img src="${printableImage || image}" onload="window.print(); setTimeout(() => { window.parent.document.body.removeChild(window.frameElement); }, 1000);" />
        </body>
      </html>
    `);
    doc.close();
  };

    return (
    <div 
      className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-y-auto min-h-screen text-amber-50"
    >
      <AuroraBackground />
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-600/10 via-zinc-950/80 to-zinc-950" />
      
      <div className="relative z-10 max-w-5xl w-full grid md:grid-cols-2 gap-8 md:gap-14 items-center py-6 sm:py-10">
        
        {/* Left: Result Image and Video Showcase */}
        <div className="flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> SALOON MASTERPIECE
          </div>

          <div className="print-container relative p-3 sm:p-4 bg-zinc-900/90 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] border-2 border-amber-500/30 md:rotate-[-2deg] hover:rotate-0 transition-transform duration-500 group">
            {/* Antique Brass Corner Brackets */}
            <div className="absolute -top-1.5 -left-1.5 w-5 h-5 border-t-2 border-l-2 border-amber-400 rounded-tl pointer-events-none" />
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 border-t-2 border-r-2 border-amber-400 rounded-tr pointer-events-none" />
            <div className="absolute -bottom-1.5 -left-1.5 w-5 h-5 border-b-2 border-l-2 border-amber-400 rounded-bl pointer-events-none" />
            <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 border-b-2 border-r-2 border-amber-400 rounded-br pointer-events-none" />

            <img 
              src={printableImage || image} 
              alt="Final Print" 
              className="print-image max-h-[50vh] md:max-h-[56vh] object-contain rounded-2xl shadow-inner pointer-events-auto transition-transform group-hover:scale-[1.01]" 
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-white/10 pointer-events-none rounded-3xl" />
          </div>
          
          {videoBlob && (
            <div className="relative p-2.5 bg-zinc-900/90 rounded-2xl border-2 border-amber-600/40 w-full max-w-[280px] shadow-2xl md:rotate-[2.5deg] hover:rotate-0 transition-all duration-300">
              <div className="absolute -top-3.5 -right-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 text-[11px] font-black tracking-wide px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 z-10">
                <span>🎞️ TIMELAPSE REEL</span>
              </div>
              <video 
                src={URL.createObjectURL(videoBlob)} 
                autoPlay loop muted playsInline 
                className="w-full rounded-xl shadow-inner"
                ref={v => { if(v) v.playbackRate = 2.0; }}
              />
              <button 
                onClick={downloadVideo} 
                className="absolute bottom-4 right-4 p-3 bg-zinc-950/80 hover:bg-amber-500 text-amber-300 hover:text-zinc-950 rounded-full transition-all backdrop-blur-md hover:scale-110 shadow-lg border border-amber-500/30 cursor-pointer"
                title="ดาวน์โหลดวิดีโอ Timelapse"
              >
                <Download className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          )}
          <p className="text-zinc-400 text-xs mt-1 hidden md:block">💡 แตะค้างที่รูปภาพ หากต้องการเซฟด้วยตัวเอง</p>
        </div>

        {/* Right: Actions */}
        <div className="space-y-6 md:space-y-7 flex flex-col items-center md:items-start text-center md:text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wider uppercase mb-3">
              ⭐ YEEHAW! PHOTO READY
            </div>
            <h2 
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-black mb-3 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 drop-shadow-[0_2px_12px_rgba(245,158,11,0.25)]"
            >
              {landingConfig?.shareTitle || "รูปภาพของคุณพร้อมแล้ว!"}
            </h2>
            <p className="text-amber-100/80 text-sm sm:text-base leading-relaxed">
              {landingConfig?.shareSubtitle || "สแกนคิวอาร์โค้ดเพื่อเซฟลงมือถือได้เลย หรือกดปุ่มดาวน์โหลด HD ด้านล่าง"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 w-full max-w-md">
            <button 
              onClick={handleDownload}
              className="flex-1 py-4 px-6 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 rounded-2xl font-black text-lg flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:shadow-[0_0_35px_rgba(245,158,11,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Download className="w-5 h-5 stroke-[2.5]" />
              <span>ดาวน์โหลด HD</span>
            </button>
            <button 
              onClick={handlePrint}
              className="flex-1 py-4 px-6 bg-zinc-900/80 hover:bg-zinc-800/90 border-2 border-amber-500/40 hover:border-amber-400 text-amber-200 hover:text-amber-100 rounded-2xl font-bold text-lg flex items-center justify-center gap-2.5 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg cursor-pointer backdrop-blur-md"
            >
              <Printer className="w-5 h-5" />
              <span>พิมพ์รูป</span>
            </button>
          </div>
          
          <p className="text-amber-400/80 text-xs w-full max-w-md text-left px-1">
            * หากปุ่มดาวน์โหลดไม่ทำงาน ให้แตะค้างที่รูปภาพด้านซ้าย แล้วเลือก <strong>"บันทึกรูปภาพ" (Save Image)</strong>
          </p>

          <div className="w-full max-w-md glass-card p-5 sm:p-6 rounded-3xl border-2 border-amber-500/30 backdrop-blur-xl bg-zinc-900/70 flex flex-col gap-4 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-500/10 to-transparent pointer-events-none" />

            {errorMsg && (
              <div className="text-amber-300 text-xs bg-amber-500/10 p-3 rounded-xl border border-amber-500/30 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                <span className="leading-tight">{errorMsg}</span>
              </div>
            )}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-2xl p-2 flex items-center justify-center shrink-0 relative overflow-hidden ring-2 ring-amber-400/40 shadow-xl">
                {isUploading && (
                  <div className="flex flex-col items-center justify-center gap-1.5 p-2 text-center">
                    <Loader2 className="w-6 h-6 text-amber-600 animate-spin" />
                    <span className="text-[10px] text-zinc-700 font-bold leading-tight">กำลังอัปโหลด...</span>
                  </div>
                )}
                {!isUploading && qrCodeUrl && (
                  <img src={qrCodeUrl} alt="QR Code" className="w-full h-full object-contain animate-in fade-in zoom-in duration-500" />
                )}
                {!isUploading && !qrCodeUrl && !errorMsg && (
                  <div className="flex flex-col items-center justify-center text-center p-1 text-zinc-400">
                    <QrCode className="w-8 h-8 opacity-40 mb-1" />
                    <span className="text-[9px]">ไม่มี QR</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
                  <Smartphone className="w-3.5 h-3.5" /> MOBILE SCANNER
                </div>
                <h3 className="font-serif font-black text-lg sm:text-xl text-amber-100 flex items-center gap-2">
                  สแกนรับรูปภาพ
                </h3>
                <p className="text-xs sm:text-sm text-amber-200/70 leading-relaxed mt-1">
                  เปิดกล้องมือถือสแกนเพื่อรับรูปและวิดีโอต้นฉบับความคมชัดระดับ HD ลงเครื่องทันที
                </p>
              </div>
            </div>
          </div>

          <button 
            onClick={onDone}
            className="w-full max-w-md py-3.5 px-6 rounded-2xl border border-zinc-700/80 hover:border-amber-500/60 bg-zinc-900/60 hover:bg-zinc-800/80 text-zinc-300 hover:text-amber-200 transition-all font-semibold flex items-center justify-center gap-2.5 shadow-md cursor-pointer group"
          >
            <RefreshCcw className="w-4 h-4 text-amber-400 group-hover:-rotate-180 transition-transform duration-500" />
            <span>กลับไปหน้าแรก / ถ่ายใหม่ (Saloon Home)</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function DownloadView() {
  const params = new URLSearchParams(window.location.search);
  const imgUrl = params.get("img");
  const vidUrl = params.get("vid");

  const downloadFile = async (url, filename) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch(err) {
      window.open(url, "_blank");
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 p-4 sm:p-6 items-center min-h-screen text-center justify-center relative overflow-hidden">
      <AuroraBackground />
      <div className="relative z-10 max-w-md w-full flex flex-col items-center py-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-widest uppercase mb-3">
          ⭐ SALOON PHOTO BOOTH
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 mb-2 drop-shadow">
          รูปภาพของคุณมาแล้ว!
        </h1>
        <p className="text-zinc-400 text-sm mb-6">แตะปุ่มเพื่อดาวน์โหลดรูปและวิดีโอลงมือถือได้เลย 🤠</p>

        {imgUrl && (
          <div className="mb-6 flex flex-col items-center w-full glass-card p-4 rounded-3xl border-2 border-amber-500/30 shadow-2xl">
            <img src={imgUrl} className="max-w-full w-64 rounded-2xl shadow-2xl mb-4 border border-amber-500/20" />
            <button 
              onClick={() => downloadFile(imgUrl, "photobooth.jpg")} 
              className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 rounded-2xl font-black text-base shadow-xl flex items-center justify-center gap-2.5 transition-transform active:scale-95 cursor-pointer"
            >
              <Download className="w-5 h-5 stroke-[2.5]" /> โหลดรูปภาพความละเอียดสูง
            </button>
            <p className="text-xs text-zinc-400 mt-2.5">หรือแตะค้างที่รูปภาพเพื่อกด "บันทึกรูปภาพ"</p>
          </div>
        )}

        {vidUrl && (
          <div className="mb-6 flex flex-col items-center w-full glass-card p-4 rounded-3xl border-2 border-amber-500/30 shadow-2xl">
            <div className="text-amber-400 text-xs font-bold tracking-wider uppercase mb-2 flex items-center gap-1.5">
              <span>🎞️ วิดีโอ TIMELAPSE</span>
            </div>
            <video src={vidUrl} autoPlay loop muted playsInline className="max-w-full w-52 rounded-2xl shadow-2xl mb-4 border border-amber-500/20" />
            <button 
              onClick={() => downloadFile(vidUrl, "photobooth-timelapse.mp4")} 
              className="w-full py-4 bg-zinc-900/90 hover:bg-zinc-800 text-amber-300 border border-amber-500/40 rounded-2xl font-bold text-base shadow-lg flex items-center justify-center gap-2.5 transition-transform active:scale-95 cursor-pointer"
            >
              <Download className="w-5 h-5 stroke-[2.5]" /> โหลดวิดีโอ Timelapse
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
