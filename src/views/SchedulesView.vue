<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-black">Scan Schedules</h2>
        <p class="text-gray-500">Plan recurring scans and trigger the queue manually.</p>
      </div>
      <button @click="showCreate = true" class="inline-flex items-center px-6 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition-all">
        + New Schedule
      </button>
    </div>

    <!-- Scheduler controls -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h3 class="text-lg font-bold text-black">Enqueue Scheduler</h3>
        <p class="text-sm text-gray-500">Push the listed schedule IDs into the worker queue.</p>
        <textarea v-model="enqueueBody" rows="4" class="w-full font-mono text-xs px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-600"></textarea>
        <button @click="runEnqueue" :disabled="busyEnq" class="px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl disabled:opacity-50">
          {{ busyEnq ? 'Working...' : 'Enqueue' }}
        </button>
        <p v-if="enqMsg" :class="enqOk ? 'text-emerald-600' : 'text-red-500'" class="text-xs">{{ enqMsg }}</p>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h3 class="text-lg font-bold text-black">Run Worker Loop</h3>
        <p class="text-sm text-gray-500">Process queued schedules immediately for testing.</p>
        <textarea v-model="workerBody" rows="4" class="w-full font-mono text-xs px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-600"></textarea>
        <button @click="runWorker" :disabled="busyWorker" class="px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl disabled:opacity-50">
          {{ busyWorker ? 'Working...' : 'Run Worker' }}
        </button>
        <p v-if="workMsg" :class="workOk ? 'text-emerald-600' : 'text-red-500'" class="text-xs">{{ workMsg }}</p>
      </div>
    </div>

    <!-- Schedule list -->
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div v-if="loading" class="p-12 text-center text-gray-400">Loading…</div>
      <div v-else-if="schedules.length === 0" class="p-12 text-center text-gray-400">No schedules yet.</div>
      <table v-else class="w-full text-left">
        <thead class="bg-gray-50/50 text-gray-400 text-xs font-bold uppercase tracking-widest">
          <tr>
            <th class="px-6 py-4">Target</th>
            <th class="px-6 py-4">Frequency</th>
            <th class="px-6 py-4">Scan Type</th>
            <th class="px-6 py-4">Next Run</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr v-for="s in schedules" :key="s.id">
            <td class="px-6 py-4 text-sm font-bold text-black">{{ s.target }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ s.frequency }}{{ s.frequency === 'custom' && s.custom_interval_minutes ? ` (${s.custom_interval_minutes}m)` : '' }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ s.scan_type || '-' }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(s.next_run_at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create Modal -->
    <div v-if="showCreate" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showCreate = false"></div>
      <div class="bg-white rounded-3xl w-full max-w-md p-8 relative z-10 shadow-2xl">
        <h3 class="text-2xl font-bold text-black mb-6">New Schedule</h3>
        <form @submit.prevent="createSchedule" class="space-y-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Target ID</label>
            <input v-model="newSchedule.target" type="text" required class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Frequency</label>
            <select v-model="newSchedule.frequency" class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-600">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <div v-if="newSchedule.frequency === 'custom'">
            <label class="block text-sm font-bold text-gray-700 mb-2">Interval (minutes)</label>
            <input v-model.number="newSchedule.custom_interval_minutes" type="number" min="1" class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Scan Type</label>
            <select v-model="newSchedule.scan_type" class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-600">
              <option value="passive">Passive</option>
              <option value="active">Active</option>
              <option value="full">Full</option>
              <option value="api">API</option>
            </select>
          </div>
          <p v-if="createError" class="text-red-500 text-xs font-bold">{{ createError }}</p>
          <button type="submit" :disabled="creating" class="w-full py-4 bg-black text-white font-bold rounded-xl disabled:opacity-50">
            {{ creating ? 'Creating...' : 'Create' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { scansApi } from '../api/endpoints'

const schedules = ref<any[]>([])
const loading = ref(true)
const showCreate = ref(false)
const creating = ref(false)
const createError = ref('')
const newSchedule = reactive({ target: '', frequency: 'daily', custom_interval_minutes: 60, scan_type: 'passive' })

const enqueueBody = ref('{\n  "schedule_ids": []\n}')
const workerBody = ref('{}')
const busyEnq = ref(false)
const busyWorker = ref(false)
const enqMsg = ref('')
const enqOk = ref(false)
const workMsg = ref('')
const workOk = ref(false)

const formatDate = (s: string) => (s ? new Date(s).toLocaleString() : '-')

const fetchSchedules = async () => {
  loading.value = true
  try {
    const res = await scansApi.getSchedules()
    schedules.value = Array.isArray(res.data) ? res.data : res.data.results || []
  } catch (err) {
    console.error('Failed to fetch schedules', err)
  } finally {
    loading.value = false
  }
}

const createSchedule = async () => {
  creating.value = true
  createError.value = ''
  try {
    await scansApi.createSchedule(newSchedule)
    showCreate.value = false
    fetchSchedules()
  } catch (err: any) {
    createError.value = err.response?.data?.detail || 'Schedule döretmedi.'
  } finally {
    creating.value = false
  }
}

const runEnqueue = async () => {
  busyEnq.value = true
  enqMsg.value = ''
  try {
    const body = enqueueBody.value.trim() ? JSON.parse(enqueueBody.value) : {}
    const res = await scansApi.enqueueScheduler(body)
    enqOk.value = true
    enqMsg.value = res.data?.detail || 'Enqueue OK'
  } catch (err: any) {
    enqOk.value = false
    enqMsg.value = err.response?.data?.detail || err.message
  } finally {
    busyEnq.value = false
  }
}

const runWorker = async () => {
  busyWorker.value = true
  workMsg.value = ''
  try {
    const body = workerBody.value.trim() ? JSON.parse(workerBody.value) : {}
    const res = await scansApi.runSchedulerWorker(body)
    workOk.value = true
    workMsg.value = res.data?.detail || 'Worker OK'
  } catch (err: any) {
    workOk.value = false
    workMsg.value = err.response?.data?.detail || err.message
  } finally {
    busyWorker.value = false
  }
}

onMounted(fetchSchedules)
</script>
