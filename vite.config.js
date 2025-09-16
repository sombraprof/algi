import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/algi/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg', 'imagens/icon.svg', 'imagens/icon-192.png', 'imagens/icon-512.png'],
      devOptions: { enabled: false },
      selfDestroying: true,
      manifest: {
        name: 'Curso – Instituição',
        short_name: 'Curso',
        description: 'Materiais, aulas e listas da disciplina.',
        theme_color: '#1976d2',
        background_color: '#fafafa',
        icons: [
          { src: 'imagens/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' },
          { src: 'imagens/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'imagens/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' }
        ]
      }
    })
  ],
  server: {
    host: '0.0.0.0',
    hmr: {
      clientPort: 5173
    }
  }
});
