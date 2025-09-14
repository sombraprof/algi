<template>
  <div id="update-banner" class="hidden fixed left-0 right-0 bottom-0 z-50">
    <div class="mx-auto max-w-4xl m-3 p-3 rounded-lg border shadow-elevation-2 bg-surface-light-50 dark:bg-surface-dark-50 border-neutral-200 dark:border-neutral-700">
      <div class="flex flex-col md:flex-row md:items-center gap-3 justify-between">
        <div class="text-body-small text-neutral-800 dark:text-neutral-200">
          <strong>Atualização disponível:</strong> Uma nova versão do site foi instalada.
        </div>
        <div class="flex items-center gap-2">
          <button id="update-reload" class="btn btn-filled text-sm">Atualizar agora</button>
          <button id="update-later" class="btn btn-outlined text-sm">Depois</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default { name: 'GlobalUpdateBanner' };
</script>

<style scoped>
</style>

