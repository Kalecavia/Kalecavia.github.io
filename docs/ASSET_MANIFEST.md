# Asset and shot manifest

## Media direction

World Pulse combines three layers:

1. one realtime Three.js world machine on the homepage;
2. hyperrealistic 4K photographic masters for every editorial route;
3. short, real-world video loops that are treated as spatial planes rather
   than full-screen stock backgrounds.

The earlier surreal concept set in `assets/generated/world-rich/` was rejected
because it looked recognisably synthetic. Those files are retained as process
evidence but are not referenced by the application.

## Route shot matrix

| Route                              | Photographic master      | Motion layer              | Visual treatment                           |
| ---------------------------------- | ------------------------ | ------------------------- | ------------------------------------------ |
| `/`, `/wereldmeters` and `/wereld` | Earth from low orbit     | Google Flow orbital clip  | Orbital reticle, depth plane and scan line |
| `/bevolking`                       | Metropolitan aerial      | Pexels night-city aerial  | Perspective grid and density field         |
| `/voedsel-en-water`                | Irrigated valley at dawn | Pexels agricultural drone | Flow contour and water reticle             |
| `/energie-en-uitstoot`             | Wind and solar landscape | Pexels renewable field    | Diamond grid and emission pulse            |
| `/gezondheid`                      | Community clinic         | Pexels clinic documentary | Human reticle and warm optical grade       |
| `/bronnen`                         | Research archive         | Still image               | Evidence-room scan and source spectrum     |
| `/over-de-site`                    | Data-story studio        | Still image               | Studio grid and system glyphs              |

Every route also contains CSS-native microvisuals. Metric cards use six
different signal grammars, editorial chapters use separate diagrams and source
rows use individual data signatures.

## Hyperrealistic photo masters

Seven 1672×937 photographic source renders were generated with GPT Image from
prompts that explicitly required natural optics, documentary lighting,
plausible infrastructure, no text and no fantasy geometry. They were visually
reviewed and then cropped/upscaled with Lanczos resampling.

- Source masters: `assets/generated/world-photo/*.png`
- 4K archive masters: `assets/processed/world-photo-4k/*-master-4k.jpg`
- Browser delivery: `public/media/world-rich/*-poster.webp`
- Delivery dimensions: 1600×900
- Poster budget: below 350 KB each

The application serves the already-optimised WebP files directly. Vinext image
optimisation is deliberately bypassed because the worker image binding is not
available in local development.

## Real-world video sources

The motion layer uses free-to-use Pexels footage. The original 4K downloads
remain in `assets/source-video/`; the application uses short H.264 delivery
clips.

| Delivery file         | Source page                                                                                                                                | Creator         | Runtime size |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------- | -----------: |
| `world-orbit.mp4`     | [Aerial 4K view of Earth from space](https://www.pexels.com/video/aerial-4k-view-of-earth-from-space-30683870/)                            | Zelch Csaba     |    190,998 B |
| `population-city.mp4` | [Aerial view of illuminated city at night](https://www.pexels.com/video/aerial-view-of-illuminated-city-at-night-31404084/)                | Alex Sanchez    |    924,223 B |
| `food-water.mp4`      | [Drone shot of fields in countryside](https://www.pexels.com/video/drone-shot-of-fields-in-countryside-9985873/)                           | Lê Cuộc         |  2,561,023 B |
| `energy-grid.mp4`     | [Wind turbines and solar panels landscape](https://www.pexels.com/video/aerial-view-of-wind-turbines-and-solar-panels-landscape-32939598/) | Jakub Zerdzicki |    751,027 B |
| `health-human.mp4`    | [Community health workers in a clinic](https://www.pexels.com/video/community-health-workers-in-a-clinic-setting-35923202/)                | Andy Coffie     |    917,362 B |

Delivery encoding:

- 1280×720, 24 fps;
- H.264 High Profile, CRF 27, slow preset;
- muted, no audio track;
- fast-start metadata;
- seven or eight second loop;
- maximum delivery budget: 3 MB.

`scripts/process-media.py` reproducibly creates both poster and video delivery
files from their masters.

## MagicLight Pro workflow

MagicLight was used through the authenticated Chrome session at the user's
request.

- Model: Seedance 2.0 standard
- Resolution: 4K
- Duration: 5 seconds
- Input: hyperrealistic irrigation-valley photo master
- Displayed cost: 1,760 credits
- Prompt record: `docs/prompts/WORLD_PULSE_VIDEO.md`
- Job state at implementation time: submitted and generating

An earlier orbital test used Seedance 2.0 Fast at 720p and charged 1,408
credits. That test did not produce a downloadable file in the inspected job
view and is therefore not referenced by the application.

No credits were purchased by the agent and nothing was published.

## Google Flow Pro workflow

A second image-to-video pass uses the exact 4K Earth master as its visual
reference. The prompt preserves continent geometry, cloud structure, city
lights and natural low-orbit optics while adding only slow camera drift,
restrained atmospheric shimmer and physically plausible cloud motion.

- Output request: two 8-second 16:9 video variations
- Reference: `assets/generated/world-photo/world-orbit-photo-master.png`
- Prompt constraints: no text, interface, fantasy objects, satellites,
  morphing, warping or flicker
- Selected master:
  `assets/source-video/world-orbit-flow-20260726.mp4` (1280×720, 24 fps)
- Browser delivery:
  `public/media/world-rich/world-orbit-flow.mp4` (audio removed, video
  losslessly remuxed, fast-start enabled)
- Visual review: both variations were played; the selected variation retained
  the strongest night-side contrast, stable geography and restrained drift

The selected Flow result is shipped on the homepage, `/wereldmeters` and
`/wereld`. The original Pexels orbital clip remains in the repository as a
fallback asset. No credits were purchased and nothing was published.

## Runtime behaviour

- Videos receive no source URL until their stage approaches the viewport.
- An `IntersectionObserver` pauses video outside the viewport.
- `prefers-reduced-motion` and `Save-Data` keep the photographic poster.
- Essential content and alt text remain server-rendered.
- A failed autoplay attempt leaves the poster visible.
- The homepage still uses one Three.js renderer and disposes GPU resources.

## Social preview

- Master: `assets/generated/world-pulse-social-master.png`
- Delivery: `public/media/world-pulse-social.webp`
- Delivery dimensions: 1200×630
- Delivery size: 99,720 bytes
- Prompt record: `docs/prompts/WORLD_PULSE_SOCIAL.md`
