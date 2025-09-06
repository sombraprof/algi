// Configuração do cache do Service Worker
// A versão do cache agora é derivada automaticamente do parâmetro `build` usado no registro do SW (index.html).
// Mantenha apenas o prefixo aqui.
self.APP_CACHE_PREFIX = self.APP_CACHE_PREFIX || 'spa-starter';
