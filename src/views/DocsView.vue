<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col lg:flex-row gap-12">
    <!-- Loading State -->
    <div v-if="loading" class="flex flex-1 gap-12">
      <div class="w-64 animate-pulse space-y-8">
        <div v-for="i in 3" :key="i">
          <div class="h-4 bg-gray-100 rounded w-1/2 mb-4"></div>
          <div class="h-3 bg-gray-100 rounded w-full mb-2"></div>
        </div>
      </div>
      <div class="flex-1 animate-pulse">
        <div class="h-10 bg-gray-100 rounded w-3/4 mb-8"></div>
        <div class="h-4 bg-gray-100 rounded w-full mb-4"></div>
      </div>
    </div>

    <template v-else>
      <!-- Sidebar Navigation -->
      <aside class="w-full lg:w-64 flex-shrink-0 flex flex-col">
        <nav class="sticky top-32 space-y-8 flex-1">
          <div v-for="(pagesList, category) in categories" :key="category">
            <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              {{ category || 'General' }}
            </h3>
            <ul class="space-y-3">
              <li v-for="page in pagesList" :key="page.id">
                <button 
                  @click="selectedPage = page"
                  class="text-sm transition-colors text-left w-full"
                  :class="selectedPage?.id === page.id ? 'font-bold text-blue-600' : 'text-gray-600 hover:text-black'"
                >
                  {{ page.title }}
                </button>
              </li>
            </ul>
          </div>
        </nav>

        <!-- Sidebar Pagination -->
        <div v-if="totalCount > pageSize" class="sticky bottom-0 bg-white pt-6 border-t border-gray-100 mt-8">
          <div class="flex items-center justify-between gap-4">
            <button 
              @click="prevPage" 
              :disabled="!hasPrev"
              class="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span class="text-xs font-medium text-gray-400">Page {{ currentPage }}</span>
            <button 
              @click="nextPage" 
              :disabled="!hasNext"
              class="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <article v-if="selectedPage" class="flex-1 max-w-3xl prose prose-slate prose-lg">
        <h1 class="text-4xl font-extrabold text-black mb-8 leading-tight">
          {{ selectedPage.title }}
        </h1>
        <div class="text-gray-600 leading-relaxed whitespace-pre-wrap">
          {{ selectedPage.content }}
        </div>

        <!-- Optional: Render code blocks if content looks like code -->
        <div v-if="selectedPage.content.includes('//')" class="bg-black rounded-xl p-8 my-10">
          <pre class="text-blue-400 font-mono text-sm"><code>{{ selectedPage.content }}</code></pre>
        </div>
      </article>

      <div v-else class="flex-1 flex flex-col items-center justify-center text-gray-400 py-20">
        <p class="text-xl">Sahypa saýlaň</p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import apiClient from '../api/axios'

interface DocPage {
  id: number
  title: string
  slug: string
  category: string
  content: string
}

const pages = ref<DocPage[]>([])
const selectedPage = ref<DocPage | null>(null)
const loading = ref(true)
const totalCount = ref(0)
const hasNext = ref(false)
const hasPrev = ref(false)
const currentPage = ref(1)
const pageSize = 2

const categories = computed(() => {
  const groups: Record<string, DocPage[]> = {}
  pages.value.forEach(p => {
    if (!groups[p.category]) groups[p.category] = []
    groups[p.category].push(p)
  })
  return groups
})

const fetchDocs = async (page = 1) => {
  try {
    loading.value = true
    const response = await apiClient.get('/admin/docs-pages/', {
      params: { page }
    })
    
    if (Array.isArray(response.data)) {
      pages.value = response.data
      totalCount.value = response.data.length
      hasNext.value = false
      hasPrev.value = false
    } else {
      pages.value = response.data.results
      totalCount.value = response.data.count
      hasNext.value = !!response.data.next
      hasPrev.value = !!response.data.previous
    }
    
    currentPage.value = page
    if (pages.value.length > 0 && !selectedPage.value) {
      selectedPage.value = pages.value[0]
    }
  } catch (err) {
    console.error('Failed to fetch docs:', err)
  } finally {
    loading.value = false
  }
}

const nextPage = () => {
  if (hasNext.value) fetchDocs(currentPage.value + 1)
}

const prevPage = () => {
  if (hasPrev.value) fetchDocs(currentPage.value - 1)
}

onMounted(() => fetchDocs(1))
</script>
