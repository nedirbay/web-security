<template>
  <div class="space-y-8">
    <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.3em] text-blue-600">Admin Tools</p>
        <h2 class="text-3xl font-bold text-black mt-2">API Console</h2>
        <p class="text-gray-500 max-w-3xl mt-2">
          Use this panel to call every backend endpoint from the UI. The request body below is reused for write operations.
        </p>
      </div>
      <div class="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm">
        <p class="text-gray-400 uppercase text-[10px] font-bold tracking-[0.25em]">Status</p>
        <p class="font-semibold text-black">{{ busy ? 'Running request...' : 'Ready' }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <section class="xl:col-span-2 space-y-6">
        <div class="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
          <h3 class="text-lg font-bold text-black mb-4">Request Inputs</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <label v-for="field in idFields" :key="field.key" class="space-y-2">
              <span class="text-xs font-bold uppercase tracking-widest text-gray-400">{{ field.label }}</span>
              <input
                v-model="ids[field.key]"
                type="text"
                class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-600"
              />
            </label>
          </div>

          <div class="flex flex-wrap gap-2 mb-4">
            <button
              v-for="template in templates"
              :key="template.label"
              type="button"
              @click="requestBody = template.body"
              class="px-3 py-2 rounded-full text-xs font-bold border transition-colors"
              :class="template.className"
            >
              {{ template.label }}
            </button>
          </div>

          <label class="block space-y-2">
            <span class="text-xs font-bold uppercase tracking-widest text-gray-400">Request Body</span>
            <textarea
              v-model="requestBody"
              rows="10"
              class="w-full rounded-2xl border border-gray-200 px-4 py-4 text-sm font-mono outline-none focus:ring-2 focus:ring-blue-600"
              spellcheck="false"
            />
          </label>
        </div>

        <div
          v-for="section in sections"
          :key="section.title"
          class="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm"
        >
          <div class="flex flex-col gap-2 mb-4">
            <h3 class="text-lg font-bold text-black">{{ section.title }}</h3>
            <p class="text-sm text-gray-500">{{ section.description }}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              v-for="action in section.actions"
              :key="action.label"
              type="button"
              @click="action.run()"
              :disabled="busy"
              class="rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              :class="action.variant === 'danger'
                ? 'border-red-200 text-red-700 hover:bg-red-50'
                : action.variant === 'ghost'
                  ? 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  : 'border-blue-200 text-blue-700 hover:bg-blue-50'"
            >
              {{ action.label }}
            </button>
          </div>
        </div>
      </section>

      <aside class="space-y-6">
        <div class="bg-black text-white rounded-3xl p-6 shadow-xl">
          <p class="text-xs uppercase tracking-[0.3em] text-gray-400 font-bold">Last Call</p>
          <h3 class="text-xl font-bold mt-2">{{ lastCall || 'None yet' }}</h3>
          <p v-if="lastError" class="mt-4 text-sm text-red-300 whitespace-pre-wrap">{{ lastError }}</p>
          <p v-else class="mt-4 text-sm text-gray-300">Successful responses appear below.</p>
        </div>

        <div class="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-black">Response</h3>
            <button
              v-if="lastResult !== null"
              type="button"
              class="text-xs font-bold text-blue-600 hover:text-blue-700"
              @click="copyResponse"
            >
              Copy JSON
            </button>
          </div>
          <pre class="max-h-[560px] overflow-auto rounded-2xl bg-gray-950 text-gray-100 p-4 text-xs leading-6">{{ formattedResult }}</pre>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  advancedApi,
  analyticsApi,
  adminApi,
  systemApi,
  targetsApi,
  scansApi,
  usersApi,
  vulnerabilitiesApi,
} from '../api/endpoints'

type IdFieldKey = 'userId' | 'settingId' | 'blogId' | 'docsPageId' | 'targetId' | 'scanId' | 'vulnId' | 'apiKeyId'
type ConsoleAction = {
  label: string
  run: () => Promise<any>
  variant?: 'danger' | 'ghost' | 'primary'
}

type ConsoleSection = {
  title: string
  description: string
  actions: ConsoleAction[]
}

