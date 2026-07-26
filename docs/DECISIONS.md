# Decision log

## 2026-07-26

### Dated Worldometer reference, no fragile runtime scraping

All 63 public Worldometer homepage meters are represented as a dated reference
snapshot. Counters move from the captured value only when a second visible
reading established a rate. Every card links back to Worldometer and says that
the number is a running estimate. Primary organizations remain linked for
methodology. A reviewed snapshot is more reproducible than fragile runtime
scraping while still delivering the continuous movement the product needs.

### Direct Three.js

Three.js 0.185.1 (MIT) is the only new production dependency. React Three Fiber
and a timeline library are not needed for one scene and would increase bundle
and abstraction cost.

### One world, seven states

The homepage uses one persistent world machine instead of separate heavy scene
files. Scroll progress changes the same objects, reducing loading and making
the narrative feel continuous.

### A layered media system, not a stock-video wall

The first version leaned too heavily on the homepage renderer and left the
topic routes visually sparse. Every route now receives a photographic master,
a distinct optical overlay and, where motion adds meaning, a short real-world
video. The Three.js scene remains the homepage backbone; video is a lazy-loaded
spatial layer rather than a replacement for it.

### Local-only handoff

The repository contains Sites hosting metadata and remains deployment-ready,
but no production URL is created because the user explicitly prohibited
publication without permission.

### Hyperreal photographic masters and real-world motion

The recognisably synthetic concept set was rejected and is not referenced by
the application. Seven new photorealistic masters were generated, visually
reviewed, archived at 4K and delivered as 1600×900 WebP posters. Five Pexels 4K
sources provide the runtime motion. Their short H.264 crops remain below 3 MB
and only receive a source URL near the viewport.

MagicLight is used as a premium image-to-video experiment with explicit model,
resolution, prompt and credit-cost records. A generated result is not shipped
until it is downloaded, inspected and re-encoded to the same runtime budget.

### Running estimates instead of fake live telemetry

Worldometer now provides the reference values and observed display rates for all
63 meters. The application still does not imply a sensor feed: it advances the
captured numbers locally, applies explicit day/year reset rules and leaves
non-moving facts static. The interface consistently uses the terms
“Worldometer-reference”, “lopende schatting” and “geen live meting”.

### Graceful WebGL startup

The server-rendered CSS world stays visible while the Three.js module starts.
The canvas cross-fades only after the renderer has completed its first frame.
WebGL failure, reduced motion, save-data, mobile viewports, background tabs and
off-screen scenes all receive explicit behavior.

### Dependency security

Production dependencies use exact versions. Overrides pin patched PostCSS and
Sharp releases; the production dependency audit is clean. Remaining audit
findings are nine high-severity advisories confined to development-time ESLint
tooling and its glob dependencies. npm only proposes breaking major/config
changes, so they are documented instead of force-upgraded.
