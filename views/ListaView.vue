<template>
  <div class="lista-view space-y-10">
    <GlobalLoader
      v-if="loading"
      title="Carregando lista"
      subtitle="Estamos preparando os exercícios..."
    />

    <GlobalAlert
      v-else-if="error"
      :text="error"
      variant="error"
      icon="fa-solid fa-triangle-exclamation"
    />

    <div v-else class="space-y-12">
      <section class="card p-8 space-y-6 shadow-elevation-2">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <router-link
              class="inline-flex items-center gap-2 text-primary-700 dark:text-primary-300 text-label-large hover:underline"
              to="/"
            >
              <i class="fa-solid fa-arrow-left-long text-sm"></i>
              <span>Voltar para aulas e listas</span>
            </router-link>
            <h1 class="mt-4 text-display-small font-semibold text-neutral-900 dark:text-neutral-100">
              {{ header.title }}
            </h1>
            <p class="mt-3 text-body-large text-neutral-700 dark:text-neutral-300 max-w-3xl">
              {{ header.description }}
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-4 text-label-large text-neutral-600 dark:text-neutral-300">
            <span class="inline-flex items-center gap-2">
              <i class="fa-solid fa-list-check text-primary-600"></i>
              {{ header.totalExercises }} exercícios
            </span>
            <span class="inline-flex items-center gap-2">
              <i class="fa-solid fa-clock text-primary-600"></i>
              Progresso salvo neste dispositivo
            </span>
          </div>
        </div>
      </section>

      <section class="grid gap-6 md:grid-cols-3">
        <div class="card p-6 shadow-elevation-1 md:col-span-2 flex flex-col gap-6 bg-primary-50 dark:bg-primary-900/20">
          <div class="flex flex-wrap justify-between gap-4 items-center">
            <div>
              <h2 class="text-title-medium font-semibold text-neutral-900 dark:text-neutral-100">
                Seu progresso
              </h2>
              <p class="text-body-medium text-neutral-600 dark:text-neutral-300">
                {{ completedCount }} de {{ header.totalExercises }} exercícios concluídos
              </p>
            </div>
            <button
              class="btn btn-text text-neutral-600 dark:text-neutral-300 hover:text-neutral-800"
              type="button"
              @click="resetProgress"
            >
              <i class="fa-solid fa-rotate-left flex-shrink-0"></i>
              Limpar progresso
            </button>
          </div>
          <div class="progress" role="presentation">
            <div
              class="progress__bar progress__bar--primary"
              :style="{ width: progress + '%' }"
            ></div>
          </div>
          <p class="text-body-small text-neutral-500 dark:text-neutral-400">
            Marque as atividades à medida que concluir. Você pode filtrar apenas as pendentes abaixo.
          </p>
        </div>
        <div class="card p-6 shadow-elevation-1 flex flex-col gap-4">
          <h2 class="text-title-medium font-semibold text-neutral-900 dark:text-neutral-100">
            Filtros rápidos
          </h2>
          <div class="flex flex-wrap gap-3">
            <button
              v-for="option in filterOptions"
              :key="option.value"
              class="btn"
              :class="filterClass(option.value)"
              type="button"
              @click="statusFilter = option.value"
            >
              <i :class="[option.icon, 'flex-shrink-0']"></i>
              {{ option.label }}
            </button>
          </div>
          <label class="w-full">
            <span class="sr-only">Buscar por palavra-chave</span>
            <div class="flex items-center gap-3 px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-surface-light-50 dark:bg-surface-dark-50 focus-within:border-primary-400 focus-within:ring-1 focus-within:ring-primary-400">
              <i class="fa-solid fa-magnifying-glass text-neutral-500 dark:text-neutral-300"></i>
              <input
                v-model="searchTerm"
                class="flex-1 bg-transparent border-0 focus:outline-none text-body-medium text-neutral-700 dark:text-neutral-200 placeholder:text-neutral-500 dark:placeholder:text-neutral-500"
                type="search"
                placeholder="Buscar por palavra-chave"
                autocomplete="off"
              />
            </div>
          </label>
        </div>
      </section>

      <section class="space-y-6">
        <transition name="fade" mode="out-in">
          <GlobalAlert
            v-if="visibleExercises.length === 0"
            key="empty"
            text="Nenhum exercício encontrado com os filtros atuais."
            variant="info"
            icon="fa-regular fa-circle-question"
          />
          <div v-else key="grid" class="space-y-6">
            <article
              v-for="exercise in visibleExercises"
              :key="exercise.uid"
              :class="[
                'card p-6 shadow-elevation-1 transition-transform duration-150 lista-card',
                { 'lista-card--done': exercise.completed }
              ]"
            >
              <header class="flex flex-wrap justify-between gap-4 items-start">
                <div class="space-y-2">
                  <div class="inline-flex items-center gap-2">
                    <span class="badge" :class="exercise.completed ? 'badge--success' : 'badge--secondary'">
                      <i :class="exercise.completed ? 'fa-solid fa-check' : 'fa-regular fa-circle'" class="text-sm"></i>
                      <span class="leading-none">Questão {{ exercise.id }}</span>
                    </span>
                    <span v-if="exercise.hasHint" class="text-label-small text-neutral-500 dark:text-neutral-400">
                      Dica disponível
                    </span>
                  </div>
                  <h3 class="text-title-medium font-semibold text-neutral-900 dark:text-neutral-100">
                    {{ exercise.title }}
                  </h3>
                </div>
                <button
                  type="button"
                  class="btn btn-outlined"
                  @click="toggleCompletion(exercise)"
                >
                  <i :class="[exercise.completed ? 'fa-solid fa-rotate-left' : 'fa-solid fa-check', 'flex-shrink-0']"></i>
                  {{ exercise.completed ? 'Marcar como pendente' : 'Marcar como concluída' }}
                </button>
              </header>

              <div v-html="exercise.statementHtml" class="mt-4 md3-content text-body-medium text-neutral-700 dark:text-neutral-200"></div>

              <transition name="fade">
                <div
                  v-if="exercise.showHint && exercise.hasHint"
                  class="mt-6 callout callout-info space-y-2"
                >
                  <h4 class="callout__title text-title-small font-semibold text-primary-700 dark:text-primary-200">
                    Sugestão de abordagem
                  </h4>
                  <p v-html="exercise.hintHtml" class="text-body-medium text-neutral-700 dark:text-neutral-200"></p>
                </div>
              </transition>

              <transition name="fade">
                <div
                  v-if="exercise.showSolution"
                  class="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden"
                >
                  <header class="flex items-center justify-between px-6 py-4 bg-neutral-900 text-neutral-100">
                    <span class="font-semibold">Solução em C</span>
                    <button
                      class="btn btn-text btn-text--light"
                      type="button"
                      @click="copySolution(exercise)"
                    >
                      <i class="fa-solid fa-copy flex-shrink-0"></i>
                      Copiar
                    </button>
                  </header>
                  <div class="bg-neutral-900 text-neutral-100">
                    <pre class="overflow-auto p-6 text-sm" tabindex="0"><code class="language-c">{{ exercise.solution }}</code></pre>
                  </div>
                </div>
              </transition>

              <div class="mt-6 flex flex-wrap gap-3">
                <button
                  v-if="exercise.hasHint"
                  class="btn btn-tonal"
                  type="button"
                  @click="toggleHint(exercise)"
                >
                  <i class="fa-regular fa-lightbulb flex-shrink-0"></i>
                  {{ exercise.showHint ? 'Ocultar dica' : 'Ver dica' }}
                </button>
                <button
                  class="btn btn-filled"
                  type="button"
                  @click="toggleSolution(exercise)"
                >
                  <i :class="['fa-solid', exercise.showSolution ? 'fa-eye-slash' : 'fa-eye', 'flex-shrink-0']"></i>
                  {{ exercise.showSolution ? 'Ocultar solução' : 'Ver solução' }}
                </button>
              </div>
            </article>
          </div>
        </transition>
      </section>
    </div>
  </div>
