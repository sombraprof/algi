// Carrega lista de aulas e gera sidebar/cards
async function loadAulas() {
  try {
    const res = await fetch("aulas/aulas.json");
    const aulas = await res.json();

    const sidebar = document.getElementById("sidebar-links");
    const cards = document.getElementById("cards-container");

    aulas.forEach((aula) => {
      // Sidebar
      const li = document.createElement("li");
      li.innerHTML = `<a href="#" class="block font-bold ${
        aula.ativo ? "hover:text-indigo-400" : "nav-link-disabled"
      } transition-colors" ${
        aula.ativo ? `onclick="loadAula('aulas/${aula.arquivo}')"` : ""
      }>${aula.titulo}</a>`;
      sidebar.appendChild(li);

      // Cards
      const card = document.createElement("a");
      card.className = `block bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all ${
        !aula.ativo ? "cursor-not-allowed opacity-70" : "cursor-pointer"
      }`;
      if (aula.ativo)
        card.setAttribute("onclick", `loadAula('aulas/${aula.arquivo}')`);
      card.innerHTML = `<h3 class="font-bold text-xl text-indigo-600 mb-2">${
        aula.titulo.split(":")[0]
      }</h3><p>${aula.descricao}</p>`;
      cards.appendChild(card);
    });
  } catch (err) {
    console.error("Erro ao carregar aulas.json:", err);
  }
}

// Carrega o HTML de uma aula
function loadAula(file) {
  fetch(file)
    .then((r) => r.text())
    .then((html) => {
      const conteudo = document.getElementById("conteudo");
      conteudo.innerHTML = html;
      initAccordions();
      initCopyButtons();
      window.scrollTo({ top: conteudo.offsetTop - 20, behavior: "smooth" });
    })
    .catch((err) => console.error("Erro ao carregar aula:", err));
}

// Carrega listas dinamicamente no index.html
async function loadListas() {
  try {
    // 🔹 Arquivo com índice de listas (pode ser fixo ou gerado dinamicamente)
    const res = await fetch("listas/listas.json");
    const listas = await res.json();

    const container = document.getElementById("listas-container");

    listas.forEach((lista) => {
      const card = document.createElement("div");
      card.className =
        "bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer";
      card.innerHTML = `
        <h3 class="font-bold text-xl text-indigo-600 mb-2">${lista.titulo}</h3>
        <p class="text-slate-600">${lista.descricao}</p>
      `;
      card.onclick = () => loadListaDetalhe(lista.arquivo);
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Erro ao carregar listas:", err);
  }
}

async function loadListaDetalhe(file) {
  try {
    const metaRes = await fetch("listas/listas.json");
    const listas = await metaRes.json();
    const meta = listas.find((l) => l.arquivo === file);

    const res = await fetch(`listas/${file}`);
    const data = await res.json();

    const conteudo = document.getElementById("conteudo");
    conteudo.innerHTML = "";

    const section = document.createElement("section");
    section.className = "mb-16 pt-16";
    section.innerHTML = `
      <header class="mb-12">
        <h2 class="text-4xl font-bold text-slate-900">${data.titulo}</h2>
        <p class="text-lg text-slate-600 mt-2">${data.descricao}</p>
      </header>
      <div id="questoes" class="space-y-6"></div>
    `;
    conteudo.appendChild(section);

    const questoesContainer = section.querySelector("#questoes");

    data.questoes.forEach((q) => {
      const div = document.createElement("div");
      div.className = "bg-white border border-slate-200 rounded-lg";

      const disabled = !meta.mostrar_solucoes;

      div.innerHTML = `
        <div class="p-5">
          <p class="font-semibold">${q.id}. ${q.enunciado}</p>
          <div class="mt-2 text-sm text-slate-600">
            <p><strong>Dica:</strong> ${q.dica}</p>
          </div>
        </div>
        <div class="border-t border-slate-200">
          <button class="accordion-toggle w-full flex justify-between items-center p-3 font-semibold text-left text-sm ${
            disabled ? "text-gray-400 cursor-not-allowed" : "text-indigo-700"
          }"
            aria-expanded="false" ${disabled ? "disabled" : ""}>
            <span>${disabled ? "Solução bloqueada" : "Mostrar Solução"}</span>
            <span class="transform transition-transform duration-300 rotate-180">▼</span>
          </button>
          <div class="accordion-content overflow-hidden transition-all duration-500 ease-in-out"
            style="max-height: 0px">
            <div class="p-4 bg-slate-800 text-white mono text-sm">
              <pre><code>${q.solucao}</code></pre>
            </div>
          </div>
        </div>
      `;
      questoesContainer.appendChild(div);
    });

    initAccordions();
    requestAnimationFrame(() => {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  } catch (err) {
    console.error("Erro ao carregar lista detalhada:", err);
  }
}

// Inicializa acordeões
function initAccordions() {
  const accordions = document.querySelectorAll(".accordion-toggle");
  accordions.forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", !isExpanded);
      button.querySelector("span:last-child").style.transform = isExpanded
        ? "rotate(180deg)"
        : "rotate(0deg)";
      content.style.maxHeight = isExpanded
        ? "0px"
        : content.scrollHeight + "px";
    });
  });
}

// Inicializa botão de copiar código
function initCopyButtons() {
  const copyButton = document.querySelector(".copy-code-btn");
  if (copyButton) {
    copyButton.addEventListener("click", () => {
      const codeToCopy = document.getElementById("code-sizeof").innerText;
      navigator.clipboard
        .writeText(codeToCopy)
        .then(() => {
          copyButton.innerText = "Copiado!";
          setTimeout(() => {
            copyButton.innerText = "Copiar Código";
          }, 2000);
        })
        .catch((err) => {
          console.error("Erro ao copiar o texto: ", err);
          const textarea = document.createElement("textarea");
          textarea.value = codeToCopy;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
          copyButton.innerText = "Copiado!";
          setTimeout(() => {
            copyButton.innerText = "Copiar Código";
          }, 2000);
        });
    });
  }
}

// Quando o DOM estiver pronto, carrega aulas
document.addEventListener("DOMContentLoaded", () => {
  loadAulas();
  loadListas();
});
