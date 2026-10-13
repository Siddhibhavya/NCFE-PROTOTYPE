# Firebase configuration and research protection

The local Firebase web configuration belongs in `.env.local`, which Git ignores. `.env.example` contains empty key/app-ID placeholders. Production build values belong in GitHub Actions secrets, not source files, screenshots, logs, or workflow literals. Never upload Firebase Admin SDK service-account credentials to this frontend repository.

Firebase web API keys identify the project and are public by design. Vite variables prefixed with `VITE_` are embedded in the browser bundle. GitHub secrets keep these values out of source and build logs; they do not make the deployed web key confidential. Access to participant records must be enforced by Firebase Authentication and Firestore Security Rules. See [Firebase API-key guidance](https://firebase.google.com/docs/projects/api-keys).

Analytics is not initialized; the supplied measurement ID is not used. Research collection remains disabled with `VITE_RESEARCH_ENABLED=false` until consent/privacy settings are agreed, Anonymous Authentication is enabled, Firestore is available, and database rules have passed access-control tests and been deployed.

The initial database availability check returned HTTP 403 because the Cloud Firestore API has not been used in this project or is disabled. No participant records were created by that check.

Before enabling research:

- Create Firestore in production mode and select an appropriate data region.
- Enable Anonymous Authentication; do not request participants' email addresses or passwords.
- Enforce ownership and schema validation for each anonymous session; deny public queries and access to other sessions. Keep researcher access under Google Cloud IAM.
- Verify consent, withdrawal, retention and the study contact in the interface.
- Retain each response for 90 days after submission, as agreed by the study owner. Configure and verify automatic expiry before enabling collection.
- Restrict the browser key to the Firebase APIs used by this app; review App Check and quotas before public recruitment.
- Keep all registration demonstration values and simulated conversations out of the research database.

Run `node scripts/check-repository-secrets.mjs` before committing. This checks tracked files without printing matched credentials. It complements GitHub secret scanning; it is not a complete secret detector.
