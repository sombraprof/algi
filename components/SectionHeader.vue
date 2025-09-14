<template>
  <div class="flex items-center gap-3 mb-4">
    <i v-if="icon" :class="icon"></i>
    <h3 class="section__subtitle" :class="titleClass">{{ title }}</h3>
  </div>
</template>

<script>
// Reusable section header (MD3 subtitle scale) with optional leading icon
export default {
  name: 'SectionHeader',
  props: {
    title: { type: String, required: true },
    icon: { type: String, default: '' },
    titleClass: { type: String, default: '' }
  }
}
</script>

<style scoped>
/* No extra styles; uses global utilities (section__subtitle) */
</style>

