<template>
  <AppModal :model-value="ui.confirmState.open" size="sm" @update:model-value="cancel" :show-close="false">
    <div class="flex items-start gap-4">
      <div class="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
           :class="ui.confirmState.variant === 'danger' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'">
        <AlertTriangle class="w-6 h-6" />
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-bold text-black mb-1">{{ ui.confirmState.title }}</h3>
        <p v-if="ui.confirmState.message" class="text-sm text-gray-500">{{ ui.confirmState.message }}</p>
      </div>
    </div>

    <div class="flex items-center justify-end gap-3 mt-8">
      <button
        type="button"
        class="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 transition-all"
        @click="cancel"
      >
        {{ ui.confirmState.cancelText || t.common.cancel }}
      </button>
      <button
        type="button"
        class="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
        :class="ui.confirmState.variant === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-black hover:bg-gray-900'"
        @click="ok"
      >
        {{ ui.confirmState.confirmText || t.common.confirm }}
      </button>
    </div>
  </AppModal>
</template>

<script setup lang="ts">
import { AlertTriangle } from 'lucide-vue-next'
import AppModal from './AppModal.vue'
import { useUiStore } from '../../stores/ui'
import { t } from '../../strings'

const ui = useUiStore()
const ok = () => ui.resolveConfirm(true)
const cancel = () => ui.resolveConfirm(false)
</script>
