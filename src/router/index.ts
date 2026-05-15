import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/blogs', name: 'blogs', component: () => import('../views/BlogView.vue') },
    { path: '/docs', name: 'docs', component: () => import('../views/DocsView.vue') },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    { path: '/register', name: 'register', component: () => import('../views/RegisterView.vue') },
    { path: '/forgot-password', name: 'forgot-password', component: () => import('../views/ForgotPasswordView.vue') },
    { path: '/reset-password', name: 'reset-password', component: () => import('../views/ResetPasswordView.vue') },
    {
      path: '/dashboard',
      component: () => import('../layouts/DashboardLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        { path: '', name: 'dashboard-overview', component: () => import('../views/DashboardOverview.vue') },
        { path: 'targets', name: 'dashboard-targets', component: () => import('../views/TargetsView.vue') },
        { path: 'scans', name: 'dashboard-scans', component: () => import('../views/ScanResultsView.vue') },
        { path: 'vulnerabilities', name: 'dashboard-vulnerabilities', component: () => import('../views/VulnerabilitiesView.vue') },
        { path: 'analytics', name: 'dashboard-analytics', component: () => import('../views/AnalyticsView.vue') },
        { path: 'schedules', name: 'dashboard-schedules', component: () => import('../views/SchedulesView.vue') },
        { path: 'advanced', name: 'dashboard-advanced', component: () => import('../views/AdvancedScansView.vue') },
        { path: 'profile', name: 'dashboard-profile', component: () => import('../views/ProfileView.vue') },
        { path: 'api-console', name: 'dashboard-api-console', component: () => import('../views/ApiConsoleView.vue'), meta: { requiresAdmin: true } },
        { path: 'system', name: 'dashboard-system', component: () => import('../views/SystemView.vue'), meta: { requiresAdmin: true } },
        { path: 'admin/users', name: 'dashboard-admin-users', component: () => import('../views/AdminUsersView.vue'), meta: { requiresAdmin: true } },
        { path: 'admin/settings', name: 'dashboard-admin-settings', component: () => import('../views/AdminSettingsView.vue'), meta: { requiresAdmin: true } },
        { path: 'admin/audit-logs', name: 'dashboard-admin-audit-logs', component: () => import('../views/AdminAuditLogsView.vue'), meta: { requiresAdmin: true } },
        { path: 'admin/blog-posts', name: 'dashboard-admin-blog-posts', component: () => import('../views/AdminBlogPostsView.vue'), meta: { requiresAdmin: true } },
        { path: 'admin/docs-pages', name: 'dashboard-admin-docs-pages', component: () => import('../views/AdminDocsPagesView.vue'), meta: { requiresAdmin: true } },
      ],
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isLoggedIn

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next('/dashboard')
  } else if ((to.name === 'login' || to.name === 'register') && isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
