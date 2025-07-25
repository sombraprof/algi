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
        !aula.ativo ? "cursor-not-allowed opacity-70" : ""
      }`;
      if (aula.ativo)
        card.setAttribute("onclick", `loadAula('aulas/${aula.arquivo}')`);
      card.innerHTML = `<h3 class="font-bold text-xl text-indigo-600 mb-2">${
        aula.titulo.split(":")[0]
      }</h3><p>${aula.descricao}</p>`;
      cards.appendChild(card);
    });

    // Carrega a primeira aula ativa por padrão
    const primeira = aulas.find((a) => a.ativo);
    if (primeira) loadAula(`aulas/${primeira.arquivo}`);
  } catch (err) {
    console.error("Erro ao carregar aulas.json:", err);
  }
}

// Função para carregar o HTML de uma aula
function loadAula(file) {
  fetch(file)
    .then((r) => r.text())
    .then((html) => {
      const conteudo = document.getElementById("conteudo");
      conteudo.innerHTML = html;
      initAccordions();
      window.scrollTo({ top: conteudo.offsetTop - 20, behavior: "smooth" });
    })
    .catch((err) => console.error("Erro ao carregar aula:", err));
}

// Acordeão
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

// Inicialização
document.addEventListener("DOMContentLoaded", loadAulas);
