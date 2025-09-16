import lightThemeCss from 'highlight.js/styles/github.css?inline';
import darkThemeCss from 'highlight.js/styles/github-dark.css?inline';

const LIGHT_ID = 'hljs-theme-light';
const DARK_ID = 'hljs-theme-dark';

function ensureStyle(id, cssText, disabled = false) {
  let styleEl = document.getElementById(id);
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = id;
    styleEl.textContent = cssText;
    document.head.appendChild(styleEl);
  }
  styleEl.disabled = disabled;
  return styleEl;
}

export function ensureHighlightThemes(initialDark = false) {
  const light = ensureStyle(LIGHT_ID, lightThemeCss, initialDark);
  const dark = ensureStyle(DARK_ID, darkThemeCss, !initialDark);
  dark.disabled = !initialDark;
  light.disabled = initialDark;
}

export function toggleHighlightTheme(isDark) {
  const light = document.getElementById(LIGHT_ID);
  const dark = document.getElementById(DARK_ID);
  if (!light || !dark) return;
  light.disabled = isDark;
  dark.disabled = !isDark;
}
