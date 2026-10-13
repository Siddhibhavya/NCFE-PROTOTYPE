> Historical Phase 1 inspection and proposed plan, recorded before the user approved implementation. For current work and approved updates, see implementation-report.md.

# NCFE prototype — Phase 1 review

Status: inspection and planning only. No application code, repository commits, Figma edits, deployment, database changes, or portfolio changes have been made.

Latest direction: use the user's existing Firebase project in place of Supabase. Project name and ID: `NCFE-redesign` / `ncfe-redesign`; project number: `739632015214`. Enabled Firebase services and web-app configuration are not yet confirmed. The supplied screenshot establishes that the desktop framework means a portfolio presentation popup with a phone frame, Restart, Back and Close controls, rather than an installable desktop application. Inspect the existing wrapper code before integrating it. These updates do not constitute implementation-plan approval.

Confirmed mobile behaviour: a directly shared link opens the NCFE prototype full screen in the browser, without a portfolio Close X. Opening through the portfolio keeps the portfolio's Close X. This distinction affects the presentation wrapper only; the NCFE app retains its own appropriate back navigation.

## Confirmed sources

- Build repository: https://github.com/Siddhibhavya/NCFE-PROTOTYPE — accessible, public, empty; default branch configured as `main`. GitHub returned “This repository is empty” when reading README.md.
- Original designs: https://www.figma.com/design/v6zoZ7R3uvdLqziKptt9wV/NCFE?node-id=0-1
- Case-study comparison: https://www.figma.com/design/v6zoZ7R3uvdLqziKptt9wV/NCFE?node-id=299-7765
- Structural wireframe reference: https://www.figma.com/design/v6zoZ7R3uvdLqziKptt9wV/NCFE?node-id=313-7739
- Portfolio URL could not be opened through the web reader. Portfolio integration is documentation only until separately approved.

Figma has three pages: Page 1 (originals), CASE STUDY EXPORT · NCFE Core Journeys, and WIREFRAMES · NCFE Core Journeys. Original Page 1 has duplicate simplified screen groups. Use the detailed original screens and named master components, with case-study comparison. Node numbers alone do not establish recency. The current original onboarding already has the circular logo beside the institution name, matching the case-study version. Wireframes provide structure only.

Screenshots reviewed: original onboarding, Home, FETP registration, E-LMS registration, Help, Frame 224, case-study onboarding group, and corresponding wireframe group. Detailed property inspection also covered selected language tiles, invalid field, confirmation dialog, topic content, local styles, variables, and component masters. This is a source inspection, not a rendered prototype comparison or accessibility certification.

## Screen inventory

Node IDs below identify original Page 1 screens unless stated otherwise. Routes are proposals, not existing application routes.

