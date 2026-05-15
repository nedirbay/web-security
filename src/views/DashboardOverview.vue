<template>
  <div class="space-y-8">
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="stat in stats" :key="stat.name" class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <div class="p-2 rounded-xl" :class="stat.bgColor">
            <component :is="stat.icon" class="w-6 h-6" :class="stat.iconColor" />
          </div>
          <span class="text-xs font-bold text-gray-400 uppercase tracking-tighter">{{ stat.trend }}</span>
        </div>
        <h3 class="text-sm font-medium text-gray-500 mb-1">{{ stat.name }}</h3>
        <p class="text-2xl font-bold text-black">{{ loading ? '…' : stat.value }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Activity -->
      <div class="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-gray-50 flex items-center justify-between">
          <h2 class="text-lg font-bold text-black">Recent Scans</h2>
          <router-link to="/dashboard/scans" class="text-sm font-medium text-blue-600 hover:text-blue-700">View all</router-link>
        </div>
        <div v-if="loading" class="p-8 text-center text-gray-400 text-sm">Loading…</div>
        <div v-else-if="recentScans.length === 0" class="p-8 text-center text-gray-400 text-sm">No scans yet.</div>
        <div v-else class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-gray-50/50 text-gray-400 text-xs font-bold uppercase tracking-widest">
              <tr>
                <th class="px-6 py-4">Target</th>
                <th class="px-6 py-4">Status</th>
                <th class="px-6 py-4">Type</th>
                <th class="px-6 py-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="scan in recentScans" :key="scan.id" class="hover:bg-gray-50/50 transition-colors cursor-pointer">
                <td class="px-6 py-4">
                  <p class="text-sm font-bold text-black">{{ scan.target_address || scan.target_name || scan.target }}</p>
                </td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold" :class="statusClass(scan.status)">
                    {{ scan.status || 'unknown' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">{{ scan.scan_type || '-' }}</td>
                <td class="px-6 py-4 text-right text-sm text-gray-500">{{ formatDate(scan.created_at) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="space-y-8">
        <div class="bg-black rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
          <div class="relative z-10">
            <h3 class="text-xl font-bold mb-2">Secure your domain</h3>
            <p class="text-gray-400 text-sm mb-6 leading-relaxed">Add a new target and start scanning for vulnerabilities automatically.</p>
            <button @click="$router.push('/dashboard/targets')" class="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-colors">
              Add Target
            </button>
          </div>
          <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl group-hover:bg-blue-600/40 transition-all"></div>
        </div>

        <!-- Common issues from analytics -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 class="text-lg font-bold text-black mb-6">Common Issues</h2>
          <div v-if="loading" class="text-gray-400 text-sm">Loading…</div>
          <div v-else-if="commonIssues.length === 0" class="text-gray-400 text-sm">No data yet.</div>
          <ul v-else class="space-y-4">
            <li v-for="issue in commonIssues.slice(0, 5)" :key="issue.name || issue.title" class="flex justify-between gap-2">
              <span class="text-sm text-black truncate">{{ issue.name || issue.title || issue.label }}</span>
              <span class="text-xs font-bold text-gray-400">{{ issue.count ?? issue.total ?? 0 }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, ref, onMounted } from 'vue'
import { adminApi, scansApi, analyticsApi, targetsApi, vulnerabilitiesApi } from '../api/endpoints'
import { useAuthStore } from '../stores/auth'

const ShieldIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' })])
const AlertIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' })])
const TargetIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' })])
const ActivityIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 10V3L4 14h7v7l9-11h-7z' })])

const authStore = useAuthStore()
const loading = ref(true)
const recentScans = ref<any[]>([])
const commonIssues = ref<any[]>([])

const stats = ref([
  { name: 'Active Scans', value: '0', trend: '', icon: ActivityIcon, iconColor: 'text-blue-600', bgColor: 'bg-blue-50' },
  { name: 'Total Targets', value: '0', trend: '', icon: TargetIcon, iconColor: 'text-purple-600', bgColor: 'bg-purple-50' },
  { name: 'Critical Vulnerabilities', value: '0', trend: '', icon: AlertIcon, iconColor: 'text-red-600', bgColor: 'bg-red-50' },
  { name: 'Security Score', value: '—', trend: '', icon: ShieldIcon, iconColor: 'text-green-600', bgColor: 'bg-green-50' },
])

const statusClass = (s: string) => {
  switch ((s || '').toLowerCase()) {
    case 'completed': return 'bg-green-50 text-green-600'
    case 'running': case 'in_progress': return 'bg-blue-50 text-blue-600'
    case 'failed': return 'bg-red-50 text-red-600'
    default: return 'bg-gray-50 text-gray-500'
  }
}

const formatDate = (s: string) => (s ? new Date(s).toLocaleDateString() : '-')

const setStat = (i: number, value: string) => {
  const item = stats.value[i]
  if (item) item.value = value
}
const statIs = (i: number, ...vals: string[]) => {
  const item = stats.value[i]
  return !!item && vals.includes(item.value)
}

const loadAll = async () => {
  loading.value = true
  try {
    if (authStore.isAdmin) {
      try {
        const dash = await adminApi.getDashboard()
        const d = dash.data || {}
        setStat(0, String(d.active_scans ?? d.scans_active ?? '—'))
        setStat(1, String(d.total_targets ?? d.targets_count ?? '—'))
        setStat(2, String(d.critical_vulnerabilities ?? d.critical ?? '—'))
        if (d.security_score) setStat(3, String(d.security_score))
      } catch {
        // fall through to non-admin path
      }
    }

    const [scansRes, targetsRes, vulnRes, issuesRes] = await Promise.all([
      scansApi.getScans().catch(() => null),
      targetsApi.getTargets().catch(() => null),
      vulnerabilitiesApi.getVulnerabilities({ severity: 'critical' }).catch(() => null),
      analyticsApi.getCommonIssues().catch(() => null),
    ])

    const allScans = scansRes ? (Array.isArray(scansRes.data) ? scansRes.data : scansRes.data.results || []) : []
    recentScans.value = allScans.slice(0, 5)
    if (statIs(0, '0', '—')) {
      setStat(0, String(allScans.filter((s: any) => ['running', 'in_progress', 'pending'].includes((s.status || '').toLowerCase())).length))
    }
    if (targetsRes) {
      const all = Array.isArray(targetsRes.data) ? targetsRes.data : targetsRes.data.results || []
      if (statIs(1, '0', '—')) setStat(1, String(targetsRes.data.count ?? all.length))
    }
    if (vulnRes) {
      const v = Array.isArray(vulnRes.data) ? vulnRes.data : vulnRes.data.results || []
      if (statIs(2, '0', '—')) setStat(2, String(vulnRes.data.count ?? v.length))
    }
    if (issuesRes) {
      const data = issuesRes.data
      commonIssues.value = Array.isArray(data) ? data : data.results || data.items || []
    }
  } finally {
    loading.value = false
  }
}

onMounted(loadAll)
</script>
