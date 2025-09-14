import fs from 'fs';
import path from 'path';

const aulasDir = path.resolve('aulas');
const files = fs.readdirSync(aulasDir).filter(f => f.endsWith('.html'));

for (const file of files) {
  const full = path.join(aulasDir, file);
  const src = fs.readFileSync(full, 'utf8');
  const out = src.replace(/<h3 class=\"text-3xl font-bold text-neutral-800 mb-6\">/g, '<h3 class="section__subtitle mb-6">');
  if (out !== src) {
    fs.writeFileSync(full, out, 'utf8');
    console.log('Updated H3 subtitles in', file);
  }
}

