# NCFE fidelity, functionality and privacy audit

Language availability and first-time onboarding are superseded by the [language restoration and guided-tour update](language-tour-update.md). The original English-only audit findings below describe the earlier corrective pass.

Local implementation updated in the existing React/Vite repository. The live GitHub Pages deployment has not been changed. The approved [NCFE Figma file](https://www.figma.com/design/v6zoZ7R3uvdLqziKptt9wV/NCFE) was read through its detailed screen contexts and screenshots; the simplified grey wireframes were excluded as visual references.

## 1. Files changed

| Area | Files |
| --- | --- |
| Shell and presentation | `src/App.tsx`, `src/Presentation.tsx`, `src/state.tsx` |
| Reused UI and drawer | `src/components/UI.tsx`, new `src/components/Menu.tsx` |
| Existing screens | `src/features/Onboarding.tsx`, `Learning.tsx`, `Initiatives.tsx`, `Support.tsx`, `Feedback.tsx` |
| Missing approved screens | New `src/features/About.tsx`, `src/features/Impact.tsx` |
| Source content and assets | `src/content/forms.ts`, `assets.json`; new `programme-fields.json`, `programme-cards.json`, `impact.json` |
| Existing styles | `src/styles/App.module.css`, `Onboarding.module.css`, `Learning.module.css`, `Forms.module.css`, `Support.module.css`, `Feedback.module.css` |
| Persistence adapter | `src/services/research.ts` |
| Browser and unit checks | `tests/shell.spec.ts`, `journeys.spec.ts`, `research-localization.spec.ts`, `accessibility.spec.ts`, `validation.test.ts`; new `additional.spec.ts`, `audit-helpers.ts` |
| Reproducible evidence | New `scripts/audit-capture.mjs` and 54 `docs/screenshots/audit-*.png` captures |
| Documentation | `README.md`, `docs/implementation-report.md`, `docs/wrapper-language-update.md`, this report |

New original Figma assets: `public/assets/21-5175/2fd3d.png` and `c976d.svg`; nine files in `public/assets/menu/`; seven files in `public/assets/onboarding-dark/`. The drawer identity uses the exact crop supplied by Figma. No dependencies, generic UI libraries, generated graphics, analytics providers or databases were added. One-time edit helpers were removed.

## 2. Issues identified and corrected

- The device used a different display ratio and an invented Dynamic Island. Its inner viewport is now **407 × 884**, with the source status bar, 56.46px header, 62px navigation and visible bottom indicator. The frame stays centered while scaling to smaller browser windows.
- Hindi/Odia were draft translations with English fallback. Only English is enabled. All other 23 language pills are grey, native `disabled`, `aria-disabled`, and excluded from keyboard activation. The state setter also refuses unavailable locales.
- Language was persisted in localStorage. New preference writes were removed, and the single legacy `ncfe-language` key is cleared.
- The outside panel contained permanent availability, translation and developer paragraphs. It now contains controls and at most one relevant, dismissible warning.
- Several programme pages used obsolete generic summaries. Their cards, source copy, banners and contact information now come from the current detailed Figma frames. The NFLAT banner and initiative icon mappings were corrected.
- Forms reused invented fields and a fictional-detail autofill button. Each programme now has its own approved field list and optional fields. Unapproved instructional paragraphs, fake submission screens and the autofill control were removed.
- Submission previously replaced the form with review/success pages. Confirmation and submitted states now use overlays at the source position, **y = 376** for the 884px viewport. The form remains beneath them; No preserves values, Done clears the draft and returns to the correct programme.
- Request pills are fixed above navigation. Submit remains in the form's scroll flow, has bottom clearance, and retains blue default/red hover styling. Inputs stay solid white.
- Home, Textbooks, Topics Search and Gallery had mismatched imagery, labels and spacing. Search now starts with its own approved lesson list; Home uses its approved learning card and tip. No fabricated lesson content was added for missing destinations.
- The generic menu became the approved drawer, including original icons and identity crop. About NCFE and Impact use their source content and expansion states. Impact figures are copied from Figma, not presented as newly verified live statistics.
- Fabricated chatbot responses and support-success messages were removed. Unavailable chat, contact, video, transcript, lesson, policy and event actions produce contextual warnings.
- Wrapper controls could lose an early click before the iframe listener existed. They now wait for a readiness handshake. Back dismisses an open drawer/feedback dialog; Restart clears them before returning to onboarding.

## 3. Components reused

The existing `Logo`, `Icon`, `Back`, `Page`, `Dialog`, `ActionLink`, `TopicCards`, state/locale providers, router, asset manifest, Noto font packages and CSS modules remain in use. Status/indicator elements were moved into the app shell to prevent duplicate device chrome. About and Impact compose the existing card styles and original chevrons. The drawer extends the existing native dialog and focus restoration.

## 4. Interactions tested

Chromium checks cover:

- English selection, confirmation/cancellation, disabled language pointer/keyboard behavior, and dark onboarding.
- Primary navigation, search filtering, available lesson destinations, Gallery rendering and return navigation.
- All six programme request/register journeys, their Back buttons, validation/focus, optional fields, white fills, confirmation cancellation, submitted overlays, Done destinations and draft clearing.
- Fixed header/navigation/request positions, Submit clearance, blue/red button states and reduced motion.
- Drawer keyboard dismissal/focus return; About accordions; all five Impact expansions and collapse behavior.
- Actual unavailable-action warnings, replacement without accumulation, dismissal, route clearing, feedback closing and wrapper Back/Restart.
- Feedback rating validation and the truthful unsaved result.
- Centering/overflow at browser widths **320, 375, 407, 768, 1024 and 1440**.

Fresh-browser storage/network inspection after form, password, search and chat interaction found **empty localStorage, sessionStorage, cookies and IndexedDB**, with no external requests. Form drafts are transient React state and disappear on reload. Search queries no longer enter the URL. Firebase initialization, anonymous sign-in and writes are disabled regardless of environment settings; no view tracking was added.

Validation: **20 Playwright tests**, **6 Vitest tests**, TypeScript/production build and ESLint. The capture pass checks **30 routes**, missing/undecoded images and horizontal overflow. All 389 mapped local asset files exist and are non-empty. The structural accessibility suite excludes color-contrast assertions to preserve the approved palette; it does not establish full WCAG conformance.

## 5. Screens visually compared with Figma

Captures are at 407 × 884 and are visual comparison evidence, not a pixel-perfect certification.

| Implemented screen/state | Detailed Figma frame(s) | Local evidence |
| --- | --- | --- |
| Onboarding and dark selection | 130:4357, 130:7888; confirmation 130:7817 | [Language](screenshots/audit-onboarding.png), [dark](screenshots/audit-onboarding-dark.png), [confirmation](screenshots/audit-language-confirmation.png) |
| Home | 18:4998 | [Home](screenshots/audit-home.png) |
| Textbooks / Learn | 21:5151 | [Learn](screenshots/audit-learn-textbooks.png) |
| Topics Search | 21:5137 | [Search](screenshots/audit-learn-search.png) |
| Video Gallery | 21:5240 | [Gallery](screenshots/audit-learn-videos.png) |
| Five topic pages | 284:7542, 284:7630, 284:7718, 284:7806, 21:5247 | [Money](screenshots/audit-learn-topics-money-transactions.png), [budget](screenshots/audit-learn-topics-monthly-budget.png), [banking](screenshots/audit-learn-topics-financial-inclusion.png), [insurance](screenshots/audit-learn-topics-insurance-safety-nets.png), [PMJDY](screenshots/audit-learn-topics-pmjdy.png) |
| Initiatives | 169:13383 | [Initiatives](screenshots/audit-initiatives.png) |
| NFLAT | 21:5175 | [NFLAT](screenshots/audit-initiatives-nflat.png) |
| MSSP | 21:5196 | [MSSP](screenshots/audit-initiatives-mssp.png) |
| FETP | 21:5182 | [FETP](screenshots/audit-initiatives-fetp.png) |
| FEPA | 21:5189 | [FEPA](screenshots/audit-initiatives-fepa.png) |
| FACT | 33:5842 | [FACT](screenshots/audit-initiatives-fact.png) |
| E-LMS and login | 21:5144, 194:6953 | [E-LMS](screenshots/audit-initiatives-elms.png), [login](screenshots/audit-account-login.png) |
| Six forms | 194:7099, 194:7018, 194:7261, 194:7180, 194:7342, 194:6718 | `audit-initiatives-{fetp,mssp,fepa,fact,nflat,elms}-register.png` |
| Programme overlays | 289:8084, 385:8145, 423:8047/8058, 425:8062/8073/8103/8114, 428:8172/8183 | `audit-{programme}-confirmation.png`, `audit-{programme}-submitted.png` |
| Drawer / About | 21:5225, 429:8111 and 432 accordion masters | [Drawer](screenshots/audit-menu.png), [About](screenshots/audit-about.png) |
| Impact and five expansions | 345:7739/7785/7863/7925/7979/8041 | [Impact](screenshots/audit-impact.png), `audit-impact-*.png` |
| FinDisha, Messages and Help | 200:14368, 21:5211, 21:5218 | [FinDisha](screenshots/audit-findisha.png), [Messages](screenshots/audit-findisha-messages.png), [Help](screenshots/audit-help.png) |
| Notifications | 162:6627 | [Notifications](screenshots/audit-announcements.png) |
| Feedback visual treatment | 295:16869 / Frame 224 | [Feedback](screenshots/audit-feedback.png) |
| Presentation and prior deployment | Existing wrapper; mobile proportions from approved frames | [Wrapper](screenshots/audit-wrapper.png), [deployed before](screenshots/audit-deployed-before.png) |

## 6. Remaining discrepancies and unavailable sources

- No playable videos, verified transcripts, real chat/support service, approved account backend or real registration workflow were supplied. These actions remain simulations or contextual warnings.
- The event-list/detail frames and approved Privacy Policy content are missing. Event actions stay on Home with warnings; policy selection warns rather than manufacturing content.
- Some Search/Gallery lesson cards have no corresponding approved detail frame. Their original cards remain visible; activation explains the missing destination outside the phone.
- Frame 224 is a large feedback design, without a supplied mobile-sized/submission variant. Its visual treatment is adapted to the phone; the existing Submit/Close controls remain to provide the requested feedback interaction. This is not claimed as an exact dimensional match to the large frame.
- Some source cards clip their own copy. Their source minimum heights are retained while allowing enough height for the full approved content, as requested by the no-clipping requirement.
- Only the supplied dark onboarding frame was visually compared for dark mode. Other dark screens lack complete approved counterparts; the existing theme behavior remains.
- SF Pro is platform-dependent; the status time uses it on supported Apple systems and a fallback on Windows. Physical iPhone/Safari, VoiceOver/TalkBack and full contrast review remain unverified.
- Changes are local and uncommitted; the published URL still serves the prior deployment.

## 7. Assumptions requiring approval or supplied sources

No approval is needed for the completed local corrections. Design confirmation is still needed for an exact mobile feedback/submission variant and complete dark-screen coverage. Enabling another language requires complete verified translations. Enabling real submissions or feedback storage requires an explicitly approved backend workflow satisfying the stated privacy limits. Publication was not performed.
