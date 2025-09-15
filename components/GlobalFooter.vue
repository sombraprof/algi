<template>
  <footer
    class="mt-auto border-t bg-surface-light-50 dark:bg-surface-dark-50 border-neutral-200 dark:border-neutral-700 py-2 sm:py-3 shadow-elevation-1"
    :style="{ borderColor: 'var(--panel-border)' }"
    role="contentinfo"
  >
    <div class="h-full max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-center sm:justify-between gap-3 sm:gap-4 min-w-0 flex-nowrap">
      <div
        class="text-body-small text-neutral-700 dark:text-neutral-300 min-w-0 truncate cursor-help"
        :title="branding.nomeDisciplina + ' • ' + branding.nomeProfessor"
        :aria-label="branding.nomeDisciplina + ' — ' + branding.nomeProfessor"
      >
        <span>© {{ year }}</span>
        <span class="hidden sm:inline"> • {{ branding.nomeDisciplina }} • {{ branding.nomeProfessor }}</span>
      </div>
      <nav class="flex items-center gap-2 sm:gap-4 text-label-small sm:text-label-medium flex-nowrap">
        <router-link
          to="/politica"
          :class="[
            'px-2 py-1 rounded-md transition-colors inline-flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-primary-400',
            isPolitica ?
              'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-700/40' :
              'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
          ]"
          aria-label="Política de Uso"
        >
          <i class="fa-solid fa-file-lines"></i>
          <span class="hidden sm:inline">Política de Uso</span>
        </router-link>
        <a
          href="https://github.com/sombraprof/algi"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors focus-visible:ring-2 focus-visible:ring-primary-400 rounded-md"
          aria-label="Repositório no GitHub"
        >
          <i class="fa-brands fa-github"></i>
          <span class="hidden sm:inline">GitHub</span>
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
