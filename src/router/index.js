import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AuthView from '@/views/AuthView.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const requireAuth = (to, from, next) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      next();
    } else {
      next('/auth');
    }
  });
};

const routes = [
  { path: '/', name: 'home', component: HomeView, beforeEnter: requireAuth },
  { path: '/auth', name: 'auth', component: AuthView }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
