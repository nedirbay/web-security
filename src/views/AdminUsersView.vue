<template>
  <div class="space-y-8">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-black">Users</h2>
        <p class="text-gray-500">Manage application users, roles, and target assignments.</p>
      </div>
      <input v-model="search" type="text" placeholder="Search…" class="px-4 py-2 rounded-xl border border-gray-200 text-sm" @keyup.enter="fetchUsers" />
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div v-if="loading" class="p-12 text-center text-gray-400">Loading…</div>
      <div v-else-if="users.length === 0" class="p-12 text-center text-gray-400">No users.</div>
      <table v-else class="w-full text-left">
        <thead class="bg-gray-50/50 text-gray-400 text-xs font-bold uppercase tracking-widest">
          <tr>
            <th class="px-6 py-4">User</th>
            <th class="px-6 py-4">Email</th>
            <th class="px-6 py-4">Role</th>
            <th class="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr v-for="u in users" :key="u.id">
            <td class="px-6 py-4 text-sm font-bold text-black">{{ u.username || u.name }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ u.email }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ u.role }}</td>
            <td class="px-6 py-4 text-right">
              <button @click="openEdit(u)" class="text-blue-600 text-xs font-bold hover:underline mr-3">Edit</button>
              <button @click="openAssign(u)" class="text-emerald-600 text-xs font-bold hover:underline mr-3">Assign target</button>
              <button @click="remove(u)" class="text-red-600 text-xs font-bold hover:underline">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEdit" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showEdit = false"></div>
      <div class="bg-white rounded-3xl w-full max-w-md p-8 relative z-10 shadow-2xl">
        <h3 class="text-2xl font-bold text-black mb-6">Edit User</h3>
        <form @submit.prevent="saveEdit" class="space-y-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Username</label>
            <input v-model="editForm.username" type="text" class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Email</label>
            <input v-model="editForm.email" type="email" class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Role</label>
            <select v-model="editForm.role" class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-600">
              <option v-for="r in roles" :key="r.id ?? r" :value="r.name ?? r">{{ r.name ?? r }}</option>
            </select>
          </div>
          <p v-if="editError" class="text-red-500 text-xs font-bold">{{ editError }}</p>
          <button type="submit" :disabled="saving" class="w-full py-4 bg-black text-white font-bold rounded-xl disabled:opacity-50">
            {{ saving ? 'Saving...' : 'Save' }}
          </button>
        </form>
      </div>
    </div>

    <!-- Assign Target Modal -->
    <div v-if="showAssign" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showAssign = false"></div>
      <div class="bg-white rounded-3xl w-full max-w-md p-8 relative z-10 shadow-2xl">
        <h3 class="text-2xl font-bold text-black mb-6">Assign Target</h3>
        <form @submit.prevent="saveAssign" class="space-y-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Target ID</label>
            <input v-model="assignForm.target_id" type="text" required class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-600" />
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
import { ref, reactive, onMounted } from 'vue'
import { adminApi } from '../api/endpoints'

const users = ref<any[]>([])
const loading = ref(true)
const search = ref('')
const roles = ref<any[]>([])

const showEdit = ref(false)
const showAssign = ref(false)
const editing = ref<any>(null)
const editForm = reactive({ username: '', email: '', role: '' })
const editError = ref('')
const saving = ref(false)

const assigning = ref(false)
const assignError = ref('')
const assignForm = reactive({ target_id: '' })
const assignTarget = ref<any>(null)

const fetchUsers = async () => {
  loading.value = true
  try {
    const params: any = {}
    if (search.value) params.search = search.value
    const res = await adminApi.getUsers(params)
    users.value = Array.isArray(res.data) ? res.data : res.data.results || []
  } catch (err) {
    console.error('Failed to fetch users', err)
  } finally {
    loading.value = false
  }
}

const fetchRoles = async () => {
  try {
    const res = await adminApi.getRoles()
    roles.value = Array.isArray(res.data) ? res.data : res.data.results || []
  } catch (err) {
    console.error('Failed to fetch roles', err)
  }
}

const openEdit = async (u: any) => {
  editing.value = u
  editError.value = ''
  try {
    const res = await adminApi.getUser(u.id)
    const data = res.data
    editForm.username = data.username || ''
    editForm.email = data.email || ''
    editForm.role = data.role || ''
  } catch {
    editForm.username = u.username || ''
    editForm.email = u.email || ''
    editForm.role = u.role || ''
  }
  showEdit.value = true
}

const saveEdit = async () => {
  if (!editing.value) return
  saving.value = true
  editError.value = ''
  try {
    await adminApi.updateUser(editing.value.id, editForm)
    showEdit.value = false
    fetchUsers()
  } catch (err: any) {
    editError.value = err.response?.data?.detail || 'Saklap bolmady.'
  } finally {
    saving.value = false
  }
}

const remove = async (u: any) => {
  if (!confirm(`Delete ${u.username || u.email}?`)) return
  try {
    await adminApi.deleteUser(u.id)
    fetchUsers()
  } catch (err) {
    console.error('Failed to delete user', err)
  }
}

const openAssign = (u: any) => {
  assignTarget.value = u
  assignForm.target_id = ''
  assignError.value = ''
  showAssign.value = true
}

const saveAssign = async () => {
  if (!assignTarget.value) return
  assigning.value = true
  assignError.value = ''
  try {
    await adminApi.assignTargetToUser(assignTarget.value.id, { target_id: assignForm.target_id })
    showAssign.value = false
  } catch (err: any) {
    assignError.value = err.response?.data?.detail || 'Bellenip bolmady.'
  } finally {
    assigning.value = false
  }
}

onMounted(() => {
  fetchUsers()
  fetchRoles()
})
</script>
