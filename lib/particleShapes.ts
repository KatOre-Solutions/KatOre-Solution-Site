// Target position buffers for the shared morphing particle field.
// Every generator returns a Float32Array of length POINT_COUNT * 3 so any two
// shapes can be linearly interpolated point-for-point.

export const POINT_COUNT = 6500;
export const RADIUS = 240;
const WORLD = RADIUS * 2; // planar extent used when sampling 2D glyphs

// Camera setup lives here rather than in the renderer because sections need it
// to convert between world units and the viewport (see `fitScale`).
export const CAMERA_FOV = 55;
export const CAMERA_Z = 620;

/** World-space width of the `<KO/>` mark at scale 1. */
export const LOGO_SPAN = RADIUS * 4.2;
const LOGO_ASPECT = 3.8;

/**
 * Largest uniform scale that keeps `width` world units on screen. The mark is
 * wide enough to overflow a narrow window at scale 1, so the hero shrinks it to
 * fit rather than letting the chevrons run off the edges.
 */
export function fitScale(width: number, margin = 0.88): number {
  if (typeof window === "undefined") return 1;
  const halfH = Math.tan((CAMERA_FOV / 2) * (Math.PI / 180)) * CAMERA_Z;
  const worldWidth = halfH * 2 * (window.innerWidth / window.innerHeight);
  return Math.min(1, (worldWidth * margin) / width);
}

/**
 * Viewport width at which the Services section splits into a left gutter for the
 * cloud and a right column for the cards. Mirrors the `md:` breakpoint the
 * section's `md:pl-[38%]` insets use — the two must move together, or the cloud
 * ends up parked in a gutter that no longer exists.
 */
export const SERVICES_SPLIT_MIN = 768;

/** Half the visible world width at the current viewport aspect. */
function worldHalfWidth(): number {
  const halfH = Math.tan((CAMERA_FOV / 2) * (Math.PI / 180)) * CAMERA_Z;
  return halfH * (window.innerWidth / window.innerHeight);
}

/**
 * Convert a horizontal viewport position in CSS pixels to world units on the
 * cloud's plane, so a section can place the cloud against something it has
 * actually measured rather than against a tuned constant.
 */
export function pxToWorldX(px: number): number {
  if (typeof window === "undefined") return 0;
  return (px / window.innerWidth - 0.5) * 2 * worldHalfWidth();
}

/**
 * Uniform scale for the Services cloud. Centred behind the cards it has the
 * full width to work with but must stay clear of the card edges, so it runs a
 * little smaller than it does out in its own gutter.
 */
export function servicesScale(): number {
  if (typeof window === "undefined") return 0.68;
  return window.innerWidth < SERVICES_SPLIT_MIN ? 0.52 : 0.68;
}

