<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-black">My Targets</h2>
        <p class="text-gray-500">Manage the domains and IP addresses you want to monitor.</p>
      </div>
      <button @click="openCreate" class="inline-flex items-center px-6 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition-all shadow-lg shadow-black/10">
        <PlusIcon class="w-5 h-5 mr-2" />
        Add New Target
      </button>
    </div>

    <!-- Targets List -->
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div v-if="loading" class="p-20 flex flex-col items-center justify-center">
        <div class="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p class="mt-4 text-gray-400 font-medium">Loading targets...</p>
      </div>

      <template v-else>
        <div v-if="targets.length === 0" class="p-20 text-center">
          <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
            <GlobeIcon class="w-10 h-10" />
          </div>
          <h3 class="text-xl font-bold text-black mb-2">No targets yet</h3>
          <p class="text-gray-500 max-w-xs mx-auto mb-8">Start by adding your first domain or IP address to scan for vulnerabilities.</p>
          <button @click="openCreate" class="text-blue-600 font-bold hover:underline">Add target now</button>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-gray-50/50 text-gray-400 text-xs font-bold uppercase tracking-widest">
              <tr>
                <th class="px-6 py-4">Name / Address</th>
                <th class="px-6 py-4">Status</th>
                <th class="px-6 py-4">Owner</th>
                <th class="px-6 py-4">Created</th>
                <th class="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="target in targets" :key="target.id" class="hover:bg-gray-50/50 transition-colors group">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                      <GlobeIcon class="w-5 h-5" />
                    </div>
                    <div>
                      <p class="text-sm font-bold text-black">{{ target.url }}</p>
                      <p class="text-xs text-gray-400">{{ target.verification_status || 'pending' }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <button
                    @click="toggleActive(target)"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold transition-all"
                    :class="target.is_active ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'"
                  >
                    {{ target.is_active ? 'Active' : 'Inactive' }}
                  </button>
                  <span v-if="target.verification_status === 'verified'" class="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600">Verified</span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">{{ target.owner_email || target.owner || '-' }}</td>
                <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(target.created_at) }}</td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <button @click="openEdit(target)" class="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Edit">
                      <PencilIcon class="w-5 h-5" />
                    </button>
                    <button @click="openVerify(target)" class="p-2 text-gray-400 hover:text-emerald-600 transition-colors" title="Verify ownership">
                      <CheckIcon class="w-5 h-5" />
                    </button>
                    <button v-if="authStore.isAdmin" @click="openAssignOwner(target)" class="p-2 text-gray-400 hover:text-purple-600 transition-colors" title="Assign owner">
                      <UserIcon class="w-5 h-5" />
                    </button>
                    <button @click="runScan(target)" class="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Start Scan">
                      <PlayIcon class="w-5 h-5" />
                    </button>
                    <button @click="removeTarget(target.id)" class="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                      <TrashIcon class="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showFormModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showFormModal = false"></div>
      <div class="bg-white rounded-3xl w-full max-w-md p-8 relative z-10 shadow-2xl">
        <h3 class="text-2xl font-bold text-black mb-6">{{ editingTarget ? 'Edit Target' : 'Add New Target' }}</h3>
        <form @submit.prevent="saveTarget" class="space-y-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Target URL (Domain or IP)</label>
            <input v-model="targetForm.url" type="text" required placeholder="e.g. https://example.com" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none" />
          </div>
          <p v-if="formError" class="text-red-500 text-xs font-bold">{{ formError }}</p>
          <button type="submit" :disabled="submitting" class="w-full py-4 bg-black text-white font-bold rounded-xl mt-4 disabled:opacity-50">
            {{ submitting ? 'Saving...' : 'Save Target' }}
          </button>
        </form>
      </div>
    </div>

    <!-- Verify Ownership Modal -->
    <div v-if="showVerifyModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showVerifyModal = false"></div>
      <div class="bg-white rounded-3xl w-full max-w-md p-8 relative z-10 shadow-2xl">
        <h3 class="text-2xl font-bold text-black mb-2">Verify Ownership</h3>
        <p class="text-sm text-gray-500 mb-6">{{ activeTarget?.url }}</p>
        <form @submit.prevent="submitVerify" class="space-y-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Verification Token</label>
            <input v-model="verifyForm.token" type="text" placeholder="Token or method" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none" />
          </div>
          <p v-if="verifyMsg" :class="verifyOk ? 'text-emerald-600' : 'text-red-500'" class="text-xs font-bold">{{ verifyMsg }}</p>
          <button type="submit" :disabled="verifying" class="w-full py-4 bg-black text-white font-bold rounded-xl disabled:opacity-50">
            {{ verifying ? 'Verifying...' : 'Verify' }}
          </button>
        </form>
      </div>
    </div>

    <!-- Assign Owner Modal -->
    <div v-if="showAssignModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showAssignModal = false"></div>
      <div class="bg-white rounded-3xl w-full max-w-md p-8 relative z-10 shadow-2xl">
        <h3 class="text-2xl font-bold text-black mb-2">Assign Owner</h3>
        <p class="text-sm text-gray-500 mb-6">{{ activeTarget?.url }}</p>
        <form @submit.prevent="submitAssignOwner" class="space-y-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Owner User ID</label>
            <input v-model="assignForm.user_id" type="text" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none" />
          </div>
          <p v-if="assignError" class="text-red-500 text-xs font-bold">{{ assignError }}</p>
          <button type="submit" :disabled="assigning" class="w-full py-4 bg-black text-white font-bold rounded-xl disabled:opacity-50">
            {{ assigning ? 'Saving...' : 'Assign' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, h } from 'vue'
import { targetsApi, scansApi } from '../api/endpoints'
import { useAuthStore } from '../stores/auth'

const PlusIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 6v6m0 0v6m0-6h6m-6 0H6' })])
const GlobeIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' })])
const PlayIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z' }), h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })])
const TrashIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' })])
const PencilIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' })])
const CheckIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' })])
const UserIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' })])

const authStore = useAuthStore()
const targets = ref<any[]>([])
const loading = ref(true)
const submitting = ref(false)
const showFormModal = ref(false)
const editingTarget = ref<any>(null)
const formError = ref('')
const targetForm = reactive({ url: '' })

const showVerifyModal = ref(false)
const verifyForm = reactive({ token: '' })
const verifying = ref(false)
const verifyMsg = ref('')
const verifyOk = ref(false)

const showAssignModal = ref(false)
const assignForm = reactive({ user_id: '' })
const assigning = ref(false)
const assignError = ref('')

const activeTarget = ref<any>(null)

const fetchTargets = async () => {
  loading.value = true
  try {
    const res = await targetsApi.getTargets()
    targets.value = Array.isArray(res.data) ? res.data : (res.data.results || [])
  } catch (err) {
    console.error('Failed to fetch targets', err)
  } finally {
    loading.value = false
  }
}

const openCreate = () => {
  editingTarget.value = null
  targetForm.url = ''
  formError.value = ''
  showFormModal.value = true
}

const openEdit = (t: any) => {
  editingTarget.value = t
  targetForm.url = t.url || ''
  formError.value = ''
  showFormModal.value = true
}

const saveTarget = async () => {
  submitting.value = true
  formError.value = ''
  try {
    if (editingTarget.value) {
      await targetsApi.updateTarget(editingTarget.value.id, targetForm)
    } else {
      await targetsApi.createTarget(targetForm)
    }
    showFormModal.value = false
    fetchTargets()
  } catch (err: any) {
    formError.value = err.response?.data?.detail || 'Magsat saklanmady.'
  } finally {
    submitting.value = false
  }
}

const removeTarget = async (id: number) => {
  if (!confirm('Hakykatdanam pozmak isleýärsiňizmi?')) return
  try {
    await targetsApi.deleteTarget(id)
    fetchTargets()
  } catch (err) {
    console.error('Failed to delete target', err)
  }
}

const toggleActive = async (target: any) => {
  try {
    await targetsApi.toggleActive(target.id)
    target.is_active = !target.is_active
  } catch (err) {
    console.error('Failed to toggle status', err)
  }
}

const runScan = async (target: any) => {
  try {
    const res = await scansApi.createScan({ target: target.id, scan_type: 'full' })
    alert(`Skanirleme başladyldy! ID: ${res.data.id}`)
  } catch (err: any) {
    alert(err.response?.data?.detail || 'Skanirleme başlap bilmedi.')
  }
}

const openVerify = (t: any) => {
  activeTarget.value = t
  verifyForm.token = ''
  verifyMsg.value = ''
  showVerifyModal.value = true
}

const submitVerify = async () => {
  if (!activeTarget.value) return
  verifying.value = true
  verifyMsg.value = ''
  try {
    const res = await targetsApi.verifyOwnership(activeTarget.value.id, verifyForm)
    verifyOk.value = true
    verifyMsg.value = res.data?.detail || 'Eýeçilik tassyklandy.'
    fetchTargets()
  } catch (err: any) {
    verifyOk.value = false
    verifyMsg.value = err.response?.data?.detail || 'Tassyklama başartmady.'
  } finally {
    verifying.value = false
  }
}

const openAssignOwner = (t: any) => {
  activeTarget.value = t
  assignForm.user_id = ''
  assignError.value = ''
  showAssignModal.value = true
}

const submitAssignOwner = async () => {
  if (!activeTarget.value) return
  assigning.value = true
  assignError.value = ''
  try {
    await targetsApi.assignOwner(activeTarget.value.id, { user_id: assignForm.user_id })
    showAssignModal.value = false
    fetchTargets()
  } catch (err: any) {
    assignError.value = err.response?.data?.detail || 'Eýe bellenilmedi.'
  } finally {
    assigning.value = false
  }
}

const formatDate = (s: string) => (s ? new Date(s).toLocaleDateString() : '-')

onMounted(fetchTargets)
</script>