| Area | Verified Figma screens | Proposed route / behaviour |
| --- | --- | --- |
| Identity | `154:6651` — NCFE identity / Before onboarding | Optional initial identity view; academic prototype notice must be present before data collection |
| Onboarding | `111:7492` — Onboarding; `130:4357` — Choose language | `/onboarding`; retain current logo/name arrangement and card styling |
| Language states | `130:4395` English; `130:4983` Hindi; `130:5739` Odia; additional regional language variants exist | Stateful selection, initially English/Hindi/Odia; future languages through locale registry |
| Language confirmation | `19:5053` — Onboarding POPUP; `130:7817` — Confirm language | Modal: confirm commits language and opens Home; cancel closes modal with selection retained |
| Home | `18:4998` | `/home`; announcements, events, videos and learning sections |
| Notifications | `162:6627` — All announcements | `/announcements`; valid destination for header bell and announcement links |
| Textbooks | `21:5151` | `/learn/textbooks`; destination of Learn navigation |
| Topics search | `21:5137` | `/learn/search`; destination of header search; preserve query and results on return |
| Video gallery | `21:5240` | `/learn/videos` |
| PMJDY topic | `21:5247` — Video & Topics | `/learn/topics/pmjdy`; shared topic model |
| Money topic | `284:7542` — Managing transactions | `/learn/topics/money-transactions` |
| Planning topic | `284:7630` — Make a monthly budget | `/learn/topics/monthly-budget` |
| Banking topic | `284:7718` — Financial inclusion | `/learn/topics/financial-inclusion` |
| Insurance topic | `284:7806` — Safety nets | `/learn/topics/insurance-safety-nets` |
| Initiatives | `169:13383` detailed listing; `19:5039` landing version | `/initiatives`; each programme has a valid destination |
| Programme details | MSSP `21:5196`; FETP `21:5182`; FEPA `21:5189`; FACT `33:5842`; NFLAT `21:5175`; E-LMS `21:5144` | `/initiatives/:programmeId`; shared renderer with programme-specific content and assets |
| FETP registration | `194:7099` — Teacher registration | `/initiatives/fetp/register`; fully functional fictional-data journey |
| E-LMS registration | `194:6718` — Register (single scroll) | `/initiatives/elms/register`; use visible single-scroll design; preserve draft into review |
| Other demonstration forms | MSSP `194:7018`; FACT `194:7180`; FEPA `194:7261`; NFLAT `194:7342` | Corresponding programme registration/request routes, explicitly labelled demonstrations |
| Review and confirmation | `194:7500` — Registration Review; `289:8084` — Confirm submission | Review route per journey; Submit/Cancel modal; preserve drafts on cancellation and back |
| Account demonstrations | `194:6953` — E-LMS Log In; `197:7488` — OTP verification | Simulated only if needed for linked journeys; no real account creation or OTP delivery |
| FinDisha | `200:14368` detailed ASK DISHA version; `94:3593` landing version | `/findisha`; labelled conversation demonstrations |
| Messages | `21:5211` | `/findisha/messages`; local simulated history |
| Help | `21:5218` | `/help`; non-voice chat/email support demonstrations |
| Menu | `21:5225`, `248:15325` | Existing menu appearance; wire visible links to useful destinations or labelled demos |
| Feedback | `295:16869` — Frame 224 | Shared responsive modal; preserve stars, cream surface, yellow border, dropdown, comment box and close icon |

Hidden E-LMS screens `194:6795` and `194:6876` are older step variants, not the proposed source for the visible single-scroll registration journey. Dark-mode source assets and onboarding variant `130:7888` exist; the menu also contains a theme toggle. The visible theme control needs a functional, token-based response if retained.

Requested but not identified as dedicated final screens: study mode selection, consent, guided task prompts, task outcome/difficulty form, study completion, withdrawal, feedback success/error state, registration success, and a transcript-open state. Use existing components for these additions after approval; do not imply they were already designed in Figma. Support response scripts, translations, media provenance and transcripts still need a content audit.

## Component inventory and extracted tokens

The original component board contains 164 component/component-set nodes, including variants and icon masters. This is a Figma node count, not a proposed React component count. There are 77 local variables and both light/dark component boards.

| Reusable implementation family | Existing Figma source |
| --- | --- |
| Shell / header / navigation | App bar icons, Navigation panel / Mobile, Navigation bar / Mobile and Desktop, Module header, Tab item, Layout masters |
| Identity and icons | Original NCFE image/mask; Icon masters for Home, Search, Book, Initiatives, ChatBot, Register, Log in, Send message, Message log, Help desk, Play, Language, Notification, Menu |
| Cards and sections | Box / Card, Section panel, Icon tile, Form card; announcement, event, programme and topic cards from screens |
| Language selection | Language tile `88:3296`, Default and Selected variants; compact language dropdown |
| Form controls | Form / Labelled input, Form / Primary action, Field / Invalid `289:8113`; registration and login form masters; message input focus/size variants |
| Dialogs | Existing onboarding confirmation and Registration Confirm submission `289:8084`, with 358 × 161px mobile panel and 12px radius |
| Learning | Video box / Mobile, Video player / Ready, details, Read Transcript control; topic page layout |
| FinDisha / Help | Message composer, active conversation, Chat bubble, Message thread, Message log, Help row, Help card, Help desk |
| Feedback | Frame 224 rating stars, screen/category dropdown, textarea and close icon |
| New research components | Consent, task runner, difficulty control, completion and withdrawal; compose from existing primitives following approval |

