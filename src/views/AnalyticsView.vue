<template>
  <div class="space-y-8">
    <div>
      <h2 class="text-2xl font-bold text-black">Analytics</h2>
      <p class="text-gray-500">Trends and reports across your scans and vulnerabilities.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Vulnerability Trends -->
      <section class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 class="text-lg font-bold text-black mb-4">Vulnerability Trends</h3>
        <div v-if="loading.trends" class="text-gray-400 text-sm">Loading…</div>
        <pre v-else class="bg-gray-950 text-gray-100 rounded-2xl p-4 text-xs overflow-auto max-h-72">{{ format(trends) }}</pre>
      </section>

      <!-- Common Issues -->
      <section class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 class="text-lg font-bold text-black mb-4">Common Issues</h3>
        <div v-if="loading.common" class="text-gray-400 text-sm">Loading…</div>
        <ul v-else-if="commonIssuesList.length" class="divide-y divide-gray-100">
          <li v-for="(i, idx) in commonIssuesList" :key="idx" class="flex justify-between py-3 gap-3">
            <span class="text-sm text-black truncate">{{ i.name || i.title || i.label }}</span>
            <span class="text-xs font-bold text-gray-400">{{ i.count ?? i.total ?? 0 }}</span>
          </li>
        </ul>
        <div v-else class="text-gray-400 text-sm">No data.</div>
      </section>

      <!-- Scan Success Rate -->
      <section class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 class="text-lg font-bold text-black mb-4">Scan Success Rate</h3>
        <div v-if="loading.success" class="text-gray-400 text-sm">Loading…</div>
        <div v-else class="text-3xl font-bold text-black">
          {{ successRate?.success_rate ?? successRate?.rate ?? successRate?.value ?? '—' }}
          <span v-if="successRate" class="text-base text-gray-400 font-normal">/100</span>
        </div>
        <pre v-if="successRate" class="bg-gray-50 text-gray-700 rounded-2xl p-4 mt-4 text-xs overflow-auto max-h-40">{{ format(successRate) }}</pre>
      </section>

      <!-- Risk Heatmap -->
      <section class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 class="text-lg font-bold text-black mb-4">Risk Heatmap</h3>
        <div v-if="loading.heatmap" class="text-gray-400 text-sm">Loading…</div>
        <pre v-else class="bg-gray-950 text-gray-100 rounded-2xl p-4 text-xs overflow-auto max-h-72">{{ format(heatmap) }}</pre>
      </section>

      <!-- Time Based Report -->
      <section class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:col-span-2">
        <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h3 class="text-lg font-bold text-black">Time-Based Report</h3>
          <div class="flex items-center gap-2">
            <input v-model="reportFrom" type="date" class="px-3 py-2 rounded-xl border border-gray-200 text-sm" />
            <input v-model="reportTo" type="date" class="px-3 py-2 rounded-xl border border-gray-200 text-sm" />
            <button @click="fetchTimeReport" class="px-4 py-2 bg-black text-white text-sm font-bold rounded-xl">Refresh</button>
          </div>
        </div>
        <div v-if="loading.report" class="text-gray-400 text-sm">Loading…</div>
        <pre v-else class="bg-gray-950 text-gray-100 rounded-2xl p-4 text-xs overflow-auto max-h-96">{{ format(report) }}</pre>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue'
import { analyticsApi } from '../api/endpoints'

const trends = ref<any>(null)
const common = ref<any>(null)
const successRate = ref<any>(null)
const heatmap = ref<any>(null)
const report = ref<any>(null)

const reportFrom = ref('')
const reportTo = ref('')

const loading = reactive({ trends: true, common: true, success: true, heatmap: true, report: true })

const commonIssuesList = computed(() => {
  const data = common.value
  if (!data) return []
  if (Array.isArray(data)) return data
  return data.results || data.items || []
})

const format = (v: any) => (v ? JSON.stringify(v, null, 2) : 'No data')

const fetchTrends = async () => {
  loading.trends = true
  try { trends.value = (await analyticsApi.getVulnerabilityTrends()).data } catch (e) { console.error(e) }
  finally { loading.trends = false }
}
const fetchCommon = async () => {
  loading.common = true
  try { common.value = (await analyticsApi.getCommonIssues()).data } catch (e) { console.error(e) }
  finally { loading.common = false }
}
const fetchSuccess = async () => {
  loading.success = true
  try { successRate.value = (await analyticsApi.getScanSuccessRate()).data } catch (e) { console.error(e) }
  finally { loading.success = false }
}
const fetchHeatmap = async () => {
  loading.heatmap = true
  try { heatmap.value = (await analyticsApi.getRiskHeatmap()).data } catch (e) { console.error(e) }
  finally { loading.heatmap = false }
}
const fetchTimeReport = async () => {
  loading.report = true
  try {
    const params: any = {}
    if (reportFrom.value) params.from = reportFrom.value
    if (reportTo.value) params.to = reportTo.value
    report.value = (await analyticsApi.getTimeBasedReport(params)).data
  } catch (e) { console.error(e) }
  finally { loading.report = false }
}

onMounted(() => {
  fetchTrends()
  fetchCommon()
  fetchSuccess()
  fetchHeatmap()
  fetchTimeReport()
})
</script>
