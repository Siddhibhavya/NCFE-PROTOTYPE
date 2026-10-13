import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

// Report file names only. Never print credentials or matching lines.
const files = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);
const patterns = [/AIza[0-9A-Za-z_-]{35}/, /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/, /"private_key"\s*:\s*"/];
const findings = files.filter(file => {
  try { return patterns.some(pattern => pattern.test(readFileSync(file, 'utf8'))); }
  catch { return false; }
});
if (findings.length) {
  console.error('Potential credentials in tracked files:', findings.join(', '));
  process.exitCode = 1;
} else {
  console.log('No Firebase API key literals or private keys found in tracked files.');
}
