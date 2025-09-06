// Branding/config defaults (podem ser definidos em js/config.js)
const APP_NOME_DISCIPLINA = window.APP_NOME_DISCIPLINA || 'Curso';
const APP_SIGLA = window.APP_SIGLA || 'DISC';
const APP_NOME_PROFESSOR = window.APP_NOME_PROFESSOR || '';
const APP_INSTITUICAO   = window.APP_INSTITUICAO || '';
const APP_SEMESTRE      = window.APP_SEMESTRE || '';
const APP_STORAGE_PREFIX = window.APP_STORAGE_PREFIX || 'app';

function lsGet(suffix) { try { return localStorage.getItem(`${APP_STORAGE_PREFIX}:${suffix}`); } catch(_) { return null; } }
function lsSet(suffix, value) { try { localStorage.setItem(`${APP_STORAGE_PREFIX}:${suffix}`, value); } catch(_) {} }

function applyBranding() {
  try {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', `${APP_NOME_DISCIPLINA} – Materiais, aulas e listas${APP_INSTITUICAO ? ` (${APP_INSTITUICAO})` : ''}.`);
  } catch(_){}
  try {
    const sidebarTitle = document.querySelector('#sidebar-header h2 .label');
    if (sidebarTitle) sidebarTitle.textContent = APP_NOME_DISCIPLINA;
  } catch(_){}
  try {
    const sidebarSub = document.querySelector('#sidebar-header p .label');
    if (sidebarSub) sidebarSub.textContent = APP_INSTITUICAO || sidebarSub.textContent || '';
  } catch(_){}
  try {
    const headerBrand = document.getElementById('brand-header');
    if (headerBrand) headerBrand.textContent = `${APP_NOME_DISCIPLINA}${APP_NOME_PROFESSOR ? ' · ' + APP_NOME_PROFESSOR : ''}`;
  } catch(_){}
  try {
    if (!document.title || /Curso\s*-\s*Materiais/i.test(document.title)) {
      document.title = APP_INSTITUICAO ? `${APP_NOME_DISCIPLINA} - ${APP_INSTITUICAO}` : APP_NOME_DISCIPLINA;
    }
  } catch(_){}

  // Tornar visíveis placeholders após aplicar branding
  try { document.querySelectorAll('.brand-ph').forEach(el => el.classList.remove('brand-ph')); } catch(_){}

  // Favicon e Apple Touch com sigla (SVG + fallback PNG para iOS)
  try {
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    const bg = themeMeta ? themeMeta.getAttribute('content') : '#0f172a';
    const fg = '#ffffff';
    function makeSvg(text, size, radius) {
      const L = text.length;
      let ratio = L <= 2 ? 0.58 : L === 3 ? 0.52 : L === 4 ? 0.44 : 0.38;
      if (size <= 48) ratio *= 0.85;
      const fs = Math.round(size * ratio);
      const family = 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif';
      const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">\n  <rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="${bg}"/>\n  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" dy=".06em"\n        font-family="${family}" font-weight="700" font-size="${fs}" fill="${fg}">${text}</text>\n</svg>`;
      return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
    }
    function svgToPng(svgUrl, size) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = size; canvas.height = size;
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, size, size);
            resolve(canvas.toDataURL('image/png'));
          } catch { resolve(''); }
        };
        img.onerror = () => resolve('');
        img.src = svgUrl;
      });
    }
    const fav = document.getElementById('favicon');
    const fav16 = document.getElementById('favicon-16');
    const fav32 = document.getElementById('favicon-32');
    const fav48 = document.getElementById('favicon-48');
    const favPng = document.getElementById('favicon-png');
    const a120 = document.getElementById('apple-icon-120');
    const a152 = document.getElementById('apple-icon-152');
    const a167 = document.getElementById('apple-icon-167');
    const a180 = document.getElementById('apple-icon-180');
    // Gerar diferentes tamanhos com mais margem para tamanhos pequenos
    const svg16  = makeSvg(APP_SIGLA, 16,  Math.round(16*0.18));
    const svg32  = makeSvg(APP_SIGLA, 32,  Math.round(32*0.18));
    const svg48  = makeSvg(APP_SIGLA, 48,  Math.round(48*0.18));
    const svg96  = makeSvg(APP_SIGLA, 96,  Math.round(96*0.18));
    const svg120 = makeSvg(APP_SIGLA, 120, Math.round(120*0.18));
    const svg152 = makeSvg(APP_SIGLA, 152, Math.round(152*0.18));
    const svg167 = makeSvg(APP_SIGLA, 167, Math.round(167*0.18));
    const svg180 = makeSvg(APP_SIGLA, 180, Math.round(180*0.18));
    const svg192 = makeSvg(APP_SIGLA, 192, Math.round(192*0.18));
    if (fav)  fav.setAttribute('href', svg192);
    if (fav16) { svgToPng(svg16, 16).then((png)=>{ if (png) fav16.setAttribute('href', png); }); }
    if (fav32) { svgToPng(svg32, 32).then((png)=>{ if (png) fav32.setAttribute('href', png); }); }
    if (fav48) { svgToPng(svg48, 48).then((png)=>{ if (png) fav48.setAttribute('href', png); }); }
    if (favPng){ svgToPng(svg192, 192).then((png)=>{ if (png) favPng.setAttribute('href', png); }); }
    if (a120) { svgToPng(svg120, 120).then((png)=>{ if (png) a120.setAttribute('href', png); }); }
    if (a152) { svgToPng(svg152, 152).then((png)=>{ if (png) a152.setAttribute('href', png); }); }
    if (a167) { svgToPng(svg167, 167).then((png)=>{ if (png) a167.setAttribute('href', png); }); }
    if (a180) { svgToPng(svg180, 180).then((png)=>{ if (png) a180.setAttribute('href', png); }); }
  } catch(_){}

  // Manifest dinâmico baseado na config
  try {
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    const themeColor = themeMeta ? themeMeta.getAttribute('content') : '#0f172a';
    // Gerar SVGs para ícones do manifesto
    function svgData(size) {
      const radius = Math.round(size * 0.18);
      const L = APP_SIGLA.length;
      let ratio = L <= 2 ? 0.58 : L === 3 ? 0.52 : L === 4 ? 0.44 : 0.38;
      if (size <= 48) ratio *= 0.85;
      const fs = Math.round(size * ratio);
      const family = 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif';
      const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">\n  <rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="${themeColor}"/>\n  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" dy=".06em" font-family="${family}" font-weight="700" font-size="${fs}" fill="#ffffff">${APP_SIGLA}</text>\n</svg>`;
      return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
    }
    const link = document.querySelector('link[rel="manifest"]');
    // Passo 1: define manifesto rápido com SVG
    const manifestSvg = {
      name: APP_INSTITUICAO ? `${APP_NOME_DISCIPLINA} – ${APP_INSTITUICAO}` : APP_NOME_DISCIPLINA,
      short_name: APP_NOME_DISCIPLINA,
      start_url: './index.html',
      scope: './',
      display: 'standalone',
      background_color: themeColor,
      theme_color: themeColor,
      lang: 'pt-BR',
      icons: [
        { src: svgData(192), sizes: '192x192', type: 'image/svg+xml', purpose: 'any maskable' },
        { src: svgData(512), sizes: '512x512', type: 'image/svg+xml', purpose: 'any maskable' }
      ]
    };
    if (link) {
      let url = URL.createObjectURL(new Blob([JSON.stringify(manifestSvg)], { type: 'application/manifest+json' }));
      link.setAttribute('href', url);
      // Passo 2: em segundo plano, gerar PNGs e atualizar
      Promise.all([
        (async()=>{ const s = svgData(192); return await (new Promise(r=>{ const i=new Image(); i.onload=()=>{ const c=document.createElement('canvas'); c.width=192;c.height=192; const x=c.getContext('2d'); x.imageSmoothingEnabled=true; x.imageSmoothingQuality='high'; x.drawImage(i,0,0,192,192); r(c.toDataURL('image/png')); }; i.onerror=()=>r(''); i.src=s; })); })(),
        (async()=>{ const s = svgData(512); return await (new Promise(r=>{ const i=new Image(); i.onload=()=>{ const c=document.createElement('canvas'); c.width=512;c.height=512; const x=c.getContext('2d'); x.imageSmoothingEnabled=true; x.imageSmoothingQuality='high'; x.drawImage(i,0,0,512,512); r(c.toDataURL('image/png')); }; i.onerror=()=>r(''); i.src=s; })); })()
      ]).then(([png192, png512]) => {
        const manifestPng = { ...manifestSvg, icons: [
          { src: png192 || svgData(192), sizes: '192x192', type: png192 ? 'image/png' : 'image/svg+xml', purpose: 'any maskable' },
          { src: png512 || svgData(512), sizes: '512x512', type: png512 ? 'image/png' : 'image/svg+xml', purpose: 'any maskable' }
        ]};
        const newUrl = URL.createObjectURL(new Blob([JSON.stringify(manifestPng)], { type: 'application/manifest+json' }));
        link.setAttribute('href', newUrl);
      }).catch(()=>{});
    }
  } catch(_){}
}

