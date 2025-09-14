const fs = require('fs');
const path = require('path');

const aulasDir = path.resolve('aulas');
const files = fs.readdirSync(aulasDir).filter(f => f.endsWith('.html'));

const repAll = (s, a, b) => s.split(a).join(b);

function migrate(content) {
  let out = content;

  // H2 with old style + border primary -> section__title
  out = out.replace(/<h2([^>]*?)class=\"([^\"]*?)text-3xl\s+font-bold\s+text-neutral-800\s+border-b-2\s+border-primary-500\s+pb-2\s+mb-(6|8)([^\"}]*)\"/g,
    (_m, pre, _preCls, mb, _post) => `<h2${pre}class="section__title mb-${mb}"`);

  // H3 old large subtitle -> section__subtitle (keep margin)
  out = out.replace(/<h3([^>]*?)class=\"([^\"]*?)text-3xl\s+font-bold\s+text-neutral-800\s+mb-(6|8)([^\"}]*)\"/g,
    (_m, pre, _preCls, mb, _post) => `<h3${pre}class="section__subtitle mb-${mb}"`);

  // bg-white cards to .card (several paddings/shadows)
  out = repAll(out, 'bg-white p-8 rounded-2xl shadow-elevation-2', 'card p-8 shadow-elevation-2');
  out = repAll(out, 'bg-white p-8 rounded-2xl shadow', 'card p-8');
  out = repAll(out, 'bg-white p-6 rounded-2xl shadow-elevation-2', 'card shadow-elevation-2');
  out = repAll(out, 'bg-white p-6 rounded-2xl shadow-elevation-1', 'card');
  out = repAll(out, 'bg-white p-6 rounded-2xl shadow', 'card');
  out = repAll(out, 'bg-white p-4 rounded-2xl shadow', 'card p-4');

  // Callouts: green -> success
  out = out.replace(/class=\"([^\"]*?)bg-green-50[^\"]*?border-green-500[^\"]*?\"/g, 'class="callout callout-success"');
  // Callouts: red -> danger
  out = out.replace(/class=\"([^\"]*?)bg-red-50[^\"]*?border-red-500[^\"]*?\"/g, 'class="callout callout-danger"');
  // Callouts: primary info blocks -> info
  out = out.replace(/class=\"([^\"]*?)bg-primary-100[^\"]*?border-primary-500[^\"]*?text-primary-800[^\"]*?\"/g, 'class="callout callout-info"');

  return out;
}

let changed = 0;
for (const f of files) {
  const p = path.join(aulasDir, f);
  const src = fs.readFileSync(p, 'utf8');
  const out = migrate(src);
  if (out !== src) {
    fs.writeFileSync(p, out, 'utf8');
    console.log('Migrated', f);
    changed++;
  }
}

console.log('Batch migration done. Files changed:', changed);

