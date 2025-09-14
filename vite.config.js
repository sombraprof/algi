import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      devOptions: { enabled: false },
      selfDestroying: true,
      manifest: {
        name: 'Curso – Instituição',
        short_name: 'Curso',
        description: 'Materiais, aulas e listas da disciplina.',
        theme_color: '#1976d2',
        background_color: '#fafafa',
        icons: [
          { src: './imagens/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' },
          { src: './imagens/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: './imagens/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' }
        ]
      }
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    host: '0.0.0.0',
    hmr: {
      clientPort: 5173
    }
  }
});
