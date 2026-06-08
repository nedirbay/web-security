<template>
  <div class="relative">
    <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
    <input
      :value="modelValue"
      type="text"
      :placeholder="placeholder || t.common.search"
      class="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-100 bg-white shadow-sm focus:ring-2 focus:ring-blue-600 outline-none"
      @input="onInput"
    />
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { Search } from 'lucide-vue-next'
import { t } from '../../strings'

const props = withDefaults(defineProps<{
  modelValue: string
  placeholder?: string
  debounce?: number
}>(), {
  debounce: 300,
})

const emit = defineEmits<{ 'update:modelValue': [v: string] }>()

const update = useDebounceFn((v: string) => emit('update:modelValue', v), props.debounce)
const onInput = (e: Event) => update((e.target as HTMLInputElement).value)
</script>
