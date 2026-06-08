<template>
  <label class="block">
    <span v-if="label" class="block text-sm font-bold text-gray-700 mb-2">
      {{ label }}
      <span v-if="optional" class="text-xs text-gray-400 font-medium ml-1">({{ t.common.optional }})</span>
    </span>
    <slot />
    <p v-if="error" class="text-red-500 text-xs font-bold mt-1.5">{{ error }}</p>
    <p v-else-if="hint" class="text-xs text-gray-400 mt-1.5">{{ hint }}</p>
  </label>
</template>

<script setup lang="ts">
import { t } from '../../strings'

defineProps<{
  label?: string
  error?: string
  hint?: string
  optional?: boolean
}>()
</script>
