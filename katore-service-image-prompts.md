# Katore Solutions service page image prompts

**Status: all five hero images are generated and installed.** They were produced
externally from the prompts below and now live in `public/services/`, so every
service page renders its real image rather than the placeholder.

This file is kept as the record of the art direction. Use it to regenerate a
hero, to add one for a future service, or to keep a replacement consistent with
the set.

Higgsfield was checked at the time of writing and reported 0 credits on the free
plan, which is why the images were generated elsewhere. The placeholder panel
described below still ships as the fallback: `ServiceVisual` swaps to it
automatically if an image file is ever missing, so a new service page is never
broken while its visual is being made.

## How to install or replace an image

Drop the file into `public/services/` using the exact filename below.
`components/ui/ServiceVisual.tsx` checks whether the file exists during
prerender and swaps automatically from the placeholder to the real image. There
is no flag to toggle and no code change required.

```
public/services/web-development-hero.webp
public/services/custom-software-hero.webp
public/services/automation-integrations-hero.webp
public/services/digital-product-hero.webp
public/services/hosting-support-hero.webp
```

Export as WebP, roughly 2400px on the long edge, and aim for 90KB to 160KB so
the pages stay in line with the rest of the site's asset budget.

## Cropping requirement, applies to all five

The hero container is **21:9 on desktop and 16:9 below the `md` breakpoint**,
with `object-cover` and centre alignment. Generate at **21:9** and keep every
important element inside the central 16:9 region, because roughly 12% is
trimmed from each side on phones. Nothing that carries meaning should sit in
the outer edges.

## Shared art direction

Every prompt below inherits this. Repeat it if the model needs reinforcing.

**Palette:** near black `#111315`, charcoal `#2b2e32`, metallic silver
`#a7abb0`, platinum `#e4e6e9`, soft white `#f7f8fa`. Monochrome throughout, no
colour cast.

**Feel:** premium, minimal, editorial, architectural, engineering led. Restrained
and confident, closer to an industrial design catalogue or an architecture
monograph than to technology marketing. Natural directional light with soft
falloff, real materials, shallow depth of field, generous negative space.

**Shared negative prompt:**

```
generic stock photography, business people, office teams, handshakes, smiling
models, bright colourful gradients, neon, cyberpunk, holograms, floating
translucent UI panels, glowing network lines, circuit board patterns, robots,
android hands, random code on screens, lens flare, bokeh light spots, HDR,
oversaturated, cluttered composition, watermark, signature, text, lettering,
logos, typography, distorted geometry, warped straight lines, extra fingers,
low resolution, jpeg artefacts, tilted horizon
```

---

## 1. `web-development-hero.webp`

| | |
|---|---|
| **Service page** | `/services/web-design-development` |
| **Placement** | Hero visual, directly below the headline and CTA |
| **Aspect ratio** | 21:9, safe inside centre 16:9 |
| **Purpose** | Communicate craft and considered design rather than coding. The page argues a website is a design and engineering problem, so the image should read as a workshop for digital craft. |

**Prompt**

```
A wide editorial photograph of a calm modern design studio at a large desk of
pale oiled oak. A thin bezel desktop display sits slightly off centre, angled a
few degrees toward the camera, showing an elegant abstract website layout: a
clean grid, a large soft grey type block, generous white space, one restrained
image panel. The interface is deliberately unreadable, suggested through shape
and rhythm rather than legible words. Beside the display are a brushed aluminium
keyboard, a folded grey linen cloth, and two small printed layout cards face up.
Behind the desk, a poured concrete wall and a tall window edge admit soft
directional daylight from the left, raking across the surfaces and falling off
into shadow on the right. Monochrome palette of near black, charcoal, metallic
silver, platinum and soft white. Shot on a 50mm lens at f2.0, shallow depth of
field, the display in crisp focus, the background softly dissolved. Architectural,
premium, quiet, editorial.
```

**Composition notes**

- Display and desk occupy the centre 16:9. The window edge and far wall may fall
  in the trimmed side margins.
- Screen content must stay abstract. Any suggestion of readable words or code
  breaks the brief.
- Keep the screen a soft warm grey glow, never a bright white rectangle, so it
  does not blow out against the light page.

---

## 2. `custom-software-hero.webp`

| | |
|---|---|
| **Service page** | `/services/custom-software` |
| **Placement** | Hero visual, directly below the headline and CTA |
| **Aspect ratio** | 21:9, safe inside centre 16:9 |
| **Purpose** | Show complexity being resolved into a clear system. The page is about building a system around a real process, so the image should read as many precise parts forming one deliberate structure. |

**Prompt**

```
A wide studio photograph of an abstract sculptural assembly built from precision
machined metal components: anodised charcoal blocks, brushed steel plates, and
fine milled rails interlocking into a single ordered structure that rises gently
from left to right. The parts are visibly distinct yet clearly belong to one
system, seated with tight tolerances and clean shadow gaps. Set on a seamless
soft white surface with a subtle grey gradient falling away behind. Lit by a
large soft key from the upper left with a narrow silver rim light picking out
the machined edges. Fine surface texture visible: brushing marks, a faint
chamfer, a bead blasted face. Monochrome, near black through metallic silver to
soft white. Shot on a 85mm macro lens at f5.6, deep enough that the structure
holds focus front to back, background softly out of focus. Industrial design
catalogue aesthetic, precise, premium, restrained.
```