Do not export simulated phone status bars, phone bezels or home indicators into the web application unless specifically requested. Native browser/device chrome provides those functions. Preserve the application header and fixed bottom navigation.

| Token / measurement | Verified value |
| --- | --- |
| Primary | `#1976D2` |
| Primary dark / selected language | `#1565C0`; selected tile text white |
| Frame background | `#E3F2FD` |
| Card background | `#FFFFFF` |
| Outline | `#90CAF9` in current onboarding screen |
| Secondary | `#613AF5` |
| Error, light mode | `#D32F2F` |
| Main / secondary text | `#212121` / `#757575` |
| Divider / surface | `#E0E0E0` / `#F5F5F5` |
| Body font | Noto Sans; preserve actual script-specific fonts from original tiles |
| Hindi / Odia native label fonts | Noto Sans Devanagari / Anek Odia |
| Current onboarding title | Noto Sans Medium, 34px / 42px |
| Common body and labels | 16px / 24px; 14px / 20–22px depending on source component |
| Header | 56.46px, verified in source layers |
| Mobile navigation | 62px in source master |
| Original mobile canvas | 407 × 884px; Video Gallery original is 407 × 867px |
| Language tile | 183 × 66px, 12px radius; two-column grid, 12px horizontal and 8px vertical gap |
| Current onboarding gutters | Approximately 15–16px; retain source-specific spacing rather than normalising every screen |
| Spacing board | 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64px |
| Invalid form control | 367 × 47px input, 9px radius; error text below input |

The illustrative Typescales board also lists a 1.25 scale with a 16px base. Actual screen properties and bound component styles take precedence over that illustrative scale. Frame 224 uses its own cream/yellow/star colours; preserve those rather than recolouring it blue to match the main application. Extract its exact border/star values and export assets during the approved implementation phase.

## Proposed architecture

Stack: React, TypeScript, Vite, React Router, CSS Modules, Firebase, Vitest, Playwright. Proposed Firebase services: Authentication with anonymous sign-in and Cloud Firestore, subject to the user's existing project configuration. No Tailwind dependency. Use CSS custom properties for extracted Figma tokens and semantic HTML for interactive controls. Desktop framework compatibility remains to be inspected.

```text
src/
  app/                 router, providers, shell, route focus and scroll restoration
  components/          buttons, icons, fields, cards, dialogs, navigation
  features/
    onboarding/        language selection and confirmation
    home/              home and announcements
    learning/          textbooks, search, gallery, shared topic pages
    initiatives/       programme details, registration, review
    findisha/          simulated conversations, messages, help, menu
    feedback/          Frame 224 interface and submission
    study/             consent, task runner, task outcomes, withdrawal
  content/             topic and programme registries, provenance, fixtures
  locales/             en, hi, or; reviewed UI copy, language registry
  state/               preference, navigation, demo drafts and study reducers
  services/            Firebase client and research submission adapter
  styles/              extracted tokens, fonts and minimal global styles
  assets/              downloaded original icons, logos, illustrations and posters
firebase/
  rules/               Firestore ownership, consent and field-validation rules
  tests/               Emulator Suite security-rule tests
  functions/           controlled aggregation and withdrawal if needed
tests/
  unit/                validation, task transitions, shared content, state
  e2e/                 full user journeys and viewport checks
docs/                  source inventory, privacy, study protocol, manual accessibility
.github/workflows/     CI and GitHub Pages deployment
```

