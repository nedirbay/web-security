<template>
  <div class="max-w-5xl space-y-8">
    <!-- Profile Header -->
    <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex items-center gap-8">
      <div class="w-24 h-24 rounded-3xl bg-blue-600 text-white flex items-center justify-center text-4xl font-bold shadow-xl shadow-blue-200">
        {{ getInitial(profile?.username || authStore.user?.username) }}
      </div>
      <div class="flex-1">
        <h2 class="text-3xl font-bold text-black mb-1">{{ profile?.username || authStore.user?.username }}</h2>
        <p class="text-gray-500 mb-4">{{ profile?.email || authStore.user?.email }}</p>
        <div class="flex items-center gap-4">
          <span class="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
            {{ profile?.role || authStore.user?.role || 'User' }}
          </span>
          <span v-if="profile?.phone" class="text-xs text-gray-400">{{ profile.phone }}</span>
        </div>
      </div>
      <button @click="openEdit" class="px-6 py-3 border border-gray-200 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all">
        Edit Profile
      </button>
    </div>

    <!-- Edit Modal -->
    <div v-if="editing" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="editing = false"></div>
      <div class="bg-white rounded-3xl w-full max-w-md p-8 relative z-10 shadow-2xl">
        <h3 class="text-2xl font-bold text-black mb-6">Edit Profile</h3>
        <form @submit.prevent="saveProfile" class="space-y-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Username</label>
            <input v-model="editForm.username" type="text" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none" />
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Email</label>
            <input v-model="editForm.email" type="email" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none" />
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Phone</label>
            <input v-model="editForm.phone" type="text" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none" />
          </div>
          <p v-if="saveError" class="text-red-500 text-xs font-bold">{{ saveError }}</p>
          <button type="submit" :disabled="saving" class="w-full py-4 bg-black text-white font-bold rounded-xl mt-4 disabled:opacity-50">
            {{ saving ? 'Saving...' : 'Save Changes' }}
          </button>
        </form>
      </div>
    </div>

    <!-- API Keys -->
    <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-bold text-black">API Keys</h3>
        <button @click="showCreateKey = true" class="px-4 py-2 bg-black text-white text-sm font-bold rounded-xl hover:bg-gray-900 transition-all">
          + New Key
        </button>
      </div>

      <div v-if="keysLoading" class="text-gray-400 text-sm">Loading API keys...</div>
      <div v-else-if="apiKeys.length === 0" class="text-gray-400 text-sm">No API keys yet.</div>
      <ul v-else class="divide-y divide-gray-100">
        <li v-for="key in apiKeys" :key="key.id" class="py-4 flex items-center justify-between gap-4">
          <div class="min-w-0">
            <p class="font-bold text-sm text-black truncate">{{ key.name || `Key #${key.id}` }}</p>
            <p class="font-mono text-xs text-gray-400 truncate">{{ key.key || key.prefix || '••••••••' }}</p>
            <p v-if="key.created_at" class="text-xs text-gray-400 mt-1">Created {{ formatDate(key.created_at) }}</p>
          </div>
          <div class="flex items-center gap-2">
            <button @click="inspectKey(key.id)" class="text-blue-600 text-xs font-bold hover:underline">Inspect</button>
            <button @click="removeKey(key.id)" class="text-red-600 text-xs font-bold hover:underline">Delete</button>
          </div>
        </li>
      </ul>

      <pre v-if="inspectedKey" class="mt-4 bg-gray-950 text-gray-100 p-4 rounded-2xl text-xs overflow-auto max-h-60">{{ JSON.stringify(inspectedKey, null, 2) }}</pre>
    </div>

    <!-- Create Key Modal -->
    <div v-if="showCreateKey" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showCreateKey = false"></div>
      <div class="bg-white rounded-3xl w-full max-w-md p-8 relative z-10 shadow-2xl">
        <h3 class="text-2xl font-bold text-black mb-6">Create API Key</h3>
        <form @submit.prevent="createKey" class="space-y-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Key Name</label>
            <input v-model="newKey.name" type="text" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none" />
          </div>
          <p v-if="keyError" class="text-red-500 text-xs font-bold">{{ keyError }}</p>
          <button type="submit" :disabled="creatingKey" class="w-full py-4 bg-black text-white font-bold rounded-xl disabled:opacity-50">
            {{ creatingKey ? 'Creating...' : 'Generate Key' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { usersApi } from '../api/endpoints'

const authStore = useAuthStore()

const profile = ref<any>(null)
const editing = ref(false)
const saving = ref(false)
const saveError = ref('')
const editForm = reactive({ username: '', email: '', phone: '' })

const apiKeys = ref<any[]>([])
const keysLoading = ref(true)
const showCreateKey = ref(false)
const creatingKey = ref(false)
const keyError = ref('')
const newKey = reactive({ name: '' })
const inspectedKey = ref<any>(null)

const getInitial = (name?: string) => name?.trim().charAt(0)?.toUpperCase() || '?'
const formatDate = (s: string) => (s ? new Date(s).toLocaleDateString() : '-')

const fetchProfile = async () => {
  try {
    const res = await usersApi.getProfile()
    profile.value = res.data
  } catch (err) {
    console.error('Failed to fetch profile', err)
  }
}

const openEdit = () => {
  editForm.username = profile.value?.username || ''
  editForm.email = profile.value?.email || ''
  editForm.phone = profile.value?.phone || ''
  saveError.value = ''
  editing.value = true
}

const saveProfile = async () => {
  saving.value = true
  saveError.value = ''
  try {
    const res = await usersApi.updateProfile(editForm)
    profile.value = res.data
    authStore.user = { ...(authStore.user || {}), ...res.data }
    localStorage.setItem('user', JSON.stringify(authStore.user))
    editing.value = false
  } catch (err: any) {
    saveError.value = err.response?.data?.detail || 'Profil saklanmady.'
  } finally {
    saving.value = false
  }
}

const fetchApiKeys = async () => {
  keysLoading.value = true
  try {
    const res = await usersApi.getApiKeys()
    apiKeys.value = Array.isArray(res.data) ? res.data : res.data.results || []
  } catch (err) {
    console.error('Failed to fetch API keys', err)
  } finally {
    keysLoading.value = false
  }
}

const createKey = async () => {
  creatingKey.value = true
  keyError.value = ''
  try {
    await usersApi.createApiKey(newKey)
    newKey.name = ''
    showCreateKey.value = false
    fetchApiKeys()
  } catch (err: any) {
    keyError.value = err.response?.data?.detail || 'Açar döretmek başartmady.'
  } finally {
    creatingKey.value = false
  }
}

const inspectKey = async (id: number) => {
  try {
    const res = await usersApi.getApiKey(id)
    inspectedKey.value = res.data
  } catch (err) {
    console.error('Failed to fetch key', err)
  }
}

const removeKey = async (id: number) => {
  if (!confirm('Bu açary pozmak isleýärsiňizmi?')) return
  try {
    await usersApi.deleteApiKey(id)
    if (inspectedKey.value?.id === id) inspectedKey.value = null
    fetchApiKeys()
  } catch (err) {
    console.error('Failed to delete key', err)
  }
}

onMounted(() => {
  fetchProfile()
  fetchApiKeys()
})
</script>
