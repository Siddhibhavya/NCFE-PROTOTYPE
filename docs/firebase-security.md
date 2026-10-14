# Firebase configuration and research protection

The local Firebase web configuration belongs in `.env.local`, which Git ignores. `.env.example` contains empty key/app-ID placeholders. Production build values belong in GitHub Actions secrets, not source files, screenshots, logs, or workflow literals. Never upload Firebase Admin SDK service-account credentials to this frontend repository.

Firebase web API keys identify the project and are public by design. Vite variables prefixed with `VITE_` are embedded in the browser bundle. GitHub secrets keep these values out of source and build logs; they do not make the deployed web key confidential. Access to participant records must be enforced by Firebase Authentication and Firestore Security Rules. See [Firebase API-key guidance](https://firebase.google.com/docs/projects/api-keys).

Firebase Analytics is not initialized and no analytics provider is used. The separate usability study stays disabled. Prototype views and submitted feedback use the limited collection described in [Firebase data collection](firebase-data-collection.md).

The current project has no Firestore database: the Cloud Firestore API is disabled. Do not enable the Pages secret until the first database has been created, Firestore rules have been deployed and the Anonymous Authentication provider is enabled. Traffic and feedback documents deny browser reads. Researcher access remains under Google Cloud IAM.

Keep all registration demonstration values, search terms and simulated conversations out of Firestore. Do not add Admin SDK credentials to the client or repository. Review retention and deletion requirements before real feedback is collected.

Run `node scripts/check-repository-secrets.mjs` before committing. This checks tracked files without printing matched credentials. It complements GitHub secret scanning; it is not a complete secret detector.
