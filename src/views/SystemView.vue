<template>
  <div class="space-y-8">
    <div>
      <h2 class="text-2xl font-bold text-black">System</h2>
      <p class="text-gray-500">Backend schema and API documentation.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <section class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-black">OpenAPI Schema</h3>
          <button @click="fetchSchema" class="text-blue-600 text-xs font-bold hover:underline">Refresh</button>
        </div>
        <div v-if="loadingSchema" class="text-gray-400 text-sm">Loading…</div>
        <pre v-else class="bg-gray-950 text-gray-100 rounded-2xl p-4 text-xs overflow-auto max-h-[600px]">{{ schemaText || 'No data' }}</pre>
      </section>

      <section class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-black">API Docs</h3>
          <button @click="fetchDocs" class="text-blue-600 text-xs font-bold hover:underline">Refresh</button>
        </div>
        <div v-if="loadingDocs" class="text-gray-400 text-sm">Loading…</div>
        <pre v-else class="bg-gray-50 text-gray-700 rounded-2xl p-4 text-xs overflow-auto max-h-[600px]">{{ docsText || 'No data' }}</pre>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { systemApi } from '../api/endpoints'

const schemaText = ref('')
const docsText = ref('')
const loadingSchema = ref(true)
const loadingDocs = ref(true)

const fetchSchema = async () => {
  loadingSchema.value = true
  try {
    const res = await systemApi.getSchema()
    schemaText.value = typeof res.data === 'string' ? res.data : JSON.stringify(res.data, null, 2)
  } catch (err) {
    console.error('Failed to fetch schema', err)
  } finally {
    loadingSchema.value = false
  }
}

const fetchDocs = async () => {
  loadingDocs.value = true
  try {
    const res = await systemApi.getDocs()
    docsText.value = typeof res.data === 'string' ? res.data : JSON.stringify(res.data, null, 2)
  } catch (err) {
    console.error('Failed to fetch docs', err)
  } finally {
    loadingDocs.value = false
  }
}

onMounted(() => {
  fetchSchema()
  fetchDocs()
})
</script>
