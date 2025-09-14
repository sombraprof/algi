<template>
  <div>
    <!-- Page Header (will be global from App.vue) -->
    <!-- <PageHeader :pageTitle="lista.title" /> -->

    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      <GlobalAlert class="mt-2 inline-block text-left" text="Carregando lista..." variant="info" />
    </div>
    <GlobalAlert v-else-if="error" :text="error" variant="error" icon="fa-solid fa-triangle-exclamation" />
    <div v-else>
      <p class="text-body-large text-neutral-700 dark:text-neutral-300 mb-8 pt-6">{{ lista.description }}</p>

      <div class="space-y-6">
        <div v-for="(exercise, index) in lista.exercises" :key="index" class="bg-surface-light-50 dark:bg-surface-dark-50 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-elevation-1">
          <div class="p-6">
            <div class="font-semibold text-title-medium text-neutral-900 dark:text-neutral-100">{{ exercise.id }}.</div>
            <div class="mt-2 text-body-medium text-neutral-800 dark:text-neutral-200" v-html="exercise.content"></div>
          </div>
          <div class="border-t border-neutral-200 dark:border-neutral-700">
            <button
              @click="toggleAccordion(index)"
              class="accordion-toggle btn btn-tonal w-full justify-between text-left"
              :aria-expanded="exercise.showSolution ? 'true' : 'false'"
              :aria-controls="`solution-panel-${index}`"
            >
              <span>Mostrar Solução</span>
              <span class="transform transition-transform duration-300" :class="exercise.showSolution ? 'rotate-180' : ''">▼</span>
            </button>
            <div
              class="accordion-content overflow-hidden bg-neutral-900 dark:bg-neutral-800 text-neutral-100 mono text-body-small"
              :style="{ maxHeight: exercise.showSolution ? '500px' : '0px' }"
              :id="`solution-panel-${index}`"
              role="region"
            >
              <div class="p-4">
                <pre><code class="language-c">{{ exercise.solution }}</code></pre>
              </div>
            </div>
          </div>
          <!-- Exercise completion status -->
          <div class="p-4 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800">
            <p class="text-label-medium text-neutral-700 dark:text-neutral-300">Status: {{ exercise.completed ? 'Concluído' : 'Pendente' }}</p>
            <button
              @click="toggleExercise(index)"
              class="mt-3 btn btn-filled"
            >
              {{ exercise.completed ? 'Marcar como pendente' : 'Marcar como concluído' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Progress summary -->
      <div class="mt-8 p-6 bg-surface-light-100 dark:bg-surface-dark-100 rounded-2xl border border-neutral-200 dark:border-neutral-700">
        <h3 class="section__subtitle mb-3">Progresso</h3>
        <div class="text-body-medium text-neutral-700 dark:text-neutral-300 mb-3">
          {{ completedCount }} de {{ lista.exercises.length }} exercícios concluídos
        </div>
        <div class="progress" role="progressbar" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100">
          <div class="progress__bar progress__bar--primary" :style="{ width: progress + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import DOMPurify from 'dompurify';
import GlobalAlert from '../components/GlobalAlert.vue';
// import PageHeader from '../components/PageHeader.vue'; // Removed

export default {
  name: 'ListaView',
  components: { GlobalAlert },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const route = useRoute();
    const loading = ref(true);
    const error = ref(null);
    const lista = ref({
      title: '',
      description: '',
      exercises: []
    });

    const loadLista = async (listaId) => {
      try {
        loading.value = true;
        error.value = null;

        const response = await fetch(`listas/${listaId}.json`);
        if (!response.ok) {
          throw new Error('Lista não encontrada');
        }

        const data = await response.json();

        // Process exercises
        const processedExercises = (data.questoes || []).map((q, index) => ({
          id: q.id || (index + 1),
          title: `Questão ${q.id || (index + 1)}`,
          content: renderMarkdown(q.enunciado || ''),
          solution: q.solucao || '',
          completed: false, // Will be loaded from storage
          showSolution: false // For accordion functionality
        }));

        lista.value = {
          title: data.titulo || `Lista ${listaId}`,
          description: data.descricao || '',
          exercises: processedExercises
        };

        // Load completion status from storage
        loadCompletionStatus();

        // Mark as visited
        if (window.localStorage) {
          const visited = JSON.parse(localStorage.getItem('visited_lista') || '[]');
          if (!visited.includes(listaId)) {
            visited.push(listaId);
            localStorage.setItem('visited_lista', JSON.stringify(visited));
          }
        }

        // Trigger syntax highlighting if available
        if (window.hljs) {
          setTimeout(() => {
            window.hljs.highlightAll();
          }, 100);
        }

      } catch (err) {
        error.value = err.message;
        console.error('Error loading lista:', err);
      } finally {
        loading.value = false;
      }
    };

    const renderMarkdown = (md) => {
      if (!md) return '';
      const html = String(md)
        .replace(/&/g, '&')
        .replace(/</g, '<')
        .replace(/>/g, '>')
        .replace(/`([^`]+)`/g, (_, code) => `<code class="bg-neutral-200 dark:bg-neutral-700 px-1 py-0.5 rounded text-sm">${code}</code>`)
        .replace(/\n/g, '<br/>');
      return DOMPurify.sanitize(html);
    };

    const loadCompletionStatus = () => {
      if (!window.localStorage) return;

      const completed = JSON.parse(localStorage.getItem(`lista_${route.params.id}_completed`) || '[]');
      lista.value.exercises.forEach((exercise, index) => {
        exercise.completed = completed.includes(exercise.id);
      });
    };

    const saveCompletionStatus = () => {
      if (!window.localStorage) return;

      const completed = lista.value.exercises
        .filter(ex => ex.completed)
        .map(ex => ex.id);

      localStorage.setItem(`lista_${route.params.id}_completed`, JSON.stringify(completed));
    };

    const toggleExercise = (index) => {
      if (lista.value.exercises[index]) {
        lista.value.exercises[index].completed = !lista.value.exercises[index].completed;
        saveCompletionStatus();
      }
    };

    const toggleAccordion = (index) => {
      if (lista.value.exercises[index]) {
        lista.value.exercises[index].showSolution = !lista.value.exercises[index].showSolution;
      }
    };

    const completedCount = computed(() => {
      return lista.value.exercises.filter(ex => ex.completed).length;
    });

    const progress = computed(() => {
      if (lista.value.exercises.length === 0) return 0;
      return Math.round((completedCount.value / lista.value.exercises.length) * 100);
    });

    onMounted(() => {
      const listaId = props.id || route.params.id;
      if (listaId) {
        loadLista(listaId);
      } else {
        error.value = 'ID da lista não fornecido';
        loading.value = false;
      }
    });

    return {
      loading,
      error,
      lista,
      toggleExercise,
      toggleAccordion,
      completedCount,
      progress,
      renderMarkdown,
      loadCompletionStatus,
      saveCompletionStatus
    };
  }
}
</script>

<style scoped>
/* Scoped styles for ListaView */
</style>
