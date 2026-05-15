import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: () => import('../views/BlogView.vue'),
    },
    {
      path: '/docs',
      name: 'docs',
      component: () => import('../views/DocsView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/HomeView.vue'), // Placeholder for now
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/HomeView.vue'), // Placeholder for now
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
