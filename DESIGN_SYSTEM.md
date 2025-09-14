# Design System — Material 3 (MD3)

Este documento consolida padrões de UI e guias de uso para manter o projeto consistente, fácil de evoluir e de manter. O foco é Material Design 3 (MD3) usando Tailwind.

## Paleta e Tokens

- CSS vars (claro/escuro) em `style.css` controlam superfícies, texto e acento.
- Tailwind já está estendido em `tailwind.config.js` com tokens:
  - `primary`, `secondary`, `success`, `warning`, `error`, `neutral`
  - Tipografia MD3 (title/body/label/headline/display)
  - Elevação MD3: `shadow-elevation-1` … `shadow-elevation-5`

Recomendações:
- Prefira tokens (ex.: `text-neutral-700`, `bg-primary-50`) a cores cruas.
- Evite `indigo/*` e `slate/*` em novos códigos. Use `primary/*` e `neutral/*`.

## Utilitários Globais (@layer components)

Todos definidos em `style.css`, sob `@layer components`.

### Botões
- Base: `.btn`
- Variações: `.btn-filled`, `.btn-outlined`, `.btn-tonal`, `.btn-icon`

Exemplos:
```
<button class="btn btn-filled">Salvar</button>
<button class="btn btn-outlined">Cancelar</button>
<button class="btn btn-tonal">Ação secundária</button>
<button class="btn btn-icon" aria-label="Mais"><i class="fa-solid fa-ellipsis"></i></button>
```

### Dropdown
- Itens: `.dropdown-item` e `.dropdown-item.active`

```
<button class="btn btn-tonal" aria-haspopup="menu">Filtros</button>
<ul role="menu">
  <li><button class="dropdown-item active">Item ativo</button></li>
  <li><button class="dropdown-item">Outro item</button></li>
</ul>
```

### Cards
- Contêiner: `.card`
- Interação (hover): `.card--interactive`

```
<div class="card card--interactive">
  <h3 class="text-title-medium">Título</h3>
  <p class="text-body-medium text-neutral-700">Descrição</p>
</div>
```

### Badges
- Base: `.badge`
- Variações: `.badge--success`, `.badge--warning`, `.badge--secondary`

```
<span class="badge badge--success">Disponível</span>
<span class="badge badge--warning">Em breve</span>
<span class="badge badge--secondary">Exercícios</span>
```

### Progresso
- Barra: `.progress` + `.progress__bar`
- Cores: `.progress__bar--primary|--secondary`

```
<div class="progress" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
  <div class="progress__bar progress__bar--secondary" style="width: 40%"></div>
</div>
```

## Padrões de Layout

### Header Global
- Componente: `components/GlobalHeader.vue`
- Estilo tonal MD3, compacto (py-2, px-4) e sticky `z-50`.
- Filtros (apenas Home), tema, voltar.

### FAB “Voltar ao topo”
- Componente: `components/FabBackTop.vue`
- Estilo adaptativo:
  - Nas aulas: `.btn.btn-icon.btn-tonal`
  - Outras rotas: `.btn.btn-icon.btn-filled`
- Aparece após ~80px e sobe o `#main-root` ou `window` suavemente.

## Acessibilidade (a11y)

- Use `aria-label` em botões icônicos e `role="menu"`/`role="menuitem"` em dropdowns.
- Para itens inativos clicáveis, use `aria-disabled="true"` e `tabindex="-1"`.
- Em barras de progresso, use `role="progressbar"` e `aria-valuenow/min/max`.

## Migração (antes → depois)

- Cores: `slate/*` → `neutral/*`; `indigo/*` → `primary/*`
- Cards com utilitários longos → `.card .card--interactive`
- Badges ad-hoc → `.badge` + variação
- Barras artesanais → `.progress` + `.progress__bar`
- Botões variados → `.btn` + variação

## Exemplos de Aplicação

### AulaCard
```
<router-link class="card card--interactive" ...>
  <span class="badge badge--success">Disponível</span>
  <h3 class="text-title-large text-primary-800">Título</h3>
  <p class="text-body-medium text-neutral-700">Descrição</p>
</router-link>
```

### ListaCard
```
<router-link class="card card--interactive" ...>
  <div class="badge badge--secondary">Exercícios</div>
  <h3 class="text-title-large text-secondary-800">Lista X</h3>
  <p class="text-body-medium text-neutral-700">Descrição</p>
  <div class="progress"><div class="progress__bar progress__bar--secondary" style="width: 75%"></div></div>
</router-link>
```

## Boas práticas

- Priorize classes utilitárias centralizadas ao invés de sequências longas por componente.
- Evite inline-style de cor quando houver token/variação disponível.
- Prefira `text-body-*`/`text-title-*` (tipografia MD3) a tamanhos manuais.
- Nas aulas HTML, atualize gradualmente para usar os utilitários padronizados.

## Roadmap sugerido

- [ ] Padronizar seções e títulos (ex.: `.section`, `.section__title`).
- [ ] Utilitário para chips/filtros (seleção múltipla, estados).
- [ ] Estados de formulário (focus/error/success) com tokens MD3.
- [ ] Documentar padrões de espaçamento e grid.

