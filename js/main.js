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
      navigator.clipboard.writeText(codeToCopy).then(() => {
        copyButton.innerText = "Copiado!";
        setTimeout(() => {
          copyButton.innerText = "Copiar Código";
        }, 2000);
      }).catch(err => {
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
});
