import fs from 'node:fs/promises';
import path from 'node:path';
const manifest = JSON.parse(await fs.readFile('.design-context/assets.json', 'utf8'));
const entries = Object.values(manifest).flatMap(Object.values);
let next = 0;
await Promise.all(Array.from({length: 8}, async () => {
  while (next < entries.length) {
    const entry = entries[next++];
    const destination = path.join('public', entry.path);
    try { if ((await fs.stat(destination)).size > 0) continue; } catch { /* Download missing assets. */ }
    await fs.mkdir(path.dirname(destination), {recursive: true});
    const response = await fetch(entry.url);
    if (!response.ok) throw new Error(`Asset download failed: ${entry.path} (${response.status})`);
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (!bytes.length) throw new Error(`Empty asset: ${entry.path}`);
    await fs.writeFile(destination, bytes);
  }
}));
const local = Object.fromEntries(Object.entries(manifest).map(([key, values])=>[key,Object.fromEntries(Object.entries(values).map(([name,entry])=>[name,entry.path]))]));
await fs.writeFile('src/content/assets.json', JSON.stringify(local,null,2)+'\n');
console.log(`Downloaded ${entries.length} original Figma assets.`);
