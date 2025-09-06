// Configuração do cache do Service Worker
// Ajuste a versão para invalidar caches dos clientes em um novo deploy.
self.APP_CACHE_PREFIX = self.APP_CACHE_PREFIX || 'spa-starter';
// Dica: incremente a versão a cada novo deploy para invalidar o cache dos clientes
self.APP_CACHE_VERSION = self.APP_CACHE_VERSION || 'v1.0.1';
