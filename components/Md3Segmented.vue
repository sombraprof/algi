<template>
  <div
    class="segmented"
    role="radiogroup"
    :aria-label="ariaLabel || 'Opções'"
    @keydown.stop.prevent="onKeydown"
  >
    <button
      v-for="(opt, idx) in options"
      :key="opt.value"
      :ref="el => setBtnRef(el, idx)"
      class="segmented__item"
      :class="{ 'segmented__item--active': modelValue === opt.value }"
      role="radio"
      :aria-checked="modelValue === opt.value ? 'true' : 'false'"
      :tabindex="modelValue === opt.value ? 0 : -1"
      @click="select(opt.value, idx)"
      @focus="focusedIndex = idx"
    >
      <i v-if="opt.icon" :class="[opt.icon, 'text-sm']"></i>
      <span>{{ opt.label }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Md3Segmented',
  props: {
    options: { type: Array, required: true },
    modelValue: { type: String, required: true },
    ariaLabel: { type: String, default: '' }
  },
  emits: ['update:modelValue'],
  data() {
    return { btnRefs: [], focusedIndex: -1 };
  },
  methods: {
    setBtnRef(el, idx) { if (!el) return; this.btnRefs[idx] = el; },
    select(val, idx) {
      this.$emit('update:modelValue', val);
      this.$nextTick(() => { this.btnRefs[idx]?.focus(); });
    },
    onKeydown(e) {
      const total = this.options.length;
      let idx = this.options.findIndex(o => o.value === this.modelValue);
      if (e.key === 'ArrowRight' || e.key === 'Right') {
        idx = (idx + 1) % total;
        this.select(this.options[idx].value, idx);
      } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        idx = (idx - 1 + total) % total;
        this.select(this.options[idx].value, idx);
      } else if (e.key === 'Home') {
        idx = 0; this.select(this.options[idx].value, idx);
      } else if (e.key === 'End') {
        idx = total - 1; this.select(this.options[idx].value, idx);
      } else if (e.key === 'Enter' || e.key === ' ') {
        // ensure emit even if focus moved via Tab
        const f = this.btnRefs.indexOf(document.activeElement);
        if (f >= 0) this.select(this.options[f].value, f);
      }
    }
  }
}
</script>

<style scoped>
</style>
