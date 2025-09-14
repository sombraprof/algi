<template>
  <div>
    <!-- Lessons Section -->
    <SectionBlock v-if="currentFilter !== 'listas'" id="home" title="Aulas" :animate="true" :divider="true">
      <div id="cards-container" class="space-y-8">
        <div v-if="loading" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <GlobalAlert class="mt-2 inline-block text-left" text="Carregando aulas..." variant="info" />
        </div>
        <GlobalAlert
          v-else-if="Object.keys(groupedAulasView).length === 0 && (currentFilter === 'all' || currentFilter === 'aulas')"
          text="Nenhuma aula encontrada."
          variant="info"
          class="text-center"
        />
        <div v-else v-for="(group, groupName) in groupedAulasView" :key="groupName" class="space-y-4">
          <h3 class="group-title section__subtitle">{{ groupName }}</h3>
          <div class="group-grid relative z-0 grid-cards anim-cards">
            <AulaCard v-for="aula in group" :key="aula.id" :aula="aula" />
          </div>
        </div>
      </div>
    </SectionBlock>

    <!-- Exercise Lists Section -->
    <SectionBlock v-if="currentFilter !== 'aulas'" id="listas" title="Lista de Exercícios" :tight="true" :animate="true" :divider="true">
      <div id="listas-container" class="grid-cards anim-cards">
        <div v-if="loading" class="text-center py-8 col-span-full">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <GlobalAlert class="mt-2 inline-block text-left" text="Carregando listas..." variant="info" />
        </div>
        <GlobalAlert
          v-else-if="listasView.length === 0 && (currentFilter === 'all' || currentFilter === 'listas')"
          text="Nenhuma lista encontrada."
          variant="info"
          class="col-span-full text-center"
        />
        <ListaCard v-for="lista in listasView" :key="lista.id" :lista="lista" />
      </div>
    </SectionBlock>
  </div>
</template>

<script>
import { computed, onMounted, watch } from 'vue';
import { useBranding } from '../js/core/branding.js';
import { useFiltersStore } from '../stores/filters.js';
import { storeToRefs } from 'pinia';
import { useDataStore } from '../stores/data.js';
import AulaCard from '../components/AulaCard.vue';
import ListaCard from '../components/ListaCard.vue';
import GlobalAlert from '../components/GlobalAlert.vue';
import SectionBlock from '../components/SectionBlock.vue';

export default {
  name: 'HomeView',
  components: {
    AulaCard,
    ListaCard,
    SectionBlock,
    GlobalAlert
  },
  setup() {
    const { branding } = useBranding();
    const filtersStore = useFiltersStore();
    const { currentFilter, currentViewMode } = storeToRefs(filtersStore);
    const dataStore = useDataStore();

    const applyStagger = () => {
      // Stagger por grupo (aulas) e por item
      const groupGrids = document.querySelectorAll('.group-grid');
      groupGrids.forEach((grid, gIdx) => {
        const children = Array.from(grid.children);
        children.forEach((el, i) => el.style.setProperty('--d', `${gIdx * 120 + i * 40}ms`));
      });
      // Listas container (sem grupos)
      const listas = document.getElementById('listas-container');
      if (listas) {
        Array.from(listas.children).forEach((el, i) => el.style.setProperty('--d', `${i * 40}ms`));
      }
    };

    const applyViewMode = () => {
      const containers = document.querySelectorAll('.group-grid, #listas-container');
      containers.forEach(container => {
        container.classList.add('layout-fade');
        const isList = currentViewMode.value === 'list';
        if (isList) {
          container.classList.remove('grid-cards');
          container.classList.add('grid', 'grid-cols-1', 'gap-6');
        } else {
          container.classList.remove('grid', 'grid-cols-1', 'gap-6');
          container.classList.add('grid-cards');
        }
        setTimeout(() => container.classList.remove('layout-fade'), 200);
      });
      applyStagger();
    };

    onMounted(() => {
      dataStore.loadData();
      applyViewMode();
      applyStagger();
    });

    // Reagir ao modo de exibição
    watch(currentViewMode, () => {
      applyViewMode();
    });

    // Animação suave ao mudar filtros (Tudo/Aulas/Exercícios)
    watch(currentFilter, () => {
      // desativa overrides legacy quando em listas
      const root = document.documentElement;
      if (currentFilter.value === 'listas') root.classList.remove('legacy-md2');
      const containers = document.querySelectorAll('.group-grid, #listas-container');
      containers.forEach(container => {
        container.classList.add('layout-fade');
        setTimeout(() => container.classList.remove('layout-fade'), 200);
      });
      applyStagger();
    });

    // Dados derivados (filtro aplicado no nível da view)
    const groupedAulasView = computed(() => {
      if (currentFilter.value === 'listas') return {};
      const groups = {};
      dataStore.aulas.forEach((aula) => {
        const unit = aula.unidade || 'Aulas';
        if (!groups[unit]) groups[unit] = [];
        groups[unit].push(aula);
      });
      return groups;
    });

    const listasView = computed(() => {
      if (currentFilter.value === 'aulas') return [];
      return dataStore.listas;
    });

    return {
      branding,
      loading: dataStore.loading,
      groupedAulasView,
      listasView,
      currentFilter
    };
  }
}
</script>

<style scoped>
/* Removed header-button and dropdown-item styles */
</style>
