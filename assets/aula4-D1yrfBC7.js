const o=`<!-- Seção da Aula 4 -->
<section id="aula4" class="mb-16 pt-16">
    <header class="mb-12">
        <h2 class="section__title">Aula 4: Do Pseudocódigo ao Primeiro Programa em C</h2>
        <p class="text-body-large text-neutral-700 dark:text-neutral-300 mt-2">A transição do planeamento em Portugol para a implementação em Linguagem C.</p>
    </header>

    <div class="card p-8 shadow-elevation-2 mb-12">
        <h3 class="section__subtitle mb-4">Plano de Voo da Aula de Hoje</h3>
        <ul class="list-disc list-inside space-y-2 text-neutral-700">
<li>O que é Pseudocódigo (Portugol) e por que é uma ferramenta essencial.</li>
<li>Estrutura e comandos básicos de um algoritmo em Portugol.</li>
<li>Introdução à Linguagem C: a sintaxe e a estrutura de um programa básico.</li>
<li>Comparativo lado a lado: traduzindo um algoritmo de Portugol para C.</li>
<li>Atividade prática em duplas: criar e traduzir pequenos algoritmos.</li>
<li>Apresentação da tarefa (TED) da Aula 4.</li>
        </ul>
    </div>
    
    <div class="mb-16">
        <h3 class="section__subtitle mb-6">Pseudocódigo: A Ponte Entre a Lógica e o Código</h3>
        <div class="card p-8 shadow-elevation-2">
<p class="text-lg mb-4">Até agora, planeámos os nossos algoritmos usando a linguagem do dia a dia. Isso é ótimo para a lógica, mas os computadores precisam de mais estrutura. É aqui que entra o <strong>Pseudocódigo</strong> (que chamaremos de <strong>Portugol</strong>).</p>
<p class="mb-4">O Portugol é uma linguagem intermediária. Não é tão informal como o português, mas também não é tão rígida e cheia de regras como uma linguagem de programação real (como C). Ele permite-nos escrever a nossa lógica de forma estruturada, focando no "o quê" fazer, sem nos preocuparmos com os detalhes técnicos do "como".</p>
<div class="callout callout-good-practice">
    <h5 class="font-bold mb-2">Por que usar Portugol?</h5>
    <p>Ele força-nos a organizar o pensamento em variáveis, comandos de entrada, processamento e saída, tornando a tradução para qualquer linguagem de programação (C, Python, Java, etc.) uma tarefa muito mais simples e direta.</p>
</div>
        </div>
    </div>

    <div class="mb-16">
        <h3 class="section__subtitle mb-6">Estrutura e Comandos Básicos do Portugol</h3>
        <div class="card p-8 shadow-elevation-2">
<p class="mb-4">Um algoritmo em Portugol tem uma estrutura bem definida:</p>
    <pre><code class="language-plaintext">ALGORITMO "nome_do_algoritmo"
// Seção de Declaração de Variáveis
VAR
  nome_variavel_1 : TIPO_DE_DADO
  nome_variavel_2 : TIPO_DE_DADO

// Seção de Comandos
INICIO
  // Comandos de entrada, processamento e saída
FIM_ALGORITMO</code></pre>
<h4 class="font-semibold text-xl text-primary-700 mt-6 mb-3">Comandos Essenciais:</h4>
<ul class="list-disc list-inside space-y-3 mt-4">
    <li><code>LEIA(variavel)</code>: Lê um valor digitado pelo utilizador e guarda-o na variável especificada.</li>
    <li><code>ESCREVA("texto", variavel)</code>: Mostra uma mensagem ou o conteúdo de uma variável no ecrã.</li>
    <li><code>variavel &lt;- valor_ou_expressao</code>: Atribui um valor (ou o resultado de um cálculo) a uma variável. A seta \`&lt;-\` significa "recebe".</li>
</ul>
        </div>
    </div>

    <div class="mb-16">
        <h3 class="section__subtitle mb-6">Comparativo: Somar Dois Números</h3>
        <p class="mb-4">A melhor forma de entender a transição é ver um exemplo prático. Vamos traduzir um algoritmo que soma dois números de Portugol para C.</p>
        <div class="grid lg:grid-cols-2 gap-8">
<!-- Coluna do Pseudocódigo -->
<div class="card shadow-elevation-2">
    <h4 class="font-bold text-xl text-neutral-800 mb-4 text-center">1. O Plano (Portugol)</h4>
    <pre class="mt-2"><code class="language-plaintext">ALGORITMO "SomaDoisNumeros"
VAR
  num1, num2, soma: INTEIRO

INICIO
  ESCREVA("Digite o primeiro número: ")
  LEIA(num1)
  
  ESCREVA("Digite o segundo número: ")
  LEIA(num2)
  
  soma &lt;- num1 + num2
  
  ESCREVA("A soma é: ", soma)
FIM_ALGORITMO</code></pre>
</div>
<!-- Coluna do Código C -->
<div class="card shadow-elevation-2">
    <h4 class="font-bold text-xl text-neutral-800 mb-4 text-center">2. A Execução (Linguagem C)</h4>
    <pre class="mt-2"><code class="language-c">#include &lt;stdio.h&gt;

int main() {
  int num1, num2, soma;

  printf("Digite o primeiro número: ");
  scanf("%d", &num1);
  
  printf("Digite o segundo número: ");
  scanf("%d", &num2);
  
  soma = num1 + num2;
  
  printf("A soma é: %d\\n", soma);
  
  return 0;
}</code></pre>
</div>
        </div>
  <div class="card shadow-elevation-2 mt-8">
<h4 class="font-bold text-xl text-neutral-800 mb-4">Análise da Tradução</h4>
<ul class="list-disc list-inside space-y-2">
    <li>A seção <code>VAR</code> em Portugol corresponde à declaração de variáveis em C (ex: <code>int num1;</code>).</li>
    <li>O comando <code>ESCREVA</code> é traduzido para a função <code>printf()</code> em C.</li>
    <li>O comando <code>LEIA</code> é traduzido para a função <code>scanf()</code> em C. Note os detalhes técnicos como <code>%d</code> e o <code>&</code>.</li>
    <li>A atribuição <code>&lt;-</code> torna-se o sinal de igual <code>=</code> em C.</li>
    <li>Todo programa em C precisa da estrutura <code>#include <stdio.h></code> e da função principal <code>int main() { ... }</code>.</li>
</ul>
        </div>
    </div>

    <div class="mb-16">
        <h3 class="section__subtitle mb-6">Atividade Prática em Duplas</h3>
        <div class="card p-8 shadow-elevation-2">
<p class="mb-4">Agora, em duplas, escolham um dos problemas abaixo. Primeiro, criem a solução em <strong>Portugol</strong> no papel. Depois, abram um editor de texto e tentem traduzir o vosso algoritmo para a <strong>Linguagem C</strong>, usando o exemplo da soma como guia.</p>
<div class="grid md:grid-cols-2 gap-6 mt-4">
    <div class="bg-primary-50 p-6 rounded-2xl">
        <h5 class="font-bold text-primary-800 mb-2">Problema A: Área do Retângulo</h5>
        <p>Crie um algoritmo que leia a base e a altura de um retângulo, calcule a sua área (Área = Base * Altura) e mostre o resultado.</p>
    </div>
    <div class="bg-primary-50 p-6 rounded-2xl">
        <h5 class="font-bold text-primary-800 mb-2">Problema B: Antecessor e Sucessor</h5>
        <p>Crie um algoritmo que leia um número inteiro e mostre na tela o seu antecessor e o seu sucessor.</p>
    </div>
</div>
        </div>
    </div>

    <!-- Área de Teste -->
<section id="teste-codigo" class="mb-16">
  <div class="card p-6">
    <h4 class="font-bold text-xl mb-3">💻 Teste seu Código</h4>
    <p class="mb-4">Abra o editor OnlineGDB em uma nova aba para compilar e executar seus programas em C.</p>
    <md3-external href="https://www.onlinegdb.com/online_c_compiler" label="Abrir OnlineGDB" icon="fa-solid fa-up-right-from-square" variant="tonal"></md3-external>
  </div>
  
</section>

<!-- Vídeos de Apoio -->
<section id="videos-aula4" class="mb-16">
  <h2 class="section__title mb-8">
    🎥 Vídeos de Apoio
  </h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <!-- Vídeo 1: Portugol -->
    <md3-video title="Algoritmos com Portugol Studio – Introdução" src="https://www.youtube.com/embed/6OIADpFImtc"></md3-video>
    <!-- Vídeo 2: Linguagem C -->
    <md3-video title="Primeiro Programa em C – Hello World" src="https://www.youtube.com/embed/Sn6vPf6H8g0"></md3-video>
  </div>
</section>


    <!-- Tarefa da Aula 4 -->
    <div id="proximos-passos-aula4">
        <h3 class="section__subtitle mb-6">Próximos Passos e Tarefa (TED)</h3>
         <div class="callout callout-info">
<h4 class="font-bold text-xl mb-4">Tarefa para a próxima aula</h4>
<p class="mb-4">O objetivo é praticar o ciclo completo: planear em Portugol e implementar em C.</p>
<ol class="list-decimal list-inside space-y-2 font-semibold">
    <li>Acesse o Moodle da disciplina.</li>
    <li>Encontre o fórum da "Aula 4".</li>
    <li>Poste o algoritmo em <strong>Portugol</strong> e também o código em <strong>Linguagem C</strong> que leia dois números e mostre a soma deles.</li>
</ol>
<div class="mt-6">
    <md3-external href="https://eadsp.unichristus.edu.br" label="Acessar Moodle" icon="fa-solid fa-graduation-cap" variant="tonal"></md3-external>
</div>
        </div>
    </div>

<!-- Checklist da Aula 4 -->
<section id="checklist-aula4" class="mt-16 mb-16">
  <h2 class="section__title mb-6">
    ✅ Checklist da Aula 4
  </h2>
  <div class="card shadow-elevation-2 space-y-3">
    <p class="mb-4">Marque os itens que você concluiu durante e após a aula:</p>
    <ul class="space-y-3 md3-checklist">
      <li><md3-checkbox label="Compreendi a diferença entre pseudocódigo (Portugol) e linguagem C."></md3-checkbox></li>
      <li><md3-checkbox label="Pratiquei a tradução de um algoritmo de Portugol para C."></md3-checkbox></li>
      <li><md3-checkbox label="Participei da atividade prática em duplas."></md3-checkbox></li>
      <li><md3-checkbox label="Assisti aos vídeos de apoio sobre Portugol e Linguagem C."></md3-checkbox></li>
      <li><md3-checkbox label="Concluí e postei a tarefa (TED) no Moodle."></md3-checkbox></li>
    </ul>
  </div>
</section>


    <!-- Bibliografia -->
<section id="bibliografia-aula4" class="mb-16">
  <h2 class="section__title mb-6">
    📚 Bibliografia de Apoio
  </h2>
  <div class="card p-8 space-y-4">
    <p><strong>BACKES, André.</strong> <em>Linguagem C: completa e descomplicada.</em> Novatec, 2020.</p>
    <p><strong>FORBELLONE, André L. V.</strong> <em>Lógica de Programação.</em> 3. ed. Pearson, 2020.</p>
  </div>
</section>

</section>
`;export{o as default};
