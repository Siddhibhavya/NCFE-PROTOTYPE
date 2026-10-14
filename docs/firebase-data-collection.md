# Firebase data collection

The prototype has two narrowly scoped write paths. Page views increment one UTC daily total; the stored document contains only an integer count and update timestamp. It does not contain a route, query, referrer, or page history. Feedback is stored only after Submit, with the selected rating, reviewed screen, optional comment, and submission timestamp. The browser does not send form contents, search terms, chat text, or usability-task results.

Both writes require Firebase Anonymous Authentication. Its browser-linked ID is used only to authenticate the request and is not copied into the traffic or feedback documents. Firestore rules allow authenticated creates and daily counter increments, reject extra fields, and deny browser reads and deletes. Anonymous identity is persisted by Firebase Auth in the browser.

`VITE_PROTOTYPE_DATA_ENABLED` defaults to false. Local `.env.local` remains off unless explicitly configured. The Pages workflow reads the GitHub Actions secret of the same name. The production secret is set to `true` after database, rules and Anonymous Authentication setup.

The Firestore API and Anonymous provider are active. The default database is deployed in the user-approved Mumbai region (`asia-south1`) with delete protection enabled, and the scoped rules are deployed. The accidental `nam5` database was empty and has been removed. The live deployment has successfully authenticated and written an aggregate page view. Confirm Firebase retention and deletion requirements before collecting real feedback.
