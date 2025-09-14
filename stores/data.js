import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import aulasData from '../aulas/aulas.json';
import listasData from '../listas/listas.json';

// Process data immediately
const processAulas = () => {
  window.__AULAS_META = aulasData;

  const groups = {};
  aulasData.forEach((aula) => {
    const unit = aula.unidade || 'Aulas';
    if (!groups[unit]) groups[unit] = [];
    groups[unit].push(aula);
  });

  const flatAulas = [];
  Object.keys(groups).sort((a, b) => a.localeCompare(b, 'pt')).forEach(unit => {
    groups[unit].forEach((aula) => {
      const id = (aula.arquivo || "").replace(/\.html$/i, "");
      flatAulas.push({
        id,
        title: aula.titulo,
        description: aula.descricao,
        status: aula.ativo ? 'available' : 'soon',
        unidade: unit,
        ativo: aula.ativo
      });
    });
  });
  return flatAulas;
};

const processListas = () => {
  window.__LISTAS_META = listasData;
  return listasData.map((lista) => {
    const id = (lista.arquivo || "").replace(/\.json$/i, "");
    return {
      id,
      title: lista.titulo,
      description: lista.descricao,
      progress: 0,
      progressText: 'Carregando progresso...'
    };
  });
};

export const useDataStore = defineStore('data', () => {
  const loading = ref(false);
  const aulas = ref(processAulas());
  const listas = ref(processListas());

  const filteredAulas = ref([...aulas.value]);
  const filteredListas = ref([...listas.value]);

  const groupedFilteredAulas = computed(() => {
    const groups = {};
    filteredAulas.value.forEach((aula) => {
      const unit = aula.unidade || 'Aulas';
      if (!groups[unit]) groups[unit] = [];
      groups[unit].push(aula);
    });
    return groups;
  });

  const applyFilters = (currentFilter) => {
    if (currentFilter === 'all') {
      filteredAulas.value = [...aulas.value];
      filteredListas.value = [...listas.value];
    } else if (currentFilter === 'aulas') {
      filteredAulas.value = [...aulas.value];
      filteredListas.value = [];
    } else if (currentFilter === 'listas') {
      filteredAulas.value = [];
      filteredListas.value = [...listas.value];
    }
  };

  const loadData = () => {
    // Data is already loaded
    loading.value = false;
  };

  return {
    loading,
    aulas,
    listas,
    filteredAulas,
    filteredListas,
    groupedFilteredAulas,
    applyFilters,
    loadData
  };
});