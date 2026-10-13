# Accessibility verification

Target: WCAG 2.2 AA. No compliance claim or certification.

## Completed automated checks

- Semantic landmarks, headings, form labels and accessible dialog names.
- Original fixed header at 56.46px and navigation while content scrolls.
- Focus on the first invalid field, inline error descriptions and error summary.
- Native modal Escape behaviour and return of focus to the feedback trigger.
- Language updates to `document.documentElement.lang`, translated interface/content and retained programme/policy names.
- Layout overflow checks at 320, 375, 390, 430, 768, 1024 and 1440px.
- Axe WCAG checks across onboarding, Home, learning, topic content, FETP registration, Help, study, privacy, invalid forms and feedback.
- Reduced-motion CSS and native keyboard controls. Registration drafts survive route navigation.

The original `#d32f2f` error colour measured 4.35:1 on the pale blue background. Error messages use the existing white surface to maintain the original colour and meet text contrast in automated checks. Muted text uses the existing darker token where the original grey fell below the required contrast.

## Manual checks still required

Record device, OS, browser, assistive-technology version, date, tester and findings when executing these checks. Automated keyboard actions above are not a substitute for manual testing.

| Environment | Checklist | Status |
| --- | --- | --- |
| Android + TalkBack | Read language cards, confirm/cancel, landmarks, navigation, invalid fields, feedback stars, non-voice help; verify language pronunciation | Pending physical-device testing |
| iOS + VoiceOver | Rotor headings/form controls, modal containment/focus return, keyboard appearance, translated text and native language switching | Pending physical-device testing |
| Desktop keyboard | Tab/Shift+Tab, Enter/Space, Escape, visible focus, no trapped focus outside dialogs, iframe/wrapper controls | Automated subset passed; manual pass pending |
| Text scaling / zoom | Browser 200%/400%, OS large text, portrait/landscape, no clipped controls or lost content | Responsive automation passed; manual scaling pending |
| Motion preferences | Enable device reduced motion and confirm all journeys remain usable | CSS support implemented; device check pending |
| Native speakers | Hindi and Odia draft comprehension, form labels, errors and financial terminology; confirm preserved names | Pending review |

Screen readers use browser/device accessibility. No additional voice or audio controls are introduced. User comments are never translated or reformatted. Original raster posters can contain English text; their textual summaries are localized.
