<template>
  <button
    id="back-to-top"
    @click="toTop"
    :class="[
      'btn btn-icon btn-tonal fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[120] shadow-elevation-3 transition-opacity duration-200 w-10 h-10 md:w-12 md:h-12',
      visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    ]"
    :style="{ bottom: bottomOffset }"
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
    const threshold = 240; // show only after meaningful scroll
    const route = useRoute();
    const isAula = computed(() => route.path.startsWith('/aula/'));
    const bottomOffset = ref('1.0rem');

    const getScrollTop = () => {
      const mainRoot = document.getElementById('main-root');
      if (mainRoot && mainRoot.scrollHeight > mainRoot.clientHeight) {
        return mainRoot.scrollTop;
      }
      return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    };

    const onScroll = () => {
      const mainRoot = document.getElementById('main-root');
      const useMain = mainRoot && mainRoot.scrollHeight > mainRoot.clientHeight;
      const scrollable = useMain
        ? (mainRoot.scrollHeight - mainRoot.clientHeight)
        : (document.documentElement.scrollHeight - window.innerHeight);
      const scrolled = getScrollTop();
      visible.value = scrollable > threshold * 1.5 && scrolled > threshold;
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

      // Avoid overlapping footer: adjust bottom offset when footer is visible
      try {
        const footer = document.querySelector('footer');
        if (footer && 'IntersectionObserver' in window) {
          const io = new IntersectionObserver((entries) => {
            const e = entries[0];
            if (e && e.isIntersecting) {
              const h = footer.getBoundingClientRect().height || 56;
              bottomOffset.value = `${h + 16}px`;
            } else {
              bottomOffset.value = '1.0rem';
            }
          }, { root: null, threshold: 0 });
          io.observe(footer);
        }
      } catch (_) {}
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

    return { visible, isAula, toTop, bottomOffset };
  }
}
</script>

<style scoped>
</style>
