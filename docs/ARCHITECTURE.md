# Architecture

## Stack

- Vinext/Next-compatible file routing, React 19 and TypeScript 5 strict mode.
- Three.js 0.185.1 directly, without a renderer abstraction.
- CSS design tokens and native browser animation primitives.
- Node test runner for rendered-route smoke tests.
- Cloudflare Worker-compatible Sites build output.

Three.js is the only added production dependency. It is MIT licensed and is
used because native WebGL scene management, geometry, shader setup and cleanup
would add substantial risk without product value. A motion library is avoided;
CSS, `requestAnimationFrame`, IntersectionObserver and scroll progress are
enough.

## Boundaries

```text
app routes
  ├─ semantic content and metadata
  ├─ shared editorial components
  ├─ Worldometer counter client island
  │    ├─ one shared 200 ms clock
  │    ├─ day/year reset rules
  │    └─ reduced-motion 1 s cadence
  ├─ media-stage client islands
  │    ├─ lazy video source assignment
  │    ├─ viewport pause/resume
  │    └─ poster-only reduced-motion/save-data mode
  └─ homepage Three.js client island
       ├─ scroll progress
       ├─ accessibility/performance preferences
       └─ one shared renderer

data/world-data.ts
  ├─ typed indicators
  ├─ source registry
  └─ theme-page content

data/worldometer-data.ts
  ├─ 63 typed reference counters
  ├─ eight public-facing categories
  ├─ captured values and observed rates
  └─ plain-language explanations

data/site-media.ts
  ├─ local media registry
  ├─ accessible descriptions
  └─ per-route visual mapping
```

## Rendering strategy

- Server-render all content and navigation.
- Hydrate only menu/counter/scene behavior.
- Use a single fixed canvas for the homepage narrative.
- Render at device pixel ratio capped at 1.5.
- Reduce geometry and particles below 768 px or on low-memory devices.
- Honor `prefers-reduced-motion` with a stable scene and near-instant CSS
  transitions.
- Pause rendering when hidden or outside the narrative.
- Dispose geometries, materials and listeners on unmount.
- Load H.264 clips only when their media stage approaches the viewport.
- Keep server-rendered 1600×900 WebP posters as the universal fallback.

## Data strategy

The MVP imports typed static snapshots. Each editorial indicator includes:

- stable id and label;
- numeric value and formatted display;
- unit and reference period;
- source id and URL;
- cadence;
- status: observed, modeled, projected or derived;
- short caveat.

The Worldometer layer contains a captured value, capture time, category, unit,
reset rule and observed rate for each of the 63 homepage counters. One shared
client clock calculates the displayed value; counters that Worldometer presents
as daily or yearly totals reset at the corresponding local boundary. Static
reference cards do not pretend to move. Every card exposes Worldometer as its
reference and is explicitly labelled as a running estimate rather than measured
telemetry.

## Security and privacy

- No user accounts, database, forms, analytics or third-party embeds.
- No runtime secrets.
- External source links use safe rel attributes.
- Static content eliminates injection and SSRF surfaces.
- Canvas and runtime media are local and cannot execute remote content.
