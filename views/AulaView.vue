<template>
  <div>
    <!-- Page Header (will be global from App.vue) -->
    <!-- <PageHeader :pageTitle="aulaTitle" /> -->

    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      <GlobalAlert class="mt-2 inline-block text-left" text="Carregando aula..." variant="info" />
    </div>
    <GlobalAlert v-else-if="error" :text="error" variant="error" icon="fa-solid fa-triangle-exclamation" />
    <div v-else>
      <div v-html="aulaContent" class="prose max-w-none pt-6"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import DOMPurify from 'dompurify';
import GlobalAlert from '../components/GlobalAlert.vue';
// import PageHeader from '../components/PageHeader.vue'; // Will be removed

export default {
  name: 'AulaView',
  components: { GlobalAlert },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const loading = ref(true);
    const error = ref(null);
    const aulaContent = ref('');
    const aulaTitle = ref('Aula');

    const loadAula = async (aulaId) => {
      try {
        loading.value = true;
        error.value = null;

        const aula = window.__AULAS_META.find(a => a.id === aulaId);

        if (!aula) {
          throw new Error('Aula não encontrada');
        }

        aulaTitle.value = aula.titulo;

        // Fetch the HTML content of the aula file
        const response = await fetch(`aulas/${aula.arquivo}`);
        if (!response.ok) {
          throw new Error(`Falha ao carregar o arquivo da aula: ${aula.arquivo}`);
        }
        const rawHtml = await response.text();
        aulaContent.value = DOMPurify.sanitize(rawHtml);

        // Mark as visited
        if (window.localStorage) {
          const visited = JSON.parse(localStorage.getItem('visited_aula') || '[]');
          if (!visited.includes(aulaId)) {
            visited.push(aulaId);
            localStorage.setItem('visited_aula', JSON.stringify(visited));
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
        console.error('Error loading aula:', err);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      loadAula(props.id);
    });

    // Watch for route changes to reload content
    watch(() => props.id, (newId) => {
      if (newId) {
        loadAula(newId);
      }
    });

    return {
      loading,
      error,
      aulaContent,
      aulaTitle
    };
  }
}
</script>

<style scoped>
/* Scoped styles for AulaView */
</style>
