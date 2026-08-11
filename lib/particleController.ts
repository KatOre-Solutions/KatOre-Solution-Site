// Framework-agnostic singleton that carries the current render intent for the
// shared particle field. Sections (Hero / Services) write target values from
// their ScrollTriggers; ParticleField reads them every animation frame and
// smooths toward them. Keeping this outside React avoids per-frame re-renders.

export type MorphState = {
  /** Blend source / destination target buffers (from lib/particleShapes). */
  shapeA: Float32Array | null;
  shapeB: Float32Array | null;
  /** 0 → shapeA, 1 → shapeB. */
  morphT: number;
  /** Horizontal placement of the cloud in world units (0 = screen centre). */
  offsetX: number;
  scale: number;
  opacity: number;
  /** Continuous auto-spin multiplier (1 = lively sphere, 0 = flat glyph). */
  spin: number;
  /**
   * Which colour ramp the cloud wears: 0 = graphite (over the light page),
   * 1 = platinum (over the dark Services band). Cross-faded, not switched.
   */
  tone: number;
};

const state: MorphState = {
  shapeA: null,
  shapeB: null,
  morphT: 0,
  offsetX: 0,
  scale: 1,
  opacity: 1,
  spin: 1,
  tone: 0,
};

export const particleController = {
  state,
  set(patch: Partial<MorphState>) {
    Object.assign(state, patch);
  },
};
