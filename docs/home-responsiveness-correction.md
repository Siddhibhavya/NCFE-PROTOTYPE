# Home, language grid and responsiveness correction

The user's clarification supersedes the separate three-language row. English, Hindi and Odia now lead the **original two-column grid**, with the other languages shifted down in their existing order. Hindi/Odia are removed from their former positions, so there are no duplicates. At the approved 407 × 884 viewport, the first pill is x=16, y=241, width=183, matching Figma 130:4357. Existing translations, selection/confirmation and disabled behavior remain intact.

## Confirmed discrepancies corrected

- Restored the original Home header Search SVG (`5534b.svg`) and its real Topics Search route. Fresh Figma context 18:4998 contains the Search layer, even though it is obscured in that frame's static render. Its control is positioned at the source y=52.
- Separated the Financial Literacy Tip heading from its white quote surface, using the source outline, radius, color and shadow instead of merging them into one generic card.
- Corrected source Home card widths, announcement spacing, event caption alignment, date style, image inset/border/opacity, calendar geometry and video-card surfaces. The measured event card is x=12, y≈353, width=378, height=190.
- Reconnected earlier translation keys for View/View all/the event caption whose arrows are now original SVGs, and the Initiatives navigation label. All dictionary files remain unchanged. Available reading titles continue to use their original translations; translated titles also participate in search filtering.
- Centered wrapper/dialog close controls inside their existing targets. The warning X now has its own 32px width instead of inheriting the side panel's full-width button rule.
- Removed horizontal drawer overflow by fitting the original logo and menu group within the existing surface. The theme toggle aligns to the row's trailing edge on small viewports. No menu item or icon was replaced.
- Added brief button-fill/outline transitions, dialog fades and chevron rotation around its unchanged center. Main/horizontal-gallery scrolling remains native, with smooth programmatic scrolling and contained overscroll. Route restoration remains immediate to avoid scrolling through the wrong page. Reduced motion disables the new motion.

## Apple-design responsiveness review

Used [apple-design SKILL.md](C:/Users/Admin/.agents/skills/apple-design/SKILL.md) as requested. Reviewed accessibility, layout, typography, color, designing for iOS, buttons, scroll views, motion, modality and cross-platform references. This is a React web prototype: the applicable guidance is layout, input, motion and accessibility principles, not replacement with native Apple styling. Figma remains the visual authority; no SF Symbols, system font replacement, new tokens or glass treatment were introduced.

Relevant guidance applied:

- `layout.md › Visual hierarchy / Adaptability`: keep relationships clear and adapt the existing layout to available space. Restored one coherent language grid and constrained the drawer contents.
- `scroll-views.md › Best practices`: “Support default scrolling gestures and keyboard shortcuts.” Kept native scrolling and avoided adding nested vertical scroll views or scroll physics.
- `motion.md › Best practices / Providing feedback`: “Aim for brevity and precision in feedback animations.” Used 140–160ms transitions/fades and retained reduced-motion support.
- `modality.md › Best practices`: “Always give people an obvious way to dismiss a modal view.” Corrected close placement and tested its actual dismissal action.

The supplied fixed device frame is preserved. The browser review covers 320/375/407px inner viewports and 320/375/768/1024/1440px wrapper widths. It is not physical iPhone/Safari or Dynamic Type/VoiceOver certification. Approved small metadata styles and the source palette remain unchanged rather than being globally overridden by HIG defaults.

## Remaining translation limitation

Git history and all existing dictionary files contain no translations for several current Home/Search/Gallery/textbook titles. The exact missing titles are listed in [home-reading-title-gaps.json](home-reading-title-gaps.json). Examples include Financial Literacy Tip, PMJDY: Banking for everyone, How to spot investment fraud, and the later textbook/search cards. Supplied Hindi/Odia translations are still required for those strings. They remain source English; no AI translations or altered English titles were introduced. Programme/policy names retain the existing preservation rules.

## Changed files in this correction

`src/App.tsx`, `src/content/onboarding-languages.ts`, `src/features/Onboarding.tsx`, `src/features/Learning.tsx`, `src/i18n.tsx`, `src/styles/App.module.css`, `src/styles/Onboarding.module.css`, `src/styles/Learning.module.css`, `src/styles/Forms.module.css`, `tests/languages-tour.spec.ts`, `tests/localization.test.ts`, new `tests/fidelity-followup.spec.ts`, `tests/journeys.spec.ts` and `tests/tour.spec.ts` (capture animation settling), title-gap inventory, this report, the language/tour report correction and refreshed language/Home captures.

Final validation: **33 Playwright tests passed**, **7 Vitest tests passed**, TypeScript/production build, ESLint and whitespace checks passed. All three translation dictionaries remain unchanged. Screens visually compared: Home 18:4998, language selection 130:4357 and the tip's source layers below the initial Home viewport. The browser test checks real Search navigation, separate tip surfaces, measured language ordering/dimensions, small-width boundaries, close dismissal, chevron center stability and reduced motion. Earlier form routes and tour behavior remain in the regression suite. The deployed prototype was not updated.
