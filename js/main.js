// main.js
// NOTE: Code comments are in English (as requested).

document.addEventListener("DOMContentLoaded", () => {
  const sidebarLinksContainer = document.getElementById("sidebar-links");
  const cardsContainer = document.getElementById("cards-container");
  const listasContainer = document.getElementById("listas-container");
  const dynamicContentContainer = document.getElementById("dynamic-content");
  const homeContent = document.getElementById("home-content");

  // ---------------------------
  // Generic helpers
  // ---------------------------

  // Escape HTML for safe code rendering
  const escapeHTML = (str = "") =>
    str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Render alternatives list for MCQ (objective questions)
  const renderAlternativas = (alternativas = []) => {
    if (!alternativas.length) return "";
    return `
      <ul class="mt-3 space-y-2">
        ${alternativas
          .map((alt) => {
            // Supports strings like "A) Texto..." or "A)Texto..."
            const idx = alt.indexOf(")");
            const letter = idx > 0 ? alt.substring(0, idx) : "";
            const text = idx > 0 ? alt.substring(idx + 1).trim() : alt;
            return `
              <li class="flex gap-2">
                <span class="font-semibold">${letter})</span>
                <span>${text}</span>
              </li>
            `;
          })
          .join("")}
      </ul>
    `;
  };

  // Render solution block depending on question type
  const renderSolucao = (q, canShowSolutions) => {
    // If solutions are hidden at list level
    if (!canShowSolutions) {
      return `
        <div class="p-4 bg-amber-50 text-amber-800 text-sm border border-amber-200">
          As soluções estão ocultas para esta lista.
        </div>
      `;
    }

    const tipo = (q.tipo || "").toLowerCase();

    // Objective: show alternatives, answer key and justification
    if (tipo === "objetiva") {
      return `
        <div class="p-4 space-y-3">
          ${
            q.alternativas
              ? `<h4 class="font-semibold text-slate-800">Alternativas</h4>${renderAlternativas(
                  q.alternativas
                )}`
              : ""
          }
          ${
            q.gabarito
              ? `<p class="text-emerald-700 font-semibold">Gabarito: ${q.gabarito}</p>`
              : ""
          }
          ${
            q.justificativa
              ? `<p class="text-slate-700"><strong>Justificativa:</strong> ${q.justificativa}</p>`
              : ""
          }
        </div>
      `;
    }

    // Programming: show code with copy button
    if (tipo === "programacao") {
      return `
        <div class="p-4 bg-slate-800 text-white mono text-sm">
          <pre><code>${escapeHTML(q.solucao || "")}</code></pre>
        </div>
        <div class="p-3">
          <button class="copy-code-btn bg-slate-600 text-white font-bold py-1 px-3 rounded hover:bg-slate-500 transition-colors">
            Copiar Código
          </button>
        </div>
      `;
    }

    // Discursive: textual solution + optional grading criteria
    if (tipo === "discursiva") {
      return `
        <div class="p-4 space-y-3">
          ${
            q.solucao
              ? `<p class="text-slate-700 whitespace-pre-line">${q.solucao}</p>`
              : ""
          }
          ${
            q.criterios_correcao
              ? `
            <div class="mt-2">
              <h4 class="font-semibold text-slate-800">Critérios de Correção</h4>
              <ul class="list-disc list-inside text-slate-700">
                ${q.criterios_correcao
                  .map((item) => `<li>${item}</li>`)
                  .join("")}
              </ul>
            </div>`
              : ""
          }
        </div>
      `;
    }

    // Discursive + Programming: code + criteria + optional rationale
    if (tipo === "discursiva-programacao") {
      return `
        <div class="p-4 bg-slate-800 text-white mono text-sm">
          <pre><code>${escapeHTML(q.solucao || "")}</code></pre>
        </div>
        <div class="p-3 flex flex-col gap-3">
          <button class="copy-code-btn self-start bg-slate-600 text-white font-bold py-1 px-3 rounded hover:bg-slate-500 transition-colors">
            Copiar Código
          </button>
          ${
            q.criterios_correcao
              ? `
            <div class="bg-slate-50 border border-slate-200 rounded p-3">
              <h4 class="font-semibold text-slate-800 mb-1">Critérios de Correção</h4>
              <ul class="list-disc list-inside text-slate-700">
                ${q.criterios_correcao
                  .map((item) => `<li>${item}</li>`)
                  .join("")}
              </ul>
            </div>`
              : ""
          }
          ${
            q.justificativa
              ? `
            <div class="text-slate-700">
              <strong>Justificativa:</strong> ${q.justificativa}
            </div>`
              : ""
          }
        </div>
      `;
    }

    // Fallback: show generic code/text with copy button when present
    const hasCode =
      (q.solucao || "").includes("#include") ||
      (q.solucao || "").includes("```");
    return `
      <div class="p-4 ${hasCode ? "bg-slate-800 text-white mono text-sm" : ""}">
        <pre><code>${escapeHTML(
          q.solucao || "Sem solução disponível."
        )}</code></pre>
      </div>
      ${
        hasCode
          ? `
        <div class="p-3">
          <button class="copy-code-btn bg-slate-600 text-white font-bold py-1 px-3 rounded hover:bg-slate-500 transition-colors">
            Copiar Código
          </button>
        </div>`
          : ""
      }
    `;
  };

  // --- Helper: renderiza enunciado com suporte a ```code``` e `inline code`
  const renderEnunciadoRich = (raw = "") => {
    const text = String(raw);
    const fenceRegex = /```(\w+)?\n([\s\S]*?)```/g;

    // Função para inline code em um trecho sem cercas
    const renderInline = (s) =>
      escapeHTML(s).replace(
        /`([^`]+)`/g,
        '<code class="bg-slate-100 px-1 rounded font-mono">$1</code>'
      );

    let out = "";
    let lastIndex = 0;
    let match;

    while ((match = fenceRegex.exec(text)) !== null) {
      const before = text.slice(lastIndex, match.index);
      const code = match[2] || "";

      // trecho antes do bloco de código (com inline code)
      if (before.trim().length) {
        out += `<p class="mb-2">${renderInline(before)}</p>`;
      }

      // bloco de código com destaque de fundo escuro
      out += `
      <div class="bg-slate-800 text-white font-mono text-sm rounded-md overflow-x-auto p-3 my-3">
        <pre class="whitespace-pre-wrap"><code>${escapeHTML(code)}</code></pre>
      </div>
    `;

      lastIndex = match.index + match[0].length;
    }

    // resto do texto após o último bloco (com inline code)
    const after = text.slice(lastIndex);
    if (after.trim().length || out === "") {
      out += `<p class="mb-2">${renderInline(after)}</p>`;
    }

    return out;
  };

  // ---------------------------
  // UI helpers
  // ---------------------------

  // Show home page (cards) and hide dynamic content
  const showHomePage = () => {
    homeContent.classList.remove("hidden");
    dynamicContentContainer.classList.add("hidden");
    dynamicContentContainer.innerHTML = ""; // Clear dynamic content
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Initialize accordion behavior for solution toggles
  const initAccordions = () => {
    const accordions = document.querySelectorAll(".accordion-toggle");
    accordions.forEach((button) => {
      button.addEventListener("click", () => {
        const content = button.nextElementSibling;
        const isExpanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", !isExpanded);
        // Arrow rotation
        const arrow = button.querySelector("span:last-child");
        if (arrow) {
          arrow.style.transform = isExpanded
            ? "rotate(180deg)"
            : "rotate(0deg)";
        }
        // Smooth expand/collapse
        content.style.maxHeight = isExpanded
          ? "0px"
          : content.scrollHeight + "px";
      });
    });
  };

  // Initialize copy buttons (robust: finds the closest code within the same accordion)
  const initCopyButtons = () => {
    document.querySelectorAll(".copy-code-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const root =
          button.closest(".border-t") ||
          button.closest(".accordion-content") ||
          document;
        const codeEl = root.querySelector("pre code");
        const codeToCopy = codeEl ? codeEl.innerText : "";
        navigator.clipboard.writeText(codeToCopy).then(() => {
          const original = button.innerText;
          button.innerText = "Copiado!";
          setTimeout(
            () => (button.innerText = original || "Copiar Código"),
            1600
          );
        });
      });
    });
  };

  // ---------------------------
  // Content loaders
  // ---------------------------

  // Load and render HTML content (Aulas *.html)
  const loadContent = async (path) => {
    try {
      const response = await fetch(path);
      const html = await response.text();
      homeContent.classList.add("hidden");
      dynamicContentContainer.innerHTML = html;
      dynamicContentContainer.classList.remove("hidden");

      // Re-init interactive bits for newly injected content
      initAccordions();
      initCopyButtons();

      // Smooth scroll to top of the injected content
      dynamicContentContainer.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } catch (error) {
      console.error(`Erro ao carregar o conteúdo de ${path}:`, error);
      dynamicContentContainer.innerHTML = `<p class="text-red-500">Erro ao carregar o conteúdo.</p>`;
      dynamicContentContainer.classList.remove("hidden");
    }
  };

  // Load Aulas from aulas/aulas.json and render cards + sidebar links
  const loadAulas = async () => {
    try {
      const response = await fetch("aulas/aulas.json");
      const aulas = await response.json();

      // Add "Home" link to sidebar
      sidebarLinksContainer.innerHTML += `
       <li class="mb-2">
          <a id="home-link"
            href="index.html"
            class="group block w-full rounded-lg bg-slate-700 text-white px-3 py-2 font-semibold shadow-sm ring-1 ring-slate-600/40
              hover:bg-slate-600 hover:ring-slate-500 transition-colors">
          <span class="inline-flex items-center gap-2">
            <i class="fa-solid fa-house text-slate-200 group-hover:translate-x-0.5 transition-transform"></i>
              Página Inicial
          </span>
          </a>
        </li>`;

      aulas.forEach((aula) => {
        // Separa prefixo (antes dos dois pontos) e o resto do título
        const [prefixoRaw, ...restoArr] = String(aula.titulo || "").split(":");
        const prefixo = prefixoRaw?.trim() || "Aula";
        const tituloResto = restoArr.join(":").trim() || ""; // pode estar vazio, tudo bem

        // --- Sidebar link com badge do prefixo ---
        const li = document.createElement("li");
        li.innerHTML = `
    <a href="#"
       data-path="aulas/${aula.arquivo}"
       class="nav-link group block font-semibold ${
         aula.ativo
           ? "hover:text-indigo-300"
           : "nav-link-disabled opacity-70 cursor-not-allowed"
       } transition-colors">
      <span class="inline-flex items-center gap-2">
        <span class="px-2 py-0.5 text-[11px] rounded-md bg-indigo-500/15 text-indigo-200 ring-1 ring-indigo-400/30">
          ${prefixo}
        </span>
        <span class="text-slate-100 group-hover:text-indigo-200">
          ${tituloResto || prefixo}
        </span>
      </span>
    </a>`;
        sidebarLinksContainer.appendChild(li);

        // --- Card da home com badge + título claro ---
        const card = document.createElement("div");
        card.className = `block bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all ${
          !aula.ativo ? "cursor-not-allowed opacity-70" : "cursor-pointer"
        }`;

        card.innerHTML = `
    <div class="flex items-center gap-2 mb-3">
      <span class="px-2 py-0.5 text-xs rounded-md bg-indigo-600/10 text-indigo-700 ring-1 ring-indigo-600/20">
        ${prefixo}
      </span>
      ${
        tituloResto
          ? `<span class="text-slate-500 text-sm">${tituloResto}</span>`
          : ""
      }
    </div>
    <h3 class="font-bold text-xl text-indigo-700 mb-2">
      ${tituloResto || prefixo}
    </h3>
    <p class="text-slate-600">${aula.descricao}</p>
  `;

        if (aula.ativo) {
          card.addEventListener("click", () =>
            loadContent(`aulas/${aula.arquivo}`)
          );
          // também deixa o link da sidebar navegável:
          li.querySelector("a").addEventListener("click", (e) => {
            e.preventDefault();
            loadContent(`aulas/${aula.arquivo}`);
          });
        }

        cardsContainer.appendChild(card);
      });
    } catch (error) {
      console.error("Erro ao carregar aulas.json:", error);
    }
  };

  // Load Lists (index) from listas/listas.json and render cards + sidebar links
  const loadListas = async () => {
    try {
      const response = await fetch("listas/listas.json");
      const listas = await response.json();

      listas.forEach((lista) => {
        // Separa prefixo (antes de “:”) e o restante do título
        const [prefixoRaw, ...restoArr] = String(lista.titulo || "").split(":");
        const prefixo = (prefixoRaw || "Lista").trim();
        const tituloResto = restoArr.join(":").trim() || "";

        // --- Sidebar link com badge ---
        const li = document.createElement("li");
        li.innerHTML = `
    <a href="#"
       data-path="listas/${lista.arquivo}"
       class="nav-link group block font-semibold hover:text-indigo-300 transition-colors">
      <span class="inline-flex items-center gap-2">
        <span class="px-2 py-0.5 text-[11px] rounded-md bg-indigo-500/15 text-indigo-200 ring-1 ring-indigo-400/30">
          ${prefixo}
        </span>
        <span class="text-slate-100 group-hover:text-indigo-200">
          ${tituloResto || prefixo}
        </span>
      </span>
    </a>`;
        sidebarLinksContainer.appendChild(li);

        // Garante que o clique na sidebar respeita o flag mostrar_solucoes
        li.querySelector("a").addEventListener("click", (e) => {
          e.preventDefault();
          loadListaDetalhe(lista.arquivo, lista.mostrar_solucoes);
        });

        // --- Card da home com badge + “status” de soluções ---
        const card = document.createElement("div");
        card.className =
          "block bg-indigo-50 p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer";

        const statusSolucao =
          lista.mostrar_solucoes === false
            ? {
                text: "Soluções ocultas",
                cls: "bg-amber-100 text-amber-800 ring-1 ring-amber-200",
              }
            : {
                text: "Soluções visíveis",
                cls: "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200",
              };

        card.innerHTML = `
    <div class="flex items-center gap-2 mb-3">
      <span class="px-2 py-0.5 text-xs rounded-md bg-indigo-600/10 text-indigo-700 ring-1 ring-indigo-600/20">
        ${prefixo}
      </span>
      ${
        tituloResto
          ? `<span class="text-indigo-700/70 text-sm">${tituloResto}</span>`
          : ""
      }
      <span class="ml-auto text-[11px] px-2 py-0.5 rounded-full ${
        statusSolucao.cls
      }">
        ${statusSolucao.text}
      </span>
    </div>
    <h3 class="font-bold text-xl text-indigo-800 mb-2">
      ${tituloResto || prefixo}
    </h3>
    <p class="text-slate-700">${lista.descricao || ""}</p>
  `;

        card.addEventListener("click", () =>
          loadListaDetalhe(lista.arquivo, lista.mostrar_solucoes)
        );

        listasContainer.appendChild(card);
      });
    } catch (error) {
      console.error("Erro ao carregar listas.json:", error);
    }
  };

  // Load and render a specific List JSON (listas/*.json)
  const loadListaDetalhe = async (jsonFile, overrideMostrar) => {
    try {
      const response = await fetch(`listas/${jsonFile}`);
      const data = await response.json();

      // Default: show solutions unless explicitly false
      const canShowSolutions =
        typeof overrideMostrar === "boolean"
          ? overrideMostrar
          : data.mostrar_solucoes !== false;

      const headerExtra = !canShowSolutions
        ? `<div class="mt-4 bg-amber-50 border-l-4 border-amber-500 text-amber-800 p-4 rounded-r">
             <p class="text-sm"><strong>Aviso:</strong> As soluções desta lista estão ocultas.</p>
           </div>`
        : "";

      // Header
      let contentHTML = `
        <section class="mb-16">
          <header class="mb-12">
            <h2 class="text-4xl font-bold text-slate-900">${data.titulo}</h2>
            <p class="text-lg text-slate-600 mt-2">${data.descricao || ""}</p>
            ${headerExtra}
          </header>
          <div class="space-y-6">
      `;

      // Questions
      (data.questoes || []).forEach((q) => {
        contentHTML += `
          <div class="bg-white border border-slate-200 rounded-lg">
            <div class="p-5">
              <div class="font-semibold text-slate-800">
  <div class="mb-1">${q.id}.</div>
  ${renderEnunciadoRich(q.enunciado || "")}
