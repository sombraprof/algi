<template>
  <router-link
    :to="`/lista/${lista.id}`"
    class="relative z-0 block card card--interactive cursor-pointer"
    :data-list-id="lista.id"
    :aria-label="`Lista ${lista.title}`"
  >
    <div class="flex flex-col items-start gap-2">
      <div class="badge self-end badge--secondary">
        <i class="flex-shrink-0 fa-solid fa-list"></i>
        <span class="leading-none">Exercícios</span>
      </div>
      <h3 class="font-bold text-title-large text-primary-800 dark:text-primary-200 mb-2">{{ lista.title }}</h3>
    </div>
    <p class="text-body-medium text-neutral-700 dark:text-neutral-300 mb-3">{{ lista.description }}</p>
    <div class="text-label-small text-neutral-600 dark:text-neutral-400 mb-1">{{ lista.progressText }}</div>
    <div class="progress" role="progressbar" :aria-valuenow="lista.progress" aria-valuemin="0" aria-valuemax="100">
      <div class="progress__bar progress__bar--secondary" :style="{ width: lista.progress + '%' }"></div>
    </div>
  </router-link>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListaCard',
  props: {
    lista: {
      type: Object,
      required: true
    }
  },
  setup() {
    // Composition API setup - no additional logic needed for this component
    return {};
  }
});
</script>

<style scoped>
</style>
