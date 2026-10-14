# Implementation evidence

Historical implementation record. The current [fidelity/privacy audit](fidelity-audit.md) supersedes the language availability, simulated support, backend collection and form-flow descriptions below.

## Source fidelity

Original Figma screens and component tokens are the source of visual styling. Case-study export is a comparison source; wireframes supplied layout structure only. Original logos, posters, SVG navigation icons, support icons, feedback stars and close icon are downloaded locally. No placeholder icons replace available assets.

| Phase | Completed locally | Evidence / comparison |
| --- | --- | --- |
| 1 | Screen and component inventories, tokens, architecture and reviewed plan | [Original inspection record](phase-1-review.md); plan approved in conversation before implementation |
| 2 | Fixed shell, primary navigation, desktop popup and mobile direct-link behaviour | [Shell](screenshots/phase-2-shell.png), [Desktop wrapper](screenshots/phase-2-desktop-wrapper.png); 56.46px header and original nav/icons |
| 3 | Confirmation/cancellation, search, Textbooks, Gallery and shared topics | [Onboarding](screenshots/phase-3-onboarding.png); original circular logo/name arrangement and selected-language style |
| 4 | Six programme destinations, FETP/E-LMS forms, validation, retained drafts, review and simulated submission | [FETP](screenshots/phase-4-fetp.png); source forms/confirmation styling; fictional data only |
| 5 | FinDisha, messages, Help and non-voice support | [Help](screenshots/phase-5-help.png); original support icons/card structure; service availability replaced by explicit simulated descriptions |
| 6 | Responsive feedback | [Feedback](screenshots/phase-6-feedback.png); Frame 224 cream/yellow/stars/close preserved, approved responsive language/submit additions |
| 7 | Optional Firebase adapter, consent, four tasks, skips, outcomes, difficulty, modes, withdrawal, rules and aggregate logic | [Study](screenshots/phase-7-study.png); demonstrations remain available without Firebase |
| Language update | Hindi/Odia draft text and multilingual search; programme/policy names preserved | [Hindi](screenshots/translated-hi.png), [Odia](screenshots/translated-or.png); user requested translation, draft review notice shown |
| 8 | GitHub Pages workflow and published demonstration | [Successful validation and deployment run](https://github.com/Siddhibhavya/NCFE-PROTOTYPE/actions/runs/38440708140); mobile browser onboarding, navigation and demonstration feedback verified |
| 9 | Lint, strict types, build, Vitest, browser and database-rule checks; documented manual accessibility checklist | [Accessibility checks and limitations](accessibility-testing.md) |

## Intentional prototype limitations

- Figma source supplies posters/sample copy, not playable official video files or verified transcripts. Those sections state what is unavailable.
- Registrations, log-in, support contact details and conversations are simulated. No real identity, banking, government-document or password collection.
- The user authorized placeholders so all journeys can work without live data. No invented study email or financial statistics.
- Live research is off until Firebase services/rules/expiry and privacy details are verified. Retention is 90 days after submission. Prototype feedback does not imply a saved response.
- Hindi/Odia are draft translations of source copy. Names remain unchanged and raster imagery can still contain English text. Native-speaker review remains necessary.
- Other programme forms share labelled demonstration controls rather than implying fully implemented official applications.
- Physical-device TalkBack/VoiceOver, manual scaling and full human accessibility testing are pending. Automated checks do not establish compliance.

Only this prototype repository is changed. Portfolio integration remains documentation.

Local verification: lint, strict types, build, 7 Vitest checks, 14 Playwright checks (including automated accessibility) and 4 Firestore access-control checks passed. Production dependency audit reported no known vulnerabilities. Physical-device/manual checks remain pending as listed above.