const busy = ref(false)
const lastCall = ref('')
const lastResult = ref<any>(null)
const lastError = ref('')
const formattedResult = ref('No response yet')
const requestBody = ref('{\n  \n}')
const ids = reactive<Record<IdFieldKey, string>>({
  userId: '1',
  settingId: '1',
  blogId: '1',
  docsPageId: '1',
  targetId: '1',
  scanId: '1',
  vulnId: '1',
  apiKeyId: '1',
})

const idFields: Array<{ key: IdFieldKey; label: string }> = [
  { key: 'userId', label: 'User ID' },
  { key: 'settingId', label: 'Setting ID' },
  { key: 'blogId', label: 'Blog ID' },
  { key: 'docsPageId', label: 'Docs Page ID' },
  { key: 'targetId', label: 'Target ID' },
  { key: 'scanId', label: 'Scan ID' },
  { key: 'vulnId', label: 'Vulnerability ID' },
  { key: 'apiKeyId', label: 'API Key ID' },
]

const templates = [
  {
    label: 'Auth template',
    body: '{\n  "email": "admin@example.com",\n  "password": "password123"\n}',
    className: 'border-blue-200 text-blue-700 hover:bg-blue-50',
  },
  {
    label: 'User template',
    body: '{\n  "username": "demo",\n  "email": "demo@example.com",\n  "password": "password123"\n}',
    className: 'border-emerald-200 text-emerald-700 hover:bg-emerald-50',
  },
  {
    label: 'Target template',
    body: '{\n  "name": "Example App",\n  "address": "example.com"\n}',
    className: 'border-violet-200 text-violet-700 hover:bg-violet-50',
  },
  {
    label: 'Scan template',
    body: '{\n  "target": 1,\n  "scan_type": "full"\n}',
    className: 'border-amber-200 text-amber-700 hover:bg-amber-50',
  },
  {
    label: 'Settings template',
    body: '{\n  "key": "scan_timeout",\n  "value": "300"\n}',
    className: 'border-gray-200 text-gray-700 hover:bg-gray-50',
  },
  {
    label: 'Advanced template',
    body: '{\n  "url": "https://example.com"\n}',
    className: 'border-pink-200 text-pink-700 hover:bg-pink-50',
  },
]

const normalizeError = (error: any) => {
  const data = error?.response?.data
  if (!data) return error?.message || 'Request failed'
  if (typeof data === 'string') return data
  return data.detail || data.message || JSON.stringify(data, null, 2)
}

const parseBody = () => {
  const text = requestBody.value.trim()
  if (!text) return {}
  return JSON.parse(text)
}

const ensureId = (value: string, label: string) => {
  const trimmed = value.trim()
  if (!trimmed) {
    throw new Error(`${label} is required`)
  }
  return trimmed
}

const invoke = async (label: string, runner: () => Promise<any>) => {
  busy.value = true
  lastCall.value = label
  lastError.value = ''

  try {
    const response = await runner()
    lastResult.value = response.data
    formattedResult.value =
      typeof response.data === 'string' ? response.data : JSON.stringify(response.data, null, 2)
  } catch (error: any) {
    lastResult.value = null
    lastError.value = normalizeError(error)
    formattedResult.value = 'No response yet'
  } finally {
    busy.value = false
  }
}

const withBody = (label: string, runner: (body: any) => Promise<any>) =>
  invoke(label, async () => runner(parseBody()))

