import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

const processAulas = (aulasData) => {
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

const processListas = (listasData) => {
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
  const loading = ref(true);
  const error = ref(null);
  const aulas = ref([]);
  const listas = ref([]);

  const filteredAulas = ref([]);
  const filteredListas = ref([]);

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

  const loadData = async () => {
    if (aulas.value.length > 0 && listas.value.length > 0) {
      loading.value = false;
      return;
    }

    try {
      loading.value = true;
      error.value = null;

      const [aulasResponse, listasResponse] = await Promise.all([
        fetch('aulas/aulas.json'),
        fetch('listas/listas.json')
      ]);

      if (!aulasResponse.ok) throw new Error('Falha ao carregar aulas.');
      if (!listasResponse.ok) throw new Error('Falha ao carregar listas.');

      const aulasData = await aulasResponse.json();
      const listasData = await listasResponse.json();

      aulas.value = processAulas(aulasData);
      listas.value = processListas(listasData);

      filteredAulas.value = [...aulas.value];
      filteredListas.value = [...listas.value];

    } catch (err) {
      console.error("Failed to load data store:", err);
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    aulas,
    listas,
    filteredAulas,
    filteredListas,
    groupedFilteredAulas,
    applyFilters,
    loadData
  };
});
