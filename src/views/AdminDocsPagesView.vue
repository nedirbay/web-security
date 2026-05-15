<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-black">Documentation Pages</h2>
        <p class="text-gray-500">Maintain the public documentation pages.</p>
      </div>
      <button @click="openCreate" class="inline-flex items-center px-6 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition-all">
        + New Page
      </button>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div v-if="loading" class="p-12 text-center text-gray-400">Loading…</div>
      <div v-else-if="pages.length === 0" class="p-12 text-center text-gray-400">No pages yet.</div>
      <table v-else class="w-full text-left">
        <thead class="bg-gray-50/50 text-gray-400 text-xs font-bold uppercase tracking-widest">
          <tr>
            <th class="px-6 py-4">Title</th>
            <th class="px-6 py-4">Slug</th>
            <th class="px-6 py-4">Category</th>
            <th class="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr v-for="p in pages" :key="p.id">
            <td class="px-6 py-4 text-sm font-bold text-black">{{ p.title }}</td>
            <td class="px-6 py-4 text-xs font-mono text-gray-500">{{ p.slug }}</td>
            <td class="px-6 py-4 text-xs text-gray-500">{{ p.category || '-' }}</td>
            <td class="px-6 py-4 text-right">
              <button @click="openEdit(p)" class="text-blue-600 text-xs font-bold hover:underline mr-3">Edit</button>
              <button @click="remove(p)" class="text-red-600 text-xs font-bold hover:underline">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showForm = false"></div>
      <div class="bg-white rounded-3xl w-full max-w-2xl p-8 relative z-10 shadow-2xl">
        <h3 class="text-2xl font-bold text-black mb-6">{{ editing ? 'Edit Page' : 'New Page' }}</h3>
        <form @submit.prevent="save" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Title</label>
              <input v-model="form.title" type="text" required class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-600" />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Slug</label>
              <input v-model="form.slug" type="text" required class="w-full px-4 py-3 font-mono rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-600" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Category</label>
            <input v-model="form.category" type="text" class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Content</label>
            <textarea v-model="form.content" rows="12" class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-600"></textarea>
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
import { adminApi } from '../api/endpoints'

const pages = ref<any[]>([])
const loading = ref(true)
const showForm = ref(false)
const editing = ref<any>(null)
const form = reactive({ title: '', slug: '', category: '', content: '' })
const formError = ref('')
const saving = ref(false)

const fetchPages = async () => {
  loading.value = true
  try {
    const res = await adminApi.getDocsPages()
    const data = res.data
    pages.value = Array.isArray(data) ? data : data.results || []
  } catch (err) {
    console.error('Failed to fetch docs pages', err)
  } finally {
    loading.value = false
  }
}

const openCreate = () => {
  editing.value = null
  form.title = ''
  form.slug = ''
  form.category = ''
  form.content = ''
  formError.value = ''
  showForm.value = true
}

const openEdit = async (p: any) => {
  editing.value = p
  formError.value = ''
  try {
    const res = await adminApi.getDocsPage(p.id)
    const d = res.data
    form.title = d.title || ''
    form.slug = d.slug || ''
    form.category = d.category || ''
    form.content = d.content || ''
  } catch {
    form.title = p.title
    form.slug = p.slug
    form.category = p.category || ''
    form.content = p.content || ''
  }
  showForm.value = true
}

const save = async () => {
  saving.value = true
  formError.value = ''
  try {
    if (editing.value) {
      await adminApi.updateDocsPage(editing.value.id, form)
    } else {
      await adminApi.createDocsPage(form)
    }
    showForm.value = false
    fetchPages()
  } catch (err: any) {
    formError.value = err.response?.data?.detail || 'Saklanyp bolmady.'
  } finally {
    saving.value = false
  }
}

const remove = async (p: any) => {
  if (!confirm(`Delete "${p.title}"?`)) return
  try {
    await adminApi.deleteDocsPage(p.id)
    fetchPages()
  } catch (err) {
    console.error('Failed to delete page', err)
  }
}

onMounted(fetchPages)
</script>
