<template>
  <header class="sticky top-0 z-50 py-2 border-b shadow-elevation-1 bg-surface-light-50 dark:bg-surface-dark-50 border-neutral-200 dark:border-neutral-700" role="banner">
    <div class="flex items-center justify-between px-4">
      <!-- Branding -->
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center flex-shrink-0">
          <i class="fa-solid fa-graduation-cap text-primary-700 dark:text-primary-300 text-lg"></i>
        </div>
        <div>
          <h1 class="text-title-medium font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">
            {{ branding.nomeDisciplina }}
          </h1>
          <p class="text-body-small text-neutral-600 dark:text-neutral-400">
            {{ branding.nomeProfessor }}
          </p>
        </div>
      </div>

      <!-- Controls (Back, Filters, Policy, Theme) -->
      <div class="flex items-center gap-2">
        <!-- Back Button (visible on non-home routes) -->
        <router-link v-if="$route.path !== '/'" to="/" class="btn btn-outlined-primary" aria-label="Voltar para página inicial">
          <i class="fa-solid fa-arrow-left text-sm"></i>
          <span>Voltar</span>
        </router-link>

        <!-- Filtros/Exibição (segmented, MD3) -->
        <div v-if="$route.path === '/'" class="flex items-center gap-2">
          <Md3Segmented
            :options="[
              { label: 'Tudo', value: 'all' },
              { label: 'Aulas', value: 'aulas' },
              { label: 'Exercícios', value: 'listas' },
            ]"
            v-model="currentFilter"
            aria-label="Filtrar conteúdo"
          />
          <Md3Segmented
            :options="[
              { label: 'Grade', value: 'grid', icon: 'fa-solid fa-table-cells-large' },
              { label: 'Lista', value: 'list', icon: 'fa-solid fa-list' },
            ]"
            v-model="currentViewMode"
            aria-label="Modo de exibição"
          />
        </div>

        

        <!-- Theme Toggle (last) -->
        <button id="theme-toggle" @click="toggleTheme" class="btn btn-icon btn-tonal" :title="isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'" aria-pressed="false" aria-label="Alternar tema">
          <i :class="['fa-solid', isDark ? 'fa-sun' : 'fa-moon', 'text-lg']"></i>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useBranding } from '../js/core/branding.js';
import { useThemeStore } from '../stores/theme.js';
import { useFiltersStore } from '../stores/filters.js';
import Md3Segmented from './Md3Segmented.vue';

export default {
  name: 'GlobalHeader',
  components: { Md3Segmented },
  setup() {
    const { branding } = useBranding();
    const themeStore = useThemeStore();
    const filtersStore = useFiltersStore();
    const { currentFilter, currentViewMode } = storeToRefs(filtersStore);

    return {
      branding,
      isDark: themeStore.isDark,
      toggleTheme: themeStore.toggleTheme,
      currentFilter,
      currentViewMode,
      
    };
  }
}
</script>

<style scoped>
</style>
