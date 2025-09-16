<template>
  <div>
    <!-- Page Header (will be global from App.vue) -->
    <!-- <PageHeader :pageTitle="aulaTitle" /> -->

    <GlobalLoader
      v-if="loading"
      title="Carregando aula"
      subtitle="Preparando o conteúdo..."
    />
    <GlobalAlert v-else-if="error" :text="error" variant="error" icon="fa-solid fa-triangle-exclamation" />
    <div v-else>
      <div
        v-html="aulaContent"
        class="md3-content pt-6"
      ></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import DOMPurify from 'dompurify';
import GlobalAlert from '../components/GlobalAlert.vue';
import GlobalLoader from '../components/GlobalLoader.vue';
import { rehighlightSafe } from '../js/web/hljs-utils.js';
import { enhanceAulaContent } from '../js/web/aula-enhance.js';
// import PageHeader from '../components/PageHeader.vue'; // Will be removed

export default {
  name: 'AulaView',
  components: { GlobalAlert, GlobalLoader },
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
    const aulaModules = import.meta.glob('/public/aulas/*.html', { as: 'raw' });

    const loadAula = async (aulaId) => {
      try {
        loading.value = true;
        error.value = null;

        // First, fetch the metadata file
        const metaResponse = await fetch(`${import.meta.env.BASE_URL}aulas/aulas.json`);
        if (!metaResponse.ok) throw new Error('Não foi possível carregar o índice de aulas.');
        const aulasMeta = await metaResponse.json();

        const metaList = Array.isArray(window.__AULAS_META) ? window.__AULAS_META : aulasMeta;
        const aula = metaList.find(a => a.id === aulaId);

        if (!aula) {
          throw new Error('Aula não encontrada');
        }

        aulaTitle.value = aula.titulo;

        // Fetch the HTML content of the aula file
        const fileName = aula.arquivo || `${aulaId}.html`;
        const modulePath = `/public/aulas/${fileName}`;

        if (!aulaModules[modulePath]) {
          throw new Error(`Arquivo da aula não encontrado no build: ${fileName}`);
        }
        
        const rawHtml = await aulaModules[modulePath]();
        aulaContent.value = DOMPurify.sanitize(rawHtml, {
          ADD_TAGS: ['md3-video', 'md3-callout', 'md3-checkbox', 'md3-external', 'iframe'],
          ADD_ATTR: ['title', 'src', 'allow', 'variant', 'label', 'checked', 'href', 'icon', 'target', 'rel', 'allowfullscreen', 'frameborder', 'loading', 'referrerpolicy'],
        });

        // Mark as visited
        if (window.localStorage) {
          const visited = JSON.parse(localStorage.getItem('visited_aula') || '[]');
          if (!visited.includes(aulaId)) {
            visited.push(aulaId);
            localStorage.setItem('visited_aula', JSON.stringify(visited));
          }
        }

        // Trigger syntax highlighting if available
        // Enhance accordions and rehighlight after content is in DOM
        setTimeout(() => {
          try {
            const root = document.querySelector('#main-root .md3-content') || document.getElementById('main-root');
            enhanceAulaContent(root);
            // Normalize external links: open in new tab with noopener
            root.querySelectorAll('a[href^="http"]').forEach((a) => {
              try { a.setAttribute('target', '_blank'); } catch (_) {}
              try { a.setAttribute('rel', 'noopener noreferrer'); } catch (_) {}
            });
          } catch (_) {}
          rehighlightSafe();
        }, 80);

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