async function loadAulas() {
  try {
    const res = await fetch("aulas/aulas.json");
    const aulas = await res.json();
    window.__AULAS_META = aulas;

    const cards = document.getElementById("cards-container");
    if (cards) { cards.innerHTML = ''; cards.className = 'mt-12 space-y-8'; }

    // Ordena: ativos primeiro
    const aulasOrdenadas = [...aulas].sort((a,b) => Number(b.ativo) - Number(a.ativo));
    // Agrupar por unidade para os cards
    const groups = {};
    aulasOrdenadas.forEach((aula) => {
      const unit = aula.unidade || 'Aulas';
      if (!groups[unit]) groups[unit] = [];
      groups[unit].push(aula);
    });
    const orderedUnits = Object.keys(groups).sort((a,b)=>a.localeCompare(b,'pt'));
    orderedUnits.forEach((unit) => {
      const wrap = document.createElement('div');
      wrap.className = 'space-y-3';
      const title = document.createElement('h3');
      title.className = 'group-title';
      title.textContent = unit;
      wrap.appendChild(title);
      const grid = document.createElement('div');
      grid.className = 'group-grid grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6';
      wrap.appendChild(grid);
      groups[unit].forEach((aula, idx) => {
        const id = (aula.arquivo || "").replace(/\.html$/i, "");
        const href = aula.ativo ? `#aula=${encodeURIComponent(id)}` : `#`;
        const card = document.createElement("a");
        card.href = href;
        const enabled = !!aula.ativo;
        card.className = `relative block bg-white p-6 rounded-lg shadow-md transition-all ${
          enabled ? "hover:shadow-xl hover:-translate-y-1 cursor-pointer" : "opacity-70 cursor-not-allowed pointer-events-none"
        }`;
        if (!enabled) { card.setAttribute('aria-disabled','true'); }
        const status = aula.ativo ? `<span class="badge badge-available"><i class=\"fa-solid fa-circle\"></i> Disponível</span>`
                                  : `<span class="badge badge-soon"><i class=\"fa-regular fa-clock\"></i> Em breve</span>`;
        card.innerHTML = `
          <div class="flex items-start justify-between gap-3">
            <h3 class="font-bold text-xl text-indigo-600 mb-2">${aula.titulo.split(":")[0]}</h3>
            ${status}
          </div>
          <p class="text-slate-600">${aula.descricao}</p>`;
        grid.appendChild(card);
      });
      cards.appendChild(wrap);
    });

    // Renderiza/atualiza a sidebar com base no manifesto
    try { renderSidebar(); markActiveRoute(); } catch(_){}
  } catch (err) {
    console.error("Erro ao carregar aulas.json:", err);
  }
}

// Limpa estilos específicos de uma aula previamente carregada
function clearAulaStyles() {
  document
    .querySelectorAll('style[data-aula-style="true"]')
    .forEach((el) => el.remove());
}

// Limpa assets (scripts/links) injetados pela aula anterior
function clearAulaAssets() {
  document
    .querySelectorAll('[data-aula-asset="true"]')
    .forEach((el) => el.parentElement && el.parentElement.removeChild(el));
}

function getAulaMetaByFile(file) {
  const base = (file.split("/").pop() || file).toLowerCase();
  const aulas = Array.isArray(window.__AULAS_META) ? window.__AULAS_META : [];
  return aulas.find((a) => (a.arquivo || "").toLowerCase() === base);
}

function injectAulaAssets(meta) {
  if (!meta) return Promise.resolve();
  const promises = [];
  const styles = Array.isArray(meta.styles) ? meta.styles : [];
  const scripts = Array.isArray(meta.scripts) ? meta.scripts : [];

  styles.forEach((href) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.setAttribute("data-aula-asset", "true");
    document.head.appendChild(link);
  });

  scripts.forEach((src) => {
    promises.push(
      new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = src;
        s.defer = true;
        s.setAttribute("data-aula-asset", "true");
        s.onload = () => resolve();
        s.onerror = (e) => reject(e);
        document.body.appendChild(s);
      })
    );
  });

  return Promise.all(promises).then(() => {
    if (meta.init && typeof window[meta.init] === "function") {
      try {
        window[meta.init]();
      } catch (e) {
        console.warn("Erro ao executar init da aula:", e);
      }
    }
  });
}

// Carrega o HTML de uma aula extraindo apenas <header> e <main>
function loadAula(file) {
  fetch(file)
    .then((r) => r.text())
    .then(async (html) => {
      showLoader();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Limpa estilos anteriores (por segurança, caso tenha havido alguma aula antiga com estilos injetados)
      clearAulaStyles();
      clearAulaAssets();
      const meta = getAulaMetaByFile(file);
      await injectAulaAssets(meta);

      const conteudo = document.getElementById("conteudo");
      conteudo.innerHTML = "";

      const frag = document.createDocumentFragment();
      const header = doc.querySelector("body > header, main > header");
      const main = doc.querySelector("main");

      if (header) frag.appendChild(header.cloneNode(true));
      if (main) {
        frag.appendChild(main.cloneNode(true));
      } else if (doc.body) {
        // Fallback: usa o conteúdo do body, sem <nav>
        const bodyClone = doc.body.cloneNode(true);
        bodyClone.querySelectorAll("nav").forEach((n) => n.remove());
        frag.appendChild(bodyClone);
      } else {
        // Último recurso: insere HTML bruto
        const wrapper = document.createElement("div");
        wrapper.innerHTML = html;
        frag.appendChild(wrapper);
      }

  conteudo.appendChild(frag);

  // A11y: mover foco para o primeiro título da página carregada
      try {
        const firstHeading = conteudo.querySelector('h1, h2, h3');
        if (firstHeading) {
          if (!firstHeading.hasAttribute('tabindex')) firstHeading.setAttribute('tabindex','-1');
          firstHeading.focus();
        }
      } catch(_){}

      // Inicializações genéricas
      initAccordions();
      // Melhorias em blocos de código (wrap + botão copiar)
      try { enhanceCodeBlocks(conteudo); } catch(_){}
      initAdvancedCopyButtons();
      initLaboratorioGeneros();
      enhanceHeadingsAndTOC();
  buildAulaPrevNext(file);
  markActiveRoute();
  updateDocumentTitleFromAula(doc);
  if (window.hljs) { try { window.hljs.highlightAll(); } catch(_){} }

      // Atualiza hash para deep-link
      try {
        const base = file.split("/").pop() || file;
        const id = base.replace(/\.html$/i, "");
        history.replaceState(null, "", `#aula=${encodeURIComponent(id)}`);
        lsSet("lastRoute", `aula=${id}`);
        // progress: marca aula como visitada
        markVisited('aula', id);
        try { renderSidebar(); } catch(_){}
      } catch (_) {}

      window.scrollTo({ top: conteudo.offsetTop - 20, behavior: "smooth" });
      hideLoader();
      prefetchNextPrev(file);
    })
    .catch((err) => console.error("Erro ao carregar aula:", err));
}

async function loadListas() {
  try {
    const res = await fetch("listas/listas.json");
    const listas = await res.json();
    window.__LISTAS_META = listas;
    if (!window.__LISTAS_TOTALS) window.__LISTAS_TOTALS = {};

    const container = document.getElementById("listas-container");
    // Ordena alfabeticamente
    const listasOrdenadas = [...listas].sort((a,b) => a.titulo.localeCompare(b.titulo, 'pt'));
    listasOrdenadas.forEach(async (lista) => {
      const id = (lista.arquivo || "").replace(/\.json$/i, "");
      const href = `#lista=${encodeURIComponent(id)}`;
      // Fetch detail to compute questions count
      let totalQuestoes = 0;
      try {
        const det = await fetch(`listas/${lista.arquivo}`).then(r=>r.json());
        totalQuestoes = Array.isArray(det.questoes) ? det.questoes.length : 0;
      } catch(_) {}
      window.__LISTAS_TOTALS[id] = totalQuestoes;
      const solved = getListaSolvedSet(id).size;
      const pct = totalQuestoes ? Math.round((solved/totalQuestoes)*100) : 0;

      if (container) {
        const card = document.createElement("a");
        card.href = href;
        card.dataset.listId = id;
        card.className = "relative block bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer";
        const isDone = totalQuestoes > 0 && solved === totalQuestoes;
        const newBadge = lista.nova ? '<span class=\\"badge badge-new\\" data-badge=\\"new\\"><i class=\\"fa-solid fa-star\\"></i> Nova</span>' : '';
        card.innerHTML = `
          <div class=\"flex items-start justify-between gap-3\">
            <h3 class=\"font-bold text-xl text-indigo-600 mb-2\">${lista.titulo}</h3>
            <div class=\"flex items-center gap-2\">
              <span class=\"badge badge-available\"><i class=\"fa-solid fa-list\"></i> Exercícios</span>
              <span class=\"badge badge-done\" data-badge=\"done\" style=\"display:${isDone ? 'inline-flex' : 'none'}\"><i class=\"fa-solid fa-check\"></i> Concluída</span>
              ${newBadge}
            </div>
          </div>
          <p class=\"text-slate-600 mb-3\">${lista.descricao}</p>
          <div class=\"text-xs text-slate-500 mb-1\" data-progress=\"text\">Progresso: ${solved}/${totalQuestoes}</div>
          <div class=\"w-full h-2 rounded bg-slate-200 overflow-hidden\"><div data-progress=\"bar\" style=\"width:${pct}%\" class=\"h-full bg-indigo-500\"></div></div>
        `;
        card.dataset.state = isDone ? 'completed' : 'inprogress';
        container.appendChild(card);
      }
    });

    // Atualiza a sidebar com as listas carregadas
    try { renderSidebar(); markActiveRoute(); } catch(_){}
  } catch (err) {
    console.error("Erro ao carregar listas:", err);
  }
}

