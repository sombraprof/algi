import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const theme = ref('light');
  const isDark = ref(false);

  const applyTheme = (newTheme) => {
    const dark = newTheme === 'dark';
    isDark.value = dark;
    theme.value = newTheme;

    const root = document.documentElement;
    root.classList.toggle('theme-dark', dark);

    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.setAttribute('aria-pressed', String(dark));
      btn.innerHTML = dark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    }

    const hlLight = document.getElementById('hljs-theme-light');
    const hlDark = document.getElementById('hljs-theme-dark');
    if (hlLight && hlDark) {
      hlLight.disabled = dark;
      hlDark.disabled = !dark;
    }
  };

  const toggleTheme = () => {
    const newTheme = theme.value === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);

    // Re-highlight code if hljs is available
    if (window.hljs) {
      try {
        window.hljs.highlightAll();
      } catch (_) {}
    }
  };

  // Watch for theme changes and apply them
  watch(theme, (newTheme) => {
    applyTheme(newTheme);
  }, { immediate: true });

  return {
    theme,
    isDark,
    toggleTheme,
    applyTheme
  };
}, {
  persist: {
    key: 'theme',
    storage: localStorage,
  }
});