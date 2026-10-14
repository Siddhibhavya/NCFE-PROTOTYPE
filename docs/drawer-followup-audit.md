# Drawer and icon follow-up audit

Before editing, reviewed the existing React routes, Shell/Presentation state, shared UI/Menu components, six CSS modules, tokens, asset manifest, storage/API usage and browser captures of all 30 implemented routes. The browser audit found no page errors, missing images or horizontal content overflow. Prior completed corrections remain in place.

## Discrepancies identified before editing

- The drawer's opaque blue backdrop hides the current page. The requested translucent backdrop must retain the approved blue while keeping the page visible.
- The native modal dialog makes the original header inert, preventing a second hamburger tap from closing the drawer. The original hamburger hit area must continue to close it without adding or moving a visible control.
- The drawer opens without the requested slide transition. Reduced-motion handling already exists and must continue to apply.
- The language pill uses a Unicode dropdown character instead of the original Figma `71834.svg` asset (Hamburger frame 21:5225).
- Closing/reopening the presentation retains iframe readiness and warning state after destroying that iframe, allowing stale warnings and early commands.

## Source limitation

The approved FETP form frame 194:7099 itself uses a text `‹` glyph for Back, and Messages frame 21:5211 uses `›` in its help-link text. No corresponding original SVG is supplied in those frames. These cannot be replaced with an invented arrow while also preserving the approved design. The source needs an approved icon replacement to resolve the newer prohibition on Unicode arrows. Existing source text is retained pending that asset.

Rechecked the user-supplied Page 1 URL (`node-id=0-1`) after approval. The file is accessible. Fresh design-context responses and screenshots for FETP 194:7099 and Messages 21:5211 confirm the same text glyphs; Page 1 metadata contains no named Back/left-chevron replacement asset. Compared these source renders with the existing local screen captures. The supplied link confirms the source but does not resolve the icon conflict, so no substitute was introduced.

## Verification

Corrected the drawer backdrop using the source Primary/300 blue at 50% transparency, added a restrained 180ms slide, restored the original language chevron asset, and restored second-tap dismissal at the existing hamburger coordinates. Restored the measured 329px menu group, original row heights/spacing, 86px language pill and toggle coordinates. Original icons now render at their intrinsic sizes within their approved slots. The shared native dialog, original menu list/icons, Escape handling, outside dismissal and focus restoration remain in use. Presentation close now clears stale warning/readiness state before its iframe is destroyed.

The follow-up browser suite passed **11 tests**, including unchanged page geometry and scroll position behind the drawer, second-tap/outside/Escape dismissal, focus return, reduced motion, original SVG rendering, menu destinations, About/Impact expansions and wrapper reopening. TypeScript/production build and ESLint passed. The pre-edit browser capture pass checked all 30 routes with no missing images, horizontal overflow or page errors.

Visually compared the drawer capture at 407 × 884 with Figma 21:5225. Its backdrop intentionally follows the explicit translucent-backdrop requirement instead of the source frame's opaque blue. This comparison is not a pixel-perfect certification. The earlier full fidelity audit remains in [fidelity-audit.md](fidelity-audit.md).

Files changed in this follow-up: `src/App.tsx`, `src/Presentation.tsx`, `src/components/UI.tsx`, `src/components/Menu.tsx`, `src/content/assets.json`, `src/styles/App.module.css`, `public/assets/menu/71834.svg`, `tests/additional.spec.ts`, `docs/screenshots/audit-menu.png`, and this report. No deployment was performed.

## Supplied-file follow-up: Messages

Fresh comparison with frame 21:5211 identified oversized body text, missing Raised Surface shadows, and mismatched content spacing on Messages. Corrected these using a screen-scoped CSS class: 15px headings, 14px body/metadata, the source 13px gaps, source text/outline colors, and source two-layer shadows. As in Figma, the last two conversation cards do not receive shadows. Existing card markup, approved copy, route, static example interactions and assets remain in use; no component was replaced or content added.

Files changed: `src/features/Support.tsx`, `src/styles/Support.module.css`, `docs/screenshots/audit-findisha-messages.png`, and this report. Visually compared the refreshed 407 × 884 capture with the source screenshot. Browser checks confirmed scrolling, no horizontal overflow/page errors and navigation to Help centre. Messages has no structural Axe violations with color contrast excluded to preserve source colors. Production build, lint and whitespace checks passed. The source Back/help-link text-glyph limitation above remains; no substitute icon was invented. All changes remain local.
