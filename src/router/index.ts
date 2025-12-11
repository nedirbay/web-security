import { createRouter, createWebHistory } from 'vue-router'
import UserLayout from '../layouts/UserLayout.vue' // Ýoly dogrylaň
import HomeView from '../views/HomeView.vue' // Ýoly dogrylaň

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: UserLayout, // Layout-y ulanýarys
      children: [
        {
          path: '', // Boş ýol '/' diýmekdir
          name: 'home',
          component: HomeView, // Layout-yň içindäki <router-view>-da açylar
        },
        {
          path: 'detail/:id',
          name: 'detail',
          component: () => import('../views/DetailView.vue'),
        },
        {
          path: 'docs',
          name: 'docs',
          component: () => import('../views/DocsView.vue'),
        },
        {
          path: 'docs/getting-started',
          name: 'getting-started',
          component: () => import('../views/docs/GettingStartedView.vue'),
        },
        {
          path: 'docs/owasp-top-10',
          name: 'owasp-top-10',
          component: () => import('../views/docs/OWASPTop10View.vue'),
        },
        {
          path: 'docs/secure-coding',
          name: 'secure-coding',
          component: () => import('../views/docs/SecureCodingView.vue'),
        },
        {
          path: 'docs/api-security',
          name: 'api-security',
          component: () => import('../views/docs/APISecurityView.vue'),
        },
        {
          path: 'docs/authentication',
          name: 'authentication',
          component: () => import('../views/docs/AuthenticationView.vue'),
        },
        {
          path: 'docs/faq',
          name: 'faq',
          component: () => import('../views/docs/FAQView.vue'),
        },
      ],
    },
    {
      path: '/login',
      component: () => import('../layouts/LoginLayout.vue'),
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('../views/LoginView.vue'),
        },
      ],
    },
    {
      path: '/dashboard',
      component: () => import('../layouts/AdminLayout.vue'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../views/Dasboard.vue'),
        },
        {
          path: 'scan',
          name: 'scan',
          component: () => import('../views/ScanView.vue'),
        },
        {
          path: 'history',
          name: 'history',
          component: () => import('../views/ScanHistoryView.vue'),
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('../views/SettingsView.vue'),
        },
      ],
    },
  ],
})

export default router
