<template>
  <div id="shortcut-modal" class="fixed inset-0 z-50 hidden" role="dialog" aria-modal="true" aria-labelledby="shortcut-title">
    <div class="absolute inset-0 bg-black/50" @click="hide"></div>
    <div class="relative mx-auto mt-24 w-[90%] max-w-md bg-surface-light-50 dark:bg-surface-dark-50 rounded-2xl shadow-elevation-2 border border-neutral-200 dark:border-neutral-700 p-6">
      <div class="flex items-center justify-between mb-3">
        <h3 id="shortcut-title" class="text-title-medium font-semibold text-neutral-900 dark:text-neutral-100">Atalhos do Teclado</h3>
        <button id="shortcut-close" class="btn btn-outlined text-sm" aria-label="Fechar" @click="hide">Fechar</button>
      </div>
      <ul class="text-body-medium text-neutral-700 dark:text-neutral-300 space-y-2">
        <li><kbd class="px-1 py-0.5 bg-neutral-200 dark:bg-neutral-700 rounded text-label-small">t</kbd> — Alternar tema claro/escuro</li>
        <li><kbd class="px-1 py-0.5 bg-neutral-200 dark:bg-neutral-700 rounded text-label-small">?</kbd> — Mostrar esta ajuda</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalShortcutModal',
  methods: {
    hide() {
      const el = document.getElementById('shortcut-modal');
      if (el) el.classList.add('hidden');
    }
  }
}
</script>

<style scoped>
</style>