async function loadListaDetalhe(file) {
  try {
    showLoader();
    const metaRes = await fetch("listas/listas.json");
    const listas = await metaRes.json();
    const meta = listas.find((l) => l.arquivo === file);

    const res = await fetch(`listas/${file}`);
    const data = await res.json();

    const conteudo = document.getElementById("conteudo");
    conteudo.innerHTML = "";

    const section = document.createElement("section");
    section.className = "mb-16 pt-16";
    const listId = (file.split('/').pop()||file).replace(/\.json$/i,'');
    const totalQuestoes = Array.isArray(data.questoes) ? data.questoes.length : 0;
    const solvedSetHeader = getListaSolvedSet(listId);
    section.innerHTML = `
      <header class="mb-6">
        <h2 class="text-4xl font-bold text-slate-900">${data.titulo}</h2>
        <p class="text-lg text-slate-600 mt-2 mb-4">${data.descricao}</p>
        <div class="flex items-center justify-between gap-3 bg-white border border-slate-200 rounded p-3">
          <div class="text-sm text-slate-600">Progresso: <strong id="lista-progress">${solvedSetHeader.size}/${totalQuestoes}</strong></div>
          <div class="flex items-center gap-2">
            <button id="lista-expand" data-tooltip="Expandir todas as soluções" class="px-3 py-1 rounded border border-slate-300 text-sm">Expandir tudo</button>
            <button id="lista-collapse" data-tooltip="Recolher todas as soluções" class="px-3 py-1 rounded border border-slate-300 text-sm">Recolher tudo</button>
            <button id="lista-reset" data-tooltip="Limpar marcações desta lista" class="px-3 py-1 rounded border border-red-300 text-sm text-red-700">Limpar progresso</button>
          </div>
        </div>
      </header>
        <div id="questoes" class="grid md:grid-cols-1 gap-6"></div>
    `;
    conteudo.appendChild(section);

    const questoesContainer = section.querySelector("#questoes");

    data.questoes.forEach((q) => {
      const div = document.createElement("div");
      div.className = "bg-white border border-slate-200 rounded-lg";

      const currentListId = (file.split('/').pop()||file).replace(/\.json$/i,'');
      const solvedSet = getListaSolvedSet(currentListId);
      const solvedNow = solvedSet.has(String(q.id));
      const unlocked = meta.mostrar_solucoes || solvedNow || (solvedSet.size === totalQuestoes);
      const chkId = `chk-${currentListId}-${q.id}`;
      const enunHtml = renderMarkdown(q.enunciado || '');
      const dicaHtml = q.dica ? renderMarkdown(q.dica) : '';
      div.innerHTML = `
        <div class="p-5 flex items-start justify-between gap-3">
          <div class="min-w-0">
            <div class="font-semibold">${escapeHtml(String(q.id))}. </div>
            <div class="mt-1">${enunHtml}</div>
            ${dicaHtml ? `<div class=\"mt-2 text-sm text-slate-600\"><strong>Dica:</strong> ${dicaHtml}</div>` : ''}
          </div>
          <label for="${chkId}" class="solve-toggle inline-flex items-center gap-2 text-xs px-2 py-1 rounded border ${solvedNow?'border-green-400 text-green-700':'border-slate-300 text-slate-600'}">
            <input type="checkbox" id="${chkId}" class="solve-checkbox sr-only" data-qid="${q.id}" ${solvedNow?'checked':''} />
            <span class="cbx" aria-hidden="true"></span>
            <span class="solve-text">${solvedNow? 'Resolvido' : 'Marcar resolvido'}</span>
          </label>
        </div>
        <div class="border-t border-slate-200">
          <button class="accordion-toggle w-full flex justify-between items-center p-3 font-semibold text-left text-sm ${unlocked ? 'text-indigo-700' : 'text-gray-400 cursor-not-allowed'}"
            aria-expanded="false" ${unlocked ? "" : "disabled"}>
            <span>${unlocked ? "Mostrar Solução" : "Solução bloqueada"}</span>
            <span class="transform transition-transform duration-300 rotate-180">▼</span>
          </button>
          <div class="accordion-content overflow-hidden transition-all duration-500 ease-in-out"
            style="max-height: 0px">
            <div class="p-4 bg-slate-800 text-white mono text-sm">
              <pre><code class="language-c">${escapeHtml(prettyIndentCode(q.solucao || '', 'c'))}</code></pre>
            </div>
          </div>
        </div>
      `;
      questoesContainer.appendChild(div);
    });

    initAccordions();
    try { enhanceCodeBlocks(conteudo); } catch(_){}
    enhanceHeadingsAndTOC();
    markActiveRoute();
    updateDocumentTitle(`${APP_NOME_DISCIPLINA} - Lista - ${data.titulo || "Lista"}`);
    // Marca lista como visitada e atualiza sidebar
    try { const listId2 = (file.split('/').pop()||file).replace(/\.json$/i,''); markVisited('lista', listId2); renderSidebar(); } catch(_){}
    // Handlers de progresso
    function updateHeaderProgress() {
      const id = (file.split('/').pop()||file).replace(/\.json$/i,'');
      const set = getListaSolvedSet(id);
      const total = section.querySelectorAll('.solve-toggle').length;
      const el = document.getElementById('lista-progress');
      if (el) el.textContent = `${set.size}/${total}`;
    }
    function updateLocks() {
      const id = (file.split('/').pop()||file).replace(/\.json$/i,'');
      const set = getListaSolvedSet(id);
      const allDone = set.size === section.querySelectorAll('.solve-toggle').length;
      section.querySelectorAll('.accordion-toggle').forEach((button)=>{
        const container = button.closest('.bg-white');
        const btnSolve = container ? container.querySelector('.solve-toggle') : null;
        const qid = btnSolve ? btnSolve.getAttribute('data-qid') : null;
        const solved = qid ? set.has(String(qid)) : false;
        const unlocked = meta.mostrar_solucoes || solved || allDone;
        button.disabled = !unlocked;
        const label = button.querySelector('span:first-child');
        if (label) label.textContent = unlocked ? 'Mostrar Solução' : 'Solução bloqueada';
        button.classList.toggle('text-indigo-700', unlocked);
        button.classList.toggle('text-gray-400', !unlocked);
        button.classList.toggle('cursor-not-allowed', !unlocked);
      });
    }
    section.querySelectorAll('.solve-checkbox').forEach((chk)=>{
      chk.addEventListener('change', ()=>{
        const qid = chk.getAttribute('data-qid');
        const id = (file.split('/').pop()||file).replace(/\.json$/i,'');
        const set = getListaSolvedSet(id);
        const willSolve = chk.checked;
        const label = chk.closest('label.solve-toggle');
        const textSpan = label ? label.querySelector('.solve-text') : null;
        if (willSolve) { set.add(String(qid)); if (textSpan) textSpan.textContent = 'Resolvido'; if (label) { label.classList.remove('border-slate-300','text-slate-600'); label.classList.add('border-green-400','text-green-700'); } }
        else { set.delete(String(qid)); if (textSpan) textSpan.textContent = 'Marcar resolvido'; if (label) { label.classList.remove('border-green-400','text-green-700'); label.classList.add('border-slate-300','text-slate-600'); } }
        setListaSolvedSet(id, set);
        updateHeaderProgress();
        updateLocks();
        try { renderSidebar(); } catch(_){}
        updateListCardProgress(id);
      });
    });
    const expandBtn = document.getElementById('lista-expand');
    const collapseBtn = document.getElementById('lista-collapse');
    const resetBtn = document.getElementById('lista-reset');
    if (expandBtn) expandBtn.addEventListener('click', ()=>{
      section.querySelectorAll('.accordion-toggle').forEach((button)=>{
        if (button.disabled) return;
        const content = button.nextElementSibling;
        button.setAttribute('aria-expanded', 'true');
        const arrow = button.querySelector('span:last-child');
        if (arrow) arrow.style.transform = 'rotate(0deg)';
        content.style.maxHeight = content.scrollHeight + 'px';
      });
    });
    if (collapseBtn) collapseBtn.addEventListener('click', ()=>{
      section.querySelectorAll('.accordion-toggle').forEach((button)=>{
        const content = button.nextElementSibling;
        button.setAttribute('aria-expanded', 'false');
        const arrow = button.querySelector('span:last-child');
        if (arrow) arrow.style.transform = 'rotate(180deg)';
        content.style.maxHeight = '0px';
      });
    });
    if (resetBtn) resetBtn.addEventListener('click', ()=>{
      const id = (file.split('/').pop()||file).replace(/\.json$/i,'');
      setListaSolvedSet(id, new Set());
      section.querySelectorAll('.solve-toggle').forEach((b)=>{
        b.textContent = 'Marcar resolvido';
        b.classList.remove('border-green-400','text-green-700');
        b.classList.add('border-slate-300','text-slate-600');
      });
      updateHeaderProgress();
      updateLocks();
      try { renderSidebar(); } catch(_){}
      updateListCardProgress(id);
    });
    if (window.hljs) { try { window.hljs.highlightAll(); } catch(_){} }
    // Atualiza hash para deep-link
    try {
      const base = file.split("/").pop() || file;
      const id = base.replace(/\.json$/i, "");
      history.replaceState(null, "", `#lista=${encodeURIComponent(id)}`);
        lsSet("lastRoute", `lista=${id}`);
    } catch (_) {}
    requestAnimationFrame(() => {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    hideLoader();
  } catch (err) {
    console.error("Erro ao carregar lista detalhada:", err);
  }
}

// Inicializa acordeões
function initAccordions() {
  const accordions = document.querySelectorAll(".accordion-toggle");
  accordions.forEach((button) => {
    // A11y wiring: ensure aria-controls/id and region role
    const content = button.nextElementSibling;
    if (content) {
      if (!content.id) {
        const uid = 'acc-' + Math.random().toString(36).slice(2, 8);
        content.id = uid;
      }
      button.setAttribute('aria-controls', content.id);
      content.setAttribute('role', 'region');
      // label by the first span inside button
      const labelSpan = button.querySelector('span:first-child');
      if (labelSpan) {
        if (!button.id) button.id = 'btn-' + content.id;
        content.setAttribute('aria-labelledby', button.id);
      }
    }
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", !isExpanded);
      button.querySelector("span:last-child").style.transform = isExpanded
        ? "rotate(180deg)"
        : "rotate(0deg)";
      content.style.maxHeight = isExpanded
        ? "0px"
        : content.scrollHeight + "px";
    });
  });
}

// Escape string for safe HTML insertion
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Minimal Markdown renderer: fenced code blocks (```lang) and inline `code`
function renderMarkdown(md) {
  if (md == null) return '';
  const text = String(md);
  const fenceRe = /```(\w+)?\n([\s\S]*?)```/g;
  let out = '';
  let lastIndex = 0;
  let m;
  while ((m = fenceRe.exec(text)) !== null) {
    const before = text.slice(lastIndex, m.index);
    out += escapeHtml(before)
      .replace(/`([^`]+)`/g, (__, code) => `<code-text>${escapeHtml(code)}</code-text>`)
      .replace(/\n/g, '<br/>' );
    const lang = (m[1] || '').trim();
    let code = m[2] || '';
    code = prettyIndentCode(code, lang);
    const cls = lang ? ` class="language-${lang}"` : '';
    out += `<div class="code-block"><pre><code${cls}>${escapeHtml(code)}</code></pre></div>`;
    lastIndex = fenceRe.lastIndex;
  }
  const tail = text.slice(lastIndex);
  out += escapeHtml(tail)
    .replace(/`([^`]+)`/g, (__, code) => `<code-text>${escapeHtml(code)}</code-text>`)
    .replace(/\n/g, '<br/>' );
  return out;
}

// Pretty-indent C-like code blocks based on curly braces
function prettyIndentCode(code, lang) {
  const l = (lang || '').toLowerCase();
  const isCLike = /^(c|cpp|c\+\+|h|objective-c)$/.test(l) || /#include|int\s+main\s*\(/.test(code);
  if (!isCLike) return code;
  const lines = String(code).replace(/\r\n?/g, '\n').split('\n');
  let depth = 0;
  const ind = '  ';
  const out = [];
  for (let raw of lines) {
    // Preserve empty lines
    if (/^\s*$/.test(raw)) { out.push(''); continue; }
    let line = raw.replace(/\s+$/,'');
    const trimmed = line.trim();
    // decrease depth if line starts with closing brace
    if (/^\}/.test(trimmed)) depth = Math.max(0, depth - 1);
    const pref = ind.repeat(Math.max(0, depth));
    out.push(pref + trimmed);
    // adjust depth by braces on this line
    const opens = (line.match(/\{/g) || []).length;
    const closes = (line.match(/\}/g) || []).length;
    depth += opens - closes;
    if (depth < 0) depth = 0;
  }
  return out.join('\n');
}

// Wrap <pre> blocks with a theme-aware container and inject copy buttons
function enhanceCodeBlocks(rootEl) {
  const root = rootEl || document;
  const pres = Array.from(root.querySelectorAll('pre'));
  pres.forEach((pre) => {
    // Skip if already inside a code-block container
    if (pre.closest('.code-block')) return;

    const parent = pre.parentElement;
    let container = null;
    // Promote common wrappers to code-block if they look like code containers
    if (parent && (/(bg-slate-|bg-gray-|mono|code)/.test(parent.className))) {
      container = parent;
      container.classList.add('code-block');
      // Ensure relative positioning for the copy button
      if (!/\brelative\b/.test(container.className)) container.classList.add('relative');
    } else {
      // Create a new wrapper
      container = document.createElement('div');
      container.className = 'code-block';
      pre.replaceWith(container);
      container.appendChild(pre);
    }

    // Add copy button if missing
    if (!container.querySelector('.copy-btn')) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-btn';
      btn.setAttribute('aria-label', 'Copiar código');
      btn.setAttribute('title', 'Copiar código');
      btn.innerHTML = '<i class="fa-regular fa-copy mr-1"></i>Copiar';
      container.appendChild(btn);
    }
  });
}

// Inicializa os botões de copiar código com suporte a múltiplos blocos
function initAdvancedCopyButtons() {
  const allCopyButtons = document.querySelectorAll(".copy-btn, .copy-code-btn");

  allCopyButtons.forEach((button) => {
    // Migrate native title -> custom tooltip
    const nativeTitle = button.getAttribute('title') || button.getAttribute('aria-label');
    if (nativeTitle) {
      button.setAttribute('data-tooltip', nativeTitle);
      button.removeAttribute('title');
    }
    if (!button.getAttribute('aria-label')) button.setAttribute('aria-label','Copiar código');
    button.addEventListener("click", () => {
      // Tenta localizar o <pre> associado
      const codeBlock = button.closest(".code-block");
      let preEl = codeBlock ? codeBlock.querySelector("pre") : null;
      if (!preEl) {
        // Procura irmãos anteriores que contenham <pre>
        let prev = button.previousElementSibling;
        while (prev && !preEl) {
          if (prev.tagName && prev.tagName.toLowerCase() === 'pre') { preEl = prev; break; }
          if (prev.querySelector) {
            const cand = prev.querySelector('pre');
            if (cand) { preEl = cand; break; }
          }
          prev = prev.previousElementSibling;
        }
      }
      if (!preEl) return;

      const codeToCopy = preEl.innerText;

      navigator.clipboard
        .writeText(codeToCopy)
        .then(() => {
          // ✅ Feedback visual de sucesso
          const originalText = button.innerHTML;
          button.innerHTML = '<i class="fa-solid fa-check mr-1"></i>Copiado!';
          const live = document.getElementById('aria-live');
          if (live) { live.textContent = 'Código copiado para a área de transferência.'; }
          showToast('Código copiado');
          setTimeout(() => {
            button.innerHTML = originalText;
          }, 2000);
        })
        .catch((err) => {
          console.error("Falha ao copiar o código: ", err);
          // 🔄 Fallback para navegadores antigos
          const textArea = document.createElement("textarea");
          textArea.value = codeToCopy;
          document.body.appendChild(textArea);
          textArea.select();
          try {
            document.execCommand("copy");
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fa-solid fa-check mr-1"></i>Copiado!';
            const live = document.getElementById('aria-live');
            if (live) { live.textContent = 'Código copiado para a área de transferência.'; }
            showToast('Código copiado');
            setTimeout(() => {
              button.innerHTML = originalText;
            }, 2000);
          } catch (err) {
            console.error("Fallback de cópia também falhou", err);
          }
          document.body.removeChild(textArea);
        });
    });
  });
}

function initLaboratorioGeneros() {
  const draggables = document.querySelectorAll(".draggable");
  const dropzones = document.querySelectorAll(".dropzone");
  const verificarBtn = document.getElementById("verificar");
  const resultado = document.getElementById("resultado");

  if (draggables.length === 0 || dropzones.length === 0 || !verificarBtn) {
    console.warn("Laboratório de Gêneros não encontrado nesta página.");
    return;
  }

  let dragged = null;

  draggables.forEach((el) => {
    el.addEventListener("dragstart", () => (dragged = el));
    el.addEventListener("dragend", () => (dragged = null));
  });

  dropzones.forEach((zone) => {
    zone.addEventListener("dragover", (e) => e.preventDefault());
    zone.addEventListener("drop", () => {
      if (dragged) zone.appendChild(dragged);
    });
  });

  verificarBtn.addEventListener("click", () => {
    let acertos = 0;
    dropzones.forEach((zone) => {
      zone.querySelectorAll(".draggable").forEach((el) => {
        if (el.dataset.gen === zone.dataset.accept) acertos++;
      });
    });
    resultado.textContent = `Você acertou ${acertos} de ${draggables.length}!`;
  });
}

// Quando o DOM estiver pronto, carrega aulas e resolve hash
document.addEventListener("DOMContentLoaded", () => {
  try { applyBranding(); } catch(_){}
  // Inicializações resilientes em try/catch para não interromper as demais
  try { setupTheme(); } catch (_) {}
  try { setupMobileNav(); } catch (_) {}
  try { setupSearch(); } catch (_) {}
  try { setupCardsControls(); } catch (_) {}
  try { setupBackToTop(); } catch (_) {}
  try { setupTOCToggle(); } catch (_) {}
  try { setupSidebarTooltips(); } catch(_){}
  try { setupSidebarFade(); } catch(_){}
  try { setupShortcuts(); } catch(_){}

  try { setupSidebarInteractions(); } catch(_){}
  try { showHomeSkeleton(); } catch(_){}
  try { loadAulas(); } catch (_) {}
  try { loadListas(); } catch (_) {}

  function routeByHash() {
    const raw = window.location.hash;
    const hash = raw.replace(/^#/, "");
    if (hash.includes("=")) {
      const [key, value] = hash.split("=");
      const id = decodeURIComponent(value || "");
      if (key === "aula" && id) {
        const file = `aulas/${id}.html`;
        fetch(file, { method: "HEAD" })
          .then((res) => (res.ok ? loadAula(file) : notFound('Aula não encontrada.')))
          .catch(() => notFound('Aula não encontrada.'));
      } else if (key === "lista" && id) {
        const file = `${id}.json`;
        fetch(`listas/${file}`, { method: "HEAD" })
          .then((res) => (res.ok ? loadListaDetalhe(file) : notFound('Lista não encontrada.')))
          .catch(() => notFound('Lista não encontrada.'));
      }
    } else {
      if (hash) {
        const el = document.getElementById(hash);
        if (el) {
          showHomeAnchor(hash);
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
      const last = lsGet("lastRoute");
      if (last) {
        const [k, v] = last.split("=");
        const newHash = `#${k}=${encodeURIComponent(v)}`;
        if (newHash !== window.location.hash) {
          window.location.hash = newHash;
        }
      }
    }
  }
  try { routeByHash(); } catch (_) {}
  window.addEventListener("hashchange", routeByHash);
});

