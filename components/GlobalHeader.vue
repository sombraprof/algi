<template>
  <header class="sticky top-0 z-50 py-2 border-b shadow-elevation-1 bg-surface-light-50 dark:bg-surface-dark-50 border-neutral-200 dark:border-neutral-700" role="banner">
    <div class="flex items-center justify-between px-4">
      <!-- Branding -->
      <div class="flex items-center gap-3 min-w-0">
        <div
          class="w-9 h-9 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center flex-shrink-0 cursor-help"
          :title="branding.nomeDisciplina + ' • ' + branding.nomeProfessor"
          :aria-label="branding.nomeDisciplina + ' — ' + branding.nomeProfessor"
        >
          <i class="fa-solid fa-graduation-cap text-primary-700 dark:text-primary-300 text-lg"></i>
        </div>
        <div :class="['truncate', isAula ? 'block' : 'hidden sm:block']">
          <template v-if="isAula">
            <h1 class="text-title-medium font-semibold text-neutral-900 dark:text-neutral-100 leading-tight truncate" aria-current="page">{{ aulaHeader }}</h1>
          </template>
          <template v-else>
            <h1 class="text-title-medium font-semibold text-neutral-900 dark:text-neutral-100 leading-tight truncate">
              {{ branding.nomeDisciplina }}
            </h1>
            <p class="text-body-small text-neutral-600 dark:text-neutral-400 truncate">
              {{ branding.nomeProfessor }}
            </p>
          </template>
        </div>
      </div>

      <!-- Controls (Back, Filters, Policy, Theme) -->
      <div class="flex items-center gap-2 min-w-0">
        <!-- Back Button (visible on non-home routes) -->
        <router-link v-if="$route.path !== '/'" to="/" class="btn btn-outlined-primary" aria-label="Voltar para página inicial">
          <i class="fa-solid fa-arrow-left text-sm"></i>
          <span>Voltar</span>
        </router-link>

        

        <!-- Filtros/Exibição (segmented, MD3) -->
        <div v-if="$route.path === '/'" class="flex items-center gap-2 min-w-0 max-w-[60vw] overflow-x-auto">
          <Md3Segmented
            class="segmented--dense segmented--nowrap segmented--hide-label-xs"
            :options="[
              { label: 'Tudo', value: 'all', icon: 'fa-solid fa-layer-group' },
              { label: 'Aulas', value: 'aulas', icon: 'fa-solid fa-book-open' },
              { label: 'Exercícios', value: 'listas', icon: 'fa-solid fa-list-check' },
            ]"
            v-model="currentFilter"
            aria-label="Filtrar conteúdo"
          />
          <Md3Segmented
            class="segmented--dense segmented--nowrap segmented--hide-label-xs"
            :options="[
              { label: 'Grade', value: 'grid', icon: 'fa-solid fa-table-cells-large' },
              { label: 'Lista', value: 'list', icon: 'fa-solid fa-list' },
            ]"
            v-model="currentViewMode"
            aria-label="Modo de exibição"
          />
        </div>

        

        <!-- Theme Toggle (last) -->
        <button id="theme-toggle" @click="toggleTheme" class="btn btn-icon btn-tonal flex-shrink-0" :title="isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'" aria-pressed="false" aria-label="Alternar tema">
          <i :class="['fa-solid', isDark ? 'fa-sun' : 'fa-moon', 'text-lg']"></i>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
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
    const route = useRoute();

    const isAula = computed(() => route.path.startsWith('/aula/'));
    const aulaHeader = computed(() => {
      const id = route.params?.id || '';
      const match = String(id).match(/(\d+)/);
      return match ? `Aula ${match[1]}` : 'Aula';
    });

    return {
      branding,
      isDark: themeStore.isDark,
      toggleTheme: themeStore.toggleTheme,
      currentFilter,
      currentViewMode,
      isAula,
      aulaHeader,
      
    };
  }
}
</script>

<style scoped>
</style>
