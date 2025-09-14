// MD3 Custom Elements to reuse within static aula HTML

class MD3Video extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || '';
    const src = this.getAttribute('src') || '';
    const allow = this.getAttribute('allow') || 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    const allowFullscreen = 'allowfullscreen';
    this.innerHTML = `
      <div class="card p-4">
        ${title ? `<h3 class=\"font-semibold text-lg text-primary-800 mb-2\">${title}</h3>` : ''}
        <div class="aspect-video w-full">
          <iframe class="w-full h-full rounded-xl" src="${src}" title="${title}" frameborder="0" allow="${allow}" ${allowFullscreen}></iframe>
        </div>
      </div>
    `;
  }
}

class MD3CodeTest extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || 'Teste seu Código Aqui';
    const src = this.getAttribute('src') || 'https://www.onlinegdb.com/online_c_compiler';
    this.innerHTML = `
      <div class="card p-4 mb-8">
        <h3 class="font-bold text-lg text-primary-800 mb-2">${title}</h3>
        <div class="w-full aspect-video">
          <iframe src="${src}" class="w-full h-full rounded" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
    `;
  }
}

class MD3Callout extends HTMLElement {
  connectedCallback() {
    const variant = this.getAttribute('variant') || 'info';
    const title = this.getAttribute('title') || '';
    const body = this.innerHTML;
    const map = {
      info: 'callout callout-info',
      success: 'callout callout-success',
      danger: 'callout callout-danger',
      academic: 'callout callout-academic',
      good: 'callout callout-good-practice'
    };
    const cls = map[variant] || map.info;
    this.innerHTML = `
      <div class="${cls}">
        ${title ? `<h5 class=\"font-bold mb-2\">${title}</h5>` : ''}
        <div>${body}</div>
      </div>
    `;
  }
}

function setupCopyCode() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.copy-code-btn');
    if (!btn) return;
    const container = btn.closest('.card, div, section') || document;
    const pre = container.querySelector('pre, code');
    const text = pre?.innerText || '';
    if (text) {
      navigator.clipboard?.writeText(text);
      if (window.__showSnackbar) window.__showSnackbar('Código copiado');
    }
  });
}

customElements.define('md3-video', MD3Video);
customElements.define('md3-code-test', MD3CodeTest);
customElements.define('md3-callout', MD3Callout);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupCopyCode);
} else {
  setupCopyCode();
}