Use HashRouter for reliable static-host deep links, with Vite base `/NCFE-PROTOTYPE/`. Target deployment URL is `https://siddhibhavya.github.io/NCFE-PROTOTYPE/`, subject to Pages being enabled. Proposed route example: `/NCFE-PROTOTYPE/#/learn/textbooks`. Vite's deployment guidance documents repository-base configuration: https://vite.dev/guide/static-deploy.html

Shell: one original NCFE logo, fixed 56.46px header, fixed bottom navigation, scrolling content with correct top/bottom offsets and device safe-area insets. Preserve existing desktop components where appropriate. Inspect the existing portfolio popup source before deciding wrapper integration. Retain the four primary destinations and do not substitute a new navigation pattern without approval. At increased text scale, wrapping content and usable controls take precedence over clipping; flag any unavoidable header adjustment for review. GitHub Pages remains the requested web hosting target.

Presentation modes:

- Direct mobile link: app fills the available browser viewport; no portfolio Close X or decorative phone frame.
- Portfolio mobile popup: existing portfolio Close X remains available outside the NCFE app.
- Desktop presentation: show the NCFE app inside the existing-style phone frame with Restart, Back and Close, as illustrated by the user's screenshot. Do not copy the unrelated app shown within that screenshot or recolour the NCFE app to match its wrapper. Direct desktop links should support this framed presentation as well, using the separate prototype repository's wrapper; exact Close destination outside the portfolio remains to be resolved.
- The underlying app remains responsive at all requested widths; the desktop demonstration frame is a presentation layer, not the app's only supported layout.
- A static device bezel, if used, belongs to the desktop wrapper; it must not be duplicated inside the app. The earlier exclusion of simulated phone chrome from app screens still applies.
- Wrapper Back operates on the prototype's internal navigation. Restart resets local demo progress and returns to onboarding; it must not silently delete submitted research data or withdraw consent. Close dismisses the portfolio popup and restores focus to its launch control when embedded. An independently opened desktop presentation needs an explicit fallback destination rather than assuming window.close works.
- Implement wrapper integration through explicit embedding parameters or a validated postMessage contract if required. Do not rely on top-level versus iframe detection alone to hide controls. If cross-window messages are used, validate exact origin and source window, and avoid sending participant data through them.
- Prepare standalone wrapper code and portfolio integration instructions in NCFE-PROTOTYPE. Do not change the portfolio repository without separate approval.

State: confirmed language persists locally; pending language is separate so Cancel does not commit it. Queries, scroll positions, topic origin and form values survive navigation. Use safe return destinations for direct links and browser history for normal navigation. Keep fictional form drafts in session state; password demonstration values stay in memory. Do not transmit registration fields or conversation inputs to the research database.

Content: one topic registry serves Textbooks, Search and Video Gallery. Each topic has source references, title, text, poster, media availability and transcript status. Missing videos/transcripts must be labelled unavailable prototype content; fabricated official videos, durations, captions, benefits or translations are unacceptable. Reuse the supplied original content as prototype copy with provenance; verify financial claims before treating them as current educational guidance. Locale `or` is used for Odia. Set document language on confirmation/change and mark English fallback passages with `lang="en"`.

Accessibility: semantic controls; real labels; required indicators; error text linked through aria-describedby and aria-invalid; focus moved to the first invalid input or error summary; accessible rating radio group; dialog focus containment, Escape and focus restoration; reduced motion; screen reader announcements for submission state; route focus management. Design fidelity and accessibility conflicts are documented, not silently redesigned. WCAG reference: https://www.w3.org/WAI/WCAG22/quickref/

## Research data and privacy proposal

Allow browsing with no research consent. Ask separately before transmitting study responses or general feedback. Proposed: create a pseudonymous Firebase anonymous-auth session only after consent; the participant does not need an email or login form. Anonymous sign-in must be enabled in the user's project: https://firebase.google.com/docs/auth/web/anonymous-auth

Proposed Firestore collections:

