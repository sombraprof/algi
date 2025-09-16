const e=`<!-- Seção da Aula 11 -->
<section id="aula11" class="mb-16 pt-16">
  <header class="mb-12">
    <h2 class="section__title">
      Aula 11: Seleção Múltipla com <code-text>switch-case</code-text>
    </h2>
    <p class="text-body-large text-neutral-700 dark:text-neutral-300 mt-2">
      Organizando decisões complexas de forma limpa e eficiente.
    </p>
  </header>

  <!-- Seção: Plano da Aula -->
  <section
    id="plano-aula"
    class="mb-16 bg-primary-50 border border-primary-200 p-8 rounded-2xl shadow-elevation-3"
    aria-labelledby="plano-aula11-heading"
  >
    <h2
      id="plano-aula11-heading"
      class="text-3xl font-bold text-primary-700 mb-6 text-center"
    >
      Plano da Aula
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="card">
        <h3 class="font-semibold text-lg text-primary-800 mb-2">
          <i class="fa-solid fa-book-open mr-2"></i>CONTEÚDO
        </h3>
        <p class="text-neutral-600">
          Estrutura de seleção múltipla <code-text>switch-case</code-text>, a
          importância do <code-text>break</code-text> e do
          <code-text>default</code-text>, e a comparação com cadeias de
          <code-text>if-else if</code-text>.
        </p>
      </div>
      <div class="card">
        <h3 class="font-semibold text-lg text-primary-800 mb-2">
          <i class="fa-solid fa-bullseye mr-2"></i>OBJETIVO
        </h3>
        <p class="text-neutral-600">
          Escrever programas em C que selecionem um entre vários blocos de
          código com base no valor de uma variável, utilizando
          <code-text>switch-case</code-text> de forma eficiente.
        </p>
      </div>
      <div class="card">
        <h3 class="font-semibold text-lg text-primary-800 mb-2">
          <i class="fa-solid fa-gears mr-2"></i>METODOLOGIA
        </h3>
        <p class="text-neutral-600">
          Aula expositiva com exemplos progressivos, demonstração de casos de
          uso e atividade prática em duplas para criar programas de seleção
          múltipla.
        </p>
      </div>
    </div>
  </section>

  <div class="mb-16">
    <h3 class="section__subtitle mb-6">
      Quando o <code-text>if-else</code-text> não é suficiente?
    </h3>
    <div class="card p-8 shadow-elevation-2">
      <p class="text-lg mb-4">
        Na última aula, vimos como o <code-text>else if</code-text> nos permite
        criar múltiplos caminhos. No entanto, quando todas as comparações são
        feitas contra a **mesma variável**, o código pode ficar repetitivo e
        menos legível.
      </p>
      <p>
        Imagine um menu onde o utilizador digita um número para escolher uma
        opção. Usar <code-text>if (opcao == 1)</code-text>,
        <code-text>else if (opcao == 2)</code-text>,
        <code-text>else if (opcao == 3)</code-text>... funciona, mas não é
        elegante.
      </p>
      <p class="mt-4">
        O <code-text>switch-case</code-text> é uma estrutura de controlo
        desenhada exatamente para esta situação: selecionar um bloco de código
        para executar com base no valor de uma única variável ou expressão.
      </p>
    </div>
  </div>

  <div class="mb-16">
    <h3 class="section__subtitle mb-6">
      Anatomia do <code-text>switch-case</code-text>
    </h3>
    <div class="card p-8 shadow-elevation-2">
      <p class="mb-4">
        A estrutura <code-text>switch</code-text> avalia uma variável e "salta"
        para o <code-text>case</code-text> que corresponde ao valor encontrado.
      </p>
      <div class="bg-neutral-800 text-white p-4 rounded-xl mono text-sm">
        <pre><code>switch (variavel_ou_expressao) {
    case valor1:
        // Bloco de código para o valor1
        break;
    case valor2:
        // Bloco de código para o valor2
        break;
    // ... outros cases
    default:
        // Bloco de código se nenhum case corresponder
        break;
}</code></pre>
      </div>
      <ul class="list-disc list-inside space-y-3 mt-6">
        <li>
          <strong><code-text>switch (variavel)</code-text>:</strong> A variável
          (do tipo <code-text>int</code-text> ou <code-text>char</code-text>)
          que será avaliada.
        </li>
        <li>
          <strong><code-text>case valor:</code-text>:</strong> Um rótulo que
          representa um possível valor para a variável. O valor deve ser uma
          constante.
        </li>
        <li>
          <strong><code-text>break;</code-text>:</strong> **Essencial!**
          Interrompe a execução do <code-text>switch</code-text>. Sem ele, o
          código continuaria a executar os <code-text>case</code-text>s
          seguintes (comportamento "fall-through").
        </li>
        <li>
          <strong><code-text>default:</code-text>:</strong> Opcional. Funciona
          como o <code-text>else</code-text> final, executando se nenhum dos
          <code-text>case</code-text>s anteriores corresponder ao valor da
          variável.
        </li>
      </ul>
    </div>
  </div>

  <div class="mb-16">
    <h3 class="section__subtitle mb-6">
      Exemplo Prático 1: Menu de Opções
    </h3>
    <div class="card p-8 shadow-elevation-2">
      <p class="mb-4">
        Vamos implementar um menu de opções simples, um dos usos mais comuns
        para o <code-text>switch-case</code-text>.
      </p>
      <div class="bg-neutral-800 text-white p-4 rounded-xl mono text-sm mt-6">
        <pre id="code-switch-menu"><code>#include &lt;stdio.h&gt;

int main() {
    int opcao;

    printf("--- MENU ---\\n");
    printf("1 - Cadastrar\\n");
    printf("2 - Listar\\n");
    printf("3 - Sair\\n");
    printf("Escolha uma opcao: ");
    scanf("%d", &opcao);

    switch (opcao) {
        case 1:
            printf("Voce escolheu a opcao CADASTRAR.\\n");
            // Aqui entraria a lógica de cadastro
            break;
        case 2:
            printf("Voce escolheu a opcao LISTAR.\\n");
            // Aqui entraria a lógica de listagem
            break;
        case 3:
            printf("A sair do programa...\\n");
            break;
        default:
            printf("Opcao invalida!\\n");
            break;
    }

    return 0;
}
</code></pre>
        
      </div>
    </div>
  </div>

  <div class="mb-16">
    <h3 class="section__subtitle mb-6">
      Agrupando <code-text>case</code-text>s
    </h3>
    <div class="card p-8 shadow-elevation-2">
      <p class="mb-4">
        Uma técnica poderosa é agrupar vários <code-text>case</code-text>s para
        que executem o mesmo bloco de código. Como a execução continua até
        encontrar um <code-text>break</code-text>, podemos omiti-lo para criar
        este efeito.
      </p>
      <h4 class="font-semibold text-xl text-primary-700 mt-6 mb-3">
        Exemplo: Dias do Mês
      </h4>
      <p>
        Este programa lê o número de um mês e informa quantos dias ele tem
        (ignorando anos bissextos).
      </p>
      <div class="bg-neutral-800 text-white p-4 rounded-xl mono text-sm mt-6">
        <pre id="code-switch-meses"><code>#include &lt;stdio.h&gt;

int main() {
    int mes;
    printf("Digite o numero do mes (1-12): ");
    scanf("%d", &mes);

    switch (mes) {
        // Meses com 31 dias
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            printf("Este mes tem 31 dias.\\n");
            break;

        // Meses com 30 dias
        case 4:
        case 6:
        case 9:
        case 11:
            printf("Este mes tem 30 dias.\\n");
            break;

        // Caso especial: Fevereiro
        case 2:
            printf("Este mes tem 28 ou 29 dias.\\n");
            break;

        default:
            printf("Mes invalido!\\n");
            break;
    }

    return 0;
}
</code></pre>
      </div>
    </div>
  </div>

  <div class="mb-16">
    <h3 class="section__subtitle mb-6">
      Atividade Prática em Duplas
    </h3>
    <div class="card p-8 shadow-elevation-2">
      <p class="mb-4">
        Em duplas, criem um programa que leia um único caractere representando o
        estado civil de uma pessoa (<code-text>S</code-text> para Solteiro,
        <code-text>C</code-text> para Casado, <code-text>V</code-text> para
        Viúvo, <code-text>D</code-text> para Divorciado) e imprima o estado
        civil por extenso.
      </p>
      <div class="callout callout-good-practice">
        <h5 class="font-bold mb-2">Dica</h5>
        <p>
          O <code-text>switch</code-text> também funciona com o tipo
          <code-text>char</code-text>. Lembre-se de que os valores dos
          <code-text>case</code-text>s para caracteres devem estar entre aspas
          simples, como <code-text>case 'S':</code-text>.
        </p>
      </div>
    </div>
  </div>

  <!-- Tarefa da Aula 11 -->
  <section
    id="proximos-passos-aula11"
    class="mb-16"
    aria-labelledby="ted11-heading"
  >
    <h3 id="ted11-heading" class="section__subtitle mb-6">
      Próximos Passos e Tarefa (TED)
    </h3>
    <div
      class="callout callout-info"
    >
      <h4 class="font-bold text-xl mb-4">Tarefa para a próxima aula</h4>
      <p class="mb-4">
        O objetivo é praticar a estrutura de seleção múltipla
        <code-text>switch-case</code-text>.
      </p>
      <ol class="list-decimal list-inside space-y-3 font-semibold">
        <li>
          Crie um programa em C chamado
          <code-text>aula11_dia_semana.c</code-text>.
        </li>
        <li>O programa deve ler um número inteiro de 1 a 7.</li>
        <li>
          Utilizando <code-text>switch-case</code-text>, o programa deve exibir
          o dia da semana correspondente (1 para Domingo, 2 para Segunda, etc.).
        </li>
        <li>
          Se o número digitado estiver fora do intervalo de 1 a 7, o programa
          deve exibir a mensagem "Dia inválido" (use o
          <code-text>default</code-text>).
        </li>
        <li>
          Poste o ficheiro <code-text>.c</code-text> na Atividade da "Aula 11"
          no Moodle.
        </li>
      </ol>
    </div>
  </section>

  <section
    id="teste-codigo-aula11"
    class="mb-16"
    aria-labelledby="teste-codigo-heading11"
  >
    <h2
      id="teste-codigo-heading11"
      class="section__title mb-8"
    >
      💻 Área de Testes Interativa
    </h2>
    <div class="card p-6">
      <h4 class="font-bold text-xl mb-3">💻 Teste seu Código</h4>
      <p class="mb-4">Abra o editor OnlineGDB em uma nova aba para compilar e executar seus programas em C.</p>
      <md3-external href="https://www.onlinegdb.com/online_c_compiler" label="Abrir OnlineGDB" icon="fa-solid fa-up-right-from-square" variant="tonal"></md3-external>
    </div>
  </section>

  <!-- Vídeos de Apoio - Aula 11 (atualizados) -->
  <section
    id="recursos-apoio-aula11"
    class="mb-16"
    aria-labelledby="recursos-heading11"
  >
    <h2
      id="recursos-heading11"
      class="section__title mb-8"
    >
      🎥 Vídeos de Apoio
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Vídeo 1: Switch Case em C (PT-BR) -->
      <div class="card p-4">
        <h3 class="font-semibold text-lg text-primary-800 mb-2">
          Entenda <code-text>switch case</code-text> em C (PT-BR)
        </h3>
        <p class="text-sm text-neutral-600 mb-3">
          Introdução clara ao <code>switch</code>, sintaxe, <code>case</code>,
          <code>break</code> e <code>default</code> — com exemplos práticos.
        </p>
        <div class="aspect-video w-full">
          <iframe
            class="w-full h-full rounded-xl"
            src="https://www.youtube.com/embed/w78aBu9cByo"
            title="Entenda SWITCH CASE [Curso C] - Aula"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <!-- Vídeo 2: Estrutura de decisão switch-case (PT-BR) -->
      <div class="card p-4">
        <h3 class="font-semibold text-lg text-primary-800 mb-2">
          Estrutura de decisão <code-text>switch-case</code-text> (C em
          Português)
        </h3>
        <p class="text-sm text-neutral-600 mb-3">
          Quando usar <code>switch</code> vs. <code>if-else</code>, organização
          dos casos e boas práticas com <code>break</code>.
        </p>
        <div class="aspect-video w-full">
          <iframe
            class="w-full h-full rounded-xl"
            src="https://www.youtube.com/embed/TWMJkFnLjtw"
            title="Curso Linguagem C - Estrutura de decisão switch-case"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </section>

  <section id="checklist-aula11" class="mt-16">
    <div class="callout callout-success">
      <h3 class="font-bold text-lg mb-3">
        ✅ Ao final desta aula você deve ser capaz de:
      </h3>
      <ul class="list-none space-y-2">
        <li>
          <i class="fa-solid fa-check text-green-600 mr-2"></i>Explicar quando
          usar <code-text>switch-case</code-text> em vez de
          <code-text>if-else</code-text>.
        </li>
        <li>
          <i class="fa-solid fa-check text-green-600 mr-2"></i>Escrever um
          programa funcional utilizando a sintaxe do
          <code-text>switch-case</code-text>.
        </li>
        <li>
          <i class="fa-solid fa-check text-green-600 mr-2"></i>Entender a função
          crítica da palavra-chave <code-text>break</code-text>.
        </li>
        <li>
          <i class="fa-solid fa-check text-green-600 mr-2"></i>Utilizar o
          <code-text>default</code-text> para lidar com casos inesperados.
        </li>
      </ul>
    </div>
  </section>

  <section
    id="bibliografia-aula11"
    class="mt-16"
    aria-labelledby="bibliografia-heading11"
  >
    <h2
      id="bibliografia-heading11"
      class="section__title mb-6"
    >
      📚 Bibliografia de Apoio
    </h2>
    <div class="card p-8 space-y-4">
      <p>
        <strong>BACKES, André.</strong>
        <em>Linguagem C: completa e descomplicada.</em> Rio de Janeiro:
        Elsevier, 2019.
      </p>
      <p>
        <strong>SANTOS, Marcelo Gonçalves dos.</strong>
        <em>Linguagem de programação.</em> São Paulo: Pearson, 2018.
      </p>
    </div>
  </section>
</section>
`;export{e as default};
