import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

// Values go to gh over stdin, never through command-line arguments or logs.
const values = Object.fromEntries(readFileSync('.env.local', 'utf8').split(/\r?\n/).filter(line => line && !line.startsWith('#')).map(line => {
  const separator = line.indexOf('=');
  return [line.slice(0, separator), line.slice(separator + 1)];
}));
const names = ['VITE_FIREBASE_API_KEY', 'VITE_FIREBASE_AUTH_DOMAIN', 'VITE_FIREBASE_PROJECT_ID', 'VITE_FIREBASE_APP_ID', 'VITE_RESEARCH_ENABLED'];
for (const name of names) {
  if (!values[name]) throw new Error(`Missing configuration variable: ${name}`);
  try {
    execFileSync('gh', ['secret', 'set', name, '--repo', 'Siddhibhavya/NCFE-PROTOTYPE'], { input: values[name], stdio: ['pipe', 'ignore', 'ignore'] });
    console.log(`Stored repository secret: ${name}`);
  } catch {
    throw new Error(`Could not store repository secret: ${name}`);
  }
}
