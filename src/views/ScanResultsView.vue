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
            <td class="px-6 py-4 text-right flex items-center justify-end gap-3">
              <button @click="run(scan)" class="text-blue-600 text-xs font-bold hover:underline">Run</button>
              <button
                @click="openAiAnalysis(scan)"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-bold rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md"
              >
                <span>✦</span>
                <span>AI Maslahat</span>
              </button>
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
              <option v-for="t in targets" :key="t.id" :value="t.id">{{ t.url }}</option>
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

    <!-- AI Analysis Modal -->
    <div v-if="showAiModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="closeAiModal"></div>
      <div class="relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl" style="background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);">
        
        <!-- Modal Header -->
        <div class="flex items-center justify-between px-8 py-6 border-b border-white/10">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background: linear-gradient(135deg, #a78bfa, #6366f1);">
              <span class="text-white text-lg">✦</span>
            </div>
            <div>
              <h3 class="text-white font-bold text-lg">AI Howpsuzlyk Maslahatçysy</h3>
              <p class="text-violet-300 text-xs font-medium">Gemini 2.5 Flash · OpenRouter</p>
            </div>
          </div>
          <button @click="closeAiModal" class="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-all text-sm">✕</button>
        </div>

        <!-- Scan Info Badge -->
        <div class="px-8 py-4 border-b border-white/10">
          <div class="flex flex-wrap gap-3">
            <div class="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
              <span class="text-violet-300 text-xs font-bold uppercase tracking-wider">Scan</span>
              <span class="text-white text-xs font-mono font-bold">#{{ selectedScan ? String(selectedScan.id).padStart(4, '0') : '' }}</span>
            </div>
            <div class="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
              <span class="text-violet-300 text-xs font-bold uppercase tracking-wider">Target</span>
              <span class="text-white text-xs font-bold">{{ selectedScan ? (selectedScan.target_address || selectedScan.target_name || selectedScan.target) : '' }}</span>
            </div>
            <div class="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
              <span class="text-violet-300 text-xs font-bold uppercase tracking-wider">Görnüş</span>
              <span class="text-white text-xs font-bold">{{ selectedScan?.scan_type || '-' }}</span>
            </div>
            <div class="flex items-center gap-2 rounded-xl px-4 py-2" :class="getStatusBgClass(selectedScan?.status)">
              <span class="text-xs font-bold">{{ selectedScan?.status || 'unknown' }}</span>
            </div>
          </div>
        </div>

        <!-- Content Area -->
        <div class="flex-1 overflow-y-auto px-8 py-6 space-y-4" style="min-height: 200px; max-height: 500px;">
          
          <!-- Loading State -->
          <div v-if="aiLoading" class="flex flex-col items-center justify-center py-12 gap-4">
            <div class="ai-spinner"></div>
            <p class="text-violet-300 text-sm font-medium animate-pulse">Emeli aň seljerme geçirýär...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="aiError" class="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
            <span class="text-red-400 text-xl mt-0.5">⚠</span>
            <div>
              <p class="text-red-300 font-bold text-sm mb-1">Ýalňyşlyk ýüze çykdy</p>
              <p class="text-red-400/80 text-xs">{{ aiError }}</p>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else-if="!aiResponse" class="flex flex-col items-center justify-center py-12 gap-4 text-center">
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style="background: linear-gradient(135deg, #a78bfa22, #6366f122);">✦</div>
            <div>
              <p class="text-white/70 text-sm font-medium">Skan netijesini seljerip başlamak üçin</p>
              <p class="text-violet-300 text-sm font-bold">"Seljer" düwmesine basyň</p>
            </div>
          </div>

          <!-- AI Response -->
          <div v-else class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-sm" style="background: linear-gradient(135deg, #a78bfa, #6366f1);">✦</div>
              <div class="flex-1 bg-white/5 border border-white/10 rounded-2xl p-5">
                <div class="ai-response-content text-white/90 text-sm leading-relaxed" v-html="formattedAiResponse"></div>
              </div>
            </div>
          </div>

        </div>

        <!-- Footer Actions -->
        <div class="px-8 py-5 border-t border-white/10 flex items-center justify-between gap-4">
          <p class="text-white/30 text-xs">Powered by Google Gemini 2.5 Flash via OpenRouter</p>
          <div class="flex items-center gap-3">
            <button
              v-if="aiResponse"
              @click="analyzeWithAI"
              class="px-4 py-2 text-xs font-bold text-violet-300 border border-violet-500/30 rounded-xl hover:bg-violet-500/10 transition-all"
            >
              ↺ Täzele
            </button>
            <button
              @click="analyzeWithAI"
              :disabled="aiLoading"
              class="px-6 py-2.5 text-sm font-bold text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-violet-500/25"
              style="background: linear-gradient(135deg, #7c3aed, #4f46e5);"
            >
              {{ aiLoading ? 'Seljerýär...' : (aiResponse ? 'Gaýtadan seljer' : 'Seljer') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, h } from 'vue'
import { scansApi, targetsApi } from '../api/endpoints'

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY ?? ''
const AI_MODEL = 'google/gemini-2.5-flash'

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

// AI Modal state
const showAiModal = ref(false)
const selectedScan = ref<any>(null)
const aiLoading = ref(false)
const aiError = ref('')
const aiResponse = ref('')

const filteredScans = computed(() => {
  return scans.value.filter(s => {
    const target = (s.target_address || s.target_name || s.target || '').toString().toLowerCase()
    const matchesSearch = !search.value || target.includes(search.value.toLowerCase())
    const matchesStatus = !statusFilter.value || (s.status || '').toLowerCase() === statusFilter.value
    return matchesSearch && matchesStatus
  })
})

const formattedAiResponse = computed(() => {
  if (!aiResponse.value) return ''
  let html = aiResponse.value
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  // Code inline
  html = html.replace(/`([^`]+)`/g, '<code class="ai-code">$1</code>')
  // Headers
  html = html.replace(/^### (.*?)$/gm, '<h4 class="ai-h4">$1</h4>')
  html = html.replace(/^## (.*?)$/gm, '<h3 class="ai-h3">$1</h3>')
  html = html.replace(/^# (.*?)$/gm, '<h2 class="ai-h2">$1</h2>')
  // Bullet points
  html = html.replace(/^[\-\*] (.*?)$/gm, '<li class="ai-li">$1</li>')
  html = html.replace(/(<li class="ai-li">.*?<\/li>(\n|$))+/g, (m) => `<ul class="ai-ul">${m}</ul>`)
  // Numbered list
  html = html.replace(/^\d+\. (.*?)$/gm, '<li class="ai-li">$1</li>')
  // Line breaks
  html = html.replace(/\n\n/g, '</p><p class="ai-p">')
  html = html.replace(/\n/g, '<br>')
  return `<p class="ai-p">${html}</p>`
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

const openAiAnalysis = (scan: any) => {
  selectedScan.value = scan
  aiResponse.value = ''
  aiError.value = ''
  showAiModal.value = true
}

const closeAiModal = () => {
  showAiModal.value = false
  selectedScan.value = null
  aiResponse.value = ''
  aiError.value = ''
}

const analyzeWithAI = async () => {
  if (!selectedScan.value) return

  aiLoading.value = true
  aiError.value = ''
  aiResponse.value = ''

  const scan = selectedScan.value

  const scanInfo = `
Skan ID: #${String(scan.id).padStart(4, '0')}
Nyşana (Target): ${scan.target_address || scan.target_name || scan.target || 'Näbelli'}
Skan görnüşi: ${scan.scan_type || 'Näbelli'}
Status: ${scan.status || 'Näbelli'}
Döredilen wagty: ${scan.created_at ? new Date(scan.created_at).toLocaleString() : 'Näbelli'}
${scan.result ? `Netijeler: ${JSON.stringify(scan.result, null, 2)}` : ''}
${scan.vulnerabilities ? `Açyklar: ${JSON.stringify(scan.vulnerabilities, null, 2)}` : ''}
${scan.error ? `Ýalňyşlyk: ${scan.error}` : ''}
${scan.findings ? `Tapyndylar: ${JSON.stringify(scan.findings, null, 2)}` : ''}
  `.trim()

  const prompt = `Sen web howpsuzlyk bilermensiň. Aşakdaky skan netijelerini seljeriň we Türkmen dilinde jikme-jik howpsuzlyk maslahatlaryny ber.

${scanInfo}

Aşakdaky temalar boýunça maslahat ber:
1. **Howp derejesi** - Bu skan netijesi näçe howply?
2. **Tapylan açyklar** - Nähili gowşaklyklar bar?
3. **Gürrüňsiz çäreler** - Derrew näme etmeli?
4. **Uzak möhletli çäreler** - Howpsuzlygy güýçlendirmek üçin näme etmeli?
5. **Iň gowy tejribeler** - Bu görnüşdäki skanlarda alynmaly çäreler

Jogaby düşnükli, anyk we amaly maslahatlara gönükdirilen et. Türkmen dilinde ýaz.`

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Web Security Scanner'
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [
          {
            role: 'system',
            content: 'Sen tejribeli web howpsuzlyk seljerijisiň. Skan netijelerini düýpli seljermeli we amaly howpsuzlyk maslahatlaryny Türkmen dilinde bermeli.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2048,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}))
      throw new Error(errData?.error?.message || `API ýalňyşlygy: ${response.status}`)
    }

    const data = await response.json()
    const content = data?.choices?.[0]?.message?.content

    if (!content) {
      throw new Error('Emeli aňdan jogap alynmady.')
    }

    aiResponse.value = content
  } catch (err: any) {
    aiError.value = err.message || 'Näbelli ýalňyşlyk ýüze çykdy.'
  } finally {
    aiLoading.value = false
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

const getStatusBgClass = (s: string | undefined) => {
  switch ((s || '').toLowerCase()) {
    case 'completed': return 'bg-green-500/20 text-green-300'
    case 'running':
    case 'in_progress': return 'bg-blue-500/20 text-blue-300'
    case 'failed': return 'bg-red-500/20 text-red-300'
    case 'pending': return 'bg-yellow-500/20 text-yellow-300'
    default: return 'bg-white/10 text-white/60'
  }
}

const formatDate = (s: string) => (s ? new Date(s).toLocaleString() : '-')

onMounted(() => {
  fetchScans()
  fetchTargets()
})
</script>

<style scoped>
/* AI Spinner */
.ai-spinner {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 3px solid rgba(167, 139, 250, 0.15);
  border-top-color: #a78bfa;
  border-right-color: #6366f1;
  animation: ai-spin 0.8s ease-in-out infinite;
}

@keyframes ai-spin {
  to { transform: rotate(360deg); }
}

/* Scrollbar styling for modal */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(255,255,255,0.05);
  border-radius: 4px;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(167, 139, 250, 0.4);
  border-radius: 4px;
}

/* AI response content styles */
:deep(.ai-p) {
  margin-bottom: 0.75rem;
  color: rgba(255,255,255,0.85);
  font-size: 0.875rem;
  line-height: 1.7;
}

:deep(.ai-h2) {
  font-size: 1.1rem;
  font-weight: 700;
  color: #c4b5fd;
  margin: 1rem 0 0.5rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid rgba(167,139,250,0.2);
}

:deep(.ai-h3) {
  font-size: 1rem;
  font-weight: 700;
  color: #a78bfa;
  margin: 0.875rem 0 0.4rem;
}

:deep(.ai-h4) {
  font-size: 0.9rem;
  font-weight: 700;
  color: #818cf8;
  margin: 0.75rem 0 0.35rem;
}

:deep(.ai-ul) {
  margin: 0.5rem 0;
  padding-left: 0;
  list-style: none;
}

:deep(.ai-li) {
  position: relative;
  padding-left: 1.25rem;
  margin-bottom: 0.35rem;
  color: rgba(255,255,255,0.8);
  font-size: 0.875rem;
  line-height: 1.6;
}

:deep(.ai-li)::before {
  content: '›';
  position: absolute;
  left: 0;
  color: #a78bfa;
  font-weight: 700;
}

:deep(.ai-code) {
  background: rgba(167,139,250,0.15);
  color: #c4b5fd;
  padding: 0.1rem 0.4rem;
  border-radius: 0.3rem;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
}

:deep(strong) {
  color: #e2e8f0;
  font-weight: 700;
}

:deep(em) {
  color: #c4b5fd;
  font-style: italic;
}
</style>
