<template>
  <div class="p-6 space-y-4">
    <div v-for="i in rows" :key="i" class="flex items-center gap-4">
      <div class="w-10 h-10 bg-gray-100 rounded-xl animate-pulse"></div>
      <div class="flex-1 space-y-2">
        <div class="h-3 bg-gray-100 rounded animate-pulse w-1/3"></div>
        <div class="h-3 bg-gray-100 rounded animate-pulse w-1/2"></div>
      </div>
      <div class="h-6 w-20 bg-gray-100 rounded-full animate-pulse"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ rows?: number }>(), { rows: 5 })
</script>
