<template>
  <div class="min-h-screen flex items-center justify-center bg-white px-4">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-black">Ulgama gir</h2>
        <p class="mt-2 text-sm text-gray-500">
          Ýa-da
          <router-link to="/register" class="font-medium text-blue-600 hover:text-blue-500">
            täze hasap döret
          </router-link>
        </p>
        <p class="mt-2 text-sm">
          <router-link to="/forgot-password" class="font-medium text-blue-600 hover:text-blue-500">
            Paroly unutdyňyzmy?
          </router-link>
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="email" class="sr-only">Email salgysy</label>
            <input 
              v-model="form.email"
              id="email" 
              name="email" 
              type="email" 
              required 
              class="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all" 
              placeholder="Email salgysy" 
            />
          </div>
          <div>
            <label for="password" class="sr-only">Parol</label>
            <input 
              v-model="form.password"
              id="password" 
              name="password" 
              type="password" 
              required 
              class="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all" 
              placeholder="Parol" 
            />
          </div>
        </div>

        <div v-if="authStore.error" class="text-red-500 text-sm text-center">
          {{ authStore.error }}
        </div>

        <div>
          <button 
            type="submit" 
            :disabled="authStore.loading"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all disabled:opacity-50"
          >
            <span v-if="authStore.loading">Girilýär...</span>
            <span v-else>Giriş</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
  email: '',
  password: ''
})

const handleLogin = async () => {
  const success = await authStore.login(form)
  if (success) {
    router.push('/dashboard')
  }
}
</script>