function notFound(message) {
  const conteudo = document.getElementById('conteudo');
  if (!conteudo) return;
  conteudo.innerHTML = `<div class="p-6 bg-red-50 border border-red-200 text-red-700 rounded">${message || 'Conteúdo não encontrado.'}</div>`;
  const toc = document.getElementById('toc');
  if (toc) { setTocOpen(false); toc.innerHTML = ''; }
  const nav = document.getElementById('aula-nav');
  if (nav) nav.classList.add('hidden');
  updateDocumentTitle(APP_NOME_DISCIPLINA);
}

function showHomeSkeleton() {
  const cards = document.getElementById('cards-container');
  const listas = document.getElementById('listas-container');
  if (cards) {
    cards.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'space-y-3';
    const title = document.createElement('div');
    title.className = 'h-6 w-40 skeleton rounded';
    wrap.appendChild(title);
    const grid = document.createElement('div');
    grid.className = 'grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6';
    for (let i=0;i<2;i++) {
      const card = document.createElement('div');
      card.className = 'p-6 bg-white rounded-lg shadow skeleton h-24';
      grid.appendChild(card);
    }
    wrap.appendChild(grid);
    cards.appendChild(wrap);
  }
  if (listas) {
    // Não renderizar skeleton em listas de exercícios: manter limpo até carregar
    listas.innerHTML='';
  }
}

