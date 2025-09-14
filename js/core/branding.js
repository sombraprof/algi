// Vue composable for branding
import { ref, onMounted } from 'vue';

// Branding/config defaults - valores diretos para evitar dependência de config.js
const APP_NOME_DISCIPLINA = 'ALG I';
const APP_SIGLA = 'ALG';
const APP_NOME_PROFESSOR = 'Prof. Tiago Sombra';
const APP_INSTITUICAO = 'Unichristus';

export function useBranding() {
  const branding = ref({
    nomeDisciplina: APP_NOME_DISCIPLINA,
    sigla: APP_SIGLA,
    nomeProfessor: APP_NOME_PROFESSOR,
    instituicao: APP_INSTITUICAO
  });

  // Create a simple SVG favicon using the course acronym (sigla)
  const updateFavicons = () => {
    try {
      const sigla = (branding.value.sigla || 'APP').slice(0, 4).toUpperCase();
      const svg = `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">` +
        `<rect x="8" y="8" width="112" height="112" rx="24" fill="#1976d2"/>` +
        `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="48" font-weight="700" fill="#ffffff">${sigla}</text>` +
        `</svg>`;
      const dataUrl = 'data:image/svg+xml;base64,' + btoa(svg);
      ['favicon', 'favicon-16', 'favicon-32', 'favicon-48'].forEach(id => {
        const link = document.getElementById(id);
        if (link) link.setAttribute('href', dataUrl);
      });
    } catch (e) {
      console.warn('Favicon update skipped:', e);
    }
  };

  const applyBranding = () => {
    try {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', `${branding.value.nomeDisciplina} – Materiais, aulas e listas${branding.value.instituicao ? ` (${branding.value.instituicao})` : ''}.`);
    } catch (e) { console.error("Branding error (metaDesc):", e); }

    try {
      if (!document.title || /Curso\s*-\s*Materiais/i.test(document.title)) {
        document.title = branding.value.instituicao ? `${branding.value.nomeDisciplina} - ${branding.value.instituicao}` : branding.value.nomeDisciplina;
      }
    } catch (e) { console.error("Branding error (documentTitle):", e); }

    // Remove placeholder classes
    try { document.querySelectorAll('.brand-ph').forEach(el => el.classList.remove('brand-ph')); } catch (e) { console.error("Branding error (brand-ph):", e); }

    // Update favicons with acronym for a personalized favicon
    updateFavicons();
  };

  onMounted(() => {
    applyBranding();
  });

  return {
    branding,
    applyBranding,
    updateFavicons
  };
}
