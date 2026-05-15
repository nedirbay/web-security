<template>
  <div class="min-h-screen flex items-center justify-center bg-white px-4">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-black">Täze parol</h2>
        <p class="mt-2 text-sm text-gray-500">Aşakda täze paroly giriziň.</p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="submit">
        <div>
          <label class="sr-only">Token</label>
          <input
            v-model="form.token"
            type="text"
            required
            placeholder="Token"
            class="appearance-none rounded-xl block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label class="sr-only">Täze parol</label>
          <input
            v-model="form.password"
            type="password"
            required
            placeholder="Täze parol"
            class="appearance-none rounded-xl block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div v-if="message" :class="ok ? 'text-emerald-600' : 'text-red-500'" class="text-sm text-center">
          {{ message }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 text-sm font-bold rounded-xl text-white bg-black hover:bg-gray-900 disabled:opacity-50"
        >
          {{ loading ? 'Saklanýar...' : 'Paroly täzele' }}
        </button>

        <p class="text-center text-sm text-gray-500">
          <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-500">Giriş sahypasy</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usersApi } from '../api/endpoints'

const route = useRoute()
const form = reactive({ token: '', password: '' })
const loading = ref(false)
const message = ref('')
const ok = ref(false)

onMounted(() => {
  const tokenParam = (route.query.token as string) || ''
  if (tokenParam) form.token = tokenParam
})

const submit = async () => {
  loading.value = true
  message.value = ''
  try {
    await usersApi.confirmPasswordReset({ token: form.token, password: form.password })
    ok.value = true
    message.value = 'Parol täzelendi. Giriş edip bilersiňiz.'
  } catch (err: any) {
    ok.value = false
    message.value = err.response?.data?.detail || 'Paroly täzelemek başartmady.'
  } finally {
    loading.value = false
  }
}
</script>
