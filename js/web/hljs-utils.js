export function rehighlightSafe() {
  if (!window.hljs) return;
  try {
    document.querySelectorAll('pre code').forEach((el) => {
      try { el.classList.remove('hljs'); } catch (_) {}
      try { if (el.dataset && 'highlighted' in el.dataset) delete el.dataset.highlighted; } catch (_) {}
    });
    window.hljs.highlightAll();
  } catch (_) {}
}

