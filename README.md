# NCFE-redesign usability prototype

Current fidelity/privacy audit: [audit report](docs/fidelity-audit.md). English, Hindi and Odia are enabled using the preserved translation resources; see the [language and guided-tour update](docs/language-tour-update.md) for tested behavior and remaining resource gaps. A transient guided tour is offered after first language confirmation, with no onboarding history stored. All six programme forms use source-specific fields and confirmation overlays. Registration, search and chat content remain in memory. The separate Firebase data collection configuration is documented in the [collection setup](docs/firebase-data-collection.md). The device viewport is 407 × 884, with a clean wrapper and contextual warnings. The older implementation notes below are superseded by the audit report.

Independent academic UX redesign. **This is not an official NCFE application.**

Built from the [original Figma design](https://www.figma.com/design/v6zoZ7R3uvdLqziKptt9wV/NCFE?node-id=0-1), compared with its case-study export and structural wireframes. The portfolio repository is not modified.

## Run locally

Use Node.js 24 or later.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open the URL printed by Vite. Desktop opens the cream/blue popup with a phone frame, Restart, Back, Close and Feedback. A directly shared phone link opens full screen without a portfolio Close X. `?view=app#/home` opens the responsive application without the presentation frame.

## Functional journeys

- English, Hindi and Odia selection with confirmation/cancellation. Hindi and Odia translations are labelled drafts for usability testing. Programme and policy names remain unchanged. Original image text remains as supplied; translations require native-speaker review before claims of accuracy.
- Home, Textbooks, multilingual Topics Search, Video Gallery and five shared topic pages. Video and transcript sections explicitly label unavailable source media; there are no fabricated official videos.
- MSSP, FETP, FEPA, FACT, NFLAT and E-LMS destinations. FETP and E-LMS controlled registration forms preserve in-memory drafts through review, edit, cancellation and simulated submission. Other forms are labelled demonstrations. Use the fictional test-detail button.
- FinDisha conversation demonstrations, messages log, Help, non-voice chat/email and other support placeholders. No actual support contact or financial advice.
- Frame 224 feedback form: original stars, cream background, yellow border and close icon; category, language, optional comment, rating and submit.
- Four guided tasks with independent/facilitated mode, outcomes, difficulty, comments and skips. Tasks are participant-reported, not automatically scored.

## Firebase collection

When enabled, the production build records aggregate daily page-view totals and saves feedback only after the user submits it. Registration details, search terms, chat text, and study-task responses are not sent. Anonymous Firebase Authentication protects writes; its browser-linked ID is not copied into the traffic or feedback records. No analytics provider is used. See [collection setup](docs/firebase-data-collection.md) and [Firebase security](docs/firebase-security.md).

Keep the web-app configuration in ignored `.env.local` and GitHub repository secrets. `VITE_` values are visible in the deployed browser code; Firebase web keys are public identifiers, not private database credentials. Never add Admin SDK service-account keys.

The collection flag defaults off. It will be enabled in the Pages build only after the Firestore database is created, the rules are deployed, and Anonymous Authentication is ready. The separate study-task workflow remains disabled.

## Architecture

| Directory | Purpose |
| --- | --- |
| `src/components` | Original logo/icons, page shell, navigation/back and native dialogs |
| `src/features` | Onboarding, learning, initiatives, support, feedback and guided study |
| `src/content` | Figma content, local original asset references and draft translation catalogues |
| `src/state.tsx` | Language preference, temporary registration drafts and messages |
| `src/i18n.tsx` | Locale provider, shared translations and protected names |
| `src/services` | Optional anonymous research storage and private aggregate calculations |
| `src/styles` | Figma tokens and CSS Modules |
| `public/assets` | Downloaded original Figma imagery and SVG icons |
| `tests` | Validation, translations, metrics, browser journeys, accessibility and Firestore rules |

React + TypeScript + Vite + React Router + CSS Modules + Firebase + Vitest + Playwright. Hash routing supports GitHub Pages deep links. No portfolio repository dependencies. Development uses short-lived feature branches.

## Validation

```sh
npm run check:secrets
npm run lint
npm run typecheck
npm run build
npm run test
npm run test:e2e
# Requires Java 21. Always uses isolated demo-ncfe, not live research data.
npm run test:rules
```

Browser checks include 320, 375, 390, 430, 768, 1024 and 1440px widths. Automated axe checks cover representative pages, invalid fields and feedback. **WCAG 2.2 AA is a target, not a certified compliance claim.** Physical-device TalkBack/VoiceOver and manual accessibility checks remain necessary: [testing checklist](docs/accessibility-testing.md).

GitHub Actions validates before deploying `main` to GitHub Pages. See [phase evidence](docs/implementation-report.md) and [portfolio integration instructions](docs/portfolio-integration.md). Remaining npm audit findings are in Firebase CLI development tooling; the production dependency audit is clean. Do not use `npm audit fix --force` to downgrade the Firebase SDK or break tools.
