<template>
  <div v-if="totalPages > 1" class="flex items-center justify-between gap-4 text-sm text-gray-500">
    <button
      type="button"
      :disabled="page <= 1"
      class="px-4 py-2 border border-gray-200 rounded-xl disabled:opacity-30 hover:bg-gray-50 transition-colors flex items-center gap-2"
      @click="go(page - 1)"
    >
      <ChevronLeft class="w-4 h-4" />
      {{ t.common.previous }}
    </button>
    <span class="font-medium">
      {{ t.common.page }} {{ page }} {{ t.common.of }} {{ totalPages }}
    </span>
    <button
      type="button"
      :disabled="page >= totalPages"
      class="px-4 py-2 border border-gray-200 rounded-xl disabled:opacity-30 hover:bg-gray-50 transition-colors flex items-center gap-2"
      @click="go(page + 1)"
    >
      {{ t.common.next }}
      <ChevronRight class="w-4 h-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { t } from '../../strings'

const props = defineProps<{
  page: number
  pageSize: number
  total: number
}>()

const emit = defineEmits<{ change: [page: number] }>()

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))

const go = (p: number) => {
  if (p < 1 || p > totalPages.value) return
  emit('change', p)
}
</script>
