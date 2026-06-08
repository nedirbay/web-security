<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-black">Blog Posts</h2>
        <p class="text-gray-500">Create, edit and remove published blog entries.</p>
      </div>
      <button @click="openCreate" class="inline-flex items-center px-6 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition-all">
        + New Post
      </button>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div v-if="loading" class="p-12 text-center text-gray-400">Loading…</div>
      <div v-else-if="posts.length === 0" class="p-12 text-center text-gray-400">No posts yet.</div>
      <table v-else class="w-full text-left">
        <thead class="bg-gray-50/50 text-gray-400 text-xs font-bold uppercase tracking-widest">
          <tr>
            <th class="px-6 py-4">Title</th>
            <th class="px-6 py-4">Tags</th>
            <th class="px-6 py-4">Author</th>
            <th class="px-6 py-4">Published</th>
            <th class="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr v-for="p in posts" :key="p.id">
            <td class="px-6 py-4 text-sm font-bold text-black">{{ p.title }}</td>
            <td class="px-6 py-4 text-xs text-gray-500">{{ p.tags }}</td>
            <td class="px-6 py-4 text-xs text-gray-500">{{ p.author_email || p.author || '-' }}</td>
            <td class="px-6 py-4 text-xs text-gray-500">{{ formatDate(p.published_at) }}</td>
            <td class="px-6 py-4 text-right">
              <button @click="openEdit(p)" class="text-blue-600 text-xs font-bold hover:underline mr-3">Edit</button>
              <button @click="remove(p)" class="text-red-600 text-xs font-bold hover:underline">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="totalCount > pageSize" class="flex items-center justify-between text-sm text-gray-500">
      <button @click="prev" :disabled="!hasPrev" class="px-4 py-2 border border-gray-200 rounded-xl disabled:opacity-30">Previous</button>
      <span>Page {{ page }}</span>
      <button @click="next" :disabled="!hasNext" class="px-4 py-2 border border-gray-200 rounded-xl disabled:opacity-30">Next</button>
    </div>

    <!-- Modal -->
    <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showForm = false"></div>
      <div class="bg-white rounded-3xl w-full max-w-2xl p-8 relative z-10 shadow-2xl">
        <h3 class="text-2xl font-bold text-black mb-6">{{ editing ? 'Edit Post' : 'New Post' }}</h3>
        <form @submit.prevent="save" class="space-y-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Title</label>
            <input v-model="form.title" type="text" required class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Slug</label>
            <input v-model="form.slug" type="text" placeholder="boş goýsaňyz atdan döredilýär" class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Status</label>
            <select v-model="form.status" class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-600">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Tags (comma separated)</label>
            <input v-model="form.tags" type="text" class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Content</label>
            <textarea v-model="form.content" rows="10" required class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-600"></textarea>
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

const posts = ref<any[]>([])
const loading = ref(true)
const page = ref(1)
const pageSize = 20
const totalCount = ref(0)
const hasNext = ref(false)
const hasPrev = ref(false)

const showForm = ref(false)
const editing = ref<any>(null)
const form = reactive({ title: '', slug: '', status: 'published', tags: '', content: '' })

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
const formError = ref('')
const saving = ref(false)

const formatDate = (s: string) => (s ? new Date(s).toLocaleDateString() : '-')

const fetchPosts = async (p = 1) => {
  loading.value = true
  page.value = p
  try {
    const res = await adminApi.getBlogPosts({ page: p })
    const data = res.data
    if (Array.isArray(data)) {
      posts.value = data
      totalCount.value = data.length
    } else {
      posts.value = data.results || []
      totalCount.value = data.count ?? posts.value.length
      hasNext.value = !!data.next
      hasPrev.value = !!data.previous
    }
  } catch (err) {
    console.error('Failed to fetch blog posts', err)
  } finally {
    loading.value = false
  }
}

const next = () => hasNext.value && fetchPosts(page.value + 1)
const prev = () => hasPrev.value && fetchPosts(page.value - 1)

const openCreate = () => {
  editing.value = null
  form.title = ''
  form.slug = ''
  form.status = 'published'
  form.tags = ''
  form.content = ''
  formError.value = ''
  showForm.value = true
}

const openEdit = async (p: any) => {
  editing.value = p
  formError.value = ''
  try {
    const res = await adminApi.getBlogPost(p.id)
    const d = res.data
    form.title = d.title || ''
    form.slug = d.slug || ''
    form.status = d.status || 'published'
    form.tags = d.tags || ''
    form.content = d.content || ''
  } catch {
    form.title = p.title
    form.slug = p.slug || ''
    form.status = p.status || 'published'
    form.tags = p.tags
    form.content = p.content
  }
  showForm.value = true
}

const save = async () => {
  saving.value = true
  formError.value = ''
  try {
    if (!form.slug && form.title) form.slug = slugify(form.title)
    if (editing.value) {
      await adminApi.updateBlogPost(editing.value.id, form)
    } else {
      await adminApi.createBlogPost(form)
    }
    showForm.value = false
    fetchPosts(page.value)
  } catch (err: any) {
    formError.value = err.response?.data?.detail || 'Saklanyp bolmady.'
  } finally {
    saving.value = false
  }
}

const remove = async (p: any) => {
  if (!confirm(`Delete "${p.title}"?`)) return
  try {
    await adminApi.deleteBlogPost(p.id)
    fetchPosts(page.value)
  } catch (err) {
    console.error('Failed to delete blog post', err)
  }
}

onMounted(() => fetchPosts(1))
</script>
