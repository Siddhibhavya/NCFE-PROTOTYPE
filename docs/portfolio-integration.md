# Portfolio integration (instructions only)

No changes have been made to the existing portfolio repository.

Share the standalone link:

`https://siddhibhavya.github.io/NCFE-PROTOTYPE/`

On desktop it opens the supplied-style popup/phone frame. On mobile it opens the application full screen with no portfolio Close X.

For a future portfolio popup, embed the responsive application in the portfolio's existing dialog:

```html
<iframe
  title="NCFE independent academic usability prototype"
  src="https://siddhibhavya.github.io/NCFE-PROTOTYPE/?view=app#/onboarding"
></iframe>
```

The portfolio owns its Close X, focus trap, focus restoration and mobile overlay. If the portfolio embeds the prototype's whole desktop wrapper instead, use `?embedded=portfolio&parentOrigin=https%3A%2F%2Fsiddhibhavya.github.io`; the prototype sends `{type:'ncfe-close'}` to the configured parent origin. Accept that message only when `event.origin` and `event.source` match the embedded prototype. Do not close arbitrary windows.

Wrapper Restart and Back send `{type:'ncfe-wrapper',action:'restart'|'back'}` to the phone iframe; Feedback uses `action:'feedback'`. The application accepts these only from its parent at the same origin. An external-origin portfolio needs a separately reviewed origin allowlist.

## Future case-study metrics

Keep “Research in progress” until real, consented records exist. Firebase records distinguish:

- Tests started, including subsequently completed tests.
- Completed tests: final submission with four distinct task reports and at least one non-skipped task.
- Anonymous testing browsers, which are not verified unique people.
- General feedback submissions, independently of tests.

There is no page-visit analytics. Do not add visits to completed tests. Show task attempts, completions and skips separately; task completion rate uses non-skipped attempts. With no attempts, show “No data yet”, not 0% or an invented rate.

Use `aggregateTests` privately on researcher-authorized exports. Only publish its non-identifying counts and reviewed findings, after checking small groups and free text for identification risks. Never publish raw records, browser IDs, comments, Firebase Admin credentials or a public read policy. Portfolio publishing requires a separate approval.