</template>

<script>
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import DOMPurify from 'dompurify';
import GlobalAlert from '../components/GlobalAlert.vue';
import GlobalLoader from '../components/GlobalLoader.vue';
import { rehighlightSafe } from '../js/web/hljs-utils.js';

const FILTERS = [
  { value: 'all', label: 'Tudo', icon: 'fa-solid fa-layer-group' },
  { value: 'pending', label: 'Pendentes', icon: 'fa-regular fa-circle' },
  { value: 'completed', label: 'Concluídas', icon: 'fa-solid fa-check' }
];

export default {
  name: 'ListaView',
 components: { GlobalAlert, GlobalLoader },
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
    const header = reactive({ id: '', title: '', description: '', totalExercises: 0 });
    const exercises = ref([]);
    const statusFilter = ref('all');
    const searchTerm = ref('');

    const filterOptions = FILTERS;

    const sanitize = (value) => DOMPurify.sanitize(String(value || ''), {
      SAFE_FOR_TEMPLATES: true,
      ADD_TAGS: ['code-text']
    });

    const buildStatement = (text) => {
      if (!text) return '';
      const trimmed = String(text).trim();
      if (!trimmed) return '';

      const htmlParts = [];
      let isFirstBlock = true;

      const formatInline = (value) => value
        .replace(/`([^`]+)`/g, '<code-text>$1</code-text>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br />');

      const pushParagraphs = (section) => {
        const paragraphs = section.split(/\n{2,}/g);
        paragraphs.forEach((paragraph) => {
          const segment = paragraph.trim();
          if (!segment) return;
          const content = formatInline(segment);
          const classAttr = isFirstBlock ? '' : ' class="mt-3"';
          htmlParts.push(`<p${classAttr}>${content}</p>`);
          isFirstBlock = false;
        });
      };

      const escapeCode = (code) => code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      const blockRegex = /```(\w+)?\n([\s\S]*?)```/g;
      let lastIndex = 0;
      let match;

      while ((match = blockRegex.exec(trimmed)) !== null) {
        const before = trimmed.slice(lastIndex, match.index);
        if (before.trim()) pushParagraphs(before);

        const lang = (match[1] || 'plaintext').trim().toLowerCase();
        const code = escapeCode(match[2].replace(/\s+$/g, ''));
        const snippetClass = isFirstBlock ? 'code-snippet code-snippet--first' : 'code-snippet';
        const languageClass = lang ? `language-${lang}` : 'language-plaintext';
        htmlParts.push(`<pre class="${snippetClass}"><code class="${languageClass}">${code}</code></pre>`);
        isFirstBlock = false;
        lastIndex = match.index + match[0].length;
      }

      const remaining = trimmed.slice(lastIndex);
      if (remaining.trim()) pushParagraphs(remaining);

      return htmlParts.join('');
    };

    const buildExercise = (raw, index) => {
      const id = raw.id || index + 1;
      const title = raw.titulo || `Questão ${id}`;
      const statementHtml = sanitize(buildStatement(raw.enunciado || ''));
      const hintText = raw.dica ? String(raw.dica).trim() : '';
      const hasHint = hintText.length > 0;
      const hintHtml = hasHint ? sanitize(buildStatement(hintText)) : '';
      return {
        uid: `${header.id}-${id}`,
        id,
        title,
        statementHtml,
        hintHtml,
        hasHint,
        solution: raw.solucao || '',
        searchText: `${title} ${raw.enunciado || ''} ${hintText}`.toLowerCase(),
        completed: false,
        showHint: false,
        showSolution: false
      };
    };

    const storageKey = computed(() => (header.id ? `lista_${header.id}_completed` : ''));

    const loadCompletion = () => {
      if (!storageKey.value || !window.localStorage) return;
      const stored = JSON.parse(localStorage.getItem(storageKey.value) || '[]');
      exercises.value.forEach((exercise) => {
        exercise.completed = stored.includes(exercise.id);
      });
    };

    const saveCompletion = () => {
      if (!storageKey.value || !window.localStorage) return;
      const done = exercises.value.filter((ex) => ex.completed).map((ex) => ex.id);
      localStorage.setItem(storageKey.value, JSON.stringify(done));
    };

    const toggleCompletion = (exercise) => {
      exercise.completed = !exercise.completed;
      saveCompletion();
    };

    const toggleHint = (exercise) => {
      if (!exercise.hasHint) return;
      exercise.showHint = !exercise.showHint;
    };

    const toggleSolution = async (exercise) => {
      exercise.showSolution = !exercise.showSolution;
      if (exercise.showSolution) {
        await nextTick();
        setTimeout(() => rehighlightSafe(), 30);
      }
    };

    const copySolution = async (exercise) => {
      try {
        await navigator.clipboard?.writeText(exercise.solution || '');
        if (window.__showSnackbar) window.__showSnackbar('Solução copiada');
      } catch (err) {
        console.error('Failed to copy solution', err);
      }
    };

    const resetProgress = () => {
      exercises.value.forEach((exercise) => {
        exercise.completed = false;
      });
      saveCompletion();
    };

    const filterClass = (value) => (statusFilter.value === value ? 'btn-filled' : 'btn-tonal');

    const visibleExercises = computed(() => {
      const query = searchTerm.value.trim().toLowerCase();
      return exercises.value.filter((exercise) => {
        if (statusFilter.value === 'completed' && !exercise.completed) return false;
        if (statusFilter.value === 'pending' && exercise.completed) return false;
        if (query && !exercise.searchText.includes(query)) return false;
        return true;
      });
    });

    const completedCount = computed(() => exercises.value.filter((ex) => ex.completed).length);
    const progress = computed(() => {
      if (!header.totalExercises) return 0;
      return Math.round((completedCount.value / header.totalExercises) * 100);
    });

    const loadLista = async (listaId) => {
      try {
        loading.value = true;
        error.value = null;
        header.id = listaId;

        const response = await fetch(`${import.meta.env.BASE_URL}listas/${listaId}.json`);
        if (!response.ok) {
          throw new Error('Lista de exercícios não encontrada.');
        }

        const data = await response.json();
        header.title = data.titulo || `Lista ${listaId}`;
        header.description = data.descricao || 'Coleção de desafios práticos em C.';
        header.totalExercises = Array.isArray(data.questoes) ? data.questoes.length : 0;

        const processed = Array.isArray(data.questoes)
          ? data.questoes.map((q, index) => buildExercise(q, index))
          : [];

        exercises.value = processed;
        if (window.localStorage) {
          try { localStorage.setItem(`lista_${listaId}_total`, header.totalExercises); } catch (_) {}
        }
        loadCompletion();

        setTimeout(() => rehighlightSafe(), 60);
      } catch (err) {
        console.error(err);
        error.value = err.message || 'Erro ao carregar a lista.';
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      const listaId = props.id || route.params.id;
      if (listaId) {
        loadLista(listaId);
      } else {
        error.value = 'ID da lista não informado.';
        loading.value = false;
      }
    });

    watch(
      () => props.id,
      (newId) => {
        if (newId && newId !== header.id) {
          loadLista(newId);
        }
      }
    );

    return {
      loading,
      error,
      header,
      filterOptions,
      statusFilter,
      searchTerm,
      filterClass,
      visibleExercises,
      toggleCompletion,
      toggleHint,
      toggleSolution,
      copySolution,
      resetProgress,
      completedCount,
      progress
    };
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
.btn-text--light { color: inherit; }
.lista-card {
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.lista-card--done {
  background-color: var(--success-soft-bg);
  border-color: var(--success-soft-border);
}

.code-snippet {
  margin-top: 1.5rem;
  background-color: var(--code-bg);
  color: var(--code-fg);
  padding: 1rem 1.25rem;
  border-radius: 1rem;
  overflow: auto;
  font-size: 0.95rem;
  line-height: 1.5;
}

.code-snippet code {
  display: block;
  white-space: pre;
}

.code-snippet--first {
  margin-top: 0;
}
</style>