// Enhances interactive elements inside loaded aula HTML

export function enhanceAulaContent(root) {
  if (!root) return;

  // Accordions: .accordion-toggle controls nearest following .accordion-content
  try {
    const toggles = root.querySelectorAll('.accordion-toggle');
    toggles.forEach((btn) => {
      // ensure proper aria
      btn.setAttribute('aria-controls', btn.id ? btn.id + '-panel' : '');
      btn.setAttribute('aria-expanded', 'false');
      const container = btn.closest('.card, div, section') || root;
      const panel = container.querySelector('.accordion-content');
      if (!panel) return;
      panel.style.maxHeight = '0px';
      panel.setAttribute('hidden', '');
      panel.setAttribute('role', 'region');

      btn.addEventListener('click', () => {
        const isOpen = panel.hasAttribute('hidden') === false;
        if (isOpen) {
          panel.style.maxHeight = '0px';
          panel.setAttribute('hidden', '');
          btn.setAttribute('aria-expanded', 'false');
          try { btn.querySelector('.transform')?.classList.remove('rotate-180'); } catch (_) {}
        } else {
          panel.removeAttribute('hidden');
          const h = panel.scrollHeight;
          panel.style.maxHeight = h + 'px';
          btn.setAttribute('aria-expanded', 'true');
          try { btn.querySelector('.transform')?.classList.add('rotate-180'); } catch (_) {}
        }
      });
    });
  } catch (_) {}

  // Video placeholders: upgrade empty .aspect-video to iframe only for known video hosts
  try {
    const containers = root.querySelectorAll('.aspect-video');
    containers.forEach((box) => {
      const hasMedia = box.querySelector('iframe, video, embed, object');
      if (hasMedia) return;
      let src = box.getAttribute('data-src')
        || box.dataset?.src
        || box.querySelector('a[href^="http"]')?.getAttribute('href')
        || box.parentElement?.querySelector('a[href^="http"]')?.getAttribute('href');
      const toPrivacySrc = (url) => {
        try {
          const u = new URL(url, window.location.href);
          if (/youtube\.com$/i.test(u.hostname) || /youtu\.be$/i.test(u.hostname)) {
            if (u.hostname.includes('youtu.be')) {
              const id = u.pathname.replace(/^\//, '');
              return `https://www.youtube-nocookie.com/embed/${id}`;
            }
            return url.replace('www.youtube.com', 'www.youtube-nocookie.com').replace('youtube.com', 'youtube-nocookie.com');
          }
          return url;
        } catch (_) { return url; }
      };
      if (src) src = toPrivacySrc(src);
      if (!src) return;
      // Only embed if source is a supported video host (YouTube/Vimeo)
      try {
        const u = new URL(src, window.location.href);
        const host = u.hostname;
        const isYouTube = /youtube\.com$/i.test(host) || /youtu\.be$/i.test(host) || host.includes('youtube-nocookie');
        const isVimeo = /vimeo\.com$/i.test(host) || host.includes('player.vimeo.com');
        if (!(isYouTube || isVimeo)) return;
      } catch (_) { return; }
      const titleEl = box.closest('.card')?.querySelector('h3, h4, h5');
      const title = titleEl?.textContent?.trim() || 'Vídeo';
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', src);
      iframe.setAttribute('title', title);
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('loading', 'lazy');
      iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      box.appendChild(iframe);
    });
  } catch (_) {}

  // Add copy buttons to code blocks
  try {
    const pres = root.querySelectorAll('pre > code');
    pres.forEach((code) => {
      const pre = code.parentElement;
      if (!pre || pre.dataset.enhancedCopy === '1') return;
      pre.dataset.enhancedCopy = '1';
      const wrapper = document.createElement('div');
      wrapper.className = 'code-block relative';
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-code-btn btn btn-icon btn-tonal absolute top-2 right-2';
      btn.setAttribute('aria-label', 'Copiar código');
      btn.setAttribute('title', 'Copiar código');
      btn.innerHTML = '<i class="fa-solid fa-copy"></i>';
      wrapper.appendChild(btn);
      btn.addEventListener('click', async () => {
        try {
          const text = code.innerText || '';
          if (text) await navigator.clipboard?.writeText(text);
          if (window.__showSnackbar) window.__showSnackbar('Código copiado');
        } catch (_) {}
      }, { passive: true });
    });
  } catch (_) {}

  // Normalize markdown-like **tokens** to <code-text> outside of code blocks
  try {
    const candidates = root.querySelectorAll('p, li, h4, h5, h6, span, div');
    const rx = /\*\*([A-Za-zÀ-ÿ0-9_.,;:()\/\\\-\s]{1,40})\*\*/g;
    candidates.forEach((el) => {
      if (el.closest('pre, code')) return;
      if (!el.innerHTML || el.childElementCount > 0) {
        // still attempt if innerHTML contains ** and replacements are safe
        if (el.innerHTML && el.innerHTML.includes('**')) {
          el.innerHTML = el.innerHTML.replace(rx, '<code-text>$1</code-text>');
        }
        return;
      }
      if (el.textContent.includes('**')) {
        el.innerHTML = el.innerHTML.replace(rx, '<code-text>$1</code-text>');
      }
    });
  } catch (_) {}
}
