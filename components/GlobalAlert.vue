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
      const variantClass = {
        info: 'alert alert--info',
        warning: 'alert alert--warning',
        success: 'alert alert--success',
        error: 'alert alert--error'
      }[this.variant] || 'alert alert--info';
      return variantClass;
    }
  }
}
</script>

<style scoped>
</style>
