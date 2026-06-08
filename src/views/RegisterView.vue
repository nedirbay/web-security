<template>
  <div class="min-h-screen flex items-center justify-center bg-white px-4">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-black">Hasap döret</h2>
        <p class="mt-2 text-sm text-gray-500">
          Eýýäm hasabyňyz barmy? 
          <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-500">
            Giriş ediň
          </router-link>
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="username" class="sr-only">Ulanyjy ady</label>
            <input 
              v-model="form.username"
              id="username" 
              name="username" 
              type="text" 
              required 
              class="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all" 
              placeholder="Ulanyjy ady" 
            />
          </div>
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
          <div>
            <label for="password_confirm" class="sr-only">Paroly tassyklaň</label>
            <input
              v-model="form.password_confirm"
              id="password_confirm"
              name="password_confirm"
              type="password"
              required
              class="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              placeholder="Paroly tassyklaň"
            />
          </div>
        </div>

        <div v-if="authStore.error" class="text-red-500 text-sm text-center">
          {{ authStore.error }}
        </div>

        <div v-if="successMsg" class="text-green-500 text-sm text-center">
          {{ successMsg }}
        </div>

        <div>
          <button 
            type="submit" 
            :disabled="authStore.loading"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all disabled:opacity-50"
          >
            <span v-if="authStore.loading">Döredilýär...</span>
            <span v-else>Hasap döret</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const successMsg = ref('')

const form = reactive({
  username: '',
  email: '',
  password: '',
  password_confirm: ''
})

const handleRegister = async () => {
  const success = await authStore.register(form)
  if (success) {
    successMsg.value = 'Hasabyňyz döredildi! Giriş edip bilersiňiz.'
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  }
}
</script>
