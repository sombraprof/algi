<template>
  <div v-if="enabled" class="fixed right-4 bottom-20 z-50">
    <div class="chip chip--warning">
      <i class="fa-solid fa-magnifying-glass"></i>
      <span>Revisão: {{ total }} achados</span>
      <button class="ml-2 text-label-small underline" @click="copy" aria-label="Copiar relatório">Copiar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalReviewChip',
  data() {
    return { enabled: false, total: 0, details: [] };
  },
  mounted() {
    try { this.enabled = localStorage.getItem('review_mode') === '1'; } catch (_) {}
    if (!this.enabled) return;
    const selectors = [
      // Legacy palettes/utilities a serem removidas
      '[class*="text-slate-"]',
      '[class*="bg-slate-"]',
      '[class*="border-slate-"]',
      '[class*="text-indigo-"]',
      '[class*="bg-indigo-"]',
      '[class*="border-indigo-"]',
      // Utilitárias genéricas que costumam conflitar com o tema
      '[class~="bg-white"]',
      '[class*="border-b-2"]'
    ];
    const nodes = new Set();
    selectors.forEach(sel => document.querySelectorAll(sel).forEach(n => nodes.add(n)));
    const list = Array.from(nodes);
    this.total = list.length;
    this.details = list.slice(0, 200).map((n, i) => ({ idx: i + 1, tag: n.tagName.toLowerCase(), classes: n.getAttribute('class') || '' }));
  },
  methods: {
    copy() {
      const lines = this.details.map(d => `${d.idx}. <${d.tag}> ${d.classes}`);
      const text = `Achados: ${this.total}\n` + lines.join('\n');
      navigator.clipboard?.writeText(text);
    }
  }
}
</script>

<style scoped>
</style>
