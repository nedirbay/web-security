<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-black">Scan Results</h2>
        <p class="text-gray-500">History of all vulnerability scans conducted on your targets.</p>
      </div>
      <button @click="showCreate = true" class="inline-flex items-center px-6 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition-all">
        + New Scan
      </button>
    </div>

    <!-- Filters Bar -->
    <div class="flex flex-wrap items-center gap-4">
      <div class="relative flex-1 min-w-[200px]">
        <SearchIcon class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input v-model="search" type="text" placeholder="Search targets..." class="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-100 bg-white shadow-sm focus:ring-2 focus:ring-blue-600 outline-none" />
      </div>
      <select v-model="statusFilter" class="px-4 py-3 rounded-xl border border-gray-100 bg-white shadow-sm outline-none focus:ring-2 focus:ring-blue-600 font-medium text-sm">
        <option value="">All Statuses</option>
        <option value="completed">Completed</option>
        <option value="running">In Progress</option>
        <option value="failed">Failed</option>
        <option value="pending">Pending</option>
      </select>
    </div>

    <!-- Scans List -->
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div v-if="loading" class="p-12 text-center text-gray-400">Loading scans...</div>
      <div v-else-if="filteredScans.length === 0" class="p-12 text-center text-gray-400">No scans found.</div>
      <table v-else class="w-full text-left">
        <thead class="bg-gray-50/50 text-gray-400 text-xs font-bold uppercase tracking-widest">
          <tr>
            <th class="px-6 py-4">Scan ID</th>
            <th class="px-6 py-4">Target</th>
            <th class="px-6 py-4">Type</th>
            <th class="px-6 py-4">Status</th>
            <th class="px-6 py-4">Created</th>
            <th class="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr v-for="scan in filteredScans" :key="scan.id" class="hover:bg-gray-50/50 transition-colors">
            <td class="px-6 py-4">
              <span class="text-xs font-mono font-bold text-gray-400">#{{ String(scan.id).padStart(4, '0') }}</span>
            </td>
            <td class="px-6 py-4">
              <p class="text-sm font-bold text-black">{{ scan.target_address || scan.target_name || scan.target }}</p>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ scan.scan_type || '-' }}</td>
            <td class="px-6 py-4">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold" :class="getStatusClass(scan.status)">
                {{ scan.status || 'unknown' }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(scan.created_at) }}</td>
            <td class="px-6 py-4 text-right">
              <button @click="run(scan)" class="text-blue-600 text-xs font-bold hover:underline">Run</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create Modal -->
    <div v-if="showCreate" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showCreate = false"></div>
      <div class="bg-white rounded-3xl w-full max-w-md p-8 relative z-10 shadow-2xl">
        <h3 class="text-2xl font-bold text-black mb-6">New Scan</h3>
        <form @submit.prevent="createScan" class="space-y-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Target</label>
            <select v-model="newScan.target" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none">
              <option value="" disabled>Select target...</option>
              <option v-for="t in targets" :key="t.id" :value="t.id">{{ t.name || t.address }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Scan Type</label>
            <select v-model="newScan.scan_type" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none">
              <option value="full">Full</option>
              <option value="quick">Quick</option>
              <option value="api">API Audit</option>
              <option value="port">Port Scan</option>
            </select>
          </div>
          <p v-if="createError" class="text-red-500 text-xs font-bold">{{ createError }}</p>
          <button type="submit" :disabled="submitting" class="w-full py-4 bg-black text-white font-bold rounded-xl disabled:opacity-50">
            {{ submitting ? 'Creating...' : 'Create Scan' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, h } from 'vue'
import { scansApi, targetsApi } from '../api/endpoints'

const SearchIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' })])

const scans = ref<any[]>([])
const targets = ref<any[]>([])
const loading = ref(true)
const search = ref('')
const statusFilter = ref('')
const showCreate = ref(false)
const submitting = ref(false)
const createError = ref('')
const newScan = reactive({ target: '', scan_type: 'full' })

const filteredScans = computed(() => {
  return scans.value.filter(s => {
    const target = (s.target_address || s.target_name || s.target || '').toString().toLowerCase()
    const matchesSearch = !search.value || target.includes(search.value.toLowerCase())
    const matchesStatus = !statusFilter.value || (s.status || '').toLowerCase() === statusFilter.value
    return matchesSearch && matchesStatus
  })
})

const fetchScans = async () => {
  loading.value = true
  try {
    const res = await scansApi.getScans()
    scans.value = Array.isArray(res.data) ? res.data : res.data.results || []
  } catch (err) {
    console.error('Failed to fetch scans', err)
  } finally {
    loading.value = false
  }
}

const fetchTargets = async () => {
  try {
    const res = await targetsApi.getTargets()
    targets.value = Array.isArray(res.data) ? res.data : res.data.results || []
  } catch (err) {
    console.error('Failed to fetch targets', err)
  }
}

const createScan = async () => {
  submitting.value = true
  createError.value = ''
  try {
    await scansApi.createScan(newScan)
    showCreate.value = false
    newScan.target = ''
    newScan.scan_type = 'full'
    fetchScans()
  } catch (err: any) {
    createError.value = err.response?.data?.detail || 'Skan döretmek başartmady.'
  } finally {
    submitting.value = false
  }
}

const run = async (scan: any) => {
  try {
    await scansApi.runScan(scan.id)
    alert(`Scan #${scan.id} işe başlady.`)
    fetchScans()
  } catch (err: any) {
    alert(err.response?.data?.detail || 'Scan başlap bilmedi.')
  }
}

const getStatusClass = (s: string) => {
  switch ((s || '').toLowerCase()) {
    case 'completed': return 'bg-green-50 text-green-600'
    case 'running':
    case 'in_progress': return 'bg-blue-50 text-blue-600'
    case 'failed': return 'bg-red-50 text-red-600'
    case 'pending': return 'bg-yellow-50 text-yellow-600'
    default: return 'bg-gray-50 text-gray-500'
  }
}

const formatDate = (s: string) => (s ? new Date(s).toLocaleString() : '-')

onMounted(() => {
  fetchScans()
  fetchTargets()
})
</script>