**Composition notes**

- Centre the assembly. The falloff either side is expendable.
- Ordered, not chaotic: the point is complexity organised, so avoid a scattered
  or exploded arrangement.
- Real machined metal, not rendered chrome. Avoid a mirror finish.

---

## 3. `automation-integrations-hero.webp`

| | |
|---|---|
| **Service page** | `/services/automation-integrations` |
| **Placement** | Hero visual, directly below the headline and CTA |
| **Aspect ratio** | 21:9, safe inside centre 16:9 |
| **Purpose** | Convey movement and connection between separate systems, using architecture rather than the usual glowing network graphic. |

**Prompt**

```
A wide architectural photograph looking across a set of pale concrete walkways
and connecting bridges inside a large minimal atrium. Separate levels approach
from different directions and merge into one continuous route through the centre
of the frame. Slim steel balustrades trace the path, catching a thin silver
highlight along their top rail. Strong directional daylight enters from a high
clerestory on the left, casting long clean diagonal shadows across the deck.
No people. Surfaces are smooth board formed concrete, brushed steel and matte
grey stone. Monochrome palette of charcoal, silver and soft white with deep
shadow in the lower corners. Shot on a 24mm tilt shift lens with verticals kept
perfectly straight, f8, everything sharp. Calm, monumental, editorial
architectural photography.
```

**Composition notes**

- The convergence point belongs in the centre 16:9 so the "separate things
  joining" idea survives the phone crop.
- Verticals must stay vertical; a tilt shift look matters here.
- No glowing lines, particles or light trails. The connection is structural.

---

## 4. `digital-product-hero.webp`

| | |
|---|---|
| **Service page** | `/services/product-development` |
| **Placement** | Hero visual, directly below the headline and CTA |
| **Aspect ratio** | 21:9, safe inside centre 16:9 |
| **Purpose** | Show the journey from concept to working product. The page argues for building the smallest useful version first, so the image should show thinking and a real artefact side by side. |

**Prompt**

```
A wide overhead photograph of a product design desk, shot straight down onto a
warm grey linoleum surface. Arranged in a loose left to right progression:
loose pencil sketches of interface flows on off white paper, then a set of
printed wireframe cards with hand annotations in soft graphite, then a single
modern smartphone lying flat showing a clean abstract product screen with simple
grey shapes and no legible text. Supporting objects placed sparingly: a
mechanical pencil, a steel ruler, a small stack of grey swatch cards, a folded
grey cloth. Soft even overhead daylight with gentle shadows falling to the lower
right. Monochrome palette of charcoal, graphite, silver and soft white.
Shot on a 35mm lens at f4, flat lay, everything crisply in focus. Considered,
premium, editorial, the desk of someone mid way through solving something.
```

**Composition notes**

- Keep the full progression inside the centre 16:9; the story is the left to
  right sequence and it must not be cropped at either end.
- Phone screen stays abstract, no legible interface copy.
- Slightly imperfect and lived in beats a sterile arrangement, but keep it tidy.

---

## 5. `hosting-support-hero.webp`

| | |
|---|---|
| **Service page** | `/services/hosting-support` |
| **Placement** | Hero visual, directly below the headline and CTA |
| **Aspect ratio** | 21:9, safe inside centre 16:9 |
| **Purpose** | Convey reliability and continuity. The page is about steady care after launch, so the image should feel calm, ordered and permanent rather than dramatic. |

**Prompt**

```
A wide photograph looking down a long corridor of dark anodised equipment
cabinets in an immaculate infrastructure hall, treated as architecture rather
than as a technology cliche. The cabinets form two clean receding rows with
perfect vanishing point symmetry. Faces are matte charcoal with fine perforated
mesh, subtle horizontal seams and brushed metal handles. Illumination comes from
a continuous recessed cool white strip in the ceiling and a soft pool of light on
the polished grey floor, which returns a gentle reflection. No cables visible,
no coloured indicator lights, no signage. Monochrome palette of near black,
charcoal, metallic silver and soft white, with deep shadow at the edges of frame.
Shot on a 28mm lens at f8, one point perspective, verticals straight, everything
sharp. Serene, ordered, premium, quietly permanent.
```

**Composition notes**

- The vanishing point sits dead centre and must survive the phone crop.
- Explicitly avoid the blue server room cliche: light stays neutral white, and
  there are no green or amber status LEDs.
- Emptiness is the point. No people, no open panels, no maintenance activity.

---

## Note on the installed set

Four of the five were delivered at roughly 2.36:1, which matches the desktop
container almost exactly. `web-development-hero.webp` came in at 16:9, so on
desktop it is cropped top and bottom rather than at the sides. The subject sits
centrally enough that this reads fine, but a 21:9 regeneration would use the
full frame if you ever revisit it.

If a service is added later, generate its hero before launch rather than after.
The placeholder is a finished design in its own right, but a set where only some
pages carry photography looks half finished in a way that neither option does on
its own.
