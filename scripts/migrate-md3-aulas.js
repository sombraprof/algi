import fs from 'fs';
import path from 'path';

const aulasDir = path.resolve('aulas');

const files = fs.readdirSync(aulasDir).filter(f => f.endsWith('.html'));

const replaceAll = (str, find, replace) => str.split(find).join(replace);

for (const file of files) {
  const full = path.join(aulasDir, file);
  let src = fs.readFileSync(full, 'utf8');
  let out = src;

  // Headings (H2)
  out = out.replace(/<h2 class="text-4xl font-bold text-neutral-900"/g, '<h2 class="section__title"');
  out = out.replace(/<h2 class=\"text-3xl font-bold text-neutral-800 mb-6\"/g, '<h2 class="section__title mb-6"');

  // Intro paragraph
  out = out.replace(/<p class=\"text-lg text-neutral-600 mt-2\"/g, '<p class="text-body-large text-neutral-700 dark:text-neutral-300 mt-2"');

  // H3 subtitles common pattern
  out = out.replace(/<h3 class=\"font-bold text-2xl text-neutral-800 mb-4\"/g, '<h3 class="section__subtitle mb-4"');
  out = out.replace(/<h3 class=\"font-bold text-2xl text-neutral-800 mb-3\"/g, '<h3 class="section__subtitle mb-3"');

  // Card containers (keep extra classes around)
  out = replaceAll(out, 'bg-white p-8 rounded-2xl shadow-elevation-2', 'card p-8 shadow-elevation-2');
  out = replaceAll(out, 'bg-white p-8 rounded-2xl shadow', 'card p-8');
  out = replaceAll(out, 'bg-white p-6 rounded-2xl shadow-elevation-2', 'card shadow-elevation-2');
  out = replaceAll(out, 'bg-white p-6 rounded-2xl shadow-elevation-1', 'card');
  out = replaceAll(out, 'bg-white p-6 rounded-2xl shadow', 'card');
  out = replaceAll(out, 'bg-white p-4 rounded-2xl shadow', 'card p-4');

  if (out !== src) {
    fs.writeFileSync(full, out, 'utf8');
    console.log(`Migrated: ${file}`);
  }
}

console.log('MD3 migration done.');

