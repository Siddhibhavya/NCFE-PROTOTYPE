# Language restoration and first-time guided tour

Targeted update to the existing React prototype. The earlier audit's English-only restriction is superseded by the user's explicit instruction to restore the three previously available languages. The local preview is http://127.0.0.1:5173/NCFE-PROTOTYPE/. No deployment was performed.

## Language restoration

Reviewed Git commit `a506885` and the current locale/state providers. The previous Hindi and Odia dictionaries were still present; the language availability gate and removed translation call sites caused the regression. Re-enabled `en`, `hi` and `or`, and reconnected the original translator to existing screen, menu, field, validation and feedback content. All three dictionary files are unchanged. Programme/policy names follow the existing preservation rules. No new translations were generated.

After the user clarified the intended arrangement, English, हिन्दी and ଓଡ଼ିଆ lead the original two-column grid, using its existing native fonts, 183px pill width at 407px, height, outlines, shadows and selected/unselected treatments. The remaining 21 languages retain grey, natively disabled pills and accessibility semantics. Cancellation restores the current application-language selection. The menu pill shows the selected native language.

The supplied Figma language frame (130:4357) uses two columns. The three implemented languages have been moved to the first three positions, and all other languages shift down without duplication. The mistaken separate three-column row was removed. See the [Home and responsiveness correction](home-responsiveness-correction.md).

## Guided tour

The reusable `useGuidedTour` controller and `GuidedTour` layer use stable `data-tour-id` identifiers on existing real controls. No navigation control is duplicated or replaced. The sequence is Home → Learn → Search → FL initiatives → FinDisha → hamburger → About NCFE. The original Home Search control has also been restored; the established real-control tour sequence remains intact.

Language confirmation followed by Home offers a compact introductory dialog with Start Tour and Skip. The spotlight starts only after Start Tour. Each highlighted control performs its real action; its click advances exactly once after that action. Other pointer activations, explanation-card taps and Escape are blocked during the active tour. Tab cycles between the current control and Skip. Existing native keyboard activation remains in use. Skip is always above the backdrop and preserves the current route/drawer state. A completion dialog provides Finish, then restores ordinary interaction.

Target geometry is measured from actual DOM bounds each animation frame so routes, scroll, resize and drawer motion remain synchronized. A manual top-layer popover follows the native modal drawer, keeping the real drawer and its highlighted item visible and interactive. Temporary descriptions/focus are restored when the layer closes. The layer reuses Noto Sans, existing NCFE color tokens and the existing translucent modal-backdrop tone. Its brief outline fade respects reduced motion and does not move application components. Wrapper Back/Restart/Feedback commands are ignored only during an active spotlight sequence so they cannot interrupt it or block Skip.

The first-time offer flag and step state live only in React memory. Completing/skipping does not create localStorage, sessionStorage, cookies, identifiers or onboarding history. A document reload begins a new permitted session; the offer still waits for language completion. The current Help screen has no existing guided-tour restart entry, so no permanent button or repurposed lesson link was added.

## Verification

Browser checks cover English → Hindi → Odia → English, native-language selection, grouping/dimensions, confirmation cancellation, translated content, actual primary navigation, and an E-LMS registration/confirmation/return journey in every language. Tour checks cover the first-time boundary, explicit Start, each real destination, blocking unrelated taps/cards, single advancement, keyboard focus, Skip at every step, reduced motion, resizing, actual drawer opening, completion cleanup, and wrapper interruption prevention. Existing form/input/hover/CTA/overlay/accordion/privacy checks remain in the full suite.

Final validation: **29 Playwright browser tests passed**, **6 Vitest unit tests passed**, TypeScript/production build, ESLint and whitespace checks passed. The standalone translation-coverage check intentionally remains incomplete: it reports **47 unmapped static keys**, including preserved acronyms/media labels and newer copy. Its raw inventory is recorded in [translation-gaps.json](translation-gaps.json); it is not represented as complete translation coverage. Captures include [language group](screenshots/language-restored-group.png), `language-restored-{en,hi,or}.png`, [intro](screenshots/tour-intro.png), [Home spotlight](screenshots/tour-home.png), and [drawer spotlight](screenshots/tour-drawer.png).

## Files changed in this update

- Controller and shared wiring: `src/state.tsx`, `src/App.tsx`, `src/components/UI.tsx`, `src/components/Menu.tsx`, new `src/components/GuidedTour.tsx`.
- Existing translation call sites: `src/features/Onboarding.tsx`, `Learning.tsx`, `Initiatives.tsx`, `Support.tsx`, `About.tsx`, `Impact.tsx`, `Feedback.tsx`.
- Styles: `src/styles/Onboarding.module.css`, `src/styles/Forms.module.css` (localized-title wrapping only), new `src/styles/Tour.module.css`.
- Tests: `tests/shell.spec.ts`, `tests/additional.spec.ts`, `tests/research-localization.spec.ts`, new `tests/languages-tour.spec.ts`, new `tests/tour.spec.ts`.
- Documentation/evidence: `README.md`, `docs/fidelity-audit.md`, this report, translation-gap inventory and the seven captures above. Existing browser suites also refresh their audit captures.

## Remaining discrepancies

- Previously supplied Hindi/Odia resources are draft translations. Switching and interactions were tested; linguistic approval is not claimed. Some newer approved Figma copy has no corresponding translation resource and retains its source English. The translation-coverage check reports these gaps; preserved acronyms/media-language labels also appear in its raw list. Dynamic programme/About/Impact copy may have further gaps. Enabling the requested three languages does not establish complete translation coverage.
- The newly requested tour has no supplied Hindi/Odia copy or dedicated Figma card variant. Its temporary copy is English and its compact treatment reuses the existing NCFE UI styles. No translation was invented. A supplied three-language layout/tour frame would be needed for exact frame-based visual certification.
- Physical iPhone/Safari and screen-reader testing remain unverified. Chromium browser interaction checks are the verification evidence.
- No approved backend workflow was added. Existing prototype privacy restrictions remain in effect, and the deployed URL continues to serve the earlier version.