function showHomeAnchor(anchorId) {
  const conteudo = document.getElementById('conteudo');
  if (conteudo) conteudo.innerHTML = '';
  const nav = document.getElementById('aula-nav');
  if (nav) nav.classList.add('hidden');
  setTocOpen(false);
  updateDocumentTitle(APP_NOME_DISCIPLINA);
}

function setupMobileNav() {
  const btn = document.getElementById("menu-btn");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  const links = document.getElementById("sidebar-links");
  const mainRoot = document.getElementById('main-root');
  let lastFocused = null;

  if (!btn || !sidebar || !overlay) return;

  function openSidebar() {
    lastFocused = document.activeElement;
    sidebar.classList.remove("-translate-x-full");
    overlay.classList.remove("hidden");
    btn.setAttribute("aria-expanded", "true");
    // a11y: mark main as hidden to AT
    if (mainRoot) mainRoot.setAttribute('aria-hidden','true');
    // Move focus to first focusable link
    const focusable = sidebar.querySelector('a, button, input, [tabindex]:not([tabindex="-1"])');
    if (focusable) focusable.focus();
  }
  function closeSidebar() {
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
    btn.setAttribute("aria-expanded", "false");
    if (mainRoot) mainRoot.removeAttribute('aria-hidden');
    if (lastFocused && typeof lastFocused.focus === 'function') { try { lastFocused.focus(); } catch(_){} }
  }
  btn.addEventListener("click", openSidebar);
  overlay.addEventListener("click", closeSidebar);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidebar();
    // Focus trap when open on small screens
    const isOpen = !sidebar.classList.contains('-translate-x-full');
    if (!isOpen) return;
    if (e.key === 'Tab') {
      const focusables = Array.from(sidebar.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])')).filter(el=>!el.hasAttribute('disabled'));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length-1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  if (links) {
    links.addEventListener("click", (e) => {
      const target = e.target;
      if (target && target.tagName === "A") {
        closeSidebar();
      }
    });
  }
}

function setupSearch() {
  const input = document.getElementById("search-input");
  const cards = document.getElementById("cards-container");
  const listas = document.getElementById("listas-container");
  const sidebar = document.getElementById("sidebar-links");
  if (!input) return;
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    // Filtra cards de aulas
    if (cards) {
      const anchors = cards.querySelectorAll('a[href^="#aula="]');
      anchors.forEach((a)=>{
        const text = a.textContent.toLowerCase();
        a.style.display = text.includes(q) ? "" : "none";
      });
      // Esconde grupo se todos os seus cards estiverem ocultos
      cards.querySelectorAll('.group-grid').forEach((grid)=>{
        const anyVisible = Array.from(grid.querySelectorAll('a[href^="#aula="]')).some((a)=> a.style.display !== 'none');
        grid.parentElement.style.display = anyVisible ? '' : 'none';
      });
    }
    // Filtra cards de listas
    if (listas) {
      Array.from(listas.children).forEach((el) => {
        const text = el.textContent.toLowerCase();
        el.style.display = text.includes(q) ? "" : "none";
      });
    }
    // Filtra links da sidebar
    if (sidebar) {
      const itemLis = sidebar.querySelectorAll('li[data-item]');
      itemLis.forEach((li) => {
        const text = li.textContent.toLowerCase();
        li.style.display = text.includes(q) ? "" : "none";
      });
      // Esconde seção se todos itens dela estiverem ocultos
      const sections = sidebar.querySelectorAll('ul[data-section-list]');
      sections.forEach((ul) => {
        const anyVisible = Array.from(ul.querySelectorAll('li[data-item]')).some((li) => li.style.display !== 'none');
        const header = sidebar.querySelector(`button.section-toggle[data-section="${ul.getAttribute('data-section-list')}"]`);
        const containerLi = header ? header.closest('li[data-section]') : null;
        if (containerLi) containerLi.style.display = anyVisible ? '' : 'none';
      });
    }
  });
}

// Sidebar: pins and collapsible sections
function getPins() {
  try {
    const raw = lsGet('pins');
    return Array.isArray(JSON.parse(raw)) ? JSON.parse(raw) : [];
  } catch(_) { return []; }
}
// Progress (visited)
function getVisitedSet(type) {
  try {
    const raw = lsGet(`visited:${type}`);
    const arr = Array.isArray(JSON.parse(raw)) ? JSON.parse(raw) : [];
    return new Set(arr);
  } catch(_) { return new Set(); }
}
function markVisited(type, id) {
  try {
    const raw = lsGet(`visited:${type}`);
    const arr = Array.isArray(JSON.parse(raw)) ? JSON.parse(raw) : [];
    if (!arr.includes(id)) {
      arr.push(id);
      lsSet(`visited:${type}`, JSON.stringify(arr));
    }
  } catch(_){}
}

// Listas: progresso por questão resolvida
function getListaSolvedSet(id) {
  try {
    const raw = lsGet(`visited:lista:${id}:solved`);
    const arr = Array.isArray(JSON.parse(raw)) ? JSON.parse(raw) : [];
    return new Set(arr);
  } catch(_) { return new Set(); }
}
function setListaSolvedSet(id, set) {
  try { lsSet(`visited:lista:${id}:solved`, JSON.stringify(Array.from(set))); } catch(_){}
}

