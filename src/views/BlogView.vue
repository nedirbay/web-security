<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div class="mb-16">
      <h1 class="text-4xl font-bold text-black mb-4">Security Insights & Blogs</h1>
      <p class="text-xl text-gray-500">The latest news, trends, and tutorials from the world of web security.</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <div v-for="i in 3" :key="i" class="animate-pulse">
        <div class="aspect-[16/10] bg-gray-100 rounded-2xl mb-6"></div>
        <div class="h-6 bg-gray-100 rounded w-3/4 mb-4"></div>
        <div class="h-4 bg-gray-100 rounded w-full mb-2"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 p-6 rounded-2xl text-red-600 font-medium">
      {{ error }}
    </div>

    <!-- Blog Grid -->
    <template v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <article v-for="blog in blogs" :key="blog.id" class="group cursor-pointer">
          <div class="aspect-[16/10] bg-gray-100 rounded-2xl mb-6 overflow-hidden relative border border-gray-100">
            <div class="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {{ blog.tags.split(',')[0] || 'Article' }}
            </div>
            <div class="w-full h-full flex items-center justify-center text-gray-300">
              <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <h2 class="text-2xl font-bold text-black group-hover:text-blue-600 transition-colors mb-4 leading-tight">
            {{ blog.title }}
          </h2>
          <p class="text-gray-500 line-clamp-3 mb-6">
            {{ blog.content }}
          </p>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold">
              {{ blog.author_email?.[0]?.toUpperCase() || 'A' }}
            </div>
            <div>
              <p class="text-sm font-bold text-black">{{ blog.author_email || 'Admin' }}</p>
              <p class="text-xs text-gray-400">
                {{ new Date(blog.published_at).toLocaleDateString() }}
              </p>
            </div>
          </div>
        </article>
      </div>

      <!-- Pagination -->
      <div v-if="totalCount > pageSize" class="mt-16 flex items-center justify-between border-t border-gray-100 pt-8">
        <button 
          @click="prevPage" 
          :disabled="!hasPrev"
          class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span class="text-sm text-gray-500">
          Showing {{ blogs.length }} of {{ totalCount }} results
        </span>
        <button 
          @click="nextPage" 
          :disabled="!hasNext"
          class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { adminApi } from '../api/endpoints'

interface Blog {
  id: number
  title: string
  content: string
  tags: string
  author_email: string
  published_at: string
}

const blogs = ref<Blog[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const totalCount = ref(0)
const hasNext = ref(false)
const hasPrev = ref(false)
const currentPage = ref(1)
const pageSize = 2

const fetchBlogs = async (page = 1) => {
  try {
    loading.value = true
    const response = await adminApi.getBlogPosts({ page })
    blogs.value = response.data.results
    totalCount.value = response.data.count
    hasNext.value = !!response.data.next
    hasPrev.value = !!response.data.previous
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (err: any) {
    console.error('Failed to fetch blogs:', err)
    error.value = 'Blog ýazgylaryny ýüklap bolmady.'
  } finally {
    loading.value = false
  }
}

const nextPage = () => {
  if (hasNext.value) fetchBlogs(currentPage.value + 1)
}

const prevPage = () => {
  if (hasPrev.value) fetchBlogs(currentPage.value - 1)
}

onMounted(() => fetchBlogs(1))
</script>
