<template>
  <footer
    class="mt-auto border-t bg-surface-light-50 dark:bg-surface-dark-50 border-neutral-200 dark:border-neutral-700 py-4"
    role="contentinfo"
  >
    <div class="h-full max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
      <div class="text-body-small text-neutral-700 dark:text-neutral-300">
        © {{ year }} {{ branding.nomeDisciplina }} • {{ branding.nomeProfessor }}
      </div>
      <nav class="flex items-center gap-4 text-label-medium">
        <router-link
          to="/politica"
          :class="[
            'px-2 py-1 rounded-md transition-colors',
            isPolitica ?
              'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-700/40' :
              'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
          ]"
          aria-label="Política de Uso"
        >
          Política de Uso
        </router-link>
        <a
          href="https://github.com/sombraprof/algi"
          target="_blank"
          rel="noopener noreferrer"
          class="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
          aria-label="Repositório no GitHub"
        >
          GitHub
        </a>
      </nav>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useBranding } from '../js/core/branding.js';

export default {
  name: 'GlobalFooter',
  setup() {
    const { branding } = useBranding();
    const year = computed(() => new Date().getFullYear());
    // Active state for Política link
    const route = useRoute?.() || null;
    const isPolitica = computed(() => route ? route.path === '/politica' : false);
    return { branding, year, isPolitica };
  }
}
</script>

<style scoped>
</style>
