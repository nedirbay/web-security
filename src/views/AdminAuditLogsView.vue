<template>
  <div class="space-y-8">
    <div>
      <h2 class="text-2xl font-bold text-black">Audit Logs</h2>
      <p class="text-gray-500">Every privileged action recorded by the platform.</p>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <input v-model="filters.action" type="text" placeholder="Action" class="px-4 py-2 rounded-xl border border-gray-200 text-sm" />
      <input v-model="filters.actor" type="text" placeholder="Actor" class="px-4 py-2 rounded-xl border border-gray-200 text-sm" />
      <button @click="fetchLogs(1)" class="px-5 py-2 bg-black text-white text-sm font-bold rounded-xl">Filter</button>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div v-if="loading" class="p-12 text-center text-gray-400">Loading…</div>
      <div v-else-if="logs.length === 0" class="p-12 text-center text-gray-400">No log entries.</div>
      <table v-else class="w-full text-left">
        <thead class="bg-gray-50/50 text-gray-400 text-xs font-bold uppercase tracking-widest">
          <tr>
            <th class="px-6 py-4">Date</th>
            <th class="px-6 py-4">Actor</th>
            <th class="px-6 py-4">Action</th>
            <th class="px-6 py-4">Object</th>
            <th class="px-6 py-4">Details</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr v-for="log in logs" :key="log.id">
            <td class="px-6 py-4 text-xs text-gray-500">{{ formatDate(log.created_at || log.timestamp) }}</td>
            <td class="px-6 py-4 text-sm font-bold text-black">{{ log.actor || log.actor_email || '-' }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ log.action }}</td>
            <td class="px-6 py-4 text-xs font-mono text-gray-500">{{ log.entity_type ? `${log.entity_type}#${log.entity_id}` : '-' }}</td>
            <td class="px-6 py-4 text-xs text-gray-500 max-w-md truncate">{{ formatDetails(log) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="totalCount > pageSize" class="flex items-center justify-between text-sm text-gray-500">
      <button @click="prev" :disabled="!hasPrev" class="px-4 py-2 border border-gray-200 rounded-xl disabled:opacity-30">Previous</button>
      <span>Page {{ page }}</span>
      <button @click="next" :disabled="!hasNext" class="px-4 py-2 border border-gray-200 rounded-xl disabled:opacity-30">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { adminApi } from '../api/endpoints'

const logs = ref<any[]>([])
const loading = ref(true)
const page = ref(1)
const pageSize = 20
const totalCount = ref(0)
const hasNext = ref(false)
const hasPrev = ref(false)
const filters = reactive({ action: '', actor: '' })

const formatDate = (s: string) => (s ? new Date(s).toLocaleString() : '-')
const formatDetails = (l: any) => {
  if (l.details) return typeof l.details === 'string' ? l.details : JSON.stringify(l.details)
  if (l.metadata) return typeof l.metadata === 'string' ? l.metadata : JSON.stringify(l.metadata)
  return '-'
}

const fetchLogs = async (p = 1) => {
  loading.value = true
  page.value = p
  try {
    const params: any = { page: p }
    if (filters.action) params.action = filters.action
    if (filters.actor) params.actor = filters.actor
    const res = await adminApi.getAuditLogs(params)
    const data = res.data
    if (Array.isArray(data)) {
      logs.value = data
      totalCount.value = data.length
      hasNext.value = false
      hasPrev.value = false
    } else {
      logs.value = data.results || []
      totalCount.value = data.count ?? logs.value.length
      hasNext.value = !!data.next
      hasPrev.value = !!data.previous
    }
  } catch (err) {
    console.error('Failed to fetch audit logs', err)
  } finally {
    loading.value = false
  }
}

const next = () => hasNext.value && fetchLogs(page.value + 1)
const prev = () => hasPrev.value && fetchLogs(page.value - 1)

onMounted(() => fetchLogs(1))
</script>