const sections: ConsoleSection[] = [
  {
    title: 'System',
    description: 'Schema and documentation endpoints.',
    actions: [
      { label: 'GET /api/schema/', run: () => invoke('GET /api/schema/', () => systemApi.getSchema()) },
      { label: 'GET /api/docs/', run: () => invoke('GET /api/docs/', () => systemApi.getDocs()) },
    ],
  },
  {
    title: 'Auth and Users',
    description: 'Register, login, profile, reset, and API keys.',
    actions: [
      { label: 'POST /api/users/register/', run: () => withBody('POST /api/users/register/', (body) => usersApi.register(body)) },
      { label: 'POST /api/users/login/', run: () => withBody('POST /api/users/login/', (body) => usersApi.login(body)) },
      { label: 'POST /api/users/logout/', run: () => invoke('POST /api/users/logout/', () => usersApi.logout()) },
      { label: 'GET /api/users/', run: () => invoke('GET /api/users/', () => usersApi.getUsers()) },
      { label: 'GET /api/users/me/', run: () => invoke('GET /api/users/me/', () => usersApi.getMe()) },
      { label: 'GET /api/users/profile/', run: () => invoke('GET /api/users/profile/', () => usersApi.getProfile()) },
      { label: 'PATCH /api/users/profile/', run: () => withBody('PATCH /api/users/profile/', (body) => usersApi.updateProfile(body)) },
      { label: 'POST /api/users/password/reset/', run: () => withBody('POST /api/users/password/reset/', (body) => usersApi.requestPasswordReset(body)) },
      { label: 'POST /api/users/password/reset/confirm/', run: () => withBody('POST /api/users/password/reset/confirm/', (body) => usersApi.confirmPasswordReset(body)) },
      { label: 'GET /api/users/api-keys/', run: () => invoke('GET /api/users/api-keys/', () => usersApi.getApiKeys()) },
      { label: 'POST /api/users/api-keys/', run: () => withBody('POST /api/users/api-keys/', (body) => usersApi.createApiKey(body)) },
      { label: 'GET /api/users/api-keys/{id}/', run: () => invoke('GET /api/users/api-keys/{id}/', () => usersApi.getApiKey(ensureId(ids.apiKeyId, 'API Key ID'))) },
      { label: 'DELETE /api/users/api-keys/{id}/', run: () => invoke('DELETE /api/users/api-keys/{id}/', () => usersApi.deleteApiKey(ensureId(ids.apiKeyId, 'API Key ID'))) },
    ],
  },
  {
    title: 'Admin',
    description: 'Dashboard, users, roles, settings, audit logs, blog posts, and docs pages.',
    actions: [
      { label: 'GET /api/admin/dashboard/', run: () => invoke('GET /api/admin/dashboard/', () => adminApi.getDashboard()) },
      { label: 'GET /api/admin/users/', run: () => invoke('GET /api/admin/users/', () => adminApi.getUsers()) },
      { label: 'GET /api/admin/users/{id}/', run: () => invoke('GET /api/admin/users/{id}/', () => adminApi.getUser(ensureId(ids.userId, 'User ID'))) },
      { label: 'PATCH /api/admin/users/{id}/', run: () => withBody('PATCH /api/admin/users/{id}/', (body) => adminApi.updateUser(ensureId(ids.userId, 'User ID'), body)) },
      { label: 'DELETE /api/admin/users/{id}/', run: () => invoke('DELETE /api/admin/users/{id}/', () => adminApi.deleteUser(ensureId(ids.userId, 'User ID'))) },
      { label: 'POST /api/admin/users/{id}/assign-target/', run: () => withBody('POST /api/admin/users/{id}/assign-target/', (body) => adminApi.assignTargetToUser(ensureId(ids.userId, 'User ID'), body)) },
      { label: 'GET /api/admin/roles/', run: () => invoke('GET /api/admin/roles/', () => adminApi.getRoles()) },
      { label: 'GET /api/admin/settings/', run: () => invoke('GET /api/admin/settings/', () => adminApi.getSettings()) },
      { label: 'POST /api/admin/settings/', run: () => withBody('POST /api/admin/settings/', (body) => adminApi.createSetting(body)) },
      { label: 'GET /api/admin/settings/{id}/', run: () => invoke('GET /api/admin/settings/{id}/', () => adminApi.getSetting(ensureId(ids.settingId, 'Setting ID'))) },
      { label: 'PATCH /api/admin/settings/{id}/', run: () => withBody('PATCH /api/admin/settings/{id}/', (body) => adminApi.updateSetting(ensureId(ids.settingId, 'Setting ID'), body)) },
      { label: 'DELETE /api/admin/settings/{id}/', run: () => invoke('DELETE /api/admin/settings/{id}/', () => adminApi.deleteSetting(ensureId(ids.settingId, 'Setting ID'))) },
      { label: 'GET /api/admin/audit-logs/', run: () => invoke('GET /api/admin/audit-logs/', () => adminApi.getAuditLogs()) },
      { label: 'GET /api/admin/blog-posts/', run: () => invoke('GET /api/admin/blog-posts/', () => adminApi.getBlogPosts()) },
      { label: 'POST /api/admin/blog-posts/', run: () => withBody('POST /api/admin/blog-posts/', (body) => adminApi.createBlogPost(body)) },
      { label: 'GET /api/admin/blog-posts/{id}/', run: () => invoke('GET /api/admin/blog-posts/{id}/', () => adminApi.getBlogPost(ensureId(ids.blogId, 'Blog ID'))) },
      { label: 'PATCH /api/admin/blog-posts/{id}/', run: () => withBody('PATCH /api/admin/blog-posts/{id}/', (body) => adminApi.updateBlogPost(ensureId(ids.blogId, 'Blog ID'), body)) },
      { label: 'DELETE /api/admin/blog-posts/{id}/', run: () => invoke('DELETE /api/admin/blog-posts/{id}/', () => adminApi.deleteBlogPost(ensureId(ids.blogId, 'Blog ID'))) },
      { label: 'GET /api/admin/docs-pages/', run: () => invoke('GET /api/admin/docs-pages/', () => adminApi.getDocsPages()) },
      { label: 'POST /api/admin/docs-pages/', run: () => withBody('POST /api/admin/docs-pages/', (body) => adminApi.createDocsPage(body)) },
      { label: 'GET /api/admin/docs-pages/{id}/', run: () => invoke('GET /api/admin/docs-pages/{id}/', () => adminApi.getDocsPage(ensureId(ids.docsPageId, 'Docs Page ID'))) },
      { label: 'PATCH /api/admin/docs-pages/{id}/', run: () => withBody('PATCH /api/admin/docs-pages/{id}/', (body) => adminApi.updateDocsPage(ensureId(ids.docsPageId, 'Docs Page ID'), body)) },
      { label: 'DELETE /api/admin/docs-pages/{id}/', run: () => invoke('DELETE /api/admin/docs-pages/{id}/', () => adminApi.deleteDocsPage(ensureId(ids.docsPageId, 'Docs Page ID'))) },
    ],
  },
  {
    title: 'Targets',
    description: 'Target lifecycle, ownership, and activation.',
    actions: [
      { label: 'GET /api/targets/', run: () => invoke('GET /api/targets/', () => targetsApi.getTargets()) },
      { label: 'POST /api/targets/', run: () => withBody('POST /api/targets/', (body) => targetsApi.createTarget(body)) },
      { label: 'GET /api/targets/{id}/', run: () => invoke('GET /api/targets/{id}/', () => targetsApi.getTarget(ensureId(ids.targetId, 'Target ID'))) },
      { label: 'PATCH /api/targets/{id}/', run: () => withBody('PATCH /api/targets/{id}/', (body) => targetsApi.updateTarget(ensureId(ids.targetId, 'Target ID'), body)) },
      { label: 'DELETE /api/targets/{id}/', run: () => invoke('DELETE /api/targets/{id}/', () => targetsApi.deleteTarget(ensureId(ids.targetId, 'Target ID'))) },
      { label: 'POST /api/targets/{id}/toggle-active/', run: () => invoke('POST /api/targets/{id}/toggle-active/', () => targetsApi.toggleActive(ensureId(ids.targetId, 'Target ID'))) },
      { label: 'POST /api/targets/{id}/verify-ownership/', run: () => withBody('POST /api/targets/{id}/verify-ownership/', (body) => targetsApi.verifyOwnership(ensureId(ids.targetId, 'Target ID'), body)) },
      { label: 'POST /api/targets/{id}/assign-owner/', run: () => withBody('POST /api/targets/{id}/assign-owner/', (body) => targetsApi.assignOwner(ensureId(ids.targetId, 'Target ID'), body)) },
    ],
  },
  {
    title: 'Scans',
    description: 'Scan creation, execution, configs, schedules, and queue control.',
    actions: [
      { label: 'GET /api/scans/', run: () => invoke('GET /api/scans/', () => scansApi.getScans()) },
      { label: 'POST /api/scans/', run: () => withBody('POST /api/scans/', (body) => scansApi.createScan(body)) },
      { label: 'POST /api/scans/{id}/run/', run: () => invoke('POST /api/scans/{id}/run/', () => scansApi.runScan(ensureId(ids.scanId, 'Scan ID'))) },
      { label: 'GET /api/scans/config/zap/', run: () => invoke('GET /api/scans/config/zap/', () => scansApi.getZapConfig()) },
      { label: 'POST /api/scans/config/zap/', run: () => withBody('POST /api/scans/config/zap/', (body) => scansApi.createZapConfig(body)) },
      { label: 'GET /api/scans/schedules/', run: () => invoke('GET /api/scans/schedules/', () => scansApi.getSchedules()) },
      { label: 'POST /api/scans/schedules/', run: () => withBody('POST /api/scans/schedules/', (body) => scansApi.createSchedule(body)) },
      { label: 'POST /api/scans/scheduler/enqueue/', run: () => withBody('POST /api/scans/scheduler/enqueue/', (body) => scansApi.enqueueScheduler(body)) },
      { label: 'POST /api/scans/scheduler/worker-run/', run: () => withBody('POST /api/scans/scheduler/worker-run/', (body) => scansApi.runSchedulerWorker(body)) },
    ],
  },
  {
    title: 'Vulnerabilities',
    description: 'Issue lists, OWASP grouping, and lifecycle management.',
    actions: [
      { label: 'GET /api/scans/vulnerabilities/', run: () => invoke('GET /api/scans/vulnerabilities/', () => vulnerabilitiesApi.getVulnerabilities()) },
      { label: 'GET /api/scans/vulnerabilities/group-by-owasp/', run: () => invoke('GET /api/scans/vulnerabilities/group-by-owasp/', () => vulnerabilitiesApi.getGroupedByOwasp()) },
      { label: 'POST /api/scans/vulnerabilities/{id}/false-positive/', run: () => withBody('POST /api/scans/vulnerabilities/{id}/false-positive/', (body) => vulnerabilitiesApi.markFalsePositive(ensureId(ids.vulnId, 'Vulnerability ID'), body)) },
      { label: 'POST /api/scans/vulnerabilities/{id}/lifecycle/', run: () => withBody('POST /api/scans/vulnerabilities/{id}/lifecycle/', (body) => vulnerabilitiesApi.updateLifecycle(ensureId(ids.vulnId, 'Vulnerability ID'), body)) },
    ],
  },
  {
    title: 'Analytics',
    description: 'Trend and summary endpoints for reporting.',
    actions: [
      { label: 'GET /api/scans/analytics/vulnerability-trends/', run: () => invoke('GET /api/scans/analytics/vulnerability-trends/', () => analyticsApi.getVulnerabilityTrends()) },
      { label: 'GET /api/scans/analytics/common-issues/', run: () => invoke('GET /api/scans/analytics/common-issues/', () => analyticsApi.getCommonIssues()) },
      { label: 'GET /api/scans/analytics/scan-success-rate/', run: () => invoke('GET /api/scans/analytics/scan-success-rate/', () => analyticsApi.getScanSuccessRate()) },
      { label: 'GET /api/scans/analytics/risk-heatmap/', run: () => invoke('GET /api/scans/analytics/risk-heatmap/', () => analyticsApi.getRiskHeatmap()) },
      { label: 'GET /api/scans/analytics/time-based-report/', run: () => invoke('GET /api/scans/analytics/time-based-report/', () => analyticsApi.getTimeBasedReport()) },
    ],
  },
  {
    title: 'Advanced',
    description: 'Optional security checks and helper scans.',
    actions: [
      { label: 'POST /api/scans/advanced/api-scan/', run: () => withBody('POST /api/scans/advanced/api-scan/', (body) => advancedApi.apiScan(body)) },
      { label: 'POST /api/scans/advanced/jwt-check/', run: () => withBody('POST /api/scans/advanced/jwt-check/', (body) => advancedApi.jwtCheck(body)) },
      { label: 'POST /api/scans/advanced/graphql-scan/', run: () => withBody('POST /api/scans/advanced/graphql-scan/', (body) => advancedApi.graphqlScan(body)) },
      { label: 'POST /api/scans/advanced/header-analysis/', run: () => withBody('POST /api/scans/advanced/header-analysis/', (body) => advancedApi.headerAnalysis(body)) },
      { label: 'POST /api/scans/advanced/ai-summary/', run: () => withBody('POST /api/scans/advanced/ai-summary/', (body) => advancedApi.aiSummary(body)) },
    ],
  },
] as const

const copyResponse = async () => {
  await navigator.clipboard.writeText(formattedResult.value)
}
</script>
