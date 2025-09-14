<template>
  <div :class="containerClass" role="status">
    <i :class="[appliedIcon, 'mr-2']"></i>
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'GlobalAlert',
  props: {
    text: { type: String, required: true },
    variant: { type: String, default: 'info' }, // info | warning | success | error
    icon: { type: String, default: '' }
  },
  computed: {
    appliedIcon() {
      if (this.icon) return this.icon;
      const map = {
        info: 'fa-solid fa-circle-info',
        warning: 'fa-solid fa-triangle-exclamation',
        success: 'fa-solid fa-circle-check',
        error: 'fa-solid fa-triangle-exclamation'
      };
      return map[this.variant] || map.info;
    },
    containerClass() {
      const base = 'p-4 rounded-lg border text-body-medium';
      const variants = {
        info: 'bg-info-50 border-info-200 text-neutral-800 dark:bg-primary-900/20 dark:border-primary-700/40 dark:text-neutral-100',
        warning: 'bg-warning-50 border-warning-200 text-neutral-800 dark:bg-warning-900/20 dark:border-warning-700/40 dark:text-neutral-100',
        success: 'bg-success-50 border-success-200 text-neutral-800 dark:bg-success-900/20 dark:border-success-700/40 dark:text-neutral-100',
        error: 'bg-error-50 border-error-200 text-neutral-800 dark:bg-error-900/20 dark:border-error-700/40 dark:text-neutral-100'
      };
      return `${base} ${variants[this.variant] || variants.info}`;
    }
  }
}
</script>

<style scoped>
</style>
