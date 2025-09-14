<template>
  <!-- Generic MD3 section container -->
  <section :id="id" :class="sectionClass">
    <header v-if="hasHeader" class="section__header" :class="{ 'fade-slide-in': animate }">
      <h2 v-if="title" class="section__title" :class="titleClass">{{ title }}</h2>
      <p v-if="subtitle" class="section__subtitle" :class="subtitleClass">{{ subtitle }}</p>
      <div v-if="divider" class="section__divider"></div>
    </header>
    <div>
      <slot />
    </div>
  </section>
</template>

<script>
// Reusable block for page sections (lists, lessons, etc.)
export default {
  name: 'SectionBlock',
  props: {
    id: { type: String, default: '' },
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    tight: { type: Boolean, default: false },
    animate: { type: Boolean, default: false },
    divider: { type: Boolean, default: false },
    titleClass: { type: String, default: '' },
    subtitleClass: { type: String, default: '' },
    class: { type: String, default: '' }
  },
  computed: {
    hasHeader() { return !!(this.title || this.subtitle); },
    sectionClass() {
      const base = this.tight ? 'section--tight' : 'section';
      return [base, this.class].filter(Boolean).join(' ');
    }
  }
}
</script>

<style scoped>
/* Styling comes from global utilities in style.css */
</style>
