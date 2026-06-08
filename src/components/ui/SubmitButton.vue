<template>
  <button
    :type="type"
    :disabled="loading || disabled"
    class="inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    :class="[sizeClass, variantClass, block ? 'w-full' : '']"
  >
    <Loader2 v-if="loading" class="w-4 h-4 animate-spin" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Loader2 } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  loading?: boolean
  disabled?: boolean
  type?: 'submit' | 'button' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
}>(), {
  type: 'submit',
  variant: 'primary',
  size: 'md',
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm': return 'px-3 py-2 text-xs'
    case 'lg': return 'px-6 py-4 text-base'
    default: return 'px-5 py-3 text-sm'
  }
})

const variantClass = computed(() => {
  switch (props.variant) {
    case 'secondary': return 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
    case 'danger': return 'bg-red-600 text-white hover:bg-red-700'
    case 'ghost': return 'bg-transparent text-gray-600 hover:bg-gray-50'
    default: return 'bg-black text-white hover:bg-gray-900'
  }
})
</script>
