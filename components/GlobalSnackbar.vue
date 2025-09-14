<template>
  <div id="snackbar">
    <div class="snackbar" role="status">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'GlobalSnackbar',
  data() {
    return { text: '' };
  },
  mounted() {
    window.__showSnackbar = (msg, timeout = 2500) => {
      this.text = msg;
      const el = document.getElementById('snackbar');
      if (!el) return;
      el.classList.add('show');
      clearTimeout(this.__snackTimer);
      this.__snackTimer = setTimeout(() => el.classList.remove('show'), timeout);
    };
  },
  beforeUnmount() {
    delete window.__showSnackbar;
    clearTimeout(this.__snackTimer);
  }
}
</script>

<style scoped>
</style>

