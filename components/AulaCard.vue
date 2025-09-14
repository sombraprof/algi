<template>
  <router-link
    :to="`/aula/${aula.id}`"
    :class="[
      'relative z-0 block card cursor-pointer',
      aula.ativo ? 'card--interactive' : 'card--disabled cursor-not-allowed pointer-events-none'
    ]"
    :aria-disabled="!aula.ativo ? 'true' : 'false'"
    :tabindex="aula.ativo ? 0 : -1"
    :aria-label="aula.title + (aula.ativo ? '' : ' indisponível')"
  >
    <div class="flex flex-col items-start gap-2">
      <span class="badge self-end" :class="aula.status === 'available' ? 'badge--success' : 'badge--warning'">
        <i :class="['flex-shrink-0', aula.status === 'available' ? 'fa-solid fa-circle' : 'fa-regular fa-clock']"></i>
        <span class="leading-none">{{ aula.status === 'available' ? 'Disponível' : 'Em breve' }}</span>
      </span>
      <h3
        class="font-bold text-title-large mb-2"
        :class="aula.ativo ? 'text-primary-800 dark:text-primary-200' : 'text-neutral-700 dark:text-neutral-300'"
      >
        {{ aula.title }}
      </h3>
    </div>
    <p
      class="text-body-medium"
      :class="aula.ativo ? 'text-neutral-700 dark:text-neutral-300' : 'text-disabled'"
    >
      {{ aula.description }}
    </p>
  </router-link>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AulaCard',
  props: {
    aula: {
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