function updateListCardProgress(listId) {
  try {
    const card = document.querySelector(`#listas-container a[data-list-id="${CSS.escape(listId)}"]`);
    const totals = window.__LISTAS_TOTALS || {};
    const total = totals[listId] || 0;
    const solved = getListaSolvedSet(listId).size;
    const pct = total ? Math.round((solved / total) * 100) : 0;
    if (card) {
      const textEl = card.querySelector('[data-progress="text"]');
      const barEl = card.querySelector('[data-progress="bar"]');
      const doneBadge = card.querySelector('[data-badge="done"]');
      if (textEl) textEl.textContent = `Progresso: ${solved}/${total}`;
      if (barEl) barEl.style.width = pct + '%';
      if (doneBadge) doneBadge.style.display = (total && solved===total) ? 'inline-flex' : 'none';
    }
  } catch (_) {}
}
function setPins(pins) {
  try { lsSet('pins', JSON.stringify(pins)); } catch(_){}
}
function isPinned(type, id) {
  const pins = getPins();
  return pins.includes(`${type}:${id}`);
}
function togglePin(type, id) {
  const key = `${type}:${id}`;
  const pins = getPins();
  const idx = pins.indexOf(key);
  if (idx >= 0) pins.splice(idx, 1); else pins.push(key);
  setPins(pins);
  renderSidebar();
  markActiveRoute();
}
function getCollapse(section) {
  try { return lsGet(`collapse:${section}`) === 'true'; } catch(_) { return false; }
}
function setCollapse(section, collapsed) {
  try { lsSet(`collapse:${section}`, String(!!collapsed)); } catch(_){}
}
function renderSidebar() {
  const sidebar = document.getElementById('sidebar-links');
  if (!sidebar) return;
  const aulas = Array.isArray(window.__AULAS_META) ? window.__AULAS_META : [];
  const listas = Array.isArray(window.__LISTAS_META) ? window.__LISTAS_META : [];
  const pins = getPins();
  const visitedAulas = getVisitedSet('aula');
  const visitedListas = getVisitedSet('lista');

  function romanValueFromUnit(name) {
    if (!name) return Infinity;
    const m = String(name).toLowerCase().match(/unidade\s+([ivx]+)/);
    if (!m) return Infinity;
    const map = { i:1, v:5, x:10 };
    const s = m[1];
    let val = 0, prev = 0;
    for (let i=s.length-1;i>=0;i--) {
      const c = s[i];
      const v = map[c]||0;
      if (v<prev) val -= v; else { val += v; prev = v; }
    }
    return val || Infinity;
  }
  function romanFromNumber(n) {
    const map = {1:'I',2:'II',3:'III',4:'IV',5:'V',6:'VI',7:'VII',8:'VIII',9:'IX',10:'X',11:'XI',12:'XII'};
    return map[n] || String(n);
  }

  function renderSection(title, sectionKey, items) {
    const collapsed = getCollapse(sectionKey);
    const count = items.length;
    const chevron = `<i class="chev fa-solid fa-chevron-${collapsed ? 'right' : 'down'} mr-2"></i>`;
    const icon = sectionKey==='favs' ? '<i class="fa-solid fa-star mr-2 text-yellow-400"></i>' : (sectionKey.startsWith('aulas-')? '<i class="fa-solid fa-graduation-cap mr-2"></i>' : '<i class="fa-solid fa-list-check mr-2"></i>');
    let html = '';
    html += `<li data-section="${sectionKey}">`;
    html += `<button type="button" class="section-toggle w-full flex items-center justify-between px-2 py-1 bg-slate-700/60 hover:bg-slate-700 rounded text-left" data-section="${sectionKey}" data-tooltip="${title}">
      <span class="inline-flex items-center">${chevron}${icon}<span class="label font-bold text-sm">${title}</span></span>
      <span class="text-xs text-slate-300">${count}</span>
    </button>`;
    html += `<ul data-section-list="${sectionKey}" class="mt-2 space-y-2 ${collapsed ? 'hidden' : ''}" style="max-height:${collapsed? '0' : '1200px'}">`;
    items.forEach((it) => { html += it; });
    html += `</ul>`;
    html += `</li>`;
    return html;
  }

  function itemRow(type, id, text, enabled=true) {
    const href = type === 'aula' ? `#aula=${encodeURIComponent(id)}` : `#lista=${encodeURIComponent(id)}`;
    const pin = isPinned(type, id);
    const star = pin ? '<i class="fa-solid fa-star text-yellow-400"></i>' : '<i class="fa-regular fa-star"></i>';
    const disabledCls = enabled ? '' : 'nav-link-disabled';
    const icon = type==='aula' ? '<i class="fa-solid fa-book-open"></i>' : '<i class="fa-solid fa-list"></i>';
    const isVisited = type==='aula' ? visitedAulas.has(id) : false; // não marcamos listas como 'visited' para evitar confusão com 'completed'
    const visitedCls = isVisited ? ' visited' : '';
    const titleAttr = text.replace(/"/g,'&quot;');
    let progressHtml = '';
    if (type==='lista') {
      const totals = window.__LISTAS_TOTALS || {};
      const total = totals[id] || 0;
      const solved = getListaSolvedSet(id).size;
      progressHtml = `<span class=\"sidebar-progress\">${solved}/${total}</span>`;
    }
    const totals2 = window.__LISTAS_TOTALS || {};
    const total2 = totals2[id] || 0;
    const solved2 = getListaSolvedSet(id).size;
    const completedCls = (type==='lista' && total2>0 && solved2===total2) ? ' completed' : '';
    const linkAttrs = enabled ? '' : 'aria-disabled="true" tabindex="-1"';
    const linkCls = enabled ? 'hover:text-indigo-400' : `${disabledCls} pointer-events-none`;
    const pinBtn = enabled ? `<button type=\"button\" class=\"pin-btn text-slate-300 hover:text-yellow-400\" data-tooltip=\"Favoritar\" data-pin=\"${type}\" data-id=\"${id}\" aria-label=\"Favoritar\">${star}</button>` : `<button type=\"button\" class=\"pin-btn text-slate-300\" aria-disabled=\"true\" tabindex=\"-1\">${star}</button>`;
    return `<li data-item data-type="${type}" data-id="${id}" class="flex items-center justify-between${visitedCls}${completedCls}">
      <a href="${enabled ? href : '#'}" ${linkAttrs} data-tooltip="${titleAttr}" class="block font-bold ${linkCls} transition-colors flex-1 pr-2"><span class="icon mr-2">${icon}</span><span class="label">${text}</span></a>
      ${progressHtml}
      ${pinBtn}
    </li>`;
  }

  // Build items (group by unidade)
  const aulaGroupsMap = {};
  aulas.forEach((a) => {
    const id = (a.arquivo||'').replace(/\.html$/i,'');
    const label = a.titulo || id;
    const unit = (a.unidade || 'Aulas');
    if (!aulaGroupsMap[unit]) aulaGroupsMap[unit] = [];
    aulaGroupsMap[unit].push(itemRow('aula', id, label, !!a.ativo));
  });
  const listaItems = listas.map((l) => itemRow('lista', (l.arquivo||'').replace(/\.json$/i,''), l.titulo, true));

  // Favorites
  const favItems = [];
  pins.forEach((key) => {
    const [type,id] = key.split(':');
    if (type==='aula') {
      const a = aulas.find((aa)=> (aa.arquivo||'').replace(/\.html$/i,'')===id);
      if (a) favItems.push(itemRow('aula', id, a.titulo, !!a.ativo));
    } else if (type==='lista') {
      const l = listas.find((ll)=> (ll.arquivo||'').replace(/\.json$/i,'')===id);
      if (l) favItems.push(itemRow('lista', id, l.titulo, true));
    }
  });

  let html = '';
  if (favItems.length) html += renderSection('Favoritos', 'favs', favItems);
  const units = Object.keys(aulaGroupsMap).sort((a,b)=>{
    const av = romanValueFromUnit(a), bv = romanValueFromUnit(b);
    if (av!==bv) return av-bv; return a.localeCompare(b,'pt');
  });
  units.forEach((u)=> {
    const n = romanValueFromUnit(u);
    let display = u;
    if (isFinite(n)) display = `Unidade ${romanFromNumber(n)}`;
    else if (/\baval/i.test(u)) display = 'Avaliação';
    else {
      const base = (u.split('–')[0] || u).trim();
      display = base || u;
    }
    html += renderSection(display, `aulas-${u}`, aulaGroupsMap[u]);
  });
  html += renderSection('Exercícios', 'listas', listaItems);

  sidebar.innerHTML = html;
}

function setupSidebarInteractions() {
  const sidebar = document.getElementById('sidebar-links');
  if (!sidebar) return;
  sidebar.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    if (btn.classList.contains('section-toggle')) {
      const section = btn.getAttribute('data-section');
      const list = sidebar.querySelector(`ul[data-section-list="${section}"]`);
      if (list) {
        const isOpen = !list.classList.contains('hidden');
        // Animate
        if (isOpen) {
          list.style.maxHeight = list.scrollHeight + 'px';
          requestAnimationFrame(() => { list.style.maxHeight = '0px'; });
          list.classList.add('will-hide');
          setTimeout(() => { list.classList.add('hidden'); list.classList.remove('will-hide'); }, 260);
        } else {
          list.classList.remove('hidden');
          list.style.maxHeight = '0px';
          requestAnimationFrame(() => { list.style.maxHeight = list.scrollHeight + 'px'; });
          setTimeout(() => { list.style.maxHeight = '1200px'; }, 260);
        }
        // Persist and toggle chevron
        setCollapse(section, isOpen);
        const chev = btn.querySelector('i.chev');
        if (chev) {
          chev.classList.toggle('fa-chevron-right', isOpen);
          chev.classList.toggle('fa-chevron-down', !isOpen);
        }
      }
    }
    if (btn.classList.contains('pin-btn')) {
      const type = btn.getAttribute('data-pin');
      const id = btn.getAttribute('data-id');
      togglePin(type, id);
      e.preventDefault();
      e.stopPropagation();
    }
  });
}

function setupSidebarMini() {
  const btn = document.getElementById('sidebar-mini-toggle');
  const root = document.documentElement;
  const aside = document.getElementById('sidebar');
  function apply(mini) {
    root.classList.toggle('sidebar-mini', mini);
    if (aside) aside.classList.toggle('mini', mini);
    try { lsSet('sidebarMini', String(!!mini)); } catch(_){}
    if (btn) {
      btn.setAttribute('aria-pressed', String(mini));
      btn.setAttribute('title', mini ? 'Expandir sidebar' : 'Colapsar sidebar');
      btn.innerHTML = mini ? '<i class="fa-solid fa-angles-right"></i>' : '<i class="fa-solid fa-angles-left"></i>';
    }
    // Inline fallback to ensure visual change even if CSS cascade interferes
    if (aside) {
      if (mini) {
        aside.style.width = '4rem';
        aside.style.paddingLeft = '0.75rem';
        aside.style.paddingRight = '0.75rem';
      } else {
        aside.style.removeProperty('width');
        aside.style.removeProperty('padding-left');
        aside.style.removeProperty('padding-right');
      }
    }
  }
  try {
    const saved = lsGet('sidebarMini');
    apply(saved === 'true');
  } catch(_){}
  function handleClick() {
    const overlay = document.getElementById('sidebar-overlay');
    const isSmall = window.innerWidth < 1024;
    if (isSmall) {
      // Toggle off-canvas open/close on small screens
      const isClosed = aside.classList.contains('-translate-x-full');
      if (isClosed) {
        aside.classList.remove('-translate-x-full');
        if (overlay) overlay.classList.remove('hidden');
      } else {
        aside.classList.add('-translate-x-full');
        if (overlay) overlay.classList.add('hidden');
      }
    } else {
      const isMini = root.classList.contains('sidebar-mini') || aside.classList.contains('mini');
      apply(!isMini);
    }
  }
  if (btn) btn.addEventListener('click', handleClick);
}

function setupShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable)) return;
    const k = e.key.toLowerCase();
    if (k === 't') { try { const btn = document.getElementById('theme-toggle'); if (btn) btn.click(); } catch(_){} }
    if (k === 's') { try { const fab = document.getElementById('toc-fab'); if (fab) fab.click(); } catch(_){} }
    if (k === 'f') { try { const input = document.getElementById('search-input'); if (input) { input.focus(); input.select(); } } catch(_){} }
    if (e.key === '?') { try { showShortcutHelp(); } catch(_){} }
  });
}

function showShortcutHelp() {
  const modal = document.getElementById('shortcut-modal');
  const closeBtn = document.getElementById('shortcut-close');
  const mainRoot = document.getElementById('main-root');
  if (!modal) return;
  let lastFocused = document.activeElement;
  function close() {
    modal.classList.add('hidden');
    if (mainRoot) mainRoot.removeAttribute('aria-hidden');
    if (modal.__keydown) document.removeEventListener('keydown', modal.__keydown);
    if (lastFocused && typeof lastFocused.focus === 'function') { try { lastFocused.focus(); } catch(_){} }
  }
  function open() {
    modal.classList.remove('hidden');
    if (mainRoot) mainRoot.setAttribute('aria-hidden','true');
    // Trap de foco e ESC
    function onKey(e) {
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      if (e.key === 'Tab') {
        const focusables = Array.from(modal.querySelectorAll('button, a, [tabindex]:not([tabindex="-1"])')).filter(el=>!el.hasAttribute('disabled'));
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length-1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    modal.__keydown = onKey;
    document.addEventListener('keydown', onKey);
    // Foco inicial
    const initial = closeBtn || modal.querySelector('button, a, [tabindex]:not([tabindex="-1"])');
    if (initial) initial.focus();
  }
  if (closeBtn && !closeBtn.__wired) { closeBtn.addEventListener('click', close); closeBtn.__wired = true; }
  const backdrop = modal.querySelector('.absolute.inset-0');
  if (backdrop && !backdrop.__wired) { backdrop.addEventListener('click', close); backdrop.__wired = true; }
  open();
}

function setupSidebarFade() {
  const aside = document.getElementById('sidebar');
  const header = document.getElementById('sidebar-header');
  const scroller = document.getElementById('sidebar-scroll');
  if (!aside || !header || !scroller) return;
  function setHeaderHeight() {
    const h = header.offsetHeight || 64;
    aside.style.setProperty('--sb-header-h', h + 'px');
  }
  function updateFades() {
    const t = scroller.scrollTop;
    const max = scroller.scrollHeight - scroller.clientHeight;
    if (t <= 1) aside.classList.add('at-top'); else aside.classList.remove('at-top');
    if (t >= max - 1) aside.classList.add('at-bottom'); else aside.classList.remove('at-bottom');
  }
  setHeaderHeight();
  updateFades();
  scroller.addEventListener('scroll', updateFades);
  window.addEventListener('resize', () => { setHeaderHeight(); updateFades(); });
}

function setupSidebarTooltips() {
  const aside = document.getElementById('sidebar');
  if (aside) aside.classList.add('js-tooltips');
  function enable() { return window.innerWidth >= 1024; }
  let tipEl = null;
  let tipId = null;
  let tipTarget = null;
  function showTip(target) {
    if (!enable()) return;
    const text = target.getAttribute('data-tooltip');
    if (!text) return;
    hideTip();
    tipEl = document.createElement('div');
    tipEl.className = 'tooltip-floating';
    tipEl.textContent = text;
    tipId = 'tip-' + Math.random().toString(36).slice(2,8);
    tipEl.id = tipId;
    document.body.appendChild(tipEl);
    tipTarget = target;
    target.setAttribute('aria-describedby', tipId);
    positionTip(target);
  }
  function positionTip(target) {
    if (!tipEl) return;
    const r = target.getBoundingClientRect();
    const pad = 8;
    let x = r.right + pad;
    let y = r.top + r.height / 2 - tipEl.offsetHeight / 2;
    if (x + tipEl.offsetWidth + pad > window.innerWidth) {
      x = r.left - pad - tipEl.offsetWidth;
    }
    if (y < pad) y = pad;
    if (y + tipEl.offsetHeight + pad > window.innerHeight) y = window.innerHeight - tipEl.offsetHeight - pad;
    tipEl.style.left = `${Math.max(pad, x)}px`;
    tipEl.style.top = `${Math.max(pad, y)}px`;
  }
  function hideTip() {
    if (tipEl && tipEl.parentElement) tipEl.parentElement.removeChild(tipEl);
    tipEl = null;
    if (tipTarget) tipTarget.removeAttribute('aria-describedby');
    tipTarget = null;
    tipId = null;
  }
  document.addEventListener('mouseover', (e) => {
    const t = e.target.closest('[data-tooltip]');
    if (!t) return;
    showTip(t);
  }, true);
  document.addEventListener('mousemove', (e) => {
    if (!tipEl) return;
    const t = e.target.closest('[data-tooltip]');
    if (!t) { hideTip(); return; }
    positionTip(t);
  });
  document.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget || !e.relatedTarget.closest('[data-tooltip]')) hideTip();
  }, true);
  // Keyboard focus support
  document.addEventListener('focusin', (e) => {
    const t = e.target.closest('[data-tooltip]');
    if (!t) return;
    showTip(t);
  });
  document.addEventListener('focusout', (e) => {
    if (!e.relatedTarget || !e.relatedTarget.closest('[data-tooltip]')) hideTip();
  });
  window.addEventListener('resize', () => hideTip());
}

function enhanceHeadingsAndTOC() {
  const conteudo = document.getElementById("conteudo");
  const toc = document.getElementById("toc");
  const fab = document.getElementById('toc-fab');
  if (!conteudo || !toc) return;
  const headings = conteudo.querySelectorAll("h2, h3, h4");
  if (!headings.length) {
    setTocOpen(false);
    toc.innerHTML = "";
    if (fab) fab.classList.add('hidden');
    return;
  }
  if (fab) fab.classList.remove('hidden');
  setTocOpen(getTocInitialOpen());
  const items = [];
  // Build id prefix from current route for uniqueness
  let routePrefix = 'home';
  const hash = window.location.hash.replace(/^#/, '');
  if (hash.includes('=')) {
    const [k,v] = hash.split('=');
    if (v) routePrefix = `${k}-${v.replace(/[^a-z0-9_-]/ig,'')}`;
  }
  headings.forEach((h, idx) => {
    if (!h.id) {
      const slug = (h.textContent || `sec-${idx}`)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      h.id = `${routePrefix}-${slug || `sec-${idx}`}`;
    }
    items.push({ id: h.id, text: h.textContent || h.id, level: h.tagName });
  });
  toc.innerHTML = `
    <div class="flex items-center justify-between mb-2">
      <div class="toc-title">Nesta página</div>
      <button id="toc-close" class="text-slate-500 hover:text-slate-700" title="Fechar" aria-label="Fechar sumário">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <div class="toc-list"></div>
  `;
  const listEl = toc.querySelector('.toc-list');
  items.forEach((it) => {
    const a = document.createElement('a');
    a.href = `#${it.id}`;
    // Ícones no TOC com base em palavras-chave do título
    const label = it.text || '';
    const low = label.toLowerCase();
    let icon = '';
    if (/(plano|ementa)/.test(low)) icon = '🗂️ ';
    else if (/(introduç|introduc)/.test(low)) icon = '📘 ';
    else if (/(teoria|conceitos|fundamentos)/.test(low)) icon = '📚 ';
    else if (/(prátic|pratic|exemplo|exercício|exercicio|atividade)/.test(low)) icon = '🧪 ';
    else if (/ted/.test(low)) icon = '📝 ';
    else if (/(bibliografia|referênc|referenc)/.test(low)) icon = '🔎 ';
    a.innerHTML = `${icon}${label}`;
    a.className = 'block';
    listEl.appendChild(a);
  });
  const closeBtn = document.getElementById('toc-close');
  if (closeBtn) closeBtn.addEventListener('click', () => setTocOpen(false));
  // Scroll dentro do conteudo
  if (window.__TOC_CLICK_HANDLER) conteudo.removeEventListener('click', window.__TOC_CLICK_HANDLER);
  window.__TOC_CLICK_HANDLER = (e) => {
    const t = e.target;
    if (t && t.tagName === 'A' && t.getAttribute('href') && t.getAttribute('href').startsWith('#')) {
      const id = t.getAttribute('href').slice(1);
      const target = conteudo.querySelector(`#${CSS.escape(id)}`);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };
  conteudo.addEventListener('click', window.__TOC_CLICK_HANDLER);
  // Scrollspy
  const tocLinks = Array.from(listEl.querySelectorAll('a'));
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      const link = tocLinks.find((l) => l.getAttribute('href') === `#${id}`);
      if (link) {
        if (entry.isIntersecting) link.classList.add('active');
        else link.classList.remove('active');
      }
    });
  }, { root: null, threshold: 0.1 });
  headings.forEach((h) => obs.observe(h));
}

function buildAulaPrevNext(file) {
  const nav = document.getElementById('aula-nav');
  const prev = document.getElementById('aula-prev');
  const next = document.getElementById('aula-next');
  const meta = Array.isArray(window.__AULAS_META) ? window.__AULAS_META : [];
  const id = (file.split('/').pop() || file).replace(/\.html$/i, '');
  const idx = meta.findIndex((a) => (a.arquivo || '').replace(/\.html$/i, '') === id);
  if (idx === -1) { nav.classList.add('hidden'); return; }
  const prevMeta = meta[idx - 1];
  const nextMeta = meta[idx + 1];
  nav.classList.remove('hidden');
  if (prevMeta) {
    const prevId = (prevMeta.arquivo || '').replace(/\.html$/i, '');
    prev.href = `#aula=${encodeURIComponent(prevId)}`;
    prev.classList.remove('opacity-50','pointer-events-none');
    prev.removeAttribute('aria-disabled');
  } else {
    prev.href = '#';
    prev.classList.add('opacity-50','pointer-events-none');
    prev.setAttribute('aria-disabled','true');
  }
  if (nextMeta) {
    const nextId = (nextMeta.arquivo || '').replace(/\.html$/i, '');
    next.href = `#aula=${encodeURIComponent(nextId)}`;
    next.classList.remove('opacity-50','pointer-events-none');
    next.removeAttribute('aria-disabled');
  } else {
    next.href = '#';
    next.classList.add('opacity-50','pointer-events-none');
    next.setAttribute('aria-disabled','true');
  }
}

