<template>
  <button
    id="back-to-top"
    @click="toTop"
    :class="[
      'fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[120] transition-opacity duration-200 flex items-center justify-center rounded-full shadow-elevation-3 w-10 h-10 md:w-12 md:h-12',
      isAula ? 'bg-primary-100 text-primary-700 hover:bg-primary-200' : 'bg-primary-600 text-white hover:bg-primary-700',
      visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    ]"
    aria-label="Voltar ao topo"
    title="Voltar ao topo"
  >
    <i class="fa-solid fa-arrow-up text-base"></i>
  </button>
</template>

<script>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'FabBackTop',
  setup() {
    const visible = ref(false);
    const threshold = 200; // reasonable scroll distance to show
    const route = useRoute();
    const isAula = computed(() => route.path.startsWith('/aula/'));

    const getScrollTop = () => {
      const mainRoot = document.getElementById('main-root');
      if (mainRoot && mainRoot.scrollHeight > mainRoot.clientHeight) {
        return mainRoot.scrollTop;
      }
      return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    };

    const onScroll = () => {
      visible.value = getScrollTop() > threshold;
    };

    const toTop = () => {
      const mainRoot = document.getElementById('main-root');
      if (mainRoot && mainRoot.scrollHeight > mainRoot.clientHeight) {
        mainRoot.scrollTo({ top: 0, behavior: 'smooth' });
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
      document.body.scrollTo?.({ top: 0, behavior: 'smooth' });
    };

    onMounted(() => {
      // Check initial scroll position
      onScroll();
      // Listen to scroll events on window and potential main container
      window.addEventListener('scroll', onScroll, { passive: true });
      const mainRoot = document.getElementById('main-root');
      if (mainRoot) mainRoot.addEventListener('scroll', onScroll, { passive: true });
    });

    watch(() => route.path, () => {
      // Reset visibility when route changes
      nextTick(() => onScroll());
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', onScroll);
      const mainRoot = document.getElementById('main-root');
      if (mainRoot) mainRoot.removeEventListener('scroll', onScroll);
    });

    return { visible, isAula, toTop };
  }
}
</script>

<style scoped>
</style>
