<template>
  <div class="space-y-8">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-black">Vulnerabilities</h2>
        <p class="text-gray-500">All discovered vulnerabilities across your scans.</p>
      </div>
      <div class="flex items-center gap-2">
        <button @click="mode = 'list'" :class="mode === 'list' ? 'bg-black text-white' : 'bg-white text-gray-600 border border-gray-200'" class="px-4 py-2 text-sm font-bold rounded-xl">List</button>
        <button @click="mode = 'owasp'" :class="mode === 'owasp' ? 'bg-black text-white' : 'bg-white text-gray-600 border border-gray-200'" class="px-4 py-2 text-sm font-bold rounded-xl">OWASP grouping</button>
      </div>
    </div>

    <!-- Filters -->
    <div v-if="mode === 'list'" class="flex flex-wrap items-center gap-4">
      <select v-model="filters.severity" class="px-4 py-3 rounded-xl border border-gray-100 bg-white shadow-sm font-medium text-sm">
        <option value="">All severities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
        <option value="Info">Info</option>
      </select>
      <select v-model="filters.status" class="px-4 py-3 rounded-xl border border-gray-100 bg-white shadow-sm font-medium text-sm">
        <option value="">All statuses</option>
        <option value="open">Open</option>
        <option value="reviewed">Reviewed</option>
        <option value="fixed">Fixed</option>
        <option value="closed">Closed</option>
      </select>
      <button @click="fetchList" class="px-5 py-3 bg-blue-600 text-white text-sm font-bold rounded-xl">Apply</button>
    </div>

    <!-- List -->
    <div v-if="mode === 'list'" class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div v-if="loading" class="p-12 text-center text-gray-400">Loading…</div>
      <div v-else-if="items.length === 0" class="p-12 text-center text-gray-400">No vulnerabilities.</div>
      <table v-else class="w-full text-left">
        <thead class="bg-gray-50/50 text-gray-400 text-xs font-bold uppercase tracking-widest">
          <tr>
            <th class="px-6 py-4">Title</th>
            <th class="px-6 py-4">Severity</th>
            <th class="px-6 py-4">OWASP</th>
            <th class="px-6 py-4">Status</th>
            <th class="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr v-for="v in items" :key="v.id" class="hover:bg-gray-50/50">
            <td class="px-6 py-4">
              <p class="text-sm font-bold text-black">{{ v.name }}</p>
              <p class="text-xs text-gray-400">{{ v.url || v.target || '' }}</p>
            </td>
            <td class="px-6 py-4">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold" :class="sevClass(v.severity)">
                {{ v.severity }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ v.owasp_category || '-' }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ v.lifecycle_status || '-' }}</td>
            <td class="px-6 py-4 text-right">
              <button @click="markFp(v)" class="text-blue-600 text-xs font-bold hover:underline mr-3">Mark FP</button>
              <button @click="openLifecycle(v)" class="text-emerald-600 text-xs font-bold hover:underline">Lifecycle</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- OWASP grouping -->
    <div v-else class="space-y-4">
      <div v-if="loadingOwasp" class="text-gray-400 text-sm">Loading…</div>
      <div v-else-if="owaspGroups.length === 0" class="text-gray-400 text-sm">No data.</div>
      <div v-for="group in owaspGroups" :key="group.key || group.category" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-black">{{ group.category || group.key }}</h3>
          <span class="text-xs font-bold bg-gray-50 text-gray-500 px-3 py-1 rounded-full">{{ group.count ?? (group.items ? group.items.length : 0) }}</span>
        </div>
        <ul v-if="group.items && group.items.length" class="divide-y divide-gray-100">
          <li v-for="v in group.items" :key="v.id" class="py-2 flex justify-between gap-3">
            <span class="text-sm text-black truncate">{{ v.name }}</span>
            <span class="text-xs" :class="sevClass(v.severity)">{{ v.severity }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Lifecycle Modal -->
    <div v-if="showLifecycle" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showLifecycle = false"></div>
      <div class="bg-white rounded-3xl w-full max-w-md p-8 relative z-10 shadow-2xl">
        <h3 class="text-2xl font-bold text-black mb-6">Update Lifecycle</h3>
        <form @submit.prevent="submitLifecycle" class="space-y-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Status</label>
            <select v-model="lifecycleForm.status" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none">
              <option value="open">Open</option>
              <option value="reviewed">Reviewed</option>
              <option value="fixed">Fixed</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Note</label>
            <textarea v-model="lifecycleForm.note" rows="3" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none"></textarea>
          </div>
          <p v-if="lifecycleError" class="text-red-500 text-xs font-bold">{{ lifecycleError }}</p>
          <button type="submit" :disabled="lifecycleSaving" class="w-full py-4 bg-black text-white font-bold rounded-xl disabled:opacity-50">
            {{ lifecycleSaving ? 'Saving...' : 'Save' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { vulnerabilitiesApi } from '../api/endpoints'

const mode = ref<'list' | 'owasp'>('list')
const items = ref<any[]>([])
const loading = ref(false)
const filters = reactive({ severity: '', status: '' })

const owaspGroups = ref<any[]>([])
const loadingOwasp = ref(false)

const showLifecycle = ref(false)
const lifecycleSaving = ref(false)
const lifecycleError = ref('')
const lifecycleTarget = ref<any>(null)
const lifecycleForm = reactive({ status: 'open', note: '' })

const sevClass = (s: string) => {
  switch ((s || '').toLowerCase()) {
    case 'critical': return 'bg-red-50 text-red-600'
    case 'high': return 'bg-orange-50 text-orange-600'
    case 'medium': return 'bg-yellow-50 text-yellow-600'
    case 'low': return 'bg-green-50 text-green-600'
    default: return 'bg-gray-50 text-gray-500'
  }
}

const fetchList = async () => {
  loading.value = true
  try {
    const params: any = {}
    if (filters.severity) params.severity = filters.severity
    if (filters.status) params.status = filters.status
    const res = await vulnerabilitiesApi.getVulnerabilities(params)
    items.value = Array.isArray(res.data) ? res.data : res.data.results || []
  } catch (err) {
    console.error('Failed to fetch vulnerabilities', err)
  } finally {
    loading.value = false
  }
}

const fetchOwasp = async () => {
  loadingOwasp.value = true
  try {
    const res = await vulnerabilitiesApi.getGroupedByOwasp()
    const data = res.data
    if (Array.isArray(data)) {
      owaspGroups.value = data
    } else if (data && typeof data === 'object') {
      owaspGroups.value = Object.entries(data).map(([key, val]: [string, any]) => ({
        key,
        category: key,
        items: Array.isArray(val) ? val : val?.items,
        count: Array.isArray(val) ? val.length : val?.count,
      }))
    } else {
      owaspGroups.value = []
    }
  } catch (err) {
    console.error('Failed to fetch OWASP grouping', err)
  } finally {
    loadingOwasp.value = false
  }
}

const markFp = async (v: any) => {
  try {
    await vulnerabilitiesApi.markFalsePositive(v.id)
    fetchList()
  } catch (err) {
    console.error('Mark FP failed', err)
  }
}

const openLifecycle = (v: any) => {
  lifecycleTarget.value = v
  lifecycleForm.status = v.lifecycle_status || 'open'
  lifecycleForm.note = ''
  lifecycleError.value = ''
  showLifecycle.value = true
}

const submitLifecycle = async () => {
  if (!lifecycleTarget.value) return
  lifecycleSaving.value = true
  lifecycleError.value = ''
  try {
    await vulnerabilitiesApi.updateLifecycle(lifecycleTarget.value.id, lifecycleForm)
    showLifecycle.value = false
    fetchList()
  } catch (err: any) {
    lifecycleError.value = err.response?.data?.detail || 'Üýtgemedi.'
  } finally {
    lifecycleSaving.value = false
  }
}

watch(mode, (m) => {
  if (m === 'list') fetchList()
  else fetchOwasp()
})

onMounted(fetchList)
</script>
