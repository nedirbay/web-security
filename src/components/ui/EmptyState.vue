<template>
  <div class="p-20 text-center">
    <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
      <component :is="icon" class="w-10 h-10" />
    </div>
    <h3 class="text-xl font-bold text-black mb-2">{{ title }}</h3>
    <p v-if="hint" class="text-gray-500 max-w-xs mx-auto mb-6">{{ hint }}</p>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { Inbox, type LucideProps } from 'lucide-vue-next'
import type { Component } from 'vue'

withDefaults(defineProps<{
  title: string
  hint?: string
  icon?: Component
}>(), {
  icon: Inbox as unknown as Component,
})
</script>
