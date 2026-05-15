<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col fixed h-full z-30">
      <div class="p-6">
        <router-link to="/" class="flex items-center gap-2 group">
          <div class="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span class="text-lg font-bold tracking-tight text-black uppercase">Guardly</span>
        </router-link>
      </div>

      <nav class="flex-1 px-4 space-y-1">
        <router-link 
          v-for="item in menuItems" 
          :key="item.path" 
          :to="item.path"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
          :class="$route.path === item.path ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:text-black hover:bg-gray-50'"
        >
          <component :is="item.icon" class="w-5 h-5" />
          {{ item.name }}
        </router-link>

        <div class="pt-6 pb-2 px-4">
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Public Site</p>
        </div>
        <router-link to="/" class="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-500 hover:text-black hover:bg-gray-50 rounded-xl transition-all">
          Home
        </router-link>
        <router-link to="/blogs" class="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-500 hover:text-black hover:bg-gray-50 rounded-xl transition-all">
          Blogs
        </router-link>
        <router-link to="/docs" class="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-500 hover:text-black hover:bg-gray-50 rounded-xl transition-all">
          Documentation
        </router-link>

        <!-- Admin Panel Link -->
        <a 
          v-if="authStore.isAdmin"
          href="http://localhost:8000/admin/"
          target="_blank"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-purple-600 hover:bg-purple-50 transition-all mt-4 border border-purple-100 border-dashed"
        >
          <AdminIcon class="w-5 h-5" />
          Admin Panel
        </a>
      </nav>

      <div class="p-4 border-t border-gray-100">
        <button 
          @click="handleLogout"
          class="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
        >
          <LogoutIcon class="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 lg:ml-64 min-h-screen flex flex-col">
      <!-- Top Header -->
      <header class="h-16 bg-white border-b border-gray-200 sticky top-0 z-20 px-4 sm:px-8 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <button class="lg:hidden p-2 text-gray-500">
            <MenuIcon class="w-6 h-6" />
          </button>
          <h1 class="text-sm font-bold text-gray-400 uppercase tracking-widest">
            {{ currentRouteName }}
          </h1>
        </div>

        <div class="flex items-center gap-4">
          <button class="p-2 text-gray-400 hover:text-black transition-colors relative">
            <BellIcon class="w-6 h-6" />
            <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div class="h-8 w-px bg-gray-200"></div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
              {{ getInitial(authStore.user?.username) }}
            </div>
            <span class="text-sm font-bold text-black hidden sm:block">
              {{ authStore.user?.username }}
            </span>
          </div>
        </div>
      </header>

      <!-- Content -->
      <div class="p-4 sm:p-8 flex-1">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Simple SVG Icon Components
const HomeIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })])
const TargetIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' })])
const ScanIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' })])
const UserIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' })])
const LogoutIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' })])
const BellIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' })])
const MenuIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4 6h16M4 12h16M4 18h16' })])
const AdminIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }), h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' })])
const ConsoleIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M8 9l3 3-3 3m5 0h3M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z' })])
const AlertIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' })])
const ChartIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 19V6h6v13M3 19h18M3 13h6m6 0h6' })])
const ClockIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z' })])
const SparkIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 10V3L4 14h7v7l9-11h-7z' })])
const ClipboardIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' })])
const BookIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' })])
const ServerIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M5 12H4a1 1 0 01-1-1V5a1 1 0 011-1h16a1 1 0 011 1v6a1 1 0 01-1 1h-1m-2 0H7m12 0a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6a1 1 0 011-1h14z' })])

import { h } from 'vue'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()
const getInitial = (name?: string) => name?.trim().charAt(0)?.toUpperCase() || '?'

const menuItems = computed(() => [
  { name: 'Overview', path: '/dashboard', icon: HomeIcon },
  { name: 'My Targets', path: '/dashboard/targets', icon: TargetIcon },
  { name: 'Scan Results', path: '/dashboard/scans', icon: ScanIcon },
  { name: 'Vulnerabilities', path: '/dashboard/vulnerabilities', icon: AlertIcon },
  { name: 'Analytics', path: '/dashboard/analytics', icon: ChartIcon },
  { name: 'Schedules', path: '/dashboard/schedules', icon: ClockIcon },
  { name: 'Advanced Scans', path: '/dashboard/advanced', icon: SparkIcon },
  { name: 'Profile', path: '/dashboard/profile', icon: UserIcon },
  ...(authStore.isAdmin
    ? [
        { name: 'Users', path: '/dashboard/admin/users', icon: UserIcon },
        { name: 'Settings', path: '/dashboard/admin/settings', icon: AdminIcon },
        { name: 'Audit Logs', path: '/dashboard/admin/audit-logs', icon: ClipboardIcon },
        { name: 'Blog Posts', path: '/dashboard/admin/blog-posts', icon: BookIcon },
        { name: 'Docs Pages', path: '/dashboard/admin/docs-pages', icon: BookIcon },
        { name: 'System', path: '/dashboard/system', icon: ServerIcon },
        { name: 'API Console', path: '/dashboard/api-console', icon: ConsoleIcon },
      ]
    : []),
])

const currentRouteName = computed(() => {
  const item = menuItems.value.find(m => m.path === route.path)
  return item ? item.name : 'Dashboard'
})

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
