<template>
  <div id="app" class="min-h-screen flex flex-col bg-surface-light-50 dark:bg-surface-dark-50">
    <GlobalHeader />

    <!-- Main -->
    <main id="main-root" class="flex-1 bg-surface-light-50 dark:bg-surface-dark-50 overflow-x-hidden transition-all duration-300 ease-in-out w-full px-4 md:px-6 py-6">
      <!-- Router View - Dynamic content -->
      <router-view />
    </main>

    <!-- Global Footer -->
    <GlobalFooter />

    <!-- Back to top button component -->
    <FabBackTop />


    <div id="aria-live" class="sr-only" aria-live="polite"></div>
    <GlobalUpdateBanner />
    <GlobalSnackbar />
    <GlobalReviewChip />

    <GlobalShortcutModal />
  </div>
</template>

<script>
import { useShortcuts } from './js/core/shortcuts.js';
import FabBackTop from './components/FabBackTop.vue';
import GlobalHeader from './components/GlobalHeader.vue';
import GlobalFooter from './components/GlobalFooter.vue';
import GlobalShortcutModal from './components/GlobalShortcutModal.vue';
import GlobalUpdateBanner from './components/GlobalUpdateBanner.vue';
import GlobalSnackbar from './components/GlobalSnackbar.vue';
import GlobalReviewChip from './components/GlobalReviewChip.vue';

export default {
  name: 'App',
  components: { FabBackTop, GlobalHeader, GlobalFooter, GlobalShortcutModal, GlobalUpdateBanner, GlobalSnackbar, GlobalReviewChip },
  setup() {
    const { shortcuts } = useShortcuts();
    return { shortcuts };
  }
}
</script>

<style>
/* Simplified Layout */
#app {
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
}

/* Removed legacy margin-left override for main content */
</style>

<style scoped>
</style>
