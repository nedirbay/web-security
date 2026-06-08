<template>
  <div class="flex flex-wrap items-end justify-between gap-4">
    <div>
      <p v-if="eyebrow" class="text-xs font-bold uppercase tracking-[0.3em] text-blue-600">{{ eyebrow }}</p>
      <h2 class="text-2xl font-bold text-black" :class="{ 'mt-2': eyebrow }">{{ title }}</h2>
      <p v-if="subtitle" class="text-gray-500 mt-1">{{ subtitle }}</p>
    </div>
    <div v-if="$slots.actions" class="flex flex-wrap items-center gap-2">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  eyebrow?: string
}>()
</script>