- `study_sessions`: anonymous session ID, owner auth ID, study version, consent version/time, selected language, independent/facilitated mode, started/completed status and timestamps.
- `task_results`: session ID, task ID, completed/not-completed/skipped outcome, difficulty (proposed 1–5 scale), optional feedback, timestamp. Unique session/task/version rules prevent duplicate counting.
- `feedback_submissions`: consenting session, prototype rating, category, comment language, optional comment, timestamp; distinguish general feedback from task feedback.

Store only research fields. No names, phone numbers, email addresses, passwords, identity documents, banking details or chat bodies from demonstration journeys. Warn beside free-text fields to avoid personal/financial information. Infrastructure logs may still contain technical metadata; do not promise absolute anonymity.

Use deny-by-default Firestore Security Rules. Verify ownership with request.auth.uid, including parent-session ownership and active consent on task/feedback writes; a client-supplied UUID alone does not authorize access. Validate permitted fields, types, enum values, comment lengths and immutable ownership. No unauthenticated reads of participant documents, no access to another participant's session, no public raw-data queries. Firebase web configuration is client configuration, not an authorization boundary; private service-account credentials and Admin SDK access remain server-side. Test cross-session read/write/delete denial and consent enforcement in the Emulator Suite. Firebase rules guidance: https://firebase.google.com/docs/firestore/security/rules-conditions

Withdrawal: an owner-scoped action stops collection and explicitly deletes the session and every dependent response before clearing local study state. Firestore parent-document deletion must not be treated as deleting subcollections. Use a tested bounded batch or trusted deletion function as appropriate. Explain that recovering a session after browser storage is cleared needs a separate withdrawal code mechanism. Retention duration and study contact information require the researcher's decision before live collection. Use idempotent submission IDs; show a truthful retry/error state, and do not claim that failed writes were submitted. Do not enable persistent offline caching of research comments by default.

Study tasks:

1. Select preferred language — confirmed selection.
2. Find information about bank accounts — relevant banking/PMJDY content plus participant outcome report.
3. Find FETP and begin registration — correct programme registration destination, no actual submission required.
4. Locate non-voice support — chat or email support destination.

Each task supports completion, not completed, or skip; optional difficulty and comments. Record navigation evidence separately from participant-reported outcome so opening a page is not automatically a successful task. A completed usability test means an explicitly finalised consented study with all task outcomes recorded (including skips), not a visit or test start. Report successful tasks and skipped tasks separately; publish rate denominators and exclude incomplete study sessions from final-study metrics by default.

Future portfolio integration: provide a separate aggregate-only endpoint/export with reviewed findings, completed test counts, completion rates, study version and reporting period. Suppress small subgroup outputs and never expose comments/raw responses publicly. Visits, started studies and general feedback remain separate measures. Do not alter the portfolio in this project.

## Development plan and phase gates

Use short-lived branches in NCFE-PROTOTYPE, such as `feat/shell`, `feat/learning`, `feat/registrations`, `feat/findisha`, `feat/feedback`, `feat/study-data`. Once the plan is approved, create the initial main baseline because the repository currently has no commits, then develop via feature branches. Keep credentials and responses out of git and CI artifacts.

| Phase | Work | Acceptance evidence |
| --- | --- | --- |
| 1 | Review this inventory, source choices, tokens, architecture and additions | User approves plan and design exceptions before coding |
| 2 | Vite/React/TS setup, tokens/assets, shell, routes, fixed navigation, state restoration | Shell screenshots, original-header comparison, navigation/back checks |
| 3 | Language states/dialog, Home, Textbooks/Search/Gallery, five shared topics | Onboarding cancel/confirm tests, query preservation, correct shared content and assets |
| 4 | Six programme details, FETP and visible single-scroll E-LMS forms, review/confirmation; other labelled forms | Invalid field/error tests, draft preservation, Cancel/Back, fictional-only submission |
| 5 | FinDisha, Messages, Help and menu | Simulated responses labelled, usable chat/email options, keyboard and screen-reader review |
| 6 | Responsive Frame 224 feedback plus approved language/Submit additions and triggers | Rating/dropdown/comment/close/submission tests; mobile/desktop Figma comparison |
| 7 | Consent, independent/facilitated task runner, Firebase collections/rules, secure writes, withdrawal | Task skip/completion/difficulty tests, consent refusal, isolated-session security-rule tests, retry and withdrawal evidence |
| 8 | GitHub Actions and Pages deployment in this repository | CI passes, base-path/assets/deep links work, live smoke tests; no portfolio deployment changes |
| 9 | Full technical and manual accessibility review; README and portfolio integration instructions | Results and unresolved findings, actual device testing documented, no unsupported compliance claim |

