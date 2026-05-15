<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span class="text-xl font-bold tracking-tight text-black uppercase">Guardly</span>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center gap-8">
          <router-link to="/" class="text-sm font-medium text-gray-600 hover:text-black transition-colors">Home</router-link>
          <router-link to="/blogs" class="text-sm font-medium text-gray-600 hover:text-black transition-colors">Blogs</router-link>
          <router-link to="/docs" class="text-sm font-medium text-gray-600 hover:text-black transition-colors">Documentation</router-link>
        </nav>

        <!-- CTA Buttons -->
        <div class="flex items-center gap-4">
          <router-link to="/login" class="text-sm font-medium text-black hover:text-gray-600 transition-colors">Login</router-link>
          <router-link to="/register" class="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all shadow-sm">
            Get Started
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// Navigation Logic
</script>

<style scoped>
.router-link-active {
  color: black;
  font-weight: 600;
}
</style>
