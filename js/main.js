document.addEventListener('DOMContentLoaded', () => {
    const sidebarLinksContainer = document.getElementById('sidebar-links');
    const cardsContainer = document.getElementById('cards-container');
    const listasContainer = document.getElementById('listas-container');
    const dynamicContentContainer = document.getElementById('dynamic-content');
    const homeContent = document.getElementById('home-content');

    // Função para mostrar o conteúdo da página inicial
    const showHomePage = () => {
        homeContent.classList.remove('hidden');
        dynamicContentContainer.classList.add('hidden');
        dynamicContentContainer.innerHTML = ''; // Limpa qualquer conteúdo dinâmico
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Função para carregar e exibir um conteúdo (aula)
    const loadContent = async (path) => {
        try {
            const response = await fetch(path);
            const html = await response.text();
            homeContent.classList.add('hidden');
            dynamicContentContainer.innerHTML = html;
            dynamicContentContainer.classList.remove('hidden');
            
            // Re-inicializa os scripts necessários para o novo conteúdo
            initAccordions();
            initCopyButtons();

            // Scroll suave para o topo do conteúdo
            dynamicContentContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

        } catch (error) {
            console.error(`Erro ao carregar o conteúdo de ${path}:`, error);
            dynamicContentContainer.innerHTML = `<p class="text-red-500">Erro ao carregar o conteúdo.</p>`;
        }
    };
    
    // Função para carregar as aulas a partir do JSON
    const loadAulas = async () => {
        try {
            const response = await fetch('aulas/aulas.json');
            const aulas = await response.json();

            // Adiciona o link para a página inicial na sidebar
            sidebarLinksContainer.innerHTML += `<li><a href="index.html" class="block font-bold hover:text-indigo-400 transition-colors">Página Inicial</a></li>`;

            aulas.forEach(aula => {
                // Adiciona o link na sidebar
                const sidebarLink = document.createElement('li');
                sidebarLink.innerHTML = `<a href="#" data-path="aulas/${aula.arquivo}" class="nav-link block font-bold ${aula.ativo ? 'hover:text-indigo-400' : 'nav-link-disabled'} transition-colors">${aula.titulo}</a>`;
                sidebarLinksContainer.appendChild(sidebarLink);

                // Adiciona o card na página inicial
                const card = document.createElement('div');
                card.className = `block bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all ${!aula.ativo ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`;
                card.innerHTML = `<h3 class="font-bold text-xl text-indigo-600 mb-2">${aula.titulo.split(':')[0]}</h3><p>${aula.descricao}</p>`;
                if (aula.ativo) {
                    card.addEventListener('click', () => loadContent(`aulas/${aula.arquivo}`));
                }
                cardsContainer.appendChild(card);
            });

        } catch (error) {
            console.error('Erro ao carregar aulas.json:', error);
        }
    };

    // Função para carregar as listas de exercícios
    const loadListas = async () => {
         try {
            const response = await fetch('listas/listas.json');
            const listas = await response.json();

            listas.forEach(lista => {
                // Adiciona o link na sidebar
                const sidebarLink = document.createElement('li');
                sidebarLink.innerHTML = `<a href="#" data-path="listas/${lista.arquivo}" class="nav-link block font-bold hover:text-indigo-400 transition-colors">${lista.titulo}</a>`;
                sidebarLinksContainer.appendChild(sidebarLink);

                // Adiciona o card na página inicial
                const card = document.createElement('div');
                card.className = 'block bg-indigo-50 p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer';
                card.innerHTML = `<h3 class="font-bold text-xl text-indigo-800 mb-2">${lista.titulo}</h3><p>${lista.descricao}</p>`;
                card.addEventListener('click', () => loadListaDetalhe(lista.arquivo));
                listasContainer.appendChild(card);
            });

        } catch (error) {
            console.error('Erro ao carregar listas.json:', error);
        }
    };
    
    // Função para carregar uma lista de exercícios específica
    const loadListaDetalhe = async (jsonFile) => {
        try {
            const response = await fetch(`listas/${jsonFile}`);
            const data = await response.json();

            homeContent.classList.add('hidden');
            dynamicContentContainer.classList.remove('hidden');
            
            let contentHTML = `
                <section class="mb-16">
                    <header class="mb-12">
                        <h2 class="text-4xl font-bold text-slate-900">${data.titulo}</h2>
                        <p class="text-lg text-slate-600 mt-2">${data.descricao}</p>
                    </header>
                    <div class="space-y-6">
            `;

            data.questoes.forEach(q => {
                contentHTML += `
                    <div class="bg-white border border-slate-200 rounded-lg">
                        <div class="p-5">
                            <p class="font-semibold">${q.id}. ${q.enunciado}</p>
                            <div class="mt-2 text-sm text-slate-600">
                                <p><strong>Dica:</strong> ${q.dica}</p>
                            </div>
                        </div>
                        <div class="border-t border-slate-200">
                            <button class="accordion-toggle w-full flex justify-between items-center p-3 font-semibold text-left text-sm text-indigo-700" aria-expanded="false">
                                <span>Mostrar Solução</span>
                                <span class="transform transition-transform duration-300 rotate-180">▼</span>
                            </button>
                            <div class="accordion-content overflow-hidden transition-all duration-500 ease-in-out" style="max-height: 0px;">
                                <div class="p-4 bg-slate-800 text-white mono text-sm">
                                    <pre><code>${q.solucao.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });

            contentHTML += `</div></section>`;
            dynamicContentContainer.innerHTML = contentHTML;
            initAccordions();
            dynamicContentContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

        } catch (error) {
            console.error(`Erro ao carregar a lista ${jsonFile}:`, error);
        }
    };

    // Delegação de eventos na sidebar para carregar conteúdo
    sidebarLinksContainer.addEventListener('click', (event) => {
        const link = event.target.closest('a');
        if (!link) return;

        // Se for o link da página inicial, chama a função para mostrar o conteúdo principal
        if (link.getAttribute('href') === 'index.html') {
            event.preventDefault(); // Impede a recarga da página
            showHomePage();
            return;
        }

        // Se for um link de conteúdo dinâmico
        if (link.dataset.path) {
            event.preventDefault();
            const path = link.dataset.path;
            if (path.startsWith('listas/')) {
                loadListaDetalhe(path.replace('listas/', ''));
            } else {
                loadContent(path);
            }
        }
    });

    // Funções de inicialização de componentes (acordeão, botões de copiar, etc.)
    const initAccordions = () => {
        const accordions = document.querySelectorAll('.accordion-toggle');
        accordions.forEach(button => {
            button.addEventListener('click', () => {
                const content = button.nextElementSibling;
                const isExpanded = button.getAttribute('aria-expanded') === 'true';
                button.setAttribute('aria-expanded', !isExpanded);
                button.querySelector('span:last-child').style.transform = isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
                content.style.maxHeight = isExpanded ? '0px' : content.scrollHeight + 'px';
            });
        });
    };

    const initCopyButtons = () => {
        document.querySelectorAll('.copy-code-btn').forEach(button => {
            button.addEventListener('click', () => {
                const codeToCopy = button.previousElementSibling.innerText;
                navigator.clipboard.writeText(codeToCopy).then(() => {
                    button.innerText = 'Copiado!';
                    setTimeout(() => {
                        button.innerText = 'Copiar Código';
                    }, 2000);
                });
            });
        });
    };

    // Carregamento inicial
    loadAulas();
    loadListas();
});