Checks run throughout development, before any deployment, and again where live-host behaviour differs. Lint, TypeScript, build, Vitest and Playwright are required; Firebase security-rule tests are also necessary for research collection. Do not postpone accessibility fixes until Phase 9.

Test widths: 320, 375, 390, 430, 768, 1024, 1440px. At each implemented phase provide representative screenshots, a comparison against specific Figma nodes, completed behaviour, checks run and unresolved issues. Use source-sized comparison at 407px where helpful, alongside the required widths. Verify no unintended horizontal page scrolling, content behind fixed bars, clipped error text or lost focus. Playwright coverage includes onboarding, confirmation, all primary destinations, header search, shared topics, both representative forms, validation, input preservation, feedback, Back, consent, tasks, skip and withdrawal. Mock services for deterministic UI tests and use Firebase emulators for security-rule verification, with an isolated project for live integration tests.

Manual accessibility documentation covers keyboard-only operation, zoom/text scaling, contrast, focus visibility/order, dialog announcements and validation. TalkBack on Android and VoiceOver on iOS/macOS require actual devices or an appropriate available environment; automated tests cannot establish that these work. Record tester, device/browser versions, steps, outcomes and remaining findings.

## Decisions needing review

1. Approve the architecture, phase plan and specific original-screen sources. Do not choose simplified duplicate frames just because their IDs are higher.
2. Approve adding the required language dropdown and Submit action to Frame 224 using its current visual styling. The inspected frame does not contain these controls. The exact circular mobile / blue desktop Feedback trigger components were not located in the inspected page; provide their source node if one exists, otherwise approve minimal triggers using existing components.
3. Provide the existing portfolio popup wrapper's repository/file or local folder so it can be inspected. The desired phone frame with Restart/Back/Close is established by the supplied screenshot. Confirm the Close destination for independently shared desktop links. Direct mobile links without the portfolio Close X are already confirmed. Approve any necessary visual changes after source inspection. No unrelated visual redesign.
4. Approve minimal new consent, task, difficulty, completion and withdrawal screens composed from existing components, plus a persistent academic-prototype notice. Proposed wording: “Independent academic prototype. Not an official NCFE application.”
5. Confirm how unreviewed Hindi/Odia educational content should appear. Recommended: localised reviewed interface copy with clearly identified English educational fallback until human-reviewed translations are supplied. Language selection alone must not imply the financial content has been translated.
6. Resolve accessibility conflicts through existing higher-contrast tokens. A token-level calculation gives #757575 on #E3F2FD approximately 4.03:1, below the 4.5:1 target for normal text. Some language descriptions use disabled-opacity text even though they describe available choices. Request approval for narrowly scoped contrast corrections; this is not a full accessibility audit.
7. Before Phase 7, confirm enabled services and a test environment for Firebase project `ncfe-redesign`; approve retention period, consent/privacy wording, study contact and withdrawal recovery approach. The project ID and number identify the project but do not provide its registered web-app configuration or establish connection access. Do not share private keys or service-account credentials in chat. These choices need not block earlier shell and local-demo phases once the implementation plan is approved and desktop wrapper compatibility is understood.

The visible single-scroll E-LMS form is the proposed baseline; hidden old multi-step variants are excluded. Existing Help text implies live availability and response times, and Home has dated announcements. Keep these clearly identified as supplied demonstration copy; do not imply operational official services or verified current announcements.
