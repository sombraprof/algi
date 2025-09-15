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

    const hlLight = document.getElementById('hljs-theme-light');
    const hlDark = document.getElementById('hljs-theme-dark');
    if (hlLight && hlDark) {
      hlLight.disabled = dark;
      hlDark.disabled = !dark;
    }

    // Update browser UI theme color for mobile
    try {
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', dark ? '#121212' : '#1976d2');
    } catch (_) {}
  };

  const toggleTheme = () => {
    const newTheme = theme.value === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  };

  // Watch for theme changes and apply them
  watch(theme, (newTheme) => {
    applyTheme(newTheme);
  }, { immediate: true });

  // Initialize theme based on saved value or system preference
  try {
    const saved = localStorage.getItem('theme');
    if (!saved) {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    }
  } catch (_) {}

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
