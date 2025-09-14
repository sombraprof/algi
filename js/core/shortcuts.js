
import { onMounted, onUnmounted } from 'vue';

export function useShortcuts() {
  const shortcuts = {
    't': () => {
      // Toggle theme
      const themeToggle = document.getElementById('theme-toggle');
      if (themeToggle) themeToggle.click();
    },
    '?': () => {
      // Toggle shortcuts modal
      const shortcutModal = document.getElementById('shortcut-modal');
      if (shortcutModal) {
        shortcutModal.classList.toggle('hidden');
      }
    }
  };

  const handleKeydown = (event) => {
    // Only handle shortcuts when not typing in input fields
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
      return;
    }

    const key = event.key.toLowerCase();
    if (shortcuts[key]) {
      event.preventDefault();
      shortcuts[key]();
    }
  };

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown);
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown);
  });

  return {
    shortcuts
  };
}
