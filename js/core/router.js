import { createRouter, createWebHashHistory } from 'vue-router';
// Storage utilities are no longer needed in Vue Router

// Import views (we'll create these components)
const HomeView = () => import('../../views/HomeView.vue');
const AulaView = () => import('../../views/AulaView.vue');
const ListaView = () => import('../../views/ListaView.vue');
const PoliticaView = () => import('../../views/PoliticaView.vue');

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/aula/:id',
    name: 'aula',
    component: AulaView,
    props: true
  },
  {
    path: '/lista/:id',
    name: 'lista',
    component: ListaView,
    props: true
  },
  {
    path: '/politica',
    name: 'politica',
    component: PoliticaView
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// Navigation guards for persistence
router.beforeEach((to, from, next) => {
  // Save current route for persistence
  if (to.name && to.params.id) {
    localStorage.setItem('lastRoute', `${to.name}=${encodeURIComponent(to.params.id)}`);
  }
  next();
});

// Legacy toggling removed: MD3-only styles

export default router;
