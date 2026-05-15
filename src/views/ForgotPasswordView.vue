<template>
  <div class="min-h-screen flex items-center justify-center bg-white px-4">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-black">Paroly täzeden goý</h2>
        <p class="mt-2 text-sm text-gray-500">
          Emailiňize tassyklama baglanyşygy iberiler.
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="submit">
        <div>
          <label for="email" class="sr-only">Email salgysy</label>
          <input
            v-model="form.email"
            id="email"
            type="email"
            required
            placeholder="Email salgysy"
            class="appearance-none rounded-xl block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div v-if="message" :class="ok ? 'text-emerald-600' : 'text-red-500'" class="text-sm text-center">
          {{ message }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full flex justify-center py-3 px-4 text-sm font-bold rounded-xl text-white bg-black hover:bg-gray-900 disabled:opacity-50"
        >
          {{ loading ? 'Iberilýär...' : 'Baglanyşyk iber' }}
        </button>

        <p class="text-center text-sm text-gray-500">
          <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-500">Giriş sahypasyna gaýt</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { usersApi } from '../api/endpoints'

const form = reactive({ email: '' })
const loading = ref(false)
const message = ref('')
const ok = ref(false)

const submit = async () => {
  loading.value = true
  message.value = ''
  try {
    await usersApi.requestPasswordReset(form)
    ok.value = true
    message.value = 'Eger email tapylan bolsa, baglanyşyk iberildi.'
  } catch (err: any) {
    ok.value = false
    message.value = err.response?.data?.detail || 'Iberip bolmady.'
  } finally {
    loading.value = false
  }
}
</script>
