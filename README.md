# NCFE-redesign usability prototype

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

## Firebase is optional

All journeys work with `VITE_RESEARCH_ENABLED=false`. Feedback and guided-task submissions then explicitly say that nothing was saved. No Firebase account or live database connection is required to explore the prototype.

When enabled, only consented usability-test records and feedback go to Firebase. Registration details and chat messages are never uploaded. Analytics is not initialized. Visits do not count as completed tests. Browser identities are anonymous sessions, not verified unique people.

Keep the API key and web-app configuration in ignored `.env.local` and GitHub repository secrets. `VITE_` values are visible in deployed browser code; Firebase web keys are public identifiers, not private database credentials. Never add Admin SDK service-account keys. See [security setup](docs/firebase-security.md).

Live collection remains disabled until Firestore and Anonymous Authentication are available, rules are deployed, 90-day expiry is configured and privacy arrangements are verified. A study-contact placeholder allows the demonstration to work without inventing a contact. Replace it before inviting participants to share real study responses.

```sh
# After Firestore has been created in production mode:
npx firebase deploy --only firestore:rules --project ncfe-redesign
```

Anonymous ownership rules deny access to others' responses and public queries, validate allowed fields, require all four task reports for a completed test and allow same-browser withdrawal. Researcher access uses IAM in Firebase, not a public frontend dashboard. Configure TTL on `expiresAt` for the `tests` and `feedback` collection groups; check billing requirements and deletion delay. Treat 90 days as the retention deadline and operate a daily researcher deletion check to cover TTL delays.

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
