import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import App from '../App.vue';
import router from './core/router.js';
import '/style.css';
import { registerSW } from 'virtual:pwa-register';
import './web/md3-elements.js';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

// Use Pinia
app.use(pinia);

// Use Vue Router
app.use(router);

// Mount the app
app.mount('#app');

// Register PWA and wire update banner
try {
  const showUpdateBanner = () => {
    const banner = document.getElementById('update-banner');
    const btnReload = document.getElementById('update-reload');
    const btnLater = document.getElementById('update-later');
    if (!banner) return;
    banner.classList.remove('hidden');
    if (btnReload) btnReload.onclick = () => {
      if (window.__showSnackbar) window.__showSnackbar('Atualizando...');
      try { sessionStorage.setItem('sw-updated', '1'); } catch (_) {}
      updateSW(true);
    };
    if (btnLater) btnLater.onclick = () => banner.classList.add('hidden');
  };

  const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() { showUpdateBanner(); },
    onOfflineReady() {
      if (window.__showSnackbar) window.__showSnackbar('Pronto para usar offline');
    }
  });
} catch (_) {
  // PWA not available in dev or plugin disabled
}

// Show post-reload notice if applicable
try {
  if (sessionStorage.getItem('sw-updated') === '1') {
    sessionStorage.removeItem('sw-updated');
    if (window.__showSnackbar) window.__showSnackbar('Atualizado — recarregado');
  }
} catch (_) {}
