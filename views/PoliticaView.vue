<template>
  <div>
    <SectionBlock id="politica" title="Política de Uso" class="pt-0">
      <div class="card p-6 md:p-8">
        <div class="space-y-8">
          <!-- 1. Finalidade do Material -->
          <div>
            <h2 class="section__subtitle text-primary-700 dark:text-primary-300 mb-2 flex items-center gap-3">
              <i class="fa-solid fa-bullseye text-primary-500"></i>
              1. Finalidade do Material
            </h2>
            <p class="text-body-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
              Este material foi desenvolvido exclusivamente para fins educacionais na disciplina
              <strong class="text-neutral-900 dark:text-neutral-100">{{ branding.nomeDisciplina }}</strong>
              da <span class="text-neutral-900 dark:text-neutral-100">{{ branding.instituicao }}</span>.
            </p>
          </div>

          <!-- 2. Direitos Autorais -->
          <div>
            <h2 class="section__subtitle text-primary-700 dark:text-primary-300 mb-2 flex items-center gap-3">
              <i class="fa-solid fa-copyright text-primary-500"></i>
              2. Direitos Autorais
            </h2>
            <p class="text-body-medium text-neutral-800 dark:text-neutral-200 leading-relaxed mb-4">
              Todo o conteúdo (textos, imagens, códigos e exercícios) é protegido por direitos autorais.
              A reprodução total ou parcial é permitida apenas para uso acadêmico, desde que citada a fonte:
            </p>
            <div class="callout callout-info">
              <p class="text-body-medium italic text-neutral-900 dark:text-neutral-100">
                "Material da disciplina {{ branding.nomeDisciplina }} - {{ branding.nomeProfessor }}, {{ branding.instituicao }}."
              </p>
            </div>
          </div>

          <!-- 3. Uso Proibido -->
          <div>
            <h2 class="section__subtitle text-error-700 dark:text-error-400 mb-2 flex items-center gap-3">
              <i class="fa-solid fa-ban text-error-500"></i>
              3. Uso Proibido
            </h2>
            <ul class="list-disc list-inside text-body-medium text-neutral-800 dark:text-neutral-200 space-y-2">
              <li>Uso comercial sem autorização prévia.</li>
              <li>Distribuição do material sem citar a fonte.</li>
              <li>Alteração de conteúdo para divulgação externa sem consentimento.</li>
            </ul>
          </div>

          <!-- 4. Citação e Referência -->
          <div>
            <h2 class="section__subtitle text-primary-700 dark:text-primary-300 mb-2 flex items-center gap-3">
              <i class="fa-solid fa-quote-left text-primary-500"></i>
              4. Citação e Referência
            </h2>
            <p class="text-body-medium text-neutral-800 dark:text-neutral-200 leading-relaxed mb-4">
              Ao utilizar trechos deste material em trabalhos acadêmicos, projetos ou artigos,
              utilize a seguinte referência em ABNT:
            </p>
            <div class="callout callout-academic">
              <p class="text-body-medium text-neutral-900 dark:text-neutral-100">
                {{ branding.nomeProfessor || 'Autor' }}.
                <strong>{{ branding.nomeDisciplina }}</strong>.
                {{ branding.instituicao }}, {{ currentYear }}.
                Material de aula.
              </p>
            </div>
          </div>

          <!-- 5. Contato -->
          <div>
            <h2 class="section__subtitle text-primary-700 dark:text-primary-300 mb-2 flex items-center gap-3">
              <i class="fa-solid fa-envelope text-primary-500"></i>
              5. Contato
            </h2>
            <p class="text-body-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
              Para dúvidas sobre a utilização do material, entre em contato com o professor responsável:
              <a
                v-if="branding.email"
                :href="`mailto:${branding.email}`"
                class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:underline transition-colors"
              >
                {{ branding.email }}
              </a>
              <span v-else class="text-neutral-500 dark:text-neutral-400">
                Email não disponível
              </span>
            </p>
          </div>
        </div>
      </div>
    </SectionBlock>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useBranding } from '../js/core/branding.js';
import SectionBlock from '../components/SectionBlock.vue';

export default {
  name: 'PoliticaView',
  components: { SectionBlock },
  setup() {
    const { branding } = useBranding();
    const currentYear = ref(new Date().getFullYear());

    // Update document title
    onMounted(() => {
      document.title = `Política de Uso - ${branding.value.nomeDisciplina}`;
    });

    return {
      branding,
      currentYear
    };
  }
}
</script>

<style scoped>
/* Additional styles for PoliticaView */
</style>
