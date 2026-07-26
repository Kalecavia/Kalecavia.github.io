# Quality assurance

Validated on 26 July 2026.

## Automated

- Prettier formatting check.
- ESLint static analysis.
- TypeScript `--noEmit` typecheck.
- Vinext production build.
- Seven Node tests for all nine rendered routes, exactly 63 Worldometer
  reference counters, plain-language explanations, internal links, metadata,
  source URLs, documentation, route-level media markup and optimized media
  budgets.
- Production dependency audit returned zero production vulnerabilities before
  the final browser pass. A final repeat was blocked by the restricted npm audit
  endpoint; the only dependency added afterwards is development-only
  `ffmpeg-static`.

## Browser

- Chrome desktop at 1440×1000: homepage, `/wereldmeters` and
  `/energie-en-uitstoot` inspected with their media treatments.
- `/wereldmeters` rendered 63 counter cards in eight categories, 63 source links,
  63 short explanations and 63 context notes. A sampled counter changed from
  `8.306.966.790` to `8.306.966.792` within 700 ms.
- The selected Google Flow Pro delivery file loaded and reached `canplay` as
  `/media/world-rich/world-orbit-flow.mp4`.
- Chrome mobile at 390×844: hero, horizontally scrollable sticky category
  navigation and one-column counter cards inspected; no horizontal page
  overflow.
- Chrome mobile navigation opened and exposed all eight destinations, including
  the new `Live meters` route.
- All routes expose one `main`, one `h1`, Dutch document language and a skip
  link; interactive controls have accessible names and IDs are unique.
- Keyboard order begins with the skip link and proceeds through the primary
  navigation.
- Browser console contains no application errors in the standard desktop and
  mobile flows. Logged warnings originate from the installed MetaMask extension,
  not from World Pulse.

## Explicit fallbacks

- WebGL disabled: the CSS world remains visible and the scene reports
  `HTML FALLBACK`.
- Reduced motion: the browser environment reported its normal motion preference;
  the fallback contract was verified in the client components and stylesheet.
  It freezes decorative animation, keeps video on its poster, disables smooth
  scrolling and makes the scene report `STABLE MODE`.
- Data Saver/mobile: scene density and pixel ratio are reduced; media stages
  keep their poster when `Save-Data` is enabled.
- Hidden or off-screen: animation work is paused and resumed safely.
- Video source URLs are assigned only near the viewport and removed on unmount.
