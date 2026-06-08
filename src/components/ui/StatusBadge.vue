<template>
  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold" :class="classFor">
    <slot>{{ label || value }}</slot>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value: string
  kind?: 'scan' | 'severity' | 'vuln' | 'target'
  label?: string
}>()

const classFor = computed(() => {
  const v = (props.value || '').toLowerCase()
  if (props.kind === 'severity') {
    if (v === 'critical') return 'bg-red-50 text-red-600'
    if (v === 'high') return 'bg-orange-50 text-orange-600'
    if (v === 'medium') return 'bg-yellow-50 text-yellow-600'
    if (v === 'low') return 'bg-green-50 text-green-600'
    if (v === 'info') return 'bg-blue-50 text-blue-600'
    return 'bg-gray-50 text-gray-500'
  }
  if (props.kind === 'vuln') {
    if (v === 'open') return 'bg-amber-50 text-amber-600'
    if (v === 'in_progress') return 'bg-blue-50 text-blue-600'
    if (v === 'resolved' || v === 'closed') return 'bg-emerald-50 text-emerald-600'
    if (v === 'false_positive') return 'bg-gray-50 text-gray-500'
    return 'bg-gray-50 text-gray-500'
  }
  if (props.kind === 'target') {
    if (v === 'active' || v === 'true') return 'bg-green-50 text-green-600'
    return 'bg-gray-50 text-gray-500'
  }
  if (v === 'completed') return 'bg-green-50 text-green-600'
  if (v === 'running' || v === 'in_progress') return 'bg-blue-50 text-blue-600'
  if (v === 'failed') return 'bg-red-50 text-red-600'
  if (v === 'pending') return 'bg-yellow-50 text-yellow-600'
  return 'bg-gray-50 text-gray-500'
})
</script>