</div>
              ${
                q.dica
                  ? `<div class="mt-2 text-sm text-slate-600"><p><strong>Dica:</strong> ${q.dica}</p></div>`
                  : ""
              }
              ${q.alternativas ? renderAlternativas(q.alternativas) : ""}
            </div>
            <div class="border-t border-slate-200">
              <button class="accordion-toggle w-full flex justify-between items-center p-3 font-semibold text-left text-sm text-indigo-700" aria-expanded="false">
                <span>${
                  canShowSolutions ? "Mostrar Solução" : "Soluções Ocultas"
                }</span>
                <span class="transform transition-transform duration-300 rotate-180">▼</span>
              </button>
              <div class="accordion-content overflow-hidden transition-all duration-500 ease-in-out" style="max-height: 0px;">
                ${renderSolucao(q, canShowSolutions)}
              </div>
            </div>
          </div>
        `;
      });

      contentHTML += `</div></section>`;

      // Render + init
      homeContent.classList.add("hidden");
      dynamicContentContainer.classList.remove("hidden");
      dynamicContentContainer.innerHTML = contentHTML;

      initAccordions();
      initCopyButtons();
      dynamicContentContainer.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } catch (error) {
      console.error(`Erro ao carregar a lista ${jsonFile}:`, error);
      dynamicContentContainer.innerHTML = `<p class="text-red-500">Erro ao carregar a lista.</p>`;
      dynamicContentContainer.classList.remove("hidden");
    }
  };

  // ---------------------------
  // Sidebar event delegation
  // ---------------------------
  sidebarLinksContainer.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;

    // Home link -> show home without page reload
    if (link.getAttribute("href") === "index.html") {
      event.preventDefault();
      showHomePage();
      return;
    }

    // Dynamic content
    if (link.dataset.path) {
      event.preventDefault();
      const path = link.dataset.path;

      if (path.startsWith("listas/")) {
        // Usa o flag gravado no data-mostrar do link da sidebar
        const ds = link.dataset.mostrar; // "true" | "false" | undefined
        const override =
          ds === "true" ? true : ds === "false" ? false : undefined;

        loadListaDetalhe(path.replace("listas/", ""), override);
      } else {
        loadContent(path);
      }
    }
  });

  // ---------------------------
  // Initial load
  // ---------------------------

  loadAulas();
  loadListas();
});
