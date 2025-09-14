import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useFiltersStore = defineStore('filters', () => {
  const currentFilter = ref('all');
  const currentViewMode = ref('grid');

  const setFilter = (filter) => {
    currentFilter.value = filter;
  };

  const setViewMode = (mode) => {
    currentViewMode.value = mode;
  };

  return {
    currentFilter,
    currentViewMode,
    setFilter,
    setViewMode
  };
});