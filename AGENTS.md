# World Pulse project guide

## Product

World Pulse is a Dutch editorial data experience about connected global
systems. It is not a live-data service and must never present modeled counters
as measured real-time telemetry.

## Engineering conventions

- Keep TypeScript strict and prefer server components by default.
- Isolate browser-only rendering in explicitly marked client components.
- Keep source facts in `data/world-data.ts`; do not hardcode statistics in UI.
- Every indicator needs a source, reference year, unit, update cadence and
  methodology note.
- Essential content must remain readable without JavaScript, WebGL or motion.
- Respect `prefers-reduced-motion`; never require animation to understand data.
- Use one Three.js renderer and dispose GPU resources, listeners and observers.
- Avoid new production dependencies unless the feature cannot be implemented
  responsibly with the current stack.
- Do not add analytics, trackers, external embeds or secrets.

## Validation

Before handing off, run:

```bash
npm run lint
npx tsc --noEmit
npm run test
```

Perform browser QA at mobile and wide-desktop sizes, including reduced-motion
and no-WebGL fallbacks.
