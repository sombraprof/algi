import hljs from 'highlight.js';

export function rehighlightSafe() {
  try {
    document.querySelectorAll('pre code').forEach((el) => {
      try { el.classList.remove('hljs'); } catch (_) {}
      try { if (el.dataset && 'highlighted' in el.dataset) delete el.dataset.highlighted; } catch (_) {}
    });
    hljs.highlightAll();
  } catch (_) {}
}
