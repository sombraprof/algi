<template>
  <div class="flex justify-center py-12">
    <div class="card p-6 flex items-center gap-4" role="status" aria-live="polite">
      <span class="inline-flex h-12 w-12 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin"></span>
      <div class="text-left">
        <p class="text-title-medium font-semibold text-neutral-900 dark:text-neutral-100">{{ title }}</p>
        <p v-if="subtitle" class="text-body-medium text-neutral-600 dark:text-neutral-300">{{ subtitle }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalLoader',
  props: {
    title: {
      type: String,
      default: 'Carregando...'
    },
    subtitle: {
      type: String,
      default: ''
    }
  }
}
</script>