function markActiveRoute() {
  const sidebar = document.getElementById('sidebar-links');
  if (!sidebar) return;
  const links = sidebar.querySelectorAll('a[href^="#aula="], a[href^="#lista="]');
  links.forEach((a) => { a.classList.remove('link-active'); a.removeAttribute('aria-current'); });
  const hash = window.location.hash;
  const active = sidebar.querySelector(`a[href="${CSS.escape(hash)}"]`);
  if (active) { active.classList.add('link-active'); active.setAttribute('aria-current','page'); scrollActiveLinkIntoView(active); }
}

function scrollActiveLinkIntoView(link) {
  try {
    const aside = document.getElementById('sidebar');
    if (!aside || !link) return;
    const linkRect = link.getBoundingClientRect();
    const asideRect = aside.getBoundingClientRect();
    if (linkRect.top < asideRect.top || linkRect.bottom > asideRect.bottom) {
      link.scrollIntoView({ block: 'nearest' });
    }
  } catch(_){}
}

function updateDocumentTitleFromAula(doc) {
  const h1 = doc.querySelector('h1');
  const t = h1 ? h1.textContent.trim() : null;
  updateDocumentTitle(t ? `${APP_NOME_DISCIPLINA} - ${t}` : APP_NOME_DISCIPLINA);
}
function updateDocumentTitle(title) {
  if (title) document.title = title;
}

function showLoader() {
  const conteudo = document.getElementById('conteudo');
  if (!conteudo) return;
  conteudo.innerHTML = `<div class="space-y-3">
    <div class="h-10 rounded skeleton"></div>
    <div class="h-5 w-3/4 rounded skeleton"></div>
    <div class="h-40 rounded skeleton"></div>
    <div class="h-5 w-1/2 rounded skeleton"></div>
    <div class="h-48 rounded skeleton"></div>
  </div>`;
}
function hideLoader() { /* noop - conteudo será substituído depois */ }

function setupBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) btn.classList.remove('hidden');
    else btn.classList.add('hidden');
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Prefetch de próximas aulas para navegação mais fluida
function prefetchNextPrev(currentFile) {
  const meta = Array.isArray(window.__AULAS_META) ? window.__AULAS_META : [];
  const id = (currentFile.split('/').pop() || currentFile).replace(/\.html$/i, '');
  const idx = meta.findIndex((a) => (a.arquivo || '').replace(/\.html$/i, '') === id);
  if (idx === -1) return;
  const urls = [];
  if (meta[idx + 1]) urls.push(`aulas/${meta[idx + 1].arquivo}`);
  if (meta[idx - 1]) urls.push(`aulas/${meta[idx - 1].arquivo}`);
  urls.forEach((u) => fetch(u).catch(() => {}));
}

function setTocOpen(open) {
  const toc = document.getElementById('toc');
  const main = document.getElementById('main-root');
  const fab = document.getElementById('toc-fab');
  if (!toc || !main) return;
  if (open) {
    toc.classList.remove('hidden');
    main.classList.add('toc-open');
    if (fab) fab.setAttribute('aria-expanded', 'true');
  } else {
    toc.classList.add('hidden');
    main.classList.remove('toc-open');
    if (fab) fab.setAttribute('aria-expanded', 'false');
  }
  try { lsSet('tocOpen', String(!!open)); } catch (_) {}
}

function getTocInitialOpen() {
  try {
    const v = lsGet('tocOpen');
    if (v === null) return false; // padrão: fechado
    return v === 'true';
  } catch (_) {
    return false;
  }
}

function setupTOCToggle() {
  const fab = document.getElementById('toc-fab');
  const toc = document.getElementById('toc');
  if (!fab || !toc) return;
  fab.addEventListener('click', () => {
    const isHidden = toc.classList.contains('hidden');
    setTocOpen(isHidden);
  });
}

function setupCardsControls() {
  const chips = document.querySelectorAll('#controls-bar .filter-chip');
  const gridBtn = document.getElementById('view-grid');
  const listBtn = document.getElementById('view-list');
  const home = document.getElementById('home');
  const listas = document.getElementById('listas');
  const listStateChips = document.querySelectorAll('#lists-filters .filter-chip');

  // Filtro
  function applyFilter(mode) {
    chips.forEach((c) => {
      const active = c.getAttribute('data-filter') === mode;
      c.classList.toggle('active', active);
      c.setAttribute('aria-pressed', String(active));
    });
    if (mode === 'aulas') { if (home) home.classList.remove('hidden'); if (listas) listas.classList.add('hidden'); }
    else if (mode === 'listas') { if (home) home.classList.add('hidden'); if (listas) listas.classList.remove('hidden'); }
    else { if (home) home.classList.remove('hidden'); if (listas) listas.classList.remove('hidden'); }
    try { lsSet('cardsFilter', mode); } catch(_){}
  }
  const savedFilter = lsGet('cardsFilter') || 'all';
  applyFilter(savedFilter);
  chips.forEach((chip) => {
    chip.addEventListener('click', () => applyFilter(chip.getAttribute('data-filter')));
  });

  // List state filter
  function applyListStateFilter(mode) {
    listStateChips.forEach((c)=>{
      const active = c.getAttribute('data-list-filter')===mode;
      c.classList.toggle('active', active);
      c.setAttribute('aria-pressed', String(active));
    });
    lsSet('listFilter', mode);
    const listContainer = document.getElementById('listas-container');
    if (!listContainer) return;
    Array.from(listContainer.children).forEach((card) => {
      if (!(card instanceof HTMLElement)) return;
      const state = card.dataset.state || 'inprogress';
      const isNew = card.querySelector('[data-badge="new"]') ? true : false;
      let show = true;
      if (mode==='inprogress') show = state==='inprogress';
      else if (mode==='completed') show = state==='completed';
      else if (mode==='new') show = isNew;
      card.style.display = show ? '' : 'none';
    });
  }
  const savedListFilter = lsGet('listFilter') || 'all';
  applyListStateFilter(savedListFilter);
  listStateChips.forEach((chip)=> chip.addEventListener('click', ()=> applyListStateFilter(chip.getAttribute('data-list-filter'))));

  // Exibição
  function applyView(mode) {
    const isGrid = mode==='grid';
    const isList = mode==='list';
    gridBtn.classList.toggle('active', isGrid);
    listBtn.classList.toggle('active', isList);
    gridBtn.setAttribute('aria-pressed', String(isGrid));
    listBtn.setAttribute('aria-pressed', String(isList));
    const cards = document.getElementById('cards-container');
    const listCards = document.getElementById('listas-container');
    function setGrid(el, isGrid) {
      if (!el) return;
      el.classList.remove('md:grid-cols-1','lg:grid-cols-1','xl:grid-cols-1','2xl:grid-cols-1');
      el.classList.remove('md:grid-cols-2','lg:grid-cols-2','xl:grid-cols-3','2xl:grid-cols-4');
      if (isGrid) { el.classList.add('md:grid-cols-1','lg:grid-cols-2','xl:grid-cols-3','2xl:grid-cols-4'); }
      else { el.classList.add('md:grid-cols-1','lg:grid-cols-1','xl:grid-cols-1','2xl:grid-cols-1'); }
    }
    // Ajusta todas as grades de grupos de aulas
    if (cards) { cards.querySelectorAll('.group-grid').forEach((grid)=> setGrid(grid, mode==='grid')); }
    setGrid(listCards, mode==='grid');
    try { lsSet('viewMode', mode); } catch(_){}
  }
  const savedView = lsGet('viewMode') || 'grid';
  applyView(savedView);
  if (gridBtn) gridBtn.addEventListener('click', () => applyView('grid'));
  if (listBtn) listBtn.addEventListener('click', () => applyView('list'));
}

// Toast helper
function showToast(message) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = message;
  el.classList.remove('hidden');
  el.classList.add('show');
  setTimeout(()=> { el.classList.add('hidden'); el.classList.remove('show'); }, 2500);
}

function setupTheme() {
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  const hlLight = document.getElementById('hljs-theme-light');
  const hlDark = document.getElementById('hljs-theme-dark');

  function apply(theme) {
    const dark = theme === 'dark';
    root.classList.toggle('theme-dark', dark);
    if (btn) {
      btn.setAttribute('aria-pressed', String(dark));
      btn.innerHTML = dark
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
    }
    if (hlLight && hlDark) {
      hlLight.disabled = dark;
      hlDark.disabled = !dark;
    }
    try { lsSet('theme', theme); } catch(_){}
  }

  // Initial
  let theme = 'light';
  try {
    const saved = lsGet('theme');
    if (saved === 'dark' || saved === 'light') theme = saved;
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) theme = 'dark';
  } catch(_){}
  apply(theme);

  if (btn) {
    btn.addEventListener('click', () => {
      theme = (theme === 'dark') ? 'light' : 'dark';
      apply(theme);
      if (window.hljs) { try { window.hljs.highlightAll(); } catch(_){} }
    });
  }
}
