<template>
  <router-link
    :to="`/lista/${lista.id}`"
    class="relative z-0 block card card--interactive cursor-pointer"
    :data-list-id="lista.id"
    :aria-label="`Lista ${lista.title}`"
  >
    <div class="flex flex-col items-start gap-2">
      <div class="badge self-end badge--secondary">
        <i class="flex-shrink-0 fa-solid fa-list"></i>
        <span class="leading-none">Exercícios</span>
      </div>
      <h3 class="font-bold text-title-large text-primary-800 dark:text-primary-200 mb-2">{{ lista.title }}</h3>
    </div>
    <p class="text-body-medium text-neutral-700 dark:text-neutral-300 mb-3">{{ lista.description }}</p>
    <div class="text-label-small text-neutral-600 dark:text-neutral-400 mb-1">{{ progressText }}</div>
    <div class="progress" role="progressbar" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100">
      <div class="progress__bar progress__bar--secondary" :style="{ width: progress + '%' }"></div>
    </div>
  </router-link>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeUnmount, watch } from 'vue';

export default defineComponent({
  name: 'ListaCard',
  props: {
    lista: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const progress = ref(0);
    const progressText = ref('Progresso não iniciado');

    const safeParseJson = (value, fallback) => {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : fallback;
      } catch (_) {
        return fallback;
      }
    };

    const readTotal = (id) => {
      if (typeof window === 'undefined' || !window.localStorage) return 0;
      try {
        const raw = localStorage.getItem(`lista_${id}_total`);
        if (!raw) return 0;
        const total = parseInt(raw, 10);
        return Number.isFinite(total) && total > 0 ? total : 0;
      } catch (_) {
        return 0;
      }
    };

    const refreshProgress = () => {
      if (!props.lista?.id || typeof window === 'undefined' || !window.localStorage) {
        progress.value = 0;
        progressText.value = 'Progresso não iniciado';
        return;
      }
      const baseKey = `lista_${props.lista.id}`;
      const completedRaw = safeParseJson(localStorage.getItem(`${baseKey}_completed`) || '[]', []);
      const done = completedRaw.length;
      const total = readTotal(props.lista.id);
      if (total > 0) {
        const ratio = Math.min(done / total, 1);
        progress.value = Math.round(ratio * 100);
        progressText.value = `${done} de ${total} exercícios concluídos`;
      } else if (done > 0) {
        progress.value = 0;
        progressText.value = `${done} exercícios concluídos`;
      } else {
        progress.value = 0;
        progressText.value = 'Progresso não iniciado';
      }
    };

    const handleStorage = (event) => {
      if (!event?.key || !props.lista?.id) return;
      const targetPrefix = `lista_${props.lista.id}`;
      if (event.key === `${targetPrefix}_completed` || event.key === `${targetPrefix}_total`) {
        refreshProgress();
      }
    };

    onMounted(() => {
      refreshProgress();
      if (typeof window !== 'undefined') {
        window.addEventListener('storage', handleStorage);
      }
    });

    onBeforeUnmount(() => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', handleStorage);
      }
    });

    watch(() => props.lista?.id, () => refreshProgress(), { immediate: true });

    return {
      progress,
      progressText
    };
  }
});
</script>

<style scoped>
</style>