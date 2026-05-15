<template>
  <div class="space-y-8">
    <div>
      <h2 class="text-2xl font-bold text-black">Advanced Scans</h2>
      <p class="text-gray-500">Targeted security checks beyond the standard scan.</p>
    </div>

    <div class="flex flex-wrap gap-2">
      <button
        v-for="t in tabs"
        :key="t.id"
        @click="selectTab(t.id)"
        :class="active === t.id ? 'bg-black text-white' : 'bg-white border border-gray-200 text-gray-600'"
        class="px-4 py-2 text-sm font-bold rounded-xl"
      >
        {{ t.label }}
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div>
          <h3 class="text-lg font-bold text-black">{{ activeTab.label }}</h3>
          <p class="text-sm text-gray-500">{{ activeTab.description }}</p>
        </div>
        <label class="text-xs uppercase tracking-widest text-gray-400 font-bold">Request Body</label>
        <textarea v-model="body" rows="14" class="w-full font-mono text-xs px-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-600"></textarea>
        <div class="flex items-center gap-3">
          <button @click="run" :disabled="busy" class="px-5 py-3 bg-blue-600 text-white text-sm font-bold rounded-xl disabled:opacity-50">
            {{ busy ? 'Running...' : 'Run' }}
          </button>
          <button @click="body = activeTab.template" type="button" class="px-5 py-3 border border-gray-200 text-gray-700 text-sm font-bold rounded-xl">
            Reset
          </button>
        </div>
        <p v-if="error" class="text-red-500 text-xs font-bold whitespace-pre-wrap">{{ error }}</p>
      </div>

      <div class="bg-black text-white rounded-2xl p-6 shadow-xl">
        <h3 class="text-lg font-bold mb-4">Response</h3>
        <pre class="bg-gray-950 rounded-2xl p-4 text-xs overflow-auto max-h-[480px]">{{ result || 'No response yet' }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { advancedApi } from '../api/endpoints'

type TabId = 'api' | 'jwt' | 'graphql' | 'headers' | 'ai'

interface Tab {
  id: TabId
  label: string
  description: string
  template: string
  run: (body: any) => Promise<any>
}

const tabs: Tab[] = [
  { id: 'api', label: 'API Scan', description: 'Audit an API for common vulnerabilities.', template: '{\n  "url": "https://example.com/api",\n  "method": "GET"\n}', run: (b) => advancedApi.apiScan(b) },
  { id: 'jwt', label: 'JWT Check', description: 'Inspect a JWT for weak configuration.', template: '{\n  "token": ""\n}', run: (b) => advancedApi.jwtCheck(b) },
  { id: 'graphql', label: 'GraphQL Scan', description: 'Probe a GraphQL endpoint.', template: '{\n  "url": "https://example.com/graphql"\n}', run: (b) => advancedApi.graphqlScan(b) },
  { id: 'headers', label: 'Header Analysis', description: 'Analyze HTTP security headers.', template: '{\n  "url": "https://example.com"\n}', run: (b) => advancedApi.headerAnalysis(b) },
  { id: 'ai', label: 'AI Summary', description: 'Summarize a scan result via AI.', template: '{\n  "scan_id": 1\n}', run: (b) => advancedApi.aiSummary(b) },
]

const active = ref<TabId>('api')
const activeTab = computed(() => tabs.find(t => t.id === active.value)!)
const body = ref(tabs[0]!.template)
const busy = ref(false)
const error = ref('')
const result = ref('')

const selectTab = (id: TabId) => {
  active.value = id
  const tab = tabs.find(t => t.id === id)
  if (tab) body.value = tab.template
  result.value = ''
  error.value = ''
}

const run = async () => {
  busy.value = true
  error.value = ''
  result.value = ''
  try {
    const parsed = body.value.trim() ? JSON.parse(body.value) : {}
    const res = await activeTab.value.run(parsed)
    result.value = typeof res.data === 'string' ? res.data : JSON.stringify(res.data, null, 2)
  } catch (err: any) {
    error.value = err?.response?.data ? JSON.stringify(err.response.data, null, 2) : err.message
  } finally {
    busy.value = false
  }
}
</script>