/** Fibonacci-sphere distribution (matches the original hero sphere). */
export function sphere(): Float32Array {
  const out = new Float32Array(POINT_COUNT * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < POINT_COUNT; i++) {
    const y = 1 - (i / (POINT_COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    out[i * 3] = Math.cos(theta) * r * RADIUS;
    out[i * 3 + 1] = y * RADIUS;
    out[i * 3 + 2] = Math.sin(theta) * r * RADIUS;
  }
  return out;
}

/**
 * Wireframe cube: points packed along the 12 edges, not scattered over the six
 * faces. Filled faces average out into a soft blob — it's the empty interior
 * and the hard edges that let the eye read a box.
 */
export function cube(): Float32Array {
  const out = new Float32Array(POINT_COUNT * 3);
  const H = RADIUS * 0.78;
  const ends = [-H, H];

  // Each edge as [originX, originY, originZ, dirX, dirY, dirZ].
  const edges: number[][] = [];
  for (const y of ends) for (const z of ends) edges.push([-H, y, z, 1, 0, 0]);
  for (const x of ends) for (const z of ends) edges.push([x, -H, z, 0, 1, 0]);
  for (const x of ends) for (const y of ends) edges.push([x, y, -H, 0, 0, 1]);

  const span = 2 * H;
  const jitter = H * 0.09;

  for (let i = 0; i < POINT_COUNT; i++) {
    const e = edges[i % edges.length];
    // Bias travel toward both ends so the corners pack denser than the middle
    // of each edge, which is what gives the shape its structure.
    let t = Math.random();
    t = t < 0.5 ? Math.pow(t * 2, 1.4) / 2 : 1 - Math.pow((1 - t) * 2, 1.4) / 2;

    out[i * 3] = e[0] + e[3] * t * span + (Math.random() - 0.5) * jitter;
    out[i * 3 + 1] = e[1] + e[4] * t * span + (Math.random() - 0.5) * jitter;
    out[i * 3 + 2] = e[2] + e[5] * t * span + (Math.random() - 0.5) * jitter;
  }
  return out;
}

type GlyphOpts = {
  /** Canvas width / height. 1 = square icon. */
  aspect?: number;
  /** World-space width the sampled canvas maps onto. */
  span?: number;
  /** Thickness of the z-slab the points are scattered through. */
  depth?: number;
};

/**
 * Generic 2D-glyph sampler: draw an icon onto an offscreen canvas, then scatter
 * the point cloud across its filled pixels on a slab facing the camera. The
 * canvas is always 220px tall, so `draw` can treat `h` as its unit of scale.
 */
function glyph(
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
  { aspect = 1, span = WORLD, depth = 24 }: GlyphOpts = {}
): Float32Array {
  const out = new Float32Array(POINT_COUNT * 3);
  if (typeof document === "undefined") return out;

  const H = 220;
  const W = Math.round(H * aspect);
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return out;

  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#fff";
  draw(ctx, W, H);

  const data = ctx.getImageData(0, 0, W, H).data;
  const filled: number[] = [];
  for (let p = 0; p < W * H; p++) {
    if (data[p * 4 + 3] > 128) filled.push(p);
  }

  for (let i = 0; i < POINT_COUNT; i++) {
    let px = 0,
      py = 0;
    if (filled.length) {
      const idx = filled[(Math.random() * filled.length) | 0];
      px = idx % W;
      py = (idx / W) | 0;
    }
    out[i * 3] = (px / W - 0.5) * span;
    out[i * 3 + 1] = -(py / H - 0.5) * (span / aspect);
    out[i * 3 + 2] = (Math.random() - 0.5) * depth;
  }
  return out;
}

/**
 * The Katore Solutions `<KO/>` mark, sampled as a shallow extruded slab so the
 * mouse tilt reads as thickness rather than a flat sheet.
 */
export function logoMark(): Float32Array {
  return glyph(
    (ctx, w, h) => {
      const u = h; // 1 unit = mark height
      const cx = w / 2;
      const mid = h / 2;
      const top = h * 0.07;
      const bot = h * 0.93;
      const lTop = h * 0.13;
      const lBot = h * 0.87;
      const tip = u * 1.78; // outer chevron point, from centre
      const arm = u * 0.52; // horizontal reach of each chevron arm

      ctx.lineCap = "butt";
      ctx.lineJoin = "miter";

      // Outer chevrons: < ... >
      ctx.lineWidth = u * 0.13;
      ctx.beginPath();
      ctx.moveTo(cx - tip + arm, top);
      ctx.lineTo(cx - tip, mid);
      ctx.lineTo(cx - tip + arm, bot);
      ctx.moveTo(cx + tip - arm, top);
      ctx.lineTo(cx + tip, mid);
      ctx.lineTo(cx + tip - arm, bot);
      ctx.stroke();

      // Hairline rules standing in for the "KATORE SOLUTIONS" wordmark, which is
      // far too fine to resolve at this point count.
      ctx.lineWidth = u * 0.022;
      ctx.beginPath();
      ctx.moveTo(cx - tip + arm + u * 0.14, mid);
      ctx.lineTo(cx - u * 1.04, mid);
      ctx.moveTo(cx + u * 1.04, mid);
      ctx.lineTo(cx + tip - arm - u * 0.14, mid);
      ctx.stroke();

      // K
      ctx.lineWidth = u * 0.15;
      const kx = cx - u * 0.9;
      ctx.beginPath();
      ctx.moveTo(kx, lTop);
      ctx.lineTo(kx, lBot);
      ctx.moveTo(kx + u * 0.5, lTop);
      ctx.lineTo(kx, mid);
      ctx.lineTo(kx + u * 0.52, lBot);
      ctx.stroke();

      // O
      ctx.beginPath();
      ctx.arc(cx + u * 0.14, mid, u * 0.37, 0, Math.PI * 2);
      ctx.stroke();

      // /
      ctx.beginPath();
      ctx.moveTo(cx + u * 0.62, lBot);
      ctx.lineTo(cx + u * 0.94, lTop);
      ctx.stroke();
    },
    { aspect: LOGO_ASPECT, span: LOGO_SPAN, depth: 48 }
  );
}

/** `</>` developer glyph. */
export function codeBrackets(): Float32Array {
  return glyph((ctx, s) => {
    ctx.lineWidth = 18;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(s * 0.34, s * 0.28);
    ctx.lineTo(s * 0.15, s * 0.5);
    ctx.lineTo(s * 0.34, s * 0.72);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(s * 0.66, s * 0.28);
    ctx.lineTo(s * 0.85, s * 0.5);
    ctx.lineTo(s * 0.66, s * 0.72);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(s * 0.58, s * 0.24);
    ctx.lineTo(s * 0.42, s * 0.76);
    ctx.stroke();
  });
}

/** Rising bar chart with an up-right trend arrow. */
export function chart(): Float32Array {
  return glyph((ctx, s) => {
    const base = s * 0.8;
    const bars = [
      { x: 0.2, h: 0.22 },
      { x: 0.4, h: 0.38 },
      { x: 0.6, h: 0.56 },
    ];
    const w = s * 0.1;
    for (const b of bars) ctx.fillRect(b.x * s, base - b.h * s, w, b.h * s);
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(s * 0.16, s * 0.56);
    ctx.lineTo(s * 0.86, s * 0.2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(s * 0.86, s * 0.2);
    ctx.lineTo(s * 0.68, s * 0.2);
    ctx.moveTo(s * 0.86, s * 0.2);
    ctx.lineTo(s * 0.86, s * 0.38);
    ctx.stroke();
  });
}

/**
 * Ordered shapes aligned to the four `serviceCards` (lib/data.ts):
 * Web · Custom Software · Automation · Hosting.
 *
 * The sphere stays first because the hero dissolves the `<KO/>` mark into
 * `shapes[0]`, so Services opens on a shape the hero has already settled onto.
 */
export function buildShapes(): Float32Array[] {
  return [sphere(), codeBrackets(), chart(), cube()];
}

// Build once in the browser and share the same buffers across the field, hero,
// and Services so morphs interpolate between identical target arrays.
let cache: Float32Array[] | null = null;
export function getShapes(): Float32Array[] {
  if (typeof document === "undefined") return buildShapes(); // SSR-safe fallback
  if (!cache) cache = buildShapes();
  return cache;
}

/**
 * How much room a shape needs on screen, measured from the buffer so editing a
 * glyph cannot silently change how big it reads.
 *
 * The cloud spins about Y, so a shape's widest moment is not its x extent but
 * its radius in the XZ plane — a cube measured across its faces looks 28%
 * smaller than it really is, then sweeps out to its diagonal as it turns and
 * runs off the screen edges. Taking the XZ radius against the y extent gives
 * the smallest upright cylinder that contains the shape, which is invariant
 * under that spin. (The mouse tilt on X is small and bounded, so it is ignored.)
 */
function spinSafeHalfExtent(buf: Float32Array): number {
  let maxRadiusSq = 0;
  let maxY = 0;
  for (let i = 0; i < buf.length; i += 3) {
    const x = buf[i];
    const z = buf[i + 2];
    const radiusSq = x * x + z * z;
    if (radiusSq > maxRadiusSq) maxRadiusSq = radiusSq;
    const y = Math.abs(buf[i + 1]);
    if (y > maxY) maxY = y;
  }
  return Math.max(Math.sqrt(maxRadiusSq), maxY);
}

/**
 * Per-shape multipliers that hold the cloud at one apparent size across the
 * whole Services morph.
 *
 * The sphere fills its full 2·RADIUS extent, but the glyphs are sampled from a
 * canvas they only partly fill — `</>` reaches about 70% as far, the chart
 * about 72%. At a single uniform scale the section therefore opens on a big
 * confident sphere and then visibly shrinks for every card after it. Each shape
 * carries a factor that normalises it back to the sphere, so the cloud keeps
 * the presence it has on the first card all the way through.
 *
 * The sphere is the reference and so is always 1 — the opening shape is the one
 * whose size everything else is being matched to, and it must not move.
 *
 * Only the Services section applies these; the hero and the exit-to-logo settle
 * use their own `fitScale`, so leaving the section returns the cloud to normal.
 */
let sizeFactorCache: number[] | null = null;
export function getShapeSizeFactors(): number[] {
  if (sizeFactorCache) return sizeFactorCache;
  const extents = getShapes().map(spinSafeHalfExtent);
  const reference = extents[0] || 1; // the opening sphere sets the target size
  sizeFactorCache = extents.map((e) => (e > 0 ? reference / e : 1));
  return sizeFactorCache;
}

/**
 * Per-point colour, fixed for the life of the cloud so points keep their tone
 * through every morph.
 *
 * The brand's particle tones (silver / platinum) sit at roughly 1.3–2.2:1
 * against the Soft White ground — far too faint to hold a mark at 2px. So the
 * cloud is built the way the logo itself is: a graphite-to-charcoal body with
 * silver as the highlight, not silver throughout. That keeps it legible while
 * staying inside the metallic palette.
 */
const hex = (v: number) => [
  ((v >> 16) & 255) / 255,
  ((v >> 8) & 255) / 255,
  (v & 255) / 255,
];

/**
 * `onLight` = graphite body with silver speculars, for the Soft White ground.
 * `onDark`  = platinum body with white speculars, for the dark Services band.
 *
 * Two ramps are needed because one set cannot serve both: silver on Soft White
 * is ~2:1 and vanishes, while graphite on the graphite band vanishes just as
 * badly. The field cross-fades between them (see `tone` on the controller).
 */
export type Tone = "onLight" | "onDark";

export function buildColors(tone: Tone): Float32Array {
  const out = new Float32Array(POINT_COUNT * 3);
  const onLight = tone === "onLight";

  // Body ramp endpoints, then two accent tones layered on top.
  const from = hex(onLight ? 0x111315 : 0xc8ccd2);
  const to = hex(onLight ? 0x3a3e43 : 0xe4e6e9);
  const accent = hex(onLight ? 0x5f6368 : 0xa7abb0);
  const spec = hex(onLight ? 0xa7abb0 : 0xffffff);

  for (let i = 0; i < POINT_COUNT; i++) {
    const r = Math.random();
    let c: number[];
    if (r < 0.74) {
      const t = Math.random();
      c = [
        from[0] + (to[0] - from[0]) * t,
        from[1] + (to[1] - from[1]) * t,
        from[2] + (to[2] - from[2]) * t,
      ];
    } else if (r < 0.9) {
      c = accent;
    } else {
      c = spec;
    }
    out[i * 3] = c[0];
    out[i * 3 + 1] = c[1];
    out[i * 3 + 2] = c[2];
  }
  return out;
}

const colorCache = new Map<Tone, Float32Array>();
export function getColors(tone: Tone): Float32Array {
  let c = colorCache.get(tone);
  if (!c) {
    c = buildColors(tone);
    colorCache.set(tone, c);
  }
  return c;
}

/** The hero's opening shape — kept out of `getShapes()` so the four service
 *  cards stay aligned to their own indices. */
let logoCache: Float32Array | null = null;
export function getLogoShape(): Float32Array {
  if (typeof document === "undefined") return logoMark();
  if (!logoCache) logoCache = logoMark();
  return logoCache;
}
