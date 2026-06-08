<template>
  <div
    class="animate-pulse bg-gray-100 rounded-xl"
    :class="rounded === 'full' ? 'rounded-full' : ''"
    :style="{ width, height }"
  ></div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  width?: string
  height?: string
  rounded?: 'md' | 'full'
}>(), {
  width: '100%',
  height: '1rem',
  rounded: 'md',
})
</script>
