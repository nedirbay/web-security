<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-black">System Settings</h2>
        <p class="text-gray-500">Key/value settings and ZAP scanner configuration.</p>
      </div>
      <button @click="openCreate" class="inline-flex items-center px-6 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition-all">
        + New Setting
      </button>
    </div>

    <!-- Settings list -->
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div v-if="loading" class="p-12 text-center text-gray-400">Loading…</div>
      <div v-else-if="settings.length === 0" class="p-12 text-center text-gray-400">No settings.</div>
      <table v-else class="w-full text-left">
        <thead class="bg-gray-50/50 text-gray-400 text-xs font-bold uppercase tracking-widest">
          <tr>
            <th class="px-6 py-4">Key</th>
            <th class="px-6 py-4">Value</th>
            <th class="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr v-for="s in settings" :key="s.id">
            <td class="px-6 py-4 text-sm font-bold text-black font-mono">{{ s.key }}</td>
            <td class="px-6 py-4 text-sm text-gray-500 font-mono truncate max-w-md">{{ s.value }}</td>
            <td class="px-6 py-4 text-right">
              <button @click="openEdit(s)" class="text-blue-600 text-xs font-bold hover:underline mr-3">Edit</button>
              <button @click="remove(s)" class="text-red-600 text-xs font-bold hover:underline">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ZAP Config -->
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold text-black">ZAP Configuration</h3>
        <button @click="fetchZap" class="text-blue-600 text-xs font-bold hover:underline">Refresh</button>
      </div>
      <div v-if="zapLoading" class="text-gray-400 text-sm">Loading…</div>
      <pre v-else class="bg-gray-950 text-gray-100 rounded-2xl p-4 text-xs overflow-auto max-h-72">{{ zapConfig ? JSON.stringify(zapConfig, null, 2) : 'No config' }}</pre>
      <div class="space-y-2">
        <label class="text-xs uppercase tracking-widest text-gray-400 font-bold">Update / Create</label>
        <textarea v-model="zapBody" rows="8" class="w-full font-mono text-xs px-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-600"></textarea>
        <button @click="saveZap" :disabled="zapSaving" class="px-5 py-2 bg-black text-white text-sm font-bold rounded-xl disabled:opacity-50">
          {{ zapSaving ? 'Saving...' : 'Save Config' }}
        </button>
        <p v-if="zapMsg" :class="zapOk ? 'text-emerald-600' : 'text-red-500'" class="text-xs">{{ zapMsg }}</p>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showForm = false"></div>
      <div class="bg-white rounded-3xl w-full max-w-md p-8 relative z-10 shadow-2xl">
        <h3 class="text-2xl font-bold text-black mb-6">{{ editing ? 'Edit Setting' : 'New Setting' }}</h3>
        <form @submit.prevent="save" class="space-y-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Key</label>
            <input v-model="form.key" type="text" required class="w-full px-4 py-3 font-mono rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Value</label>
            <textarea v-model="form.value" rows="4" class="w-full px-4 py-3 font-mono rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-600"></textarea>
          </div>
          <p v-if="formError" class="text-red-500 text-xs font-bold">{{ formError }}</p>
          <button type="submit" :disabled="saving" class="w-full py-4 bg-black text-white font-bold rounded-xl disabled:opacity-50">
            {{ saving ? 'Saving...' : 'Save' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { adminApi, scansApi } from '../api/endpoints'

const settings = ref<any[]>([])
const loading = ref(true)
const showForm = ref(false)
const editing = ref<any>(null)
const form = reactive({ key: '', value: '' })
const formError = ref('')
const saving = ref(false)

const zapConfig = ref<any>(null)
const zapLoading = ref(true)
const zapBody = ref('{}')
const zapSaving = ref(false)
const zapMsg = ref('')
const zapOk = ref(false)

const fetchSettings = async () => {
  loading.value = true
  try {
    const res = await adminApi.getSettings()
    settings.value = Array.isArray(res.data) ? res.data : res.data.results || []
  } catch (err) {
    console.error('Failed to fetch settings', err)
  } finally {
    loading.value = false
  }
}

const openCreate = () => {
  editing.value = null
  form.key = ''
  form.value = ''
  formError.value = ''
  showForm.value = true
}

const openEdit = async (s: any) => {
  editing.value = s
  formError.value = ''
  try {
    const res = await adminApi.getSetting(s.id)
    form.key = res.data.key || s.key
    form.value = typeof res.data.value === 'string' ? res.data.value : JSON.stringify(res.data.value)
  } catch {
    form.key = s.key
    form.value = s.value
  }
  showForm.value = true
}

const save = async () => {
  saving.value = true
  formError.value = ''
  try {
    if (editing.value) {
      await adminApi.updateSetting(editing.value.id, form)
    } else {
      await adminApi.createSetting(form)
    }
    showForm.value = false
    fetchSettings()
  } catch (err: any) {
    formError.value = err.response?.data?.detail || 'Saklanyp bolmady.'
  } finally {
    saving.value = false
  }
}

const remove = async (s: any) => {
  if (!confirm(`Delete ${s.key}?`)) return
  try {
    await adminApi.deleteSetting(s.id)
    fetchSettings()
  } catch (err) {
    console.error('Failed to delete setting', err)
  }
}

const fetchZap = async () => {
  zapLoading.value = true
  try {
    const res = await scansApi.getZapConfig()
    zapConfig.value = res.data
    zapBody.value = JSON.stringify(res.data || {}, null, 2)
  } catch (err) {
    console.error('Failed to fetch ZAP config', err)
  } finally {
    zapLoading.value = false
  }
}

const saveZap = async () => {
  zapSaving.value = true
  zapMsg.value = ''
  try {
    const body = zapBody.value.trim() ? JSON.parse(zapBody.value) : {}
    const res = await scansApi.createZapConfig(body)
    zapConfig.value = res.data
    zapOk.value = true
    zapMsg.value = 'ZAP config saved.'
  } catch (err: any) {
    zapOk.value = false
    zapMsg.value = err.response?.data?.detail || err.message
  } finally {
    zapSaving.value = false
  }
}

onMounted(() => {
  fetchSettings()
  fetchZap()
})
</script>
